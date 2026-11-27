import "@fontsource-variable/inter";
import { Easing } from "remotion";

export const V3_FPS = 60;
export const V3_DURATION_SEC = 60.0;
export const V3_DURATION_FRAMES = Math.round(V3_DURATION_SEC * V3_FPS); // 3600
export const V3_WIDTH = 1920;
export const V3_HEIGHT = 1080;

export const FONT_INTER = "'Inter Variable', 'Inter', system-ui, -apple-system, sans-serif";

export const SAFE_AREA = {
  left: 96,
  right: 1824,
  top: 54,
  bottom: 1026,
} as const;

export const C = {
  bg: "#F1F5FA",
  vignetteCorner: "#E4ECF7",
  ink: "#0F172A",
  ink2: "#334155",
  muted: "#64748B",
  faint: "#94A3B8",
  line: "#C6D1E0",
  lineSoft: "#D5DFEC",
  placeholder: "#CBD5E1",
  surface2: "#F1F5F9",

  indigo: "#4F46E5",
  indigoSoft: "#EEF2FF",
  indigoBorder: "#C7D2FE",
  indigoText: "#4338CA",

  waIcon: "#25D366",
  waBubbleOut: "#D9FDD3",
  waRowSelected: "#F0FDF4",
  greenText: "#15803D",
  greenChipBg: "#ECFDF3",
  successGreen: "#16A34A",

  violet: "#8B5CF6",
  violetSoft: "#F5F3FF",
  violetBorder: "#DDD6FE",
  violetText: "#7C3AED",
  violetInk: "#4C1D95",

  igGrad: "linear-gradient(135deg, #F58529 0%, #DD2A7B 52%, #8134AF 100%)",
  igPink: "#DD2A7B",
  igSoft: "#FDF2F8",
  igOrange: "#F58529",

  fbBlue: "#1877F2",
  fbSoft: "#E7F0FD",

  gmailRed: "#EA4335",
  gmailSoft: "#FEF2F2",
  redChipText: "#B91C1C",
  unreadRed: "#EF4444",

  amber: "#F59E0B",
  amberText: "#B45309",
  amberSoft: "#FFFBEB",

  noteFill: "#FEF9C3",
  noteBorder: "#FDE68A",
  noteText: "#713F12",

  avatarGreenBg: "#DCFCE7",
  avatarGreenText: "#15803D",
  avatarIndigoBg: "#EEF2FF",
  avatarIndigoText: "#4338CA",
  avatarPinkBg: "#FCE7F3",
  avatarPinkText: "#BE185D",
  avatarPeachBg: "#FFF1E8",
  avatarPeachText: "#C2410C",
  avatarBlueBg: "#E0F2FE",
  avatarBlueText: "#0369A1",
} as const;

export const SHADOW = {
  resting: "0 1px 3px rgba(15,23,42,0.06), 0 8px 24px rgba(15,23,42,0.08)",
  hero: "0 14px 44px rgba(15,23,42,0.12), 0 2px 8px rgba(15,23,42,0.06)",
  glow: (hex: string) => `0 12px 48px ${hex}38`, // 22% opacity (0x38 / 255 ≈ 22%)
} as const;

export const E_ENTER = Easing.bezier(0.16, 1, 0.3, 1);
export const E_EXIT = Easing.bezier(0.7, 0, 0.84, 0);
export const E_IO = Easing.bezier(0.65, 0, 0.35, 1);
export const E_BACK = Easing.bezier(0.34, 1.56, 0.64, 1);
export const E_LINEAR = Easing.linear;

export const clamp01 = (v: number): number => (v < 0 ? 0 : v > 1 ? 1 : v);

/**
 * Normalized eased progress across [t0, t1] in seconds from global timeline `t`.
 */
export function seg(
  t: number,
  t0: number,
  t1: number,
  easing: (x: number) => number = E_IO
): number {
  if (t <= t0) return 0;
  if (t >= t1) return 1;
  return easing((t - t0) / (t1 - t0));
}

export function lerp(a: number, b: number, u: number): number {
  return a + (b - a) * u;
}

/**
 * Spring approximation matching stiffness=300, damping=22, mass=1 (settles ~0.35s).
 */
export function springUnit(t: number, startSec: number): number {
  const dt = t - startSec;
  if (dt <= 0) return 0;
  if (dt >= 0.6) return 1;
  // Exact analytical damped harmonic oscillator for k=300, c=22, m=1
  const omega0 = Math.sqrt(300); // 17.3205
  const zeta = 22 / (2 * omega0); // 0.6351
  const omegaD = omega0 * Math.sqrt(1 - zeta * zeta); // 13.379
  const decay = Math.exp(-zeta * omega0 * dt);
  return 1 - decay * (Math.cos(omegaD * dt) + (zeta / Math.sqrt(1 - zeta * zeta)) * Math.sin(omegaD * dt));
}

/**
 * Typed string at 35 chars/sec starting at startSec.
 */
export function typedSlice(text: string, t: number, startSec: number, cps = 35): {
  shown: string;
  typing: boolean;
  caretOn: boolean;
} {
  if (t < startSec) {
    return { shown: "", typing: false, caretOn: false };
  }
  const elapsed = t - startSec;
  const count = Math.min(text.length, Math.floor(elapsed * cps));
  const done = count >= text.length;
  const caretOn = !done && Math.floor(elapsed * 2) % 2 === 0;
  return {
    shown: text.slice(0, count),
    typing: !done,
    caretOn,
  };
}

/**
 * Quadratic Bezier point with perpendicular control offset.
 */
export function quadPath(
  p0: [number, number],
  p2: [number, number],
  u: number,
  perpOffset = 120
): [number, number] {
  const mx = (p0[0] + p2[0]) / 2;
  const my = (p0[1] + p2[1]) / 2;
  const dx = p2[0] - p0[0];
  const dy = p2[1] - p0[1];
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const cx = mx + nx * perpOffset;
  const cy = my + ny * perpOffset;
  const inv = 1 - u;
  return [
    inv * inv * p0[0] + 2 * inv * u * cx + u * u * p2[0],
    inv * inv * p0[1] + 2 * inv * u * cy + u * u * p2[1],
  ];
}

export function quadExplicit(
  p0: [number, number],
  ctrl: [number, number],
  p2: [number, number],
  u: number
): [number, number] {
  const inv = 1 - u;
  return [
    inv * inv * p0[0] + 2 * inv * u * ctrl[0] + u * u * p2[0],
    inv * inv * p0[1] + 2 * inv * u * ctrl[1] + u * u * p2[1],
  ];
}

export interface CameraKeyframe {
  t: number;
  fx: number;
  fy: number;
  zoom: number;
}

/**
 * Subtle cursor/action-tracking camera pan & zoom around 960x540.
 * At zoom = 1.0, tx = 0 and ty = 0 automatically; as zoom increases (1.06 - 1.14),
 * the active focal point [fx, fy] gently glides toward center without edge clipping.
 */
export function cameraFollow(
  t: number,
  keyframes: CameraKeyframe[]
): { scale: number; tx: number; ty: number } {
  if (keyframes.length === 0) return { scale: 1, tx: 0, ty: 0 };
  let fx = keyframes[0].fx;
  let fy = keyframes[0].fy;
  let zoom = keyframes[0].zoom;

  if (t >= keyframes[keyframes.length - 1].t) {
    const last = keyframes[keyframes.length - 1];
    fx = last.fx;
    fy = last.fy;
    zoom = last.zoom;
  } else {
    for (let i = 0; i < keyframes.length - 1; i++) {
      const k0 = keyframes[i];
      const k1 = keyframes[i + 1];
      if (t >= k0.t && t <= k1.t) {
        const span = Math.max(0.001, k1.t - k0.t);
        const u = E_IO(clamp01((t - k0.t) / span));
        fx = lerp(k0.fx, k1.fx, u);
        fy = lerp(k0.fy, k1.fy, u);
        zoom = lerp(k0.zoom, k1.zoom, u);
        break;
      }
    }
  }

  const panWeight = Math.min(0.42, Math.max(0, zoom - 1) * 3.0);
  const rawTx = (960 - fx) * panWeight;
  const rawTy = (540 - fy) * panWeight;
  // Guard top edge (CaptionBar clearance) AND left edge (keep Samyoj logo & active sidebar visible!)
  const topGuard = Math.max(0, zoom - 1) * 345 - 22;
  const minTx = Math.min(0, -(116 - Math.max(0, zoom - 1) * 820));
  return {
    scale: zoom,
    tx: Math.max(minTx, Math.min(130, rawTx)),
    ty: Math.max(topGuard, Math.min(28, rawTy)),
  };
}

/**
 * Smooth [0..1] focus envelope for POV spotlighting across [startSec, endSec].
 */
export function focusWindow(t: number, startSec: number, endSec: number, ramp = 0.28): number {
  if (t <= startSec || t >= endSec) return 0;
  const inU = seg(t, startSec, startSec + ramp, E_ENTER);
  const outU = 1 - seg(t, endSec - ramp, endSec, E_EXIT);
  return Math.min(inU, outU);
}

/**
 * Subtle VO-word pulse scale (peaks ~1.08 around pulseAt, settles in 0.42s).
 */
export function voPulse(t: number, pulseAt: number, amp = 0.08): number {
  const dt = t - pulseAt;
  if (dt <= 0 || dt >= 0.48) return 1;
  return 1 + amp * Math.sin((dt / 0.48) * Math.PI);
}

export const SCENES = {
  s1: { start: 0, end: 5 },
  s2: { start: 5, end: 11 },
  s3: { start: 11, end: 16 },
  s4: { start: 16, end: 21 },
  s5: { start: 21, end: 27 },
  s6: { start: 27, end: 33 },
  s7: { start: 33, end: 39 },
  s8: { start: 39, end: 44 },
  s9: { start: 44, end: 50 },
  s10: { start: 50, end: 54 },
  s11: { start: 54, end: 60 },
} as const;

export const SAMPLE = {
  business: "Sunrise Yoga Studio",
  website: "samyoj.com",
  wordmark: "Samyoj",
  tagline: "Every conversation, connected.",
  igHandle: "@sunrise.yoga",
  adsSpendMonSun: [1500, 1650, 1700, 1800, 1900, 2000, 1850],
} as const;
