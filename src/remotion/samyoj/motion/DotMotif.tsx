import React from "react";
import { interpolate as flubberInterpolate } from "flubber";
import { THEME } from "../theme";
import { easeRange, outExpo } from "./easing";

/**
 * Signature Motif: The Unread Dot -> Brand Ring -> Mint Resolved Tick
 * Uses flubber shape morphing for organic geometric continuity across scenes.
 */

// Exact 24x24 circle path -> rounded checkmark path
const DOT_PATH =
  "M 12 4 A 8 8 0 1 0 12 20 A 8 8 0 1 0 12 4 Z";
const RING_PATH =
  "M 12 2.5 A 9.5 9.5 0 1 0 12 21.5 A 9.5 9.5 0 1 0 12 2.5 Z";
const TICK_PATH =
  "M 5.2 12.6 L 9.8 17.1 L 19.0 7.4 L 17.1 5.6 L 9.8 13.3 L 7.0 10.6 Z";

const dotToRing = flubberInterpolate(DOT_PATH, RING_PATH, { maxSegmentLength: 2 });
const ringToTick = flubberInterpolate(RING_PATH, TICK_PATH, { maxSegmentLength: 2 });

export type DotStage = "coral" | "ring" | "mint";

export const UnreadDotMotif: React.FC<{
  size?: number;
  /** 0 = coral dot, 0.5 = brand ring, 1 = mint resolved tick */
  morph: number;
  pulse?: number;
}> = ({ size = 24, morph, pulse = 0 }) => {
  const m = Math.max(0, Math.min(1, morph));
  const pClamped = Math.max(0, Math.min(1, pulse));
  const path = m < 0.5 ? dotToRing(m * 2) : ringToTick((m - 0.5) * 2);

  // Color transition: alert coral (#FF5A5F) -> brand (#4B2EEB) -> mint (#10B981)
  const bg =
    m < 0.35
      ? THEME.alert
      : m < 0.72
      ? THEME.brand
      : THEME.mint;

  const ringOpacity = m > 0.2 && m < 0.85 ? 1 - Math.abs(m - 0.5) * 2 : 0;
  const scale = 1 + pClamped * 0.14;

  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${scale.toFixed(4)})`,
      }}
    >
      {/* Ambient pulse halo */}
      {pClamped > 0.02 || ringOpacity > 0.02 ? (
        <div
          style={{
            position: "absolute",
            inset: -Math.round(size * 0.35),
            borderRadius: "50%",
            border: `2px solid ${bg}`,
            opacity: Math.max(pClamped * 0.45, ringOpacity * 0.55),
            transform: `scale(${(1 + pClamped * 0.35).toFixed(3)})`,
          }}
        />
      ) : null}
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        {m >= 0.65 ? (
          <circle
            cx="12"
            cy="12"
            r="11"
            fill={THEME.tintMint}
            stroke={THEME.mint}
            strokeWidth="1.4"
            opacity={easeRange(m * 100, 65, 95, outExpo)}
          />
        ) : null}
        <path d={path} fill={bg} />
      </svg>
    </div>
  );
};
