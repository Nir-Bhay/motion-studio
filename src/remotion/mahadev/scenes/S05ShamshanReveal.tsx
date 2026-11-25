import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { ParallaxStage } from "../environment/ParallaxStage";
import { BrahmaRig, IndraOnAiravataRig } from "../characters/BrahmaIndraRigs";
import { MahadevRig } from "../characters/MahadevRig";
import { ShivGanaRig } from "../characters/ShivGanaRig";
import { BackgroundCrowdBand, DetailedSpiritRig } from "../characters/DetailedGanasAndSpirits";
import { NandiBullRig } from "../part4/BhootPretAndNandiRigs";
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
  const camZoom = interpolate(frame, [265, 870], [0.98, 1.1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill>
      {/* Part A: Devaloka Searching Layer */}
      {toShamshan < 1 && (
        <AbsoluteFill style={{ opacity: 1 - toShamshan }}>
          <ParallaxStage mode="devaloka" cameraX={Math.sin(frame * 0.04) * 35} zoom={1.03}>
            <BackgroundCrowdBand mode="devaloka" y={695} />
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

      {/* Part B: Rich Moonlit Kailash-Shamshan Reveal with Nandi, Ganas, Spirits & Dhuni Pyres */}
      {toShamshan > 0 && (
        <AbsoluteFill style={{ opacity: toShamshan }}>
          <ParallaxStage
            mode="shamshan"
            cameraX={interpolate(frame, [280, 870], [45, -25], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            cameraY={interpolate(frame, [280, 440], [-70, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            zoom={camZoom}
          >
            {/* Background Gana & Spirit Watchers near the Shamshan Horizon */}
            <BackgroundCrowdBand mode="shamshan" y={695} />

            {/* Nandi Bull Waiting Calmly beside Mahadev */}
            <NandiBullRig x={515} y={685} scale={0.78} walking={false} />

            {/* Ganas & Bhoots Tending the Dhuni & Watching in Amusement */}
            <ShivGanaRig x={365} y={715} variant="shringi" scale={0.94} phase={0.4} />
            <ShivGanaRig x={1515} y={715} variant="bhringi" scale={0.92} phase={1.3} flipX />
            <DetailedSpiritRig x={1695} y={705} kind="bhoot_maya" scale={0.82} phase={0.9} flipX />

            {/* Foreground Smoldering Skull-Ringed Pyre Flames with Rising Ash & Smoke */}
            <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
              {[285, 1615].map((fx, idx) => {
                const ft = fireTurbulence(t, idx + 1);
                return (
                  <g key={idx} transform={`translate(${fx}, 830)`}>
                    <ellipse cx={0} cy={18} rx={72} ry={18} fill="#1e293b" opacity={0.85} />
                    <line x1={-52} y1={14} x2={52} y2={6} stroke="#3b2618" strokeWidth={13} strokeLinecap="round" />
                    <line x1={-40} y1={4} x2={42} y2={18} stroke="#291a10" strokeWidth={11} strokeLinecap="round" />
                    <path
                      d={`M ${-32 * ft.scaleX},6 Q ${-20 + ft.leanX * 0.4},${-52 * ft.scaleY} ${ft.leanX},${-82 * ft.scaleY} Q ${20 + ft.leanX * 0.4},${-52 * ft.scaleY} ${32 * ft.scaleX},6 Z`}
                      fill="#f97316"
                      opacity={0.88}
                    />
                    <path
                      d={`M ${-16 * ft.scaleX},6 Q ${-9 + ft.leanX * 0.3},${-32 * ft.scaleY} ${ft.leanX * 0.7},${-54 * ft.scaleY} Q ${9 + ft.leanX * 0.3},${-32 * ft.scaleY} ${16 * ft.scaleX},6 Z`}
                      fill="#fde047"
                      opacity={0.95}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Mahadev Lounging Effortlessly wrapped in Baghambar ("हाथ की तकिया लगाए") */}
            <MahadevRig x={985} y={635} scale={1.16} pose="lounging" speakingEnergy={vo * 0.3} />
          </ParallaxStage>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
