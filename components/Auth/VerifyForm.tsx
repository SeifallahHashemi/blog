'use client';

import { ResendButton } from '@/components/Auth/ResendButton';
import { verifyOtp } from '@/lib/auth';
import { translateSupabaseError } from '@/utils/errors/supabase-error';
import { otpSchema } from '@/utils/schema/zod-schema';
import { useForm } from '@tanstack/react-form';
import { useEffect, useState } from 'react';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { useRouter } from 'next/navigation';
import { BiSolidError } from 'react-icons/bi';
import { toast } from 'sonner';
import * as z from 'zod';
import LoadingSpinner from '../Common/LoadingSpinner';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import { Label } from '../ui/label';
import { FieldInfo } from './FieldInfo';

type formData = z.infer<typeof otpSchema>;

const defaultValues: formData = {
  otp: '',
};

const VerifyForm = () => {
  const [isPasswordReset] = useState<boolean>(
    () => sessionStorage.getItem('isPasswordReset') === 'true'
  );
  const [email] = useState<string | null>(() =>
    sessionStorage.getItem('verificationEmail')
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const { Field, handleSubmit, Subscribe } = useForm({
    defaultValues,
    validators: {
      onChange: otpSchema,
    },
    onSubmit: async ({ value }) => {
      if (!email) return;

      try {
        setIsLoading(true);
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
      } catch (error) {
        setIsLoading(false);
        if (error instanceof Error) {
          const message = translateSupabaseError(error);
          toast('خطای اعتبارسنجی', {
            className: 'flex flex-row-reverse text-right gap-x-4 space-x-4',
            description: message,
            duration: 5000,
            icon: <BiSolidError className="text-red-500 ml-2" size={24} />,
          });
        } else {
          toast('خطا در برقراری ارتباط با سرور', {
            className: '',
            description: 'ورود به سیستم با خطا مواجه شد. لطفا مجددا تلاش کنید',
            duration: 5000,
            icon: <BiSolidError className="text-red-500" size={16} />,
          });
        }
      }
    },
  });

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('verificationEmail');

    if (!storedEmail) {
      router.push('/auth/signup');
    }
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

  console.log(email);

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
            {() => <ResendButton onResend={resendOtp} />}
          </Subscribe>
        </div>
      </form>
      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default VerifyForm;
