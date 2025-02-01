// src/components/CreateGameButton.js
import { useState } from "react";
import { Button, CircularProgress, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CreateGameButton = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleCreateGame = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:3002/matches",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        navigate(`/lobby?matchId=${response.data._id}`);
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.match || "Erreur lors de la création du match."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-8">
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <Button
        variant="contained"
        sx={{
          backgroundColor: "black",
          color: "white",
          "&:hover": { backgroundColor: "darkred" },
          fontWeight: "bold",
        }}
        onClick={handleCreateGame}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Créer une partie"}
      </Button>
    </div>
  );
};
