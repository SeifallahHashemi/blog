'use client';

import { FieldInfo } from '@/components/Auth/FieldInfo';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import useCreateComment from '@/hooks/useCreateComment';
import { commentSchema } from '@/utils/schema/zod-schema';
import { useForm } from '@tanstack/react-form';
import React, { FormEvent } from 'react';
import * as z from 'zod';

interface PageParams {
  postId: string;
  parentId: string | null;
}

type formData = z.infer<typeof commentSchema>;

const defaultValues: formData = {
  comment: '',
};

const CommentForm = ({ postId, parentId }: PageParams) => {
  const { mutate } = useCreateComment(postId);
  const { handleSubmit, Field, Subscribe } = useForm({
    defaultValues,
    validators: {
      onChange: commentSchema,
    },
    onSubmit: async ({ value }) => {},
  });
  return (
    <form
      className={'w-full lg:max-w-2xl mx-auto basic-font-styles'}
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
              <Textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder={'نظر شما ...'}
                className={'max-w-full max-h-44'}
              />
            </div>
            <FieldInfo field={field} />
          </>
        )}
      </Field>
      <div className={'w-full flex justify-end items-center mt-4'}>
        <Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Button
              className={'cursor-pointer'}
              variant={'default'}
              type="submit"
              disabled={!canSubmit}
            >
              {isSubmitting ? 'در حال ارسال ...' : 'ارسال نظر'}
            </Button>
          )}
        </Subscribe>
      </div>
    </form>
  );
};

export default CommentForm;
