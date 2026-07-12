// CLI: content style lint. Errors (template blocks, hype, banned openings)
// exit nonzero; warnings are printed for a human editor but do not fail.
import { loadArticles } from './lib/load';
import { lintArticles } from './lib/style';

const issues = lintArticles(loadArticles());
const errors = issues.filter((issue) => issue.level === 'error');
const warnings = issues.filter((issue) => issue.level === 'warning');

for (const warning of warnings) console.warn(`  warning ${warning.file}: ${warning.message}`);
for (const error of errors) console.error(`  ERROR ${error.file}: ${error.message}`);

if (errors.length > 0) {
  console.error(`\nlint:content-style — ${errors.length} error(s), ${warnings.length} warning(s)`);
  process.exit(1);
}
console.log(`lint:content-style — OK (${warnings.length} warning(s))`);
