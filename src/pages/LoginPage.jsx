import { LoginForm } from "../components/login/LoginForm";

export const LoginPage = () => {
  return (
    <>
      <div className="flex justify-center mt-44">
        <div className="bg-blue-300 p-8 rounded-lg w-1/3 border-1">
          <LoginForm />
        </div>
      </div>
    </>
  );
};
