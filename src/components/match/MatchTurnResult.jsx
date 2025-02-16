import { useMemo } from "react";
import { movesStrings } from "../../data/moves";

const MatchTurnResult = ({ turn, player1, player2, isPlayer1, onNextTurn }) => {
  const winnerProps = useMemo(() => {
    const isWinner =
      (isPlayer1 && turn.winner === "user1") ||
      (!isPlayer1 && turn.winner === "user2");

    if (turn.winner === "draw") {
      return {
        text: "Match nul !",
        color: "orange",
      };
    }

    if (isWinner) {
      return {
        text: "Vous avez gagné !",
        color: "green",
      };
    }

    return {
      text: "Vous avez perdu !",
      color: "red",
    };
  }, [turn.winner, isPlayer1]);

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-bold">Résultats du tour</h3>

      <div className="flex gap-8 my-4">
        <div className="text-center">
          <div className="font-bold">
            {isPlayer1 ? "Vous" : player1.username}
          </div>
          <div className="mt-2">{movesStrings[turn.user1]}</div>
        </div>
        <div className="text-2xl font-bold">VS</div>
        <div className="text-center">
          <div className="font-bold">
            {!isPlayer1 ? "Vous" : player2.username}
          </div>
          <div className="mt-2">{movesStrings[turn.user2]}</div>
        </div>
      </div>

      <div
        className="text-xl font-bold mt-4"
        style={{ color: winnerProps.color }}
      >
        {winnerProps.text}
      </div>

      <button
        onClick={onNextTurn}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Tour suivant
      </button>
    </div>
  );
};

export default MatchTurnResult;
