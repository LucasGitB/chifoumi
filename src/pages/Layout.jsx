import { Outlet } from "react-router-dom";
import logo from "../assets/chifoumi3.png";

export const Layout = () => {
  return (
    <>
      <div className="bg-blue-900 p-8">
        <img src={logo} alt="" className="w-50" />
      </div>
      <Outlet />
    </>
  );
};
