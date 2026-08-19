import { FileCode2, Terminal } from 'lucide-react';
import CodeCopyButton from './code-copy-button';

const languageLabels: Record<string, string> = {
  bash: 'Shell',
  css: 'CSS',
  html: 'HTML',
  javascript: 'JavaScript',
  js: 'JavaScript',
  json: 'JSON',
  jsx: 'JSX',
  markdown: 'Markdown',
  md: 'Markdown',
  mdx: 'MDX',
  python: 'Python',
  sh: 'Shell',
  sql: 'SQL',
  text: 'Text',
  plaintext: 'Text',
  txt: 'Text',
  ts: 'TypeScript',
  tsx: 'TSX',
  typescript: 'TypeScript',
  yaml: 'YAML',
  yml: 'YAML',
  zsh: 'Shell',
};

function getLanguageLabel(lang: string) {
  return languageLabels[lang.toLowerCase()] || lang || 'Text';
}

export default function CodeSnippetHeader({ title, lang }: { title?: string; lang: string }) {
  const languageLabel = getLanguageLabel(lang);
  const isTerminal = ['bash', 'console', 'sh', 'shell', 'shellscript', 'zsh'].includes(lang.toLowerCase());
  const Icon = isTerminal ? Terminal : FileCode2;

  return (
    <figcaption className='flex min-h-40 items-center justify-between gap-12 border-b border-black/10 bg-black/4 px-12 text-xs text-neutral-600 dark:border-white/10 dark:bg-white/4 dark:text-neutral-300'>
      <div className='flex min-w-0 items-center gap-8 font-mono'>
        <Icon aria-hidden='true' className='size-15 shrink-0 opacity-65' strokeWidth={1.75} />
        <span className='truncate font-medium text-neutral-800 dark:text-neutral-100'>{title ?? languageLabel}</span>
        {title ? (
          <span className='shrink-0 rounded-sm border border-black/10 px-5 py-2 text-[10px] leading-none uppercase tracking-wider opacity-65 dark:border-white/10'>
            {languageLabel}
          </span>
        ) : null}
      </div>
      <CodeCopyButton />
    </figcaption>
  );
}
