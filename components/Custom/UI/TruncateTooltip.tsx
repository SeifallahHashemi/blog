'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

interface Props {
  text: string;
}

const variants = (tWidth: number) => ({
  initial: {
    translateX: 5,
  },
  animate: {
    translateX: [tWidth * -1, tWidth],
  },
});

const TruncateTooltip = ({ text }: Props) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState<number>(0);
  const [hover, setHover] = useState<boolean>(false);

  useEffect(() => {
    if (!ref.current) return;
    const tWidth = ref.current.getBoundingClientRect().width / 2;
    setWidth(tWidth);
  }, []);

  return (
    <p
      className={
        'inline-flex opacity-0 group-hover:opacity-100 transition duration-75 cursor-context-menu absolute top-0 right-0 left-0 h-full w-full text-nowrap font-normal text-xs font-sans leading-relaxed tracking-tight dark:bg-black dark:text-white bg-white text-black z-10'
      }
      onMouseEnter={() => setHover(true)}
    >
      <span className="absolute z-10 left-0 top-0 h-full w-8 bg-gradient-to-r from-white dark:from-black to-transparent pointer-events-none" />
      <span className="absolute z-10 right-0 top-0 h-full w-8 bg-gradient-to-l from-white dark:from-black to-transparent pointer-events-none" />
      <motion.span
        ref={ref}
        initial={'initial'}
        animate={hover ? 'animate' : 'initial'}
        variants={variants(width)}
        transition={{
          type: 'tween',
          ease: 'linear',
          repeat: Infinity,
          duration: 10,
          repeatType: 'reverse',
        }}
        className={'select-none'}
      >
        {text}
      </motion.span>
    </p>
  );
};

export default TruncateTooltip;
