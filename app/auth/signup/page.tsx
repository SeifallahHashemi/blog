import SignupForm from '@/components/Auth/SignupForm';
import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ثبت نام',
  description: 'ساخت اکانت جدید در سایت',
};

const SignupPage = () => {
  return <SignupForm />;
};

export default SignupPage;
