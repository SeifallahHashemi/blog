'use client';

import useInfiniteComments from '@/hooks/useInfiniteComments';
import React from 'react';

interface Props {
  postId: string;
}

const CommentsList = ({ postId }: Props) => {
  const { data } = useInfiniteComments(postId);
  console.log(data);
  return <div />;
};

export default CommentsList;
