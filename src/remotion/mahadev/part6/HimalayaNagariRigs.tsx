import React from "react";
import { useCurrentFrame } from "remotion";

/**
 * Richly Detailed Part 06 Character Rigs for Himachal Nagari:
 * - MainaDeviRig (Queen Mainavati with Banarasi Zari Saree, Chunri veil, Nath, Mukut & Aarti Thali)
 * - SakhiBandRig (4 Himachali bridesmaids in pleated Ghagras, Chunri veils, Gajra hair & clapping hands)
 * - MouseMountGanaRig (Sculpted Mushak steed with rider)
 * - ElephantMountDevaRig (Royal caparisoned elephant with Tilak, trunk rings & cheering Barati Deva)
 */

export const MainaDeviRig: React.FC<{
  x: number;
  y: number;
  scale?: number;
  mood?: "welcome" | "shocked";
  speakingEnergy?: number;
}> = ({ x, y, scale = 1, mood = "welcome", speakingEnergy = 0 }) => {
  const frame = useCurrentFrame();
  const sway = Math.sin(frame * 0.08) * 2.5;
  const thaliRot = mood === "welcome" ? Math.sin(frame * 0.12) * 5 : -24;
  const jawOpen = speakingEnergy * 8;
  const flameScale = 1 + Math.sin(frame * 0.35) * 0.1;

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
      <svg width={340} height={440} viewBox="-170 -220 340 440" overflow="visible">
        <ellipse cx={0} cy={162} rx={76} ry={11} fill="#0b1120" opacity={0.42} />

        {/* Draped Silk Chunri / Odhni Veil Behind Head & Flowing Down Shoulders */}
        <path
          d="M -38,-148 Q -74,-128 -78,-42 Q -84,48 -68,108 L -34,92 Q -46,24 -36,-92 Z"
          fill="#e11d48"
          stroke="#0b1120"
          strokeWidth={2.6}
        />
        <path
          d="M 38,-148 Q 74,-128 78,-42 Q 84,48 68,108 L 34,92 Q 46,24 36,-92 Z"
          fill="#e11d48"
          stroke="#0b1120"
          strokeWidth={2.6}
        />
        {/* Golden Gota-Patti Edge on Chunri */}
        <path d="M -72,-35 Q -78,45 -64,102" fill="none" stroke="#fde047" strokeWidth={3.5} strokeDasharray="7 4" />
        <path d="M 72,-35 Q 78,45 64,102" fill="none" stroke="#fde047" strokeWidth={3.5} strokeDasharray="7 4" />

        {/* Royal Banarasi Lehenga Skirt with Deep Pleats & Zari Border */}
        <path
          d="M -40,-16 L 40,-16 Q 62,62 74,148 Q 0,168 -74,148 Q -62,62 -40,-16 Z"
          fill="#9f1239"
          stroke="#0b1120"
          strokeWidth={3.2}
        />
        {/* Vertical Silk Pleats & Gold Buti Dots */}
        {[-32, -16, 0, 16, 32].map((px, i) => (
          <path
            key={i}
            d={`M ${px * 0.72},-12 Q ${px * 1.15},68 ${px * 1.45},148`}
            fill="none"
            stroke="#881337"
            strokeWidth={2.4}
          />
        ))}
        {[-38, -14, 14, 38].map((bx, i) => (
          <circle key={i} cx={bx} cy={78 + (i % 2) * 18} r={3.5} fill="#fde047" opacity={0.85} />
        ))}
        {/* Ornate Double Zari Hem Border */}
        <path d="M -69,132 Q 0,154 69,132" fill="none" stroke="#f59e0b" strokeWidth={9} />
        <path d="M -66,120 Q 0,141 66,120" fill="none" stroke="#fef08a" strokeWidth={3} strokeDasharray="6 4" />
        {/* Waistband (Kamarbandh) with Hanging Tassels */}
        <rect x={-42} y={-20} width={84} height={11} rx={4} fill="#fbbf24" stroke="#0b1120" strokeWidth={2.2} />
        <circle cx={0} cy={-14} r={5} fill="#10b981" stroke="#0b1120" strokeWidth={1.5} />

        {/* Embroidered Velvet Choli Blouse & Diagonal Silk Pallu */}
        <path d="M -32,-68 Q 0,-74 32,-68 L 42,-16 L -42,-16 Z" fill="#be123c" stroke="#0b1120" strokeWidth={3} />
        <path d="M -32,-68 L 30,52 L 48,46 L -14,-70 Z" fill="#fbbf24" stroke="#0b1120" strokeWidth={2.2} />
        <path d="M -24,-66 L 36,48" fill="none" stroke="#fef08a" strokeWidth={2} strokeDasharray="5 4" />

        {/* Neck + Multi-Layered Rani Haar & Choker */}
        <rect x={-10} y={-80} width={20} height={16} rx={5} fill="#f7be9c" stroke="#0b1120" strokeWidth={2.2} />
        <path d="M -18,-69 Q 0,-56 18,-69" fill="none" stroke="#fde047" strokeWidth={4.5} />
        <path d="M -26,-66 Q 0,-34 26,-66" fill="none" stroke="#fbbf24" strokeWidth={4} />
        <circle cx={0} cy={-48} r={5} fill="#dc2626" stroke="#fde047" strokeWidth={1.8} />
        <circle cx={-11} cy={-55} r={3} fill="#10b981" />
        <circle cx={11} cy={-55} r={3} fill="#10b981" />

        {/* Sculpted Arms, Golden Chooda Bangles & Graceful Hands */}
        {/* Right Arm cradling Aarti Thali */}
        <g>
          <path d="M -32,-56 Q -64,-34 -68,-4 Q -62,14 -44,12" fill="none" stroke="#0b1120" strokeWidth={16} strokeLinecap="round" />
          <path d="M -32,-56 Q -64,-34 -68,-4 Q -62,14 -44,12" fill="none" stroke="#f7be9c" strokeWidth={10.5} strokeLinecap="round" />
          {/* Chooda Bangles */}
          <path d="M -68,-6 L -58,2" stroke="#dc2626" strokeWidth={5} strokeLinecap="round" />
          <path d="M -65,0 L -54,6" stroke="#fde047" strokeWidth={3} strokeLinecap="round" />
          <ellipse cx={-42} cy={12} rx={9} ry={6} fill="#f7be9c" stroke="#0b1120" strokeWidth={2} />
        </g>

        {/* Left Arm welcoming / gesturing */}
        <g>
          <path d="M 32,-56 Q 66,-32 68,2 Q 62,18 44,14" fill="none" stroke="#0b1120" strokeWidth={16} strokeLinecap="round" />
          <path d="M 32,-56 Q 66,-32 68,2 Q 62,18 44,14" fill="none" stroke="#f7be9c" strokeWidth={10.5} strokeLinecap="round" />
          <path d="M 66,-2 L 56,5" stroke="#dc2626" strokeWidth={5} strokeLinecap="round" />
          <path d="M 63,4 L 52,10" stroke="#fde047" strokeWidth={3} strokeLinecap="round" />
          <ellipse cx={42} cy={14} rx={9} ry={6} fill="#f7be9c" stroke="#0b1120" strokeWidth={2} />
        </g>

        {/* Ornate Brass Panch-Aarti Thali with Kumkum, Akshat, Marigolds & Glowing Diyas */}
        <g transform={`translate(-74, 14) rotate(${thaliRot})`}>
          <ellipse cx={0} cy={4} rx={44} ry={15} fill="#b45309" stroke="#0b1120" strokeWidth={2.6} />
          <ellipse cx={0} cy={0} rx={42} ry={13} fill="#fbbf24" stroke="#0b1120" strokeWidth={2.2} />
          <ellipse cx={0} cy={0} rx={30} ry={8} fill="#fef08a" />
          {/* Kumkum & Haldi Katoris */}
          <circle cx={-19} cy={0} r={5.5} fill="#dc2626" stroke="#78350f" strokeWidth={1.4} />
          <circle cx={19} cy={0} r={5.5} fill="#f97316" stroke="#78350f" strokeWidth={1.4} />
          {/* Central Panch-Deep Brass Diya */}
          <path d="M -9,2 L 9,2 L 6,-5 L -6,-5 Z" fill="#d97706" stroke="#0b1120" strokeWidth={1.4} />
          <g transform={`translate(0, -5) scale(${flameScale})`}>
            <path d="M -6,0 Q 0,-26 6,0 Z" fill="#f97316" />
            <path d="M -3,0 Q 0,-17 3,0 Z" fill="#fffbeb" />
          </g>
        </g>

        {/* Sculpted Royal Head, Braided Hair, Maang-Tikka, Nath Chain & Three-Peaked Maharani Mukut */}
        <g transform={`translate(0, -110) rotate(${mood === "shocked" ? -6 : 0})`}>
          {/* Jhumka Earrings & Hair Side Waves */}
          <path d="M -34,4 L -40,22 Q -34,27 -28,22 Z" fill="#fbbf24" stroke="#0b1120" strokeWidth={1.8} />
          <path d="M 34,4 L 40,22 Q 34,27 28,22 Z" fill="#fbbf24" stroke="#0b1120" strokeWidth={1.8} />
          {/* Face Oval */}
          <ellipse cx={0} cy={0} rx={32} ry={34} fill="#f7be9c" stroke="#0b1120" strokeWidth={3} />
          {/* Soft Cheek Blush */}
          <ellipse cx={-18} cy={8} rx={7} ry={4} fill="#fb7185" opacity={0.35} />
          <ellipse cx={18} cy={8} rx={7} ry={4} fill="#fb7185" opacity={0.35} />
          {/* Dark Hair Parting & Side Locks */}
          <path d="M -32,-4 Q -30,-38 0,-36 Q 30,-38 32,-4 Q 16,-24 0,-20 Q -16,-24 -32,-4 Z" fill="#0f172a" />
          {/* White Gajra Garland tucked around Crown Base */}
          <path d="M -30,-18 Q 0,-30 30,-18" fill="none" stroke="#fffbeb" strokeWidth={6} strokeLinecap="round" strokeDasharray="2 7" />

          {/* Three-Peaked Jewel-Studded Maharani Mukut */}
          <polygon points="-28,-22 -20,-44 -10,-28 0,-56 10,-28 20,-44 28,-22" fill="#fbbf24" stroke="#0b1120" strokeWidth={2.4} />
          <circle cx={0} cy={-38} r={4.5} fill="#ef4444" stroke="#0b1120" strokeWidth={1.2} />
          <circle cx={-18} cy={-34} r={2.8} fill="#10b981" />
          <circle cx={18} cy={-34} r={2.8} fill="#10b981" />

          {/* Maang-Tikka & Maroon Bindi */}
          <line x1={0} y1={-25} x2={0} y2={-16} stroke="#fde047" strokeWidth={2.5} />
          <circle cx={0} cy={-15} r={4.5} fill="#dc2626" stroke="#fde047" strokeWidth={1.5} />

          {/* Expressive Almond Eyes & Brows */}
          <ellipse cx={-12} cy={-3} rx={6} ry={4.2} fill="#ffffff" stroke="#0b1120" strokeWidth={1.6} />
          <circle cx={-12} cy={-3} r={2.8} fill="#0f172a" />
          <circle cx={-13} cy={-4} r={0.9} fill="#ffffff" />
          <ellipse cx={12} cy={-3} rx={6} ry={4.2} fill="#ffffff" stroke="#0b1120" strokeWidth={1.6} />
          <circle cx={12} cy={-3} r={2.8} fill="#0f172a" />
          <circle cx={11} cy={-4} r={0.9} fill="#ffffff" />

          {/* Royal Golden Nath (Nose Ring) + Pearl Chain */}
          <path d="M 10,8 Q 22,12 31,4" fill="none" stroke="#fef08a" strokeWidth={1.8} strokeDasharray="2 3" />
          <circle cx={8} cy={10} r={6} fill="none" stroke="#fbbf24" strokeWidth={2.2} />
          <circle cx={13} cy={12} r={1.8} fill="#ef4444" />

          {mood === "shocked" ? (
            <>
              <path d="M -20,-13 Q -12,-18 -5,-12" fill="none" stroke="#0f172a" strokeWidth={2.6} />
              <path d="M 5,-12 Q 12,-18 20,-13" fill="none" stroke="#0f172a" strokeWidth={2.6} />
              <ellipse cx={0} cy={18} rx={6.5} ry={6 + jawOpen * 0.4} fill="#7f1d1d" stroke="#0b1120" strokeWidth={1.6} />
            </>
          ) : (
            <>
              <path d="M -19,-11 Q -12,-15 -5,-11" fill="none" stroke="#0f172a" strokeWidth={2.2} />
              <path d="M 5,-11 Q 12,-15 19,-11" fill="none" stroke="#0f172a" strokeWidth={2.2} />
              <path d={`M -9,15 Q 0,${22 + jawOpen} 9,15`} fill="none" stroke="#9f1239" strokeWidth={3} strokeLinecap="round" />
            </>
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
  panic?: boolean;
}> = ({ x, y, scale = 1, askingNeg = false, panic = false }) => {
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
          const bob = panic ? Math.abs(Math.sin(frame * 0.42 + s.phase)) * -18 : Math.sin(frame * 0.15 + s.phase) * 9;
          const handRaise = panic ? -58 + Math.sin(frame * 0.5 + s.phase) * 16 : askingNeg ? -34 : -18 + Math.sin(frame * 0.2 + s.phase) * 10;
          return (
            <g key={idx} transform={`translate(${s.dx}, ${bob})`}>
              <ellipse cx={0} cy={112} rx={36} ry={6} fill="#0b1120" opacity={0.35} />
              {/* Chunri Veil Draped Behind */}
              <path d="M -22,-64 Q -42,-20 -36,42 L -16,32 Z" fill={s.sari} stroke="#0b1120" strokeWidth={2} opacity={0.9} />
              <path d="M 22,-64 Q 42,-20 36,42 L 16,32 Z" fill={s.sari} stroke="#0b1120" strokeWidth={2} opacity={0.9} />

              {/* Pleated Ghagra Skirt */}
              <path d="M -26,8 L 26,8 L 44,104 Q 0,118 -44,104 Z" fill={s.col} stroke="#0b1120" strokeWidth={2.8} />
              <path d="M -12,10 L -22,106 M 12,10 L 22,106" stroke="#0b1120" strokeWidth={1.6} opacity={0.35} />
              <path d="M -36,90 Q 0,102 36,90" fill="none" stroke={s.sari} strokeWidth={5} />
              {/* Choli & Necklace */}
              <rect x={-19} y={-28} width={38} height={36} rx={7} fill={s.sari} stroke="#0b1120" strokeWidth={2.6} />
              <path d="M -12,-28 Q 0,-15 12,-28" fill="none" stroke="#fbbf24" strokeWidth={3.5} />

              {/* Clapping / Neg-Blocking Arms with Palms & Bangles */}
              <path d={`M -18,-20 Q -42,${handRaise} -28,${handRaise - 10}`} fill="none" stroke="#0b1120" strokeWidth={12} strokeLinecap="round" />
              <path d={`M -18,-20 Q -42,${handRaise} -28,${handRaise - 10}`} fill="none" stroke="#f7be9c" strokeWidth={7} strokeLinecap="round" />
              <circle cx={-28} cy={handRaise - 12} r={5.5} fill="#f7be9c" stroke="#0b1120" strokeWidth={1.6} />
              <path d={`M 18,-20 Q 42,${handRaise} 28,${handRaise - 10}`} fill="none" stroke="#0b1120" strokeWidth={12} strokeLinecap="round" />
              <path d={`M 18,-20 Q 42,${handRaise} 28,${handRaise - 10}`} fill="none" stroke="#f7be9c" strokeWidth={7} strokeLinecap="round" />
              <circle cx={28} cy={handRaise - 12} r={5.5} fill="#f7be9c" stroke="#0b1120" strokeWidth={1.6} />

              {/* Head, Gajra Flowers, Maang-Tikka & Eyes */}
              <circle cx={0} cy={-50} r={20} fill="#f7be9c" stroke="#0b1120" strokeWidth={2.6} />
              <path d="M -20,-54 Q 0,-76 20,-54 Z" fill="#0f172a" />
              <path d="M -14,-66 Q 0,-74 14,-66" fill="none" stroke="#fffbeb" strokeWidth={4} strokeDasharray="3 3" />
              <circle cx={0} cy={-58} r={2.8} fill="#ef4444" />
              <circle cx={-7} cy={-51} r={2.4} fill="#0f172a" />
              <circle cx={7} cy={-51} r={2.4} fill="#0f172a" />
              <path d="M -6,-42 Q 0,-36 6,-42" fill="none" stroke="#9f1239" strokeWidth={2.2} />
            </g>
          );
        })}
        {askingNeg && (
          <g transform="translate(0, -124)">
            <rect x={-122} y={-24} width={244} height={42} rx={14} fill="#be123c" stroke="#fde047" strokeWidth={2.6} />
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
        <ellipse cx={0} cy={76} rx={78} ry={9} fill="#0b1120" opacity={0.38} />
        {/* Painted Sacred Mushak Steed */}
        <path d="M -72,42 Q -105,12 -118,32" fill="none" stroke="#0b1120" strokeWidth={8} strokeLinecap="round" />
        <path d="M -72,42 Q -105,12 -118,32" fill="none" stroke="#f472b6" strokeWidth={4} strokeLinecap="round" />
        <ellipse cx={0} cy={38} rx={72} ry={34} fill="#cbd5e1" stroke="#0b1120" strokeWidth={3} />
        <path d="M -62,50 Q 0,74 62,48 Q 36,68 -36,68 Z" fill="#94a3b8" opacity={0.6} />
        <path d="M -42,10 L 38,10 L 32,46 L -38,46 Z" fill="#f97316" stroke="#fde047" strokeWidth={2.4} />
        {/* Mouse Feet */}
        <ellipse cx={-34} cy={68} rx={14} ry={6} fill="#f9a8d4" stroke="#0b1120" strokeWidth={2} />
        <ellipse cx={36} cy={68} rx={14} ry={6} fill="#f9a8d4" stroke="#0b1120" strokeWidth={2} />
        {/* Head, Ears & Whiskers */}
        <ellipse cx={74} cy={32} rx={24} ry={18} fill="#e2e8f0" stroke="#0b1120" strokeWidth={2.8} />
        <circle cx={58} cy={12} r={14} fill="#f9a8d4" stroke="#0b1120" strokeWidth={2.4} />
        <circle cx={82} cy={28} r={3.2} fill="#0f172a" />
        <circle cx={96} cy={32} r={4} fill="#ec4899" />
        <path d="M 94,35 L 114,30 M 94,38 L 114,42" stroke="#0b1120" strokeWidth={1.4} />

        {/* Joyous Rider Holding Reins & Pagdi */}
        <g transform={`translate(-2, -16) rotate(${Math.sin(frame * 0.18 + phase) * 6})`}>
          <rect x={-20} y={-24} width={40} height={44} rx={10} fill="#eab308" stroke="#0b1120" strokeWidth={2.8} />
          <path d="M -18,-18 Q -42,-34 -34,-54" fill="none" stroke="#0b1120" strokeWidth={13} strokeLinecap="round" />
          <path d="M -18,-18 Q -42,-34 -34,-54" fill="none" stroke="#fda4af" strokeWidth={8} strokeLinecap="round" />
          <circle cx={-34} cy={-56} r={6} fill="#fda4af" stroke="#0b1120" strokeWidth={1.8} />
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
        <ellipse cx={12} cy={112} rx={112} ry={12} fill="#0b1120" opacity={0.4} />
        {/* Royal Ceremonial Tusker */}
        {[
          { x1: -56, x2: -60 - stride, col: "#94a3b8" },
          { x1: -18, x2: -16 + stride, col: "#cbd5e1" },
          { x1: 40, x2: 38 - stride, col: "#94a3b8" },
          { x1: 72, x2: 76 + stride, col: "#cbd5e1" },
        ].map((leg, i) => (
          <g key={i}>
            <line x1={leg.x1} y1={30} x2={leg.x2} y2={106} stroke="#0b1120" strokeWidth={26} strokeLinecap="round" />
            <line x1={leg.x1} y1={30} x2={leg.x2} y2={106} stroke={leg.col} strokeWidth={20} strokeLinecap="round" />
            <ellipse cx={leg.x2} cy={100} rx={11} ry={4} fill="none" stroke="#fbbf24" strokeWidth={3} />
          </g>
        ))}

        <ellipse cx={6} cy={8} rx={94} ry={58} fill="#cbd5e1" stroke="#0b1120" strokeWidth={3.2} />
        {/* Ornate Velvet Jhool */}
        <path d="M -52,-40 L 58,-40 L 62,38 Q 6,54 -54,38 Z" fill="#7c3aed" stroke="#fde047" strokeWidth={3} />
        <path d="M -46,24 Q 6,42 56,24" fill="none" stroke="#fbbf24" strokeWidth={4} strokeDasharray="6 4" />
        {/* Golden Howdah & Cheering Barati Deva Rider */}
        <rect x={-32} y={-84} width={68} height={44} rx={8} fill="#fbbf24" stroke="#0b1120" strokeWidth={2.8} />
        <path d="M -20,-84 Q -40,-108 -34,-128" fill="none" stroke="#0b1120" strokeWidth={11} strokeLinecap="round" />
        <path d="M -20,-84 Q -40,-108 -34,-128" fill="none" stroke="#f7be9c" strokeWidth={7} strokeLinecap="round" />
        <circle cx={-34} cy={-130} r={5.5} fill="#f7be9c" stroke="#0b1120" strokeWidth={1.6} />
        <circle cx={2} cy={-106} r={18} fill="#f7be9c" stroke="#0b1120" strokeWidth={2.5} />
        <polygon points="-14,-118 2,-142 18,-118" fill="#ea580c" stroke="#fde047" strokeWidth={2} />
        <circle cx={-5} cy={-108} r={2.5} fill="#0f172a" />
        <circle cx={8} cy={-108} r={2.5} fill="#0f172a" />
        <path d="M -4,-98 Q 2,-93 8,-98" fill="none" stroke="#7f1d1d" strokeWidth={2} />

        {/* Elephant Head, Ear, Ceremonial Tilak, Trunk Rings & Tusks */}
        <circle cx={102} cy={-18} r={38} fill="#e2e8f0" stroke="#0b1120" strokeWidth={3} />
        <ellipse cx={78} cy={-12} rx={22} ry={30} fill="#94a3b8" stroke="#0b1120" strokeWidth={2.4} />
        <path d="M 102,-42 L 106,-28 M 108,-42 L 112,-28" stroke="#dc2626" strokeWidth={3} strokeLinecap="round" />
        <path d={`M 122,-4 Q 154,${18 + trunkWave} 136,${58 + trunkWave}`} fill="none" stroke="#0b1120" strokeWidth={20} strokeLinecap="round" />
        <path d={`M 122,-4 Q 154,${18 + trunkWave} 136,${58 + trunkWave}`} fill="none" stroke="#e2e8f0" strokeWidth={14} strokeLinecap="round" />
        <path d="M 118,8 Q 146,16 154,-2" fill="none" stroke="#fffbeb" strokeWidth={7} strokeLinecap="round" />
        <circle cx={114} cy={-26} r={4} fill="#0f172a" />
      </svg>
    </div>
  );
};
