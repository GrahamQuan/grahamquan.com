import Link from 'next/link';

import type { BlogPost } from '@/lib/blog-utils';

import HomeArticleCard from './home-article-card';

export default function HomeArticleGrid({ articles }: { articles: BlogPost[] }) {
  return (
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
        {articles.map((article, index) => (
          <HomeArticleCard key={article.slug} article={article} index={index} />
        ))}
      </div>
    </section>
  );
}
