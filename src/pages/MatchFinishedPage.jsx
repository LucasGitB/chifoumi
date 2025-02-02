import React from "react";
import { Box, Card, CardContent, Grid2, Typography } from "@mui/material";

/**
 * @param {Object} props
 * @param {Object} props.match
 * @param {Object} props.match.user1
 * @param {Object} props.match.user2
 * @param {Array} props.match.turns
 * @returns {JSX.Element}
 */
function MatchFinishedPage({ match }) {
  const scores = match.turns.reduce(
    (acc, turn) => {
      if (turn.winner === match.user1._id) {
        acc.user1Score += 1;
      } else if (turn.winner === match.user2._id) {
        acc.user2Score += 1;
      }
      return acc;
    },
    { user1Score: 0, user2Score: 0 }
  );

  return (
    <Grid2 spacing={2} container>
      <Grid2 size={12}>
        <Typography variant="h1">Match terminé!</Typography>
      </Grid2>

      <Grid2 size={12}>
        <Card>
          <CardContent>
            <Typography variant="h2">Résultat final</Typography>
            <Typography variant="h3">
              {match.user1.username}: {scores.user1Score} points
            </Typography>
            <Typography variant="h3">
              {match.user2.username}: {scores.user2Score} points
            </Typography>
            {match.winner ? (
              <Typography variant="h2" color="primary">
                Vainqueur: {winner.username}
              </Typography>
            ) : (
              <Typography variant="h2" color="secondary">
                Match nul!
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid2>

      <Grid2 size={12}>
        <Card>
          <CardContent>
            <Typography variant="h3">Historique des tours</Typography>
            {match.turns.map((turn, index) => (
              <Box key={turn._id}>
                <Typography>
                  Tour {index + 1}:
                  {turn.winner === match.user1._id
                    ? ` ${match.user1.username} gagne`
                    : turn.winner === match.user2._id
                    ? ` ${match.user2.username} gagne`
                    : " Match nul"}
                </Typography>
                <Typography>
                  {match.user1.username}: {turn.user1} vs {match.user2.username}
                  : {turn.user2}
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
}

export default MatchFinishedPage;
