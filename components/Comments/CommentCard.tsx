'use client';

import React from 'react';
import Image from 'next/image';

interface CommentCardProps {
  author: {
    full_name: string;
    username: string;
    alt?: string;
    avatar_url: string;
  };
  created_at: string;
  content: string;
  like_count: number;
  dislike_count: number;
}

const CommentCard = (props: CommentCardProps) => {
  const { author, created_at, dislike_count, like_count, content } = props;
  const { full_name, username, avatar_url, alt } = author;

  return (
    <article
      itemScope
      itemType="https://schema.org/Comment"
      className="border rounded-md p-4 shadow-sm bg-white"
    >
      <header className="flex justify-between items-start mb-2">
        <div
          className="flex items-center gap-3"
          itemProp="author"
          itemScope
          itemType="https://schema.org/Person"
        >
          <figure className="flex items-center gap-2">
            <Image
              src={avatar_url}
              alt={alt || `${full_name}'s avatar`}
              width={48}
              height={48}
              className="rounded-full"
              style={{ objectFit: 'cover' }}
            />
            <figcaption className="flex flex-col">
              <span className="font-semibold" itemProp="name">
                {full_name}
              </span>
              <span className="text-sm text-gray-500">@{username}</span>
            </figcaption>
          </figure>
        </div>
        <time
          itemProp="datePublished"
          dateTime={created_at}
          className="text-xs text-gray-400"
        >
          {new Date(created_at).toLocaleString()}
        </time>
      </header>

      <section className="mb-3">
        <p itemProp="text" className="text-gray-800 leading-relaxed">
          {content}
        </p>
      </section>

      <footer
        className="flex gap-4 text-sm text-gray-600"
        aria-label="Comment actions"
      >
        <span aria-label="Likes">👍 {like_count}</span>
        <span aria-label="Dislikes">👎 {dislike_count}</span>
      </footer>
    </article>
  );
};

export default CommentCard;
