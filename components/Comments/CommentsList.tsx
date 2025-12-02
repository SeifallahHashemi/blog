'use client';

import useInfiniteComments from '@/hooks/useInfiniteComments';
import React from 'react';

interface Props {
  postId: string;
}

const CommentsList = ({ postId }: Props) => {
  const { data } = useInfiniteComments(postId);
  const allComments = data?.pages.flatMap((page) => page.data) || [];
  console.log(allComments);
  return <ul />;
};

export default CommentsList;
