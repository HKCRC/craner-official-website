import { getConfig, type Config } from "@/lib/api/public-read";

type CacheState = {
  value: Config;
  expiresAt: number;
};

const cacheByBaseUrl = new Map<string, CacheState>();

function cacheKey(init?: Parameters<typeof getConfig>[0]) {
  return init?.baseUrl ?? "";
}

/**
 * Server-side in-memory cache for public config.
 * - Keyed by `init.baseUrl` so different upstream origins do not collide
 * - TTL-based to avoid stale config forever
 */
export async function getPublicConfigCached(
  init?: Parameters<typeof getConfig>[0],
  ttlMs: number = 5 * 60 * 1000,
): Promise<Config> {
  const key = cacheKey(init);
  const now = Date.now();
  const hit = cacheByBaseUrl.get(key);
  if (hit && hit.expiresAt > now) return hit.value;

  const res = await getConfig(init);
  const value = res.data ?? {};
  cacheByBaseUrl.set(key, { value, expiresAt: now + ttlMs });
  return value;
}

