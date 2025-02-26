import { cn } from '@/lib/utils';

export default function GridLine({ className }: { className?: string }) {
  return <div className={cn('bg-border-color col-span-full col-start-2 row-start-2 h-px', className)} />;
}
