'use client';

import { otpSchema } from '@/utils/schema/zod-schema';
import { useForm } from '@tanstack/react-form';
import { useEffect, useState } from 'react';
import { notFound, useRouter } from 'next/navigation';
import * as z from 'zod';

type formData = z.infer<typeof otpSchema>;

const defaultValues: formData = {
  otp: '',
};

const VerifyForm = () => {
  const [isPasswordReset, setIsPasswordReset] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>(null);

  const router = useRouter();

  const { Field, handleSubmit, Subscribe, reset } = useForm({
    defaultValues,
    validators: {
      onChange: otpSchema,
    },
  });

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('verificationEmail');

    if (!storedEmail) {
      router.push('/auth/signup');
      return;
    }

    const passwordResetFlag = sessionStorage.getItem('passwordResetFlag');

    setIsPasswordReset(passwordResetFlag === 'true');
    setEmail(storedEmail);
  }, [router]);

  if (!email) {
    return notFound();
  }
  return (
    <>
      <form></form>
    </>
  );
};

export default VerifyForm;
