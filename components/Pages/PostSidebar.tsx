import { PostType, TagsType } from '@/app/(main)/blog/[...slug]/page';
import { cn } from '@/lib/utils';
import { AuthorProfileType } from '@/types';
import type { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SharePost from '../Common/SharePost';
import Badge from './Badge';

type SidebarProps = {
  className?: string;
  info: AuthorProfileType;
  tags: TagsType[];
  post: PostType;
};

const PostSidebar = ({ className, info, tags, post }: SidebarProps) => {
  const { image, name, slug, xUrl } = info;
  return (
    <div
      className={cn(
        'w-full sticky top-0 flex flex-col divide-y divide-zinc-200 dark:divide-zinc-900',
        className
      )}
    >
      {/* Author section */}
      <div className="flex flex-col gap-y-2 py-6">
        <div className="basic-font-styles dark:text-zinc-600 text-zinc-500 text-xs font-semibold">
          اطلاعات نویسنده
        </div>
        <div className="flex items-center gap-x-2">
          <Image
            src={image.url}
            alt={image.alt}
            className="size-16 rounded-full object-cover"
            width={100}
            height={100}
            placeholder={image?.url ? 'blur' : 'empty'}
            blurDataURL={image?.lqip || ''}
          />
          <div className="flex flex-col gap-y-1">
            <p className="basic-font-styles">{name}</p>
            <Link
              href={xUrl as Route}
              className="font-sans text-sky-500"
              dir="ltr"
              target="_blank"
            >
              @{slug}
            </Link>
          </div>
        </div>
      </div>
      {/* Tags section */}
      <div className="px-1 py-6">
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
      {/* ShareButton */}
      <div className="px-1 py-6 flex flex-col gap-y-4">
        <div className="basic-font-styles dark:text-zinc-600 text-zinc-500 text-xs font-semibold">
          اشتراک گذاری پست:
        </div>
        <SharePost title={post.title} url={post.slug} text={post.description} />
      </div>
    </div>
  );
};

export default PostSidebar;
