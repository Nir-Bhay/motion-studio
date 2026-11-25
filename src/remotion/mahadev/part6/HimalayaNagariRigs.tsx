import React from "react";
import { useCurrentFrame } from "remotion";

/**
 * Part 06 Specialized Character Rigs for Himachal Nagari:
 * - MainaDeviRig (Queen Mainavati holding Aarti Thali, welcome vs shocked regret)
 * - SakhiBandRig (Animated Himachali Sakhis singing Mangal Geet & asking for Neg)
 * - MouseMountGanaRig ("कोई चढ़ चूहा पर आए" — Gana riding a lively painted mouse)
 * - ElephantMountDevaRig ("कोई आए हाथी" — Royal elephant with golden howdah & Barat rider)
 */

export const MainaDeviRig: React.FC<{
  x: number;
  y: number;
  scale?: number;
  mood?: "welcome" | "shocked";
  speakingEnergy?: number;
}> = ({ x, y, scale = 1, mood = "welcome", speakingEnergy = 0 }) => {
  const frame = useCurrentFrame();
  const sway = Math.sin(frame * 0.08) * 3;
  const thaliRot = mood === "welcome" ? Math.sin(frame * 0.12) * 8 : -22;
  const jawOpen = speakingEnergy * 8;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + sway,
        transform: `translate(-50%, -50%) scale(${scale})`,
        pointerEvents: "none",
      }}
    >
      <svg width={320} height={420} viewBox="-160 -210 320 420" overflow="visible">
        {/* Royal Crimson-Gold Banarasi Saree Skirt & Pallu */}
        <path
          d="M -46,-15 L 46,-15 L 68,140 Q 0,162 -68,140 Z"
          fill="#be123c"
          stroke="#0b1120"
          strokeWidth={3.2}
        />
        <path d="M -52,118 Q 0,138 52,118" fill="none" stroke="#fde047" strokeWidth={6} />
        <path d="M -28,-62 L 28,-62 L 42,-8 L -42,-8 Z" fill="#e11d48" stroke="#0b1120" strokeWidth={3} />
        {/* Golden Zari Pallu Drape */}
        <path d="M -32,-62 Q 0,-18 46,65 L 28,72 Q -10,-6 -40,-54 Z" fill="#fbbf24" stroke="#0b1120" strokeWidth={2} />

        {/* Necklace & Bangles */}
        <path d="M -18,-62 Q 0,-42 18,-62" fill="none" stroke="#fde047" strokeWidth={5} />

        {/* Left & Right Arms holding Brass Aarti Thali */}
        <path d="M -30,-48 Q -65,-16 -58,12" fill="none" stroke="#0b1120" strokeWidth={17} strokeLinecap="round" />
        <path d="M -30,-48 Q -65,-16 -58,12" fill="none" stroke="#f7be9c" strokeWidth={11} strokeLinecap="round" />
        <path d="M 30,-48 Q 72,-20 62,14" fill="none" stroke="#0b1120" strokeWidth={17} strokeLinecap="round" />
        <path d="M 30,-48 Q 72,-20 62,14" fill="none" stroke="#f7be9c" strokeWidth={11} strokeLinecap="round" />

        {/* Glowing Golden Aarti Thali with Burning Diyas */}
        <g transform={`translate(-76, 12) rotate(${thaliRot})`}>
          <ellipse cx={0} cy={0} rx={38} ry={13} fill="#fbbf24" stroke="#0b1120" strokeWidth={2.5} />
          <ellipse cx={0} cy={0} rx={26} ry={7} fill="#fde047" />
          {/* Diya Flame */}
          <path d="M -6,-4 Q 0,-26 6,-4 Z" fill="#f97316" />
          <path d="M -3,-4 Q 0,-18 3,-4 Z" fill="#fffbeb" />
          <circle cx={-15} cy={-2} r={4} fill="#ef4444" />
          <circle cx={15} cy={-2} r={4} fill="#fff7ed" />
        </g>

        {/* Head, Bindi, Nath (Nose Ring), & Royal Queen Mukut */}
        <g transform={`translate(0, -102) rotate(${mood === "shocked" ? -6 : 0})`}>
          <circle cx={0} cy={0} r={32} fill="#f7be9c" stroke="#0b1120" strokeWidth={3} />
          {/* Dark Hair & Golden Maang Tikka */}
          <path d="M -32,-6 Q 0,-42 32,-6 Q 16,-24 0,-22 Q -16,-24 -32,-6 Z" fill="#0f172a" />
          <polygon points="-20,-24 0,-54 20,-24" fill="#fbbf24" stroke="#0b1120" strokeWidth={2.2} />
          <circle cx={0} cy={-16} r={3.8} fill="#dc2626" />
          <circle cx={14} cy={8} r={5} fill="none" stroke="#fde047" strokeWidth={1.8} />
          <circle cx={-12} cy={-3} r={mood === "shocked" ? 4.5 : 3.2} fill="#0f172a" />
          <circle cx={12} cy={-3} r={mood === "shocked" ? 4.5 : 3.2} fill="#0f172a" />
          {mood === "shocked" ? (
            <>
              <path d="M -18,-12 L -6,-15 M 6,-15 L 18,-12" stroke="#0f172a" strokeWidth={2.6} />
              <ellipse cx={0} cy={14} rx={7} ry={6 + jawOpen * 0.4} fill="#7f1d1d" />
            </>
          ) : (
            <path d={`M -9,10 Q 0,${17 + jawOpen} 9,10`} fill="none" stroke="#9f1239" strokeWidth={3} strokeLinecap="round" />
          )}
        </g>
      </svg>
    </div>
  );
};

export const SakhiBandRig: React.FC<{
  x: number;
  y: number;
  scale?: number;
  askingNeg?: boolean;
}> = ({ x, y, scale = 1, askingNeg = false }) => {
  const frame = useCurrentFrame();
  const sakhis = [
    { dx: -165, col: "#ec4899", sari: "#fde047", phase: 0 },
    { dx: -55, col: "#10b981", sari: "#fffbeb", phase: 1.1 },
    { dx: 55, col: "#f97316", sari: "#fef08a", phase: 2.0 },
    { dx: 165, col: "#8b5cf6", sari: "#fbcfe8", phase: 2.9 },
  ];

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${scale})`,
        pointerEvents: "none",
      }}
    >
      <svg width={500} height={320} viewBox="-250 -160 500 320" overflow="visible">
        {sakhis.map((s, idx) => {
          const bob = Math.sin(frame * 0.15 + s.phase) * 9;
          const handRaise = askingNeg ? -34 : -18 + Math.sin(frame * 0.2 + s.phase) * 10;
          return (
            <g key={idx} transform={`translate(${s.dx}, ${bob})`}>
              {/* Lehenga */}
              <path d="M -26,8 L 26,8 L 42,102 Q 0,115 -42,102 Z" fill={s.col} stroke="#0b1120" strokeWidth={2.8} />
              <path d="M -32,88 Q 0,100 32,88" fill="none" stroke={s.sari} strokeWidth={4} />
              {/* Choli */}
              <rect x={-18} y={-28} width={36} height={36} rx={7} fill={s.sari} stroke="#0b1120" strokeWidth={2.6} />
              {/* Clapping / Neg-Blocking Arms */}
              <path d={`M -18,-20 Q -42,${handRaise} -28,${handRaise - 10}`} fill="none" stroke="#0b1120" strokeWidth={12} strokeLinecap="round" />
              <path d={`M -18,-20 Q -42,${handRaise} -28,${handRaise - 10}`} fill="none" stroke="#f7be9c" strokeWidth={7} strokeLinecap="round" />
              <path d={`M 18,-20 Q 42,${handRaise} 28,${handRaise - 10}`} fill="none" stroke="#0b1120" strokeWidth={12} strokeLinecap="round" />
              <path d={`M 18,-20 Q 42,${handRaise} 28,${handRaise - 10}`} fill="none" stroke="#f7be9c" strokeWidth={7} strokeLinecap="round" />
              {/* Head */}
              <circle cx={0} cy={-50} r={20} fill="#f7be9c" stroke="#0b1120" strokeWidth={2.6} />
              <path d="M -20,-54 Q 0,-75 20,-54 Z" fill="#0f172a" />
              <circle cx={0} cy={-58} r={2.5} fill="#ef4444" />
              <circle cx={-7} cy={-51} r={2.4} fill="#0f172a" />
              <circle cx={7} cy={-51} r={2.4} fill="#0f172a" />
              <path d="M -6,-42 Q 0,-36 6,-42" fill="none" stroke="#9f1239" strokeWidth={2.2} />
            </g>
          );
        })}
        {askingNeg && (
          <g transform="translate(0, -120)">
            <rect x={-110} y={-24} width={220} height={42} rx={14} fill="#be123c" stroke="#fde047" strokeWidth={2.5} />
            <text x={0} y={4} textAnchor="middle" fill="#fffbeb" fontSize={22} fontWeight={700} fontFamily="'Noto Sans Devanagari', sans-serif">
              पहले नेग दो, दूल्हा राजा!
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

export const MouseMountGanaRig: React.FC<{
  x: number;
  y: number;
  scale?: number;
  phase?: number;
}> = ({ x, y, scale = 1, phase = 0 }) => {
  const frame = useCurrentFrame();
  const scurry = Math.sin(frame * 0.24 + phase) * 10;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + Math.abs(scurry) * -0.5,
        transform: `translate(-50%, -50%) scale(${scale})`,
        pointerEvents: "none",
      }}
    >
      <svg width={260} height={240} viewBox="-130 -120 260 240" overflow="visible">
        {/* Painted Sacred Mushak (Mouse) Steed */}
        <path d="M -72,42 Q -105,12 -118,32" fill="none" stroke="#0b1120" strokeWidth={8} strokeLinecap="round" />
        <path d="M -72,42 Q -105,12 -118,32" fill="none" stroke="#f472b6" strokeWidth={4} strokeLinecap="round" />
        <ellipse cx={0} cy={38} rx={72} ry={34} fill="#cbd5e1" stroke="#0b1120" strokeWidth={3} />
        <path d="M -42,10 L 38,10 L 32,46 L -38,46 Z" fill="#f97316" stroke="#fde047" strokeWidth={2} />
        {/* Mouse Head, Ears & Whiskers */}
        <ellipse cx={74} cy={32} rx={24} ry={18} fill="#e2e8f0" stroke="#0b1120" strokeWidth={2.8} />
        <circle cx={58} cy={12} r={14} fill="#f9a8d4" stroke="#0b1120" strokeWidth={2.4} />
        <circle cx={82} cy={28} r={3.2} fill="#0f172a" />
        <circle cx={96} cy={32} r={4} fill="#ec4899" />

        {/* Joyous Rider Holding Reins & Laddoo */}
        <g transform={`translate(-2, -16) rotate(${Math.sin(frame * 0.18 + phase) * 6})`}>
          <rect x={-20} y={-24} width={40} height={44} rx={10} fill="#eab308" stroke="#0b1120" strokeWidth={2.8} />
          <path d="M -18,-18 Q -42,-34 -34,-54" fill="none" stroke="#0b1120" strokeWidth={13} strokeLinecap="round" />
          <path d="M -18,-18 Q -42,-34 -34,-54" fill="none" stroke="#fda4af" strokeWidth={8} strokeLinecap="round" />
          <path d="M 18,-18 Q 48,-2 58,12" fill="none" stroke="#0b1120" strokeWidth={13} strokeLinecap="round" />
          <path d="M 18,-18 Q 48,-2 58,12" fill="none" stroke="#fda4af" strokeWidth={8} strokeLinecap="round" />
          <circle cx={0} cy={-44} r={22} fill="#fda4af" stroke="#0b1120" strokeWidth={2.8} />
          <polygon points="-16,-56 0,-82 16,-56" fill="#dc2626" stroke="#fde047" strokeWidth={2} />
          <circle cx={-7} cy={-46} r={3} fill="#0f172a" />
          <circle cx={7} cy={-46} r={3} fill="#0f172a" />
          <path d="M -7,-35 Q 0,-28 7,-35" fill="none" stroke="#7f1d1d" strokeWidth={2.4} />
        </g>
      </svg>
    </div>
  );
};

export const ElephantMountDevaRig: React.FC<{
  x: number;
  y: number;
  scale?: number;
  phase?: number;
}> = ({ x, y, scale = 1, phase = 0 }) => {
  const frame = useCurrentFrame();
  const stride = Math.sin(frame * 0.14 + phase) * 9;
  const trunkWave = Math.sin(frame * 0.18 + phase) * 14;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + Math.abs(stride) * 0.35,
        transform: `translate(-50%, -50%) scale(${scale})`,
        pointerEvents: "none",
      }}
    >
      <svg width={340} height={300} viewBox="-170 -150 340 300" overflow="visible">
        {/* Royal Ceremonial Tusker */}
        <line x1={-56} y1={30} x2={-60 - stride} y2={106} stroke="#0b1120" strokeWidth={26} strokeLinecap="round" />
        <line x1={-56} y1={30} x2={-60 - stride} y2={106} stroke="#94a3b8" strokeWidth={20} strokeLinecap="round" />
        <line x1={-18} y1={32} x2={-16 + stride} y2={106} stroke="#0b1120" strokeWidth={26} strokeLinecap="round" />
        <line x1={-18} y1={32} x2={-16 + stride} y2={106} stroke="#cbd5e1" strokeWidth={20} strokeLinecap="round" />
        <line x1={40} y1={32} x2={38 - stride} y2={106} stroke="#0b1120" strokeWidth={26} strokeLinecap="round" />
        <line x1={40} y1={32} x2={38 - stride} y2={106} stroke="#94a3b8" strokeWidth={20} strokeLinecap="round" />
        <line x1={72} y1={30} x2={76 + stride} y2={106} stroke="#0b1120" strokeWidth={26} strokeLinecap="round" />
        <line x1={72} y1={30} x2={76 + stride} y2={106} stroke="#cbd5e1" strokeWidth={20} strokeLinecap="round" />

        <ellipse cx={6} cy={8} rx={94} ry={58} fill="#cbd5e1" stroke="#0b1120" strokeWidth={3.2} />
        {/* Silk Velvet Jhool */}
        <path d="M -52,-40 L 58,-40 L 62,38 Q 6,54 -54,38 Z" fill="#7c3aed" stroke="#fde047" strokeWidth={3} />
        {/* Golden Howdah & Barati Deva Rider */}
        <rect x={-32} y={-84} width={68} height={44} rx={8} fill="#fbbf24" stroke="#0b1120" strokeWidth={2.8} />
        <path d="M -20,-84 Q -40,-108 -34,-128" fill="none" stroke="#0b1120" strokeWidth={11} strokeLinecap="round" />
        <path d="M -20,-84 Q -40,-108 -34,-128" fill="none" stroke="#f7be9c" strokeWidth={7} strokeLinecap="round" />
        <circle cx={2} cy={-106} r={18} fill="#f7be9c" stroke="#0b1120" strokeWidth={2.5} />
        <polygon points="-14,-118 2,-142 18,-118" fill="#ea580c" stroke="#fde047" strokeWidth={2} />
        <circle cx={-5} cy={-108} r={2.5} fill="#0f172a" />
        <circle cx={8} cy={-108} r={2.5} fill="#0f172a" />
        <path d="M -4,-98 Q 2,-93 8,-98" fill="none" stroke="#7f1d1d" strokeWidth={2} />

        {/* Elephant Head, Ear, Trunk & Tusks */}
        <circle cx={102} cy={-18} r={38} fill="#e2e8f0" stroke="#0b1120" strokeWidth={3} />
        <ellipse cx={78} cy={-12} rx={22} ry={30} fill="#94a3b8" stroke="#0b1120" strokeWidth={2.4} />
        <path d={`M 122,-4 Q 154,${18 + trunkWave} 136,${58 + trunkWave}`} fill="none" stroke="#0b1120" strokeWidth={20} strokeLinecap="round" />
        <path d={`M 122,-4 Q 154,${18 + trunkWave} 136,${58 + trunkWave}`} fill="none" stroke="#e2e8f0" strokeWidth={14} strokeLinecap="round" />
        <path d="M 118,8 Q 146,16 154,-2" fill="none" stroke="#fffbeb" strokeWidth={7} strokeLinecap="round" />
        <circle cx={114} cy={-26} r={4} fill="#0f172a" />
      </svg>
    </div>
  );
};
