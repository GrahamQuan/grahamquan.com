'use client';

import { ListTree } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

type TableOfContentsItem = {
  id: string;
  label: string;
  level: number;
};

const BLOG_POST_PATH = /^\/blog\/[^/]+\/?$/;
const HEADING_SELECTOR = 'h2[id], h3[id], h4[id], h5[id], h6[id]';

function usesDesktopInteraction() {
  return window.matchMedia('(min-width: 896px) and (hover: hover)').matches;
}

export default function BlogTableOfContents() {
  const pathname = usePathname();
  const [items, setItems] = useState<TableOfContentsItem[]>([]);
  const [open, setOpen] = useState(false);
  const [articlePath, setArticlePath] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const ignoreNextClickRef = useRef(false);
  const isBlogPost = BLOG_POST_PATH.test(pathname);

  useEffect(() => {
    setOpen(false);

    if (!isBlogPost) {
      setArticlePath(null);
      setItems([]);
      return;
    }

    const article = document.querySelector('main article');
    if (!article) {
      setArticlePath(null);
      setItems([]);
      return;
    }

    const headings = Array.from(article.querySelectorAll<HTMLElement>(HEADING_SELECTOR));
    setArticlePath(pathname);
    setItems(
      headings.map((heading) => ({
        id: heading.id,
        label: heading.textContent?.trim() || heading.id,
        level: Number(heading.tagName.slice(1)),
      })),
    );
  }, [isBlogPost, pathname]);

  useEffect(() => {
    if (!open) return;

    const documentElement = document.documentElement;
    const isDesktop = usesDesktopInteraction();

    if (!isDesktop) {
      documentElement.dataset.tocScrollLock = 'true';
    }

    function handleWheel(event: WheelEvent) {
      const tocList = rootRef.current?.querySelector('ol');

      if (!tocList?.contains(event.target as Node)) {
        event.preventDefault();
      }
    }

    function handleTouchOutside(event: TouchEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    if (isDesktop) {
      document.addEventListener('wheel', handleWheel, { passive: false });
    }

    document.addEventListener('touchstart', handleTouchOutside, { passive: true });
    document.addEventListener('keydown', handleEscape);

    return () => {
      delete documentElement.dataset.tocScrollLock;

      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchstart', handleTouchOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  const handleTouchStart = useCallback(() => {
    ignoreNextClickRef.current = true;
    setOpen((current) => !current);
  }, []);

  const handleClick = useCallback(() => {
    if (ignoreNextClickRef.current) {
      ignoreNextClickRef.current = false;
      return;
    }

    if (usesDesktopInteraction()) {
      setOpen(true);
    } else {
      setOpen((current) => !current);
    }
  }, []);

  const handleItemClick = useCallback((id: string) => {
    setOpen(false);
    requestAnimationFrame(() => {
      document.getElementById(id)?.focus({ preventScroll: true });
    });
  }, []);

  if (!isBlogPost || articlePath !== pathname) return null;

  return (
    <div
      ref={rootRef}
      className='relative flex h-full items-center'
      onMouseEnter={() => {
        if (usesDesktopInteraction()) setOpen(true);
      }}
      onMouseLeave={() => {
        if (usesDesktopInteraction()) setOpen(false);
      }}
      onFocusCapture={() => {
        if (usesDesktopInteraction()) setOpen(true);
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
    >
      <button
        type='button'
        aria-label='Table of contents'
        aria-expanded={open}
        aria-controls='blog-table-of-contents'
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        className='border-color flex size-36 items-center justify-center rounded-md border opacity-60 transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2'
      >
        <ListTree className='size-18' strokeWidth={1.5} />
      </button>

      <div
        id='blog-table-of-contents'
        className={cn(
          'border-color bg-(--color-background) max-mdx:-left-64 absolute top-[calc(100%+1px)] left-0 z-10 w-[min(320px,calc(100vw-48px))] translate-y-4 border p-12 opacity-0 shadow-xl shadow-black/5 transition-[opacity,transform,visibility] invisible pointer-events-none dark:shadow-black/30',
          open && 'visible pointer-events-auto translate-y-0 opacity-100',
        )}
      >
        <div className='border-color border-b px-4 pb-10 font-mono text-xs font-semibold uppercase'>On this page</div>
        {items.length > 0 ? (
          <ol className='mt-8 flex max-h-[min(60vh,480px)] touch-pan-y flex-col overflow-y-auto overscroll-contain py-2'>
            {items.map((item, index) => (
              <li key={`${item.id}-${index}`}>
                <a
                  href={`#${item.id}`}
                  onClick={() => handleItemClick(item.id)}
                  className={cn(
                    'block rounded-sm py-6 pr-6 font-mono text-xs leading-relaxed opacity-60 hover:bg-black/5 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-[-2px] dark:hover:bg-white/5',
                    item.level === 2 && 'pl-6',
                    item.level === 3 && 'pl-18',
                    item.level === 4 && 'pl-30',
                    item.level >= 5 && 'pl-42',
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        ) : (
          <p className='px-4 py-10 font-mono text-xs opacity-50'>No sections</p>
        )}
      </div>
    </div>
  );
}
