import { Fragment } from 'react';
import { Plus } from 'lucide-react';

export default function GridContent({ list }: { list: { title: string; description: string }[] }) {
  return (
    <div className='bg-border-color mdx:w-3/4 mx-auto grid w-11/12 grid-cols-13 gap-px'>
      {list.map((item, idx) => (
        <Fragment key={item.title}>
          <div className='relative col-span-1 flex items-end justify-center bg-(--color-background) p-12 pr-0 align-bottom text-lg font-bold [writing-mode:sideways-lr]'>
            <span className='translate-x-6 font-mono'>{item.title}</span>
            {idx !== 0 && <Plus className='absolute -top-12 -right-12 size-24' strokeWidth={1} />}
          </div>
          <div className='col-span-12 bg-(--color-background) p-24'>{item.description}</div>
        </Fragment>
      ))}
    </div>
  );
}
