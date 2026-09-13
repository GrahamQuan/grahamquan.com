import TitleTransition from '@/components/transitions/title-transition';
import { ArrowUpLeft } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import BlogGridContent from '@/components/grid-layout/blog-grid-content';
import { BLOG_TOPICS, BLOG_TOPIC_SLUGS, getBlogTopic, type BlogTopic } from '@/lib/blog-topics';
import { getPublicBlogPosts } from '@/lib/blog-utils';
import { cn } from '@/lib/utils';

type Props = {
  params: Promise<{
    topic: string;
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPublicBlogPosts();

  return BLOG_TOPIC_SLUGS.filter((topic) => posts.some((post) => post.metadata.topic === topic))
    .toSorted((a, b) => BLOG_TOPICS[a].order - BLOG_TOPICS[b].order)
    .map((topic) => ({ topic }));
}

async function getTopicPageData(params: Props['params']) {
  const [{ topic: slug }, posts] = await Promise.all([params, getPublicBlogPosts()]);
  const topic = getBlogTopic(slug);

  if (!topic) {
    notFound();
  }

  const topicPosts = posts.filter((post) => post.metadata.topic === (slug as BlogTopic));
  if (topicPosts.length === 0) {
    notFound();
  }

  return { topic, posts: topicPosts };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic } = await getTopicPageData(params);

  return {
    title: `${topic.label} Articles`,
    description: topic.description,
  };
}

export default async function TopicPage({ params }: Props) {
  const { topic, posts } = await getTopicPageData(params);

  return (
    <div className='flex flex-col gap-12 p-24'>
      <div className='px-12'>
        <Link
          href='/topics'
          className='mb-16 inline-flex items-center gap-6 rounded-sm font-mono text-xs uppercase opacity-60 hover:underline hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4'
        >
          <ArrowUpLeft className='size-16' />
          All Topics
        </Link>
        <p className={cn('font-mono text-xs uppercase', topic.accentClass)}>{topic.shortLabel}</p>
        <TitleTransition name={`topic-${posts[0].metadata.topic}`}>
          <h1 className='mt-6 font-mono text-2xl font-bold'>{topic.label}</h1>
        </TitleTransition>
        <p className='mt-8 max-w-xl text-sm leading-relaxed opacity-60'>{topic.description}</p>
        <p className='mt-12 font-mono text-xs opacity-50'>
          {posts.length} {posts.length === 1 ? 'article' : 'articles'}
        </p>
      </div>

      <BlogGridContent list={posts} />
    </div>
  );
}
