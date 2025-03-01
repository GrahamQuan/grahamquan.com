// import { TechStack } from '@/lib/constants';
import { TechStack } from '@/lib/constants';
import GridContent from '@/components/grid-layout/grid-content';

export default function Page() {
  return (
    <div className='mx-auto flex max-w-4xl flex-col gap-12 p-12'>
      <h1 className='text-2xl font-bold'>About</h1>
      <GridContent list={TechStack} />
    </div>
  );
}
