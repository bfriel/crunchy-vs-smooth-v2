import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "transparent",
    boxShadow: "none",
    borderTop: "1px solid #e6e6e5",
    marginTop: "auto",
  },
  toolbar: {
    justifyContent: "space-between",
    // justifyContent: "flex-end",
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="caption">Made by Brian Friel</Typography>
        <Typography variant="caption">
          Icons made by{" "}
          <a href="https://www.freepik.com" title="Freepik">
            Freepik
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
