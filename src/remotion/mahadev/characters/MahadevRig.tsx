import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { breathe, clothWave, pendulumSwing } from "../motion/physics";
import { CobraHood, OrnateTrishulWithDamaru } from "./DetailedSerpents";

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
      }}
    >
      <svg width={820} height={620} viewBox="-410 -320 820 620" overflow="visible">
        {/* Ornate Etched Trishul + Pendulum-Swaying Damaru Planted in Carved Rock Socket */}
        <g transform="translate(245, 132)">
          <path d="M -28,30 L -18,0 L 18,0 L 28,30 Z" fill="#334155" stroke="#0b1120" strokeWidth={2.5} />
          <path d="M -18,4 L 18,4" stroke="#94a3b8" strokeWidth={2} />
        </g>
        <OrnateTrishulWithDamaru t={t} x={245} y={-2} scale={1.16} />

        {/* Sculpted Basalt Mountain Seat with Raised Bolster Ridge & Moonlit Rim Highlight */}
        <path
          d="M -295,192 Q -255,96 -155,88 Q -40,80 120,104 Q 245,112 285,192 Z"
          fill="#293548"
          stroke="#0b1120"
          strokeWidth={3.2}
        />
        <path
          d="M -280,185 Q -235,108 -148,100 Q -20,94 125,116 Q 230,124 268,185"
          fill="none"
          stroke="#bae6fd"
          strokeWidth={2.2}
          opacity={0.45}
        />

        {pose === "lounging" ? (
          /* POSE 1: Anatomically Grounded, Majestic Reclining Mahadev ("बाघंबर लपेटे, हाथ की तकिया लगाए") */
          <g transform={`translate(0, ${br.chestExpand * 0.4})`}>
            <circle cx={-105} cy={-44} r={155} fill="#38bdf8" opacity={0.14} />
            <circle cx={-105} cy={-44} r={108} fill="#bae6fd" opacity={0.18} />

            {/* Lush Layered Baghambar Spread & Bolster Cushion Under Elbow */}
            <path
              d="M -225,124 Q -175,44 -85,48 Q 35,48 165,58 Q 210,82 215,128 Q 95,152 -225,124 Z"
              fill="#d97706"
              stroke="#0b1120"
              strokeWidth={3}
            />
            <path
              d="M -216,120 Q -145,76 -75,78 Q 40,84 185,124 Q 80,144 -216,120 Z"
              fill="#f59e0b"
              opacity={0.65}
            />
            {/* Raised Tiger-Skin Bolster Mound supporting Elbow */}
            <ellipse cx={-168} cy={78} rx={48} ry={24} fill="#b45309" stroke="#0b1120" strokeWidth={2.6} />
            <path d="M -218,124 Q -105,140 0,142 Q 105,142 210,128" fill="none" stroke="#fef3c7" strokeWidth={3} strokeDasharray="6 6" opacity={0.6} />
            {[-148, -96, -42, 12, 66, 122, 168].map((sx, idx) => (
              <path
                key={idx}
                d={`M ${sx},${64 + (idx % 2) * 10} Q ${sx + 10},88 ${sx - 8},114`}
                fill="none"
                stroke="#451a03"
                strokeWidth={5.2}
                strokeLinecap="round"
                opacity={0.84}
              />
            ))}

            {/* Back/Lower Extended Leg (clearly visible along Baghambar!) */}
            <g>
              <path d="M 18,92 Q 96,104 176,106" fill="none" stroke="#0b1120" strokeWidth={32} strokeLinecap="round" />
              <path d="M 18,92 Q 96,104 176,106" fill="none" stroke="#cbd5e1" strokeWidth={26} strokeLinecap="round" />
              <ellipse cx={162} cy={106} rx={5.5} ry={13} fill="none" stroke="#f8fafc" strokeWidth={4} />
              <path d="M 174,98 Q 194,94 198,112 Q 184,118 172,112 Z" fill="#cbd5e1" stroke="#0b1120" strokeWidth={2.4} />
            </g>

            {/* Front/Upper Bent Leg (Natural Relaxed Reclining Knee-Up Pose!) */}
            <g>
              {/* Thigh angling up to bent knee */}
              <path d="M 12,76 Q 68,38 98,38" fill="none" stroke="#0b1120" strokeWidth={35} strokeLinecap="round" />
              <path d="M 12,76 Q 68,38 98,38" fill="none" stroke="#dce6f2" strokeWidth={29} strokeLinecap="round" />
              {/* Lower Shin angling down cleanly to rested ankle & foot */}
              <path d="M 98,38 Q 124,70 132,112" fill="none" stroke="#0b1120" strokeWidth={31} strokeLinecap="round" />
              <path d="M 98,38 Q 124,70 132,112" fill="none" stroke="#dce6f2" strokeWidth={25} strokeLinecap="round" />
              {/* Thigh/Calf Cel-Shading */}
              <path d="M 32,68 Q 66,46 88,46" fill="none" stroke="#93b4d8" strokeWidth={7} strokeLinecap="round" opacity={0.5} />
              {/* Silver Kada Anklet & Detailed Rested Foot */}
              <ellipse cx={130} cy={104} rx={13} ry={5.5} fill="none" stroke="#ffffff" strokeWidth={4.2} />
              <path d="M 125,112 Q 152,108 158,122 Q 140,128 122,120 Z" fill="#e2e8f0" stroke="#0b1120" strokeWidth={2.5} />
            </g>

            {/* Baghambar Dhoti Wrap across Hips & Waist with Live Cobra Belt */}
            <path d="M -22,42 Q 18,32 52,58 L 42,108 Q 2,116 -28,100 Z" fill="#d97706" stroke="#0b1120" strokeWidth={2.8} />
            <path d="M -8,48 Q 18,68 12,98 M 14,48 Q 34,68 26,100" fill="none" stroke="#451a03" strokeWidth={4.5} strokeLinecap="round" opacity={0.85} />
            <path d="M -20,44 Q 8,70 28,96" fill="none" stroke="#15803d" strokeWidth={7} strokeLinecap="round" />
            <path d="M -20,44 Q 8,70 28,96" fill="none" stroke="#fde047" strokeWidth={2.2} strokeDasharray="4 4" strokeLinecap="round" />

            {/* Muscular Ash-Smeared Reclining Torso */}
            <path d="M -126,58 Q -84,8 28,36 L 38,94 L -112,96 Z" fill="#dce6f2" stroke="#0b1120" strokeWidth={3} />
            {/* Pectoral & Rib Shading + Rudraksha Mala + Tripundra on Chest */}
            <path d="M -92,46 Q -56,58 -30,42 M -70,68 Q -36,76 -6,66" fill="none" stroke="#6488b4" strokeWidth={2.6} strokeLinecap="round" opacity={0.68} />
            <path d="M -102,38 Q -58,76 -16,52" fill="none" stroke="#9a3412" strokeWidth={6} strokeDasharray="3 4" strokeLinecap="round" />
            <path d="M -60,40 Q -34,34 -12,42 M -58,49 Q -34,43 -14,51 M -56,58 Q -34,52 -16,60" fill="none" stroke="#ffffff" strokeWidth={3.2} strokeLinecap="round" />

            {/* Right Arm Planted on Bolster ("हाथ की तकिया लगाए") */}
            <path d="M -112,60 L -168,80 L -144,6" fill="none" stroke="#0b1120" strokeWidth={32} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M -112,60 L -168,80 L -144,6" fill="none" stroke="#dce6f2" strokeWidth={26} strokeLinecap="round" strokeLinejoin="round" />
            <ellipse cx={-139} cy={70} rx={6} ry={13.5} transform="rotate(20, -139, 70)" fill="none" stroke="#fbbf24" strokeWidth={4} />
            <ellipse cx={-154} cy={38} rx={12} ry={5} fill="none" stroke="#9a3412" strokeWidth={4.5} strokeDasharray="3 3" />
            {/* Open Palm Cradling Head */}
            <ellipse cx={-141} cy={2} rx={15} ry={11} fill="#e2e8f0" stroke="#0b1120" strokeWidth={2.4} />

            {/* Left Arm Relaxed Along Raised Knee */}
            <path d="M -12,40 Q 44,24 92,38" fill="none" stroke="#0b1120" strokeWidth={29} strokeLinecap="round" />
            <path d="M -12,40 Q 44,24 92,38" fill="none" stroke="#dce6f2" strokeWidth={23} strokeLinecap="round" />
            <ellipse cx={28} cy={33} rx={6} ry={12.5} transform="rotate(-8, 28, 33)" fill="none" stroke="#fbbf24" strokeWidth={4} />
            <ellipse cx={72} cy={33} rx={5.5} ry={11.5} transform="rotate(8, 72, 33)" fill="none" stroke="#9a3412" strokeWidth={4} />
            <ellipse cx={96} cy={40} rx={12} ry={9} fill="#e2e8f0" stroke="#0b1120" strokeWidth={2.2} />

            {/* Coiled Vasuki Serpent around Neck */}
            <g transform="translate(-94, 28)">
              <path d="M -28,12 C -34,26 0,34 26,10" fill="none" stroke="#0b1120" strokeWidth={16} strokeLinecap="round" />
              <path d="M -28,12 C -34,26 0,34 26,10" fill="none" stroke="#1e293b" strokeWidth={11} strokeLinecap="round" />
              <path d="M -22,12 Q 0,27 22,10" fill="none" stroke="#64748b" strokeWidth={3.5} strokeDasharray="4 5" />
              <g transform={`translate(${26 + snakeSway * 0.4}, -14)`}>
                <CobraHood
                  scale={1.08}
                  bodyColor="#334155"
                  hoodColor="#1e293b"
                  bellyColor="#cbd5e1"
                  markColor="#fbbf24"
                  eyeColor="#ef4444"
                  tongueOut={tongueFlick}
                  rotation={snakeSway}
                />
              </g>
            </g>

            {/* Mahadev's Sculpted Head Cradled in Palm */}
            <g transform={`translate(-122, -16) rotate(${-12 + br.headNod})`}>
              <path d={`M -30,-6 Q ${-46 + jataSway},18 ${-40 + jataSway * 1.3},42`} fill="none" stroke="#291d18" strokeWidth={9} strokeLinecap="round" />
              <path d={`M 30,-6 Q ${46 - jataSway * 0.6},18 ${38 - jataSway},42`} fill="none" stroke="#291d18" strokeWidth={9} strokeLinecap="round" />
              <path d="M -30,-12 Q -38,-58 0,-68 Q 38,-58 30,-12 Z" fill="#291d18" stroke="#573d30" strokeWidth={1.5} />
              <ellipse cx={0} cy={-60} rx={21} ry={17} fill="#3f2c22" stroke="#573d30" strokeWidth={1.5} />
              <path d="M -19,-46 Q 0,-40 19,-46" fill="none" stroke="#b45309" strokeWidth={5.5} strokeDasharray="3 4" strokeLinecap="round" />
              <circle cx={16} cy={-55} r={16} fill="#e0f2fe" opacity={0.28} />
              <path d="M 10,-65 A 12,12 0 1,0 26,-50 A 9,9 0 1,1 10,-65 Z" fill="#ffffff" />
              <path d={`M -6,-72 Q -22,${-44 + gangaOffset * 0.22} -32,-8`} fill="none" stroke="#e0f2fe" strokeWidth={3.8} strokeDasharray="9 5" opacity={0.88} />
              <ellipse cx={0} cy={0} rx={31} ry={35} fill="#dce6f2" stroke="#0b1120" strokeWidth={3} />
              <ellipse cx={0} cy={32} rx={13} ry={8} fill="#2563eb" opacity={0.85} />
              <circle cx={-32} cy={10} r={5.5} fill="#7c2d12" stroke="#fbbf24" strokeWidth={1.6} />
              <circle cx={32} cy={10} r={5.5} fill="#7c2d12" stroke="#fbbf24" strokeWidth={1.6} />
              <path d="M -17,29 Q 0,44 17,29" fill="none" stroke="#9a3412" strokeWidth={6} strokeDasharray="3 4" strokeLinecap="round" />
              <path d="M -17,-16 Q 0,-20 17,-16 M -16,-11 Q 0,-15 16,-11" fill="none" stroke="#ffffff" strokeWidth={2.5} strokeLinecap="round" />
              <ellipse cx={0} cy={-13} rx={2.8} ry={5.5} fill="#ef4444" stroke="#fde047" strokeWidth={0.8} />
              <path d="M 0,-6 L -2,6 L 2,7" fill="none" stroke="#6488b4" strokeWidth={1.6} strokeLinecap="round" />
              <g transform={`scale(1, ${blink})`} style={{ transformOrigin: "0px -2px" }}>
                <path d="M -19,-2 Q -12,-6 -5,-2" fill="none" stroke="#0f172a" strokeWidth={2.8} strokeLinecap="round" />
                <circle cx={-12} cy={-2} r={2.5} fill="#0f172a" />
                <path d="M 5,-2 Q 12,-6 19,-2" fill="none" stroke="#0f172a" strokeWidth={2.8} strokeLinecap="round" />
                <circle cx={12} cy={-2} r={2.5} fill="#0f172a" />
              </g>
              <path d={`M -9,15 Q 0,${20 + mouthOpen} 9,15`} fill="none" stroke="#1e293b" strokeWidth={2.4} strokeLinecap="round" />
            </g>
          </g>
        ) : (
          /* POSE 2: Sitting Upright Muscular Padmasana + Abhaya Blessing Hand */
          <g transform={`translate(0, ${br.chestExpand * 0.4})`}>
            <circle cx={0} cy={-78} r={150} fill="#38bdf8" opacity={0.14} />
            <circle cx={0} cy={-78} r={106} fill="#bae6fd" opacity={0.18} />
            <path d="M -98,96 Q 0,134 98,96 Q 114,54 46,48 L -46,48 Q -114,54 -98,96 Z" fill="#d97706" stroke="#0b1120" strokeWidth={3} />
            {[-58, -22, 22, 58].map((sx, i) => (
              <path key={i} d={`M ${sx},60 Q ${sx + 6},85 ${sx - 6},106`} fill="none" stroke="#451a03" strokeWidth={5} strokeLinecap="round" opacity={0.8} />
            ))}
            <path d="M -54,-38 Q 0,-50 54,-38 L 42,56 L -42,56 Z" fill="#dce6f2" stroke="#0b1120" strokeWidth={3} />
            <path d="M -36,-14 Q -18,-6 -4,-16 M 4,-16 Q 18,-6 36,-14" fill="none" stroke="#475569" strokeWidth={2.4} opacity={0.7} />
            <path d="M -28,-22 Q 0,-28 28,-22 M -26,-12 Q 0,-18 26,-12" fill="none" stroke="#ffffff" strokeWidth={3.2} />
            <path d="M -50,-28 Q -78,28 -60,78" fill="none" stroke="#0b1120" strokeWidth={30} strokeLinecap="round" />
            <path d="M -50,-28 Q -78,28 -60,78" fill="none" stroke="#dce6f2" strokeWidth={24} strokeLinecap="round" />
            <ellipse cx={-66} cy={4} rx={12} ry={5} transform="rotate(14, -66, 4)" fill="none" stroke="#fbbf24" strokeWidth={4} />
            <g transform={`translate(50, -28) rotate(${-15 - Math.sin(t * 3.8) * 7})`}>
              <path d="M 0,0 Q 36,-14 48,-56" fill="none" stroke="#0b1120" strokeWidth={30} strokeLinecap="round" />
              <path d="M 0,0 Q 36,-14 48,-56" fill="none" stroke="#dce6f2" strokeWidth={24} strokeLinecap="round" />
              <ellipse cx={28} cy={-16} rx={6} ry={13} transform="rotate(-48, 28, -16)" fill="none" stroke="#fbbf24" strokeWidth={4} />
              <ellipse cx={50} cy={-66} rx={12} ry={15} fill="#f8fafc" stroke="#0b1120" strokeWidth={2} />
              <circle cx={50} cy={-66} r={30} fill="#bae6fd" opacity={0.32 + 0.16 * Math.sin(t * 4.5)} />
            </g>
            <g transform="translate(0, -38)">
              <path d="M -30,8 C -36,24 0,32 30,8" fill="none" stroke="#0b1120" strokeWidth={16} strokeLinecap="round" />
              <path d="M -30,8 C -36,24 0,32 30,8" fill="none" stroke="#1e293b" strokeWidth={11} strokeLinecap="round" />
              <path d="M -24,9 Q 0,24 24,9" fill="none" stroke="#64748b" strokeWidth={3.5} strokeDasharray="4 5" />
              <g transform={`translate(${30 + snakeSway * 0.4}, -16)`}>
                <CobraHood
                  scale={1.05}
                  bodyColor="#334155"
                  hoodColor="#1e293b"
                  bellyColor="#cbd5e1"
                  markColor="#fbbf24"
                  eyeColor="#ef4444"
                  tongueOut={tongueFlick}
                  rotation={snakeSway}
                />
              </g>
            </g>
            <g transform={`translate(0, ${-86 + br.headNod * 0.6})`}>
              <path d={`M -30,-6 Q ${-42 + jataSway},18 ${-36 + jataSway},38`} fill="none" stroke="#291d18" strokeWidth={8} strokeLinecap="round" />
              <path d={`M 30,-6 Q ${42 - jataSway},18 ${36 - jataSway},38`} fill="none" stroke="#291d18" strokeWidth={8} strokeLinecap="round" />
              <path d="M -31,-10 Q -37,-58 0,-68 Q 37,-58 31,-10 Z" fill="#291d18" />
              <ellipse cx={0} cy={-58} rx={21} ry={17} fill="#3f2c22" />
              <path d="M 10,-64 A 12,12 0 1,0 26,-49 A 9,9 0 1,1 10,-64 Z" fill="#ffffff" />
              <ellipse cx={0} cy={0} rx={31} ry={35} fill="#dce6f2" stroke="#0b1120" strokeWidth={3} />
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
