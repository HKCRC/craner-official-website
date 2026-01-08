/* eslint-disable @next/next/no-img-element */
import { animate, easeInOut, useMotionValue } from "framer-motion";
import { useTranslation } from "next-export-i18n";
import { Outfit } from "next/font/google";
import { useEffect } from "react";
import { VideoIntro } from "@/components/video-intro";
import { FeatureBox } from "@/components/feature-box";
import { PathPlanningBox } from "@/components/path-planning-box";
import { AISafetyBox } from "@/components/ai-safety-box";
import { NewsSection } from "@/components/news-section";
import { ParallaxSection } from "@/components/parallax-section";
import { BusinessBox } from "@/components/business-box";
import { CooperativePartner } from "@/components/cooperative-partner-list";
import { BusinessSwiper } from "@/components/business-swiper";
import { Header } from "@/components/header";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const outfit = Outfit({ subsets: ["latin"] });

export default function Lite() {
  const { t } = useTranslation();

  const position = useMotionValue(0);

  useEffect(() => {
    const control = animate(position, [50, 100, 100, 0, 0, 50], {
      duration: 5,
      delay: 1.5,
      ease: easeInOut,
    });
    return control.stop;
  }, [position]);

  return (
    <main className={outfit.className}>
      <Nav />

      <Header />

      <div className="relative overflow-hidden">
        <FeatureBox />

        <div className="max-w-6xl mx-auto px-6 md:px-0">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        </div>

        <PathPlanningBox />

        <div className="max-w-6xl mx-auto px-6 md:px-0">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        </div>

        <AISafetyBox />
      </div>

      <VideoIntro />

      <BusinessBox />

      <BusinessSwiper />

      <ParallaxSection
        imageSrc="/img/tower.jpg"
        slogan={t("parallaxSection.slogan")}
        desc={t("parallaxSection.desc")}
        height="h-[400px] md:h-[400px]"
      />

      <NewsSection />

      <CooperativePartner />

      <Footer />
    </main>
  );
}
