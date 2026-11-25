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
  const armL = -24 + Math.sin(t * 5.2 + phase) * 28;
  const armR = 24 + Math.cos(t * 5.2 + phase) * 28;
  const veilWave = clothWave(t, phase, 20);

  const palette =
    colorScheme === "emerald"
      ? { skirt: "#10b981", trim: "#fde047", veil: "#a7f3d0" }
      : colorScheme === "gold"
      ? { skirt: "#f59e0b", trim: "#fff7ed", veil: "#fde68a" }
      : { skirt: "#ec4899", trim: "#fde047", veil: "#fbcfe8" };

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y - bounce,
        transform: `translate(-50%, -50%) scale(${scale}) rotate(${sway * 0.25}deg)`,
        pointerEvents: "none",
      }}
    >
      <svg width={260} height={340} viewBox="-130 -170 260 340" overflow="visible">
        {/* Flowing Translucent Odhani Veil */}
        <path
          d={`M -34,-54 Q ${-95 + veilWave},-10 ${-82 - veilWave},78 Q -35,62 -20,25`}
          fill="none"
          stroke={palette.veil}
          strokeWidth={14}
          strokeLinecap="round"
          opacity={0.72}
        />
        <path
          d={`M 34,-54 Q ${95 - veilWave},-10 ${82 + veilWave},78 Q 35,62 20,25`}
          fill="none"
          stroke={palette.veil}
          strokeWidth={14}
          strokeLinecap="round"
          opacity={0.72}
        />

        {/* Twirling Pleated Classical Dance Skirt */}
        <path
          d={`M -22,6 L 22,6 L ${64 + sway * 0.5},108 Q 0,126 ${-64 + sway * 0.5},108 Z`}
          fill={palette.skirt}
          stroke={palette.trim}
          strokeWidth={3}
        />
        <path d="M 0,10 L -14,112 M 0,10 L 14,112" stroke={palette.trim} strokeWidth={2} opacity={0.7} />

        {/* Ankle Ghungroos */}
        <circle cx={-22} cy={120} r={5} fill="#fde047" />
        <circle cx={22} cy={116} r={5} fill="#fde047" />

        {/* Torso & Choli */}
        <path d="M -22,-54 Q 0,-60 22,-54 L 18,8 L -18,8 Z" fill={palette.skirt} stroke={palette.trim} strokeWidth={2} />

        {/* Articulated Dance Arms with Mudra Hands */}
        <g transform={`translate(-22, -46) rotate(${armL})`}>
          <path d="M 0,0 Q -36,-12 -52,-42" fill="none" stroke="#f7be9c" strokeWidth={13} strokeLinecap="round" />
          <circle cx={-54} cy={-46} r={7} fill="#f7be9c" />
        </g>
        <g transform={`translate(22, -46) rotate(${armR})`}>
          <path d="M 0,0 Q 36,-12 52,-42" fill="none" stroke="#f7be9c" strokeWidth={13} strokeLinecap="round" />
          <circle cx={54} cy={-46} r={7} fill="#f7be9c" />
        </g>

        {/* Face & Classical Hair Bun with Flower Gajra */}
        <g transform="translate(0, -88)">
          <circle cx={0} cy={-18} r={22} fill="#1e1b4b" />
          <path d="M -18,-18 Q 0,-36 18,-18" fill="none" stroke="#fffbeb" strokeWidth={5} strokeDasharray="4 3" />
          <ellipse cx={0} cy={0} rx={21} ry={24} fill="#f7be9c" />
          <circle cx={0} cy={-11} r={2.5} fill="#dc2626" />
          <circle cx={-8} cy={-2} r={2.4} fill="#0f172a" />
          <circle cx={8} cy={-2} r={2.4} fill="#0f172a" />
          <path d="M -6,9 Q 0,14 6,9" fill="none" stroke="#9f1239" strokeWidth={2} />
          <circle cx={-22} cy={5} r={4.5} fill="#fde047" />
          <circle cx={22} cy={5} r={4.5} fill="#fde047" />
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
  const hover = Math.sin(frame * 0.065) * 12;
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
      <svg width={360} height={280} viewBox="-180 -140 360 280" overflow="visible">
        {/* Golden Chariot Canopy & Shikhara */}
        <path d="M -85,18 L -65,-58 L 65,-58 L 85,18 Z" fill="rgba(255,237,179,0.22)" stroke="#fde047" strokeWidth={3} />
        <path d="M -78,-58 Q 0,-125 78,-58 Z" fill="#f59e0b" stroke="#fffbeb" strokeWidth={2.5} />
        <line x1={0} y1={-105} x2={0} y2={-136} stroke="#fde047" strokeWidth={3} />
        <polygon points={`0,-136 ${36 + flagWave},-126 0,-116`} fill="#ef4444" />

        {/* Flower Toran Garlands draped across Vimana */}
        <path d="M -76,-54 Q -38,-28 0,-54 Q 38,-28 76,-54" fill="none" stroke="#f97316" strokeWidth={9} strokeDasharray="8 5" strokeLinecap="round" />

        {/* Chariot Base Hull */}
        <path d="M -120,18 L 120,18 L 95,58 L -95,58 Z" fill="#b45309" stroke="#fde047" strokeWidth={3} />

        {/* Spinning Spoked Wheels */}
        {[-68, 68].map((wx, idx) => (
          <g key={idx} transform={`translate(${wx}, 62) rotate(${wheelRot})`}>
            <circle cx={0} cy={0} r={30} fill="none" stroke="#fde047" strokeWidth={6} />
            {Array.from({ length: 8 }).map((_, s) => (
              <line key={s} x1={0} y1={-28} x2={0} y2={28} stroke="#fcd34d" strokeWidth={2.5} transform={`rotate(${s * 45})`} />
            ))}
            <circle cx={0} cy={0} r={7} fill="#ef4444" />
          </g>
        ))}

        {/* Devta Rider Silhouette inside */}
        <circle cx={0} cy={-26} r={15} fill="#fbbf24" />
        <path d="M -18,16 Q 0,-14 18,16 Z" fill="#fde047" />
      </svg>
    </div>
  );
};

export const CelestialMusicianRig: React.FC<{
  x: number;
  y: number;
  instrument: "shehnai" | "damaru" | "manjira";
  scale?: number;
  energy?: number;
}> = ({ x, y, instrument, scale = 1, energy = 0.5 }) => {
  const frame = useCurrentFrame();
  const beat = Math.sin(frame * 0.25) * (6 + energy * 10);
  const pulse = (frame * 3) % 60;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + Math.sin(frame * 0.08) * 6,
        transform: `translate(-50%, -50%) scale(${scale})`,
        pointerEvents: "none",
      }}
    >
      <svg width={240} height={260} viewBox="-120 -130 240 260" overflow="visible">
        {/* Devta Musician Body */}
        <path d="M -28,15 L 28,15 L 36,92 L -36,92 Z" fill="#fb923c" stroke="#fde047" strokeWidth={2} />
        <path d="M -26,-38 L 26,-38 L 22,18 L -22,18 Z" fill="#fef08a" stroke="#d97706" strokeWidth={2} />
        <circle cx={0} cy={-64} r={20} fill="#f7be9c" />
        <polygon points="-16,-80 0,-106 16,-80" fill="#fbbf24" stroke="#92400e" strokeWidth={1.5} />
        <circle cx={-6} cy={-66} r={2.2} fill="#0f172a" />
        <circle cx={6} cy={-66} r={2.2} fill="#0f172a" />

        {instrument === "shehnai" && (
          <g>
            {/* Playing Shehnai with Golden Sound Wave Rings */}
            <path d="M -22,-24 L 18,-48" stroke="#f7be9c" strokeWidth={11} strokeLinecap="round" />
            <polygon points="10,-52 74,-68 78,-42" fill="#f59e0b" stroke="#fde047" strokeWidth={2} />
            {[0, 1, 2].map((w) => {
              const r = ((pulse + w * 20) % 60) + 10;
              return (
                <path
                  key={w}
                  d={`M ${78 + r * 0.6},${-68 - r * 0.25} Q ${92 + r * 0.7},-55 ${78 + r * 0.6},${-42 + r * 0.25}`}
                  fill="none"
                  stroke="#fde047"
                  strokeWidth={3}
                  opacity={1 - r / 70}
                />
              );
            })}
          </g>
        )}

        {instrument === "damaru" && (
          <g>
            {/* Beating Dholak / Dumdumiya */}
            <ellipse cx={0} cy={-4} rx={38} ry={22} fill="#9a3412" stroke="#fde047" strokeWidth={3} />
            <path d={`M -34,-26 L ${-38},${-4 + beat}`} stroke="#f7be9c" strokeWidth={11} strokeLinecap="round" />
            <path d={`M 34,-26 L ${38},${-4 - beat}`} stroke="#f7be9c" strokeWidth={11} strokeLinecap="round" />
            <circle cx={0} cy={-4} r={42 + Math.abs(beat)} fill="none" stroke="#fbbf24" strokeWidth={2} opacity={0.45} />
          </g>
        )}

        {instrument === "manjira" && (
          <g>
            <path d={`M -22,-26 L ${-10 + beat * 0.5},-28`} stroke="#f7be9c" strokeWidth={11} strokeLinecap="round" />
            <path d={`M 22,-26 L ${10 - beat * 0.5},-28`} stroke="#f7be9c" strokeWidth={11} strokeLinecap="round" />
            <circle cx={-8 + beat * 0.5} cy={-28} r={11} fill="#fcd34d" stroke="#b45309" strokeWidth={2} />
            <circle cx={8 - beat * 0.5} cy={-28} r={11} fill="#fcd34d" stroke="#b45309" strokeWidth={2} />
          </g>
        )}
      </svg>
    </div>
  );
};
