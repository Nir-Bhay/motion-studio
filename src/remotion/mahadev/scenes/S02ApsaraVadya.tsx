import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { ParallaxStage } from "../environment/ParallaxStage";
import { ApsaraRig, CelestialMusicianRig, CelestialVimanaRig } from "../characters/ApsaraAndMusicians";
import { getBedEnergy, getSmoothVoEnergy } from "../timeline";

// S02 (00:15 - 00:34, 1140 frames): "अप्सराएं गान करने लगीं, डुमडुमिया, शहनाइयां... देवताओं ने अपने वाहन सजा लिए"
export const S02ApsaraVadya: React.FC<{ globalStartFrame: number }> = ({ globalStartFrame }) => {
  const frame = useCurrentFrame();
  const gf = globalStartFrame + frame;
  const vo = getSmoothVoEnergy(gf);
  const bed = getBedEnergy(gf);

  // Camera glides right as focus moves from dancing Apsaras & Musicians -> Decorated Vahanas
  const camX = interpolate(frame, [0, 520, 1140], [40, 0, -90]);
  const zoom = interpolate(frame, [0, 600, 1140], [1.06, 1.0, 1.08]);

  return (
    <ParallaxStage mode="devaloka" cameraX={camX} cameraY={0} zoom={zoom}>
      {/* Floating Musical Notes & Shagun Sparks synced to audio bed */}
      <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        {["♪", "♫", "♩", "♬", "✦", "❀"].map((sym, i) => {
          const x = 320 + i * 250 + Math.sin(frame * 0.05 + i) * 35;
          const y = 390 - ((frame * 1.4 + i * 75) % 240);
          return (
            <text
              key={i}
              x={x}
              y={y}
              fontSize={36 + bed * 16}
              fill="#fde047"
              opacity={0.45 + bed * 0.45}
              textAnchor="middle"
            >
              {sym}
            </text>
          );
        })}
      </svg>

      {/* Back Vimana Procession */}
      <CelestialVimanaRig x={interpolate(frame, [380, 1140], [-200, 1850])} y={285} scale={0.74} />
      <CelestialVimanaRig x={interpolate(frame, [460, 1140], [2080, 160])} y={255} scale={0.58} flipX />

      {/* Three Dancing Apsaras in Graceful Formation */}
      <ApsaraRig x={560} y={565} scale={0.96} colorScheme="emerald" phase={0.8} energy={bed + vo * 0.4} />
      <ApsaraRig x={960} y={540} scale={1.15} colorScheme="rose" phase={0} energy={bed + vo * 0.5} />
      <ApsaraRig x={1360} y={565} scale={0.96} colorScheme="gold" phase={1.7} energy={bed + vo * 0.4} />

      {/* Three Celestial Musicians: Dumdumiya/Damaru, Shehnai, Manjira */}
      <CelestialMusicianRig x={250} y={670} instrument="damaru" scale={0.98} energy={bed} />
      <CelestialMusicianRig x={1650} y={670} instrument="shehnai" scale={0.98} energy={bed} />
      <CelestialMusicianRig x={1485} y={715} instrument="manjira" scale={0.84} energy={bed} />

      {/* Musical Celebration Banner during 00:30 [संगीत] bridge (last 2.5s) */}
      {frame > 960 && (
        <div
          style={{
            position: "absolute",
            top: 150,
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: interpolate(frame, [960, 1005, 1110, 1140], [0, 1, 1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            style={{
              fontFamily: "'Yatra One', 'Noto Sans Devanagari', serif",
              fontSize: 58,
              color: "#fffbeb",
              textShadow: "0 4px 22px rgba(251, 191, 36, 0.85)",
            }}
          >
            चलो महादेव की बारात में!
          </div>
        </div>
      )}
    </ParallaxStage>
  );
};
