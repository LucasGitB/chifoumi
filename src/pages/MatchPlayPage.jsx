import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import React, { useCallback } from "react";

/**
 *
 * @param {Object} props
 * @param {Object} props.match
 * @param {number} props.currentTurn
 * @param {(move: "scissors" | "rock" | "paper") => void} props.onMove
 * @returns
 */
function MatchPlayPage({ match, currentTurn, onMove }) {
  const handleMove = useCallback(
    /**
     *
     * @param {"scissors" | "rock" | "paper"} move
     * @returns
     */
    (move) => () => onMove(move),
    [onMove]
  );

  return (
    <Grid2 spacing={2} container>
      <Grid2 size={12}>
        <Typography variant="h1">
          {match.user1?.username} vs {match.user2?.username}
        </Typography>
        <Typography variant="h2">Tour en cours: {currentTurn} / 3</Typography>
      </Grid2>
      <Grid2 size={12}>
        <Card>
          <CardHeader title="Sélectionner le coup" />
          <CardContent>
            <Stack spacing={2} direction="row">
              <Button variant="contained" onClick={handleMove("scissors")}>
                Ciseaux
              </Button>
              <Button variant="contained" onClick={handleMove("rock")}>
                Pierre
              </Button>
              <Button variant="contained" onClick={handleMove("paper")}>
                Feuille
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Grid2>

      <Grid2 size={12}>
        <Card>
          <CardContent>
            {match.turns.length === 0 && (
              <Typography>Le match n'a pas commencé</Typography>
            )}
            {match.turns.map((turn) => (
              <Box key={turn._id}>{JSON.stringify(turn)}</Box>
            ))}
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
}

export default MatchPlayPage;
