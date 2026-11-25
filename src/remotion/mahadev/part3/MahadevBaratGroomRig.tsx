import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { breathe } from "../motion/physics";
import {
  CrownForeheadCobra,
  OrnateTrishulWithDamaru,
  PanchmukhiNagaGarland,
  SarpSehraVeil,
  ScorpionIcon,
  VasukiNeckSerpent,
  WaistSerpentBelt,
} from "../characters/DetailedSerpents";

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
  seatedOnNandi?: boolean;     // true when riding Nandi Bull so legs tuck cleanly onto saddle!
}

/**
 * Pure solid-color + cel-shaded Mahadev Groom Rig (ZERO url(#...) gradients so Brave/Chrome NEVER turns black!).
 * Features detailed hands with fingers, Rudraksha malas, sculpted muscles, Baghambar folds, Jata locks,
 * detailed Cobra/Naga serpents, Ornate Trishul in hand, Sarp Sehra, Bichhu earrings, Panchmukhi Naga, and glowing Tripundra Tilak.
 */
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
  seatedOnNandi = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const br = breathe(t, 0.3, 3.2);
  const marchBounce = pose === "marching" ? Math.abs(Math.sin(t * 5.2)) * -10 : 0;
  const blink = Math.sin(t * 2.1 + 1.4) > 0.965 ? 0.12 : 1;
  const mouthOpen = speakingEnergy * 5;
  const leftArmRot = pose === "marching" ? 18 + Math.sin(t * 5.2) * 14 : 20;
  // Right arm dynamically holds & moves the Ornate Trishul with gentle breathing/heroic/marching motion!
  const rightArmRot =
    pose === "heroic"
      ? -28 + Math.sin(t * 2.8) * 5
      : pose === "marching"
      ? -18 - Math.sin(t * 5.2) * 10
      : -16 + Math.sin(t * 2.6) * 4;
  const trishulTilt = pose === "heroic" ? 20 + Math.sin(t * 2.8) * 3 : 16 + Math.sin(t * 2.6) * 3;

  const skinFill = bhasmaGlowProgress > 0.4 ? "#f1f5f9" : "#dce6f2";
  const skinShadow = bhasmaGlowProgress > 0.4 ? "#cbd5e1" : "#b0c0d4";
  const haloColor = bhasmaGlowProgress > 0.35 ? "#fde047" : "#7dd3fc";

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + marchBounce,
        transform: `translate(-50%, -50%) scale(${scale})`,
        transformOrigin: "center center",
        pointerEvents: "none",
      }}
    >
      <svg width={620} height={700} viewBox="-310 -350 620 700" overflow="visible">
        {/* Layered Solid-Alpha Prabhamandala Halo (no url(#...) needed) */}
        <circle cx={0} cy={-125} r={148 + bhasmaGlowProgress * 45} fill={haloColor} opacity={0.14 + bhasmaGlowProgress * 0.12} />
        <circle cx={0} cy={-125} r={104 + bhasmaGlowProgress * 28} fill="#fef9c3" opacity={0.18 + bhasmaGlowProgress * 0.14} />

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

        {/* Standing Legs OR Tucked Seated-on-Nandi Legs + Baghambar with Live Cobra Belt */}
        <g transform="translate(0, 62)">
          {seatedOnNandi ? (
            <>
              {/* Physically Seated Astride Nandi's Back — Legs Tucked Cleanly Onto Saddle! */}
              <path d="M -42,8 Q -64,44 -48,76" stroke="#0b1120" strokeWidth={28} strokeLinecap="round" fill="none" />
              <path d="M -42,8 Q -64,44 -48,76" stroke={skinFill} strokeWidth={22} strokeLinecap="round" fill="none" />
              <path d="M 42,8 Q 64,44 48,76" stroke="#0b1120" strokeWidth={28} strokeLinecap="round" fill="none" />
              <path d="M 42,8 Q 64,44 48,76" stroke={skinFill} strokeWidth={22} strokeLinecap="round" fill="none" />
              <ellipse cx={-48} cy={72} rx={12} ry={4.5} fill="none" stroke="#ffffff" strokeWidth={3.5} />
              <ellipse cx={48} cy={72} rx={12} ry={4.5} fill="none" stroke="#ffffff" strokeWidth={3.5} />
              <ellipse cx={-48} cy={84} rx={18} ry={8.5} fill={skinFill} stroke="#0b1120" strokeWidth={2.5} />
              <ellipse cx={48} cy={84} rx={18} ry={8.5} fill={skinFill} stroke="#0b1120" strokeWidth={2.5} />
              {/* Draped Seated Baghambar Wrap */}
              <path
                d="M -52,0 L 52,0 L 66,64 Q 0,80 -66,64 Z"
                fill="#d97706"
                stroke="#0b1120"
                strokeWidth={3.2}
              />
              <path d="M -46,6 L 0,6 L -6,68 Q -38,68 -62,60 Z" fill="#f59e0b" opacity={0.75} />
              {[-28, -8, 12, 32].map((sx, idx) => (
                <path key={idx} d={`M ${sx},12 Q ${sx - 5},36 ${sx + 4},58`} stroke="#451a03" strokeWidth={4} strokeLinecap="round" fill="none" opacity={0.82} />
              ))}
            </>
          ) : (
            <>
              <path d="M -32,0 Q -42,68 -36,142" stroke="#0b1120" strokeWidth={32} strokeLinecap="round" fill="none" />
              <path d="M 32,0 Q 42,68 36,142" stroke="#0b1120" strokeWidth={32} strokeLinecap="round" fill="none" />
              <path d="M -32,0 Q -42,68 -36,142" stroke={skinFill} strokeWidth={26} strokeLinecap="round" fill="none" />
              <path d="M 32,0 Q 42,68 36,142" stroke={skinFill} strokeWidth={26} strokeLinecap="round" fill="none" />
              {/* Inner Calf Cel-Shadow */}
              <path d="M -27,20 Q -36,75 -31,136" stroke={skinShadow} strokeWidth={8} strokeLinecap="round" fill="none" />
              <path d="M 27,20 Q 36,75 31,136" stroke={skinShadow} strokeWidth={8} strokeLinecap="round" fill="none" />
              <ellipse cx={-36} cy={136} rx={14} ry={5} fill="none" stroke="#ffffff" strokeWidth={4} />
              <ellipse cx={36} cy={136} rx={14} ry={5} fill="none" stroke="#ffffff" strokeWidth={4} />
              <ellipse cx={-36} cy={150} rx={21} ry={10} fill={skinFill} stroke="#0b1120" strokeWidth={2.8} />
              <ellipse cx={36} cy={150} rx={21} ry={10} fill={skinFill} stroke="#0b1120" strokeWidth={2.8} />

              {/* Baghambar Tiger-Skin Dhoti with Layered Folds & Stripes */}
              <path
                d="M -50,0 L 50,0 L 68,120 Q 0,140 -68,120 Z"
                fill="#d97706"
                stroke="#0b1120"
                strokeWidth={3.2}
              />
              <path d="M -46,6 L 0,6 L -6,126 Q -38,124 -64,116 Z" fill="#f59e0b" opacity={0.75} />
              <path d="M 16,6 L 46,6 L 62,116 Q 38,125 14,126 Z" fill="#92400e" opacity={0.55} />
              {[-30, -8, 12, 32].map((sx, idx) => (
                <path key={idx} d={`M ${sx},16 Q ${sx - 6},58 ${sx + 5},105`} stroke="#451a03" strokeWidth={4.5} strokeLinecap="round" fill="none" opacity={0.82} />
              ))}
            </>
          )}

          {/* Live Emerald & Gold Serpent Waist Belt */}
          <WaistSerpentBelt t={t} opacity={1} />
        </g>

        {/* Muscular Cel-Shaded Torso */}
        <g transform={`translate(0, ${br.chestExpand * 0.35})`}>
          <path d="M -64,-58 Q 0,-74 64,-58 L 49,64 L -49,64 Z" fill={skinFill} stroke="#0b1120" strokeWidth={3.2} />
          {/* Right-side Cel-Shading & Shoulder Sculpting */}
          <path d="M 18,-62 Q 46,-60 61,-56 L 47,62 L 16,62 Q 26,0 18,-62 Z" fill={skinShadow} opacity={0.68} />
          <path d="M -42,-26 Q -18,-12 -4,-24 M 4,-24 Q 18,-12 42,-26" fill="none" stroke="#475569" strokeWidth={2.8} opacity={0.78} />
          <path d="M -20,4 Q 0,9 20,4 M -18,24 Q 0,29 18,24 M -15,42 Q 0,46 15,42" fill="none" stroke="#475569" strokeWidth={2.3} opacity={0.62} />
          {/* Sacred Chest Tripundra Ash Lines */}
          <path d="M -30,-32 Q 0,-38 30,-32 M -28,-22 Q 0,-28 28,-22 M -26,-12 Q 0,-18 26,-12" fill="none" stroke="#ffffff" strokeWidth={3.8} strokeLinecap="round" />

          {/* Symmetrical Sculpted Arms + Hands & Fingers */}
          <g transform={`translate(-60, -44) rotate(${leftArmRot})`}>
            <path d="M 0,0 Q -26,42 -22,92" fill="none" stroke="#0b1120" strokeWidth={31} strokeLinecap="round" />
            <path d="M 0,0 Q -26,42 -22,92" fill="none" stroke={skinFill} strokeWidth={25} strokeLinecap="round" />
            {/* Palm & Fingers */}
            <ellipse cx={-21} cy={98} rx={12} ry={14} fill={skinFill} stroke="#0b1120" strokeWidth={2.6} />
            <path d="M -28,104 L -29,115 M -22,106 L -22,118 M -16,104 L -15,115" stroke="#0b1120" strokeWidth={2.2} strokeLinecap="round" />
            {/* Golden Armlet & Rudraksha Wristband */}
            <ellipse cx={-16} cy={36} rx={13} ry={5} transform="rotate(14, -16, 36)" fill="none" stroke="#fbbf24" strokeWidth={4.5} />
            <ellipse cx={-21} cy={78} rx={12} ry={4.5} fill="none" stroke="#9a3412" strokeWidth={4.5} />
          </g>
          <g transform={`translate(60, -44) rotate(${rightArmRot})`}>
            {/* Sculpted Muscular Upper & Forearm Holding Ornate Trishul */}
            <path d="M 0,0 Q 32,26 42,64" fill="none" stroke="#0b1120" strokeWidth={31} strokeLinecap="round" />
            <path d="M 0,0 Q 32,26 42,64" fill="none" stroke={skinFill} strokeWidth={25} strokeLinecap="round" />
            <ellipse cx={22} cy={22} rx={13} ry={5} transform="rotate(-14, 22, 22)" fill="none" stroke="#fbbf24" strokeWidth={4.5} />
            <ellipse cx={38} cy={52} rx={12} ry={4.5} transform="rotate(-22, 38, 52)" fill="none" stroke="#9a3412" strokeWidth={4.5} />

            {/* Ornate Trishul + Damaru Held Right Inside Mahadev's Hand! */}
            <OrnateTrishulWithDamaru t={t} x={46} y={64} rotation={trishulTilt} scale={0.96} />

            {/* Gripping Hand Palm & Curled Fingers Wrapping Around Trishul Shaft */}
            <ellipse cx={44} cy={68} rx={12} ry={13} fill={skinFill} stroke="#0b1120" strokeWidth={2.6} />
            <path d="M 38,63 Q 48,61 52,66 M 37,69 Q 48,67 52,72 M 38,75 Q 47,73 51,78" fill="none" stroke="#0b1120" strokeWidth={2.4} strokeLinecap="round" />
          </g>

          {/* Rudraksha Mala Necklace */}
          <path d="M -38,-56 Q 0,-22 38,-56" fill="none" stroke="#78350f" strokeWidth={6} strokeDasharray="3 5" strokeLinecap="round" />

          {/* 1-Headed Vasuki */}
          {panchmukhiProgress < 0.85 && (
            <g opacity={1 - panchmukhiProgress} transform={`translate(${panchmukhiProgress * -70}, 0)`}>
              <VasukiNeckSerpent t={t} />
            </g>
          )}

          {/* FIVE-HEADED PANCHMUKHI NAGA GARLAND */}
          <PanchmukhiNagaGarland t={t} progress={panchmukhiProgress} />

          {/* Head + Towering Jata-Mukut + Crown Cobra + Sarp Sehra + Bichhu Earrings */}
          <g transform={`translate(0, ${-108 + br.shoulderLift * 0.4})`}>
            {/* Flowing Jata Hair Locks Behind Neck */}
            <path d="M -28,0 Q -48,18 -44,44 Q -32,30 -24,14 Z" fill="#3b261c" stroke="#0b1120" strokeWidth={2.2} />
            <path d="M 28,0 Q 48,18 44,44 Q 32,30 24,14 Z" fill="#3b261c" stroke="#0b1120" strokeWidth={2.2} />

            {/* Towering Jata Crown */}
            <path d="M -32,-12 Q -38,-94 0,-118 Q 38,-94 32,-12 Z" fill="#3b261c" stroke="#0b1120" strokeWidth={2.8} />
            <path d="M -24,-42 Q 0,-34 24,-42 M -18,-66 Q 0,-58 18,-66" fill="none" stroke="#fde047" strokeWidth={3.5} strokeDasharray="4 4" />
            <path d="M 12,-96 A 13,13 0 1,0 28,-80 A 9,9 0 1,1 12,-96 Z" fill="#ffffff" stroke="#0b1120" strokeWidth={1.4} />

            {/* Forehead Crown Cobra */}
            <CrownForeheadCobra t={t} opacity={1} />

            {/* Face with Ears & Neelkanth Throat */}
            <ellipse cx={-33} cy={4} rx={6} ry={10} fill={skinFill} stroke="#0b1120" strokeWidth={2.4} />
            <ellipse cx={33} cy={4} rx={6} ry={10} fill={skinFill} stroke="#0b1120" strokeWidth={2.4} />
            <ellipse cx={0} cy={0} rx={32} ry={36} fill={skinFill} stroke="#0b1120" strokeWidth={3} />
            <path d="M 10,-33 Q 31,-22 30,4 Q 28,28 8,34 Q 20,16 20,-4 Q 20,-24 10,-33 Z" fill={skinShadow} opacity={0.55} />
            <ellipse cx={0} cy={34} rx={13} ry={8} fill="#2563eb" stroke="#0b1120" strokeWidth={2} />

            {/* Live Scorpion Earrings or Rudraksha Studs */}
            {bichhuProgress > 0.1 ? (
              <g opacity={bichhuProgress}>
                <ScorpionIcon x={-36} y={14} sway={Math.sin(t * 4.5) * 9} scale={0.95} />
                <ScorpionIcon x={36} y={14} sway={-Math.sin(t * 4.5) * 9} scale={0.95} />
              </g>
            ) : (
              <>
                <circle cx={-34} cy={12} r={5.5} fill="#7c2d12" stroke="#fbbf24" strokeWidth={1.6} />
                <circle cx={34} cy={12} r={5.5} fill="#7c2d12" stroke="#fbbf24" strokeWidth={1.6} />
              </>
            )}

            {/* Tripundra Tilak + Third Eye + Expressive Brows & Eyes */}
            <path d="M -17,-16 Q 0,-20 17,-16 M -16,-11 Q 0,-15 16,-11" fill="none" stroke="#ffffff" strokeWidth={2.6} />
            <ellipse cx={0} cy={-13} rx={3} ry={5.5} fill="#ef4444" stroke="#0b1120" strokeWidth={1} />
            <path d="M -19,-8 Q -12,-12 -6,-8 M 6,-8 Q 12,-12 19,-8" fill="none" stroke="#0f172a" strokeWidth={2.2} strokeLinecap="round" />
            <g transform={`scale(1, ${blink})`} style={{ transformOrigin: "0px -2px" }}>
              <ellipse cx={-12} cy={-3} rx={5.8} ry={4.2} fill="#ffffff" stroke="#0b1120" strokeWidth={1.2} />
              <circle cx={-12} cy={-3} r={2.6} fill="#0f172a" />
              <ellipse cx={12} cy={-3} rx={5.8} ry={4.2} fill="#ffffff" stroke="#0b1120" strokeWidth={1.2} />
              <circle cx={12} cy={-3} r={2.6} fill="#0f172a" />
            </g>
            <path d="M 0,1 L -2,8 L 2,8" fill="none" stroke="#475569" strokeWidth={1.6} strokeLinecap="round" />
            <path d={`M -9,15 Q 0,${21 + mouthOpen} 9,15`} fill={speakingEnergy > 0.15 ? "#7f1d1d" : "none"} stroke="#0f172a" strokeWidth={2.4} strokeLinecap="round" />

            {/* SARP SEHRA */}
            <SarpSehraVeil t={t} sehraProgress={sehraProgress} bichhuProgress={bichhuProgress} />
          </g>
        </g>
      </svg>
    </div>
  );
};
