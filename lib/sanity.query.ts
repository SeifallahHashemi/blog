import { groq } from 'next-sanity';

// Reusable Post Fields (GROQ queries for Sanity CMS)
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

export const allPostsQuery = groq`*[_type == "post"]{ ${postField} } | order(date desc)`;
