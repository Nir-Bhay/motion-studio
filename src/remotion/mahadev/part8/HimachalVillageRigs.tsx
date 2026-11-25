import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

const OUTLINE = "#1a0b2e";

// Expressive Himachali Village Child with Pahadi Cap, Embroidered Vest, Sweat Drops & Running/Panting/Peeking Modes
export const HimachaliChildRig: React.FC<{
  x: number;
  y: number;
  scale?: number;
  mode?: "peeking" | "running" | "panting";
  shirtColor?: string;
  vestColor?: string;
  flipX?: boolean;
  phase?: number;
}> = ({
  x,
  y,
  scale = 1,
  mode = "peeking",
  shirtColor = "#fef3c7",
  vestColor = "#be123c",
  flipX = false,
  phase = 0,
}) => {
  const frame = useCurrentFrame();
  const runCycle = mode === "running" ? Math.sin(frame * 0.55 + phase) * 26 : 0;
  const pantHeave = mode === "panting" ? Math.sin(frame * 0.45 + phase) * 4 : 0;
  const bounce = mode === "running" ? Math.abs(Math.sin(frame * 0.55 + phase)) * -14 : 0;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + bounce,
        transform: `translate(-50%, -50%) scale(${flipX ? -scale : scale}, ${scale})`,
        pointerEvents: "none",
      }}
    >
      <svg width={180} height={240} viewBox="-90 -120 180 240" overflow="visible">
        <ellipse cx={0} cy={98} rx={36} ry={8} fill="#090414" opacity={0.35} />

        {/* Legs */}
        <line x1={-12} y1={38} x2={-16 - runCycle * 0.8} y2={92} stroke={OUTLINE} strokeWidth={15} strokeLinecap="round" />
        <line x1={-12} y1={38} x2={-16 - runCycle * 0.8} y2={92} stroke="#92400e" strokeWidth={9.5} strokeLinecap="round" />
        <line x1={12} y1={38} x2={16 + runCycle * 0.8} y2={92} stroke={OUTLINE} strokeWidth={15} strokeLinecap="round" />
        <line x1={12} y1={38} x2={16 + runCycle * 0.8} y2={92} stroke="#b45309" strokeWidth={9.5} strokeLinecap="round" />

        {/* Kurta & Embroidered Himachali Vest */}
        <path d={`M-24,${-24 + pantHeave} L24,${-24 + pantHeave} L28,44 L-28,44 Z`} fill={shirtColor} stroke={OUTLINE} strokeWidth={2.8} />
        <path d={`M-22,${-22 + pantHeave} L-4,${-22 + pantHeave} L-4,32 L-24,32 Z`} fill={vestColor} stroke={OUTLINE} strokeWidth={2.2} />
        <path d={`M4,${-22 + pantHeave} L22,${-22 + pantHeave} L24,32 L4,32 Z`} fill={vestColor} stroke={OUTLINE} strokeWidth={2.2} />
        <rect x={-26} y={32} width={52} height={8} rx={3} fill="#fbbf24" stroke={OUTLINE} strokeWidth={2} />

        {/* Arms */}
        {mode === "panting" ? (
          <>
            {/* One hand pressed tightly on pounding chest! */}
            <path d="M-24,-14 Q-42,6 -12,8" fill="none" stroke={OUTLINE} strokeWidth={13} strokeLinecap="round" />
            <path d="M-24,-14 Q-42,6 -12,8" fill="none" stroke="#fdba74" strokeWidth={8} strokeLinecap="round" />
            <path d="M24,-14 Q42,10 26,28" fill="none" stroke={OUTLINE} strokeWidth={13} strokeLinecap="round" />
            <path d="M24,-14 Q42,10 26,28" fill="none" stroke="#fdba74" strokeWidth={8} strokeLinecap="round" />
            {/* Thumping heart pulse lines */}
            <circle cx={-8} cy={6} r={8 + pantHeave * 0.7} fill="none" stroke="#ef4444" strokeWidth={2.2} opacity={0.75} />
          </>
        ) : (
          <>
            <path d={`M-24,-14 Q-42,${mode === "running" ? -34 + runCycle * 0.5 : 8} -36,${mode === "running" ? -48 + runCycle * 0.5 : 24}`} fill="none" stroke={OUTLINE} strokeWidth={13} strokeLinecap="round" />
            <path d={`M-24,-14 Q-42,${mode === "running" ? -34 + runCycle * 0.5 : 8} -36,${mode === "running" ? -48 + runCycle * 0.5 : 24}`} fill="none" stroke="#fdba74" strokeWidth={8} strokeLinecap="round" />
            <path d={`M24,-14 Q42,${mode === "running" ? -34 - runCycle * 0.5 : 8} 36,${mode === "running" ? -48 - runCycle * 0.5 : 24}`} fill="none" stroke={OUTLINE} strokeWidth={13} strokeLinecap="round" />
            <path d={`M24,-14 Q42,${mode === "running" ? -34 - runCycle * 0.5 : 8} 36,${mode === "running" ? -48 - runCycle * 0.5 : 24}`} fill="none" stroke="#fdba74" strokeWidth={8} strokeLinecap="round" />
          </>
        )}

        {/* Head & Traditional Himachali Cap */}
        <g transform={`translate(0, ${-52 + pantHeave * 0.6})`}>
          <circle cx={0} cy={0} r={24} fill="#fdba74" stroke={OUTLINE} strokeWidth={2.8} />
          {/* Himachali Pahadi Topi */}
          <path d="M-24,-8 Q0,-34 24,-8 L22,-18 Q0,-30 -22,-18 Z" fill="#15803d" stroke={OUTLINE} strokeWidth={2.2} />
          <path d="M-23,-8 L23,-8 L20,-20 L-20,-20 Z" fill="#dc2626" stroke={OUTLINE} strokeWidth={2.2} />
          <line x1={-20} y1={-12} x2={20} y2={-12} stroke="#fde047" strokeWidth={2.5} strokeDasharray="4 3" />

          {/* Wide-Eyed Shock / Sweat Drops when Running or Panting */}
          <ellipse cx={-9} cy={-1} rx={5.2} ry={mode === "peeking" ? 3.5 : 6} fill="#ffffff" stroke={OUTLINE} strokeWidth={1.5} />
          <circle cx={-9} cy={-1} r={2.2} fill={OUTLINE} />
          <ellipse cx={9} cy={-1} rx={5.2} ry={mode === "peeking" ? 3.5 : 6} fill="#ffffff" stroke={OUTLINE} strokeWidth={1.5} />
          <circle cx={9} cy={-1} r={2.2} fill={OUTLINE} />

          {mode === "peeking" ? (
            <path d="M-6,12 Q0,17 6,12" fill="none" stroke={OUTLINE} strokeWidth={2.2} />
          ) : (
            <>
              <ellipse cx={0} cy={14} rx={7} ry={6 + Math.abs(pantHeave) * 0.6} fill="#7f1d1d" stroke={OUTLINE} strokeWidth={1.8} />
              {/* Sweat Drops */}
              <path d="M22,-14 Q28,-8 22,-2 Q16,-8 22,-14 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth={1.2} />
              <path d="M-24,-6 Q-30,0 -24,6 Q-18,0 -24,-6 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth={1.2} />
            </>
          )}
        </g>
      </svg>
    </div>
  );
};

// Worried Himachali Mother & Father ("माई-बाप पूछन लगे आंचल सो झांक")
export const WorriedParentRig: React.FC<{
  x: number;
  y: number;
  scale?: number;
  role: "mother" | "father";
  speakingEnergy?: number;
}> = ({ x, y, scale = 1, role, speakingEnergy = 0 }) => {
  const frame = useCurrentFrame();
  const sway = Math.sin(frame * 0.08) * 2.5;
  const mouthOpen = 2 + speakingEnergy * 7;

  return (
    <div style={{ position: "absolute", left: x, top: y + sway, transform: `translate(-50%, -50%) scale(${scale})`, pointerEvents: "none" }}>
      <svg width={210} height={320} viewBox="-105 -160 210 320" overflow="visible">
        <ellipse cx={0} cy={132} rx={50} ry={10} fill="#090414" opacity={0.35} />
        {role === "mother" ? (
          <>
            {/* Flowing Aanchal Veil */}
            <path d="M-36,-116 Q-64,-45 -56,64 L-24,52 Z" fill="#f43f5e" stroke={OUTLINE} strokeWidth={2.4} />
            <path d="M36,-116 Q64,-45 56,64 L24,52 Z" fill="#f43f5e" stroke={OUTLINE} strokeWidth={2.4} />
            {/* Sari Skirt & Choli */}
            <path d="M-36,-12 L36,-12 L52,126 Q0,140 -52,126 Z" fill="#0f766e" stroke={OUTLINE} strokeWidth={3} />
            <path d="M-46,112 Q0,126 46,112" fill="none" stroke="#fde047" strokeWidth={5} />
            <path d="M-28,-56 L28,-56 L36,-12 L-36,-12 Z" fill="#14b8a6" stroke={OUTLINE} strokeWidth={2.6} />
            {/* Aanchal held near face ("आंचल से झांक") */}
            <path d="M-28,-46 Q-56,-22 -48,-62 Q-26,-78 -14,-66" fill="none" stroke="#e11d48" strokeWidth={14} strokeLinecap="round" />
            <path d="M28,-46 Q52,-18 38,14" fill="none" stroke="#f7be9c" strokeWidth={11} strokeLinecap="round" />
            <circle cx={0} cy={-90} r={27} fill="#f7be9c" stroke={OUTLINE} strokeWidth={2.8} />
            <path d="M-27,-96 Q0,-124 27,-96 Q14,-108 0,-106 Q-14,-108 -27,-96 Z" fill="#0f172a" />
            <circle cx={0} cy={-102} r={3.5} fill="#dc2626" />
          </>
        ) : (
          <>
            {/* Father's Kurta, Dhoti & Himachali Shawl */}
            <path d="M-32,8 L32,8 L38,124 L-38,124 Z" fill="#fffbeb" stroke={OUTLINE} strokeWidth={3} />
            <path d="M-34,-56 Q0,-64 34,-56 L32,12 L-32,12 Z" fill="#d97706" stroke={OUTLINE} strokeWidth={2.8} />
            <path d="M-34,-54 Q-44,-8 -30,36 L-14,32 Z" fill="#78350f" stroke={OUTLINE} strokeWidth={2.4} />
            <path d="M34,-48 Q54,-20 42,10" fill="none" stroke="#fdba74" strokeWidth={11} strokeLinecap="round" />
            <circle cx={0} cy={-90} r={27} fill="#fdba74" stroke={OUTLINE} strokeWidth={2.8} />
            {/* Turban */}
            <path d="M-28,-96 Q0,-134 28,-96 Z" fill="#ea580c" stroke={OUTLINE} strokeWidth={2.6} />
            <circle cx={0} cy={-114} r={5} fill="#fde047" />
            <path d="M-13,-78 Q-5,-83 0,-79 Q5,-83 13,-78" fill="none" stroke="#e2e8f0" strokeWidth={3.5} strokeLinecap="round" />
          </>
        )}
        <ellipse cx={-10} cy={-92} rx={4.5} ry={3.5} fill="#ffffff" stroke={OUTLINE} strokeWidth={1.3} />
        <circle cx={-10} cy={-92} r={2} fill={OUTLINE} />
        <ellipse cx={10} cy={-92} rx={4.5} ry={3.5} fill="#ffffff" stroke={OUTLINE} strokeWidth={1.3} />
        <circle cx={10} cy={-92} r={2} fill={OUTLINE} />
        <path d="M-16,-100 Q-10,-104 -4,-100 M4,-100 Q10,-104 16,-100" fill="none" stroke={OUTLINE} strokeWidth={2} />
        <ellipse cx={0} cy={-74} rx={5.5} ry={mouthOpen * 0.45} fill="#7f1d1d" stroke={OUTLINE} strokeWidth={1.6} />
      </svg>
    </div>
  );
};

// Warm Cozy Himachali Home Interior Backdrop for Panting Kids & Worried Parents
export const VillageInteriorBackdrop: React.FC = () => (
  <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
    {/* Warm Sandstone & Mud-Plaster Interior Walls */}
    <rect x={0} y={0} width={1920} height={1080} fill="#3d192c" />
    <rect x={0} y={140} width={1920} height={600} fill="#5c2838" />
    {/* Carved Timber Wall Beams & Decorative Border */}
    <rect x={0} y={120} width={1920} height={32} fill="#78350f" stroke={OUTLINE} strokeWidth={3} />
    <rect x={0} y={715} width={1920} height={365} fill="#2e1024" stroke="#92400e" strokeWidth={3} />
    {/* Woven Floor Dari Rug */}
    <ellipse cx={960} cy={805} rx={620} ry={48} fill="#9f1239" stroke="#fbbf24" strokeWidth={3} />
    <ellipse cx={960} cy={805} rx={480} ry={32} fill="#be123c" stroke="#fde047" strokeWidth={2} strokeDasharray="10 6" />
    {/* Wall Niches (Aala) with Glowing Brass Diyas */}
    {[240, 1680].map((nx, idx) => (
      <g key={idx} transform={`translate(${nx}, 350)`}>
        <path d="M-55,90 L-55,-30 Q0,-85 55,-30 L55,90 Z" fill="#2e0f1e" stroke="#fbbf24" strokeWidth={3} />
        <rect x={-16} y={66} width={32} height={14} rx={4} fill="#d97706" stroke={OUTLINE} strokeWidth={2} />
        <path d="M-8,66 Q0,34 8,66 Z" fill="#f97316" />
        <path d="M-4,66 Q0,44 4,66 Z" fill="#fef08a" />
      </g>
    ))}
    {/* Closed Interior Wooden Doorway */}
    <rect x={760} y={240} width={400} height={475} fill="#7c2d12" stroke="#fbbf24" strokeWidth={4} />
    <line x1={960} y1={240} x2={960} y2={715} stroke={OUTLINE} strokeWidth={4} />
    <rect x={925} y={455} width={70} height={16} rx={5} fill="#fbbf24" stroke={OUTLINE} strokeWidth={2.5} />
    {/* Shuttered Interior Windows */}
    {[530, 1390].map((wx, i) => (
      <g key={i} transform={`translate(${wx}, 370)`}>
        <rect x={-55} y={-75} width={110} height={150} rx={6} fill="#1e1b4b" stroke="#fbbf24" strokeWidth={3.5} />
        <line x1={0} y1={-75} x2={0} y2={75} stroke="#92400e" strokeWidth={5} />
        <line x1={-55} y1={0} x2={55} y2={0} stroke="#92400e" strokeWidth={5} />
      </g>
    ))}
  </svg>
);

// Carved Himachali Wooden House Doorway with Animated Slamming Kivaad & Window
export const VillageHouseDoorRig: React.FC<{
  x: number;
  y: number;
  doorClosedProgress: number; // 0 = wide open, 1 = slammed shut & latched!
  knockShake?: number;
}> = ({ x, y, doorClosedProgress, knockShake = 0 }) => {
  const p = Math.max(0, Math.min(1, doorClosedProgress));
  const panelWidth = interpolate(p, [0, 1], [24, 118]);

  return (
    <div style={{ position: "absolute", left: x + knockShake, top: y, transform: "translate(-50%, -50%)", pointerEvents: "none" }}>
      <svg width={620} height={540} viewBox="-310 -270 620 540" overflow="visible">
        {/* Carved Himachali Stone & Timber House Facade */}
        <rect x={-280} y={-210} width={560} height={450} rx={8} fill="#7c2d12" stroke={OUTLINE} strokeWidth={4} />
        {/* Sloped Slate Roof */}
        <polygon points="-320,-200 0,-285 320,-200" fill="#334155" stroke={OUTLINE} strokeWidth={4} />
        <polygon points="-300,-200 0,-268 300,-200" fill="#475569" />
        {/* Decorative Wooden Beam */}
        <rect x={-285} y={-205} width={570} height={20} fill="#92400e" stroke="#fbbf24" strokeWidth={2.5} />

        {/* Dark Interior Doorway Frame */}
        <rect x={-124} y={-115} width={248} height={355} fill="#1e0924" stroke="#fbbf24" strokeWidth={4} />

        {/* Left & Right Wooden Kivaad Doors Closing */}
        <g>
          <rect x={-120} y={-111} width={panelWidth} height={347} fill="#9a3412" stroke={OUTLINE} strokeWidth={3} />
          <rect x={-112} y={-90} width={Math.max(4, panelWidth - 16)} height={120} fill="#7c2d12" stroke="#fbbf24" strokeWidth={2} />
          <rect x={-112} y={55} width={Math.max(4, panelWidth - 16)} height={140} fill="#7c2d12" stroke="#fbbf24" strokeWidth={2} />
        </g>
        <g>
          <rect x={120 - panelWidth} y={-111} width={panelWidth} height={347} fill="#9a3412" stroke={OUTLINE} strokeWidth={3} />
          <rect x={128 - panelWidth} y={-90} width={Math.max(4, panelWidth - 16)} height={120} fill="#7c2d12" stroke="#fbbf24" strokeWidth={2} />
          <rect x={128 - panelWidth} y={55} width={Math.max(4, panelWidth - 16)} height={140} fill="#7c2d12" stroke="#fbbf24" strokeWidth={2} />
        </g>

        {/* Brass Latch ('सांकल') when closed */}
        {p > 0.85 && (
          <g transform="translate(0, 40)">
            <rect x={-26} y={-7} width={52} height={14} rx={5} fill="#fbbf24" stroke={OUTLINE} strokeWidth={2.2} />
            <circle cx={0} cy={0} r={6} fill="#dc2626" />
          </g>
        )}

        {/* Side Peeking Windows */}
        {[-215, 215].map((wx, idx) => (
          <g key={idx} transform={`translate(${wx}, -40)`}>
            <rect x={-38} y={-50} width={76} height={100} rx={6} fill="#fef3c7" stroke="#fbbf24" strokeWidth={3.5} />
            <line x1={0} y1={-50} x2={0} y2={50} stroke="#78350f" strokeWidth={4} />
            <line x1={-38} y1={0} x2={38} y2={0} stroke="#78350f" strokeWidth={4} />
          </g>
        ))}

        {/* Hanging Brass Lantern */}
        <g transform="translate(-155, -165)">
          <line x1={0} y1={-20} x2={0} y2={0} stroke="#fbbf24" strokeWidth={3} />
          <rect x={-12} y={0} width={24} height={34} rx={6} fill="#fef08a" stroke={OUTLINE} strokeWidth={2.5} />
          <circle cx={0} cy={17} r={7} fill="#f97316" />
        </g>
      </svg>
    </div>
  );
};

// Headless ('मुंडहीन') Barati Knocking at the Door
export const HeadlessBaratiRig: React.FC<{
  x: number;
  y: number;
  scale?: number;
  knocking?: boolean;
}> = ({ x, y, scale = 1, knocking = true }) => {
  const frame = useCurrentFrame();
  const knockMove = knocking ? Math.sin(frame * 0.65) * 14 : 0;
  const sway = Math.sin(frame * 0.1) * 3;

  return (
    <div style={{ position: "absolute", left: x, top: y + sway, transform: `translate(-50%, -50%) scale(${scale})`, pointerEvents: "none" }}>
      <svg width={240} height={320} viewBox="-120 -160 240 320" overflow="visible">
        <ellipse cx={0} cy={136} rx={52} ry={11} fill="#090414" opacity={0.42} />

        {/* Bare Feet & Spectral Dhoti */}
        <ellipse cx={-20} cy={128} rx={15} ry={7} fill="#94a3b8" stroke={OUTLINE} strokeWidth={2.4} />
        <ellipse cx={20} cy={128} rx={15} ry={7} fill="#94a3b8" stroke={OUTLINE} strokeWidth={2.4} />
        <path d="M-36,12 L36,12 L46,122 L-46,122 Z" fill="#4c1d95" stroke={OUTLINE} strokeWidth={3} />
        <path d="M-40,108 L40,108" stroke="#fbbf24" strokeWidth={5} />

        {/* Headless Muscular Torso + Eyes/Mouth on Chest (Mythological Kabandha/Mukh-Heen Style!) */}
        <path d="M-44,-72 Q0,-84 44,-72 L38,14 L-38,14 Z" fill="#a855f7" stroke={OUTLINE} strokeWidth={3.2} />
        {/* Smooth Neckless Flat Collar + Marigold Wedding Garland */}
        <ellipse cx={0} cy={-74} rx={22} ry={8} fill="#7e22ce" stroke={OUTLINE} strokeWidth={2.8} />
        <path d="M-30,-68 Q0,-34 30,-68" fill="none" stroke="#f97316" strokeWidth={9} strokeLinecap="round" />
        <path d="M-30,-68 Q0,-34 30,-68" fill="none" stroke="#facc15" strokeWidth={4} strokeDasharray="5 5" />

        {/* Left Arm holding Wedding Kalash */}
        <path d="M-42,-62 Q-66,-28 -54,10" fill="none" stroke={OUTLINE} strokeWidth={17} strokeLinecap="round" />
        <path d="M-42,-62 Q-66,-28 -54,10" fill="none" stroke="#a855f7" strokeWidth={11} strokeLinecap="round" />
        <circle cx={-54} cy={12} r={8} fill="#c084fc" stroke={OUTLINE} strokeWidth={2} />

        {/* Right Arm Raised Knocking on Door */}
        <g transform={`translate(42, -62) rotate(${knockMove})`}>
          <path d="M0,0 Q34,-24 44,-54" fill="none" stroke={OUTLINE} strokeWidth={17} strokeLinecap="round" />
          <path d="M0,0 Q34,-24 44,-54" fill="none" stroke="#a855f7" strokeWidth={11} strokeLinecap="round" />
          <circle cx={46} cy={-58} r={10} fill="#c084fc" stroke={OUTLINE} strokeWidth={2.4} />
        </g>

        {/* Eerie Spectral Aura where Head would be */}
        <circle cx={0} cy={-98} r={18} fill="none" stroke="#c084fc" strokeWidth={2} strokeDasharray="4 4" opacity={0.65} />
      </svg>
    </div>
  );
};
