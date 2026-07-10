// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// TODO: replace with the production domain before deploying to Cloudflare Pages.
const SITE_URL = 'https://example-solar-calculator.pages.dev';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
