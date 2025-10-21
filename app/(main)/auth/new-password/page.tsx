import AuthFormContainer from '@/components/Auth/AuthFormContainer';
import NewPasswordForm from '@/components/Auth/NewPasswordForm';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'رمز عبور جدید',
  description: 'اختصاص رمز عبور جدید',
};

const NewPasswordPage = () => {
  return (
    <AuthFormContainer
      title="رمز عبور جدید"
      description="لطفا رمز عبور جدیدی را وارد کنید"
    >
      <NewPasswordForm />
    </AuthFormContainer>
  );
};

export default NewPasswordPage;
