import { FiYoutube } from 'react-icons/fi';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'youtube',
  title: 'Youtube video',
  type: 'object',
  icon: FiYoutube,
  fields: [
    defineField({
      name: 'title',
      title: 'Video Title',
      type: 'string',
      initialValue: 'Youtube video',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      url: 'url',
    },
  },
  // components: {
  //   preview: YoutubeWidget,
  // },
});
