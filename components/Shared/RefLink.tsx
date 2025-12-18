import { cn } from '@/lib/utils';
import React, { HTMLAttributeAnchorTarget } from 'react';
import type { Route } from 'next';
import { Link } from 'next-view-transitions';
import { Url } from 'next/dist/shared/lib/router/router';

interface LinkProps {
  href: Url;
  className?: string;
  children?: React.ReactNode;
  target: HTMLAttributeAnchorTarget;
}

const RefLink = ({
  href,
  className,
  children,
  target = '_blank',
}: LinkProps) => {
  return (
    <Link
      href={href as Route}
      target={target}
      className={cn('', className)}
      rel={'noopener'}
    >
      {children}
    </Link>
  );
};

export default RefLink;
