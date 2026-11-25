import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { breathe, pendulumSwing } from "../motion/physics";

interface MahadevBaratGroomRigProps {
  x: number;
  y: number;
  scale?: number;
  speakingEnergy?: number;
  sehraProgress?: number;      // 0..1 slender serpent veil hanging from crown
  bichhuProgress?: number;     // 0..1 golden scorpions hanging from sehra & ears
  panchmukhiProgress?: number; // 0..1 five-headed serpent garland replacing 1-head Vasuki
  bhasmaGlowProgress?: number; // 0..1 dazzling radiant pyre ash glow across limbs & face
  pose?: "calm" | "heroic" | "marching";
}

const ScorpionIcon: React.FC<{ x: number; y: number; sway: number; scale?: number }> = ({
  x,
  y,
  sway,
  scale = 1,
}) => (
  <g transform={`translate(${x}, ${y}) rotate(${sway}) scale(${scale})`}>
    {/* Body & Segmented Tail curling up with Stinger */}
    <ellipse cx={0} cy={6} rx={4.5} ry={8} fill="#1e1b4b" stroke="#fbbf24" strokeWidth={1.3} />
    <path d="M 0,13 Q 10,20 7,28 Q 3,31 0,25" fill="none" stroke="#f59e0b" strokeWidth={2.5} strokeLinecap="round" />
    <circle cx={0} cy={24} r={2} fill="#ef4444" />
    {/* Claws */}
    <path d="M -3,-1 Q -9,-7 -6,-11 M 3,-1 Q 9,-7 6,-11" fill="none" stroke="#fbbf24" strokeWidth={2} strokeLinecap="round" />
  </g>
);

export const MahadevBaratGroomRig: React.FC<MahadevBaratGroomRigProps> = ({
  x,
  y,
  scale = 1,
  speakingEnergy = 0,
  sehraProgress = 1,
  bichhuProgress = 0,
  panchmukhiProgress = 0,
  bhasmaGlowProgress = 0,
  pose = "heroic",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const br = breathe(t, 0.3, 3.2);
  const snakeSway = pendulumSwing(t, 2.5, 8);
  const marchBounce = pose === "marching" ? Math.abs(Math.sin(t * 5.2)) * -10 : 0;
  const blink = Math.sin(t * 2.1 + 1.4) > 0.965 ? 0.12 : 1;
  const mouthOpen = speakingEnergy * 5;
  const leftArmRot = pose === "marching" ? 18 + Math.sin(t * 5.2) * 14 : 22;
  const rightArmRot = pose === "marching" ? -18 - Math.sin(t * 5.2) * 14 : -18;

  // Aura intensifies dramatically when hot pyre Bhasma is applied!
  const auraR = 170 + bhasmaGlowProgress * 85;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + marchBounce,
        transform: `translate(-50%, -50%) scale(${scale})`,
        transformOrigin: "center center",
        pointerEvents: "none",
        filter: `drop-shadow(0 0 ${22 + bhasmaGlowProgress * 28}px rgba(${bhasmaGlowProgress > 0.3 ? "254, 249, 195" : "186, 230, 253"}, ${0.5 + bhasmaGlowProgress * 0.42}))`,
      }}
    >
      <svg width={620} height={700} viewBox="-310 -350 620 700" overflow="visible">
        <defs>
          <radialGradient id="p3Aura" cx="50%" cy="40%" r="52%">
            <stop offset="0%" stopColor={bhasmaGlowProgress > 0.35 ? "#fef9c3" : "#e0f2fe"} stopOpacity={0.68 + bhasmaGlowProgress * 0.25} />
            <stop offset="55%" stopColor={bhasmaGlowProgress > 0.35 ? "#fde047" : "#7dd3fc"} stopOpacity={0.26 + bhasmaGlowProgress * 0.22} />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="p3Skin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor={bhasmaGlowProgress > 0.4 ? "#f8fafc" : "#dbeafe"} />
            <stop offset="100%" stopColor={bhasmaGlowProgress > 0.4 ? "#e2e8f0" : "#94b3d6"} />
          </linearGradient>
          <linearGradient id="p3Bagh" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="55%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
          <linearGradient id="p3Belt" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
        </defs>

        <circle cx={0} cy={-100} r={auraR} fill="url(#p3Aura)" />

        {/* Radiant Bhasma Sparkle Halo */}
        {bhasmaGlowProgress > 0.15 && (
          <g opacity={bhasmaGlowProgress * 0.9}>
            {Array.from({ length: 12 }).map((_, i) => {
              const ang = (i / 12) * Math.PI * 2 + t * 0.35;
              const rr = 140 + Math.sin(t * 4 + i) * 14;
              return <circle key={i} cx={Math.cos(ang) * rr} cy={-80 + Math.sin(ang) * rr} r={3.5} fill="#fef08a" />;
            })}
          </g>
        )}

        {/* Standing Legs + Baghambar + Live Cobra Belt */}
        <g transform="translate(0, 62)">
          <path d="M -32,0 Q -42,68 -36,142" stroke="url(#p3Skin)" strokeWidth={26} strokeLinecap="round" fill="none" />
          <path d="M 32,0 Q 42,68 36,142" stroke="url(#p3Skin)" strokeWidth={26} strokeLinecap="round" fill="none" />
          <ellipse cx={-36} cy={136} rx={14} ry={5} fill="none" stroke="#f8fafc" strokeWidth={4} />
          <ellipse cx={36} cy={136} rx={14} ry={5} fill="none" stroke="#f8fafc" strokeWidth={4} />
          <ellipse cx={-36} cy={150} rx={20} ry={10} fill="#e2e8f0" />
          <ellipse cx={36} cy={150} rx={20} ry={10} fill="#e2e8f0" />

          <path
            d="M -48,0 L 48,0 L 66,120 Q 0,138 -66,120 Z"
            fill="url(#p3Bagh)"
            stroke="#fde047"
            strokeWidth={2.5}
          />
          {[-28, 0, 28].map((sx, idx) => (
            <path key={idx} d={`M ${sx},12 Q ${sx - 6},58 ${sx + 5},105`} stroke="#291202" strokeWidth={4.5} strokeLinecap="round" fill="none" opacity={0.82} />
          ))}

          {/* Live Serpent Waist Belt */}
          <path d={`M -54,4 Q 0,${18 + Math.sin(t * 4) * 3} 54,4`} fill="none" stroke="url(#p3Belt)" strokeWidth={16} strokeLinecap="round" />
          <path d={`M -48,4 Q 0,${17 + Math.sin(t * 4) * 3} 48,4`} fill="none" stroke="#fde047" strokeWidth={3.5} strokeDasharray="6 6" />
          <g transform={`translate(${74 + snakeSway * 0.45}, -14) rotate(${28 + snakeSway}) scale(1.35)`}>
            <path d="M 0,18 Q -15,-4 0,-26 Q 15,-4 0,18 Z" fill="#047857" stroke="#fde047" strokeWidth={2.2} />
            <circle cx={-4} cy={-9} r={2.3} fill="#fbbf24" />
            <circle cx={4} cy={-9} r={2.3} fill="#fbbf24" />
          </g>
        </g>

        {/* Muscular Torso */}
        <g transform={`translate(0, ${br.chestExpand * 0.35})`}>
          <path d="M -62,-58 Q 0,-72 62,-58 L 48,64 L -48,64 Z" fill="url(#p3Skin)" stroke={bhasmaGlowProgress > 0.3 ? "#fef08a" : "#e0f2fe"} strokeWidth={2.4} />
          <path d="M -42,-26 Q -18,-12 -4,-24 M 4,-24 Q 18,-12 42,-26" fill="none" stroke="#6488b4" strokeWidth={2.5} opacity={0.55} />
          <path d="M -20,4 Q 0,9 20,4 M -18,24 Q 0,29 18,24 M -15,42 Q 0,46 15,42" fill="none" stroke="#6488b4" strokeWidth={2} opacity={0.42} />
          <path d="M -30,-32 Q 0,-38 30,-32 M -28,-22 Q 0,-28 28,-22 M -26,-12 Q 0,-18 26,-12" fill="none" stroke="#ffffff" strokeWidth={3.6} strokeLinecap="round" />

          {/* Symmetrical Arms */}
          <g transform={`translate(-60, -44) rotate(${leftArmRot})`}>
            <path d="M 0,0 Q -26,42 -22,92" fill="none" stroke="url(#p3Skin)" strokeWidth={25} strokeLinecap="round" />
            <ellipse cx={-16} cy={36} rx={13} ry={5} transform="rotate(14, -16, 36)" fill="none" stroke="#fbbf24" strokeWidth={4.2} />
            <ellipse cx={-21} cy={78} rx={12} ry={4.5} fill="none" stroke="#9a3412" strokeWidth={4.5} />
          </g>
          <g transform={`translate(60, -44) rotate(${rightArmRot})`}>
            <path d="M 0,0 Q 32,36 30,86" fill="none" stroke="url(#p3Skin)" strokeWidth={25} strokeLinecap="round" />
            <ellipse cx={20} cy={34} rx={13} ry={5} transform="rotate(-14, 20, 34)" fill="none" stroke="#fbbf24" strokeWidth={4.2} />
            <ellipse cx={29} cy={74} rx={12} ry={4.5} fill="none" stroke="#9a3412" strokeWidth={4.5} />
          </g>

          {/* 1-Headed Vasuki (gracefully exits as Panchmukhi Naga arrives) */}
          {panchmukhiProgress < 0.85 && (
            <g opacity={1 - panchmukhiProgress} transform={`translate(${panchmukhiProgress * -70}, 0)`}>
              <path d="M -30,-56 Q 0,-36 30,-56" fill="none" stroke="#334155" strokeWidth={11} strokeLinecap="round" />
              <g transform={`translate(${28 + snakeSway * 0.4}, -72) rotate(${snakeSway})`}>
                <path d="M 0,16 Q -11,-3 0,-18 Q 11,-3 0,16 Z" fill="#1e293b" stroke="#cbd5e1" strokeWidth={1.6} />
                <circle cx={-3} cy={-6} r={1.8} fill="#fbbf24" />
                <circle cx={3} cy={-6} r={1.8} fill="#fbbf24" />
              </g>
            </g>
          )}

          {/* FIVE-HEADED PANCHMUKHI NAGA GARLAND (P3S03+) */}
          {panchmukhiProgress > 0.05 && (
            <g opacity={panchmukhiProgress} transform={`scale(${0.75 + panchmukhiProgress * 0.25})`}>
              <path d="M -40,-56 Q 0,-18 40,-56" fill="none" stroke="#065f46" strokeWidth={14} strokeLinecap="round" />
              <path d="M -36,-54 Q 0,-19 36,-54" fill="none" stroke="#fde047" strokeWidth={3} strokeDasharray="5 5" />
              {[-34, -17, 0, 17, 34].map((hx, idx) => (
                <g
                  key={idx}
                  transform={`translate(${hx}, ${-36 + Math.abs(hx) * 0.2}) rotate(${(hx * 0.45) + Math.sin(t * 4 + idx) * 6})`}
                >
                  <path d="M 0,14 Q -11,-4 0,-22 Q 11,-4 0,14 Z" fill="#047857" stroke="#fde047" strokeWidth={1.8} />
                  <circle cx={-3} cy={-7} r={1.6} fill="#ef4444" />
                  <circle cx={3} cy={-7} r={1.6} fill="#ef4444" />
                </g>
              ))}
            </g>
          )}

          {/* Head + Towering Jata-Mukut + Crown Cobra + Sarp Sehra + Bichhu Earrings */}
          <g transform={`translate(0, ${-108 + br.shoulderLift * 0.4})`}>
            <path d="M -32,-12 Q -38,-94 0,-118 Q 38,-94 32,-12 Z" fill="#3b261c" stroke="#6b4432" strokeWidth={2} />
            <path d="M -24,-42 Q 0,-34 24,-42 M -18,-66 Q 0,-58 18,-66" fill="none" stroke="#fde047" strokeWidth={3.5} strokeDasharray="4 4" />
            <path d="M 12,-96 A 13,13 0 1,0 28,-80 A 9,9 0 1,1 12,-96 Z" fill="#ffffff" />

            {/* Forehead Crown Cobra */}
            <g transform="translate(0, -28)">
              <path d="M -34,0 Q 0,9 34,0" fill="none" stroke="#065f46" strokeWidth={12} strokeLinecap="round" />
              <path d="M -30,0 Q 0,8 30,0" fill="none" stroke="#fde047" strokeWidth={3.5} strokeDasharray="4 4" />
              <g transform={`translate(0, ${-22 - Math.sin(t * 5) * 2.5}) scale(1.35)`}>
                <path d="M 0,16 Q -13,-5 0,-24 Q 13,-5 0,16 Z" fill="#047857" stroke="#fde047" strokeWidth={2.2} />
                <circle cx={-3.8} cy={-8} r={2.3} fill="#ef4444" />
                <circle cx={3.8} cy={-8} r={2.3} fill="#ef4444" />
              </g>
            </g>

            {/* Face */}
            <ellipse cx={0} cy={0} rx={32} ry={36} fill="url(#p3Skin)" stroke={bhasmaGlowProgress > 0.3 ? "#fef08a" : "#e0f2fe"} strokeWidth={2} />
            <ellipse cx={0} cy={34} rx={13} ry={8} fill="#2563eb" opacity={0.88} />

            {/* Live Scorpion Earrings (P3S02+) or Rudraksha Studs */}
            {bichhuProgress > 0.1 ? (
              <g opacity={bichhuProgress}>
                <ScorpionIcon x={-35} y={12} sway={Math.sin(t * 4.5) * 9} scale={0.95} />
                <ScorpionIcon x={35} y={12} sway={-Math.sin(t * 4.5) * 9} scale={0.95} />
              </g>
            ) : (
              <>
                <circle cx={-33} cy={10} r={5.5} fill="#7c2d12" stroke="#fbbf24" strokeWidth={1.6} />
                <circle cx={33} cy={10} r={5.5} fill="#7c2d12" stroke="#fbbf24" strokeWidth={1.6} />
              </>
            )}

            <path d="M -17,-16 Q 0,-20 17,-16 M -16,-11 Q 0,-15 16,-11" fill="none" stroke="#ffffff" strokeWidth={2.5} />
            <ellipse cx={0} cy={-13} rx={2.8} ry={5.5} fill="#ef4444" />
            <g transform={`scale(1, ${blink})`} style={{ transformOrigin: "0px -2px" }}>
              <ellipse cx={-12} cy={-3} rx={5.8} ry={4} fill="#ffffff" />
              <circle cx={-12} cy={-3} r={2.6} fill="#0f172a" />
              <ellipse cx={12} cy={-3} rx={5.8} ry={4} fill="#ffffff" />
              <circle cx={12} cy={-3} r={2.6} fill="#0f172a" />
            </g>
            <path d={`M -9,15 Q 0,${21 + mouthOpen} 9,15`} fill={speakingEnergy > 0.15 ? "#7f1d1d" : "none"} stroke="#0f172a" strokeWidth={2.4} strokeLinecap="round" />

            {/* SARP SEHRA: Slender Hanging Serpent Strands + Bichhu Tassels! */}
            {sehraProgress > 0.05 && (
              <g opacity={sehraProgress}>
                {[-40, -29, -20, 20, 29, 40].map((sx, idx) => {
                  const len = (52 + (idx % 2) * 14) * sehraProgress;
                  const sway = Math.sin(t * 3.8 + idx * 0.9) * 5;
                  return (
                    <g key={idx}>
                      <path
                        d={`M ${sx * 0.85},-24 Q ${sx + sway},${-24 + len * 0.55} ${sx + sway * 1.4},${-24 + len}`}
                        fill="none"
                        stroke={idx % 2 === 0 ? "#10b981" : "#fbbf24"}
                        strokeWidth={4.2}
                        strokeLinecap="round"
                      />
                      {/* Forked red tongue at tip */}
                      <path
                        d={`M ${sx + sway * 1.4},${-24 + len} l -2.5,6 M ${sx + sway * 1.4},${-24 + len} l 2.5,6`}
                        stroke="#ef4444"
                        strokeWidth={1.6}
                      />
                      {bichhuProgress > 0.15 && (
                        <g opacity={bichhuProgress}>
                          <ScorpionIcon x={sx + sway * 1.4} y={-20 + len} sway={sway * 1.5} scale={0.55} />
                        </g>
                      )}
                    </g>
                  );
                })}
              </g>
            )}
          </g>
        </g>
      </svg>
    </div>
  );
};
