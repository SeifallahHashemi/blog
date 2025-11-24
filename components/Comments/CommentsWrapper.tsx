'use client';

import React from 'react';

interface PageParams {
  postId: string;
  parentId: string | null;
}

const CommentsWrapper = ({ postId, parentId }: PageParams) => {
  return <div>hello world</div>;
};

export default CommentsWrapper;
