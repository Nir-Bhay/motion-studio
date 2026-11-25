import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { ParallaxStage } from "../environment/ParallaxStage";
import { BrahmaRig, IndraOnAiravataRig } from "../characters/BrahmaIndraRigs";
import { MahadevRig } from "../characters/MahadevRig";
import { fireTurbulence } from "../motion/physics";
import { getSmoothVoEnergy } from "../timeline";

// S05 (01:06 - 01:20.5, 870 frames): "लेकिन तभी सब ने पूछा बोले कि दूल्हा राजा कहां है?... अभी भी श्मशान में ही बैठे हैं! बाघंबर लपेटे, हाथ की तकिया लगाए!"
export const S05ShamshanReveal: React.FC<{ globalStartFrame: number }> = ({ globalStartFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const gf = globalStartFrame + frame;
  const vo = getSmoothVoEnergy(gf);

  // Part A (0 - 250f): Devaloka confusion ("दूल्हा राजा कहां हैं?")
  // Part B (250 - 870f): Crisp cross-dissolve & downward camera reveal into moonlit Shamshan!
  const toShamshan = interpolate(frame, [240, 275], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const qBounce = Math.sin(t * 7.5) * 12;
  const camZoom = interpolate(frame, [265, 870], [0.97, 1.12], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

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
            {/* Smoldering Pyre Flames with Physics Turbulence */}
            <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
              {[320, 1590].map((fx, idx) => {
                const ft = fireTurbulence(t, idx + 1);
                return (
                  <g key={idx} transform={`translate(${fx}, 810)`}>
                    <line x1={-48} y1={14} x2={48} y2={6} stroke="#3b2618" strokeWidth={13} strokeLinecap="round" />
                    <line x1={-38} y1={4} x2={40} y2={18} stroke="#291a10" strokeWidth={11} strokeLinecap="round" />
                    <path
                      d={`M ${-30 * ft.scaleX},6 Q ${-18 + ft.leanX * 0.4},${-46 * ft.scaleY} ${ft.leanX},${-74 * ft.scaleY} Q ${18 + ft.leanX * 0.4},${-46 * ft.scaleY} ${30 * ft.scaleX},6 Z`}
                      fill="#f97316"
                      opacity={0.85}
                    />
                    <path
                      d={`M ${-15 * ft.scaleX},6 Q ${-8 + ft.leanX * 0.3},${-28 * ft.scaleY} ${ft.leanX * 0.7},${-48 * ft.scaleY} Q ${8 + ft.leanX * 0.3},${-28 * ft.scaleY} ${15 * ft.scaleX},6 Z`}
                      fill="#fde047"
                      opacity={0.94}
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
