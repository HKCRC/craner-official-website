import {
  getPostsByCategory,
  type PostsByCategoryResponse,
} from "@/lib/api/public-read";

type CacheState = {
  value: PostsByCategoryResponse;
  expiresAt: number;
};

const cache = new Map<string, CacheState>();

function makeKey(
  categorySlug: string,
  params?: { page?: number; pageSize?: number },
  init?: { baseUrl?: string },
) {
  const base = init?.baseUrl ?? "";
  const page = params?.page ?? 1;
  const pageSize = params?.pageSize ?? "";
  return `${base}|${categorySlug}|p=${page}|ps=${pageSize}`;
}

/**
 * Server-side in-memory cache for posts-by-category list (cases / news archives).
 * Keyed by baseUrl + slug + pagination so homepage and list pages share warm cache.
 */
export async function getPostsByCategoryCached(
  categorySlug: string,
  params?: Parameters<typeof getPostsByCategory>[1],
  init?: Parameters<typeof getPostsByCategory>[2],
  ttlMs: number = 5 * 60 * 1000,
): Promise<PostsByCategoryResponse> {
  const key = makeKey(categorySlug, params, init);
  const now = Date.now();
  const hit = cache.get(key);
  if (hit && hit.expiresAt > now) return hit.value;

  const value = await getPostsByCategory(categorySlug, params, init);
  cache.set(key, { value, expiresAt: now + ttlMs });
  return value;
}
