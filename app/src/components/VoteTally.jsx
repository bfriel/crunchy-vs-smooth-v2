import { Box, LinearProgress, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { formatWithCommas, percentize } from "../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    height: 25,
  },
}));

export default function VoteTally({ votes }) {
  const classes = useStyles();

  function getProgress() {
    if (
      typeof votes.crunchy !== "number" ||
      typeof votes.smooth !== "number" ||
      votes.crunchy + votes.smooth === 0
    ) {
      return 50;
    }
    return (votes.crunchy / (votes.smooth + votes.crunchy)) * 100;
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6">Team Crunchy</Typography>
        <Typography variant="h6">Team Smooth</Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={getProgress()}
        color="secondary"
        className={classes.root}
      />
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h3">
            {formatWithCommas(votes.crunchy)}
          </Typography>
          <Typography variant="h6">
            {percentize(votes.crunchy / (votes.crunchy + votes.smooth))}
          </Typography>
        </Box>
        <Box textAlign="right">
          <Typography variant="h3">{formatWithCommas(votes.smooth)}</Typography>
          <Typography variant="h6">
            {percentize(votes.smooth / (votes.crunchy + votes.smooth))}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
