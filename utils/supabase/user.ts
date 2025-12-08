import {
  getUser,
  getUserProfile,
  updateUserProfile,
} from '@/utils/supabase/queries';
import {
  infiniteQueryOptions,
  mutationOptions,
  queryOptions,
  type InfiniteData,
  type QueryClient,
} from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

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

interface Comment {
  id: string;
  post_id: string;
  parent_id: string | null;
  user_id: string;
  content: string;
  created_at: string;
  like_count: number;
  dislike_count: number;
  profiles: { id: string; username: string };
}

interface CommentPage {
  data: Comment[];
  nextCursor?: number;
}

const getBaseUrl = () => {
  const env = process.env.NODE_ENV;
  if (typeof window !== 'undefined' && env === 'development')
    return window.location.origin;
  return process.env.NEXT_PUBLIC_SITE_URL || env === 'development'
    ? 'http://localhost:3000'
    : 'https://www.sepehrpersianblog.ir';
};

export const commentsInfiniteQueryOptions = (
  limit: number | string = 10,
  postId: string
) => {
  return infiniteQueryOptions({
    queryKey: ['comments', postId],
    initialPageParam: null,
    queryFn: async ({ pageParam }: { pageParam: number | null }) => {
      const url = new URL('/api/comments', getBaseUrl());
      url.searchParams.set('postId', postId);
      url.searchParams.set('limit', limit.toString());
      if (pageParam !== null) {
        url.searchParams.set('cursor', pageParam.toString());
      }
      const res = await fetch(url.toString());
      if (!res.ok)
        throw new Error(
          'مشکلی در ارتباط با سرور پیش آمده، لطفا دسترسی خود به اینترنت را چگ کنید'
        );

      return await res.json();
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    staleTime: 1000 * 60,
  });
};

export const addNewCommentMutationOptions = (
  queryClient: QueryClient,
  postId: string
) => {
  return mutationOptions({
    mutationFn: async ({
      parentId = null,
      content,
      token,
    }: {
      parentId?: string | null;
      content: string;
      token: string;
    }) => {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, parentId, content, token }),
      });
      if (!res.ok) throw new Error('خطا در ارسال کامنت');
      return res.json();
    },
    onMutate: async (newComment) => {
      await queryClient.cancelQueries({
        queryKey: ['comments', postId],
      });
      const previousData = queryClient.getQueryData<InfiniteData<CommentPage>>([
        'comments',
        postId,
      ]);

      const optimisticId = uuidv4();
      const createdAt = new Date().toString();

      queryClient.setQueryData<InfiniteData<CommentPage>>(
        ['comments', postId],
        (old) => {
          if (!old) return old;

          const newPages = [...old.pages];
          const firstPage = newPages[0];

          const optimisticComment: Comment = {
            id: optimisticId,
            post_id: postId,
            parent_id: newComment.parentId ?? null,
            user_id: 'me-optimistic',
            content: newComment.content,
            created_at: createdAt,
            like_count: 0,
            dislike_count: 0,
            profiles: { id: 'me', username: 'You' },
          };

          newPages[0] = {
            ...firstPage,
            data: [optimisticComment, ...firstPage.data],
          };

          return {
            ...old,
            pages: newPages,
          };
        }
      );
      return {
        previousData,
        optimisticId,
      };
    },
    onError: (
      err,
      newComment,
      context:
        | {
            previousData: InfiniteData<CommentPage> | undefined;
            optimisticId: string;
          }
        | undefined
    ) => {
      if (context?.previousData) {
        queryClient.setQueryData(['comments', postId], context.previousData);
      }
      // یا می‌تونی دقیق‌تر فقط کامنت جعلی رو حذف کنی:
      // qc.setQueryData(['comments', postId], (old: any) => {
      //   if (!old?.pages?.length) return old;
      //   const newPages = old.pages.map((page: any, index: number) =>
      //     index === 0
      //       ? { ...page, data: page.data.filter((c: any) => c.id !== context.optimisticId) }
      //       : page
      //   );
      //   return { ...old, pages: newPages };
      // });
    },
    // مرحله ۳: وقتی درخواست موفق بود، کامنت جعلی رو با کامنت واقعی جایگزین کن
    onSuccess: (
      data,
      variables,
      context:
        | {
            previousData: InfiniteData<CommentPage> | undefined;
            optimisticId: string;
          }
        | undefined
    ) => {
      const realComment = data.data; // فرض: سرور { data: comment } برمی‌گردونه

      queryClient.setQueryData<InfiniteData<CommentPage>>(
        ['comments', postId],
        (old) => {
          if (!old?.pages?.length) return old;

          const newPages = old.pages.map((page, index) => {
            if (index !== 0) return page; // فقط صفحه اول رو تغییر می‌دیم

            const newData = page.data.map((comment) =>
              context && comment.id === context.optimisticId
                ? realComment
                : comment
            );

            return { ...page, data: newData };
          });

          return { ...old, pages: newPages };
        }
      );
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['comments', postId],
      });
    },
  });
};

export type ReactionType = 'like' | 'dislike';

interface ToggleReactionVars {
  commentId: string;
  reaction: ReactionType;
}

interface CommentReaction {
  id: string;
  content: string;
  created_at: string;

  like_count: number;
  dislike_count: number;

  user_reaction: ReactionType | null;

  [key: string]: unknown;
}

interface CommentsQueryResponse {
  data: CommentReaction[];
  nextCursor: string | null;
}

export const addReactionMutationOptions = (
  qc: QueryClient,
  commentId: string,
  postId: string
) => {
  return mutationOptions({
    mutationFn: async ({ commentId, reaction }: ToggleReactionVars) => {
      const res = await fetch(`/api/comments/${commentId}/reaction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reaction }),
      });

      if (!res.ok) {
        throw new Error('Network error');
      }

      return (await res.json()) as { action: string | null };
    },
    onMutate: async ({ commentId, reaction }) => {
      await qc.cancelQueries({ queryKey: ['comments', commentId] });

      const previousData = qc.getQueriesData({
        queryKey: ['comments', commentId],
      });
      console.log(previousData);

      if (!previousData) return { previousData: null };

      const newData = (old: unknown) => {
        if (!old) console.log('No old data found for comments query');
        console.log(old);
      };

      qc.setQueryData(['comments', commentId], newData); // convert to setQueriesData ********

      return { previousData };
    },

    // onError: (_err, _vars, context) => {
    //   if (context?.previousData) {
    //     qc.setQueryData(['comments', commentId], context.previousData);
    //   }
    // },

    onSettled: async () => {
      await qc.invalidateQueries({ queryKey: ['comments', commentId] });
    },
  });
};
