import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex min-h-dvh flex-col items-center justify-center gap-12'>
      <h1 className='text-2xl font-bold'>Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link href='/' className='flex items-center gap-2 opacity-70 hover:opacity-100'>
        <span className='underline'>Go Home</span>
        <ArrowUpRight />
      </Link>
    </div>
  );
}
