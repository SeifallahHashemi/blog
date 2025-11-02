'use client';

import AnimationData from '@/public/animations/circle-loader.json';
import React from 'react';
import Lottie from 'lottie-react';

const Loading = () => {
  return (
    <div className={'w-full h-full flex justify-center items-center'}>
      <Lottie
        animationData={AnimationData}
        className={'text-zinc-800 dark:text-zinc-200'}
      />
    </div>
  );
};

export default Loading;
