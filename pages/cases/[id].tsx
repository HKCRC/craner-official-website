import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { useTranslation } from "next-export-i18n";
import { LazyImage } from "@/components/lazy-image";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { cases } from "@/constants/cases";
import { SEO_CONFIG } from "@/constants/seo";

interface CaseDetailProps {
  id: string;
}

export default function CaseDetail({ id }: CaseDetailProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const locale = (router.query.lang as string) || "zh-HK";

  const getLocaleKey = () => {
    if (locale.indexOf("zh-TW") !== -1) return "zh-HK";
    return locale as "zh" | "en" | "zh-HK";
  };

  const caseData = cases[id]?.[getLocaleKey()];

  if (!caseData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Case not found</p>
      </div>
    );
  }

  const labelPartner = locale === "en" ? "Partner" : "合作夥伴";
  const labelDate = locale === "en" ? "Date" : "日期";
  const labelTags = locale === "en" ? "Tags" : "標籤";

  const pageTitle =
    locale === "en"
      ? `${caseData.title} | CraneR Technology - HKCRC`
      : `${caseData.title} | 可越科技 CraneR`;

  const canonicalUrl = `${SEO_CONFIG.siteUrl}/cases/${id}?lang=${locale}`;

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={caseData.subtitle} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={caseData.subtitle} />
        <meta
          property="og:image"
          content={`${SEO_CONFIG.siteUrl}${caseData.coverImage}`}
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <Nav />

      {/* Hero Banner */}
      <div className="relative w-full h-[480px] md:h-[560px] overflow-hidden">
        <LazyImage
          src={caseData.coverImage}
          alt={caseData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-12 max-w-6xl mx-auto left-0 right-0">
          <div className="mb-4 flex flex-wrap gap-2">
            {caseData.tags?.map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-600/80 text-white backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight max-w-3xl">
            {caseData.title}
          </h1>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-16">
        {/* Back button */}
        <Link
          href={`/cases?lang=${locale}`}
          className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 mb-10 transition-colors group"
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
          {t("cases_section.back_cases")}
        </Link>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Case Body */}
          <div className="flex-1 min-w-0">
            {/* Subtitle / lead */}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10 font-light border-l-4 border-blue-500 pl-5">
              {caseData.subtitle}
            </p>

            {/* Sections */}
            {caseData.sections && caseData.sections.length > 0 ? (
              <div className="space-y-12">
                {caseData.sections.map((section, idx) => (
                  <div key={idx}>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                      <span className="w-1 h-6 rounded-full bg-blue-500 inline-block flex-shrink-0" />
                      {section.heading}
                    </h2>
                    {section.image && (
                      <div className="w-full aspect-video rounded-xl overflow-hidden mb-5">
                        <LazyImage
                          src={section.image}
                          alt={section.heading}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="text-gray-700 leading-relaxed space-y-3 text-base md:text-[1.05rem]">
                      {section.body.split("\n\n").map((para, pIdx) => (
                        <p key={pIdx}>{para}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="leading-relaxed">{caseData.content}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="sticky top-28 space-y-6">
              {/* Meta card */}
              <div className="rounded-2xl border border-gray-100 bg-gray-50 overflow-hidden">
                <div className="bg-blue-600 px-5 py-3">
                  <span className="text-white text-sm font-semibold tracking-wide uppercase">
                    {locale === "en" ? "Case Info" : "案例資料"}
                  </span>
                </div>
                <div className="divide-y divide-gray-100">
                  <div className="px-5 py-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                      {labelDate}
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {caseData.date}
                    </p>
                  </div>
                  {caseData.partners && caseData.partners.length > 0 && (
                    <div className="px-5 py-4">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                        {labelPartner}
                      </p>
                      <p className="text-sm font-medium text-gray-800">
                        {caseData.partners.join(", ")}
                      </p>
                    </div>
                  )}

                  {caseData.tags && caseData.tags.length > 0 && (
                    <div className="px-5 py-4">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
                        {labelTags}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {caseData.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-medium border border-blue-100"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Company card */}
              <div className="rounded-2xl border border-gray-100 bg-gray-50 px-5 py-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-white"
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
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    CraneR Technology
                  </p>
                  <p className="text-xs text-gray-500">HKCRC · InnoHK</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<CaseDetailProps> = async ({
  params,
}) => {
  const id = params?.id as string;
  if (!id || !cases[id]) {
    return { notFound: true };
  }

  return {
    props: { id },
  };
};
