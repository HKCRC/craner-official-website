import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { appWithTranslation } from "next-i18next";
import { useTranslation } from "next-export-i18n";
import ToastComponent from "@/components/common-dialog";
import { SEO_CONFIG, generateOrganizationSchema, generateLocalBusinessSchema } from "@/constants/seo";

function App({ Component, pageProps }: AppProps) {
  const { t } = useTranslation();

  const siteTitle = t("site_title");
  const siteDescription = t("site_description");
  const siteKeywords = t("site_keywords");
  const ogTitle = t("og_title");
  const ogDescription = t("og_description");

  const organizationSchema = generateOrganizationSchema();
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <div>
      <Head>
        {/* Primary Meta Tags */}
        <title>{siteTitle}</title>
        <meta name="title" content={siteTitle} />
        <meta name="description" content={siteDescription} />
        <meta name="keywords" content={siteKeywords} />
        <meta name="author" content="CraneR Technology Limited" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English, Chinese" />
        <meta name="revisit-after" content="7 days" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={SEO_CONFIG.siteUrl} />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/img/logo.png" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SEO_CONFIG.siteUrl} />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:image" content={`${SEO_CONFIG.siteUrl}/img/banner.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content={SEO_CONFIG.siteName} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="zh_CN" />
        <meta property="og:locale:alternate" content="zh_HK" />
        <meta property="og:locale:alternate" content="zh_TW" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={SEO_CONFIG.siteUrl} />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:description" content={ogDescription} />
        <meta name="twitter:image" content={`${SEO_CONFIG.siteUrl}/img/banner.jpg`} />

        {/* Geo Tags for Hong Kong */}
        <meta name="geo.region" content="HK" />
        <meta name="geo.placename" content="Hong Kong" />
        <meta name="geo.position" content="22.3193;114.1694" />
        <meta name="ICBM" content="22.3193, 114.1694" />

        {/* Theme Color */}
        <meta name="theme-color" content="#1a1a2e" />
        <meta name="msapplication-TileColor" content="#1a1a2e" />

        {/* Additional SEO Tags */}
        <meta name="format-detection" content="telephone=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="CraneR" />

        {/* Alternate Language Links */}
        <link rel="alternate" hrefLang="en" href={`${SEO_CONFIG.siteUrl}/?lang=en`} />
        <link rel="alternate" hrefLang="zh" href={`${SEO_CONFIG.siteUrl}/?lang=zh`} />
        <link rel="alternate" hrefLang="zh-HK" href={`${SEO_CONFIG.siteUrl}/?lang=zh-HK`} />
        <link rel="alternate" hrefLang="zh-TW" href={`${SEO_CONFIG.siteUrl}/?lang=zh-TW`} />
        <link rel="alternate" hrefLang="x-default" href={SEO_CONFIG.siteUrl} />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </Head>
      <ToastComponent />
      <Component {...pageProps} />
    </div>
  );
}

export default appWithTranslation(App);
