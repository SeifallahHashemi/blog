import { cn } from '@/lib/utils';
import React from 'react';

const Badge = ({
  className,
  children,
  props
}: Readonly<{ className?: string; children: React.ReactNode, props?: React.HTMLAttributes<HTMLDivElement>}>) => {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md transition-colors dark:bg-neutral-800 dark:border-neutral-700 gap-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Badge;
