import localFont from 'next/font/local';

export const iranYekanWebLight = localFont({
  src: [
    {
      path: 'iranyekanweblight.woff2',
      style: 'normal',
      weight: '500',
    },
  ],
  variable: '--iranYekanWebLight',
  style: 'swap',
});

export const iranYekanWebRegular = localFont({
  src: [
    {
      path: 'iranyekanwebregular.woff2',
      style: 'normal',
      weight: '500',
    },
  ],
  variable: '--iranYekanWebRegular',
  style: 'swap',
});

export const iranSans = localFont({
  src: [
    {
      path: 'iransansdn.woff2',
      style: 'normal',
      weight: '400',
    },
  ],
  variable: '--iranSans',
});
