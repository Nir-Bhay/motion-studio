import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { clothWave, pendulumSwing, wingFlap } from "../motion/physics";

export const BrahmaRig: React.FC<{ x: number; y: number; scale?: number; speakingEnergy?: number }> = ({
  x,
  y,
  scale = 1,
  speakingEnergy = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const hover = Math.sin(t * 2.9) * 10;
  const wing = wingFlap(t, 4.2, 22);
  const blink = Math.sin(t * 2.2 + 0.5) > 0.965 ? 0.12 : 1;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + hover,
        transform: `translate(-50%, -50%) scale(${scale})`,
        pointerEvents: "none",
      }}
    >
      <svg width={500} height={540} viewBox="-250 -270 500 540" overflow="visible">
        <defs>
          <radialGradient id="brahmaAura" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#fde68a" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx={0} cy={-95} r={130} fill="url(#brahmaAura)" />

        {/* Celestial Hamsa (Swan) Carrier */}
        <g transform="translate(0, 140)">
          <g transform={`rotate(${-10 + wing})`}>
            <path d="M -20,0 Q -100,-75 -165,-38 Q -120,0 -20,16 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth={2} />
          </g>
          <g transform={`rotate(${10 - wing})`}>
            <path d="M 20,0 Q 100,-75 165,-38 Q 120,0 20,16 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth={2} />
          </g>
          <ellipse cx={0} cy={22} rx={68} ry={34} fill="#ffffff" stroke="#e2e8f0" strokeWidth={2} />
          {/* Curved Swan Neck & Head */}
          <path d="M -52,10 Q -85,-32 -66,-68" fill="none" stroke="#ffffff" strokeWidth={18} strokeLinecap="round" />
          <circle cx={-66} cy={-70} r={13} fill="#ffffff" />
          <polygon points="-76,-72 -96,-66 -75,-62" fill="#f59e0b" />
          <circle cx={-69} cy={-72} r={2.2} fill="#0f172a" />
        </g>

        {/* Giant Pink Lotus Seat */}
        <g transform="translate(0, 86)">
          {[-68, -36, 0, 36, 68].map((lx, idx) => (
            <ellipse
              key={idx}
              cx={lx}
              cy={Math.abs(lx) * 0.14}
              rx={28}
              ry={44}
              fill={idx % 2 === 0 ? "#f43f5e" : "#fb7185"}
              stroke="#ffe4e6"
              strokeWidth={1.8}
              transform={`rotate(${lx * 0.45}, ${lx}, 20)`}
            />
          ))}
        </g>

        {/* Back Arms: Veda Palm-Leaf Manuscript (Left) & Kamandalu (Right) */}
        <g transform="translate(-48, -22)">
          <path d="M 0,0 Q -44,-18 -64,-52" fill="none" stroke="#f5b895" strokeWidth={20} strokeLinecap="round" />
          {/* Vedas */}
          <g transform="translate(-72, -68) rotate(-14)">
            <rect x={-26} y={-14} width={52} height={28} rx={4} fill="#fef3c7" stroke="#b45309" strokeWidth={2.5} />
            <line x1={-16} y1={-4} x2={16} y2={-4} stroke="#92400e" strokeWidth={2} />
            <line x1={-16} y1={4} x2={16} y2={4} stroke="#92400e" strokeWidth={2} />
          </g>
        </g>
        <g transform="translate(48, -22)">
          <path d="M 0,0 Q 44,-18 64,-52" fill="none" stroke="#f5b895" strokeWidth={20} strokeLinecap="round" />
          {/* Golden Kamandalu Pot */}
          <g transform="translate(68, -64)">
            <ellipse cx={0} cy={10} rx={16} ry={18} fill="#fbbf24" stroke="#92400e" strokeWidth={2} />
            <path d="M -12,-6 Q 0,-26 12,-6" fill="none" stroke="#b45309" strokeWidth={3} />
          </g>
        </g>

        {/* Saffron & Rose Silk Robes */}
        <path d="M -52,-42 Q 0,-54 52,-42 L 62,76 L -62,76 Z" fill="#fb7185" stroke="#be123c" strokeWidth={2} />
        <path d="M -42,-40 Q 0,25 42,-40" fill="none" stroke="#fde047" strokeWidth={12} opacity={0.85} />

        {/* Front Arms: Rudraksha Mala & Blessing Hand */}
        <path d="M -42,-24 Q -52,24 -30,52" fill="none" stroke="#f5b895" strokeWidth={20} strokeLinecap="round" />
        <path d="M 42,-24 Q 56,12 46,42" fill="none" stroke="#f5b895" strokeWidth={20} strokeLinecap="round" />

        {/* CHATURMUKH: 4 Distinct Faces (Left Profile, Right Profile, Center Front, Top Rear Crown Hint) */}
        <g transform="translate(0, -104)">
          {/* Rear Crown Suggestion */}
          <polygon points="-14,-44 0,-88 14,-44" fill="#fbbf24" stroke="#92400e" strokeWidth={1.5} opacity={0.8} />

          {/* Left Profile Face */}
          <g transform="translate(-38, 6)">
            <ellipse cx={0} cy={0} rx={20} ry={28} fill="#f0ad86" stroke="#c27a57" strokeWidth={1.5} />
            <path d="M -16,12 Q -10,44 6,42 L 10,12 Z" fill="#f8fafc" />
            <circle cx={-10} cy={-4} r={2.3} fill="#0f172a" />
            <polygon points="-18,-22 0,-54 16,-22" fill="#fbbf24" stroke="#92400e" strokeWidth={1.5} />
          </g>

          {/* Right Profile Face */}
          <g transform="translate(38, 6)">
            <ellipse cx={0} cy={0} rx={20} ry={28} fill="#f0ad86" stroke="#c27a57" strokeWidth={1.5} />
            <path d="M -10,12 L -6,42 Q 10,44 16,12 Z" fill="#f8fafc" />
            <circle cx={10} cy={-4} r={2.3} fill="#0f172a" />
            <polygon points="-16,-22 0,-54 18,-22" fill="#fbbf24" stroke="#92400e" strokeWidth={1.5} />
          </g>

          {/* Center Front Face */}
          <g transform="translate(0, 4)">
            <ellipse cx={0} cy={0} rx={28} ry={33} fill="#f7be9c" stroke="#b46e4c" strokeWidth={1.8} />
            {/* Flowing White Beard */}
            <path d="M -22,10 Q 0,62 22,10 Q 0,24 -22,10 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth={1.2} />
            {/* Tilak */}
            <line x1={0} y1={-22} x2={0} y2={-9} stroke="#dc2626" strokeWidth={3} strokeLinecap="round" />
            <g transform={`scale(1, ${blink})`} style={{ transformOrigin: "0px -4px" }}>
              <circle cx={-10} cy={-4} r={3} fill="#0f172a" />
              <circle cx={10} cy={-4} r={3} fill="#0f172a" />
            </g>
            {/* Smile */}
            <path d={`M -7,12 Q 0,${15 + speakingEnergy * 4} 7,12`} fill="none" stroke="#7f1d1d" strokeWidth={2} />
            {/* Center Crown */}
            <polygon points="-24,-24 -12,-52 0,-68 12,-52 24,-24" fill="#fcd34d" stroke="#92400e" strokeWidth={2} />
            <circle cx={0} cy={-36} r={4.5} fill="#ef4444" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export const IndraOnAiravataRig: React.FC<{ x: number; y: number; scale?: number }> = ({
  x,
  y,
  scale = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const march = Math.sin(t * 4.4) * 6;
  const trunkWave = clothWave(t, 0.2, 16);
  const earFlap = wingFlap(t, 3.8, 9);
  const vajraSpark = 0.6 + 0.4 * Math.sin(t * 16);
  const umbrellaSway = pendulumSwing(t, 2.2, 3);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + march,
        transform: `translate(-50%, -50%) scale(${scale})`,
        pointerEvents: "none",
      }}
    >
      <svg width={560} height={540} viewBox="-280 -280 560 540" overflow="visible">
        {/* Ornate White Airavata Elephant */}
        <g transform="translate(0, 70)">
          {/* Elephant Legs */}
          {[-88, -36, 36, 82].map((lx, idx) => (
            <rect
              key={idx}
              x={lx - 18}
              y={55 + Math.sin(frame * 0.08 + idx) * 6}
              width={36}
              height={88}
              rx={14}
              fill="#e2e8f0"
              stroke="#94a3b8"
              strokeWidth={2}
            />
          ))}
          {/* Body */}
          <ellipse cx={0} cy={22} rx={125} ry={78} fill="#f8fafc" stroke="#cbd5e1" strokeWidth={2.5} />
          {/* Jewelled Royal Silk Caparison (Jhul) */}
          <path d="M -85,-32 Q 0,-46 85,-32 L 95,48 Q 0,72 -95,48 Z" fill="#dc2626" stroke="#fde047" strokeWidth={4} />
          <path d="M -72,42 Q 0,62 72,42" fill="none" stroke="#fcd34d" strokeWidth={5} strokeDasharray="6 6" />

          {/* Airavata Head & Articulated Trunk */}
          <g transform="translate(-112, -16)">
            <circle cx={0} cy={0} r={54} fill="#f8fafc" stroke="#cbd5e1" strokeWidth={2.5} />
            {/* Gold Head Ornament */}
            <polygon points="-24,-48 0,-68 24,-48" fill="#fbbf24" stroke="#92400e" strokeWidth={2} />
            {/* Flapping Ear */}
            <ellipse cx={36} cy={4} rx={26 + earFlap * 0.4} ry={40} fill="#f1f5f9" stroke="#cbd5e1" strokeWidth={2} />
            {/* Curved Tusks */}
            <path d="M -26,22 Q -68,38 -78,10" fill="none" stroke="#fffbeb" strokeWidth={11} strokeLinecap="round" />
            {/* Articulated Swaying Trunk */}
            <path
              d={`M -34,12 Q -88,48 ${-72 + trunkWave},118 Q ${-58 + trunkWave},132 ${-44 + trunkWave},115`}
              fill="none"
              stroke="#f8fafc"
              strokeWidth={24}
              strokeLinecap="round"
            />
            <circle cx={-16} cy={-10} r={4.5} fill="#0f172a" />
          </g>
        </g>

        {/* Royal Chatra (Umbrella) above Indra with Subtle Sway */}
        <g transform={`translate(8, -175) rotate(${umbrellaSway}, 54, 155)`}>
          <line x1={54} y1={-32} x2={54} y2={155} stroke="#fcd34d" strokeWidth={5} />
          <path d="M -40,-20 Q 54,-65 148,-20 Z" fill="#f59e0b" stroke="#fffbeb" strokeWidth={2.5} />
          <circle cx={54} cy={-50} r={7} fill="#fff3c4" />
        </g>

        {/* Devraj Indra Seated in Golden Armor */}
        <g transform="translate(0, -68)">
          {/* Golden Aura */}
          <circle cx={0} cy={-35} r={85} fill="#fde047" opacity={0.22} />
          {/* Torso Armor */}
          <path d="M -38,-22 L 38,-22 L 32,48 L -32,48 Z" fill="#f59e0b" stroke="#92400e" strokeWidth={2} />
          <circle cx={0} cy={8} r={12} fill="#ef4444" stroke="#fef08a" strokeWidth={2} />
          {/* Raised Right Arm Wielding Crackling Vajra */}
          <g transform={`translate(-38, -14) rotate(${-18 + Math.sin(frame * 0.1) * 8})`}>
            <path d="M 0,0 Q -34,-26 -46,-62" fill="none" stroke="#f5b895" strokeWidth={17} strokeLinecap="round" />
            {/* Golden Vajra Thunderbolt */}
            <g transform="translate(-52, -82) rotate(-25)">
              <circle cx={0} cy={0} r={34} fill="#38bdf8" opacity={0.28 * vajraSpark} />
              <path d="M -8,-32 L 0,-12 L 8,-32 M -8,32 L 0,12 L 8,32 M 0,-14 L 0,14" fill="none" stroke="#fde047" strokeWidth={5} strokeLinecap="round" />
              <line x1={-16} y1={0} x2={16} y2={0} stroke="#38bdf8" strokeWidth={2.5} opacity={vajraSpark} />
            </g>
          </g>
          {/* Left Arm */}
          <path d="M 38,-14 Q 52,18 32,44" fill="none" stroke="#f5b895" strokeWidth={17} strokeLinecap="round" />
          {/* Head & Crown */}
          <ellipse cx={0} cy={-54} rx={24} ry={28} fill="#f7be9c" stroke="#9a5c3a" strokeWidth={1.5} />
          <circle cx={-8} cy={-57} r={2.6} fill="#0f172a" />
          <circle cx={8} cy={-57} r={2.6} fill="#0f172a" />
          <path d="M -6,-44 Q 0,-40 6,-44" fill="none" stroke="#7f1d1d" strokeWidth={2} />
          <polygon points="-24,-74 -12,-104 0,-122 12,-104 24,-74" fill="#fcd34d" stroke="#92400e" strokeWidth={2} />
        </g>
      </svg>
    </div>
  );
};
