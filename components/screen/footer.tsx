import Link from 'next/link';

import { AUTHOR, NavigationList, SocialList } from '@/lib/constants';
import { cn } from '@/lib/utils';

import GridContainer from '../grid-layout/grid-container';
import ThemeToggle from '../theme-toggle';

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
    <div className={cn('border-color mdx:border-x flex flex-col gap-12 px-8 py-20 last:border-r-0', className)}>
      <h3 className='font-mono font-semibold'>{title}</h3>
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
        <footer className='relative mx-auto w-full max-w-4xl'>
          <GridContainer className='mdx:col-start-2 not-mdx:after:hidden col-start-1 row-start-3'>
            <div className='mdx:grid mdx:grid-cols-4 mdx:gap-32 w-full grid-cols-4 justify-between'>
              <FooterItem title='Navigation' list={NavigationList} className='col-start-3' />
              <FooterItem title='Socials' list={SocialList} className='col-start-4' />
            </div>
          </GridContainer>
        </footer>
      </div>
      <GridContainer className='mdx:col-start-2 mdx:before:hidden col-start-1 row-start-3 mx-auto flex w-full max-w-4xl items-center justify-between border-b-0 p-12'>
        <div className='text-sm opacity-70 before:mr-12 before:content-["@Author"]'>{AUTHOR}</div>
        <ThemeToggle />
      </GridContainer>
    </>
  );
}
