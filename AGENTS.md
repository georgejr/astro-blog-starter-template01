# AGENTS.md

Guidance for AI coding agents (OpenAI Codex, Claude Code, Copilot, Cursor,
Gemini …) working in this repository. Human docs live in `docs/`; this file
is the condensed, rule-first version.

## Project in one paragraph

SunMetricLab (sunmetriclab.com) is a **static Astro 5 site** for US
homeowners: 13 solar calculators, modeled cost pages for 51 states and 45
cities, and a Markdown blog (~510 articles in `src/content/blog/`, ≈130 live,
the rest scheduled one per week until 2034). Tailwind CSS 4. Deployed as
static assets on Cloudflare Workers: every push to `main` triggers a
Cloudflare build + deploy; a GitHub Action pushes a trigger commit every
Tuesday 08:05 UTC so scheduled articles go live. No server, database, CMS
or secrets.

## Commands

```bash
npm ci                      # install
npm run dev                 # dev server, http://localhost:4321
npm test                    # vitest unit tests (fast)
npm run build               # validate:content → lint:content-style → astro build → check:links (~3 min)
npm run post -- status      # live / scheduled / draft overview + live banners
npm run post -- new --title "…" --category "…" [--tags a,b] [--calculators id] [--date now|next-slot|ISO] [--publish]
npm run post -- publish|schedule|unpublish <slug> [--date …]
npm run link -- add <source-slug> <target> --anchor "phrase" [--sponsored|--nofollow] [--dry-run]
npm run link -- find "<phrase>" [--to <target>] [--apply] [--limit N]
npm run link -- related <source-slug> <target-slug>…
npm run link -- list|backlinks <slug>
npm run banner -- list | add … | enable|disable|remove <id>
```

`<target>` = article slug, calculator id, site path (`/…/`) or `https://` URL.
If `--` gets swallowed (Windows PowerShell 5.1), use `npx tsx scripts/<post|link|banner>.ts …`.

## Definition of done

- `npm test` and `npm run build` both pass. A failing build on Cloudflare
  blocks **all** publishing, including the weekly scheduled article.
- Don't run `npm run deploy`, push, or change account IDs unless the owner
  asks. Pushing to `main` deploys to production.
- Review `git diff` of any CLI bulk edit (e.g. `link find --apply`) before
  calling it done.

## Hard rules

1. **Articles are read only through `src/lib/content.ts`** (published-only
   helpers). Never call `getCollection('blog')` in pages/components.
2. **Publishing is build-time:** live = `draft !== true && publishDate <= build time`.
   Dates are UTC ISO strings with `Z` (`2026-10-06T08:00:00Z`).
3. **Frontmatter must match `src/content.config.ts`.** `category` must be one
   of the 14 in `src/lib/taxonomy.ts`; `primaryKeyword` must be unique;
   `relatedCalculators` ids must exist in `src/data/calculators.ts`.
4. **Internal links:** site-absolute with trailing slash (`/blog/<slug>/`,
   `/<calculator-id>/`, `/solar-panel-cost-by-state/<state>/`,
   `/solar-panel-cost-by-city/<city>-<st>/`, static pages). A linked or
   `relatedArticles` article must be **live now or publish no later than the
   linking article**; never link to drafts. The validator enforces this.
5. **External links:** full `https://` URLs. Affiliate/paid links must get
   `rel="sponsored"`: add the domain to `src/data/external-links.json` or
   use the Markdown title `"sponsored"` (`[text](https://… "sponsored")`).
   Raw HTML `<a>` tags are not rewritten — set `rel`/`target` yourself.
6. **Never invent calculator URLs**; use `src/data/calculators.ts`.
7. **Byline stays impersonal** ("SunMetricLab Editorial Team",
   `src/data/authors.ts`). Never add a person's name, bio or profile — and
   never derive one from git history, file names or the OS user. Only add a
   named author if the owner explicitly supplies it.
8. **No fabricated facts:** no invented statistics, quotes, testimonials,
   first-hand testing claims or "current" prices presented as live facts.
   Label worked-example assumptions.
9. **Federal credit:** the 30% Residential Clean Energy Credit (IRC 25D)
   ended for expenditures after 2025-12-31. Never present it as available
   for 2026+ purchases; reuse `FEDERAL_CREDIT_NOTE` (`src/lib/site.ts`).
10. **Style bans (build errors):** labeled blocks like `Pro tip:`,
    `Key takeaway:`, `Good for:`; hype words (game-changing, revolutionary,
    unlock the power …); openings like "In today's world", "When it comes
    to", "Let's dive in". Full list: `docs/editorial-guidelines.md`.
11. Don't hand-edit `dist/`, `.astro/`, or generated files; don't commit
    `.env*` or `.claude/settings.local.json`.
12. Don't re-date the scheduled queue by hand; use
    `node scripts/reschedule-weekly.mjs` (dry run first, then `--write`).

## Where things are

| Need | Location |
| --- | --- |
| Articles | `src/content/blog/<slug>.md` (filename = slug = `/blog/<slug>/`) |
| Article template | `src/pages/blog/[slug].astro` |
| Site name, URL, nav, owner account IDs | `src/lib/site.ts` |
| Categories | `src/lib/taxonomy.ts` |
| Calculator registry / related tools | `src/data/calculators.ts`, `src/data/calculator-related.ts` |
| Calculator math | `src/lib/solar/calculateSolar.ts`, `src/components/calculators/` |
| Banners | `src/data/banners.json` → `src/components/BannerSlot.astro` (`src/lib/banners.ts`) |
| Outbound link rules | `src/data/external-links.json` → `src/lib/rehype-external-links.mjs` |
| State/city data | `src/data/state-solar.ts`, `city-solar.ts`, `state-notes/` (bump `DATA_LAST_UPDATED` when changed) |
| Structured data | `src/lib/schema.ts` |
| Share images | `src/lib/og-image.ts` (per article, `ogStat` optional), `src/lib/og-pages.ts` |
| Redirects | `public/_redirects` (relative paths only) |
| Validation rules | `scripts/lib/validate.ts`, `scripts/lib/style.ts`, `src/lib/banners.ts` |
| Tests | `tests/*.test.ts` |

Full map: `docs/architecture.md`.

## Task recipes

**New article.** `npm run post -- new --title … --category …` → write the
body (replace every `TODO`; the build rejects published articles containing
`TODO`) → 1,600–3,200 words, 2–4 `##` sections of real prose, US audience →
add 1–3 contextual links to live articles and 1–2 calculator links → set
`description` (140–160 chars), 2–4 tags, `relatedCalculators`,
0–3 `relatedArticles` → optional `## Frequently asked questions` with `###`
questions (becomes FAQPage schema) → `npm run post -- publish <slug>` or
`schedule <slug> --date next-slot` → `npm run build`.
Guide: `docs/content-guide.md`, `docs/editorial-guidelines.md`.

**Link a new article from older ones.**
`npm run link -- find "<topic phrase>" --to <new-slug>` → pick sensible
anchors → `--apply --limit N` (or `link add` one by one) → review diff →
build. Guide: `docs/linking.md`.

**Add a banner.** Put the image in `public/banners/` (or pass a local path;
the CLI copies it) → `npm run banner -- add --id … --placement
article-top|article-bottom|listing|home|calculator --image … --href …
--alt …` (+ `--categories`, `--start/--end`, `--priority`, `--house`) →
build. Ad-network code: `--html-file snippet.html`. Guide: `docs/banners.md`.

**Update facts across articles.** `grep -ril "<phrase>" src/content/blog`,
edit, add `updatedDate`, build.

**Remove/rename a live article.** `npm run link -- backlinks <slug>` → fix
links → add `/blog/old/ /blog/new/ 301` to `public/_redirects` → rename or
`npm run post -- unpublish <slug>` → build.

**Code change.** Keep the existing conventions (Astro components +
Tailwind utility classes, small pure helpers in `src/lib` with vitest
coverage in `tests/`), then `npm test && npm run build`.

## Current state and open threads (as of 2026-09-21)

- Queue: ~380 scheduled articles, one per Tuesday 08:00 UTC, last slot
  2034-01-03. Bulk-generated; pruning/merging thin ones is encouraged, then
  re-space with `scripts/reschedule-weekly.mjs`.
- ~95 articles, the homepage FAQ/quick-reference table and the calculators'
  default "include federal credit" setting still treat the ended 30%
  credit as current — fix when touched.
- State notes with facts to verify: NJ SREC-II price, NM credit cap, RI
  state credit, UT sales-tax exemption, TN property tax, MI 10% DG cap,
  Austin Energy rebate.
- ~350 non-blocking style-lint warnings; only one article has an FAQ section.
- Owner-specific IDs (GA4, Ahrefs, Impact, Web3Forms, contact email,
  ads.txt, IndexNow key) may still belong to the previous owner — see
  `docs/handover.md` before touching them.
- `banners.json` is empty; `external-links.json` has no sponsored domains yet.
