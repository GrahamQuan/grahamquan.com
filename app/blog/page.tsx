import TitleTransition from '@/components/transitions/title-transition';
import BlogGridContent from '@/components/grid-layout/blog-grid-content';
import { getPublicBlogPosts } from '@/lib/blog-utils';

export default async function Page() {
  const blogs = await getPublicBlogPosts();

  return (
    <div className='flex flex-col gap-12 p-24'>
      <TitleTransition>
        <h1 className='px-12 text-2xl font-bold'>Blog page</h1>
      </TitleTransition>
      <BlogGridContent list={blogs} />
    </div>
  );
}
