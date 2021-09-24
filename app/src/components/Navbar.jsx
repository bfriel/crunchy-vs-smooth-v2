import { AppBar, Container, makeStyles, Toolbar } from "@material-ui/core";
import { WalletMultiButton } from "@solana/wallet-adapter-material-ui";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "transparent",
    boxShadow: "none",
  },
  toolbar: {
    justifyContent: "space-between",
  },
}));

export default function Navbar(props) {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.root}>
      <Container maxWidth="xl">
        <Toolbar className={classes.toolbar}>
          <img src="/images/pb-icon.svg" alt="PB Vote" height={40} />
          <WalletMultiButton />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
