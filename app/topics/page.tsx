import TitleTransition from '@/components/transitions/title-transition';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

import { BLOG_TOPICS, BLOG_TOPIC_SLUGS } from '@/lib/blog-topics';
import { getPublicBlogPosts } from '@/lib/blog-utils';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Topics',
  description: 'Browse published articles by their primary topic.',
};

export default async function TopicsPage() {
  const posts = await getPublicBlogPosts();
  const topics = BLOG_TOPIC_SLUGS.map((slug) => ({
    slug,
    topic: BLOG_TOPICS[slug],
    count: posts.filter((post) => post.metadata.topic === slug).length,
  }))
    .filter(({ count }) => count > 0)
    .toSorted((a, b) => a.topic.order - b.topic.order);

  return (
    <div className='flex flex-col gap-12 p-24'>
      <div className='px-12'>
        <TitleTransition>
          <h1 className='font-mono text-2xl font-bold'>Topics</h1>
        </TitleTransition>
        <p className='mt-6 max-w-xl text-sm opacity-60'>Browse published articles by their primary topic.</p>
      </div>

      <div className='bg-border-color grid grid-cols-1 gap-px sm:grid-cols-2'>
        {topics.map(({ slug, topic, count }) => (
          <Link
            key={slug}
            href={`/topics/${slug}`}
            className='group flex min-h-224 flex-col bg-(--color-background) p-20 transition-colors hover:bg-black/[0.035] focus-visible:outline-2 focus-visible:outline-offset-[-2px] dark:hover:bg-white/[0.045]'
          >
            <div className='flex items-start justify-between gap-12 font-mono text-xs'>
              <span className='opacity-40'>{String(topic.order).padStart(2, '0')}</span>
              <span className={cn('uppercase', topic.accentClass)}>{topic.shortLabel}</span>
            </div>
            <TitleTransition name={`topic-${slug}`}>
              <h2 className='mt-24 font-mono text-xl font-semibold group-hover:underline group-hover:underline-offset-4'>
                {topic.label}
              </h2>
            </TitleTransition>
            <p className='mt-8 text-sm leading-relaxed opacity-60'>{topic.description}</p>
            <div className='mt-auto flex items-end justify-between pt-24 font-mono text-xs'>
              <span className='opacity-50'>
                {count} {count === 1 ? 'article' : 'articles'}
              </span>
              <ArrowUpRight className='size-16 opacity-40 transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:opacity-100' />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
