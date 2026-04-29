import { getContactInfos, type ContactInfo } from "@/lib/api/public-read";
import { getPublicContentCacheTtlMs } from "@/lib/data/cache-ttl";

type CacheState = {
  value: ContactInfo[];
  expiresAt: number;
};

const cacheByBaseUrl = new Map<string, CacheState>();

function cacheKey(init?: Parameters<typeof getContactInfos>[0]) {
  return init?.baseUrl ?? "";
}

/**
 * Server-side in-memory cache for public contact list (all locales).
 * Keyed by `init.baseUrl`; same TTL pattern as {@link getPublicConfigCached}.
 */
export async function getContactsCached(
  init?: Parameters<typeof getContactInfos>[0],
  ttlMs: number = getPublicContentCacheTtlMs(),
): Promise<ContactInfo[]> {
  const key = cacheKey(init);
  const now = Date.now();
  const hit = cacheByBaseUrl.get(key);
  if (hit && hit.expiresAt > now) return hit.value;

  try {
    const res = await getContactInfos(init);
    const value = res.contacts ?? [];
    cacheByBaseUrl.set(key, { value, expiresAt: now + ttlMs });
    return value;
  } catch {
    // Keep serving last good value on transient upstream failures.
    if (hit) return hit.value;
    return [];
  }
}
