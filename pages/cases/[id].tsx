import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { useTranslation } from "next-export-i18n";
import { LazyImage } from "@/components/lazy-image";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SEO_CONFIG } from "@/constants/seo";
import {
  getPostBySlug,
  type Config,
  type Paginated,
  PostDetail,
  type ProductListItem,
} from "@/lib/api/public-read";
import { getImageUrl } from "@/lib/helper";
import { renderCaseHtmlContent } from "@/lib/render-case-html";
import { getPublicConfigCached } from "@/lib/data/public-config-cache";
import { getProductsCached } from "@/lib/data/products-cache";

export default function CaseDetail({
  caseData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation();
  const router = useRouter();
  const locale = (router.query.lang as string) || "zh-HK";

  console.error(JSON.stringify(caseData, null, 2));

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

  const canonicalUrl = `${SEO_CONFIG.siteUrl}/cases/${caseData.slug ?? ""}?lang=${locale}`;

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={caseData.excerpt} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={caseData.excerpt} />
        <meta
          property="og:image"
          content={`${SEO_CONFIG.siteUrl}${caseData.coverImageUrl}`}
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <Nav />

      {/* Hero Banner */}
      <div className="relative w-full h-[480px] md:h-[560px] overflow-hidden">
        <LazyImage
          src={getImageUrl(caseData.coverImageUrl ?? "")}
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
              {caseData.excerpt}
            </p>

            {/* Sections */}
            {typeof caseData.content === "string" && caseData.content.trim()
              ? renderCaseHtmlContent(caseData.content)
              : null}
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
                      {new Date(caseData.publishedAt).toLocaleDateString(
                        locale,
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )}
                    </p>
                  </div>
                  {caseData.client?.split(",").map((client) => (
                    <div key={client} className="px-5 py-4">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                        {labelPartner}
                      </p>
                      <p className="text-sm font-medium text-gray-800">
                        {client}
                      </p>
                    </div>
                  ))}

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

export const getServerSideProps: GetServerSideProps<{
  caseData: PostDetail;
  config: Config;
  products: Paginated<ProductListItem>;
}> = async ({ params }) => {
  const id = params?.id as string;
  const fetchInit = { baseUrl: process.env.REQUEST_BASE_URL };
  const [caseData, config, products] = await Promise.all([
    getPostBySlug(id, fetchInit),
    getPublicConfigCached(fetchInit),
    getProductsCached({ pageSize: 50 }, fetchInit),
  ]);
  if (!id || !caseData) {
    return { notFound: true };
  }

  return {
    props: { caseData, config, products },
  };
};
