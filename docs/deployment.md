# Deployment and operations

## How a change reaches the live site

```
edit files ──► git push origin main ──► Cloudflare Workers Builds
                                         ├─ npm ci
                                         ├─ npm run build   (validate → lint → astro build → link check)
                                         └─ npm run deploy  (wrangler deploy → postdeploy: IndexNow ping)
```

- **Cloudflare Workers Builds** (the Worker's Git integration, configured in
  the Cloudflare dashboard, not in this repo) builds and deploys every push
  to `main`.
- The GitHub Action `.github/workflows/scheduled-publish.yml` pushes a
  one-line trigger commit (`.scheduled-build`) every **Tuesday 08:05 UTC**
  so the weekly scheduled article gets built. It can also be started by
  hand (GitHub → Actions → scheduled-publish → Run workflow). Details:
  [scheduled-publishing.md](scheduled-publishing.md).
- If a build fails, nothing is deployed and the previous version stays
  live — including any article that was due. Check the build log in the
  Cloudflare dashboard (Worker → Deployments / Builds).

## Cloudflare setup (new account or new owner)

1. **Worker + Git:** Cloudflare dashboard → Workers & Pages → Create →
   Import a repository → pick this GitHub repo.
   - Build command: `npm run build`
   - Deploy command: `npm run deploy` (not plain `npx wrangler deploy` —
     `npm run deploy` also runs the IndexNow `postdeploy` hook)
   - Root directory: `/`; production branch: `main`
   - Environment variable `NODE_VERSION=22` if the default Node is older
     than 20.
   The Worker name must match `"name"` in `wrangler.json`
   (`astro-blog-starter-template01`; rename both together if you like).
2. **Custom domain:** Worker → Settings → Domains & Routes → Add → Custom
   domain `sunmetriclab.com` (the domain's DNS zone must be on the same
   Cloudflare account). For `www`, add a zone-level Redirect Rule
   `www.sunmetriclab.com/*` → `https://sunmetriclab.com/$1` (301);
   `public/_redirects` cannot do host redirects.
3. **GitHub Actions:** make sure Actions are enabled on the repository
   (Settings → Actions). The workflow only needs the built-in
   `GITHUB_TOKEN` with `contents: write` (already declared). No secrets are
   required anywhere in this project.

## Manual deploy from your machine

```bash
npm ci
npx wrangler login          # once, opens the browser
npm run build && npm run deploy
```

This publishes whatever is in your working copy, including uncommitted
changes — prefer pushing to `main` so the live site always matches git.

## Rollback

- Fastest: Cloudflare dashboard → Worker → Deployments → pick the previous
  version → Rollback.
- Or revert in git and push: `git revert <commit> && git push`.

## IndexNow (Bing, Yandex, Seznam, Naver …)

After each deploy, `scripts/submit-indexnow.mjs` submits every URL from the
sitemap. It never fails a deploy; problems are only logged.

- Key: `INDEXNOW_KEY` in `scripts/lib/indexnow.mjs`; the same key must be
  served as `public/<key>.txt` containing just the key.
- Preview: `npm run indexnow:dry`. Manual run after a deploy:
  `npm run indexnow`.
- Submit only specific URLs:
  `INDEXNOW_URLS="https://sunmetriclab.com/blog/x/" npm run indexnow`.
- Rotating the key (recommended for a new owner): generate 32 hex
  characters, create `public/<newkey>.txt` with that content, set
  `INDEXNOW_KEY`, delete the old key file, deploy.

Google doesn't use IndexNow — submit `https://sunmetriclab.com/sitemap-index.xml`
once in Google Search Console; it re-reads it on its own.

## Useful commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | local dev server on http://localhost:4321 |
| `npm run build` | full validation + production build into `dist/` |
| `npm run preview` | serve the built `dist/` locally |
| `npm test` | unit tests (publishing rules, validation, banners, link tools, IndexNow) |
| `npm run post -- status` | content queue + live banners overview |
| `npm run indexnow:dry` | list the URLs IndexNow would receive |
| `npx wrangler tail` | live request logs of the Worker |

## Troubleshooting a failed build

| Log shows | Fix |
| --- | --- |
| `validate:content — N error(s)` | Content/banner problem; each line names the file — see [content-guide.md](content-guide.md) and [linking.md](linking.md). |
| `lint:content-style — N error(s)` | Banned phrase or template block in an article ([editorial-guidelines.md](editorial-guidelines.md)). Warnings don't fail the build. |
| `InvalidContentEntryDataError` / schema error | Frontmatter doesn't match `src/content.config.ts` (bad date, unknown category, wrong type). |
| `check:links — broken internal link target(s)` | A rendered page links to a URL that doesn't exist (often hand-written HTML). |
| Out of memory / slow | The build renders ~500 pages and a share image per article (~2–3 minutes locally). |
