import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ParallaxStage } from "../environment/ParallaxStage";
import {
  ApsaraRig,
  CelestialMusicianRig,
  CelestialVimanaRig,
  DevaHelperRig,
} from "../characters/ApsaraAndMusicians";
import { BackgroundCrowdBand } from "../characters/DetailedGanasAndSpirits";
import { getBedEnergy, getSmoothVoEnergy } from "../timeline";

// S02 (00:15 - 00:34, 1140 frames) — 3 Dynamic Music & Departure Shots synced to VO!
// Shot 2A (0–280f, 15.0–19.7s): "अप्सराएं गान करने लगीं, डुमडुमिया बजने लगीं" -> Tracking Close-Medium on Dumdumiya/Dholak + Dancing Apsaras
// Shot 2B (280–560f, 19.7–24.3s): "शहनाइयां बजने लगीं, मंगल वाद्य बजने लगे।" -> Crisp Cut to Shehnai/Shankh/Manjira Ensemble + Golden Sound Waves
// Shot 2C (560–1140f, 24.3–34.0s): "देवताओं ने अपने वाहन सजा लिए... आज महादेव की बारात जाएगी!" -> Grand Sky-Bridge Barat Departure Fleet!
export const S02ApsaraVadya: React.FC<{ globalStartFrame: number }> = ({ globalStartFrame }) => {
  const frame = useCurrentFrame();
  const gf = globalStartFrame + frame;
  const vo = getSmoothVoEnergy(gf);
  const bed = getBedEnergy(gf);

  // Shot 2A (0..280): Track Left-to-Right across Damaru & Apsaras
  const s2aX = interpolate(frame, [0, 280], [-75, 45], { extrapolateRight: "clamp" });
  const s2aZoom = interpolate(frame, [0, 280], [1.08, 1.18], { extrapolateRight: "clamp" });

  // Shot 2B (280..560): Close-In on Shehnai & Mangala Vadya Ensemble
  const s2bLocal = Math.max(0, frame - 280);
  const s2bX = interpolate(s2bLocal, [0, 280], [65, -55], { extrapolateRight: "clamp" });
  const s2bZoom = interpolate(s2bLocal, [0, 280], [1.14, 1.24], { extrapolateRight: "clamp" });

  // Shot 2C (560..1140): Wide Procession Departure Pull-Back & Fleet Sweep
  const s2cLocal = Math.max(0, frame - 560);
  const s2cX = interpolate(s2cLocal, [0, 580], [95, -95], { extrapolateRight: "clamp" });
  const s2cZoom = interpolate(s2cLocal, [0, 580], [1.12, 0.96], { extrapolateRight: "clamp" });

  const cutAtoB = interpolate(frame, [270, 285], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cutBtoC = interpolate(frame, [550, 568], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const renderMusicNotes = () => (
    <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {["♪", "♫", "♩", "♬", "✦", "❀"].map((sym, i) => {
        const x = 280 + i * 270 + Math.sin(frame * 0.05 + i) * 35;
        const y = 390 - ((frame * 1.6 + i * 75) % 250);
        return (
          <text
            key={i}
            x={x}
            y={y}
            fontSize={38 + bed * 18}
            fill="#fde047"
            opacity={0.48 + bed * 0.45}
            textAnchor="middle"
          >
            {sym}
          </text>
        );
      })}
    </svg>
  );

  return (
    <AbsoluteFill>
      {/* SHOT 2A: Dumdumiya / Damaru Rhythm & Dancing Apsaras */}
      {cutAtoB < 1 && (
        <AbsoluteFill style={{ opacity: 1 - cutAtoB }}>
          <ParallaxStage mode="devaloka" cameraX={s2aX} cameraY={8} zoom={s2aZoom}>
            {renderMusicNotes()}
            <BackgroundCrowdBand mode="devaloka" y={685} />
            <CelestialMusicianRig x={360} y={715} instrument="damaru" scale={1.12} energy={bed + vo * 0.3} />
            <ApsaraRig x={740} y={665} scale={1.12} colorScheme="rose" phase={0} energy={bed + vo * 0.5} />
            <ApsaraRig x={1120} y={670} scale={1.06} colorScheme="emerald" phase={1.2} energy={bed + vo * 0.4} />
            <CelestialMusicianRig x={1520} y={715} instrument="dholak" scale={1.1} energy={bed + vo * 0.3} flipX />
          </ParallaxStage>
        </AbsoluteFill>
      )}

      {/* SHOT 2B: Mangala Shehnai, Shankh & Manjira Ensemble */}
      {cutAtoB > 0 && cutBtoC < 1 && (
        <AbsoluteFill style={{ opacity: Math.min(cutAtoB, 1 - cutBtoC) }}>
          <ParallaxStage mode="devaloka" cameraX={s2bX} cameraY={-6} zoom={s2bZoom}>
            {renderMusicNotes()}
            <BackgroundCrowdBand mode="devaloka" y={685} />
            <CelestialMusicianRig x={430} y={705} instrument="shehnai" scale={1.14} energy={bed + vo * 0.4} />
            <CelestialMusicianRig x={780} y={715} instrument="manjira" scale={1.05} energy={bed + vo * 0.4} />
            <ApsaraRig x={1090} y={665} scale={1.12} colorScheme="gold" phase={0.5} energy={bed + vo * 0.5} />
            <CelestialMusicianRig x={1470} y={705} instrument="shankh" scale={1.12} energy={bed + vo * 0.4} flipX />
          </ParallaxStage>
        </AbsoluteFill>
      )}

      {/* SHOT 2C: Grand Vahana Fleet & Devas Launching Mahadev's Barat! */}
      {cutBtoC > 0 && (
        <AbsoluteFill style={{ opacity: cutBtoC }}>
          <ParallaxStage mode="devaloka" cameraX={s2cX} cameraY={-10} zoom={s2cZoom}>
            {renderMusicNotes()}
            <BackgroundCrowdBand mode="devaloka" y={685} />

            {/* Three Ornate Sky Vimanas Surging Cleanly Across Upper Sky */}
            <CelestialVimanaRig x={interpolate(s2cLocal, [0, 580], [-220, 1780])} y={255} scale={0.86} />
            <CelestialVimanaRig x={interpolate(s2cLocal, [0, 580], [180, 1980])} y={345} scale={0.96} />
            <CelestialVimanaRig x={interpolate(s2cLocal, [0, 580], [2020, 260])} y={210} scale={0.62} flipX />

            {/* Excited Foreground Devas & Musicians Departing Together */}
            <DevaHelperRig x={240} y={725} scale={0.98} pose="banner" dhotiColor="#ea580c" phase={0} />
            <DevaHelperRig x={510} y={730} scale={0.96} pose="cheer" dhotiColor="#ec4899" phase={0.8} />
            <ApsaraRig x={960} y={675} scale={1.08} colorScheme="rose" phase={0.3} energy={bed + vo * 0.4} />
            <CelestialMusicianRig x={1380} y={725} instrument="shehnai" scale={0.98} energy={bed} flipX />
            <DevaHelperRig x={1660} y={725} scale={0.98} pose="cheer" dhotiColor="#0284c7" phase={1.7} flipX />

            {/* Musical Celebration Banner during 00:30 [संगीत] bridge */}
            {frame > 920 && (
              <div
                style={{
                  position: "absolute",
                  top: 150,
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  opacity: interpolate(frame, [920, 975, 1105, 1140], [0, 1, 1, 0], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    padding: "12px 36px",
                    borderRadius: 999,
                    background: "rgba(38, 12, 42, 0.85)",
                    border: "2px solid #fde047",
                    fontFamily: "'Yatra One', 'Noto Sans Devanagari', serif",
                    fontSize: 56,
                    color: "#fffbeb",
                    textShadow: "0 4px 22px rgba(251, 191, 36, 0.85)",
                  }}
                >
                  चलो महादेव की बारात में!
                </div>
              </div>
            )}
          </ParallaxStage>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
