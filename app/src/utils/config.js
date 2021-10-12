import {
  PublicKey,
  // clusterApiUrl
} from "@solana/web3.js";
import { getPhantomWallet } from "@solana/wallet-adapter-wallets";
import idl from "../idl.json";

export const preflightCommitment = "processed";
export const programID = new PublicKey(idl.metadata.address);
export const wallets = [getPhantomWallet()];

const localnet = "http://127.0.0.1:8899";
// const devnet = clusterApiUrl("devnet");
// const mainnet = clusterApiUrl("mainnet-beta");
export const network = localnet;
