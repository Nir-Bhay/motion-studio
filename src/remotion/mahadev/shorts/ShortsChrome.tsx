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

// Ground Contact Shadow so every standing character feels physically anchored
export const GroundShadow: React.FC<{ x: number; y: number; rx?: number; opacity?: number }> = ({
  x,
  y,
  rx = 85,
  opacity = 0.42,
}) => (
  <svg
    viewBox="0 0 1080 1920"
    width="100%"
    height="100%"
    style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
  >
    <ellipse cx={x} cy={y} rx={rx} ry={Math.max(12, rx * 0.2)} fill="#090314" opacity={opacity} />
  </svg>
);

// Layered Celestial Cloud Seat + Optional Divine Light Beam connecting sky deities to ground stage
export const CelestialCloudSeat: React.FC<{
  x: number;
  y: number;
  scale?: number;
  withBeam?: boolean;
}> = ({ x, y, scale = 1, withBeam = true }) => (
  <svg
    viewBox="0 0 1080 1920"
    width="100%"
    height="100%"
    style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
  >
    {withBeam && (
      <polygon
        points={`${x - 95 * scale},${y} ${x + 95 * scale},${y} ${x + 260 * scale},${y + 520} ${x - 260 * scale},${y + 520}`}
        fill="#fde047"
        opacity={0.075}
      />
    )}
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <ellipse cx={0} cy={18} rx={210} ry={42} fill="#e0f2fe" opacity={0.18} />
      <circle cx={-110} cy={16} r={44} fill="#f8fafc" opacity={0.26} />
      <circle cx={-45} cy={4} r={54} fill="#f8fafc" opacity={0.32} />
      <circle cx={38} cy={6} r={52} fill="#f8fafc" opacity={0.32} />
      <circle cx={112} cy={18} r={42} fill="#f8fafc" opacity={0.26} />
      <rect x={-135} y={18} width={270} height={36} rx={18} fill="#e0f2fe" opacity={0.28} />
    </g>
  </svg>
);

// Sacred Vivah Havan Kund (Agni Fire Altar) for Mandap scenes
export const HavanKundProp: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const flame = fireTurbulence(frame / fps, 3);

  return (
    <svg
      viewBox="0 0 1080 1920"
      width="100%"
      height="100%"
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <ellipse cx={0} cy={28} rx={105} ry={22} fill="#f97316" opacity={0.28} />
        <polygon points="-74,24 74,24 58,-4 -58,-4" fill="#92400e" stroke="#fbbf24" strokeWidth={3} />
        <polygon points="-58,-4 58,-4 46,-20 -46,-20" fill="#b45309" stroke="#fde047" strokeWidth={2.5} />
        <rect x={-36} y={-26} width={72} height={8} rx={3} fill="#78350f" stroke={OUTLINE} strokeWidth={2} />
        <path d={`M-28,-24 Q${flame.leanX * 0.7},${-96 * flame.scaleY} 28,-24 Z`} fill="#f97316" stroke="#fbbf24" strokeWidth={2} />
        <path d={`M-14,-24 Q${flame.leanX * 0.35},${-68 * flame.scaleY} 14,-24 Z`} fill="#fef08a" />
      </g>
    </svg>
  );
};

// Purpose-built 1080x1920 Portrait Backdrops with Connected Two-Tier Ground Stages (no SVG gradients)
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
  const terraceColor = isNight ? "#162040" : isVishnu ? "#102d63" : isMandap ? "#6d1236" : "#4a175e";
  const floorColor = isNight ? "#0b1126" : isVishnu ? "#0b224b" : isMandap ? "#450618" : isInterior ? "#2a0e20" : "#2b0d38";

  return (
    <svg
      viewBox="0 0 1080 1920"
      width="100%"
      height="100%"
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      {/* Multi-band Portrait Sky with zoom bleed */}
      <rect x={-80} y={-80} width={1240} height={2080} fill={skyTop} />
      <rect x={-80} y={300} width={1240} height={660} fill={skyMid} opacity={0.88} />

      {isInterior ? (
        <>
          {/* Cozy Himachali Portrait Room Interior */}
          <rect x={-80} y={240} width={1240} height={960} fill="#5b2537" />
          <rect x={-80} y={1180} width={1240} height={820} fill={floorColor} />
          <rect x={-80} y={220} width={1240} height={36} fill="#78350f" stroke={OUTLINE} strokeWidth={3} />
          <rect x={280} y={400} width={520} height={780} fill="#7c2d12" stroke="#fbbf24" strokeWidth={5} />
          <line x1={540} y1={400} x2={540} y2={1180} stroke={OUTLINE} strokeWidth={5} />
          <rect x={495} y={760} width={90} height={22} rx={6} fill="#fbbf24" stroke={OUTLINE} strokeWidth={2.5} />
          {[140, 940].map((nx, i) => (
            <g key={i} transform={`translate(${nx}, 580)`}>
              <path d="M-55,95 L-55,-30 Q0,-85 55,-30 L55,95 Z" fill="#2e0f1e" stroke="#fbbf24" strokeWidth={3.5} />
              <rect x={-16} y={70} width={32} height={14} rx={4} fill="#d97706" stroke={OUTLINE} strokeWidth={2} />
              <path d={`M-9,70 Q${flame.leanX * 0.3},${36 * flame.scaleY} 9,70 Z`} fill="#f97316" />
              <path d="M-4,70 Q0,48 4,70 Z" fill="#fef08a" />
            </g>
          ))}
          <ellipse cx={540} cy={1235} rx={460} ry={66} fill="#9f1239" stroke="#fbbf24" strokeWidth={3.5} />
          <ellipse cx={540} cy={1235} rx={360} ry={44} fill="#be123c" stroke="#fde047" strokeWidth={2} strokeDasharray="10 7" />
        </>
      ) : (
        <>
          {/* Upper Celestial Sun / Crescent Moon */}
          {isNight ? (
            <g transform="translate(820, 390)">
              <circle cx={0} cy={0} r={120} fill="#38bdf8" opacity={0.08} />
              <path d="M-24,-64 A68,68 0 1,0 56,42 A54,54 0 1,1 -24,-64 Z" fill="#fef9c3" />
            </g>
          ) : (
            <g transform="translate(540, 470)">
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

          {/* Stars for Night / Vishnu / Mandap */}
          {(isNight || isVishnu || isMandap) &&
            Array.from({ length: 28 }).map((_, i) => {
              const sx = ((i * 193) % 1020) + 30;
              const sy = ((i * 137) % 620) + 180;
              return <circle key={i} cx={sx} cy={sy} r={i % 3 === 0 ? 3.5 : 2} fill="#fef9c3" opacity={0.7} />;
            })}

          {/* Towering Himalayan Snow Peaks behind the Terrace */}
          <polygon points="-80,960 260,460 620,960" fill={isNight ? "#1e293b" : "#31124c"} />
          <polygon points="165,610 260,460 355,610 260,570" fill={isNight ? "#cbd5e1" : "#fef3c7"} opacity={0.85} />
          <polygon points="460,960 820,440 1160,960" fill={isNight ? "#172038" : "#270d3e"} />
          <polygon points="720,600 820,440 920,600 820,560" fill={isNight ? "#cbd5e1" : "#fef3c7"} opacity={0.85} />

          {/* Connected Mid-Ground Terrace / Path (y=935..1065) -> Foreground Courtyard (y=1065..1920) */}
          <rect x={-80} y={935} width={1240} height={135} fill={terraceColor} />
          <rect x={-80} y={930} width={1240} height={14} fill={isNight ? "#475569" : "#fbbf24"} opacity={0.85} />
          {/* Architectural Stairway connecting Upper Terrace & Main Courtyard */}
          <rect x={390} y={944} width={300} height={24} fill={isNight ? "#334155" : "#78350f"} stroke={OUTLINE} strokeWidth={2} />
          <rect x={360} y={968} width={360} height={24} fill={isNight ? "#1e293b" : "#92400e"} stroke={OUTLINE} strokeWidth={2} />
          <rect x={330} y={992} width={420} height={26} fill={isNight ? "#1e293b" : "#b45309"} stroke={OUTLINE} strokeWidth={2} />
          {/* Foreground Courtyard Floor */}
          <rect x={-80} y={1060} width={1240} height={940} fill={floorColor} />
          <line x1={-80} y1={1060} x2={1160} y2={1060} stroke={isNight ? "#64748b" : "#fbbf24"} strokeWidth={3} opacity={0.6} />

          {isMandap ? (
            <>
              {[95, 985].map((px, i) => (
                <g key={i}>
                  <rect x={px - 22} y={240} width={44} height={980} fill="#b45309" stroke={OUTLINE} strokeWidth={3.5} />
                  <rect x={px - 34} y={1195} width={68} height={32} rx={6} fill="#fbbf24" stroke={OUTLINE} strokeWidth={3} />
                </g>
              ))}
              <path d="M65,245 L1015,245 L915,175 L165,175 Z" fill="#be123c" stroke="#fbbf24" strokeWidth={4} />
              <ellipse cx={540} cy={1210} rx={450} ry={76} fill="#881337" stroke="#fbbf24" strokeWidth={4} />
              <ellipse cx={540} cy={1210} rx={340} ry={52} fill="#9f1239" stroke="#fde047" strokeWidth={2.5} strokeDasharray="10 8" />
            </>
          ) : mode === "palace" || mode === "himalaya" || mode === "devaloka" ? (
            <>
              {/* Left & Right Palace Towers seated cleanly on Upper Terrace */}
              {[-20, 900].map((bx, i) => (
                <g key={i} transform={`translate(${bx}, 680)`}>
                  <rect x={0} y={0} width={200} height={260} fill="#6b1636" stroke={OUTLINE} strokeWidth={3} />
                  <rect x={0} y={0} width={200} height={22} fill="#fbbf24" stroke={OUTLINE} strokeWidth={2.5} />
                  <path d="M25,0 Q100,-110 175,0 Z" fill="#d97706" stroke={OUTLINE} strokeWidth={3} />
                  <line x1={100} y1={-55} x2={100} y2={-105} stroke="#fef08a" strokeWidth={3} />
                  <polygon points="100,-105 140,-92 100,-79" fill="#f97316" />
                </g>
              ))}
              {/* Overhead Marigold Toran Garland */}
              <path d={`M0,235 Q540,${310 + garlandSway} 1080,235`} fill="none" stroke="#15803d" strokeWidth={10} />
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
              <ellipse cx={540} cy={1215} rx={475} ry={78} fill="#3b0c4b" stroke="#fbbf24" strokeWidth={3} />
              <ellipse cx={540} cy={1215} rx={360} ry={52} fill="none" stroke="#fde047" strokeWidth={2} strokeDasharray="10 8" />
            </>
          ) : (
            <>
              {/* Shamshan / Night Stage Circle + Sacred Dhuni Fires */}
              <ellipse cx={540} cy={1215} rx={475} ry={78} fill="#141d38" stroke="#475569" strokeWidth={2.5} />
              {[135, 945].map((fx, i) => (
                <g key={i} transform={`translate(${fx}, 1210)`}>
                  <ellipse cx={0} cy={20} rx={72} ry={16} fill="#7c2d12" opacity={0.45} />
                  <polygon points="-30,10 30,10 20,-8 -20,-8" fill="#334155" stroke="#fbbf24" strokeWidth={2.5} />
                  <path d={`M-17,-8 Q${flame.leanX * 0.5},${-72 * flame.scaleY} 17,-8 Z`} fill="#f97316" />
                  <path d={`M-8,-8 Q${flame.leanX * 0.25},${-48 * flame.scaleY} 8,-8 Z`} fill="#fef08a" />
                </g>
              ))}
            </>
          )}
        </>
      )}

      {/* Subtle Bottom Gradient Vignette Band for Subtitle Readability */}
      <rect x={-80} y={1340} width={1240} height={660} fill="#12051c" opacity={0.86} />
    </svg>
  );
};

// Top Safe-Zone Mobile Shorts Header + Progress Track + Live VO Meter
export const ShortsHeader: React.FC<{
  partNumber: number;
  totalParts?: number;
  sceneLabel: string;
  progress: number;
  voEnergy: number;
}> = ({ partNumber, totalParts = 10, sceneLabel, progress, voEnergy }) => {
  const clamped = Math.max(0, Math.min(1, progress));
  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, pointerEvents: "none", zIndex: 20 }}>
      <div style={{ width: "100%", height: 7, backgroundColor: "rgba(255,255,255,0.16)" }}>
        <div
          style={{
            width: `${clamped * 100}%`,
            height: "100%",
            backgroundColor: "#fbbf24",
            boxShadow: "0 0 12px rgba(251, 191, 36, 0.75)",
          }}
        />
      </div>

      <div
        style={{
          marginTop: 52,
          padding: "0 34px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(18, 6, 30, 0.84)",
            border: "2px solid #fbbf24",
            borderRadius: 999,
            padding: "9px 22px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            boxShadow: "0 6px 20px rgba(0,0,0,0.45)",
          }}
        >
          <span
            style={{
              fontFamily: "'Yatra One', 'Noto Sans Devanagari', sans-serif",
              fontSize: 25,
              color: "#fde047",
              letterSpacing: 0.4,
            }}
          >
            महादेव की बारात • भाग {partNumber}/{totalParts}
          </span>
        </div>

        <div
          style={{
            backgroundColor: "rgba(18, 6, 30, 0.84)",
            border: "2px solid rgba(251, 191, 36, 0.65)",
            borderRadius: 999,
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            gap: 5,
            height: 44,
          }}
        >
          {[0.55, 1.0, 0.75, 0.45].map((m, idx) => (
            <div
              key={idx}
              style={{
                width: 5,
                height: Math.max(6, Math.min(24, 6 + voEnergy * 24 * m)),
                borderRadius: 3,
                backgroundColor: "#fbbf24",
              }}
            />
          ))}
        </div>
      </div>

      <div style={{ marginTop: 14, display: "flex", justifyContent: "center", padding: "0 40px" }}>
        <div
          style={{
            backgroundColor: "rgba(18, 6, 30, 0.78)",
            border: "1.5px solid rgba(251, 191, 36, 0.45)",
            borderRadius: 999,
            padding: "7px 24px",
            fontFamily: "'Noto Sans Devanagari', sans-serif",
            fontSize: 24,
            fontWeight: 700,
            color: "#fef3c7",
            textAlign: "center",
            boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
          }}
        >
          {sceneLabel}
        </div>
      </div>
    </div>
  );
};

// Bottom Safe-Zone Mobile Subtitles + Next-Part CTA
export const ShortsCaptions: React.FC<{
  subtitles: SubtitleCue[];
  sec: number;
  voEnergy: number;
  partNumber: number;
  totalParts?: number;
}> = ({ subtitles, sec, voEnergy, partNumber, totalParts = 10 }) => {
  const active = subtitles.find((s) => sec >= s.startSec && sec <= s.endSec);
  const pulse = 1 + Math.min(0.025, voEnergy * 0.03);

  return (
    <div
      style={{
        position: "absolute",
        left: 36,
        right: 36,
        bottom: 215,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
        pointerEvents: "none",
        zIndex: 25,
      }}
    >
      {active && (
        <div
          style={{
            width: "100%",
            backgroundColor: "rgba(59, 9, 34, 0.90)",
            border: "2.5px solid #fbbf24",
            borderRadius: 24,
            padding: "16px 26px 20px",
            boxShadow: "0 12px 34px rgba(0,0,0,0.65)",
            transform: `scale(${pulse})`,
            textAlign: "center",
          }}
        >
          {active.speaker && (
            <div
              style={{
                fontFamily: "'Noto Sans Devanagari', sans-serif",
                fontSize: 20,
                fontWeight: 700,
                color: "#fde047",
                marginBottom: 6,
                letterSpacing: 0.4,
              }}
            >
              ● {active.speaker}
            </div>
          )}
          <div
            style={{
              fontFamily: "'Noto Sans Devanagari', sans-serif",
              fontSize: 33,
              fontWeight: 700,
              lineHeight: 1.38,
              color: "#ffffff",
              textShadow: "0 3px 10px rgba(0,0,0,0.85)",
            }}
          >
            {active.text}
          </div>
        </div>
      )}

      <div
        style={{
          backgroundColor: "rgba(18, 6, 30, 0.80)",
          border: "1.5px solid rgba(253, 224, 71, 0.42)",
          borderRadius: 999,
          padding: "7px 22px",
          fontFamily: "'Noto Sans Devanagari', sans-serif",
          fontSize: 20,
          fontWeight: 700,
          color: "#fef08a",
        }}
      >
        {partNumber < totalParts
          ? `अगला भाग ${partNumber + 1}/${totalParts} देखें • हर हर महादेव`
          : "शुभ विवाह संपन्न • हर हर महादेव!"}
      </div>
    </div>
  );
};
