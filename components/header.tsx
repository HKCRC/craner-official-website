import { useWindowSize } from "react-use";
import { MotionRevealUp } from "./animated-text";
import { useRouter } from "next/router";
import { useTranslation } from "next-export-i18n";
import { subtitleGradient2 } from "@/constants";
import { getTextGradientStyle } from "./text-block";

export const Header = () => {
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const router = useRouter();
  const currentLang = router.query.lang as string;

  return (
    <div className="main md:max-w-5xl h-[400px] md:h-[750px]">
      <div
        style={{
          backgroundColor: "#0F172A",
          backgroundImage: "url('/img/banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.7)",
        }}
        className="h-[400px] md:h-[750px] w-full absolute top-0 left-0 overflow-hidden"
      >
        {/* 顶部阴影遮罩，增加导航栏清晰度 */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black/50 to-transparent z-20 pointer-events-none"></div>

        <video
          src="/video/indexvideo.webm"
          poster="/img/banner.jpg"
          className="object-cover w-full h-full brightness-90 contrast-125"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      <div className="flex-col gap-10 md:gap-0 mt-5 lg:mt-16 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center my-10 md:pt-16 mx-8 z-20 text-center">
          {/* 标题 */}
          <MotionRevealUp delay={0.4} className="mt-4">
            <div
              className={`${
                currentLang === "en" && width < 768 ? "text-xl" : "text-3xl"
              } md:text-5xl font-bold`}
            >
              {t("lite.title2")}
            </div>
          </MotionRevealUp>

          <MotionRevealUp delay={0.65} className="mt-3 lg:mt-5">
            <div
              className={`${
                currentLang === "en" && width < 768 ? "text-lg" : "text-3xl"
              } md:text-5xl font-bold`}
            >
              <span style={getTextGradientStyle(subtitleGradient2)}>
                {t("lite.title3")}
              </span>
            </div>
          </MotionRevealUp>
        </div>
      </div>
    </div>
  );
};
