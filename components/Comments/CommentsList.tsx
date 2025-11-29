import React from 'react';

interface Props {
  postId: string;
}

const CommentsList = ({ postId }: Props) => {
  // const { data } = useInfiniteComments(postId);
  console.log(postId);
  return <div />;
};

export default CommentsList;
