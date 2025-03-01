import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';
import { ArrowUpLeft, Plus } from 'lucide-react';

import { getBlogPostBySlug, getBlogPostSlugs } from '@/lib/blog-utils';
import { formatDate } from '@/lib/time-utils';
import GridContainer from '@/components/grid-layout/grid-container';
import GridSmallBackground from '@/components/grid-layout/grid-small-background';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  let slugs = await getBlogPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  let params = await props.params;
  let post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL as string),
    title: post.metadata.title,
    description: post.metadata.description,
    keywords: post.metadata.keywords,
  };
}

export default async function DocPage(props: Props) {
  let params = await props.params;
  let post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  return (
    <>
      {/* Add a placeholder div so the Next.js router can find the scrollable element. */}
      {/* <div hidden /> */}
      {/* <div className='grid grid-cols-1 xl:grid-cols-[22rem_2.5rem_auto] xl:grid-rows-[1fr_auto]'> */}
      <div className='grid grid-cols-1'>
        {/* <div className='col-start-2 row-span-2 border-r border-l border-gray-950/5 max-xl:hidden dark:border-white/10'></div> */}
        <div className='max-mdx:mx-auto max-mdx:w-full max-xl:max-w-(--breakpoint-mdx)'>
          <div className='mt-24 flex w-full justify-between px-4 font-mono text-sm/7 font-medium tracking-widest lg:px-12'>
            <time className='mt-auto opacity-60' dateTime={post.metadata.date}>
              {formatDate(post.metadata.date)}
            </time>
            <Link
              href='/blog'
              className='flex items-center gap-6 uppercase opacity-60 hover:underline hover:opacity-100'
            >
              <ArrowUpLeft className='size-16' />
              <span>All Blogs</span>
            </Link>
          </div>
          <GridContainer className='mdx:mb-32 px-12'>
            <h1 className='mdx:text-4xl flex min-h-80 items-center py-8 font-mono text-2xl font-bold tracking-tight text-pretty text-gray-950 [view-transition-name:blog-page] dark:text-gray-200'>
              {post.metadata.title}
            </h1>
          </GridContainer>
        </div>
        {/* <div className='mdx:max-w-(--breakpoint-mdx) max-mdx:mt-32 max-xl:mx-auto max-xl:w-full'> */}
        <GridContainer className='mdx:mb-32 relative'>
          <Plus className='absolute -top-12 -left-12 -translate-x-0.5 opacity-70' strokeWidth={1} />
          <Plus className='absolute -right-12 -bottom-12 -translate-x-0.5 opacity-70' strokeWidth={1} />
          <GridSmallBackground className='p-12'>
            <article className='prose prose-blog prose-thead:border-gray-950/45 dark:prose-thead:border-white/50 dark:prose-invert prose-tr:border-gray-950/20 dark:prose-tr:border-white/25 relative !max-w-full'>
              <post.Component />
            </article>
          </GridSmallBackground>
        </GridContainer>
        {/* </div> */}
      </div>
    </>
  );
}
