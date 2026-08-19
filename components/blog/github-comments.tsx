'use client';

import Giscus, { type Repo, type Theme } from '@giscus/react';
import { useContext } from 'react';

import { ThemeContext } from '@/components/theme-toggle';
import { envClient } from '@/lib/env-client';

type GiscusConfig = {
  repo: Repo;
  repoId: string;
  category: string;
  categoryId: string;
};

function getGiscusConfig(): GiscusConfig | null {
  let repo = envClient.NEXT_PUBLIC_GISCUS_REPO;
  let repoId = envClient.NEXT_PUBLIC_GISCUS_REPO_ID;
  let category = envClient.NEXT_PUBLIC_GISCUS_CATEGORY;
  let categoryId = envClient.NEXT_PUBLIC_GISCUS_CATEGORY_ID;

  if (!repo || !repoId || !category || !categoryId || !repo.includes('/')) {
    return null;
  }

  return {
    repo: repo as Repo,
    repoId,
    category,
    categoryId,
  };
}

function getGiscusTheme(theme: string | null): Theme {
  if (theme === 'dark') {
    return 'noborder_dark';
  }

  if (theme === 'light') {
    return 'noborder_light';
  }

  return 'preferred_color_scheme';
}

export default function GitHubComments() {
  let config = getGiscusConfig();
  let { theme } = useContext(ThemeContext);

  if (!config) {
    if (process.env.NODE_ENV === 'production') {
      return null;
    }

    return (
      <p className='border-color bg-background/80 border p-16 font-mono text-sm text-gray-950/60 dark:text-gray-200/60'>
        GitHub comments need giscus environment values.
      </p>
    );
  }

  return (
    <Giscus
      id='comments'
      repo={config.repo}
      repoId={config.repoId}
      category={config.category}
      categoryId={config.categoryId}
      mapping='pathname'
      strict='1'
      reactionsEnabled='1'
      emitMetadata='0'
      inputPosition='bottom'
      theme={getGiscusTheme(theme)}
      lang='en'
      loading='lazy'
    />
  );
}
