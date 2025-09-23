import RefLink from '@/components/Shared/RefLink';
import DarkNextJs from '@/public/img/Next.js_wordmark_dark.svg';
import LightNextJs from '@/public/img/Next.js_wordmark_light.svg';
import Sanity from '@/public/img/sanity.svg';
import DarkVercel from '@/public/img/Vercel_wordmark_dark.svg';
import LightVercel from '@/public/img/Vercel_wordmark_light.svg';
import Image from 'next/image';
import React from 'react';

const Footer = () => {
  return (
    <footer
      className={
        'w-screen overflow-clip h-fit p-6 border-t border-t-zinc-200 dark:border-zinc-900 transition-colors duration-300'
      }
    >
      <div
        className={
          'w-full max-w-6xl mx-auto flex flex-col sm:flex-row gap-y-4 sm:gap-y-0 justify-between items-center'
        }
      >
        <div className={'flex gap-2 items-center'}>
          <h3 className={'font-iranYWR font-medium text-xs'}>
            فناوری مورد استفاده:
          </h3>
          <ul className={'flex flex-wrap gap-2 items-center'}>
            <li>
              <RefLink href={'https://sanity.io'} target={'_blank'}>
                <Image
                  src={Sanity}
                  alt={'sanity logo'}
                  width={40}
                  height={40}
                />
              </RefLink>
            </li>
            <li>
              <RefLink href={'https://nextjs.org'} target={'_blank'}>
                <Image
                  alt={'Next.js Logo'}
                  src={LightNextJs}
                  width={40}
                  height={40}
                  className={'dark:hidden inline-flex'}
                />
                <Image
                  alt={'Next.js Logo'}
                  src={DarkNextJs}
                  width={40}
                  height={40}
                  className={'hidden dark:inline-flex'}
                />
              </RefLink>
            </li>
            <li>
              <RefLink href={''} target={'_blank'}>
                <Image
                  alt={'Vercel Logo'}
                  src={LightVercel}
                  width={40}
                  height={40}
                  className={'dark:hidden inline-flex'}
                />
                <Image
                  alt={'Vercel Logo'}
                  src={DarkVercel}
                  width={40}
                  height={40}
                  className={'hidden dark:inline-flex'}
                />
              </RefLink>
            </li>
          </ul>
        </div>
        <div>
          <small className="text-zinc-500 font-mono text-xs">
            Copyright &copy; Sepehr Dev {new Date().getFullYear()} All rights
            Reserved
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
