# SunMetricLab — solar calculators and guides

Source of [sunmetriclab.com](https://sunmetriclab.com): free solar
calculators for US homeowners, modeled solar cost pages for every state and
45 cities, and a blog of ~500 articles published on a weekly schedule.

Static [Astro 5](https://astro.build) site, Tailwind CSS 4, deployed as
static assets on Cloudflare Workers. No server, database or CMS — content
is Markdown in git.

## Quick start

```bash
npm ci
npm run dev        # http://localhost:4321
npm test           # unit tests
npm run build      # validation + production build (what Cloudflare runs)
```

Node 20 or newer (developed on Node 22).

## Everyday tasks

| Task | Command / file | Guide |
| --- | --- | --- |
| Write a new article | `npm run post -- new --title "…" --category "…"` | [content-guide.md](docs/content-guide.md) |
| Publish / schedule / unpublish | `npm run post -- publish\|schedule\|unpublish <slug>` | [content-guide.md](docs/content-guide.md#6-publishing-and-scheduling) |
| What's live and queued | `npm run post -- status` | |
| Link articles, calculators, external URLs | `npm run link -- add\|find\|related\|list\|backlinks …` | [linking.md](docs/linking.md) |
| Add or change a banner / ad | `npm run banner -- add\|list\|disable …` or `src/data/banners.json` | [banners.md](docs/banners.md) |
| Deploy | push to `main` (Cloudflare builds automatically) | [deployment.md](docs/deployment.md) |

On Windows PowerShell 5.1 (which drops npm's `--`), run the CLIs directly:
`npx tsx scripts/post.ts status`.

## Documentation

- [docs/handover.md](docs/handover.md) — **new owner start here**: accounts to replace, day-one checklist, open items
- [docs/architecture.md](docs/architecture.md) — how the site is built, directory map, routes
- [docs/content-guide.md](docs/content-guide.md) — adding and editing articles by hand or CLI
- [docs/linking.md](docs/linking.md) — internal, related and external (incl. affiliate) links
- [docs/banners.md](docs/banners.md) — banner slots, image and ad-code banners
- [docs/deployment.md](docs/deployment.md) — Cloudflare, GitHub Action, IndexNow, rollback
- [docs/scheduled-publishing.md](docs/scheduled-publishing.md) — build-time publishing model and cadence
- [docs/editorial-guidelines.md](docs/editorial-guidelines.md) — writing rules enforced by the build

AI coding assistants: [AGENTS.md](AGENTS.md) (Codex and others),
[CLAUDE.md](CLAUDE.md) (Claude Code, plus slash commands in
`.claude/commands/`), [.github/copilot-instructions.md](.github/copilot-instructions.md)
(GitHub Copilot, plus prompt files in `.github/prompts/`).

## Commands

| Command | Action |
| --- | --- |
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | `validate:content` → `lint:content-style` → `astro build` → `check:links` |
| `npm run preview` | Serve `dist/` locally |
| `npm run deploy` | `wrangler deploy`, then IndexNow ping (`postdeploy`) |
| `npm test` | Vitest unit tests |
| `npm run post` / `link` / `banner` | Content CLIs (see above) |
| `npm run indexnow:dry` | Show URLs IndexNow would receive |

## Credit

Started from the Cloudflare Astro blog template, itself based on
[Bear Blog](https://github.com/HermanMartinus/bearblog/).
