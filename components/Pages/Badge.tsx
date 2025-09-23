import { cn } from '@/lib/utils';
import React from 'react';

const Badge = ({
  className,
  children,
}: Readonly<{ className?: string; children: React.ReactNode }>) => {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md transition-colors dark:bg-neutral-800 dark:border-neutral-700 gap-1',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Badge;
