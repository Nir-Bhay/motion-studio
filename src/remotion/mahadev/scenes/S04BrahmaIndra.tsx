import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ParallaxStage } from "../environment/ParallaxStage";
import { BrahmaRig, IndraOnAiravataRig } from "../characters/BrahmaIndraRigs";
import { getSmoothVoEnergy } from "../timeline";

// S04 (00:56 - 01:06, 600 frames): "ब्रह्मा जी चतुर्मुख चारों का श्रृंगार करके आए, और सुंदर इंद्र भी आए"
export const S04BrahmaIndra: React.FC<{ globalStartFrame: number }> = ({ globalStartFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const gf = globalStartFrame + frame;
  const vo = getSmoothVoEnergy(gf);

  const brahmaIn = spring({ frame, fps, config: { damping: 14, stiffness: 65 } });
  const indraIn = spring({ frame: Math.max(0, frame - 160), fps, config: { damping: 14, stiffness: 65 } });

  const brahmaX = interpolate(brahmaIn, [0, 1], [-220, 580]);
  const indraX = interpolate(indraIn, [0, 1], [2180, 1340]);
  const camX = interpolate(frame, [0, 300, 600], [60, 0, -60]);

  return (
    <ParallaxStage mode="devaloka" cameraX={camX} zoom={1.04}>
      {/* Chaturmukh Brahma on Hamsa & Lotus */}
      <BrahmaRig x={brahmaX} y={485} scale={1.12} speakingEnergy={vo} />

      {/* Devraj Indra on Airavata Elephant */}
      <IndraOnAiravataRig x={indraX} y={535} scale={1.08} />

      {/* Sub-Labels floating beneath each deity */}
      <div
        style={{
          position: "absolute",
          left: brahmaX,
          top: 785,
          transform: "translate(-50%, -50%)",
          padding: "8px 22px",
          borderRadius: 14,
          background: "rgba(36, 12, 46, 0.8)",
          border: "2px solid #fde047",
          color: "#fef08a",
          fontFamily: "'Yatra One', 'Noto Sans Devanagari', serif",
          fontSize: 28,
        }}
      >
        चतुर्मुख ब्रह्मा जी
      </div>
      <div
        style={{
          position: "absolute",
          left: indraX,
          top: 805,
          transform: "translate(-50%, -50%)",
          padding: "8px 22px",
          borderRadius: 14,
          background: "rgba(36, 12, 46, 0.8)",
          border: "2px solid #fde047",
          color: "#fef08a",
          fontFamily: "'Yatra One', 'Noto Sans Devanagari', serif",
          fontSize: 28,
        }}
      >
        देवराज इंद्र • ऐरावत
      </div>
    </ParallaxStage>
  );
};
