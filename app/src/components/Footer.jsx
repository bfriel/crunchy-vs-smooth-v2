import {
  AppBar,
  Box,
  Container,
  Link,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles((theme) => ({
  link: {
    color: "initial",
    "&.underline": {
      textDecoration: "underline",
    },
    "&.twitter": {
      marginRight: theme.spacing(1),
    },
  },
  root: {
    backgroundColor: "transparent",
    boxShadow: "none",
    borderTop: "1px solid #e6e6e5",
    flexShrink: 0,
    marginTop: theme.spacing(2),
  },
  toolbar: {
    justifyContent: "space-between",
  },
}));

export default function Footer({ programID }) {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.root}>
      <Container maxWidth="xl">
        <Toolbar className={classes.toolbar}>
          <Typography variant="caption">
            Made by{" "}
            <Link
              className={[classes.link, "underline"].join(" ")}
              href="https://brianfriel.xyz"
            >
              Brian Friel
            </Link>
            {". "}
            Powered by{" "}
            <Link
              className={[classes.link, "underline"].join(" ")}
              href={`https://explorer.solana.com/address/${programID.toString()}`}
            >
              Solana{" "}
            </Link>
          </Typography>
          <Box>
            <Link
              className={[classes.link, "twitter"].join(" ")}
              href="https://twitter.com/bfriel_"
            >
              <TwitterIcon />
            </Link>
            <Link
              className={classes.link}
              href="https://github.com/bfriel/crunchy-vs-smooth"
            >
              <GitHubIcon />
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
