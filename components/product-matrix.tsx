import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { LazyImage } from "./lazy-image";
import { products } from "@/constants/products";

const productList = Object.values(products);

const ArrowIcon = () => (
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
);

export const ProductMatrix = () => {
  const router = useRouter();
  const locale = (router.query.lang as string) || "zh-HK";
  const isEn = locale === "en";

  return (
    <section className="w-full py-20 px-6 md:px-0">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="mb-14"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 text-center">
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="w-8 h-px bg-blue-300" />
                <span className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em]">
                  {isEn ? "Product Matrix" : "產品矩陣"}
                </span>
                <div className="w-8 h-px bg-blue-300" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                {isEn ? "Full-Stack Smart Construction Solutions" : "全棧智能建造解決方案"}
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto text-base leading-relaxed">
                {isEn
                  ? "From perception and planning to safety monitoring, CraneR delivers an integrated product suite covering the full intelligence lifecycle."
                  : "從感知、規劃到安全監控，CraneR 提供覆蓋天秤智能化全流程的系統產品"}
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <Link
              href={`/products?lang=${locale}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group"
            >
              {isEn ? "View All Products" : "查看全部產品"}
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </motion.div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            >
              <Link
                href={`/products/${product.id}?lang=${locale}`}
                className="group flex flex-col rounded-2xl overflow-hidden border border-slate-100 bg-white hover:shadow-xl hover:border-blue-100 transition-all duration-300 h-full"
              >
                {/* Card Image */}
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  <LazyImage
                    src={product.coverImage}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {/* Label badge */}
                  <div className="absolute top-3 left-3">
                    <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-600/85 text-white backdrop-blur-sm">
                      {product.label}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                    {product.title}
                  </h3>
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
                  Stats row
                  <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-5">
                    {product.stats.slice(0, 2).map((stat) => (
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
                  <div className="flex items-center gap-1.5 mt-5 text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                    了解詳情
                    <ArrowIcon />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
