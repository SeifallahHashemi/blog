import AuthFormContainer from '@/components/Auth/AuthFormContainer';
import VerifyForm from '@/components/Auth/VerifyForm';
import React from 'react';

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
