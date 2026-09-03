import HomeArticleGrid from '@/components/home/home-article-grid';
import HomeHero from '@/components/home/home-hero';
import { getPublicBlogPosts } from '@/lib/blog-utils';
import { ProjectList } from '@/lib/constants';

export default async function Home() {
  const articles = await getPublicBlogPosts();

  return (
    <div>
      <HomeHero articleCount={articles.length} projectCount={ProjectList.length} />
      <HomeArticleGrid articles={articles.slice(0, 4)} />
    </div>
  );
}
