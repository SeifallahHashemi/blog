'use client';

import { getClientQuery } from '@/lib/get-client-query';
import { addReactionMutationOptions } from '@/utils/supabase/user';
import { useMutation } from '@tanstack/react-query';
import { RefObject } from 'react';

const useToggleReaction = (
  postId: string,
  commentId: string,
  reactionLockRef: RefObject<Set<string>>
) => {
  const qc = getClientQuery();
  return useMutation(
    addReactionMutationOptions(qc, commentId, postId, reactionLockRef)
  );
};

export default useToggleReaction;
