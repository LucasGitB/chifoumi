import { useParams } from 'react-router-dom';
import MatchWaitingPage from './MatchWaitingPage';
import { useMatch } from '../hooks/use-match';
import MatchPlayPage from './MatchPlayPage';
import MatchFinishedPage from './MatchFinishedPage';

export const MatchPage = () => {
  const { id } = useParams();

  const { match, isLoading, isError, makeMove, currentTurn, isMatchFinished } =
    useMatch(id);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (isError) {
    return <div>Erreur</div>;
  }

  if (match.user2 === null) {
    return <MatchWaitingPage />;
  }

  return !isMatchFinished ? (
    <MatchPlayPage match={match} currentTurn={currentTurn} onMove={makeMove} />
  ) : (
    <MatchFinishedPage match={match} />
  );
};
