'use client';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import useToggleReaction from '@/hooks/useToggleReaction';
import React from 'react';
import { SlDislike, SlLike } from 'react-icons/sl';

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
  const { mutate, data, isPending, isSuccess } = useToggleReaction(
    postId,
    commentId
  );

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
          <SlLike /> {like_count}
        </span>
      </Button>
      <Button
        variant={'outline'}
        className={'cursor-pointer'}
        onClick={() => reactionHandler('dislike')}
      >
        <span
          aria-label="Dislikes"
          className={
            'flex flex-row-reverse flex-nowrap gap-x-2 justify-center items-center'
          }
        >
          <SlDislike /> {dislike_count}
        </span>
      </Button>
    </ButtonGroup>
  );
};

export default Reaction;
