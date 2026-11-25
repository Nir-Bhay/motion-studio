import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

export const KamdevFlashbackBubble: React.FC<{
  x: number;
  y: number;
  blastProgress: number; // 0 = aiming bow, 0.5..1 = turning to golden ash!
}> = ({ x, y, blastProgress }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const isBhasm = blastProgress > 0.45;
  const fade = isBhasm ? Math.max(0.15, 1 - (blastProgress - 0.45) * 1.6) : 1;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
      }}
    >
      <svg width={340} height={270} viewBox="-170 -135 340 270" overflow="visible">
        <rect
          x={-155}
          y={-120}
          width={310}
          height={240}
          rx={26}
          fill="rgba(36, 14, 38, 0.88)"
          stroke={isBhasm ? "#f97316" : "#fb7185"}
          strokeWidth={3}
          strokeDasharray="8 5"
        />
        <text
          x={0}
          y={-92}
          textAnchor="middle"
          fill="#fde047"
          fontSize={18}
          fontWeight={700}
          fontFamily="'Noto Sans Devanagari', sans-serif"
        >
          {isBhasm ? "तीसरा नेत्र — कामदेव भस्म!" : "कामदेव का पुष्प-बाण"}
        </text>

        {/* Kamdev Figure */}
        <g transform={`translate(-35, 15)`} opacity={fade}>
          <path d="M -18,12 L 18,12 L 24,62 L -24,62 Z" fill="#ec4899" stroke="#fde047" strokeWidth={2} />
          <path d="M -16,-24 L 16,-24 L 14,14 L -14,14 Z" fill="#fbcfe8" />
          <circle cx={0} cy={-44} r={16} fill="#f7be9c" />
          <polygon points="-12,-56 0,-76 12,-56" fill="#fbbf24" />
          {/* Sugarcane / Flower Bow */}
          <path d="M 28,-48 Q 58,0 28,48" fill="none" stroke="#16a34a" strokeWidth={5} strokeLinecap="round" />
          <line x1={28} y1={-48} x2={28} y2={48} stroke="#fde047" strokeWidth={1.5} />
          <line x1={18} y1={0} x2={72} y2={0} stroke="#f43f5e" strokeWidth={3.5} />
          <circle cx={75} cy={0} r={6} fill="#fb7185" />
        </g>

        {/* Blazing Ash Particles when Bhasm */}
        {isBhasm &&
          Array.from({ length: 18 }).map((_, i) => {
            const ang = (i / 18) * Math.PI * 2;
            const r = (blastProgress - 0.45) * 140 + Math.sin(t * 8 + i) * 8;
            return (
              <circle
                key={i}
                cx={-35 + Math.cos(ang) * r}
                cy={15 + Math.sin(ang) * r - r * 0.4}
                r={4}
                fill={i % 2 === 0 ? "#ffedd5" : "#fb923c"}
                opacity={Math.max(0, 1 - (blastProgress - 0.45) * 1.4)}
              />
            );
          })}
      </svg>
    </div>
  );
};

export const HimalayaFlipBubble: React.FC<{
  x: number;
  y: number;
  tiltDeg: number; // flips up to 180° for "हिमालय को उल्टा थाप दिया!"
}> = ({ x, y, tiltDeg }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
      }}
    >
      <svg width={340} height={250} viewBox="-170 -125 340 250" overflow="visible">
        <rect
          x={-155}
          y={-110}
          width={310}
          height={220}
          rx={26}
          fill="rgba(22, 24, 58, 0.9)"
          stroke="#38bdf8"
          strokeWidth={3}
          strokeDasharray="8 5"
        />
        <text
          x={0}
          y={-80}
          textAnchor="middle"
          fill="#fde047"
          fontSize={18}
          fontWeight={700}
          fontFamily="'Noto Sans Devanagari', sans-serif"
        >
          “हिमालय उल्टा मत थाप देना!”
        </text>
        <g transform={`translate(0, 16) rotate(${tiltDeg})`}>
          <polygon points="-95,48 -30,-38 25,22 65,-48 105,48" fill="#475569" stroke="#bae6fd" strokeWidth={2.5} />
          <polygon points="-30,-38 -52,-8 -12,-14" fill="#ffffff" />
          <polygon points="65,-48 45,-12 82,-16" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
};
