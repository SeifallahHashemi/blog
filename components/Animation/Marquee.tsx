'use client';

import CSS from '@/components/Icons/css';
import NextJsSvg from '@/components/Icons/next-js-svg';
import ReactSVG from '@/components/Icons/react-svg';
import ReduxSvg from '@/components/Icons/redux-svg';
import TailwindSvg from '@/components/Icons/tailwind-svg';
import TypescriptSvg from '@/components/Icons/typescript-svg';
import { motion } from 'motion/react';
import React from 'react';

const upperMarquee = [
  CSS,
  NextJsSvg,
  ReactSVG,
  ReduxSvg,
  TailwindSvg,
  TypescriptSvg,
];

const Marquee = () => {
  return (
    <div className={'flex flex-row-reverse w-full max-w-screen mask-gradient'}>
      <motion.div
        className={'flex shrink-0'}
        initial={{ x: '0%' }}
        animate={{ x: '-100%' }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {upperMarquee.map((Logo, ind) => (
          <div key={'marquee1-' + ind} className={'pr-8'}>
            <Logo />
          </div>
        ))}
      </motion.div>
      <motion.div
        className={'flex shrink-0'}
        initial={{ x: '0%' }}
        animate={{ x: '-100%' }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {upperMarquee.map((Logo, ind) => (
          <div key={'marquee1-' + ind} className={'pr-8'}>
            <Logo />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
