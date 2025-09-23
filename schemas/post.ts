import { IoDocumentAttachSharp } from 'react-icons/io5';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: IoDocumentAttachSharp,
  fields: [
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: (rule) => rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'title',
      title: 'Post title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'summarize your articles in 150-160 characters',
      rows: 4,
      validation: (rule) => [
        rule
          .required()
          .min(100)
          .error('A description of min 100 characters is required'),
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      description:
        'Upload a cover image for this blog post. Recommended size 1200 x 750',
      options: { hotspot: true, metadata: ['lqip'] },
      validation: (rule) => rule.required(),
      fields: [
        {
          name: 'alt',
          title: 'Alt',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured posts',
      type: 'boolean',
      description: 'Add this post to the list of featured posts',
      initialValue: false,
    }),
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      description: 'Tick this if you will like to publish this post',
      initialValue: true,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
      validation: (rule) => rule.min(1).error('حداقل یک تگ لازم است'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      isPublished: 'isPublished',
      date: 'date',
      media: 'coverImage',
    },
    prepare(selection) {
      const { isPublished, date, title, media } = selection;
      return {
        title,
        media,
        subtitle: isPublished ? new Date(date).toDateString() : 'Draft',
      };
    },
  },
});
