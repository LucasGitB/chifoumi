import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { matchesService } from "../services/matches.service";
import { useMatchEvents } from "../hooks/useMatchEvents";
import { HeaderTitle } from "../components/HeaderTitle";
import MatchWaitingRoom from "../components/match/MatchWaitingRoom";
import MatchTurnResult from "../components/match/MatchTurnResult";
import MatchWaitingOpponentTurn from "../components/match/MatchWaitingOpponentTurn";
import { movesStrings } from "../data/moves";
import pierre from "../assets/pierre.png";
import feuille from "../assets/feuille.png";
import ciseaux from "../assets/ciseaux.png";
import ActionGameCard from "../components/match/ActionGameCard";

const moves = {
  rock: { image: pierre, color: "rgba(231, 29, 54, 0.8)" }, // Red
  paper: { image: feuille, color: "rgba(171, 225, 136, 0.7)" }, // Green
  scissors: { image: ciseaux, color: "rgba(33, 145, 251, 0.7)" }, // Blue
};

export const MatchPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [currentTurn, setCurrentTurn] = useState(1);
  const [playerMove, setPlayerMove] = useState(null);

  const {
    data: match,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["matches", id],
    queryFn: () => matchesService.getMatch(id),
    enabled: !!id,
  });

  const { mutate: playTurn } = useMutation({
    mutationFn: ({ matchId, turnId, move }) =>
      matchesService.playTurn(matchId, turnId, move),
  });

  useEffect(() => {
    if (match) {
      setCurrentTurn(match.turns.length + 1);
    }
  }, [match]);

  const isPlayer1 = match?.user1._id === userId;
  const opponent = isPlayer1 ? match?.user2 : match?.user1;
  const currentTurnData = match?.turns[currentTurn - 1] || {};
  const hasPlayerMoved = isPlayer1
    ? !!currentTurnData.user1
    : !!currentTurnData.user2;

  useMatchEvents(id, {
    onPlayer2Join: () => {
      refetch();
    },
    onTurnEnded: ({ newTurnId }) => {
      setCurrentTurn(newTurnId);
      setPlayerMove(null);
      refetch();
    },
    onMatchEnded: () => {
      navigate(`/matches/${id}/results`);
    },
  });

  const handleMove = (move) => {
    if (hasPlayerMoved) return;

    playTurn({
      matchId: id,
      turnId: currentTurn,
      move,
    });
    setPlayerMove(move);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">Chargement...</div>
    );
  }

  if (!match.user2) {
    return (
      <>
        <HeaderTitle title="En attente" route="/create-game" showArrow={true} />
        <MatchWaitingRoom />
      </>
    );
  }

  const showTurnResults = currentTurnData.user1 && currentTurnData.user2;
  const showWaitingOpponent = hasPlayerMoved && !showTurnResults;

  return (
    <>
      <HeaderTitle
        title={`Tour ${currentTurn}`}
        route="/create-game"
        showArrow={true}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-8">
          {showTurnResults ? (
            <MatchTurnResult
              turn={currentTurnData}
              player1={match.user1}
              player2={match.user2}
              isPlayer1={isPlayer1}
              onNextTurn={() => setPlayerMove(null)}
            />
          ) : showWaitingOpponent ? (
            <MatchWaitingOpponentTurn
              playerMove={movesStrings[playerMove]}
              opponentName={opponent.username}
            />
          ) : (
            <div className="w-full max-w-2xl">
              <h2 className="text-xl font-bold mb-6 text-center">
                Choisissez votre coup
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(moves).map(([moveKey, { image, color }]) => (
                  <button
                    key={moveKey}
                    onClick={() => handleMove(moveKey)}
                    disabled={hasPlayerMoved}
                    className={`group flex flex-col items-center ${
                      hasPlayerMoved ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <div>
                      <ActionGameCard
                        image={image}
                        altText={movesStrings[moveKey]}
                        color={color}
                        className="w-full h-full transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="text-center mt-2 font-medium w-full ">
                      {movesStrings[moveKey]}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MatchPage;
