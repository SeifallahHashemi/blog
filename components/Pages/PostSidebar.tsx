import { cn } from '@/lib/utils';
import { AuthorProfileType } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type SidebarProps = {
  className?: string;
  info: AuthorProfileType;
};

const PostSidebar = ({ className, info }: SidebarProps) => {
  const { _id, image, name, slug, xUrl } = info;
  return (
    <div
      className={cn(
        'w-full sticky top-0 flex flex-col gap-y-2 py-6 border-b dark:border-b-zinc-900 border-b-zinc-200',
        className
      )}
    >
      <div className="basic-font-styles dark:text-zinc-600 text-zinc-500 text-xs font-semibold">اطلاعات نویسنده</div>
      {/* Author section */}
      <div className="flex items-center gap-x-2">
        <Image
          src={image.url}
          alt={image.alt}
          className="size-16 rounded-full object-cover"
          width={100}
          height={100}
          placeholder={image?.url ? 'blur' : 'empty'}
          blurDataURL={image?.lqip || ''}
        />
        <div className="flex flex-col gap-y-1">
          <p className="basic-font-styles">{name}</p>
          <Link
            href={xUrl}
            className="font-sans text-sky-500"
            dir="ltr"
            target="_blank"
          >
            @{slug}
          </Link>
        </div>
      </div>
      {/* Tags section */}
      <div></div>
    </div>
  );
};

export default PostSidebar;
