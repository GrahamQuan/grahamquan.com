import type { MetadataRoute } from 'next';

import { BLOG_TOPICS, BLOG_TOPIC_SLUGS } from '@/lib/blog-topics';
import { getPublicBlogPosts } from '@/lib/blog-utils';
import { NavigationList } from '@/lib/constants';
import { envClient } from '@/lib/env-client';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await getPublicBlogPosts();
  const publishedTopicSlugs = BLOG_TOPIC_SLUGS.filter((topic) =>
    blogs.some((blog) => blog.metadata.topic === topic),
  ).toSorted((a, b) => BLOG_TOPICS[a].order - BLOG_TOPICS[b].order);

  return [
    {
      url: envClient.NEXT_PUBLIC_BASE_URL, // home
      lastModified: new Date().toISOString(),
    },
    ...NavigationList.map((nav) => ({
      url: `${envClient.NEXT_PUBLIC_BASE_URL}${nav.href}`,
      lastModified: new Date().toISOString(),
    })),
    ...publishedTopicSlugs.map((topic) => ({
      url: `${envClient.NEXT_PUBLIC_BASE_URL}/topics/${topic}`,
      lastModified: new Date().toISOString(),
    })),
    ...blogs.map((blog) => ({
      url: `${envClient.NEXT_PUBLIC_BASE_URL}/blog/${blog.slug}`,
      lastModified: new Date(blog.metadata.date).toISOString(),
    })),
  ];
}
