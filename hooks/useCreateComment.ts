'use client';

import { getClientQuery } from '@/lib/get-client-query';
import { addNewCommentMutationOptions } from '@/utils/supabase/user';
import { useMutation } from '@tanstack/react-query';

const useCreateComment = (postId: string) => {
  const queryClient = getClientQuery();
  return useMutation(addNewCommentMutationOptions(queryClient, postId));
};

export default useCreateComment;
