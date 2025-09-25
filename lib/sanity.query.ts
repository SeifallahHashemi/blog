import { groq } from 'next-sanity';

// Reusable Post Fields (GROQ queries for Sanity CMS)
const commonPostField = groq`
  _id,
  _createdAt,
  date,
  title,
  description,
  "slug": slug.current,
`;

export const postField = groq`
  _id,
  _createdAt,
  date,
  title,
  description,
  "slug": slug.current,
  coverImage {
    'url': asset->url,  
    'lqip': asset->metadata.lqip,
    alt
  },
 author->{
  _id,
  name,
  'slug': slug.current,
  "avatarUrl": avatar.asset->url,
  "alt": name,
  }, 
  tags[]->{
    title,
    'slug': slug.current,
    color,
    "icon": icon.asset->url,
    "alt": title
  },
 featured,
 isPublished,
`;

export const postQuery = groq`*[_type == "post" && slug.current == $slug][0]{ ${commonPostField} }`;
export const allPostsQuery = groq`*[_type == "post"]{ ${postField} } | order(date desc)`;

export const authorQuery = groq`*[_type == "author"]{ name, 'image': {'url': avatar.asset->url, 'alt': name, 'lqip': avatar.asset->metadata.lqip }, xUrl, 'slug': slug.current }[0]`;

export const tagsQuery = groq`*[_type == "tag"]{ title, 'slug': slug.current, color, 'icon': {'url': icon.asset->url, 'alt': title} }`;
