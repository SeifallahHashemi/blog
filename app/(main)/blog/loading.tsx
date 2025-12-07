'use client';

import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const Loading = () => {
  return (
    <div>
      <SkeletonPostCard />
    </div>
  );
};

const SkeletonPostCard = () => {
  return (
    <div
      className={
        'w-md overflow-clip lg:max-w-[400px] bg-primary-bg py-3 rounded-lg'
      }
    >
      <div className={'space-y-2'}>
        <div
          className={'grid [grid-template-columns:auto_1fr_auto] h-fit px-2'}
        >
          <Skeleton className={'size-16 px-2 my-auto rounded-full'} />
          <div className={'flex flex-col gap-y-2'}>
            <div className={'flex flex-row gap-x-1'}>
              <Skeleton className={'w-6 h-2'} />
              <Skeleton className={'w-6 h-2'} />
            </div>
            <div className={'flex flex-row gap-x-2'}>
              {new Array(3).fill(null).map((_, i) => (
                <Skeleton key={i} className={'w-6 h-2 rounded-full'} />
              ))}
            </div>
          </div>
          <div className={'flex flex-col justify-start items-center'}>
            <Skeleton className={'w-4 h-2 rounded-md'} />
          </div>
        </div>
        <div className={'flex flex-row justify-start items-center px-2 py-1'}>
          <Skeleton className={'w-8 h-2 rounded-md'} />
        </div>
        <Skeleton className={'w-full h-16 rounded-none'} />
        <footer className={'w-full flex items-center justify-end px-2 py-1'}>
          <div className={'flex flex-row gap-x-2'}>
            <Skeleton className={'size-4 rounded-full'} />
            <Skeleton className={'size-4 rounded-full'} />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Loading;
