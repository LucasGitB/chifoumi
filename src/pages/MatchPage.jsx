import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, CircularProgress, Alert, Typography } from "@mui/material";
import { decodeToken } from "react-jwt";
import { HeaderTitle } from "../components/HeaderTitle";

export const MatchPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPlayerTurn, setIsPlayerTurn] = useState(null);
  const [eventSource, setEventSource] = useState(null);

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setErrorMessage("Veuillez vous connecter.");
          setLoading(false);
          navigate("/login");
          return;
        }

        const decodedToken = decodeToken(token);
        const userId = decodedToken?._id;

        if (!userId) {
          setErrorMessage("ID utilisateur manquant dans le token.");
          setLoading(false);
          navigate("/login");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_URL_API}/matches/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        setMatch(response.data);

        if (response.data.user2) {
          setLoading(false);
          const isPlayer1 = response.data.user1._id === userId;
          const currentTurn = response.data.turns.length + 1;
          const isTurn = currentTurn % 2 === (isPlayer1 ? 1 : 0);
          setIsPlayerTurn(isTurn);
        } else {
          setTimeout(fetchMatchData, 3000);
        }
      } catch (error) {
        setErrorMessage(
          "Erreur lors de la récupération des informations du match."
        );
        setLoading(false);
      }
    };

    const setupSSE = () => {
      const token = localStorage.getItem("token");
      const source = new EventSource(
        `${import.meta.env.VITE_URL_API}/matches/${id}/subscribe`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      source.onopen = () => {
        console.log("SSE connection opened");
      };

      source.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("Notification reçue: ", data);
          if (
            data.type === "NEW_TURN" ||
            data.type === "TURN_ENDED" ||
            data.type === "MATCH_ENDED"
          ) {
            fetchMatchData();
          }
        } catch (parseError) {
          console.error("Error parsing event data:", parseError);
        }
      };

      source.onerror = (err) => {
        console.error("Erreur dans la connexion SSE: ", err);
        source.close();
      };

      setEventSource(source);
    };

    fetchMatchData();
    setupSSE();

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [id, navigate]);

  const handleMoveSubmit = async (move) => {
    if (!isPlayerTurn) {
      setErrorMessage("Ce n'est pas votre tour!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const decodedToken = decodeToken(token);
      const userId = decodedToken?._id;

      if (!userId) {
        setErrorMessage("ID utilisateur manquant dans le token.");
        navigate("/login");
        return;
      }

      const currentTurn = match.turns.length + 1;
      const idTurn = currentTurn;

      await axios.post(
        `${import.meta.env.VITE_URL_API}/matches/${id}/turns/${idTurn}`,
        { move },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setLoading(true);
      const matchResponse = await axios.get(
        `${import.meta.env.VITE_URL_API}/matches/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setMatch(matchResponse.data);

      const isPlayer1 = matchResponse.data.user1._id === userId;
      const isTurn =
        matchResponse.data.turns.length % 2 === (isPlayer1 ? 1 : 0);
      setIsPlayerTurn(isTurn);
    } catch (error) {
      console.error("Erreur lors de la soumission du mouvement", error);
      setErrorMessage("Erreur lors de la soumission du mouvement.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <HeaderTitle title={"Matchmaking"} route="/create-game" showArrow={true} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress />
          <Typography variant="h6" style={{ marginLeft: "20px" }}>
            En attente du deuxième joueur...
          </Typography>
        </div>
      </>
    );
  }

  if (errorMessage) {
    return <Alert severity="error">{errorMessage}</Alert>;
  }

  return (
    <div>
      <h2>Partie ID: {match._id}</h2>
      <p>
        <strong>Joueur 1:</strong> {match.user1.username}
      </p>
      <p>
        <strong>Joueur 2:</strong>{" "}
        {match.user2 ? match.user2.username : "En attente..."}
      </p>

      {match.user2 && (
        <div>
          {isPlayerTurn !== null && (
            <div>
              {isPlayerTurn ? (
                <>
                  <h3>Votre tour !</h3>
                  <div>
                    <Button
                      variant="contained"
                      onClick={() => handleMoveSubmit("Pierre")}
                      style={{ margin: "10px" }}
                    >
                      Pierre
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => handleMoveSubmit("Ciseau")}
                      style={{ margin: "10px" }}
                    >
                      Ciseau
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => handleMoveSubmit("Papier")}
                      style={{ margin: "10px" }}
                    >
                      Papier
                    </Button>
                  </div>
                </>
              ) : (
                <p>Ce n'est pas votre tour !</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
