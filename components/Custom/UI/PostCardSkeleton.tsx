'use client';

import { Skeleton } from '@/components/ui/skeleton';

const SkeletonPostCard = () => {
  return (
    <div
      className={
        'w-md overflow-clip lg:max-w-[400px] bg-primary-bg py-3 rounded-lg'
      }
    >
      <div className={'space-y-2'}>
        <div
          className={
            'grid [grid-template-columns:auto_1fr_auto] h-fit px-2 gap-x-2'
          }
        >
          <Skeleton className={'size-16 px-2 my-auto rounded-full'} />
          <div className={'flex flex-col gap-y-3 justify-center'}>
            <div className={'flex flex-row gap-x-1'}>
              <Skeleton className={'w-16 h-3 rounded-full'} />
              <Skeleton className={'w-16 h-3 rounded-full'} />
            </div>
            <div className={'flex flex-row gap-x-2'}>
              {new Array(3).fill(null).map((_, i) => (
                <Skeleton key={i} className={'w-16 h-6 rounded-full'} />
              ))}
            </div>
          </div>
          <div className={'flex flex-col justify-start items-center'}>
            <Skeleton className={'w-16 h-4 rounded-md'} />
          </div>
        </div>
        <div className={'flex flex-row justify-start items-center px-2 py-1'}>
          <Skeleton className={'w-48 h-5 rounded-full'} />
        </div>
        <Skeleton className={'w-full h-52 rounded-none'} />
        <footer className={'w-full flex items-center justify-end px-2 py-1'}>
          <div className={'flex flex-row gap-x-2'}>
            <Skeleton className={'size-5 rounded-full'} />
            <Skeleton className={'size-5 rounded-full'} />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SkeletonPostCard;
