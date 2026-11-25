import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

const OUTLINE = "#1a0b2e";

// Devarishi Narad Muni Rig — Cel-shaded with Veena, Khartal, Shikha, Saffron Pitambar & Expressive Gestures
export const NaradMuniRig: React.FC<{
  x: number;
  y: number;
  scale?: number;
  speakingEnergy?: number;
  gesture?: "explaining" | "denying" | "playing";
  flipX?: boolean;
}> = ({ x, y, scale = 1, speakingEnergy = 0, gesture = "explaining", flipX = false }) => {
  const frame = useCurrentFrame();
  const bob = Math.sin(frame * 0.08) * 3;
  const handWave = gesture === "denying" ? Math.sin(frame * 0.35) * 22 : Math.sin(frame * 0.14) * 10;
  const mouthOpen = 2.5 + speakingEnergy * 8;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + bob,
        transform: `translate(-50%, -50%) scale(${flipX ? -scale : scale}, ${scale})`,
      }}
    >
      <svg width={260} height={360} viewBox="-130 -190 260 360" overflow="visible">
        <ellipse cx={0} cy={148} rx={58} ry={13} fill="#090414" opacity={0.35} />

        {/* Radiant Sage Halo */}
        <circle cx={0} cy={-98} r={54} fill="#fde68a" opacity={0.28} />
        <circle cx={0} cy={-98} r={42} fill="#fef08a" opacity={0.35} />

        {/* Saffron Dhoti & Feet */}
        <path d="M-32,12 L32,12 L42,130 L-42,130 Z" fill="#f59e0b" stroke={OUTLINE} strokeWidth={3} />
        <path d="M0,16 L0,130" stroke="#b45309" strokeWidth={2.5} />
        <path d="M-36,118 L36,118" stroke="#fef08a" strokeWidth={4} />
        <ellipse cx={-18} cy={136} rx={15} ry={8} fill="#fdba74" stroke={OUTLINE} strokeWidth={2.5} />
        <ellipse cx={18} cy={136} rx={15} ry={8} fill="#fdba74" stroke={OUTLINE} strokeWidth={2.5} />

        {/* Torso + Sacred Janeu Thread + Saffron Angavastra */}
        <path d="M-36,-62 Q0,-70 36,-62 L32,16 L-32,16 Z" fill="#fed7aa" stroke={OUTLINE} strokeWidth={3} />
        <path d="M-24,-62 L24,14" stroke="#fffbeb" strokeWidth={3.5} />
        <path d="M-36,-60 Q-48,-10 -34,35 L-18,32 Q-26,-15 -22,-60 Z" fill="#ea580c" stroke={OUTLINE} strokeWidth={2.5} />
        <path d="M36,-60 Q48,-10 34,35 L18,32 Q26,-15 22,-60 Z" fill="#ea580c" stroke={OUTLINE} strokeWidth={2.5} />
        <circle cx={0} cy={-44} r={7} fill="#dc2626" stroke="#fde047" strokeWidth={2} />

        {/* Right Arm + Mahati Veena */}
        <g transform={`translate(-34, -50) rotate(${gesture === "playing" ? -12 : 8})`}>
          <path d="M0,0 Q-26,28 -18,58" fill="none" stroke="#fed7aa" strokeWidth={15} strokeLinecap="round" />
          <path d="M0,0 Q-26,28 -18,58" fill="none" stroke={OUTLINE} strokeWidth={2.5} strokeLinecap="round" />
          {/* Golden Veena resting diagonally */}
          <g transform="translate(-14, 42) rotate(-32)">
            <circle cx={-16} cy={42} r={20} fill="#d97706" stroke={OUTLINE} strokeWidth={2.5} />
            <circle cx={-16} cy={42} r={11} fill="#fef3c7" stroke={OUTLINE} strokeWidth={1.5} />
            <rect x={-19} y={-55} width={8} height={95} rx={3} fill="#92400e" stroke={OUTLINE} strokeWidth={2} />
            <circle cx={-15} cy={-58} r={14} fill="#b45309" stroke={OUTLINE} strokeWidth={2.5} />
            <line x1={-17} y1={-50} x2={-17} y2={42} stroke="#fde047" strokeWidth={1.2} />
            <line x1={-13} y1={-50} x2={-13} y2={42} stroke="#fde047" strokeWidth={1.2} />
          </g>
        </g>

        {/* Left Arm (Denying / Explaining + Khartal) */}
        <g transform={`translate(34, -50) rotate(${gesture === "denying" ? -42 + handWave : -12 + handWave * 0.5})`}>
          <path d="M0,0 Q26,18 42,-8" fill="none" stroke="#fed7aa" strokeWidth={15} strokeLinecap="round" />
          <path d="M0,0 Q26,18 42,-8" fill="none" stroke={OUTLINE} strokeWidth={2.5} strokeLinecap="round" />
          <circle cx={44} cy={-12} r={9} fill="#fed7aa" stroke={OUTLINE} strokeWidth={2.5} />
          {/* Khartal clapper */}
          {gesture !== "denying" && (
            <rect x={42} y={-28} width={10} height={24} rx={3} fill="#92400e" stroke="#fde047" strokeWidth={1.5} />
          )}
        </g>

        {/* Head + Shikha Topknot + Urdhva Pundra Tilak */}
        <g transform="translate(0, -96)">
          {/* Flowing grey-white locks */}
          <path d="M-28,-8 Q-36,16 -22,26" fill="none" stroke="#e2e8f0" strokeWidth={8} strokeLinecap="round" />
          <path d="M28,-8 Q36,16 22,26" fill="none" stroke="#e2e8f0" strokeWidth={8} strokeLinecap="round" />
          <circle cx={0} cy={0} r={30} fill="#fed7aa" stroke={OUTLINE} strokeWidth={3} />
          {/* Shikha Topknot */}
          <path d="M-12,-28 Q0,-58 20,-42 Q8,-30 10,-26 Z" fill="#1e293b" stroke={OUTLINE} strokeWidth={2.5} />
          <circle cx={2} cy={-30} r={9} fill="#f8fafc" stroke={OUTLINE} strokeWidth={2} />
          {/* Vaishnav Tilak */}
          <path d="M-4,-20 L0,-7 L4,-20" fill="none" stroke="#fef08a" strokeWidth={3} strokeLinecap="round" />
          <line x1={0} y1={-19} x2={0} y2={-8} stroke="#dc2626" strokeWidth={2} />
          {/* Eyes & Brows */}
          <path d="M-16,-7 Q-10,-12 -4,-7" fill="none" stroke={OUTLINE} strokeWidth={2.2} />
          <path d="M4,-7 Q10,-12 16,-7" fill="none" stroke={OUTLINE} strokeWidth={2.2} />
          <circle cx={-10} cy={-1} r={3.5} fill={OUTLINE} />
          <circle cx={10} cy={-1} r={3.5} fill={OUTLINE} />
          {/* Mustache & Speaking Mouth */}
          <path d="M-14,10 Q-5,5 0,9 Q5,5 14,10" fill="none" stroke="#e2e8f0" strokeWidth={3.5} strokeLinecap="round" />
          <ellipse cx={0} cy={14} rx={7} ry={mouthOpen * 0.45} fill="#7f1d1d" stroke={OUTLINE} strokeWidth={1.8} />
        </g>
      </svg>
    </div>
  );
};

// Animated Coiled Snakes Tossed Through the Air ("शिव शंकर ने बड़े प्रेम से सब नाग दिए हैं फेंक")
export const TossedSerpentArc: React.FC<{
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  progress: number;
  color?: string;
}> = ({ startX, startY, endX, endY, progress, color = "#15803d" }) => {
  const p = Math.max(0, Math.min(1, progress));
  if (p <= 0 || p >= 1) return null;

  const cx = interpolate(p, [0, 1], [startX, endX]);
  const arcLift = Math.sin(p * Math.PI) * 190;
  const cy = interpolate(p, [0, 1], [startY, endY]) - arcLift;
  const rot = p * 540;

  return (
    <div
      style={{
        position: "absolute",
        left: cx,
        top: cy,
        transform: `translate(-50%, -50%) rotate(${rot}deg)`,
        pointerEvents: "none",
      }}
    >
      <svg width={110} height={80} viewBox="-55 -40 110 80" overflow="visible">
        <path
          d="M-38,8 Q-20,-24 0,4 Q20,28 36,-8"
          fill="none"
          stroke={OUTLINE}
          strokeWidth={13}
          strokeLinecap="round"
        />
        <path
          d="M-38,8 Q-20,-24 0,4 Q20,28 36,-8"
          fill="none"
          stroke={color}
          strokeWidth={8.5}
          strokeLinecap="round"
        />
        {/* Cobra hood */}
        <path d="M28,-16 Q42,-28 48,-8 Q40,4 28,-2 Z" fill={color} stroke={OUTLINE} strokeWidth={2} />
        <circle cx={40} cy={-12} r={2} fill="#fef08a" />
        <path d="M46,-9 L56,-12 M46,-9 L56,-6" stroke="#ef4444" strokeWidth={1.8} />
      </svg>
    </div>
  );
};

// Festive Pitambari Deva Baratis Marching Ahead of Narayan (with Shankh, Chanvar, Dhol & Kalash)
export const PitambariBaratiCrowd: React.FC<{ baseX: number; y: number }> = ({ baseX, y }) => {
  const frame = useCurrentFrame();
  const baratis: Array<{ dx: number; dy: number; s: number; instrument: "shankh" | "chanvar" | "dhol" | "kalash" }> = [
    { dx: 0, dy: 0, s: 0.92, instrument: "shankh" },
    { dx: 145, dy: 12, s: 0.9, instrument: "chanvar" },
    { dx: 295, dy: -4, s: 0.94, instrument: "dhol" },
    { dx: 445, dy: 10, s: 0.88, instrument: "kalash" },
  ];

  return (
    <>
      {baratis.map((b, i) => {
        const bounce = Math.abs(Math.sin(frame * 0.16 + i * 1.1)) * 7;
        const armSwing = Math.sin(frame * 0.18 + i) * 8;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: baseX + b.dx,
              top: y + b.dy - bounce,
              transform: `translate(-50%, -50%) scale(${b.s})`,
            }}
          >
            <svg width={140} height={220} viewBox="-70 -110 140 220" overflow="visible">
              <ellipse cx={0} cy={98} rx={34} ry={8} fill="#090414" opacity={0.32} />
              {/* Pitambari Dhoti & Golden Angavastra */}
              <path d="M-22,10 L22,10 L26,88 L-26,88 Z" fill="#facc15" stroke={OUTLINE} strokeWidth={2.5} />
              <path d="M-24,78 L24,78" stroke="#ea580c" strokeWidth={4} />
              <path d="M-24,-42 Q0,-48 24,-42 L22,10 L-22,10 Z" fill="#fde047" stroke={OUTLINE} strokeWidth={2.5} />
              <path d="M-20,-42 L20,8" stroke="#ea580c" strokeWidth={5} />
              <path d="M-12,-42 Q0,-26 12,-42" fill="none" stroke="#f43f5e" strokeWidth={3.5} />

              {/* Left Arm */}
              <path d="M-24,-34 Q-38,-14 -30,8" fill="none" stroke="#fdba74" strokeWidth={10} strokeLinecap="round" />
              <path d="M-24,-34 Q-38,-14 -30,8" fill="none" stroke={OUTLINE} strokeWidth={2.2} strokeLinecap="round" />

              {/* Right Arm + Ceremonial Instrument/Prop */}
              <g transform={`translate(24, -34) rotate(${armSwing})`}>
                <path d="M0,0 Q18,-8 22,-24" fill="none" stroke="#fdba74" strokeWidth={10} strokeLinecap="round" />
                <path d="M0,0 Q18,-8 22,-24" fill="none" stroke={OUTLINE} strokeWidth={2.2} strokeLinecap="round" />
                {b.instrument === "shankh" && (
                  <path d="M18,-28 Q36,-42 42,-24 Q30,-14 18,-22 Z" fill="#fffbeb" stroke={OUTLINE} strokeWidth={2} />
                )}
                {b.instrument === "chanvar" && (
                  <g transform="translate(22, -26)">
                    <line x1={0} y1={0} x2={4} y2={-22} stroke="#b45309" strokeWidth={3.5} />
                    <path d="M-6,-22 Q4,-48 16,-22 Z" fill="#f8fafc" stroke={OUTLINE} strokeWidth={1.8} />
                  </g>
                )}
                {b.instrument === "dhol" && (
                  <g transform="translate(-14, 18) rotate(-14)">
                    <rect x={-16} y={-10} width={34} height={22} rx={6} fill="#92400e" stroke="#fde047" strokeWidth={2} />
                    <ellipse cx={-16} cy={1} rx={4} ry={11} fill="#fef3c7" stroke={OUTLINE} strokeWidth={1.5} />
                    <ellipse cx={18} cy={1} rx={4} ry={11} fill="#fef3c7" stroke={OUTLINE} strokeWidth={1.5} />
                  </g>
                )}
                {b.instrument === "kalash" && (
                  <g transform="translate(22, -28)">
                    <circle cx={0} cy={0} r={10} fill="#f59e0b" stroke={OUTLINE} strokeWidth={2} />
                    <path d="M-6,-8 Q0,-20 6,-8" fill="#16a34a" stroke={OUTLINE} strokeWidth={1.5} />
                  </g>
                )}
              </g>

              {/* Head & Royal Golden Pagri */}
              <circle cx={0} cy={-64} r={20} fill="#fdba74" stroke={OUTLINE} strokeWidth={2.5} />
              <path d="M-21,-70 Q0,-98 21,-70 Z" fill="#ea580c" stroke={OUTLINE} strokeWidth={2.5} />
              <circle cx={0} cy={-86} r={5} fill="#fef08a" stroke={OUTLINE} strokeWidth={1.5} />
              <line x1={0} y1={-72} x2={0} y2={-64} stroke="#dc2626" strokeWidth={2} />
              <circle cx={-6} cy={-63} r={2.5} fill={OUTLINE} />
              <circle cx={6} cy={-63} r={2.5} fill={OUTLINE} />
              <path d="M-5,-54 Q0,-49 5,-54" fill="none" stroke={OUTLINE} strokeWidth={2} />
            </svg>
          </div>
        );
      })}
    </>
  );
};
