'use client';

import { resetPasswordSchema } from '@/utils/schema/zod-schema';
import { AnyFieldApi, useForm } from '@tanstack/react-form';
import React from 'react';
import * as z from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type formData = z.infer<typeof resetPasswordSchema>;

const defaultValues: formData = {
  email: '',
};

const ResetPassword = () => {
  const { Field, Subscribe, handleSubmit } = useForm({
    defaultValues,
    validators: {
      onChange: resetPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
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

      <div className="w-full">
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

export default ResetPassword;
