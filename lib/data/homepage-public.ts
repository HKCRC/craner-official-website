import {
  getContactInfos,
  getFeaturedProducts,
  getHomepageBanners,
  getProducts,
  ProductListItem,
  type ContactInfo,
  type FeaturedProduct,
  type HomepageBanner,
} from "@/lib/api/public-read";

export type HomePagePublicPayload = {
  banners: HomepageBanner[];
  featuredProducts: FeaturedProduct[];
  products: ProductListItem[];
  contacts: ContactInfo[];
};

/**
 * 首页公开数据：在 getServerSideProps 里按请求拉取，内部用 Promise.allSettled 并行请求，
 * 单个接口失败不影响其它字段（降级为空数组），避免整页 500。
 */
export async function loadHomePagePublicData(init?: {
  baseUrl?: string;
}): Promise<HomePagePublicPayload> {
  const fetchInit = init?.baseUrl ? { baseUrl: init.baseUrl } : {};

  const [bannersRes, productsRes, featuredRes, contactsRes] = await Promise.allSettled([
    getHomepageBanners(fetchInit),
    getProducts({ pageSize: 8 }, fetchInit),
    getFeaturedProducts({ take: 8 }, fetchInit),
    getContactInfos(fetchInit),
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
  };
}
