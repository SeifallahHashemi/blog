'use client';

import { FieldInfo } from '@/components/Auth/FieldInfo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { commentSchema } from '@/utils/schema/zod-schema';
import { useForm } from '@tanstack/react-form';
import React, { FormEvent } from 'react';
import * as z from 'zod';

interface PageParams {
  postId: string;
  parentId: string | null;
}

type formdData = z.infer<typeof commentSchema>;

const defaultValues: formdData = {
  comment: '',
};

const CommentForm = ({ postId, parentId }: PageParams) => {
  const { handleSubmit, Field, Subscribe } = useForm({
    defaultValues,
    validators: {
      onChange: commentSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });
  return (
    <form
      className={'w-full'}
      onSubmit={async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        await handleSubmit();
      }}
    >
      <Field name={'comment'}>
        {(field) => (
          <>
            <div className={'space-y-4'}>
              <Label htmlFor={field.name}>
                لطفا نظر خود را در فیلد زیر وارد کنید
              </Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                type={'text'}
                placeholder={'نظر شما ...'}
                className={'w-full'}
              />
            </div>
            <FieldInfo field={field} />
          </>
        )}
      </Field>
      <div className={'w-full'}>
        <Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button
              className={'flex-1 cursor-pointer'}
              variant={'default'}
              type="submit"
              disabled={!canSubmit}
            >
              {isSubmitting ? 'ارسال نظر' : 'در حال ارسال ...'}
            </Button>
          )}
        </Subscribe>
      </div>
    </form>
  );
};

export default CommentForm;
