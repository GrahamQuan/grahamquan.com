'use client';

import { motion, useReducedMotion } from 'motion/react';

const signatureLetters = [
  { character: 'G', x: 0, width: 73.31 },
  { character: 'r', x: 73.31, width: 39.96 },
  { character: 'a', x: 113.27, width: 53.28 },
  { character: 'h', x: 166.55, width: 53.28 },
  { character: 'a', x: 219.83, width: 53.28 },
  { character: 'm', x: 273.11, width: 80.05 },
  { character: 'Q', x: 383.16, width: 86.64 },
  { character: 'u', x: 469.8, width: 53.28 },
  { character: 'a', x: 523.08, width: 53.28 },
  { character: 'n', x: 576.36, width: 53.64 },
] as const;

export default function GrahamQuanSignature() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg
      aria-hidden='true'
      className='h-auto w-full overflow-visible'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 630 151.3125'
      preserveAspectRatio='xMinYMid meet'
    >
      {signatureLetters.map((letter, index) => {
        const delay = index * 0.14;

        return (
          <motion.text
            key={`${letter.character}-${letter.x}`}
            x={letter.x}
            y='112.4375'
            fill='currentColor'
            stroke='currentColor'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            textLength={letter.width}
            lengthAdjust='spacingAndGlyphs'
            fontFamily='"Snell Roundhand", "Segoe Script", "Brush Script MT", cursive'
            fontSize='120'
            initial={
              shouldReduceMotion
                ? false
                : {
                    fillOpacity: 0,
                    opacity: 0,
                    strokeDasharray: '750 750',
                    strokeDashoffset: 750,
                  }
            }
            animate={{ fillOpacity: 1, opacity: 1, strokeDashoffset: 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    fillOpacity: { delay: delay + 0.32, duration: 0.24 },
                    opacity: { delay, duration: 0.08 },
                    strokeDashoffset: { delay, duration: 0.48, ease: 'easeInOut' },
                  }
            }
            style={{ paintOrder: 'stroke fill' }}
          >
            {letter.character}
          </motion.text>
        );
      })}
    </svg>
  );
}
