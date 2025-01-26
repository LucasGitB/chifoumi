import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

export const HeaderTitle = ({ title }) => {
  return (
    <>
      <div className="w-full h-14 bg-white flex px-8 items-center gap-8">
        <Link to="/login"><ArrowBackIcon /></Link>
        <h1 className="font-bold text-2xl">{title}</h1>
      </div>
    </>
  );
};
