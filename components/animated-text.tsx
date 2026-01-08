import { AnimationProps, motion } from "framer-motion";
import { ReactNode } from "react";

const ANI_TIME_TEXT_APPEAR = 0.32;

export const AnimatedText = ({
  text,
  delay,
  textStyle,
}: {
  text: string;
  delay?: number;
  textStyle?: any;
}) => {
  const words = text.includes(" ") ? text.split(" ") : text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: text.includes(" ") ? 0.12 : 0.05,
        delayChildren: 0.04 * i + (delay || 0),
      },
    }),
  };

  const transition: AnimationProps["transition"] = {
    duration: ANI_TIME_TEXT_APPEAR,
    type: "tween",
    ease: "easeInOut",
  };

  return (
    <motion.div
      className="flex flex-wrap leading-[1.2]"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {words.map((word, index) => (
        <motion.span
          style={textStyle}
          className={text.includes(" ") ? "mr-2" : ""}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export const MotionRevealUp = ({
  children,
  delay,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => {
  return (
    <motion.div
      className={className}
      initial={{ y: 10, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: delay || 0, duration: ANI_TIME_TEXT_APPEAR, type: "tween", ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
};
