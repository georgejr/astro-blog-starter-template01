---
description: Add inbound and outbound links for an article (internal or external)
argument-hint: <article-slug> [phrases, target URL, "sponsored"]
---

Improve the links for: $ARGUMENTS

Follow AGENTS.md and docs/linking.md.

1. Inspect the article: `npm run link -- list <slug>` and
   `npm run link -- backlinks <slug>`.
2. Outbound: if it has fewer than 2 contextual article links or no
   calculator link, add some with
   `npm run link -- add <slug> <target> --anchor "<phrase in the text>"`.
   Targets must be live now or publish no later than this article.
   For an external URL use the full `https://` form; add `--sponsored` for
   affiliate/paid links (or add the domain to `src/data/external-links.json`).
3. Inbound: find articles that mention the topic without linking:
   `npm run link -- find "<phrase>" --to <slug>`. Choose natural anchors,
   then `--apply --limit <n>` (default to at most 5 unless asked otherwise).
4. Review `git diff src/content/blog` — every inserted link must read
   naturally in its sentence; revert any that don't.
5. `npx tsx scripts/validate-content.ts`, then `npm run build`.

Report the links added (file, anchor, target). Don't push or deploy.
