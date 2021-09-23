import { AppBar, makeStyles, Toolbar } from "@material-ui/core";
import { WalletMultiButton } from "@solana/wallet-adapter-material-ui";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "transparent",
    boxShadow: "none",
  },
  toolbar: {
    justifyContent: "flex-end",
  },
}));

export default function Navbar(props) {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <WalletMultiButton />
      </Toolbar>
    </AppBar>
  );
}
