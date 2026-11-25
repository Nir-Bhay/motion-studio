import React from "react";
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import "@fontsource/noto-sans-devanagari/400.css";
import "@fontsource/noto-sans-devanagari/700.css";
import "@fontsource/yatra-one/400.css";
import { SceneTitleBanner } from "../ui/DevanagariCaptions";
import { ParallaxStage } from "../environment/ParallaxStage";
import { VishnuRig } from "../characters/VishnuRig";
import { DetailedSpiritRig } from "../characters/DetailedGanasAndSpirits";
import { MainaDeviRig, SakhiBandRig } from "../part6/HimalayaNagariRigs";
import { HimalayaPalaceBackdrop } from "../part7/HimalayaPalaceBackdrop";
import { WorriedParentRig } from "../part8/HimachalVillageRigs";
import { MahadevFaintOrCalm } from "./MahadevBaratPart09Helper";
import { MainaFaintRig, MahadevReverseNandiRig, SharbatStationRig } from "./SharbatAndMurchhaRigs";
import { getSmoothVoP9, P9_FPS, P9_SCENES, SUBTITLES_P9 } from "./timelineP9";

const Part9Captions: React.FC<{ globalFrame: number }> = ({ globalFrame }) => {
  const sec = globalFrame / P9_FPS;
  const active = SUBTITLES_P9.find((s) => sec >= s.startSec && sec <= s.endSec);
  const vo = getSmoothVoP9(globalFrame);
  if (!active) return null;

  const fadeIn = interpolate(sec, [active.startSec, active.startSec + 0.2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeOut = interpolate(sec, [active.endSec - 0.2, active.endSec], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 38, display: "flex", justifyContent: "center", opacity: Math.min(fadeIn, fadeOut), pointerEvents: "none" }}>
      <div
        style={{
          maxWidth: 1460,
          padding: "16px 36px 18px",
          borderRadius: 22,
          background: "linear-gradient(135deg, rgba(42, 14, 48, 0.92), rgba(90, 20, 48, 0.88))",
          border: `2px solid rgba(253, 224, 71, ${0.42 + vo * 0.45})`,
          boxShadow: "0 16px 40px rgba(0,0,0,0.48)",
          textAlign: "center",
        }}
      >
        {active.speaker && (
          <div style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontSize: 18, fontWeight: 700, color: "#fbbf24", marginBottom: 4 }}>
            ● {active.speaker}
          </div>
        )}
        <div style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontSize: 33, fontWeight: 700, lineHeight: 1.38, color: "#fffbeb" }}>
          {active.text}
        </div>
      </div>
    </div>
  );
};

const CameraRig: React.FC<{ zoom?: number; panX?: number; panY?: number; children: React.ReactNode }> = ({
  zoom = 1,
  panX = 0,
  panY = 0,
  children,
}) => {
  const maxPan = Math.max(0, (zoom - 1) * 960);
  const clampedPanX = Math.max(-maxPan, Math.min(maxPan, panX));
  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#14071e" }}>
      <div style={{ position: "absolute", inset: 0, transform: `translate(${clampedPanX}px, ${panY}px) scale(${zoom})`, transformOrigin: "center center" }}>
        {children}
      </div>
    </AbsoluteFill>
  );
};

// P9-S01 (0 - 735f): Deserted Himalaya Nagari -> Citizen with Sharbat -> Baratis Bathe in Sharbat!
const P9S01SharbatBath: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const vo = getSmoothVoP9(gf);
  const splashProgress = interpolate(frame, [380, 560], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const baratiX = interpolate(frame, [260, 440], [1780, 1140], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <CameraRig zoom={interpolate(frame, [0, 735], [1.02, 1.09])} panX={interpolate(frame, [250, 520], [18, -32], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>
      <HimalayaPalaceBackdrop variant="palace_gate" />
      <SharbatStationRig x={680} y={640} scale={1.08} splashProgress={splashProgress} />
      <WorriedParentRig x={430} y={640} scale={1.02} role="father" speakingEnergy={vo} />

      {frame >= 240 && (
        <>
          <DetailedSpiritRig x={baratiX} y={655} kind="sukar_mukha" scale={0.94} flipX />
          <DetailedSpiritRig x={baratiX + 210} y={665} kind="kukar_mukha" scale={0.92} phase={1.1} flipX />
          <DetailedSpiritRig x={baratiX + 410} y={660} kind="pret_kankal" scale={0.90} phase={2.1} flipX />
        </>
      )}

      {frame >= 440 && (
        <div style={{ position: "absolute", top: 215, left: 760, padding: "12px 26px", borderRadius: 20, background: "#fffbeb", border: "3px solid #be123c", fontFamily: "'Noto Sans Devanagari', sans-serif", fontSize: 30, fontWeight: 700, color: "#9f1239" }}>
          “वाह! शरबत से बढ़िया स्नान हो गया!”
        </div>
      )}
    </CameraRig>
  );
};

// P9-S02 (735 - 1440f): Mahadev Riding Backwards on Nandi with Shringi & Bhringi
const P9S02UltaNandi: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const vo = getSmoothVoP9(gf);
  const rideX = interpolate(frame, [0, 705], [720, 1080]);

  return (
    <CameraRig zoom={1.08} panX={interpolate(frame, [0, 705], [60, -60])}>
      <ParallaxStage mode="himalaya" cameraX={0} zoom={1.05}>
        <DetailedSpiritRig x={rideX - 360} y={655} kind="shringi" scale={0.96} />
        <DetailedSpiritRig x={rideX - 540} y={665} kind="dhol_gana" scale={0.92} phase={0.8} />
        <MahadevReverseNandiRig x={rideX} y={590} scale={1.14} facingBackwards speakingEnergy={vo} />
        <DetailedSpiritRig x={rideX + 340} y={655} kind="bhringi" scale={0.96} phase={1.5} />
        <DetailedSpiritRig x={rideX + 520} y={665} kind="vetala" scale={0.88} phase={2.2} />

        {frame > 180 && (
          <div style={{ position: "absolute", top: 190, left: 660, padding: "12px 26px", borderRadius: 22, background: "rgba(30, 10, 46, 0.92)", border: "2px solid #fbbf24", fontFamily: "'Noto Sans Devanagari', sans-serif", fontSize: 30, fontWeight: 700, color: "#fef08a" }}>
            “सब देवताओं की बारात फीकी पड़ गई हमारी जमात के आगे!”
          </div>
        )}
      </ParallaxStage>
    </CameraRig>
  );
};

// P9-S03 (1440 - 2280f): Maina Devi Asks Why Groom Faces Backwards -> Shringi-Bhringi Reply!
const P9S03MainaPrashna: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const vo = getSmoothVoP9(gf);
  const isReply = frame > 480;

  return (
    <CameraRig zoom={1.08} panX={isReply ? 65 : -55}>
      <HimalayaPalaceBackdrop variant="royal_courtyard" showAttariSakhis />
      <MahadevReverseNandiRig x={560} y={615} scale={1.08} facingBackwards speakingEnergy={isReply ? 0 : vo * 0.4} />
      <DetailedSpiritRig x={890} y={665} kind="shringi" scale={0.94} />
      <DetailedSpiritRig x={1020} y={670} kind="bhringi" scale={0.90} phase={1.1} />

      <MainaDeviRig x={1350} y={650} scale={1.12} mood="shocked" speakingEnergy={isReply ? 0 : vo} />
      <SakhiBandRig x={1600} y={665} scale={0.96} />

      <div style={{ position: "absolute", top: 205, left: isReply ? 700 : 1060, padding: "12px 26px", borderRadius: 20, background: "rgba(30, 10, 46, 0.92)", border: "2px solid #fde047", fontFamily: "'Noto Sans Devanagari', sans-serif", fontSize: 28, fontWeight: 700, color: "#fef08a" }}>
        {isReply ? "“ये नहीं घूमेंगे मैया — नंदी ही घूमेगा!”" : "“दूल्हा राजा उल्टे काहे को बैठे हैं?”"}
      </div>
    </CameraRig>
  );
};

// P9-S04 (2280 - 3240f): Nandi Turns -> Fierce Paan/Bhasma/Kajal Face -> Maina Faints & Sakhis Flee!
const P9S04Murchha: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const vo = getSmoothVoP9(gf);
  const nandiTurned = frame > 140;
  const veilLifted = interpolate(frame, [180, 380], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const faintProgress = interpolate(frame, [560, 690], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sakhiFleeX = interpolate(frame, [620, 900], [0, 520], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <CameraRig zoom={nandiTurned && frame < 550 ? 1.15 : 1.05} panX={nandiTurned && frame < 550 ? 110 : -35}>
      <HimalayaPalaceBackdrop variant="royal_courtyard" showAttariSakhis />
      <MahadevReverseNandiRig
        x={580}
        y={610}
        scale={1.14}
        facingBackwards={!nandiTurned}
        veilLifted={veilLifted}
        speakingEnergy={vo}
      />
      <DetailedSpiritRig x={920} y={670} kind="shringi" scale={0.92} />

      {frame < 560 ? (
        <MainaDeviRig x={1350} y={650} scale={1.12} mood="shocked" speakingEnergy={vo} />
      ) : (
        <MainaFaintRig x={1340} y={655} scale={1.1} faintProgress={faintProgress} />
      )}

      <SakhiBandRig x={1610 + sakhiFleeX} y={665} scale={0.95} panic={frame > 590} />
    </CameraRig>
  );
};

// P9-S05 (3240 - 4050f): Shamshan Janwasa & Mahadev's Hilarious Explanation to Narayan
const P9S05ShamshanJanwasa: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const vo = getSmoothVoP9(gf);
  const vishnuArrive = interpolate(frame, [260, 440], [1760, 1340], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <CameraRig zoom={1.06} panX={interpolate(frame, [0, 810], [35, -35])}>
      <ParallaxStage mode="shamshan" cameraX={0} zoom={1.04}>
        <DetailedSpiritRig x={360} y={670} kind="shringi" scale={0.94} />
        <DetailedSpiritRig x={510} y={675} kind="bhringi" scale={0.92} phase={1.2} />
        <MahadevFaintOrCalm x={840} y={600} speakingEnergy={vo} />

        {frame >= 220 && (
          <VishnuRig x={vishnuArrive} y={590} scale={1.04} flipX gestureMode="chuckling" speakingEnergy={vo * 0.7} />
        )}

        {frame > 480 && (
          <div style={{ position: "absolute", top: 195, left: 600, padding: "12px 26px", borderRadius: 20, background: "rgba(18, 12, 34, 0.92)", border: "2px solid #38bdf8", fontFamily: "'Noto Sans Devanagari', sans-serif", fontSize: 28, fontWeight: 700, color: "#e0f2fe" }}>
            “सासू माई तो जटा में गंगा देख हमें दंडवत प्रणाम कर रही थीं!”
          </div>
        )}
      </ParallaxStage>
    </CameraRig>
  );
};

export const MahadevBaratPart09: React.FC = () => {
  const frame = useCurrentFrame();
  const sec = frame / P9_FPS;
  const activeScene = P9_SCENES.find((s) => sec >= s.startSec && sec < s.endSec) ?? P9_SCENES[P9_SCENES.length - 1];

  return (
    <AbsoluteFill style={{ backgroundColor: "#14071e" }}>
      <Audio src={staticFile("audio/mahadev-barat-part09-master.mp3")} />

      <Sequence from={P9_SCENES[0].startFrame} durationInFrames={P9_SCENES[0].durationFrames}>
        <P9S01SharbatBath gf={frame} />
      </Sequence>
      <Sequence from={P9_SCENES[1].startFrame} durationInFrames={P9_SCENES[1].durationFrames}>
        <P9S02UltaNandi gf={frame} />
      </Sequence>
      <Sequence from={P9_SCENES[2].startFrame} durationInFrames={P9_SCENES[2].durationFrames}>
        <P9S03MainaPrashna gf={frame} />
      </Sequence>
      <Sequence from={P9_SCENES[3].startFrame} durationInFrames={P9_SCENES[3].durationFrames}>
        <P9S04Murchha gf={frame} />
      </Sequence>
      <Sequence from={P9_SCENES[4].startFrame} durationInFrames={P9_SCENES[4].durationFrames}>
        <P9S05ShamshanJanwasa gf={frame} />
      </Sequence>

      <SceneTitleBanner
        title={activeScene.label}
        subtitle="महादेव की बारात — भाग ९"
        localFrame={frame - activeScene.startFrame}
        durationFrames={activeScene.durationFrames}
      />
      <Part9Captions globalFrame={frame} />
    </AbsoluteFill>
  );
};
