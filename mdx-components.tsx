import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import React, { type ComponentProps, type ReactElement, type ReactNode } from 'react';

import CodeSnippet from './components/code/code-snippet';
import CodeSnippetHeader from './components/code/code-snippet-header';

function getTextContent(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (React.isValidElement(node)) {
    if (node.type === 'small') {
      return '';
    }

    return getTextContent((node.props as { children?: ReactNode }).children);
  }

  if (Array.isArray(node)) {
    return node.map(getTextContent).join('');
  }

  return ''; // If the node is neither text nor a React element
}

function slugify(str: ReactNode) {
  return getTextContent(str)
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w-]+/g, '') // Remove all non-word characters except for -
    .replace(/--+/g, '-'); // Replace multiple - with single -
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  return ({ children }: React.PropsWithChildren) => {
    let slug = slugify(children);
    return React.createElement(
      `h${level}`,
      {
        id: slug,
        className: 'scroll-mt-72',
      },
      [
        React.createElement(
          'a',
          {
            href: `#${slug}`,
            key: `link-${slug}`,
            className:
              'anchor no-underline relative after:hidden after:content-["#"] hover:after:block after:ml-2 after:absolute after:-right-24 after:top-0',
          },
          children,
        ),
      ],
    );
  };
}

type CodeElementProps = ComponentProps<'code'> & {
  title?: string;
  'data-line-numbers'?: boolean | string;
  'data-line-numbers-start'?: number | string;
};

const filenameDirective = /^\s*(?:\/\/|#|<!--)?\s*\[!code filename:([^\]]+)\]\s*(?:-->)?\s*\n?/;

function getCodeBlock(props: ComponentProps<'pre'>) {
  const child = React.Children.only(props.children) as ReactElement<CodeElementProps>;
  const childProps = child.props;
  const className = childProps.className ?? '';
  const languageClass = className.split(/\s+/).find((value) => value.startsWith('language-'));
  const lang = languageClass?.slice('language-'.length) || 'text';
  let code = String(childProps.children ?? '');
  const filenameMatch = code.match(filenameDirective);
  const filename = filenameMatch?.[1]?.trim();

  if (filenameMatch) code = code.slice(filenameMatch[0].length);
  if (code.endsWith('\n')) code = code.slice(0, -1);

  const rawLineNumbers = childProps['data-line-numbers'];
  const lineNumbers = rawLineNumbers === undefined ? true : rawLineNumbers !== false && rawLineNumbers !== 'false';
  const parsedStart = Number(childProps['data-line-numbers-start']);

  return {
    code,
    filename: filename ?? childProps.title,
    lang,
    lineNumbers,
    lineNumberStart: Number.isFinite(parsedStart) && parsedStart > 0 ? parsedStart : 1,
  };
}

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    // h1: ({ children }) => <h1 style={{ fontSize: "100px" }}>{children}</h1>,
    ...components,

    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),

    a({ href = '', className, ...props }: ComponentProps<'a'>) {
      const isExternal = /^(?:https?:)?\/\//.test(href);

      return (
        <Link
          {...props}
          href={href}
          className={['transition-opacity hover:opacity-60', className].filter(Boolean).join(' ')}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noreferrer noopener' : undefined}
        />
      );
    },

    code(props: ComponentProps<'code'>) {
      return <code {...props} />;
    },

    pre(props) {
      const { code, filename, lang, lineNumbers, lineNumberStart } = getCodeBlock(props);

      return (
        <figure
          className='code-snippet not-prose group my-24 overflow-hidden rounded-md border border-black/12 bg-neutral-50 shadow-sm shadow-black/3 dark:border-white/12 dark:bg-neutral-950 dark:shadow-black/20'
          data-code-snippet
        >
          <CodeSnippetHeader title={filename} lang={lang} />
          <CodeSnippet code={code} lang={lang} lineNumbers={lineNumbers} lineNumberStart={lineNumberStart} />
        </figure>
      );
    },
  };
}
