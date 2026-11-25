import React from "react";
import { useCurrentFrame } from "remotion";

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
  const breath = Math.sin(frame * 0.045) * 3.5;
  const blink = Math.sin(frame * 0.038 + 2.1) > 0.968 ? 0.12 : 1;
  const snakeSway = Math.sin(frame * 0.07) * 7;
  const tongueFlick = Math.sin(frame * 0.25) > 0.55;
  const gangaFlow = (frame * 2.5) % 40;
  const damaruTilt = Math.sin(frame * 0.09) * 8;
  const mouthOpen = speakingEnergy * 5;

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
      <svg width={760} height={580} viewBox="-380 -300 760 580" overflow="visible">
        <defs>
          <radialGradient id="shivaAura" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#a5d8ff" stopOpacity="0.48" />
            <stop offset="55%" stopColor="#4c8bf5" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#1e293b" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="shivaSkin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e3edf7" />
            <stop offset="60%" stopColor="#b8cde0" />
            <stop offset="100%" stopColor="#8ca6c4" />
          </linearGradient>
          <linearGradient id="baghambar" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="60%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
          <linearGradient id="basaltRock" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
        </defs>

        {/* Planted Trishul + Swaying Damaru on the Side */}
        <g transform="translate(225, -20)">
          <line x1={0} y1={-210} x2={0} y2={205} stroke="#cbd5e1" strokeWidth={8} strokeLinecap="round" />
          {/* Center Spear & Side Prongs */}
          <polygon points="0,-255 -10,-205 10,-205" fill="#f1f5f9" />
          <path d="M 0,-185 Q -32,-190 -30,-232 Q -20,-212 0,-205" fill="#e2e8f0" />
          <path d="M 0,-185 Q 32,-190 30,-232 Q 20,-212 0,-205" fill="#e2e8f0" />
          {/* Swaying Damaru */}
          <g transform={`translate(-10, -145) rotate(${damaruTilt})`}>
            <polygon points="-16,-14 16,-14 0,0" fill="#b45309" stroke="#fcd34d" strokeWidth={1.5} />
            <polygon points="-16,14 16,14 0,0" fill="#b45309" stroke="#fcd34d" strokeWidth={1.5} />
            <line x1={-16} y1={-14} x2={-16} y2={14} stroke="#fef3c7" strokeWidth={2.5} />
            <line x1={16} y1={-14} x2={16} y2={14} stroke="#fef3c7" strokeWidth={2.5} />
            <circle cx={0} cy={14} r={3.5} fill="#ef4444" />
          </g>
        </g>

        {/* Basalt Rock Seat / Shamshan Mound */}
        <path
          d="M -260,185 Q -220,105 -120,110 Q 0,92 140,115 Q 240,120 265,185 Z"
          fill="url(#basaltRock)"
          stroke="#64748b"
          strokeWidth={2}
        />

        {pose === "lounging" ? (
          /* POSE 1: "बाघंबर लपेटे, हाथ की तकिया लगाए पड़े हुए हैं दूल्हा महाराज!" */
          <g transform={`translate(0, ${breath * 0.4})`}>
            {/* Cool Lunar Halo behind Mahadev */}
            <circle cx={-95} cy={-40} r={140} fill="url(#shivaAura)" />

            {/* Tiger-Skin Baghambar Mat & Draped Body */}
            <path
              d="M -185,115 Q -105,40 45,42 Q 165,45 190,120 Q 95,145 -185,115 Z"
              fill="url(#baghambar)"
              stroke="#451a03"
              strokeWidth={3}
            />
            {/* Tiger Stripes */}
            {[-120, -70, -20, 35, 85, 130].map((sx, idx) => (
              <path
                key={idx}
                d={`M ${sx},${65 + (idx % 2) * 10} Q ${sx + 10},88 ${sx - 6},110`}
                fill="none"
                stroke="#291202"
                strokeWidth={5}
                strokeLinecap="round"
                opacity={0.75}
              />
            ))}

            {/* Relaxed Crossed Legs wrapped in Baghambar */}
            <path d="M 35,88 Q 130,68 158,108 Q 108,132 30,112 Z" fill="url(#shivaSkin)" stroke="#64748b" strokeWidth={2} />
            <ellipse cx={160} cy={112} rx={16} ry={10} fill="#cbd5e1" />

            {/* Reclining Upper Torso */}
            <path
              d="M -110,58 Q -70,15 28,36 L 40,86 L -102,94 Z"
              fill="url(#shivaSkin)"
              stroke="#64748b"
              strokeWidth={2}
            />
            {/* Tripundra Ash Lines on Chest */}
            <path d="M -52,44 Q -28,38 -8,46 M -50,53 Q -28,47 -10,55" fill="none" stroke="#ffffff" strokeWidth={3} strokeLinecap="round" opacity={0.85} />

            {/* Resting Arm Propped as "हाथ की तकिया" (Pillow under Head) */}
            <path
              d="M -102,65 L -162,92 L -142,14"
              fill="none"
              stroke="url(#shivaSkin)"
              strokeWidth={25}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Relaxed Second Arm draped over thigh */}
            <path
              d="M 10,45 Q 68,62 96,95"
              fill="none"
              stroke="url(#shivaSkin)"
              strokeWidth={22}
              strokeLinecap="round"
            />

            {/* Coiled Vasuki Serpent around Neck */}
            <g transform="translate(-85, 32)">
              <path
                d="M -22,12 Q 0,28 24,10"
                fill="none"
                stroke="#334155"
                strokeWidth={11}
                strokeLinecap="round"
              />
              {/* Swaying Cobra Hood */}
              <g transform={`translate(${24 + snakeSway * 0.4}, -10) rotate(${snakeSway})`}>
                <path d="M 0,18 Q -12,-2 0,-18 Q 12,-2 0,18 Z" fill="#1e293b" stroke="#94a3b8" strokeWidth={1.5} />
                <circle cx={-3} cy={-6} r={1.8} fill="#fbbf24" />
                <circle cx={3} cy={-6} r={1.8} fill="#fbbf24" />
                {tongueFlick && <path d="M 0,-18 L 0,-27 M 0,-27 L -3,-31 M 0,-27 L 3,-31" stroke="#ef4444" strokeWidth={1.5} />}
              </g>
            </g>

            {/* Mahadev's Tilted Head Resting Calmly on Hand */}
            <g transform="translate(-118, -16) rotate(-14)">
            {/* Matted Jata Hair Crown & Flowing Locks */}
              <path d="M -32,-6 Q -44,18 -38,38 M 32,-6 Q 44,18 38,38" fill="none" stroke="#291d18" strokeWidth={8} strokeLinecap="round" />
              <path d="M -28,-12 Q -36,-55 0,-64 Q 36,-55 28,-12 Z" fill="#291d18" />
              <ellipse cx={0} cy={-56} rx={19} ry={16} fill="#3f2c22" />
              {/* Rudraksha Band around Jata */}
              <path d="M -18,-44 Q 0,-38 18,-44" fill="none" stroke="#9a3412" strokeWidth={5} strokeDasharray="3 4" strokeLinecap="round" />
              {/* Crescent Moon in Jata */}
              <path d="M 10,-62 A 11,11 0 1,0 24,-48 A 8,8 0 1,1 10,-62 Z" fill="#f8fafc" />
              {/* Subtle Ganga Mist Flow */}
              <path
                d={`M -6,-68 Q -22,${-42 + gangaFlow * 0.2} -30,-10`}
                fill="none"
                stroke="#bae6fd"
                strokeWidth={3.5}
                strokeDasharray="8 6"
                opacity={0.75}
              />
              {/* Face */}
              <ellipse cx={0} cy={0} rx={30} ry={34} fill="url(#shivaSkin)" stroke="#64748b" strokeWidth={1.5} />
              {/* Neelkanth Blue Throat */}
              <ellipse cx={0} cy={32} rx={12} ry={8} fill="#2563eb" opacity={0.72} />
              {/* Rudraksha Neck & Ear Beads */}
              <circle cx={-31} cy={10} r={5} fill="#7c2d12" stroke="#b45309" strokeWidth={1.5} />
              <circle cx={31} cy={10} r={5} fill="#7c2d12" stroke="#b45309" strokeWidth={1.5} />
              <path d="M -16,28 Q 0,42 16,28" fill="none" stroke="#7c2d12" strokeWidth={6} strokeDasharray="3 4" strokeLinecap="round" />
              {/* Tripundra & Vertical Third Eye Mark */}
              <path d="M -16,-16 Q 0,-19 16,-16 M -15,-11 Q 0,-14 15,-11" fill="none" stroke="#ffffff" strokeWidth={2.2} strokeLinecap="round" />
              <ellipse cx={0} cy={-13} rx={2.5} ry={5} fill="#ef4444" />
              {/* Calm Half-Closed Meditative / Blinking Eyes */}
              <g transform={`scale(1, ${blink})`} style={{ transformOrigin: "0px -2px" }}>
                <path d="M -18,-2 Q -11,-6 -5,-2" fill="none" stroke="#0f172a" strokeWidth={2.6} strokeLinecap="round" />
                <circle cx={-11} cy={-2} r={2.4} fill="#0f172a" />
                <path d="M 5,-2 Q 11,-6 18,-2" fill="none" stroke="#0f172a" strokeWidth={2.6} strokeLinecap="round" />
                <circle cx={11} cy={-2} r={2.4} fill="#0f172a" />
              </g>
              {/* Peaceful Smile */}
              <path d={`M -8,14 Q 0,${18 + mouthOpen} 8,14`} fill="none" stroke="#1e293b" strokeWidth={2.3} strokeLinecap="round" />
            </g>
          </g>
        ) : (
          /* POSE 2: Sitting Upright Smiling & Raising Abhaya Blessing Hand (S07 Finale) */
          <g transform={`translate(0, ${breath * 0.4})`}>
            <circle cx={0} cy={-75} r={155} fill="url(#shivaAura)" />
            {/* Tiger-skin Dhoti & Crossed Padmasana Legs */}
            <path d="M -95,95 Q 0,130 95,95 Q 110,55 45,50 L -45,50 Q -110,55 -95,95 Z" fill="url(#baghambar)" stroke="#451a03" strokeWidth={2.5} />
            {[-55, -20, 20, 55].map((sx, i) => (
              <path key={i} d={`M ${sx},62 Q ${sx + 5},85 ${sx - 5},105`} fill="none" stroke="#291202" strokeWidth={4.5} strokeLinecap="round" opacity={0.75} />
            ))}
            {/* Torso */}
            <path d="M -48,-36 Q 0,-46 48,-36 L 40,56 L -40,56 Z" fill="url(#shivaSkin)" stroke="#64748b" strokeWidth={2} />
            <path d="M -26,-16 Q 0,-22 26,-16 M -24,-6 Q 0,-12 24,-6" fill="none" stroke="#ffffff" strokeWidth={3} opacity={0.85} />
            {/* Left Hand resting calmly on knee */}
            <path d="M -46,-26 Q -72,28 -58,76" fill="none" stroke="url(#shivaSkin)" strokeWidth={22} strokeLinecap="round" />
            {/* Right Hand Raised in Blessing ("जाको रुचि लग रही हो वही कर लो!") */}
            <g transform={`translate(46, -26) rotate(${-15 - Math.sin(frame * 0.12) * 7})`}>
              <path d="M 0,0 Q 34,-12 46,-54" fill="none" stroke="url(#shivaSkin)" strokeWidth={22} strokeLinecap="round" />
              <ellipse cx={48} cy={-64} rx={11} ry={14} fill="#e3edf7" />
              <circle cx={48} cy={-64} r={26} fill="#bae6fd" opacity={0.25 + 0.15 * Math.sin(frame * 0.15)} />
            </g>
            {/* Vasuki Serpent */}
            <g transform="translate(0, -36)">
              <path d="M -26,8 Q 0,24 26,8" fill="none" stroke="#334155" strokeWidth={11} strokeLinecap="round" />
              <g transform={`translate(${26 + snakeSway * 0.4}, -12) rotate(${snakeSway})`}>
                <path d="M 0,18 Q -12,-2 0,-18 Q 12,-2 0,18 Z" fill="#1e293b" stroke="#94a3b8" strokeWidth={1.5} />
                <circle cx={-3} cy={-6} r={1.8} fill="#fbbf24" />
                <circle cx={3} cy={-6} r={1.8} fill="#fbbf24" />
              </g>
            </g>
            {/* Head */}
            <g transform="translate(0, -82)">
              <path d="M -30,-10 Q -36,-58 0,-68 Q 36,-58 30,-10 Z" fill="#291d18" />
              <ellipse cx={0} cy={-58} rx={20} ry={16} fill="#3f2c22" />
              <path d="M 10,-64 A 11,11 0 1,0 24,-50 A 8,8 0 1,1 10,-64 Z" fill="#f8fafc" />
              <ellipse cx={0} cy={0} rx={30} ry={34} fill="url(#shivaSkin)" stroke="#64748b" strokeWidth={1.5} />
              <ellipse cx={0} cy={32} rx={12} ry={8} fill="#2563eb" opacity={0.72} />
              <path d="M -16,-16 Q 0,-19 16,-16 M -15,-11 Q 0,-14 15,-11" fill="none" stroke="#ffffff" strokeWidth={2.2} />
              <ellipse cx={0} cy={-13} rx={2.5} ry={5} fill="#ef4444" />
              <g transform={`scale(1, ${blink})`} style={{ transformOrigin: "0px -2px" }}>
                <ellipse cx={-11} cy={-3} rx={5.5} ry={3.8} fill="#ffffff" />
                <circle cx={-11} cy={-3} r={2.5} fill="#0f172a" />
                <ellipse cx={11} cy={-3} rx={5.5} ry={3.8} fill="#ffffff" />
                <circle cx={11} cy={-3} r={2.5} fill="#0f172a" />
              </g>
              <path
                d={`M -9,14 Q 0,${20 + mouthOpen} 9,14`}
                fill={speakingEnergy > 0.15 ? "#7f1d1d" : "none"}
                stroke="#0f172a"
                strokeWidth={2.4}
                strokeLinecap="round"
              />
            </g>
          </g>
        )}

        {/* Dream Hologram Bubbles for S06 ("अचकन पहन लो, सेहरा पहन लो, सिर पर पाग पहन के...") */}
        {dreamOverlay !== "none" && (
          <g transform={`translate(-190, -185)`} opacity={0.94}>
            <circle cx={75} cy={100} r={8} fill="#ffe484" opacity={0.6} />
            <circle cx={52} cy={72} r={14} fill="#ffe484" opacity={0.72} />
            <rect x={-95} y={-80} width={220} height={130} rx={28} fill="rgba(30, 27, 75, 0.78)" stroke="#fbbf24" strokeWidth={2.5} strokeDasharray="8 5" />
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
