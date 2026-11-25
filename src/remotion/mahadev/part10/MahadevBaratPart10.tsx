import React from "react";
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import "@fontsource/noto-sans-devanagari/400.css";
import "@fontsource/noto-sans-devanagari/700.css";
import "@fontsource/yatra-one/400.css";
import { SceneTitleBanner } from "../ui/DevanagariCaptions";
import { ApsaraRig, CelestialMusicianRig } from "../characters/ApsaraAndMusicians";
import { BrahmaRig, IndraOnAiravataRig } from "../characters/BrahmaIndraRigs";
import { DetailedSpiritRig } from "../characters/DetailedGanasAndSpirits";
import { VishnuRig } from "../characters/VishnuRig";
import { NandiBullRig } from "../part4/BhootPretAndNandiRigs";
import { MainaDeviRig } from "../part6/HimalayaNagariRigs";
import { HimalayaPalaceBackdrop } from "../part7/HimalayaPalaceBackdrop";
import { NaradMuniRig } from "../part7/NaradMuniRig";
import { DivyaSaumyaMahadevRig, HimavantRig, MataParvatiBridalRig, VivahMandapBackdrop } from "./DivyaVivahRigs";
import { getSmoothVoP10, P10_FPS, P10_SCENES, SUBTITLES_P10 } from "./timelineP10";

const Part10Captions: React.FC<{ globalFrame: number }> = ({ globalFrame }) => {
  const sec = globalFrame / P10_FPS;
  const active = SUBTITLES_P10.find((s) => sec >= s.startSec && sec <= s.endSec);
  const vo = getSmoothVoP10(globalFrame);
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

// P10-S01 (0 - 815f): Maina Wakes Distressed -> Narad Muni Explains Divine Truth
const P10S01NaradPrabodhan: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const vo = getSmoothVoP10(gf);
  const naradSpeaking = frame > 230;

  return (
    <CameraRig zoom={1.08} panX={interpolate(frame, [0, 815], [40, -40])}>
      <HimalayaPalaceBackdrop variant="royal_courtyard" showAttariSakhis />
      <MainaDeviRig x={680} y={645} scale={1.12} mood={naradSpeaking ? "welcome" : "shocked"} speakingEnergy={naradSpeaking ? 0 : vo} />
      <HimavantRig x={430} y={640} scale={1.04} foldedHands />
      <NaradMuniRig x={1260} y={635} scale={1.12} gesture="explaining" speakingEnergy={naradSpeaking ? vo : 0} flipX />

      {naradSpeaking && (
        <div style={{ position: "absolute", top: 200, left: 760, padding: "12px 26px", borderRadius: 20, background: "rgba(30, 10, 46, 0.92)", border: "2px solid #fde047", fontFamily: "'Noto Sans Devanagari', sans-serif", fontSize: 28, fontWeight: 700, color: "#fef08a" }}>
          “मैना सत्य सुनहु मम वाणी, जगदंबा तव सुता भवानी!”
        </div>
      )}
    </CameraRig>
  );
};

// P10-S02 (815 - 1685f): Maina & Himavant Bow to Parvati -> Mahadev's Radiant Divine Groom Form!
const P10S02DivyaRoop: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const vo = getSmoothVoP10(gf);
  const auraBoost = interpolate(frame, [300, 620], [0.6, 1.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <CameraRig zoom={interpolate(frame, [0, 870], [1.04, 1.12])} panX={interpolate(frame, [0, 870], [-30, 30])}>
      <HimalayaPalaceBackdrop variant="vaikuntha_himalaya" showAttariSakhis />
      <HimavantRig x={420} y={650} scale={1.04} foldedHands />
      <MainaDeviRig x={640} y={655} scale={1.08} mood="welcome" speakingEnergy={vo * 0.4} />
      <MataParvatiBridalRig x={920} y={645} scale={1.08} holdingJaimala />
      <DivyaSaumyaMahadevRig x={1320} y={640} scale={1.14} auraBoost={auraBoost} />

      {frame > 340 && (
        <div style={{ position: "absolute", top: 195, left: 930, padding: "12px 26px", borderRadius: 20, background: "rgba(42, 14, 48, 0.92)", border: "2px solid #fde047", fontFamily: "'Noto Sans Devanagari', sans-serif", fontSize: 29, fontWeight: 700, color: "#fef08a" }}>
          “कोटि कामदेवों को लजाने वाला दिव्य स्वरूप!”
        </div>
      )}
    </CameraRig>
  );
};

// P10-S03 (1685 - 2415f): Sacred Vivah Mandap — Jaimala, Panigrahan & Vedic Chants
const P10S03Panigrahan: React.FC<{ gf: number }> = ({ gf }) => {
  const vo = getSmoothVoP10(gf);

  return (
    <CameraRig zoom={1.06} panX={0}>
      <VivahMandapBackdrop showFlowerRain />
      <BrahmaRig x={430} y={585} scale={0.96} speakingEnergy={vo} />
      <DivyaSaumyaMahadevRig x={820} y={625} scale={1.12} extendingHand />
      <MataParvatiBridalRig x={1100} y={630} scale={1.1} holdingJaimala />
      <MainaDeviRig x={1440} y={645} scale={1.02} mood="welcome" />
      <HimavantRig x={1630} y={640} scale={0.98} foldedHands />
    </CameraRig>
  );
};

// P10-S04 (2415 - 3135f): Devas, Apsaras & Celestial Musicians Dancing Under Pushpa Varsha!
const P10S04DevtaNritya: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const vo = getSmoothVoP10(gf);

  return (
    <CameraRig zoom={1.04} panX={interpolate(frame, [0, 720], [-30, 30])}>
      <VivahMandapBackdrop showFlowerRain />
      <VishnuRig x={360} y={565} scale={0.98} withGaruda gestureMode="chuckling" speakingEnergy={vo * 0.5} />
      <IndraOnAiravataRig x={1560} y={580} scale={0.94} />
      <ApsaraRig x={640} y={645} scale={0.98} colorScheme="gold" phase={0} />
      <ApsaraRig x={1295} y={645} scale={0.98} colorScheme="rose" phase={1.4} />
      <CelestialMusicianRig x={875} y={655} scale={1.0} instrument="shehnai" />
      <NaradMuniRig x={1095} y={635} scale={0.98} gesture="playing" />
    </CameraRig>
  );
};

// P10-S05 (3135 - 3840f): Grand Finale Celebration Tableau — "Har Har Mahadev!"
const P10S05MangalBadhai: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const vo = getSmoothVoP10(gf);

  return (
    <CameraRig zoom={interpolate(frame, [0, 705], [1.02, 1.08])} panX={0}>
      <VivahMandapBackdrop showFlowerRain />
      <NandiBullRig x={240} y={665} scale={0.86} />
      <DetailedSpiritRig x={420} y={665} kind="shringi" scale={0.88} />
      <HimavantRig x={590} y={645} scale={0.98} foldedHands />
      <DivyaSaumyaMahadevRig x={840} y={615} scale={1.16} auraBoost={1.45} extendingHand />
      <MataParvatiBridalRig x={1080} y={622} scale={1.12} holdingJaimala />
      <MainaDeviRig x={1330} y={645} scale={1.02} mood="welcome" speakingEnergy={vo * 0.4} />
      <NaradMuniRig x={1540} y={635} scale={0.98} gesture="playing" flipX />
      <DetailedSpiritRig x={1720} y={665} kind="bhringi" scale={0.88} flipX />

      {/* Grand Finale Blessing Banner */}
      <div
        style={{
          position: "absolute",
          top: 150,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            padding: "14px 40px",
            borderRadius: 24,
            background: "linear-gradient(135deg, rgba(136, 19, 55, 0.94), rgba(88, 28, 135, 0.94))",
            border: "3px solid #fde047",
            boxShadow: "0 16px 40px rgba(0,0,0,0.45)",
            fontFamily: "'Yatra One', 'Noto Sans Devanagari', serif",
            fontSize: 44,
            color: "#fef08a",
          }}
        >
          शुभ विवाह संपन्न — हर हर महादेव!
        </div>
      </div>
    </CameraRig>
  );
};

export const MahadevBaratPart10: React.FC = () => {
  const frame = useCurrentFrame();
  const sec = frame / P10_FPS;
  const activeScene = P10_SCENES.find((s) => sec >= s.startSec && sec < s.endSec) ?? P10_SCENES[P10_SCENES.length - 1];

  return (
    <AbsoluteFill style={{ backgroundColor: "#14071e" }}>
      <Audio src={staticFile("audio/mahadev-barat-part10-master.mp3")} />

      <Sequence from={P10_SCENES[0].startFrame} durationInFrames={P10_SCENES[0].durationFrames}>
        <P10S01NaradPrabodhan gf={frame} />
      </Sequence>
      <Sequence from={P10_SCENES[1].startFrame} durationInFrames={P10_SCENES[1].durationFrames}>
        <P10S02DivyaRoop gf={frame} />
      </Sequence>
      <Sequence from={P10_SCENES[2].startFrame} durationInFrames={P10_SCENES[2].durationFrames}>
        <P10S03Panigrahan gf={frame} />
      </Sequence>
      <Sequence from={P10_SCENES[3].startFrame} durationInFrames={P10_SCENES[3].durationFrames}>
        <P10S04DevtaNritya gf={frame} />
      </Sequence>
      <Sequence from={P10_SCENES[4].startFrame} durationInFrames={P10_SCENES[4].durationFrames}>
        <P10S05MangalBadhai gf={frame} />
      </Sequence>

      <SceneTitleBanner
        title={activeScene.label}
        subtitle="महादेव की बारात — भाग १० (समापन उत्सव)"
        localFrame={frame - activeScene.startFrame}
        durationFrames={activeScene.durationFrames}
      />
      <Part10Captions globalFrame={frame} />
    </AbsoluteFill>
  );
};
