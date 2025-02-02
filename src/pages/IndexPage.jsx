import pierre from "../assets/pierre.png";
import feuille from "../assets/feuille.png";
import ciseaux from "../assets/ciseaux.png";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const IndexPage = () => {
  return (
    <main className="flex justify-center items-center h-full w-full p-4">
      <div className="flex flex-col items-center gap-10">
        <Typography variant="h1" component="h1" className="text-center w-1/2">
          Affronte tes amis et deviens le champion du chifoumi
        </Typography>
        <Typography variant="h4" component="p">
          Prêt à tenter ta chance ?
        </Typography>

        <Button component={RouterLink} variant="contained" to="/login">
          Se connecter
        </Button>

        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 md:gap-12 lg:gap-16">
          <img
            className="w-24 sm:w-32 md:w-40 lg:w-48 object-contain"
            src={pierre}
            alt="Pierre"
          />
          <img
            className="w-24 sm:w-32 md:w-40 lg:w-48 object-contain"
            src={feuille}
            alt="Feuille"
          />
          <img
            className="w-24 sm:w-32 md:w-40 lg:w-48 object-contain"
            src={ciseaux}
            alt="Ciseaux"
          />
        </div>
      </div>
    </main>
  );
};
