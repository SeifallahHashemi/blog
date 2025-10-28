'use client';

import AnimationData from '@/public/animations/Dark Mode Button.json';
import React, { useRef, useState } from 'react';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import { useTheme } from 'next-themes';

const ToggleThemeAnimation = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  // React Ref
  const animationRef = useRef<LottieRefCurrentProps>(null);
  // Theme
  const { theme, setTheme } = useTheme();

  const config = () => {
    if (!animationRef.current) return;
    animationRef.current?.setSpeed(2);
    if (theme === 'dark') {
      animationRef.current.goToAndStop(240, true);
    }
  };

  const handleToggleTheme = () => {
    if (!animationRef.current || isPlaying) return;
    setIsPlaying(true);
    if (theme === 'dark') {
      animationRef.current?.playSegments([240, 0], true);
      setTheme('light');
    } else {
      animationRef.current?.playSegments([0, 240], true);
      setTheme('dark');
    }
  };

  return (
    <Lottie
      onDOMLoaded={config}
      onClick={handleToggleTheme}
      lottieRef={animationRef}
      animationData={AnimationData}
      onComplete={() => {
        setIsPlaying(false);
      }}
      loop={false}
      autoplay={false}
      className={'cursor-pointer size-20'}
    />
  );
};

export default ToggleThemeAnimation;
