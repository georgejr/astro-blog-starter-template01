---
description: Upload and configure a banner or ad slot
argument-hint: <image path or ad snippet> <click URL> <placement> [targeting, dates]
---

Set up this banner: $ARGUMENTS

Follow docs/banners.md.

1. Determine: placement (`article-top`, `article-bottom`, `listing`, `home`,
   `calculator`), creative (image file — local path or `public/banners/…` —
   or an HTML snippet), click URL, alt text, whether it's paid/affiliate
   (default) or a house promo (`--house`), and any targeting
   (`--categories`, `--articles`, `--exclude`), dates (`--start`/`--end`,
   ISO UTC) or `--priority`. Ask only for what can't be inferred.
2. Check what already occupies the slot: `npm run banner -- list`.
3. Add it:
   `npm run banner -- add --id <kebab-id> --placement <slot> --image <file> [--mobile <file>] --href <url> --alt "<text>" …`
   or `--html-file <snippet.html>` for ad-network code.
4. `npx tsx scripts/validate-content.ts`, then `npm run build`; confirm the
   banner appears in the built HTML (`grep -l 'data-banner="<id>"' -r dist | head`).

Report the id, slot, targeting and that it goes live on the next deploy.
Don't push or deploy.
