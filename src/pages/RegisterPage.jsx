import { RegisterForm } from "../components/register/RegisterForm";
import { AuthLayout } from "../layouts/AuthLayout";

export const RegisterPage = () => {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
};
