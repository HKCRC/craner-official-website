import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTranslation } from "next-export-i18n";

interface StackedCarouselProps {
  images: {
    src: string;
    alt: string;
    label: string;
  }[];
}

export const StackedCardCarousel: React.FC<StackedCarouselProps> = ({
  images,
}) => {
  const [index, setIndex] = useState(0);
  const { t } = useTranslation();
  const nextCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full h-[400px] md:h-[550px] flex items-center justify-center">
      <div
        className="relative w-full max-w-[500px] h-[350px] md:h-[450px] cursor-pointer"
        onClick={nextCard}
      >
        <AnimatePresence initial={false}>
          {images.map((img, i) => {
            // 计算相对于当前索引的偏移
            const offset = (i - index + images.length) % images.length;
            const isVisible = offset < 3; // 只显示前3张

            if (!isVisible) return null;

            return (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, scale: 0.9, y: 0 }}
                animate={{
                  opacity: 1 - offset * 0.15,
                  scale: 1 - offset * 0.05,
                  y: -offset * 25, // 向上层叠
                  zIndex: images.length - offset,
                }}
                exit={{
                  opacity: 0,
                  x: 100,
                  scale: 0.8,
                  transition: { duration: 0.3 },
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 25,
                }}
                className="absolute inset-0"
              >
                {/* 白色底座卡片 */}
                <div className="w-full h-full bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 p-3 md:p-4 flex flex-col">
                  {/* 图片容器，使用 object-contain 保证显示全 */}
                  <div className="relative flex-1 w-full rounded-2xl overflow-hidden bg-slate-50">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-contain p-4" // 增加内边距避免边缘贴合
                    />
                  </div>

                  {/* 卡片底部标签 */}
                  <div className="mt-4 px-2 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        {img.label}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      0{i + 1}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* 点击交互提示 */}
      <div className="absolute -bottom-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest animate-pulse">
        {t("click_to_shuffle")}
      </div>
    </div>
  );
};
