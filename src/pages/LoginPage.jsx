import { LoginForm } from "../components/LoginForm";

export const LoginPage = () => {
  return (
    <>
      <div className="flex justify-center mt-44 mx-96">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full">
          <LoginForm />
        </div>
      </div>
    </>
  );
};
