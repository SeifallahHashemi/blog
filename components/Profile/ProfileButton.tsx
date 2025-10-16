import { cn } from '@/lib/utils';
import React from 'react';
import Link from 'next/link';
import { LiaUserSolid } from 'react-icons/lia';

const ProfileButton = () => {
  return (
    <Link
      href={'/auth/signup'}
      className={cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 size-9 cursor-pointer'
      )}
    >
      <LiaUserSolid className='size-5'/>
    </Link>
  );
};

export default ProfileButton;
