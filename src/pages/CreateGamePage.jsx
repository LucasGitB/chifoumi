import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import { HeaderTitle } from "../components/HeaderTitle";
import { matchesService } from "../services/matches.service";
import { useQuery } from "@tanstack/react-query";

export const CreateGamePage = () => {
  const navigate = useNavigate();

  const {
    data: matches,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["matches"],
    queryFn: async () => {
      const response = await matchesService.getMatches();
      return response;
    },
  });

  const matchInProgress = isSuccess ? matches?.at(-1) : null;
  const isMatchFinished = matchInProgress?.winner !== undefined;

  const handlePlayGame = useCallback(async () => {
    if (matchInProgress && !isMatchFinished) {
      navigate(`/matches/${matchInProgress._id}`);
    } else {
      const newMatch = await matchesService.createMatch();
      navigate(`/matches/${newMatch._id}`);
    }
  }, [isMatchFinished, matchInProgress, navigate]);

  return (
    <>
      <HeaderTitle title={"Jouer"} route="/home" showArrow={true} />
      <div className="flex w-full gap-10 mt-10">
        <div className="flex flex-col bg-white p-8 shadow-lg w-full rounded-lg">
          <h2 className="text-xl font-bold mb-4">Créer une partie</h2>
          <Button
            sx={{ backgroundColor: "#1E3A8A" }}
            variant="contained"
            onClick={handlePlayGame}
            disabled={isLoading || isError}
          >
            {isLoading ? (
              <CircularProgress size={24} />
            ) : isMatchFinished ? (
              "Créer une nouvelle partie"
            ) : (
              "Rejoindre la partie"
            )}
          </Button>
        </div>
        <div className="flex flex-col bg-white p-8 shadow-lg w-full rounded-lg">
          <h2 className="text-xl font-bold mb-4">Historique des parties</h2>
          <Button
            sx={{ backgroundColor: "#1E3A8A" }}
            variant="contained"
            onClick={() => navigate("/history")}
          >
            Voir l'historique des parties
          </Button>
        </div>
      </div>
      {/* {errorMessage && <Alert severity='error'>{errorMessage}</Alert>/} */}
    </>
  );
};
