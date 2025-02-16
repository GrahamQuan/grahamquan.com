'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// import { Plus } from 'lucide-react';

import { NavigationList } from '@/lib/constants';
import { cn } from '@/lib/utils';

import GridLine from './grid-line';

function HeaderItem({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        'border-color relative flex h-full items-center justify-center border-l px-12 opacity-60 first:border-l-0 hover:opacity-100',
        pathname.includes(href) && 'opacity-100',
        className,
      )}
    >
      {children}
      <div
        className={cn(
          'absolute bottom-0 left-1/2 h-px w-[calc(100%-12px)] -translate-x-1/2 rounded-full bg-black opacity-0 transition-all dark:bg-white',
          pathname.includes(href) && 'opacity-100',
        )}
      />
    </Link>
  );
}

export default function Header() {
  return (
    <header className='sticky top-0 z-50 w-full backdrop-blur-md'>
      <GridLine />
      <nav className='border-color relative mx-auto flex h-64 max-w-4xl items-center justify-between gap-12 border-x pl-12'>
        {/* <Plus className='absolute -bottom-12 -left-12 -translate-x-0.5 opacity-70' strokeWidth={1} /> */}
        <div className='absolute top-0 -left-33 h-full w-px bg-gray-950/5 dark:bg-white/10' />
        <Link href='/'>Home</Link>
        <div className='border-color ml-auto flex h-full border-l'>
          {NavigationList.map((el) => (
            <HeaderItem key={el.href} href={el.href}>
              {el.title}
            </HeaderItem>
          ))}
        </div>
        <div className='absolute top-0 -right-33 h-full w-px bg-gray-950/5 dark:bg-white/10' />
      </nav>
      <GridLine />
    </header>
  );
}
