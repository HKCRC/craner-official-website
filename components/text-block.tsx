import { ReactElement, ReactNode, useMemo } from "react";
import { AnimatedText, MotionRevealUp } from "./animated-text";

export interface TextGradient {
  deg: number;
  from: string;
  to: string;
}

interface TextBlockProps {
  title: string;
  subtitle?: string | ReactElement;
  subtitleGradient?: TextGradient; // linear-gradient(180deg, #25FFBE 0%, #34FFFF 100%)
  desc: string;
  noDivider?: boolean;
  subtitleClassName?: string;
  children?: ReactNode;
}

export function getTextGradientStyle(gradient?: TextGradient) {
  return {
    background: `linear-gradient(${gradient?.deg || 180}deg, ${
      gradient?.from || "#12274e"
    } 0%, ${gradient?.to || "#06b2b1"} 100%)`,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
  };
}

export function TextBlock({
  title,
  subtitle,
  desc,
  noDivider,
  subtitleClassName,
  children,
  subtitleGradient,
}: TextBlockProps) {
  const renderSubTitle = useMemo(() => {
    if (subtitle) {
      if (typeof subtitle === "string") {
        return (
          <div className="my-2 md:my-3">
            <AnimatedText
              text={subtitle}
              delay={0.3}
              textStyle={getTextGradientStyle(subtitleGradient)}
            />
          </div>
        );
      } else {
        return (
          <div style={getTextGradientStyle(subtitleGradient)}>{subtitle}</div>
        );
      }
    }

    return null;
  }, [subtitle, subtitleGradient]);

  return (
    <div className="flex flex-col justify-center">
      <div className="text-2xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
        <AnimatedText text={title} />
      </div>
      <div className="text-xl md:text-4xl font-bold mt-2">{renderSubTitle}</div>
      <MotionRevealUp delay={0.5}>
        {!noDivider && (
          <div className="w-20 h-1.5 bg-blue-600 rounded-full mt-6 mb-8"></div>
        )}
        <p className="text-lg text-gray-600 leading-relaxed max-w-xl font-light">
          {desc}
        </p>
      </MotionRevealUp>
      {children ? (
        <MotionRevealUp delay={0.8} className="mt-8">
          {children}
        </MotionRevealUp>
      ) : null}
    </div>
  );
}

export function TextBlockRow({
  isReverse,
  className,
  children,
  textBlockProps,
}: {
  isReverse?: boolean;
  className?: string;
  children: ReactNode;
  textBlockProps: TextBlockProps;
}) {
  return (
    <div
      className={`px-6 md:px-0 w-full max-w-6xl mx-auto mt-8 md:mt-12 flex flex-col md:flex-row items-center ${
        isReverse ? "md:flex-row-reverse gap-6 md:gap-12" : "gap-6 md:gap-12"
      } ${className || ""}`}
    >
      <div className="w-full">
        <TextBlock {...textBlockProps} noDivider />
      </div>
      <div className="h-72 md:h-96 w-full">{children}</div>
    </div>
  );
}
