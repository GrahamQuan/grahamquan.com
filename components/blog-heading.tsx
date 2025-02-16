import { formatDate } from '@/lib/time-utils';

import GridContainer from './grid-container';

export default function BlogHeading({ title, date }: { title: string; date: number }) {
  return (
    <div className='max-mdx:mx-auto max-mdx:w-full max-mdx:max-w-(--breakpoint-mdx)'>
      <div className='mt-16 px-4 font-mono text-sm/7 font-medium tracking-widest uppercase opacity-70 lg:px-2'>
        <time dateTime={date.toString()}>{formatDate(date)}</time>
      </div>
      <GridContainer className='mdx:mb-16 mdx:px-2 mb-6 flex items-center px-4'>
        <h1 className='inline-block max-w-(--breakpoint-md) py-8 text-sm/10 tracking-tight text-pretty max-lg:font-medium lg:text-6xl'>
          {title}
        </h1>
      </GridContainer>
    </div>
  );
}
