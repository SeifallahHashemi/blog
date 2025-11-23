'use client';

import LoadingSpinner from '@/components/Common/LoadingSpinner';
import { translateSupabaseError } from '@/utils/errors/supabase-error';
import { signupSchema } from '@/utils/schema/zod-schema';
import { AuthApiError } from '@supabase/supabase-js';
import { useForm } from '@tanstack/react-form';
import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BiSolidError } from 'react-icons/bi';
import { IoFingerPrint } from 'react-icons/io5';
import { toast } from 'sonner';
import * as z from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import AuthFormContainer from './AuthFormContainer';
import { FieldInfo } from './FieldInfo';

type FormData = z.infer<typeof signupSchema>;

const defaultValues: FormData = {
  email: '',
  password: '',
  confirmPassword: '',
};

const SignupForm = () => {
  const [togglePassword, setTogglePassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const { Field, handleSubmit, Subscribe } = useForm({
    defaultValues,
    validators: {
      onChange: signupSchema,
      // onBlur: signupSchema,
      // onSubmit: signupSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        setIsLoading(true);
        sessionStorage.setItem('verificationEmail', value.email);

        const response = await fetch('/api/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'verification',
            email: value.email,
            password: value.password,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'خطا در ثبت نام');
        }

        router.push('/auth/verify');
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
    <AuthFormContainer
      title="ثبت نام"
      description="لطفا اطلاعات خود را به دقت وارد کنید"
      footer={
        <div className="w-full inline-flex justify-center items-center gap-1.5 text-center text-xs font-normal">
          قبلا ثبت نام کرده اید؟{' '}
          <Link
            href="/auth/login"
            className="text-blue-600 hover:underline text-xs font-normal"
          >
            وارد شوید
          </Link>
        </div>
      }
      Icon={IoFingerPrint}
    >
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await handleSubmit();
        }}
        className="space-y-4"
      >
        <Field name="email">
          {(field) => (
            <div>
              <div className="flex flex-col space-y-3">
                <Label htmlFor={field.name} className="">
                  لطفا ایمیل خود را وارد کنید
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type={'email'}
                  placeholder="example@gmail.com"
                  autoComplete="email"
                  className="w-full"
                />
              </div>
              <FieldInfo field={field} />
            </div>
          )}
        </Field>

        <Field name="password">
          {(field) => (
            <div>
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
            </div>
          )}
        </Field>

        <Field name="confirmPassword">
          {(field) => (
            <div>
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
            </div>
          )}
        </Field>

        <div className="w-full">
          <Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <div className="flex w-full">
                {/* <Button
                  variant={'destructive'}
                  type="reset"
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    reset();
                  }}
                >
                  ریست کردن
                </Button> */}
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
      </form>
      {isLoading && <LoadingSpinner />}
    </AuthFormContainer>
  );
};

export default SignupForm;
