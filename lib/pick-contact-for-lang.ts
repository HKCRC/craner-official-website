import type { ContactInfo } from "@/lib/api/public-read";

function normalizeLocaleToken(s: string): string {
  return s.trim().toLowerCase().replace(/_/g, "-");
}

/**
 * Normalized `router.query.lang` values the site uses (en / zh / zh-HK / zh-TW, …)
 * mapped to possible `ContactInfo.locale` strings from the public API
 * (e.g. EN / ZH_HANS / ZH_HANT or lowercase variants).
 */
function acceptedContactLocaleKeys(
  routerLang: string | undefined,
): Set<string> {
  const raw = normalizeLocaleToken(routerLang ?? "zh-HK");
  const keys = new Set<string>();

  const add = (...vals: string[]) => {
    for (const v of vals) keys.add(normalizeLocaleToken(v));
  };

  if (raw === "en") {
    add("en", "EN");
    return keys;
  }

  if (raw === "zh") {
    add("zh", "zh-hans", "ZH_HANS", "zh_cn", "zh-cn");
    return keys;
  }

  if (
    raw === "zh-hk" ||
    raw === "zh-tw" ||
    raw === "zhtw" ||
    raw === "zhhk"
  ) {
    add("zh-hk", "zh-hant", "ZH_HANT", "zh_tw", "zh-tw");
    return keys;
  }

  add(raw);
  return keys;
}

/**
 * Pick the contact block for the current URL language, matching API locale
 * labels case- and separator-insensitively.
 */
export function pickContactForRouterLang(
  contacts: ContactInfo[],
  routerLang: string | undefined,
): ContactInfo | null {
  if (!contacts?.length) return null;
  const accepted = acceptedContactLocaleKeys(routerLang);
  const hit = contacts.find((c) =>
    accepted.has(normalizeLocaleToken(String(c.locale))),
  );
  return hit ?? null;
}
