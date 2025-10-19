'use client';

import { updatePassword } from '@/lib/auth';
import { translateSupabaseError } from '@/utils/errors/supabase-error';
import { newPasswordSchema } from '@/utils/schema/zod-schema';
import { createClient } from '@/utils/supabase/client';
import { useForm } from '@tanstack/react-form';
import React, { useEffect, useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BiSolidError } from 'react-icons/bi';
import { toast } from 'sonner';
import * as z from 'zod';
import LoadingSpinner from '../Common/LoadingSpinner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { FieldInfo } from './FieldInfo';

type formDate = z.infer<typeof newPasswordSchema>;

const defaultValues: formDate = {
  password: '',
  confirmPassword: '',
};

const NewPasswordForm = () => {
  const [togglePassword, setTogglePassword] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    async function checkSession() {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        router.push('/auth/reset-password');
        return;
      }

      if (data.session.user?.email) {
        setUserEmail(data.session.user.email);
      }
    }

    checkSession();
  }, [router]);

  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues,
    validators: {
      onChange: newPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        setIsLoading(true);
        await updatePassword(value.password);

        if (userEmail) {
          await fetch('/api/email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              type: 'password-reset-confirmation',
              email: userEmail,
              origin: window.location.origin,
            }),
          });
        }

        const supabase = createClient();
        await supabase.auth.signOut();

        sessionStorage.removeItem('isPasswordReset');
        router.push('/auth/login');
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

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit();
      }}
    >
      <Field name="password">
        {(field) => (
          <>
            <div className="flex flex-col space-y-3">
              <Label htmlFor={field.name} className="">
                لطفا رمز عبور خود را وارد کنید
              </Label>
              <div className="relative w-full">
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type={togglePassword ? 'text' : 'password'}
                  placeholder="Example*2025"
                  className="w-full"
                />
                <span
                  className="absolute top-1/2 left-3 -translate-y-1/2 inline-flex justify-center items-center size-4 cursor-pointer"
                  onClick={() => {
                    setTogglePassword((prevState) => !prevState);
                  }}
                >
                  {togglePassword ? (
                    <EyeIcon size={14} />
                  ) : (
                    <EyeOffIcon size={14} />
                  )}
                </span>
              </div>
            </div>
            <FieldInfo field={field} />
          </>
        )}
      </Field>

      <Field name="confirmPassword">
        {(field) => (
          <>
            <div className="flex flex-col space-y-3">
              <Label htmlFor={field.name} className="">
                لطفا رمز عبور خود را تکرار کنید
              </Label>
              <div className="relative w-full">
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type={togglePassword ? 'text' : 'password'}
                  placeholder="Example*2025"
                  className="w-full"
                />
                <span
                  className="absolute top-1/2 left-3 -translate-y-1/2 inline-flex justify-center items-center size-4 cursor-pointer"
                  onClick={() => {
                    setTogglePassword((prevState) => !prevState);
                  }}
                >
                  {togglePassword ? (
                    <EyeIcon size={14} />
                  ) : (
                    <EyeOffIcon size={14} />
                  )}
                </span>
              </div>
            </div>
            <FieldInfo field={field} />
          </>
        )}
      </Field>

      <div className="w-full">
        <Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <div className="flex w-full">
              <Button
                variant={'default'}
                type="submit"
                disabled={!canSubmit}
                className="cursor-pointer flex-1"
              >
                {isSubmitting ? 'در حال ثبت نام ...' : 'ثبت نام'}
              </Button>
            </div>
          )}
        </Subscribe>
      </div>
      {isLoading && <LoadingSpinner />}
    </form>
  );
};

export default NewPasswordForm;
