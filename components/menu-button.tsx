'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';

function BarItem({ className }: { className: string }) {
  return (
    <span className={cn('absolute block h-2 w-18 transform bg-white transition duration-300 ease-in-out', className)} />
  );
}

export default function MenuButton() {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <button type='button' className='mdx:hidden relative' onClick={onClick}>
      <div className='absolute block h-32 w-20 -translate-x-1/2 -translate-y-1/2 transform space-y-2'>
        <BarItem className={isOpen ? 'rotate-45' : '-translate-y-1.5'} />
        <BarItem className={isOpen ? 'opacity-0' : ''} />
        <BarItem className={isOpen ? '-rotate-45' : 'translate-y-1.5'} />
      </div>
    </button>
  );
}
