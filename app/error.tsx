'use client';

import { ArrowUpRight, RotateCw } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

export default function ErrorComponent({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='flex min-h-dvh flex-col items-center justify-center gap-12'>
      <h1 className='text-2xl font-bold'>Something went wrong!</h1>
      <div className='flex items-center gap-16'>
        <button onClick={() => reset()} className='flex cursor-pointer items-center gap-2 opacity-40 hover:opacity-100'>
          <span className='underline'>Refreshing</span>
          <RotateCw className='size-16' />
        </button>
        <span>|</span>
        <Link href='/' className='flex items-center gap-2 opacity-40 hover:opacity-100'>
          <span className='underline'>Go Home</span>
          <ArrowUpRight />
        </Link>
      </div>
    </div>
  );
}
