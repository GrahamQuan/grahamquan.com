import { transformerNotationDiff, transformerNotationHighlight } from '@shikijs/transformers';
import { createHighlighter } from 'shiki';

import { cn } from '@/lib/utils';

const highlighterPromise = createHighlighter({
  themes: ['github-dark-dimmed', 'github-light'],
  langs: ['javascript', 'typescript', 'jsx', 'tsx', 'css', 'html', 'json', 'bash', 'markdown'],
});

export default async function CodeSnippet({ code, lang = 'bash' }: { code: string; lang?: string }) {
  const html = await (
    await highlighterPromise
  ).codeToHtml(code, {
    lang,
    theme: 'github-dark-dimmed',
    transformers: [
      transformerNotationDiff({
        matchAlgorithm: 'v3',
        classLineAdd:
          "relative -mx-5 border-l-2 border-teal-500 bg-gradient-to-r from-teal-300/15 via-teal-300/5 via-[75%] to-transparent pr-20 pl-36 before:absolute before:left-8 before:text-teal-400 before:content-['+']",
        classLineRemove:
          "relative -mx-5 border-l-2 border-red-500 bg-gradient-to-r from-red-300/15 via-red-300/5 via-[75%] to-transparent pr-20 pl-36 before:absolute before:left-8 before:text-red-400 before:content-['-']",
        classActivePre: '[:where(&_.line)]:pl-4',
      }),
      transformerNotationHighlight({
        matchAlgorithm: 'v3',
        classActiveLine:
          // '-mx-5 pl-[calc(var(--spacing)*5+2px)] border-l-2 pr-20 border-sky-500 bg-gradient-to-r from-sky-300/15 via-sky-300/5 via-[75%] to-transparent',
          '-mx-5 pl-[calc(var(--spacing)*5+2px)] border-l-2 pr-20 border-(--color-foreground)/75 bg-gradient-to-r from-(--color-foreground)/15 via-(--color-foreground)/5 via-[75%] to-transparent',
      }),
    ],
  });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      // className='not-prose code-block relative [&_pre]:rounded-b [&_pre]:p-12'
      className={cn(
        // 'code-block not-prose [&_pre]:rounded-b-[inherit]',
        'code-block not-prose text-[14px] [&_pre]:rounded-b',
        // '*:flex *:*:max-w-none *:*:shrink-0 *:*:grow *:overflow-auto *:rounded-lg *:bg-white/10! *:p-5 dark:*:bg-white/5!',
        // '*:flex *:*:max-w-none *:*:shrink-0 *:*:grow *:overflow-auto *:rounded-b-[inherit] *:bg-white/10! *:p-5 dark:*:bg-white/5!',
        '*:flex *:*:max-w-none *:*:shrink-0 *:*:grow *:overflow-auto *:bg-black/5! *:p-5 dark:*:bg-white/5!',
        // '**:[.line]:isolate **:[.line]:block **:[.line]:not-last:min-h-[1lh]',
        '**:[.line]:isolate **:[.line]:inline-block **:[.line]:w-full **:[.line]:not-last:min-h-[1lh]',
        // '*:inset-ring *:inset-ring-white/10 dark:*:inset-ring-white/5',
      )}
    />
  );
}
