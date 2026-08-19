import { ZodError, z } from 'zod';

const optionalUrl = z
  .union([z.string().url(), z.literal('')])
  .optional()
  .default('');
const optionalEmail = z
  .union([z.string().email(), z.literal('')])
  .optional()
  .default('');

const EnvClientSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z.string().url(),
  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: z.string().optional().default(''),
  NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN: z.string().optional().default(''),
  NEXT_PUBLIC_GITHUB_URL: optionalUrl,
  NEXT_PUBLIC_TWITTER_URL: optionalUrl,
  NEXT_PUBLIC_EMAIL_ADDRESS: optionalEmail,
  NEXT_PUBLIC_GISCUS_REPO: z
    .union([z.string().regex(/^[^/]+\/[^/]+$/), z.literal('')])
    .optional()
    .default(''),
  NEXT_PUBLIC_GISCUS_REPO_ID: z.string().optional().default(''),
  NEXT_PUBLIC_GISCUS_CATEGORY: z.string().optional().default(''),
  NEXT_PUBLIC_GISCUS_CATEGORY_ID: z.string().optional().default(''),
});

const envClientValues = {
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
  NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN: process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN,
  NEXT_PUBLIC_GITHUB_URL: process.env.NEXT_PUBLIC_GITHUB_URL,
  NEXT_PUBLIC_TWITTER_URL: process.env.NEXT_PUBLIC_TWITTER_URL,
  NEXT_PUBLIC_EMAIL_ADDRESS: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,
  NEXT_PUBLIC_GISCUS_REPO: process.env.NEXT_PUBLIC_GISCUS_REPO,
  NEXT_PUBLIC_GISCUS_REPO_ID: process.env.NEXT_PUBLIC_GISCUS_REPO_ID,
  NEXT_PUBLIC_GISCUS_CATEGORY: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
  NEXT_PUBLIC_GISCUS_CATEGORY_ID: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
};

export type EnvClientSchema = z.infer<typeof EnvClientSchema>;

try {
  EnvClientSchema.parse(envClientValues);
} catch (error) {
  if (error instanceof ZodError) {
    let message = 'Missing required values in client env:\n';
    for (const issue of error.issues) {
      message += `${String(issue.path[0])}: ${issue.message}\n`;
    }
    const e = new Error(message);
    e.stack = '';
    throw e;
  }
  console.error(error);
}

export type ENV_CLIENT = z.infer<typeof EnvClientSchema>;
export const envClient = EnvClientSchema.parse(envClientValues);
