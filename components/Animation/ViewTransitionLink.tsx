'use client';

import { cn } from '@/lib/utils';
import { useTransitionRouter } from 'next-view-transitions';
import React from 'react';

interface LinkProps {
  link: string;
  className?: string;
  children?: React.ReactNode;
}

const ViewTransitionLink = ({ link, className, children }: LinkProps) => {
  const router = useTransitionRouter();
  return (
    <a
      href={link}
      className={cn(
        'dark:text-white text-zinc-700 font-normal dark:hover:text-portfolio-primary hover:text-zinc-900 duration-300 text-base',
        className
      )}
      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        router.push(link, {
          onTransitionReady: slideInOut,
        });
      }}
    >
      {children}
    </a>
  );
};

function slideInOut() {
  document.documentElement.animate(
    [
      {
        opacity: 1,
        scale: 1,
        transform: 'translateY(0)',
      },
      {
        opacity: 0.5,
        scale: 0.9,
        transform: 'translateY(-100px)',
      },
    ],
    {
      duration: 1000,
      easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
      fill: 'forwards',
      pseudoElement: '::view-transition-old(root)',
    }
  );

  document.documentElement.animate(
    [
      {
        transform: 'translateY(100%)',
      },
      {
        transform: 'translateY(0)',
      },
    ],
    {
      duration: 1000,
      easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
      fill: 'forwards',
      pseudoElement: '::view-transition-new(root)',
    }
  );
}

export default ViewTransitionLink;
