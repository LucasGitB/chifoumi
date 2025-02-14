import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, CircularProgress, Alert } from "@mui/material";
import { HeaderTitle } from "../components/HeaderTitle";
import { decodeToken } from "react-jwt";
import ActionGameButton from "../components/ActionGameButton";
import pierre from "../assets/pierre.png";
import feuille from "../assets/feuille.png";
import ciseaux from "../assets/ciseaux.png";

export const CreateGamePage = () => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [matchInProgress, setMatchInProgress] = useState(null);
  const navigate = useNavigate();

  const [playerMove, setPlayerMove] = useState("");

  const handleMove = (move) => {
    setPlayerMove(move);
    console.log(move);
  };

  useEffect(() => {
    const fetchMatchStatus = async () => {
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

        const response = await axios.get("http://localhost:3002/matches", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const availableMatch = response.data.find(
          (match) => match.user2 === null && match.user1._id !== userId
        );

        setMatchInProgress(availableMatch || null);
      } catch (error) {
        setErrorMessage("Erreur lors de la récupération des parties.");
      } finally {
        setLoading(false);
      }
    };

    fetchMatchStatus();
  }, [navigate]);

  const handlePlayGame = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("Veuillez vous connecter.");
        setLoading(false);
        return;
      }

      const decodedToken = decodeToken(token);
      const userId = decodedToken?._id;

      if (!userId) {
        setErrorMessage("ID utilisateur manquant dans le token.");
        setLoading(false);
        return;
      }

      if (matchInProgress) {
        const response = await axios.post(
          `http://localhost:3002/matches/${matchInProgress._id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 201) {
          navigate(`/match/${matchInProgress._id}`);
        }
      } else {
        const response = await axios.post(
          "http://localhost:3002/matches",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 201 && response.data._id) {
          navigate(`/match/${response.data._id}`);
        }
      }
    } catch (error) {
      setErrorMessage("Erreur lors de la création ou de la jonction du match.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (errorMessage) {
    return <Alert severity="error">{errorMessage}</Alert>;
  }

  return (
    <>
      <HeaderTitle title={"Jouer"} route="/home" showArrow={true} />
      <div className="flex justify-center items-center mt-24 gap-10">
        <ActionGameButton
          image={pierre}
          altText="Pierre"
          color={"rgba(50, 255, 0, 0.5)"}
          move="rock"
          onClick={handleMove}
        />
        <ActionGameButton
          image={feuille}
          altText="Feuille"
          color={"rgba(255, 0, 0, 0.5)"}
          move="paper"
          onClick={handleMove}
        />
        <ActionGameButton
          image={ciseaux}
          altText="Ciseaux"
          color={"rgba(0, 191, 255, 0.5)"}
          move="scissors"
          onClick={handleMove}
        />
      </div>
      <div className="flex w-full gap-10 mt-10">
        <div className="flex flex-col bg-white p-8 shadow-lg w-full ml-10 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Rejoindre une partie</h2>
          <p>Il n'y a pas de partie en cours</p>
        </div>
        <div className="flex flex-col bg-white p-8 shadow-lg w-full mr-10 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Créer une partie</h2>
          <Button
            sx={{ backgroundColor: "#1E3A8A" }}
            variant="contained"
            onClick={handlePlayGame}
          >
            {matchInProgress
              ? "Rejoindre la partie"
              : "Créer une nouvelle partie"}
          </Button>
        </div>
      </div>
    </>
  );
};
