import { Link } from "react-router-dom";
import { HeaderTitle } from "../components/HeaderTitle";
import imageStats from "../assets/logostats.jpg";
import image from "../assets/logojeux.jpg";
import { AreaCardMenu } from "../components/AreaCardMenu";

const playDescription =
  "Chaque coup peut te couronner maître du hasard ou du calcul malin, qui sortira vainqueur ?";

const statistiqueDescription =
  "Analyser vos performances afin de rester le grand champion !";

export const HomePage = () => {
  return (
    <>
      <HeaderTitle title="Menu" showArrow={false} />
      <div className="flex flex-col md:flex-row gap-8 md:gap-36 justify-center items-center mt-24">
        <Link to="/statistics">
          <AreaCardMenu
            description={statistiqueDescription}
            title={"Statistiques"}
            image={imageStats}
          />
        </Link>

        <Link to="/create-game">
          <AreaCardMenu
            description={playDescription}
            title={"Jouer"}
            image={image}
          />
        </Link>
      </div>
    </>
  );
};
