import React from "react";

/**
 * Richly detailed 2.5D illustrated Cobra / Naga components for Mahadev:
 * - CobraHood: Flared king cobra hood with ventral rib plates, spectacle (U/Trishul) dorsal markings,
 *   brow scales, glowing amber/crimson eyes, white fangs, and optional forked tongue.
 * - VasukiNeckSerpent: Thick coiled neck serpent with overlapping scales & gold belly bands.
 * - PanchmukhiNagaGarland: Five-headed royal Naga garland with flared hoods & jewel-like eyes.
 * - WaistSerpentBelt: Coiled emerald-gold Naga belt around Baghambar with tail & proud side hood.
 * - CrownForeheadCobra: Sleek emerald-gold cobra coiled across Mahadev's Jata brow.
 * - SarpSehraVeil: Undulating slender serpents hanging from the crown with dangling scorpions.
 */

export const CobraHood: React.FC<{
  scale?: number;
  bodyColor?: string;
  hoodColor?: string;
  bellyColor?: string;
  markColor?: string;
  eyeColor?: string;
  tongueOut?: boolean;
  rotation?: number;
}> = ({
  scale = 1,
  bodyColor = "#047857",
  hoodColor = "#065f46",
  bellyColor = "#fde047",
  markColor = "#fef08a",
  eyeColor = "#ef4444",
  tongueOut = true,
  rotation = 0,
}) => (
  <g transform={`rotate(${rotation}) scale(${scale})`}>
    {/* Outer Flared Cobra Hood with Dark Ink Contour */}
    <path
      d="M 0,20 C -14,12 -22,-2 -18,-17 C -14,-28 -6,-34 0,-34 C 6,-34 14,-28 18,-17 C 22,-2 14,12 0,20 Z"
      fill={hoodColor}
      stroke="#0b1120"
      strokeWidth={2.4}
    />
    {/* Inner Ventral Ribbed Neck Belly */}
    <path
      d="M 0,18 C -7,10 -10,-2 -8,-14 C -6,-21 -3,-25 0,-25 C 3,-25 6,-21 8,-14 C 10,-2 7,10 0,18 Z"
      fill={bellyColor}
      stroke="#0b1120"
      strokeWidth={1.3}
      opacity={0.92}
    />
    {/* Horizontal Belly Scale Ribs */}
    {[-12, -6, 0, 6, 12].map((ry, idx) => (
      <line
        key={idx}
        x1={-7 + Math.abs(ry) * 0.22}
        y1={ry}
        x2={7 - Math.abs(ry) * 0.22}
        y2={ry}
        stroke="#92400e"
        strokeWidth={1.2}
        opacity={0.75}
      />
    ))}
    {/* Spectacle / U-Shaped Naga Hood Crest Markings */}
    <path
      d="M -11,-12 Q -12,-21 -5,-22 M 11,-12 Q 12,-21 5,-22"
      fill="none"
      stroke={markColor}
      strokeWidth={2}
      strokeLinecap="round"
    />
    {/* Sculpted Cobra Head & Brow Crown */}
    <path
      d="M -9,-19 Q 0,-32 9,-19 Q 7,-9 0,-7 Q -7,-9 -9,-19 Z"
      fill={bodyColor}
      stroke="#0b1120"
      strokeWidth={2}
    />
    {/* Fierce Glowing Slit Eyes */}
    <ellipse cx={-4.6} cy={-18} rx={2.5} ry={1.8} fill="#fef08a" stroke="#0b1120" strokeWidth={0.9} />
    <circle cx={-4.6} cy={-18} r={1.1} fill={eyeColor} />
    <ellipse cx={4.6} cy={-18} rx={2.5} ry={1.8} fill="#fef08a" stroke="#0b1120" strokeWidth={0.9} />
    <circle cx={4.6} cy={-18} r={1.1} fill={eyeColor} />
    {/* Tiny Sharp Fangs */}
    <polygon points="-4,-11 -2.5,-6 -1,-11" fill="#ffffff" />
    <polygon points="1,-11 2.5,-6 4,-11" fill="#ffffff" />
    {/* Forked Crimson Tongue */}
    {tongueOut && (
      <g>
        <path d="M 0,-29 L 0,-38 M 0,-38 L -3.5,-43 M 0,-38 L 3.5,-43" stroke="#ef4444" strokeWidth={1.8} strokeLinecap="round" />
      </g>
    )}
  </g>
);

export const VasukiNeckSerpent: React.FC<{ t: number }> = ({ t }) => {
  const sway = Math.sin(t * 2.7) * 7;
  const tongue = Math.sin(t * 5.2) > 0.15;

  return (
    <g>
      {/* Heavy Coiled Back Loop around Shoulders */}
      <path
        d="M -38,-58 C -52,-30 -16,-14 14,-20 C 44,-26 52,-48 36,-62"
        fill="none"
        stroke="#0b1120"
        strokeWidth={18}
        strokeLinecap="round"
      />
      <path
        d="M -38,-58 C -52,-30 -16,-14 14,-20 C 44,-26 52,-48 36,-62"
        fill="none"
        stroke="#1e293b"
        strokeWidth={12}
        strokeLinecap="round"
      />
      {/* Overlapping Scale Highlights & Golden Rings */}
      <path
        d="M -34,-54 C -46,-30 -14,-16 14,-21 C 39,-26 47,-45 34,-58"
        fill="none"
        stroke="#64748b"
        strokeWidth={4}
        strokeDasharray="4 6"
        strokeLinecap="round"
      />
      {/* Coiled Tail Hanging Down Left Chest */}
      <path
        d="M -34,-50 Q -50,-28 -44,-6 Q -38,10 -28,16"
        fill="none"
        stroke="#0b1120"
        strokeWidth={11}
        strokeLinecap="round"
      />
      <path
        d="M -34,-50 Q -50,-28 -44,-6 Q -38,10 -28,16"
        fill="none"
        stroke="#334155"
        strokeWidth={7}
        strokeLinecap="round"
      />
      {/* Raised Neck & Flared Vasuki Hood on Right Shoulder */}
      <path
        d={`M 36,-56 Q ${48 + sway * 0.25},-70 ${40 + sway * 0.45},-86`}
        fill="none"
        stroke="#0b1120"
        strokeWidth={14}
        strokeLinecap="round"
      />
      <path
        d={`M 36,-56 Q ${48 + sway * 0.25},-70 ${40 + sway * 0.45},-86`}
        fill="none"
        stroke="#334155"
        strokeWidth={9.5}
        strokeLinecap="round"
      />
      <g transform={`translate(${40 + sway * 0.45}, -90)`}>
        <CobraHood
          scale={1.08}
          bodyColor="#334155"
          hoodColor="#1e293b"
          bellyColor="#cbd5e1"
          markColor="#fbbf24"
          eyeColor="#ef4444"
          tongueOut={tongue}
          rotation={sway}
        />
      </g>
    </g>
  );
};

export const PanchmukhiNagaGarland: React.FC<{ t: number; progress: number }> = ({ t, progress }) => {
  if (progress <= 0.05) return null;
  const tongue = Math.sin(t * 5.8) > 0;
  const heads = [
    { hx: -44, hy: -22, rot: -36, sc: 0.88 },
    { hx: -23, hy: -34, rot: -18, sc: 0.96 },
    { hx: 0, hy: -39, rot: 0, sc: 1.08 },
    { hx: 23, hy: -34, rot: 18, sc: 0.96 },
    { hx: 44, hy: -22, rot: 36, sc: 0.88 },
  ];

  return (
    <g opacity={progress} transform={`translate(0, 6) scale(${0.78 + progress * 0.22})`}>
      {/* Thick Coiled Garland Body */}
      <path d="M -46,-56 Q 0,-4 46,-56" fill="none" stroke="#0b1120" strokeWidth={20} strokeLinecap="round" />
      <path d="M -46,-56 Q 0,-4 46,-56" fill="none" stroke="#065f46" strokeWidth={14} strokeLinecap="round" />
      <path d="M -42,-54 Q 0,-7 42,-54" fill="none" stroke="#fde047" strokeWidth={4} strokeDasharray="5 6" strokeLinecap="round" />
      {/* Secondary Woven Coil */}
      <path d="M -38,-46 Q 0,4 38,-46" fill="none" stroke="#0b1120" strokeWidth={12} strokeLinecap="round" />
      <path d="M -38,-46 Q 0,4 38,-46" fill="none" stroke="#047857" strokeWidth={8} strokeLinecap="round" />

      {/* 5 Distinct Flared Cobra Necks & Hoods Fanning Out! */}
      {heads.map((h, idx) => {
        const sway = Math.sin(t * 3.8 + idx * 0.9) * 5;
        return (
          <g key={idx}>
            <path
              d={`M ${h.hx * 0.65},-24 Q ${h.hx * 0.9},${h.hy + 16} ${h.hx},${h.hy + 6}`}
              fill="none"
              stroke="#0b1120"
              strokeWidth={11}
              strokeLinecap="round"
            />
            <path
              d={`M ${h.hx * 0.65},-24 Q ${h.hx * 0.9},${h.hy + 16} ${h.hx},${h.hy + 6}`}
              fill="none"
              stroke="#047857"
              strokeWidth={7}
              strokeLinecap="round"
            />
            <g transform={`translate(${h.hx}, ${h.hy})`}>
              <CobraHood
                scale={h.sc}
                bodyColor="#10b981"
                hoodColor="#047857"
                bellyColor="#fef08a"
                markColor="#fde047"
                eyeColor="#dc2626"
                tongueOut={tongue || idx === 2}
                rotation={h.rot + sway}
              />
            </g>
          </g>
        );
      })}
    </g>
  );
};

export const WaistSerpentBelt: React.FC<{ t: number; opacity?: number }> = ({ t, opacity = 1 }) => {
  if (opacity <= 0.05) return null;
  const sway = Math.sin(t * 2.8) * 8;
  const waveY = Math.sin(t * 4) * 3;
  const tongue = Math.sin(t * 5.2) > 0.1;

  return (
    <g opacity={opacity}>
      {/* Double-Wrapped Cobra Body around Waist */}
      <path d={`M -56,2 Q 0,${22 + waveY} 56,2`} fill="none" stroke="#0b1120" strokeWidth={22} strokeLinecap="round" />
      <path d={`M -56,2 Q 0,${22 + waveY} 56,2`} fill="none" stroke="#059669" strokeWidth={15} strokeLinecap="round" />
      <path d={`M -50,2 Q 0,${20 + waveY} 50,2`} fill="none" stroke="#fde047" strokeWidth={4.5} strokeDasharray="5 6" strokeLinecap="round" />
      {/* Tapering Serpent Tail Curling on Left Hip */}
      <path
        d={`M -54,4 Q -74,14 -72,34 Q -68,48 -56,52`}
        fill="none"
        stroke="#0b1120"
        strokeWidth={11}
        strokeLinecap="round"
      />
      <path
        d={`M -54,4 Q -74,14 -72,34 Q -68,48 -56,52`}
        fill="none"
        stroke="#10b981"
        strokeWidth={7}
        strokeLinecap="round"
      />
      {/* Rising Serpent Neck & Proud Flared Cobra Hood on Right Hip */}
      <path
        d={`M 54,4 Q 78,-2 ${76 + sway * 0.35},-22`}
        fill="none"
        stroke="#0b1120"
        strokeWidth={14}
        strokeLinecap="round"
      />
      <path
        d={`M 54,4 Q 78,-2 ${76 + sway * 0.35},-22`}
        fill="none"
        stroke="#059669"
        strokeWidth={9.5}
        strokeLinecap="round"
      />
      <g transform={`translate(${76 + sway * 0.4}, -26)`}>
        <CobraHood
          scale={1.32}
          bodyColor="#10b981"
          hoodColor="#047857"
          bellyColor="#fde047"
          markColor="#fef08a"
          eyeColor="#dc2626"
          tongueOut={tongue}
          rotation={22 + sway}
        />
      </g>
    </g>
  );
};

export const CrownForeheadCobra: React.FC<{ t: number; opacity?: number }> = ({ t, opacity = 1 }) => {
  if (opacity <= 0.05) return null;
  const bob = Math.sin(t * 4.5) * 2.5;
  const sway = Math.sin(t * 3.1) * 5;
  const tongue = Math.sin(t * 5.6) > -0.1;

  return (
    <g opacity={opacity} transform="translate(0, -28)">
      {/* Coiled Emerald-Gold Headband Serpent */}
      <path d="M -36,0 Q 0,11 36,0" fill="none" stroke="#0b1120" strokeWidth={16} strokeLinecap="round" />
      <path d="M -36,0 Q 0,11 36,0" fill="none" stroke="#065f46" strokeWidth={11} strokeLinecap="round" />
      <path d="M -31,1 Q 0,10 31,1" fill="none" stroke="#fde047" strokeWidth={3.8} strokeDasharray="4 5" strokeLinecap="round" />
      {/* Tail Curl on Left */}
      <path d="M -34,0 Q -44,-10 -38,-20" fill="none" stroke="#0b1120" strokeWidth={8} strokeLinecap="round" />
      <path d="M -34,0 Q -44,-10 -38,-20" fill="none" stroke="#10b981" strokeWidth={5} strokeLinecap="round" />
      {/* Towering Forehead Cobra Hood */}
      <g transform={`translate(0, ${-22 - bob})`}>
        <CobraHood
          scale={1.25}
          bodyColor="#10b981"
          hoodColor="#047857"
          bellyColor="#fef08a"
          markColor="#fde047"
          eyeColor="#ef4444"
          tongueOut={tongue}
          rotation={sway}
        />
      </g>
    </g>
  );
};

export const ScorpionIcon: React.FC<{ x: number; y: number; sway: number; scale?: number }> = ({
  x,
  y,
  sway,
  scale = 1,
}) => (
  <g transform={`translate(${x}, ${y}) rotate(${sway}) scale(${scale})`}>
    <ellipse cx={0} cy={6} rx={4.8} ry={8.2} fill="#1e1b4b" stroke="#fbbf24" strokeWidth={1.5} />
    <path d="M 0,13 Q 11,20 8,28 Q 3,31 0,25" fill="none" stroke="#f59e0b" strokeWidth={2.6} strokeLinecap="round" />
    <circle cx={0} cy={24} r={2.2} fill="#ef4444" />
    <path d="M -3,-1 Q -10,-7 -7,-12 M 3,-1 Q 10,-7 7,-12" fill="none" stroke="#fbbf24" strokeWidth={2} strokeLinecap="round" />
  </g>
);

export const SarpSehraVeil: React.FC<{ t: number; sehraProgress: number; bichhuProgress: number }> = ({
  t,
  sehraProgress,
  bichhuProgress,
}) => {
  if (sehraProgress <= 0.05) return null;
  const strands = [-42, -31, -21, 21, 31, 42];

  return (
    <g opacity={sehraProgress}>
      {strands.map((sx, idx) => {
        const len = (54 + (idx % 2) * 15) * sehraProgress;
        const sway = Math.sin(t * 3.8 + idx * 0.9) * 5;
        const tipX = sx + sway * 1.4;
        const tipY = -24 + len;
        const snakeBody = idx % 2 === 0 ? "#10b981" : "#eab308";

        return (
          <g key={idx}>
            {/* Undulating Slender Snake Strand */}
            <path
              d={`M ${sx * 0.85},-24 Q ${sx + sway},${-24 + len * 0.45} ${tipX},${tipY}`}
              fill="none"
              stroke="#0b1120"
              strokeWidth={7.5}
              strokeLinecap="round"
            />
            <path
              d={`M ${sx * 0.85},-24 Q ${sx + sway},${-24 + len * 0.45} ${tipX},${tipY}`}
              fill="none"
              stroke={snakeBody}
              strokeWidth={4.5}
              strokeLinecap="round"
            />
            <path
              d={`M ${sx * 0.85},-24 Q ${sx + sway},${-24 + len * 0.45} ${tipX},${tipY}`}
              fill="none"
              stroke="#fef08a"
              strokeWidth={1.6}
              strokeDasharray="3 4"
            />
            {/* Tiny Diamond Serpent Head at the Bottom of Each Strand */}
            <ellipse cx={tipX} cy={tipY + 3} rx={3.6} ry={4.6} fill={snakeBody} stroke="#0b1120" strokeWidth={1.4} />
            <circle cx={tipX - 1.3} cy={tipY + 3} r={0.9} fill="#ef4444" />
            <circle cx={tipX + 1.3} cy={tipY + 3} r={0.9} fill="#ef4444" />
            {/* Forked Tongue */}
            <path
              d={`M ${tipX},${tipY + 7} L ${tipX},${tipY + 12} M ${tipX},${tipY + 12} L ${tipX - 2.5},${tipY + 15} M ${tipX},${tipY + 12} L ${tipX + 2.5},${tipY + 15}`}
              stroke="#ef4444"
              strokeWidth={1.5}
              strokeLinecap="round"
            />
            {/* Live Golden Scorpion Hanging from the Snake's Forked Tongue! */}
            {bichhuProgress > 0.15 && (
              <g opacity={bichhuProgress}>
                <ScorpionIcon x={tipX} y={tipY + 16} sway={sway * 1.5} scale={0.58} />
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
};

/**
 * Richly Detailed 2.5D Illustrated Mahadev Trishul with Damaru, Lotus Collar,
 * Engraved Tripundra Blade, Rudraksha Grip & Fluttering Crimson Pataka Ribbon.
 * Designed to be held directly inside Mahadev's hand so it moves naturally with his arm!
 */
export const OrnateTrishulWithDamaru: React.FC<{
  t: number;
  x?: number;
  y?: number;
  rotation?: number;
  scale?: number;
}> = ({ t, x = 0, y = 0, rotation = 0, scale = 1 }) => {
  const damaruSwing = Math.sin(t * 4.8) * 9;
  const ribbonWave = Math.sin(t * 5.6) * 8;
  const auraPulse = 0.22 + 0.1 * Math.sin(t * 3.8);

  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotation}) scale(${scale})`}>
      {/* Subtle Sacred Metallic Glow Behind Prongs */}
      <circle cx={0} cy={-188} r={44} fill="#bae6fd" opacity={auraPulse} />

      {/* Main Ornamental Shaft (Danda) with Gold Bands & Pointed Ferrule Base */}
      <rect x={-5.5} y={-158} width={11} height={282} rx={5} fill="#0b1120" />
      <rect x={-3.8} y={-156} width={7.6} height={278} rx={3.5} fill="#cbd5e1" />
      <rect x={0.5} y={-156} width={3.2} height={278} rx={1.5} fill="#64748b" opacity={0.65} />

      {/* Bottom Spear Ferrule Tip */}
      <polygon points="-5,120 5,120 0,144" fill="#fbbf24" stroke="#0b1120" strokeWidth={2} />

      {/* Ornamental Golden Grip Rings & Rudraksha Wrap */}
      {[-112, -48, 8, 66, 114].map((ry, idx) => (
        <g key={idx}>
          <rect x={-6.5} y={ry - 3} width={13} height={6} rx={2.5} fill="#fbbf24" stroke="#0b1120" strokeWidth={1.6} />
          <line x1={-5} y1={ry} x2={5} y2={ry} stroke="#fef08a" strokeWidth={1.4} />
        </g>
      ))}
      <path d="M -5,-12 Q 5,-6 -5,0 Q 5,6 -5,12" fill="none" stroke="#9a3412" strokeWidth={3.5} strokeLinecap="round" />

      {/* Fluttering Sacred Crimson Silk Ribbon (Pataka) Tied Below Damaru */}
      <path
        d={`M -5,-138 Q ${-28 + ribbonWave},-122 ${-22 - ribbonWave * 0.6},-92 Q -12,-112 -5,-130 Z`}
        fill="#dc2626"
        stroke="#0b1120"
        strokeWidth={1.8}
      />
      <path
        d={`M -5,-136 Q ${-22 + ribbonWave * 0.8},-120 ${-18 - ribbonWave * 0.4},-98`}
        fill="none"
        stroke="#fde047"
        strokeWidth={1.8}
        strokeDasharray="4 4"
      />

      {/* Sculpted Golden Lotus Collar (Padma-Peeth) */}
      <g transform="translate(0, -158)">
        <ellipse cx={0} cy={4} rx={13} ry={5.5} fill="#d97706" stroke="#0b1120" strokeWidth={2} />
        <path d="M -14,2 Q -8,-10 0,-2 Q 8,-10 14,2 Z" fill="#fbbf24" stroke="#0b1120" strokeWidth={2} />
        <circle cx={0} cy={2} r={3.5} fill="#ef4444" stroke="#0b1120" strokeWidth={1.2} />
      </g>

      {/* Ornate Three-Pronged Trishul Head with Beveled 2.5D Steel Shading */}
      <g transform="translate(0, -162)">
        {/* Outer Curved Crescent Prongs */}
        <path
          d="M -4,0 C -34,-2 -44,-34 -34,-66 C -30,-44 -18,-26 -4,-22"
          fill="#94a3b8"
          stroke="#0b1120"
          strokeWidth={2.6}
          strokeLinejoin="round"
        />
        <path
          d="M -34,-66 C -29,-45 -18,-29 -6,-23"
          fill="none"
          stroke="#f8fafc"
          strokeWidth={2.4}
          strokeLinecap="round"
        />
        <path
          d="M 4,0 C 34,-2 44,-34 34,-66 C 30,-44 18,-26 4,-22"
          fill="#94a3b8"
          stroke="#0b1120"
          strokeWidth={2.6}
          strokeLinejoin="round"
        />
        <path
          d="M 34,-66 C 29,-45 18,-29 6,-23"
          fill="none"
          stroke="#f8fafc"
          strokeWidth={2.4}
          strokeLinecap="round"
        />

        {/* Central Tall Spear Blade with Light/Shadow Bevel & Tripundra Mark */}
        <polygon points="0,-96 -11,-32 0,-18 11,-32" fill="#e2e8f0" stroke="#0b1120" strokeWidth={2.8} strokeLinejoin="round" />
        <polygon points="0,-96 0,-18 11,-32" fill="#94a3b8" opacity={0.75} />
        <polygon points="0,-96 -11,-32 0,-22" fill="#ffffff" opacity={0.65} />
        <rect x={-5.5} y={-22} width={11} height={24} fill="#cbd5e1" stroke="#0b1120" strokeWidth={2.2} />

        {/* Golden Tripundra Engraved on Center Blade */}
        <line x1={-4.5} y1={-46} x2={4.5} y2={-46} stroke="#fbbf24" strokeWidth={2} strokeLinecap="round" />
        <line x1={-4.5} y1={-41} x2={4.5} y2={-41} stroke="#fbbf24" strokeWidth={2} strokeLinecap="round" />
        <circle cx={0} cy={-35} r={2} fill="#ef4444" />
      </g>

      {/* Swinging Sacred Damaru Tied Below Lotus Collar */}
      <g transform="translate(0, -142)">
        <path d="M -5,0 Q 12,-4 16,6" fill="none" stroke="#ef4444" strokeWidth={3} strokeLinecap="round" />
        <g transform={`translate(17, 12) rotate(${damaruSwing})`}>
          {/* Crimson Bead Striking Cord */}
          <path d={`M 0,4 Q ${-12 + damaruSwing * 0.5},16 ${-6 + damaruSwing},24`} fill="none" stroke="#ef4444" strokeWidth={2.4} strokeLinecap="round" />
          <circle cx={-6 + damaruSwing} cy={25} r={3.6} fill="#fde047" stroke="#0b1120" strokeWidth={1.4} />
          {/* Hourglass Wood & Brass Drum */}
          <polygon points="-15,-13 15,-13 0,0" fill="#b45309" stroke="#0b1120" strokeWidth={2.2} />
          <polygon points="-15,13 15,13 0,0" fill="#92400e" stroke="#0b1120" strokeWidth={2.2} />
          {/* Ivory Parchment Drumheads & Gold Lacing */}
          <ellipse cx={0} cy={-13} rx={15} ry={4} fill="#fef3c7" stroke="#0b1120" strokeWidth={1.8} />
          <ellipse cx={0} cy={13} rx={15} ry={4} fill="#fef3c7" stroke="#0b1120" strokeWidth={1.8} />
          <line x1={-12} y1={-11} x2={12} y2={11} stroke="#fde047" strokeWidth={1.6} />
          <line x1={12} y1={-11} x2={-12} y2={11} stroke="#fde047" strokeWidth={1.6} />
          <rect x={-4} y={-2.5} width={8} height={5} rx={2} fill="#fbbf24" stroke="#0b1120" strokeWidth={1.4} />
        </g>
      </g>
    </g>
  );
};
