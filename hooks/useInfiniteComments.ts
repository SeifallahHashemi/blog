'use client';

import { commentsInfiniteQueryOptions } from '@/utils/supabase/user';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

const useInfiniteComments = (postId: string) => {
  return useSuspenseInfiniteQuery(commentsInfiniteQueryOptions(20, postId));
};

export default useInfiniteComments;
