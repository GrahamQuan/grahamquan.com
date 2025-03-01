export const AUTHOR = 'Graham Quan';
export const UseMarkdownLaTeX: boolean = true;

/* header & footer  */
export const NavigationList = [
  {
    title: 'Blog',
    href: '/blog',
  },
  {
    title: 'Projects',
    href: '/projects',
  },
  {
    title: 'About',
    href: '/about',
  },
];

/* footer */
export const SocialList = [
  { title: 'GitHub', href: process.env.NEXT_PUBLIC_GITHUB_URL || '', target: '_blank' },
  { title: 'X', href: process.env.NEXT_PUBLIC_TWITTER_URL || '', target: '_blank' },
  {
    title: 'Email',
    href: process.env.NEXT_PUBLIC_EMAIL_ADDRESS ? `mailto:${process.env.NEXT_PUBLIC_EMAIL_ADDRESS}` : '',
    type: 'email',
  },
];

/* Projects page */
// if videoSrc exist, imgSrc will not be rendered
export type Project = {
  title: string;
  description: string;
  keywords?: string[];
  href?: string;
  githubLink?: string;
  imgSrc?: string;
  videoSrc?: string;
};

export const ProjectList: Project[] = [
  {
    title: 'Discord Clone',
    description: `Typescript, React, Next.js 13 app route, Prisma, MySQL, Zustand, React-Query, Zod, React-hook-form, TailwindCSS, ShadcnUI`,
    keywords: [
      'Typescript',
      'React',
      'Next.js',
      'Prisma',
      'MySQL',
      'Zustand',
      'React-Query',
      'Zod',
      'React-hook-form',
      'TailwindCSS',
      'ShadcnUI',
    ],
    href: 'https://chatting-room-production.up.railway.app',
    githubLink: 'https://github.com/GrahamQuan/discord-clone',
    imgSrc: '/projects/discord-clone.webp',
  },
  {
    title: 'Notion Clone',
    description: `Typescript, React, Next.js 13 app route, Zustand, Convex, TailwindCSS, ShadcnUI`,
    keywords: ['Typescript', 'React', 'Next.js', 'Zustand', 'Convex', 'TailwindCSS', 'ShadcnUI'],
    href: 'https://next-notes-nine.vercel.app/',
    githubLink: 'https://github.com/GrahamQuan/notion-clone',
    imgSrc: '/projects/notion-clone.webp',
  },
  {
    title: 'Airbnb Clone',
    description: `Typescript, React, Next.js 13 app route, Prisma, MongoDB, Redux, React-hook-form, TailwindCSS`,
    keywords: ['Typescript', 'React', 'Next.js', 'Prisma', 'MongoDB', 'Redux', 'React-hook-form', 'TailwindCSS'],
    href: 'https://air-clone-next.vercel.app',
    githubLink: 'https://github.com/GrahamQuan/airbnb-clone',
    imgSrc: '/projects/airbnb.webp',
  },
  {
    title: 'LeetCode Clone',
    description: `Typescript, React, Next.js 13 app route, Redux, FireBase, TailwindCSS`,
    keywords: ['Typescript', 'React', 'Next.js', 'Redux', 'FireBase', 'TailwindCSS'],
    href: 'https://leetcode-demo.vercel.app',
    githubLink: 'https://github.com/GrahamQuan/leetcode-demo',
    videoSrc: '/projects/leetcode-demo.mp4',
  },
  {
    title: 'WebRTC Peer to Peer Video Call',
    description: `Vanilla JS, WebRTC, Agora.io, Google Stun Servers`,
    keywords: ['Vanilla JS', 'WebRTC', 'Agora.io', 'Google Stun Servers'],
    href: 'https://web-rtc-demo-mauve.vercel.app',
    githubLink: 'https://github.com/GrahamQuan/WebRTC-demo',
    imgSrc: '/projects/webrtc-p2p.webp',
  },
  {
    title: 'Jobs Expo App',
    description: `Javascript, React Native, Expo, Expo Navigation`,
    keywords: ['Javascript', 'React Native', 'Expo', 'Expo Navigation'],
    githubLink: 'https://github.com/GrahamQuan/rn-jobs-app',
    imgSrc: '/projects/rn-jobs.webp',
  },
];

/* About page */
export const TechStack = [
  {
    title: 'Frontend',
    keywords: [
      {
        title: 'React v19',
        keywords: ['react-hook-form', 'Zod', 'useSwr', 'use-query'],
      },
      {
        title: 'Next.js v15',
        keywords: ['app router', 'server actions', 'use cache', 'next-auth'],
      },
      {
        title: 'UI framework',
        keywords: ['ShadcnUI', 'Ant Design'],
      },
      {
        title: 'Bundler',
        keywords: ['webpack', 'vite', 'tsup'],
      },
      'TypeScript',
      'Tailwind CSS v4',
      'React Router v7',
    ],
  },
  {
    title: 'Backend',
    keywords: ['Node.js', 'Express', 'Hono', 'Drizzle ORM'],
  },
  {
    title: 'Test',
    keywords: ['Vitest', 'React Testing Library', 'Playwright'],
  },
  {
    title: 'Database',
    keywords: ['PostgreSQL', 'Redis', 'Supabase'],
  },
  {
    title: 'Cloud/Serverless',
    keywords: ['Cloudflare', 'Vercel'],
  },
  {
    title: 'DevOps',
    keywords: ['Docker', 'CI/CD', 'Git', 'GitHub Actions'],
  },
];
