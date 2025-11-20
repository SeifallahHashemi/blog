import {
  getUser,
  getUserProfile,
  updateUserProfile,
} from '@/utils/supabase/queries';
import {
  infiniteQueryOptions,
  mutationOptions,
  queryOptions,
  type QueryClient,
} from '@tanstack/react-query';

export const userOptions = queryOptions({
  queryKey: ['user'],
  queryFn: async () => {
    return await getUser();
  },
});

export const userProfileOptions = (userId: string) => {
  return queryOptions({
    queryKey: ['profile', userId],
    queryFn: async () => {
      return await getUserProfile();
    },
    enabled: !!userId,
  });
};

export const userProfileUpdateOptions = (
  queryClient: QueryClient,
  queryKey: string[]
) => {
  return mutationOptions({
    mutationFn: async ({
      fullName,
      userName,
      mobile,
    }: {
      fullName: string;
      userName: string;
      mobile: string;
    }) => {
      return await updateUserProfile({ fullName, userName, mobile });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKey }),
  });
};

export const commentsInfiniteQueryOptions = (
  limit: number | string = 10,
  postId: string
) => {
  return infiniteQueryOptions({
    queryKey: ['comments', postId],
    initialPageParam: 0,
    queryFn: async ({ pageParam }: { pageParam?: number }) => {
      const url = new URL('/api/comments', location.origin);
      url.searchParams.set('postId', postId);
      url.searchParams.set('limit', limit.toString());
      if (pageParam) {
        url.searchParams.set('cursor', pageParam.toString());
      }
      const res = await fetch(url.toString());
      if (!res.ok)
        throw new Error(
          'مشکلی در ارتباط با سرور پیش آمده، لطفا دسترسی خود به اینترنت را چگ کنید'
        );
      return res.json();
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    staleTime: 1000 * 60,
  });
};
