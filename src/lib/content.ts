// Astro-facing wrapper around the pure publishing logic. Every page, feed
// and component must get articles through these helpers — never call
// getCollection('blog') directly elsewhere, so the published-only filter and
// the single BUILD_TIME cutoff cannot be bypassed.
import { getCollection, type CollectionEntry } from 'astro:content';
import {
  BUILD_TIME,
  buildRoutePaths,
  buildRssItems,
  getRelatedArticles,
  prevNext,
  publishedSorted,
} from './publishing';

export { BUILD_TIME, articlePath, articleSlug, isPublished } from './publishing';

export type BlogEntry = CollectionEntry<'blog'>;

/** All published articles, newest first. */
export async function getPublishedPosts(now: Date = BUILD_TIME): Promise<BlogEntry[]> {
  return publishedSorted(await getCollection('blog'), now);
}

/** getStaticPaths() entries for published articles only. */
export async function getPublishedPaths(now: Date = BUILD_TIME) {
  return buildRoutePaths(await getCollection('blog'), now);
}

/** RSS items for published articles only. */
export async function getRssItems(now: Date = BUILD_TIME) {
  return buildRssItems(await getCollection('blog'), now);
}

/** Chronological previous/next within the published set. */
export async function getPrevNext(current: BlogEntry, now: Date = BUILD_TIME) {
  return prevNext(await getCollection('blog'), current, now);
}

/** Explicit + score-based related articles, published set only. */
export async function getRelatedForPost(
  current: BlogEntry,
  now: Date = BUILD_TIME,
  max = 6,
): Promise<BlogEntry[]> {
  return getRelatedArticles(current, await getCollection('blog'), now, max);
}
