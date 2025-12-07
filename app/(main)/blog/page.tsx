import PostsList from '@/components/Pages/PostsList';
import { sanityFetch } from '@/lib/sanity.client';
import { allPostsQuery } from '@/lib/sanity.query';
import { PostsType } from '@/types';
import React from 'react';

const BlogPage = async () => {
  const posts: PostsType[] = await sanityFetch({
    query: allPostsQuery,
    tags: ['allPosts'],
  });
  return (
    <section className={'w-full lg:max-w-6xl mx-auto'}>
      <h1
        className={
          'text-center font-iranYWR text-lg font-bold leading-relaxed tracking-tight'
        }
      >
        آخرین اخبار و مقاله های برنامه نویسی
      </h1>
      <ul className="mt-4 flex flex-row gap-4">
        <PostsList posts={posts} />
      </ul>
    </section>
  );
};

export default BlogPage;
