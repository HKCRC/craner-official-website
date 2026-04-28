import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { useTranslation } from "next-export-i18n";
import { Outfit } from "next/font/google";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { LazyImage } from "@/components/lazy-image";
import { MotionRevealUp } from "@/components/animated-text";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import {
  getPostsByCategory,
  type Config,
  type PostListItem,
} from "@/lib/api/public-read";
import { getPublicConfigCached } from "@/lib/data/public-config-cache";
import { getImageUrl } from "@/lib/helper";
import { usePublicConfig } from "@/lib/public-config-context";

const outfit = Outfit({ subsets: ["latin"] });

export default function CasesArchive({
  cases,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation();
  const router = useRouter();
  const locale = (router.query.lang as string) || "zh-HK";
  const config = usePublicConfig();

  const renderTitleAndSubTitle = () => {
    switch (locale) {
      case "en":
        return {
          title: config?.["business_title_en"],
          subtitle: config?.["business_subtitle_en"],
          label: config?.["business_tag_en"],
        };

      case "zh-HK":
        return {
          title: config?.["business_title_chhk"],
          subtitle: config?.["business_subtitle_chhk"],
          label: config?.["business_tag_chhk"],
        };
      default:
        return {
          title: config?.["business_title_ch"],
          subtitle: config?.["business_subtitle_ch"],
          label: config?.["business_tag_ch"],
        };
    }
  };

  return (
    <div className={`min-h-screen bg-white ${outfit.className}`}>
      <Head>
        <title>{renderTitleAndSubTitle()?.title}</title>
        <meta name="description" content={renderTitleAndSubTitle()?.subtitle} />
        <meta name="robots" content="index, follow" />
      </Head>

      <Nav />

      {/* Hero */}
      <div className="w-full bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <MotionRevealUp>
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4">
              {renderTitleAndSubTitle()?.label}
            </p>
          </MotionRevealUp>
          <MotionRevealUp delay={0.1}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
              {renderTitleAndSubTitle()?.title}
            </h1>
          </MotionRevealUp>
          <MotionRevealUp delay={0.2}>
            <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
              {renderTitleAndSubTitle()?.subtitle}
            </p>
          </MotionRevealUp>
        </div>
      </div>

      {/* Cases List */}
      <div className="max-w-6xl mx-auto px-6 md:px-6 py-16">
        {/* Back to home */}
        <Link
          href={`/?lang=${locale}`}
          className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 mb-12 transition-colors group"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((data, idx) => (
            <MotionRevealUp
              key={data.id}
              delay={0.05 * idx}
              className="flex h-full"
            >
              <Link
                href={`/cases/${data.slug ?? ""}?lang=${locale}`}
                className="group flex flex-col w-full bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-500 rounded-3xl overflow-hidden border border-slate-100"
              >
                {/* Cover Image */}
                <div className="h-52 overflow-hidden relative flex-shrink-0">
                  <LazyImage
                    src={getImageUrl(data.coverImageUrl ?? "")}
                    alt={data.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  {data.tags?.length > 0 && (
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

                  <h2 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                    {data.title}
                  </h2>
                  <p className="text-sm text-gray-500 font-light line-clamp-3 leading-relaxed flex-1">
                    {data.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      {data.client &&
                        data.client.split(",").map((client) => (
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
                            <span>{client}</span>
                          </>
                        ))}
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(data.publishedAt).toLocaleDateString(locale, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </Link>
            </MotionRevealUp>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  cases: PostListItem[];
  config: Config;
}> = async (ctx) => {
  const casesRes = await getPostsByCategory(
    "cases",
    { pageSize: 8 },
    { baseUrl: process.env.REQUEST_BASE_URL },
  );
  const config = await getPublicConfigCached({
    baseUrl: process.env.REQUEST_BASE_URL,
  });
  const cases = casesRes.items ?? [];
  return {
    props: { cases, config },
  };
};
