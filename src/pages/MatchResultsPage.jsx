import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { matchesService } from "../services/matches.service";
import { HeaderTitle } from "../components/HeaderTitle";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Trophy, User2, XCircle } from "lucide-react";
import { imagesUrls } from "../data/images";
import { movesStrings } from "../data/moves";

const ResultCard = ({ title, children, bgColor = "bg-white" }) => (
  <div className={`p-6 rounded-lg shadow-md ${bgColor}`}>
    <h3 className="text-lg font-semibold mb-3">{title}</h3>
    {children}
  </div>
);

const PlayerScore = ({ username, score, isWinner, isCurrentUser }) => (
  <div
    className={`flex items-center gap-3 ${isWinner ? "text-green-600" : ""}`}
  >
    <User2 size={20} />
    <span className="font-medium">
      {username} {isCurrentUser && "(Vous)"}
    </span>
    <span className="text-xl font-bold ml-auto">{score}</span>
    {isWinner && <Trophy className="text-yellow-500" size={20} />}
  </div>
);

const MoveDisplay = ({ move }) => {
  if (!move) return null;
  return (
    <div className="flex items-center gap-2">
      <img
        src={imagesUrls[move]}
        alt={move}
        className="w-8 h-8 object-contain"
      />
      <span className="capitalize">{movesStrings[move]}</span>
    </div>
  );
};

export function MatchResultsPage() {
  const { id } = useParams();
  const userId = localStorage.getItem("userId");

  const {
    data: match,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["matches", id],
    queryFn: () => matchesService.getMatch(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-lg">Chargement des résultats...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <XCircle size={48} className="text-red-500" />
        <div className="text-lg text-red-600">
          Erreur lors de la récupération des résultats du match.
        </div>
      </div>
    );
  }

  const scores = match.turns.reduce(
    (acc, turn) => {
      if (turn.winner === "user1") acc.user1++;
      else if (turn.winner === "user2") acc.user2++;
      return acc;
    },
    { user1: 0, user2: 0 }
  );

  return (
    <>
      <HeaderTitle
        title="Résultats du match"
        route="/create-game"
        showArrow={true}
      />

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-6">
          <ResultCard title="Résumé du match">
            <div className="space-y-4">
              <PlayerScore
                username={match.user1.username}
                score={scores.user1}
                isWinner={match.winner?._id === match.user1._id}
                isCurrentUser={match.user1._id === userId}
              />
              <PlayerScore
                username={match.user2.username}
                score={scores.user2}
                isWinner={match.winner?._id === match.user2._id}
                isCurrentUser={match.user2._id === userId}
              />

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="text-center text-lg font-bold">
                  {match.winner ? (
                    <div className="flex items-center justify-center gap-2">
                      <Trophy size={24} className="text-yellow-500" />
                      <span className="text-green-600">
                        Vainqueur : {match.winner.username}
                        {match.winner._id === userId && " (Vous)"}
                      </span>
                    </div>
                  ) : (
                    <span className="text-orange-600">Match nul !</span>
                  )}
                </div>
              </div>
            </div>
          </ResultCard>

          <ResultCard title="Historique des tours">
            <div className="space-y-3">
              {match.turns.map((turn, index) => (
                <div
                  key={index}
                  className="flex flex-col p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Tour {index + 1}</span>
                    <span
                      className={`font-medium px-3 py-1 rounded-full ${
                        turn.winner === "draw"
                          ? "bg-orange-100 text-orange-600"
                          : turn.winner === "user1"
                          ? match.user1._id === userId
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                          : match.user2._id === userId
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {turn.winner === "draw"
                        ? "Égalité"
                        : turn.winner === "user1"
                        ? `${match.user1.username} gagne`
                        : `${match.user2.username} gagne`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center px-4">
                    <div className="flex flex-col items-center">
                      <span className="text-sm text-gray-600 mb-1">
                        {match.user1.username}
                      </span>
                      <MoveDisplay move={turn.user1} />
                    </div>
                    <div className="text-gray-400 font-bold">VS</div>
                    <div className="flex flex-col items-center">
                      <span className="text-sm text-gray-600 mb-1">
                        {match.user2.username}
                      </span>
                      <MoveDisplay move={turn.user2} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ResultCard>

          <div className="flex gap-4 mt-8">
            <Button
              component={Link}
              to="/create-game"
              variant="contained"
              sx={{
                flex: 1,
                backgroundColor: "#1E3A8A",
                "&:hover": { backgroundColor: "#1E40AF" },
              }}
            >
              Nouvelle partie
            </Button>
            <Button
              component={Link}
              to="/history"
              variant="outlined"
              sx={{
                flex: 1,
                borderColor: "#1E3A8A",
                color: "#1E3A8A",
                "&:hover": {
                  borderColor: "#1E40AF",
                  backgroundColor: "#EFF6FF",
                },
              }}
            >
              Voir l'historique
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MatchResultsPage;
