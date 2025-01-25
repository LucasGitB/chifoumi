import { Outlet } from "react-router-dom";
import logo from "../assets/chifoumi.png";

export const Layout = () => {
  return (
    <>
      <div className="bg-black">
        <img src={logo} alt="" className="w-1/6" />
      </div>
      <Outlet />
    </>
  );
};
