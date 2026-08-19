'use client';

import { Check, Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function CodeCopyButton() {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  async function handleCopy(event: React.MouseEvent<HTMLButtonElement>) {
    const code = event.currentTarget.closest('[data-code-snippet]')?.querySelector('pre code')?.textContent;
    if (!code) return;

    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setIsCopied(false), 2000);
    } catch {
      setIsCopied(false);
    }
  }

  const label = isCopied ? 'Copied' : 'Copy code';

  return (
    <button
      type='button'
      aria-label={label}
      title={label}
      onClick={handleCopy}
      className='-mr-4 flex size-28 shrink-0 items-center justify-center rounded-sm text-neutral-500 transition-colors hover:bg-black/7 hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-neutral-400 dark:hover:bg-white/8 dark:hover:text-white'
    >
      {isCopied ? (
        <Check aria-hidden='true' className='size-15 text-emerald-600 dark:text-emerald-400' />
      ) : (
        <Copy aria-hidden='true' className='size-15' />
      )}
    </button>
  );
}
