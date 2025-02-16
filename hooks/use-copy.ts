import { useCallback, useState } from 'react';

export default function useCopy(timeout = 2000) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback(
    (text: string) => {
      navigator.clipboard.writeText(text);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, timeout);
    },
    [timeout],
  );

  return { isCopied, copy };
}
