import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <div>
      <h1
        className={cn('flex items-center justify-center px-3 text-5xl text-sky-400 lg:px-5', 'font-bold text-red-400')}
      >
        Hello World
      </h1>
    </div>
  );
}
