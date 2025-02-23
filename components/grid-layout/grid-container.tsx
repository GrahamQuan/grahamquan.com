import clsx from 'clsx';

export default function GridContainer({
  children,
  className,
  direction = 'full',
}: {
  children: React.ReactNode;
  className?: string;
  direction?: 'full' | 'to-left' | 'to-right';
}) {
  let topDirection = '';
  let bottomDirection = '';
  switch (direction) {
    case 'full':
      topDirection = 'before:-left-[13px] mdx:before:-left-[calc((100vw-32px-869px+8px)/2)]';
      bottomDirection = 'after:-left-[13px] mdx:after:-left-[calc((100vw-32px-869px+8px)/2)]';
      break;
    case 'to-left':
      topDirection = 'before:right-0';
      bottomDirection = 'after:right-0';
      break;
    case 'to-right':
      topDirection = 'before:left-0';
      bottomDirection = 'after:left-0';
      break;
  }

  return (
    <div
      className={clsx(
        className,
        'relative',
        'before:absolute before:top-0 before:h-px before:w-dvw before:bg-gray-950/5 dark:before:bg-white/10',
        topDirection,
        'after:absolute after:bottom-0 after:h-px after:w-dvw after:bg-gray-950/5 dark:after:bg-white/10',
        bottomDirection,
      )}
    >
      {children}
    </div>
  );
}
