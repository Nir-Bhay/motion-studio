import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ParallaxStage } from "../environment/ParallaxStage";
import { MahadevRig } from "../characters/MahadevRig";
import { VishnuRig } from "../characters/VishnuRig";
import { ShivGanaRig } from "../characters/ShivGanaRig";
import { getBedEnergy, getSmoothVoEnergy } from "../timeline";

// S07 (01:38 - 02:00, 1320 frames): "इतने में शिव गण आ गए सारे... आज अपने तरीके का श्रृंगार हम करेंगे! महादेव बोले — जाको रुचि लग रही हो वही कर लो!"
export const S07ShivGana: React.FC<{ globalStartFrame: number }> = ({ globalStartFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const gf = globalStartFrame + frame;
  const vo = getSmoothVoEnergy(gf);
  const bed = getBedEnergy(gf);

  // Energetic burst-in of Shiv Ganas at frame 0-90!
  const burst = spring({ frame, fps, config: { damping: 11, stiffness: 115 } });
  const shoo = spring({ frame: Math.max(0, frame - 460), fps, config: { damping: 14, stiffness: 80 } });

  // Vishnu steps back cleanly to x=1650 while Ganas occupy center stage cleanly with zero overlap!
  const vishnuX = interpolate(shoo, [0, 1], [1510, 1665]);
  const vishnuScale = interpolate(shoo, [0, 1], [1.02, 0.94]);

  // Mahadev sits upright & raises blessing hand around frame 940 ("बोले भैया जाको रुचि लग रही हो वही कर लो!")
  const shivaSits = frame >= 940;
  const camZoom = interpolate(frame, [0, 120, 940, 1320], [1.05, 0.98, 1.02, 1.09]);

  return (
    <ParallaxStage mode="shamshan" cameraX={Math.sin(frame * 0.04) * 14} zoom={camZoom}>
      {/* Energetic Radial Damaru Shockwaves when Ganas burst in */}
      {frame < 240 && (
        <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
          <circle
            cx={820}
            cy={560}
            r={interpolate(frame, [0, 90], [60, 880], { extrapolateRight: "clamp" })}
            fill="none"
            stroke="#fbbf24"
            strokeWidth={6}
            opacity={interpolate(frame, [0, 90], [0.7, 0], { extrapolateRight: "clamp" })}
          />
        </svg>
      )}

      {/* Center Hero: Mahadev (Lounging -> Sitting Smiling & Blessing!) */}
      <MahadevRig
        x={810}
        y={shivaSits ? 595 : 645}
        scale={1.12}
        pose={shivaSits ? "sitting" : "lounging"}
        speakingEnergy={shivaSits ? vo : 0}
      />

      {/* Vishnu Ji Stepping Back Playfully */}
      <VishnuRig
        x={vishnuX}
        y={525}
        scale={vishnuScale}
        flipX
        gestureMode="chuckling"
      />

      {/* Troop of 6 Expressive Animated Shiv Ganas cleanly spaced with ZERO overlap over Vishnu! */}
      <ShivGanaRig
        x={interpolate(burst, [0, 1], [-140, 290])}
        y={695}
        variant="shringi"
        scale={1.15}
        phase={0}
      />
      <ShivGanaRig
        x={interpolate(burst, [0, 1], [-220, 465])}
        y={735}
        variant="bhringi"
        scale={1.06}
        phase={1.1}
      />
      <ShivGanaRig
        x={interpolate(burst, [0, 1], [2100, 1140])}
        y={715}
        variant="chubby"
        scale={1.1}
        phase={2.2}
        flipX
      />
      <ShivGanaRig
        x={interpolate(burst, [0, 1], [2200, 1290])}
        y={675}
        variant="tall"
        scale={1.0}
        phase={0.5}
        flipX
      />
      <ShivGanaRig
        x={interpolate(burst, [0, 1], [-260, 150])}
        y={765}
        variant="drummer"
        scale={0.96 + bed * 0.05}
        phase={3.1}
      />
      <ShivGanaRig
        x={interpolate(burst, [0, 1], [2240, 1430])}
        y={775}
        variant="drummer"
        scale={0.94 + bed * 0.05}
        phase={1.8}
        flipX
      />

      {/* Closing Hook Crest in Final 3.5 Seconds */}
      {frame > 1110 && (
        <div
          style={{
            position: "absolute",
            top: 120,
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: interpolate(frame, [1110, 1155], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "16px 40px",
              borderRadius: 20,
              background: "linear-gradient(135deg, rgba(28, 16, 48, 0.9), rgba(88, 28, 135, 0.85))",
              border: "2px solid #fde047",
              boxShadow: "0 16px 45px rgba(0,0,0,0.55)",
            }}
          >
            <div
              style={{
                fontFamily: "'Yatra One', 'Noto Sans Devanagari', serif",
                fontSize: 44,
                color: "#fde047",
              }}
            >
              हर हर महादेव! • भाग १ समाप्त
            </div>
            <div
              style={{
                fontFamily: "'Noto Sans Devanagari', sans-serif",
                fontSize: 22,
                color: "#fed7aa",
                marginTop: 4,
              }}
            >
              आगे देखिए: सर्पों का सेहरा, भस्म श्रृंगार और भव्य शिव बारात!
            </div>
          </div>
        </div>
      )}
    </ParallaxStage>
  );
};
