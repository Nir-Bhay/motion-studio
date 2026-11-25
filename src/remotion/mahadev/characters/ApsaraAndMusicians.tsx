import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { clothWave, squashStretch } from "../motion/physics";

export const ApsaraRig: React.FC<{
  x: number;
  y: number;
  scale?: number;
  colorScheme?: "rose" | "emerald" | "gold";
  phase?: number;
  energy?: number;
}> = ({ x, y, scale = 1, colorScheme = "rose", phase = 0, energy = 0.5 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const sway = Math.sin(t * 4.6 + phase) * 14;
  const sq = squashStretch(t, 4.6, phase, 0.05 + energy * 0.03);
  const bounce = sq.hopY * 0.65;
  const armL = -20 + Math.sin(t * 5.2 + phase) * 24;
  const armR = 20 + Math.cos(t * 5.2 + phase) * 24;
  const veilWave = clothWave(t, phase, 22);
  const blink = Math.sin(t * 2.4 + phase) > 0.965 ? 0.14 : 1;

  const palette =
    colorScheme === "emerald"
      ? { skirt: "#059669", skirtHi: "#34d399", skirtShadow: "#065f46", trim: "#fde047", veil: "#a7f3d0", choli: "#047857" }
      : colorScheme === "gold"
      ? { skirt: "#d97706", skirtHi: "#fbbf24", skirtShadow: "#92400e", trim: "#fffbeb", veil: "#fde68a", choli: "#b45309" }
      : { skirt: "#db2777", skirtHi: "#f472b6", skirtShadow: "#9d174d", trim: "#fde047", veil: "#fbcfe8", choli: "#be185d" };

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y - bounce,
        transform: `translate(-50%, -50%) scale(${scale}) rotate(${sway * 0.22}deg)`,
        pointerEvents: "none",
      }}
    >
      <svg width={280} height={380} viewBox="-140 -175 280 380" overflow="visible">
        {/* Soft Lotus Halo */}
        <circle cx={0} cy={-50} r={88} fill="#fde047" opacity={0.1} />

        {/* Flowing Translucent Odhani Veil Behind */}
        <path
          d={`M -34,-54 Q ${-102 + veilWave},-12 ${-88 - veilWave},84 Q -38,68 -22,26`}
          fill="none"
          stroke={palette.trim}
          strokeWidth={17}
          strokeLinecap="round"
          opacity={0.45}
        />
        <path
          d={`M -34,-54 Q ${-102 + veilWave},-12 ${-88 - veilWave},84 Q -38,68 -22,26`}
          fill="none"
          stroke={palette.veil}
          strokeWidth={12}
          strokeLinecap="round"
          opacity={0.82}
        />
        <path
          d={`M 34,-54 Q ${102 - veilWave},-12 ${88 + veilWave},84 Q 38,68 22,26`}
          fill="none"
          stroke={palette.trim}
          strokeWidth={17}
          strokeLinecap="round"
          opacity={0.45}
        />
        <path
          d={`M 34,-54 Q ${102 - veilWave},-12 ${88 + veilWave},84 Q 38,68 22,26`}
          fill="none"
          stroke={palette.veil}
          strokeWidth={12}
          strokeLinecap="round"
          opacity={0.82}
        />

        {/* Graceful Dancing Legs & Feet with Ghungroos */}
        <g transform="translate(0, 96)">
          <path d={`M -16,0 Q ${-22 + sway * 0.2},26 -24,48`} stroke="#0b1120" strokeWidth={15} strokeLinecap="round" fill="none" />
          <path d={`M -16,0 Q ${-22 + sway * 0.2},26 -24,48`} stroke="#f7be9c" strokeWidth={10.5} strokeLinecap="round" fill="none" />
          <path d={`M 16,0 Q ${24 + sway * 0.2},22 30,42`} stroke="#0b1120" strokeWidth={15} strokeLinecap="round" fill="none" />
          <path d={`M 16,0 Q ${24 + sway * 0.2},22 30,42`} stroke="#f7be9c" strokeWidth={10.5} strokeLinecap="round" fill="none" />
          {/* Golden Ghungroo Anklets */}
          <ellipse cx={-23} cy={43} rx={7.5} ry={3.5} fill="#fbbf24" stroke="#78350f" strokeWidth={1.4} />
          <ellipse cx={29} cy={38} rx={7.5} ry={3.5} fill="#fbbf24" stroke="#78350f" strokeWidth={1.4} />
          {/* Alta-painted Classical Feet */}
          <ellipse cx={-28} cy={51} rx={12} ry={5} fill="#f7be9c" stroke="#0b1120" strokeWidth={1.8} />
          <ellipse cx={34} cy={46} rx={12} ry={5} fill="#f7be9c" stroke="#0b1120" strokeWidth={1.8} />
        </g>

        {/* Twirling Pleated Classical Banarasi Lehenga */}
        <path
          d={`M -23,6 L 23,6 L ${68 + sway * 0.55},112 Q 0,132 ${-68 + sway * 0.55},112 Z`}
          fill={palette.skirt}
          stroke="#0b1120"
          strokeWidth={2.6}
        />
        <path d={`M -21,8 L 0,8 L -6,120 Q -36,122 ${-62 + sway * 0.5},110 Z`} fill={palette.skirtHi} opacity={0.42} />
        <path d={`M 10,8 L 21,8 L ${64 + sway * 0.55},110 Q 34,122 14,120 Z`} fill={palette.skirtShadow} opacity={0.4} />
        {/* Zari Gold Border & Pleats */}
        <path d={`M ${-66 + sway * 0.55},104 Q 0,124 ${66 + sway * 0.55},104`} fill="none" stroke={palette.trim} strokeWidth={5.5} />
        <path d="M -8,10 L -26,112 M 0,10 L 0,118 M 8,10 L 26,112" stroke={palette.trim} strokeWidth={1.6} opacity={0.7} />

        {/* Gold Waist Kamarbandh */}
        <rect x={-23} y={0} width={46} height={9} rx={4} fill="#fbbf24" stroke="#78350f" strokeWidth={1.5} />
        <circle cx={0} cy={5} r={4.5} fill="#ef4444" stroke="#fde047" strokeWidth={1.2} />

        {/* Torso, Choli & Layered Haar Necklace */}
        <path d="M -23,-54 Q 0,-60 23,-54 L 19,4 L -19,4 Z" fill={palette.choli} stroke="#0b1120" strokeWidth={2.4} />
        <path d="M -18,-52 Q 0,-42 18,-52" fill="none" stroke="#f7be9c" strokeWidth={8} strokeLinecap="round" />
        <path d="M -14,-52 Q 0,-28 14,-52" fill="none" stroke="#fde047" strokeWidth={3.5} />
        <circle cx={0} cy={-38} r={4} fill="#ef4444" stroke="#fde047" strokeWidth={1} />

        {/* Articulated Classical Mudra Arms with Gold Bangles */}
        <g transform={`translate(-22, -46) rotate(${armL})`}>
          <path d="M 0,0 Q -34,-8 -54,-38" fill="none" stroke="#0b1120" strokeWidth={15.5} strokeLinecap="round" />
          <path d="M 0,0 Q -34,-8 -54,-38" fill="none" stroke="#f7be9c" strokeWidth={11} strokeLinecap="round" />
          <circle cx={-38} cy={-18} r={4.5} fill="none" stroke="#fbbf24" strokeWidth={2.5} />
          <circle cx={-56} cy={-43} r={7} fill="#f7be9c" stroke="#0b1120" strokeWidth={1.6} />
          <path d="M -60,-48 L -64,-57 M -55,-50 L -56,-59" stroke="#f7be9c" strokeWidth={2.5} strokeLinecap="round" />
        </g>
        <g transform={`translate(22, -46) rotate(${armR})`}>
          <path d="M 0,0 Q 34,-8 54,-38" fill="none" stroke="#0b1120" strokeWidth={15.5} strokeLinecap="round" />
          <path d="M 0,0 Q 34,-8 54,-38" fill="none" stroke="#f7be9c" strokeWidth={11} strokeLinecap="round" />
          <circle cx={38} cy={-18} r={4.5} fill="none" stroke="#fbbf24" strokeWidth={2.5} />
          <circle cx={56} cy={-43} r={7} fill="#f7be9c" stroke="#0b1120" strokeWidth={1.6} />
          <path d="M 60,-48 L 64,-57 M 55,-50 L 56,-59" stroke="#f7be9c" strokeWidth={2.5} strokeLinecap="round" />
        </g>

        {/* Detailed Expressive Face, Hair Bun, Gajra, Maang-Tikka & Jhumkas */}
        <g transform="translate(0, -88)">
          <circle cx={0} cy={-20} r={22} fill="#0f172a" stroke="#0b1120" strokeWidth={2} />
          <path d="M -18,-18 Q 0,-36 18,-18" fill="none" stroke="#fffbeb" strokeWidth={5.5} strokeDasharray="4 3" />
          {/* Golden Jhumka Earrings */}
          <circle cx={-23} cy={6} r={5} fill="#fbbf24" stroke="#78350f" strokeWidth={1.2} />
          <polygon points="-27,10 -19,10 -23,19" fill="#fde047" />
          <circle cx={23} cy={6} r={5} fill="#fbbf24" stroke="#78350f" strokeWidth={1.2} />
          <polygon points="19,10 27,10 23,19" fill="#fde047" />
          {/* Face */}
          <ellipse cx={0} cy={0} rx={21} ry={24} fill="#f7be9c" stroke="#0b1120" strokeWidth={2.2} />
          <path d="M -20,-8 Q 0,-26 20,-8 Q 10,-18 0,-14 Q -10,-18 -20,-8 Z" fill="#0f172a" />
          {/* Maang Tikka & Bindi */}
          <line x1={0} y1={-22} x2={0} y2={-15} stroke="#fde047" strokeWidth={2} />
          <circle cx={0} cy={-14} r={3.4} fill="#fbbf24" stroke="#b91c1c" strokeWidth={1} />
          <circle cx={0} cy={-7} r={2.4} fill="#dc2626" />
          {/* Expressive Kohl-Lined Almond Eyes */}
          <path d="M -13,-6 Q -8,-9 -4,-6" fill="none" stroke="#1e293b" strokeWidth={1.8} strokeLinecap="round" />
          <path d="M 4,-6 Q 8,-9 13,-6" fill="none" stroke="#1e293b" strokeWidth={1.8} strokeLinecap="round" />
          <g transform={`scale(1, ${blink})`} style={{ transformOrigin: "0px -1px" }}>
            <ellipse cx={-8.5} cy={-1} rx={4.5} ry={3} fill="#ffffff" stroke="#0b1120" strokeWidth={1.2} />
            <circle cx={-8.5} cy={-1} r={2} fill="#0f172a" />
            <ellipse cx={8.5} cy={-1} rx={4.5} ry={3} fill="#ffffff" stroke="#0b1120" strokeWidth={1.2} />
            <circle cx={8.5} cy={-1} r={2} fill="#0f172a" />
          </g>
          {/* Nose Nath & Smile */}
          <circle cx={-3} cy={6} r={2.5} fill="none" stroke="#fde047" strokeWidth={1.2} />
          <path d="M -6,11 Q 0,16 6,11" fill="none" stroke="#9f1239" strokeWidth={2.1} strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
};

export const CelestialVimanaRig: React.FC<{
  x: number;
  y: number;
  scale?: number;
  flipX?: boolean;
}> = ({ x, y, scale = 1, flipX = false }) => {
  const frame = useCurrentFrame();
  const hover = Math.sin(frame * 0.065) * 10;
  const wheelRot = frame * 4;
  const flagWave = Math.sin(frame * 0.16) * 8;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + hover,
        transform: `translate(-50%, -50%) scale(${flipX ? -scale : scale}, ${scale})`,
        pointerEvents: "none",
      }}
    >
      <svg width={400} height={310} viewBox="-200 -155 400 310" overflow="visible">
        {/* Soft Golden Aura */}
        <ellipse cx={0} cy={-10} rx={155} ry={95} fill="#fbbf24" opacity={0.12} />

        {/* Back Carved Pillars & Crimson Canopy Backdrop */}
        <rect x={-78} y={-58} width={156} height={76} fill="#7f1d1d" opacity={0.38} />
        {[-78, -28, 28, 78].map((px, idx) => (
          <rect key={idx} x={px - 5} y={-62} width={10} height={82} fill="#fbbf24" stroke="#78350f" strokeWidth={1.8} />
        ))}

        {/* Crowned Devta Rider Seated Inside */}
        <g transform="translate(0, -14)">
          <path d="M -22,28 L 22,28 L 16,-8 L -16,-8 Z" fill="#fef08a" stroke="#0b1120" strokeWidth={2} />
          <path d="M -14,-6 Q 0,14 14,-6" fill="none" stroke="#ef4444" strokeWidth={5} strokeDasharray="3 3" />
          <circle cx={0} cy={-24} r={14} fill="#f7be9c" stroke="#0b1120" strokeWidth={2} />
          <polygon points="-12,-35 0,-54 12,-35" fill="#fbbf24" stroke="#78350f" strokeWidth={1.6} />
          <circle cx={-4.5} cy={-25} r={1.8} fill="#0f172a" />
          <circle cx={4.5} cy={-25} r={1.8} fill="#0f172a" />
          <path d="M -4,-18 Q 0,-15 4,-18" fill="none" stroke="#7f1d1d" strokeWidth={1.5} />
        </g>

        {/* Multi-Tiered Golden Shikhara Roof & Kalash */}
        <path d="M -94,-58 Q 0,-138 94,-58 Z" fill="#d97706" stroke="#0b1120" strokeWidth={2.6} />
        <path d="M -72,-62 Q 0,-120 72,-62 Z" fill="#fbbf24" opacity={0.75} />
        <path d="M -48,-62 Q 0,-102 48,-62" fill="none" stroke="#fef08a" strokeWidth={3} />
        <circle cx={0} cy={-108} r={8} fill="#fde047" stroke="#78350f" strokeWidth={1.8} />
        <line x1={0} y1={-114} x2={0} y2={-148} stroke="#fde047" strokeWidth={3.5} />
        <polygon points={`0,-148 ${42 + flagWave},-136 0,-124`} fill="#ef4444" stroke="#fde047" strokeWidth={1.4} />

        {/* Draped Marigold & Jasmine Toran Garlands */}
        <path d="M -88,-54 Q -44,-22 0,-54 Q 44,-22 88,-54" fill="none" stroke="#f97316" strokeWidth={10} strokeDasharray="7 5" strokeLinecap="round" />
        <path d="M -88,-54 Q -44,-22 0,-54 Q 44,-22 88,-54" fill="none" stroke="#fde047" strokeWidth={4} strokeDasharray="3 9" strokeLinecap="round" />

        {/* Ornate Lotus Hull & Carved Swan Prow */}
        <path d="M 105,22 Q 145,10 154,-22 Q 165,-30 174,-20 Q 160,18 120,44 Z" fill="#fef3c7" stroke="#0b1120" strokeWidth={2.2} />
        <path d="M -134,18 L 128,18 L 102,64 L -108,64 Z" fill="#b45309" stroke="#0b1120" strokeWidth={2.8} />
        <path d="M -126,24 L 120,24 L 104,44 L -110,44 Z" fill="#f59e0b" opacity={0.8} />
        {[-80, -40, 0, 40, 80].map((lx, idx) => (
          <path key={idx} d={`M ${lx - 18},44 Q ${lx},62 ${lx + 18},44`} fill="#fbbf24" stroke="#78350f" strokeWidth={1.6} />
        ))}

        {/* Spinning Ornate Spoked Wheels */}
        {[-72, 72].map((wx, idx) => (
          <g key={idx} transform={`translate(${wx}, 66) rotate(${wheelRot})`}>
            <circle cx={0} cy={0} r={34} fill="none" stroke="#0b1120" strokeWidth={9} />
            <circle cx={0} cy={0} r={34} fill="none" stroke="#fbbf24" strokeWidth={5.5} />
            {Array.from({ length: 8 }).map((_, s) => (
              <line key={s} x1={0} y1={-31} x2={0} y2={31} stroke="#fde047" strokeWidth={2.6} transform={`rotate(${s * 45})`} />
            ))}
            <circle cx={0} cy={0} r={9} fill="#ef4444" stroke="#fde047" strokeWidth={2} />
          </g>
        ))}
      </svg>
    </div>
  );
};

export const CelestialMusicianRig: React.FC<{
  x: number;
  y: number;
  instrument: "shehnai" | "damaru" | "manjira" | "shankh" | "dholak";
  scale?: number;
  energy?: number;
  flipX?: boolean;
}> = ({ x, y, instrument, scale = 1, energy = 0.5, flipX = false }) => {
  const frame = useCurrentFrame();
  const beat = Math.sin(frame * 0.25) * (6 + energy * 10);
  const pulse = (frame * 3) % 60;
  const dhotiColor =
    instrument === "shehnai"
      ? "#ea580c"
      : instrument === "damaru"
      ? "#db2777"
      : instrument === "shankh"
      ? "#0284c7"
      : "#d97706";

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + Math.sin(frame * 0.08) * 5,
        transform: `translate(-50%, -50%) scale(${flipX ? -scale : scale}, ${scale})`,
        pointerEvents: "none",
      }}
    >
      <svg width={260} height={320} viewBox="-130 -150 260 320" overflow="visible">
        {/* Full Standing Legs & Feet (NEVER cut off!) */}
        <g transform="translate(0, 72)">
          <path d="M -16,0 L -20,56" stroke="#0b1120" strokeWidth={18} strokeLinecap="round" fill="none" />
          <path d="M -16,0 L -20,56" stroke="#f7be9c" strokeWidth={13} strokeLinecap="round" fill="none" />
          <path d="M 16,0 L 20,56" stroke="#0b1120" strokeWidth={18} strokeLinecap="round" fill="none" />
          <path d="M 16,0 L 20,56" stroke="#f7be9c" strokeWidth={13} strokeLinecap="round" fill="none" />
          <ellipse cx={-23} cy={61} rx={14} ry={6.5} fill="#f7be9c" stroke="#0b1120" strokeWidth={2} />
          <ellipse cx={23} cy={61} rx={14} ry={6.5} fill="#f7be9c" stroke="#0b1120" strokeWidth={2} />
        </g>

        {/* Draped Silk Dhoti with Zari Border */}
        <path d="M -29,12 L 29,12 L 38,88 Q 0,102 -38,88 Z" fill={dhotiColor} stroke="#0b1120" strokeWidth={2.5} />
        <path d="M -36,80 Q 0,94 36,80" fill="none" stroke="#fde047" strokeWidth={4} />
        <path d="M 0,14 L -6,90 M 0,14 L 8,90" stroke="#fde047" strokeWidth={1.6} opacity={0.65} />

        {/* Silk Angavastram & Golden Tunic */}
        <path d="M -26,-38 Q 0,-46 26,-38 L 22,16 L -22,16 Z" fill="#fef08a" stroke="#0b1120" strokeWidth={2.4} />
        <path d="M -18,-36 Q 0,-6 18,-36" fill="none" stroke="#f43f5e" strokeWidth={5.5} strokeDasharray="4 4" strokeLinecap="round" />

        {/* Expressive Head & Jeweled Mukut */}
        <circle cx={0} cy={-66} r={21} fill="#f7be9c" stroke="#0b1120" strokeWidth={2.4} />
        <polygon points="-17,-82 0,-114 17,-82" fill="#fbbf24" stroke="#0b1120" strokeWidth={2} />
        <circle cx={0} cy={-95} r={4} fill="#ef4444" stroke="#fde047" strokeWidth={1} />
        <line x1={0} y1={-79} x2={0} y2={-70} stroke="#dc2626" strokeWidth={2.6} strokeLinecap="round" />
        <circle cx={-6.5} cy={-67} r={2.3} fill="#0f172a" />
        <circle cx={6.5} cy={-67} r={2.3} fill="#0f172a" />
        <path d="M -5,-56 Q 0,-52 5,-56" fill="none" stroke="#7f1d1d" strokeWidth={1.8} />

        {instrument === "shehnai" && (
          <g>
            <path d="M -22,-26 L 14,-48" stroke="#0b1120" strokeWidth={15} strokeLinecap="round" />
            <path d="M -22,-26 L 14,-48" stroke="#f7be9c" strokeWidth={10.5} strokeLinecap="round" />
            <path d="M 22,-24 L 30,-44" stroke="#0b1120" strokeWidth={15} strokeLinecap="round" />
            <path d="M 22,-24 L 30,-44" stroke="#f7be9c" strokeWidth={10.5} strokeLinecap="round" />
            <polygon points="8,-52 78,-68 82,-42" fill="#f59e0b" stroke="#0b1120" strokeWidth={2} />
            {[0, 1, 2].map((w) => {
              const r = ((pulse + w * 20) % 60) + 10;
              return (
                <path
                  key={w}
                  d={`M ${84 + r * 0.6},${-68 - r * 0.25} Q ${98 + r * 0.7},-55 ${84 + r * 0.6},${-42 + r * 0.25}`}
                  fill="none"
                  stroke="#fde047"
                  strokeWidth={3.2}
                  opacity={1 - r / 70}
                />
              );
            })}
          </g>
        )}

        {(instrument === "damaru" || instrument === "dholak") && (
          <g>
            <ellipse cx={0} cy={-4} rx={40} ry={22} fill="#9a3412" stroke="#0b1120" strokeWidth={2.8} />
            <ellipse cx={-38} cy={-4} rx={8} ry={20} fill="#fef3c7" stroke="#78350f" strokeWidth={2} />
            <ellipse cx={38} cy={-4} rx={8} ry={20} fill="#fef3c7" stroke="#78350f" strokeWidth={2} />
            <path d={`M -30,-28 L ${-38},${-4 + beat}`} stroke="#0b1120" strokeWidth={15} strokeLinecap="round" />
            <path d={`M -30,-28 L ${-38},${-4 + beat}`} stroke="#f7be9c" strokeWidth={10.5} strokeLinecap="round" />
            <path d={`M 30,-28 L ${38},${-4 - beat}`} stroke="#0b1120" strokeWidth={15} strokeLinecap="round" />
            <path d={`M 30,-28 L ${38},${-4 - beat}`} stroke="#f7be9c" strokeWidth={10.5} strokeLinecap="round" />
            <circle cx={0} cy={-4} r={44 + Math.abs(beat)} fill="none" stroke="#fde047" strokeWidth={2.4} opacity={0.5} />
          </g>
        )}

        {instrument === "shankh" && (
          <g>
            <path d="M -22,-26 L 8,-46" stroke="#0b1120" strokeWidth={15} strokeLinecap="round" />
            <path d="M -22,-26 L 8,-46" stroke="#f7be9c" strokeWidth={10.5} strokeLinecap="round" />
            <path d="M 6,-48 Q 38,-68 54,-46 Q 42,-28 8,-42 Z" fill="#fffbeb" stroke="#0b1120" strokeWidth={2.2} />
            <circle cx={58} cy={-48} r={14 + Math.abs(beat)} fill="none" stroke="#fef08a" strokeWidth={2.5} opacity={0.6} />
          </g>
        )}

        {instrument === "manjira" && (
          <g>
            <path d={`M -24,-26 L ${-10 + beat * 0.5},-28`} stroke="#0b1120" strokeWidth={14} strokeLinecap="round" />
            <path d={`M -24,-26 L ${-10 + beat * 0.5},-28`} stroke="#f7be9c" strokeWidth={10} strokeLinecap="round" />
            <path d={`M 24,-26 L ${10 - beat * 0.5},-28`} stroke="#0b1120" strokeWidth={14} strokeLinecap="round" />
            <path d={`M 24,-26 L ${10 - beat * 0.5},-28`} stroke="#f7be9c" strokeWidth={10} strokeLinecap="round" />
            <circle cx={-8 + beat * 0.5} cy={-28} r={11} fill="#fcd34d" stroke="#0b1120" strokeWidth={2} />
            <circle cx={8 - beat * 0.5} cy={-28} r={11} fill="#fcd34d" stroke="#0b1120" strokeWidth={2} />
          </g>
        )}
      </svg>
    </div>
  );
};

export const DevaHelperRig: React.FC<{
  x: number;
  y: number;
  scale?: number;
  pose?: "cheer" | "garland" | "banner" | "polish";
  dhotiColor?: string;
  phase?: number;
  flipX?: boolean;
}> = ({
  x,
  y,
  scale = 1,
  pose = "cheer",
  dhotiColor = "#f59e0b",
  phase = 0,
  flipX = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const cheer = Math.sin(t * 5.4 + phase) * 12;
  const hop = Math.abs(Math.sin(t * 4.5 + phase)) * 7;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y - (pose === "cheer" ? hop : 0),
        transform: `translate(-50%, -50%) scale(${flipX ? -scale : scale}, ${scale})`,
        pointerEvents: "none",
      }}
    >
      <svg width={220} height={300} viewBox="-110 -140 220 300" overflow="visible">
        {/* Full Standing Legs & Feet */}
        <g transform="translate(0, 68)">
          <path d="M -15,0 L -18,52" stroke="#0b1120" strokeWidth={17} strokeLinecap="round" fill="none" />
          <path d="M -15,0 L -18,52" stroke="#f7be9c" strokeWidth={12} strokeLinecap="round" fill="none" />
          <path d="M 15,0 L 18,52" stroke="#0b1120" strokeWidth={17} strokeLinecap="round" fill="none" />
          <path d="M 15,0 L 18,52" stroke="#f7be9c" strokeWidth={12} strokeLinecap="round" fill="none" />
          <ellipse cx={-20} cy={57} rx={13} ry={6} fill="#f7be9c" stroke="#0b1120" strokeWidth={2} />
          <ellipse cx={20} cy={57} rx={13} ry={6} fill="#f7be9c" stroke="#0b1120" strokeWidth={2} />
        </g>

        {/* Draped Silk Dhoti */}
        <path d="M -27,12 L 27,12 L 35,84 Q 0,98 -35,84 Z" fill={dhotiColor} stroke="#0b1120" strokeWidth={2.5} />
        <path d="M -33,76 Q 0,90 33,76" fill="none" stroke="#fde047" strokeWidth={3.8} />

        {/* Angavastram & Tunic */}
        <path d="M -24,-34 Q 0,-42 24,-34 L 20,16 L -20,16 Z" fill="#fef08a" stroke="#0b1120" strokeWidth={2.3} />
        <path d="M -16,-32 Q 0,-4 16,-32" fill="none" stroke="#f43f5e" strokeWidth={5} strokeDasharray="3 4" strokeLinecap="round" />

        {/* Pose-Specific Arms & Props */}
        {pose === "cheer" && (
          <>
            <path d={`M -20,-24 Q -40,-52 ${-36},${-80 + cheer * 0.5}`} stroke="#0b1120" strokeWidth={14} strokeLinecap="round" fill="none" />
            <path d={`M -20,-24 Q -40,-52 ${-36},${-80 + cheer * 0.5}`} stroke="#f7be9c" strokeWidth={9.5} strokeLinecap="round" fill="none" />
            <path d={`M 20,-24 Q 40,-52 ${36},${-80 - cheer * 0.5}`} stroke="#0b1120" strokeWidth={14} strokeLinecap="round" fill="none" />
            <path d={`M 20,-24 Q 40,-52 ${36},${-80 - cheer * 0.5}`} stroke="#f7be9c" strokeWidth={9.5} strokeLinecap="round" fill="none" />
          </>
        )}
        {pose === "garland" && (
          <>
            <path d={`M -20,-22 Q -42,-44 ${-48},${-58 + cheer * 0.3}`} stroke="#0b1120" strokeWidth={14} strokeLinecap="round" fill="none" />
            <path d={`M -20,-22 Q -42,-44 ${-48},${-58 + cheer * 0.3}`} stroke="#f7be9c" strokeWidth={9.5} strokeLinecap="round" fill="none" />
            <path d={`M 20,-22 Q 42,-44 ${48},${-58 + cheer * 0.3}`} stroke="#0b1120" strokeWidth={14} strokeLinecap="round" fill="none" />
            <path d={`M 20,-22 Q 42,-44 ${48},${-58 + cheer * 0.3}`} stroke="#f7be9c" strokeWidth={9.5} strokeLinecap="round" fill="none" />
            {/* Held Marigold Garland */}
            <path
              d={`M -48,${-58 + cheer * 0.3} Q 0,${-10 + cheer * 0.4} 48,${-58 + cheer * 0.3}`}
              fill="none"
              stroke="#f97316"
              strokeWidth={11}
              strokeDasharray="6 4"
              strokeLinecap="round"
            />
          </>
        )}
        {pose === "banner" && (
          <>
            <path d="M -20,-22 Q -36,0 -28,24" stroke="#0b1120" strokeWidth={14} strokeLinecap="round" fill="none" />
            <path d="M -20,-22 Q -36,0 -28,24" stroke="#f7be9c" strokeWidth={9.5} strokeLinecap="round" fill="none" />
            <path d="M 20,-22 Q 36,-34 40,-50" stroke="#0b1120" strokeWidth={14} strokeLinecap="round" fill="none" />
            <path d="M 20,-22 Q 36,-34 40,-50" stroke="#f7be9c" strokeWidth={9.5} strokeLinecap="round" fill="none" />
            {/* Golden Surya Dhvaja Pole */}
            <line x1={40} y1={85} x2={40} y2={-135} stroke="#fde047" strokeWidth={5} />
            <polygon points={`40,-135 ${105 + cheer},-115 40,-92`} fill="#f97316" stroke="#fde047" strokeWidth={2} />
          </>
        )}
        {pose === "polish" && (
          <>
            <path d={`M -20,-22 Q -42,-8 ${-48 + cheer * 0.5},10`} stroke="#0b1120" strokeWidth={14} strokeLinecap="round" fill="none" />
            <path d={`M -20,-22 Q -42,-8 ${-48 + cheer * 0.5},10`} stroke="#f7be9c" strokeWidth={9.5} strokeLinecap="round" fill="none" />
            <path d={`M 20,-22 Q 44,-22 ${56 + cheer * 0.5},-26`} stroke="#0b1120" strokeWidth={14} strokeLinecap="round" fill="none" />
            <path d={`M 20,-22 Q 44,-22 ${56 + cheer * 0.5},-26`} stroke="#f7be9c" strokeWidth={9.5} strokeLinecap="round" fill="none" />
            <circle cx={60 + cheer * 0.5} cy={-26} r={9} fill="#fef3c7" stroke="#fbbf24" strokeWidth={2} />
          </>
        )}

        {/* Face & Mukut */}
        <circle cx={0} cy={-60} r={19} fill="#f7be9c" stroke="#0b1120" strokeWidth={2.2} />
        <polygon points="-15,-74 0,-104 15,-74" fill="#fbbf24" stroke="#0b1120" strokeWidth={1.8} />
        <line x1={0} y1={-72} x2={0} y2={-64} stroke="#dc2626" strokeWidth={2.4} strokeLinecap="round" />
        <circle cx={-6} cy={-61} r={2.2} fill="#0f172a" />
        <circle cx={6} cy={-61} r={2.2} fill="#0f172a" />
        <path d="M -5,-51 Q 0,-47 5,-51" fill="none" stroke="#7f1d1d" strokeWidth={1.8} />
      </svg>
    </div>
  );
};
