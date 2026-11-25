import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

const OUTLINE = "#1a0b2e";

// Devarishi Narad Muni Rig — Richly Detailed Sage with Flowing Hair, Shikha, Rudraksha Mala,
// Saffron Silk Angavastra, Pleated Pitambar Dhoti, Ornate Mahati Veena & Brass Khartal
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
  const handWave = gesture === "denying" ? Math.sin(frame * 0.35) * 20 : Math.sin(frame * 0.14) * 9;
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
      <svg width={280} height={380} viewBox="-140 -200 280 380" overflow="visible">
        <ellipse cx={0} cy={156} rx={64} ry={13} fill="#090414" opacity={0.38} />

        {/* Radiant Divine Sage Halo */}
        <circle cx={0} cy={-106} r={58} fill="#fde68a" opacity={0.26} />
        <circle cx={0} cy={-106} r={44} fill="#fef08a" opacity={0.36} />
        <circle cx={0} cy={-106} r={52} fill="none" stroke="#fbbf24" strokeWidth={1.8} strokeDasharray="6 6" opacity={0.65} />

        {/* Pleated Saffron Silk Dhoti & Wooden Paduka Sandals */}
        <path d="M-36,12 L36,12 Q46,72 48,136 Q0,146 -48,136 Q-46,72 -36,12 Z" fill="#f59e0b" stroke={OUTLINE} strokeWidth={3} />
        {/* Center Dhoti Pleats & Gold Zari Hem */}
        {[-18, 0, 18].map((px, i) => (
          <path key={i} d={`M${px * 0.6},14 L${px * 1.1},138`} stroke="#b45309" strokeWidth={2.2} opacity={0.75} />
        ))}
        <path d="M-44,122 Q0,132 44,122" fill="none" stroke="#fef08a" strokeWidth={5} />
        <path d="M-42,114 Q0,124 42,114" fill="none" stroke="#dc2626" strokeWidth={2} />
        {/* Kamarbandh Belt */}
        <rect x={-38} y={6} width={76} height={11} rx={4} fill="#ea580c" stroke="#fde047" strokeWidth={2} />

        {/* Bare Feet + Carved Wooden Padukas */}
        <ellipse cx={-20} cy={144} rx={17} ry={8} fill="#92400e" stroke={OUTLINE} strokeWidth={2.5} />
        <ellipse cx={-20} cy={140} rx={13} ry={6} fill="#fdba74" stroke={OUTLINE} strokeWidth={2} />
        <ellipse cx={20} cy={144} rx={17} ry={8} fill="#92400e" stroke={OUTLINE} strokeWidth={2.5} />
        <ellipse cx={20} cy={140} rx={13} ry={6} fill="#fdba74" stroke={OUTLINE} strokeWidth={2} />

        {/* Flowing Silver-White Rishi Locks Behind Shoulders */}
        <path d="M-32,-98 Q-54,-65 -44,-32 Q-30,-42 -26,-78 Z" fill="#e2e8f0" stroke={OUTLINE} strokeWidth={2.4} />
        <path d="M32,-98 Q54,-65 44,-32 Q30,-42 26,-78 Z" fill="#e2e8f0" stroke={OUTLINE} strokeWidth={2.4} />

        {/* Sculpted Torso, Neck, Sacred Janeu & Rudraksha Mala */}
        <rect x={-10} y={-80} width={20} height={16} rx={5} fill="#fed7aa" stroke={OUTLINE} strokeWidth={2.2} />
        <path d="M-38,-62 Q0,-72 38,-62 L35,10 L-35,10 Z" fill="#fed7aa" stroke={OUTLINE} strokeWidth={3} />
        {/* Subtle Chest Contour & Tilak on Chest */}
        <path d="M-20,-42 Q-10,-35 -2,-40 M2,-40 Q10,-35 20,-42" fill="none" stroke="#ea580c" strokeWidth={1.6} opacity={0.45} />
        <circle cx={0} cy={-44} r={5} fill="#dc2626" stroke="#fde047" strokeWidth={1.5} />
        {/* Three-Strand Sacred Janeu */}
        <path d="M-26,-64 L26,8" stroke="#fffbeb" strokeWidth={3.5} />
        <path d="M-22,-65 L30,7" stroke="#fef08a" strokeWidth={1.5} />
        {/* Rudraksha Necklace Beads */}
        {[-16, -8, 0, 8, 16].map((bx, i) => (
          <circle key={i} cx={bx} cy={-60 + Math.abs(bx) * -0.2 + 8} r={3.6} fill="#78350f" stroke={OUTLINE} strokeWidth={1.2} />
        ))}

        {/* Layered Saffron Silk Angavastra Shawl with Zari Trim */}
        <path d="M-38,-64 Q-52,-12 -38,44 L-18,38 Q-28,-12 -22,-64 Z" fill="#ea580c" stroke={OUTLINE} strokeWidth={2.6} />
        <path d="M-34,36 L-20,32" stroke="#fde047" strokeWidth={4} />
        <path d="M38,-64 Q52,-12 38,44 L18,38 Q28,-12 22,-64 Z" fill="#ea580c" stroke={OUTLINE} strokeWidth={2.6} />
        <path d="M34,36 L20,32" stroke="#fde047" strokeWidth={4} />

        {/* Right Arm Cradling Ornate Golden Mahati Veena */}
        <g transform={`translate(-36, -52) rotate(${gesture === "playing" ? -14 : 6})`}>
          <path d="M0,0 Q-28,28 -20,56" fill="none" stroke={OUTLINE} strokeWidth={17} strokeLinecap="round" />
          <path d="M0,0 Q-28,28 -20,56" fill="none" stroke="#fed7aa" strokeWidth={11} strokeLinecap="round" />
          <circle cx={-20} cy={58} r={7.5} fill="#fed7aa" stroke={OUTLINE} strokeWidth={2} />
          {/* Ornate Mahati Veena with Twin Carved Gourds, Frets & Lotus Scroll */}
          <g transform="translate(-14, 42) rotate(-32)">
            {/* Lower Gourd */}
            <circle cx={-16} cy={44} r={24} fill="#b45309" stroke={OUTLINE} strokeWidth={2.6} />
            <circle cx={-16} cy={44} r={15} fill="#fbbf24" stroke={OUTLINE} strokeWidth={1.8} />
            <circle cx={-16} cy={44} r={6} fill="#78350f" />
            {/* Neck Dandi & Frets */}
            <rect x={-20} y={-62} width={9} height={104} rx={3} fill="#78350f" stroke={OUTLINE} strokeWidth={2.2} />
            {[-42, -26, -10, 6, 20].map((fy) => (
              <line key={fy} x1={-21} y1={fy} x2={-10} y2={fy} stroke="#fde047" strokeWidth={2} />
            ))}
            {/* Upper Resonator Gourd + Peacock/Lotus Finial */}
            <circle cx={-15} cy={-64} r={16} fill="#d97706" stroke={OUTLINE} strokeWidth={2.5} />
            <circle cx={-15} cy={-64} r={8} fill="#fef3c7" stroke={OUTLINE} strokeWidth={1.5} />
            <path d="M-15,-80 Q-6,-98 -18,-96 Q-24,-90 -15,-80 Z" fill="#fbbf24" stroke={OUTLINE} strokeWidth={1.8} />
            {/* Strings */}
            <line x1={-17.5} y1={-56} x2={-17.5} y2={44} stroke="#fef08a" strokeWidth={1.3} />
            <line x1={-13.5} y1={-56} x2={-13.5} y2={44} stroke="#fef08a" strokeWidth={1.3} />
          </g>
        </g>

        {/* Left Arm (Expressive Hand + Brass Khartal Clappers) */}
        <g transform={`translate(36, -52) rotate(${gesture === "denying" ? -38 + handWave : -10 + handWave * 0.5})`}>
          <path d="M0,0 Q28,16 42,-10" fill="none" stroke={OUTLINE} strokeWidth={17} strokeLinecap="round" />
          <path d="M0,0 Q28,16 42,-10" fill="none" stroke="#fed7aa" strokeWidth={11} strokeLinecap="round" />
          {/* Golden Wristlet */}
          <circle cx={38} cy={-4} r={6} fill="none" stroke="#fbbf24" strokeWidth={3} />
          <circle cx={44} cy={-14} r={8.5} fill="#fed7aa" stroke={OUTLINE} strokeWidth={2.2} />
          {gesture !== "denying" && (
            <g transform="translate(45, -28) rotate(12)">
              <rect x={-5} y={-12} width={11} height={26} rx={3} fill="#92400e" stroke="#fde047" strokeWidth={1.8} />
              <circle cx={0.5} cy={-4} r={4} fill="#fbbf24" />
              <circle cx={0.5} cy={7} r={4} fill="#fbbf24" />
            </g>
          )}
        </g>

        {/* Sculpted Sage Head, Shikha Topknot, Vaishnav Tilak & Expressive Face */}
        <g transform="translate(0, -106)">
          {/* Rudraksha Earrings */}
          <circle cx={-31} cy={6} r={5.5} fill="#78350f" stroke="#fde047" strokeWidth={1.5} />
          <circle cx={31} cy={6} r={5.5} fill="#78350f" stroke="#fde047" strokeWidth={1.5} />
          {/* Face Oval */}
          <ellipse cx={0} cy={0} rx={29} ry={33} fill="#fed7aa" stroke={OUTLINE} strokeWidth={3} />
          {/* Silver Hairline & Flowing Shikha Topknot */}
          <path d="M-29,-12 Q-20,-34 0,-34 Q20,-34 29,-12 Q16,-24 0,-22 Q-16,-24 -29,-12 Z" fill="#f1f5f9" stroke={OUTLINE} strokeWidth={2} />
          <path d="M-10,-32 Q2,-64 24,-46 Q10,-34 10,-28 Z" fill="#1e293b" stroke={OUTLINE} strokeWidth={2.5} />
          <circle cx={2} cy={-34} r={8.5} fill="#fffbeb" stroke="#fbbf24" strokeWidth={2} />
          {/* Glowing Urdhva Pundra Tilak */}
          <path d="M-5,-23 L0,-8 L5,-23" fill="none" stroke="#fef08a" strokeWidth={3.4} strokeLinecap="round" />
          <line x1={0} y1={-22} x2={0} y2={-9} stroke="#dc2626" strokeWidth={2.2} />
          {/* Expressive Brows & Almond Eyes */}
          <path d="M-17,-9 Q-11,-14 -4,-9" fill="none" stroke={OUTLINE} strokeWidth={2.2} />
          <path d="M4,-9 Q11,-14 17,-9" fill="none" stroke={OUTLINE} strokeWidth={2.2} />
          <ellipse cx={-10} cy={-2} rx={5.2} ry={3.8} fill="#ffffff" stroke={OUTLINE} strokeWidth={1.4} />
          <circle cx={-10} cy={-2} r={2.5} fill={OUTLINE} />
          <ellipse cx={10} cy={-2} rx={5.2} ry={3.8} fill="#ffffff" stroke={OUTLINE} strokeWidth={1.4} />
          <circle cx={10} cy={-2} r={2.5} fill={OUTLINE} />
          {/* Sage White Mustache & Speaking Mouth */}
          <path d="M-13,10 Q-5,5 0,9 Q5,5 13,10" fill="none" stroke="#f8fafc" strokeWidth={3.8} strokeLinecap="round" />
          <ellipse cx={0} cy={16} rx={6.5} ry={mouthOpen * 0.45} fill="#7f1d1d" stroke={OUTLINE} strokeWidth={1.8} />
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
