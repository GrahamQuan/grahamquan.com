import 'server-only';

import { z } from 'zod';

const EnvSchema = z.object({
  GITHUB_REPO: z.string().regex(/^[^/]+\/[^/]+$/, 'Expected "owner/repository"'),
  GITHUB_TOKEN: z.string().min(1).optional(),
});

const envValues = {
  GITHUB_REPO: process.env.GITHUB_REPO,
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
};

export type Env = z.infer<typeof EnvSchema>;
export const env = EnvSchema.parse(envValues);
