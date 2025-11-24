'use client';

import { Comment, CommentsInfiniteData } from '@/types';
import { createClient } from '@/utils/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export default function useCommentsRealtime(postId: string) {
  const qc = useQueryClient();

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel(`public:comments:postId=${postId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comments',
          filter: `post_id=eq.${postId}`,
        },
        (payload) => {
          const ev = payload.eventType;
          const newRow = payload.new as Comment | null;
          const oldRow = payload.old as Comment | null;
          if (ev === 'INSERT' && newRow) {
            qc.setQueriesData(
              {
                queryKey: ['comments', postId],
              },
              (old: CommentsInfiniteData | undefined) => {
                if (!old) return old;
                const pages = [...old.pages];
                pages[0] = { ...pages[0], data: [newRow, ...pages[0].data] };
                return {
                  ...old,
                  pages,
                };
              }
            );
          } else if (ev === 'UPDATE' && newRow) {
            const upd = newRow as Comment;
            qc.setQueriesData(
              {
                queryKey: ['comments', postId],
              },
              (old: CommentsInfiniteData | undefined) => {
                if (!old) return old;
                const pages = old.pages.map((page) => {
                  const newData = page.data.map((comment) =>
                    comment.id === upd.id ? { ...comment, ...upd } : comment
                  );
                  return { ...page, data: newData };
                });
                return {
                  ...old,
                  pages,
                };
              }
            );
          } else if (ev === 'DELETE' && oldRow) {
            const deletedRow = oldRow as Comment;
            qc.setQueriesData(
              {
                queryKey: ['comments', postId],
              },
              (old: CommentsInfiniteData | undefined) => {
                if (!old) return old;
                const pages = old.pages.map((page) => {
                  const newData = page.data.filter(
                    (c: Comment) => c.id !== deletedRow.id
                  );
                  return {
                    ...page,
                    data: newData,
                  };
                });
                return {
                  ...old,
                  pages,
                };
              }
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [postId, qc]);
}
