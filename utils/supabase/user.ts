import { UserProfile } from '@/types';
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
import { RefObject } from 'react';
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
  profiles: {
    id: string;
    username: string;
    user_id: string;
    full_name: string;
  };
  comment_reactions: { reaction: 'like' | 'dislike' | null; user_id: string }[];
}

type TempProfile = Pick<
  UserProfile,
  'id' | 'username' | 'user_id' | 'full_name'
>;

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
      commentAuthor,
    }: {
      parentId?: string | null;
      content: string;
      token: string;
      commentAuthor: TempProfile;
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
            user_id: newComment.commentAuthor.user_id,
            content: newComment.content,
            created_at: createdAt,
            like_count: 0,
            dislike_count: 0,
            profiles: {
              id: newComment.commentAuthor.id,
              username: newComment.commentAuthor.username,
              user_id: newComment.commentAuthor.user_id,
              full_name: newComment.commentAuthor.full_name,
            },
            comment_reactions: [],
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

// interface CommentReaction {
//   id: string;
//   content: string;
//   created_at: string;
//
//   like_count: number;
//   dislike_count: number;
//
//   reaction: ReactionType | null;
//
//   [key: string]: unknown;
// }

// interface CommentsQueryResponse {
//   data: CommentReaction[];
//   nextCursor: string | null;
// }

export const addReactionMutationOptions = (
  qc: QueryClient,
  commentId: string,
  postId: string,
  reactionLockRef: RefObject<Set<string>>
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
    // optimistic update
    onMutate: async ({ reaction }: { reaction: 'like' | 'dislike' }) => {
      if (reactionLockRef.current.has(commentId)) return;

      reactionLockRef.current.add(commentId);

      await qc.cancelQueries({ queryKey: ['comments', postId] });

      const previousData = qc.getQueryData<InfiniteData<CommentPage>>([
        'comments',
        postId,
      ]);

      qc.setQueryData<InfiniteData<CommentPage>>(
        ['comments', postId],
        (old) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              data: page.data.map((comment) => {
                if (comment.id !== commentId) return comment;

                // const filteredReactions = comment.comment_reactions?.filter(
                //   (r) => r.user_id !== comment.user_id
                // );

                const prevReaction =
                  comment.comment_reactions?.find(
                    (r) => r.user_id === comment.user_id
                  )?.reaction ?? null;

                let like = comment.like_count;
                let dislike = comment.dislike_count;

                let nextReaction: ReactionType | null = prevReaction;

                if (prevReaction === reaction) {
                  if (reaction === 'like') like--;
                  else dislike--;
                  nextReaction = null;
                } else {
                  if (prevReaction === 'like') like--;
                  if (prevReaction === 'dislike') dislike--;

                  if (reaction === 'like') like++;
                  else dislike++;

                  nextReaction = reaction;
                }

                const newCommentReactions = comment.comment_reactions.map(
                  (r) => {
                    if (r.user_id === comment.user_id) {
                      return {
                        ...r,
                        reaction: nextReaction,
                      };
                    }
                    return r;
                  }
                );

                return {
                  ...comment,
                  like_count: Math.max(0, like),
                  dislike_count: Math.max(0, dislike),
                  comment_reactions: newCommentReactions,
                };
              }),
            })),
          };
        }
      );

      return { previousData };
    },

    onSuccess: () => {
      // No Change Needed
    },

    onError: (err, variables, context) => {
      if (context?.previousData) {
        qc.setQueryData(['comments', postId], context.previousData);
      }
    },

    onSettled: async () => {
      await qc.invalidateQueries({ queryKey: ['comments', postId] });
      reactionLockRef.current.delete(commentId);
    },
  });
};
