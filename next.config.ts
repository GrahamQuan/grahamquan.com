import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  agentRules: false,
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
    remarkPlugins: ['remark-gfm', './lib/remark-code-meta.ts'],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
