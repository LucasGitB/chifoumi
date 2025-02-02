import { Outlet, Link as RouterLink } from "react-router-dom";
import logo from "../assets/chifoumi3.png";

export const Layout = () => {
  return (
    <>
      <nav className="bg-blue-900 p-8">
        <RouterLink to="/">
          <img src={logo} alt="" className="w-1/10" />
        </RouterLink>
      </nav>
      <Outlet />
    </>
  );
};
