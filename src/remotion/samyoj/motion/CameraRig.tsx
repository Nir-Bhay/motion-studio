import React from "react";
import { inOutQuart, outExpo } from "./easing";

export interface CameraKeyframe {
  frame: number;
  scale: number;
  /** Pan offset in pixels (after scale, around 960,540 center) */
  x?: number;
  y?: number;
  rotateX?: number;
  rotateY?: number;
}

export interface CameraState {
  scale: number;
  x: number;
  y: number;
  rotateX: number;
  rotateY: number;
}

export const evalCamera = (
  frame: number,
  keyframes: CameraKeyframe[],
  easeFn: (t: number) => number = inOutQuart,
): CameraState => {
  if (keyframes.length === 0) return { scale: 1, x: 0, y: 0, rotateX: 0, rotateY: 0 };
  if (frame <= keyframes[0].frame) {
    const k = keyframes[0];
    return { scale: k.scale, x: k.x ?? 0, y: k.y ?? 0, rotateX: k.rotateX ?? 0, rotateY: k.rotateY ?? 0 };
  }
  const last = keyframes[keyframes.length - 1];
  if (frame >= last.frame) {
    return { scale: last.scale, x: last.x ?? 0, y: last.y ?? 0, rotateX: last.rotateX ?? 0, rotateY: last.rotateY ?? 0 };
  }
  for (let i = 0; i < keyframes.length - 1; i++) {
    const a = keyframes[i];
    const b = keyframes[i + 1];
    if (frame >= a.frame && frame <= b.frame) {
      const span = Math.max(1, b.frame - a.frame);
      const t = easeFn((frame - a.frame) / span);
      const lerp = (u = 0, v = 0) => u + (v - u) * t;
      return {
        scale: lerp(a.scale, b.scale),
        x: lerp(a.x ?? 0, b.x ?? 0),
        y: lerp(a.y ?? 0, b.y ?? 0),
        rotateX: lerp(a.rotateX ?? 0, b.rotateX ?? 0),
        rotateY: lerp(a.rotateY ?? 0, b.rotateY ?? 0),
      };
    }
  }
  return { scale: 1, x: 0, y: 0, rotateX: 0, rotateY: 0 };
};

/**
 * Structured Camera Rig wrapping a 1920x1080 stage.
 * Smooth zoom-ins stay crisp (scale <= 1.65) with natural perspective tilt.
 */
export const CameraRig: React.FC<{
  frame: number;
  keyframes: CameraKeyframe[];
  children: React.ReactNode;
}> = ({ frame, keyframes, children }) => {
  const cam = evalCamera(frame, keyframes, inOutQuart);
  // Subtle micro-drift so holds never feel digitally frozen
  const driftX = Math.sin(frame * 0.032) * 2.2;
  const driftY = Math.cos(frame * 0.025) * 1.6;
  const x = cam.x + driftX;
  const y = cam.y + driftY;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        perspective: 1800,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          transformOrigin: "960px 540px",
          transform: `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${cam.scale.toFixed(4)}) rotateX(${cam.rotateX.toFixed(2)}deg) rotateY(${cam.rotateY.toFixed(2)}deg)`,
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export { outExpo };
