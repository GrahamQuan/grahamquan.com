import type { ReactElement } from 'react';

import type { BlogTopic } from '@/lib/blog-topics';

export type BlogPostMetadata = {
  title: string;
  description: string;
  date: string;
  topic: BlogTopic;
  keywords?: string[];
  excerpt?: ReactElement;
  image?: {
    src: string;
  };
  private?: boolean;
  pin?: boolean;
};

export function defineBlogMetadata<const Metadata extends BlogPostMetadata>(metadata: Metadata): Metadata {
  return metadata;
}
