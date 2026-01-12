import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { useTranslation } from "next-export-i18n";
import { LazyImage } from "@/components/lazy-image";
import { Nav } from "@/components/nav";
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

  // 生成文章的 SEO 关键词
  const articleKeywords =
    ARTICLE_SEO.articleKeywords[
      locale as keyof typeof ARTICLE_SEO.articleKeywords
    ] || ARTICLE_SEO.articleKeywords.en;
  const siteKeywords =
    SEO_CONFIG.keywords[locale as keyof typeof SEO_CONFIG.keywords] ||
    SEO_CONFIG.keywords.en;
  const allKeywords = [...articleKeywords, ...siteKeywords.slice(0, 10)].join(
    ", "
  );

  // 生成文章结构化数据
  const articleSchema = generateArticleSchema({
    ...article,
    id,
    locale,
  });

  // 生成 canonical URL
  const canonicalUrl = `${SEO_CONFIG.siteUrl}/articles/${id}?lang=${locale}`;

  // 根据语言生成 SEO 标题
  const getPageTitle = () => {
    if (locale === "en") {
      return `${article.title} | CraneR HK - AI Tower Crane & Intelligent Construction`;
    } else if (locale === "zh") {
      return `${article.title} | CraneR可越科技 - 香港智能塔吊 无人塔吊 HKCRC`;
    } else {
      return `${article.title} | CraneR可越科技 - 香港智能天秤 無人天秤 HKCRC`;
    }
  };

  // 根据语言生成 SEO 描述
  const getMetaDescription = () => {
    if (locale === "en") {
      return `${article.subtitle} CraneR Technology Hong Kong - Leading AI tower crane and unmanned crane solutions. HKCRC InnoHK partner.`;
    } else if (locale === "zh") {
      return `${article.subtitle} CraneR可越科技香港 - 领先的AI智能塔吊、无人塔吊解决方案。HKCRC香港智能建造研发中心合作伙伴。`;
    } else {
      return `${article.subtitle} CraneR可越科技香港 - 領先的AI智能天秤、無人天秤解決方案。HKCRC香港智能建造研發中心合作夥伴。`;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Head>
        {/* 基础 Meta 标签 */}
        <title>{getPageTitle()}</title>
        <meta name="description" content={getMetaDescription()} />
        <meta name="keywords" content={allKeywords} />

        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />

        {/* 多语言备选链接 */}
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

        {/* Open Graph / Facebook */}
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
        <meta property="article:tag" content="智能塔吊" />
        <meta property="article:tag" content="HKCRC" />
        <meta property="article:tag" content="香港智能建造" />
        <meta property="article:tag" content="无人塔吊" />
        <meta property="article:tag" content="CraneR" />
        <meta property="article:tag" content="CraneR HK" />
        <meta property="article:tag" content="CraneR Technology" />
        <meta property="article:tag" content="unmanned tower crane" />
        <meta property="article:tag" content="smart tower crane Hong Kong" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={getPageTitle()} />
        <meta name="twitter:description" content={getMetaDescription()} />
        <meta
          name="twitter:image"
          content={`${SEO_CONFIG.siteUrl}${article.coverImage}`}
        />
        <meta name="twitter:site" content="@CraneRTech" />
        <meta name="twitter:creator" content="@CraneRTech" />

        {/* 额外 SEO 标签 */}
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta name="author" content="CraneR Technology - CraneR HK - HKCRC" />
        <meta name="geo.region" content="HK" />
        <meta name="geo.placename" content="Hong Kong" />

        {/* 结构化数据 JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      </Head>

      <Nav />

      <div
        style={{
          backgroundImage: "url('/img/banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
        className="relative h-[400px] flex items-center justify-center"
      >
        <div className="z-10 max-w-4xl mx-5">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-white">
            {article.title}
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[400px] bg-black/30 pointer-events-none"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* 返回按钮 */}
        <Link
          href={`/?lang=${locale}`}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
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

        {/* 文章封面 */}
        <div className="w-full aspect-video rounded-2xl overflow-hidden mb-8">
          <LazyImage
            src={article.coverImage}
            alt={`Article ${id}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 文章元信息 */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <span>{t("news_sections.author")}</span>
          <span className="mx-3">•</span>
          <span>{article.date}</span>
        </div>

        {/* 文章内容 */}
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 leading-relaxed">{article.subtitle}</p>
          <p className="text-gray-600 leading-relaxed">{article.content}</p>
        </div>
      </div>
    </div>
  );
}

// 在 export 模式下，必须定义 getStaticPaths 来预生成所有路径
export const getStaticPaths: GetStaticPaths = async () => {
  // 返回所有需要预渲染的路径
  const paths = Object.keys(articles).map((article) => ({
    params: { id: article },
  }));

  return {
    paths,
    fallback: false, // export 模式下必须为 false
  };
};

// 获取每个页面的数据
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;

  return {
    props: {
      id,
    },
  };
};
