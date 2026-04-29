import {
  Config,
  PostListItem,
  ProductListItem,
  type ContactInfo,
  type FeaturedProduct,
  type HomepageBanner,
} from "@/lib/api/public-read";
import { getContactsCached } from "@/lib/data/contacts-cache";
import { getFeaturedProductsCached } from "@/lib/data/featured-products-cache";
import { getHomepageBannersCached } from "@/lib/data/homepage-banners-cache";
import { getPostsByCategoryCached } from "@/lib/data/posts-by-category-cache";
import { getPublicConfigCached } from "@/lib/data/public-config-cache";
import { getProductsCached } from "@/lib/data/products-cache";

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
  currentLang?: string;
}): Promise<HomePagePublicPayload> {
  const fetchInit = init?.baseUrl ? { baseUrl: init.baseUrl } : {};
  const currentLang = `${init?.currentLang ? `-${init?.currentLang}` : ""}`;

  const [
    bannersRes,
    productsRes,
    featuredRes,
    contactsRes,
    configRes,
    casesRes,
    articlesRes,
  ] = await Promise.allSettled([
    getHomepageBannersCached(fetchInit),
    getProductsCached({ pageSize: 8 }, fetchInit, undefined, `product${currentLang}`),
    getFeaturedProductsCached({ take: 8 }, fetchInit),
    getContactsCached(fetchInit),
    getPublicConfigCached(fetchInit),
    getPostsByCategoryCached(`cases${currentLang}`, { pageSize: 8 }, fetchInit),
    getPostsByCategoryCached(`news${currentLang}`, { pageSize: 8 }, fetchInit),
  ]); 

  return {
    banners:
      bannersRes.status === "fulfilled" ? bannersRes.value.banners : [],
    products:
      productsRes.status === "fulfilled" ? productsRes.value.items : [],
    featuredProducts:
      featuredRes.status === "fulfilled" ? featuredRes.value.items : [],
    contacts:
      contactsRes.status === "fulfilled" ? contactsRes.value : [],
    config:
      configRes.status === "fulfilled" ? configRes.value : {},
    cases:
      casesRes.status === "fulfilled" ? casesRes.value.items : [],
    articles:
      articlesRes.status === "fulfilled" ? articlesRes.value.items : [],
  };
}
