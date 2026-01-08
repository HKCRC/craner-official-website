import { businessEmail } from "@/constants";
import getUserLocale from "get-user-locale";
import { t } from "i18next";
import { useSearchParam } from "react-use";

// Save as func for further usage
export const useIsCN = () => {
  const userLocale = getUserLocale();
  const overwriteRegion = useSearchParam("region");
  if (overwriteRegion) return overwriteRegion === "zh-CN";
  else return userLocale === "zh-CN";
};

// Save as func for further usage
export const useIsAllowMultiSubmit = () => {
  const overwriteAllowMultiSubmit = useSearchParam("allow_multi_submit");
  if (overwriteAllowMultiSubmit) return true;
  else false;
};

interface SocialNetworkItem {
  name: string;
  path: string;
  link?: string;
  qrcode?: string;
}

export const socialNetworks: SocialNetworkItem[] = [
  {
    name: t("social.email"),
    path: "/img/socialnetwork/email.png",
    link: `mailto:${businessEmail}`,
  },
  {
    name: t("social.whatsapp"),
    path: "/img/socialnetwork/whatsapp.png",
    link: "https://wa.me/85264378432?text=Hello, I'm interested in your services.",
  },
];

export const galleryImages = (() => {
  const res = [];
  for (let i = 0; i < 25; i++) {
    res.push(`./img/render/gallery/${i + 1}.png`);
  }
  return res;
})();
