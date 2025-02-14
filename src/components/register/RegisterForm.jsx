import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    setErrorMessage("");

    try {
      const response = await axios.post(`${import.meta.env.VITE_URL_API}/register`, {
        username,
        password,
      });

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(
          error.response.data.error || "Erreur lors de l'inscription."
        );
      } else {
        setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
      }
    }
  };

  return (
    <>
      <h1 className="font-bold text-3xl">Inscription</h1>

      <form className="flex flex-col gap-8 mt-8" onSubmit={handleSubmit}>
        {errorMessage && (
          <div className="text-red-500 bg-red-200 p-2 rounded-lg flex gap-2">
            <ReportProblemIcon />
            {errorMessage}
          </div>
        )}

        <TextField
          className="bg-white"
          required
          id="outlined-required"
          label="Pseudo"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          className="bg-white"
          required
          id="outlined-required"
          label="Mot de passe"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <TextField
          className="bg-white"
          required
          id="outlined-required"
          label="Confirmation du mot de passe"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1E3A8A",
            color: "white",
            "&:hover": { backgroundColor: "darkblue" },
            fontWeight: "bold",
          }}
          type="submit"
        >
          S'inscrire
        </Button>

        <Link to="/login">Déjà un compte ?</Link>
      </form>
    </>
  );
};
