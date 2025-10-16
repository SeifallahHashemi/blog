import AuthFormContainer from '@/components/Auth/AuthFormContainer';
import LoginForm from '@/components/Auth/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <AuthFormContainer
      title="ورود"
      description="برای دسترسی به حساب کاربری خود، اطلاعات کاربری خود را وارد کنید"
      footer={
        <div className="w-full inline-flex justify-center items-center gap-1.5 text-center text-xs font-normal">
          اشتراک ندارید؟{' '}
          <Link
            href="/auth/signup"
            className="text-blue-600 hover:underline text-xs font-normal"
          >
            ثبت نام کنید
          </Link>
        </div>
      }
    >
      <LoginForm />
    </AuthFormContainer>
  );
}
