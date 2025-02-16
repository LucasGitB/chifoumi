import { useParams } from "react-router-dom";
import MatchResults from "../components/match/MatchResults";
import { useQuery } from "@tanstack/react-query";
import { matchesService } from "../services/matches.service";

export function MatchResultsPage() {
    const { id } = useParams();
    const userId = localStorage.getItem('userId');

    const { data: match, isLoading, isError } = useQuery({
        queryKey: ['matches', id],
        queryFn: () => matchesService.getMatch(id),
        enabled: !!id,
    });
  
    if (isLoading) {
        return <div>Chargement des résultats...</div>;
    }
  
    if (isError) {
        return <div>Erreur lors de la récupération des résultats du match.</div>;
    }

  return <MatchResults match={match} userId={userId}/>;
}