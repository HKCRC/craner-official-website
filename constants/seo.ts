// CraneR Technology SEO Configuration
// Domain: craner.hk

export const SEO_CONFIG = {
  siteName: 'CraneR Technology',
  siteUrl: 'https://craner.hk',
  defaultLocale: 'en',
  supportedLocales: ['en', 'zh', 'zh-HK', 'zh-TW'],
  
  // Social Media & Contact
  social: {
    whatsapp: '+852 64378432',
    email: 'contact@craner.hk',
  },
  
  // Default OG Image (should be 1200x630px)
  defaultOgImage: '/img/og-image.jpg',
  
  // Company Info for JSON-LD
  organization: {
    name: 'CraneR Technology Limited',
    legalName: 'CraneR Technology Limited',
    foundingDate: '2024',
    logo: 'https://craner.hk/img/logo.png',
    address: {
      hk: {
        streetAddress: '17W, Hong Kong Science Park',
        addressLocality: 'New Territories',
        addressRegion: 'Hong Kong',
        addressCountry: 'HK',
      },
      cn: {
        streetAddress: '深圳市前海深港合作区南山街道梦海大道5188号前海深港青年梦工场北区L栋202',
        addressLocality: 'Shenzhen',
        addressRegion: 'Guangdong',
        addressCountry: 'CN',
      },
    },
    contactPoint: {
      telephone: '+852 64378432',
      contactType: 'customer service',
      availableLanguage: ['English', 'Chinese'],
    },
  },
  
  // Keywords by language
  keywords: {
    en: [
      // CraneR Brand Keywords
      'CraneR',
      'CraneR Technology',
      'CraneR HK',
      'CraneR Hong Kong',
      'craner.hk',
      'CraneR AI crane',
      'CraneR tower crane system',
      'CraneR intelligent crane',
      'CraneR construction technology',
      'CraneR unmanned crane',
      // Core Technology Keywords
      'intelligent construction',
      'AI crane system',
      'construction technology',
      'tower crane AI',
      'construction safety',
      'IoT construction',
      'smart construction',
      'automated crane',
      'construction automation',
      'Hong Kong construction tech',
      'InnoHK',
      'HKCRC',
      'construction robotics',
      'unmanned tower crane',
      'autonomous crane',
      'smart tower crane Hong Kong',
      'AI construction Hong Kong',
      'Hong Kong Centre for Construction Robotics',
      'remote crane operation',
      'crane automation system',
      // Additional Brand & Location Keywords
      'Hong Kong smart crane',
      'HK construction AI',
      'Hong Kong Science Park startup',
      'AI tower crane Hong Kong',
      'intelligent construction Hong Kong',
      'construction tech startup HK',
    ],
    zh: [
      '智能建造',
      'AI塔吊系统',
      '建筑科技',
      '塔式起重机AI',
      '施工安全',
      '物联网建造',
      '智慧工地',
      '自动化起重机',
      '建筑自动化',
      '香港建筑科技',
      '可越科技',
      '智能塔吊',
      '无人塔吊',
      'HKCRC',
      '香港智能建造研发中心',
      '塔吊自动化',
      '远程塔吊操控',
      '塔吊AI系统',
      '香港建造科技',
      'InnoHK',
    ],
    'zh-HK': [
      '智能建造',
      'AI天秤系統',
      '建築科技',
      '塔式起重機AI',
      '施工安全',
      '物聯網建造',
      '智慧工地',
      '自動化起重機',
      '建築自動化',
      '香港建築科技',
      '可越科技',
      '智能塔吊',
      '無人塔吊',
      'HKCRC',
      '香港智能建造研發中心',
      '天秤自動化',
      '遙距天秤操控',
      '天秤AI系統',
      '香港建造科技',
      'InnoHK',
      '智能天秤',
      '無人天秤',
    ],
    'zh-TW': [
      '智能建造',
      'AI天秤系統',
      '建築科技',
      '塔式起重機AI',
      '施工安全',
      '物聯網建造',
      '智慧工地',
      '自動化起重機',
      '建築自動化',
      '香港建築科技',
      '可越科技',
      '智能塔吊',
      '無人塔吊',
      'HKCRC',
      '香港智能建造研發中心',
      '塔吊自動化',
      '遠端塔吊操控',
      '塔吊AI系統',
      '香港建造科技',
      'InnoHK',
    ],
  },
};

// Article SEO Configuration
export const ARTICLE_SEO = {
  // 文章特定关键词
  articleKeywords: {
    en: [
      // CraneR Brand
      'CraneR',
      'CraneR Technology',
      'CraneR HK',
      'CraneR Hong Kong',
      'CraneR AI crane system',
      'CraneR tower crane',
      // Core Keywords
      'AI tower crane',
      'smart tower crane',
      'unmanned tower crane',
      'Hong Kong construction',
      'HKCRC',
      'Hong Kong Centre for Construction Robotics',
      'InnoHK',
      'construction automation',
      'crane AI system',
      'Pak Tin Estate',
      'Housing Authority',
      'public housing Hong Kong',
      'construction safety innovation',
      'remote crane control',
      'intelligent construction Hong Kong',
      // Additional Keywords
      'autonomous tower crane Hong Kong',
      'AI crane Hong Kong',
      'smart construction HK',
      'Hong Kong Housing Authority AI',
    ],
    zh: [
      'AI塔吊',
      '智能塔吊',
      '无人塔吊',
      '香港建造',
      'HKCRC',
      '香港智能建造研发中心',
      'InnoHK',
      '建筑自动化',
      '塔吊AI系统',
      '白田邨',
      '房屋署',
      '香港公营房屋',
      '施工安全创新',
      '远程塔吊操控',
      '香港智能建造',
      '可越科技',
    ],
    'zh-HK': [
      'AI天秤',
      '智能天秤',
      '無人天秤',
      '香港建造',
      'HKCRC',
      '香港智能建造研發中心',
      'InnoHK',
      '建築自動化',
      '天秤AI系統',
      '白田邨',
      '房屋署',
      '香港公營房屋',
      '施工安全創新',
      '遙距天秤操控',
      '香港智能建造',
      '可越科技',
    ],
  },
};

// Generate Article JSON-LD Schema
export const generateArticleSchema = (article: {
  title: string;
  subtitle: string;
  content: string;
  coverImage: string;
  date: string;
  id: string;
  locale: string;
}) => {
  const { organization, siteUrl } = SEO_CONFIG;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.subtitle,
    image: `${siteUrl}${article.coverImage}`,
    datePublished: article.date.replace(/\//g, '-'),
    dateModified: article.date.replace(/\//g, '-'),
    author: {
      '@type': 'Organization',
      name: organization.name,
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: organization.name,
      logo: {
        '@type': 'ImageObject',
        url: organization.logo,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/articles/${article.id}?lang=${article.locale}`,
    },
    keywords: ARTICLE_SEO.articleKeywords[article.locale as keyof typeof ARTICLE_SEO.articleKeywords] || ARTICLE_SEO.articleKeywords.en,
    inLanguage: article.locale === 'zh-HK' ? 'zh-Hant-HK' : article.locale === 'zh' ? 'zh-Hans' : 'en',
    about: [
      { '@type': 'Thing', name: 'AI Tower Crane' },
      { '@type': 'Thing', name: 'Smart Construction' },
      { '@type': 'Thing', name: 'Hong Kong Construction Technology' },
      { '@type': 'Thing', name: 'Unmanned Tower Crane' },
      { '@type': 'Organization', name: 'HKCRC' },
      { '@type': 'Organization', name: 'CraneR Technology' },
      { '@type': 'Organization', name: 'InnoHK' },
    ],
  };
};

// Generate JSON-LD Organization Schema
export const generateOrganizationSchema = () => {
  const { organization, siteUrl } = SEO_CONFIG;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: organization.name,
    legalName: organization.legalName,
    alternateName: ['CraneR', 'CraneR HK', 'CraneR Technology', '可越科技'],
    url: siteUrl,
    logo: organization.logo,
    foundingDate: organization.foundingDate,
    description: 'CraneR Technology is a Hong Kong-based high-tech company specializing in AI tower crane systems, intelligent construction, and unmanned crane technology. Developed in collaboration with HKCRC (Hong Kong Centre for Construction Robotics) under InnoHK.',
    slogan: 'Intelligent Construction, Safer Tomorrow',
    knowsAbout: [
      'AI Tower Crane',
      'Intelligent Construction',
      'Unmanned Tower Crane',
      'Construction Automation',
      'Smart Construction Technology',
    ],
    address: [
      {
        '@type': 'PostalAddress',
        ...organization.address.hk,
      },
      {
        '@type': 'PostalAddress',
        ...organization.address.cn,
      },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      ...organization.contactPoint,
    },
    sameAs: [],
    memberOf: {
      '@type': 'Organization',
      name: 'Hong Kong Centre for Construction Robotics (HKCRC)',
      url: 'https://hkcrc.hk',
    },
    parentOrganization: {
      '@type': 'Organization',
      name: 'InnoHK',
    },
  };
};

// Generate JSON-LD WebSite Schema
export const generateWebsiteSchema = () => {
  const { siteName, siteUrl } = SEO_CONFIG;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
};

// Generate JSON-LD LocalBusiness Schema
export const generateLocalBusinessSchema = () => {
  const { organization, siteUrl } = SEO_CONFIG;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'TechnologyCompany',
    name: organization.name,
    alternateName: ['CraneR', 'CraneR HK', 'CraneR Technology', '可越科技'],
    url: siteUrl,
    logo: organization.logo,
    image: organization.logo,
    description: 'CraneR Technology (craner.hk) is a Hong Kong-based pioneering high-tech company specializing in AI tower crane systems, unmanned tower crane technology, and intelligent construction machinery. Developed in collaboration with HKCRC under InnoHK, CraneR integrates AI, IoT, and automated control systems for smart construction.',
    address: {
      '@type': 'PostalAddress',
      ...organization.address.hk,
    },
    telephone: organization.contactPoint.telephone,
    priceRange: '$$$$',
    areaServed: ['Hong Kong', 'China', 'Asia Pacific', 'Greater Bay Area'],
    serviceType: [
      'AI Tower Crane Systems',
      'Unmanned Tower Crane Technology',
      'Intelligent Construction Machinery',
      'AI Safety Monitoring Systems',
      'Construction Automation',
      'Remote Crane Control Systems',
      'Smart Construction Solutions',
    ],
    keywords: 'CraneR, CraneR HK, CraneR Technology, AI tower crane, unmanned tower crane, intelligent construction, HKCRC, Hong Kong construction tech, smart crane Hong Kong',
    knowsAbout: [
      'AI Tower Crane',
      'Unmanned Tower Crane',
      'Intelligent Construction',
      'Construction Robotics',
      'HKCRC',
      'InnoHK',
    ],
  };
};

