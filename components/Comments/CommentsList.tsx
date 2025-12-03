'use client';

import CommentCard from '@/components/Comments/CommentCard';
import useInfiniteComments from '@/hooks/useInfiniteComments';
import React from 'react';

interface Props {
  postId: string;
}

const CommentsList = ({ postId }: Props) => {
  const { data } = useInfiniteComments(postId);
  const allComments = data?.pages.flatMap((page) => page.data) || [];
  console.log(allComments);
  return (
    <ul>
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
