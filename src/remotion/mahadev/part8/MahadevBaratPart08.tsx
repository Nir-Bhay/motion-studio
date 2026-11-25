import React from "react";
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import "@fontsource/noto-sans-devanagari/400.css";
import "@fontsource/noto-sans-devanagari/700.css";
import "@fontsource/yatra-one/400.css";
import { SceneTitleBanner } from "../ui/DevanagariCaptions";
import { ParallaxStage } from "../environment/ParallaxStage";
import { BrahmaRig, IndraOnAiravataRig } from "../characters/BrahmaIndraRigs";
import { BackgroundCrowdBand, DetailedSpiritRig } from "../characters/DetailedGanasAndSpirits";
import { MainaDeviRig } from "../part6/HimalayaNagariRigs";
import { HimalayaPalaceBackdrop } from "../part7/HimalayaPalaceBackdrop";
import { NaradMuniRig, PitambariBaratiCrowd } from "../part7/NaradMuniRig";
import {
  HeadlessBaratiRig,
  HimachaliChildRig,
  VillageHouseDoorRig,
  VillageInteriorBackdrop,
  WorriedParentRig,
} from "./HimachalVillageRigs";
import { getSmoothVoP8, P8_FPS, P8_SCENES, SUBTITLES_P8 } from "./timelineP8";

const Part8Captions: React.FC<{ globalFrame: number }> = ({ globalFrame }) => {
  const sec = globalFrame / P8_FPS;
  const active = SUBTITLES_P8.find((s) => sec >= s.startSec && sec <= s.endSec);
  const vo = getSmoothVoP8(globalFrame);
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
}) => (
  <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#14071e" }}>
    <div style={{ position: "absolute", inset: 0, transform: `translate(${panX}px, ${panY}px) scale(${zoom})`, transformOrigin: "center center" }}>
      {children}
    </div>
  </AbsoluteFill>
);

// P8-S01 (0 - 690f): Brahma Ji Arrives -> Maina Thinks 5th Head is Hidden -> Narad Denies!
const P8S01BrahmaBhram: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const vo = getSmoothVoP8(gf);
  const cut = frame < 150 ? 1 : frame < 420 ? 2 : 3;

  if (cut === 1) {
    return (
      <CameraRig zoom={interpolate(frame, [0, 150], [1.14, 1.22])} panX={-105} panY={-20}>
        <HimalayaPalaceBackdrop variant="royal_courtyard" showAttariSakhis />
        <BackgroundCrowdBand mode="himalaya_citizens" y={685} />
        <MainaDeviRig x={1120} y={655} scale={1.12} mood="welcome" speakingEnergy={vo} />
        <NaradMuniRig x={1440} y={635} scale={1.08} gesture="explaining" flipX />
      </CameraRig>
    );
  }

  if (cut === 2) {
    const brahmaX = interpolate(frame, [150, 320], [260, 480], { extrapolateRight: "clamp" });
    return (
      <CameraRig zoom={1.04} panX={0}>
        <HimalayaPalaceBackdrop variant="royal_courtyard" showAttariSakhis />
        <BackgroundCrowdBand mode="himalaya_citizens" y={685} />
        <BrahmaRig x={brahmaX} y={445} scale={1.04} speakingEnergy={0} />
        <MainaDeviRig x={1180} y={655} scale={1.06} mood="welcome" speakingEnergy={vo} />
        <NaradMuniRig x={1510} y={635} scale={1.05} gesture="explaining" flipX />
        {frame > 250 && (
          <div style={{ position: "absolute", top: 245, left: 960, padding: "10px 22px", borderRadius: 18, background: "rgba(69, 10, 10, 0.94)", border: "2px solid #fde047", fontFamily: "'Noto Sans Devanagari', sans-serif", fontSize: 25, fontWeight: 700, color: "#fffbeb" }}>
            “पाँचवाँ मुख ऊपर होगा — दिख नहीं रहा!”
          </div>
        )}
      </CameraRig>
    );
  }

  // Cut 1C: Narad waves denial
  return (
    <CameraRig zoom={1.2} panX={-140} panY={-20}>
      <HimalayaPalaceBackdrop variant="royal_courtyard" showAttariSakhis />
      <BackgroundCrowdBand mode="himalaya_citizens" y={685} />
      <BrahmaRig x={460} y={445} scale={0.98} />
      <MainaDeviRig x={1180} y={655} scale={1.06} mood="shocked" />
      <NaradMuniRig x={1510} y={635} scale={1.08} speakingEnergy={vo} gesture="denying" flipX />
      <div style={{ position: "absolute", top: 250, left: 1120, padding: "12px 24px", borderRadius: 20, background: "rgba(30, 27, 75, 0.94)", border: "2.5px solid #fde047", fontFamily: "'Noto Sans Devanagari', sans-serif", fontSize: 26, fontWeight: 700, color: "#fde047" }}>
        “नहीं-नहीं मैया, ये तो ब्रह्मा जी हैं!”
      </div>
    </CameraRig>
  );
};

// P8-S02 (690 - 1320f): Indra Arrives on Airavata -> Narad Jokes "Pani Pilane Wale Hain!"
const P8S02IndraBhram: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const vo = getSmoothVoP8(gf);
  const cut = frame < 245 ? 1 : frame < 455 ? 2 : 3;
  const indraX = interpolate(frame, [0, 220], [220, 490], { extrapolateRight: "clamp" });

  return (
    <CameraRig zoom={cut === 2 ? 1.2 : 1.05} panX={cut === 2 ? -145 : 0} panY={cut === 2 ? -25 : 0}>
      <HimalayaPalaceBackdrop variant="royal_courtyard" showAttariSakhis />
      <BackgroundCrowdBand mode="himalaya_citizens" y={685} />
      <PitambariBaratiCrowd baseX={160} y={715} />
      <IndraOnAiravataRig x={indraX} y={530} scale={1.06} />
      <MainaDeviRig x={1210} y={655} scale={1.05} mood="welcome" />
      <NaradMuniRig x={1520} y={635} scale={1.06} speakingEnergy={cut === 2 ? vo : 0} gesture={cut === 2 ? "denying" : "explaining"} flipX />

      {cut === 1 && frame > 110 && (
        <div style={{ position: "absolute", top: 235, left: 1010, padding: "10px 24px", borderRadius: 18, background: "rgba(69, 10, 10, 0.94)", border: "2px solid #fde047", fontFamily: "'Noto Sans Devanagari', sans-serif", fontSize: 25, fontWeight: 700, color: "#fde047" }}>
          “निश्चित यही हमारे दूल्हा राजा हैं!”
        </div>
      )}
      {cut === 2 && (
        <div style={{ position: "absolute", top: 245, left: 1040, padding: "12px 24px", borderRadius: 20, background: "rgba(30, 27, 75, 0.94)", border: "2.5px solid #fde047", fontFamily: "'Noto Sans Devanagari', sans-serif", fontSize: 25, fontWeight: 700, color: "#fde047" }}>
          “ये तो महादेव को पानी पिलाने वाले सेवक हैं!” 😄
        </div>
      )}
    </CameraRig>
  );
};

// P8-S03 (1320 - 1860f): Ghostly Roars Echo -> Narad Quietly Slips Away!
const P8S03NaradSlips: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const vo = getSmoothVoP8(gf);
  const naradSlipX = interpolate(frame, [300, 520], [1420, 2060], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <CameraRig zoom={1.04} panX={Math.sin(frame * 0.25) * (frame < 210 ? 5 : 0)}>
      <ParallaxStage mode="shamshan" cameraX={0} zoom={1.04}>
        <BackgroundCrowdBand mode="himalaya_citizens" y={685} />
        <MainaDeviRig x={920} y={655} scale={1.08} mood="shocked" />
        <NaradMuniRig x={naradSlipX} y={635} scale={1.06} speakingEnergy={vo} gesture="explaining" />

        {/* Ghostly Echo Ripples from the Left */}
        <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {[0, 1, 2].map((r) => (
            <circle
              key={r}
              cx={140}
              cy={420}
              r={((frame * 6 + r * 140) % 480) + 40}
              fill="none"
              stroke="#c084fc"
              strokeWidth={4}
              opacity={0.45}
            />
          ))}
        </svg>
        <div style={{ position: "absolute", top: 215, left: 170, padding: "12px 26px", borderRadius: 20, background: "rgba(30, 14, 58, 0.9)", border: "2px solid #c084fc", fontFamily: "'Yatra One', 'Noto Sans Devanagari', serif", fontSize: 38, color: "#e9d5ff" }}>
          “हूँ-हाँ! ही-ही! खिलची!”
        </div>
      </ParallaxStage>
    </CameraRig>
  );
};

// P8-S04 (1860 - 2445f): Kids Peek -> Terrified Stampede -> Slamming House Doors Shut!
const P8S04KidsRunHome: React.FC = () => {
  const frame = useCurrentFrame();
  const cut = frame < 185 ? 1 : frame < 395 ? 2 : 3;

  if (cut === 1) {
    return (
      <CameraRig zoom={1.12} panX={40}>
        <HimalayaPalaceBackdrop variant="royal_courtyard" />
        <HimachaliChildRig x={420} y={690} scale={1.1} mode="peeking" shirtColor="#fef3c7" vestColor="#be123c" />
        <HimachaliChildRig x={620} y={705} scale={1.02} mode="peeking" shirtColor="#dbeafe" vestColor="#0f766e" phase={1} />
        <HimachaliChildRig x={820} y={695} scale={1.06} mode="peeking" shirtColor="#fde68a" vestColor="#7c3aed" phase={2} />
        <DetailedSpiritRig x={1560} y={670} kind="pret_kankal" scale={1.04} phase={0.4} flipX />
      </CameraRig>
    );
  }

  if (cut === 2) {
    const sprint = interpolate(frame, [185, 395], [0, 780]);
    return (
      <CameraRig zoom={1.04}>
        <ParallaxStage mode="shamshan" cameraX={0} zoom={1.04}>
          <DetailedSpiritRig x={240} y={670} kind="asura_senapati" scale={1.02} phase={0.2} />
          <DetailedSpiritRig x={480} y={670} kind="bhoot_maya" scale={0.98} phase={1.0} />
          <HimachaliChildRig x={760 + sprint * 0.75} y={695} scale={1.08} mode="running" shirtColor="#fef3c7" vestColor="#be123c" />
          <HimachaliChildRig x={940 + sprint * 0.8} y={710} scale={1.0} mode="running" shirtColor="#dbeafe" vestColor="#0f766e" phase={1.2} />
          <HimachaliChildRig x={1110 + sprint * 0.85} y={698} scale={1.05} mode="running" shirtColor="#fde68a" vestColor="#7c3aed" phase={2.1} />
        </ParallaxStage>
      </CameraRig>
    );
  }

  // Cut 4C: Kids slam the wooden Kivaad doors shut!
  const closeP = interpolate(frame, [410, 480], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <CameraRig zoom={1.06}>
      <HimalayaPalaceBackdrop variant="palace_gate" />
      <VillageHouseDoorRig x={960} y={535} doorClosedProgress={closeP} />
      {frame < 460 && (
        <>
          <HimachaliChildRig x={890} y={690} scale={1.0} mode="running" phase={0} />
          <HimachaliChildRig x={1030} y={695} scale={0.96} mode="running" phase={1.3} />
        </>
      )}
    </CameraRig>
  );
};

// P8-S05 (2445 - 2865f): "Kaisen-Kaisen Bhoot Pret!" — Scary Montage + Sweating Panting Kids & Parents
const P8S05PantingInside: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const vo = getSmoothVoP8(gf);
  const isMontage = frame < 200;

  if (isMontage) {
    return (
      <CameraRig zoom={interpolate(frame, [0, 200], [1.04, 1.15])}>
        <ParallaxStage mode="shamshan" cameraX={0} zoom={1.05}>
          <DetailedSpiritRig x={280} y={665} kind="pret_kankal" scale={1.1} phase={0.1} />
          <DetailedSpiritRig x={660} y={660} kind="shrigal_mukha" scale={1.08} phase={0.8} />
          <DetailedSpiritRig x={1060} y={655} kind="bhoot_maya" scale={1.12} phase={1.6} />
          <DetailedSpiritRig x={1480} y={665} kind="dakini" scale={1.08} phase={2.3} flipX />
        </ParallaxStage>
      </CameraRig>
    );
  }

  return (
    <CameraRig zoom={1.06}>
      <AbsoluteFill style={{ backgroundColor: "#291224" }}>
        <VillageInteriorBackdrop />
        <WorriedParentRig x={430} y={635} scale={1.12} role="mother" speakingEnergy={vo} />
        <WorriedParentRig x={1490} y={635} scale={1.12} role="father" speakingEnergy={vo * 0.6} />
        <HimachaliChildRig x={770} y={705} scale={1.12} mode="panting" shirtColor="#fef3c7" vestColor="#be123c" />
        <HimachaliChildRig x={980} y={715} scale={1.04} mode="panting" shirtColor="#dbeafe" vestColor="#0f766e" phase={0.8} />
        <HimachaliChildRig x={1180} y={705} scale={1.08} mode="panting" shirtColor="#fde68a" vestColor="#7c3aed" phase={1.7} />
      </AbsoluteFill>
    </CameraRig>
  );
};

// P8-S06 (2865 - 3420f): Headless Barati Knocks on Door -> Family Flees in Shock!
const P8S06HeadlessKnock: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const vo = getSmoothVoP8(gf);
  const knockShake = frame < 260 ? Math.sin(frame * 1.4) * 5 : 0;
  const fleeRun = interpolate(frame, [300, 520], [0, 620], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <CameraRig zoom={1.04}>
      <HimalayaPalaceBackdrop variant="palace_gate" />
      <VillageHouseDoorRig x={820} y={530} doorClosedProgress={frame > 250 ? 0.25 : 1} knockShake={knockShake} />
      <HeadlessBaratiRig x={540} y={645} scale={1.08} knocking={frame < 260} />

      {/* Knock Sound Visual Badge */}
      {frame < 230 && (
        <div style={{ position: "absolute", top: 270, left: 615, padding: "10px 22px", borderRadius: 18, background: "#fef08a", border: "3px solid #1a0b2e", fontFamily: "'Yatra One', 'Noto Sans Devanagari', serif", fontSize: 34, color: "#7f1d1d" }}>
          खट! खट! खट!
        </div>
      )}

      {/* Family Sees Headless Barati & Runs Out in Shock! */}
      {frame >= 245 && (
        <>
          <WorriedParentRig x={1220 + fleeRun} y={645} scale={1.02} role="mother" speakingEnergy={vo} />
          <WorriedParentRig x={1440 + fleeRun} y={645} scale={1.02} role="father" />
          <HimachaliChildRig x={1620 + fleeRun} y={705} scale={0.98} mode="running" />
        </>
      )}
    </CameraRig>
  );
};

const P8_HUD: Record<string, { title: string; subtitle: string }> = {
  P8S01: { title: "१. चतुर्मुख ब्रह्मा भ्रम", subtitle: "पाँचवें मुख की खोज व नारद जी का उत्तर" },
  P8S02: { title: "२. देवराज इंद्र व नारद हास्य", subtitle: "पानी पिलाने वाले इतने सुंदर तो दूल्हा कैसा!" },
  P8S03: { title: "३. भूतों की हुंकार व नारद का खिसकना", subtitle: "दूर से आती भयानक आवाज़ें" },
  P8S04: { title: "४. बारात देख बालकों का भागना", subtitle: "किवाड़ बंद कर काँपते बच्चे" },
  P8S05: { title: "५. कैसन-कइसन भूत-प्रेत!", subtitle: "छूटता पसीना व माई-बाप का पूछना" },
  P8S06: { title: "६. बिना मुख के बाराती की दस्तक", subtitle: "घर छोड़ कर भागते नगरवासी!" },
};

export const MahadevBaratPart08: React.FC = () => {
  const frame = useCurrentFrame();
  const active = P8_SCENES.find((s) => frame >= s.startFrame && frame < s.startFrame + s.durationFrames) ?? P8_SCENES[0];
  const hud = P8_HUD[active.id];

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0714" }}>
      <Audio src={staticFile("audio/mahadev-barat-part08-master.mp3")} volume={1} />
      <Sequence from={P8_SCENES[0].startFrame} durationInFrames={P8_SCENES[0].durationFrames}>
        <P8S01BrahmaBhram gf={frame} />
      </Sequence>
      <Sequence from={P8_SCENES[1].startFrame} durationInFrames={P8_SCENES[1].durationFrames}>
        <P8S02IndraBhram gf={frame} />
      </Sequence>
      <Sequence from={P8_SCENES[2].startFrame} durationInFrames={P8_SCENES[2].durationFrames}>
        <P8S03NaradSlips gf={frame} />
      </Sequence>
      <Sequence from={P8_SCENES[3].startFrame} durationInFrames={P8_SCENES[3].durationFrames}>
        <P8S04KidsRunHome />
      </Sequence>
      <Sequence from={P8_SCENES[4].startFrame} durationInFrames={P8_SCENES[4].durationFrames}>
        <P8S05PantingInside gf={frame} />
      </Sequence>
      <Sequence from={P8_SCENES[5].startFrame} durationInFrames={P8_SCENES[5].durationFrames}>
        <P8S06HeadlessKnock gf={frame} />
      </Sequence>

      <SceneTitleBanner
        title={hud.title}
        subtitle={hud.subtitle}
        localFrame={frame - active.startFrame}
        durationFrames={active.durationFrames}
      />
      <Part8Captions globalFrame={frame} />
    </AbsoluteFill>
  );
};
