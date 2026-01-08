import { MotionRevealUp } from "./animated-text";
import Image from "next/image";
import { useTranslation } from "next-export-i18n";
import { useRouter } from "next/router";
import { socialNetworks } from "@/scripts/utils";

import { LanguageSwitcher } from "./language-switcher";

export const Footer = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const currentLang = router.query.lang as string;

  return (
    <MotionRevealUp delay={0.2}>
      <div className="w-full relative h-[30rem] md:h-[23rem] pb-16 flex flex-col md:flex-row items-start justify-between bg-[#f8f9fc] overflow-hidden">
        <Image
          className="absolute bottom-0 left-0 z-10"
          src="/bg.svg"
          alt="Logo"
          width={450}
          height={50}
        />
        <div className="footer-left flex w-[95%] lg:w-auto flex-col items-start justify-start pl-6 md:pl-24">
          <Image
            className="mt-12 mb-2 ml-[-20px]"
            src="/img/logo.png"
            alt="Logo"
            width={180}
            height={56}
          />

          <div className="flex flex-col text-xs text-left gap-1 text-black">
            <div className="grid grid-cols-2 gap-1 text-black">
              <p>{t("footer.company_name")}</p>
              <p className="text-black"> 智慧塔吊解决方案</p>
              <p className="text-black"> CMP</p>
              <p className="text-black"> DWSS</p>
              <p className="text-black"> 4S智慧工地系统</p>
              <p className="text-black"> 智慧工地定制化解决方案</p>
            </div>
            <p className="mb-4 mt-2 font-bold">{t("lite.desc")}</p>
            <p>{t("footer.address")}</p>
            <p>{t("footer.address2")}</p>
            <p>{t("footer.contact")}</p>
          </div>

          <div className="flex text-xs text-left mt-6">
            <p className="text-black">
              {t("footer.copyright", { year: new Date().getFullYear() })}
            </p>
          </div>
        </div>

        <div className="footer-right pl-5 md:pl-0 flex items-center gap-5 md:mt-24 md:pr-24 z-10">
          <div className="footer-sm relative mx-auto flex gap-5">
            {socialNetworks.map((el) => {
              return (
                <div
                  className="w-6 h-6 opacity-70 hover:opacity-100 active:scale-95 transition-all duration-300"
                  key={el.link}
                  style={{ color: "black" }}
                >
                  <a href={el.link ? el.link : el.qrcode} target="_blank">
                    <img
                      src={el.path}
                      alt={el.name}
                      className="w-full h-full text-black"
                    />
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
