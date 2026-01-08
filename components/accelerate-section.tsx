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
    <MotionRevealUp className="flex flex-col items-start justify-start flex-1 text-left max-w-sm mx-auto lg:max-w-none px-6 lg:px-0">
      <div className="aspect-auto rounded-2xl overflow-hidden">
        <img src={img} className="w-full h-full object-contain object-top" alt="pitch" />
      </div>
      <div className="flex flex-row items-center gap-2 md:gap-5 mt-4 md:mb-2 md:mt-12">
        <img src={icon} className="w-6 md:w-16" alt="pitch" />
        <div className="text-xl md:text-3xl font-semibold w-auto">{title}</div>
      </div>
      <div className="mt-1 ml-0.5 md:mt-3 md:ml-0 text-md font-light opacity-60">{desc}</div>
    </MotionRevealUp>
  );
}

export function AccelerateSection() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col lg:flex-row gap-10 xl:gap-14">
      <AccelerateBlock
        img="/img/acc/data.webp"
        icon="/img/acc/data-icon.svg"
        title={t("acc.t1")}
        desc={t("acc.d1")}
      />
      <AccelerateBlock
        img="/img/acc/quantity.webp"
        icon="/img/acc/quantity-icon.svg"
        title={t("acc.t2")}
        desc={t("acc.d2")}
      />
      <AccelerateBlock
        img="/img/acc/commercial.webp"
        icon="/img/acc/commercial-icon.svg"
        title={t("acc.t3")}
        desc={t("acc.d3")}
      />
    </div>
  );
}
