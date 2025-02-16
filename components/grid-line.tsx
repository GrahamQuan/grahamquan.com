import { cn } from '@/lib/utils';

export default function GridLine({ className }: { className?: string }) {
  return <div className={cn('col-span-full col-start-2 row-start-2 h-px bg-gray-950/5 dark:bg-white/10', className)} />;
}
