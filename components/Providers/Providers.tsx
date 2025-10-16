'use client';

import MotionLenis from '@/components/Providers/MotionLenis';
import ThemeDataProvider from '@/context/ThemeDataProvider';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { FormDevtoolsPlugin } from '@tanstack/react-form-devtools';
import React from 'react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';


const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider
        enableSystem={true}
        attribute={'class'}
        defaultTheme={'system'}
      >
        <ThemeDataProvider>
          <MotionLenis>{children}</MotionLenis>
        </ThemeDataProvider>
      </ThemeProvider>
      <TanStackDevtools
        config={{ hideUntilHover: true }}
        plugins={[FormDevtoolsPlugin()]}
      />
      <Toaster />
    </>
  );
};

export default Providers;