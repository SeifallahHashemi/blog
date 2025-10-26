'use client';

import MotionLenis from '@/components/Providers/MotionLenis';
import ThemeDataProvider from '@/context/ThemeDataProvider';
import { getClientQuery } from '@/lib/get-client-query';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { FormDevtoolsPlugin } from '@tanstack/react-form-devtools';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { ThemeProvider } from 'next-themes';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Toaster } from 'sonner';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getClientQuery();
  return (
    <>
      <ThemeProvider enableSystem attribute={'class'} defaultTheme={'system'}>
        <ThemeDataProvider>
          <MotionLenis>
            <NuqsAdapter>
              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>
            </NuqsAdapter>
          </MotionLenis>
        </ThemeDataProvider>
      </ThemeProvider>
      <TanStackDevtools
        config={{ hideUntilHover: true }}
        plugins={[FormDevtoolsPlugin()]}
      />
      <Toaster closeButton richColors theme="system" />
    </>
  );
};

export default Providers;
