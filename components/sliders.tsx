import { useCallback, useMemo, useState } from "react";
import { useWindowSize } from "react-use";
import { CommonDialogManager } from "./common-dialog";
import { useSelectedLanguage, useTranslation } from "next-export-i18n";

function YoutubeEmbed({ src }: { src: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { t } = useTranslation();
  return (
    <div className="w-[90vw] max-w-[560px] aspect-video rounded-xl overflow-hidden relative bg-black">
      {/* Loading 提示 */}
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white z-10">
          <div className="w-10 h-10 border-3 border-white/30 border-t-white rounded-full animate-spin mb-4"></div>
          <p className="text-sm text-center px-4 text-gray-300">
            {t("youtube.loading")}
          </p>
          <p className="text-xs text-center px-4 mt-2 text-gray-500">
            {t("youtube.loading_desc")}
          </p>
        </div>
      )}
      <iframe
        className="w-full h-full relative z-20"
        src={src}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        onLoad={() => setIsLoaded(true)}
      ></iframe>
    </div>
  );
}

interface HorizontalSliderProps {
  sliders: SliderValue[];
  selectIndex: (idx: number) => void;
}

export interface SliderValue {
  name: string;
  path?: string;
  poster?: string;
}

export function SlideController({
  sliders,
  currentIdx,
  setCurrentIdx,
}: {
  sliders: SliderValue[];
  currentIdx: number;
  setCurrentIdx: (idx: number) => void;
}) {
  const currentLang = useSelectedLanguage().lang;
  const isEnglish = currentLang === "en";

  return (
    <div className="section-controller-inner ml-auto mr-auto flex justify-center rounded-full p-1 bg-slate-200/50 backdrop-blur-md border border-slate-300/50">
      {sliders.map((el, elIdx) => {
        return (
          <div
            className={`section-controller-single text-xs md:text-sm min-w-fit px-6 py-2 rounded-full text-center cursor-pointer transition-all duration-300 ${
              elIdx === currentIdx
                ? "bg-white text-blue-600 shadow-sm font-bold"
                : "text-slate-500 hover:text-slate-800"
            }`}
            key={`c-${elIdx}`}
            onClick={() => setCurrentIdx(elIdx)}
          >
            <p style={isEnglish ? { fontSize: "10px" } : undefined}>
              {el.name}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export function HorizontalSlider(props: HorizontalSliderProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const { selectIndex, sliders } = props;
  const isMobile = useWindowSize().width < 768;

  const getCurrentIndexVideo = useCallback(() => {
    return sliders[currentIdx].path || "";
  }, [currentIdx, sliders]);

  const getCurrentIndexPoster = useCallback(() => {
    return sliders[currentIdx].poster || "";
  }, [currentIdx, sliders]);

  const videoOptions = useMemo(() => {
    if (!isMobile) {
      return {
        src: getCurrentIndexVideo(),
        autoPlay: true,
        loop: true,
        muted: true,
      };
    } else {
      return {
        loop: false,
        poster: getCurrentIndexPoster(),
      };
    }
  }, [getCurrentIndexPoster, getCurrentIndexVideo, isMobile]);

  const openVideo = () => {
    if (currentIdx === 1) {
      openYoutubeVideo();
      return;
    }
    const videoEl = (
      <div className="w-4/5 rounded-xl overflow-hidden">
        <video className="" src={getCurrentIndexVideo()} controls />
      </div>
    );
    CommonDialogManager.current?.show(videoEl);
  };

  const openYoutubeVideo = () => {
    const youtubeEl = (
      <YoutubeEmbed src="https://www.youtube.com/embed/kInBqv17FFE?si=RsREjwP_GDaer1Lp" />
    );
    CommonDialogManager.current?.show(youtubeEl);
  };

  return (
    <div className="w-full h-full bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 flex items-center justify-center relative group">
      <div className="section-inner relative w-full h-full">
        <div className="section-imgs w-full h-full">
          <div
            className="absolute left-5 top-5 z-20 p-3 bg-white/80 hover:bg-white backdrop-blur shadow-sm border border-slate-200 rounded-full cursor-pointer transition-all active:scale-95"
            onClick={openVideo}
          >
            <svg
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
            >
              <path
                d="M785.916 378.115C621.622 289.254 522.65 200.413 358.355 111.53 194.06 22.643 111.93 67.101 111.93 244.802v533.194c0 177.75 82.151 222.18 246.425 133.341 164.295-88.93 263.266-177.75 427.56-266.611 164.273-88.862 164.273-177.772 0-266.611z m0 0"
                fill="#333333"
                p-id="1943"
              ></path>
            </svg>
          </div>
          <img
            src={getCurrentIndexPoster()}
            alt="poster"
            className="absolute left-0 top-0 h-full w-full opacity-90 group-hover:opacity-100 transition-opacity duration-500"
          />
        </div>
        <div className="section-controller absolute bottom-4 left-0 w-full z-20 flex px-4">
          <SlideController
            sliders={props.sliders}
            currentIdx={currentIdx}
            setCurrentIdx={(idx) => {
              setCurrentIdx(idx);
              selectIndex(idx);
            }}
          />
        </div>
      </div>
    </div>
  );
}
