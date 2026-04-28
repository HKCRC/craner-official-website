import { useEffect, useMemo, useRef, useState } from "react";
import { useWindowSize } from "react-use";
import { MotionRevealUp } from "./animated-text";
import { useRouter } from "next/router";
import { useTranslation } from "next-export-i18n";
import { subtitleGradient2 } from "@/constants";
import type { HomepageBanner } from "@/lib/api/public-read";
import { getTextGradientStyle } from "./text-block";
import { getImageUrl } from "@/lib/helper";

type CarouselSlide = Extract<
  HomepageBanner,
  { template: "CAROUSEL" }
>["content"]["slides"][number];

export const Header = ({
  homepageBanners,
}: {
  homepageBanners?: HomepageBanner[] | null;
}) => {
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const router = useRouter();
  const currentLang = router.query.lang as string;

  const currentBanner = useMemo(
    () => homepageBanners?.filter((item) => item.locale === currentLang)?.[0],
    [homepageBanners, currentLang],
  );

  const slides = useMemo<CarouselSlide[]>(() => {
    if (currentBanner?.template !== "CAROUSEL") return [];
    return currentBanner.content?.slides ?? [];
  }, [currentBanner]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slidesCount = slides.length;
  const intervalMs = 6000;
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === true;
  }, []);

  useEffect(() => {
    if (activeIndex >= slidesCount) setActiveIndex(0);
  }, [activeIndex, slidesCount]);

  useEffect(() => {
    if (slidesCount <= 1) return;
    if (isPaused) return;
    if (prefersReducedMotion.current) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % slidesCount);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [slidesCount, isPaused]);

  const goPrev = () =>
    setActiveIndex((i) =>
      slidesCount ? (i - 1 + slidesCount) % slidesCount : 0,
    );
  const goNext = () =>
    setActiveIndex((i) => (slidesCount ? (i + 1) % slidesCount : 0));

  const activeSlide = slides[activeIndex];

  if (currentBanner?.template === "VIDEO") {
    return (
      <div className="h-[400px] md:h-[750px] w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
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
          {/* 顶部/底部渐变遮罩：保证菜单和文案可读性 */}
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black/55 to-transparent z-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-44 bg-gradient-to-t from-black/55 to-transparent z-20 pointer-events-none" />

          <video
            src={currentBanner?.content?.videoUrl}
            poster="/img/banner.jpg"
            className="object-cover w-full h-full brightness-90 contrast-125"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        <div className="flex-col gap-10 md:gap-0 mt-24 lg:mt-36 flex justify-center items-center relative z-30">
          <div className="flex flex-col justify-center items-center my-10 md:pt-16 mx-8 text-center">
            <MotionRevealUp delay={0.4} className="mt-4">
              <div
                className={`${
                  currentLang === "en" && width < 768 ? "text-xl" : "text-3xl"
                } md:text-5xl font-bold`}
              >
                {currentBanner?.content?.title}
              </div>
            </MotionRevealUp>

            <MotionRevealUp delay={0.65} className="mt-3 lg:mt-5">
              <div
                className={`${
                  currentLang === "en" && width < 768 ? "text-lg" : "text-3xl"
                } md:text-5xl font-bold`}
              >
                <span style={getTextGradientStyle(subtitleGradient2)}>
                  {currentBanner?.content?.subtitle}
                </span>
              </div>
            </MotionRevealUp>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-[400px] md:h-[750px] w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
        {slidesCount === 0 ? (
          <img
            src="/img/banner.jpg"
            alt="Homepage banner"
            className="object-cover w-full h-full"
            loading="eager"
          />
        ) : (
          <div
            className="relative w-full h-full overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocusCapture={() => setIsPaused(true)}
            onBlurCapture={() => setIsPaused(false)}
          >
            {/* 顶部/底部渐变遮罩：保证菜单和文案可读性 */}
            <div className="absolute top-0 left-0 w-full h-40 z-10 bg-gradient-to-b from-black/55 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-44 z-10 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />

            <div
              className="flex h-full w-full"
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
                transition:
                  slidesCount <= 1 || prefersReducedMotion.current
                    ? undefined
                    : "transform 500ms ease",
              }}
            >
              {slides.map((slide) => (
                <div key={slide.imageUrl} className="w-full h-full shrink-0">
                  <img
                    src={getImageUrl(slide.imageUrl)}
                    alt={slide.title}
                    className="object-cover w-full h-full"
                    loading="eager"
                  />
                </div>
              ))}
            </div>

            {/* 文案：左下角排版（跟菜单不冲突） */}
            <div className="absolute inset-0 z-20 flex items-end pointer-events-none">
              <div className="w-full max-w-5xl mx-auto px-6 md:px-10 pb-10 md:pb-14">
                <div className="max-w-2xl">
                  <div className="text-white font-bold tracking-tight drop-shadow-sm text-3xl md:text-5xl leading-tight">
                    {activeSlide?.title}
                  </div>
                  {activeSlide?.subtitle ? (
                    <div className="mt-3 text-white/90 drop-shadow-sm text-base md:text-xl leading-relaxed">
                      {activeSlide.subtitle}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            {slidesCount > 1 ? (
              <>
                <button
                  type="button"
                  aria-label="Previous slide"
                  onClick={goPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/35 hover:bg-black/50 text-white w-10 h-10 flex items-center justify-center backdrop-blur-sm"
                >
                  ‹
                </button>
                <button
                  type="button"
                  aria-label="Next slide"
                  onClick={goNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/35 hover:bg-black/50 text-white w-10 h-10 flex items-center justify-center backdrop-blur-sm"
                >
                  ›
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      aria-label={`Go to slide ${idx + 1}`}
                      aria-current={idx === activeIndex ? "true" : "false"}
                      onClick={() => setActiveIndex(idx)}
                      className={`h-2.5 rounded-full transition-all ${
                        idx === activeIndex
                          ? "w-6 bg-white"
                          : "w-2.5 bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </>
            ) : null}
          </div>
        )}
      </div>
    );
  }
};
