'use client';

import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import React from 'react';

const DockMenuThemeSwitcher = () => {
  const { setTheme, theme } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon"
      className={'cursor-pointer !rounded-full'}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Sun
        className="!w-5.5 !h-5.5 rotate-0 scale-100 transition-all dark:-rotate-90
          dark:scale-0"
      />
      <Moon
        className="absolute !w-5.5 !h-5.5 rotate-90 scale-0 transition-all dark:rotate-0
          dark:scale-100"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default DockMenuThemeSwitcher;
