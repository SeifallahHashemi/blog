'use client';

import { getClientQuery } from '@/lib/get-client-query';
import { useMutation } from '@tanstack/react-query';

const useToggleReaction = (postId: string) => {
  const qc = getClientQuery();
  return useMutation();
};
