import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { useTranslation } from "next-export-i18n";
import { LazyImage } from "@/components/lazy-image";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { articles } from "@/constants/articles";
import {
  SEO_CONFIG,
  ARTICLE_SEO,
  generateArticleSchema,
} from "@/constants/seo";

interface ArticleProps {
  id: string;
}

export default function Article({ id }: ArticleProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const locale = (router.query.lang as string) || "zh-HK";

  const findMatchArticle = (id: string) => {
    if (locale.indexOf("zh-TW") !== -1) {
      return articles[id]["zh-HK"];
    }
    return articles[id][locale as "zh" | "en" | "zh-HK"];
  };

  const article = findMatchArticle(id);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Article not found</p>
      </div>
    );
  }

  const articleKeywords =
    ARTICLE_SEO.articleKeywords[
      locale as keyof typeof ARTICLE_SEO.articleKeywords
    ] || ARTICLE_SEO.articleKeywords.en;
  const siteKeywords =
    SEO_CONFIG.keywords[locale as keyof typeof SEO_CONFIG.keywords] ||
    SEO_CONFIG.keywords.en;
  const allKeywords = [...articleKeywords, ...siteKeywords.slice(0, 10)].join(
    ", ",
  );

  const articleSchema = generateArticleSchema({ ...article, id, locale });
  const canonicalUrl = `${SEO_CONFIG.siteUrl}/articles/${id}?lang=${locale}`;

  const getPageTitle = () => {
    if (locale === "en")
      return `${article.title} | CraneR HK - AI Tower Crane & Intelligent Construction`;
    if (locale === "zh")
      return `${article.title} | CraneR可越科技 - 香港智能塔吊 无人塔吊 HKCRC`;
    return `${article.title} | CraneR可越科技 - 香港智能天秤 無人天秤 HKCRC`;
  };

  const getMetaDescription = () => {
    if (locale === "en")
      return `${article.subtitle} CraneR Technology Hong Kong - Leading AI tower crane and unmanned crane solutions. HKCRC InnoHK partner.`;
    if (locale === "zh")
      return `${article.subtitle} CraneR可越科技香港 - 领先的AI智能塔吊、无人塔吊解决方案。HKCRC香港智能建造研发中心合作伙伴。`;
    return `${article.subtitle} CraneR可越科技香港 - 領先的AI智能天秤、無人天秤解決方案。HKCRC香港智能建造研發中心合作夥伴。`;
  };

  const labelClient = locale === "en" ? "Client" : "客戶";
  const labelProduct = locale === "en" ? "Product" : "產品";
  const labelDate = locale === "en" ? "Published" : "發佈日期";

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getMetaDescription()} />
        <meta name="keywords" content={allKeywords} />
        <link rel="canonical" href={canonicalUrl} />
        <link
          rel="alternate"
          hrefLang="en"
          href={`${SEO_CONFIG.siteUrl}/articles/${id}?lang=en`}
        />
        <link
          rel="alternate"
          hrefLang="zh"
          href={`${SEO_CONFIG.siteUrl}/articles/${id}?lang=zh`}
        />
        <link
          rel="alternate"
          hrefLang="zh-HK"
          href={`${SEO_CONFIG.siteUrl}/articles/${id}?lang=zh-HK`}
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`${SEO_CONFIG.siteUrl}/articles/${id}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={getPageTitle()} />
        <meta property="og:description" content={getMetaDescription()} />
        <meta
          property="og:image"
          content={`${SEO_CONFIG.siteUrl}${article.coverImage}`}
        />
        <meta property="og:site_name" content="CraneR Technology - CraneR HK" />
        <meta
          property="og:locale"
          content={
            locale === "zh-HK" ? "zh_HK" : locale === "zh" ? "zh_CN" : "en_US"
          }
        />
        <meta
          property="article:published_time"
          content={article.date.replace(/\//g, "-")}
        />
        <meta property="article:author" content="CraneR Technology" />
        <meta property="article:section" content="Construction Technology" />
        <meta property="article:tag" content="AI Tower Crane" />
        <meta property="article:tag" content="HKCRC" />
        <meta property="article:tag" content="CraneR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={getPageTitle()} />
        <meta name="twitter:description" content={getMetaDescription()} />
        <meta
          name="twitter:image"
          content={`${SEO_CONFIG.siteUrl}${article.coverImage}`}
        />
        <meta name="twitter:site" content="@CraneRTech" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta name="author" content="CraneR Technology - CraneR HK - HKCRC" />
        <meta name="geo.region" content="HK" />
        <meta name="geo.placename" content="Hong Kong" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      </Head>

      <Nav />

      {/* Hero Banner */}
      <div className="relative w-full h-[480px] md:h-[560px] overflow-hidden">
        <LazyImage
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-12 max-w-6xl mx-auto left-0 right-0">
          <div className="mb-4 flex flex-wrap gap-2">
            {article.tags?.map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-600/80 text-white backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight max-w-3xl">
            {article.title}
          </h1>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-16">
        {/* Back button */}
        <Link
          href={`/?lang=${locale}`}
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
          {t("articles.back") || "返回"}
        </Link>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Article Body */}
          <div className="flex-1 min-w-0">
            {/* Subtitle / lead */}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10 font-light border-l-4 border-blue-500 pl-5">
              {article.subtitle}
            </p>

            {/* Sections */}
            {article.sections && article.sections.length > 0 ? (
              <div className="space-y-12">
                {article.sections.map((section, idx) => (
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
                <p className="leading-relaxed">{article.content}</p>
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
                    {locale === "en" ? "Project Info" : "項目資料"}
                  </span>
                </div>
                <div className="divide-y divide-gray-100">
                  <div className="px-5 py-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                      {labelDate}
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      {article.date}
                    </p>
                  </div>
                  {article.client && (
                    <div className="px-5 py-4">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                        {labelClient}
                      </p>
                      <p className="text-sm font-medium text-gray-800">
                        {article.client}
                      </p>
                    </div>
                  )}

                  {article.tags && article.tags.length > 0 && (
                    <div className="px-5 py-4">
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
                        {labelProduct}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
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

              {/* Author / company card */}
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

export const getServerSideProps: GetServerSideProps<ArticleProps> = async ({
  params,
}) => {
  const id = params?.id as string;
  if (!id || !articles[id]) {
    return { notFound: true };
  }

  return {
    props: { id },
  };
};
