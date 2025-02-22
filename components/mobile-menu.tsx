'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Menu, X } from 'lucide-react';

import { NavigationList } from '@/lib/constants';

import ThemeToggle from './theme-toggle';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTrigger } from './ui/drawer';

function NavList({
  title,
  list,
  onAfterClick,
}: {
  title: string;
  list: { title: string; href: string }[];
  onAfterClick: () => void;
}) {
  return (
    <div className='flex w-full flex-col gap-12'>
      <div className='text-lg font-semibold'>{title}</div>
      <ul className='flex w-full flex-col gap-16'>
        {list.map((item) => (
          <li key={item.href} className='w-full'>
            <Link
              href={item.href}
              onClick={onAfterClick}
              className='flex h-36 w-full items-center gap-4 rounded bg-black/5 px-8 dark:bg-white/5'
            >
              <ChevronRight className='size-16' />
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button className='mdx:hidden'>{open ? <X /> : <Menu />}</button>
      </DrawerTrigger>
      <DrawerContent className='h-[50dvh] px-24' barClassName='h-8 mt-8'>
        <DrawerHeader>
          {/* <DrawerTitle>Menu</DrawerTitle> */}
          <DrawerDescription className='flex flex-col gap-16'>
            <NavList
              title='Navigation'
              list={[{ title: 'Home', href: '/' }, ...NavigationList]}
              onAfterClick={handleClose}
            />
            <div className='h-px w-full bg-black/10 dark:bg-white/5' />
            <div className='flex items-center justify-between'>
              <div className='text-lg font-semibold'>Theme</div>
              <ThemeToggle />
            </div>
            <div className='h-px w-full bg-black/10 dark:bg-white/5' />
          </DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
