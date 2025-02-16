import Link from 'next/link';

import { getBlogPostBySlug, getBlogPostSlugs, nonNullable } from '@/lib/blog-utils';

export default async function Page() {
  let slugs = await getBlogPostSlugs();
  let blogs = (await Promise.all(slugs.map(getBlogPostBySlug)))
    .filter(nonNullable)
    .filter((post) => !post.metadata.private);

  return (
    <div>
      <h1>Blog page</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.slug}>
            <Link href={`/blog/${blog.slug}`} className='hover:underline'>
              {blog.metadata.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
