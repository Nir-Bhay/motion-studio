import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

export const NandiBullRig: React.FC<{
  x: number;
  y: number;
  scale?: number;
  walking?: boolean;
}> = ({ x, y, scale = 1, walking = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const stride = walking ? Math.sin(t * 5.2) * 14 : 0;
  const bob = walking ? Math.abs(Math.sin(t * 5.2)) * -7 : Math.sin(t * 2) * 2;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + bob,
        transform: `translate(-50%, -50%) scale(${scale})`,
        pointerEvents: "none",
      }}
    >
      <svg width={360} height={240} viewBox="-180 -120 360 240" overflow="visible">
        {/* Sacred Bull Legs with Dark-Ink Outlines */}
        <line x1={-68} y1={28} x2={-72 - stride} y2={95} stroke="#0b1120" strokeWidth={23} strokeLinecap="round" />
        <line x1={-68} y1={28} x2={-72 - stride} y2={95} stroke="#e2e8f0" strokeWidth={17} strokeLinecap="round" />
        <line x1={-40} y1={28} x2={-38 + stride} y2={95} stroke="#0b1120" strokeWidth={23} strokeLinecap="round" />
        <line x1={-40} y1={28} x2={-38 + stride} y2={95} stroke="#f8fafc" strokeWidth={17} strokeLinecap="round" />
        <line x1={48} y1={28} x2={46 - stride} y2={95} stroke="#0b1120" strokeWidth={23} strokeLinecap="round" />
        <line x1={48} y1={28} x2={46 - stride} y2={95} stroke="#e2e8f0" strokeWidth={17} strokeLinecap="round" />
        <line x1={74} y1={28} x2={78 + stride} y2={95} stroke="#0b1120" strokeWidth={23} strokeLinecap="round" />
        <line x1={74} y1={28} x2={78 + stride} y2={95} stroke="#f8fafc" strokeWidth={17} strokeLinecap="round" />

        {/* Body & Hump */}
        <ellipse cx={0} cy={12} rx={92} ry={44} fill="#f8fafc" stroke="#0b1120" strokeWidth={3} />
        <ellipse cx={45} cy={-26} rx={28} ry={22} fill="#f8fafc" stroke="#0b1120" strokeWidth={2.5} />

        {/* Crimson Silk Jhool Saddlecloth */}
        <path d="M -58,-28 Q 0,-38 50,-22 L 54,28 Q 0,40 -58,26 Z" fill="#dc2626" stroke="#0b1120" strokeWidth={2.8} />
        <path d="M -52,20 Q 0,32 48,22" fill="none" stroke="#fde047" strokeWidth={3.5} strokeDasharray="6 5" />

        {/* Neck & Brass Bell Garland */}
        <path d="M 65,-20 Q 98,-46 112,-28 L 106,14 Q 80,26 65,10 Z" fill="#f1f5f9" stroke="#0b1120" strokeWidth={2.5} />
        <path d="M 65,-10 Q 82,8 98,-8" fill="none" stroke="#fbbf24" strokeWidth={5} />
        <circle cx={82} cy={10} r={6} fill="#fde047" stroke="#0b1120" strokeWidth={1.5} />

        {/* Head, Golden-Tipped Horns, Gentle Eyes */}
        <ellipse cx={118} cy={-24} rx={26} ry={20} fill="#ffffff" stroke="#0b1120" strokeWidth={2.8} />
        <path d="M 104,-40 Q 92,-76 116,-84" fill="none" stroke="#e2e8f0" strokeWidth={8} strokeLinecap="round" />
        <path d="M 106,-72 Q 112,-82 116,-84" fill="none" stroke="#fbbf24" strokeWidth={8} strokeLinecap="round" />
        <path d="M 128,-40 Q 144,-72 132,-82" fill="none" stroke="#f8fafc" strokeWidth={8} strokeLinecap="round" />
        <path d="M 134,-74 Q 134,-80 132,-82" fill="none" stroke="#fbbf24" strokeWidth={8} strokeLinecap="round" />
        <circle cx={126} cy={-26} r={3.5} fill="#0f172a" />
        <path d="M -90,5 Q -122,22 -116,58" fill="none" stroke="#cbd5e1" strokeWidth={6} strokeLinecap="round" />
      </svg>
    </div>
  );
};

export const PretCreatureRig: React.FC<{
  x: number;
  y: number;
  variant: "classic" | "london" | "dakini" | "weeping";
  scale?: number;
  phase?: number;
}> = ({ x, y, variant, scale = 1, phase = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps + phase;
  const floatY = variant === "weeping" ? Math.sin(t * 4) * 2 : Math.sin(t * 3.4) * 14;
  const wobble = variant === "weeping" ? 0 : Math.sin(t * 2.8) * 6;

  const bodyColor =
    variant === "london" ? "#a5b4fc" : variant === "dakini" ? "#f0abfc" : variant === "weeping" ? "#94a3b8" : "#6ee7b7";

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + floatY,
        transform: `translate(-50%, -50%) rotate(${wobble}deg) scale(${scale})`,
        pointerEvents: "none",
        filter: `drop-shadow(0 0 14px ${bodyColor}99)`,
      }}
    >
      <svg width={170} height={220} viewBox="-85 -110 170 220" overflow="visible">
        {/* Wavy Spectral Tail / Legs */}
        <path
          d={`M -34,12 Q -38,-48 0,-56 Q 38,-48 34,12 Q 20,56 ${12 + Math.sin(t * 5) * 8},76 Q 0,58 -12,74 Q -24,52 -34,12 Z`}
          fill={bodyColor}
          opacity={0.92}
          stroke="#f8fafc"
          strokeWidth={2}
        />

        {/* Arms */}
        <path
          d={variant === "weeping" ? "M -28,-6 Q -14,-22 -8,-22" : `M -30,-6 Q -54,${-24 + Math.sin(t * 6) * 12} -58,-34`}
          fill="none"
          stroke={bodyColor}
          strokeWidth={11}
          strokeLinecap="round"
        />
        <path
          d={variant === "weeping" ? "M 28,-6 Q 14,-22 8,-22" : `M 30,-6 Q 54,${-24 - Math.sin(t * 6) * 12} 58,-34`}
          fill="none"
          stroke={bodyColor}
          strokeWidth={11}
          strokeLinecap="round"
        />

        {/* London/America Foreign Pret Top-Hat & Suitcase! */}
        {variant === "london" && (
          <g>
            <rect x={-26} y={-64} width={52} height={8} rx={3} fill="#1e1b4b" stroke="#fbbf24" strokeWidth={1.5} />
            <rect x={-16} y={-94} width={32} height={30} rx={3} fill="#312e81" stroke="#fbbf24" strokeWidth={1.5} />
            <rect x={36} y={14} width={28} height={22} rx={4} fill="#b45309" stroke="#fde047" strokeWidth={1.5} />
          </g>
        )}

        {/* Dakini Mystic Horns */}
        {variant === "dakini" && (
          <>
            <path d="M -18,-50 Q -28,-74 -12,-76" fill="none" stroke="#fdf4ff" strokeWidth={5} strokeLinecap="round" />
            <path d="M 18,-50 Q 28,-74 12,-76" fill="none" stroke="#fdf4ff" strokeWidth={5} strokeLinecap="round" />
          </>
        )}

        {/* Eyes & Mouth */}
        <circle cx={-12} cy={-24} r={5} fill="#0f172a" />
        <circle cx={12} cy={-24} r={5} fill="#0f172a" />
        <circle cx={-12} cy={-25} r={2} fill="#fde047" />
        <circle cx={12} cy={-25} r={2} fill="#fde047" />

        {variant === "weeping" ? (
          <>
            <path d="M -9,-4 Q 0,-12 9,-4" fill="none" stroke="#0f172a" strokeWidth={2.5} />
            {/* Animated Teardrops */}
            <circle cx={-14} cy={-12 + ((t * 25) % 18)} r={3} fill="#38bdf8" />
            <circle cx={14} cy={-12 + ((t * 25 + 8) % 18)} r={3} fill="#38bdf8" />
          </>
        ) : (
          <path d="M -10,-6 Q 0,8 10,-6 Z" fill="#7f1d1d" />
        )}
      </svg>
    </div>
  );
};

export const VajraLightning: React.FC<{ x: number; y: number; intensity: number }> = ({ x, y, intensity }) => {
  if (intensity < 0.05) return null;
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: "translate(-50%, -50%)", opacity: intensity, pointerEvents: "none" }}>
      <svg width={320} height={240} viewBox="-160 -120 320 240" overflow="visible">
        <polyline
          points="110,-60 40,-15 65,10 -20,40 15,60 -120,95"
          fill="none"
          stroke="#fef08a"
          strokeWidth={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points="110,-60 40,-15 65,10 -20,40 15,60 -120,95"
          fill="none"
          stroke="#ffffff"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
