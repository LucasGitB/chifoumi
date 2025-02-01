import { LoginForm } from "../components/login/LoginForm";

export const LoginPage = () => {
  return (
    <>
      <div className="flex justify-center mt-44">
        <div className="p-8 rounded-lg w-1/3 shadow-lg">
          <LoginForm />
        </div>
      </div>
    </>
  );
};
