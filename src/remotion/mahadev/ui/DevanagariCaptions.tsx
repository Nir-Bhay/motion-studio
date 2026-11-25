import React from "react";
import { interpolate } from "remotion";
import { getSmoothVoEnergy, MAHADEV_FPS, SUBTITLES } from "../timeline";

export const DevanagariCaptions: React.FC<{ globalFrame: number }> = ({ globalFrame }) => {
  const sec = globalFrame / MAHADEV_FPS;
  const active = SUBTITLES.find((s) => sec >= s.startSec && sec <= s.endSec);
  const vo = getSmoothVoEnergy(globalFrame);

  if (!active) return null;

  const fadeIn = interpolate(sec, [active.startSec, active.startSec + 0.25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(sec, [active.endSec - 0.22, active.endSec], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pointerEvents: "none",
        opacity,
        transform: `translateY(${(1 - opacity) * 14}px)`,
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          padding: "16px 36px 18px",
          borderRadius: 22,
          background: "linear-gradient(135deg, rgba(28, 12, 34, 0.88), rgba(68, 19, 44, 0.86))",
          border: `2px solid rgba(253, 224, 71, ${0.42 + vo * 0.45})`,
          boxShadow: `0 16px 40px rgba(0,0,0,0.48), 0 0 ${16 + vo * 22}px rgba(251, 191, 36, 0.25)`,
          backdropFilter: "blur(8px)",
          textAlign: "center",
        }}
      >
        {active.speaker && (
          <div
            style={{
              fontFamily: "'Noto Sans Devanagari', sans-serif",
              fontSize: 18,
              fontWeight: 700,
              color: "#fbbf24",
              letterSpacing: 0.6,
              marginBottom: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#fde047",
                transform: `scale(${0.8 + vo * 0.9})`,
                display: "inline-block",
              }}
            />
            <span>{active.speaker}</span>
          </div>
        )}
        <div
          style={{
            fontFamily: "'Noto Sans Devanagari', sans-serif",
            fontSize: 34,
            fontWeight: 700,
            lineHeight: 1.38,
            color: "#fffbeb",
            textShadow: "0 2px 10px rgba(0,0,0,0.65)",
          }}
        >
          {active.text}
        </div>
      </div>
    </div>
  );
};

export const SceneTitleBanner: React.FC<{
  title: string;
  subtitle?: string;
  localFrame: number;
  durationFrames: number;
}> = ({ title, subtitle, localFrame, durationFrames }) => {
  const opIn = interpolate(localFrame, [8, 34], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const opOut = interpolate(localFrame, [durationFrames - 30, durationFrames - 5], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const op = Math.min(opIn, opOut);

  return (
    <div
      style={{
        position: "absolute",
        top: 38,
        left: 52,
        opacity: op,
        transform: `translateY(${(1 - opIn) * -12}px)`,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          padding: "10px 24px",
          borderRadius: 14,
          background: "rgba(24, 10, 32, 0.72)",
          borderLeft: "5px solid #fbbf24",
          boxShadow: "0 10px 24px rgba(0,0,0,0.35)",
        }}
      >
        <div
          style={{
            fontFamily: "'Yatra One', 'Rozha One', 'Noto Sans Devanagari', serif",
            fontSize: 30,
            color: "#fde047",
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            style={{
              fontFamily: "'Noto Sans Devanagari', sans-serif",
              fontSize: 16,
              color: "#fed7aa",
              marginTop: 2,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};
