import { RegisterForm } from "../../components/auth/RegisterForm";
import { AuthLayout } from "../../layouts/AuthLayout";

export const RegisterPage = () => {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
};
