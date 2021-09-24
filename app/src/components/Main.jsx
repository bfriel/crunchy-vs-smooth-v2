import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
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

const { SystemProgram, Keypair } = web3;

const preflightCommitment = "processed";
const programID = new PublicKey(idl.metadata.address);
const voteAccount = Keypair.generate();

export default function Main({ network }) {
  const wallet = useWallet();
  const { enqueueSnackbar } = useSnackbar();

  const [votes, setVotes] = useState({
    crunchy: null,
    smooth: null,
  });

  const [voteTxHistory, setVoteTxHistory] = useState([]);

  console.log("wallet: ", wallet);
  console.log("wallet connected: ", wallet.connected);
  console.log("programID: ", programID.toString());

  async function getProvider() {
    const connection = new Connection(network, preflightCommitment);
    const provider = new Provider(connection, wallet, preflightCommitment);
    return provider;
  }

  async function initializeVoting() {
    const provider = await getProvider();
    const program = new Program(idl, programID, provider);
    try {
      const tx = await program.rpc.initialize({
        accounts: {
          voteAccount: voteAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [voteAccount],
      });

      console.group("intialize tx: ", tx);

      const account = await program.account.voteAccount.fetch(
        voteAccount.publicKey
      );

      console.log("account: ", account);
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

  async function voteCrunchy() {
    const provider = await getProvider();
    const program = new Program(idl, programID, provider);

    try {
      const tx = await program.rpc.voteCrunchy({
        accounts: {
          voteAccount: voteAccount.publicKey,
        },
      });

      console.log("tx: ", tx);

      const account = await program.account.voteAccount.fetch(
        voteAccount.publicKey
      );
      console.log("account: ", account);
      setVotes({
        crunchy: parseInt(account.crunchy.toString()),
        smooth: parseInt(account.smooth.toString()),
      });
      enqueueSnackbar("Voted for Crunchy!", { variant: "success" });
      setVoteTxHistory((oldVoteTxHistory) => [...oldVoteTxHistory, tx]);
    } catch (error) {
      console.log("Transaction error: ", error);
      console.log(error.toString());
      enqueueSnackbar(`Error: ${error.toString()}`, { variant: "error" });
    }
  }

  async function voteSmooth() {
    const provider = await getProvider();
    const program = new Program(idl, programID, provider);
    try {
      const tx = await program.rpc.voteSmooth({
        accounts: {
          voteAccount: voteAccount.publicKey,
        },
      });

      console.log("tx: ", tx);

      const account = await program.account.voteAccount.fetch(
        voteAccount.publicKey
      );
      console.log("account: ", account);
      setVotes({
        crunchy: parseInt(account.crunchy.toString()),
        smooth: parseInt(account.smooth.toString()),
      });
      enqueueSnackbar("Voted for Smooth!", { variant: "success" });
      setVoteTxHistory((oldVoteTxHistory) => [...oldVoteTxHistory, tx]);
    } catch (error) {
      console.log("Transaction error: ", error);
      console.log(error.toString());
      enqueueSnackbar(`Error: ${error.toString()}`, { variant: "error" });
    }
  }

  console.log(votes);

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
              <VoteOption side="crunchy" handleVote={voteCrunchy} />
            </Grid>
            <Grid item xs={6}>
              <VoteOption side="smooth" handleVote={voteSmooth} />
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
