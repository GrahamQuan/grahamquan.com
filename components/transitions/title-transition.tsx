'use client';

import { ViewTransition, type ReactNode } from 'react';

export default function TitleTransition({ children, name = 'page-title' }: { children: ReactNode; name?: string }) {
  return (
    <ViewTransition name={name} enter='title-enter' exit='title-exit' share='title-share' update='none'>
      {children}
    </ViewTransition>
  );
}
