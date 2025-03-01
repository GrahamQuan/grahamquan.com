import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';

import Footer from '@/components/screen/footer';
import Header from '@/components/screen/header';
import ThemeScript from '@/components/scripts/theme-script';
import { ThemeProvider } from '@/components/theme-toggle';

import './globals.css';

import CloudflareAnalyticsScript from '@/components/scripts/cloudflare-analytics-script';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL as string),
  title: 'Graham Quan Blog',
  description: 'Next.js | TailwindCSS | TypeScript | React | Blog | node | express | vite | react-native | expo',
  keywords: [
    'Next.js',
    'TailwindCSS',
    'TypeScript',
    'React',
    'Blog',
    'node',
    'express',
    'vite',
    'react-native',
    'expo',
  ],
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
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string} />
        <CloudflareAnalyticsScript />
      </head>
      <body className='border-color mdx:border-x relative flex min-h-dvh w-dvw max-w-screen flex-col overflow-x-hidden antialiased'>
        <ThemeProvider>
          <Header />
          <div className='mdx:grid-cols-[auto_2rem_56rem_2rem_auto] grid grid-cols-[12px_auto_12px] grid-rows-[1fr_auto]'>
            <div className='border-color mdx:block mdx:border-l mdx:col-start-2 col-start-0 row-span-1' />
            <div className='border-color mx-auto min-h-full w-full max-w-4xl border-x'>
              <main className='w-full'>{children}</main>
              <Footer />
            </div>
            <div className='border-color mdx:block mdx:border-r mdx:col-start-4 col-start-2 row-span-1' />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
