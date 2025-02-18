export const AUTHOR = 'Graham Quan';

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
export type Project = {
  title: string;
  description: string;
  keywords?: string[];
  href: string;
  githubLink: string;
  imgSrc?: string;
  videoSrc?: string;
};

export const Projects: Project[] = [
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
    videoSrc: undefined,
  },
  {
    title: 'Notion Clone',
    description: `Typescript, React, Next.js 13 app route, Zustand, Convex, TailwindCSS, ShadcnUI`,
    keywords: ['Typescript', 'React', 'Next.js', 'Zustand', 'Convex', 'TailwindCSS', 'ShadcnUI'],
    href: 'https://next-notes-nine.vercel.app/',
    githubLink: 'https://github.com/GrahamQuan/notion-clone',
    imgSrc: '/projects/notion-clone.webp',
    videoSrc: undefined,
  },
  {
    title: 'Airbnb Clone',
    description: `Typescript, React, Next.js 13 app route, Prisma, MongoDB, Redux, React-hook-form, TailwindCSS`,
    keywords: ['Typescript', 'React', 'Next.js', 'Prisma', 'MongoDB', 'Redux', 'React-hook-form', 'TailwindCSS'],
    href: 'https://air-clone-next.vercel.app',
    githubLink: 'https://github.com/GrahamQuan/airbnb-clone',
    imgSrc: '/projects/airbnb.webp',
    videoSrc: undefined,
  },
  {
    title: 'LeetCode Clone',
    description: `Typescript, React, Next.js 13 app route, Redux, FireBase, TailwindCSS`,
    keywords: ['Typescript', 'React', 'Next.js', 'Redux', 'FireBase', 'TailwindCSS'],
    href: 'https://leetcode-demo.vercel.app',
    githubLink: 'https://github.com/GrahamQuan/leetcode-demo',
    imgSrc: undefined,
    videoSrc: '/projects/leetcode-demo.mp4',
  },
  {
    title: 'WebRTC Peer to Peer Video Call',
    description: `Vanilla JS, WebRTC, Agora.io, Google Stun Servers`,
    keywords: ['Vanilla JS', 'WebRTC', 'Agora.io', 'Google Stun Servers'],
    href: 'https://web-rtc-demo-mauve.vercel.app',
    githubLink: 'https://github.com/GrahamQuan/WebRTC-demo',
    imgSrc: '/projects/webrtc-p2p.webp',
    videoSrc: undefined,
  },
  {
    title: 'Jobs Expo App',
    description: `Javascript, React Native, Expo, Expo Navigation`,
    keywords: ['Javascript', 'React Native', 'Expo', 'Expo Navigation'],
    href: 'https://github.com/GrahamQuan/rn-jobs-app',
    githubLink: 'https://github.com/GrahamQuan/rn-jobs-app',
    imgSrc: '/projects/rn-jobs.webp',
    videoSrc: undefined,
  },
];

/* About page */
export const TechStack = [
  {
    title: 'Frontend',
    items: ['React v19', 'Next.js v15', 'Tailwind CSS v14'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express'],
  },
  {
    title: 'Database',
    items: ['PostgreSQL', 'Supabase'],
  },
];
