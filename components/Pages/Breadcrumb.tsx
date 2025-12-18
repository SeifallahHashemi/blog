'use client';

import { Link } from 'next-view-transitions';
import { usePathname } from 'next/navigation';

const Breadcrumb = () => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter((segment) => segment);
  type RoutePath = Parameters<typeof Link>[0]['href'];

  return (
    <ol
      className="flex items-center justify-start whitespace-nowrap font-sans tracking-tight capitalize"
      dir={'ltr'}
    >
      {segments?.slice(0, -2).map((item, i) => (
        <li className="inline-flex items-center" key={i}>
          <Link
            className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-hidden focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
            href={`/${item.toLowerCase()}` as RoutePath}
          >
            {/* Icon */}
            {item}
          </Link>
          <svg
            className="shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </li>
      ))}
      <li
        className="inline-flex items-center text-sm font-semibold text-gray-800 truncate dark:text-neutral-200"
        aria-current="page"
      >
        {decodeURI(segments[segments.length - 2])}
      </li>
    </ol>
  );
};

export default Breadcrumb;
