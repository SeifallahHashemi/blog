import { cn } from '@/lib/utils';
import { Link } from 'next-view-transitions';
import { Url } from 'next/dist/shared/lib/router/router';
import React, { HTMLAttributeAnchorTarget } from 'react';

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
      href={href}
      target={target}
      className={cn('', className)}
      rel={'noopener'}
    >
      {children}
    </Link>
  );
};

export default RefLink;
