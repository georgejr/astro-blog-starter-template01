# Task: Extend the existing SunMetricLab Astro application

Work inside the existing Astro repository.

Do not create a new Astro project.
Do not replace the existing design, layouts, routing, components, calculator pages, styles, configuration, or deployment setup.
First inspect the repository and adapt the implementation to the existing architecture.

The goal is to add:

1. Scheduled Markdown article publishing
2. Safe internal linking between published content only
3. 300 SEO-focused solar article Markdown files
4. Automatic daily Cloudflare deployment
5. Validation preventing invalid dates, broken links, and duplicate slugs
6. Natural, editorial article writing that does not sound formulaic or AI-generated

---

# 1. Inspect the existing repository first

Before changing anything, inspect:

- `package.json`
- `astro.config.*`
- `wrangler.toml`, `wrangler.json`, or `wrangler.jsonc`
- `.github/workflows`
- `src/content.config.ts`
- `src/content/config.ts`
- `src/content/`
- `src/pages/`
- `src/layouts/`
- `src/components/`
- existing blog routes
- existing sitemap and RSS integration
- existing calculators
- existing navigation and styles

Determine:

- the installed Astro version
- whether the project uses the Content Layer API or legacy content collections
- whether output is static, server, or hybrid
- whether deployment uses Cloudflare Workers or Cloudflare Pages
- the current Markdown frontmatter structure
- the current blog URL pattern
- the current calculator URLs
- the current component and styling conventions

Preserve the existing architecture wherever possible.

---

# 2. Scheduled publishing model

Add or extend the article content schema.

Use fields compatible with the current repository.

Required article fields:

```yaml
---
title: "Example title"
description: "SEO description"
slug: "example-title"
publishDate: 2026-08-01T06:00:00Z
updatedDate:
draft: false
category: "Solar Costs"
tags:
  - solar cost
  - payback
primaryKeyword: "solar panel payback period"
secondaryKeywords:
  - solar ROI
  - solar savings
relatedCalculators:
  - solar-savings-calculator
relatedArticles:
  - solar-panel-cost-guide
featured: false
author: "SunMetricLab Editorial Team"
---
```

Use a proper date coercion or date validation mechanism.

For example, with Zod:

```ts
publishDate: z.coerce.date(),
updatedDate: z.coerce.date().optional(),
```

Do not use a plain string when the code expects a Date.

The earlier project had an Astro build failure caused by:

```text
date: Invalid date
```

Prevent that class of error with strict schema validation and clear error messages.

---

# 3. Central published-content helper

Create one reusable source of truth for article visibility.

Suggested file:

```text
src/lib/content.ts
```

Implement helpers such as:

```ts
export function isPublished(
  entry: CollectionEntry<"blog">,
  now = new Date(),
): boolean {
  return entry.data.draft !== true &&
    entry.data.publishDate.getTime() <= now.getTime();
}
```

And:

```ts
export async function getPublishedPosts(now = new Date()) {
  const posts = await getCollection("blog");

  return posts
    .filter((post) => isPublished(post, now))
    .sort(
      (a, b) =>
        b.data.publishDate.getTime() -
        a.data.publishDate.getTime(),
    );
}
```

Use the repository's actual collection name if it is not `blog`.

All article lists and generated routes must use this central helper.

Do not duplicate date-filtering logic across many files.

---

# 4. Future articles must not generate public pages

This requirement is critical.

A future article must not:

- appear on the homepage
- appear on the blog index
- appear on category pages
- appear on tag pages
- appear in website search
- appear in related articles
- appear in previous/next navigation
- appear in RSS
- appear in sitemap
- appear in JSON-LD item lists
- receive links from published pages
- generate a public static article route

For static routes using `getStaticPaths()`, only create paths for published entries:

```ts
export async function getStaticPaths() {
  const posts = await getPublishedPosts();

  return posts.map((post) => ({
    params: {
      slug: post.data.slug || post.id,
    },
    props: {
      post,
    },
  }));
}
```

Do not generate a route and merely add `noindex`.

The future URL should not exist in the built site.

---

# 5. Draft rules

Rules:

```text
draft === true
```

Always hidden, regardless of date.

```text
draft !== true and publishDate <= build time
```

Published.

```text
draft !== true and publishDate > build time
```

Scheduled and hidden.

Use UTC dates in generated content.

---

# 6. Internal linking rules

The site must never link to an unpublished article.

Create a link-resolution layer based only on `getPublishedPosts()`.

Support two types of internal links.

## Explicit related articles

Markdown frontmatter may contain:

```yaml
relatedArticles:
  - solar-panel-cost-guide
  - how-many-solar-panels-do-i-need
```

At build time:

- resolve these against published articles
- omit missing slugs
- omit future articles
- omit drafts
- omit the current article
- prevent duplicates

Do not render broken links.

## Automatically selected related articles

When explicit related articles are insufficient, calculate relevance using:

1. same category
2. shared tags
3. shared `relatedCalculators`
4. primary and secondary keyword overlap
5. publication date proximity

Return 4–6 related published articles.

A simple deterministic scoring system is enough.

Example:

```text
same category: +5
each shared tag: +2
each shared calculator: +4
primary keyword overlap: +3
secondary keyword overlap: +1
```

Sort by score, then by publish date.

Do not call external AI services during builds.

---

# 7. Contextual links inside article bodies

Do not blindly replace arbitrary words in rendered HTML.

Use one of these safe approaches, in this order of preference:

1. Author internal links explicitly in Markdown
2. Generate Markdown with only valid published targets
3. Use a controlled remark plugin with a known link map

Since many articles will be scheduled, generated Markdown must only link to content published on or before that article's own `publishDate`.

For every article generated for date `D`:

- it may link to calculator pages that already exist
- it may link to articles with `publishDate <= D`
- it must not link to articles with `publishDate > D`
- if a relevant target is not available yet, write plain text without a link

This ensures that when an article first publishes, it contains no links to unavailable articles.

---

# 8. Backward link updates

Already published articles may gain related links to newer articles after later daily rebuilds.

This is allowed only in dynamically generated UI sections such as:

- Related articles
- More from this category
- Recommended reading

Do not automatically mutate old Markdown files on every build.

The related-content component should calculate links from the currently published set.

---

# 9. Calculator linking

Inspect the existing calculator routes and create a registry.

Suggested file:

```text
src/data/calculators.ts
```

Example structure:

```ts
export const calculators = [
  {
    id: "solar-savings-calculator",
    title: "Solar Savings Calculator",
    href: "/calculators/solar-savings-calculator/",
    keywords: ["solar savings", "electric bill", "payback"],
  },
];
```

Use the actual existing routes.

Rules:

- only render calculator links that exist in the registry
- never fabricate calculator URLs
- validate every `relatedCalculators` ID
- fail the build for an unknown calculator ID, or report it clearly during content generation
- link naturally from relevant articles

---

# 10. Category and tag pages

Adapt existing category and tag pages if present.

If absent, add them using the site's current routing conventions.

Category pages:

```text
/category/[slug]/
```

Tag pages:

```text
/tag/[slug]/
```

Only generate a category or tag route if it contains at least one published article.

Only list published articles.

Use canonical URLs and appropriate metadata.

---

# 11. Blog index and homepage

Update all blog/card/list components to receive published posts only.

Do not filter future articles only inside the UI component after routes or feeds have already been generated.

Filtering must happen at the data-source level.

Preserve the existing visual design.

---

# 12. Sitemap

Inspect the current sitemap integration.

If using `@astrojs/sitemap`, ensure future article routes are not generated in the first place.

If the project has a custom sitemap, feed it only published article URLs.

Include:

- public static pages
- existing calculator pages
- published articles
- published category pages
- published tag pages where appropriate

Exclude:

- drafts
- future articles
- preview routes
- error pages
- internal search result pages

---

# 13. RSS

Add or update the RSS endpoint using `@astrojs/rss`.

Use only published articles.

Example:

```ts
const posts = await getPublishedPosts();

return rss({
  title: "SunMetricLab",
  description: "Solar calculators, cost guides and savings analysis.",
  site: context.site,
  items: posts.map((post) => ({
    title: post.data.title,
    description: post.data.description,
    pubDate: post.data.publishDate,
    link: `/blog/${post.data.slug || post.id}/`,
  })),
});
```

Adapt paths and collection names to the existing repository.

---

# 14. Website search

Inspect whether the site uses:

- Pagefind
- Fuse.js
- custom search JSON
- another indexing mechanism

Only published articles may be included in the search index.

If using Pagefind with static output, future routes must not be generated, so they cannot be indexed.

If generating a JSON index, build it from `getPublishedPosts()`.

---

# 15. Previous and next navigation

Calculate previous and next using only published articles.

Do not reveal scheduled titles or URLs.

Choose one consistent ordering:

- chronological, or
- reverse chronological

Document the choice.

---

# 16. Article structured data

For each published article add valid JSON-LD:

- `Article` or `BlogPosting`
- `BreadcrumbList`

Use:

- headline
- description
- datePublished
- dateModified when available
- author
- canonical URL
- image when available
- publisher

Only add `FAQPage` schema when visible FAQs exist on that page.

Do not generate FAQ schema for hidden or nonexistent content.

---

# 17. Canonical and metadata

Every published article must include:

- title
- meta description
- canonical URL
- Open Graph title
- Open Graph description
- Open Graph URL
- social image when available
- robots index/follow

Future articles generate no page, so no metadata is required for them.

---

# 18. Natural editorial writing requirements

The generated articles must read like they were written and edited by a knowledgeable human.

The writing must be natural, specific, practical, and varied.

Avoid generic AI wording, repetitive transitions, rigid templates, predictable summaries, or obvious keyword stuffing.

Do not make every article follow the same structure.

Vary:

- paragraph length
- heading structure
- article openings
- sentence rhythm
- placement of examples
- use of tables
- use of lists
- conclusion style

Do not begin every article with phrases such as:

- "In today's world"
- "When it comes to"
- "Whether you're"
- "Solar energy is becoming increasingly popular"
- "In this comprehensive guide"
- "This article will explore"
- "Let's dive in"

Do not use filler transitions repeatedly, including:

- moreover
- furthermore
- additionally
- in conclusion
- it is important to note
- it is worth noting
- at the end of the day

Use them only when genuinely natural and necessary.

Avoid exaggerated claims such as:

- game-changing
- revolutionary
- ultimate solution
- unlock the power of
- transform your energy journey
- maximize your potential

Write in a direct editorial voice.

Prefer concrete explanations over abstract claims.

Use real units, realistic ranges, and clearly stated assumptions when calculations are discussed.

Do not fabricate statistics, sources, quotations, customer stories, case studies, or expert opinions.

Do not pretend the site has tested equipment unless the repository or provided source material proves it.

Do not imply first-hand experience that did not occur.

Use second person sparingly and naturally.

Avoid sounding like a sales page.

Do not overuse rhetorical questions.

Do not force a conclusion section into every article.

Some articles may end with a practical final paragraph, while others may end with a comparison, caveat, calculation, or brief recommendation.

---

# 19. Forbidden article patterns

When writing any article, guide, comparison, calculator explanation, or solar content, never use the following formats.

## Forbidden patterns

- `Good for: [list of people]` sections
- `Best for: [audience]` blocks
- `Perfect for: [audience]` blocks
- `Who it is for:` template sections
- `Example use case:` blocks with hypothetical scenarios
- `Action step:` callouts
- `Next step:` callouts
- `Pro tip:` boxes used as a repeated template
- sentences starting with `Good for couples/groups/families...`
- hypothetical `You do X, then Y` narrative examples
- bullet-pointed audience targeting
- generic persona lists such as `homeowners, families, retirees, and businesses`
- repeated `Pros and cons` sections when a more natural comparison would read better
- repeated `Key takeaway` boxes at the end of every section
- fake quotations
- invented homeowner stories
- invented installation scenarios presented as if real

Instead:

- weave recommendations naturally into the prose
- describe suitability within a normal paragraph
- explain tradeoffs directly
- use a sentence rather than a labeled audience block
- use specific technical or financial context
- avoid any structure that looks copied from a content template

Example of what not to write:

```text
Good for: homeowners, families, and retirees.

Example use case: You install a 6 kW system, reduce your bill, and recover the cost in eight years.

Action step: Request three installer quotes today.
```

Example of the preferred style:

```text
A 6 kW system can make sense for a household with steady daytime consumption and enough unshaded roof area, but the economics depend heavily on the local electricity rate and export compensation. In a market with low net-metering credits, shifting more consumption into daylight hours may matter almost as much as the panel price.
```

Another example of what not to write:

```text
Perfect for: families who want lower bills and energy independence.
```

Preferred version:

```text
Households with high summer cooling demand often see the strongest overlap between solar production and electricity use, especially where air conditioning runs through the afternoon.
```

The writing should not look like a template or checklist unless the subject genuinely requires a checklist.

---

# 20. Headings and structure

Headings should help the reader navigate the topic, not merely repeat keywords.

Avoid repetitive heading patterns such as:

- What Is X?
- Why Is X Important?
- Benefits of X
- How to Choose X
- Final Thoughts

Use headings that reflect the actual question being answered.

Good heading examples:

- Why roof orientation matters less than many homeowners expect
- How export rates change the payback calculation
- Where battery sizing estimates usually go wrong
- The cost difference between a panel upgrade and a full system redesign
- What a quote should reveal about inverter clipping

Do not put the primary keyword into every heading.

Do not use more headings than needed.

Do not create one-sentence sections.

---

# 21. Lists and tables

Use bullet lists only when a list is genuinely the clearest format.

Do not turn ordinary prose into excessive bullet points.

Use tables for:

- numerical comparisons
- equipment specifications
- cost ranges
- scenario assumptions
- state-by-state differences
- system-size comparisons

Do not use tables merely to make the article look structured.

Every table must be understandable on mobile and introduced with a sentence explaining what it shows.

---

# 22. SEO without keyword stuffing

Each article must target one primary keyword and a small set of closely related secondary terms.

Use the primary keyword naturally in:

- the title when appropriate
- the introduction when natural
- at least one heading when useful
- the meta description
- the body

Do not repeat exact-match phrases unnaturally.

Use synonyms and normal language.

Do not create multiple articles with the same search intent simply by changing word order.

Do not write thin content around a keyword that does not justify its own page.

---

# 23. Source and factual accuracy

For claims involving:

- federal incentives
- state incentives
- utility programs
- tax credits
- equipment warranties
- electricity prices
- code requirements
- financing rules
- interconnection rules

use authoritative and current sources.

Prefer:

- government agencies
- utility providers
- official manufacturer documentation
- standards bodies
- primary research
- recognized industry institutions

Do not cite low-quality affiliate pages when a primary source exists.

If current web research is unavailable during generation:

- do not invent current values
- use clearly labeled placeholders only in the content plan, not in final published articles
- or write the section in a time-stable way without making an unsupported current claim

Do not claim that a tax credit, rebate, or utility program is currently available without verification.

Where appropriate, include a brief source list or inline references using the existing site's editorial style.

Do not overload articles with citations for common knowledge.

---

# 24. Generate exactly 300 article Markdown files

Create exactly 300 unique English-language articles for the US market.

Store them in the existing article content directory.

Do not overwrite existing real articles.

If a generated slug collides with an existing slug, create a different title and slug.

Article clusters:

1. Solar panel costs — 30
2. Solar savings and ROI — 30
3. Solar payback period — 20
4. Solar panel sizing — 25
5. Electricity usage and bills — 20
6. Roof suitability and shading — 20
7. Solar batteries and storage — 30
8. Inverters and system components — 20
9. Installation and contractor selection — 20
10. Maintenance, cleaning and lifespan — 20
11. Federal tax credits and incentives — 15
12. State-focused solar guides — 25
13. Off-grid, RV and tiny-home solar — 15
14. Solar myths, comparisons and FAQs — 10

Total: 300.

Each article must have:

- a unique search intent
- a unique primary keyword
- no substantially duplicated title
- no city-page spam
- no fabricated statistics
- no fake case studies
- no fake quotes
- no unsupported claims
- no claims of real-time electricity prices unless a reliable data source is integrated
- natural English
- useful, non-filler content
- practical examples with clearly labeled assumptions
- an FAQ section only where useful
- calculator links where relevant
- internal links only to eligible content

Target length:

- normally 1,200–2,000 words
- major pillar guides may be 2,000–3,000 words
- narrow questions may be 900–1,300 words

Do not pad articles to reach word counts.

Quality is more important than uniform length.

---

# 25. Publication schedule

Schedule the 300 new articles over time.

Use this default schedule:

- first article: the next UTC day after generation
- 2 articles per day
- publication times:
  - 08:00 UTC
  - 16:00 UTC

This publishes all 300 articles over 150 days.

Generate valid ISO timestamps:

```yaml
publishDate: 2026-07-11T08:00:00Z
```

Calculate the actual schedule from the current date when executing the task.

Do not hard-code the example date.

Within each topic cluster:

- publish a pillar article before supporting articles
- publish foundational articles before advanced articles
- publish related content close enough to support internal linking
- avoid publishing near-duplicate intents on the same day
- avoid publishing all state pages consecutively
- alternate broader guides with narrower questions where it improves topical coverage

---

# 26. Historical internal-link eligibility during generation

Before writing the articles, build a publication manifest.

Suggested output:

```text
content-plan.json
```

Each record:

```json
{
  "title": "How Much Do Solar Panels Cost?",
  "slug": "how-much-do-solar-panels-cost",
  "publishDate": "2026-07-11T08:00:00Z",
  "category": "Solar Costs",
  "primaryKeyword": "how much do solar panels cost",
  "relatedCalculators": ["solar-cost-calculator"]
}
```

Then generate articles in publication order.

For article N:

- valid article-link targets are existing articles plus generated articles 1 through N-1
- generated articles N+1 onward are not valid contextual-link targets
- calculators must exist in the calculator registry
- every Markdown link must be checked

The generated `relatedArticles` frontmatter may contain only earlier or same-time published entries.

The runtime related-content UI may later recommend newer published content after rebuilds.

---

# 27. Content-title planning

Before generating full articles, create:

```text
docs/content-plan.md
```

Include a Markdown table with exactly 300 rows:

| # | Cluster | Title | Slug | Primary keyword | Search intent | Publish date | Related calculator |
|---|---|---|---|---|---|---|---|

Ensure:

- exactly 300 rows
- no duplicate slugs
- no duplicate primary keywords
- no obviously overlapping intent
- all dates valid
- all calculator IDs valid
- titles sound natural rather than machine-generated
- titles are not all written in the same format
- not every title starts with `How to`, `What Is`, or a number
- avoid clickbait
- avoid awkward exact-match keyword phrasing
- state guides have a clear reason to exist beyond swapping the state name

Then generate the article files based on this plan.

---

# 28. Article generation process

Do not attempt to generate all 300 long articles in one uncontrolled pass.

Use resumable batches of 10–20 articles.

Recommended process:

1. inspect the repository
2. implement and test the publishing system
3. generate the 300-row content plan
4. validate the plan
5. generate articles in publication order
6. process 10–20 articles per batch
7. validate each batch
8. run the content validator
9. commit completed batches
10. continue from the next ungenerated manifest item

Maintain a progress file:

```text
docs/content-generation-progress.json
```

Example:

```json
{
  "total": 300,
  "completed": 40,
  "lastCompletedSlug": "solar-battery-sizing-mistakes",
  "updatedAt": "2026-07-10T20:00:00Z"
}
```

Do not regenerate completed files unless specifically fixing them.

Do not overwrite manually edited content.

---

# 29. Link validation

Create a validation script.

Suggested command:

```json
{
  "scripts": {
    "validate:content": "tsx scripts/validate-content.ts"
  }
}
```

Use the repository's existing TypeScript execution setup when available.

Validate:

- required frontmatter
- valid publish date
- unique slug
- unique canonical URL
- valid category
- valid calculator IDs
- explicit related article slugs
- Markdown internal links
- no links to future articles as of the source article's publish date
- no links to draft articles
- no links to nonexistent internal paths
- no empty title or description
- exactly 300 planned generated articles
- no duplicate primary keywords
- no duplicate search intent where detectable
- no forbidden labeled content blocks such as `Good for:`, `Example use case:`, `Action step:`, or `Next step:`

For article-to-article links, validate using the source article's publication timestamp, not the current date.

The command must exit nonzero on errors.

Add it before the build:

```json
{
  "scripts": {
    "build": "npm run validate:content && astro build"
  }
}
```

Preserve any existing build commands and incorporate validation safely.

---

# 30. Style linting

Add a lightweight content-style validation step.

The style check should flag, but not blindly rewrite:

- forbidden labels
- repeated generic introductions
- excessive use of `In conclusion`
- repeated `Whether you're`
- repeated `It is important to note`
- repeated `Furthermore` or `Moreover`
- three or more consecutive articles with nearly identical heading structures
- excessive exact-match keyword repetition
- multiple identical conclusion headings
- suspiciously repeated paragraph openings across articles

Suggested command:

```json
{
  "scripts": {
    "lint:content-style": "tsx scripts/lint-content-style.ts"
  }
}
```

This lint may emit warnings for subjective issues, but forbidden patterns must be build errors.

Do not create an automated rewriting system that damages good prose.

---

# 31. Broken-link checking

Add a post-build internal link check if the existing toolchain allows it.

Check generated HTML links against built output.

Do not treat external links as build failures unless the project already has an external link checker.

At minimum, all internal URLs must resolve to generated output or recognized application routes.

---

# 32. Daily scheduled deployment

The current application appears to be deployed through Cloudflare Workers with Git integration.

Inspect the existing deployment method before changing anything.

Prefer the simplest compatible solution.

## Preferred option: scheduled GitHub commit

Because Cloudflare Git deployment normally runs only after a commit, add a GitHub Action that creates one small scheduled marker update.

Create:

```text
.github/workflows/scheduled-publish.yml
```

Run shortly after each publication time:

```yaml
on:
  schedule:
    - cron: "5 8 * * *"
    - cron: "5 16 * * *"
  workflow_dispatch:
```

The workflow should:

1. check out the repository
2. update a harmless file such as:

```text
.scheduled-build
```

with the current UTC timestamp
3. commit and push only when the value changes
4. allow the existing Cloudflare Git integration to build and deploy

Use:

```yaml
permissions:
  contents: write
```

Prevent workflow loops by ensuring normal pushes do not run this workflow unless explicitly configured.

## Alternative option

If the repository already deploys directly with Wrangler from GitHub Actions, preserve that model and run:

```text
npm ci
npm run validate:content
npm run lint:content-style
npm run build
npm run deploy
```

Use existing Cloudflare secrets and configuration.

Do not invent secret names when the repository already defines them.

Document the selected approach.

---

# 33. Timing limitation

Astro scheduled publishing is build-based.

A future article becomes publicly available only after a successful build occurring after its `publishDate`.

Document this clearly in:

```text
docs/scheduled-publishing.md
```

The document should explain:

- content is filtered using build time
- twice-daily builds reveal eligible content
- publication can be delayed until the next successful scheduled deployment
- future pages do not exist before that deployment
- manually running a deployment publishes any currently eligible articles

---

# 34. Timezone rules

Use UTC consistently.

- frontmatter timestamps use `Z`
- GitHub cron uses UTC
- comparisons use JavaScript Date timestamps
- UI dates may be formatted for the target audience
- do not compare dates as locale-formatted strings

---

# 35. Build-time consistency

Capture the build time once and reuse it.

Do not call `new Date()` independently in many components where millisecond differences could produce inconsistent results.

Suggested:

```ts
export const BUILD_TIME = new Date();
```

Or pass a single `now` value through content helpers.

All generated routes, lists, sitemap, RSS and related-content calculations within one build should use a consistent cutoff.

---

# 36. Tests

Add tests for at least:

1. draft article is hidden
2. future article is hidden
3. past article is published
4. article published exactly at cutoff is included
5. invalid date fails validation
6. duplicate slug fails validation
7. future explicit related article is omitted or rejected
8. nonexistent calculator ID fails validation
9. related-content scoring returns only published entries
10. generated article route does not exist for future content
11. a forbidden `Good for:` block fails style validation
12. a forbidden `Example use case:` block fails style validation
13. a source article cannot link to an article published later
14. a scheduled article is absent from sitemap and RSS
15. the article plan contains exactly 300 rows

Use the existing testing framework if present.

If no test framework exists, use a lightweight compatible option without unnecessarily restructuring the project.

---

# 37. Preserve current functionality

Do not break:

- existing calculators
- existing routes
- current Cloudflare deployment
- current styling
- responsive behavior
- analytics integration
- existing SEO metadata
- existing blog content

Run:

```text
npm install
npm run validate:content
npm run lint:content-style
npm run build
```

Also run existing tests and linting.

Fix all errors introduced by the task.

---

# 38. Deliverables

At completion provide:

1. list of changed files
2. explanation of the publishing logic
3. exact daily deployment mechanism
4. publication date range for the 300 articles
5. number of articles per category
6. validation commands
7. content-style validation command
8. build command
9. deploy command
10. any required GitHub or Cloudflare configuration
11. confirmation that future article routes are absent from built output
12. confirmation that no published page links to future or nonexistent articles
13. confirmation that calculator links reference real existing routes
14. confirmation that forbidden template-like content patterns were checked
15. content generation progress
16. any assumptions made because of the existing repository structure

Do not merely provide snippets.

Implement the complete solution in the existing repository.