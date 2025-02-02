import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, CircularProgress, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { HeaderTitle } from "../components/HeaderTitle";
import { decodeToken } from "react-jwt";

function ShowHistory() {
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [matches, setMatches] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setErrorMessage("Veuillez vous connecter.");
                    setLoading(false);
                    navigate("/login");
                    return;
                }

                const decodedToken = decodeToken(token);
                const userId = decodedToken?._id;

                if (!userId) {
                    setErrorMessage("ID utilisateur manquant dans le token.");
                    setLoading(false);
                    navigate("/login");
                    return;
                }

                const response = await axios.get("http://localhost:3002/matches", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setMatches(response.data);
            } catch (error) {
                setErrorMessage("Erreur lors de la récupération de l'historique des parties.");
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [navigate]);

    const handleJoinMatch = async (matchId, isMatchFull) => {
        setLoading(true);
        setErrorMessage("");

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setErrorMessage("Veuillez vous connecter.");
                setLoading(false);
                return;
            }

            if (!isMatchFull) {
                // Rejoindre une partie en attente
                await axios.post("http://localhost:3002/matches", {}, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }

            // Rediriger vers la partie
            navigate(`/matches/${matchId}`);
        } catch (error) {
            setErrorMessage("Erreur lors de la jonction du match.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (errorMessage) {
        return <Alert severity="error">{errorMessage}</Alert>;
    }

    return (
        <>
            <HeaderTitle title={"Historique des parties"} route="/home" showArrow={true} />
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
                                    {match.user2 ? "Terminé" : "En attente d'un adversaire"}
                                </TableCell>
                                <TableCell>
                                    {match.winner?.username || "Pas encore de gagnant"}
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
                    onClick={() => navigate("/home")}
                    className="w-full"
                >
                    Retour à l'accueil
                </Button>
            </TableContainer>
        </>
    );
}

export default ShowHistory;
