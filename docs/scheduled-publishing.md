# Scheduled publishing

This site is fully static (Astro `output: 'static'`, deployed as Cloudflare
Worker static assets). Scheduled publishing is therefore **build-based**:
whether an article is public is decided at build time, not at request time.

## How it works

- Every article has a `publishDate` (UTC ISO timestamp) and an optional
  `draft` flag in its frontmatter (see `src/content.config.ts`).
- `src/lib/publishing.ts` captures one `BUILD_TIME = new Date()` per build.
  An article is **published** when `draft !== true` and
  `publishDate <= BUILD_TIME`. An article whose `publishDate` equals the
  cutoff exactly is included.
- All article routes, lists, category/tag pages, related-article blocks,
  previous/next navigation, RSS and (via generated routes) the sitemap go
  through `src/lib/content.ts`, which applies this single cutoff. A scheduled
  article's URL **does not exist** in the built output at all — it is not a
  hidden or noindexed page.

## Publication cadence

**One article per week, Tuesdays at 08:00 UTC.** The original plan
(`content-plan.json`) scheduled 2 articles per day; that cadence was retired
on 2026-09-10 because a faceless, twice-daily stream of generated posts is
exactly the pattern Google's helpful-content systems demote. The remaining
queue was re-stamped onto the weekly cadence with
`node scripts/reschedule-weekly.mjs --write` (order preserved, so every
cross-article link stays valid). Re-run the script (dry run first) whenever
the queue is pruned or reordered.

Editorial policy going forward: the weekly slot goes to one deeper,
data-backed article (tables, worked examples, a FAQ section that the
template turns into FAQPage schema). Thin or overlapping queued drafts should
be merged into a single stronger piece or deleted rather than published as-is.

`.github/workflows/scheduled-publish.yml` runs at **08:05 UTC on Tuesdays**. It writes the current UTC timestamp into `.scheduled-build`, commits,
and pushes. The push triggers the existing Cloudflare Workers Git
integration, which runs `npm run build` (content validation + style lint +
Astro build + internal link check) and `npm run deploy`. The fresh build's
`BUILD_TIME` is now past the publication slot, so the newly eligible articles
appear.

The workflow triggers only on `schedule` and `workflow_dispatch`; its own
push cannot re-trigger it, so there is no workflow loop.

## Timing caveats

- An article becomes publicly available only after the **first successful
  build after its `publishDate`**. With the weekly schedule this is
  normally within ~5–20 minutes of the slot (GitHub cron can drift a few
  minutes; the Cloudflare build takes 1–2 minutes).
- If a scheduled build fails (validation error, Cloudflare incident), the
  article is delayed until the next successful build.
- Any manual deployment (push to `main`, "Run workflow" on
  `scheduled-publish`, or a local `npm run build && npm run deploy`)
  immediately publishes everything currently eligible.
- Before that first post-`publishDate` build, the article's URL returns the
  site's 404 — it is absent from the sitemap, RSS, lists, and all internal
  links, so nothing ever points at it.

## Ordering conventions

- Lists (blog index, category, tag, RSS) show published articles
  **newest first**; equal timestamps fall back to title order.
- Previous/next navigation on article pages is **chronological**:
  "previous" is the article published immediately before the current one,
  "next" immediately after.

## Timezone rules

All frontmatter timestamps and comparisons are UTC (`Z` suffix); GitHub cron
runs in UTC; dates are compared as `Date` timestamps, never as formatted
strings. Only the UI formats dates (en-US) for display.
