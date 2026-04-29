import {
  getHomepageBanners,
  type HomepageBanner,
} from "@/lib/api/public-read";

type CacheState = {
  value: HomepageBanner[];
  expiresAt: number;
};

const cache = new Map<string, CacheState>();

function makeKey(init?: { baseUrl?: string }) {
  return init?.baseUrl ?? "";
}

/** Server-side TTL cache for public homepage-banner list. */
export async function getHomepageBannersCached(
  init?: Parameters<typeof getHomepageBanners>[0],
  ttlMs: number = 5 * 60 * 1000,
): Promise<{ ok: true; banners: HomepageBanner[] }> {
  const key = makeKey(init);
  const now = Date.now();
  const hit = cache.get(key);
  if (hit && hit.expiresAt > now) {
    return { ok: true, banners: hit.value };
  }

  const res = await getHomepageBanners(init);
  const banners = res.banners ?? [];
  cache.set(key, { value: banners, expiresAt: now + ttlMs });
  return { ok: true, banners };
}
