import { getProducts, type Paginated, type ProductListItem } from "@/lib/api/public-read";

type CacheState<T> = {
  value: T;
  expiresAt: number;
};

const cache = new Map<string, CacheState<Paginated<ProductListItem>>>();

function makeKey(
  params?: { page?: number; pageSize?: number },
  init?: { baseUrl?: string },
  categorySlug?: string,
) {
  const baseUrl = init?.baseUrl ?? "";
  const page = params?.page ?? "";
  const pageSize = params?.pageSize ?? "";
  const category = categorySlug ?? "";
  return `baseUrl=${baseUrl};page=${page};pageSize=${pageSize};category=${category}`;
}

/**
 * Server-side in-memory cache for products list.
 * - Shared across requests within the same Node process
 * - TTL-based to keep data reasonably fresh
 * - categorySlug is optional, if provided, only products in the category will be returned
 */
export async function getProductsCached(
  params?: Parameters<typeof getProducts>[0],
  init?: Parameters<typeof getProducts>[1],
  ttlMs: number = 5 * 60 * 1000,
  categorySlug?: string,
): Promise<Paginated<ProductListItem>> {

  const key = makeKey(params, init, categorySlug);
  const now = Date.now();
  const hit = cache.get(key);
  if (hit && hit.expiresAt > now) return hit.value;
  
  const res = await getProducts(
    { ...(params ?? {}), category: categorySlug?.toString() },
    init,
  );

  cache.set(key, { value: res, expiresAt: now + ttlMs });
  return res;
}

