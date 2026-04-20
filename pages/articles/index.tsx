import { useState, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { LazyImage } from "@/components/lazy-image";
import { MotionRevealUp } from "@/components/animated-text";
import { articles } from "@/constants/articles";

export default function ArticlesArchive() {
  const router = useRouter();
  const locale = (router.query.lang as string) || "zh-HK";
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const articleList = useMemo(() => {
    return Object.entries(articles).map(([id, langs]) => {
      const data =
        langs[locale as "zh" | "en" | "zh-HK"] ||
        langs["zh-HK"] ||
        Object.values(langs)[0];
      return { id, ...data };
    });
  }, [locale]);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    articleList.forEach((a) => a.tags?.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet);
  }, [articleList]);

  const filtered = useMemo(() => {
    return articleList.filter((a) => {
      const matchSearch =
        !search ||
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.subtitle.toLowerCase().includes(search.toLowerCase());
      const matchTag = !activeTag || a.tags?.includes(activeTag);
      return matchSearch && matchTag;
    });
  }, [articleList, search, activeTag]);

  const pageTitle =
    locale === "en"
      ? "News & Insights | CraneR Technology"
      : "最新動態 | CraneR 可越科技";

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content="CraneR 最新消息、項目案例與智能建造行業洞察"
        />
      </Head>

      <Nav />

      {/* Page Hero */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 pt-32 pb-16 px-6 md:px-0">
        <div className="max-w-6xl mx-auto">
          <MotionRevealUp>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-blue-400" />
              <span className="text-blue-400 font-bold text-sm uppercase tracking-[0.2em]">
                News & Insights
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {locale === "en" ? "Latest News" : "最新動態"}
            </h1>
            <p className="text-slate-400 text-base max-w-xl leading-relaxed">
              {locale === "en"
                ? "Project highlights, industry insights and technology updates from CraneR."
                : "CraneR 最新項目案例、行業洞察與技術動態"}
            </p>
          </MotionRevealUp>

          {/* Search bar */}
          <MotionRevealUp delay={0.1} className="mt-8 max-w-lg">
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder={locale === "en" ? "Search articles..." : "搜尋文章..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/15 transition-all"
              />
            </div>
          </MotionRevealUp>
        </div>
      </div>

      {/* Tag filters */}
      <div className="border-b border-slate-100 sticky top-[60px] z-30 bg-white/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 md:px-0 py-3 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTag(null)}
            className={`flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
              activeTag === null
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-500 hover:bg-slate-200"
            }`}
          >
            {locale === "en" ? "All" : "全部"}
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                activeTag === tag
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Articles grid */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">

        {/* Back to home */}
        <Link
          href={`/?lang=${locale}`}
          className="inline-flex items-center text-sm text-slate-400 hover:text-blue-600 mb-10 transition-colors group"
        >
          <svg className="w-4 h-4 mr-1.5 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {locale === "en" ? "Back to Home" : "返回首頁"}
        </Link>

        {filtered.length === 0 ? (
          <div className="text-center py-24 text-slate-400">
            <svg className="w-12 h-12 mx-auto mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-sm">{locale === "en" ? "No articles found" : "找不到相關文章"}</p>
          </div>
        ) : (
          <>
            <p className="text-xs text-slate-400 mb-6">
              {locale === "en" ? `${filtered.length} articles` : `共 ${filtered.length} 篇文章`}
            </p>

            {/* First article — featured wide card */}
            {filtered[0] && (
              <motion.div
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="mb-6"
              >
                <Link
                  href={`/articles/${filtered[0].id}?lang=${locale}`}
                  className="group flex flex-col md:flex-row bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-400 rounded-2xl overflow-hidden border border-slate-100"
                >
                  <div className="md:w-2/5 overflow-hidden flex-shrink-0">
                    <div className="w-full h-56 md:h-72">
                      <LazyImage
                        src={filtered[0].coverImage}
                        alt={filtered[0].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-between p-7 md:p-10 flex-1">
                    <div>
                      {filtered[0].tags && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {filtered[0].tags.slice(0, 4).map((tag) => (
                            <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                        {filtered[0].title}
                      </h2>
                      <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">
                        {filtered[0].subtitle}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-6">
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                        <span>CraneR Technology</span>
                        <span className="opacity-40">•</span>
                        <span>{filtered[0].date}</span>
                      </div>
                      <span className="text-xs text-blue-600 font-semibold group-hover:underline flex items-center gap-1">
                        {locale === "en" ? "Read more" : "閱讀全文"}
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Rest — 2-column card grid */}
            {filtered.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filtered.slice(1).map((article, idx) => (
                  <motion.div
                    key={article.id}
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.35, ease: "easeInOut", delay: 0.05 * idx }}
                  >
                    <Link
                      href={`/articles/${article.id}?lang=${locale}`}
                      className="group flex gap-4 bg-slate-50 hover:bg-white hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden border border-slate-100 p-4"
                    >
                      <div className="w-24 h-20 md:w-28 md:h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <LazyImage
                          src={article.coverImage}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          {article.tags && (
                            <div className="flex flex-wrap gap-1 mb-1.5">
                              {article.tags.slice(0, 2).map((tag) => (
                                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                          <h3 className="text-sm font-bold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug mb-1">
                            {article.title}
                          </h3>
                          <p className="text-xs text-slate-400 line-clamp-1 leading-relaxed">
                            {article.subtitle}
                          </p>
                        </div>
                        <p className="text-xs text-slate-400 mt-2">{article.date}</p>
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
