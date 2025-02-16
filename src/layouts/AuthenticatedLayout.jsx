import { Outlet, Link as RouterLink } from "react-router-dom";

export const AuthenticatedLayout = () => {
  return (
    <>
      <nav className="bg-blue-900 p-8">
        <RouterLink to="/home">
          <img
            src="/assets/logo-chifoumi.png"
            alt="Chifoumi"
            className="w-1/10"
          />
        </RouterLink>
      </nav>
      <Outlet />
    </>
  );
};
