'use client';

import { signupSchema } from '@/utils/schema/zod-schema';
import { useForm } from '@tanstack/react-form';
import React from 'react';
import Form from 'next/form';
import * as z from 'zod';
import AuthFormContainer from './AuthFormContainer';

// type FormData = z.infer<typeof signupSchema>

const SignupForm = () => {
  const {} = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validators: {
      onChange: signupSchema,
      onBlur: signupSchema,
      onSubmit: signupSchema,
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  return (
    <AuthFormContainer title='ثبت نام' description='لطفا اطلاعات خود را به دقت وارد کنید' footer={<div>footer</div>}>
      <Form action="">SignupForm</Form>
    </AuthFormContainer>
  );
};

export default SignupForm;
