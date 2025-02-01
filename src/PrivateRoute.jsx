import { Navigate } from "react-router-dom";

// Composant de protection de route
const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token"); // Vérifie si le token est présent dans le localStorage

  if (!token) {
    return <Navigate to="/login" replace />; // Redirige vers la page de connexion si l'utilisateur n'est pas connecté
  }

  return element; // Sinon, retourne l'élément de la route (la page)
};

export default PrivateRoute;
