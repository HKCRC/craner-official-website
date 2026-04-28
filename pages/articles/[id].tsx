import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { useTranslation } from "next-export-i18n";
import { LazyImage } from "@/components/lazy-image";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { SEO_CONFIG } from "@/constants/seo";
import { getPostBySlug, type PostDetail } from "@/lib/api/public-read";
import { getImageUrl } from "@/lib/helper";
import { renderCaseHtmlContent } from "@/lib/render-case-html";

export default function ArticleDetail({
  article,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation();
  const router = useRouter();
  const locale = (router.query.lang as string) || "zh-HK";

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Article not found</p>
      </div>
    );
  }

  const pageTitle =
    locale === "en"
      ? `${article.title} | CraneR Technology - HKCRC`
      : `${article.title} | 可越科技 CraneR`;
  const canonicalUrl = `${SEO_CONFIG.siteUrl}/articles/${article.slug ?? ""}?lang=${locale}`;
  const coverSrc = getImageUrl(article.coverImageUrl ?? "") || "/img/banner.jpg";
  const ogImageAbsolute = coverSrc.startsWith("http")
    ? coverSrc
    : `${SEO_CONFIG.siteUrl}${coverSrc.startsWith("/") ? "" : "/"}${coverSrc}`;

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={article.excerpt} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:image" content={ogImageAbsolute} />
        <meta name="robots" content="index, follow" />
      </Head>

      <Nav />

      {/* Hero Banner — same通顶结构 as cases/[id] */}
      <div className="relative w-full h-[480px] md:h-[560px] overflow-hidden bg-slate-900">
        <LazyImage
          src={coverSrc}
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

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-16">
        <Link
          href={`/articles?lang=${locale}`}
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

        <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10 font-light border-l-4 border-blue-500 pl-5">
          {article.excerpt}
        </p>

        {typeof article.content === "string" && article.content.trim()
          ? renderCaseHtmlContent(article.content)
          : null}
      </div>

      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  article: PostDetail;
}> = async ({ params }) => {
  const id = params?.id as string;
  const article = await getPostBySlug(id);
  if (!id || !article) return { notFound: true };
  return { props: { article } };
};
