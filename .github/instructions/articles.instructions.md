---
applyTo: "src/content/blog/**/*.md"
---

# Writing and editing blog articles

- The filename is the slug and URL (`/blog/<slug>/`); don't rename live
  articles without a 301 in `public/_redirects`.
- Required frontmatter: `title`, `description` (140–160 chars),
  `publishDate` (UTC ISO with `Z`), `category` (one of the 14 in
  `src/lib/taxonomy.ts`), unique `primaryKeyword`. Optional: `draft`,
  `updatedDate`, `tags` (2–4), `secondaryKeywords`, `relatedCalculators`
  (ids from `src/data/calculators.ts`), `relatedArticles` (0–3 slugs),
  `ogStat` (`{ value, label }`).
- When revising an article, add/bump `updatedDate`; never change
  `publishDate` of a live article.
- Body: start at `##`; 2–4 substantial sections of prose; tables only for
  numbers; label assumptions in worked examples; optional
  `## Frequently asked questions` with `###` questions (becomes FAQ schema).
- Links: site-absolute with trailing slash; linked articles must be live or
  publish no later than this one; external links as full `https://` URLs,
  affiliate ones marked `"sponsored"`.
- No `TODO` in published articles, no fabricated facts, no banned phrases
  (`docs/editorial-guidelines.md`), no claims that the ended 30% federal
  credit applies to 2026+ purchases.
- Validate quickly with `npx tsx scripts/validate-content.ts`.
