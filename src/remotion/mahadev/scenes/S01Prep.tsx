import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ParallaxStage } from "../environment/ParallaxStage";
import { ApsaraRig, CelestialVimanaRig } from "../characters/ApsaraAndMusicians";
import { getSmoothVoEnergy } from "../timeline";

// S01 (00:00 - 00:15, 900 frames): "शंकर जी की बारात की तैयारी हो रही है... लगे सँवारन सकल सुर वाहन विविध विमान"
export const S01Prep: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const vo = getSmoothVoEnergy(frame);

  const camX = interpolate(frame, [0, 900], [-45, 45]);
  const zoom = interpolate(frame, [0, 900], [1.02, 1.1]);
  const titlePop = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });

  // Vimanas flying across parallax planes
  const vimana1X = interpolate(frame, [120, 880], [-220, 2100]);
  const vimana2X = interpolate(frame, [260, 900], [2100, -240]);

  return (
    <ParallaxStage mode="devaloka" cameraX={camX} cameraY={-8} zoom={zoom}>
      {/* Festive Toran Garland Archway framing the top */}
      <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        {/* Hanging Marigold Torans */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const x0 = i * 320;
          const sway = Math.sin(frame * 0.05 + i) * 6;
          return (
            <g key={i}>
              <path
                d={`M ${x0},0 Q ${x0 + 160},${95 + sway} ${x0 + 320},0`}
                fill="none"
                stroke="#f97316"
                strokeWidth={14}
                strokeDasharray="12 8"
                strokeLinecap="round"
              />
              <path
                d={`M ${x0},0 Q ${x0 + 160},${80 + sway} ${x0 + 320},0`}
                fill="none"
                stroke="#fde047"
                strokeWidth={6}
                strokeDasharray="4 16"
                strokeLinecap="round"
              />
              {/* Hanging Bell */}
              <g transform={`translate(${x0 + 160}, ${95 + sway}) rotate(${sway * 0.7})`}>
                <path d="M -12,0 Q 0,-8 12,0 L 18,28 L -18,28 Z" fill="#fbbf24" stroke="#92400e" strokeWidth={2} />
                <circle cx={0} cy={31} r={5} fill="#ef4444" />
              </g>
            </g>
          );
        })}

        {/* Glowing Floating Temple Diyas along Foreground Balcony */}
        {[240, 480, 740, 1180, 1440, 1680].map((dx, idx) => {
          const flicker = 1 + Math.sin(frame * 0.35 + idx * 2) * 0.14 + vo * 0.18;
          return (
            <g key={idx} transform={`translate(${dx}, 820)`}>
              <ellipse cx={0} cy={12} rx={24} ry={8} fill="#b45309" stroke="#fde047" strokeWidth={2} />
              <ellipse cx={0} cy={-8} rx={9 * flicker} ry={18 * flicker} fill="#ffedd5" opacity={0.95} />
              <circle cx={0} cy={-10} r={28 * flicker} fill="#fbbf24" opacity={0.28} />
            </g>
          );
        })}
      </svg>

      {/* Flying Celestial Vimanas */}
      <CelestialVimanaRig x={vimana1X} y={320} scale={0.78} />
      <CelestialVimanaRig x={vimana2X} y={445} scale={0.62} flipX />

      {/* Devtas Preparing Banners & Garlands on Stage */}
      {[340, 620, 1300, 1580].map((dx, idx) => {
        const cheer = Math.sin(frame * 0.12 + idx) * 14;
        return (
          <div
            key={idx}
            style={{
              position: "absolute",
              left: dx,
              top: 660 + Math.sin(frame * 0.08 + idx) * 8,
              transform: "translate(-50%, -50%)",
            }}
          >
            <svg width={180} height={240} viewBox="-90 -120 180 240" overflow="visible">
              <path d="M -26,18 L 26,18 L 34,92 L -34,92 Z" fill={idx % 2 === 0 ? "#f59e0b" : "#ec4899"} stroke="#fde047" strokeWidth={2.5} />
              <path d="M 0,18 L -8,92 M 0,18 L 8,92" stroke="#fde047" strokeWidth={1.5} opacity={0.6} />
              <path d="M -22,-32 L 22,-32 L 18,20 L -18,20 Z" fill="#fef08a" stroke="#d97706" strokeWidth={1.5} />
              {/* Flower Garland */}
              <path d="M -16,-30 Q 0,4 16,-30" fill="none" stroke="#f43f5e" strokeWidth={6} strokeDasharray="4 4" strokeLinecap="round" />
              {/* Raised Cheer Arm */}
              <path d={`M 20,-22 Q 44,-46 ${46},${-74 + cheer}`} stroke="#f7be9c" strokeWidth={12} strokeLinecap="round" fill="none" />
              <path d="M -20,-22 Q -38,0 -34,26" stroke="#f7be9c" strokeWidth={12} strokeLinecap="round" fill="none" />
              <circle cx={0} cy={-56} r={19} fill="#f7be9c" stroke="#c27a57" strokeWidth={1.2} />
              <line x1={0} y1={-68} x2={0} y2={-61} stroke="#dc2626" strokeWidth={2.5} strokeLinecap="round" />
              <circle cx={-6} cy={-57} r={2.1} fill="#0f172a" />
              <circle cx={6} cy={-57} r={2.1} fill="#0f172a" />
              <path d="M -5,-47 Q 0,-43 5,-47" fill="none" stroke="#7f1d1d" strokeWidth={1.8} />
              <polygon points="-16,-70 0,-96 16,-70" fill="#fbbf24" stroke="#92400e" strokeWidth={1.5} />
            </svg>
          </div>
        );
      })}

      {/* Apsara Gracefully Descending in Center once Opening Crest fades */}
      {frame > 360 && (
        <ApsaraRig
          x={960}
          y={interpolate(frame, [360, 740], [220, 585], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          scale={1.08}
          colorScheme="rose"
          energy={vo}
        />
      )}

      {/* Grand Sanskrit/Hindi Opening Crest ("महादेव की बारात") */}
      <div
        style={{
          position: "absolute",
          top: 155,
          left: 0,
          right: 0,
          textAlign: "center",
          transform: `scale(${0.86 + 0.14 * titlePop})`,
          opacity: interpolate(frame, [0, 30, 320, 375], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontFamily: "'Yatra One', 'Rozha One', 'Noto Sans Devanagari', serif",
            fontSize: 92,
            color: "#fffbeb",
            textShadow: "0 8px 34px rgba(124, 45, 18, 0.85), 0 4px 12px rgba(0,0,0,0.75)",
          }}
        >
          महादेव की बारात
        </div>
        <div
          style={{
            display: "inline-block",
            padding: "8px 28px",
            borderRadius: 999,
            background: "rgba(38, 12, 42, 0.78)",
            border: "1.5px solid rgba(253, 224, 71, 0.7)",
            fontFamily: "'Noto Sans Devanagari', sans-serif",
            fontSize: 26,
            fontWeight: 700,
            color: "#fde047",
            marginTop: 8,
            letterSpacing: 1.2,
          }}
        >
          देवलोक में भव्य तैयारियाँ • भाग १
        </div>
      </div>
    </ParallaxStage>
  );
};
