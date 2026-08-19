import Link from 'next/link';

import type { BlogPost } from '@/lib/blog-utils';
import { formatDate } from '@/lib/time-utils';
import { cn } from '@/lib/utils';

const articleAccentClasses = [
  'text-sky-600 dark:text-sky-300',
  'text-orange-600 dark:text-orange-300',
  'text-amber-600 dark:text-amber-300',
  'text-violet-600 dark:text-violet-300',
];

export default function HomeArticleCard({ article, index }: { article: BlogPost; index: number }) {
  const category = article.metadata.keywords?.[0] ?? (article.metadata.pin ? 'Featured' : 'Article');
  const accentClass = articleAccentClasses[index % articleAccentClasses.length];

  return (
    <Link
      href={`/blog/${article.slug}`}
      className='group relative flex min-h-288 flex-col overflow-hidden bg-(--color-background) p-20 transition-colors hover:bg-black/[0.035] focus-visible:outline-2 focus-visible:outline-offset-[-2px] dark:hover:bg-white/[0.045]'
    >
      <div className='flex items-start justify-between gap-12 font-mono text-xs'>
        <span className={cn('uppercase', accentClass)}>{category}</span>
        <time dateTime={article.metadata.date} className='opacity-50'>
          {formatDate(article.metadata.date, 'MMM d')}
        </time>
      </div>

      <h2 className='my-auto text-balance text-center font-mono text-lg leading-relaxed font-medium group-hover:underline group-hover:underline-offset-4'>
        {article.metadata.title}
      </h2>

      <div className='flex items-end justify-between font-mono text-xs opacity-40'>
        <span>{String(index + 1).padStart(2, '0')}</span>
        <span aria-hidden='true' className='transition-transform group-hover:translate-x-2 group-hover:-translate-y-2'>
          ↗
        </span>
      </div>
    </Link>
  );
}
