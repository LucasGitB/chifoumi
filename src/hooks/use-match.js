import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useState } from "react";
import { useMatchEvents } from "./use-match-events";

/**
 * @param {string} matchId
 */
export const useMatch = (matchId) => {
  const queryClient = useQueryClient();

  const {
    data: match,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["matches", matchId],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:3002/matches/${matchId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      return response.data;
    },
  });

  const currentTurn = !Array.isArray(match?.turns) ? 1 : match.turns.length;
  const currentTurnIndex = currentTurn - 1;
  const isCurrentTurnFinished =
    match?.turns[currentTurnIndex]?.winner !== undefined;
  const isMatchFinished = match?.winner !== undefined;

  const handleMatchEvent = useCallback(
    (data) => {
      switch (data.type) {
        case "PLAYER1_JOIN":
        case "PLAYER2_JOIN":
        case "NEW_TURN":
        case "PLAYER1_MOVED":
        case "PLAYER2_MOVED":
        case "TURN_ENDED":
        case "MATCH_ENDED":
          queryClient.invalidateQueries(["matches", matchId]);
          break;
        default:
          console.log("Unhandled event type:", data.type);
      }
    },
    [matchId, queryClient]
  );

  useMatchEvents(matchId, handleMatchEvent);

  const { mutate: makeMove, isLoading: isMakingMove } = useMutation({
    mutationFn: async (move) => {
      const turn = isCurrentTurnFinished ? currentTurn + 1 : currentTurn;

      const response = await axios.post(
        `http://localhost:3002/matches/${matchId}/turns/${turn}`,
        { move },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    },
    onError: (error) => {
      const errorMessage = error.response?.data;
      console.error("Move error:", errorMessage);
    },
  });

  const handleMakeMove = useCallback(
    /**
     * @param {"scissors" | "rock" | "paper"} move
     */
    (move) => {
      if (!isMatchFinished && !isMakingMove) {
        makeMove(move);
      }
    },
    [makeMove, isMatchFinished, isMakingMove]
  );

  return {
    match,
    currentTurn,
    isLoading,
    isError,
    isMakingMove,
    makeMove: handleMakeMove,
    isMatchFinished,
    isCurrentTurnFinished,
  };
};
