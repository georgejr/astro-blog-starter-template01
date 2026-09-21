# Content guide — adding and editing articles by hand

Everything on the blog is a Markdown file. There is no admin panel: you
create or edit a file, commit, push, and the site rebuilds. This guide
covers doing it by hand, with the helper CLI, and with an AI coding CLI.

Related: [linking.md](linking.md) (links), [banners.md](banners.md)
(banners/ads), [editorial-guidelines.md](editorial-guidelines.md) (style
rules the build enforces), [scheduled-publishing.md](scheduled-publishing.md)
(how dates work).

## 1. Where articles live

- One article = one file in `src/content/blog/`, e.g.
  `src/content/blog/net-metering-explained.md`.
- The filename without `.md` is the **slug** and the URL:
  `/blog/net-metering-explained/`. Use lowercase words joined by hyphens.
  Don't rename a live article's file without adding a redirect (section 8).
- The file has two parts: YAML **frontmatter** between `---` lines, then the
  Markdown **body**.

## 2. Create an article

### Option A — the CLI (recommended)

```bash
npm run post -- new --title "How Hail Affects Solar Panels" --category "Maintenance & Lifespan" \
  --tags "hail,roof damage" --calculators solar-roi-calculator
```

This writes `src/content/blog/how-hail-affects-solar-panels.md` with valid
frontmatter, `draft: true`, and `TODO` placeholders. The build refuses to
publish an article that still contains `TODO`, so a half-written scaffold
can never go live by accident.

Options: `--slug`, `--description`, `--keyword` (primaryKeyword; defaults
to the lowercased title), `--tags`, `--calculators`, `--date now|next-slot|<ISO>`
and `--publish` (create with `draft: false`).

> **Windows PowerShell 5.1** drops the `--` that npm needs. Either use
> PowerShell 7 / Git Bash, or call the script directly:
> `npx tsx scripts/post.ts new --title "..." --category "..."`.
> The same applies to `npm run link` and `npm run banner`.

### Option B — by hand

Copy an existing article or paste this template into a new file:

```markdown
---
title: "How Hail Affects Solar Panels"
description: "Can hail break solar panels? What panel ratings mean, what insurance covers, and how to check your array after a storm."
publishDate: 2026-10-06T08:00:00Z
draft: false
category: "Maintenance & Lifespan"
tags:
  - hail
  - roof damage
primaryKeyword: "hail damage solar panels"
secondaryKeywords:
  - are solar panels hail proof
relatedCalculators:
  - solar-roi-calculator
relatedArticles:
  - homeowners-insurance-solar-panels
---

Opening paragraph that answers the question directly...

## A heading phrased as a real question

Body text...
```

## 3. Frontmatter reference

| Field | Required | Rules |
| --- | --- | --- |
| `title` | yes | Page title and `<h1>`. Natural, not keyword-stuffed. |
| `description` | yes | Meta description and card text, ~140–160 characters. |
| `publishDate` | yes | UTC ISO timestamp with `Z`, e.g. `2026-10-06T08:00:00Z`. Controls when the article appears (section 6). |
| `draft` | no (default `false`) | `true` hides the article regardless of date. |
| `updatedDate` | no | Set when you materially revise an article; shown as "Updated …" and used as `dateModified` in structured data. |
| `category` | yes | Exactly one of the categories below (spelling and `&` must match). |
| `tags` | no | 2–4 short lowercase tags. Each tag gets a `/tag/<tag>/` page. |
| `primaryKeyword` | yes | The main search phrase. Must be unique across all articles (validated). |
| `secondaryKeywords` | no | Related phrases; used for keywords metadata and related-article scoring. |
| `relatedCalculators` | no | Calculator ids (list below). The first two appear as a call-to-action box under the article. |
| `relatedArticles` | no | 0–3 article slugs shown first under "Related reading". See [linking.md](linking.md). |
| `ogStat` | no | `{ value: "$2.75/W", label: "average installed price" }` — puts a headline figure on the generated share image. |
| `author` | no | Author id from `src/data/authors.ts`. Default and only entry: `editorial-team`. |
| `slug` | no | Overrides the filename as URL slug. Rarely needed — prefer renaming the file. |
| `featured` | no | Accepted but not used by any template yet. |

**Categories** (`src/lib/taxonomy.ts`): Solar Costs · Savings & ROI ·
Payback · System Sizing · Electricity Usage · Roof & Shading · Batteries &
Storage · Inverters & Components · Installation · Maintenance & Lifespan ·
Incentives & Tax Credits · State Guides · Off-Grid & Mobile · Myths &
Comparisons. To add a category, add it to that list — it becomes valid
everywhere and gets a `/category/<slug>/` page once it has an article.

**Calculator ids** (`src/data/calculators.ts`, URL = `/<id>/`):
`solar-panel-calculator`, `solar-panel-cost-calculator`,
`solar-roi-calculator`, `solar-battery-calculator`,
`how-many-solar-panels-do-i-need`, `solar-panel-size-calculator`,
`solar-loan-calculator`, `solar-payback-calculator`,
`ev-charging-calculator`, `heat-pump-calculator`,
`electricity-bill-calculator`, `federal-tax-credit-calculator`,
`solar-payment-comparison`.

## 4. Writing the body

Standard Markdown works. The template already renders the title as `<h1>`,
so start sections at `##` (and `###` below that).

| You write | You get |
| --- | --- |
| `## Heading` / `### Subheading` | section headings |
| `**bold**`, `*italic*` | emphasis |
| `- item` / `1. item` | lists |
| `\| a \| b \|` tables | styled tables (keep them narrow for mobile) |
| `> quote` | styled blockquote |
| `[text](/blog/other-article/)` | internal link — see [linking.md](linking.md) |
| `[text](https://example.com/)` | external link, opens in a new tab with `rel="noopener"` |
| `![alt text](/images/blog/file.webp)` | image from `public/images/blog/` |
| raw HTML (`<div>`, `<a>`, `<iframe>`) | output exactly as written |

**FAQ rich results:** a section titled exactly `## Frequently asked
questions`, with each question as a `###` heading followed by a one-paragraph
answer, is turned into FAQPage structured data automatically:

```markdown
## Frequently asked questions

### Can hail break solar panels?

Most panels are tested against 25 mm (1 inch) hail at about 50 mph...
```

**Header image:** articles don't take a hero image. Each article gets a
generated 1200×630 card at `/og/<slug>.png` (title + category, or the
`ogStat` figure), used both at the top of the article and as the social
share image.

**Images inside the body:** put files in `public/images/blog/` (create the
folder), use WebP or JPEG around 1200 px wide and under ~200 KB, and always
write meaningful alt text. Image paths are not checked by the build — open
the page in `npm run dev` to confirm they load.

## 5. Check your work locally

```bash
npm install          # once
npm run dev          # http://localhost:4321 — live preview while you edit
npm run build        # full validation + production build (what Cloudflare runs)
npm run post -- status
```

`npm run dev` shows only articles that are published *as of now* (same
rule as production). To preview a scheduled or draft article locally,
temporarily set its `publishDate` to a past time and `draft: false`, look
at it, then put the values back before committing.

If `npm run build` fails, the message names the file and the problem
(unknown category, duplicate keyword, link to an unpublished article, a
banned phrase, a `TODO` left in a published article, …). Fix and rerun.

## 6. Publishing and scheduling

An article is live when `draft` is not `true` **and** `publishDate` is in
the past **at the time the site was built**. Nothing happens at the exact
publish minute by itself — a build has to run afterwards:

- every push to `main` triggers a Cloudflare build and deploy;
- the GitHub Action `scheduled-publish` pushes a trigger commit every
  **Tuesday 08:05 UTC**, which is how the weekly queue goes out;
- you can run the action manually (GitHub → Actions → scheduled-publish →
  Run workflow) or deploy locally with `npm run build && npm run deploy`.

Common tasks:

| Goal | How |
| --- | --- |
| Publish a finished article now | `npm run post -- publish <slug>` (sets `draft: false`, and `publishDate` to now if it was in the future), then commit + push |
| Schedule for a date | `npm run post -- schedule <slug> --date 2026-11-03T08:00:00Z` |
| Put at the end of the weekly queue | `npm run post -- schedule <slug> --date next-slot` (Tuesday 08:00 UTC after the last queued article) |
| Take an article offline | `npm run post -- unpublish <slug>` (sets `draft: true`) — see section 8 for redirects |
| See what's live / queued / draft | `npm run post -- status` |
| Re-space the whole queue weekly | `node scripts/reschedule-weekly.mjs` (dry run), then `--write` |

The repository currently holds **510 articles: ~130 live and ~380
scheduled**, one per week until early 2034. See
[scheduled-publishing.md](scheduled-publishing.md) for the rationale and
the timing caveats.

## 7. Updating an article

Edit the body, then add or bump `updatedDate: 2026-10-20T00:00:00Z`. Keep the
slug and `publishDate` unchanged. If you fix facts that apply to many
articles (for example the ended federal tax credit — see
[handover.md](handover.md#content-caveats)), search the folder:
`grep -ril "30% federal" src/content/blog`.

## 8. Renaming or removing an article

1. Find who links to it: `npm run link -- backlinks <slug>`.
2. Remove or retarget those links (the build fails on links to a missing
   or draft article, so you can't forget).
3. For a live URL, add a permanent redirect to `public/_redirects`:

   ```
   /blog/old-slug/ /blog/new-slug/ 301
   ```

   Relative paths only (Cloudflare static-assets rule).
4. Rename the file (or set `draft: true` / delete it), build, push.

## 9. Other editable content

| What | Where |
| --- | --- |
| Header navigation, footer calculator list, tagline, disclaimer | `src/lib/site.ts` |
| Byline / author bio (impersonal "Editorial Team") | `src/data/authors.ts` |
| About, Methodology, Privacy, Terms, Contact pages | `src/pages/*.astro` (HTML-like templates) |
| Homepage copy, FAQ and example numbers | `src/pages/index.astro` |
| Calculator page copy and FAQs | `src/pages/<calculator-id>.astro` |
| State page notes (net metering, incentives, utilities) | `src/data/state-notes/batch-*.ts` |
| Modeled state/city inputs (sun hours, rates, prices) | `src/data/state-solar.ts`, `src/data/city-solar.ts` — bump `DATA_LAST_UPDATED` in `site.ts` when you change them |
| Banners and ads | `src/data/banners.json` — [banners.md](banners.md) |
| Redirects | `public/_redirects` |

## 10. Doing it with an AI coding CLI

The repo ships instructions for Claude Code (`CLAUDE.md` + slash commands
in `.claude/commands/`), OpenAI Codex (`AGENTS.md`) and GitHub Copilot
(`.github/copilot-instructions.md` + prompt files in `.github/prompts/`).
Example requests:

- "Write a new article about hail damage to solar panels in the Maintenance
  & Lifespan category, link it to two relevant live articles and the ROI
  calculator, and schedule it for the next free weekly slot."
- "Find live articles that mention *net billing* without a link and link
  the phrase to `/blog/net-billing-vs-net-metering/` in up to 5 of them."
- "Add this 728×90 banner (`~/Downloads/quotes.webp`) linking to
  `https://partner.example/?ref=abc` under every article in the Solar Costs
  category until the end of November."

Claude Code users can also type `/new-article`, `/link-article`,
`/add-banner` or `/content-status`.
