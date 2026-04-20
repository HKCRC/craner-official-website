import { useTranslation } from "next-export-i18n";
import { useRouter } from "next/router";
import Link from "next/link";
import { MotionRevealUp } from "./animated-text";
import { LazyImage } from "./lazy-image";
import { cases } from "@/constants/cases";

export const CasesSection = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const locale = (router.query.lang as string) || "zh-HK";

  const getLocaleKey = () => {
    if (locale.indexOf("zh-TW") !== -1) return "zh-HK";
    return locale as "zh" | "en" | "zh-HK";
  };

  const featuredCaseIds = ["1", "2", "3"];
  const featuredCases = featuredCaseIds
    .map((id) => ({
      id,
      data: cases[id]?.[getLocaleKey()],
    }))
    .filter((c) => !!c.data);

  return (
    <section className="w-full bg-[#13264c] py-20 px-6 md:px-0">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-12">
          <div className="flex-1">
            <MotionRevealUp className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              {t("cases_section.title")}
            </MotionRevealUp>
            <MotionRevealUp
              delay={0.15}
              className="text-lg text-white max-w-2xl leading-relaxed"
            >
              {t("cases_section.subtitle")}
            </MotionRevealUp>
          </div>
          <MotionRevealUp
            delay={0.2}
            className="flex-shrink-0 ml-8 hidden md:flex items-center"
          >
            <Link
              href={`/cases?lang=${locale}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group"
            >
              {t("cases_section.view_more")}
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </MotionRevealUp>
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCases.map(({ id, data }, idx) => (
            <MotionRevealUp
              key={id}
              delay={0.1 * (idx + 1)}
              className="flex h-full"
            >
              <Link
                href={`/cases/${id}?lang=${locale}`}
                className="group flex flex-col w-full bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-500 rounded-3xl overflow-hidden border border-slate-100"
              >
                {/* Cover Image */}
                <div className="h-52 overflow-hidden relative flex-shrink-0">
                  <LazyImage
                    src={data.coverImage}
                    alt={data.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {/* Partner badge */}
                  {data.partner && (
                    <div className="absolute bottom-4 left-4">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-600/80 text-white backdrop-blur-sm">
                        {data.partner}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  {/* Tags */}
                  {data.tags && data.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {data.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                    {data.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-light line-clamp-3 leading-relaxed flex-1">
                    {data.subtitle}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      {data.partnerType && (
                        <>
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                          </svg>
                          <span>{data.partnerType}</span>
                        </>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">{data.date}</span>
                  </div>
                </div>
              </Link>
            </MotionRevealUp>
          ))}
        </div>

        {/* Mobile "View More" */}
        <MotionRevealUp
          delay={0.4}
          className="mt-8 flex justify-center md:hidden"
        >
          <Link
            href={`/cases?lang=${locale}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group"
          >
            {t("cases_section.view_more")}
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </MotionRevealUp>
      </div>
    </section>
  );
};
