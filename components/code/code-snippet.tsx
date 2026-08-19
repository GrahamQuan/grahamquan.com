import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers';
import type { CSSProperties } from 'react';
import { createHighlighter } from 'shiki';

const supportedLanguages = [
  'bash',
  'css',
  'html',
  'javascript',
  'json',
  'jsx',
  'markdown',
  'mdx',
  'python',
  'sql',
  'tsx',
  'typescript',
  'yaml',
] as const;

// Creating a Shiki highlighter is expensive. Hoist and share it across every
// code block rendered during the build instead of loading grammars per block.
const highlighterPromise = createHighlighter({
  themes: ['github-dark-dimmed', 'github-light'],
  langs: [...supportedLanguages],
});

const languageAliases: Record<string, (typeof supportedLanguages)[number] | 'text'> = {
  console: 'bash',
  env: 'bash',
  js: 'javascript',
  md: 'markdown',
  py: 'python',
  sh: 'bash',
  shell: 'bash',
  shellscript: 'bash',
  text: 'text',
  plaintext: 'text',
  txt: 'text',
  ts: 'typescript',
  yml: 'yaml',
  zsh: 'bash',
};

function getLanguage(lang: string) {
  const normalized = lang.toLowerCase().trim();

  if (normalized in languageAliases) {
    return languageAliases[normalized];
  }

  return supportedLanguages.find((language) => language === normalized) ?? 'text';
}

export default async function CodeSnippet({
  code,
  lang = 'text',
  lineNumbers = true,
  lineNumberStart = 1,
}: {
  code: string;
  lang?: string;
  lineNumbers?: boolean;
  lineNumberStart?: number;
}) {
  const html = await (
    await highlighterPromise
  ).codeToHtml(code, {
    lang: getLanguage(lang),
    themes: {
      light: 'github-light',
      dark: 'github-dark-dimmed',
    },
    defaultColor: false,
    transformers: [
      transformerNotationDiff({
        matchAlgorithm: 'v3',
        classLineAdd: 'diff add',
        classLineRemove: 'diff remove',
      }),
      transformerNotationHighlight({
        matchAlgorithm: 'v3',
        classActiveLine: 'highlighted',
      }),
      transformerNotationWordHighlight({
        matchAlgorithm: 'v3',
        classActiveWord: 'highlighted-word',
      }),
      transformerNotationFocus({
        matchAlgorithm: 'v3',
        classActiveLine: 'focused',
        classActivePre: 'has-focused',
      }),
      transformerNotationErrorLevel({
        matchAlgorithm: 'v3',
        classMap: {
          error: 'error',
          warning: 'warning',
        },
      }),
    ],
  });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className='code-snippet-viewport'
      data-line-numbers={lineNumbers || undefined}
      style={{ '--code-line-number-start': lineNumberStart } as CSSProperties}
    />
  );
}
