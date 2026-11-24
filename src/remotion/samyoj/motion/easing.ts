import { Easing, interpolate } from "remotion";

/** Named cubic-bezier easings per Master Brief v2 (NO linear easing ever) */
export const outExpo = Easing.bezier(0.16, 1, 0.3, 1);
export const appleOut = Easing.bezier(0.22, 1, 0.36, 1);
export const inOutQuart = Easing.bezier(0.76, 0, 0.24, 1);
export const inOutQuint = Easing.bezier(0.83, 0, 0.17, 1);
export const anticipate = Easing.bezier(0.36, 0, 0.66, -0.56);

/** Spring presets matching section 5.3 */
export const SPRINGS = {
  ui: { damping: 20, stiffness: 220, mass: 0.9 },
  hero: { damping: 14, stiffness: 130, mass: 1 },
  snappy: { damping: 18, stiffness: 320, mass: 0.85 },
  soft: { damping: 26, stiffness: 90, mass: 1 },
} as const;

/** Clamped ease helper from local frame range [startF, endF] */
export function easeRange(
  frame: number,
  startF: number,
  endF: number,
  easing = appleOut
): number {
  if (endF <= startF) return frame >= startF ? 1 : 0;
  return interpolate(frame, [startF, endF], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });
}

/** Smooth 3-property entrance helper (opacity + y/scale + blur) */
export function enterTriad(
  frame: number,
  startF: number,
  durationF = 24,
  opts?: { y?: number; scaleFrom?: number; blurFrom?: number; easing?: (t: number) => number }
) {
  const p = easeRange(frame, startF, startF + durationF, opts?.easing ?? outExpo);
  const y = (1 - p) * (opts?.y ?? 22);
  const scale = (opts?.scaleFrom ?? 0.96) + p * (1 - (opts?.scaleFrom ?? 0.96));
  const blur = (1 - p) * (opts?.blurFrom ?? 8);
  return {
    opacity: Math.min(1, p * 1.15),
    y,
    scale,
    blur,
    style: {
      opacity: Math.min(1, p * 1.15),
      transform: `translate3d(0, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`,
      filter: blur > 0.15 ? `blur(${blur.toFixed(2)}px)` : undefined,
    } as const,
  };
}

/** Compound scene exit (opacity + scale + blur) */
export function exitTriad(frame: number, startF: number, durationF = 18) {
  const p = easeRange(frame, startF, startF + durationF, inOutQuart);
  const opacity = 1 - p;
  const scale = 1 - p * 0.04;
  const blur = p * 10;
  return {
    opacity,
    scale,
    blur,
    style: {
      opacity,
      transform: `scale(${scale.toFixed(4)})`,
      filter: blur > 0.15 ? `blur(${blur.toFixed(2)}px)` : undefined,
    } as const,
  };
}
