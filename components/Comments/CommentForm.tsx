'use client';

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
  const { handleSubmit } = useForm({
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
      hello world
    </form>
  );
};

export default CommentForm;
