'use client';

import Badge from '@/components/Pages/Badge';
import { cn } from '@/lib/utils';
import { OptionalType, PostsType } from '@/types';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React from 'react';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { IoHeartSharp } from 'react-icons/io5';
import TimeAgo from 'timeago-react';
import { register } from 'timeago.js';
import fa from 'timeago.js/lib/lang/fa';

type LocaleFn = (number: number, index: number) => [string, string];

const editedPerLang: LocaleFn = (number, index) => {
  const result = fa(number, index);
  return result.map((str) => str.replace('پیش', 'قبل')) as [string, string];
};

register('fa', editedPerLang);

type TAllPosts = {
  className?: string;
} & OptionalType<PostsType, '_id' | '_updatedAt' | 'description' | 'featured' | 'content'>;

const fallbackCoverImage: string =
  'https://res.cloudinary.com/victoreke/image/upload/v1692608339/victoreke/blog.png';

const AllPosts = ({
  className,
  coverImage,
  title,
  slug,
  author,
  tags,
  _createdAt,
  date,
  isPublished,
}: TAllPosts) => {
  if (!isPublished) return null;
  const slugify = title.replace(/\s+/g, '-');
  return (
    <Link
      href={`/blog/${slug}/${slugify}`}
      className={cn(className, 'group w-full')}
    >
      <article className={'space-y-2'}>
        <header
          className={'grid [grid-template-columns:auto_1fr_auto] h-fit px-2'}
        >
          <div
            className={
              'size-16 relative overflow-clip px-2 flex justify-center items-center my-auto'
            }
          >
            <Image
              src={author?.avatarUrl || ''}
              alt={author?.alt || title}
              className={'object-cover rounded-full'}
              width={100}
              height={100}
              objectFit={'cover'}
            />
          </div>
          <div className={'flex flex-col gap-y-2'}>
            <div
              className={
                'flex flex-row gap-x-1 font-iranYWR text-base font-medium leading-relaxed tracking-tight'
              }
            >
              <span>نویسنده: </span>
              <span
                className={
                  'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 bg-clip-text text-transparent'
                }
              >
                {author.name}
              </span>
            </div>
            <div className={'flex flex-row gap-x-2'}>
              {tags?.slice(-3).map((tag) => (
                <Badge
                  className={`rounded-full w-fit h-auto py-1 px-2 border dark:border-zinc-800 border-zinc-200 overflow-clip flex flex-row gap-x-2 text-xs font-extralight leading-relaxed font-sans`}
                  key={tag.slug}
                >
                  <Image
                    src={tag.icon}
                    alt={tag.alt}
                    width={15}
                    height={15}
                    className={'bg-transparent rounded-full'}
                  />
                  <span>{tag.title}</span>
                </Badge>
              ))}
            </div>
          </div>
          <div
            className={
              'flex flex-col justify-start items-center font-iranSans text-xs font-normal leading-relaxed tracking-tight'
            }
          >
            <TimeAgo datetime={_createdAt || date} locale={'fa'} />
          </div>
        </header>
        <div
          className={
            'flex flex-row justify-start items-center px-2 py-1 tex-sm font-medium leading-relaxed tracking-tight font-iranYWR'
          }
        >
          {title}
        </div>
        <figure>
          <Image
            src={coverImage?.url || fallbackCoverImage}
            alt={coverImage?.alt || title}
            width={100}
            height={100}
            className={'!w-full h-auto inline-flex object-cover'}
            placeholder={coverImage ? 'blur' : 'empty'}
            blurDataURL={coverImage?.lqip || ''}
          />
        </figure>
        <figcaption className={'sr-only'}>
          {coverImage?.alt || title}
        </figcaption>
        <footer className={'w-full flex items-center justify-end px-2 py-1'}>
          <div className={'flex flex-row gap-x-2'}>
            <AiOutlineShareAlt />
            <IoHeartSharp className={'fill-rose-600'} />
          </div>
        </footer>
      </article>
    </Link>
  );
};

export default AllPosts;
