# Linking guide — internal links, related articles and external links

Links are plain Markdown in the article files. The build validates every
internal link, so a broken or premature link fails the build instead of
reaching visitors. Everything below can be done by hand or with
`npm run link` (on Windows PowerShell 5.1 use `npx tsx scripts/link.ts …`).

## 1. The kinds of links on an article page

| Link | Controlled by | Notes |
| --- | --- | --- |
| Links inside the text | Markdown in the body | You choose anchor text and target. Most SEO value. |
| "Related reading" cards | `relatedArticles` frontmatter + automatic matches | Your slugs come first; the rest is filled (up to 6) by category/tag/keyword similarity. Recomputed every build, so older articles automatically gain cards pointing to newer ones. |
| Calculator box under the article | `relatedCalculators` frontmatter | First two calculator ids are shown with a CTA. |
| State page link | automatic | Articles named `solar-panels-in-<state>` or tagged with a state name link to that state's cost page. |
| Category, tags, prev/next, breadcrumb | automatic | From `category`, `tags` and publish order. |

## 2. Internal links in the body

```markdown
Your export rate matters more than the panel brand — see
[how net metering works](/blog/net-metering-explained/) and run the numbers in the
[solar ROI calculator](/solar-roi-calculator/).
```

Rules (enforced by `npm run validate:content`):

- Use **site-absolute paths with a trailing slash**: `/blog/<slug>/`,
  `/<calculator-id>/`. Never relative paths (`blog/x/`, `../x/`) and never the
  full `https://sunmetriclab.com/...` form for internal pages.
- Allowed internal targets: articles (`/blog/<slug>/`), the 13 calculator
  pages, state/city pages (`/solar-panel-cost-by-state/texas/`,
  `/solar-panel-cost-by-city/phoenix-az/`), and `/`, `/blog/`, `/about/`,
  `/methodology/`, `/contact/`, `/privacy-policy/`, `/terms/`,
  `/solar-panel-cost-by-state/`, `/solar-panel-cost-by-city/`.
- `#anchors` are fine: `/blog/net-metering-explained/#frequently-asked-questions` (headings get automatic ids).
- **Timing rule:** the target article must be live now, *or* publish no
  later than the linking article. This guarantees no page ever links to an
  article that doesn't exist yet:
  - a live article may link to any other live article (old → new is fine);
  - a scheduled article may link to live articles and to scheduled ones
    that publish before it;
  - nothing may link to a draft.
- Good practice: 1–3 contextual article links and 1–2 calculator links per
  article, on descriptive anchor text ("how net metering works", not
  "click here"). Don't link category/tag pages from the body.

### With the CLI

```bash
# Link the first unlinked occurrence of a phrase in one article:
npm run link -- add is-solar-worth-it net-metering-explained --anchor "net metering"

# Target can be a slug, a calculator id, a site path or a URL:
npm run link -- add solar-panels-in-texas solar-roi-calculator --anchor "payback"
npm run link -- add solar-panels-in-texas /solar-panel-cost-by-state/texas/ --anchor "Texas cost data"

# Preview without writing:
npm run link -- add is-solar-worth-it net-metering-explained --anchor "net metering" --dry-run
```

`add` skips headings, code, existing links and URLs, keeps the original
capitalisation of the matched words, refuses targets that break the
timing rule, and refuses a second link to the same target unless you pass
`--force`.

### Linking a new article from older ones (backlinks)

After a new article goes live, point existing articles at it:

```bash
# 1. Which articles mention the topic without linking it?
npm run link -- find "net billing" --to net-billing-vs-net-metering

# 2. Insert the link in up to 5 of them (most recent first):
npm run link -- find "net billing" --to net-billing-vs-net-metering --apply --limit 5

# 3. Review the diff, build, commit:
git diff src/content/blog && npm run build
```

`find` without `--to` just lists mentions with a text excerpt.

### Inspecting links

```bash
npm run link -- list net-metering-explained       # outgoing links, relatedArticles, calculators
npm run link -- backlinks net-metering-explained  # who links here (body or relatedArticles)
```

## 3. Related articles (frontmatter)

```yaml
relatedArticles:
  - how-much-do-solar-panels-save
  - electric-bill-after-solar
```

or `npm run link -- related <source-slug> <target-slug> [<target-slug> ...]`.
Same timing rule as body links. Keep it to 0–3 hand-picked slugs; the
template tops the list up automatically.

## 4. External links

Write normal Markdown links with the full `https://` URL:

```markdown
Sun-hour data comes from [NREL's PVWatts](https://pvwatts.nrel.gov/).
```

At build time every link to another domain automatically gets
`rel="noopener"` and opens in a new tab. Behaviour is configured in
`src/data/external-links.json`:

```json
{
  "openInNewTab": true,
  "sponsoredDomains": ["partner.example", "amzn.to"],
  "nofollowDomains": ["forum.example"]
}
```

- `sponsoredDomains` — affiliate/paid domains (subdomains included) get
  `rel="noopener sponsored nofollow"`. Google requires `sponsored` (or
  `nofollow`) on paid and affiliate links.
- `nofollowDomains` — links you don't want to vouch for get `nofollow`.
- `openInNewTab: false` keeps external links in the same tab.

**Marking a single link** without touching the config: give it the title
`"sponsored"` or `"nofollow"` (the title itself is removed from the page):

```markdown
[Compare local installer quotes](https://partner.example/?ref=sunmetric "sponsored")
```

CLI equivalent (external URLs only):

```bash
npm run link -- add choosing-a-solar-installer "https://partner.example/?ref=sunmetric" \
  --anchor "installer quotes" --sponsored
npm run link -- find "installer quotes" --to "https://partner.example/?ref=sunmetric" --sponsored --apply --limit 10
```

**Raw HTML links** (`<a href="...">` typed into the Markdown) are output
exactly as written — the automatic `rel`/`target` handling does *not*
apply to them, so add `rel="sponsored nofollow noopener" target="_blank"`
yourself.

External links are not checked for rot by the build. Re-check important
partner and source links occasionally.

## 5. Validation and troubleshooting

| Build message | Meaning / fix |
| --- | --- |
| `body links to nonexistent article /blog/x/` | Typo in the slug, or the article was renamed/deleted. |
| `… which is not published yet and publishes after this article` | Timing rule — wait until the target is live, or schedule the target earlier. |
| `body links to draft article` | Publish the target or remove the link. |
| `body links to unknown internal path` | Not an allowed internal target (section 2). |
| `unsupported link target "…"` | Relative link or malformed URL; use `/path/` or `https://…`. |
| `check:links — broken internal link target(s)` | A rendered page links to a URL that wasn't generated (often a hand-written HTML link). |

## 6. Redirects

When a URL changes, add a line to `public/_redirects` (`/old/ /new/ 301`)
and update the internal links (`npm run link -- backlinks <old-slug>` shows
them). See [content-guide.md](content-guide.md#8-renaming-or-removing-an-article).
