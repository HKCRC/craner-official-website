

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