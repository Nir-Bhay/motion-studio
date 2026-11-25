import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { breathe, clothWave } from "../motion/physics";
import {
  CrownForeheadCobra,
  OrnateTrishulWithDamaru,
  VasukiNeckSerpent,
  WaistSerpentBelt,
} from "../characters/DetailedSerpents";

interface MahadevGroomRigProps {
  x: number;
  y: number;
  scale?: number;
  speakingEnergy?: number;
  thirdEyeBeam?: number;      // 0..1 glowing crimson laser during Kamdev flashback
  jataCrownProgress?: number; // 0..1 untied locks -> towering royal Jata-Mukut
  baghambarProgress?: number; // 0..1 wrapping tiger skin
  waistSerpent?: number;      // 0..1 live cobra belt around waist
  headSerpent?: number;       // 0..1 fierce cobra band on forehead
  gesture?: "calm" | "mischievous" | "heroic";
}

export const MahadevGroomRig: React.FC<MahadevGroomRigProps> = ({
  x,
  y,
  scale = 1,
  speakingEnergy = 0,
  thirdEyeBeam = 0,
  jataCrownProgress = 0,
  baghambarProgress = 0.35,
  waistSerpent = 0,
  headSerpent = 0,
  gesture = "calm",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const br = breathe(t, 0.3, 3.2);
  const jataSway = clothWave(t, 0.2, 8);
  const blink = Math.sin(t * 2.1 + 1.4) > 0.965 ? 0.12 : 1;
  const mouthOpen = speakingEnergy * 5;
  const armGesture =
    gesture === "mischievous"
      ? -12 + Math.sin(t * 5.5) * 10
      : gesture === "heroic"
      ? -26 + Math.sin(t * 2.8) * 5
      : -16 + Math.sin(t * 2.6) * 4;
  const trishulTilt = gesture === "heroic" ? 20 + Math.sin(t * 2.8) * 3 : 14 + Math.sin(t * 2.6) * 3;
  const leftArmGesture = gesture === "heroic" ? 22 : 8;

  const skinFill = "#dce6f2";
  const skinShadow = "#b0c0d4";

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${scale})`,
        transformOrigin: "center center",
        pointerEvents: "none",
      }}
    >
      <svg width={600} height={680} viewBox="-300 -340 600 680" overflow="visible">
        {/* Solid-Alpha Prabhamandala Halo (Zero url(#...) dependencies) */}
        <circle cx={0} cy={-125} r={144} fill="#38bdf8" opacity={0.14} />
        <circle cx={0} cy={-125} r={104} fill="#bae6fd" opacity={0.2} />

        {/* Muscular Standing Legs with Silver Kada Anklets */}
        <g transform="translate(0, 62)">
          <path d="M -32,0 Q -42,68 -36,142" stroke="#0b1120" strokeWidth={32} strokeLinecap="round" fill="none" />
          <path d="M 32,0 Q 42,68 36,142" stroke="#0b1120" strokeWidth={32} strokeLinecap="round" fill="none" />
          <path d="M -32,0 Q -42,68 -36,142" stroke={skinFill} strokeWidth={26} strokeLinecap="round" fill="none" />
          <path d="M 32,0 Q 42,68 36,142" stroke={skinFill} strokeWidth={26} strokeLinecap="round" fill="none" />
          <path d="M -27,20 Q -36,75 -31,136" stroke={skinShadow} strokeWidth={8} strokeLinecap="round" fill="none" />
          <path d="M 27,20 Q 36,75 31,136" stroke={skinShadow} strokeWidth={8} strokeLinecap="round" fill="none" />
          <ellipse cx={-36} cy={136} rx={14} ry={5} fill="none" stroke="#f8fafc" strokeWidth={4} />
          <ellipse cx={36} cy={136} rx={14} ry={5} fill="none" stroke="#f8fafc" strokeWidth={4} />
          <ellipse cx={-36} cy={150} rx={21} ry={10} fill={skinFill} stroke="#0b1120" strokeWidth={2.6} />
          <ellipse cx={36} cy={150} rx={21} ry={10} fill={skinFill} stroke="#0b1120" strokeWidth={2.6} />

          {/* Baghambar Dhoti (expands richly as baghambarProgress -> 1) */}
          <path
            d={`M -48,0 L 48,0 L ${54 + baghambarProgress * 12},${95 + baghambarProgress * 25} Q 0,${110 + baghambarProgress * 28} ${-54 - baghambarProgress * 12},${95 + baghambarProgress * 25} Z`}
            fill="#d97706"
            stroke="#0b1120"
            strokeWidth={3.2}
          />
          <path
            d={`M -44,6 L 0,6 L -6,${102 + baghambarProgress * 22} Q -34,${100 + baghambarProgress * 20} ${-50 - baghambarProgress * 10},${91 + baghambarProgress * 23} Z`}
            fill="#f59e0b"
            opacity={0.75}
          />
          {[-28, 0, 28].map((sx, idx) => (
            <path key={idx} d={`M ${sx},12 Q ${sx - 6},55 ${sx + 5},92`} stroke="#451a03" strokeWidth={4.5} strokeLinecap="round" fill="none" opacity={0.82} />
          ))}

          {/* Live Detailed Emerald-Gold Serpent Belt cinched around Waist! */}
          <WaistSerpentBelt t={t} opacity={waistSerpent} />
        </g>

        {/* Sculpted Broad-Chested Muscular Torso */}
        <g transform={`translate(0, ${br.chestExpand * 0.35})`}>
          <path d="M -62,-58 Q 0,-72 62,-58 L 48,64 L -48,64 Z" fill={skinFill} stroke="#0b1120" strokeWidth={3.2} />
          <path d="M 18,-62 Q 46,-60 60,-56 L 46,62 L 16,62 Q 26,0 18,-62 Z" fill={skinShadow} opacity={0.65} />
          {/* Pectoral, Ab & Rib Shading */}
          <path d="M -42,-26 Q -18,-12 -4,-24 M 4,-24 Q 18,-12 42,-26" fill="none" stroke="#475569" strokeWidth={2.6} opacity={0.7} />
          <path d="M -20,4 Q 0,9 20,4 M -18,24 Q 0,29 18,24 M -15,42 Q 0,46 15,42" fill="none" stroke="#475569" strokeWidth={2.2} opacity={0.55} />
          {/* Tripundra White Bhasma */}
          <path d="M -30,-32 Q 0,-38 30,-32 M -28,-22 Q 0,-28 28,-22 M -26,-12 Q 0,-18 26,-12" fill="none" stroke="#ffffff" strokeWidth={3.5} strokeLinecap="round" />

          {/* Left Arm + Palm & Fingers */}
          <g transform={`translate(-60, -44) rotate(${leftArmGesture})`}>
            <path d="M 0,0 Q -26,42 -22,92" fill="none" stroke="#0b1120" strokeWidth={31} strokeLinecap="round" />
            <path d="M 0,0 Q -26,42 -22,92" fill="none" stroke={skinFill} strokeWidth={25} strokeLinecap="round" />
            <ellipse cx={-21} cy={98} rx={11.5} ry={13.5} fill={skinFill} stroke="#0b1120" strokeWidth={2.5} />
            <path d="M -27,104 L -28,114 M -21,106 L -21,116 M -15,104 L -14,114" stroke="#0b1120" strokeWidth={2} strokeLinecap="round" />
            <ellipse cx={-16} cy={36} rx={13} ry={5} transform="rotate(14, -16, 36)" fill="none" stroke="#fbbf24" strokeWidth={4.2} />
            <ellipse cx={-21} cy={78} rx={12} ry={4.5} fill="none" stroke="#9a3412" strokeWidth={4.5} />
          </g>

          {/* Right Arm + Ornate Trishul Held in Hand */}
          <g transform={`translate(60, -44) rotate(${armGesture})`}>
            <path d="M 0,0 Q 32,26 42,64" fill="none" stroke="#0b1120" strokeWidth={31} strokeLinecap="round" />
            <path d="M 0,0 Q 32,26 42,64" fill="none" stroke={skinFill} strokeWidth={25} strokeLinecap="round" />
            <ellipse cx={22} cy={22} rx={13} ry={5} transform="rotate(-14, 22, 22)" fill="none" stroke="#fbbf24" strokeWidth={4.2} />
            <ellipse cx={38} cy={52} rx={12} ry={4.5} transform="rotate(-22, 38, 52)" fill="none" stroke="#9a3412" strokeWidth={4.5} />

            {/* Ornate Trishul + Damaru Held Inside Right Hand */}
            <OrnateTrishulWithDamaru t={t} x={46} y={64} rotation={trishulTilt} scale={0.95} />

            {/* Gripping Hand Palm & Fingers */}
            <ellipse cx={44} cy={68} rx={11.5} ry={13} fill={skinFill} stroke="#0b1120" strokeWidth={2.5} />
            <path d="M 38,63 Q 48,61 52,66 M 37,69 Q 48,67 52,72 M 38,75 Q 47,73 51,78" fill="none" stroke="#0b1120" strokeWidth={2.2} strokeLinecap="round" />
          </g>

          {/* Rudraksha Mala Necklace */}
          <path d="M -36,-56 Q 0,-26 36,-56" fill="none" stroke="#78350f" strokeWidth={5.5} strokeDasharray="3 5" strokeLinecap="round" />

          {/* Detailed Coiled Vasuki Neck Serpent */}
          <VasukiNeckSerpent t={t} />

          {/* Head + Transforming Jata-Mukut Crown */}
          <g transform={`translate(0, ${-108 + br.shoulderLift * 0.4})`}>
            <path
              d={`M -34,-6 Q ${-56 + jataSway},26 ${-46 + jataSway * 1.2},62`}
              fill="none"
              stroke="#291d18"
              strokeWidth={10}
              strokeLinecap="round"
              opacity={1 - jataCrownProgress * 0.7}
            />
            <path
              d={`M 34,-6 Q ${56 - jataSway},26 ${46 - jataSway * 1.2},62`}
              fill="none"
              stroke="#291d18"
              strokeWidth={10}
              strokeLinecap="round"
              opacity={1 - jataCrownProgress * 0.7}
            />
            <path
              d={`M -32,-12 Q -38,${-62 - jataCrownProgress * 32} 0,${-74 - jataCrownProgress * 44} Q 38,${-62 - jataCrownProgress * 32} 32,-12 Z`}
              fill="#3b261c"
              stroke="#0b1120"
              strokeWidth={2.5}
            />
            {jataCrownProgress > 0.2 && (
              <g opacity={jataCrownProgress}>
                <path d="M -24,-42 Q 0,-34 24,-42 M -18,-66 Q 0,-58 18,-66" fill="none" stroke="#fde047" strokeWidth={3.5} strokeDasharray="4 4" />
              </g>
            )}
            <path d={`M 12,${-68 - jataCrownProgress * 28} A 13,13 0 1,0 28,${-52 - jataCrownProgress * 28} A 9,9 0 1,1 12,${-68 - jataCrownProgress * 28} Z`} fill="#ffffff" stroke="#0b1120" strokeWidth={1.2} />

            {/* Fierce Crown Serpent tied around Forehead (P2S06) */}
            <CrownForeheadCobra t={t} opacity={headSerpent} />

            {/* Face */}
            <ellipse cx={-33} cy={4} rx={5.5} ry={9.5} fill={skinFill} stroke="#0b1120" strokeWidth={2.2} />
            <ellipse cx={33} cy={4} rx={5.5} ry={9.5} fill={skinFill} stroke="#0b1120" strokeWidth={2.2} />
            <ellipse cx={0} cy={0} rx={32} ry={36} fill={skinFill} stroke="#0b1120" strokeWidth={3} />
            <path d="M 10,-33 Q 31,-22 30,4 Q 28,28 8,34 Q 20,16 20,-4 Q 20,-24 10,-33 Z" fill={skinShadow} opacity={0.55} />
            <ellipse cx={0} cy={34} rx={13} ry={8} fill="#2563eb" stroke="#0b1120" strokeWidth={1.8} />
            <circle cx={-33} cy={10} r={5.5} fill="#7c2d12" stroke="#fbbf24" strokeWidth={1.6} />
            <circle cx={33} cy={10} r={5.5} fill="#7c2d12" stroke="#fbbf24" strokeWidth={1.6} />
            <path d="M -17,-16 Q 0,-20 17,-16 M -16,-11 Q 0,-15 16,-11" fill="none" stroke="#ffffff" strokeWidth={2.5} />

            {/* Third Eye (+ blazing crimson beam if thirdEyeBeam > 0) */}
            <ellipse cx={0} cy={-13} rx={2.8 + thirdEyeBeam * 4} ry={5.5 + thirdEyeBeam * 4} fill={thirdEyeBeam > 0 ? "#ff2a2a" : "#ef4444"} />
            {thirdEyeBeam > 0.05 && (
              <polygon
                points={`0,-13 ${-280 * thirdEyeBeam},-120 ${-280 * thirdEyeBeam},80`}
                fill="#ff4500"
                opacity={0.48 * thirdEyeBeam}
              />
            )}

            <g transform={`scale(1, ${blink})`} style={{ transformOrigin: "0px -2px" }}>
              <ellipse cx={-12} cy={-3} rx={5.8} ry={4} fill="#ffffff" stroke="#0b1120" strokeWidth={1} />
              <circle cx={-12} cy={-3} r={2.6} fill="#0f172a" />
              <ellipse cx={12} cy={-3} rx={5.8} ry={4} fill="#ffffff" stroke="#0b1120" strokeWidth={1} />
              <circle cx={12} cy={-3} r={2.6} fill="#0f172a" />
            </g>
            <path
              d={`M -9,15 Q 0,${21 + mouthOpen} 9,15`}
              fill={speakingEnergy > 0.15 ? "#7f1d1d" : "none"}
              stroke="#0f172a"
              strokeWidth={2.4}
              strokeLinecap="round"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};
