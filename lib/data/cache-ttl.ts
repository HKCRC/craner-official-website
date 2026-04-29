const CONTENT_TTL_MS_DEFAULT = 60 * 1000;
const CONFIG_TTL_MS_DEFAULT = 5 * 60 * 1000;

function parseMs(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return Math.floor(parsed);
}

export function getPublicContentCacheTtlMs(): number {
  return parseMs(process.env.PUBLIC_CONTENT_CACHE_TTL_MS, CONTENT_TTL_MS_DEFAULT);
}

export function getPublicConfigCacheTtlMs(): number {
  return parseMs(process.env.PUBLIC_CONFIG_CACHE_TTL_MS, CONFIG_TTL_MS_DEFAULT);
}
