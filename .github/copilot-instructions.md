# Copilot instructions — SunMetricLab

Static **Astro 5** site (sunmetriclab.com) with Tailwind CSS 4, deployed as
static assets on Cloudflare Workers. 13 solar calculators, state/city cost
pages and a Markdown blog (`src/content/blog/*.md`, ~510 articles, ≈130
live, the rest scheduled weekly). Pushing to `main` deploys to production.
The complete agent guide is `AGENTS.md`; human docs are in `docs/`.

## Build, test, tools

- `npm test` (vitest) and `npm run build` (validate → style lint → astro
  build → internal link check) must pass after every change.
- Content CLIs: `npm run post -- new|publish|schedule|unpublish|status`,
  `npm run link -- add|find|related|list|backlinks`,
  `npm run banner -- list|add|enable|disable|remove`. In Windows
  PowerShell 5.1 use `npx tsx scripts/<post|link|banner>.ts …`.

## Rules

- Read articles only via `src/lib/content.ts`; never `getCollection('blog')`
  in pages or components.
- An article is live when `draft !== true` and `publishDate` (UTC ISO with
  `Z`) is before the build time.
- Frontmatter follows `src/content.config.ts`: `category` from
  `src/lib/taxonomy.ts`, unique `primaryKeyword`, calculator ids from
  `src/data/calculators.ts`.
- Internal links: `/blog/<slug>/`, `/<calculator-id>/`, state/city pages,
  static pages — site-absolute with trailing slash. The target article must
  be live now or publish no later than the linking article; never a draft.
- External links: full `https://` URLs; affiliate/paid links need
  `rel="sponsored"` via `src/data/external-links.json` or the Markdown title
  `"sponsored"`.
- Banners: `src/data/banners.json` (slots `article-top`, `article-bottom`,
  `listing`, `home`, `calculator`), images in `public/banners/`.
- Byline stays the impersonal "SunMetricLab Editorial Team"; never add or
  infer a person's name.
- No fabricated statistics, quotes or testimonials. The 30% federal
  Residential Clean Energy Credit ended for expenditures after 2025-12-31 —
  never describe it as available for 2026+ purchases (`FEDERAL_CREDIT_NOTE`
  in `src/lib/site.ts`).
- Banned in articles (build errors): labeled blocks such as `Pro tip:` /
  `Key takeaway:` / `Good for:`, hype words (game-changing, revolutionary),
  openings like "In today's world" or "Let's dive in". See
  `docs/editorial-guidelines.md`.
- Owner-specific IDs (analytics, forms, ads.txt, IndexNow) are listed in
  `docs/handover.md`; don't change them unless asked.
- Don't deploy, push, or edit `dist/`.
