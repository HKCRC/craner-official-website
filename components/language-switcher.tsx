import { useRouter } from "next/router";
import { useEffect } from "react";

interface LanguageSwitcherProps {
  className?: string;
  isDark?: boolean;
  variant?: "minimal" | "full";
}

/**
 * 根据浏览器语言获取默认语言
 * - 英语地区 → en
 * - 中文地区 → zh-HK (繁体中文)
 */
function getPrimaryLanguage() {
  return (
    (navigator.languages && navigator.languages[0]) || navigator.language || ""
  );
}

function isPrimaryEnglish() {
  const lang = getPrimaryLanguage().toLowerCase();
  return lang.startsWith("en");
}

const getDefaultLang = (): string => {
  if (isPrimaryEnglish()) return "en";

  // 中文环境默认繁体
  return "zh-HK";
};

export const LanguageSwitcher = ({
  className,
  isDark = false,
  variant = "minimal",
}: LanguageSwitcherProps) => {
  const router = useRouter();
  const currentLang = (router.query.lang as string) || getDefaultLang();

  // 首次加载时，如果 URL 没有 lang 参数，自动设置
  useEffect(() => {
    if (!router.query.lang && router.isReady) {
      const detectedLang = getDefaultLang();
      router.replace(
        {
          pathname: router.pathname,
          query: { ...router.query, lang: detectedLang },
        },
        undefined,
        { shallow: true }
      );
    }
  }, [router.isReady]);

  const switchLang = (lang: string) => {
    router.push({ pathname: router.pathname, query: { lang } }, undefined, {
      shallow: true,
    });
  };

  if (variant === "full") {
    return (
      <div className={`flex text-xs ${className}`}>
        <select
          value={currentLang}
          onChange={(e) => switchLang(e.target.value)}
          className="px-3 py-2 text-black bg-white border border-gray-300 rounded-md cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="zh">简体中文</option>
          <option value="zh-HK">繁體中文</option>
          <option value="en">English</option>
        </select>
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className}`}>
      <select
        value={currentLang}
        onChange={(e) => switchLang(e.target.value)}
        className={`bg-transparent text-sm md:text-sm cursor-pointer focus:outline-none appearance-none pr-1 font-medium ${
          isDark ? "text-slate-900" : "text-white"
        }`}
      >
        <option value="zh" className="text-black">
          简体中文
        </option>
        <option value="zh-HK" className="text-black">
          繁體中文
        </option>
        <option value="en" className="text-black">
          English
        </option>
      </select>
      <div
        className={`pointer-events-none ${
          isDark ? "text-slate-900" : "text-white"
        }`}
      >
        <svg
          className="w-3 h-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};
