import { LoginForm } from "../components/login/LoginForm";

export const LoginPage = () => {
  return (
    <>
      <div className="flex justify-center mt-44">
        <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
          <LoginForm />
        </div>
      </div>
    </>
  );
};
