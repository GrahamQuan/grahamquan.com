import Link from 'next/link';

import { getBlogPostBySlug, getBlogPostSlugs, nonNullable } from '@/lib/blog-utils';
import { formatDate } from '@/lib/time-utils';

export default async function Page() {
  let slugs = await getBlogPostSlugs();
  let blogs = (await Promise.all(slugs.map(getBlogPostBySlug)))
    .filter(nonNullable)
    .filter((post) => !post.metadata.private);

  const isOddNum = blogs.length % 2 === 1;

  return (
    <div className='flex flex-col gap-12 p-12'>
      <h1 className='px-12 text-4xl font-bold'>Blog page</h1>
      <ul className='grid grid-cols-2 gap-px bg-black/15 dark:bg-white/5'>
        {blogs.map((blog) => (
          <li key={blog.slug} className='group/link grid grid-rows-subgrid bg-(--color-background) px-12 py-24'>
            <Link href={`/blog/${blog.slug}`}>
              <h2 className='text-lg font-bold [view-transition-name:blog-page] group-hover/link:underline'>
                {blog.metadata.title}
              </h2>
              <time
                dateTime={blog.metadata.date}
                className='rounded bg-black/10 px-6 py-2 text-xs opacity-80 dark:bg-white/10'
              >
                {formatDate(blog.metadata.date)}
              </time>
              <p className='mt-4 text-sm opacity-70'>{blog.metadata.description}</p>
            </Link>
          </li>
        ))}
        {isOddNum && <li className='bg-(--color-background)'></li>}
      </ul>
    </div>
  );
}
