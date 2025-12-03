'use client';

import React from 'react';
import Image from 'next/image';

interface CommentCardProps {
  author: {
    fullName: string;
    userName: string;
    alt?: string;
    avatarUrl: string;
  };
  createdAt: string;
  content: string;
  like_count: number;
  dislike_count: number;
}

const CommentCard = (props: CommentCardProps) => {
  const { author, createdAt, dislike_count, like_count, content } = props;
  const { fullName, userName, avatarUrl, alt } = author;

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
              src={avatarUrl}
              alt={alt || `${fullName}'s avatar`}
              width={48}
              height={48}
              className="rounded-full"
              style={{ objectFit: 'cover' }}
            />
            <figcaption className="flex flex-col">
              <span className="font-semibold" itemProp="name">
                {fullName}
              </span>
              <span className="text-sm text-gray-500">@{userName}</span>
            </figcaption>
          </figure>
        </div>
        <time
          itemProp="datePublished"
          dateTime={createdAt}
          className="text-xs text-gray-400"
        >
          {new Date(createdAt).toLocaleString()}
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
