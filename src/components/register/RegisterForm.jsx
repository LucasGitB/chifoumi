import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";

export const RegisterForm = () => {
  return (
    <>
      <h1 className="font-bold text-3xl">Inscription</h1>

      <form className="flex flex-col gap-8 mt-8">
        <TextField required id="outlined-required" label="Pseudo" />

        <TextField required id="outlined-required" label="Mot de passe" />

        <TextField
          required
          id="outlined-required"
          label="Confirmation du mot de passe"
        />

        <Button
          variant="contained"
          sx={{
            backgroundColor: "black",
            color: "white",
            "&:hover": { backgroundColor: "darkred" },
            fontWeight: "bold",
          }}
        >
          S'inscrire
        </Button>

        <Link to="/login">Déjà un compte ?</Link>
      </form>
    </>
  );
};
