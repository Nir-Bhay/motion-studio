/**
 * Real procedural physics & secondary-motion curves for 2.5D characters, cloth, hair, wings, and fire.
 * Pure deterministic functions of `frame` (zero randomness flicker across renders).
 */

/** Multi-harmonic cloth/scarf/veil ripple wave (standing + travelling wave) */
export function clothWave(t: number, phase = 0, amp = 14): number {
  return (
    Math.sin(t * 2.6 + phase) * amp * 0.65 +
    Math.sin(t * 4.3 + phase * 1.7) * amp * 0.35
  );
}

/** Damped pendulum swing for hanging bells, damaru, kundals, and snake tails */
export function pendulumSwing(t: number, freq = 2.8, maxAngleDeg = 11, impulse = 0): number {
  const base = Math.sin(t * freq) * maxAngleDeg;
  const harmonic = Math.sin(t * freq * 2.1 + 0.8) * (maxAngleDeg * 0.25);
  return base + harmonic + impulse * Math.sin(t * 7.5);
}

/** Asymmetric wing stroke (snappy powerful downstroke, graceful slower upstroke) */
export function wingFlap(t: number, speed = 4.2, amp = 26): number {
  const raw = Math.sin(t * speed);
  // Power-curve asymmetry: downstroke sharper than upstroke
  const shaped = raw >= 0 ? Math.pow(raw, 0.72) : -Math.pow(-raw, 1.35);
  return shaped * amp;
}

/** Bouncy squash-and-stretch preserving approximate area (scaleX * scaleY ≈ 1) */
export function squashStretch(t: number, freq = 5.0, phase = 0, amount = 0.08): {
  hopY: number;
  sx: number;
  sy: number;
  leanDeg: number;
} {
  const s = Math.sin(t * freq + phase);
  const absS = Math.abs(s);
  // At bottom of bounce (absS near 0), squash wide; at peak, stretch tall
  const stretch = (absS - 0.35) * amount * 2;
  const sy = 1 + stretch;
  const sx = 1 / Math.max(0.84, sy);
  return {
    hopY: Math.pow(absS, 0.85) * 20,
    sx,
    sy,
    leanDeg: Math.cos(t * freq + phase) * 5.5,
  };
}

/** Smooth organic breathing + subtle micro-sway */
export function breathe(t: number, phase = 0, amp = 3.5): {
  chestExpand: number;
  shoulderLift: number;
  headNod: number;
} {
  const b = Math.sin(t * 1.65 + phase);
  return {
    chestExpand: b * amp,
    shoulderLift: b * (amp * 0.55),
    headNod: Math.sin(t * 0.9 + phase) * 1.6,
  };
}

/** Flame & ember turbulence */
export function fireTurbulence(t: number, seed = 0): {
  scaleY: number;
  scaleX: number;
  leanX: number;
} {
  const f1 = Math.sin(t * 8.5 + seed * 3.1);
  const f2 = Math.cos(t * 13.7 + seed * 1.9);
  return {
    scaleY: 1 + f1 * 0.14 + f2 * 0.08,
    scaleX: 1 - f1 * 0.07,
    leanX: (f1 + f2) * 5.5,
  };
}
