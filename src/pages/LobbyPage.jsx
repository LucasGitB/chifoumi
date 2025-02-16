import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, CircularProgress, Alert } from "@mui/material";
import { HeaderTitle } from "../components/HeaderTitle";
import { matchesService } from "../services/matches.service";

export const LobbyPage = () => {
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const matchId = searchParams.get("matchId");

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        const match = await matchesService.getMatch(matchId);
        setMatch(match);
      } catch (error) {
        setErrorMessage(
          "Impossible de récupérer les informations de la partie."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMatchData();
  }, [matchId]);

  const handleJoinGame = async () => {
    try {
      const newMatch = await matchesService.createMatch(matchId);

      navigate(`/match/${newMatch._id}`);
    } catch (error) {
      setErrorMessage("Erreur lors de la tentative de rejoindre le match.");
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (errorMessage) {
    return <Alert severity="error">{errorMessage}</Alert>;
  }

  return (
    <div className="container mx-auto p-4">
      <HeaderTitle title={`Lobby: ${match._id}`} />

      <div className="mt-4 p-4 border rounded-lg">
        <h2 className="text-xl font-bold mb-2">En attente de joueurs...</h2>
        <div className="flex justify-between">
          <div>
            <strong>Joueur 1:</strong> {match.user1.username}
          </div>
          <div>
            <strong>Joueur 2:</strong>{" "}
            {match.user2 ? match.user2.username : "En attente..."}
          </div>
        </div>

        {!match.user2 && (
          <div className="mt-4">
            <Button
              variant="contained"
              color="primary"
              onClick={handleJoinGame}
            >
              Rejoindre la partie
            </Button>
          </div>
        )}

        {match.user2 && (
          <div className="mt-4">
            <p className="text-green-600">
              Un deuxième joueur a rejoint la partie !
            </p>
            <Button
              variant="contained"
              onClick={() => navigate(`/match/${match._id}`)}
            >
              Commencer la partie
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
