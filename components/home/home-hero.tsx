import Link from 'next/link';

import { AUTHOR } from '@/lib/constants';

import GrahamQuanSignature from './graham-quan-signature';

function IndexLink({ href, label, value }: { href: string; label: string; value: number }) {
  return (
    <Link
      href={href}
      className='border-color group flex items-center justify-between border-t px-16 py-14 font-mono text-sm hover:bg-black/[0.035] dark:hover:bg-white/[0.045]'
    >
      <span className='opacity-60 group-hover:opacity-100'>{label}</span>
      <span>{String(value).padStart(2, '0')}</span>
    </Link>
  );
}

export default function HomeHero({ articleCount, projectCount }: { articleCount: number; projectCount: number }) {
  return (
    <section className='border-color mdx:grid-cols-[minmax(0,1fr)_208px] grid min-h-448 grid-cols-1 border-b'>
      <div className='flex min-w-0 flex-col justify-between p-24 mdx:p-36'>
        <h1 className='w-full max-w-560' aria-label='Graham Quan'>
          <GrahamQuanSignature />
        </h1>

        <div className='flex items-center gap-8 font-mono text-xs tracking-widest uppercase opacity-55'>
          <span className='size-6 rounded-full bg-emerald-500' />
          Building and writing for the web
        </div>

        <p className='max-w-xl text-pretty text-base leading-relaxed opacity-60'>
          Full-stack developer building web products and documenting the details behind them.
        </p>
      </div>

      <aside className='border-color mdx:border-t-0 mdx:border-l flex flex-col border-t' aria-label='Site index'>
        <div className='flex flex-1 flex-col justify-between gap-24 p-16'>
          <span className='font-mono text-xs tracking-widest uppercase opacity-40'>
            Index / {new Date().getFullYear()}
          </span>
          <div>
            <p className='font-mono text-lg'>{AUTHOR}</p>
            <p className='mt-4 text-sm opacity-50'>Full-stack developer</p>
          </div>
        </div>
        <IndexLink href='/blog' label='Writing' value={articleCount} />
        <IndexLink href='/projects' label='Projects' value={projectCount} />
      </aside>
    </section>
  );
}
