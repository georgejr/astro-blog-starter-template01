---
mode: agent
description: Upload and configure a banner or ad-network snippet
---

Set up the banner I describe, following `docs/banners.md`:

1. Work out placement (`article-top`, `article-bottom`, `listing`, `home`,
   `calculator`), creative (image file or HTML snippet), click URL, alt
   text, paid vs. house promo, targeting and dates. Ask only for what's
   missing.
2. `npm run banner -- list` to see what occupies the slot.
3. `npm run banner -- add --id <id> --placement <slot> --image <file> --href <url> --alt "<text>" [--mobile …] [--categories …] [--start … --end …] [--priority N] [--house]`
   or `--html-file <snippet.html>`.
4. `npm run build`, confirm `data-banner="<id>"` appears in `dist/`, and
   report. Don't push.
