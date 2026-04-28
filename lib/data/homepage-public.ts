import {
  Config,
  getContactInfos,
  getFeaturedProducts,
  getHomepageBanners,
  getPostsByCategory,
  getProducts,
  PostListItem,
  ProductListItem,
  type ContactInfo,
  type FeaturedProduct,
  type HomepageBanner,
} from "@/lib/api/public-read";
import { getPublicConfigCached } from "@/lib/data/public-config-cache";

export type HomePagePublicPayload = {
  banners: HomepageBanner[];
  featuredProducts: FeaturedProduct[];
  products: ProductListItem[];  
  contacts: ContactInfo[];
  config: Config;
  cases: PostListItem[];
  articles: PostListItem[];
};

/**
 * 首页公开数据：在 getServerSideProps 里按请求拉取，内部用 Promise.allSettled 并行请求，
 * 单个接口失败不影响其它字段（降级为空数组），避免整页 500。
 */
export async function loadHomePagePublicData(init?: {
  baseUrl?: string;
}): Promise<HomePagePublicPayload> {
  const fetchInit = init?.baseUrl ? { baseUrl: init.baseUrl } : {};

  const [bannersRes, productsRes, featuredRes, contactsRes, configRes, casesRes, articlesRes] = await Promise.allSettled([
    getHomepageBanners(fetchInit),
    getProducts({ pageSize: 8 }, fetchInit),
    getFeaturedProducts({ take: 8 }, fetchInit),
    getContactInfos(fetchInit),
    getPublicConfigCached(fetchInit),
    getPostsByCategory("cases", { pageSize: 8 }, fetchInit),
    getPostsByCategory("news", { pageSize: 8 }, fetchInit),
  ]); 

  return {
    banners:
      bannersRes.status === "fulfilled" ? bannersRes.value.banners : [],
    products:
      productsRes.status === "fulfilled" ? productsRes.value.items : [],
    featuredProducts:
      featuredRes.status === "fulfilled" ? featuredRes.value.items : [],
    contacts:
      contactsRes.status === "fulfilled" ? contactsRes.value.contacts : [],
    config:
      configRes.status === "fulfilled" ? configRes.value : {},
    cases:
      casesRes.status === "fulfilled" ? casesRes.value.items : [],
    articles:
      articlesRes.status === "fulfilled" ? articlesRes.value.items : [],
  };
}
