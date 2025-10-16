'use client';

import { signupSchema } from '@/utils/schema/zod-schema';
import { AnyFieldApi, useForm } from '@tanstack/react-form';
import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import AuthFormContainer from './AuthFormContainer';


type FormData = z.infer<typeof signupSchema>;

const defaultValues: FormData = {
  email: '',
  password: '',
  confirmPassword: '',
};

const SignupForm = () => {
  const [togglePassword, setTogglePassword] = useState<boolean>(false);

  const router = useRouter();

  const { Field, handleSubmit, Subscribe, reset } = useForm({
    defaultValues,
    validators: {
      onChange: signupSchema,
      // onBlur: signupSchema,
      // onSubmit: signupSchema,
    },
    onSubmit: async ({ value }) => {
      sessionStorage.setItem('verificationEmail', value.email);

      await fetch('/api/email', {
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

      // router.push('/')
    },
  });
  return (
    <AuthFormContainer
      title="ثبت نام"
      description="لطفا اطلاعات خود را به دقت وارد کنید"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSubmit();
        }}
        className="space-y-4"
      >
        <Field
          name="email"
          children={(field) => (
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
        />

        <Field
          name="password"
          children={(field) => (
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
        />

        <Field
          name="confirmPassword"
          children={(field) => (
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
        />

        <div className="w-full flex justify-end items-center">
          <Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <div className="flex flex-row flex-wrap gap-2 justify-center items-center">
                <Button
                  variant={'destructive'}
                  type="reset"
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    reset();
                  }}
                >
                  ریست کردن
                </Button>
                <Button
                  variant={'default'}
                  type="submit"
                  disabled={!canSubmit}
                  className="cursor-pointer"
                >
                  {isSubmitting ? 'در حال ثبت نام ...' : 'ثبت نام'}
                </Button>
              </div>
            )}
          />
        </div>
      </form>
    </AuthFormContainer>
  );
};

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <div className="flex flex-row gap-2 flex-wrap my-1">
      {field.state.meta.isTouched && !field.state.meta.isValid
        ? field.state.meta.errors.map((err, ind) => (
            <em
              key={ind}
              className="text-xs leading-relaxed tracking-tight text-red-400 font-normal"
            >
              {ind + 1}- {err.message}
            </em>
          ))
        : null}
      {field.state.meta.isValidating ? 'درحال اعتبارسنجی ...' : null}
    </div>
  );
}

export default SignupForm;