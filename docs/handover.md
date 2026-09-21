# Handover — taking over sunmetriclab.com

This is the checklist for a new owner: what the project contains, which
accounts are tied to the previous owner, what to change on day one, and the
open items worth knowing about.

## What you're getting

- A static Astro site: 13 solar calculators, 51 state and 45 city cost
  pages, and a blog of **510 articles** (≈130 live, ≈380 scheduled one per
  week until January 2034).
- Automatic weekly publishing (GitHub Action + Cloudflare build), sitemap,
  RSS, structured data, generated share images, IndexNow pings.
- Content tooling: validators that block bad content from going live, and
  CLIs for articles, links and banners (`npm run post | link | banner`).
- A banner/ad slot system (empty) and outbound-link `rel` handling.
- Documentation in `docs/` and instructions for AI coding assistants
  (`AGENTS.md`, `CLAUDE.md`, `.github/copilot-instructions.md`).

## Accounts and IDs to replace

Everything owner-specific is in three places. Until you replace them, the
corresponding service keeps reporting to (or sending mail to) the previous
owner. Set a value to `''` to switch an integration off entirely.

| Service | Where | What to do |
| --- | --- | --- |
| Google Analytics 4 | `GA_MEASUREMENT_ID` in `src/lib/site.ts` | Create your own GA4 property, paste its `G-…` ID. |
| Google Search Console | `GOOGLE_SITE_VERIFICATION` in `src/lib/site.ts` | Verify the domain (DNS verification needs no code), or paste the HTML-tag token here. Submit `/sitemap-index.xml`. |
| Ahrefs Web Analytics | `AHREFS_ANALYTICS_KEY` in `src/lib/site.ts` | Your own key, or `''`. |
| Impact.com (affiliate network) | `IMPACT_SITE_VERIFICATION` in `src/lib/site.ts` | Your own token, or `''`. |
| Contact form (Web3Forms) | `WEB3FORMS_ACCESS_KEY` in `src/lib/site.ts` | **Messages currently go to the previous owner's inbox.** Create a free key at web3forms.com with your inbox and paste it. |
| Contact fallback email | `CONTACT_EMAIL` in `src/lib/site.ts` | Shown when the form fails; set yours or `''`. |
| Ad network seller list | `public/ads.txt` | Currently The Moneytizer lines for the previous owner's publisher account (no ad code is installed). Replace with your network's lines or empty the file. |
| IndexNow key | `scripts/lib/indexnow.mjs` + `public/<key>.txt` | Rotate (steps in [deployment.md](deployment.md#indexnow-bing-yandex-seznam-naver-)). |
| Cloudflare | dashboard (Worker `astro-blog-starter-template01`, DNS zone, custom domain) | Transfer the zone/Worker or re-create them on your account ([deployment.md](deployment.md#cloudflare-setup-new-account-or-new-owner)). |
| GitHub | repository + Actions | Transfer or import the repo; enable Actions; reconnect Cloudflare Workers Builds to it. |
| Domain registrar | outside this repo | Transfer `sunmetriclab.com`. |

## Day-one checklist

1. `npm ci && npm test && npm run build` — confirm everything is green.
2. Replace the IDs in the table above (at minimum GA4 and Web3Forms), commit.
3. Connect Cloudflare Workers Builds to your repo, attach the custom domain
   ([deployment.md](deployment.md)).
4. Push to `main`; check the live site, `/rss.xml`, `/sitemap-index.xml`
   and the contact form.
5. Verify the site in Google Search Console and Bing Webmaster Tools;
   submit the sitemap. Rotate the IndexNow key.
6. Check that the `scheduled-publish` workflow runs on the next Tuesday
   (GitHub → Actions).
7. Optional: replace the byline in `src/data/authors.ts` (currently the
   impersonal "SunMetricLab Editorial Team"; the `Person` type is supported
   if you want a named author).

## Changing the domain or brand

The domain appears in: `astro.config.mjs` (`SITE_URL`), `src/lib/site.ts`
(`SITE_URL`, `SITE_NAME`), `public/robots.txt`, `public/embed.js`
(`ORIGIN`), `scripts/submit-indexnow.mjs` (default site),
`src/components/EmbedSection.astro`, `src/layouts/EmbedLayout.astro`.
The brand name "SunMetricLab" also appears in page copy
(`src/pages/about.astro`, `methodology.astro`, category/tag pages), the
share-image template (`src/lib/og-image.ts`, `og-pages.ts`), the author
entry and about 100 articles. Search with `grep -ril sunmetriclab .`
(excluding `node_modules`). Add 301s at the old domain if you move.

## Content caveats

- **Federal tax credit.** The 30% Residential Clean Energy Credit (IRC 25D)
  ended for expenditures after 2025-12-31. The site's standard caveat is
  `FEDERAL_CREDIT_NOTE` in `src/lib/site.ts`, but many articles written
  before September 2026 (≈95 mention "30% federal"), the homepage FAQ and
  quick-reference table, and the calculators' default "include credit"
  setting still present it as current. Correct articles when you next touch
  them; the `federal-tax-credit-calculator` page deserves a rethink.
- **State notes to spot-check** (`src/data/state-notes/`): NJ SREC-II
  price, NM credit cap, RI state credit status, UT sales-tax exemption, TN
  property-tax rate, MI 10% distributed-generation cap, Austin Energy
  rebate. They're written as hedged editorial summaries — verify before
  relying on them.
- **Queue quality.** The scheduled queue was generated in bulk. The
  editorial policy is one deeper article a week; merging or deleting thin
  or overlapping queued drafts is worthwhile. After pruning, re-space the
  queue with `node scripts/reschedule-weekly.mjs` (dry run, then
  `--write`).
- **Style warnings.** `npm run lint:content-style` reports ~350 warnings
  (repeated openings, filler words, similar heading structures). They
  don't block builds; they're a to-do list for editing.
- Only one article currently has a `## Frequently asked questions`
  section (which produces FAQ rich results) — an easy upgrade for key
  articles.

## Small technical notes

- `public/sw.js` is a self-destroying service worker that replaced an old
  third-party ad worker at the same path. It's harmless; delete it once you
  no longer care about visitors from before mid-2026 (and before adding a
  service worker of your own).
- The footer "Cookie Settings" link only does something once a consent
  banner (e.g. Google's consent message via AdSense) is installed.
- The `featured` frontmatter flag is accepted but not used by any template.
- The weekly GitHub Action commits to `main` every Tuesday; pull before you
  push to avoid trivial merge commits.
