'use client';

import React from 'react';
import Form from 'next/form';
import { useForm } from '@tanstack/react-form'
import { signupSchema } from '@/utils/schema/zod-schema';

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
      
    }
  })
  return <Form action="">SignupForm</Form>;
};

export default SignupForm;
