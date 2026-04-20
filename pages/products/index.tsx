import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Outfit } from "next/font/google";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { LazyImage } from "@/components/lazy-image";
import { MotionRevealUp } from "@/components/animated-text";
import { products } from "@/constants/products";

const outfit = Outfit({ subsets: ["latin"] });

const productList = Object.values(products);

export default function ProductsArchive() {
  const router = useRouter();
  const locale = (router.query.lang as string) || "zh-HK";

  const isEn = locale === "en";

  const pageTitle = isEn
    ? "Products | CraneR Technology - Smart Construction Solutions"
    : "產品矩陣 | 可越科技 CraneR - 智能建造解決方案";

  const pageDesc = isEn
    ? "Explore CraneR's full-stack intelligent construction product suite — AI tower crane systems, path planning engines, and site safety monitoring."
    : "探索可越科技全棧智能建造產品矩陣——智能天秤系統、路徑規劃引擎與地盤安全監控。";

  return (
    <div className={`min-h-screen bg-white ${outfit.className}`}>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="robots" content="index, follow" />
      </Head>

      <Nav />

      {/* Hero */}
      <div className="w-full bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <MotionRevealUp>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-blue-400" />
              <span className="text-blue-400 font-bold text-sm uppercase tracking-[0.2em]">
                {isEn ? "Product Matrix" : "產品矩陣"}
              </span>
              <div className="w-8 h-px bg-blue-400" />
            </div>
          </MotionRevealUp>
          <MotionRevealUp delay={0.1}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
              {isEn
                ? "Full-Stack Smart Construction Solutions"
                : "全棧智能建造解決方案"}
            </h1>
          </MotionRevealUp>
          <MotionRevealUp delay={0.2}>
            <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
              {isEn
                ? "From perception and planning to safety monitoring, CraneR delivers an integrated product suite covering the full intelligence lifecycle of tower crane operations."
                : "從感知、規劃到安全監控，CraneR 提供覆蓋天秤智能化全流程的系統產品。"}
            </p>
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
          <svg className="w-4 h-4 mr-1.5 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {isEn ? "Back to Home" : "返回主頁"}
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productList.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeInOut", delay: idx * 0.08 }}
              className="flex h-full"
            >
              <Link
                href={`/products/${product.id}?lang=${locale}`}
                className="group flex flex-col w-full rounded-2xl overflow-hidden border border-slate-100 bg-white hover:bg-slate-50 hover:shadow-xl hover:border-blue-100 transition-all duration-500 h-full"
              >
                {/* Cover Image */}
                <div className="relative h-52 overflow-hidden bg-slate-100 flex-shrink-0">
                  <LazyImage
                    src={product.coverImage}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-600/85 text-white backdrop-blur-sm">
                      {product.label}
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
                    {product.stats.slice(0, 2).map((stat) => (
                      <div key={stat.label}>
                        <p className="text-xl font-bold text-blue-600">{stat.value}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
                    {isEn ? "Learn More" : "了解詳情"}
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
