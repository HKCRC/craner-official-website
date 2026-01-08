import { MotionRevealUp } from "./animated-text";
import Image from "next/image";
import { useTranslation } from "next-export-i18n";
import { useState } from "react";
import { AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { WaitingListModal } from "./modal";

import { LanguageSwitcher } from "./language-switcher";

export const Nav = () => {
  const { scrollY } = useScroll();
  const { t } = useTranslation();
  const [showWaitingListModal, setShowWaitingListModal] = useState(false);
  const [isScrolledNav, setIsScrolledNav] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolledNav(latest > 0.05);
  });

  const openModal = () => {
    setShowWaitingListModal(true);
  };

  return (
    <>
      <header
        className={`fixed w-full px-2 md:px-0 transition-all duration-500 z-50 top-0 left-1/2 -translate-x-1/2 ${
          isScrolledNav ? "mt-3" : ""
        }`}
      >
        <nav
          className={` md:pl-2 pr-2 py-1 w-full ml-auto mr-auto transition-all duration-500  ${
            isScrolledNav
              ? "max-w-6xl mx-auto bg-white/90 backdrop-blur-xl border-slate-200 shadow-md rounded-2xl"
              : ""
          }`}
        >
          {/** Nav item - left: Logo */}
          <div className={`flex items-center`}>
            <MotionRevealUp className="pt-0.5 ml-[-6px] flex">
              <Image
                className={`relative scale-[.85] md:scale-100 transition-all duration-500 ${
                  !isScrolledNav ? "brightness-0 invert" : ""
                }`}
                src="/img/logo.png"
                alt="Logo"
                width={160}
                height={46}
              />
            </MotionRevealUp>
            <div className="flex-1"></div>

            {/** Nav item - right: language switcher and join waitlist */}
            <MotionRevealUp delay={0.2}>
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center">
                  <svg
                    viewBox="0 0 1024 1024"
                    width="18"
                    height="18"
                    fill={isScrolledNav ? "#2c2c2c" : "#ffffff"}
                  >
                    <path
                      d="M891.2 948.8l-33.6-96H699.2l-33.6 96H564.8l153.6-403.2h115.2l153.6 403.2h-96zM780.8 632l-57.6 148.8h115.2L780.8 632zM526.4 780.8L569.6 680c-14.4-9.6-28.8-19.2-38.4-28.8 72-81.6 129.6-182.4 172.8-302.4h129.6v-96H468.8l72-24c-9.6-33.6-33.6-86.4-57.6-129.6l-105.6 33.6c19.2 38.4 38.4 86.4 48 120H70.4v96h134.4c43.2 120 105.6 220.8 177.6 302.4C296 718.4 185.6 766.4 56 800c19.2 24 48 72 62.4 96 134.4-38.4 249.6-96 340.8-172.8 19.2 19.2 43.2 38.4 67.2 57.6z m-220.8-432h288C560 440 512 516.8 454.4 584 392 516.8 339.2 440 305.6 348.8z"
                      p-id="10008"
                      fill={isScrolledNav ? "#2c2c2c" : "#ffffff"}
                    ></path>
                  </svg>
                  <LanguageSwitcher isDark={isScrolledNav} className="mx-2" />
                </div>
                <div
                  className={`text-sm md:mt-0 md:text-base py-2.5 px-6 cursor-pointer transition-all rounded-full active:scale-95 font-bold ${
                    isScrolledNav
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                      : "bg-white text-gray-900 hover:bg-opacity-90 shadow-lg"
                  }`}
                  onClick={openModal}
                >
                  {t("join")}
                </div>
              </div>
            </MotionRevealUp>
          </div>
        </nav>
      </header>
      <AnimatePresence>
        {showWaitingListModal && (
          <WaitingListModal onClose={() => setShowWaitingListModal(false)} />
        )}
      </AnimatePresence>
    </>
  );
};
