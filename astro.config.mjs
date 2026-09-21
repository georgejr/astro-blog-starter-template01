// @ts-check
import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import rehypeExternalLinks from './src/lib/rehype-external-links.mjs';

// Keep in sync with SITE_URL in src/lib/site.ts (see docs/handover.md).
const SITE_URL = 'https://sunmetriclab.com';

// Outbound-link rules for article Markdown (rel/target), see docs/linking.md.
const externalLinks = JSON.parse(
  readFileSync(new URL('./src/data/external-links.json', import.meta.url), 'utf8'),
);

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  integrations: [
    sitemap({
      // Embeddable widgets are noindex (canonical is the public calculator
      // page) and generated images are not pages.
      filter: (page) => !page.includes('/embed/') && !page.includes('/og/'),
    }),
  ],
  markdown: {
    rehypePlugins: [[rehypeExternalLinks, { siteUrl: SITE_URL, ...externalLinks }]],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
