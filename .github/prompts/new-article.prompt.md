---
mode: agent
description: Draft, link and schedule a new SunMetricLab blog article
---

Create a new article about the topic I give you. Follow `AGENTS.md`,
`docs/content-guide.md` and `docs/editorial-guidelines.md`:

1. Make sure the topic isn't already covered (`npm run link -- find "<phrase>"`,
   compare `primaryKeyword`s); if it is, propose updating that article.
2. Scaffold with `npm run post -- new --title "…" --category "…" --keyword "…" --tags "…" --calculators "…"`.
3. Write 1,600–3,200 words in 2–4 `##` sections of prose, with labeled
   assumptions and no fabricated facts; the 30% federal credit is ended for
   2026+ purchases.
4. Add 1–3 links to live related articles and 1–2 calculator links
   (`npm run link -- add …`), fill `relatedArticles`, replace every `TODO`.
5. Publish (`npm run post -- publish <slug>`) or schedule
   (`npm run post -- schedule <slug> --date next-slot|<ISO>`) as I asked;
   otherwise leave it as a draft.
6. Run `npm run build` and report file, URL, date and links. Don't push.
