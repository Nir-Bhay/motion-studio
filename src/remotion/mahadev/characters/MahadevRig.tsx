import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { breathe, clothWave, pendulumSwing } from "../motion/physics";

interface MahadevRigProps {
  x: number;
  y: number;
  scale?: number;
  pose?: "lounging" | "sitting";
  speakingEnergy?: number;
  dreamOverlay?: "none" | "achkan" | "sehra" | "pagdi" | "all";
}

export const MahadevRig: React.FC<MahadevRigProps> = ({
  x,
  y,
  scale = 1,
  pose = "lounging",
  speakingEnergy = 0,
  dreamOverlay = "none",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const br = breathe(t, 0.2, 3.2);
  const blink = Math.sin(t * 2.1 + 2.1) > 0.968 ? 0.12 : 1;
  const snakeSway = pendulumSwing(t, 2.2, 8.5);
  const jataSway = clothWave(t, 0.4, 5.5);
  const tongueFlick = Math.sin(t * 8.0) > 0.55;
  const gangaOffset = (frame * 2.4) % 42;
  const damaruTilt = pendulumSwing(t, 2.9, 10);
  const mouthOpen = speakingEnergy * 5.5;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${scale})`,
        transformOrigin: "center center",
        pointerEvents: "none",
        // Crisp silver-lunar + warm pyre rim glow so Mahadev pops clearly against dark Shamshan night
        filter: "drop-shadow(0 0 22px rgba(186, 230, 253, 0.45))",
      }}
    >
      <svg width={820} height={620} viewBox="-410 -320 820 620" overflow="visible">
        <defs>
          <radialGradient id="shivaAuraStrong" cx="50%" cy="45%" r="52%">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.68" />
            <stop offset="45%" stopColor="#7dd3fc" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </radialGradient>
          {/* Luminous bhasma-clad skin with crisp silver rim-light */}
          <linearGradient id="shivaSkin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#dbeafe" />
            <stop offset="100%" stopColor="#94b3d6" />
          </linearGradient>
          <linearGradient id="shivaMuscleShadow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#93b4d8" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#6488b4" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="baghambarRich" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
          <linearGradient id="basaltRock" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="60%" stopColor="#293548" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="trishulSteel" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="50%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
        </defs>

        {/* Ornate Etched Trishul + Pendulum-Swaying Damaru */}
        <g transform="translate(238, -22)">
          <rect x={-4.5} y={-215} width={9} height={427} rx={4.5} fill="url(#trishulSteel)" stroke="#e2e8f0" strokeWidth={1} />
          {/* Decorative Brass Rings along Shaft */}
          {[-175, -110, 40].map((ry, i) => (
            <rect key={i} x={-6} y={ry} width={12} height={7} rx={3} fill="#fbbf24" stroke="#92400e" strokeWidth={1} />
          ))}
          {/* Center Spear & Curved Prongs */}
          <polygon points="0,-266 -11,-208 11,-208" fill="#f8fafc" stroke="#94a3b8" strokeWidth={1.5} />
          <path d="M 0,-186 Q -36,-192 -34,-238 Q -22,-216 0,-208" fill="url(#trishulSteel)" stroke="#e2e8f0" strokeWidth={1.5} />
          <path d="M 0,-186 Q 36,-192 34,-238 Q 22,-216 0,-208" fill="url(#trishulSteel)" stroke="#e2e8f0" strokeWidth={1.5} />
          {/* Crimson Silk Ribbon & Swaying Damaru */}
          <path d={`M -4,-150 Q ${-18 + damaruTilt * 0.6},-135 ${-14 + damaruTilt},-112`} fill="none" stroke="#ef4444" strokeWidth={4} strokeLinecap="round" />
          <g transform={`translate(-10, -148) rotate(${damaruTilt})`}>
            <polygon points="-18,-15 18,-15 0,0" fill="#b45309" stroke="#fde047" strokeWidth={2} />
            <polygon points="-18,15 18,15 0,0" fill="#b45309" stroke="#fde047" strokeWidth={2} />
            <line x1={-18} y1={-15} x2={-18} y2={15} stroke="#fffbeb" strokeWidth={3} />
            <line x1={18} y1={-15} x2={18} y2={15} stroke="#fffbeb" strokeWidth={3} />
            <line x1={-15} y1={-11} x2={15} y2={11} stroke="#fde047" strokeWidth={1.5} />
            <line x1={15} y1={-11} x2={-15} y2={11} stroke="#fde047" strokeWidth={1.5} />
            <circle cx={0} cy={17} r={4} fill="#ef4444" />
          </g>
        </g>

        {/* Sculpted Basalt Mountain Seat with Moonlit Rim Highlight */}
        <path
          d="M -275,188 Q -230,104 -125,108 Q 0,90 148,114 Q 248,118 275,188 Z"
          fill="url(#basaltRock)"
          stroke="#94a3b8"
          strokeWidth={2.5}
        />
        <path d="M -215,120 Q -120,108 15,106 Q 130,108 215,126" fill="none" stroke="#bae6fd" strokeWidth={2} opacity={0.4} />

        {pose === "lounging" ? (
          /* POSE 1: Sculpted Reclining Mahadev ("बाघंबर लपेटे, हाथ की तकिया लगाए") */
          <g transform={`translate(0, ${br.chestExpand * 0.4})`}>
            {/* Strong Lunar Prabhamandala Halo */}
            <circle cx={-105} cy={-44} r={168} fill="url(#shivaAuraStrong)" />

            {/* Lush Spotted & Striped Baghambar (Tiger Skin Pelt) */}
            <path
              d="M -195,118 Q -110,42 46,44 Q 170,46 196,122 Q 95,148 -195,118 Z"
              fill="url(#baghambarRich)"
              stroke="#fbbf24"
              strokeWidth={2.5}
            />
            {/* Fur Edge Trim */}
            <path
              d="M -190,118 Q -95,134 0,136 Q 95,136 192,122"
              fill="none"
              stroke="#fef3c7"
              strokeWidth={3}
              strokeDasharray="6 6"
              opacity={0.55}
            />
            {/* Organic Tiger Stripes */}
            {[-130, -82, -32, 20, 74, 126].map((sx, idx) => (
              <path
                key={idx}
                d={`M ${sx},${64 + (idx % 2) * 10} Q ${sx + 12},88 ${sx - 8},112`}
                fill="none"
                stroke="#291202"
                strokeWidth={5.5}
                strokeLinecap="round"
                opacity={0.82}
              />
            ))}

            {/* Sculpted Muscular Legs with Silver Anklet Kada */}
            <path
              d="M 30,86 Q 128,62 164,108 Q 114,134 26,112 Z"
              fill="url(#shivaSkin)"
              stroke="#cbd5e1"
              strokeWidth={2}
            />
            <path d="M 55,88 Q 105,82 135,98" fill="none" stroke="url(#shivaMuscleShadow)" strokeWidth={7} strokeLinecap="round" />
            <ellipse cx={148} cy={104} rx={5} ry={11} fill="none" stroke="#f8fafc" strokeWidth={3.5} />
            <ellipse cx={166} cy={112} rx={17} ry={10} fill="#e2e8f0" stroke="#94a3b8" strokeWidth={1.5} />

            {/* Sculpted Muscular Torso (Broad Deltoids, Pectorals, Obliques) */}
            <path
              d="M -114,58 Q -72,10 34,34 L 44,88 L -104,96 Z"
              fill="url(#shivaSkin)"
              stroke="#e0f2fe"
              strokeWidth={2.2}
            />
            {/* Pectoral & Rib Contours */}
            <path d="M -82,48 Q -48,58 -24,44 M -64,68 Q -32,74 -6,66" fill="none" stroke="#6488b4" strokeWidth={2.5} strokeLinecap="round" opacity={0.55} />
            {/* Crisp White Tripundra Bhasma across Sculpted Chest */}
            <path d="M -56,42 Q -30,36 -8,44 M -54,51 Q -30,45 -10,53 M -52,60 Q -30,54 -12,62" fill="none" stroke="#ffffff" strokeWidth={3.2} strokeLinecap="round" />

            {/* Resting Arm ("हाथ की तकिया" — sculpted bicep + forearm + Nag-Keyura armlet + Rudraksha wrist) */}
            <path
              d="M -104,64 L -166,92 L -144,10"
              fill="none"
              stroke="url(#shivaSkin)"
              strokeWidth={27}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M -104,64 L -166,92 L -144,10"
              fill="none"
              stroke="#f8fafc"
              strokeWidth={2}
              strokeLinecap="round"
              opacity={0.65}
            />
            {/* Bicep Keyura Armlet & Wrist Rudraksha */}
            <ellipse cx={-136} cy={78} rx={6} ry={14} transform="rotate(24, -136, 78)" fill="none" stroke="#fbbf24" strokeWidth={4} />
            <ellipse cx={-152} cy={42} rx={12} ry={5} fill="none" stroke="#9a3412" strokeWidth={4.5} strokeDasharray="3 3" />
            {/* Articulated Pillow Hand */}
            <ellipse cx={-141} cy={6} rx={14} ry={11} fill="#e2e8f0" stroke="#94a3b8" strokeWidth={1.5} />

            {/* Relaxed Draped Arm with Muscle Contour & Wristlet */}
            <path
              d="M 10,44 Q 68,58 98,94"
              fill="none"
              stroke="url(#shivaSkin)"
              strokeWidth={24}
              strokeLinecap="round"
            />
            <ellipse cx={42} cy={55} rx={6} ry={13} transform="rotate(-24, 42, 55)" fill="none" stroke="#fbbf24" strokeWidth={4} />
            <ellipse cx={84} cy={81} rx={10} ry={5} transform="rotate(-38, 84, 81)" fill="none" stroke="#9a3412" strokeWidth={4} />

            {/* Coiled Vasuki Serpent around Neck */}
            <g transform="translate(-86, 30)">
              <path d="M -24,12 Q 0,28 24,10" fill="none" stroke="#334155" strokeWidth={12} strokeLinecap="round" />
              <path d="M -20,12 Q 0,24 20,10" fill="none" stroke="#94a3b8" strokeWidth={2.5} strokeDasharray="4 5" opacity={0.75} />
              {/* Swaying Cobra Hood */}
              <g transform={`translate(${24 + snakeSway * 0.4}, -12) rotate(${snakeSway})`}>
                <path d="M 0,18 Q -14,-4 0,-20 Q 14,-4 0,18 Z" fill="#1e293b" stroke="#cbd5e1" strokeWidth={1.8} />
                <circle cx={-3.5} cy={-6} r={2} fill="#fbbf24" />
                <circle cx={3.5} cy={-6} r={2} fill="#fbbf24" />
                {tongueFlick && <path d="M 0,-20 L 0,-29 M 0,-29 L -3.5,-34 M 0,-29 L 3.5,-34" stroke="#ef4444" strokeWidth={1.8} />}
              </g>
            </g>

            {/* Mahadev's Sculpted Head Resting Calmly on Hand */}
            <g transform={`translate(-118, -18) rotate(${-14 + br.headNod})`}>
              {/* Flowing Braided Jata Locks with Physics Sway */}
              <path d={`M -30,-6 Q ${-46 + jataSway},18 ${-40 + jataSway * 1.3},42`} fill="none" stroke="#291d18" strokeWidth={9} strokeLinecap="round" />
              <path d={`M 30,-6 Q ${46 - jataSway * 0.6},18 ${38 - jataSway},42`} fill="none" stroke="#291d18" strokeWidth={9} strokeLinecap="round" />
              <path d="M -30,-12 Q -38,-58 0,-68 Q 38,-58 30,-12 Z" fill="#291d18" stroke="#573d30" strokeWidth={1.5} />
              <ellipse cx={0} cy={-60} rx={21} ry={17} fill="#3f2c22" stroke="#573d30" strokeWidth={1.5} />
              {/* Rudraksha Crown Band */}
              <path d="M -19,-46 Q 0,-40 19,-46" fill="none" stroke="#b45309" strokeWidth={5.5} strokeDasharray="3 4" strokeLinecap="round" />
              {/* Luminous Crescent Moon */}
              <circle cx={16} cy={-55} r={16} fill="#e0f2fe" opacity={0.25} />
              <path d="M 10,-65 A 12,12 0 1,0 26,-50 A 9,9 0 1,1 10,-65 Z" fill="#ffffff" />
              {/* Rippling Ganga Stream */}
              <path
                d={`M -6,-72 Q -22,${-44 + gangaOffset * 0.22} -32,-8`}
                fill="none"
                stroke="#e0f2fe"
                strokeWidth={3.8}
                strokeDasharray="9 5"
                opacity={0.85}
              />
              {/* Face */}
              <ellipse cx={0} cy={0} rx={31} ry={35} fill="url(#shivaSkin)" stroke="#e0f2fe" strokeWidth={2} />
              {/* Neelkanth Sapphire Blue Throat */}
              <ellipse cx={0} cy={32} rx={13} ry={8} fill="#2563eb" opacity={0.85} />
              {/* Rudraksha Ear Kundals & Neck Mala */}
              <circle cx={-32} cy={10} r={5.5} fill="#7c2d12" stroke="#fbbf24" strokeWidth={1.6} />
              <circle cx={32} cy={10} r={5.5} fill="#7c2d12" stroke="#fbbf24" strokeWidth={1.6} />
              <path d="M -17,29 Q 0,44 17,29" fill="none" stroke="#9a3412" strokeWidth={6} strokeDasharray="3 4" strokeLinecap="round" />
              {/* Tripundra & Radiant Third Eye */}
              <path d="M -17,-16 Q 0,-20 17,-16 M -16,-11 Q 0,-15 16,-11" fill="none" stroke="#ffffff" strokeWidth={2.5} strokeLinecap="round" />
              <ellipse cx={0} cy={-13} rx={2.8} ry={5.5} fill="#ef4444" stroke="#fde047" strokeWidth={0.8} />
              {/* Calm Meditative Eyes + Nose Bridge */}
              <path d="M 0,-6 L -2,6 L 2,7" fill="none" stroke="#6488b4" strokeWidth={1.6} strokeLinecap="round" />
              <g transform={`scale(1, ${blink})`} style={{ transformOrigin: "0px -2px" }}>
                <path d="M -19,-2 Q -12,-6 -5,-2" fill="none" stroke="#0f172a" strokeWidth={2.8} strokeLinecap="round" />
                <circle cx={-12} cy={-2} r={2.5} fill="#0f172a" />
                <path d="M 5,-2 Q 12,-6 19,-2" fill="none" stroke="#0f172a" strokeWidth={2.8} strokeLinecap="round" />
                <circle cx={12} cy={-2} r={2.5} fill="#0f172a" />
              </g>
              {/* Peaceful Smile */}
              <path d={`M -9,15 Q 0,${20 + mouthOpen} 9,15`} fill="none" stroke="#1e293b" strokeWidth={2.4} strokeLinecap="round" />
            </g>
          </g>
        ) : (
          /* POSE 2: Sitting Upright Muscular Padmasana + Abhaya Blessing Hand (S07 Finale) */
          <g transform={`translate(0, ${br.chestExpand * 0.4})`}>
            <circle cx={0} cy={-78} r={178} fill="url(#shivaAuraStrong)" />
            {/* Tiger-skin Dhoti & Crossed Padmasana Legs */}
            <path d="M -98,96 Q 0,134 98,96 Q 114,54 46,48 L -46,48 Q -114,54 -98,96 Z" fill="url(#baghambarRich)" stroke="#fbbf24" strokeWidth={2.5} />
            {[-58, -22, 22, 58].map((sx, i) => (
              <path key={i} d={`M ${sx},60 Q ${sx + 6},85 ${sx - 6},106`} fill="none" stroke="#291202" strokeWidth={5} strokeLinecap="round" opacity={0.8} />
            ))}
            {/* Sculpted Muscular Torso */}
            <path d="M -54,-38 Q 0,-50 54,-38 L 42,56 L -42,56 Z" fill="url(#shivaSkin)" stroke="#e0f2fe" strokeWidth={2.2} />
            <path d="M -36,-14 Q -18,-6 -4,-16 M 4,-16 Q 18,-6 36,-14" fill="none" stroke="#6488b4" strokeWidth={2.2} opacity={0.55} />
            <path d="M -28,-22 Q 0,-28 28,-22 M -26,-12 Q 0,-18 26,-12" fill="none" stroke="#ffffff" strokeWidth={3.2} />
            {/* Left Arm + Keyura Armlet */}
            <path d="M -50,-28 Q -78,28 -60,78" fill="none" stroke="url(#shivaSkin)" strokeWidth={24} strokeLinecap="round" />
            <ellipse cx={-66} cy={4} rx={12} ry={5} transform="rotate(14, -66, 4)" fill="none" stroke="#fbbf24" strokeWidth={4} />
            {/* Right Arm Raised in Abhaya Blessing */}
            <g transform={`translate(50, -28) rotate(${-15 - Math.sin(t * 3.8) * 7})`}>
              <path d="M 0,0 Q 36,-14 48,-56" fill="none" stroke="url(#shivaSkin)" strokeWidth={24} strokeLinecap="round" />
              <ellipse cx={28} cy={-16} rx={6} ry={13} transform="rotate(-48, 28, -16)" fill="none" stroke="#fbbf24" strokeWidth={4} />
              <ellipse cx={50} cy={-66} rx={12} ry={15} fill="#f8fafc" />
              <circle cx={50} cy={-66} r={30} fill="#bae6fd" opacity={0.32 + 0.16 * Math.sin(t * 4.5)} />
            </g>
            {/* Vasuki Serpent */}
            <g transform="translate(0, -38)">
              <path d="M -28,8 Q 0,25 28,8" fill="none" stroke="#334155" strokeWidth={12} strokeLinecap="round" />
              <g transform={`translate(${28 + snakeSway * 0.4}, -12) rotate(${snakeSway})`}>
                <path d="M 0,18 Q -13,-4 0,-19 Q 13,-4 0,18 Z" fill="#1e293b" stroke="#cbd5e1" strokeWidth={1.8} />
                <circle cx={-3} cy={-6} r={2} fill="#fbbf24" />
                <circle cx={3} cy={-6} r={2} fill="#fbbf24" />
              </g>
            </g>
            {/* Head */}
            <g transform={`translate(0, ${-86 + br.headNod * 0.6})`}>
              <path d={`M -30,-6 Q ${-42 + jataSway},18 ${-36 + jataSway},38`} fill="none" stroke="#291d18" strokeWidth={8} strokeLinecap="round" />
              <path d={`M 30,-6 Q ${42 - jataSway},18 ${36 - jataSway},38`} fill="none" stroke="#291d18" strokeWidth={8} strokeLinecap="round" />
              <path d="M -31,-10 Q -37,-58 0,-68 Q 37,-58 31,-10 Z" fill="#291d18" />
              <ellipse cx={0} cy={-58} rx={21} ry={17} fill="#3f2c22" />
              <path d="M 10,-64 A 12,12 0 1,0 26,-49 A 9,9 0 1,1 10,-64 Z" fill="#ffffff" />
              <ellipse cx={0} cy={0} rx={31} ry={35} fill="url(#shivaSkin)" stroke="#e0f2fe" strokeWidth={2} />
              <ellipse cx={0} cy={32} rx={13} ry={8} fill="#2563eb" opacity={0.85} />
              <path d="M -17,-16 Q 0,-20 17,-16 M -16,-11 Q 0,-15 16,-11" fill="none" stroke="#ffffff" strokeWidth={2.5} />
              <ellipse cx={0} cy={-13} rx={2.8} ry={5.5} fill="#ef4444" />
              <path d="M 0,-6 L -2,6 L 2,7" fill="none" stroke="#6488b4" strokeWidth={1.6} strokeLinecap="round" />
              <g transform={`scale(1, ${blink})`} style={{ transformOrigin: "0px -2px" }}>
                <ellipse cx={-11} cy={-3} rx={5.8} ry={4} fill="#ffffff" />
                <circle cx={-11} cy={-3} r={2.6} fill="#0f172a" />
                <ellipse cx={11} cy={-3} rx={5.8} ry={4} fill="#ffffff" />
                <circle cx={11} cy={-3} r={2.6} fill="#0f172a" />
              </g>
              <path
                d={`M -9,14 Q 0,${21 + mouthOpen} 9,14`}
                fill={speakingEnergy > 0.15 ? "#7f1d1d" : "none"}
                stroke="#0f172a"
                strokeWidth={2.5}
                strokeLinecap="round"
              />
            </g>
          </g>
        )}

        {/* Dream Hologram Bubbles for S06 */}
        {dreamOverlay !== "none" && (
          <g transform={`translate(-190, -185)`} opacity={0.96}>
            <circle cx={75} cy={100} r={8} fill="#ffe484" opacity={0.65} />
            <circle cx={52} cy={72} r={14} fill="#ffe484" opacity={0.78} />
            <rect x={-95} y={-80} width={220} height={130} rx={28} fill="rgba(22, 18, 56, 0.86)" stroke="#fbbf24" strokeWidth={2.8} strokeDasharray="8 5" />
            {(dreamOverlay === "achkan" || dreamOverlay === "all") && (
              <g transform="translate(-45, -18)">
                <path d="M -22,-30 L 22,-30 L 30,38 L -30,38 Z" fill="#b91c1c" stroke="#fde047" strokeWidth={2} />
                <line x1={0} y1={-30} x2={0} y2={38} stroke="#fde047" strokeWidth={2.5} />
                <text x={0} y={56} textAnchor="middle" fill="#fde047" fontSize={16} fontWeight={700} fontFamily="'Noto Sans Devanagari', sans-serif">अचकन</text>
              </g>
            )}
            {(dreamOverlay === "sehra" || dreamOverlay === "all") && (
              <g transform="translate(20, -18)">
                <path d="M -24,-12 Q 0,-26 24,-12" fill="none" stroke="#fef08a" strokeWidth={6} />
                {[-18, -9, 0, 9, 18].map((lx, idx) => (
                  <line key={idx} x1={lx} y1={-12} x2={lx} y2={26} stroke="#fffbeb" strokeWidth={2.5} strokeDasharray="4 3" />
                ))}
                <text x={0} y={56} textAnchor="middle" fill="#fde047" fontSize={16} fontWeight={700} fontFamily="'Noto Sans Devanagari', sans-serif">सेहरा</text>
              </g>
            )}
            {(dreamOverlay === "pagdi" || dreamOverlay === "all") && (
              <g transform="translate(80, -18)">
                <ellipse cx={0} cy={4} rx={24} ry={16} fill="#ea580c" stroke="#fde047" strokeWidth={2} />
                <path d="M -20,2 Q 0,-14 20,2" fill="none" stroke="#fef08a" strokeWidth={4} />
                <polygon points="0,-24 -5,-8 5,-8" fill="#fde047" />
                <text x={0} y={56} textAnchor="middle" fill="#fde047" fontSize={16} fontWeight={700} fontFamily="'Noto Sans Devanagari', sans-serif">पाग</text>
              </g>
            )}
          </g>
        )}
      </svg>
    </div>
  );
};
