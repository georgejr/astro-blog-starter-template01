// Content-style lint rules. Errors fail the build (template-like patterns,
// hype vocabulary); warnings flag subjective issues for a human editor.
// This module never rewrites content.
import type { RawArticle } from './load';
import { FORBIDDEN_BLOCK_RE } from './validate';

export interface StyleIssue {
  file: string;
  level: 'error' | 'warning';
  message: string;
}

const BANNED_OPENINGS = [
  "in today's world",
  'when it comes to',
  "whether you're",
  'whether you are',
  'solar energy is becoming increasingly popular',
  'in this comprehensive guide',
  'this article will explore',
  "let's dive in",
];

const HYPE_RE =
  /\b(game[- ]chang(?:ing|er)|revolutionary|ultimate solution|unlock the power|transform your energy journey|maximize your potential)\b/i;

const FILLER_RE = /\b(moreover|furthermore|additionally|in conclusion|it is important to note|it is worth noting|at the end of the day)\b/gi;

const CONCLUSION_HEADING_RE = /^#{2,3}\s*(final thoughts|conclusion|wrapping up|in summary)\s*$/im;

function firstParagraph(body: string): string {
  for (const block of body.split(/\r?\n\r?\n/)) {
    const text = block.trim();
    if (text && !text.startsWith('#') && !text.startsWith('|') && !text.startsWith('```')) return text;
  }
  return '';
}

function headingSignature(body: string): string {
  return [...body.matchAll(/^(#{2,3})\s+(.+)$/gm)].map((m) => m[1]).join(',');
}

export function lintArticles(articles: RawArticle[]): StyleIssue[] {
  const issues: StyleIssue[] = [];

  for (const article of articles) {
    const { file, body } = article;

    if (FORBIDDEN_BLOCK_RE.test(body)) {
      const label = body.match(FORBIDDEN_BLOCK_RE)?.[1]?.toLowerCase();
      issues.push({ file, level: 'error', message: `forbidden labeled block "${label}:"` });
    }

    const hype = body.match(HYPE_RE);
    if (hype) issues.push({ file, level: 'error', message: `hype phrase "${hype[0]}"` });

    const opening = firstParagraph(body).toLowerCase();
    for (const banned of BANNED_OPENINGS) {
      if (opening.startsWith(banned)) {
        issues.push({ file, level: 'error', message: `article opens with banned phrase "${banned}"` });
      }
    }

    const fillers = body.match(FILLER_RE) ?? [];
    if (fillers.length > 3) {
      issues.push({
        file,
        level: 'warning',
        message: `${fillers.length} filler transitions (moreover/furthermore/…) — consider trimming`,
      });
    }

    if (CONCLUSION_HEADING_RE.test(body)) {
      issues.push({
        file,
        level: 'warning',
        message: 'generic conclusion heading (Final Thoughts / Conclusion) — prefer a specific ending',
      });
    }

    const keyword = String(article.data.primaryKeyword ?? '').toLowerCase().trim();
    if (keyword) {
      const count = body.toLowerCase().split(keyword).length - 1;
      const words = body.split(/\s+/).length;
      if (count > 6 && count / Math.max(words, 1) > 0.005) {
        issues.push({
          file,
          level: 'warning',
          message: `primary keyword appears ${count}× — possible keyword stuffing`,
        });
      }
    }
  }

  // Cross-article repetition checks (ordered by publish date).
  const dated = articles
    .map((a) => ({ a, t: Date.parse(String(a.data.publishDate ?? '')) }))
    .filter(({ t }) => !Number.isNaN(t))
    .sort((x, y) => x.t - y.t);

  // Same opening words (first 6) across 3+ articles.
  const openings = new Map<string, string[]>();
  for (const { a } of dated) {
    const key = firstParagraph(a.body).toLowerCase().split(/\s+/).slice(0, 6).join(' ');
    if (!key) continue;
    openings.set(key, [...(openings.get(key) ?? []), a.file]);
  }
  for (const [key, files] of openings) {
    if (files.length >= 3) {
      issues.push({
        file: files.join(', '),
        level: 'warning',
        message: `${files.length} articles share the same opening words ("${key}…")`,
      });
    }
  }

  // 3+ consecutive articles with identical heading structure.
  for (let i = 0; i + 2 < dated.length; i++) {
    const sig = headingSignature(dated[i].a.body);
    if (
      sig &&
      sig === headingSignature(dated[i + 1].a.body) &&
      sig === headingSignature(dated[i + 2].a.body)
    ) {
      issues.push({
        file: `${dated[i].a.file}, ${dated[i + 1].a.file}, ${dated[i + 2].a.file}`,
        level: 'warning',
        message: 'three consecutive articles have identical heading structures',
      });
    }
  }

  return issues;
}
