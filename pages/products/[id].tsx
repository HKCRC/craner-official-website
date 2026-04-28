import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LazyImage } from "@/components/lazy-image";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { MotionRevealUp } from "@/components/animated-text";
import {
  getProductBySlug,
  type ProductBlock,
  type Config,
  type ProductDetail,
  type ProductQABlock,
} from "@/lib/api/public-read";
import { getImageUrl } from "@/lib/helper";
import { getPublicConfigCached } from "@/lib/data/public-config-cache";
import { getProductsCached } from "@/lib/data/products-cache";
import type { Paginated, ProductListItem } from "@/lib/api/public-read";

interface ProductPageProps {
  id: string;
}

function isQABlock(block: ProductBlock): block is ProductQABlock {
  return block.type === "qa";
}

function ImageCarousel({
  images,
}: {
  images: { src: string; alt: string; caption?: string }[];
}) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <div className="w-full">
      {/* Main image */}
      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <LazyImage
              src={images[current].src}
              alt={images[current].alt}
              className="w-full h-full object-cover"
            />
            {images[current].caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-6 pb-5 pt-10">
                <p className="text-white text-sm font-medium">
                  {images[current].caption}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Prev / Next arrows */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm flex items-center justify-center transition-colors"
          aria-label="Previous"
        >
          <svg
            className="w-4 h-4 text-white"
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
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm flex items-center justify-center transition-colors"
          aria-label="Next"
        >
          <svg
            className="w-4 h-4 text-white"
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
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-4 right-5 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all ${
                i === current ? "bg-white w-5 h-2" : "bg-white/50 w-2 h-2"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 mt-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`relative flex-1 aspect-video rounded-lg overflow-hidden transition-all ${
              i === current
                ? "ring-2 ring-blue-500"
                : "opacity-60 hover:opacity-90"
            }`}
          >
            <LazyImage
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-b-0">
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="text-slate-800 font-medium text-base group-hover:text-blue-600 transition-colors">
          {question}
        </span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 group-hover:bg-blue-50 flex items-center justify-center transition-colors"
        >
          <svg
            className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M12 5v14M5 12h14"
            />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-slate-500 text-sm leading-relaxed pb-5">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductPage({ product }: { product: ProductDetail }) {
  const router = useRouter();
  const locale = (router.query.lang as string) || "zh-HK";

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>{product.title} | CraneR Technology</title>
        <meta name="description" content={product.subtitle} />
      </Head>

      <Nav />

      {/* Hero Banner */}
      <div className="relative w-full h-[360px] md:h-[460px] overflow-hidden">
        <LazyImage
          src={getImageUrl(product.coverImageUrl ?? "")}
          alt={product.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-10 max-w-6xl mx-auto left-0 right-0">
          <div className="mb-3 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-600/80 text-white backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-blue-300 text-sm font-semibold uppercase tracking-[0.15em] mb-2">
            {product.slug}
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-2xl">
            {product.title}
          </h1>
        </div>
      </div>

      {/* Sticky stats bar */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-6 md:px-0">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-blue-500/50">
            {product.featureList.map((feature) => (
              <div key={feature.label} className="px-6 py-4 text-center">
                <p className="text-2xl md:text-3xl font-bold">
                  {feature.value}
                </p>
                <p className="text-blue-200 text-xs mt-0.5">{feature.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20">
        {/* Back link */}
        <Link
          href={`/products?lang=${locale}`}
          className="inline-flex items-center text-sm text-gray-400 hover:text-blue-600 mb-12 transition-colors group"
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
          {locale === "en" ? "Back to Products" : "返回產品列表"}
        </Link>

        {/* Carousel + intro */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-20">
          <div className="lg:w-3/5">
            <LazyImage
              src={getImageUrl(product.coverImageUrl ?? "")}
              alt={product.title}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <MotionRevealUp
            delay={0.15}
            className="lg:w-2/5 flex flex-col justify-center"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1.5 h-6 bg-blue-600 shrink-0" />
              <span className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em]">
                產品概覽
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5 leading-snug">
              {product.title}
            </h2>
            <p className="text-slate-500 leading-relaxed text-base mb-8">
              {product.subtitle}
            </p>
            <div className="flex flex-col gap-3">
              {product.tags.map((tag) => (
                <div key={tag} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span className="text-slate-600 text-sm">{tag}</span>
                </div>
              ))}
            </div>
          </MotionRevealUp>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-20" />

        {/* Alternating Content Sections */}
        <div className="space-y-24 mb-24">
          {product.blocks
            .filter((block) => block.type !== "qa")
            .map((block, idx) => {
              switch (block.type) {
                case "text-image": {
                  const isImageLeft = block.layout === "text-left";
                  const images = block.images ?? [];
                  const hasCarousel = images.length > 1;

                  return (
                    <MotionRevealUp key={block.id}>
                      <div
                        className={`flex flex-col ${
                          isImageLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                        } gap-12 lg:gap-16 items-center my-5`}
                      >
                        {/* Image */}
                        {hasCarousel ? (
                          <div className="w-full lg:w-1/2">
                            <ImageCarousel
                              images={images.map((image) => ({
                                src: getImageUrl(image.url),
                                alt: block.text.heading,
                              }))}
                            />
                          </div>
                        ) : (
                          <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 flex-shrink-0">
                            <LazyImage
                              src={getImageUrl(images[0]?.url ?? "")}
                              alt={block.text.heading}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        {/* Text */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-4">
                            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                              {idx + 1}
                            </span>
                            <div className="w-8 h-px bg-blue-300" />
                          </div>
                          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 leading-snug">
                            {block.text.heading}
                          </h3>
                          {block.text.subheading && (
                            <p className="text-slate-500 leading-relaxed text-base mb-4">
                              {block.text.subheading}
                            </p>
                          )}
                          <div className="space-y-4">
                            {block.text.description
                              ?.split("\n\n")
                              .map((para, pIdx) => (
                                <p
                                  key={pIdx}
                                  className="text-slate-500 leading-relaxed text-[0.95rem]"
                                >
                                  {para}
                                </p>
                              ))}
                          </div>
                        </div>
                      </div>
                    </MotionRevealUp>
                  );
                }

                case "full-image": {
                  return (
                    <MotionRevealUp key={block.id}>
                      <div className="w-full rounded-2xl overflow-hidden bg-slate-100">
                        <LazyImage
                          src={getImageUrl(block.image.url)}
                          alt={product.title}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    </MotionRevealUp>
                  );
                }

                case "image-image": {
                  return (
                    <MotionRevealUp key={block.id}>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="rounded-2xl overflow-hidden bg-slate-100 aspect-[4/3]">
                          <LazyImage
                            src={getImageUrl(block.left.url)}
                            alt={`${product.title} left`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="rounded-2xl overflow-hidden bg-slate-100 aspect-[4/3]">
                          <LazyImage
                            src={getImageUrl(block.right.url)}
                            alt={`${product.title} right`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </MotionRevealUp>
                  );
                }

                default:
                  return null;
              }
            })}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-20" />

        {/* FAQ Section */}
        <MotionRevealUp>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-8 h-px bg-blue-300" />
                <span className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em]">
                  FAQ
                </span>
                <div className="w-8 h-px bg-blue-300" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                常見問題解答
              </h2>
              <p className="text-slate-400 text-sm">
                如有其他疑問，歡迎聯絡我們的銷售及技術團隊
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white px-6 md:px-8">
              {product.blocks.filter(isQABlock).map((block, idx) => (
                <FAQItem
                  key={idx}
                  question={block.question}
                  answer={block.answer}
                />
              ))}
            </div>

            {/* Contact CTA */}
            <div className="mt-10 rounded-2xl bg-blue-50 border border-blue-100 p-8 text-center">
              <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                仍有疑問？我們的專業團隊隨時為您解答，提供定制化諮詢服務
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="mailto:info@hkcrc.com"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  發送郵件
                </a>
                <Link
                  href={`/products?lang=${locale}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-blue-200 text-blue-600 text-sm font-semibold hover:bg-blue-50 transition-colors"
                >
                  {locale === "en" ? "All Products" : "所有產品"}
                </Link>
              </div>
            </div>
          </div>
        </MotionRevealUp>
      </div>

      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  product: Awaited<ReturnType<typeof getProductBySlug>>;
  config: Config;
  products: Paginated<ProductListItem>;
}> = async ({ params }) => {
  const id = params?.id as string;
  const fetchInit = { baseUrl: process.env.REQUEST_BASE_URL };
  const [product, config, products] = await Promise.all([
    getProductBySlug(id, fetchInit),
    getPublicConfigCached(fetchInit),
    getProductsCached({ pageSize: 50 }, fetchInit),
  ]);
  if (!product) {
    return { notFound: true };
  }
  return { props: { product, config, products } };
};
