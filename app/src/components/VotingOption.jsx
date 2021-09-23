import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  CardContent,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
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
  return (
    <Button
      variant="contained"
      onClick={handleVote}
      color={side === "smooth" ? "primary" : "secondary"}
    >
      {`Vote ${side.charAt(0).toUpperCase() + side.slice(1)}`}
    </Button>
  );
}
