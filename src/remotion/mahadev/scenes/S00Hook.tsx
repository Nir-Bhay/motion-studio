import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ParallaxStage } from "../environment/ParallaxStage";
import { VishnuRig } from "../characters/VishnuRig";
import { BrahmaRig, IndraOnAiravataRig } from "../characters/BrahmaIndraRigs";
import { DetailedSpiritRig } from "../characters/DetailedGanasAndSpirits";
import { ShivGanaRig } from "../characters/ShivGanaRig";
import { MahadevBaratGroomRig } from "../part3/MahadevBaratGroomRig";
import { NandiBullRig } from "../part4/BhootPretAndNandiRigs";
import { getSmoothVoEnergy } from "../timeline";

// S00 (00:00 - 00:06, 360 frames): High-Retention 5.5s YouTube Cold-Open Hook!
// "भगवान विष्णु, ब्रह्मा जी, और ये भूत-प्रेत सब! आखिर ये क्यों आए हैं? आज किसकी शादी है!"
export const S00Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const vo = getSmoothVoEnergy(frame);

  // Beat windows matched to measured p00-hook.wav (placed at 0.25s = f15):
  // 0..85f   : Bhagwan Vishnu
  // 85..138f : Brahma Ji (+ Indra)
  // 138..212f: Bhoot-Pret Sab!
  // 212..286f: Aakhir Ye Kyon Aaye Hain? (3-way mystery montage)
  // 286..360f: Aaj Kiski Shaadi Hai! (Mahadev on Nandi Dramatic Reveal!)
  const beat =
    frame < 85 ? 1 : frame < 138 ? 2 : frame < 212 ? 3 : frame < 286 ? 4 : 5;

  const localStart = beat === 1 ? 0 : beat === 2 ? 85 : beat === 3 ? 138 : beat === 4 ? 212 : 286;
  const lf = frame - localStart;
  const pop = spring({ frame: lf, fps, config: { damping: 11, stiffness: 160 } });
  const impactZoom = interpolate(pop, [0, 1], [1.18, 1.04]);

  return (
    <AbsoluteFill>
      {/* BEAT 1 (0 - 1.42s): "भगवान विष्णु," */}
      {beat === 1 && (
        <ParallaxStage mode="vishnu" cameraX={interpolate(lf, [0, 85], [-30, 30])} zoom={impactZoom}>
          <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
            <g transform={`translate(960, 440) rotate(${frame * 0.6})`} opacity={0.28}>
              {Array.from({ length: 16 }).map((_, i) => (
                <polygon key={i} points="0,0 -44,-640 44,-640" fill="#fef08a" transform={`rotate(${i * 22.5})`} />
              ))}
            </g>
          </svg>
          <VishnuRig
            x={960}
            y={475}
            scale={1.34}
            withGaruda
            highlightItem="all"
            speakingEnergy={vo}
            gestureMode="serene"
          />
          <div
            style={{
              position: "absolute",
              top: 105,
              left: 0,
              right: 0,
              textAlign: "center",
              transform: `scale(${0.86 + 0.14 * pop})`,
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "10px 38px",
                borderRadius: 999,
                background: "rgba(30, 27, 75, 0.88)",
                border: "2.5px solid #fde047",
                fontFamily: "'Yatra One', 'Noto Sans Devanagari', serif",
                fontSize: 54,
                color: "#fde047",
                boxShadow: "0 12px 35px rgba(0,0,0,0.5)",
              }}
            >
              भगवान श्री विष्णु
            </span>
          </div>
        </ParallaxStage>
      )}

      {/* BEAT 2 (1.42s - 2.30s): "ब्रह्मा जी," */}
      {beat === 2 && (
        <ParallaxStage mode="devaloka" cameraX={interpolate(lf, [0, 53], [40, -40])} zoom={impactZoom}>
          <BrahmaRig x={620} y={505} scale={1.18} speakingEnergy={vo} />
          <IndraOnAiravataRig x={1320} y={545} scale={1.1} />
          <div
            style={{
              position: "absolute",
              top: 105,
              left: 0,
              right: 0,
              textAlign: "center",
              transform: `scale(${0.86 + 0.14 * pop})`,
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "10px 38px",
                borderRadius: 999,
                background: "rgba(42, 17, 59, 0.88)",
                border: "2.5px solid #fde047",
                fontFamily: "'Yatra One', 'Noto Sans Devanagari', serif",
                fontSize: 54,
                color: "#fde047",
                boxShadow: "0 12px 35px rgba(0,0,0,0.5)",
              }}
            >
              चतुर्मुख ब्रह्मा जी एवं देवगण
            </span>
          </div>
        </ParallaxStage>
      )}

      {/* BEAT 3 (2.30s - 3.53s): "और ये भूत-प्रेत सब!" */}
      {beat === 3 && (
        <ParallaxStage mode="shamshan" cameraX={interpolate(lf, [0, 74], [-35, 35])} zoom={impactZoom}>
          {/* Damaru Shockwave Ring */}
          <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
            <circle
              cx={960}
              cy={540}
              r={interpolate(lf, [0, 50], [80, 920], { extrapolateRight: "clamp" })}
              fill="none"
              stroke="#fb923c"
              strokeWidth={8}
              opacity={interpolate(lf, [0, 50], [0.85, 0], { extrapolateRight: "clamp" })}
            />
          </svg>
          <DetailedSpiritRig x={240} y={670} kind="asura_senapati" scale={1.06} phase={0} />
          <DetailedSpiritRig x={540} y={655} kind="bhoot_maya" scale={1.08} phase={0.7} />
          <ShivGanaRig x={820} y={690} variant="shringi" scale={1.14} phase={0.3} />
          <DetailedSpiritRig x={1095} y={675} kind="pret_kankal" scale={1.08} phase={1.2} />
          <DetailedSpiritRig x={1380} y={685} kind="shrigal_mukha" scale={1.05} phase={1.9} flipX />
          <DetailedSpiritRig x={1660} y={665} kind="dakini" scale={1.05} phase={2.4} flipX />

          <div
            style={{
              position: "absolute",
              top: 105,
              left: 0,
              right: 0,
              textAlign: "center",
              transform: `scale(${0.86 + 0.14 * pop})`,
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "10px 38px",
                borderRadius: 999,
                background: "rgba(15, 23, 42, 0.9)",
                border: "2.5px solid #fb923c",
                fontFamily: "'Yatra One', 'Noto Sans Devanagari', serif",
                fontSize: 54,
                color: "#fed7aa",
                boxShadow: "0 12px 35px rgba(0,0,0,0.65)",
              }}
            >
              और संग में भूत • प्रेत • असुर सब!
            </span>
          </div>
        </ParallaxStage>
      )}

      {/* BEAT 4 (3.53s - 4.77s): "आखिर ये क्यों आए हैं?" — 3-Panel Mystery Split! */}
      {beat === 4 && (
        <AbsoluteFill style={{ backgroundColor: "#0b1120" }}>
          <div style={{ display: "flex", width: "100%", height: "100%", gap: 8, background: "#fde047" }}>
            <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
              <ParallaxStage mode="vishnu" zoom={1.12}>
                <VishnuRig x={320} y={530} scale={1.05} withGaruda gestureMode="serene" />
              </ParallaxStage>
            </div>
            <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
              <ParallaxStage mode="devaloka" zoom={1.12}>
                <BrahmaRig x={320} y={540} scale={1.0} />
              </ParallaxStage>
            </div>
            <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
              <ParallaxStage mode="shamshan" zoom={1.12}>
                <DetailedSpiritRig x={210} y={640} kind="bhoot_maya" scale={0.95} phase={0.4} />
                <DetailedSpiritRig x={430} y={655} kind="pret_kankal" scale={0.95} phase={1.3} flipX />
              </ParallaxStage>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              top: 120,
              left: 0,
              right: 0,
              textAlign: "center",
              transform: `scale(${0.86 + 0.14 * pop})`,
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "14px 44px",
                borderRadius: 24,
                background: "rgba(15, 23, 42, 0.92)",
                border: "3px solid #fde047",
                fontFamily: "'Yatra One', 'Noto Sans Devanagari', serif",
                fontSize: 58,
                color: "#fde047",
                boxShadow: "0 16px 45px rgba(0,0,0,0.75)",
              }}
            >
              आखिर ये सब क्यों आए हैं?!
            </span>
          </div>
        </AbsoluteFill>
      )}

      {/* BEAT 5 (4.77s - 6.00s): "आज किसकी शादी है!" — Hero Mahadev Reveal */}
      {beat === 5 && (
        <ParallaxStage mode="shamshan" cameraX={0} zoom={interpolate(lf, [0, 74], [1.05, 1.2])}>
          <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
            <circle cx={960} cy={470} r={280} fill="#38bdf8" opacity={0.18 + vo * 0.1} />
            <circle cx={960} cy={470} r={175} fill="#bae6fd" opacity={0.2} />
          </svg>
          <NandiBullRig x={990} y={675} scale={0.98} walking />
          <MahadevBaratGroomRig
            x={952}
            y={518}
            scale={0.98}
            sehraProgress={1}
            bichhuProgress={1}
            panchmukhiProgress={1}
            bhasmaGlowProgress={1}
            pose="heroic"
            seatedOnNandi
          />

          <div
            style={{
              position: "absolute",
              top: 95,
              left: 0,
              right: 0,
              textAlign: "center",
              transform: `scale(${0.86 + 0.14 * pop})`,
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "14px 46px",
                borderRadius: 24,
                background: "rgba(30, 14, 58, 0.92)",
                border: "3px solid #fde047",
                fontFamily: "'Yatra One', 'Noto Sans Devanagari', serif",
                fontSize: 64,
                color: "#fffbeb",
                textShadow: "0 4px 20px rgba(251, 191, 36, 0.85)",
                boxShadow: "0 16px 45px rgba(0,0,0,0.75)",
              }}
            >
              आज किसकी शादी है?!
            </span>
          </div>
        </ParallaxStage>
      )}
    </AbsoluteFill>
  );
};
