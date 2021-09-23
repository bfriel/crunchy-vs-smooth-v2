import { Box, Button, Link, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { WalletMultiButton } from "@solana/wallet-adapter-material-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import React from "react";

const useStyles = makeStyles((theme) => ({
  connectButton: {
    marginTop: theme.spacing(1),
    "&.hidden": {
      visibility: "hidden",
    },
  },
}));

export default function Intro({ initializeVoting }) {
  const wallet = useWallet();
  const classes = useStyles();
  return (
    <Box textAlign="center">
      <Typography component="h1" variant="h3" gutterBottom>
        Vote for your favorite Peanut Butter
      </Typography>
      <Typography variant="body1">
        It's time to settle an age old debate: Crunchy, or Smooth?
      </Typography>
      <Typography variant="body1">
        Cast your vote to the <Link href="https://solana.com/">Solana</Link>{" "}
        blockchain and help decide this once and for all!
      </Typography>
      <Box marginTop="8px">
        {wallet.connected ? (
          <Typography variant="body1">Connected</Typography>
        ) : (
          <Typography variant="body1">
            To get started, connect your wallet below:
          </Typography>
        )}
        <WalletMultiButton
          className={
            wallet.connected
              ? [classes.connectButton, "hidden"].join(" ")
              : classes.connectButton
          }
        />
      </Box>
      {/* <Box marginTop="8px">
        <Button color="primary" variant="contained" onClick={initializeVoting}>
          Initialize
        </Button>
      </Box> */}
    </Box>
  );
}
