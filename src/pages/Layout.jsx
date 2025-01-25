import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <h1 className="font-bold">Layout</h1>
      <Outlet />
    </>
  );
};
