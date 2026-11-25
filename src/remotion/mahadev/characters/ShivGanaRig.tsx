import React from "react";
import { useCurrentFrame } from "remotion";

export type GanaVariant = "shringi" | "bhringi" | "chubby" | "tall" | "drummer";

export const ShivGanaRig: React.FC<{
  x: number;
  y: number;
  variant: GanaVariant;
  scale?: number;
  phase?: number;
  flipX?: boolean;
}> = ({ x, y, variant, scale = 1, phase = 0, flipX = false }) => {
  const frame = useCurrentFrame();
  const hop = Math.abs(Math.sin(frame * 0.16 + phase)) * 18;
  const squashX = 1 + Math.cos(frame * 0.32 + phase) * 0.05;
  const squashY = 1 - Math.cos(frame * 0.32 + phase) * 0.05;
  const armWave = Math.sin(frame * 0.22 + phase) * 32;

  const skin =
    variant === "shringi"
      ? "#94a3b8"
      : variant === "bhringi"
      ? "#cbd5e1"
      : variant === "chubby"
      ? "#7dd3fc"
      : variant === "tall"
      ? "#a5b4fc"
      : "#6ee7b7";

  const dhoti =
    variant === "shringi"
      ? "#f97316"
      : variant === "bhringi"
      ? "#eab308"
      : variant === "chubby"
      ? "#ef4444"
      : "#a855f7";

  const bodyW = variant === "chubby" ? 42 : variant === "tall" ? 24 : 30;
  const bodyH = variant === "tall" ? 78 : variant === "chubby" ? 56 : 62;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y - hop,
        transform: `translate(-50%, -50%) scale(${flipX ? -scale * squashX : scale * squashX}, ${scale * squashY})`,
        transformOrigin: "bottom center",
        pointerEvents: "none",
      }}
    >
      <svg width={220} height={260} viewBox="-110 -140 220 260" overflow="visible">
        {/* Dancing Legs */}
        <path d={`M -14,42 Q -24,72 ${-18 + Math.sin(frame * 0.2 + phase) * 8},92`} stroke={skin} strokeWidth={13} strokeLinecap="round" fill="none" />
        <path d={`M 14,42 Q 24,72 ${18 - Math.sin(frame * 0.2 + phase) * 8},92`} stroke={skin} strokeWidth={13} strokeLinecap="round" fill="none" />

        {/* Colorful Dhoti */}
        <path d={`M ${-bodyW},18 L ${bodyW},18 L ${bodyW + 6},52 L ${-bodyW - 6},52 Z`} fill={dhoti} stroke="#1e293b" strokeWidth={2} />

        {/* Torso */}
        <ellipse cx={0} cy={2} rx={bodyW} ry={bodyH * 0.55} fill={skin} stroke="#334155" strokeWidth={2} />
        {/* Ash Tripundra Lines on Belly */}
        <path d="M -14,-4 Q 0,-8 14,-4 M -12,4 Q 0,0 12,4" stroke="#ffffff" strokeWidth={2.5} fill="none" opacity={0.8} />

        {/* Left Waving Arm */}
        <g transform={`translate(${-bodyW + 4}, -16) rotate(${-40 + armWave})`}>
          <path d="M 0,0 Q -26,-16 -36,-42" stroke={skin} strokeWidth={12} strokeLinecap="round" fill="none" />
          <circle cx={-38} cy={-44} r={7} fill={skin} />
        </g>

        {/* Right Arm + Prop (Damaru or Mini-Trishul or Shooing Gesture) */}
        <g transform={`translate(${bodyW - 4}, -16) rotate(${35 - armWave})`}>
          <path d="M 0,0 Q 26,-16 36,-42" stroke={skin} strokeWidth={12} strokeLinecap="round" fill="none" />
          {variant === "drummer" || variant === "chubby" ? (
            <g transform="translate(38, -50)">
              <polygon points="-10,-10 10,-10 0,0" fill="#d97706" />
              <polygon points="-10,10 10,10 0,0" fill="#d97706" />
            </g>
          ) : (
            <g transform="translate(38, -55)">
              <line x1={0} y1={28} x2={0} y2={-32} stroke="#e2e8f0" strokeWidth={4} />
              <path d="M -10,-22 Q 0,-8 10,-22" fill="none" stroke="#e2e8f0" strokeWidth={3.5} />
            </g>
          )}
        </g>

        {/* Expressive Head */}
        <g transform={`translate(0, ${-bodyH * 0.5 - 22})`}>
          {/* Pointy Ears */}
          <polygon points="-22,-4 -36,-12 -22,6" fill={skin} />
          <polygon points="22,-4 36,-12 22,6" fill={skin} />
          <circle cx={0} cy={0} r={24} fill={skin} stroke="#334155" strokeWidth={2} />
          {/* Horns for Shringi / Tall Gana */}
          {(variant === "shringi" || variant === "tall") && (
            <g>
              <path d="M -14,-18 Q -28,-42 -12,-50" fill="none" stroke="#fef3c7" strokeWidth={6} strokeLinecap="round" />
              <path d="M 14,-18 Q 28,-42 12,-50" fill="none" stroke="#fef3c7" strokeWidth={6} strokeLinecap="round" />
            </g>
          )}
          {/* Wild Hair Tuft */}
          <path d="M -14,-20 Q 0,-42 14,-20 Z" fill="#1e293b" />
          {/* Big Expressive Eyes */}
          <circle cx={-8} cy={-4} r={5} fill="#ffffff" />
          <circle cx={-8} cy={-4} r={2.5} fill="#0f172a" />
          <circle cx={8} cy={-4} r={5} fill="#ffffff" />
          <circle cx={8} cy={-4} r={2.5} fill="#0f172a" />
          {/* Playful Open Grin */}
          <path d="M -10,8 Q 0,18 10,8 Z" fill="#7f1d1d" stroke="#0f172a" strokeWidth={1.5} />
        </g>
      </svg>
    </div>
  );
};
