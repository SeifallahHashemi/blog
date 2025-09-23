'use client';

import Github from '@/components/Icons/github';
import Instagram from '@/components/Icons/instagram';
import DockMenuThemeSwitcher from '@/components/Theme/DockMenuThemeSwitcher';
import { cn } from '@/lib/utils';
import { Hammer, Home, Notebook } from 'lucide-react';
import { MotionValue } from 'motion';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { Link } from 'next-view-transitions';
import React, { Fragment, useRef, useState } from 'react';

interface Items {
  title: string;
  icon: React.ReactNode;
  divider?: boolean;
}

type AnimatedDockProps = {
  items: Items[];
  className?: string;
};

type DockIcon = Items & {
  mouseX: MotionValue;
};

const DockAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsVisible(latest > 84);
  });
  return (
    <AnimatePresence mode={'popLayout'}>
      {isVisible && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{
            type: 'spring',
            mass: 0.1,
            stiffness: 150,
            damping: 12,
          }}
          className={'fixed bottom-0 left-0 w-full h-auto z-10'}
        >
          <AnimatedDock
            items={[
              {
                icon: <DockMenuThemeSwitcher />,
                title: 'تغییر تم',
                divider: true,
              },
              {
                icon: (
                  <Link
                    href={'/'}
                    className={
                      'size-9 hover:bg-accent dark:hover:bg-accent/50 rounded-full flex justify-center items-center'
                    }
                  >
                    <Github />
                  </Link>
                ),
                title: 'گیت هاب',
              },
              {
                icon: (
                  <Link
                    href={'/'}
                    className={
                      'size-9 hover:bg-accent dark:hover:bg-accent/50 rounded-full flex justify-center items-center'
                    }
                  >
                    <Instagram />
                  </Link>
                ),
                title: 'اینستاگرام',
                divider: true,
              },
              {
                icon: (
                  <Link
                    href={'/blog'}
                    className={
                      'size-9 hover:bg-accent dark:hover:bg-accent/50 rounded-full flex justify-center items-center'
                    }
                  >
                    <Notebook size={22} />
                  </Link>
                ),
                title: 'وبلاگ',
              },
              {
                icon: (
                  <Link
                    href={'/projects'}
                    className={
                      'size-9 hover:bg-accent dark:hover:bg-accent/50 rounded-full flex justify-center items-center'
                    }
                  >
                    <Hammer size={22} />
                  </Link>
                ),
                title: 'پروژه ها',
              },
              {
                icon: (
                  <Link
                    href={'/'}
                    className={
                      'size-9 hover:bg-accent dark:hover:bg-accent/50 rounded-full flex justify-center items-center'
                    }
                  >
                    <Home size={22} />
                  </Link>
                ),
                title: 'خانه',
              },
            ]}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AnimatedDock = ({ items, className }: AnimatedDockProps) => {
  const mouseXPosition = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(event) => {
        mouseXPosition.set(event.pageX);
      }}
      onMouseLeave={() => {
        mouseXPosition.set(Infinity);
      }}
      className={cn(
        'fixed bottom-4 left-1/2 -translate-x-1/2 hidden md:flex justify-center items-center gap-x-2 rounded-full border border-zinc-200 dark:border-zinc-900 bg-white/30 dark:bg-black/10 backdrop-blur-2xl h-16 py-2 px-4',
        className
      )}
    >
      {items.map((item) => (
        <Fragment key={item.title}>
          <DockIcon key={item.title} mouseX={mouseXPosition} {...item} />
          {item.divider && (
            <div
              className={cn(
                'shrink-0 bg-zinc-200 dark:bg-zinc-800 w-px h-10/12'
              )}
            />
          )}
        </Fragment>
      ))}
    </motion.div>
  );
};

const DockIcon = ({ mouseX, icon, title }: DockIcon) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const distanceFromMouse = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });
  const widthTransform = useTransform(
    distanceFromMouse,
    [-150, 0, 150],
    [40, 55, 40]
  );
  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  return (
    <motion.div
      ref={ref}
      style={{ width }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'relative flex justify-center items-center aspect-square rounded-full text-black dark:text-white'
      )}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 2, x: '-50%' }}
            className="absolute -top-8 left-1/2 w-fit whitespace-pre rounded-md border border-zinc-900 bg-slate-900 px-2 py-0.5 font-iranYWL text-xs text-zinc-200 dark:border-zinc-300 dark:bg-zinc-200 dark:text-zinc-800"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>
      <div className={'w-10 aspect-square flex justify-center items-center'}>
        {icon}
      </div>
    </motion.div>
  );
};

export default DockAnimation;
