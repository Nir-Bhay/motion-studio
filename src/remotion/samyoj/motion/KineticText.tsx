import React from "react";
import { THEME } from "../theme";
import { FONTS } from "../fonts";
import { easeRange, outExpo } from "./easing";

export interface KineticHeadlineProps {
  text: string;
  /** Optional substring to highlight in editorial italic serif or brand color */
  accentWord?: string;
  accentColor?: string;
  /** Render accentWord in expressive Instrument Serif Italic */
  serifAccent?: boolean;
  frame: number;
  startFrame?: number;
  fontSize?: number;
  align?: "left" | "center";
  color?: string;
  maxWidth?: number;
  fontFamily?: string;
}

/**
 * Editorial masked word-by-word reveal with crisp Instrument Serif italic contrast option.
 */
export const KineticHeadline: React.FC<KineticHeadlineProps> = ({
  text,
  accentWord,
  accentColor = THEME.brand,
  serifAccent = true,
  frame,
  startFrame = 0,
  fontSize = 60,
  align = "left",
  color = THEME.ink,
  maxWidth,
  fontFamily = FONTS.display,
}) => {
  const words = text.split(" ");
  const cleanAccent = accentWord?.toLowerCase().replace(/[^a-z0-9]/g, "");

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: align === "center" ? "center" : "flex-start",
        alignItems: "baseline",
        columnGap: "0.26em",
        rowGap: "0.06em",
        maxWidth,
        fontFamily,
        fontSize,
        fontWeight: 700,
        lineHeight: 1.06,
        letterSpacing: "-0.035em",
        color,
      }}
    >
      {words.map((word, idx) => {
        const wStart = startFrame + idx * 3;
        const p = easeRange(frame, wStart, wStart + 16, outExpo);
        const y = (1 - p) * 28;
        const blur = (1 - p) * 5;
        const cleanWord = word.toLowerCase().replace(/[^a-z0-9]/g, "");
        const isAccent = Boolean(cleanAccent && cleanWord === cleanAccent);

        return (
          <span
            key={`${word}-${idx}`}
            style={{
              display: "inline-block",
              overflow: "hidden",
              paddingBottom: "0.08em",
              marginBottom: "-0.08em",
            }}
          >
            <span
              style={{
                display: "inline-block",
                transform: `translate3d(0, ${y.toFixed(2)}px, 0)`,
                opacity: p,
                filter: blur > 0.2 ? `blur(${blur.toFixed(2)}px)` : undefined,
                color: isAccent ? accentColor : color,
                fontFamily: isAccent && serifAccent ? FONTS.serif : fontFamily,
                fontStyle: isAccent && serifAccent ? "italic" : "normal",
                fontWeight: isAccent && serifAccent ? 400 : 700,
                fontSize: isAccent && serifAccent ? "1.12em" : "1em",
                letterSpacing: isAccent && serifAccent ? "-0.015em" : "-0.035em",
              }}
            >
              {word}
            </span>
          </span>
        );
      })}
    </div>
  );
};

export const MaskedLine: React.FC<{
  frame: number;
  startFrame?: number;
  duration?: number;
  children: React.ReactNode;
}> = ({ frame, startFrame = 0, duration = 20, children }) => {
  const p = easeRange(frame, startFrame, startFrame + duration, outExpo);
  const y = (1 - p) * 26;
  const blur = (1 - p) * 4;
  return (
    <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em" }}>
      <span
        style={{
          display: "inline-block",
          opacity: p,
          transform: `translate3d(0, ${y.toFixed(2)}px, 0)`,
          filter: blur > 0.2 ? `blur(${blur.toFixed(2)}px)` : undefined,
        }}
      >
        {children}
      </span>
    </span>
  );
};

export const EditorialSplit: React.FC<{
  frame: number;
  startFrame?: number;
  lead: string;
  accent: string;
  accentColor?: string;
  fontSize?: number;
}> = ({ frame, startFrame = 0, lead, accent, accentColor = THEME.brand, fontSize = 46 }) => {
  const p = easeRange(frame, startFrame, startFrame + 18, outExpo);
  return (
    <div
      style={{
        fontFamily: FONTS.display,
        fontSize,
        fontWeight: 800,
        letterSpacing: "-0.035em",
        color: THEME.ink,
        opacity: p,
        transform: `translate3d(0, ${((1 - p) * 18).toFixed(1)}px, 0)`,
      }}
    >
      {lead}{" "}
      <span
        style={{
          fontFamily: FONTS.serif,
          fontStyle: "italic",
          fontWeight: 400,
          color: accentColor,
          fontSize: "1.1em",
        }}
      >
        {accent}
      </span>
    </div>
  );
};
