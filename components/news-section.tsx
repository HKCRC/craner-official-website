import { useTranslation } from "next-export-i18n";
import { MotionRevealUp } from "./animated-text";
import { LazyImage } from "./lazy-image";
import Link from "next/link";
import { useRouter } from "next/router";
import { articles } from "@/constants/articles";
import { getImageUrl } from "@/lib/helper";
import { usePublicConfig } from "@/lib/public-config-context";
import { GetServerSideProps } from "next";
import { getPostsByCategory, PostListItem } from "@/lib/api/public-read";

const PREVIEW_COUNT = 4;

export const NewsSection = ({ articles }: { articles: PostListItem[] }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const locale = (router.query.lang as string) || "zh-HK";
  const config = usePublicConfig();

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
    <section className="w-full bg-white py-16 px-6 md:px-0">
      <div className="max-w-6xl mx-auto">
        {/* Header row */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <MotionRevealUp>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-px bg-blue-300" />
                <span className="text-blue-600 font-bold text-sm uppercase tracking-[0.2em]">
                  {renderTitleAndSubTitle()?.tag}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                {renderTitleAndSubTitle()?.title}
              </h2>
            </MotionRevealUp>
          </div>
          <MotionRevealUp delay={0.1}>
            <Link
              href={`/articles?lang=${locale}`}
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors flex-shrink-0 mb-1"
            >
              {renderTitleAndSubTitle()?.more}
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
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
            </Link>
          </MotionRevealUp>
        </div>

        {/* Featured first article */}
        {articles[0] && (
          <MotionRevealUp delay={0.05}>
            <Link
              href={`/articles/${articles[0].slug}?lang=${locale}`}
              className="group flex flex-col md:flex-row gap-0 bg-slate-50 hover:bg-white hover:shadow-lg transition-all duration-400 rounded-2xl overflow-hidden border border-slate-100 mb-4"
            >
              <div className="md:w-2/5 overflow-hidden flex-shrink-0">
                <div className="w-full h-52 md:h-full">
                  <LazyImage
                    src={getImageUrl(articles[0].coverImageUrl ?? "")}
                    alt={articles[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-between p-6 md:p-8 flex-1">
                <div>
                  {articles[0].tags && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {articles[0].tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                    {articles[0].title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                    {articles[0].excerpt}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-4 text-xs text-slate-400 font-medium">
                  <span>{t("news_sections.author")}</span>
                  <span className="opacity-40">•</span>
                  <span>
                    {new Date(articles[0].publishedAt).toLocaleDateString(
                      locale,
                    )}
                  </span>
                </div>
              </div>
            </Link>
          </MotionRevealUp>
        )}

        {/* Compact list for remaining articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {articles.slice(1).map((article, idx) => (
            <MotionRevealUp key={article.id} delay={0.08 * (idx + 1)}>
              <Link
                href={`/articles/${article.slug}?lang=${locale}`}
                className="group flex gap-4 items-center bg-slate-50 hover:bg-white hover:shadow-md transition-all duration-300 rounded-xl overflow-hidden border border-slate-100 p-3"
              >
                <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <LazyImage
                    src={getImageUrl(article.coverImageUrl ?? "")}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug mb-1.5">
                    {article.title}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {new Date(article.publishedAt).toLocaleDateString(locale)}
                  </p>
                </div>
              </Link>
            </MotionRevealUp>
          ))}
        </div>
      </div>
    </section>
  );
};

export const getServerSideProps: GetServerSideProps<{
  articles: PostListItem[];
}> = async (ctx) => {
  const articlesRes = await getPostsByCategory(
    "news",
    { pageSize: 3 },
    { baseUrl: process.env.REQUEST_BASE_URL },
  );
  const articles = articlesRes.items ?? [];
  return {
    props: { articles },
  };
};
