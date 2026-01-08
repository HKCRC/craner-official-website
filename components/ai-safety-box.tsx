import { useTranslation } from "next-export-i18n";
import { MotionRevealUp } from "./animated-text";
import { StackedCardCarousel } from "./stacked-carousel";

export const AISafetyBox = () => {
  const { t } = useTranslation();

  const safetyImages = [
    {
      src: "/img/feature/f9.jpg",
      alt: "AI Safety Detection",
      label: t("ai_safety.image1_label"),
    },
    {
      src: "/img/feature/f10.jpg",
      alt: "Stable Hook Performance",
      label: t("ai_safety.image2_label"),
    },
    {
      src: "/img/feature/f11.jpg",
      alt: "Site Safety Overview",
      label: t("ai_safety.image3_label"),
    },
  ];

  return (
    <section className="w-full pt-12 pb-24 px-6 md:px-0 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Right Side: Carousel */}
          <div className="w-full lg:order-2 order-2">
            <MotionRevealUp delay={0.4}>
              <StackedCardCarousel images={safetyImages} />
            </MotionRevealUp>
          </div>

          {/* Left Side: Text Description */}
          <div className="flex flex-col pt-4 lg:order-1 order-1 relative">
            <MotionRevealUp>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-6 bg-blue-600 shrink-0"></div>
                <span className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em]">
                  {t("ai_safety.label")}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight tracking-tight">
                {t("ai_safety.title")}
              </h2>
              <div className="relative py-2">
                <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                  {t("ai_safety.desc")}
                </p>
              </div>
            </MotionRevealUp>

            <div className="grid grid-cols-1 gap-10 mt-12">
              <MotionRevealUp delay={0.2}>
                <h4 className="text-slate-900 font-normal mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  {t("ai_safety.featured_title")}
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed max-w-lg font-light">
                  {t("ai_safety.featured_desc")}
                </p>
              </MotionRevealUp>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
