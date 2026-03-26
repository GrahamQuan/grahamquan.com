// import { TechStack } from '@/lib/constants';

import GridContent from '@/components/grid-layout/grid-content';
import { TechStack } from '@/lib/constants';

export default function Page() {
  return (
    <div className='mx-auto flex max-w-4xl flex-col gap-12 p-12'>
      <h1 className='text-2xl font-bold'>About My Tech Stack</h1>
      <GridContent list={TechStack} />
    </div>
  );
}
