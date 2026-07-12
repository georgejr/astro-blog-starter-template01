// Node-side article loader for validation scripts (no Astro involved).
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';
import matter from 'gray-matter';

export interface RawArticle {
  file: string;
  /** Effective slug: explicit frontmatter slug or the filename. */
  slug: string;
  data: Record<string, unknown>;
  body: string;
}

export const BLOG_DIR = join(process.cwd(), 'src', 'content', 'blog');
export const PLAN_FILE = join(process.cwd(), 'content-plan.json');

export function loadArticles(dir = BLOG_DIR): RawArticle[] {
  return readdirSync(dir)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((file) => {
      const raw = readFileSync(join(dir, file), 'utf8');
      const { data, content } = matter(raw);
      const id = basename(file).replace(/\.mdx?$/, '');
      return {
        file,
        slug: typeof data.slug === 'string' && data.slug ? data.slug : id,
        data,
        body: content,
      };
    });
}

export interface PlanEntry {
  title: string;
  slug: string;
  cluster: string;
  category: string;
  publishDate: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent: string;
  relatedCalculators: string[];
  pillar?: boolean;
}

export function loadPlan(file = PLAN_FILE): PlanEntry[] | null {
  if (!existsSync(file)) return null;
  return JSON.parse(readFileSync(file, 'utf8')) as PlanEntry[];
}
