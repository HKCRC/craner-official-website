import { useState, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { LazyImage } from "@/components/lazy-image";
import { MotionRevealUp } from "@/components/animated-text";
import { getImageUrl, langToCategory } from "@/lib/helper";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import {
  getPostsByCategory,
  PostListItem,
  type Config,
} from "@/lib/api/public-read";
import { usePublicConfig } from "@/lib/public-config-context";
import { getPublicConfigCached } from "@/lib/data/public-config-cache";
import { useTranslation } from "next-export-i18n";

export default function ArticlesArchive({
  articles,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const locale = (router.query.lang as string) || "zh-HK";
  const config = usePublicConfig();
  const { t } = useTranslation();
  const renderTitleAndSubTitle = () => {
    switch (locale) {
      case "en":
        return {
          title: config?.["news_title_en"],
          subtitle: config?.["news_subtitle_en"],
          more: config?.["news_more_en"],
          tag: config?.["news_tag_en"],
        };
      case "zh-HK":
        return {
          title: config?.["news_title_chhk"],
          subtitle: config?.["news_subtitle_chhk"],
          more: config?.["news_more_chhk"],
          tag: config?.["news_tag_chhk"],
        };
      default:
        return {
          title: config?.["news_title_ch"],
          subtitle: config?.["news_subtitle_ch"],
          more: config?.["news_more_ch"],
          tag: config?.["news_tag_ch"],
        };
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>{renderTitleAndSubTitle()?.title}</title>
        <meta name="description" content={renderTitleAndSubTitle()?.subtitle} />
      </Head>

      <Nav />

      {/* Page Hero */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 pt-32 pb-16 px-6 md:px-0">
        <div className="max-w-6xl mx-auto">
          <MotionRevealUp>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-blue-400" />
              <span className="text-blue-400 font-bold text-sm uppercase tracking-[0.2em]">
                {renderTitleAndSubTitle()?.tag}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {renderTitleAndSubTitle()?.title}
            </h1>
            <p className="text-slate-400 text-base max-w-xl leading-relaxed">
              {renderTitleAndSubTitle()?.subtitle}
            </p>
          </MotionRevealUp>
        </div>
      </div>

      {/* Articles grid */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Back to home */}
        <Link
          href={`/?lang=${locale}`}
          className="inline-flex items-center text-sm text-slate-400 hover:text-blue-600 mb-10 transition-colors group"
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
          {t("back_home") || "返回主页"}
        </Link>

        {articles.length === 0 ? (
          <div className="text-center py-24 text-slate-400">
            <svg
              className="w-12 h-12 mx-auto mb-4 opacity-40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-sm">
              {locale === "en" ? "No articles found" : "找不到相關文章"}
            </p>
          </div>
        ) : (
          <>
            {/* First article — featured wide card */}
            {articles[0] && (
              <motion.div
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="mb-6"
              >
                <Link
                  href={`/articles/${articles[0].slug}?lang=${locale}`}
                  className="group flex flex-col md:flex-row bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-400 rounded-2xl overflow-hidden border border-slate-100"
                >
                  <div className="md:w-2/5 overflow-hidden flex-shrink-0">
                    <div className="w-full h-56 md:h-72">
                      <LazyImage
                        src={getImageUrl(articles[0].coverImageUrl ?? "")}
                        alt={articles[0].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-between p-7 md:p-10 flex-1">
                    <div>
                      {articles[0].tags && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {articles[0].tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                        {articles[0].title}
                      </h2>
                      <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">
                        {articles[0].excerpt}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-6">
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                        <span>CraneR Technology</span>
                        <span className="opacity-40">•</span>
                        <span>
                          {new Date(articles[0].publishedAt).toLocaleDateString(
                            locale,
                          )}
                        </span>
                      </div>
                      <span className="text-xs text-blue-600 font-semibold group-hover:underline flex items-center gap-1">
                        {locale === "en" ? "Read more" : "閱讀全文"}
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
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Rest — 2-column card grid */}
            {articles.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {articles.slice(1).map((article, idx) => (
                  <motion.div
                    key={article.id}
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.35,
                      ease: "easeInOut",
                      delay: 0.05 * idx,
                    }}
                  >
                    <Link
                      href={`/articles/${article.id}?lang=${locale}`}
                      className="group flex gap-4 bg-slate-50 hover:bg-white hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden border border-slate-100 p-4"
                    >
                      <div className="w-24 h-20 md:w-28 md:h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <LazyImage
                          src={getImageUrl(article.coverImageUrl ?? "")}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          {article.tags && (
                            <div className="flex flex-wrap gap-1 mb-1.5">
                              {article.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                          <h3 className="text-sm font-bold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug mb-1">
                            {article.title}
                          </h3>
                          <p className="text-xs text-slate-400 line-clamp-1 leading-relaxed">
                            {article.excerpt}
                          </p>
                        </div>
                        <p className="text-xs text-slate-400 mt-2">
                          {new Date(article.publishedAt).toLocaleDateString(
                            locale,
                          )}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  articles: PostListItem[];
  config: Config;
}> = async (ctx) => {
  const category = langToCategory(ctx.query.lang as string);

  const articlesRes = await getPostsByCategory(
    `news-${category}`,
    { pageSize: 8 },
    { baseUrl: process.env.REQUEST_BASE_URL },
  );
  const config = await getPublicConfigCached({
    baseUrl: process.env.REQUEST_BASE_URL,
  });
  const articles = articlesRes.items ?? [];
  return {
    props: { articles, config },
  };
};
