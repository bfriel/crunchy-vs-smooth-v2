import React, { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import { Program, Provider, web3 } from "@project-serum/anchor";
import idl from "../idl.json";
import { useState } from "react";
import { Box, Container, Grid } from "@material-ui/core";
import Navbar from "./Navbar";
import VoteOption from "./VoteOption";
import VoteTally from "./VoteTally";
import Footer from "./Footer";
import Intro from "./Intro";
import { useSnackbar } from "notistack";
import VoteHistory from "./VoteHistory";
import { preflightCommitment, programID, capitalize } from "../utils";

export default function Main({ network, voteAccount }) {
  const { enqueueSnackbar } = useSnackbar();
  const wallet = useWallet();

  const [votes, setVotes] = useState({
    crunchy: null,
    smooth: null,
  });
  const [voteTxHistory, setVoteTxHistory] = useState([]);

  useEffect(() => {
    // Call Solana program for vote count
    async function getVotes() {
      const connection = new Connection(network, preflightCommitment);
      const provider = new Provider(connection, wallet, preflightCommitment);
      const program = new Program(idl, programID, provider);
      try {
        const account = await program.account.voteAccount.fetch(
          voteAccount.publicKey
        );
        setVotes({
          crunchy: parseInt(account.crunchy.toString()),
          smooth: parseInt(account.smooth.toString()),
        });
      } catch (error) {
        console.log("could not getVotes: ", error);
      }
    }

    if (!!voteAccount) {
      getVotes();
    }
  }, [voteAccount, network, wallet]);

  async function getProvider() {
    const connection = new Connection(network, preflightCommitment);
    const provider = new Provider(connection, wallet, preflightCommitment);
    return provider;
  }

  // Initialize the program if this is the first time its launched
  async function initializeVoting() {
    const provider = await getProvider();
    const program = new Program(idl, programID, provider);
    try {
      await program.rpc.initialize({
        accounts: {
          voteAccount: voteAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: web3.SystemProgram.programId,
        },
        signers: [voteAccount],
      });

      const account = await program.account.voteAccount.fetch(
        voteAccount.publicKey
      );

      setVotes({
        crunchy: parseInt(account.crunchy.toString()),
        smooth: parseInt(account.smooth.toString()),
      });
      enqueueSnackbar("Vote account initialized", { variant: "success" });
    } catch (error) {
      console.log("Transaction error: ", error);
      console.log(error.toString());
      enqueueSnackbar(`Error: ${error.toString()}`, { variant: "error" });
    }
  }

  // Vote for either crunchy or smooth. Poll for updated vote count on completion
  async function handleVote(side) {
    const provider = await getProvider();
    const program = new Program(idl, programID, provider);
    try {
      const tx =
        side === "crunchy"
          ? await program.rpc.voteCrunchy({
              accounts: {
                voteAccount: voteAccount.publicKey,
              },
            })
          : await program.rpc.voteSmooth({
              accounts: {
                voteAccount: voteAccount.publicKey,
              },
            });

      const account = await program.account.voteAccount.fetch(
        voteAccount.publicKey
      );
      setVotes({
        crunchy: parseInt(account.crunchy.toString()),
        smooth: parseInt(account.smooth.toString()),
      });
      enqueueSnackbar(`Voted for ${capitalize(side)}!`, { variant: "success" });
      setVoteTxHistory((oldVoteTxHistory) => [...oldVoteTxHistory, tx]);
    } catch (error) {
      console.log("Transaction error: ", error);
      console.log(error.toString());
      enqueueSnackbar(`Error: ${error.toString()}`, { variant: "error" });
    }
  }

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Box flex="1 0 auto">
        <Navbar />
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Intro
                votes={votes}
                initializeVoting={initializeVoting}
                programID={programID}
                voteAccount={voteAccount}
              />
            </Grid>
            <Grid item xs={12}>
              <VoteTally votes={votes} />
            </Grid>
            <Grid item xs={6}>
              <VoteOption side="crunchy" handleVote={handleVote} />
            </Grid>
            <Grid item xs={6}>
              <VoteOption side="smooth" handleVote={handleVote} />
            </Grid>
            <Grid item xs={12}>
              <VoteHistory voteTxHistory={voteTxHistory} />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer programID={programID} voteAccount={voteAccount} />
    </Box>
  );
}
