'use client';

import ReactLenis, { LenisRef } from 'lenis/react';
import { cancelFrame, frame } from 'motion/react';
import React, { useEffect, useRef } from 'react';

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
