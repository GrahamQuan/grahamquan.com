'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

import InViewPlayVideo from './inview-play-video';

interface ZoomVideoProps {
  src: string;
  width?: string | number;
  height?: string | number;
  className?: string;
}

export default function ZoomVideo({ src, width = '100%', height = 'auto', className }: ZoomVideoProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && dialogRef.current?.open) {
        e.preventDefault();
        closeDialog();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleVideoClick = () => {
    dialogRef.current?.showModal();
    if (videoRef.current && dialogRef.current) {
      const currentTime = videoRef.current.currentTime;
      const dialogVideo = dialogRef.current.querySelector('video');
      if (dialogVideo) {
        dialogVideo.currentTime = currentTime;
      }
    }
  };

  const closeDialog = () => {
    setIsClosing(true);
    setTimeout(() => {
      dialogRef.current?.close();
      setIsClosing(false);
    }, 200);
  };

  const handleDialogClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const videoElement = dialogRef.current?.querySelector('video');
    if (target !== videoElement && !videoElement?.contains(target)) {
      closeDialog();
    }
  };

  return (
    <>
      <InViewPlayVideo
        ref={videoRef}
        src={src}
        width={width}
        height={height}
        className={cn('cursor-zoom-in', className)}
        preload='metadata'
        autoPlay
        onClick={handleVideoClick}
      />
      <dialog
        ref={dialogRef}
        className={cn(
          'min-h-dvh min-w-dvw cursor-zoom-out border-none bg-transparent p-0',
          'backdrop-blur duration-200 backdrop:bg-black/50 backdrop:transition-opacity',
          'backdrop:opacity-0 [&[open]]:backdrop:opacity-100',
        )}
        onClick={handleDialogClick}
      >
        <div
          className={cn(
            'relative flex min-h-dvh min-w-dvw items-center justify-center border-none',
            isClosing ? 'animate-zoom-out' : 'animate-zoom-in',
          )}
        >
          <video
            src={src}
            playsInline
            loop
            muted
            autoPlay
            className='pointer-events-none aspect-video max-h-[80dvh] max-w-[90dvw] rounded-lg'
          />
        </div>
      </dialog>
    </>
  );
}
