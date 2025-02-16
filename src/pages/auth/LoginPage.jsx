import { LoginForm } from "../../components/auth/LoginForm";
import { AuthLayout } from "../../layouts/AuthLayout";

export const LoginPage = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};
