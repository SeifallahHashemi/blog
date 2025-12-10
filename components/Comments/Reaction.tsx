'use client';

import CircleLoadingSpinner from '@/components/Common/CircleLoadingSpinner';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import useToggleReaction from '@/hooks/useToggleReaction';
import { getClientQuery } from '@/lib/get-client-query';
import { CommentPage } from '@/types';
import { InfiniteData } from '@tanstack/react-query';
import React from 'react';
import { SlDislike, SlLike } from 'react-icons/sl';

type CommentsInfiniteData = InfiniteData<CommentPage>;

const Reaction = ({
  like_count,
  dislike_count,
  postId,
  commentId,
}: {
  like_count: number;
  dislike_count: number;
  postId: string;
  commentId: string;
}) => {
  const qc = getClientQuery();
  const query = qc.getQueryData<CommentsInfiniteData>(['comments', commentId]);
  const pages = query?.pages ?? [];
  const allData = pages.flatMap((page) => page.data);
  const comment = allData.find((c) => c.id === commentId);
  const likeCount = comment?.like_count ?? 0;
  const dislikeCount = comment?.dislike_count ?? 0;

  const { mutate, data, isPending, isSuccess } = useToggleReaction(
    postId,
    commentId
  );

  console.log(data, isPending, isSuccess);
  console.log(postId, commentId);
  console.log(likeCount, dislikeCount);

  const reactionHandler = (reaction: 'like' | 'dislike') => {
    mutate({ commentId, reaction });
  };

  return (
    <ButtonGroup className={'font-iranYWL font-medium text-sm'}>
      <Button
        variant={'outline'}
        className={'cursor-pointer'}
        onClick={() => reactionHandler('like')}
      >
        <span
          aria-label="Likes"
          className={
            'flex flex-row flex-nowrap gap-x-2 justify-center items-center'
          }
        >
          <SlLike /> {!isPending ? likeCount : <CircleLoadingSpinner />}
        </span>
      </Button>
      <Button
        variant={'outline'}
        className={'cursor-pointer relative'}
        onClick={() => reactionHandler('dislike')}
      >
        <span
          aria-label="Dislikes"
          className={
            'flex flex-row-reverse flex-nowrap gap-x-2 justify-center items-center'
          }
        >
          <SlDislike />{' '}
          {!isPending ? (
            dislikeCount
          ) : (
            <CircleLoadingSpinner
              className={'absolute inset-0 flex justify-center items-center'}
            />
          )}
        </span>
      </Button>
    </ButtonGroup>
  );
};

export default Reaction;
