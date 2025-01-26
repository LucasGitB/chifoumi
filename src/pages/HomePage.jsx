import { Button } from "@mui/material";
import pierre from "../assets/pierre.png";
import feuille from "../assets/feuille.png";
import ciseaux from "../assets/ciseaux.png";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen flex-col w-full gap-10">
        <h1 className="text-7xl font-bold text-white text-center w-1/2">
          Affronte tes amis et deviens le champion du chifoumi
        </h1>
        <h1 className="text-4xl font-bold text-white text-center w-1/2">Prêt à tenter ta chance ?</h1>

        <Link to="/login" variant="contained" sx={{backgroundColor: "#74c0ff"}}>Se connecter</Link>

        <div className="flex justify-center items-center">
          <img className="scale-50 object-contain" src={pierre} alt="Pierre" />
          <img className="scale-50 object-contain" src={feuille} alt="Feuille" />
          <img className="scale-50 object-contain" src={ciseaux} alt="Ciseaux" />
        </div>
      </div>
    </>
  );
};
