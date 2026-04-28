

export const getImageUrl = (url: string) => {
  if (!url || url.startsWith("http")) {
    return url;
  }
  const baseUrl =
    process.env.NEXT_PUBLIC_REQUEST_BASE_URL ||
    process.env.REQUEST_BASE_URL ||
    "";
  return `${baseUrl}${url}`;
};

export const langToCategory = (lang: string) => {
  const currentLang = (lang as string) || "zh-HK";
  switch (currentLang) {
    case "zh-HK":
      return "hk";
    case "en":
      return "en";
    default:
      return "cn";
  }
};