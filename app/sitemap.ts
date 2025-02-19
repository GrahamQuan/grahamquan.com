import type { MetadataRoute } from 'next';

import { getBlogPostBySlug, getBlogPostSlugs, nonNullable } from '@/lib/blog-utils';
import { NavigationList } from '@/lib/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let slugs = await getBlogPostSlugs();
  let blogs = (await Promise.all(slugs.map(getBlogPostBySlug)))
    .filter(nonNullable)
    .filter((post) => !post.metadata.private);

  return [
    {
      url: process.env.NEXT_PUBLIC_BASE_URL as string,
      lastModified: new Date().toISOString(),
    },
    ...NavigationList.map((nav) => ({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}${nav.href}`,
      lastModified: new Date().toISOString(),
    })),
    ...blogs.map((blog) => ({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${blog.slug}`,
      lastModified: new Date(blog.metadata.date).toISOString(),
    })),
  ];
}
