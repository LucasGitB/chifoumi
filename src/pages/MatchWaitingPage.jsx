import { Grid2, Typography } from "@mui/material";
import React from "react";

function MatchWaitingPage() {
  return (
    <Grid2
      container
      spacing={2}
      sx={{
        height: "100%",
        width: "100%",
      }}
    >
      <Grid2 size={12}>
        <Typography variant="h1">En attente du joueur 2</Typography>
      </Grid2>
    </Grid2>
  );
}

export default MatchWaitingPage;
