'use client';

import { usePathname } from 'next/navigation';
import { ViewTransition, type ReactNode } from 'react';

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <ViewTransition key={pathname} enter='page-enter' exit='page-exit' update='none'>
      <div>{children}</div>
    </ViewTransition>
  );
}
