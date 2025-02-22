import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

import { GoogleAnalytics } from '@next/third-parties/google';

import Footer from '@/components/footer';
import Header from '@/components/header';
import ThemeScript from '@/components/scripts/theme-script';
import { ThemeProvider } from '@/components/theme-toggle';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL as string),
  title: 'Graham Quan Blog',
  description: 'Next.js | TailwindCSS | TypeScript | React | Blog',
  keywords: ['Next.js', 'TailwindCSS', 'TypeScript', 'React', 'Blog'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body
        className={`${inter.variable} font-inter border-color relative flex min-h-dvh w-dvw flex-col border-x antialiased`}
      >
        <ThemeProvider>
          <Header />
          <div className='mdx:grid-cols-[auto_2rem_56rem_2rem_auto] mdx:grid-rows-[1fr_auto] grid grid-cols-[auto_2rem_375px_2rem_auto]'>
            <div className='border-color col-start-2 row-span-1 border-l' />
            <div className='border-color mx-auto min-h-full w-full max-w-(--size-pc) border-x'>
              <main className='w-full'>{children}</main>
              <Footer />
            </div>
            <div className='border-color col-start-4 row-span-1 border-r' />
          </div>
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string} />
    </html>
  );
}
