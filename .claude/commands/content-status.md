---
description: Summarize live, scheduled and draft content plus active banners
---

Run `npm run post -- status --next 10` and `npm run banner -- list`, then
give a short summary: counts, the last few live articles, the next scheduled
ones (with dates), drafts, which banner is live in each slot, and anything
that needs attention (drafts containing TODO, banners expiring within two
weeks, the queue end date). Also run `git fetch -q` and compare the date of the
latest `chore: scheduled publish trigger` commit on `origin/main` with the
last Tuesday 08:05 UTC to flag a missed scheduled build. Don't change files.
