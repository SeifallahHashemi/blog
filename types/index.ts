import { type TableRow } from '@sanity/table';
import { type PortableTextBlock } from 'next-sanity';

export interface Table {
  rows?: TableRow[];
  title?: string;
}

export interface TableValueProps {
  table?: Table;
  caption?: string;
}

export type AllString<T extends string> = {
  [K in T]: string;
};

export type TagType = AllString<'alt' | 'color' | 'icon' | 'slug' | 'title'>;

export type AuthorType = AllString<
  '_id' | 'alt' | 'avatarUrl' | 'name' | 'slug'
>;

export type CoverImageType = AllString<'alt' | 'lqip' | 'url'>;

export type PostsType = {
  _id: string;
  _createdAt: string;
  _updatedAt?: string;
  author: AuthorType;
  coverImage: CoverImageType;
  date: string;
  description: string;
  featured: boolean;
  isPublished: boolean;
  slug: string;
  tags: TagType[];
  title: string;
  content: PortableTextBlock[];
};

export type AuthorProfileType = AllString<'_id' | 'name' | 'slug' | 'xUrl'> & {
  image: {
    url: string;
    alt: string;
    lqip: string;
  };
};

export type OptionalType<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;
