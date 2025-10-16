'use client';

import React, { useEffect, useState } from 'react';
import { notFound, useRouter } from 'next/navigation';

const VerifyForm = () => {
  const [isPasswordReset, setIsPasswordReset] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>(null);

  const router = useRouter();

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
  return <div>VerifyForm</div>;
};

export default VerifyForm;
