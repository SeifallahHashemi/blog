'use client';

import React, { useEffect, useRef } from 'react';
import { LenisRef, ReactLenis } from 'lenis/react';
import { cancelFrame, frame } from 'motion/react';

const MotionLenis = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<LenisRef>(null);

  useEffect(() => {
    function update(data: { timestamp: number }) {
      const time = data.timestamp;
      ref.current?.lenis?.raf(time);
    }
    frame.update(update, true);

    return () => cancelFrame(update);
  }, []);
  return (
    <ReactLenis root ref={ref} options={{ autoRaf: false }}>
      {children}
    </ReactLenis>
  );
};

export default MotionLenis;
