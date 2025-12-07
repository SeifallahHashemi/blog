'use client';

import PostCardSkeleton from '@/components/Custom/UI/PostCardSkeleton';
import React from 'react';

const Loading = () => {
  return (
    <div className={'mt-4 flex flex-row gap-4'}>
      {new Array(10).fill(0).map((_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default Loading;
