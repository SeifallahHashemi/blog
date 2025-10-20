'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
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

  // useLayoutEffect برای خواندن DOM و ست کردن state قبل از paint
  useLayoutEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const pos = rect.top + 300;
      setScrollYPosition(pos);
    }
    // اگر لازم باشه می‌تونی dependency اضافه کنی، ولی این برای mount اولیه کافیه
  }, []); // اجرا در mount

  const opacity = useTransform(scrollY, [0, scrollYPosition], [1, 0]);

  useEffect(() => {
    const unsubscribe = opacity.on('change', (latest) => {
      if (latest === 0) {
        setToggleList(false);
      } else if (latest > 0) {
        setToggleList(true);
      }
    });
    return unsubscribe;
  }, [opacity]);

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
