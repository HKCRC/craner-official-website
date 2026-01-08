/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { MotionRevealUp } from "./animated-text";
import { InfiniteCarousel } from "./carousel";
import { SlideController, SliderValue } from "./sliders";
import { useTranslation } from "next-export-i18n";

function renderPitchComp(img: string) {
  return (
    <div className="w-[72vw] mt-4 md:w-[44vw] max-w-4xl aspect-auto rounded-2xl overflow-hidden">
      <img src={img} className="w-full h-full object-contain object-top" alt="pitch" />
    </div>
  );
}

export function PitchSection() {
  const { t } = useTranslation();
  const [currentIdx, setCurrentIdx] = useState(1);
  const sliders: SliderValue[] = [
    { name: t("pitch.generate") },
    { name: t("pitch.rephase") },
    { name: t("pitch.beautify") },
  ];

  return (
    <div className="fade-out-bottom text-center mt-10 h-[150vw] md:h-[72vw] md:max-h-[80rem] w-full overflow-x-hidden overflow-y-hidden">
      <MotionRevealUp className="my-3 text-4xl md:text-5xl font-semibold ">
        {t("pitch.title")}
      </MotionRevealUp>
      <div className="text-sm md:text-base max-w-lg my-4 md:my-6 font-normal mx-auto opacity-60">
        <MotionRevealUp delay={0.3}>{t("pitch.desc")}</MotionRevealUp>
      </div>

      <div className="mt-3 md:mt-2 w-fit mx-auto">
        <SlideController sliders={sliders} currentIdx={currentIdx} setCurrentIdx={setCurrentIdx} />
      </div>

      <div>
        <InfiniteCarousel currentIdx={currentIdx}>
          {renderPitchComp("./img/slide-3.webp")}
          {renderPitchComp("./img/slide-2.webp")}
          {renderPitchComp("./img/slide-1.webp")}
        </InfiniteCarousel>
      </div>
    </div>
  );
}
