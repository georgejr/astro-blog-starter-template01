---
mode: agent
description: Add inbound/outbound internal or external links for an article
---

Improve the links for the article (slug) I name, following `docs/linking.md`:

1. `npm run link -- list <slug>` and `npm run link -- backlinks <slug>`.
2. Outbound: add contextual links with
   `npm run link -- add <slug> <target> --anchor "<phrase>"` (targets: live
   article slugs, calculator ids, site paths, or `https://` URLs; use
   `--sponsored` for affiliate links).
3. Inbound: `npm run link -- find "<phrase>" --to <slug>`, then `--apply
   --limit 5` with natural anchors.
4. Review `git diff src/content/blog`, revert awkward links, run
   `npm run build`, and list what was added. Don't push.
