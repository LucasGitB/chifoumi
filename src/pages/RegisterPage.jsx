import { RegisterForm } from "../components/RegisterForm";

export const RegisterPage = () => {
  return (
    <>
      <div className="flex justify-center mt-44">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <RegisterForm />
        </div>
      </div>
    </>
  );
};
