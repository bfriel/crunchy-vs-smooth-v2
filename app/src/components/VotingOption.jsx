import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  CardContent,
  Button,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useWallet } from "@solana/wallet-adapter-react";
import React from "react";

const useStyles = makeStyles((theme) => ({
  button: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    fontSize: "1.2rem",
  },
}));

// export default function VotingOption({ side, count, handleVote }) {
//   const classes = useStyles();
//   return (
//     <Card className={classes.root} onClick={handleVote}>
//       <CardActionArea>
//         <CardMedia
//           component="img"
//           height="140"
//           image={`/images/${side}.jpeg`}
//           alt={side}
//         />
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="div">
//             {`Vote ${side.charAt(0).toUpperCase() + side.slice(1)}`}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             {!!count && `${count} votes`}
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//     </Card>
//   );
// }

export default function VotingOption({ side, count, handleVote }) {
  const classes = useStyles();
  const wallet = useWallet();
  return (
    <Box textAlign="center">
      <Button
        variant="contained"
        onClick={handleVote}
        disabled={!wallet.connected}
        size="large"
        color={side === "smooth" ? "primary" : "secondary"}
        className={classes.button}
        // startIcon={<ButtonIcon side={side} />}
      >
        {`Vote ${side.charAt(0).toUpperCase() + side.slice(1)}`}
      </Button>
    </Box>
  );
}
