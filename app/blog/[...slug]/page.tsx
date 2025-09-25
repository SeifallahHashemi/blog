import SharePost from '@/components/Common/SharePost';
import Badge from '@/components/Pages/Badge';
import Breadcrumb from '@/components/Pages/Breadcrumb';
import PostSidebar from '@/components/Pages/PostSidebar';
import { sanityFetch } from '@/lib/sanity.client';
import { authorQuery, tagsQuery } from '@/lib/sanity.query';
import { AuthorProfileType, OptionalType, TagType } from '@/types';
import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { BsTwitterX } from 'react-icons/bs';

interface BlogPostProps {
  params: Promise<{ slug: string[] }>;
}

type TagsType = OptionalType<TagType, 'icon'> & {
  icon: {
    url: string;
    alt: string;
  };
};

const BlogPostPage = async ({ params }: BlogPostProps) => {
  const slug = (await params).slug;

  if (!slug || slug.length === 0) {
    return notFound();
  }

  // const postSlug = slug[0];
  // const postTitle = slug.slice(1).join('/');
  const author = await sanityFetch<AuthorProfileType>({
    query: authorQuery,
    tags: ['author'],
  });

  const tags = await sanityFetch<TagsType[]>({
    query: tagsQuery,
    tags: ['tags'],
  });

  return (
    <section className={'w-full max-w-6xl mx-auto'}>
      <div className={'pb-4 border-b border-b-zinc-200 dark:border-b-zinc-900'}>
        <Breadcrumb />
      </div>
      <div className={'grid grid-cols-[minmax(200px,_20dvw)_1fr] gap-x-2'}>
        <div className={'relative h-auto'}>
          <PostSidebar className={''} info={author} />
          <div className="px-1 py-6 border-b dark:border-b-zinc-900 border-b-zinc-200">
            <p className="basic-font-styles dark:text-zinc-600 text-zinc-500">
              تگ ها:{' '}
            </p>
            <ul className="flex flex-row flex-wrap justify-end gap-x-2">
              {tags?.map((tag) => (
                <li key={tag.slug}>
                  <Badge
                    className={`rounded-full w-fit h-auto py-1 px-2 border dark:border-zinc-800 border-zinc-200 overflow-clip flex flex-row gap-x-2 text-xs font-extralight leading-relaxed font-sans`}
                    props={{
                      style: {
                        borderColor: tag.color,
                        borderWidth: '1px',
                      },
                    }}
                  >
                    <Image
                      src={tag.icon?.url || ''}
                      alt={tag.alt || ''}
                      width={15}
                      height={15}
                      className={'bg-transparent rounded-full'}
                    />
                    <span>{tag.title}</span>
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SharePost title={'title'} url={'url'} text={'text'} Icon={BsTwitterX} />
          </div>
        </div>
        <div className="border-r border-r-zinc-200 dark:border-r-zinc-900"></div>
      </div>
    </section>
  );
};

export default BlogPostPage;
