import {
  getFeaturedProducts,
  type FeaturedProduct,
} from "@/lib/api/public-read";
import { getPublicContentCacheTtlMs } from "@/lib/data/cache-ttl";

type CacheState = {
  value: FeaturedProduct[];
  expiresAt: number;
};

const cache = new Map<string, CacheState>();

function makeKey(params?: { take?: number }, init?: { baseUrl?: string }) {
  const base = init?.baseUrl ?? "";
  const take = params?.take ?? 8;
  return `${base}|take=${take}`;
}

/** Server-side TTL cache for public featured-products (homepage BusinessSwiper). */
export async function getFeaturedProductsCached(
  params?: Parameters<typeof getFeaturedProducts>[0],
  init?: Parameters<typeof getFeaturedProducts>[1],
  ttlMs: number = getPublicContentCacheTtlMs(),
): Promise<{ ok: true; items: FeaturedProduct[] }> {
  const key = makeKey(params, init);
  const now = Date.now();
  const hit = cache.get(key);
  if (hit && hit.expiresAt > now) {
    return { ok: true, items: hit.value };
  }

  const res = await getFeaturedProducts(params, init);
  const items = res.items ?? [];
  cache.set(key, { value: items, expiresAt: now + ttlMs });
  return { ok: true, items };
}
