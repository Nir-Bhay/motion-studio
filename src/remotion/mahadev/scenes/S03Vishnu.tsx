import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { ParallaxStage } from "../environment/ParallaxStage";
import { VishnuRig } from "../characters/VishnuRig";
import { DevaHelperRig } from "../characters/ApsaraAndMusicians";
import { BackgroundCrowdBand } from "../characters/DetailedGanasAndSpirits";
import { getSmoothVoEnergy, MAHADEV_FPS } from "../timeline";

// S03 (00:34 - 00:56, 1320 frames): "भगवान विष्णु पधारे... शंख, चक्र, गदा, पद्म लेकर के... देख कर सब बलैया लेने लगे!"
export const S03Vishnu: React.FC<{ globalStartFrame: number }> = ({ globalStartFrame }) => {
  const frame = useCurrentFrame();
  const fps = MAHADEV_FPS;
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

      {/* Rich Devaloka Crowd Below + Full-Bodied Devtas Cheering in Adoration ("बलैया लेना") */}
      <BackgroundCrowdBand mode="devaloka" y={695} />
      {[
        { x: 220, col: "#f59e0b", flip: false },
        { x: 420, col: "#ec4899", flip: false },
        { x: 630, col: "#0284c7", flip: false },
        { x: 1290, col: "#ea580c", flip: true },
        { x: 1500, col: "#ec4899", flip: true },
        { x: 1700, col: "#0284c7", flip: true },
      ].map((d, idx) => (
        <DevaHelperRig
          key={idx}
          x={d.x}
          y={745}
          scale={0.86}
          pose="cheer"
          dhotiColor={d.col}
          phase={idx * 0.7}
          flipX={d.flip}
        />
      ))}
    </ParallaxStage>
  );
};
