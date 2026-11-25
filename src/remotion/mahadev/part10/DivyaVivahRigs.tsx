import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { breathe, clothWave, fireTurbulence } from "../motion/physics";

const OUTLINE = "#1a0b2e";

// Regal King Himavant (Father of Parvati)
export const HimavantRig: React.FC<{
  x: number;
  y: number;
  scale?: number;
  foldedHands?: boolean;
  speakingEnergy?: number;
}> = ({ x, y, scale = 1, foldedHands = true, speakingEnergy = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const br = breathe(frame / fps, 0.3, 2.5);
  const mouthOpen = 1.5 + speakingEnergy * 4.5;

  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%, -50%) scale(${scale})`, pointerEvents: "none" }}>
      <svg width="210" height="330" viewBox="-105 -200 210 330" overflow="visible">
        <ellipse cx={0} cy={120} rx={52} ry={12} fill="#14071e" opacity={0.45} />
        <g transform={`translate(0, ${br.chestExpand * 0.4})`}>
          {/* Royal Silk Dhoti */}
          <path d="M-34,12 L34,12 L42,114 Q0,122 -42,114 Z" fill="#fef3c7" stroke={OUTLINE} strokeWidth={3} />
          <path d="M-38,104 Q0,112 38,104" fill="none" stroke="#d97706" strokeWidth={5} />
          {/* Royal Golden-Saffron Angavastram & Torso */}
          <path d="M-32,-60 Q0,-68 32,-60 L36,14 Q0,20 -36,14 Z" fill="#b45309" stroke={OUTLINE} strokeWidth={3} />
          <path d="M-32,-56 L26,12" stroke="#fbbf24" strokeWidth={12} />
          <path d="M-22,-54 Q0,-22 22,-54" fill="none" stroke="#fef08a" strokeWidth={4.5} />
          {/* Arms (Namaste Folded Hands or Raised) */}
          {foldedHands ? (
            <>
              <path d="M-32,-48 Q-46,-10 -8,-18" fill="none" stroke="#fde68a" strokeWidth={13} strokeLinecap="round" />
              <path d="M32,-48 Q46,-10 8,-18" fill="none" stroke="#fde68a" strokeWidth={13} strokeLinecap="round" />
              <ellipse cx={0} cy={-20} rx={10} ry={14} fill="#fde68a" stroke={OUTLINE} strokeWidth={2.5} />
            </>
          ) : (
            <>
              <path d="M-32,-48 Q-48,-4 -38,26" fill="none" stroke="#fde68a" strokeWidth={13} strokeLinecap="round" />
              <path d="M32,-48 Q48,-4 38,26" fill="none" stroke="#fde68a" strokeWidth={13} strokeLinecap="round" />
            </>
          )}
          {/* Head, Royal White Beard & Himalayan Golden Crown */}
          <circle cx={0} cy={-94} r={28} fill="#fde68a" stroke={OUTLINE} strokeWidth={3} />
          {/* Flowing Silver-White Beard & Moustache */}
          <path d="M-22,-84 Q0,-46 22,-84 Q12,-66 0,-64 Q-12,-66 -22,-84 Z" fill="#f8fafc" stroke={OUTLINE} strokeWidth={2.4} />
          <path d="M-16,-84 Q-8,-90 0,-84 Q8,-90 16,-84" fill="none" stroke="#ffffff" strokeWidth={3.5} />
          {/* Eyes & Tilak */}
          <ellipse cx={-9} cy={-98} rx={4.2} ry={3.2} fill="#ffffff" stroke={OUTLINE} strokeWidth={1.3} />
          <circle cx={-9} cy={-98} r={2} fill={OUTLINE} />
          <ellipse cx={9} cy={-98} rx={4.2} ry={3.2} fill="#ffffff" stroke={OUTLINE} strokeWidth={1.3} />
          <circle cx={9} cy={-98} r={2} fill={OUTLINE} />
          <line x1={0} y1={-114} x2={0} y2={-102} stroke="#dc2626" strokeWidth={3} />
          <ellipse cx={0} cy={-78} rx={4} ry={mouthOpen * 0.45} fill="#7f1d1d" />
          {/* Himalayan Mountain-Peaked Crown */}
          <path d="M-26,-114 L-16,-146 L0,-162 L16,-146 L26,-114 Z" fill="#fbbf24" stroke={OUTLINE} strokeWidth={3} />
          <circle cx={0} cy={-132} r={5} fill="#ef4444" stroke={OUTLINE} strokeWidth={1.5} />
        </g>
      </svg>
    </div>
  );
};

// Mata Parvati Bridal Rig with Crimson Banarasi Lehenga & Lotus-Marigold Jaimala Garland
export const MataParvatiBridalRig: React.FC<{
  x: number;
  y: number;
  scale?: number;
  holdingJaimala?: boolean;
}> = ({ x, y, scale = 1, holdingJaimala = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const br = breathe(t, 0.5, 2.4);
  const chunriWave = clothWave(t, 0.8, 6);

  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%, -50%) scale(${scale})`, pointerEvents: "none" }}>
      <svg width="240" height="340" viewBox="-120 -200 240 340" overflow="visible">
        <ellipse cx={0} cy={124} rx={58} ry={13} fill="#14071e" opacity={0.45} />
        {/* Soft Golden Divine Aura */}
        <circle cx={0} cy={-72} r={64} fill="#fef08a" opacity={0.18} />
        <g transform={`translate(0, ${br.chestExpand * 0.4})`}>
          {/* Crimson Bridal Chunri Drape */}
          <path d={`M-34,-108 Q${-58 + chunriWave},-20 -46,104 L46,104 Q${58 - chunriWave},-20 34,-108 Z`} fill="#be123c" stroke={OUTLINE} strokeWidth={2.8} />
          {/* Crimson-Gold Banarasi Bridal Lehenga */}
          <path d="M-30,-8 L30,-8 L52,116 Q0,128 -52,116 Z" fill="#9f1239" stroke={OUTLINE} strokeWidth={3.2} />
          <path d="M-48,104 Q0,116 48,104" fill="none" stroke="#fbbf24" strokeWidth={6} />
          <path d="M-45,94 Q0,104 45,94" fill="none" stroke="#fde047" strokeWidth={2.5} strokeDasharray="7 5" />
          {/* Bridal Choli + Gold Dupatta Sash */}
          <path d="M-24,-54 L24,-54 L30,-8 L-30,-8 Z" fill="#e11d48" stroke={OUTLINE} strokeWidth={2.8} />
          <path d="M-24,-52 L28,-8" stroke="#fbbf24" strokeWidth={11} />
          <path d="M-16,-48 Q0,-22 16,-48" fill="none" stroke="#fde047" strokeWidth={5} />
          {/* Arms Holding Jaimala or Folded */}
          {holdingJaimala ? (
            <>
              <path d="M-24,-44 Q-48,-18 -26,0" fill="none" stroke="#fde68a" strokeWidth={11} strokeLinecap="round" />
              <path d="M24,-44 Q48,-18 26,0" fill="none" stroke="#fde68a" strokeWidth={11} strokeLinecap="round" />
              {/* Jaimala Lotus & Marigold Garland */}
              <path d="M-28,-2 Q0,38 28,-2" fill="none" stroke="#f97316" strokeWidth={11} strokeLinecap="round" />
              <path d="M-24,2 Q0,34 24,2" fill="none" stroke="#f43f5e" strokeWidth={6} strokeDasharray="6 6" strokeLinecap="round" />
              <circle cx={0} cy={22} r={7} fill="#fef08a" stroke="#be123c" strokeWidth={2} />
            </>
          ) : (
            <>
              <path d="M-24,-44 Q-44,-14 -6,-16" fill="none" stroke="#fde68a" strokeWidth={11} strokeLinecap="round" />
              <path d="M24,-44 Q44,-14 6,-16" fill="none" stroke="#fde68a" strokeWidth={11} strokeLinecap="round" />
            </>
          )}
          {/* Radiant Face, Maang-Tikka, Nath, Chandbali & Bridal Mukut */}
          <circle cx={0} cy={-86} r={25} fill="#fde68a" stroke={OUTLINE} strokeWidth={3} />
          <path d="M-24,-96 Q0,-122 24,-96 Z" fill="#1e1b4b" stroke={OUTLINE} strokeWidth={2.4} />
          <path d="M-20,-108 L0,-136 L20,-108 Z" fill="#fbbf24" stroke={OUTLINE} strokeWidth={2.6} />
          <circle cx={0} cy={-106} r={4} fill="#ef4444" stroke={OUTLINE} strokeWidth={1.2} />
          <circle cx={0} cy={-96} r={3.5} fill="#dc2626" />
          {/* Eyes & Serene Smile */}
          <ellipse cx={-9} cy={-86} rx={4.2} ry={3.2} fill="#ffffff" stroke={OUTLINE} strokeWidth={1.2} />
          <circle cx={-9} cy={-86} r={2} fill={OUTLINE} />
          <ellipse cx={9} cy={-86} rx={4.2} ry={3.2} fill="#ffffff" stroke={OUTLINE} strokeWidth={1.2} />
          <circle cx={9} cy={-86} r={2} fill={OUTLINE} />
          <path d="M-7,-73 Q0,-67 7,-73" fill="none" stroke="#9f1239" strokeWidth={2.4} strokeLinecap="round" />
          {/* Pearl Nath & Gold Chandbali */}
          <circle cx={-12} cy={-78} r={6} fill="none" stroke="#fbbf24" strokeWidth={2} />
          <circle cx={-26} cy={-80} r={5} fill="#fbbf24" stroke={OUTLINE} strokeWidth={1.5} />
          <circle cx={26} cy={-80} r={5} fill="#fbbf24" stroke={OUTLINE} strokeWidth={1.5} />
        </g>
      </svg>
    </div>
  );
};

// Divya Saumya Mahadev ("करोड़ों कामदेवों को लजाने वाला सुंदर, सौम्य, दिव्य रूप")
export const DivyaSaumyaMahadevRig: React.FC<{
  x: number;
  y: number;
  scale?: number;
  auraBoost?: number;
  extendingHand?: boolean;
}> = ({ x, y, scale = 1, auraBoost = 1, extendingHand = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const br = breathe(t, 0, 2.5);
  const haloSpin = t * 14;

  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%, -50%) scale(${scale})`, pointerEvents: "none" }}>
      <svg width="260" height="360" viewBox="-130 -220 260 360" overflow="visible">
        <ellipse cx={0} cy={126} rx={62} ry={14} fill="#14071e" opacity={0.45} />
        {/* Radiant Cosmic Golden-Blue Halo */}
        <g transform={`translate(0, -88) rotate(${haloSpin})`} opacity={0.28 * auraBoost}>
          <circle cx={0} cy={0} r={86} fill="#fef08a" />
          <circle cx={0} cy={0} r={70} fill="none" stroke="#fbbf24" strokeWidth={4} strokeDasharray="12 8" />
        </g>
        <g transform={`translate(0, ${br.chestExpand * 0.4})`}>
          {/* Royal Golden Pitambar Dhoti */}
          <path d="M-34,12 L34,12 L42,118 Q0,126 -42,118 Z" fill="#f59e0b" stroke={OUTLINE} strokeWidth={3.2} />
          <path d="M-38,108 Q0,116 38,108" fill="none" stroke="#fef08a" strokeWidth={4.5} />
          {/* Serene Azure-Ivory Broad Torso with Pearl & Rudraksha Malas */}
          <path d="M-36,-60 Q0,-68 36,-60 L38,14 Q0,20 -38,14 Z" fill="#93c5fd" stroke={OUTLINE} strokeWidth={3.2} />
          <path d="M-34,-54 L30,12" stroke="#f43f5e" strokeWidth={11} />
          <path d="M-24,-54 Q0,-16 24,-54" fill="none" stroke="#fef08a" strokeWidth={5} />
          <path d="M-20,-54 Q0,-28 20,-54" fill="none" stroke="#92400e" strokeWidth={4} strokeDasharray="4 3" />
          {/* Arms */}
          <path d="M-34,-48 Q-54,-8 -34,20" fill="none" stroke="#93c5fd" strokeWidth={13} strokeLinecap="round" />
          <path
            d={extendingHand ? "M34,-48 Q64,-24 72,-8" : "M34,-48 Q54,-8 34,20"}
            fill="none"
            stroke="#93c5fd"
            strokeWidth={13}
            strokeLinecap="round"
          />
          {/* Wedding Jaimala Around Neck */}
          <path d="M-22,-54 Q0,14 22,-54" fill="none" stroke="#f97316" strokeWidth={8} strokeLinecap="round" />
          {/* Serene Handsome Face, Crescent Moon Crown & Gentle Ganga */}
          <circle cx={0} cy={-94} r={28} fill="#bae6fd" stroke={OUTLINE} strokeWidth={3.2} />
          <path d="M-24,-114 Q0,-156 24,-114 Z" fill="#fbbf24" stroke={OUTLINE} strokeWidth={3} />
          <path d="M8,-132 A11,11 0 1,1 24,-120 A8,8 0 1,0 8,-132 Z" fill="#fef08a" stroke={OUTLINE} strokeWidth={1.6} />
          {/* Gentle Tripundra + Serene Eyes + Warm Smile */}
          <path d="M-12,-107 L12,-107 M-10,-102 L10,-102" stroke="#ffffff" strokeWidth={2.2} />
          <ellipse cx={-10} cy={-93} rx={4.5} ry={3.4} fill="#ffffff" stroke={OUTLINE} strokeWidth={1.2} />
          <circle cx={-10} cy={-93} r={2.1} fill={OUTLINE} />
          <ellipse cx={10} cy={-93} rx={4.5} ry={3.4} fill="#ffffff" stroke={OUTLINE} strokeWidth={1.2} />
          <circle cx={10} cy={-93} r={2.1} fill={OUTLINE} />
          <path d="M-8,-78 Q0,-71 8,-78" fill="none" stroke="#1e3a8a" strokeWidth={2.6} strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
};

// Golden Wedding Mandap Backdrop + Sacred Havan Kund Fire + Pushpa Varsha Flower Rain
export const VivahMandapBackdrop: React.FC<{ showFlowerRain?: boolean }> = ({ showFlowerRain = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const flame = fireTurbulence(frame / fps, 3);

  return (
    <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {/* Warm Festive Celestial Evening Sky */}
      <rect x={0} y={0} width={1920} height={1080} fill="#31103d" />
      <rect x={0} y={0} width={1920} height={640} fill="#581c4f" />
      <circle cx={960} cy={360} r={340} fill="#7e22ce" opacity={0.18} />
      <circle cx={960} cy={360} r={230} fill="#fbbf24" opacity={0.12} />

      {/* Festive Royal Marble Floor */}
      <rect x={0} y={670} width={1920} height={410} fill="#4c0519" />
      <ellipse cx={960} cy={765} rx={680} ry={75} fill="#881337" stroke="#fbbf24" strokeWidth={4} />
      <ellipse cx={960} cy={765} rx={520} ry={52} fill="#9f1239" stroke="#fde047" strokeWidth={2.5} strokeDasharray="12 8" />

      {/* Ornate Golden Mandap Pillars & Banana-Leaf / Marigold Canopy */}
      {[360, 1560].map((px, i) => (
        <g key={i}>
          <rect x={px - 24} y={130} width={48} height={585} fill="#b45309" stroke={OUTLINE} strokeWidth={3.5} />
          <rect x={px - 34} y={685} width={68} height={32} rx={6} fill="#fbbf24" stroke={OUTLINE} strokeWidth={3} />
          <rect x={px - 34} y={120} width={68} height={30} rx={6} fill="#fbbf24" stroke={OUTLINE} strokeWidth={3} />
          {/* Banana Leaf + Marigold Toran on Pillars */}
          <path d={`M${px - 22},320 Q${px - 62},380 ${px - 22},450`} fill="#16a34a" stroke={OUTLINE} strokeWidth={2.5} />
          <path d={`M${px + 22},320 Q${px + 62},380 ${px + 22},450`} fill="#16a34a" stroke={OUTLINE} strokeWidth={2.5} />
        </g>
      ))}
      {/* Mandap Dome Arch */}
      <path d="M330,130 L1590,130 L1470,40 L450,40 Z" fill="#be123c" stroke="#fbbf24" strokeWidth={4} />
      <path d="M360,150 Q960,230 1560,150" fill="none" stroke="#f97316" strokeWidth={14} strokeDasharray="16 14" />
      <path d="M360,150 Q960,230 1560,150" fill="none" stroke="#fde047" strokeWidth={6} strokeDasharray="6 24" />

      {/* Sacred Havan Kund Fire at Center */}
      <g transform="translate(960, 745)">
        <polygon points="-68,26 68,26 52,-10 -52,-10" fill="#b45309" stroke={OUTLINE} strokeWidth={3} />
        <polygon points="-50,-10 50,-10 38,-24 -38,-24" fill="#fbbf24" stroke={OUTLINE} strokeWidth={2.5} />
        <path d={`M-30,-24 Q${flame.leanX * 0.6},${-122 * flame.scaleY} 30,-24 Z`} fill="#f97316" />
        <path d={`M-16,-24 Q${flame.leanX * 0.35},${-88 * flame.scaleY} 16,-24 Z`} fill="#fef08a" />
      </g>
      {/* Auspicious Mangal Kalash Pots beside Mandap Pillars */}
      {[425, 1495].map((kx, i) => (
        <g key={i} transform={`translate(${kx}, 702)`}>
          <ellipse cx={0} cy={14} rx={22} ry={20} fill="#ea580c" stroke={OUTLINE} strokeWidth={2.5} />
          <path d="M-14,-4 Q0,-24 14,-4" fill="#16a34a" stroke={OUTLINE} strokeWidth={2} />
          <circle cx={0} cy={-12} r={8} fill="#78350f" stroke={OUTLINE} strokeWidth={2} />
        </g>
      ))}

      {/* Pushpa Varsha (Falling Lotus & Marigold Petals from Heavens) */}
      {showFlowerRain &&
        Array.from({ length: 28 }).map((_, idx) => {
          const sx = ((idx * 173) % 1840) + 40;
          const sy = ((frame * (3.2 + (idx % 4) * 0.8) + idx * 97) % 920) - 40;
          const rot = frame * 3 + idx * 35;
          const color = idx % 3 === 0 ? "#f43f5e" : idx % 3 === 1 ? "#fbbf24" : "#f97316";
          return (
            <ellipse
              key={idx}
              cx={sx}
              cy={sy}
              rx={10}
              ry={5.5}
              fill={color}
              stroke="#fffbeb"
              strokeWidth={1}
              transform={`rotate(${rot} ${sx} ${sy})`}
              opacity={0.9}
            />
          );
        })}
    </svg>
  );
};
