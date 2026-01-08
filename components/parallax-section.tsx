import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

interface ParallaxSectionProps {
  imageSrc: string;
  slogan: string;
  desc: string;
  height?: string;
  imageHeight?: string;
}

export function ParallaxSection({
  imageSrc,
  slogan,
  desc,
  height = "h-[500px] md:h-[700px]",
  imageHeight = "120%",
}: ParallaxSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // 获取容器的滚动进度
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], // 从元素进入视口到离开视口
  });

  // 将滚动进度转换为图片的垂直位置
  // 图片会从 -10% 移动到 10%，创造视差效果
  const imageY = useTransform(scrollYProgress, [0, 1], ["-50%", "50%"]);

  // 文字的轻微视差效果，移动速度比背景慢
  const textY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  // 文字的透明度变化，在视口中间时最清晰
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.3, 1, 1, 0.3]
  );

  return (
    <div ref={containerRef} className={`relative ${height} overflow-hidden`}>
      {/* 背景图片层 - 视差效果 */}
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0 w-full flex items-center justify-center"
      >
        <img
          src={imageSrc}
          alt="parallax background"
          className="w-full object-cover filter contrast-75 brightness-55"
          style={{ height: imageHeight }}
        />
      </motion.div>

      {/* 遮罩层 - 增强文字可读性 */}
      <div className="absolute inset-0 bg-black bg-opacity-30" />

      {/* 文字层 - 轻微视差效果 */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="absolute inset-0 flex flex-col items-center justify-center z-10 md:w-3/5 mx-auto"
      >
        <p className="md:text-4xl text-2xl font-bold text-white text-center px-8 mb-2 lg:mb-5 drop-shadow-2xl">
          {slogan}
        </p>
        <p className="text-white text-center px-8 drop-shadow-2xl text-sm md:text-base mt-4">
          {desc}
        </p>
      </motion.div>
    </div>
  );
}
