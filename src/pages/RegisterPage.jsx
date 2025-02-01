import { RegisterForm } from "../components/register/RegisterForm";

export const RegisterPage = () => {
  return (
    <>
      <div className="flex justify-center mt-44">
        <div className="p-8 rounded-lg shadow-lg w-1/3">
          <RegisterForm />
        </div>
      </div>
    </>
  );
};
