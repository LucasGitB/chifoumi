import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

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

import PropTypes from 'prop-types';

HeaderTitle.propTypes = {
  title: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  showArrow: PropTypes.bool.isRequired,
};
