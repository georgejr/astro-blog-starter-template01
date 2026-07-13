// Per-article OG image endpoint. getStaticPaths emits one /og/<slug>.png for
// each PUBLISHED article (scheduled/draft articles get no image, matching the
// rest of the site). The image is generated at build time.
import type { APIRoute } from 'astro';
import { getPublishedPosts } from '../../lib/content';
import { articleSlug } from '../../lib/publishing';
import { renderOgPng } from '../../lib/og-image';

export async function getStaticPaths() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({
    params: { slug: articleSlug(post) },
    props: {
      title: post.data.title,
      category: post.data.category,
      stat: post.data.ogStat,
    },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOgPng(props as { title: string; category: string; stat?: { value: string; label: string } });
  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
