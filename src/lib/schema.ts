import type { FaqItem } from '../components/FaqSection.astro';
import type { Author } from '../data/authors';
import { SITE_NAME, SITE_URL } from './site';

const abs = (path: string): string => new URL(path, SITE_URL).href;

/** Organization node used as `publisher` on articles and data pages. */
export function organizationSchema(): object {
  return {
    '@type': 'Organization',
    '@id': abs('/#organization'),
    name: SITE_NAME,
    url: abs('/'),
    logo: {
      '@type': 'ImageObject',
      url: abs('/og/pages/site.png'),
      width: 1200,
      height: 630,
    },
  };
}

/** Person node for a named author (embedded in Article and on /about/). */
export function personSchema(author: Author): object {
  return {
    '@type': 'Person',
    '@id': abs(`${author.url}#${author.id}`),
    name: author.name,
    jobTitle: author.title,
    description: author.bio,
    url: abs(author.url),
    ...(author.sameAs.length > 0 ? { sameAs: author.sameAs } : {}),
    worksFor: { '@type': 'Organization', name: SITE_NAME, url: abs('/') },
  };
}

export function faqSchema(faqs: FaqItem[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function webAppSchema(name: string, description: string, url: string): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    publisher: organizationSchema(),
  };
}

export interface ArticleSchemaOptions {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  /** Named person author. When omitted, the organization is the author. */
  author?: Author;
  /** Absolute URL of the share image. */
  image?: string;
  /** 'BlogPosting' for blog articles, 'Article' for data / reference pages. */
  type?: 'BlogPosting' | 'Article';
  keywords?: string[];
  articleSection?: string;
}

export function articleSchema(options: ArticleSchemaOptions): object {
  const org = organizationSchema();
  return {
    '@context': 'https://schema.org',
    '@type': options.type ?? 'BlogPosting',
    headline: options.headline,
    description: options.description,
    url: options.url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': options.url },
    datePublished: options.datePublished,
    dateModified: options.dateModified ?? options.datePublished,
    author: options.author ? personSchema(options.author) : org,
    publisher: org,
    ...(options.image ? { image: [options.image] } : {}),
    ...(options.keywords && options.keywords.length > 0 ? { keywords: options.keywords.join(', ') } : {}),
    ...(options.articleSection ? { articleSection: options.articleSection } : {}),
    inLanguage: 'en-US',
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** WebSite node with the site search action disabled (no on-site search). */
export function websiteSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': abs('/#website'),
    name: SITE_NAME,
    url: abs('/'),
    publisher: organizationSchema(),
    inLanguage: 'en-US',
  };
}

/** Generic WebPage node with freshness dates, for pages that are not articles. */
export function webPageSchema(options: {
  name: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: options.name,
    description: options.description,
    url: options.url,
    datePublished: options.datePublished,
    dateModified: options.dateModified ?? options.datePublished,
    publisher: organizationSchema(),
    inLanguage: 'en-US',
  };
}

/**
 * Extract a trailing "## Frequently asked questions" section from article
 * markdown: each `### Question` heading followed by one paragraph answer.
 * Returns [] when the article has no such section.
 */
export function extractFaqsFromMarkdown(body: string): FaqItem[] {
  const match = body.match(/^##\s+frequently asked questions\s*$/im);
  if (!match || match.index === undefined) return [];
  const section = body.slice(match.index + match[0].length);
  const faqs: FaqItem[] = [];
  const parts = section.split(/^###\s+/m).slice(1);
  for (const part of parts) {
    const newline = part.indexOf('\n');
    if (newline === -1) continue;
    const question = part.slice(0, newline).trim().replace(/\s+#+\s*$/, '');
    const rest = part.slice(newline + 1);
    // Stop at the next H2 (another section) if any.
    const answerBlock = rest.split(/^##\s+/m)[0];
    const paragraph = answerBlock
      .split(/\r?\n\r?\n/)
      .map((p) => p.trim())
      .find((p) => p.length > 0);
    if (!question || !paragraph) continue;
    const answer = paragraph
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[*_`]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    faqs.push({ question, answer });
  }
  return faqs;
}
