"use client";

import { useEffect, useState } from "react";

function formatTime(date: Date) {
  const pad = (n: number, width = 2) => n.toString().padStart(width, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  const milliseconds = pad(date.getMilliseconds(), 3);

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}

export default function Happy() {
  const [now, setNow] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const timer = setInterval(() => {
      setNow(formatTime(new Date()));
    }, 10); // 精确到毫秒，10ms 刷新一次足够流畅

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        color: "#020617",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
        padding: "16px",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(14px, 3vw, 20px)",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#9ca3af",
          marginBottom: "24px",
        }}
      >
        Current Time
      </h1>

      <div
        style={{
          fontSize: "clamp(32px, 12vw, 100px)",
          lineHeight: 1.1,
          fontWeight: 600,
          letterSpacing: "0.06em",
          textAlign: "center",
          padding: "16px 20px",
          borderRadius: "14px",
          maxWidth: "1200px",
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {mounted ? now : "---- -- -- --:--:--.---"}
      </div>

      <p
        style={{
          marginTop: "18px",
          fontSize: "13px",
          color: "#9ca3af",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        Local time · 精确到毫秒
      </p>
    </div>
  );
}
