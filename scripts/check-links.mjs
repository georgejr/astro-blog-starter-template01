// Post-build internal link check: every internal href in dist/**/*.html must
// resolve to a file in the built output. External links are not checked.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = join(process.cwd(), 'dist');

function htmlFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...htmlFiles(full));
    else if (name.endsWith('.html')) out.push(full);
  }
  return out;
}

function resolves(href) {
  const path = href.split('#')[0].split('?')[0];
  if (path === '' || path === '/') return existsSync(join(DIST, 'index.html'));
  const rel = path.replace(/^\//, '').replace(/\/$/, '');
  return (
    existsSync(join(DIST, rel)) ||
    existsSync(join(DIST, rel, 'index.html')) ||
    existsSync(join(DIST, `${rel}.html`))
  );
}

if (!existsSync(DIST)) {
  console.error('check:links — dist/ not found; run astro build first');
  process.exit(1);
}

const missing = new Map();
const files = htmlFiles(DIST);
for (const file of files) {
  const html = readFileSync(file, 'utf8');
  for (const match of html.matchAll(/href="(\/[^"]*)"/g)) {
    const href = match[1];
    if (href.startsWith('//')) continue; // protocol-relative external
    if (!resolves(href)) {
      if (!missing.has(href)) missing.set(href, []);
      missing.get(href).push(file.slice(DIST.length + 1));
    }
  }
}

if (missing.size > 0) {
  console.error(`check:links — ${missing.size} broken internal link target(s):`);
  for (const [href, sources] of missing) {
    console.error(`  ${href}  (from ${sources.slice(0, 3).join(', ')}${sources.length > 3 ? ` +${sources.length - 3} more` : ''})`);
  }
  process.exit(1);
}
console.log(`check:links — OK (${files.length} pages scanned)`);
