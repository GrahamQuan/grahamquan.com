'use client';

import { ComponentProps, useEffect, useRef, useState } from 'react';

export default function InViewPlayVideo({ src, muted = true, ...props }: ComponentProps<'video'>) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    videoEl.muted = muted;
    videoEl.defaultMuted = muted;

    const handleLoadedData = () => {
      if (isInView) {
        videoEl.currentTime = 0;
        videoEl.play();
      }
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting && videoEl.src) {
          videoEl.play();
        } else if (!entry.isIntersecting && videoEl.src) {
          videoEl.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });

    videoEl.addEventListener('loadeddata', handleLoadedData);
    observer.observe(videoEl);

    return () => {
      videoEl.removeEventListener('loadeddata', handleLoadedData);
      observer.unobserve(videoEl);
      observer.disconnect();
    };
  }, [isInView, src, muted]);

  return <video ref={videoRef} {...props} src={src} loop playsInline controlsList='nodownload' muted={muted} />;
}
