'use client';

import { login } from '@/lib/auth';
import { loginSchema } from '@/utils/schema/zod-schema';
import { AnyFieldApi, useForm } from '@tanstack/react-form';
import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BiSolidError } from 'react-icons/bi';
import { toast } from 'sonner';
import * as z from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type formDate = z.infer<typeof loginSchema>;

const defaultValues: formDate = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const [togglePassword, setTogglePassword] = useState<boolean>(false);

  const router = useRouter();

  const { Field, handleSubmit, Subscribe } = useForm({
    defaultValues,
    validators: {
      onChange: loginSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await login(value.email, value.password);
        router.push('/dashboard');
      } catch (error) {
        if (error instanceof Error) {
          toast(error.name, {
            className: 'my-classname',
            description: error.message,
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
      className="space-y-4"
    >
      <Field
        name="email"
        children={(field) => (
          <>
            <div className="flex flex-col space-y-3">
              <Label htmlFor={field.name}>ایمیل</Label>
              <Input
                name={field.name}
                id={field.name}
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
          </>
        )}
      />

      <Field
        name="password"
        children={(field) => (
          <>
            <div className="flex flex-col space-y-3">
              <Label htmlFor={field.name} className="">
                رمز عبور
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
      />

      <div className="text-right">
        <Link
          href="/auth/reset-password"
          className="text-xs font-normal text-blue-600 hover:underline"
        >
          رمز عبور خود را فراموش کرده اید؟
        </Link>
      </div>

      <div className="w-full">
        <Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <div className="w-full flex">
              <Button
                className="cursor-pointer flex-1"
                disabled={!canSubmit}
                variant={'default'}
                type="submit"
              >
                {isSubmitting ? 'در حال وارد شدن ...' : 'ورود'}
              </Button>
            </div>
          )}
        />
      </div>
    </form>
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

export default LoginForm;
