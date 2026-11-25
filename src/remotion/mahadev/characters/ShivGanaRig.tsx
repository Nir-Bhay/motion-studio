import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { pendulumSwing, squashStretch } from "../motion/physics";

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
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const sq = squashStretch(t, 5.2, phase, 0.085);
  const armWave = Math.sin(t * 7.2 + phase) * 34;
  const propSwing = pendulumSwing(t, 6.0, 12, 0);

  const skin =
    variant === "shringi"
      ? "#cbd5e1"
      : variant === "bhringi"
      ? "#e2e8f0"
      : variant === "chubby"
      ? "#7dd3fc"
      : variant === "tall"
      ? "#c4b5fd"
      : "#6ee7b7";

  const dhoti =
    variant === "shringi"
      ? "#f97316"
      : variant === "bhringi"
      ? "#eab308"
      : variant === "chubby"
      ? "#ef4444"
      : "#a855f7";

  const bodyW = variant === "chubby" ? 44 : variant === "tall" ? 27 : 33;
  const bodyH = variant === "tall" ? 80 : variant === "chubby" ? 58 : 64;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y - sq.hopY,
        transform: `translate(-50%, -50%) scale(${flipX ? -scale * sq.sx : scale * sq.sx}, ${scale * sq.sy}) rotate(${sq.leanDeg}deg)`,
        transformOrigin: "bottom center",
        pointerEvents: "none",
        // Rim glow so every Gana reads crisp against dark Shamshan night!
        filter: "drop-shadow(0 0 14px rgba(186, 230, 253, 0.36))",
      }}
    >
      <svg width={230} height={270} viewBox="-115 -145 230 270" overflow="visible">
        {/* Muscular Legs + Ankle Ghungroo/Kadas */}
        <path d={`M -14,42 Q -26,68 ${-18 + Math.sin(t * 6.5 + phase) * 8},94`} stroke={skin} strokeWidth={14} strokeLinecap="round" fill="none" />
        <path d={`M 14,42 Q 26,68 ${18 - Math.sin(t * 6.5 + phase) * 8},94`} stroke={skin} strokeWidth={14} strokeLinecap="round" fill="none" />
        <circle cx={-18 + Math.sin(t * 6.5 + phase) * 8} cy={88} r={5} fill="#fbbf24" />
        <circle cx={18 - Math.sin(t * 6.5 + phase) * 8} cy={88} r={5} fill="#fbbf24" />

        {/* Draped Baghambar/Silk Dhoti with Golden Trim */}
        <path d={`M ${-bodyW},18 L ${bodyW},18 L ${bodyW + 7},54 L ${-bodyW - 7},54 Z`} fill={dhoti} stroke="#fde047" strokeWidth={2.2} />
        <rect x={-bodyW - 1} y={14} width={(bodyW + 1) * 2} height={8} rx={4} fill="#fbbf24" />

        {/* Sculpted Muscular Torso (Broad Chest + Deltoids + Rudraksha Mala) */}
        <path
          d={`M ${-bodyW - 4},-28 Q 0,-38 ${bodyW + 4},-28 L ${bodyW - 4},22 L ${-bodyW + 4},22 Z`}
          fill={skin}
          stroke="#f8fafc"
          strokeWidth={1.6}
        />
        {/* Chest & Pectoral Definition */}
        <path d="M -18,-14 Q -8,-6 -2,-12 M 2,-12 Q 8,-6 18,-14" fill="none" stroke="#475569" strokeWidth={2} opacity={0.55} />
        <path d="M -14,-4 Q 0,-8 14,-4 M -12,5 Q 0,1 12,5" stroke="#ffffff" strokeWidth={2.8} fill="none" />
        {/* Rudraksha Necklace */}
        <path d="M -18,-26 Q 0,-12 18,-26" fill="none" stroke="#9a3412" strokeWidth={5.5} strokeDasharray="3 3" strokeLinecap="round" />

        {/* Left Sculpted Arm + Bangle */}
        <g transform={`translate(${-bodyW - 2}, -18) rotate(${-38 + armWave})`}>
          <path d="M 0,0 Q -26,-16 -38,-44" stroke={skin} strokeWidth={13} strokeLinecap="round" fill="none" />
          <ellipse cx={-18} cy={-12} rx={4} ry={8} fill="none" stroke="#fbbf24" strokeWidth={3} />
          <circle cx={-40} cy={-46} r={7.5} fill={skin} />
        </g>

        {/* Right Sculpted Arm + Damaru / Trishul */}
        <g transform={`translate(${bodyW + 2}, -18) rotate(${36 - armWave})`}>
          <path d="M 0,0 Q 26,-16 38,-44" stroke={skin} strokeWidth={13} strokeLinecap="round" fill="none" />
          <ellipse cx={18} cy={-12} rx={4} ry={8} fill="none" stroke="#fbbf24" strokeWidth={3} />
          {variant === "drummer" || variant === "chubby" ? (
            <g transform={`translate(40, -52) rotate(${propSwing})`}>
              <polygon points="-12,-11 12,-11 0,0" fill="#d97706" stroke="#fde047" strokeWidth={1.5} />
              <polygon points="-12,11 12,11 0,0" fill="#d97706" stroke="#fde047" strokeWidth={1.5} />
            </g>
          ) : (
            <g transform={`translate(40, -58) rotate(${propSwing * 0.5})`}>
              <line x1={0} y1={28} x2={0} y2={-34} stroke="#f8fafc" strokeWidth={4} />
              <path d="M -11,-24 Q 0,-8 11,-24" fill="none" stroke="#f8fafc" strokeWidth={3.5} />
            </g>
          )}
        </g>

        {/* Expressive Head */}
        <g transform={`translate(0, ${-bodyH * 0.5 - 24})`}>
          <polygon points="-22,-4 -38,-12 -22,6" fill={skin} />
          <polygon points="22,-4 38,-12 22,6" fill={skin} />
          <circle cx={0} cy={0} r={25} fill={skin} stroke="#f8fafc" strokeWidth={1.6} />
          {/* Curved Bull Horns on Shringi & Tall */}
          {(variant === "shringi" || variant === "tall") && (
            <g>
              <path d="M -15,-18 Q -30,-44 -12,-52" fill="none" stroke="#fef3c7" strokeWidth={6.5} strokeLinecap="round" />
              <path d="M 15,-18 Q 30,-44 12,-52" fill="none" stroke="#fef3c7" strokeWidth={6.5} strokeLinecap="round" />
            </g>
          )}
          {/* Wild Hair Tuft & Tripundra */}
          <path d="M -14,-21 Q 0,-44 14,-21 Z" fill="#1e293b" />
          <path d="M -11,-13 Q 0,-16 11,-13" stroke="#ffffff" strokeWidth={2} fill="none" />
          {/* Big Expressive Eyes */}
          <circle cx={-8.5} cy={-4} r={5.2} fill="#ffffff" />
          <circle cx={-8.5} cy={-4} r={2.6} fill="#0f172a" />
          <circle cx={8.5} cy={-4} r={5.2} fill="#ffffff" />
          <circle cx={8.5} cy={-4} r={2.6} fill="#0f172a" />
          {/* Playful Open Grin + Little Fangs */}
          <path d="M -10,8 Q 0,19 10,8 Z" fill="#7f1d1d" stroke="#0f172a" strokeWidth={1.5} />
          <polygon points="-7,8 -5,12 -3,8" fill="#ffffff" />
          <polygon points="3,8 5,12 7,8" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
};
