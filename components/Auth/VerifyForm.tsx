'use client';

import { verifyOtp } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { otpSchema } from '@/utils/schema/zod-schema';
import { useForm } from '@tanstack/react-form';
import { useEffect, useState } from 'react';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { notFound, useRouter } from 'next/navigation';
import * as z from 'zod';
import { Button } from '../ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import { Label } from '../ui/label';
import { FieldInfo } from './FieldInfo';

type formData = z.infer<typeof otpSchema>;

const defaultValues: formData = {
  otp: '',
};

const VerifyForm = () => {
  const [isPasswordReset, setIsPasswordReset] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);

  const router = useRouter();

  const { Field, handleSubmit, Subscribe } = useForm({
    defaultValues,
    validators: {
      onChange: otpSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value.otp);
      if (!email) return;

      await verifyOtp({ email, otp: value.otp });
      sessionStorage.removeItem('verificationEmail');

      if (isPasswordReset) {
        router.push('/auth/reset-password');
      } else {
        sessionStorage.removeItem('isPasswordReset');

        await fetch('/api/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'welcome',
            email,
            origin: window.location.origin,
          }),
        });

        router.push('/dashboard');
      }
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

  async function resendOtp() {
    if (!email) return;

    await fetch('/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'verification',
        email,
        isPasswordReset: isPasswordReset,
      }),
    });
  }

  useEffect(() => {
    if (timeLeft <= 0) {
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  if (!email) {
    return notFound();
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSubmit();
        }}
      >
        <Field name="otp">
          {(field) => (
            <>
              <div
                className="flex flex-col justify-center items-center my-1 space-y-3"
                dir="ltr"
              >
                <Label htmlFor={field.name}>لطفا کد تایید را وارد کنید</Label>
                <InputOTP
                  maxLength={8}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    field.handleChange(e);

                    if (e.length === 8) {
                      handleSubmit();
                    }
                  }}
                >
                  <InputOTPGroup>
                    {Array.from({ length: 8 }).map((_, i) => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <FieldInfo field={field} />
            </>
          )}
        </Field>

        <div className="w-full flex justify-center items-center mt-6">
          <Subscribe selector={(state) => state.canSubmit}>
            {() => (
              <Button
                type="button"
                disabled={timeLeft !== 0}
                variant={'default'}
                onClick={resendOtp}
                className={cn('', {
                  '!cursor-not-allowed': timeLeft !== 0,
                  '!cursor-pointer': timeLeft === 0,
                })}
              >
                {timeLeft !== 0
                  ? `${timeLeft} ثانیه تا ارسال مجدد`
                  : 'ارسال مجدد کد'}
              </Button>
            )}
          </Subscribe>
        </div>
      </form>
    </>
  );
};

export default VerifyForm;
