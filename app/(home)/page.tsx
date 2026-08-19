import Link from 'next/link';

import GrahamQuanSignature from '@/components/home/graham-quan-signature';
import { getBlogPostBySlug, getBlogPostSlugs, nonNullable } from '@/lib/blog-utils';
import { AUTHOR, ProjectList } from '@/lib/constants';
import { formatDate } from '@/lib/time-utils';
import { cn } from '@/lib/utils';

type BlogPost = NonNullable<Awaited<ReturnType<typeof getBlogPostBySlug>>>;

const articleAccentClasses = [
  'text-sky-600 dark:text-sky-300',
  'text-orange-600 dark:text-orange-300',
  'text-amber-600 dark:text-amber-300',
  'text-violet-600 dark:text-violet-300',
];

function ArticleCard({ article, index }: { article: BlogPost; index: number }) {
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

function IndexLink({ href, label, value }: { href: string; label: string; value: string }) {
  return (
    <Link
      href={href}
      className='border-color group flex items-center justify-between border-t px-16 py-14 font-mono text-sm hover:bg-black/[0.035] dark:hover:bg-white/[0.045]'
    >
      <span className='opacity-60 group-hover:opacity-100'>{label}</span>
      <span>{value}</span>
    </Link>
  );
}

export default async function Home() {
  const slugs = await getBlogPostSlugs();
  const articles = (await Promise.all(slugs.map(getBlogPostBySlug))).filter(nonNullable);

  return (
    <div>
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
            <span className='font-mono text-xs tracking-widest uppercase opacity-40'>Index / 2026</span>
            <div>
              <p className='font-mono text-lg'>{AUTHOR}</p>
              <p className='mt-4 text-sm opacity-50'>Full-stack developer</p>
            </div>
          </div>
          <IndexLink href='/blog' label='Writing' value={String(articles.length).padStart(2, '0')} />
          <IndexLink href='/projects' label='Projects' value={String(ProjectList.length).padStart(2, '0')} />
        </aside>
      </section>

      <section aria-labelledby='latest-writing'>
        <div className='border-color flex items-center justify-between border-b px-20 py-16'>
          <div className='flex items-baseline gap-10'>
            <span className='font-mono text-xs opacity-40'>01</span>
            <h2 id='latest-writing' className='font-mono text-lg font-semibold'>
              Latest writing
            </h2>
          </div>
          <Link href='/blog' className='font-mono text-xs opacity-50 hover:underline hover:opacity-100'>
            All posts ↗
          </Link>
        </div>

        <div className='bg-border-color grid grid-cols-1 gap-px sm:grid-cols-2 mdx:grid-cols-4'>
          {articles.slice(0, 4).map((article, index) => (
            <ArticleCard key={article.slug} article={article} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
