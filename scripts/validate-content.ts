// CLI: validates all blog articles and (when present) content-plan.json.
// Runs before every build (see package.json "build"); exits nonzero on error.
import { loadArticles, loadPlan } from './lib/load';
import { validateArticles, validatePlan } from './lib/validate';

const articles = loadArticles();
const issues = validateArticles(articles);

const plan = loadPlan();
if (plan) issues.push(...validatePlan(plan, articles));

if (issues.length > 0) {
  console.error(`validate:content — ${issues.length} error(s):\n`);
  for (const issue of issues) console.error(`  ${issue.file}: ${issue.message}`);
  process.exit(1);
}

console.log(
  `validate:content — OK (${articles.length} articles${plan ? `, plan: ${plan.length} entries` : ', no plan file'})`,
);
