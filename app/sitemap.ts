import type { MetadataRoute } from 'next';

import { getBlogPostBySlug, getBlogPostSlugs, nonNullable } from '@/lib/blog-utils';
import { NavigationList } from '@/lib/constants';
import { envClient } from '@/lib/env-client';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let slugs = await getBlogPostSlugs();
  let blogs = (await Promise.all(slugs.map(getBlogPostBySlug)))
    .filter(nonNullable)
    .filter((post) => !post.metadata.private);

  return [
    {
      url: envClient.NEXT_PUBLIC_BASE_URL, // home
      lastModified: new Date().toISOString(),
    },
    ...NavigationList.map((nav) => ({
      url: `${envClient.NEXT_PUBLIC_BASE_URL}${nav.href}`,
      lastModified: new Date().toISOString(),
    })),
    ...blogs.map((blog) => ({
      url: `${envClient.NEXT_PUBLIC_BASE_URL}/blog/${blog.slug}`,
      lastModified: new Date(blog.metadata.date).toISOString(),
    })),
  ];
}
