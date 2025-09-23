'use client';

import { Button } from '@/components/ui/button';
import Logo from '@/public/img/logo.webp';
import { BookMarked, FlaskConical, Menu, User, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React, { useState } from 'react';

const data = [
  {
    title: 'درباره من',
    href: '/about',
    Icon: User,
  },
  {
    title: 'پروژه ها',
    href: '/projects',
    Icon: FlaskConical,
  },
  {
    title: 'بلاگ',
    href: '/blog',
    Icon: BookMarked,
  },
] as const;

const MobileMenu = () => {
  const [toggleMobileNav, setToggleMobileNav] = useState<boolean>(false);

  const onToggleMobileNav = (): void => {
    setToggleMobileNav((prevState) => {
      document.body.style.overflowY = prevState ? 'auto' : 'hidden';
      return !prevState;
    });
  };

  return (
    <AnimatePresence mode={'popLayout'}>
      <Button
        variant={'outline'}
        size={'icon'}
        aria-label={'Toggle Menu'}
        onClick={onToggleMobileNav}
        className={'md:hidden'}
        key={'MobileMenu-1'}
      >
        <Menu />
      </Button>
      {toggleMobileNav && (
        <motion.div
          initial={{
            translateX: '-100%',
          }}
          animate={{
            translateX: '0%',
          }}
          exit={{
            translateX: '-100%',
          }}
          transition={{
            duration: 0.7,
            type: 'tween',
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className={
            'w-full h-full fixed top-0 left-0 z-40 transform md:hidden bg-white dark:bg-zinc-900'
          }
          key={'MobileMenu-2'}
        >
          <div className={'mt-6 px-8 flex justify-between items-center'}>
            <Link href={'/'}>
              <Image
                src={Logo}
                alt={'Logo'}
                priority={true}
                width={50}
                height={50}
              />
            </Link>
            <Button
              variant={'outline'}
              size={'icon'}
              aria-label={'Toggle Menu'}
              onClick={onToggleMobileNav}
            >
              <X />
            </Button>
          </div>
          <nav className={'mt-6 flex flex-col'}>
            {data.map(({ title, href, Icon }) => (
              <Link
                key={'link-' + title}
                href={href}
                className={
                  'flex flex-row justify-start items-center gap-x-2 p-5 group font-iranYWL text-lg border-b dark:border-b-zinc-800 border-b-zinc-200'
                }
                onClick={onToggleMobileNav}
              >
                <Icon
                  aria-hidden={true}
                  className={
                    'text-zinc-500 group-hover:dark:text-white group-hover:text-zinc-800 duration-300'
                  }
                  strokeWidth={1}
                  size={24}
                />
                {title}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
