// CLI: validates all blog articles and the banner config. Runs before every
// build (see package.json "build"); exits nonzero on error.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { loadArticles } from './lib/load';
import { validateArticles } from './lib/validate';
import { validateBanners } from '../src/lib/banners';
import { CATEGORIES } from '../src/lib/taxonomy';

const articles = loadArticles();
const issues = validateArticles(articles);

const bannerFile = join(process.cwd(), 'src', 'data', 'banners.json');
let banners: unknown = [];
try {
  banners = JSON.parse(readFileSync(bannerFile, 'utf8'));
} catch (error) {
  issues.push({ file: 'src/data/banners.json', message: `invalid JSON: ${(error as Error).message}` });
}
for (const message of validateBanners(banners, {
  categories: CATEGORIES,
  slugs: new Set(articles.map((a) => a.slug)),
  publicFileExists: (sitePath) => existsSync(join(process.cwd(), 'public', decodeURI(sitePath.split(/[?#]/)[0]))),
})) {
  issues.push({ file: 'src/data/banners.json', message });
}

if (issues.length > 0) {
  console.error(`validate:content — ${issues.length} error(s):\n`);
  for (const issue of issues) console.error(`  ${issue.file}: ${issue.message}`);
  process.exit(1);
}

console.log(
  `validate:content — OK (${articles.length} articles, ${Array.isArray(banners) ? banners.length : 0} banners)`,
);
