import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ParallaxStage } from "../environment/ParallaxStage";
import { MahadevRig } from "../characters/MahadevRig";
import { VishnuRig } from "../characters/VishnuRig";
import { getSmoothVoEnergy } from "../timeline";

// S06 (01:20.5 - 01:38, 1050 frames): "भगवान विष्णु ने जाकर कहा... आज आपका ब्याह होना है! अचकन, सेहरा, पाग पहन के चलो!"
export const S06VishnuAdvice: React.FC<{ globalStartFrame: number }> = ({ globalStartFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const gf = globalStartFrame + frame;
  const vo = getSmoothVoEnergy(gf);

  const vishnuEnter = spring({ frame, fps, config: { damping: 14, stiffness: 65 } });
  const vishnuX = interpolate(vishnuEnter, [0, 1], [1780, 1340]);
  const camZoom = interpolate(frame, [0, 1050], [1.0, 1.07]);

  // Trigger dream hologram icons strictly synced to "अचकन", "सेहरा", "सिर पर पाग" (approx local 330–980f)
  let dreamOverlay: "none" | "achkan" | "sehra" | "pagdi" | "all" = "none";
  if (frame >= 330 && frame < 500) dreamOverlay = "achkan";
  else if (frame >= 500 && frame < 680) dreamOverlay = "sehra";
  else if (frame >= 680 && frame < 850) dreamOverlay = "pagdi";
  else if (frame >= 850) dreamOverlay = "all";

  return (
    <ParallaxStage mode="shamshan" cameraX={interpolate(frame, [0, 1050], [-16, 16])} zoom={camZoom}>
      {/* Soft Radial Contrast Glows (Zero hard edges!) */}
      <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <radialGradient id="s06Gold" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="s06Blue" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={1340} cy={510} r={420} fill="url(#s06Gold)" opacity={0.7 + vo * 0.3} />
        <circle cx={680} cy={610} r={390} fill="url(#s06Blue)" />
      </svg>

      {/* Mahadev Listening Calmly on Tiger Skin */}
      <MahadevRig
        x={680}
        y={640}
        scale={1.12}
        pose="lounging"
        dreamOverlay={dreamOverlay}
      />

      {/* Vishnu Ji Stepping Closer & Advising with Expressive Hand Motion */}
      <VishnuRig
        x={vishnuX}
        y={525}
        scale={1.14}
        flipX
        speakingEnergy={vo}
        gestureMode="advising"
      />
    </ParallaxStage>
  );
};
