import { getConfig, type Config } from "@/lib/api/public-read";

type CacheState = {
  value: Config | null;
  expiresAt: number;
};

let cache: CacheState = {
  value: null,
  expiresAt: 0,
};

/**
 * Server-side in-memory cache for public config.
 * - Shared across requests within the same Node process
 * - TTL-based to avoid stale config forever
 */
export async function getPublicConfigCached(
  init?: Parameters<typeof getConfig>[0],
  ttlMs: number = 5 * 60 * 1000,
): Promise<Config> {
  const now = Date.now();
  if (cache.value && cache.expiresAt > now) return cache.value;

  const res = await getConfig(init);
  cache = {
    value: res.data ?? {},
    expiresAt: now + ttlMs,
  };
  return cache.value ?? {};
}

