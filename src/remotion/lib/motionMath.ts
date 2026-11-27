/**
 * Deterministic Motion Mathematics & Physics Library for Remotion
 * Pure functions of `t` (seconds) — zero frame-state mutation, zero Math.random().
 * Covers: damped harmonic springs, 2-bone analytical IK, FABRIK multi-joint IK,
 * deterministic Verlet cloth/hair chains, volume-preserving squash & stretch,
 * Catmull-Rom splines, multiplane parallax, and living face/gait helpers.
 */

export interface Vec2 {
  x: number;
  y: number;
}

export const clamp = (v: number, lo: number, hi: number): number =>
  v < lo ? lo : v > hi ? hi : v;

export const lerp = (a: number, b: number, u: number): number => a + (b - a) * u;

export const lerpVec2 = (a: Vec2, b: Vec2, u: number): Vec2 => ({
  x: lerp(a.x, b.x, u),
  y: lerp(a.y, b.y, u),
});

/**
 * Exact analytical damped harmonic oscillator (0 -> 1) starting at `startSec`.
 * Deterministic for any `t` without stepping previous frames.
 * - zeta < 1: underdamped (bouncy overshoot)
 * - zeta = 1: critically damped (fastest settle without overshoot)
 * - zeta > 1: overdamped (heavy, slow settle)
 */
export function analyticalSpring(
  t: number,
  startSec: number,
  stiffness = 220,
  damping = 20,
  mass = 1,
): number {
  const dt = t - startSec;
  if (dt <= 0) return 0;
  const omega0 = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));

  if (zeta < 0.999) {
    const sq = Math.sqrt(1 - zeta * zeta);
    const omegaD = omega0 * sq;
    const decay = Math.exp(-zeta * omega0 * dt);
    const val = 1 - decay * (Math.cos(omegaD * dt) + (zeta / sq) * Math.sin(omegaD * dt));
    return Math.abs(1 - val) < 1e-4 && decay < 1e-3 ? 1 : val;
  }
  if (zeta <= 1.001) {
    // Critically damped: 1 - e^(-w0*t) * (1 + w0*t)
    const decay = Math.exp(-omega0 * dt);
    return 1 - decay * (1 + omega0 * dt);
  }
  // Overdamped
  const sq = Math.sqrt(zeta * zeta - 1);
  const r1 = -omega0 * (zeta - sq);
  const r2 = -omega0 * (zeta + sq);
  const c1 = r2 / (r2 - r1);
  const c2 = -r1 / (r2 - r1);
  return 1 - (c1 * Math.exp(r1 * dt) + c2 * Math.exp(r2 * dt));
}

/**
 * Volume-preserving 2D squash & stretch around anchor point.
 * `impulse` > 0 stretches vertically & squashes horizontally; < 0 squashes vertically & widens horizontally.
 * Area invariant: sx * sy === 1.
 */
export function squashStretch(
  impulse: number,
  maxStretch = 0.35,
): { sx: number; sy: number } {
  const clamped = clamp(impulse, -maxStretch, maxStretch);
  const sy = Math.max(0.4, 1 + clamped);
  const sx = 1 / sy;
  return { sx, sy };
}

/**
 * Analytical 2-Bone Inverse Kinematics via Law of Cosines.
 * Ideal for arms (shoulder -> elbow -> wrist) and legs (hip -> knee -> ankle).
 * `bendDir`: +1 or -1 controls elbow/knee hinge direction.
 */
export function solveTwoBoneIK(
  root: Vec2,
  target: Vec2,
  len1: number,
  len2: number,
  bendDir: 1 | -1 = 1,
): { root: Vec2; mid: Vec2; end: Vec2; reached: boolean } {
  const dx = target.x - root.x;
  const dy = target.y - root.y;
  const rawDist = Math.hypot(dx, dy) || 1e-6;
  const maxReach = len1 + len2 - 1e-4;
  const minReach = Math.abs(len1 - len2) + 1e-4;
  const dist = clamp(rawDist, minReach, maxReach);
  const reached = rawDist <= maxReach && rawDist >= minReach;

  const baseAngle = Math.atan2(dy, dx);
  const cosA = clamp(
    (len1 * len1 + dist * dist - len2 * len2) / (2 * len1 * dist),
    -1,
    1,
  );
  const angleA = Math.acos(cosA);
  const joint1Angle = baseAngle + bendDir * angleA;

  const mid: Vec2 = {
    x: root.x + len1 * Math.cos(joint1Angle),
    y: root.y + len1 * Math.sin(joint1Angle),
  };

  const end: Vec2 = reached
    ? { x: target.x, y: target.y }
    : {
        x: root.x + (dx / rawDist) * dist,
        y: root.y + (dy / rawDist) * dist,
      };

  return { root, mid, end, reached };
}

/**
 * Multi-joint FABRIK (Forward And Backward Reaching Inverse Kinematics).
 * Linear O(n) per iteration — ideal for tentacles, spines, tails, garlands, multi-segment rigs.
 */
export function solveFABRIK(
  initialJoints: readonly Vec2[],
  lengths: readonly number[],
  target: Vec2,
  maxIter = 12,
  tolerance = 0.25,
): Vec2[] {
  const n = lengths.length;
  if (initialJoints.length !== n + 1 || n === 0) {
    return initialJoints.map((j) => ({ ...j }));
  }
  const joints = initialJoints.map((j) => ({ ...j }));
  const root = { ...joints[0] };
  const totalLen = lengths.reduce((a, b) => a + b, 0);

  const distToTarget = Math.hypot(target.x - root.x, target.y - root.y);
  if (distToTarget >= totalLen) {
    for (let i = 0; i < n; i++) {
      const dx = target.x - joints[i].x;
      const dy = target.y - joints[i].y;
      const r = Math.hypot(dx, dy) || 1;
      joints[i + 1] = {
        x: joints[i].x + (lengths[i] * dx) / r,
        y: joints[i].y + (lengths[i] * dy) / r,
      };
    }
    return joints;
  }

  for (let iter = 0; iter < maxIter; iter++) {
    const endErr = Math.hypot(joints[n].x - target.x, joints[n].y - target.y);
    if (endErr <= tolerance) break;

    // Forward pass (end -> root)
    joints[n] = { x: target.x, y: target.y };
    for (let i = n - 1; i >= 0; i--) {
      const dx = joints[i].x - joints[i + 1].x;
      const dy = joints[i].y - joints[i + 1].y;
      const r = Math.hypot(dx, dy) || 1;
      joints[i] = {
        x: joints[i + 1].x + (lengths[i] * dx) / r,
        y: joints[i + 1].y + (lengths[i] * dy) / r,
      };
    }

    // Backward pass (root -> end)
    joints[0] = { x: root.x, y: root.y };
    for (let i = 0; i < n; i++) {
      const dx = joints[i + 1].x - joints[i].x;
      const dy = joints[i + 1].y - joints[i].y;
      const r = Math.hypot(dx, dy) || 1;
      joints[i + 1] = {
        x: joints[i].x + (lengths[i] * dx) / r,
        y: joints[i].y + (lengths[i] * dy) / r,
      };
    }
  }

  return joints;
}

/**
 * Deterministic Verlet chain simulator (cloth, dupatta, cape, hair strand, garland).
 * Evaluates fixed substeps from `t - lookback` (or `0`) purely from analytical `anchorAt(time)`
 * and `windAt(time, idx)` so Remotion frame scrubbing is 100% deterministic.
 */
export function simulateVerletChain(opts: {
  t: number;
  segmentCount: number;
  segmentLength: number;
  anchorAt: (timeSec: number) => Vec2;
  windAt?: (timeSec: number, nodeIdx: number) => Vec2;
  gravity?: number;
  damping?: number;
  simWindowSec?: number;
  substepsPerSec?: number;
  constraintIters?: number;
}): Vec2[] {
  const {
    t,
    segmentCount,
    segmentLength,
    anchorAt,
    windAt,
    gravity = 520,
    damping = 0.04,
    simWindowSec = 1.6,
    substepsPerSec = 60,
    constraintIters = 6,
  } = opts;

  const dt = 1 / substepsPerSec;
  const startT = Math.max(0, t - simWindowSec);
  const steps = Math.max(1, Math.round((t - startT) * substepsPerSec));
  const initAnchor = anchorAt(startT);

  const cur: Vec2[] = [];
  const prev: Vec2[] = [];
  for (let i = 0; i <= segmentCount; i++) {
    const p = { x: initAnchor.x, y: initAnchor.y + i * segmentLength };
    cur.push({ ...p });
    prev.push({ ...p });
  }

  const dt2 = dt * dt;
  const keep = 1 - damping;

  for (let s = 1; s <= steps; s++) {
    const simT = startT + s * dt;
    const pin = anchorAt(simT);
    cur[0] = { ...pin };
    prev[0] = { ...pin };

    for (let i = 1; i <= segmentCount; i++) {
      const w = windAt ? windAt(simT, i) : { x: 0, y: 0 };
      const vx = (cur[i].x - prev[i].x) * keep;
      const vy = (cur[i].y - prev[i].y) * keep;
      prev[i].x = cur[i].x;
      prev[i].y = cur[i].y;
      cur[i].x += vx + w.x * dt2;
      cur[i].y += vy + (gravity + w.y) * dt2;
    }

    for (let k = 0; k < constraintIters; k++) {
      cur[0] = { ...pin };
      for (let i = 0; i < segmentCount; i++) {
        const dx = cur[i + 1].x - cur[i].x;
        const dy = cur[i + 1].y - cur[i].y;
        const dist = Math.hypot(dx, dy) || 1e-6;
        const diff = (segmentLength - dist) / dist;
        if (i === 0) {
          cur[i + 1].x += dx * diff;
          cur[i + 1].y += dy * diff;
        } else {
          cur[i].x -= dx * diff * 0.5;
          cur[i].y -= dy * diff * 0.5;
          cur[i + 1].x += dx * diff * 0.5;
          cur[i + 1].y += dy * diff * 0.5;
        }
      }
    }
  }

  return cur;
}

/**
 * Centripetal Catmull-Rom spline point through `points` at normalized `u` in [0, 1].
 */
export function catmullRomPoint(points: readonly Vec2[], u: number): Vec2 {
  if (points.length === 0) return { x: 0, y: 0 };
  if (points.length === 1) return points[0];
  const segCount = points.length - 1;
  const scaled = clamp(u, 0, 1) * segCount;
  const i = Math.min(segCount - 1, Math.floor(scaled));
  const t = scaled - i;

  const p0 = points[Math.max(0, i - 1)];
  const p1 = points[i];
  const p2 = points[Math.min(segCount, i + 1)];
  const p3 = points[Math.min(segCount, i + 2)];

  const t2 = t * t;
  const t3 = t2 * t;
  return {
    x:
      0.5 *
      (2 * p1.x +
        (-p0.x + p2.x) * t +
        (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
        (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
    y:
      0.5 *
      (2 * p1.y +
        (-p0.y + p2.y) * t +
        (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
        (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
  };
}

/**
 * Disney Multiplane Parallax Layer Transform:
 * `depthZ`: 0 = camera focal hero plane, >0 = farther background, <0 = foreground occluder.
 * Returns lateral displacement and optical blur radius (px).
 */
export function multiplaneLayer(
  cameraPanX: number,
  cameraPanY: number,
  depthZ: number,
  refDist = 10,
  blurFactor = 0.85,
): { offsetX: number; offsetY: number; blurPx: number; scaleFactor: number } {
  const denom = Math.max(1.5, refDist + depthZ);
  const parallaxFactor = refDist / denom; // >1 for foreground (<0), <1 for background (>0)
  const blurPx =
    Math.abs(depthZ) < 0.5
      ? 0
      : Math.min(12, blurFactor * Math.pow(Math.abs(depthZ) / refDist, 1.4) * 3.5);
  return {
    offsetX: -cameraPanX * parallaxFactor,
    offsetY: -cameraPanY * parallaxFactor,
    blurPx,
    scaleFactor: 1 + clamp(-depthZ * 0.015, -0.15, 0.22),
  };
}

/**
 * Natural living-face blink openness [0 = closed, 1 = open] with irregular cadence.
 */
export function naturalBlink(t: number, seedOffset = 0, periodSec = 3.7): number {
  const phase = (t + seedOffset) % periodSec;
  const closeDur = 0.085;
  const holdClosed = 0.025;
  const openDur = 0.145;
  if (phase < closeDur) {
    const u = phase / closeDur;
    return 1 - u * u;
  }
  if (phase < closeDur + holdClosed) return 0;
  if (phase < closeDur + holdClosed + openDur) {
    const u = (phase - closeDur - holdClosed) / openDur;
    return 1 - Math.pow(1 - u, 2);
  }
  return 1;
}

/**
 * Smooth breathing cycle [0..1] for chest/shoulder elevation & idle life.
 */
export function breathingCycle(t: number, bpm = 15, phaseOffset = 0): number {
  const hz = bpm / 60;
  // Slightly asymmetric inhale/exhale curve
  const s = Math.sin(2 * Math.PI * hz * t + phaseOffset);
  return 0.5 + 0.5 * Math.sin(s * (Math.PI / 2) * 0.85);
}
