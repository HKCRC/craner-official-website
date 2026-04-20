import { MotionRevealUp } from "./animated-text";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-export-i18n";
import { useState, useRef } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRouter } from "next/router";
import { WaitingListModal } from "./modal";
import { LanguageSwitcher } from "./language-switcher";
import { products } from "@/constants/products";

const productList = Object.values(products);

export const Nav = () => {
  const { scrollY } = useScroll();
  const { t } = useTranslation();
  const router = useRouter();
  const locale = (router.query.lang as string) || "zh-HK";
  const isEn = locale === "en";

  const [showWaitingListModal, setShowWaitingListModal] = useState(false);
  const [isScrolledNav, setIsScrolledNav] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolledNav(latest > 0.05);
  });

  const openModal = () => setShowWaitingListModal(true);

  const handleProductMouseEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setProductDropdownOpen(true);
  };

  const handleProductMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setProductDropdownOpen(false), 120);
  };

  const navTextClass = isScrolledNav
    ? "text-slate-700 hover:text-blue-600"
    : "text-white/90 hover:text-white";

  const navItems = [
    {
      label: isEn ? "Products" : "產品",
      hasDropdown: true,
    },
    {
      label: isEn ? "Success Cases" : "成功案例",
      href: `/cases?lang=${locale}`,
    },
    {
      label: isEn ? "News" : "最新動態",
      href: `/articles?lang=${locale}`,
    },
  ];

  return (
    <>
      <header
        className={`fixed w-full px-2 md:px-0 transition-all duration-500 z-50 top-0 left-1/2 -translate-x-1/2 ${
          isScrolledNav ? "mt-3" : ""
        }`}
      >
        <nav
          className={`md:pl-2 pr-2 py-1 w-full ml-auto mr-auto transition-all duration-500 ${
            isScrolledNav
              ? "max-w-6xl mx-auto bg-white/90 backdrop-blur-xl border-slate-200 shadow-md rounded-2xl"
              : ""
          }`}
        >
          <div className="flex items-center">
            {/* Logo */}
            <MotionRevealUp className="pt-0.5 ml-[-6px] flex">
              <Link href={`/?lang=${locale}`}>
                <Image
                  className={`relative scale-[.85] md:scale-100 transition-all duration-500 ${
                    !isScrolledNav ? "brightness-0 invert" : ""
                  }`}
                  src="/img/logo.png"
                  alt="Logo"
                  width={160}
                  height={46}
                  priority
                />
              </Link>
            </MotionRevealUp>

            {/* Center nav links — desktop only */}
            <MotionRevealUp delay={0.1} className="hidden md:flex items-center gap-1 ml-10">
              {/* Products with dropdown */}
              <div
                className="relative"
                onMouseEnter={handleProductMouseEnter}
                onMouseLeave={handleProductMouseLeave}
              >
                <button
                  className={`flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-lg transition-colors ${navTextClass}`}
                >
                  {isEn ? "Products" : "產品"}
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${productDropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {productDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute top-full left-0 mt-1.5 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50"
                      onMouseEnter={handleProductMouseEnter}
                      onMouseLeave={handleProductMouseLeave}
                    >
                      <div className="p-1.5">
                        {productList.map((product) => (
                          <Link
                            key={product.id}
                            href={`/products/${product.id}?lang=${locale}`}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-blue-50 group transition-colors"
                            onClick={() => setProductDropdownOpen(false)}
                          >
                            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-colors">
                              <svg className="w-4 h-4 text-blue-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
                              </svg>
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-700 transition-colors leading-tight">
                                {product.label}
                              </p>
                              <p className="text-xs text-slate-400 mt-0.5 truncate">
                                {product.tags.slice(0, 2).join(" · ")}
                              </p>
                            </div>
                          </Link>
                        ))}
                        <div className="mx-3 my-1 h-px bg-slate-100" />
                        <Link
                          href={`/products?lang=${locale}`}
                          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
                          onClick={() => setProductDropdownOpen(false)}
                        >
                          {isEn ? "View All Products" : "查看全部產品"}
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Cases */}
              <Link
                href={`/cases?lang=${locale}`}
                className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors ${navTextClass}`}
              >
                {isEn ? "Success Cases" : "成功案例"}
              </Link>

              {/* Articles */}
              <Link
                href={`/articles?lang=${locale}`}
                className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors ${navTextClass}`}
              >
                {isEn ? "News" : "最新動態"}
              </Link>
            </MotionRevealUp>

            <div className="flex-1" />

            {/* Right: language switcher + CTA */}
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
                    />
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
