import createMDX from '@next/mdx';
import type { NextConfig } from 'next';
import remarkGfm from 'remark-gfm';
import remarkCodeMeta from './lib/remark-code-meta';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  experimental: {
    mdxRs: {
      mdxType: 'gfm',
    },
  },
  serverExternalPackages: ['shiki'],
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  trailingSlash: true,
  transpilePackages: ['geist'],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm, remarkCodeMeta],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
