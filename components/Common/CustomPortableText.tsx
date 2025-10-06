import { TableValueProps } from '@/types';
import { PortableTextComponents } from 'next-sanity';
import Link from 'next/link';
import { BiLinkExternal, BiSolidQuoteRight } from 'react-icons/bi';
import CodeBlock from './CodeBlock';
import HashScroll, { slugify } from './HashScroll';
import PortableImage from './PortableImage';
import Table from './Table';

export const CustomPortableText: PortableTextComponents = {
  types: {
    image: PortableImage,
    code: CodeBlock,
    customTable: ({ value }: { value: TableValueProps }) => (
      <Table value={value} />
    ),
  },
  block: {
    normal: ({ children }) => (
      <p className="basic-font-styles py-2 text-pretty !leading-loose text-zinc-900 dark:text-zinc-300">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2
        id={slugify(String(children))}
        className={
          "before:content-['#'] before:hidden hover:before:sm:inline-block hover:before:hidden before:absolute lg:before:-left-5 before:-left-4 lg:before:text-2xl before:text-xl block before:top-1/2 before:-translate-y-1/2 before:opacity-80 dark:before:text-zinc-500 before:text-zinc-400"
        }
      >
        <HashScroll text={children} />
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        id={slugify(String(children))}
        className={
          "before:content-['#'] before:hidden hover:before:sm:inline-block hover:before:hidden before:absolute lg:before:-left-5 before:-left-4 lg:before:text-2xl before:text-xl block before:top-1/2 before:-translate-y-1/2 before:opacity-80 dark:before:text-zinc-500 before:text-zinc-400"
        }
      >
        <HashScroll text={children} />
      </h3>
    ),
    h4: ({ children }) => (
      <h4
        id={slugify(String(children))}
        className={
          "before:content-['#'] before:hidden hover:before:sm:inline-block hover:before:hidden before:absolute lg:before:-left-5 before:-left-4 lg:before:text-2xl before:text-xl block before:top-1/2 before:-translate-y-1/2 before:opacity-80 dark:before:text-zinc-500 before:text-zinc-400"
        }
      >
        <HashScroll text={children} />
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="relative overflow-hidden tracking-tight text-lg my-8 lg:py-6 lg:pl-6 pr-12 p-4 border dark:border-zinc-800 border-zinc-200 rounded-md">
        <BiSolidQuoteRight
          className="text-7xl absolute -top-7 -right-5 -rotate-12 dark:text-zinc-800 text-zinc-200"
          aria-hidden="true"
        />
        {children}
      </blockquote>
    ),
  },
  marks: {
    em: ({ children }) => (
      <em className="font-incognito font-medium italic">{children}</em>
    ),
    strong: ({ children }) => (
      <strong className="font-bold dark:text-zinc-300 text-zinc-700">
        {children}
      </strong>
    ),
    link: ({ children, value }) => {
      return (
        <Link
          href={value?.href}
          className="dark:text-blue-400 text-blue-500 hover:underline"
        >
          {children} <BiLinkExternal className="inline" aria-hidden="true" />
        </Link>
      );
    },
    code: ({ children }) => (
      <code className="font-incognito py-[0.15rem] px-1 rounded-sm font-medium dark:bg-primary-bg bg-secondary-bg dark:text-zinc-200 text-pink-500">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-[square] mt-5 ml-5">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal mt-5 ml-5">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-4">{children}</li>,
    number: ({ children }) => <li className="mb-4">{children}</li>,
  },
};
