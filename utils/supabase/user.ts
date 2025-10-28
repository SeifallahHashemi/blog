import { getUser, getUserProfile } from '@/utils/supabase/queries';
import { queryOptions } from '@tanstack/react-query';

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
