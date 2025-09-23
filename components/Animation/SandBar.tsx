'use client';

import React from 'react';

const SandBar = () => {
  return (
    <div
      style={{
        height: '2rem',
      }}
      className={
        'w-4 rounded-4xl bg-white/50 dark:bg-black/10 backdrop-blur-3xl border border-zinc-200 dark:border-zinc-900 overflow-clip origin-top'
      }
    >
      <div
        style={{
          top: '-100%',
        }}
        className={
          'absolute left-0 w-full h-full bg-zinc-200 dark:bg-zinc-900 rounded-4xl'
        }
      ></div>
    </div>
  );
};

export default SandBar;
