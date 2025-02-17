'use client';

import { useCallback } from 'react';
import { Check, Copy } from 'lucide-react';

import useCopy from '@/hooks/use-copy';

export default function CodeSnippetHeader({ title, code }: { title: string; code: string }) {
  const { isCopied, copy } = useCopy();

  const handleCopy = useCallback(() => {
    copy(code);
  }, [code, copy]);

  return (
    // <div className='flex h-36 items-center justify-between rounded-t bg-gray-950/5 p-12 dark:bg-white/10'>
    <div className='flex h-36 items-center justify-between rounded-t-sm bg-black/10 p-12 dark:bg-white/10'>
      <div>{title}</div>
      {isCopied ? (
        <Check className='size-16' />
      ) : (
        <button
          onClick={handleCopy}
          className='flex size-24 items-center justify-center rounded hover:cursor-pointer hover:bg-white/5'
        >
          <Copy className='size-16' />
        </button>
      )}
    </div>
  );
}
