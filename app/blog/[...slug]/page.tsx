import Breadcrumb from '@/components/Pages/Breadcrumb';
import PostSidebar from '@/components/Pages/PostSidebar';
import { notFound } from 'next/navigation';
import React from 'react';

interface BlogPostProps {
  params: Promise<{ slug: string[] }>;
}

const BlogPostPage = async ({ params }: BlogPostProps) => {
  const slug = (await params).slug;

  if (!slug || slug.length === 0) {
    return notFound();
  }

  const postSlug = slug[0];
  const postTitle = slug.slice(1).join('/');

  return (
    <section className={'w-full max-w-6xl mx-auto'}>
      <div className={'pb-4 border-b border-b-zinc-200 dark:border-b-zinc-900'}>
        <Breadcrumb />
      </div>
      <div className={'grid grid-cols-[minmax(200px,_15dvw)_1fr]'}>
        <div className={'relative h-auto'}>
          <PostSidebar
            className={'border-l border-l-zinc-200 dark:border-l-zinc-900'}
          />
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default BlogPostPage;
