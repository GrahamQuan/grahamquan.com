// import { TechStack } from '@/lib/constants';
import GridContent from '@/components/grid-layout/grid-content';

export default function Page() {
  return (
    <div className='mx-auto flex max-w-4xl flex-col gap-12 p-12'>
      <h1 className='text-2xl font-bold'>About</h1>
      <GridContent
        list={[
          {
            title: '1 title',
            description:
              '1 description 1 description 1 description 1 description 1 description 1 description 1 description 1 description 1 description 1 description',
          },
          {
            title: '2 title',
            description:
              '2 description 2 description 2 description 2 description 2 description 2 description 2 description 2 description 2 description 2 description',
          },
          {
            title: '3 title',
            description:
              ' 3 description 3 description 3 description 3 description 3 description 3 description 3 description 3 description 3 description 3 description 3 description 3 description 3 description 3 description 3 description 3 description 3 description 3 description 3 description 3 description 3 description 3 description 3 description 3 description 3 description 3 description 3 description 3 description 3 description 3 description',
          },
        ]}
      />
    </div>
  );
}
