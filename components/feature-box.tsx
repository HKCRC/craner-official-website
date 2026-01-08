import { useTranslation } from "next-export-i18n";
import { MotionRevealUp } from "./animated-text";
import { StackedCardCarousel } from "./stacked-carousel";

export const FeatureBox = () => {
  const { t } = useTranslation();

  const featureImages = [
    {
      src: "/img/feature/f1.jpg",
      alt: "Site Panorama",
      label: t("feature_box.image1_label"),
    },
    {
      src: "/img/feature/f3.jpg",
      alt: "Hardware Detail",
      label: t("feature_box.image2_label"),
    },
    {
      src: "/img/feature/f4.jpg",
      alt: "Intelligent UI",
      label: t("feature_box.image3_label"),
    },
  ];

  return (
    <section className="w-full pt-14 pb-12 px-6 md:px-0 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Side: Professional Content Hierarchy */}
          <div className="flex flex-col pt-4 relative">
            <MotionRevealUp>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-6 bg-blue-600 shrink-0"></div>
                <span className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em]">
                  {t("feature_box.label")}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight tracking-tight">
                {t("feature_box.title")}
              </h2>
              <div className="relative py-2">
                <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                  {t("feature_box.desc")}
                </p>
              </div>
            </MotionRevealUp>

            <div className="grid grid-cols-1 gap-10 mt-12">
              <MotionRevealUp delay={0.2}>
                <h4 className="text-slate-900 font-normal mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  {t("feature_box.featured_title")}
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed font-light">
                  {t("feature_box.featured_desc")}
                </p>
              </MotionRevealUp>
            </div>
          </div>

          {/* Right Side: Stacked Carousel */}
          <div className="w-full">
            <MotionRevealUp delay={0.4}>
              <StackedCardCarousel images={featureImages} />
            </MotionRevealUp>
          </div>
        </div>
      </div>
    </section>
  );
};
