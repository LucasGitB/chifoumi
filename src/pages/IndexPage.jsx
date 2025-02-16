import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { imagesUrls } from "../data/images";

export const IndexPage = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen flex-col w-full gap-10">
        <h1 className="text-7xl font-bold text-center w-1/2">
          Affronte tes amis et deviens le champion du chifoumi
        </h1>
        <h1 className="text-4xl font-bold text-center w-1/2">
          Prêt à tenter ta chance ?
        </h1>

        <Button
          component={Link}
          to="/login"
          variant="contained"
          color="primary"
        >
          Se connecter
        </Button>

        <div className="flex justify-center items-center">
          <img
            className="scale-50 object-contain"
            src={imagesUrls.rock}
            alt="Pierre"
          />
          <img
            className="scale-50 object-contain"
            src={imagesUrls.paper}
            alt="Feuille"
          />
          <img
            className="scale-50 object-contain"
            src={imagesUrls.scissors}
            alt="Ciseaux"
          />
        </div>
      </div>
    </>
  );
};
