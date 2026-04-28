import React from "react";
import { getImageUrl } from "@/lib/helper";

function CaseContentHeading({ text }: { text: string }) {
  return (
    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
      <span className="w-1 h-6 rounded-full bg-blue-500 inline-block flex-shrink-0" />
      {text}
    </h2>
  );
}

function extractTextFromHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function ensureImageFullWidth(html: string): string {
  return html.replace(/<img\b([^>]*)>/gi, (match, attrs) => {
    const hasClass = /\bclass\s*=\s*(['"])([\s\S]*?)\1/i.test(attrs);
    const hasStyle = /\bstyle\s*=\s*(['"])([\s\S]*?)\1/i.test(attrs);
    const hasSrc = /\bsrc\s*=\s*(['"])([\s\S]*?)\1/i.test(attrs);

    const extraClass = " w-full h-auto block my-6";
    const extraStyle = "width:100%;height:auto;";

    let out = match;

    if (hasSrc) {
      out = out.replace(
        /\bsrc\s*=\s*(['"])([\s\S]*?)\1/i,
        (_m: string, q: string, src: string) =>
          `src=${q}${getImageUrl(src)}${q}`,
      );
    }

    if (hasClass) {
      out = out.replace(
        /\bclass\s*=\s*(['"])([\s\S]*?)\1/i,
        (_m: string, q: string, cls: string) =>
          `class=${q}${cls}${extraClass}${q}`,
      );
    } else {
      out = out.replace(/<img\b/i, `<img class="${extraClass.trim()}"`);
    }

    if (hasStyle) {
      out = out.replace(
        /\bstyle\s*=\s*(['"])([\s\S]*?)\1/i,
        (_m: string, q: string, style: string) =>
          `style=${q}${style};${extraStyle}${q}`,
      );
    } else {
      out = out.replace(/<img\b/i, `<img style="${extraStyle}"`);
    }

    return out;
  });
}

const richTextClassName =
  "max-w-none text-gray-700 leading-relaxed text-base md:text-[1.05rem] [&_p]:my-4 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:my-1 [&_li::marker]:text-blue-500 [&_blockquote_p]:m-0 [&_img]:w-full [&_img]:h-auto";

export function renderCaseHtmlContent(html: string) {
  const safeHtml = ensureImageFullWidth(html || "");

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  const blockquoteRe = /<blockquote\b[\s\S]*?<\/blockquote>/gi;
  let m: RegExpExecArray | null;

  while ((m = blockquoteRe.exec(safeHtml))) {
    const start = m.index;
    const end = blockquoteRe.lastIndex;
    const before = safeHtml.slice(lastIndex, start).trim();
    if (before) {
      parts.push(
        <div
          key={`html-${lastIndex}`}
          className={richTextClassName}
          dangerouslySetInnerHTML={{ __html: before }}
        />,
      );
    }

    const quoteText = extractTextFromHtml(m[0]);
    if (quoteText) {
      parts.push(<CaseContentHeading key={`q-${start}`} text={quoteText} />);
    }

    lastIndex = end;
  }

  const rest = safeHtml.slice(lastIndex).trim();
  if (rest) {
    parts.push(
      <div
        key={`html-${lastIndex}-rest`}
        className={richTextClassName}
        dangerouslySetInnerHTML={{ __html: rest }}
      />,
    );
  }

  return <div className="space-y-8">{parts}</div>;
}
