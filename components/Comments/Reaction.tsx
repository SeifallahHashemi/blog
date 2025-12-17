'use client';

import CircleLoadingSpinner from '@/components/Common/CircleLoadingSpinner';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import useToggleReaction from '@/hooks/useToggleReaction';
import { getClientQuery } from '@/lib/get-client-query';
import { CommentPage } from '@/types';
import { InfiniteData } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import { SlDislike, SlLike } from 'react-icons/sl';
import { useDebouncedCallback } from 'use-debounce';

type CommentsInfiniteData = InfiniteData<CommentPage>;

const Reaction = ({
  postId,
  commentId,
}: {
  postId: string;
  commentId: string;
}) => {
  const qc = getClientQuery();
  const query = qc.getQueryData<CommentsInfiniteData>(['comments', postId]);
  const pages = query?.pages ?? [];
  const allData = pages.flatMap((page) => page.data);
  const comment = allData.find((c) => c.id === commentId);
  const likeCount = comment?.like_count ?? 0;
  const dislikeCount = comment?.dislike_count ?? 0;

  // React State Management
  const [pendingReaction, setPendingReaction] = useState<
    'like' | 'dislike' | null
  >(null);

  const reactionLockRef = useRef<Set<string>>(new Set());

  const { mutate, isPending } = useToggleReaction(
    postId,
    commentId,
    reactionLockRef
  );

  const reactionHandler = useDebouncedCallback(
    (reaction: 'like' | 'dislike') => {
      setPendingReaction(reaction);
      mutate(
        { commentId, reaction },
        {
          onSettled: () => {
            setPendingReaction(null);
          },
        }
      );
    },
    300
  );

  const isLikePending = isPending && pendingReaction === 'like';
  const isDislikePending = isPending && pendingReaction === 'dislike';

  return (
    <ButtonGroup className={'font-iranYWL font-medium text-sm'}>
      <Button
        variant={'outline'}
        className={'cursor-pointer'}
        onClick={() => reactionHandler('like')}
        disabled={isPending}
      >
        <span
          aria-label="Likes"
          className={
            'flex flex-row flex-nowrap gap-x-2 justify-center items-center'
          }
        >
          <SlLike />
          {isLikePending ? <CircleLoadingSpinner /> : likeCount}
        </span>
      </Button>
      <Button
        variant={'outline'}
        className={'cursor-pointer relative'}
        onClick={() => reactionHandler('dislike')}
        disabled={isPending}
      >
        <span
          aria-label="Dislikes"
          className={
            'flex flex-row-reverse flex-nowrap gap-x-2 justify-center items-center'
          }
        >
          <SlDislike />{' '}
          {isDislikePending ? <CircleLoadingSpinner /> : dislikeCount}
        </span>
      </Button>
    </ButtonGroup>
  );
};

export default Reaction;
