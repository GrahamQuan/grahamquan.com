'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NavigationList } from '@/lib/constants';
import { cn } from '@/lib/utils';

import BlogTableOfContents from '../blog/blog-table-of-contents';
import GridLine from '../grid-layout/grid-line';
import MobileMenu from './mobile-menu';

function HeaderItem({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  const pathname = usePathname();
  const withoutTrailingSlash = pathname === '/' ? pathname : pathname.replace(/\/$/, '');
  const isActive =
    href === '/'
      ? withoutTrailingSlash === href
      : withoutTrailingSlash.startsWith(`${href}/`) || withoutTrailingSlash === href;

  return (
    <Link
      href={href}
      className={cn(
        'border-color relative flex h-full items-center justify-center border-l px-12 opacity-60 first:border-l-0 hover:opacity-100',
        isActive && 'opacity-100',
        className,
      )}
    >
      {children}
      <div
        className={cn(
          'absolute bottom-0 left-1/2 h-2 w-[calc(100%-12px)] -translate-x-1/2 rounded-full bg-black opacity-0 transition-all dark:bg-white',
          isActive && 'opacity-100',
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
        <div className='mdx:block mdx:-left-33 bg-border-color absolute top-0 left-12 h-full w-px' />
        <div className='flex h-full items-center gap-12'>
          <HeaderItem href='/' className='border-l-0 px-0'>
            Home
          </HeaderItem>
          <BlogTableOfContents />
        </div>
        <MobileMenu />
        <div className='border-color mdx:flex ml-auto hidden h-full border-l'>
          {NavigationList.map((el) => (
            <HeaderItem key={el.href} href={el.href}>
              {el.title}
            </HeaderItem>
          ))}
        </div>
        <div className='mdx:block mdx:-right-33 bg-border-color absolute top-0 right-12 h-full w-px' />
      </nav>
      <GridLine />
    </header>
  );
}
