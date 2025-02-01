// src/components/LobbyRedirect.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const LobbyRedirect = ({ matchId }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (matchId) {
      navigate(`/lobby?matchId=${matchId}`);
    }
  }, [matchId, navigate]);

  return null;
};
