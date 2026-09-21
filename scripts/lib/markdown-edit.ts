// Text-level editing helpers for article Markdown files, used by the content
// CLIs (scripts/post.ts, scripts/link.ts). They edit the raw text in place
// instead of re-serializing YAML, so untouched lines keep their exact
// formatting and diffs stay minimal. Pure functions — covered by
// tests/markdown-edit.test.ts.

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---(\r?\n|$)/;

export interface SplitFile {
  /** Frontmatter text between the --- fences (no fences). */
  frontmatter: string;
  body: string;
  eol: string;
}

export function splitFile(raw: string): SplitFile {
  const eol = raw.includes('\r\n') ? '\r\n' : '\n';
  const match = raw.match(FRONTMATTER_RE);
  if (!match) throw new Error('file has no --- frontmatter block');
  return { frontmatter: match[1], body: raw.slice(match[0].length), eol };
}

export function joinFile({ frontmatter, body, eol }: SplitFile): string {
  return `---${eol}${frontmatter}${eol}---${eol}${body}`;
}

function yamlScalar(value: string): string {
  return /^[a-z0-9][a-z0-9-]*$/i.test(value) ? value : JSON.stringify(value);
}

/** Set (or add) a top-level scalar key, e.g. draft: false. */
export function setScalar(frontmatter: string, key: string, value: string, eol = '\n'): string {
  const lines = frontmatter.split(/\r?\n/);
  const index = lines.findIndex((line) => line.startsWith(`${key}:`));
  const line = `${key}: ${value}`;
  if (index === -1) lines.push(line);
  else lines[index] = line;
  return lines.join(eol);
}

/** Current values of a top-level YAML list key (block or inline style). */
export function readList(frontmatter: string, key: string): string[] {
  const lines = frontmatter.split(/\r?\n/);
  const index = lines.findIndex((line) => line.startsWith(`${key}:`));
  if (index === -1) return [];
  const inline = lines[index].slice(key.length + 1).trim();
  const unquote = (v: string) => v.trim().replace(/^["']|["']$/g, '');
  if (inline.startsWith('[')) {
    return inline
      .replace(/^\[|\]$/g, '')
      .split(',')
      .map(unquote)
      .filter(Boolean);
  }
  const values: string[] = [];
  for (let i = index + 1; i < lines.length && /^\s+-\s/.test(lines[i]); i++) {
    values.push(unquote(lines[i].replace(/^\s+-\s/, '')));
  }
  return values;
}

/** Append a value to a top-level YAML list key; no-op when already present. */
export function addToList(frontmatter: string, key: string, value: string, eol = '\n'): string {
  if (readList(frontmatter, key).includes(value)) return frontmatter;
  const lines = frontmatter.split(/\r?\n/);
  const index = lines.findIndex((line) => line.startsWith(`${key}:`));
  const item = `  - ${yamlScalar(value)}`;
  if (index === -1) {
    lines.push(`${key}:`, item);
    return lines.join(eol);
  }
  const inline = lines[index].slice(key.length + 1).trim();
  if (inline && inline !== '[]') {
    // Inline list with values: rewrite as a block list.
    const values = [...readList(frontmatter, key), value];
    lines.splice(index, 1, `${key}:`, ...values.map((v) => `  - ${yamlScalar(v)}`));
    return lines.join(eol);
  }
  lines[index] = `${key}:`;
  let last = index;
  while (last + 1 < lines.length && /^\s+-\s/.test(lines[last + 1])) last++;
  lines.splice(last + 1, 0, item);
  return lines.join(eol);
}

// ---------------------------------------------------------------------------
// Anchor-text search and link insertion in the Markdown body.
// ---------------------------------------------------------------------------

// Spans on a line that must never receive a new link.
const PROTECTED_RES = [
  /!?\[[^\]]*\]\([^)]*\)/g, // existing links and images
  /`[^`]*`/g, // inline code
  /<[^>]+>/g, // inline HTML tags
  /https?:\/\/\S+/g, // bare URLs
];

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export interface AnchorMatch {
  /** Offset of the match in the body. */
  index: number;
  /** Matched text with its original casing. */
  text: string;
  /** 1-based line number within the body. */
  line: number;
}

/**
 * Unlinked occurrences of `anchor` in the body (case-insensitive, whole
 * words), skipping headings, code blocks, HTML lines, existing links, inline
 * code and URLs.
 */
export function findAnchors(body: string, anchor: string): AnchorMatch[] {
  const phrase = anchor.trim();
  if (!phrase) return [];
  const pattern = new RegExp(`(?<![\\w-])${escapeRegExp(phrase).replace(/\s+/g, '\\s+')}(?![\\w-])`, 'gi');
  const results: AnchorMatch[] = [];
  let offset = 0;
  let inFence = false;
  const lines = body.split('\n');

  lines.forEach((line, lineIndex) => {
    const trimmed = line.trim();
    const lineStart = offset;
    offset += line.length + 1;
    if (/^(```|~~~)/.test(trimmed)) {
      inFence = !inFence;
      return;
    }
    if (inFence || /^#{1,6}\s/.test(trimmed) || trimmed.startsWith('<')) return;

    const protectedSpans: Array<[number, number]> = [];
    for (const re of PROTECTED_RES) {
      for (const m of line.matchAll(re)) protectedSpans.push([m.index!, m.index! + m[0].length]);
    }
    for (const m of line.matchAll(pattern)) {
      const start = m.index!;
      const end = start + m[0].length;
      if (protectedSpans.some(([a, b]) => start < b && end > a)) continue;
      results.push({ index: lineStart + start, text: m[0], line: lineIndex + 1 });
    }
  });
  return results;
}

/** Markdown link syntax, with an optional quoted title ("sponsored"/"nofollow"). */
export function markdownLink(text: string, href: string, title?: string): string {
  return `[${text}](${href}${title ? ` "${title}"` : ''})`;
}

/** Wrap the first unlinked occurrence of `anchor` in a link. null when none found. */
export function insertLink(
  body: string,
  anchor: string,
  href: string,
  title?: string,
): { body: string; match: AnchorMatch } | null {
  const match = findAnchors(body, anchor)[0];
  if (!match) return null;
  const link = markdownLink(match.text.replace(/\s+/g, ' '), href, title);
  return {
    body: body.slice(0, match.index) + link + body.slice(match.index + match.text.length),
    match,
  };
}

/** Does the body already contain a markdown link to `href` (ignoring #fragments)? */
export function bodyLinksTo(body: string, href: string): boolean {
  const target = href.split('#')[0];
  return [...body.matchAll(/\]\(([^)\s]+)/g)].some((m) => m[1].split('#')[0] === target);
}

/** Short one-line excerpt around an offset, for CLI output. */
export function excerpt(body: string, index: number, radius = 60): string {
  const start = Math.max(0, index - radius);
  const end = Math.min(body.length, index + radius);
  return `${start > 0 ? '…' : ''}${body.slice(start, end).replace(/\s+/g, ' ').trim()}${end < body.length ? '…' : ''}`;
}

/** kebab-case slug from a title. */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
