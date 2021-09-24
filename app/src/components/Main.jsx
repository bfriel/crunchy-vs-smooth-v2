import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import { Program, Provider, web3 } from "@project-serum/anchor";
import idl from "../idl.json";
import { useState } from "react";
import { Box, Container, Grid } from "@material-ui/core";
import Navbar from "./Navbar";
import VotingOption from "./VotingOption";
import VoteTally from "./VoteTally";
import Footer from "./Footer";
import Intro from "./Intro";

const { SystemProgram, Keypair } = web3;

const preflightCommitment = "processed";
const programID = new PublicKey(idl.metadata.address);
const voteAccount = Keypair.generate();

export default function Main({ network }) {
  const wallet = useWallet();

  const [votes, setVotes] = useState({
    crunchy: null,
    smooth: null,
  });

  console.log("wallet: ", wallet);
  console.log("wallet connected: ", wallet.connected);
  console.log("programID: ", programID.toString());

  async function getProvider() {
    /* create the provider and return it to the caller */
    /* network set to local network for now */
    const connection = new Connection(network, preflightCommitment);
    const provider = new Provider(connection, wallet, preflightCommitment);
    return provider;
  }

  async function initializeVoting() {
    const provider = await getProvider();
    /* create the program interface combining the idl, program ID, and provider */
    const program = new Program(idl, programID, provider);
    try {
      /* interact with the program via rpc */
      await program.rpc.initialize({
        accounts: {
          voteAccount: voteAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [voteAccount],
      });

      const account = await program.account.voteAccount.fetch(
        voteAccount.publicKey
      );
      console.log("account: ", account);
      setVotes({
        crunchy: parseInt(account.crunchy.toString()),
        smooth: parseInt(account.smooth.toString()),
      });
    } catch (err) {
      console.log("Transaction error: ", err);
    }
  }

  async function voteCrunchy() {
    const provider = await getProvider();
    /* create the program interface combining the idl, program ID, and provider */
    const program = new Program(idl, programID, provider);
    try {
      /* interact with the program via rpc */
      await program.rpc.voteCrunchy({
        accounts: {
          voteAccount: voteAccount.publicKey,
        },
      });

      const account = await program.account.voteAccount.fetch(
        voteAccount.publicKey
      );
      console.log("account: ", account);
      setVotes({
        crunchy: parseInt(account.crunchy.toString()),
        smooth: parseInt(account.smooth.toString()),
      });
    } catch (err) {
      console.log("Transaction error: ", err);
    }
  }

  async function voteSmooth() {
    const provider = await getProvider();
    /* create the program interface combining the idl, program ID, and provider */
    const program = new Program(idl, programID, provider);
    try {
      /* interact with the program via rpc */
      await program.rpc.voteSmooth({
        accounts: {
          voteAccount: voteAccount.publicKey,
        },
      });

      const account = await program.account.voteAccount.fetch(
        voteAccount.publicKey
      );
      console.log("account: ", account);
      setVotes({
        crunchy: parseInt(account.crunchy.toString()),
        smooth: parseInt(account.smooth.toString()),
      });
    } catch (err) {
      console.log("Transaction error: ", err);
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
              />
            </Grid>
            <Grid item xs={12}>
              <VoteTally votes={votes} />
            </Grid>
            <Grid item xs={6}>
              <VotingOption
                side="crunchy"
                count={votes.crunchy}
                handleVote={voteCrunchy}
              />
            </Grid>
            <Grid item xs={6}>
              <VotingOption
                side="smooth"
                count={votes.smooth}
                handleVote={voteSmooth}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer programID={programID} />
    </Box>
  );
}
