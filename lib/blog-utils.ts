import React from 'react';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function getBlogPostBySlug(slug: string): Promise<{
  Component: React.FC;
  metadata: {
    title: string;
    description: string;
    date: string;
    keywords?: string[];
    excerpt: React.ReactElement;
    // authors: Author[];
    image?: {
      src: string;
    };
    private?: boolean;
    pin?: boolean;
  };
  slug: string;
} | null> {
  try {
    // Check if the file exists
    if (!(await fs.stat(path.join(__dirname, `../__blog__/${slug}/index.mdx`)).catch(() => null))) {
      return null;
    }

    let blogPost = await import(`../__blog__/${slug}/index.mdx`);
    if (!blogPost.default) {
      return null;
    }

    return {
      Component: blogPost.default,
      metadata: {
        // authors: [],
        ...blogPost.metadata,
      },
      slug,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getBlogPostSlugs(): Promise<string[]> {
  let posts: { slug: string; date: number; pin: boolean; private: boolean }[] = [];

  let folders = await fs.readdir(path.join(__dirname, '../__blog__'));

  await Promise.allSettled(
    folders.map(async (folder) => {
      if (folder.startsWith('.')) return;
      try {
        let post = await getBlogPostBySlug(folder);
        if (!post) return;

        posts.push({
          slug: post.slug,
          date: new Date(post.metadata.date).getTime(),
          pin: !!post.metadata.pin,
          private: !!post.metadata.private,
        });
      } catch (e) {
        console.error(e);
      }
    }),
  );

  // filter by private
  posts = posts.filter((post) => !post.private);

  // sort by date
  posts.sort((a, b) => b.date - a.date);

  // sort by pin
  posts.sort((a, b) => Number(b.pin) - Number(a.pin));

  return posts.map((post) => post.slug);
}

export function nonNullable<T>(x: T | null): x is NonNullable<T> {
  return x !== null;
}
