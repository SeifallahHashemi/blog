'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';

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

  const isDefaultAvatar =
    avatar_url === 'https://example.com/default-avatar.png';
  const avatarUrl = isDefaultAvatar ? undefined : avatar_url;

  const date = new Intl.DateTimeFormat('fa-IR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date(created_at));

  const partsDate: Record<string, string> = {};

  for (const part of date) {
    partsDate[part.type] = part.value;
  }

  const formattedDate = `${partsDate.weekday} ${partsDate.day} ${partsDate.month} ${partsDate.year} ساعت ${partsDate.hour}:${partsDate.minute}`;

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
            <Avatar
              className={
                'inline-flex justify-center items-center self-center size-10 mx-auto'
              }
            >
              <AvatarImage
                src={avatarUrl}
                alt={alt || `Avatar of @${username}`}
                className={'rounded-full'}
              />
              <AvatarFallback className={'font-sans'}>
                {String(username).slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <figcaption className="flex flex-col">
              <span
                className="font-iranYWR font-semibold text-base tracking-tight leading-relaxed text-zinc-800 dark:text-zinc-200"
                itemProp="name"
              >
                {full_name}
              </span>
              <span
                className="text-sm text-zinc-900 font-sans font-semibold tracking-tighter leading-relaxed text-right"
                dir={'ltr'}
              >
                @{username}
              </span>
            </figcaption>
          </figure>
        </div>
        <time
          itemProp="datePublished"
          dateTime={created_at}
          className="text-xs font-iranSans font-medium text-zinc-900 leading-relaxed tracking-tight"
        >
          {formattedDate}
        </time>
      </header>

      <section className="mb-3">
        <p
          itemProp="text"
          className="text-zinc-900 font-iranYWL font-medium text-sm tracking-tight leading-relaxed"
        >
          {content}
        </p>
      </section>

      <footer
        className="flex gap-4 text-sm text-gray-600 font-iranYWR"
        aria-label="Comment actions"
      >
        <span aria-label="Likes">👍 {like_count}</span>
        <span aria-label="Dislikes">👎 {dislike_count}</span>
      </footer>
    </article>
  );
};

export default CommentCard;
