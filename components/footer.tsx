import { useMemo } from "react";
import { MotionRevealUp } from "./animated-text";
import Image from "next/image";
import { useTranslation } from "next-export-i18n";
import { useRouter } from "next/router";
import { LazyImage } from "./lazy-image";

import { LanguageSwitcher } from "./language-switcher";
import { ContactInfo } from "@/lib/api/public-read";
import { pickContactForRouterLang } from "@/lib/pick-contact-for-lang";

export const Footer = ({ contacts }: { contacts: ContactInfo[] }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const contact = useMemo(
    () =>
      pickContactForRouterLang(
        contacts,
        router.query.lang as string | undefined,
      ),
    [contacts, router.query.lang],
  );

  const renderSocialNetworksIcon = (
    type: "LINKEDIN" | "EMAIL" | "WHATSAPP",
  ) => {
    switch (type.toUpperCase()) {
      case "LINKEDIN":
        return (
          <LazyImage
            src="/img/socialnetwork/linkedin.png"
            alt="LinkedIn"
            className="w-full h-full text-black"
          />
        );
      case "EMAIL":
        return (
          <LazyImage
            src="/img/socialnetwork/email.png"
            alt="Email"
            className="w-full h-full text-black"
          />
        );
      case "WHATSAPP":
        return (
          <LazyImage
            src="/img/socialnetwork/whatsapp.png"
            alt="WhatsApp"
            className="w-full h-full text-black"
          />
        );
      default:
        return null;
    }
  };

  return (
    <MotionRevealUp delay={0.2}>
      <div className="w-full relative h-[30rem] md:h-[23rem] pb-16 flex flex-col md:flex-row items-start justify-between bg-[#f8f9fc] overflow-hidden">
        <div className="footer-left flex w-[95%] lg:w-auto flex-col items-start justify-start pl-6 md:pl-24">
          <Image
            className="mt-12 mb-2 ml-[-20px]"
            src="/img/logo.png"
            alt="Logo"
            width={180}
            height={56}
            loading="lazy"
          />

          <div className="flex flex-col text-xs text-left gap-1 text-black">
            <div className="grid grid-cols-2 gap-1 text-black">
              <p>{t("footer.company_name")}</p>
              <p className="text-black"> {t("footer.business1")}</p>
              <p className="text-black"> {t("footer.business2")}</p>
              <p className="text-black"> {t("footer.business3")}</p>
              <p className="text-black"> {t("footer.business4")}</p>
              <p className="text-black"> {t("footer.business5")}</p>
            </div>
            <p className="mb-4 mt-2 font-bold">{t("lite.desc")}</p>
            {contact?.addresses?.map((address) => {
              return (
                <p key={address.region}>
                  {t("company_address")}({address.region}): {address.detail}
                </p>
              );
            })}
            <p>
              {t("business_cooperation")}:{" "}
              {contact?.phone ? `: ${contact.phone}` : contact?.email}
            </p>
          </div>

          <div className="flex text-xs text-left mt-6">
            <p className="text-black">
              {t("footer.copyright", { year: new Date().getFullYear() })}
            </p>
          </div>
        </div>

        <div className="footer-right pl-5 md:pl-0 flex items-center gap-5 md:mt-24 md:pr-24 z-10">
          <div className="footer-sm relative mx-auto flex gap-5">
            {contact?.socialLinks?.map((el) => {
              return (
                <div
                  className="w-6 h-6 opacity-70 hover:opacity-100 active:scale-95 transition-all duration-300"
                  key={el.platform}
                  style={{ color: "black" }}
                >
                  <a href={el.url || ""} target="_blank">
                    {renderSocialNetworksIcon(
                      el.platform as "LINKEDIN" | "EMAIL" | "WHATSAPP",
                    )}
                  </a>
                </div>
              );
            })}
          </div>

          <div className="flex text-xs">
            <LanguageSwitcher variant="full" className="ml-2" />
          </div>
        </div>
      </div>
    </MotionRevealUp>
  );
};
