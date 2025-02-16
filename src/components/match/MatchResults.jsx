const MatchResults = ({ match, userId }) => {
    if (match.winner === undefined) {
        return <div>En attente de la fin du match...</div>;
    }

    const scores = match.turns.reduce((scores, turn) => {
        if (turn.winner === "user1") {
            scores.user1 += 1;
        } else if (turn.winner === "user2") {
            scores.user2 += 1;
        }
        return {
            user1: scores.user1,
            user2: scores.user2
        };
    }, { user1: 0, user2: 0 });

    return <>
        <h1>Match entre {match.user1.username}{match.user1._id === userId && "(Vous)"} et {match.user2.username}{match.user2._id === userId && "(Vous)"}</h1>
        <div>
            <h2>Résultat final</h2>
            <h3>
                {match.user1.username}: {scores.user1} points
            </h3>
            <h3>
                {match.user2.username}: {scores.user2} points
            </h3>
            {match.winner ? (
                <h2 color="primary">
                    Vainqueur: {match.winner.username}
                </h2>
            ) : (
                <h2 color="secondary">
                    Match nul!
                </h2>
            )}
        </div>
    </>;
}

export default MatchResults;