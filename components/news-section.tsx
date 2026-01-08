import { useTranslation } from "next-export-i18n";
import { TextBlockRow, TextGradient, getTextGradientStyle } from "./text-block";
import styles from "@/styles/cooperative.module.css";
import { MotionRevealUp } from "./animated-text";

const subtitleGradient1: TextGradient = {
  deg: 180,
  from: "#25FFBE",
  to: "#34C2FF",
};

export const NewsSection = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full bg-white py-20 px-6 md:px-0">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <MotionRevealUp className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
            {t("news_sections.title")}
          </MotionRevealUp>
          <div className="text-lg text-gray-600 max-w-3xl leading-relaxed">
            <MotionRevealUp delay={0.3}>
              {t("news_sections.subtitle")}
            </MotionRevealUp>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* News Item 1 */}
          <MotionRevealUp delay={0.1}>
            <a
              href="javascript:void(0)"
              className="group flex flex-col md:flex-row items-stretch bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-500 rounded-3xl overflow-hidden border border-slate-100"
            >
              {/* Text Content - Left Side */}
              <div className="flex flex-col justify-between p-8 md:w-3/5 order-2 md:order-1">
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {t("news_sections.news_1_title")}
                  </h3>
                  <p className="text-sm lg:text-base text-gray-500 font-light line-clamp-3 mb-6 leading-relaxed">
                    {t("news_sections.news_1_subtitle")}
                  </p>
                </div>

                <div className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <span>{t("news_sections.author")}</span>
                  <span className="mx-3 opacity-30">•</span>
                  <span>2025/12/20</span>
                </div>
              </div>

              {/* Image - Right Side */}
              <div className="md:w-2/5 order-1 md:order-2 overflow-hidden">
                <div className="w-full h-full aspect-[16/9] md:aspect-auto">
                  <img
                    src="./img/news/new01_cover.jpg"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    alt="news 1"
                  />
                </div>
              </div>
            </a>
          </MotionRevealUp>

          {/* News Item 2 */}
          <MotionRevealUp delay={0.2}>
            <a
              href="javascript:void(0)"
              className="group flex flex-col md:flex-row items-stretch bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-500 rounded-3xl overflow-hidden border border-slate-100"
            >
              {/* Text Content - Left Side */}
              <div className="flex flex-col justify-between p-8 md:w-3/5 order-2 md:order-1">
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {t("news_sections.news_2_title")}
                  </h3>
                  <p className="text-sm lg:text-base text-gray-500 font-light line-clamp-3 mb-6 leading-relaxed">
                    {t("news_sections.news_2_subtitle")}
                  </p>
                </div>

                <div className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <span>{t("news_sections.author")}</span>
                  <span className="mx-3 opacity-30">•</span>
                  <span>2025/12/20</span>
                </div>
              </div>

              {/* Image - Right Side */}
              <div className="md:w-2/5 order-1 md:order-2 overflow-hidden">
                <div className="w-full h-full aspect-[16/9] md:aspect-auto">
                  <img
                    src="./img/news/new02_cover.jpeg"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    alt="news 2"
                  />
                </div>
              </div>
            </a>
          </MotionRevealUp>
        </div>
      </div>
    </section>
  );
};
