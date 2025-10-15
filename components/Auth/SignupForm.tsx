'use client';

import { signupSchema } from '@/utils/schema/zod-schema';
import { AnyFieldApi, useForm } from '@tanstack/react-form';
import React from 'react';
import Form from 'next/form';
import AuthFormContainer from './AuthFormContainer';

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
    <AuthFormContainer
      title="ثبت نام"
      description="لطفا اطلاعات خود را به دقت وارد کنید"
      footer={<div>footer</div>}
    >
      <Form action="">SignupForm</Form>
    </AuthFormContainer>
  );
};

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em>{field.state.meta.errors.join(',')}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  );
}

export default SignupForm;
