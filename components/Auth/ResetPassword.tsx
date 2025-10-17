'use client';

import { translateSupabaseError } from '@/utils/errors/supabase-error';
import { resetPasswordSchema } from '@/utils/schema/zod-schema';
import { useForm } from '@tanstack/react-form';
import React from 'react';
import { useRouter } from 'next/navigation';
import { BiSolidError } from 'react-icons/bi';
import { toast } from 'sonner';
import * as z from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { FieldInfo } from './FieldInfo';

type formData = z.infer<typeof resetPasswordSchema>;

const defaultValues: formData = {
  email: '',
};

const ResetPassword = () => {
  const router = useRouter();

  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues,
    validators: {
      onChange: resetPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        sessionStorage.setItem('verificationEmail', value.email);
        sessionStorage.setItem('isPasswordReset', 'true');

        await fetch('/api/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'verification',
            email: value.email,
            isPasswordReset: true,
            origin: window.location.origin,
          }),
        });

        router.push('/auth/verify');
      } catch (error) {
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
      <Field
        name="email"
        children={(field) => (
          <>
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
          </>
        )}
      />

      <div className="w-full mt-4">
        <Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <div className="flex w-full">
              <Button
                variant={'default'}
                type="submit"
                disabled={!canSubmit}
                className="cursor-pointer flex-1"
              >
                {isSubmitting ? 'در حال ارسال لینک ...' : 'ارسال لینک بازیابی'}
              </Button>
            </div>
          )}
        />
      </div>
    </form>
  );
};

export default ResetPassword;
