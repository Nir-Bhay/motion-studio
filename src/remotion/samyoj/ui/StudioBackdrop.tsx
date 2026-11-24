import React from "react";
import { noise2D } from "@remotion/noise";
import { THEME } from "../theme";
import { beatPulse } from "../timeline";
import { easeRange, inOutQuart } from "../motion/easing";

/**
 * Infinite White Studio Cove Backdrop
 * - Layer 1: Radial white studio sweep + 2% subtle dot grid + seeded drifting pastel blobs
 * - Warmth/saturation transitions cleanly from Act 1 (desaturated cool-grey white, 5% grain)
 *   through the S03 Bloom at 0:12.5 into luminous white daylight (2.5% grain).
 */
export const StudioBackdrop: React.FC<{
  globalFrame: number;
  /** Override warmth in [0..1] for cut-downs; if omitted, uses globalFrame 0:12.5 bloom */
  warmthOverride?: number;
}> = ({ globalFrame, warmthOverride }) => {
  // Bloom occurs at 0:12.5 (frame 750)
  const bloom =
    warmthOverride !== undefined
      ? warmthOverride
      : easeRange(globalFrame, 748, 788, inOutQuart);

  const pulse = beatPulse(globalFrame, 0.16);

  // Seeded organic drift for 3 pastel studio blobs
  const t = globalFrame * 0.006;
  const b1x = noise2D("blob-brand-x", t, 0.3) * 90;
  const b1y = noise2D("blob-brand-y", 0.7, t) * 70;
  const b2x = noise2D("blob-mint-x", t * 0.85, 1.4) * 100;
  const b2y = noise2D("blob-mint-y", 2.1, t * 0.85) * 75;
  const b3x = noise2D("blob-peach-x", t * 0.7, 3.2) * 80;
  const b3y = noise2D("blob-peach-y", 4.5, t * 0.7) * 60;

  // Cold desaturated tint in Act 1 -> warm daylight studio after Bloom
  const bgCenter = bloom < 0.5 ? "#F4F6FB" : THEME.canvas;
  const bgEdge = bloom < 0.5 ? "#E4E8F2" : THEME.coveEdge;
  const grainOpacity = 0.052 - bloom * 0.026; // 5.2% cold tension -> 2.6% crisp daylight

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: `radial-gradient(ellipse 86% 78% at 50% 44%, ${bgCenter} 0%, ${bgEdge} 100%)`,
      }}
    >
      {/* Subtle 2% dot grid with slow studio parallax */}
      <div
        style={{
          position: "absolute",
          inset: -40,
          opacity: 0.42 + bloom * 0.16,
          transform: `translate3d(${(b1x * 0.12).toFixed(1)}px, ${(b1y * 0.12).toFixed(1)}px, 0)`,
          backgroundImage: `radial-gradient(${
            bloom < 0.5 ? "rgba(100,116,139,0.16)" : "rgba(75,46,235,0.085)"
          } 1.25px, transparent 1.25px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Pastel ambient studio blobs — provide color behind frosted glass */}
      <div
        style={{
          position: "absolute",
          left: 160 + b1x,
          top: -120 + b1y,
          width: 820,
          height: 820,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(75, 46, 235, ${(0.04 + bloom * 0.085 + pulse * 0.015).toFixed(3)}) 0%, transparent 68%)`,
          filter: "blur(48px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 80 + b2x,
          bottom: -160 + b2y,
          width: 780,
          height: 780,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(16, 185, 129, ${(0.01 + bloom * 0.095).toFixed(3)}) 0%, transparent 68%)`,
          filter: "blur(52px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 480 + b3x,
          top: 120 + b3y,
          width: 620,
          height: 620,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(255, 138, 61, ${(bloom * 0.065).toFixed(3)}) 0%, transparent 70%)`,
          filter: "blur(56px)",
        }}
      />

      {/* Top-left studio key-light soft gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 18% 12%, rgba(255,255,255,0.75) 0%, transparent 52%)",
          pointerEvents: "none",
        }}
      />

      {/* Deterministic subtle film grain (micro-SVG noise, stepped cleanly) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: grainOpacity,
          pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.9'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
          mixBlendMode: "multiply",
        }}
      />
    </div>
  );
};
