'use client';

import { cn } from '@/lib/utils';
import React from 'react';

const CircleLoadingSpinner = ({ className }: { className?: string }) => {
  return (
    <div className={cn('', className)}>
      <div className={'sk-circle size-5'}>
        <div className={'sk-circle1 sk-child'} />
        <div className={'sk-circle2 sk-child'} />
        <div className={'sk-circle3 sk-child'} />
        <div className={'sk-circle4 sk-child'} />
        <div className={'sk-circle5 sk-child'} />
        <div className={'sk-circle6 sk-child'} />
        <div className={'sk-circle7 sk-child'} />
        <div className={'sk-circle8 sk-child'} />
        <div className={'sk-circle9 sk-child'} />
        <div className={'sk-circle10 sk-child'} />
        <div className={'sk-circle11 sk-child'} />
        <div className={'sk-circle12 sk-child'} />
      </div>
    </div>
  );
};

export default CircleLoadingSpinner;
