import Link from 'next/link';

// import { Plus } from 'lucide-react';

import { AUTHOR, NavigationList, SocialList } from '@/lib/constants';
import { cn } from '@/lib/utils';

import GridContainer from './grid-layout/grid-container';
import ThemeToggle from './theme-toggle';

function FooterItem({
  title,
  list,
  className,
}: {
  title: string;
  list: { title: string; href: string; type?: string; target?: string }[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-12 border-x border-b border-gray-950/5 px-8 py-20 not-md:border-0 last:border-r-0 md:border-b-0 dark:border-white/10',
        className,
      )}
    >
      <h3 className='font-semibold'>{title}</h3>
      <ul className='mt-4 grid gap-12'>
        {list.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className='text-sm opacity-60 hover:underline hover:opacity-100'
              type={item.type}
              target={item.target}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <>
      <div className='row-start-3 mx-auto flex w-full flex-col lg:col-start-3'>
        <footer className='border-color relative mx-auto w-full max-w-4xl'>
          {/* <Plus className='absolute -top-12 -right-12 translate-x-0.5 opacity-70' strokeWidth={1} /> */}
          {/* <div className='ml-auto hidden w-full grid-cols-4 justify-between gap-y-0 md:grid md:grid-cols-4 md:gap-24 md:gap-x-16 lg:gap-32'> */}
          <GridContainer className='mdx:col-start-2 col-start-1 row-start-3 after:hidden'>
            <div className='mdx:grid mdx:grid-cols-4 mdx:gap-32 w-full grid-cols-4 justify-between gap-y-0'>
              <FooterItem title='Navigation' list={NavigationList} className='col-start-3' />
              <FooterItem title='Socials' list={SocialList} className='col-start-4' />
            </div>
          </GridContainer>
        </footer>
      </div>
      <GridContainer className='mdx:col-start-2 col-start-1 row-start-3 mx-auto flex w-full max-w-4xl items-center justify-between border-b-0 p-12'>
        <div className='text-sm opacity-70 before:mr-12 before:content-["@Author"]'>{AUTHOR}</div>
        <ThemeToggle />
      </GridContainer>
      {/* <div className='mx-auto flex w-full max-w-2xl items-center p-12 lg:max-w-5xl'>
        <ThemeToggle />
      </div> */}
    </>
  );
}
