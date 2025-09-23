'use client';

import MotionLenis from '@/components/Providers/MotionLenis';
import ThemeDataProvider from '@/context/ThemeDataProvider';
import { ThemeProvider } from 'next-themes';
import React from 'react';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      enableSystem={true}
      attribute={'class'}
      defaultTheme={'system'}
    >
      <ThemeDataProvider>
        <MotionLenis>{children}</MotionLenis>
      </ThemeDataProvider>
    </ThemeProvider>
  );
};

export default Providers;
