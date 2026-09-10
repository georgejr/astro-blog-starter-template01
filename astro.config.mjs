// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const SITE_URL = 'https://sunmetriclab.com';

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
  vite: {
    plugins: [tailwindcss()],
  },
});
