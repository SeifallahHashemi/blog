'use client';

import { commentsInfiniteQueryOptions } from '@/utils/supabase/user';
import { useInfiniteQuery } from '@tanstack/react-query';

const useInfiniteComments = (postId: string) => {
  return useInfiniteQuery(commentsInfiniteQueryOptions(20, postId));
};

export default useInfiniteComments;
