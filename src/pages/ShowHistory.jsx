import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { HeaderTitle } from "../components/HeaderTitle";
import { matchesService } from "../services/matches.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function ShowHistory() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: matches = [], isLoading } = useQuery({
    queryKey: ["matches"],
    queryFn: matchesService.getMatches,
  });

  const joinMatchMutation = useMutation({
    mutationFn: async () => {
      const newMatch = await matchesService.createMatch();
      return newMatch;
    },
    onSuccess: async (match) => {
      queryClient.setQueryData(["matches"], (oldData) => [...oldData, match]);
      await navigate(`/matches/${match._id}`);
    },
    onError: (error) => {
      setErrorMessage(error.message || "Erreur lors de la jonction du match.");
    },
  });

  const handleJoinMatch = (matchId, isMatchFull) => {
    if (!isMatchFull) {
      joinMatchMutation.mutate(matchId);
    } else {
      navigate(`/matches/${matchId}`);
    }
  };

  if (isLoading || joinMatchMutation.isPending) {
    return <CircularProgress />;
  }

  if (errorMessage) {
    return <Alert severity="error">{errorMessage}</Alert>;
  }

  return (
    <>
      <HeaderTitle
        title={"Historique des parties"}
        route="/home"
        showArrow={true}
      />
      <TableContainer component={Paper} className="mt-10 max-w-5xl mx-auto">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Joueur 1</TableCell>
              <TableCell>Joueur 2</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Vainqueur</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matches.map((match) => (
              <TableRow key={match._id}>
                <TableCell>{match.user1?.username || "Inconnu"}</TableCell>
                <TableCell>{match.user2?.username || "En attente"}</TableCell>
                <TableCell>
                  {!match.user2
                    ? "En attente d'un adversaire"
                    : match?.winner === undefined
                    ? "Match en cours"
                    : "Match terminé"}
                </TableCell>
                <TableCell>
                  {match.winner === null
                    ? "Match nul"
                    : match[match.winner]?.username}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#1E3A8A" }}
                    onClick={() => handleJoinMatch(match._id, !!match.user2)}
                  >
                    Rejoindre
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          sx={{ backgroundColor: "#1E3A8A", marginTop: 2 }}
          variant="contained"
          component={Link}
          to="/home"
          // onClick={() => navigate("/home")}
          className="w-full"
        >
          Retour à l'accueil
        </Button>
      </TableContainer>
    </>
  );
}

export default ShowHistory;
