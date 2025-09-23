import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import {
  iranSans,
  iranYekanWebLight,
  iranYekanWebRegular,
} from '@/app/_fonts/font';
import DockAnimation from '@/components/Animation/DockAnimation';
import Footer from '@/components/Global/Footer';
import Header from '@/components/Global/Header';
import Providers from '@/components/Providers/Providers';
import { ViewTransitions } from 'next-view-transitions';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'سپهر هاشمی | توسعه دهنده Next.js',
  description:
    'وبلاگ و نمونه کارهای سپهر هاشمی، توسعه دهنده ارشد فرانت‌اند با تخصص در Next.js، React و TypeScript. مقالات آموزشی، پروژه‌های منبع باز و نکات توسعه وب را کشف کنید.',
  keywords: [
    'سپهر هاشمی',
    'توسعه دهنده وب',
    'Next.js',
    'React',
    'TypeScript',
    'فرانت‌اند',
    'وبلاگ توسعه وب',
    'منابع باز',
    'آموزش برنامه نویسی',
  ],
  authors: [{ name: 'سپهر هاشمی', url: 'https://sepehr.dev' }],
  creator: 'سپهر هاشمی',
  publisher: 'سپهر هاشمی',
  metadataBase: new URL('https://sepehr.dev'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="fa" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${iranSans.variable} ${iranYekanWebLight.variable} ${iranYekanWebRegular.variable} antialiased !bg-background max-w-screen overflow-x-clip`}
        >
          <main
            className={'min-h-screen w-screen max-w-[100dvw] overflow-x-clip'}
            // dir={'rtl'}
            style={{
              direction: 'rtl',
            }}
          >
            <Providers>
              <Header />
              <DockAnimation />
              {children}
              <Footer />
            </Providers>
          </main>
        </body>
      </html>
    </ViewTransitions>
  );
}
