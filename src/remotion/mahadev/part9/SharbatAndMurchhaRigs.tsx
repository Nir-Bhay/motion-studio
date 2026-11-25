import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { breathe, clothWave } from "../motion/physics";

const OUTLINE = "#1a0b2e";

// Comic Sharbat Stall + Pouring Pitcher & Splashing Puddles
export const SharbatStationRig: React.FC<{
  x: number;
  y: number;
  scale?: number;
  splashProgress?: number; // 0..1 when Baratis dump sharbat over themselves
}> = ({ x, y, scale = 1, splashProgress = 0 }) => {
  const frame = useCurrentFrame();
  const wobble = Math.sin(frame * 0.25) * splashProgress * 5;
  const dropY = (frame * 6) % 70;

  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%, -50%) scale(${scale})`, pointerEvents: "none" }}>
      <svg width="320" height="290" viewBox="-160 -150 320 290" overflow="visible">
        <ellipse cx={0} cy={122} rx={125} ry={18} fill="#14071e" opacity={0.45} />
        {/* Splashed Rose-Pink Sharbat Puddle on Ground */}
        {splashProgress > 0.1 && (
          <ellipse cx={-18} cy={118} rx={98 * splashProgress} ry={16 * splashProgress} fill="#fb7185" stroke="#be123c" strokeWidth={2.5} opacity={0.9} />
        )}
        {/* Wooden Stall Table */}
        <rect x={-95} y={32} width={190} height={18} rx={4} fill="#92400e" stroke={OUTLINE} strokeWidth={3} />
        <rect x={-80} y={50} width={16} height={70} fill="#78350f" stroke={OUTLINE} strokeWidth={2.5} />
        <rect x={64} y={50} width={16} height={70} fill="#78350f" stroke={OUTLINE} strokeWidth={2.5} />
        {/* Big Terracotta/Brass Matka Full of Rose Sharbat */}
        <g transform={`translate(-18, -10) rotate(${wobble})`}>
          <ellipse cx={0} cy={10} rx={42} ry={40} fill="#e11d48" stroke={OUTLINE} strokeWidth={3} />
          <ellipse cx={0} cy={10} rx={34} ry={30} fill="#f43f5e" />
          <path d="M-24,-22 L24,-22 L18,-36 L-18,-36 Z" fill="#fbbf24" stroke={OUTLINE} strokeWidth={3} />
          <ellipse cx={0} cy={-36} rx={22} ry={6} fill="#fda4af" stroke={OUTLINE} strokeWidth={2.5} />
          {/* Tilted Pouring Splash */}
          {splashProgress > 0.25 && (
            <>
              <path d="M22,-32 Q65,-18 76,55 Q58,64 46,20 Q34,-12 18,-26 Z" fill="#fb7185" opacity={0.92} />
              <circle cx={68} cy={10 + dropY * 0.4} r={6} fill="#fda4af" />
              <circle cx={82} cy={22 + dropY * 0.5} r={5} fill="#fb7185" />
            </>
          )}
        </g>
        {/* Brass Cups (Kulhad / Lota) */}
        {[42, 72].map((cx, i) => (
          <g key={i} transform={`translate(${cx}, 14)`}>
            <path d="M-11,-14 L11,-14 L8,16 L-8,16 Z" fill="#fbbf24" stroke={OUTLINE} strokeWidth={2.4} />
            <ellipse cx={0} cy={-14} rx={11} ry={4} fill="#fb7185" stroke={OUTLINE} strokeWidth={2} />
          </g>
        ))}
        {/* Signboard "ठंडा शरबत" */}
        <rect x={-64} y={58} width={128} height={36} rx={8} fill="#fef3c7" stroke={OUTLINE} strokeWidth={2.5} />
        <text x={0} y={82} textAnchor="middle" fill="#be123c" fontSize="20" fontWeight="700" fontFamily="'Noto Sans Devanagari', sans-serif">
          ठंडा शरबत
        </text>
      </svg>
    </div>
  );
};

// Mahadev Sitting Backwards on Nandi + Turning Reveal + Fierce Paan/Bhasma/Kajal Face
export const MahadevReverseNandiRig: React.FC<{
  x: number;
  y: number;
  scale?: number;
  facingBackwards?: boolean;
  veilLifted?: number; // 0 = snakes cover face, 1 = full fierce bhasma/kajal/paan face shown!
  speakingEnergy?: number;
}> = ({ x, y, scale = 1, facingBackwards = true, veilLifted = 0, speakingEnergy = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const br = breathe(t, 0, 2.8);
  const snakeSway = clothWave(t, 0.8, 6);
  const mouthOpen = 2 + speakingEnergy * 6;
  const step = Math.sin(t * 5.0) * 5;

  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%, -50%) scale(${scale})`, pointerEvents: "none" }}>
      <svg width="460" height="420" viewBox="-230 -240 460 420" overflow="visible">
        <ellipse cx={0} cy={145} rx={145} ry={22} fill="#14071e" opacity={0.45} />

        {/* NANDI BULL (Facing right towards Maina Devi at the gate) */}
        <g transform={`translate(0, ${br.chestExpand * 0.4})`}>
          {/* Legs */}
          <rect x={-78} y={62} width={22} height={76 + step * 0.4} rx={8} fill="#e2e8f0" stroke={OUTLINE} strokeWidth={3} />
          <rect x={-36} y={64} width={22} height={74 - step * 0.4} rx={8} fill="#f8fafc" stroke={OUTLINE} strokeWidth={3} />
          <rect x={34} y={64} width={22} height={74 + step * 0.4} rx={8} fill="#f8fafc" stroke={OUTLINE} strokeWidth={3} />
          <rect x={68} y={60} width={22} height={78 - step * 0.4} rx={8} fill="#e2e8f0" stroke={OUTLINE} strokeWidth={3} />
          {/* Hooves */}
          {[-67, -25, 45, 79].map((hx, idx) => (
            <ellipse key={idx} cx={hx} cy={140} rx={12} ry={6} fill="#334155" stroke={OUTLINE} strokeWidth={2.5} />
          ))}
          {/* Tail */}
          <path d="M-104,10 Q-132,36 -118,86" fill="none" stroke="#cbd5e1" strokeWidth={8} strokeLinecap="round" />
          <ellipse cx={-118} cy={92} rx={9} ry={13} fill="#475569" stroke={OUTLINE} strokeWidth={2.2} />
          {/* Body */}
          <ellipse cx={-6} cy={22} rx={104} ry={58} fill="#f8fafc" stroke={OUTLINE} strokeWidth={3.5} />
          {/* Red Ceremonial Jhool Saddle */}
          <path d="M-76,-28 Q0,-36 62,-26 L56,42 Q0,48 -68,40 Z" fill="#be123c" stroke="#fbbf24" strokeWidth={3} />
          <path d="M-64,34 Q0,40 48,32" fill="none" stroke="#fde047" strokeWidth={3} strokeDasharray="8 6" />
          {/* Hump & Neck */}
          <ellipse cx={58} cy={-24} rx={36} ry={28} fill="#f1f5f9" stroke={OUTLINE} strokeWidth={3} />
          {/* Head facing right */}
          <g transform="translate(106, -12)">
            <ellipse cx={0} cy={0} rx={34} ry={28} fill="#ffffff" stroke={OUTLINE} strokeWidth={3.2} />
            {/* Curved Golden-Tipped Horns */}
            <path d="M-10,-22 Q-26,-58 -4,-74" fill="none" stroke="#cbd5e1" strokeWidth={9} strokeLinecap="round" />
            <path d="M-10,-22 Q-26,-58 -4,-74" fill="none" stroke="#fbbf24" strokeWidth={3} strokeLinecap="round" />
            <path d="M10,-22 Q32,-56 14,-74" fill="none" stroke="#cbd5e1" strokeWidth={9} strokeLinecap="round" />
            <path d="M10,-22 Q32,-56 14,-74" fill="none" stroke="#fbbf24" strokeWidth={3} strokeLinecap="round" />
            {/* Ears & Flower Garland */}
            <ellipse cx={-22} cy={-6} rx={14} ry={7} fill="#fda4af" stroke={OUTLINE} strokeWidth={2.5} transform="rotate(-25 -22 -6)" />
            <circle cx={10} cy={-6} r={5} fill={OUTLINE} />
            <circle cx={11} cy={-7} r={1.8} fill="#ffffff" />
            {/* Brass Bell Collar */}
            <path d="M-24,20 Q0,32 22,22" fill="none" stroke="#dc2626" strokeWidth={5} />
            <circle cx={0} cy={32} r={8} fill="#fbbf24" stroke={OUTLINE} strokeWidth={2.2} />
          </g>
        </g>

        {/* MAHADEV SEATED ON NANDI (Facing Left/Backwards or Turned Forward!) */}
        <g transform={`translate(-10, -48)`}>
          {facingBackwards ? (
            <>
              {/* Seated Backwards — Back of Jata, Baghambar, Trident & Back Serpent Hoods! */}
              <path d="M-46,24 Q0,36 46,24 L38,54 Q0,64 -38,54 Z" fill="#f59e0b" stroke={OUTLINE} strokeWidth={3} />
              <circle cx={-16} cy={38} r={5} fill="#451a03" />
              <circle cx={14} cy={42} r={5} fill="#451a03" />
              {/* Broad Ashen Back Torso */}
              <path d="M-38,-56 Q0,-64 38,-56 L44,24 Q0,32 -44,24 Z" fill="#cbd5e1" stroke={OUTLINE} strokeWidth={3.2} />
              {/* Three Horizontal Bhasma Stripes across Back */}
              <path d="M-24,-34 Q0,-30 24,-34 M-26,-22 Q0,-18 26,-22 M-22,-10 Q0,-6 22,-10" fill="none" stroke="#f8fafc" strokeWidth={4} />
              {/* Wavy Serpent Coils & Jata Locks Facing Away */}
              <ellipse cx={0} cy={-86} rx={36} ry={34} fill="#3e2723" stroke={OUTLINE} strokeWidth={3} />
              <path d="M-22,-112 Q0,-152 22,-112 Z" fill="#4e342e" stroke={OUTLINE} strokeWidth={3} />
              <path d="M10,-128 A12,12 0 1,1 26,-116 A9,9 0 1,0 10,-128 Z" fill="#fef08a" stroke={OUTLINE} strokeWidth={1.8} />
              {/* Back-view Arms: Left Arm Holding Trishul, Right Arm Waving to Shringi-Bhringi */}
              <path d="M-36,-48 Q-62,-20 -56,-2" fill="none" stroke="#cbd5e1" strokeWidth={13} strokeLinecap="round" />
              <path d="M36,-48 Q64,-34 58,-64" fill="none" stroke="#cbd5e1" strokeWidth={13} strokeLinecap="round" />
              <circle cx={-56} cy={0} r={7} fill="#cbd5e1" stroke={OUTLINE} strokeWidth={2} />
              <circle cx={58} cy={-66} r={7} fill="#cbd5e1" stroke={OUTLINE} strokeWidth={2} />
              {/* Back-view Hanging Serpents */}
              <path d={`M-28,-58 Q${-42 + snakeSway},-24 -30,10`} fill="none" stroke="#0f766e" strokeWidth={7} strokeLinecap="round" />
              <path d={`M28,-58 Q${42 - snakeSway},-24 30,10`} fill="none" stroke="#15803d" strokeWidth={7} strokeLinecap="round" />
              {/* Trishul in Left Hand */}
              <line x1={-56} y1={45} x2={-56} y2={-140} stroke="#fbbf24" strokeWidth={5} />
              <path d="M-70,-138 Q-70,-166 -56,-178 Q-42,-166 -42,-138" fill="none" stroke="#fbbf24" strokeWidth={5} />
              <line x1={-56} y1={-136} x2={-56} y2={-186} stroke="#fbbf24" strokeWidth={5} />
            </>
          ) : (
            <>
              {/* TURNED FORWARD TOWARDS MAINA DEVI — Fierce Ash, Kajal, Red Paan Smile & Lifting Serpent Veil! */}
              <path d="M-46,24 Q0,36 46,24 L38,54 Q0,64 -38,54 Z" fill="#f59e0b" stroke={OUTLINE} strokeWidth={3} />
              <circle cx={-14} cy={40} r={5} fill="#451a03" />
              <circle cx={16} cy={38} r={5} fill="#451a03" />
              {/* Ash-Smeared Chest + Vasuki + Rudraksha */}
              <path d="M-40,-56 Q0,-64 40,-56 L46,24 Q0,32 -46,24 Z" fill="#e2e8f0" stroke={OUTLINE} strokeWidth={3.2} />
              <path d="M-28,-48 Q0,-10 28,-48" fill="none" stroke="#92400e" strokeWidth={6} strokeDasharray="5 4" />
              <path d="M-32,-52 Q0,-22 32,-52" fill="none" stroke="#0d9488" strokeWidth={8} strokeLinecap="round" />
              {/* Front-view Arms: Left Arm Gripping Trishul, Right Arm Lifting Serpent Veil / Abhaya */}
              <path d="M-38,-48 Q-64,-18 -62,2" fill="none" stroke="#e2e8f0" strokeWidth={13} strokeLinecap="round" />
              <path d="M38,-48 Q66,-22 54,-56" fill="none" stroke="#e2e8f0" strokeWidth={13} strokeLinecap="round" />
              <circle cx={-62} cy={4} r={7} fill="#e2e8f0" stroke={OUTLINE} strokeWidth={2} />
              <circle cx={54} cy={-58} r={7} fill="#e2e8f0" stroke={OUTLINE} strokeWidth={2} />
              {/* Trishul */}
              <line x1={-62} y1={48} x2={-62} y2={-142} stroke="#fbbf24" strokeWidth={5} />
              <path d="M-76,-140 Q-76,-168 -62,-180 Q-48,-168 -48,-140" fill="none" stroke="#fbbf24" strokeWidth={5} />
              <line x1={-62} y1={-138} x2={-62} y2={-188} stroke="#fbbf24" strokeWidth={5} />

              {/* Head with Jata Mukut, Ash Face, Thick Kajal Eyes, Glowing 3rd Eye & Red Paan Mouth! */}
              <ellipse cx={0} cy={-92} rx={36} ry={34} fill="#f1f5f9" stroke={OUTLINE} strokeWidth={3.2} />
              <path d="M-28,-112 Q0,-158 28,-112 Z" fill="#4e342e" stroke={OUTLINE} strokeWidth={3} />
              <path d="M10,-134 A13,13 0 1,1 28,-120 A10,10 0 1,0 10,-134 Z" fill="#fef08a" stroke={OUTLINE} strokeWidth={1.8} />
              {/* Tripundra + Red 3rd Eye */}
              <path d="M-16,-108 L16,-108 M-14,-103 L14,-103" stroke="#ffffff" strokeWidth={2.5} />
              <ellipse cx={0} cy={-105} rx={4} ry={7} fill="#ef4444" stroke={OUTLINE} strokeWidth={1.5} />
              {/* Thick Black Kajal Eyes */}
              <ellipse cx={-13} cy={-90} rx={8} ry={6.5} fill="#0f172a" />
              <ellipse cx={-13} cy={-90} rx={5.2} ry={4.2} fill="#ffffff" />
              <circle cx={-12} cy={-90} r={2.6} fill="#dc2626" />
              <ellipse cx={13} cy={-90} rx={8} ry={6.5} fill="#0f172a" />
              <ellipse cx={13} cy={-90} rx={5.2} ry={4.2} fill="#ffffff" />
              <circle cx={12} cy={-90} r={2.6} fill="#dc2626" />
              {/* Red Paan Chewing Smile + Red Drip ("मुख में पान, लाल लार") */}
              <ellipse cx={0} cy={-71} rx={12} ry={mouthOpen} fill="#991b1b" stroke={OUTLINE} strokeWidth={2} />
              <path d="M10,-70 Q14,-56 9,-46" fill="none" stroke="#dc2626" strokeWidth={4.5} strokeLinecap="round" />

              {/* Serpent Veil Lifting Away from Face based on veilLifted (0..1) */}
              {veilLifted < 0.92 && (
                <g opacity={1 - veilLifted * 0.95} transform={`translate(${veilLifted * -38}, ${veilLifted * -24})`}>
                  {[-18, -6, 6, 18].map((sx, idx) => (
                    <path
                      key={idx}
                      d={`M${sx},-112 Q${sx + snakeSway * 0.6},-85 ${sx},-58`}
                      fill="none"
                      stroke={idx % 2 === 0 ? "#15803d" : "#0f766e"}
                      strokeWidth={6}
                      strokeLinecap="round"
                    />
                  ))}
                </g>
              )}
            </>
          )}
        </g>
      </svg>
    </div>
  );
};

// Maina Devi Fainting + Dropped Brass Panch-Aarti Thali on Ground
export const MainaFaintRig: React.FC<{
  x: number;
  y: number;
  scale?: number;
  faintProgress: number; // 0 = standing shocked, 1 = collapsed on floor with fallen thali
}> = ({ x, y, scale = 1, faintProgress }) => {
  const angle = interpolate(faintProgress, [0, 1], [0, 82], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const dropY = interpolate(faintProgress, [0, 1], [0, 74], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const thaliX = interpolate(faintProgress, [0, 1], [-58, -125], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const thaliY = interpolate(faintProgress, [0, 1], [0, 96], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const thaliRot = interpolate(faintProgress, [0, 1], [0, -145], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%, -50%) scale(${scale})`, pointerEvents: "none" }}>
      <svg width="320" height="320" viewBox="-160 -180 320 320" overflow="visible">
        <ellipse cx={28} cy={120} rx={95} ry={16} fill="#14071e" opacity={0.45} />
        {/* Swooning Maina Devi */}
        <g transform={`translate(0, ${dropY}) rotate(${angle} 0 40)`}>
          <path d="M-34,-28 L34,-28 L52,96 Q0,108 -52,96 Z" fill="#9f1239" stroke={OUTLINE} strokeWidth={3} />
          <path d="M-38,-48 Q-44,10 -34,82 M38,-48 Q44,10 34,82" fill="none" stroke="#e11d48" strokeWidth={12} strokeLinecap="round" />
          <path d="M-24,-50 L24,-50 L30,-20 L-30,-20 Z" fill="#be123c" stroke={OUTLINE} strokeWidth={2.5} />
          <path d="M-20,-48 L22,-20" stroke="#fbbf24" strokeWidth={10} />
          <circle cx={0} cy={-78} r={24} fill="#fde68a" stroke={OUTLINE} strokeWidth={3} />
          <path d="M-20,-96 L0,-116 L20,-96 Z" fill="#fbbf24" stroke={OUTLINE} strokeWidth={2.5} />
          {/* Closed Dazed Eyes (X / Dizzy) */}
          <path d="M-13,-80 L-5,-76 M-13,-76 L-5,-80" stroke={OUTLINE} strokeWidth={2.4} />
          <path d="M5,-80 L13,-76 M5,-76 L13,-80" stroke={OUTLINE} strokeWidth={2.4} />
          <circle cx={0} cy={-64} r={5} fill="#be123c" />
        </g>

        {/* Falling / Dropped Brass Panch-Aarti Thali */}
        <g transform={`translate(${thaliX}, ${thaliY}) rotate(${thaliRot})`}>
          <ellipse cx={0} cy={0} rx={36} ry={12} fill="#fbbf24" stroke={OUTLINE} strokeWidth={2.8} />
          <ellipse cx={0} cy={-2} rx={26} ry={7} fill="#fef08a" stroke="#b45309" strokeWidth={1.6} />
          <circle cx={-12} cy={-4} r={4} fill="#dc2626" />
          <circle cx={10} cy={-4} r={4} fill="#f97316" />
        </g>
      </svg>
    </div>
  );
};
