import Badge from '@/components/Pages/Badge';
import Breadcrumb from '@/components/Pages/Breadcrumb';
import PostSidebar from '@/components/Pages/PostSidebar';
import { sanityFetch } from '@/lib/sanity.client';
import { authorQuery, tagsQuery } from '@/lib/sanity.query';
import { AuthorProfileType, OptionalType, TagType } from '@/types';
import { notFound } from 'next/navigation';
import React from 'react';

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
          {tags.map((tag, i) => (
            <Badge key={i}>{tag.title}</Badge>
          ))}
        </div>
        <div className="border-r border-r-zinc-200 dark:border-r-zinc-900"></div>
      </div>
    </section>
  );
};

export default BlogPostPage;
