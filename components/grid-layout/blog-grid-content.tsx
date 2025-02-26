import { Fragment } from 'react';
import Link from 'next/link';
import { ArrowUpLeft, Pin, Plus } from 'lucide-react';

import type { getBlogPostBySlug } from '@/lib/blog-utils';
import { formatDate } from '@/lib/time-utils';

export default function BlogGridContent({
  list,
}: {
  list: NonNullable<Awaited<ReturnType<typeof getBlogPostBySlug>>>[];
}) {
  return (
    <div className='bg-border-color mdx:w-3/4 mx-auto grid w-11/12 grid-cols-13 gap-px'>
      {list.map((item, idx) => (
        <Fragment key={item.slug}>
          <div className='relative col-span-1 flex items-end justify-center bg-(--color-background) p-12 pr-0 align-bottom text-lg font-bold [writing-mode:sideways-lr]'>
            <time
              dateTime={item.metadata.date}
              title={formatDate(item.metadata.date)}
              className='rounded bg-black/10 px-6 py-2 font-mono text-xs opacity-80 dark:bg-white/10'
            >
              {formatDate(item.metadata.date)}
            </time>
            {idx !== 0 && <Plus className='absolute -top-12 -right-12 size-24' strokeWidth={1} />}
          </div>
          <Link href={`/blog/${item.slug}`} className='group/link relative col-span-12 bg-(--color-background) p-24'>
            {item.metadata.pin && (
              <div className='absolute top-12 right-0 size-24'>
                <Pin className='size-16' strokeWidth={1} />
              </div>
            )}
            <h2 className='font-mono text-lg font-bold group-hover/link:underline'>
              <ArrowUpLeft className='mr-6 inline size-16 shrink-0' />
              {item.metadata.title}
            </h2>
            <p className='mt-4 line-clamp-5 text-sm opacity-70' title={item.metadata.description}>
              {item.metadata.description}
            </p>
          </Link>
        </Fragment>
      ))}
    </div>
  );
}
