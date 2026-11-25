import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { breathe, clothWave, pendulumSwing } from "../motion/physics";

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
  const snakeSway = pendulumSwing(t, 2.5, 9);
  const jataSway = clothWave(t, 0.2, 8);
  const blink = Math.sin(t * 2.1 + 1.4) > 0.965 ? 0.12 : 1;
  const mouthOpen = speakingEnergy * 5;
  const armGesture = gesture === "mischievous" ? Math.sin(t * 5.5) * 14 : gesture === "heroic" ? -18 : -8;
  const leftArmGesture = gesture === "heroic" ? 22 : 8;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${scale})`,
        transformOrigin: "center center",
        pointerEvents: "none",
        filter: "drop-shadow(0 0 24px rgba(186, 230, 253, 0.48))",
      }}
    >
      <svg width={600} height={680} viewBox="-300 -340 600 680" overflow="visible">
        <defs>
          <radialGradient id="groomAura" cx="50%" cy="40%" r="52%">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.72" />
            <stop offset="50%" stopColor="#7dd3fc" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="groomSkin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="48%" stopColor="#dbeafe" />
            <stop offset="100%" stopColor="#94b3d6" />
          </linearGradient>
          <linearGradient id="groomBagh" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="55%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
          <linearGradient id="serpentGreenGold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
        </defs>

        <circle cx={0} cy={-110} r={168} fill="url(#groomAura)" />

        {/* Muscular Standing Legs with Silver Kada Anklets */}
        <g transform="translate(0, 62)">
          <path d="M -32,0 Q -42,68 -36,142" stroke="url(#groomSkin)" strokeWidth={26} strokeLinecap="round" fill="none" />
          <path d="M 32,0 Q 42,68 36,142" stroke="url(#groomSkin)" strokeWidth={26} strokeLinecap="round" fill="none" />
          <ellipse cx={-36} cy={136} rx={14} ry={5} fill="none" stroke="#f8fafc" strokeWidth={4} />
          <ellipse cx={36} cy={136} rx={14} ry={5} fill="none" stroke="#f8fafc" strokeWidth={4} />
          <ellipse cx={-36} cy={150} rx={20} ry={10} fill="#e2e8f0" />
          <ellipse cx={36} cy={150} rx={20} ry={10} fill="#e2e8f0" />

          {/* Baghambar Dhoti (expands richly as baghambarProgress -> 1) */}
          <path
            d={`M -48,0 L 48,0 L ${54 + baghambarProgress * 12},${95 + baghambarProgress * 25} Q 0,${110 + baghambarProgress * 28} ${-54 - baghambarProgress * 12},${95 + baghambarProgress * 25} Z`}
            fill="url(#groomBagh)"
            stroke="#fde047"
            strokeWidth={2.5}
          />
          {[-28, 0, 28].map((sx, idx) => (
            <path key={idx} d={`M ${sx},12 Q ${sx - 6},55 ${sx + 5},92`} stroke="#291202" strokeWidth={4.5} strokeLinecap="round" fill="none" opacity={0.82} />
          ))}

          {/* Live Emerald-Gold Serpent Belt cinched around Waist! */}
          {waistSerpent > 0.05 && (
            <g opacity={waistSerpent}>
              <path
                d={`M -54,4 Q 0,${18 + Math.sin(t * 4) * 3} 54,4`}
                fill="none"
                stroke="url(#serpentGreenGold)"
                strokeWidth={16}
                strokeLinecap="round"
              />
              <path
                d={`M -48,4 Q 0,${17 + Math.sin(t * 4) * 3} 48,4`}
                fill="none"
                stroke="#fde047"
                strokeWidth={3.5}
                strokeDasharray="6 6"
              />
              {/* Prominent Cobra Hood peeking out at hip */}
              <g transform={`translate(${74 + snakeSway * 0.45}, -14) rotate(${28 + snakeSway}) scale(1.45)`}>
                <path d="M 0,18 Q -15,-4 0,-26 Q 15,-4 0,18 Z" fill="#047857" stroke="#fde047" strokeWidth={2.2} />
                <circle cx={-4} cy={-9} r={2.4} fill="#fbbf24" />
                <circle cx={4} cy={-9} r={2.4} fill="#fbbf24" />
              </g>
            </g>
          )}
        </g>

        {/* Sculpted Broad-Chested Muscular Torso */}
        <g transform={`translate(0, ${br.chestExpand * 0.35})`}>
          <path d="M -62,-58 Q 0,-72 62,-58 L 48,64 L -48,64 Z" fill="url(#groomSkin)" stroke="#e0f2fe" strokeWidth={2.2} />
          {/* Pectoral, Ab & Rib Shading */}
          <path d="M -42,-26 Q -18,-12 -4,-24 M 4,-24 Q 18,-12 42,-26" fill="none" stroke="#6488b4" strokeWidth={2.5} opacity={0.6} />
          <path d="M -20,4 Q 0,9 20,4 M -18,24 Q 0,29 18,24 M -15,42 Q 0,46 15,42" fill="none" stroke="#6488b4" strokeWidth={2} opacity={0.45} />
          {/* Tripundra White Bhasma */}
          <path d="M -30,-32 Q 0,-38 30,-32 M -28,-22 Q 0,-28 28,-22 M -26,-12 Q 0,-18 26,-12" fill="none" stroke="#ffffff" strokeWidth={3.2} strokeLinecap="round" />

          {/* Left Arm + Nag-Keyura */}
          <g transform={`translate(-60, -44) rotate(${leftArmGesture})`}>
            <path d="M 0,0 Q -26,42 -22,92" fill="none" stroke="url(#groomSkin)" strokeWidth={25} strokeLinecap="round" />
            <ellipse cx={-16} cy={36} rx={13} ry={5} transform="rotate(14, -16, 36)" fill="none" stroke="#fbbf24" strokeWidth={4.2} />
            <ellipse cx={-21} cy={78} rx={12} ry={4.5} fill="none" stroke="#9a3412" strokeWidth={4.5} />
          </g>

          {/* Right Arm + Gesture */}
          <g transform={`translate(60, -44) rotate(${armGesture})`}>
            <path d="M 0,0 Q 32,36 30,86" fill="none" stroke="url(#groomSkin)" strokeWidth={25} strokeLinecap="round" />
            <ellipse cx={20} cy={34} rx={13} ry={5} transform="rotate(-14, 20, 34)" fill="none" stroke="#fbbf24" strokeWidth={4.2} />
            <ellipse cx={29} cy={74} rx={12} ry={4.5} fill="none" stroke="#9a3412" strokeWidth={4.5} />
          </g>

          {/* Vasuki Necklace */}
          <path d="M -30,-56 Q 0,-36 30,-56" fill="none" stroke="#334155" strokeWidth={11} strokeLinecap="round" />
          <g transform={`translate(${28 + snakeSway * 0.4}, -72) rotate(${snakeSway})`}>
            <path d="M 0,16 Q -11,-3 0,-18 Q 11,-3 0,16 Z" fill="#1e293b" stroke="#cbd5e1" strokeWidth={1.6} />
            <circle cx={-3} cy={-6} r={1.8} fill="#fbbf24" />
            <circle cx={3} cy={-6} r={1.8} fill="#fbbf24" />
          </g>

          {/* Head + Transforming Jata-Mukut Crown */}
          <g transform={`translate(0, ${-108 + br.shoulderLift * 0.4})`}>
            {/* Untied Flowing Locks (fade into towering Jata-Mukut as jataCrownProgress -> 1) */}
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
            {/* Towering Woven Jata-Mukut Crown */}
            <path
              d={`M -32,-12 Q -38,${-62 - jataCrownProgress * 32} 0,${-74 - jataCrownProgress * 44} Q 38,${-62 - jataCrownProgress * 32} 32,-12 Z`}
              fill="#3b261c"
              stroke="#6b4432"
              strokeWidth={2}
            />
            {jataCrownProgress > 0.2 && (
              <g opacity={jataCrownProgress}>
                <path d="M -24,-42 Q 0,-34 24,-42 M -18,-66 Q 0,-58 18,-66" fill="none" stroke="#fde047" strokeWidth={3.5} strokeDasharray="4 4" />
              </g>
            )}
            {/* Crescent Moon */}
            <path d={`M 12,${-68 - jataCrownProgress * 28} A 13,13 0 1,0 28,${-52 - jataCrownProgress * 28} A 9,9 0 1,1 12,${-68 - jataCrownProgress * 28} Z`} fill="#ffffff" />

            {/* Fierce Crown Serpent tied around Forehead (P2S06) */}
            {headSerpent > 0.05 && (
              <g opacity={headSerpent} transform="translate(0, -28)">
                <path d="M -34,0 Q 0,9 34,0" fill="none" stroke="#065f46" strokeWidth={12} strokeLinecap="round" />
                <path d="M -30,0 Q 0,8 30,0" fill="none" stroke="#fde047" strokeWidth={3.5} strokeDasharray="4 4" />
                <g transform={`translate(0, ${-22 - Math.sin(t * 5) * 2.5}) scale(1.4)`}>
                  <path d="M 0,16 Q -13,-5 0,-24 Q 13,-5 0,16 Z" fill="#047857" stroke="#fde047" strokeWidth={2.2} />
                  <circle cx={-3.8} cy={-8} r={2.3} fill="#ef4444" />
                  <circle cx={3.8} cy={-8} r={2.3} fill="#ef4444" />
                </g>
              </g>
            )}

            {/* Face */}
            <ellipse cx={0} cy={0} rx={32} ry={36} fill="url(#groomSkin)" stroke="#e0f2fe" strokeWidth={2} />
            <ellipse cx={0} cy={34} rx={13} ry={8} fill="#2563eb" opacity={0.88} />
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
              <ellipse cx={-12} cy={-3} rx={5.8} ry={4} fill="#ffffff" />
              <circle cx={-12} cy={-3} r={2.6} fill="#0f172a" />
              <ellipse cx={12} cy={-3} rx={5.8} ry={4} fill="#ffffff" />
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
