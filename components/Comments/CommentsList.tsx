'use client';

import useInfiniteComments from '@/hooks/useInfiniteComments';
import React from 'react';
import dynamic from 'next/dynamic';

const CommentCard = dynamic(() => import('@/components/Comments/CommentCard'), {
  ssr: false,
});

interface Props {
  postId: string;
}

const CommentsList = ({ postId }: Props) => {
  const { data } = useInfiniteComments(postId);
  const allComments = data?.pages.flatMap((page) => page.data) || [];
  console.log(allComments);
  // repeat(auto-fit, minmax(100px,500px))
  return (
    <ul
      className={
        'grid grid-cols-[repeat(auto-fit,minmax(100px,500px))] justify-between'
      }
    >
      {allComments.map((comment) => (
        <li key={comment.id}>
          <CommentCard
            author={comment.profiles}
            created_at={comment.created_at}
            content={comment.content}
            like_count={comment.like_count}
            dislike_count={comment.dislike_count}
          />
        </li>
      ))}
    </ul>
  );
};

export default CommentsList;
