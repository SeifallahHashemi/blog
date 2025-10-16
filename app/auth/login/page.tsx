import AuthFormContainer from '@/components/Auth/AuthFormContainer';
import LoginForm from '@/components/Auth/LoginForm';

export default function LoginPage() {
  return (
    <AuthFormContainer
      title="ورود"
      description="برای دسترسی به حساب کاربری خود، اطلاعات کاربری خود را وارد کنید"
    >
      <LoginForm />
    </AuthFormContainer>
  );
}
