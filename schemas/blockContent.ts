import { defineArrayMember, defineType } from 'sanity';

export default defineType({
  name: 'blockContent',
  title: 'post content',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
          { title: 'Underline', value: 'underline' },
          { title: 'Strike', value: 'strike-through' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              { name: 'href', type: 'url', title: 'URL' },
              { name: 'blank', type: 'boolean', title: 'Open in new tab' },
            ],
          },
          {
            name: 'internalLink',
            type: 'object',
            title: 'Internal Link',
            fields: [
              {
                name: 'reference',
                type: 'reference',
                to: [{ type: 'post' }, { type: 'author' }],
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: {
        hotspot: true,
        metadata: ['lqip', 'blurhash', 'palette'],
      },
      fields: [
        {
          name: 'caption',
          title: 'Image caption',
          type: 'string',
          description: 'Text displayed below the image.',
        },
        {
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Important for SEO and accessiblity.',
        },
      ],
    }),
    defineArrayMember({
      type: 'code',
      options: {
        language: 'typescript',
        withFilename: true,
        languageAlternatives: [
          { title: 'Bash', value: 'bash' },
          { title: 'JavaScript', value: 'js' },
          { title: 'TypeScript', value: 'ts' },
          { title: 'TSX', value: 'tsx' },
          { title: 'JSX', value: 'jsx' },
          { title: 'CSS', value: 'css' },
          { title: 'Groq', value: 'graphql' },
          { title: 'HTML', value: 'html' },
          { title: 'Json', value: 'json' },
          { title: 'Markdown', value: 'md' },
          { title: 'Python', value: 'py' },
          { title: 'SCSS', value: 'scss' },
          { title: 'SQL', value: 'sql' },
          { title: 'Yaml', value: 'yaml' },
          { title: 'Java', value: 'java' },
        ],
      },
    }),
    // defineArrayMember({
    //   type: 'youtube',
    // }),
    defineArrayMember({
      type: 'customTable',
    }),
  ],
});
