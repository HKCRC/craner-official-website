import { useTranslation } from "next-export-i18n";
import { MotionRevealUp } from "./animated-text";
import { StackedCardCarousel } from "./stacked-carousel";

export const PathPlanningBox = () => {
  const { t } = useTranslation();

  const pathImages = [
    {
      src: "/img/feature/f5.jpg",
      alt: "Path Planning Hero",
      label: t("path_planning.image1_label"),
    },
    {
      src: "/img/feature/f6.jpg",
      alt: "Mapping detail",
      label: t("path_planning.image2_label"),
    },
    {
      src: "/img/feature/f7.jpg",
      alt: "Detection detail",
      label: t("path_planning.image3_label"),
    },
    {
      src: "/img/feature/f8.jpg",
      alt: "Execution detail",
      label: t("path_planning.image4_label"),
    },
  ];

  return (
    <section className="w-full py-16 px-6 md:px-0 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ">
          {/* Left Side: Carousel */}
          <div className="w-full order-2 lg:order-1">
            <MotionRevealUp delay={0.4}>
              <StackedCardCarousel images={pathImages} />
            </MotionRevealUp>
          </div>

          {/* Right Side: Text Description */}
          <div className="flex flex-col pt-4 relative order-1 lg:order-2">
            <MotionRevealUp>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-6 bg-blue-600 shrink-0"></div>
                <span className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em]">
                  {t("path_planning.label")}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight tracking-tight">
                {t("path_planning.title")}
              </h2>
              <div className="relative py-2">
                <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                  {t("path_planning.desc")}
                </p>
              </div>
            </MotionRevealUp>

            <div className="grid grid-cols-1 gap-10 mt-12">
              <MotionRevealUp delay={0.2}>
                <h4 className="text-slate-900 mb-3 flex items-center gap-2 font-normal">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  {t("path_planning.featured_title")}
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed max-w-lg font-light">
                  {t("path_planning.featured_desc")}
                </p>
              </MotionRevealUp>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
