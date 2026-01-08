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
    ],
  },
};

// Generate JSON-LD Organization Schema
export const generateOrganizationSchema = () => {
  const { organization, siteUrl } = SEO_CONFIG;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: organization.name,
    legalName: organization.legalName,
    url: siteUrl,
    logo: organization.logo,
    foundingDate: organization.foundingDate,
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
    url: siteUrl,
    logo: organization.logo,
    image: organization.logo,
    description: 'CraneR Technology is a pioneering high-tech company specializing in intelligent construction engineering machinery, integrating AI, IoT, and automated control systems.',
    address: {
      '@type': 'PostalAddress',
      ...organization.address.hk,
    },
    telephone: organization.contactPoint.telephone,
    priceRange: '$$$$',
    areaServed: ['Hong Kong', 'China', 'Asia Pacific'],
    serviceType: [
      'Intelligent Construction Machinery',
      'AI Safety Systems',
      'Construction Automation',
      'Tower Crane AI Systems',
    ],
  };
};

