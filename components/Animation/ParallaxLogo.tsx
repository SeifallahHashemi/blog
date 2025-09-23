'use client';

import CSS from '@/components/Icons/css';
import NextJsSvg from '@/components/Icons/next-js-svg';
import ReactSVG from '@/components/Icons/react-svg';
import ReduxSvg from '@/components/Icons/redux-svg';
import TailwindSvg from '@/components/Icons/tailwind-svg';
import TypescriptSvg from '@/components/Icons/typescript-svg';
import { wrap } from 'motion';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react';
import React, { useRef } from 'react';

const logos = [CSS, NextJsSvg, ReactSVG, ReduxSvg, TailwindSvg, TypescriptSvg];

interface Props {
  baseVelocity: number;
}
const ParallaxLogo = ({ baseVelocity = 100 }: Props): React.ReactElement => {
  const baseX = useMotionValue<number>(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-100, 100, v)}%`);

  const directionFactor = useRef<number>(1);

  useAnimationFrame((timestamp, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });
  return (
    <div className="overflow-hidden tracking-tighter leading-[0.8] m-0 whitespace-nowrap flex flex-nowrap w-full">
      <motion.div
        className="flex flex-nowrap whitespace-nowrap w-full space-x-10"
        style={{ x }}
      >
        {logos.map((Logo, ind) => {
          return <Logo key={ind} />;
        })}
      </motion.div>
    </div>
  );
};

export default ParallaxLogo;
