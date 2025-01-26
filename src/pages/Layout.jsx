import { Outlet } from "react-router-dom";
import logo from "../assets/chifoumi2.png";

export const Layout = () => {
  return (
    <>
      <div className="bg-blue-300 p-8">
        <img src={logo} alt="" className="w-1/10" />
      </div>
      <Outlet />
    </>
  );
};
