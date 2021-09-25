import { Box, Link, List, ListItem, Typography } from "@material-ui/core";
import React from "react";

// If this user has voted during this session, show them their transaction history
export default function VoteHistory({ voteTxHistory }) {
  if (voteTxHistory.length < 1) {
    return <Box />;
  }
  return (
    <Box textAlign="center" marginTop="16px">
      <Typography variant="h4">You voted!</Typography>
      <Typography variant="body1">
        Thanks for making your voice heard on this important issue.
      </Typography>
      <Typography variant="body1">
        Check out your recorded {voteTxHistory.length === 1 ? "vote" : "votes"}{" "}
        on the Solana blockchain:
      </Typography>
      <List>
        {voteTxHistory.map((txID, i) => (
          <ListItem key={txID} style={{ justifyContent: "center" }}>
            <Link
              href={`https://explorer.solana.com/tx/${txID}`}
              underline="always"
            >{`Vote ${i + 1}`}</Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
