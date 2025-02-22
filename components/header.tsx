'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NavigationList } from '@/lib/constants';
import { cn } from '@/lib/utils';

import GridLine from './grid-layout/grid-line';
import MobileMenu from './mobile-menu';

function HeaderItem({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  const pathname = usePathname();
  const withoutTrailingSlash = pathname.replace(/\/$/, '');

  return (
    <Link
      href={href}
      className={cn(
        'border-color relative flex h-full items-center justify-center border-l px-12 opacity-60 first:border-l-0 hover:opacity-100',
        withoutTrailingSlash === href && 'opacity-100',
        className,
      )}
    >
      {children}
      <div
        className={cn(
          'absolute bottom-0 left-1/2 h-px w-[calc(100%-12px)] -translate-x-1/2 rounded-full bg-black opacity-0 transition-all dark:bg-white',
          withoutTrailingSlash === href && 'opacity-100',
        )}
      />
    </Link>
  );
}

export default function Header() {
  return (
    <header className='sticky top-0 z-50 w-full backdrop-blur-md'>
      <GridLine />
      <nav className='border-color mdx:border-x mdx:pr-0 mdx:pl-12 relative mx-auto flex h-64 max-w-4xl items-center justify-between gap-12 pr-24 pl-24'>
        <div className='mdx:block mdx:-left-33 absolute top-0 left-12 h-full w-px bg-gray-950/5 dark:bg-white/10' />
        <Link href='/'>Home</Link>
        <MobileMenu />
        <div className='border-color mdx:flex ml-auto hidden h-full border-l'>
          {NavigationList.map((el) => (
            <HeaderItem key={el.href} href={el.href}>
              {el.title}
            </HeaderItem>
          ))}
        </div>
        <div className='mdx:block mdx:-right-33 absolute top-0 right-12 h-full w-px bg-gray-950/5 dark:bg-white/10' />
      </nav>
      <GridLine />
    </header>
  );
}
