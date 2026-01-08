import { useTranslation } from "next-export-i18n";
import { MotionRevealUp } from "./animated-text";

/* eslint-disable @next/next/no-img-element */
export function AccelerateBlock({
  img,
  icon,
  title,
  desc,
}: {
  img: string;
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <MotionRevealUp className="flex flex-col items-start justify-start flex-1 text-left mx-auto lg:max-w-none px-6 ml-2 mr-2 lg:px-0">
      <div className="aspect-auto rounded-2xl overflow-hidden w-full">
        <img src={img} className="w-full h-full object-contain object-top" alt="pitch" />
      </div>
      <div className="flex flex-row items-center gap-2 md:gap-5 mt-4 md:mb-2 md:mt-12">
        {/* <img src={icon} className="w-6 md:w-16" alt="pitch" /> */}
        <div className="text-xl md:text-3xl font-semibold w-auto">{title}</div>
      </div>
      <div className="mt-1 ml-0.5 md:mt-3 mb-5 md:mb-5 text-md font-light opacity-60">{desc}</div>
    </MotionRevealUp>
  );
}

export function AccelerateStep() {
  const { t } = useTranslation();

  return (
    <div className=" page-mx page-mw mt-5 mb-32 overflow-hidden relative max-w-full">

      <div className="fade-out-bottom mt-12 mb-10 overflow-hidden">
          <MotionRevealUp className="my-3 text-3xl md:text-4xl font-semibold  ">
              {t("flow.title")}
          </MotionRevealUp>
          <div className="text-sm md:text-base my-4 md:my-6 font-normal opacity-60">
              <MotionRevealUp delay={0.3}>
              {t("flow.desc")}
              </MotionRevealUp>
          </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        <AccelerateBlock
          img="/business/xq.jpg"
          icon="/img/acc/data-icon.svg"
          title={t("flow.step1.title")}
          desc={t("flow.step1.desc")}
        />
        <AccelerateBlock
          img="/business/bj.jpg"
          icon="/img/acc/quantity-icon.svg"
          title={t("flow.step2.title")}
          desc={t("flow.step2.desc")}
        />
        <AccelerateBlock
          img="/business/work.jpg"
          icon="/img/acc/commercial-icon.svg"
          title={t("flow.step3.title")}
          desc={t("flow.step3.desc")}
        />
        <AccelerateBlock
          img="/business/support.jpg"
          icon="/img/acc/commercial-icon.svg"
          title={t("flow.step4.title")}
          desc={t("flow.step4.desc")}
        />
      </div>
    </div>
  );
}