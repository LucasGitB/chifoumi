import { LoginForm } from "../components/login/LoginForm";
import { AuthLayout } from "../layouts/AuthLayout";

export const LoginPage = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};