import React from "react";
import { Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useWallet } from "@solana/wallet-adapter-react";
import { capitalize } from "../utils/helpers";

const useStyles = makeStyles((theme) => ({
  button: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    fontSize: "1.2rem",
  },
}));

export default function VoteOption({ side, handleVote }) {
  const classes = useStyles();
  const wallet = useWallet();
  return (
    <Box textAlign="center">
      <Button
        variant="contained"
        onClick={() => handleVote(side)}
        disabled={!wallet.connected}
        size="large"
        color={side === "smooth" ? "primary" : "secondary"}
        className={classes.button}
      >
        {`Vote ${capitalize(side)}`}
      </Button>
    </Box>
  );
}
