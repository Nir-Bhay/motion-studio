import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ParallaxStage } from "../environment/ParallaxStage";
import { BrahmaRig, IndraOnAiravataRig } from "../characters/BrahmaIndraRigs";
import { MahadevRig } from "../characters/MahadevRig";
import { getSmoothVoEnergy } from "../timeline";

// S05 (01:06 - 01:20.5, 870 frames): "लेकिन तभी सब ने पूछा बोले कि दूल्हा राजा कहां है?... अभी भी श्मशान में ही बैठे हैं! बाघंबर लपेटे, हाथ की तकिया लगाए!"
export const S05ShamshanReveal: React.FC<{ globalStartFrame: number }> = ({ globalStartFrame }) => {
  const frame = useCurrentFrame();
  const gf = globalStartFrame + frame;
  const vo = getSmoothVoEnergy(gf);

  // Part A (0 - 270f): Devaloka confusion ("दूल्हा राजा कहां हैं?")
  // Part B (270 - 870f): Cross-dissolve & downward camera reveal into moonlit Shamshan!
  const toShamshan = interpolate(frame, [245, 310], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const qBounce = Math.sin(frame * 0.16) * 12;
  const camZoom = interpolate(frame, [280, 870], [0.95, 1.12], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      {/* Part A: Devaloka Searching Layer */}
      {toShamshan < 1 && (
        <AbsoluteFill style={{ opacity: 1 - toShamshan }}>
          <ParallaxStage mode="devaloka" cameraX={Math.sin(frame * 0.04) * 35} zoom={1.03}>
            <BrahmaRig x={560} y={530} scale={0.95} speakingEnergy={vo} />
            <IndraOnAiravataRig x={1360} y={555} scale={0.92} />

            {/* Floating Question Marks ("दूल्हा राजा कहां हैं?") */}
            {[
              { x: 560, y: 210, size: 78, delay: 0 },
              { x: 960, y: 245, size: 112, delay: 0.7 },
              { x: 1360, y: 215, size: 78, delay: 1.4 },
            ].map((q, idx) => (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  left: q.x,
                  top: q.y + Math.sin(frame * 0.16 + q.delay) * 12,
                  transform: "translate(-50%, -50%)",
                  fontFamily: "'Yatra One', sans-serif",
                  fontSize: q.size,
                  color: "#fde047",
                  textShadow: "0 6px 24px rgba(0,0,0,0.65)",
                }}
              >
                ?
              </div>
            ))}

            <div
              style={{
                position: "absolute",
                top: 135,
                left: 0,
                right: 0,
                textAlign: "center",
                fontFamily: "'Yatra One', 'Noto Sans Devanagari', serif",
                fontSize: 48,
                color: "#fffbeb",
                transform: `translateY(${qBounce * 0.3}px)`,
                textShadow: "0 4px 18px rgba(0,0,0,0.6)",
              }}
            >
              “दूल्हा राजा कहाँ हैं?”
            </div>
          </ParallaxStage>
        </AbsoluteFill>
      )}

      {/* Part B: Moonlit Shamshan Reveal */}
      {toShamshan > 0 && (
        <AbsoluteFill style={{ opacity: toShamshan }}>
          <ParallaxStage
            mode="shamshan"
            cameraX={interpolate(frame, [280, 870], [45, -25], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            cameraY={interpolate(frame, [280, 440], [-70, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            zoom={camZoom}
          >
            {/* Smoldering Pyre Flames on Far Left & Right */}
            <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
              {[320, 1590].map((fx, idx) => {
                const fl = 1 + Math.sin(frame * 0.28 + idx * 2) * 0.16;
                return (
                  <g key={idx} transform={`translate(${fx}, 810)`}>
                    <line x1={-45} y1={14} x2={45} y2={6} stroke="#3b2618" strokeWidth={12} strokeLinecap="round" />
                    <line x1={-36} y1={4} x2={38} y2={18} stroke="#291a10" strokeWidth={10} strokeLinecap="round" />
                    <path
                      d={`M -28,6 Q -18,${-42 * fl} 0,${-68 * fl} Q 18,${-42 * fl} 28,6 Z`}
                      fill="#f97316"
                      opacity={0.78}
                    />
                    <path
                      d={`M -14,6 Q -8,${-26 * fl} 0,${-44 * fl} Q 8,${-26 * fl} 14,6 Z`}
                      fill="#fde047"
                      opacity={0.88}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Mahadev Lounging Effortlessly wrapped in Baghambar ("हाथ की तकिया लगाए") */}
            <MahadevRig x={960} y={625} scale={1.18} pose="lounging" speakingEnergy={vo * 0.3} />
          </ParallaxStage>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
