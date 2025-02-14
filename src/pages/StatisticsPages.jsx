import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Alert } from "@mui/material";
import { HeaderTitle } from "../components/HeaderTitle";
import { decodeToken } from "react-jwt";

export const StatisticsPage = () => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [matchInProgress, setMatchInProgress] = useState(null); 
  const navigate = useNavigate();

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

        const response = await axios.get(`${import.meta.env.VITE_URL_API}/matches`, {
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
          `${import.meta.env.VITE_URL_API}/matches/${matchInProgress._id}`,
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
          `${import.meta.env.VITE_URL_API}/matches`,
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
      <HeaderTitle title={"Statistiques"} route="/home" showArrow={true} />
      <div className="flex w-full gap-10 mt-10">
        <div className="flex flex-col bg-white p-8 shadow-lg w-full ml-10 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Parties jouées</h2>
        </div>
        <div className="flex flex-col bg-white p-8 shadow-lg w-full mr-10 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Victoires</h2>

          <h2 className="text-xl font-bold mb-4">Défaites</h2>
        </div>
      </div>
    </>
  );
};
