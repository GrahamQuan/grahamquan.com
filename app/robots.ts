import type { MetadataRoute } from 'next';

import { envClient } from '@/lib/env-client';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // disallow: '/private/',
    },
    sitemap: `${envClient.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
  };
}
