/*'use client';

import { createClient } from '@/utils/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { CommentsInfiniteData } from '@/types';

type Reaction = 'like' | 'dislike';

export default function useCommentReactionsRealtime(postId: string) {
  const qc = useQueryClient();

  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel(`public:comment_reactions:postId=${postId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comment_reactions',
        },
        (payload) => {
          const ev = payload.eventType;
          const newRow = payload.new as {
            comment_id: string;
            reaction: Reaction;
          } | null;

          const oldRow = payload.old as {
            comment_id: string;
            reaction: Reaction;
          } | null;

          qc.setQueriesData(
            { queryKey: ['comments', postId] },
            (old: CommentsInfiniteData | undefined) => {
              if (!old) return old;

              return {
                ...old,
                pages: old.pages.map((page) => ({
                  ...page,
                  data: page.data.map((comment) => {
                    if (
                      comment.id !==
                      (newRow?.comment_id ?? oldRow?.comment_id)
                    ) {
                      return comment;
                    }

                    let like = comment.like_count;
                    let dislike = comment.dislike_count;

                    // INSERT
                    if (ev === 'INSERT' && newRow) {
                      if (newRow.reaction === 'like') like += 1;
                      if (newRow.reaction === 'dislike') dislike += 1;
                    }

                    // DELETE
                    if (ev === 'DELETE' && oldRow) {
                      if (oldRow.reaction === 'like') like -= 1;
                      if (oldRow.reaction === 'dislike') dislike -= 1;
                    }

                    // UPDATE (switch)
                    if (ev === 'UPDATE' && newRow && oldRow) {
                      if (oldRow.reaction === 'like') like -= 1;
                      if (oldRow.reaction === 'dislike') dislike -= 1;
                      if (newRow.reaction === 'like') like += 1;
                      if (newRow.reaction === 'dislike') dislike += 1;
                    }

                    return {
                      ...comment,
                      like_count: Math.max(0, like),
                      dislike_count: Math.max(0, dislike),
                    };
                  }),
                })),
              };
            }
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [postId, qc]);
}
*/