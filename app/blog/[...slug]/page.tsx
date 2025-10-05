import { CustomPortableText } from '@/components/Common/CustomPortableText';
import Breadcrumb from '@/components/Pages/Breadcrumb';
import PostSidebar from '@/components/Pages/PostSidebar';
import { sanityFetch } from '@/lib/sanity.client';
import { authorQuery, postQuery, tagsQuery } from '@/lib/sanity.query';
import { AuthorProfileType, OptionalType, PostsType, TagType } from '@/types';
import { PortableText } from 'next-sanity';
import { notFound } from 'next/navigation';

interface BlogPostProps {
  params: Promise<{ slug: string[] }>;
}

export type TagsType = OptionalType<TagType, 'icon'> & {
  icon: {
    url: string;
    alt: string;
  };
};

export type PostType = OptionalType<PostsType, 'author' | 'featured' | 'isPublished' | 'tags' | 'coverImage' | '_updatedAt' | '_createdAt' | '_id' | 'date'>

const BlogPostPage = async ({ params }: BlogPostProps) => {
  const slug = (await params).slug;

  if (!slug || slug.length === 0) {
    return notFound();
  }

  const author = await sanityFetch<AuthorProfileType>({
    query: authorQuery,
    tags: ['author'],
  });

  const tags = await sanityFetch<TagsType[]>({
    query: tagsQuery,
    tags: ['tags'],
  });

  const post = await sanityFetch<PostType>({
    query: postQuery,
    tags: ['post'],
    params: { slug: slug[0] },
  })

  const postDate = new Date(post.date || post._createdAt || '2025-10-05T06:43:12Z');

  const convertedDate = new Intl.DateTimeFormat('fa-IR', {
  weekday: 'long',  // "چهارشنبه"
  day: 'numeric',   // "۲۶"
  month: 'long',    // "شهریور"
  year: 'numeric',  // "۱۴۰۴"
  hour: '2-digit',  // "۱۰"
  minute: '2-digit',// "۰۶"
  hour12: false,    // نمایش ۲۴ ساعته
}).format(postDate);

  return (
    <section className={'w-full max-w-6xl mx-auto'}>
      <div className={'pb-4 border-b border-b-zinc-200 dark:border-b-zinc-900'}>
        <Breadcrumb />
      </div>
      <div className={'grid grid-cols-[minmax(200px,_20dvw)_1fr] gap-x-2'}>
        <div className={'relative h-auto'}>
          <PostSidebar className={''} info={author} tags={tags} post={post}/>
        </div>
        <div className="border-r border-r-zinc-200 dark:border-r-zinc-900 pr-6 py-8">
          <div className='flex flex-row justify-between items-center'>
            <h1 className='text-2xl text-zinc-900 dark:text-zinc-50 font-iranYWR font-bold leading-relaxed tracking-tight'>{post.title}</h1>
            <span className='inline-block'>{convertedDate}</span>
          </div>
          <PortableText value={post.content} components={CustomPortableText} />
        </div>
      </div>
    </section>
  );
};

export default BlogPostPage;
