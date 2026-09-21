# Banners and ads

The site has five fixed **banner slots**. What appears in them is configured
in one file, `src/data/banners.json`, and resolved at build time — so every
banner change goes live with the next deploy, and a slot with nothing
configured renders no HTML at all. The file ships empty (`[]`).

Manage banners by editing the JSON by hand or with `npm run banner`
(on Windows PowerShell 5.1: `npx tsx scripts/banner.ts …`).

## 1. Slots

| Placement | Where it appears | Typical size |
| --- | --- | --- |
| `article-top` | every article, under the header image, before the text | 728×90 (+ 320×100 mobile) |
| `article-bottom` | every article, after the text, before the calculator box | 728×90 or 300×250 |
| `listing` | blog index, pagination, category and tag pages, above the article grid | 728×90 |
| `home` | homepage, under the calculator | 728×90 or 970×250 |
| `calculator` | all 13 calculator pages, under the calculator | 728×90 or 300×250 |

Each slot shows **one** banner: among the banners that match (placement,
active, inside their date window, targeting), the highest `priority` wins;
on a tie, the one listed first in the file wins. There is no rotation —
it's a static site.

## 2. Upload an image banner

### With the CLI

```bash
npm run banner -- add --id solar-quotes-leaderboard --placement article-bottom \
  --image ~/Downloads/solar-quotes-728x90.webp \
  --mobile ~/Downloads/solar-quotes-320x100.webp \
  --href "https://partner.example/?ref=sunmetric" \
  --alt "Compare solar quotes from local installers"
```

The CLI copies the images into `public/banners/`, reads their pixel size,
validates everything and appends the entry to `banners.json`. Then build,
commit and push (section 6).

### By hand

1. Put the image in `public/banners/`, e.g.
   `public/banners/solar-quotes-728x90.webp`. It will be served at
   `/banners/solar-quotes-728x90.webp`.
2. Add an entry to `src/data/banners.json`:

   ```json
   [
     {
       "id": "solar-quotes-leaderboard",
       "placement": "article-bottom",
       "image": "/banners/solar-quotes-728x90.webp",
       "imageMobile": "/banners/solar-quotes-320x100.webp",
       "width": 728,
       "height": 90,
       "href": "https://partner.example/?ref=sunmetric",
       "alt": "Compare solar quotes from local installers"
     }
   ]
   ```

3. Run `npm run build` (the validator checks the file exists, the size and
   alt text are set, the id is unique, dates parse, categories and slugs
   exist).

Image tips: WebP (or PNG/JPEG/GIF/SVG), exact display size or 2× for sharp
screens, under ~150 KB. `width`/`height` must be the image's real pixel
size (it reserves space so the page doesn't jump while loading).
`imageMobile` is used below 640 px viewport width.

## 3. All fields

| Field | Required | Meaning |
| --- | --- | --- |
| `id` | yes | Unique kebab-case id. Rendered as `data-banner="<id>"` (handy for click tracking in GA/GTM). |
| `placement` | yes | One of the five slots. |
| `image` | image banners | `/banners/file.webp` (under `public/`) or an `https://` URL. |
| `width`, `height` | image banners | Pixel size of `image`. |
| `alt` | image banners | Describes the banner for screen readers. |
| `href` | image banners | Click target: `https://…` or a site path like `/solar-roi-calculator/`. |
| `imageMobile` | no | Narrower creative for small screens. |
| `html` | ad-code banners | Raw HTML/JS snippet from an ad or affiliate network, instead of `image`. |
| `sponsored` | no (default `true`) | Paid/affiliate: link gets `rel="sponsored nofollow"` and the "Advertisement" label. `false` for promos of your own pages. |
| `label` | no | Text above the banner. Default "Advertisement" when sponsored, none otherwise. `""` hides it. |
| `newTab` | no | Default: new tab for external URLs, same tab for site paths. |
| `active` | no (default `true`) | `false` keeps the entry but hides it. |
| `start`, `end` | no | ISO timestamps (`2026-11-01T00:00:00Z`). Shown only in builds inside this window. |
| `categories` | no | Only on articles (and category pages) in these categories. |
| `articles` | no | Only on these article slugs. |
| `excludeArticles` | no | Never on these article slugs. |
| `priority` | no (default `0`) | Higher wins when several banners match a slot. |

Exactly one of `image` or `html` must be set.

## 4. Examples

**House promo for your own calculator** (no ad label, same tab):

```json
{
  "id": "promo-battery-calculator",
  "placement": "listing",
  "image": "/banners/battery-calculator-728x90.webp",
  "width": 728, "height": 90,
  "href": "/solar-battery-calculator/",
  "alt": "Size a home battery in 2 minutes",
  "sponsored": false
}
```

**Category-targeted campaign with an end date** (wins over the generic
banner in the same slot because of its priority):

```json
{
  "id": "battery-partner-black-friday",
  "placement": "article-top",
  "image": "/banners/battery-bf-728x90.webp",
  "width": 728, "height": 90,
  "href": "https://partner.example/batteries?ref=sunmetric",
  "alt": "Home battery deals",
  "categories": ["Batteries & Storage"],
  "start": "2026-11-20T00:00:00Z",
  "end": "2026-12-01T00:00:00Z",
  "priority": 10
}
```

**Ad-network / affiliate HTML snippet:**

```json
{
  "id": "network-300x250",
  "placement": "calculator",
  "html": "<a href=\"https://partner.example/c/123\" rel=\"sponsored nofollow noopener\" target=\"_blank\"><img src=\"https://partner.example/b/123.png\" width=\"300\" height=\"250\" alt=\"Solar quotes\"></a><img src=\"https://partner.example/i/123\" width=\"1\" height=\"1\" alt=\"\">"
}
```

With the CLI, save the snippet to a file and run
`npm run banner -- add --id network-300x250 --placement calculator --html-file snippet.html`.
Snippets are inserted verbatim (scripts included) — only paste code from
networks you trust, and add `rel="sponsored"` to links inside it yourself.

## 5. Managing banners

```bash
npm run banner -- list                      # all banners, LIVE / off / scheduled-expired
npm run banner -- disable <id>              # hide, keep the entry
npm run banner -- enable <id>
npm run banner -- remove <id>               # removes the entry (image file is kept; delete it if unused)
npm run post -- status                      # includes which banners are live per slot
```

CLI options for `add`: `--start`, `--end`, `--categories "A,B"`,
`--articles "slug1,slug2"`, `--exclude "slug1"`, `--priority N`, `--house`
(= `sponsored: false`), `--label "Sponsored"`, `--inactive`, and
`--width/--height` when the size can't be read (SVG, remote image).

## 6. Going live

Banners are part of the static build:

1. `npm run build` (validates `banners.json`) — optionally `npm run preview`
   to look at the result on http://localhost:4321.
2. Commit `src/data/banners.json` and the image files, push to `main`.
3. Cloudflare rebuilds and deploys within a couple of minutes.

A `start`/`end` date only takes effect at the next build after it passes.
The weekly scheduled build (Tuesdays 08:05 UTC) picks it up automatically;
for an exact start, trigger a deploy at that time (GitHub → Actions →
scheduled-publish → Run workflow).

## 7. A banner inside one specific article

For a one-off placement in the middle of an article, put HTML straight into
the Markdown file where it should appear (with an empty line above and
below):

```markdown
Paragraph before.

<div class="not-prose my-8 text-center">
  <a href="https://partner.example/?ref=sunmetric" rel="sponsored nofollow noopener" target="_blank">
    <img src="/banners/solar-quotes-728x90.webp" width="728" height="90" alt="Compare solar quotes" loading="lazy" style="max-width:100%;height:auto">
  </a>
</div>

Paragraph after.
```

Raw HTML is not rewritten, so set `rel` and `target` yourself.

## 8. Site-wide ad networks (AdSense etc.)

Auto-ads scripts belong in `<head>`: add the network's `<script>` tag to
`src/layouts/BaseLayout.astro` (next to the analytics scripts) and replace
`public/ads.txt` with the lines your network gives you. Serving personalised
ads to EEA/UK visitors requires a consent banner (e.g. Google's own
consent message); `src/components/GoogleAnalytics.astro` already defaults
EEA/UK/CH consent to "denied" and the footer's "Cookie Settings" link will
reopen Google's message once it is installed. Keep ads out of
`src/layouts/EmbedLayout.astro` (the embeddable widgets).

## 9. Troubleshooting

| Problem | Check |
| --- | --- |
| Banner doesn't show | `npm run banner -- list` — is it LIVE? Another banner with higher priority in the same slot? Targeting (`categories`/`articles`) too narrow? Was the site deployed since the change? |
| Build fails with `banners.json` error | The message says which banner and field; common: image path without leading `/`, file not in `public/`, missing `alt`/size, typo in category name. |
| Page jumps when the banner loads | `width`/`height` don't match the real image size. |
| Click-through not tracked by partner | Use the exact tracking URL from the partner; some networks require their HTML snippet (`html`) including an impression pixel. |
