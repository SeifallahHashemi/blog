import { cn } from '@/lib/utils';
import React from 'react';

const Divider = ({ className }: { className: string }) => {
  return (
    <div
      className={cn('shrink-0 bg-zinc-200 dark:bg-zinc-800 w-px', className)}
    />
  );
};

export default Divider;
