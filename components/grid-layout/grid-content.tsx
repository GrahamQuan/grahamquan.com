import { Fragment } from 'react';
import { Plus } from 'lucide-react';

type Props = {
  list: { title: string; keywords: (string | { title: string; keywords: string[] })[] }[];
};

function keywordList(keywords: Props['list'][number]['keywords']) {
  return keywords.map((keyword) => {
    if (typeof keyword === 'string') {
      return <li key={keyword}>{keyword}</li>;
    } else {
      return (
        <li key={keyword.title} className='space-y-8 pl-12'>
          <div>{keyword.title}</div>
          <ul className='list-disc space-y-8 pl-16 opacity-60'>
            {keyword.keywords.map((subKeyword) => (
              <li key={subKeyword}>{subKeyword}</li>
            ))}
          </ul>
        </li>
      );
    }
  });
}

export default function GridContent({ list }: Props) {
  return (
    <div className='bg-border-color mdx:w-3/4 mx-auto grid w-11/12 grid-cols-13 gap-px'>
      {list.map((item, idx) => (
        <Fragment key={item.title}>
          <div className='relative col-span-1 flex items-end justify-center bg-(--color-background) p-12 pr-0 align-bottom text-lg font-bold [writing-mode:sideways-lr]'>
            <span className='translate-x-6 font-mono' title={item.title}>
              {item.title}
            </span>
            {idx !== 0 && <Plus className='absolute -top-12 -right-12 size-24' strokeWidth={1} />}
          </div>
          <div className='col-span-12 bg-(--color-background) p-24 pl-40'>
            <ul className='list-disc space-y-8'>{keywordList(item.keywords)}</ul>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
