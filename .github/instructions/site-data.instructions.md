---
applyTo: "src/data/banners.json,src/data/external-links.json"
---

# Banner and link configuration

`src/data/banners.json` is a JSON array; each banner needs a unique
kebab-case `id`, a `placement` (`article-top`, `article-bottom`, `listing`,
`home`, `calculator`) and exactly one creative: either `image` +
`width` + `height` + `alt` + `href`, or `html`. Local images live in
`public/banners/` and are referenced as `/banners/<file>`. Optional:
`imageMobile`, `sponsored` (default true), `label`, `newTab`, `active`,
`start`/`end` (ISO UTC), `categories`, `articles`, `excludeArticles`,
`priority`. One banner per slot; highest priority wins. Validated by
`npx tsx scripts/validate-content.ts`. Full reference: `docs/banners.md`.

`src/data/external-links.json` controls outbound links in articles:
`openInNewTab`, `sponsoredDomains` (→ `rel="sponsored nofollow"`),
`nofollowDomains`. See `docs/linking.md`.
