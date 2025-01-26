import { Link } from "react-router-dom";
import ActionAreaCard from "../components/ActionAreaCard";

const description =
  "Prêt à défier tes amis dans un duel de stratégie rapide et fun ? Viens jouer au chifoumi, où chaque coup peut te couronner maître du hasard ou du calcul malin – pierre, papier, ou ciseaux... qui sortira vainqueur ? 🎮✊✋✌️";

export const LobbyPage = () => {
  return (
    <>
      <div className="flex gap-14 justify-center items-center mt-24">
        <Link to="/create-game">
          <ActionAreaCard title={"Jouer"} description={description} />
        </Link>

        <Link to="/create-game">
          <ActionAreaCard title={"Jouer"} description={description} />
        </Link>
      </div>
    </>
  );
};
