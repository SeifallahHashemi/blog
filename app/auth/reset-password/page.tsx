import AuthFormContainer from '@/components/Auth/AuthFormContainer';
import ResetPassword from '@/components/Auth/ResetPassword';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'بازیابی رمز عبور',
  description: 'صفحه بازیابی رمز عبور | ارسال لینک بازیابی به ایمیل',
};

const ResetPasswordPage = () => {
  return (
    <AuthFormContainer
      title="بازیابی رمز عبور"
      description="لطفا ایمیل خود را جهت بازیابی رمز عبور وارد کنید"
    >
      <ResetPassword />
    </AuthFormContainer>
  );
};

export default ResetPasswordPage;
