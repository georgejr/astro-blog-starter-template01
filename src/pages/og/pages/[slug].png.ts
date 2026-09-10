// Share images for non-article pages (site card, calculators, state and city
// cost pages). One /og/pages/<slug>.png per entry in src/lib/og-pages.ts,
// generated at build time with the same renderer as the article cards.
import type { APIRoute } from 'astro';
import { OG_PAGES } from '../../../lib/og-pages';
import { renderOgPng, type OgOptions } from '../../../lib/og-image';

export function getStaticPaths() {
  return OG_PAGES.map(({ slug, ...props }) => ({ params: { slug }, props }));
}

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOgPng(props as OgOptions);
  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
