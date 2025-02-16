import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

/**
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {string} props.route
 * @param {boolean} props.showArrow
 * @returns
 */
export const HeaderTitle = ({ title, route, showArrow }) => {
  return (
    <div className="w-full h-14 bg-white flex px-8 items-center gap-8">
      {showArrow && (
        <Link to={route}>
          <ArrowBackIcon />
        </Link>
      )}
      <h1 className="font-bold text-2xl">{title}</h1>
    </div>
  );
};
