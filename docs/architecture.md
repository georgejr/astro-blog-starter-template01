# Architecture

SunMetricLab (sunmetriclab.com) is a **fully static** Astro site: solar
calculators, modeled state/city cost pages and a Markdown blog. There is no
server, database or CMS — every page is HTML generated at build time and
served as static assets by Cloudflare Workers.

## Stack

| Part | Technology |
| --- | --- |
| Site generator | Astro 5 (`output: 'static'`, `trailingSlash: 'always'`) |
| Styling | Tailwind CSS 4 (via `@tailwindcss/vite`), theme tokens in `src/styles/global.css` |
| Content | Astro content collection `blog` (Markdown in `src/content/blog/`) |
| Share images | satori + resvg, generated at build time (`src/lib/og-image.ts`) |
| Hosting | Cloudflare Workers static assets (`wrangler.json` → `./dist`) |
| CI / schedule | Cloudflare Workers Builds (Git integration) + one GitHub Action |
| Tests | Vitest (`tests/`) |
| Scripts | Node 20+/22, `tsx` for TypeScript scripts |

## Directory map

```
.github/workflows/scheduled-publish.yml  weekly rebuild trigger (see scheduled-publishing.md)
docs/                                    all documentation
public/                                  copied verbatim to the site root
  _redirects                             301 redirects (Cloudflare syntax, relative paths only)
  ads.txt                                ad-network seller list (owner-specific)
  robots.txt                             crawler rules + sitemap URL
  <key>.txt                              IndexNow key file
  embed.js                               iframe auto-resize loader for embeddable calculators
  sw.js                                  self-destroying service worker (cleanup of an old ad worker)
  banners/                               banner images (created by `npm run banner -- add`)
scripts/
  post.ts  link.ts  banner.ts            content CLIs (npm run post / link / banner)
  validate-content.ts                    pre-build validation (articles + banners)
  lint-content-style.ts                  pre-build style lint (errors + warnings)
  check-links.mjs                        post-build internal link check over dist/
  reschedule-weekly.mjs                  re-stamp the unpublished queue onto a weekly cadence
  submit-indexnow.mjs                    postdeploy IndexNow ping
  lib/                                   shared, unit-tested helpers for the above
src/
  content/blog/*.md                      articles — one file per article, filename = slug
  content.config.ts                      article frontmatter schema (zod)
  data/
    banners.json                         banner/ad slots (docs/banners.md)
    external-links.json                  outbound-link rel rules (docs/linking.md)
    authors.ts                           byline registry (impersonal editorial team)
    calculators.ts                       registry of calculator pages (ids + hrefs)
    calculator-related.ts                per-calculator related tools + CTA copy
    embed-config.ts                      which tool each /embed/<id>/ renders
    state-solar.ts / city-solar.ts       modeled inputs for the cost-by-state/city pages
    state-notes/                         hand-written per-state editorial notes
  lib/
    site.ts                              site name/URL, nav, owner-specific account IDs
    taxonomy.ts                          the 14 article categories + slug helper
    publishing.ts                        pure scheduled-publishing logic (BUILD_TIME cutoff)
    content.ts                           the ONLY way pages read articles (published-only)
    banners.ts                           banner selection + validation
    rehype-external-links.mjs            Markdown plugin: rel/target on outbound links
    schema.ts                            JSON-LD builders (Article, FAQ, Breadcrumb, Org, ...)
    og-image.ts / og-pages.ts            share-image rendering and the static-page card list
    solar/                               calculator math (calculateSolar.ts) + formatters
  components/                            Astro components (calculators/, BannerSlot, cards, ...)
  layouts/BaseLayout.astro               <head> (SEO, OG, JSON-LD, analytics), header, footer
  layouts/EmbedLayout.astro              minimal layout for iframe widgets
  pages/                                 routes (see below)
tests/                                   vitest unit tests
astro.config.mjs                         site URL, sitemap filter, Markdown plugins
wrangler.json                            Cloudflare Worker name + assets directory
```

## Build pipeline

`npm run build` runs, in order — any failure stops the build and therefore
the deploy:

1. `validate:content` — frontmatter, categories, calculator ids, duplicate
   slugs/keywords, internal link targets and timing, link syntax, TODO
   placeholders in published articles, and `banners.json`.
2. `lint:content-style` — banned phrases and template blocks are errors;
   repetition/keyword-stuffing are warnings (currently ~350 warnings, all
   non-blocking).
3. `astro build` — renders every page and every share image into `dist/`.
4. `check:links` — every internal `href` in `dist/**/*.html` must resolve.

`npm run deploy` (`wrangler deploy`) uploads `dist/`; npm then runs the
`postdeploy` hook, which submits all sitemap URLs to IndexNow.

## Publishing model

Articles are published **by build time**: an article is on the site when
`draft` is not `true` and `publishDate <= the moment the build ran`. A
scheduled article has no URL at all until the first build after its date.
Every list, feed, sitemap entry, related-article block and prev/next link
goes through `src/lib/content.ts`, so nothing can link to an unpublished
article. Details, cadence and timing caveats: [scheduled-publishing.md](scheduled-publishing.md).

## Routes

| Route | Source |
| --- | --- |
| `/` | `src/pages/index.astro` (homepage + main calculator) |
| `/blog/`, `/blog/page/<n>/` | blog index and pagination (12 per page) |
| `/blog/<slug>/` | `src/pages/blog/[slug].astro` — article template |
| `/category/<slug>/`, `/tag/<slug>/` | generated from published articles |
| `/<calculator-id>/` | 13 calculator pages (`src/pages/*-calculator.astro` etc., registry in `src/data/calculators.ts`) |
| `/solar-panel-cost-by-state/[<state>/]` | state index + 51 state pages (`state-solar.ts` + `state-notes/`) |
| `/solar-panel-cost-by-city/[<city-st>/]` | city index + city pages (`city-solar.ts`) |
| `/embed/<calculator-id>/` | iframe widgets (noindex, excluded from the sitemap) |
| `/og/<slug>.png`, `/og/pages/<slug>.png` | generated share images |
| `/about/`, `/methodology/`, `/contact/`, `/privacy-policy/`, `/terms/` | static pages |
| `/rss.xml`, `/sitemap-index.xml` | feed and sitemap (published content only) |

## Article page anatomy

`src/pages/blog/[slug].astro` renders, top to bottom: breadcrumb, title,
byline + dates, the generated share image, banner slot `article-top`, a
link to the matching state page (for state guides), the Markdown body,
banner slot `article-bottom`, the calculator CTA box (`relatedCalculators`),
the author box, tags, "Related reading" (`relatedArticles` + automatic
matches), previous/next and the disclaimer. It also emits Article,
Breadcrumb and — when the body has a `## Frequently asked questions`
section — FAQPage JSON-LD.

## Integrations

All owner-specific IDs are constants at the top of `src/lib/site.ts`
(Google Analytics 4, Search Console verification, Ahrefs Web Analytics,
Impact.com verification, Web3Forms contact form, contact email). An empty
string disables the integration. The IndexNow key is in
`scripts/lib/indexnow.mjs`; the ad-network seller list is `public/ads.txt`.
See [handover.md](handover.md).

## Conventions for code changes

- Read articles only through `src/lib/content.ts` — never call
  `getCollection('blog')` in a page.
- Calculator links come from `src/data/calculators.ts`; never hard-code a
  calculator URL that isn't in the registry.
- Categories come from `src/lib/taxonomy.ts` (adding one there makes it
  valid everywhere).
- All dates are UTC; compare `Date` objects, never formatted strings.
- Keep `npm test` and `npm run build` green before pushing: a failed build
  on Cloudflare means nothing (including scheduled articles) gets published.
