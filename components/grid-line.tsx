import { cn } from '@/lib/utils';

export default function GridLine({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'mdx:block col-span-full col-start-2 row-start-2 hidden h-px bg-gray-950/5 dark:bg-white/10',
        className,
      )}
    />
  );
}
