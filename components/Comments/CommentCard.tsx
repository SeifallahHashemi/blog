'use client';

import Reaction from '@/components/Comments/Reaction';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React, { useMemo } from 'react';

interface CommentCardProps {
  author: {
    full_name: string;
    username: string;
    alt?: string;
    avatar_url: string;
    user_id: string;
  };
  created_at: string;
  content: string;
  id: string;
  postId: string;
  reactions?: { reaction: 'like' | 'dislike'; user_id: string }[];
}

const CommentCard = ({
  author,
  created_at,
  content,
  id,
  postId,
  reactions,
}: CommentCardProps) => {
  const formattedDate = useMemo(() => {
    if (!created_at) return '';
    const date = new Intl.DateTimeFormat('fa-IR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).formatToParts(new Date(created_at));

    const parts: Record<string, string> = {};
    for (const part of date) parts[part.type] = part.value;

    return `${parts.weekday} ${parts.day} ${parts.month} ${parts.year} ساعت ${parts.hour}:${parts.minute}`;
  }, [created_at]);

  if (!author) return null;

  const { full_name, username, avatar_url, alt, user_id } = author;

  const isDefaultAvatar =
    avatar_url === 'https://example.com/default-avatar.png';
  const avatarUrl = isDefaultAvatar ? undefined : avatar_url;

  return (
    <article className="flex flex-col gap-y-1.5 rounded-lg shadow-sm bg-primary-bg border border-zinc-200 dark:border-zinc-800 p-2">
      <header className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-3">
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
              <span className="font-iranYWR font-semibold text-base tracking-tight leading-relaxed text-zinc-800 dark:text-zinc-200">
                {full_name}
              </span>
              <span
                className="text-sm text-zinc-800 dark:text-zinc-200 font-sans font-semibold tracking-tighter leading-relaxed text-right"
                dir={'ltr'}
              >
                @{username}
              </span>
            </figcaption>
          </figure>
        </div>
        <time
          dateTime={created_at}
          className="text-xs font-iranSans font-medium text-zinc-800 dark:text-zinc-200 leading-relaxed tracking-tight"
          suppressHydrationWarning
        >
          {formattedDate}
        </time>
      </header>
      <section className="mb-3">
        <p className="text-zinc-800 dark:text-zinc-200 font-iranYWL font-medium text-sm tracking-tight leading-relaxed">
          {content}
        </p>
      </section>
      <footer style={{ direction: 'ltr' }} aria-label="Comment actions">
        <Reaction commentId={id} postId={postId} />
      </footer>
    </article>
  );
};

export default CommentCard;
