import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { clothWave, fireTurbulence } from "../motion/physics";
import type { SubtitleCue } from "../timeline";

export const SHORTS_WIDTH = 1080;
export const SHORTS_HEIGHT = 1920;
export const SHORTS_FPS = 30;

const OUTLINE = "#1a0b2e";

export type ShortsBackdropMode =
  | "devaloka"
  | "vishnu"
  | "shamshan"
  | "himalaya"
  | "palace"
  | "village_night"
  | "village_interior"
  | "vivah_mandap";

export const ShortsCamera: React.FC<{
  zoom?: number;
  panX?: number;
  panY?: number;
  children: React.ReactNode;
}> = ({ zoom = 1, panX = 0, panY = 0, children }) => {
  const maxPanX = Math.max(0, (zoom - 1) * (SHORTS_WIDTH / 2));
  const maxPanY = Math.max(0, (zoom - 1) * (SHORTS_HEIGHT / 2));
  const cx = Math.max(-maxPanX, Math.min(maxPanX, panX));
  const cy = Math.max(-maxPanY, Math.min(maxPanY, panY));
  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#14071e" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translate(${cx}px, ${cy}px) scale(${zoom})`,
          transformOrigin: "center center",
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};

// Purpose-built 1080x1920 Portrait Backdrops (ZERO url(#...) gradients!)
export const ShortsBackdrop: React.FC<{ mode: ShortsBackdropMode }> = ({ mode }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const garlandSway = clothWave(t, 0.5, 10);
  const flame = fireTurbulence(t, 2);

  const isNight = mode === "shamshan" || mode === "village_night";
  const isVishnu = mode === "vishnu";
  const isInterior = mode === "village_interior";
  const isMandap = mode === "vivah_mandap";

  const skyTop = isNight ? "#060919" : isVishnu ? "#071b3d" : isMandap ? "#2e0c3a" : isInterior ? "#3a1628" : "#c2410c";
  const skyMid = isNight ? "#121a3a" : isVishnu ? "#0e3a6e" : isMandap ? "#4c1452" : isInterior ? "#562335" : "#ea580c";
  const floorColor = isNight ? "#0b1126" : isVishnu ? "#0b224b" : isMandap ? "#450618" : isInterior ? "#2a0e20" : "#2b0d38";

  return (
    <svg
      viewBox="0 0 1080 1920"
      width="100%"
      height="100%"
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      {/* Multi-band Cel-Shaded Portrait Sky (extra bleed for camera zoom) */}
      <rect x={-80} y={-80} width={1240} height={2080} fill={skyTop} />
      <rect x={-80} y={320} width={1240} height={860} fill={skyMid} opacity={0.85} />
      <rect x={-80} y={1160} width={1240} height={840} fill={floorColor} />

      {isInterior ? (
        <>
          {/* Cozy Himachali Portrait Room Interior */}
          <rect x={0} y={240} width={1080} height={940} fill="#5b2537" />
          <rect x={0} y={220} width={1080} height={36} fill="#78350f" stroke={OUTLINE} strokeWidth={3} />
          <rect x={280} y={420} width={520} height={740} fill="#7c2d12" stroke="#fbbf24" strokeWidth={5} />
          <line x1={540} y1={420} x2={540} y2={1160} stroke={OUTLINE} strokeWidth={5} />
          <rect x={495} y={760} width={90} height={22} rx={6} fill="#fbbf24" stroke={OUTLINE} strokeWidth={2.5} />
          {[140, 940].map((nx, i) => (
            <g key={i} transform={`translate(${nx}, 580)`}>
              <path d="M-55,95 L-55,-30 Q0,-85 55,-30 L55,95 Z" fill="#2e0f1e" stroke="#fbbf24" strokeWidth={3.5} />
              <rect x={-16} y={70} width={32} height={14} rx={4} fill="#d97706" stroke={OUTLINE} strokeWidth={2} />
              <path d={`M-9,70 Q${flame.leanX * 0.3},${36 * flame.scaleY} 9,70 Z`} fill="#f97316" />
              <path d="M-4,70 Q0,48 4,70 Z" fill="#fef08a" />
            </g>
          ))}
          <ellipse cx={540} cy={1265} rx={440} ry={48} fill="#9f1239" stroke="#fbbf24" strokeWidth={3.5} />
          <ellipse cx={540} cy={1265} rx={340} ry={32} fill="#be123c" stroke="#fde047" strokeWidth={2} strokeDasharray="10 7" />
        </>
      ) : (
        <>
          {/* Upper Celestial Sun / Crescent Moon */}
          {isNight ? (
            <g transform="translate(820, 410)">
              <circle cx={0} cy={0} r={120} fill="#38bdf8" opacity={0.08} />
              <path d="M-24,-64 A68,68 0 1,0 56,42 A54,54 0 1,1 -24,-64 Z" fill="#fef9c3" />
            </g>
          ) : (
            <g transform="translate(540, 500)">
              <circle cx={0} cy={0} r={340} fill="#fef08a" opacity={0.10} />
              <circle cx={0} cy={0} r={220} fill="#fde047" opacity={0.14} />
              <circle cx={0} cy={0} r={130} fill="#fef08a" opacity={0.22} />
              {Array.from({ length: 18 }).map((_, i) => (
                <polygon
                  key={i}
                  points="-18,-360 18,-360 0,-60"
                  fill="#fde047"
                  opacity={0.09}
                  transform={`rotate(${i * 20 + frame * 0.12})`}
                />
              ))}
            </g>
          )}

          {/* Stars for Night / Vishnu */}
          {(isNight || isVishnu || isMandap) &&
            Array.from({ length: 28 }).map((_, i) => {
              const sx = ((i * 193) % 1020) + 30;
              const sy = ((i * 137) % 720) + 180;
              return <circle key={i} cx={sx} cy={sy} r={i % 3 === 0 ? 3.5 : 2} fill="#fef9c3" opacity={0.7} />;
            })}

          {/* Towering Himalayan Snow Peaks Framed for 9:16 Portrait */}
          <polygon points="-80,1180 260,540 620,1180" fill={isNight ? "#1e293b" : "#31124c"} />
          <polygon points="160,720 260,540 360,720 260,670" fill={isNight ? "#cbd5e1" : "#fef3c7"} opacity={0.85} />
          <polygon points="460,1180 820,520 1160,1180" fill={isNight ? "#172038" : "#270d3e"} />
          <polygon points="715,710 820,520 925,710 820,660" fill={isNight ? "#cbd5e1" : "#fef3c7"} opacity={0.85} />

          {/* Palace / Mandap / Shamshan Architectural Framing */}
          {isMandap ? (
            <>
              {[120, 960].map((px, i) => (
                <g key={i}>
                  <rect x={px - 22} y={240} width={44} height={940} fill="#b45309" stroke={OUTLINE} strokeWidth={3.5} />
                  <rect x={px - 32} y={1150} width={64} height={30} rx={6} fill="#fbbf24" stroke={OUTLINE} strokeWidth={3} />
                </g>
              ))}
              <path d="M90,245 L990,245 L900,175 L180,175 Z" fill="#be123c" stroke="#fbbf24" strokeWidth={4} />
              <ellipse cx={540} cy={1210} rx={450} ry={66} fill="#881337" stroke="#fbbf24" strokeWidth={4} />
              <ellipse cx={540} cy={1210} rx={340} ry={44} fill="#9f1239" stroke="#fde047" strokeWidth={2.5} strokeDasharray="10 8" />
            </>
          ) : mode === "palace" || mode === "himalaya" || mode === "devaloka" ? (
            <>
              {/* Left & Right Ornate Temple / Palace Side Towers */}
              {[0, 880].map((bx, i) => (
                <g key={i} transform={`translate(${bx}, 800)`}>
                  <rect x={0} y={0} width={200} height={380} fill="#6b1636" stroke={OUTLINE} strokeWidth={3} />
                  <rect x={0} y={0} width={200} height={24} fill="#fbbf24" stroke={OUTLINE} strokeWidth={2.5} />
                  <path d="M25,0 Q100,-120 175,0 Z" fill="#d97706" stroke={OUTLINE} strokeWidth={3} />
                  <line x1={100} y1={-60} x2={100} y2={-110} stroke="#fef08a" strokeWidth={3} />
                  <polygon points="100,-110 140,-96 100,-82" fill="#f97316" />
                </g>
              ))}
              {/* Overhead Festive Marigold Toran Garland */}
              <path
                d={`M0,235 Q540,${310 + garlandSway} 1080,235`}
                fill="none"
                stroke="#15803d"
                strokeWidth={10}
              />
              {Array.from({ length: 17 }).map((_, i) => {
                const gx = 34 + i * 63;
                const u = gx / 1080;
                const gy = 235 + 4 * (75 + garlandSway) * u * (1 - u);
                return (
                  <g key={i}>
                    <circle cx={gx} cy={gy} r={11} fill={i % 2 === 0 ? "#fbbf24" : "#f97316"} stroke={OUTLINE} strokeWidth={2} />
                    {i % 2 === 1 && <polygon points={`${gx - 6},${gy + 11} ${gx + 6},${gy + 11} ${gx},${gy + 28}`} fill="#ef4444" />}
                  </g>
                );
              })}
              {/* Glowing Stage Courtyard Circle */}
              <ellipse cx={540} cy={1220} rx={480} ry={76} fill="#3b0c4b" stroke="#fbbf24" strokeWidth={3} />
              <ellipse cx={540} cy={1220} rx={360} ry={50} fill="none" stroke="#fde047" strokeWidth={2} strokeDasharray="10 8" />
            </>
          ) : (
            <>
              {/* Shamshan / Night Sacred Fires & Ground Horizon */}
              <ellipse cx={540} cy={1210} rx={480} ry={66} fill="#161f3b" stroke="#475569" strokeWidth={2.5} />
              {[150, 930].map((fx, i) => (
                <g key={i} transform={`translate(${fx}, 1190)`}>
                  <ellipse cx={0} cy={22} rx={78} ry={18} fill="#7c2d12" opacity={0.4} />
                  <polygon points="-32,10 32,10 22,-8 -22,-8" fill="#334155" stroke="#fbbf24" strokeWidth={2.5} />
                  <path d={`M-18,-8 Q${flame.leanX * 0.5},${-74 * flame.scaleY} 18,-8 Z`} fill="#f97316" />
                  <path d={`M-9,-8 Q${flame.leanX * 0.25},${-50 * flame.scaleY} 9,-8 Z`} fill="#fef08a" />
                </g>
              ))}
            </>
          )}
        </>
      )}

      {/* Subtle Bottom Gradient Vignette Band for Subtitle Readability */}
      <rect x={0} y={1340} width={1080} height={580} fill="#12051c" opacity={0.82} />
    </svg>
  );
};

// Top Safe-Zone Mobile Shorts Header + Progress Track + Live VO Meter
export const ShortsHeader: React.FC<{
  partNumber: number;
  totalParts?: number;
  sceneLabel: string;
  progress: number; // 0..1
  voEnergy: number;
}> = ({ partNumber, totalParts = 10, sceneLabel, progress, voEnergy }) => {
  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, pointerEvents: "none" }}>
      {/* Top Progress Track */}
      <div style={{ height: 8, width: "100%", background: "rgba(255,255,255,0.14)" }}>
        <div
          style={{
            height: "100%",
            width: `${Math.max(2, Math.min(100, progress * 100))}%`,
            background: "linear-gradient(90deg, #f97316, #fde047)",
          }}
        />
      </div>

      {/* Episode Badge + Live Audio Bars */}
      <div
        style={{
          marginTop: 54,
          paddingLeft: 34,
          paddingRight: 34,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            padding: "10px 22px",
            borderRadius: 999,
            background: "linear-gradient(135deg, rgba(124, 24, 52, 0.92), rgba(49, 16, 61, 0.92))",
            border: "2px solid #fbbf24",
            boxShadow: "0 10px 24px rgba(0,0,0,0.4)",
            fontFamily: "'Noto Sans Devanagari', sans-serif",
            fontSize: 24,
            fontWeight: 700,
            color: "#fef08a",
          }}
        >
          महादेव की बारात • भाग {partNumber}/{totalParts}
        </div>

        {/* Live VO Audio Waveform Pill */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 5,
            height: 44,
            padding: "8px 16px",
            borderRadius: 999,
            background: "rgba(20, 7, 30, 0.85)",
            border: "1.5px solid rgba(253, 224, 71, 0.45)",
          }}
        >
          {[0.55, 0.95, 0.72, 0.45].map((m, idx) => (
            <div
              key={idx}
              style={{
                width: 6,
                height: Math.round(8 + Math.min(1, voEnergy * 1.4) * 20 * m),
                borderRadius: 3,
                background: "#fde047",
              }}
            />
          ))}
        </div>
      </div>

      {/* Scene Title Pill */}
      <div style={{ marginTop: 14, display: "flex", justifyContent: "center" }}>
        <div
          style={{
            padding: "8px 24px",
            borderRadius: 16,
            background: "rgba(18, 8, 32, 0.86)",
            border: "1.5px solid rgba(251, 191, 36, 0.55)",
            fontFamily: "'Yatra One', 'Noto Sans Devanagari', serif",
            fontSize: 28,
            color: "#fffbeb",
          }}
        >
          {sceneLabel}
        </div>
      </div>
    </div>
  );
};

// Bottom Safe-Zone Mobile Shorts Subtitles (Positioned Safely Above IG Reels / YT Shorts Bottom UI)
export const ShortsCaptions: React.FC<{
  subtitles: SubtitleCue[];
  sec: number;
  voEnergy: number;
  partNumber: number;
}> = ({ subtitles, sec, voEnergy, partNumber }) => {
  const active = subtitles.find((s) => sec >= s.startSec && sec <= s.endSec);

  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 215, pointerEvents: "none" }}>
      {active && (
        <div
          style={{
            marginLeft: 38,
            marginRight: 38,
            marginBottom: 18,
            padding: "18px 28px 20px",
            borderRadius: 24,
            background: "linear-gradient(135deg, rgba(44, 12, 48, 0.94), rgba(92, 18, 46, 0.92))",
            border: `2.5px solid rgba(253, 224, 71, ${0.48 + Math.min(0.5, voEnergy * 0.5)})`,
            boxShadow: "0 16px 38px rgba(0,0,0,0.55)",
            textAlign: "center",
          }}
        >
          {active.speaker && (
            <div
              style={{
                fontFamily: "'Noto Sans Devanagari', sans-serif",
                fontSize: 21,
                fontWeight: 700,
                color: "#fbbf24",
                marginBottom: 6,
              }}
            >
              ● {active.speaker}
            </div>
          )}
          <div
            style={{
              fontFamily: "'Noto Sans Devanagari', sans-serif",
              fontSize: 36,
              fontWeight: 700,
              lineHeight: 1.38,
              color: "#fffbeb",
            }}
          >
            {active.text}
          </div>
        </div>
      )}

      {/* Shorts Footer Tag Safely Above IG/YT Overlay */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            padding: "7px 20px",
            borderRadius: 999,
            background: "rgba(255, 255, 255, 0.10)",
            border: "1px solid rgba(253, 224, 71, 0.32)",
            fontFamily: "'Noto Sans Devanagari', sans-serif",
            fontSize: 20,
            fontWeight: 700,
            color: "#fde68a",
          }}
        >
          {partNumber < 10 ? `अगला भाग ${partNumber + 1}/10 देखें • हर हर महादेव` : "शुभ विवाह संपन्न • हर हर महादेव!"}
        </div>
      </div>
    </div>
  );
};
