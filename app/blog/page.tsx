import { getBlogPostBySlug, getBlogPostSlugs, nonNullable } from '@/lib/blog-utils';
import BlogGridContent from '@/components/grid-layout/blog-grid-content';

export default async function Page() {
  let slugs = await getBlogPostSlugs();
  let blogs = (await Promise.all(slugs.map(getBlogPostBySlug))).filter(nonNullable);

  return (
    <div className='flex flex-col gap-12 p-24'>
      <h1 className='px-12 text-2xl font-bold'>Blog page</h1>
      <BlogGridContent list={blogs} />
    </div>
  );
}
