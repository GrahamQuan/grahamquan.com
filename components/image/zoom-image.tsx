'use client';

import type { ComponentProps } from 'react';
import Zoom from 'react-medium-image-zoom';

import 'react-medium-image-zoom/dist/styles.css';

export default function ZoomImage({ src, alt, ...props }: ComponentProps<'img'>) {
  return (
    <Zoom>
      <img loading='lazy' decoding='async' fetchPriority='low' src={src} alt={alt} {...props} />
    </Zoom>
  );
}
