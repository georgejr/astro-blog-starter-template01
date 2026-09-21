---
description: Draft, link and schedule a new blog article
argument-hint: <topic or working title> [category] [publish now | next slot | date]
---

Create a new SunMetricLab article about: $ARGUMENTS

Follow AGENTS.md, docs/content-guide.md and docs/editorial-guidelines.md.

1. Check the topic isn't already covered: search `src/content/blog/` for the
   main phrase (`npm run link -- find "<phrase>"`) and compare
   `primaryKeyword`s. If an existing article covers it, stop and propose
   updating that one instead.
2. Pick the category (one of `src/lib/taxonomy.ts`), a unique primary
   keyword, 2–4 tags and 1–2 relevant calculator ids.
3. Scaffold: `npm run post -- new --title "…" --category "…" --keyword "…" --tags "…" --calculators "…"`.
4. Write the body: 1,600–3,200 words, 2–4 `##` sections of real prose,
   concrete worked examples with labeled assumptions, no fabricated facts,
   no banned phrases. Treat the 30% federal credit as ended for 2026+
   purchases. Add a `## Frequently asked questions` section only if the
   topic has genuine recurring questions.
5. Links: 1–3 contextual links to *live* related articles
   (`npm run post -- status`, `npm run link -- add …`), 1–2 calculator links,
   0–3 `relatedArticles`.
6. Replace every `TODO`, write the 140–160 char description.
7. Publish per the request: `npm run post -- publish <slug>` (now),
   `npm run post -- schedule <slug> --date next-slot` (end of the weekly
   queue) or `--date <ISO>`. If no timing was given, leave it as a draft and
   say so.
8. Run `npx tsx scripts/validate-content.ts`, then `npm run build`.
9. After it's live (or if publishing now), offer to add backlinks from older
   articles with `npm run link -- find "<phrase>" --to <slug>`.

Report the file path, URL, publish date and links added. Don't push or deploy.
