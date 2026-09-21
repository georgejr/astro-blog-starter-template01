# CLAUDE.md

The project rules, commands and task recipes are shared with other agents
and live in AGENTS.md — imported here so there is one source of truth:

@AGENTS.md

## Claude Code specifics

- **Slash commands** in `.claude/commands/`:
  - `/new-article <topic>` — draft, link and schedule a new article
  - `/link-article <slug>` — add inbound and outbound links for an article
  - `/add-banner <details>` — upload and configure a banner
  - `/content-status` — summary of live/scheduled/draft content and banners
- **Permissions** (`.claude/settings.json`): tests, builds and read-only CLI
  commands are pre-approved; `npm run deploy` / `wrangler deploy` are
  denied — deploying is the owner's call (pushing to `main` also deploys,
  so ask before pushing).
- Put personal settings in `.claude/settings.local.json` (git-ignored).
- The full build takes ~3 minutes; run it once at the end of a content task
  rather than after every edit. `npx tsx scripts/validate-content.ts` checks
  content in seconds.
- On Windows the Bash tool is Git Bash; `npm run post -- …` works there. In
  PowerShell 5.1 use `npx tsx scripts/post.ts …` instead.
- For bulk edits across `src/content/blog/`, prefer the `npm run link` /
  `npm run post` CLIs over ad-hoc regex replacements: they skip headings,
  code and existing links and respect the publish-timing rule.
