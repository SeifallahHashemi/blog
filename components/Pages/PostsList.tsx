import AllPosts from '@/components/Pages/AllPosts';
import { PostsType } from '@/types';
import React from 'react';

const PostsList = ({ posts }: { posts: PostsType[] }) => {
  return (
    <>
      {posts.map((post: PostsType) => (
        <li
          key={post._id}
          className={
            'w-md overflow-clip lg:max-w-[400px] bg-primary-bg py-3 rounded-lg'
          }
        >
          <AllPosts
            _createdAt={post._createdAt}
            author={post.author}
            coverImage={post.coverImage}
            date={post.date}
            isPublished={post.isPublished}
            slug={post.slug}
            tags={post.tags}
            title={post.title}
          />
        </li>
      ))}
    </>
  );
};

export default PostsList;
