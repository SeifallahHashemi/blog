'use client';

import { Separator } from '@/components/ui/separator';
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
  console.log('postId in reaction:', postId);
  console.log('commentId in reaction:', commentId);
  // const {} = useToggleReaction(postId, commentId);
  return (
    <>
      <span
        aria-label="Likes"
        className={
          'flex flex-row flex-nowrap gap-x-2 justify-center items-center cursor-pointer'
        }
      >
        <SlLike /> {like_count}
      </span>
      <Separator orientation={'vertical'} className={'!h-5'} />
      <span
        aria-label="Dislikes"
        className={
          'flex flex-row-reverse flex-nowrap gap-x-2 justify-center items-center cursor-pointer'
        }
      >
        <SlDislike /> {dislike_count}
      </span>
    </>
  );
};

export default Reaction;
