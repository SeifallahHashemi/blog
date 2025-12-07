'use client';

import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const Loading = () => {
  return (
    <div>
      <Skeleton className={'w-full h-96 rounded-xl'} />
    </div>
  );
};

export default Loading;
