type BlogTopicDefinition = {
  label: string;
  shortLabel: string;
  description: string;
  order: number;
  accentClass: string;
};

export const BLOG_TOPICS = {
  development: {
    label: 'Development',
    shortLabel: 'Dev',
    description: 'Articles about software engineering, web development, and building digital products.',
    order: 1,
    accentClass: 'text-sky-600 dark:text-sky-300',
  },
  ai: {
    label: 'AI',
    shortLabel: 'AI',
    description: 'Notes on artificial intelligence, models, tools, and practical workflows.',
    order: 2,
    accentClass: 'text-violet-600 dark:text-violet-300',
  },
  reading: {
    label: 'Reading',
    shortLabel: 'Reading',
    description: 'Ideas, reviews, and reflections gathered from books and other writing.',
    order: 3,
    accentClass: 'text-amber-600 dark:text-amber-300',
  },
  life: {
    label: 'Life',
    shortLabel: 'Life',
    description: 'Personal notes about everyday life, growth, and experiences.',
    order: 4,
    accentClass: 'text-emerald-600 dark:text-emerald-300',
  },
  cooking: {
    label: 'Cooking',
    shortLabel: 'Cooking',
    description: 'Recipes, techniques, and lessons learned in the kitchen.',
    order: 5,
    accentClass: 'text-orange-600 dark:text-orange-300',
  },
  finance: {
    label: 'Finance',
    shortLabel: 'Finance',
    description: 'Notes on personal finance, markets, and making better financial decisions.',
    order: 6,
    accentClass: 'text-cyan-600 dark:text-cyan-300',
  },
} as const satisfies Record<string, BlogTopicDefinition>;

export type BlogTopic = keyof typeof BLOG_TOPICS;

export const BLOG_TOPIC_SLUGS: readonly BlogTopic[] = Object.keys(BLOG_TOPICS) as BlogTopic[];

export function getBlogTopic(slug: string) {
  if (!Object.prototype.hasOwnProperty.call(BLOG_TOPICS, slug)) {
    return undefined;
  }

  return BLOG_TOPICS[slug as BlogTopic];
}
