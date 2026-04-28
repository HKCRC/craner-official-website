/**
 * Public read-only API client (no auth).
 * Base path: same-origin `/api/...` (see project env for SSR absolute URL).
 */

export type PublicApiLocale = "EN" | "ZH_HANS" | "ZH_HANT";

export type Paginated<T> = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  category: string;
  items: T[];
};

export type PostCategoryRef = { name: string; slug: string };

export type PostListItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  client: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  coverImageUrl: string | null;
  categories: PostCategoryRef[];
};

export type PostDetail = PostListItem & {
  content: string;
};

export type PostsByCategoryResponse = Paginated<PostListItem> & {
  category: {
    id: string;
    name: string;
    slug: string;
    title: string;
    subtitle: string;
    description: string;
  };
};

export type ProductListItem = {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  coverImageUrl: string | null;
  categories: PostCategoryRef[];
  featureList: Array<{
    label: string;
    value: string;
  }>;
};

export type ProductDetail = ProductListItem & {
  blocks: ProductBlock[];
};

export type ProductBlock =
  | ProductTextImageBlock
  | ProductFullImageBlock
  | ProductImageImageBlock
  | ProductQABlock;

export type ProductTextImageBlock = {
  id: string;
  type: "text-image";
  layout: "text-left" | "text-right";
  text: {
    heading: string;
    subheading?: string;
    description?: string;
  };
  images: { url: string }[];
};

export type ProductFullImageBlock = {
  id: string;
  type: "full-image";
  image: { url: string };
};

export type ProductImageImageBlock = {
  id: string;
  type: "image-image";
  left: { url: string };
  right: { url: string };
};

export type ProductQABlock = {
  id: string;
  type: "qa";
  question: string;
  answer: string;
};

export type HomepageBannerCarouselContent = {
  slides: Array<{ title: string; subtitle: string; imageUrl: string }>;
};

export type HomepageBannerVideoContent = {
  title: string;
  subtitle: string;
  videoUrl: string;
};

export type HomepageBanner =
  | {
      locale: PublicApiLocale;
      template: "CAROUSEL";
      content: HomepageBannerCarouselContent;
    }
  | {
      locale: PublicApiLocale;
      template: "VIDEO";
      content: HomepageBannerVideoContent;
    };

export type ContactInfo = {
  locale: PublicApiLocale;
  address1Region: string;
  address1Detail: string;
  address2Region: string;
  address2Detail: string;
  phone: string;
  email: string;
  qrCodes: Array<{ label: string; imageUrl: string }>;
  socialLinks: Array<{ platform: string; url: string }>;
};

export type Config = Record<string, string>;

export type FeaturedProductMedia =
  | { type: "carousel"; images: string[] }
  | { type: "video"; url: string };

export type FeaturedProduct = {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  productName: string;
  tags: string[];
  media: FeaturedProductMedia;
  featureList: Array<{
    label: string;
    value: string;
  }>;
};

export type PublicApiErrorBody = { ok: false; error: string };

export type PaginationQuery = {
  page?: number;
  pageSize?: number;
};

export class PublicApiError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.name = "PublicApiError";
    this.status = status;
    this.body = body;
  }
}

export type PublicReadFetchOptions = RequestInit & {
  /** Use in SSR when relative `/api` is not resolvable (e.g. set full site origin). */
  baseUrl?: string;
};

function defaultBaseUrl(): string {
  if (typeof window !== "undefined") return "";
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return process.env.REQUEST_BASE_URL || "";
}

function buildUrl(
  path: string,
  query?: Record<string, string | number | undefined>,
  baseUrl?: string
): string {
  const origin = baseUrl ?? defaultBaseUrl();
  const prefix = path.startsWith("/") ? path : `/${path}`;
  const url = origin ? `${origin}${prefix}` : prefix;
  if (!query) return url;
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) {
    if (v === undefined || v === "") continue;
    sp.set(k, String(v));
  }
  const qs = sp.toString();
  return qs ? `${url}?${qs}` : url;
}

async function readJson<T>(
  path: string,
  query: Record<string, string | number | undefined> | undefined,
  init: PublicReadFetchOptions | undefined
): Promise<T> {
  const { baseUrl, ...rest } = init ?? {};
  const url = buildUrl(path, query, baseUrl);
  const res = await fetch(url, {
    ...rest,
    headers: {
      Accept: "application/json",
      ...rest.headers,
    },
  });
  let body: unknown;
  try {
    body = await res.json();
  } catch {
    body = null;
  }
  if (!res.ok) {
    throw new PublicApiError(
      `Request failed: ${res.status} ${res.statusText}`,
      res.status,
      body
    );
  }
  return body as T;
}

function isNotFoundBody(body: unknown): body is PublicApiErrorBody {
  return (
    typeof body === "object" &&
    body !== null &&
    (body as PublicApiErrorBody).ok === false
  );
}

/** GET /api/posts */
export function getPosts(
  params?: PaginationQuery,
  init?: PublicReadFetchOptions
): Promise<Paginated<PostListItem>> {
  return readJson<Paginated<PostListItem>>(
    "/api/posts",
    { page: params?.page, pageSize: params?.pageSize },
    init
  );
}

/** GET /api/posts/:slug — returns null when not found */
export async function getPostBySlug(
  slug: string,
  init?: PublicReadFetchOptions
): Promise<PostDetail | null> {
  const { baseUrl, ...rest } = init ?? {};
  const url = buildUrl(
    `/api/posts/${encodeURIComponent(slug)}`,
    undefined,
    baseUrl
  );
  const res = await fetch(url, {
    ...rest,
    headers: {
      Accept: "application/json",
      ...rest.headers,
    },
  });
  const body: unknown = await res.json().catch(() => null);
  if (res.status === 404 && isNotFoundBody(body)) return null;
  if (!res.ok) {
    throw new PublicApiError(
      `Request failed: ${res.status} ${res.statusText}`,
      res.status,
      body
    );
  }
  if (isNotFoundBody(body)) return null;
  return (body as { ok: true; post: PostDetail }).post;
}

/** GET /api/posts/by-category/:categorySlug */
export function getPostsByCategory(
  categorySlug: string,
  params?: PaginationQuery,
  init?: PublicReadFetchOptions
): Promise<PostsByCategoryResponse> {
  return readJson<PostsByCategoryResponse>(
    `/api/posts/by-category/${encodeURIComponent(categorySlug)}`,
    { page: params?.page, pageSize: params?.pageSize },
    init
  );
}

/** GET /api/products */
export function getProducts(
  params?: (PaginationQuery & { category?: string; categorySlug?: string }) | undefined,
  init?: PublicReadFetchOptions,
): Promise<Paginated<ProductListItem>> {
  const category = params?.category ?? params?.categorySlug;
    
  return readJson<Paginated<ProductListItem>>(
    "/api/products",
    {
      page: params?.page,
      pageSize: params?.pageSize,
      category: category,
    },
    init
  );
}

/** GET /api/products/:slug — returns null when not found */
export async function getProductBySlug(
  slug: string,
  init?: PublicReadFetchOptions
): Promise<ProductDetail | null> {
  const { baseUrl, ...rest } = init ?? {};
  const url = buildUrl(
    `/api/products/${encodeURIComponent(slug)}`,
    undefined,
    baseUrl
  );
  const res = await fetch(url, {
    ...rest,
    headers: {
      Accept: "application/json",
      ...rest.headers,
    },
  });
  const body: unknown = await res.json().catch(() => null);
  if (res.status === 404 && isNotFoundBody(body)) return null;
  if (!res.ok) {
    throw new PublicApiError(
      `Request failed: ${res.status} ${res.statusText}`,
      res.status,
      body
    );
  }
  if (isNotFoundBody(body)) return null;
  if (
    typeof body === "object" &&
    body !== null &&
    (body as { ok?: unknown }).ok === true &&
    "product" in body
  ) {
    return (body as { ok: true; product: ProductDetail }).product;
  }
  return body as ProductDetail;
}

/** GET /api/public/homepage-banner */
export async function getHomepageBanners(
  init?: PublicReadFetchOptions
): Promise<{ ok: true; banners: HomepageBanner[] }> {
  return readJson("/api/public/homepage-banner", undefined, init);
}


/** GET /api/public/homepage-banner?locale= */
export async function getHomepageBannerByLocale(
  locale: PublicApiLocale,
  init?: PublicReadFetchOptions
): Promise<{ ok: true; banner: HomepageBanner } | null> {
  const { baseUrl, ...rest } = init ?? {};
  const url = buildUrl(
    "/api/public/homepage-banner",
    { locale },
    baseUrl
  );
  const res = await fetch(url, {
    ...rest,
    headers: {
      Accept: "application/json",
      ...rest.headers,
    },
  });
  const body: unknown = await res.json().catch(() => null);
  if (res.status === 404 && isNotFoundBody(body)) return null;
  if (!res.ok) {
    throw new PublicApiError(
      `Request failed: ${res.status} ${res.statusText}`,
      res.status,
      body
    );
  }
  if (isNotFoundBody(body)) return null;
  return body as { ok: true; banner: HomepageBanner };
}

/** GET /api/public/contact-info */
export async function getContactInfos(
  init?: PublicReadFetchOptions
): Promise<{ ok: true; contacts: ContactInfo[] }> {
  return readJson("/api/public/contact-info", undefined, init);
}

export async function getConfig(
  init?: PublicReadFetchOptions
): Promise<{ ok: true; data: Config }> {
  return readJson("/api/public/config", undefined, init);
}
/** GET /api/public/contact-info?locale= */
export async function getContactInfoByLocale(
  locale: PublicApiLocale,
  init?: PublicReadFetchOptions
): Promise<{ ok: true; contact: ContactInfo } | null> {
  const { baseUrl, ...rest } = init ?? {};
  const url = buildUrl("/api/public/contact-info", { locale }, baseUrl);
  const res = await fetch(url, {
    ...rest,
    headers: {
      Accept: "application/json",
      ...rest.headers,
    },
  });
  const body: unknown = await res.json().catch(() => null);
  if (res.status === 404 && isNotFoundBody(body)) return null;
  if (!res.ok) {
    throw new PublicApiError(
      `Request failed: ${res.status} ${res.statusText}`,
      res.status,
      body
    );
  }
  if (isNotFoundBody(body)) return null;
  return body as { ok: true; contact: ContactInfo };
}

/** GET /api/public/featured-products */
export function getFeaturedProducts(
  params?: { take?: number },
  init?: PublicReadFetchOptions
): Promise<{ ok: true; items: FeaturedProduct[] }> {
  return readJson("/api/public/featured-products", { take: params?.take }, init);
}
