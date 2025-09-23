import { FaUserTie } from 'react-icons/fa';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: FaUserTie,
  fields: [
    defineField({
      name: 'name',
      title: 'Author name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      description: 'Upload a profile photo. Recommended size 320 x 320',
      options: {
        hotspot: true,
        metadata: ['lqip'],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'xUrl',
      title: 'x-url',
      type: 'url',
    }),
  ],
});
