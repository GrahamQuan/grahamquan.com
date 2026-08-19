import { MessageCircle, Plus } from 'lucide-react';

import GitHubComments from '@/components/blog/github-comments';
import GridContainer from '@/components/grid-layout/grid-container';
import GridSmallBackground from '@/components/grid-layout/grid-small-background';
import { envClient } from '@/lib/env-client';

function hasGiscusConfig() {
  return Boolean(
    envClient.NEXT_PUBLIC_GISCUS_REPO &&
    envClient.NEXT_PUBLIC_GISCUS_REPO_ID &&
    envClient.NEXT_PUBLIC_GISCUS_CATEGORY &&
    envClient.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
  );
}

export default function GitHubCommentsSection() {
  if (!hasGiscusConfig() && process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <GridContainer className='mdx:mb-32 relative'>
      <Plus className='absolute -top-12 -left-12 -translate-x-0.5 opacity-70' strokeWidth={1} />
      <Plus className='absolute -right-12 -bottom-12 -translate-x-0.5 opacity-70' strokeWidth={1} />
      <GridSmallBackground className='space-y-20 p-12 mdx:p-24'>
        <section aria-labelledby='github-comments-title' className='space-y-16'>
          <div className='flex items-center gap-8 font-mono text-sm font-medium tracking-widest text-gray-950/70 uppercase dark:text-gray-200/70'>
            <MessageCircle className='size-16' strokeWidth={1.5} />
            <h2 id='github-comments-title'>Comments</h2>
          </div>
          <div className='min-h-160'>
            <GitHubComments />
          </div>
        </section>
      </GridSmallBackground>
    </GridContainer>
  );
}
