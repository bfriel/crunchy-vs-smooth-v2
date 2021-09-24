const fs = require("fs");
var path = require("path");
const anchor = require("@project-serum/anchor");
const web3 = require("@solana/web3.js");
const express = require("express");

const voteAccount = anchor.web3.Keypair.generate();

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/voteAccount", (req, res) => {
  res.json({ voteAccount });
});

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "app/build", "index.html"));
// });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
