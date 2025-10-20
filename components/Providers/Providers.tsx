'use client';

import MotionLenis from '@/components/Providers/MotionLenis';
import ThemeDataProvider from '@/context/ThemeDataProvider';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { FormDevtoolsPlugin } from '@tanstack/react-form-devtools';
import React from 'react';
import { ThemeProvider } from 'next-themes';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Toaster } from 'sonner';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider enableSystem attribute={'class'} defaultTheme={'system'}>
        <ThemeDataProvider>
          <MotionLenis>
            <NuqsAdapter>{children}</NuqsAdapter>
          </MotionLenis>
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
