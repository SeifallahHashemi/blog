'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  usePresence,
  useScroll,
  useTransform,
} from 'motion/react';

const ScrollPresenceAnimator = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isPresent, safeToRemove] = usePresence();
  const [toggleList, setToggleList] = useState<boolean>(true);
  const [scrollYPosition, setScrollYPosition] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const pos =
        ref.current != null
          ? (() => {
              const rect = ref.current.getBoundingClientRect();
              return rect.top + 300;
            })()
          : 0;
      setScrollYPosition(pos);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const opacity = useTransform(scrollY, [0, scrollYPosition], [1, 0]);

  useMotionValueEvent(opacity, 'change', (latest) => {
    if (latest === 0) {
      setToggleList(false);
    } else if (latest > 0) {
      setToggleList(true);
    }
  });

  useEffect(() => {
    if (!isPresent) {
      safeToRemove();
    }
  }, [isPresent, safeToRemove]);

  return (
    <AnimatePresence>
      <section className={'h-screen relative'} ref={ref}>
        {toggleList && (
          <motion.div
            key={'toggle-list'}
            style={{
              opacity,
            }}
          >
            {children}
          </motion.div>
        )}
      </section>
    </AnimatePresence>
  );
};

export default ScrollPresenceAnimator;
