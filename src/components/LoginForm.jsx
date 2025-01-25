import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";

export const LoginForm = () => {
  return (
    <>
      <h1 className="font-bold text-3xl">Connexion</h1>

      <form className="flex flex-col gap-4 mt-8">
        <TextField
          required
          id="outlined-required"
          label="Pseudo"
          defaultValue="Hello World"
        />

        <TextField
          required
          id="outlined-required"
          label="Mot de passe"
          defaultValue="Hello World"
        />

        <Button
          variant="contained"
          sx={{
            backgroundColor: "black",
            color: "white",
            "&:hover": { backgroundColor: "darkred" },
            width: "50"
          }}
        >
          Connexion
        </Button>

        <Link to="/register">Pas de compte ?</Link>
      </form>
    </>
  );
};
