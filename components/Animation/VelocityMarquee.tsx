'use client';

import CSS from '@/components/Icons/css';
import NextJsSvg from '@/components/Icons/next-js-svg';
import ReactSVG from '@/components/Icons/react-svg';
import ReduxSvg from '@/components/Icons/redux-svg';
import TailwindSvg from '@/components/Icons/tailwind-svg';
import TypescriptSvg from '@/components/Icons/typescript-svg';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react';
import React, { useRef } from 'react';

const upperMarquee = [
  CSS,
  NextJsSvg,
  ReactSVG,
  ReduxSvg,
  TailwindSvg,
  TypescriptSvg,
];

const VelocityMarquee = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end 0%'],
  });
  const scrollVelocity = useVelocity(scrollYProgress);
  const skewXRaw = useTransform(
    scrollVelocity,
    [-0.5, 0.5],
    ['45deg', '-45deg']
  );
  const skewX = useSpring(skewXRaw, {
    mass: 3,
    stiffness: 400,
    damping: 50,
  });
  const xRaw = useTransform(scrollYProgress, [0, 1], ['75%', '-75%']);
  const x = useSpring(xRaw);
  return (
    <div className={'flex flex-col gap-y-4 w-full'} ref={targetRef}>
      <motion.div
        style={{
          skewX,
          x,
        }}
        className={'w-full flex shrink-0 justify-between items-center gap-x-10'}
      >
        {upperMarquee.map((Logo, ind) => {
          return <Logo key={ind} />;
        })}
      </motion.div>
    </div>
  );
};

export default VelocityMarquee;
