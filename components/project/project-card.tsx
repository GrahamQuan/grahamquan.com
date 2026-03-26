import { SquareArrowOutUpRight } from 'lucide-react';
import Link from 'next/link';

import type { Project } from '@/lib/constants';

import ZoomImage from '../image/zoom-image';
import ZoomVideo from '../video/zoom-video';

function LinkBtn({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      target='_blank'
      className='flex items-center gap-2 rounded bg-gray-950/5 px-4 py-1 text-sm hover:underline dark:bg-white/10'
    >
      <div className='opacity-60'>{children}</div>
      <SquareArrowOutUpRight className='size-14 opacity-60' />
    </Link>
  );
}

export default function ProjectCard({ title, description, href, githubLink, imgSrc, videoSrc }: Project) {
  return (
    <div className='flex w-full flex-col gap-8 bg-(--color-background) p-18'>
      <div className='relative mb-12 aspect-video w-full rounded-lg p-12'>
        <div className='border-color absolute top-0 left-0 z-10 size-8 border-r border-b' />
        <div className='border-color absolute top-0 right-0 z-10 size-8 border-b border-l' />
        <div className='border-color absolute bottom-0 left-0 z-10 size-8 border-t border-r' />
        <div className='border-color absolute right-0 bottom-0 z-10 size-8 border-t border-l' />
        {videoSrc ? (
          <ZoomVideo src={videoSrc} className='border-color size-full border' />
        ) : (
          <ZoomImage
            src={imgSrc}
            alt={title}
            loading='lazy'
            decoding='async'
            fetchPriority='low'
            className='border-color bg-border-color size-full border'
          />
        )}
      </div>
      <div className='flex flex-col gap-8'>
        <h3 className='truncate font-mono text-lg font-bold'>{title}</h3>
        <p className='line-clamp-3 text-sm opacity-60' title={description}>
          {description}
        </p>
      </div>
      <div className='mt-auto flex items-center justify-end gap-8'>
        {href && <LinkBtn href={href}>View</LinkBtn>}
        {githubLink && <LinkBtn href={githubLink}>GitHub</LinkBtn>}
      </div>
    </div>
  );
}
