import {
  Avatar,
  Box,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { formatWithCommas, percentize } from "../utils";

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: 48,
    width: 48,
    borderRadius: "initial",
    "&.left": {
      marginRight: theme.spacing(0.5),
    },
    "&.right": {
      marginLeft: theme.spacing(0.5),
    },
  },
  progress: {
    backgroundColor: theme.palette.primary.main,
    height: 25,
  },
}));

// Show vote counts for each side
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
      <Box display="flex" justifyContent="space-between" marginBottom="5px">
        <Box display="flex" alignItems="flex-end">
          <Avatar
            alt=""
            src="/images/crunchy-icon.svg"
            className={[classes.avatar, "left"].join(" ")}
          />
          <Typography variant="h6">Team Crunchy</Typography>
        </Box>
        <Box display="flex" alignItems="flex-end" textAlign="right">
          <Typography variant="h6">Team Smooth</Typography>
          <Avatar
            alt=""
            src="/images/smooth-icon.svg"
            className={[classes.avatar, "right"].join(" ")}
          />
        </Box>
      </Box>
      <LinearProgress
        variant="determinate"
        value={getProgress()}
        color="secondary"
        className={classes.progress}
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
