'use client';

import PostCardSkeleton from '@/components/Custom/UI/PostCardSkeleton';
import React from 'react';

const Loading = () => {
  return (
    <div
      className={
        'mt-4 flex flex-row flex-wrap gap-4 min-h-screen justify-center w-full lg:max-w-6xl mx-auto'
      }
    >
      {new Array(10).fill(0).map((_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default Loading;
