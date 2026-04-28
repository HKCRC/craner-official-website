import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Outfit } from "next/font/google";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { LazyImage } from "@/components/lazy-image";
import { MotionRevealUp } from "@/components/animated-text";
import { GetServerSideProps } from "next";
import {
  type Config,
  type Paginated,
  type ProductListItem,
} from "@/lib/api/public-read";
import { getProductsCached } from "@/lib/data/products-cache";
import { getImageUrl, langToCategory } from "@/lib/helper";
import { usePublicConfig } from "@/lib/public-config-context";
import { getPublicConfigCached } from "@/lib/data/public-config-cache";
import { useTranslation } from "next-export-i18n";

const outfit = Outfit({ subsets: ["latin"] });

export default function ProductsArchive({
  products,
}: {
  products: Paginated<ProductListItem>;
}) {
  const router = useRouter();
  const locale = (router.query.lang as string) || "zh-HK";
  const config = usePublicConfig();
  const productList = products.items;
  const { t } = useTranslation();
  const renderTitleAndSubTitle = () => {
    switch (locale) {
      case "en":
        return {
          title: config?.["product_title_en"],
          subtitle: config?.["product_subtitle_en"],
          tag: config?.["product_tag_en"],
        };
      case "zh-HK":
        return {
          title: config?.["product_title_chhk"],
          subtitle: config?.["product_subtitle_chhk"],
          tag: config?.["product_tag_chhk"],
        };
      default:
        return {
          title: config?.["product_title_ch"],
          subtitle: config?.["product_subtitle_ch"],
          tag: config?.["product_tag_ch"],
        };
    }
  };

  return (
    <div className={`min-h-screen bg-white ${outfit.className}`}>
      <Head>
        <title>{renderTitleAndSubTitle()?.title}</title>
        <meta name="description" content={renderTitleAndSubTitle()?.subtitle} />
        <meta name="robots" content="index, follow" />
      </Head>

      <Nav />

      <div className="w-full bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <MotionRevealUp>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-blue-400" />
              <span className="text-blue-400 font-bold text-sm uppercase tracking-[0.2em]">
                {renderTitleAndSubTitle()?.tag}
              </span>
              <div className="w-8 h-px bg-blue-400" />
            </div>
          </MotionRevealUp>
          <MotionRevealUp delay={0.1}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
              {renderTitleAndSubTitle()?.title}
            </h1>
          </MotionRevealUp>
        </div>
      </div>

      {/* Products List */}
      <div className="max-w-6xl mx-auto px-6 md:px-6 py-16">
        {/* Back to home */}
        <Link
          href={`/?lang=${locale}`}
          className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 mb-12 transition-colors group"
        >
          <svg
            className="w-4 h-4 mr-1.5 transition-transform group-hover:-translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {t("back_home") || "返回主页"}
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productList.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full col-span-full">
              <p className="text-gray-500 font-light text-center">
                {t("no_products_found") || "没有找到产品"}
              </p>
            </div>
          )}

          {productList.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                ease: "easeInOut",
                delay: idx * 0.08,
              }}
              className="flex h-full"
            >
              <Link
                href={`/products/${product.slug}?lang=${locale}`}
                className="group flex flex-col w-full rounded-2xl overflow-hidden border border-slate-100 bg-white hover:bg-slate-50 hover:shadow-xl hover:border-blue-100 transition-all duration-500 h-full"
              >
                {/* Cover Image */}
                <div className="relative h-52 overflow-hidden bg-slate-100 flex-shrink-0">
                  <LazyImage
                    src={getImageUrl(product.coverImageUrl ?? "")}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-600/85 text-white backdrop-blur-sm">
                      {product.slug}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-col flex-1 p-6">
                  <h2 className="text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                    {product.title}
                  </h2>
                  <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-5">
                    {product.subtitle}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-5 mb-5">
                    {product.featureList.slice(0, 2).map((stat) => (
                      <div key={stat.label}>
                        <p className="text-xl font-bold text-blue-600">
                          {stat.value}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
                    {renderTitleAndSubTitle()?.title}
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  products: Paginated<ProductListItem>;
  config: Config;
}> = async (ctx) => {
  const category = langToCategory(ctx.query.lang as string);
  const products = await getProductsCached(
    { pageSize: 8 },
    { baseUrl: process.env.REQUEST_BASE_URL },
    undefined,
    `product-${category}`,
  );
  const config = await getPublicConfigCached({
    baseUrl: process.env.REQUEST_BASE_URL,
  });
  return {
    props: { products, config },
  };
};
