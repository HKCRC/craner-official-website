import { useSelectedLanguage, useTranslation } from "next-export-i18n";
import { TextBlockRow } from "./text-block";
import {
  VIDEO_INTRO_ENUM,
  matchText,
  sliderImagesMultiView,
  subtitleGradient1,
} from "@/constants";
import { HorizontalSlider } from "./sliders";
import Typewriter from "typewriter-effect";
import { useEffect, useState } from "react";

export const VideoIntro = () => {
  const { t } = useTranslation();
  const [currentShowTypeElTop, setCurrentShowTypeElTop] =
    useState<JSX.Element>();
  const [currentShowTypeElBottom, setCurrentShowTypeElBottom] =
    useState<JSX.Element>();
  const currentLang = useSelectedLanguage().lang;

  useEffect(() => {
    setCurrentShowTypeElTop(getTypeEl(0, VIDEO_INTRO_ENUM.TOP));
    setCurrentShowTypeElBottom(getTypeEl(0, VIDEO_INTRO_ENUM.BOTTOM));
  }, [currentLang]);

  function getTypeEl(index: number, pos: VIDEO_INTRO_ENUM) {
    return (
      <div className="mt-3 mb-3">
        <Typewriter
          options={{
            strings: matchText(t)[index],
            autoStart: true,
            loop: false,
            delay: 50,
          }}
        />
      </div>
    );
  }

  function setTypewriterEl(index: number, pos: VIDEO_INTRO_ENUM) {
    const el = getTypeEl(index, pos);
    return pos === VIDEO_INTRO_ENUM.TOP
      ? setCurrentShowTypeElTop(el)
      : setCurrentShowTypeElBottom(el);
  }

  return (
    <section className="w-full py-6 md:py-8 overflow-hidden relative bg-white">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="flex gap-12 md:gap-24 mb-12">
        <TextBlockRow
          textBlockProps={{
            title: t("video_prompts_module.feature_01_title"),
            subtitle: currentShowTypeElTop,
            subtitleGradient: subtitleGradient1,
            subtitleClassName: "skyblue",
            desc: t("video_prompts_module.feature_01_intro"),
          }}
        >
          <div className="h-full w-full shadow-lg rounded-3xl overflow-hidden ring-1 ring-slate-200">
            <HorizontalSlider
              selectIndex={(idx) => setTypewriterEl(idx, VIDEO_INTRO_ENUM.TOP)}
              sliders={sliderImagesMultiView(t)}
            />
          </div>
        </TextBlockRow>

        {/* <TextBlockRow
          textBlockProps={{
            title: t("video_prompts_module.feature_02_title"),
            subtitle: currentShowTypeElBottom,
            subtitleGradient: subtitleGradient2,
            subtitleClassName: "purple",
            desc: t("video_prompts_module.feature_02_intro"),
          }}
          isReverse
        >
          <div className="h-full w-full shadow-2xl rounded-3xl overflow-hidden ring-1 ring-slate-200">
            <HorizontalSlider
              selectIndex={(idx) =>
                setTypewriterEl(idx, VIDEO_INTRO_ENUM.BOTTOM)
              }
              sliders={sliderImagesMultiStyle(t)}
            />
          </div>
        </TextBlockRow> */}
      </div>
    </section>
  );
};
