import { Link } from "react-router-dom";
import ActionAreaCard from "../components/ActionAreaCard";
import { HeaderTitle } from "../components/HeaderTitle";
import imageStats from "../assets/logostats.jpg";
import image from "../assets/logojeux.jpg";

const playDescription =
  "Chaque coup peut te couronner maître du hasard ou du calcul malin, qui sortira vainqueur ?";

const statistiqueDescription = "Analyser vos performances afin de rester le grand champion !"

export const HomePage = () => {
  return (
    <>
    <HeaderTitle title="Menu" showArrow={false}/>
      <div className="flex gap-36 justify-center items-center mt-24">
        <Link to="/statistics">
          <ActionAreaCard title={"Statistiques"} description={statistiqueDescription} image={imageStats}/>
        </Link>

        <Link to="/create-game">
          <ActionAreaCard title={"Jouer"} description={playDescription} image={image}/>
        </Link>
      </div>
    </>
  );
};
