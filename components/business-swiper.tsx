import { useState } from "react";
import { useTranslation } from "next-export-i18n";
import { motion, AnimatePresence } from "framer-motion";
import { MotionRevealUp } from "./animated-text";
import { LazyImage } from "./lazy-image";
import { FeaturedProduct } from "@/lib/api/public-read";
import { useRouter } from "next/router";
import { getImageUrl } from "@/lib/helper";

const partners = [
  "CraneR AI Safety System",
  "Safety Supervision System",
  "AI Crane Control System",
  "4S : Site Safety System",
];

export const BusinessSwiper = ({
  featuredProducts,
}: {
  featuredProducts: FeaturedProduct[];
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const locale = (router.query.lang as string) || "zh-HK";
  const [activeProduct, setActiveProduct] = useState(featuredProducts[0]);

  const productData = t(`business_swiper.partners.${activeProduct.id}`);

  const renderImage = (partner: string) => {
    switch (partner) {
      case "CraneR AI Safety System":
        return (
          <LazyImage
            src={`/img/business-swiper/safe.jpg`}
            alt={partner}
            className="object-cover"
          />
        );
      case "Safety Supervision System":
        return (
          <LazyImage
            src={`/img/business-swiper/dwss.jpg`}
            alt={partner}
            className="object-cover"
          />
        );
      case "AI Crane Control System":
        return (
          <LazyImage
            src={`/img/business-swiper/route.jpg`}
            alt={partner}
            className="object-cover"
          />
        );
      case "4S : Site Safety System":
        return (
          <LazyImage
            src={`/img/business-swiper/smartwatch.jpg`}
            alt={partner}
            className="object-cover"
          />
        );
      default:
        return (
          <LazyImage
            src={`/img/business-swiper/safe.jpg`}
            alt={partner}
            className="object-cover"
          />
        );
    }
  };

  const renderBackground = (order: number) => {
    switch (order) {
      case 1:
        return "bg-gradient-to-t from-[#4AA7DDBB] via-[#E8EDF0B4]";
      case 2:
        return "bg-gradient-to-t from-[#FF000095] via-[#FF000072]";
      case 3:
        return "bg-gradient-to-t from-[#FEA90098] via-[#FFD88F92]";
      case 4:
        return "bg-gradient-to-t from-[#FA79009D] via-[#E8EDF0B4]";
      default:
        return "bg-gradient-to-t from-[#4aa7dd] via-[#e8edf094]";
    }
  };

  return (
    <section className="w-full bg-white py-16 px-6 md:px-0 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-16">
          <MotionRevealUp>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
              {activeProduct.title}
            </h2>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                {activeProduct.description}
              </p>
            </div>
          </MotionRevealUp>
        </div>

        {/* Main Content Area */}
        <div className="relative min-h-[500px] mb-8 md:mb-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center"
            >
              {/* Left Column: Stats */}
              <div className="md:col-span-4 space-y-12">
                {activeProduct.featureList.map((feature) => (
                  <div key={feature.label} className="space-y-4">
                    <div className="text-4xl font-bold text-gray-900">
                      <div key={feature.label}>{feature.value}</div>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed border-l-2 border-blue-600 pl-4">
                      <div key={feature.label}>{feature.label}</div>
                    </p>
                  </div>
                ))}
                <div className="space-y-4">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest"></div>
                  <div className="flex gap-4">
                    {activeProduct.tags.map((tag) => (
                      <div key={tag} className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center">
                          <div className="w-2.5 h-2.5 bg-blue-600 rotate-45"></div>
                        </div>
                        <span className="text-xs font-bold text-slate-600">
                          {tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Featured Image Card */}
              <div className="md:col-span-8">
                <div className="group relative rounded-3xl overflow-hidden shadow-2xl aspect-[16/9] flex items-end p-8 md:p-12">
                  {/* Mock Background Image */}

                  <div
                    className={`absolute inset-0 left-0 bottom-0 w-full h-full ${renderBackground(activeProduct.order)} z-10`}
                  ></div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white/10 font-black text-9xl uppercase tracking-tighter select-none">
                      {renderImage(
                        activeProduct.media.type === "carousel"
                          ? activeProduct.media.images[0]
                          : activeProduct.media.url,
                      )}
                    </div>
                  </div>

                  <div className="relative z-20 w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4 flex-1">
                      <div className="w-fit h-8 bg-white/20 backdrop-blur rounded p-2 flex items-center justify-center">
                        <span className="text-white font-bold text-xs uppercase">
                          {activeProduct.title}
                        </span>
                      </div>
                      <h3 className="text-sm lg:text-3xl font-bold text-white max-w-lg leading-tight">
                        {activeProduct.subtitle}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Logo Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-slate-200">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => setActiveProduct(product)}
              className={`group flex items-center justify-center p-4 rounded-2xl cursor-pointer transition-all duration-300 relative  ${
                activeProduct.id === product.id
                  ? ""
                  : "bg-transparent  opacity-40 hover:opacity-100"
              }`}
            >
              {activeProduct.id === product.id && (
                <motion.div
                  layoutId="active-bg"
                  className="absolute bottom-0 w-full h-1 bg-blue-600 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                  <span className="text-[8px] font-black text-slate-500 uppercase">
                    {product.title}
                  </span>
                </div>
                <span
                  className={`text-sm font-black uppercase tracking-widest ${
                    activeProduct.id === product.id
                      ? "text-gray-900"
                      : "text-gray-400"
                  }`}
                >
                  {product.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
