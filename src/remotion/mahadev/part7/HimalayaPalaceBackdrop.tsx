import React from "react";
import { useCurrentFrame } from "remotion";

const OUTLINE = "#1a0b2e";

export type BackdropVariant = "palace_gate" | "comedy_closeup" | "vaikuntha_himalaya" | "royal_courtyard";

/**
 * Rich, multi-layered Himalayan Palace & Nagari Surroundings for Part 07:
 * - Snow-capped Himalayan peaks with golden sunrise aura & pine/deodar silhouettes
 * - Ornate multi-tiered palaces with carved arched Attari balconies (with watching ladies!)
 * - Grand carved stone & gold wedding Toran Gate with Kalash finials, bells, & marigold garlands
 * - Courtyard rangoli, brass mashal torches, fluttering saffron dhvaj flags, & drifting petals
 * Zero SVG url(#...) gradients so Remotion Studio & headless Chromium render 100% solid.
 */
export const HimalayaPalaceBackdrop: React.FC<{
  variant: BackdropVariant;
  showAttariSakhis?: boolean;
}> = ({ variant, showAttariSakhis = false }) => {
  const frame = useCurrentFrame();
  const sunRot = frame * 0.14;
  const flagWave = Math.sin(frame * 0.12) * 8;
  const flameFlicker = 1 + Math.sin(frame * 0.35) * 0.12;

  return (
    <svg
      viewBox="0 0 1920 1080"
      width="100%"
      height="100%"
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      {/* Warm Golden-Saffron Festive Sky Layers */}
      <rect x={0} y={0} width={1920} height={1080} fill="#4a1238" />
      <rect x={0} y={0} width={1920} height={740} fill="#7c1d3d" opacity={0.85} />
      <rect x={0} y={0} width={1920} height={540} fill="#b43b24" opacity={0.78} />
      <rect x={0} y={0} width={1920} height={360} fill="#d96b1f" opacity={0.62} />

      {/* Radiant Sunburst */}
      <g transform={`translate(960, 290) rotate(${sunRot})`} opacity={0.22}>
        {Array.from({ length: 20 }).map((_, i) => (
          <polygon key={i} points="0,0 -34,-820 34,-820" fill="#fde047" transform={`rotate(${i * 18})`} />
        ))}
      </g>
      <circle cx={960} cy={290} r={225} fill="#fbbf24" opacity={0.22} />
      <circle cx={960} cy={290} r={145} fill="#fef08a" opacity={0.34} />

      {/* Soft Festive Clouds */}
      {[
        { cx: 290 + Math.sin(frame * 0.01) * 18, cy: 190, s: 1.05 },
        { cx: 1620 - Math.sin(frame * 0.012) * 20, cy: 205, s: 1.1 },
        { cx: 710, cy: 145, s: 0.75 },
      ].map((c, idx) => (
        <g key={idx} transform={`translate(${c.cx}, ${c.cy}) scale(${c.s})`} opacity={0.28}>
          <ellipse cx={0} cy={0} rx={120} ry={34} fill="#fed7aa" />
          <ellipse cx={-55} cy={12} rx={75} ry={24} fill="#fde68a" />
          <ellipse cx={60} cy={10} rx={82} ry={26} fill="#fed7aa" />
        </g>
      ))}

      {/* Distant Himalayan Mountain Range + Golden Snow Caps */}
      <polygon points="-80,740 240,350 560,740" fill="#31104a" />
      <polygon points="240,350 175,455 245,435 305,465" fill="#fef3c7" opacity={0.85} />
      <polygon points="340,740 720,305 1100,740" fill="#270c3d" />
      <polygon points="720,305 640,425 715,405 790,435" fill="#fde68a" opacity={0.9} />
      <polygon points="880,740 1280,295 1680,740" fill="#2e0f47" />
      <polygon points="1280,295 1195,420 1275,398 1360,430" fill="#fef3c7" opacity={0.88} />
      <polygon points="1420,740 1760,340 2050,740" fill="#371352" />
      <polygon points="1760,340 1690,450 1758,430 1825,458" fill="#fde68a" opacity={0.85} />

      {/* Pine / Deodar Forest Ridge */}
      {Array.from({ length: 24 }).map((_, i) => {
        const tx = i * 86 - 20;
        const th = 56 + (i % 3) * 18;
        return (
          <g key={i} transform={`translate(${tx}, 695)`}>
            <polygon points={`0,-${th} -26,0 26,0`} fill="#1e1b4b" />
            <polygon points={`0,-${th * 0.72} -20,12 20,12`} fill="#172554" />
          </g>
        );
      })}

      {/* VARIANT: Multi-Tiered Vaikuntha-Like Decorated Himalaya Nagari Palaces & Attari Balconies */}
      {(variant === "vaikuntha_himalaya" || variant === "royal_courtyard" || variant === "palace_gate") && (
        <g>
          {/* Left Grand Palace & Attari Balcony */}
          <g transform="translate(80, 395)">
            <rect x={0} y={70} width={350} height={260} rx={8} fill="#7e223d" stroke={OUTLINE} strokeWidth={3} />
            <rect x={16} y={95} width={318} height={22} fill="#fbbf24" stroke={OUTLINE} strokeWidth={2} />
            {/* Palace Domes & Golden Kalash Spires */}
            <path d="M20,70 Q90,-25 160,70 Z" fill="#f59e0b" stroke={OUTLINE} strokeWidth={3} />
            <line x1={90} y1={10} x2={90} y2={-22} stroke="#fde047" strokeWidth={4} />
            <circle cx={90} cy={-24} r={7} fill="#fef08a" stroke={OUTLINE} strokeWidth={2} />
            <path d="M185,70 Q260,-35 335,70 Z" fill="#ea580c" stroke={OUTLINE} strokeWidth={3} />
            <line x1={260} y1={5} x2={260} y2={-30} stroke="#fde047" strokeWidth={4} />
            <circle cx={260} cy={-32} r={8} fill="#fef08a" stroke={OUTLINE} strokeWidth={2} />
            {/* Fluttering Flag */}
            <path d={`M260,-28 L302,${-20 + flagWave * 0.4} L260,-10 Z`} fill="#ef4444" stroke="#fde047" strokeWidth={1.5} />

            {/* Attari Balcony Arches */}
            {[40, 145, 245].map((ax, ai) => (
              <g key={ai} transform={`translate(${ax}, 135)`}>
                <path d="M0,105 L0,35 Q36,0 72,35 L72,105 Z" fill="#2e1042" stroke="#fde047" strokeWidth={3} />
                {showAttariSakhis && (
                  <g transform={`translate(36, ${58 + Math.sin(frame * 0.14 + ai) * 3})`}>
                    <circle cx={0} cy={0} r={13} fill="#f7be9c" stroke={OUTLINE} strokeWidth={2} />
                    <path d="M-13,-4 Q0,-20 13,-4 Z" fill="#0f172a" />
                    <path d="M-18,14 L18,14 L22,46 L-22,46 Z" fill={ai % 2 === 0 ? "#ec4899" : "#f59e0b"} stroke={OUTLINE} strokeWidth={2} />
                    <circle cx={0} cy={-4} r={2} fill="#dc2626" />
                  </g>
                )}
              </g>
            ))}
            {/* Balcony Railing */}
            <rect x={-10} y={232} width={370} height={18} rx={4} fill="#fde047" stroke={OUTLINE} strokeWidth={2.5} />
          </g>

          {/* Right Grand Palace & Attari Balcony */}
          <g transform="translate(1490, 395)">
            <rect x={0} y={70} width={350} height={260} rx={8} fill="#7e223d" stroke={OUTLINE} strokeWidth={3} />
            <rect x={16} y={95} width={318} height={22} fill="#fbbf24" stroke={OUTLINE} strokeWidth={2} />
            <path d="M15,70 Q90,-35 165,70 Z" fill="#ea580c" stroke={OUTLINE} strokeWidth={3} />
            <line x1={90} y1={5} x2={90} y2={-30} stroke="#fde047" strokeWidth={4} />
            <circle cx={90} cy={-32} r={8} fill="#fef08a" stroke={OUTLINE} strokeWidth={2} />
            <path d="M190,70 Q260,-25 330,70 Z" fill="#f59e0b" stroke={OUTLINE} strokeWidth={3} />
            <line x1={260} y1={10} x2={260} y2={-22} stroke="#fde047" strokeWidth={4} />
            <circle cx={260} cy={-24} r={7} fill="#fef08a" stroke={OUTLINE} strokeWidth={2} />
            <path d={`M90,-28 L132,${-20 + flagWave * 0.4} L90,-10 Z`} fill="#ef4444" stroke="#fde047" strokeWidth={1.5} />

            {[36, 140, 244].map((ax, ai) => (
              <g key={ai} transform={`translate(${ax}, 135)`}>
                <path d="M0,105 L0,35 Q36,0 72,35 L72,105 Z" fill="#2e1042" stroke="#fde047" strokeWidth={3} />
                {showAttariSakhis && (
                  <g transform={`translate(36, ${58 + Math.sin(frame * 0.14 + ai + 1.5) * 3})`}>
                    <circle cx={0} cy={0} r={13} fill="#f7be9c" stroke={OUTLINE} strokeWidth={2} />
                    <path d="M-13,-4 Q0,-20 13,-4 Z" fill="#0f172a" />
                    <path d="M-18,14 L18,14 L22,46 L-22,46 Z" fill={ai % 2 === 0 ? "#10b981" : "#8b5cf6"} stroke={OUTLINE} strokeWidth={2} />
                    <circle cx={0} cy={-4} r={2} fill="#dc2626" />
                  </g>
                )}
              </g>
            ))}
            <rect x={-10} y={232} width={370} height={18} rx={4} fill="#fde047" stroke={OUTLINE} strokeWidth={2.5} />
          </g>
        </g>
      )}

      {/* Extra Central Palace Spires for Vaikuntha-Surpassing Himalaya Decor */}
      {variant === "vaikuntha_himalaya" && (
        <g transform="translate(650, 315)">
          <rect x={0} y={90} width={620} height={310} rx={12} fill="#881337" stroke={OUTLINE} strokeWidth={3.5} />
          <path d="M40,90 Q140,-45 240,90 Z" fill="#fbbf24" stroke={OUTLINE} strokeWidth={3} />
          <path d="M210,90 Q310,-85 410,90 Z" fill="#f59e0b" stroke={OUTLINE} strokeWidth={3.5} />
          <path d="M380,90 Q480,-45 580,90 Z" fill="#fbbf24" stroke={OUTLINE} strokeWidth={3} />
          <line x1={310} y1={-40} x2={310} y2={-85} stroke="#fde047" strokeWidth={5} />
          <circle cx={310} cy={-85} r={11} fill="#fef08a" stroke={OUTLINE} strokeWidth={2.5} />
          <path d={`M310,-82 L365,${-70 + flagWave * 0.4} L310,-58 Z`} fill="#ef4444" stroke="#fde047" strokeWidth={1.8} />
          {/* Illuminated Grand Palace Arches */}
          {[55, 195, 335, 475].map((ax, idx) => (
            <path key={idx} d={`M${ax},360 L${ax},180 Q${ax + 45},125 ${ax + 90},180 L${ax + 90},360 Z`} fill="#4c0519" stroke="#fde047" strokeWidth={3} />
          ))}
          <rect x={-20} y={135} width={660} height={20} rx={5} fill="#fde047" stroke={OUTLINE} strokeWidth={2.5} />
        </g>
      )}

      {/* Ornate Carved Wedding Toran Archway (Palace Gate / Comedy Closeup) */}
      {(variant === "palace_gate" || variant === "comedy_closeup") && (
        <g>
          {/* Twin Carved Sandstone & Gold Pillars */}
          {[75, 1790].map((px, idx) => (
            <g key={idx} transform={`translate(${px}, 125)`}>
              <rect x={0} y={0} width={56} height={630} rx={6} fill="#78350f" stroke="#fde047" strokeWidth={3} />
              <rect x={8} y={16} width={40} height={600} fill="#92400e" />
              {/* Gold Band Rings */}
              {[90, 220, 350, 480].map((ry) => (
                <rect key={ry} x={-4} y={ry} width={64} height={14} rx={4} fill="#fbbf24" stroke={OUTLINE} strokeWidth={2} />
              ))}
              {/* Brass Kalash & Coconut at Base */}
              <circle cx={28} cy={636} r={24} fill="#d97706" stroke={OUTLINE} strokeWidth={2.5} />
              <path d="M12,616 Q28,595 44,616" fill="#16a34a" stroke={OUTLINE} strokeWidth={2} />
              {/* Burning Mashal Torch */}
              <g transform={`translate(${idx === 0 ? 74 : -18}, 220) scale(${flameFlicker})`}>
                <rect x={-8} y={0} width={16} height={38} fill="#b45309" stroke={OUTLINE} strokeWidth={2} />
                <path d="M-12,0 Q0,-36 12,0 Z" fill="#f97316" />
                <path d="M-6,0 Q0,-22 6,0 Z" fill="#fef08a" />
              </g>
            </g>
          ))}
        </g>
      )}

      {/* Hanging Marigold & Mango-Leaf Wedding Garlands (Bandanwar) */}
      <g>
        <path
          d="M 100,145 Q 520,235 960,150 Q 1400,235 1820,145"
          fill="none"
          stroke="#15803d"
          strokeWidth={10}
        />
        {Array.from({ length: 34 }).map((_, i) => {
          const t = i / 33;
          const gx = 110 + t * 1700;
          const sag = Math.sin(t * Math.PI * 2) * 52;
          const gy = 148 + Math.abs(sag);
          return (
            <g key={i} transform={`translate(${gx}, ${gy})`}>
              <circle cx={0} cy={0} r={10} fill={i % 2 === 0 ? "#f97316" : "#facc15"} stroke={OUTLINE} strokeWidth={1.6} />
              {i % 3 === 0 && (
                <path d="M-5,10 L0,32 L5,10 Z" fill="#f97316" stroke={OUTLINE} strokeWidth={1.2} />
              )}
            </g>
          );
        })}
      </g>

      {/* Courtyard Stone Platform, Steps & Festive Rangoli Floor */}
      <rect x={0} y={715} width={1920} height={365} fill="#2e1042" />
      <path d="M0,715 L1920,715 L1920,750 L0,750 Z" fill="#701a75" stroke="#fde047" strokeWidth={3} />
      <ellipse cx={960} cy={765} rx={680} ry={44} fill="#581c87" stroke="#fbbf24" strokeWidth={2.5} opacity={0.85} />
      {/* Decorative Courtyard Rangoli Lotus Rings */}
      <g transform="translate(960, 795)" opacity={0.55}>
        <ellipse cx={0} cy={0} rx={210} ry={28} fill="none" stroke="#fde047" strokeWidth={3} strokeDasharray="14 8" />
        <ellipse cx={0} cy={0} rx={140} ry={18} fill="none" stroke="#f43f5e" strokeWidth={3} />
      </g>

      {/* Drifting Rose & Marigold Petals */}
      {Array.from({ length: 18 }).map((_, i) => {
        const px = ((i * 137 + frame * (1.2 + (i % 3) * 0.4)) % 1980) - 30;
        const py = ((i * 89 + frame * (1.5 + (i % 2) * 0.6)) % 820) + 40;
        return (
          <ellipse
            key={i}
            cx={px}
            cy={py}
            rx={7}
            ry={4}
            fill={i % 2 === 0 ? "#fb7185" : "#fbbf24"}
            transform={`rotate(${frame * 2 + i * 35}, ${px}, ${py})`}
            opacity={0.78}
          />
        );
      })}
    </svg>
  );
};
