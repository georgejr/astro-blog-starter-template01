import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CATEGORIES } from './lib/taxonomy';

// Article frontmatter contract. publishDate/updatedDate are strictly coerced
// to Date so an invalid or missing date fails the build at sync time with a
// schema error instead of surfacing later as "Invalid time value" during
// rendering. scripts/validate-content.ts re-checks the same rules (plus
// cross-article rules) before astro build even starts.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().min(1, 'title must not be empty'),
    description: z.string().min(1, 'description must not be empty'),
    /** Optional explicit slug; defaults to the filename (entry id). */
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'slug must be kebab-case').optional(),
    publishDate: z.coerce.date({
      required_error: 'publishDate is required (ISO timestamp, e.g. 2026-08-01T08:00:00Z)',
      invalid_type_error: 'publishDate must be a valid ISO date, e.g. 2026-08-01T08:00:00Z',
    }),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    category: z.enum(CATEGORIES),
    tags: z.array(z.string()).default([]),
    primaryKeyword: z.string().min(1, 'primaryKeyword must not be empty'),
    secondaryKeywords: z.array(z.string()).default([]),
    relatedCalculators: z.array(z.string()).default([]),
    relatedArticles: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    author: z.string().default('SunMetricLab Editorial Team'),
    // Optional headline figure for the generated OG/share image. When present,
    // the OG card renders it as a mini-infographic; otherwise a title card.
    ogStat: z
      .object({
        value: z.string().min(1),
        label: z.string().min(1),
      })
      .optional(),
  }),
});

export const collections = { blog };
