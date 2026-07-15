# Editorial guidelines for SunMetricLab articles

These rules are enforced by `npm run validate:content` (hard errors) and
`npm run lint:content-style` (errors + warnings). Generated and hand-written
articles alike must follow them.

## Frontmatter contract

```yaml
---
title: "Natural, editorial title"
description: "Meta description, ~140–160 chars, contains the primary keyword naturally."
publishDate: 2026-08-01T08:00:00Z   # UTC, from content-plan.json — never invent
category: "Solar Costs"             # exactly one of src/lib/taxonomy.ts CATEGORIES
tags:
  - short tag                       # 2–4 lowercase topical tags
primaryKeyword: "exact plan keyword"
secondaryKeywords:
  - from the plan
relatedCalculators:
  - solar-panel-cost-calculator     # ids from src/data/calculators.ts only
relatedArticles:
  - earlier-article-slug            # 0–3 slugs; publishDate must be <= this article's
---
```

The filename (minus `.md`) is the slug and the URL: `/blog/<slug>/`.

## Linking rules

- Body links may target ONLY:
  - calculator pages listed in `src/data/calculators.ts` (use exact hrefs),
  - `/blog/<slug>/` where the target's `publishDate` is **on or before** this
    article's own `publishDate` (never later — validated),
  - the static pages `/`, `/blog/`, `/about/`, `/contact/`.
- 1–3 contextual article links and 1–2 calculator links per article, placed
  where they genuinely help; if no eligible target fits, write plain text.
- Never link to a category, tag, or external page from article bodies.

## Voice and structure

- Direct editorial voice; concrete over abstract; US homeowner audience. Write
  like a knowledgeable person explaining it to a neighbor, not like an SEO
  template. Natural rhythm, real sentences, no filler.
- **Length: 1,600–3,200 words per article.** Depth over breadth — fully
  develop each idea rather than listing many shallow ones.
- **Long, substantial sections.** Each `##` section should run at least ~800
  words of flowing prose. That means **few headings** — typically 2–4 `##`
  sections in an article, not 6–8. Only add a heading where the topic genuinely
  turns to a new question; never chop the piece into many short blocks.
- Headings answer real questions ("How export rates change the payback math"),
  never boilerplate ("What Is X?", "Benefits of X", "Final Thoughts"). Don't
  put the primary keyword in every heading. No one-sentence sections, and no
  heading that only introduces two or three sentences.
- Vary openings and endings between articles. Not every article gets a
  conclusion section; ending on a comparison, caveat, or worked number is often
  better.
- Prefer prose to lists. Bullet lists only when a list is genuinely the
  clearest format, and never as a way to avoid writing paragraphs. Tables only
  for numbers/specs/scenarios, introduced by a sentence, mobile-friendly width.
- Worked examples must label their assumptions ("Assume $0.17/kWh and a
  4.5 sun-hour average…"). Round numbers honestly.
- FAQ section only when the topic genuinely has recurring short questions.
- Avoid the tell-tale AI cadence: no "It's important to note", no "In this
  section we'll", no mechanical "First… Second… Finally" scaffolding, no
  restating the heading as the first sentence, no summarizing what you just
  said at the end of every section.

## Hard bans (build errors)

- Labeled template blocks: `Good for:`, `Best for:`, `Perfect for:`,
  `Who it's for:`, `Example use case:`, `Action step:`, `Next step:`,
  `Pro tip:`, `Key takeaway:`.
- Hype: game-changing, revolutionary, ultimate solution, unlock the power,
  transform your energy journey, maximize your potential.
- Openings: "In today's world", "When it comes to", "Whether you're",
  "Solar energy is becoming increasingly popular", "In this comprehensive
  guide", "This article will explore", "Let's dive in".

## Honesty rules

- No fabricated statistics, quotes, case studies, customer stories, or
  claims of first-hand testing.
- No specific "current" prices, rates, or program values presented as live
  facts. Use clearly labeled assumption ranges ("installed residential prices
  have generally landed between $2.50 and $4.00 per watt before incentives;
  treat quotes outside that band as a prompt to ask questions") and
  time-stable phrasing for policy topics (structures, not dollar amounts).
- The federal Residential Clean Energy Credit may be described as 30% with a
  pointer to IRS guidance; avoid asserting other programs are currently open.
- Filler transitions (moreover, furthermore, additionally, in conclusion,
  it is important to note…) at most rarely, when genuinely natural.
