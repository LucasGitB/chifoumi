import { CircularProgress, Alert } from "@mui/material";
import { HeaderTitle } from "../components/HeaderTitle";
import { useQuery } from "@tanstack/react-query";
import { matchesService } from "../services/matches.service";
import { useMemo } from "react";

export const StatisticsPage = () => {
  const {
    data: matches,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["matches"],
    queryFn: () => matchesService.getMatches(),
  });

  const stats = useMemo(() => {
    if (!matches) return {};
    const username = localStorage.getItem("username");
    const stats = matches.reduce(
      (acc, match) => {
        return {
          wins: match.winner?.username === username ? acc.wins + 1 : acc.wins,
          defeats:
            match.winner !== null && match.winner.username !== username
              ? acc.defeats + 1
              : acc.defeats,
          draws: match.winner === null ? acc.draws + 1 : acc.draws,
        };
      },
      { wins: 0, defeats: 0, draws: 0 }
    );
    return {
      wins: stats.wins,
      defeats: stats.defeats,
      draws: stats.draws,
      totalGames: matches.length,
    };
  }, [matches]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Alert severity="error">
        {error?.message ||
          joinMatchMutation.error?.message ||
          joinMatchMutation.error?.message ||
          "Une erreur est survenue"}
      </Alert>
    );
  }

  return (
    <>
      <HeaderTitle title={"Statistiques"} route="/home" showArrow={true} />
      <div className="flex w-full gap-10 mt-10">
        <div className="flex flex-col bg-white p-8 shadow-lg w-full ml-10 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Parties jouées</h2>
          <p className="text-3xl font-bold text-blue-600">{stats.totalGames}</p>
        </div>
        <div className="flex flex-col bg-white p-8 shadow-lg w-full mr-10 rounded-lg">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Victoires</h2>
            <p className="text-3xl font-bold text-green-600">{stats.wins}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Défaites</h2>
            <p className="text-3xl font-bold text-red-600">{stats.defeats}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">Matchs nuls</h2>
            <p className="text-3xl font-bold text-yellow-600">{stats.draws}</p>
          </div>
        </div>
      </div>
    </>
  );
};
