import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ParallaxStage } from "../environment/ParallaxStage";
import { VishnuRig } from "../characters/VishnuRig";
import { getSmoothVoEnergy } from "../timeline";

// S03 (00:34 - 00:56, 1320 frames): "भगवान विष्णु पधारे... शंख, चक्र, गदा, पद्म लेकर के... देख कर सब बलैया लेने लगे!"
export const S03Vishnu: React.FC<{ globalStartFrame: number }> = ({ globalStartFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const gf = globalStartFrame + frame;
  const vo = getSmoothVoEnergy(gf);

  // Vishnu descends heroically on Garuda
  const enter = spring({ frame, fps, config: { damping: 16, stiffness: 55 } });
  const vishnuY = interpolate(enter, [0, 1], [-180, 465]);
  const zoom = interpolate(frame, [0, 420, 960, 1320], [0.96, 1.12, 1.16, 1.04]);

  // Highlight Shankh -> Chakra -> Gada -> Padma right in sync with "शंख, चक्र, गदा, पद्म" (around 43s–50s = local 540–960f)
  let highlightItem: "none" | "shankh" | "chakra" | "gada" | "padma" | "all" = "none";
  if (frame >= 540 && frame < 635) highlightItem = "shankh";
  else if (frame >= 635 && frame < 735) highlightItem = "chakra";
  else if (frame >= 735 && frame < 835) highlightItem = "gada";
  else if (frame >= 835 && frame < 950) highlightItem = "padma";
  else if (frame >= 950) highlightItem = "all";

  return (
    <ParallaxStage mode="vishnu" cameraX={0} cameraY={interpolate(frame, [0, 1320], [20, -15])} zoom={zoom}>
      {/* Golden Radiance Sunburst behind Garuda & Narayana */}
      <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <g transform={`translate(960, 430) rotate(${frame * 0.25})`} opacity={0.22}>
          {Array.from({ length: 18 }).map((_, i) => (
            <polygon key={i} points="0,0 -48,-620 48,-620" fill="#fffbeb" transform={`rotate(${i * 20})`} />
          ))}
        </g>
      </svg>

      {/* Main Hero: Bhagwan Vishnu on Winged Garuda */}
      <VishnuRig
        x={960}
        y={vishnuY}
        scale={1.25}
        withGaruda
        highlightItem={highlightItem}
        speakingEnergy={vo}
        gestureMode="serene"
      />

      {/* Animated Label Pills when each Ayudha is spoken */}
      {highlightItem !== "none" && highlightItem !== "all" && (
        <div
          style={{
            position: "absolute",
            top: 230,
            left: highlightItem === "shankh" || highlightItem === "gada" ? 420 : 1240,
            padding: "10px 26px",
            borderRadius: 18,
            background: "rgba(30, 27, 75, 0.85)",
            border: "2px solid #fde047",
            color: "#fde047",
            fontFamily: "'Yatra One', 'Noto Sans Devanagari', serif",
            fontSize: 34,
            boxShadow: "0 10px 30px rgba(251, 191, 36, 0.35)",
          }}
        >
          {highlightItem === "shankh"
            ? "✦ शंख"
            : highlightItem === "chakra"
            ? "✦ सुदर्शन चक्र"
            : highlightItem === "gada"
            ? "✦ कौमोदकी गदा"
            : "✦ पद्म (कमल)"}
        </div>
      )}

      {/* Crowd of Devas & Rishis below waving hands in "बलैया लेना" adoration */}
      {[240, 440, 650, 1270, 1480, 1680].map((dx, idx) => {
        const sway = Math.sin(frame * 0.14 + idx * 0.9) * 18;
        return (
          <div
            key={idx}
            style={{
              position: "absolute",
              left: dx,
              top: 790 + Math.sin(frame * 0.08 + idx) * 6,
              transform: "translate(-50%, -50%)",
            }}
          >
            <svg width={170} height={220} viewBox="-85 -110 170 220" overflow="visible">
              <path d="M -24,14 L 24,14 L 30,86 L -30,86 Z" fill={idx % 2 === 0 ? "#fb7185" : "#38bdf8"} stroke="#fde047" strokeWidth={2} />
              <path d="M -20,-34 L 20,-34 L 16,16 L -16,16 Z" fill="#fde68a" />
              <path d="M -14,-30 Q 0,-4 14,-30" fill="none" stroke="#f43f5e" strokeWidth={5} strokeDasharray="3 4" />
              {/* Both Hands Raised Toward Narayana */}
              <path d={`M -18,-24 Q ${-36},${-52} ${-26 + sway * 0.4},-84`} stroke="#f7be9c" strokeWidth={11} strokeLinecap="round" fill="none" />
              <path d={`M 18,-24 Q ${36},${-52} ${26 + sway * 0.4},-84`} stroke="#f7be9c" strokeWidth={11} strokeLinecap="round" fill="none" />
              <circle cx={0} cy={-54} r={18} fill="#f7be9c" stroke="#b46e4c" strokeWidth={1.2} />
              <line x1={0} y1={-66} x2={0} y2={-58} stroke="#dc2626" strokeWidth={2.5} strokeLinecap="round" />
              <circle cx={-6} cy={-55} r={2} fill="#0f172a" />
              <circle cx={6} cy={-55} r={2} fill="#0f172a" />
              <path d="M -5,-45 Q 0,-41 5,-45" fill="none" stroke="#7f1d1d" strokeWidth={1.8} />
              <polygon points="-14,-68 0,-92 14,-68" fill="#fbbf24" stroke="#92400e" strokeWidth={1.2} />
            </svg>
          </div>
        );
      })}
    </ParallaxStage>
  );
};
