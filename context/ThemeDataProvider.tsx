'use client';

import setGlobalColorTheme from '@/lib/theme-colors';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useTheme, type ThemeProviderProps } from 'next-themes';

const ThemeContext = createContext<ThemeColorStateParams>(
  {} as ThemeColorStateParams
);

export default function ThemeDataProvider({ children }: ThemeProviderProps) {
  const getSavedThemeColor = () => {
    try {
      return (localStorage.getItem('themeColor') as ThemeColors) || 'Zinc';
    } catch {}
  };

  const [themeColor, setThemeColor] = useState<ThemeColors>(
    getSavedThemeColor() as ThemeColors
  );
  const isMounted = useRef<boolean>(false);
  const { theme } = useTheme();

  useEffect(() => {
    localStorage.setItem('themeColor', themeColor);
    setGlobalColorTheme(theme as 'light' | 'dark', themeColor);

    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, [themeColor, theme, isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
