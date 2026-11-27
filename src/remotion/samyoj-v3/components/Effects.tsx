import React from "react";
import { AbsoluteFill } from "remotion";
import {
  C,
  E_ENTER,
  E_EXIT,
  E_IO,
  E_LINEAR,
  FONT_INTER,
  lerp,
  quadPath,
  seg,
} from "../tokens";

export const Backdrop: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        backgroundImage: `radial-gradient(ellipse 115% 110% at 50% 50%, rgba(255,255,255,0) 64%, ${C.vignetteCorner} 100%)`,
      }}
    />
  );
};

const GRAIN_SVG_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")";

export const FilmGrain: React.FC<{ t: number }> = ({ t }) => {
  // Subtle frame-stepped deterministic offset for authentic 2% monochrome film grain (fast GPU tile)
  const step = Math.floor(t * 24);
  const ox = ((step * 37) % 160) - 80;
  const oy = ((step * 53) % 160) - 80;
  return (
    <div
      style={{
        position: "absolute",
        inset: -80,
        pointerEvents: "none",
        zIndex: 900,
        opacity: 0.022,
        backgroundImage: GRAIN_SVG_URI,
        backgroundRepeat: "repeat",
        backgroundSize: "160px 160px",
        backgroundPosition: `${ox}px ${oy}px`,
      }}
    />
  );
};

export interface CaptionBarProps {
  t: number;
  startSec: number;
  endSec: number;
  words: Array<{ text: string; accentColor?: string }>;
  enterDelay?: number;
  collapseAtEnd?: boolean;
}

export const CaptionBar: React.FC<CaptionBarProps> = ({
  t,
  startSec,
  endSec,
  words,
  enterDelay = 0.3,
  collapseAtEnd = false,
}) => {
  if (t < startSec || t > endSec) return null;

  const exitStart = endSec - 0.3;
  const exitU = collapseAtEnd ? 0 : seg(t, exitStart, endSec, E_EXIT);
  const collapseU = collapseAtEnd ? seg(t, endSec - 0.4, endSec, E_EXIT) : 0;

  const containerOpacity = collapseAtEnd ? 1 - collapseU : 1 - exitU;
  const containerY = collapseAtEnd ? lerp(0, 420, collapseU) : lerp(0, -10, exitU);
  const containerScale = collapseAtEnd ? lerp(1, 0.05, collapseU) : 1;

  return (
    <div
      style={{
        position: "absolute",
        left: 100,
        width: 1720,
        top: 58, // generous breathing room above 180-195px app shell even during POV zoom
        height: 76,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        zIndex: 500,
        pointerEvents: "none",
        opacity: containerOpacity,
        transform: `translateY(${containerY}px) scale(${containerScale})`,
      }}
    >
      {words.map((w, idx) => {
        const wStart = startSec + enterDelay + idx * 0.05;
        const wU = seg(t, wStart, wStart + 0.4, E_ENTER);
        return (
          <span
            key={`${w.text}-${idx}`}
            style={{
              fontFamily: FONT_INTER,
              fontSize: 64,
              fontWeight: 600,
              letterSpacing: "-0.015em",
              lineHeight: 1.15,
              color: w.accentColor ?? C.ink,
              display: "inline-block",
              opacity: wU,
              transform: `translateY(${lerp(20, 0, wU)}px)`,
            }}
          >
            {w.text}
          </span>
        );
      })}
    </div>
  );
};

export const SampleDataTag: React.FC<{ visible: boolean }> = ({ visible }) => {
  if (!visible) return null;
  return (
    <div
      style={{
        position: "absolute",
        right: 40,
        bottom: 18,
        fontFamily: FONT_INTER,
        fontSize: 16,
        fontWeight: 500,
        color: C.faint,
        opacity: 0.78,
        zIndex: 480,
        pointerEvents: "none",
      }}
    >
      Sample data
    </div>
  );
};

export const LightSweep: React.FC<{
  t: number;
  startSec: number;
  width: number;
  height: number;
  radius?: number;
}> = ({ t, startSec, width, height, radius = 24 }) => {
  const u = seg(t, startSec, startSec + 0.6, E_IO);
  if (u <= 0 || u >= 1) return null;
  const travelX = lerp(-240, width + 240, u);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: radius,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 30,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -height * 0.4,
          left: travelX,
          width: 120,
          height: height * 1.8,
          background:
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0) 100%)",
          transform: "rotate(20deg)",
        }}
      />
    </div>
  );
};

export const SuccessBurst: React.FC<{
  t: number;
  startSec: number;
  x: number;
  y: number;
  colors: string[];
  count?: number;
}> = ({ t, startSec, x, y, colors, count = 8 }) => {
  const u = seg(t, startSec, startSec + 0.4, E_ENTER);
  if (u <= 0 || u >= 1) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 0,
        height: 0,
        pointerEvents: "none",
        zIndex: 320,
      }}
    >
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2 + 0.25;
        const dist = 30 * u;
        const size = i % 2 === 0 ? 6 : 4;
        const px = Math.cos(angle) * dist;
        const py = Math.sin(angle) * dist;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: px - size / 2,
              top: py - size / 2,
              width: size,
              height: size,
              borderRadius: 999,
              backgroundColor: colors[i % colors.length],
              opacity: 1 - u,
            }}
          />
        );
      })}
    </div>
  );
};

export const RingShockwave: React.FC<{
  t: number;
  startSec: number;
  x: number;
  y: number;
  color?: string;
}> = ({ t, startSec, x, y, color = C.indigo }) => {
  const u = seg(t, startSec, startSec + 0.9, E_ENTER);
  if (u <= 0 || u >= 1) return null;
  const diam = lerp(24, 800, u);
  const opacity = lerp(0.08, 0, u);
  return (
    <div
      style={{
        position: "absolute",
        left: x - diam / 2,
        top: y - diam / 2,
        width: diam,
        height: diam,
        borderRadius: 999,
        border: `2px solid ${color}`,
        opacity,
        pointerEvents: "none",
        zIndex: 20,
      }}
    />
  );
};

export interface CursorSegment {
  from: [number, number];
  to: [number, number];
  moveStart: number;
  moveEnd: number;
  clickAt?: number;
  rippleColor?: string;
  perpOffset?: number;
}

export const CursorOverlay: React.FC<{
  t: number;
  visibleStart: number;
  visibleEnd: number;
  segments: CursorSegment[];
}> = ({ t, visibleStart, visibleEnd, segments }) => {
  if (t < visibleStart || t > visibleEnd || segments.length === 0) return null;

  let active = segments[0];
  for (const s of segments) {
    if (t >= s.moveStart) {
      active = s;
    }
  }

  const moveU = seg(t, active.moveStart, active.moveEnd, E_IO);
  const [x, y] = quadPath(active.from, active.to, moveU, active.perpOffset ?? 120);

  let clickScale = 1;
  if (active.clickAt !== undefined) {
    const dt = t - active.clickAt;
    if (dt >= 0 && dt < 0.08) {
      clickScale = lerp(1, 0.85, dt / 0.08);
    } else if (dt >= 0.08 && dt < 0.16) {
      clickScale = lerp(0.85, 1, (dt - 0.08) / 0.08);
    }
  }

  const fadeIn = seg(t, visibleStart, visibleStart + 0.25, E_ENTER);
  const fadeOut = 1 - seg(t, visibleEnd - 0.2, visibleEnd, E_EXIT);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 450,
        opacity: fadeIn * fadeOut,
      }}
    >
      {segments.map((s, idx) => {
        if (s.clickAt === undefined) return null;
        const rU = seg(t, s.clickAt, s.clickAt + 0.45, E_LINEAR);
        if (rU <= 0 || rU >= 1) return null;
        const diam = lerp(12, 64, rU);
        const op = lerp(0.5, 0, rU);
        return (
          <div
            key={idx}
            style={{
              position: "absolute",
              left: s.to[0] - diam / 2,
              top: s.to[1] - diam / 2,
              width: diam,
              height: diam,
              borderRadius: 999,
              border: `2px solid ${s.rippleColor ?? C.indigo}`,
              opacity: op,
            }}
          />
        );
      })}
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          transform: `scale(${clickScale})`,
          transformOrigin: "2px 2px",
        }}
      >
        <svg width="26" height="30" viewBox="0 0 24 28" fill="none">
          <path
            d="M3 2.5L3 22.5L8.2 17.4L12.1 25.2L15.3 23.6L11.4 15.8L18.8 15.8L3 2.5Z"
            fill={C.ink}
            stroke="#FFFFFF"
            strokeWidth={2}
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export const GlowDot: React.FC<{
  x: number;
  y: number;
  color?: string;
  size?: number;
}> = ({ x, y, color = C.indigo, size = 8 }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        borderRadius: 999,
        backgroundColor: color,
        boxShadow: `0 0 16px 4px ${color}`,
        pointerEvents: "none",
      }}
    />
  );
};
