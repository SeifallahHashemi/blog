import AuthFormContainer from '@/components/Auth/AuthFormContainer';
import VerifyForm from '@/components/Auth/VerifyForm';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'تاییدیه',
  description: 'صفحه تاییدیه سایت | وارد کردن کد تاییدیه',
};

const VerifyPage = () => {
  return (
    <AuthFormContainer
      title="تاییدیه ایمیل"
      description="لطفا کد تاییدیه که به ایمیل شما فرستادیم را وارد کنید"
    >
      <VerifyForm />
    </AuthFormContainer>
  );
};

export default VerifyPage;
