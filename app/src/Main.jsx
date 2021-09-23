import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import { Program, Provider, web3 } from "@project-serum/anchor";
import idl from "./idl.json";
import { useState } from "react";
import { Box, Button, Container, Typography } from "@material-ui/core";
import Navbar from "./Navbar";
import VotingOption from "./VotingOption";

const { SystemProgram, Keypair } = web3;

const localnet = "http://127.0.0.1:8899";
const preflightCommitment = "processed";
const programID = new PublicKey(idl.metadata.address);
const baseAccount = Keypair.generate();

export default function Main(props) {
  const wallet = useWallet();

  const [votes, setVotes] = useState({ crunchy: null, smooth: null });

  console.log("wallet: ", wallet);
  console.log("wallet connected: ", wallet.connected);

  async function getProvider() {
    /* create the provider and return it to the caller */
    /* network set to local network for now */
    const network = localnet;
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
          baseAccount: baseAccount.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [baseAccount],
      });

      const account = await program.account.baseAccount.fetch(
        baseAccount.publicKey
      );
      console.log("account: ", account);
      setVotes({
        crunchy: account.crunchy.toString(),
        smooth: account.smooth.toString(),
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
          baseAccount: baseAccount.publicKey,
        },
      });

      const account = await program.account.baseAccount.fetch(
        baseAccount.publicKey
      );
      console.log("account: ", account);
      setVotes({
        crunchy: account.crunchy.toString(),
        smooth: account.smooth.toString(),
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
          baseAccount: baseAccount.publicKey,
        },
      });

      const account = await program.account.baseAccount.fetch(
        baseAccount.publicKey
      );
      console.log("account: ", account);
      setVotes({
        crunchy: account.crunchy.toString(),
        smooth: account.smooth.toString(),
      });
    } catch (err) {
      console.log("Transaction error: ", err);
    }
  }

  return (
    <Box>
      <Navbar />
      <Container>
        {!votes.crunchy && !votes.smooth && (
          <Button
            color="primary"
            variant="contained"
            onClick={initializeVoting}
          >
            Initialize
          </Button>
        )}
        <VotingOption
          side="crunchy"
          count={votes.crunchy}
          handleVote={voteCrunchy}
        />
        <VotingOption
          side="smooth"
          count={votes.smooth}
          handleVote={voteSmooth}
        />
      </Container>
    </Box>
  );
}
