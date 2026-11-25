import React from "react";
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import "@fontsource/noto-sans-devanagari/400.css";
import "@fontsource/noto-sans-devanagari/700.css";
import "@fontsource/yatra-one/400.css";
import { ParallaxStage } from "../environment/ParallaxStage";
import { SceneTitleBanner } from "../ui/DevanagariCaptions";
import { MahadevBaratGroomRig } from "../part3/MahadevBaratGroomRig";
import { NandiBullRig } from "../part4/BhootPretAndNandiRigs";
import { BackgroundCrowdBand, DetailedSpiritRig } from "../characters/DetailedGanasAndSpirits";
import { ElephantMountDevaRig, MainaDeviRig, MouseMountGanaRig, SakhiBandRig } from "./HimalayaNagariRigs";
import { getBedP6, getSmoothVoP6, P6_FPS, P6_SCENES, SUBTITLES_P6 } from "./timelineP6";

const Part6Captions: React.FC<{ globalFrame: number }> = ({ globalFrame }) => {
  const sec = globalFrame / P6_FPS;
  const active = SUBTITLES_P6.find((s) => sec >= s.startSec && sec <= s.endSec);
  const vo = getSmoothVoP6(globalFrame);
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

// P6-S01: Tulsidas Doha — Lean vs Giant, Skull Ornaments, Bird/Hound/Jackal Spirits Marching to Himalaya
const P6S01DohaJamat: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const bed = getBedP6(gf);
  const isAnimalCut = frame >= 270;

  return (
    <ParallaxStage mode="shamshan" cameraX={Math.sin(frame * 0.04) * 18} zoom={isAnimalCut ? 1.08 : 1.03}>
      <BackgroundCrowdBand mode="bhoot_army" y={665} />
      {!isAnimalCut ? (
        <>
          {/* Cut 1: Thin Bhringi vs Vishal Pramath + Skull-Adorned Dakini/Pishacha */}
          <DetailedSpiritRig x={360} y={650} kind="bhringi" scale={1.08} phase={0} />
          <DetailedSpiritRig x={740} y={605} kind="vishal_pramath" scale={1.25} phase={0.8} />
          <DetailedSpiritRig x={1180} y={640} kind="dakini" scale={1.12} phase={1.4} />
          <DetailedSpiritRig x={1560} y={635} kind="pishacha" scale={1.12 + bed * 0.03} phase={2.1} flipX />
        </>
      ) : (
        <>
          {/* Cut 2: Khag, Shwan, Sukar, Gardabh & Bahu-Mukh Spirits Roaring Toward Himalaya */}
          <DetailedSpiritRig x={300} y={660} kind="kukar_mukha" scale={1.14} phase={0} />
          <DetailedSpiritRig x={680} y={655} kind="sukar_mukha" scale={1.14} phase={0.7} />
          <DetailedSpiritRig x={1060} y={650} kind="gardabh_mukha" scale={1.14} phase={1.4} />
          <DetailedSpiritRig x={1440} y={650} kind="narsingha" scale={1.08} phase={2.0} />
          <DetailedSpiritRig x={1720} y={665} kind="dhol_gana" scale={1.05} phase={2.6} flipX />
        </>
      )}
    </ParallaxStage>
  );
};

// P6-S02: Bhajan — "Aayi Shankar Ki Baratiya Himachal Nagari!" Grand Gate Entry
const P6S02BhajanEntry: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const bed = getBedP6(gf);
  const enterX = interpolate(frame, [0, 585], [-180, 90]);

  return (
    <ParallaxStage mode="himalaya" cameraX={enterX * 0.35} zoom={1.04}>
      <BackgroundCrowdBand mode="himalaya_citizens" y={665} />
      <MahadevBaratGroomRig x={480 + enterX * 0.2} y={515} scale={0.94} sehraProgress={1} bichhuProgress={1} panchmukhiProgress={1} bhasmaGlowProgress={1} pose="calm" />
      <NandiBullRig x={505 + enterX * 0.2} y={658} scale={1.24} walking />
      <DetailedSpiritRig x={190 + enterX * 0.2} y={675} kind="narsingha" scale={0.95} phase={0} />
      <DetailedSpiritRig x={870 + enterX * 0.25} y={675} kind="dhol_gana" scale={1.02 + bed * 0.04} phase={0.5} />
      <SakhiBandRig x={1450} y={690} scale={1.04} />
    </ParallaxStage>
  );
};

// P6-S03: "Boodhe Bail Pe Shivji Aaye... Koi Chadh Chooha Par Aaye, Koi Aaye Haathi!"
const P6S03MouseAndElephant: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const bed = getBedP6(gf);
  const isMouseHaathiCut = frame >= 170 && frame < 440;

  return (
    <ParallaxStage mode="himalaya" cameraX={Math.sin(frame * 0.04) * 18} zoom={isMouseHaathiCut ? 1.08 : 1.03}>
      <BackgroundCrowdBand mode="himalaya_citizens" y={665} />
      {!isMouseHaathiCut ? (
        <>
          <MahadevBaratGroomRig x={520} y={515} scale={0.96} sehraProgress={1} bichhuProgress={1} panchmukhiProgress={1} bhasmaGlowProgress={1} pose="heroic" />
          <NandiBullRig x={545} y={660} scale={1.26} walking />
          <DetailedSpiritRig x={210} y={670} kind="shringi" scale={0.96} phase={0} />
          <DetailedSpiritRig x={960} y={675} kind="bahu_mukh" scale={1.02} phase={0.6} />
          <DetailedSpiritRig x={1260} y={675} kind="dhol_gana" scale={1.02} phase={1.3} />
          <DetailedSpiritRig x={1580} y={675} kind="narsingha" scale={1.02} phase={2.1} flipX />
        </>
      ) : (
        <>
          {/* Exact Song Lyrics Visualized: Mouse Rider & Royal Elephant Rider! */}
          <MouseMountGanaRig x={430} y={685} scale={1.28} phase={0} />
          <MouseMountGanaRig x={770} y={715} scale={1.08} phase={1.3} />
          <ElephantMountDevaRig x={1240} y={635} scale={1.18 + bed * 0.03} phase={0.4} />
          <DetailedSpiritRig x={1660} y={685} kind="dhol_gana" scale={0.98} phase={0.9} flipX />
        </>
      )}
    </ParallaxStage>
  );
};

// P6-S04: Queen Mainavati with Golden Aarti Thali — Welcome -> Shocked "Kaise Bitegi Umariya"
const P6S04Mainavati: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const vo = getSmoothVoP6(gf);
  const isShocked = frame >= 255;

  return (
    <ParallaxStage mode="himalaya" cameraX={0} zoom={isShocked ? 1.12 : 1.04}>
      <BackgroundCrowdBand mode="himalaya_citizens" y={675} />
      <MahadevBaratGroomRig x={470} y={530} scale={1.02} sehraProgress={1} bichhuProgress={1} panchmukhiProgress={1} bhasmaGlowProgress={1} pose={isShocked ? "heroic" : "calm"} />
      <NandiBullRig x={495} y={668} scale={1.2} walking={false} />
      <DetailedSpiritRig x={190} y={680} kind="sukar_mukha" scale={0.92} phase={0.2} />
      <DetailedSpiritRig x={820} y={685} kind="bahu_nayan" scale={0.9} phase={1.0} />
      <MainaDeviRig
        x={1390}
        y={650}
        scale={1.18}
        mood={isShocked ? "shocked" : "welcome"}
        speakingEnergy={isShocked ? vo : vo * 0.3}
      />
    </ParallaxStage>
  );
};

// P6-S05: Parvati's Sakhis Singing Mangal Geet & Blocking Palace Gate for "Neg Do!"
const P6S05SakhiNeg: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const vo = getSmoothVoP6(gf);
  const askingNeg = frame >= 210;

  return (
    <ParallaxStage mode="himalaya" cameraX={0} zoom={1.05}>
      <BackgroundCrowdBand mode="himalaya_citizens" y={675} />
      <MahadevBaratGroomRig x={420} y={540} scale={1.08} sehraProgress={1} bichhuProgress={1} panchmukhiProgress={1} bhasmaGlowProgress={1} speakingEnergy={vo * 0.25} pose="calm" />
      <DetailedSpiritRig x={180} y={685} kind="shringi" scale={0.94} phase={0.3} />
      <DetailedSpiritRig x={720} y={685} kind="bhringi" scale={0.94} phase={1.2} />
      <SakhiBandRig x={1340} y={665} scale={1.16} askingNeg={askingNeg} />

      {frame > 430 && (
        <div
          style={{
            position: "absolute",
            top: 120,
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: interpolate(frame, [430, 470], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "12px 32px",
              borderRadius: 16,
              background: "rgba(42, 14, 48, 0.92)",
              border: "2px solid #fde047",
            }}
          >
            <div style={{ fontFamily: "'Yatra One', 'Noto Sans Devanagari', serif", fontSize: 38, color: "#fde047" }}>
              भाग ६ समाप्त • हिमाचल द्वार पर सखियों की नेग लीला!
            </div>
          </div>
        </div>
      )}
    </ParallaxStage>
  );
};

const P6_HUD: Record<string, { title: string; subtitle: string }> = {
  P6S01: { title: "१. कराल प्रेत-जमात प्रस्थान", subtitle: "कपाल भूषण व खग-श्वान-शृगाल मुख गण" },
  P6S02: { title: "२. आई शंकर की बरतिया", subtitle: "हिमाचल नगरी में डमरू-शंख नाद संग प्रवेश" },
  P6S03: { title: "३. बूढ़े बैल, चूहा व हाथी सवारी", subtitle: "कोई चूहे पर चढ़कर, कोई विशाल हाथी पर!" },
  P6S04: { title: "४. मैनावती की थाल व पछतावा", subtitle: "विचित्र दूल्हा देख मैना देवी स्तब्ध" },
  P6S05: { title: "५. सखियों का मंगल व नेग हठ", subtitle: "भीतर जाने से पहले दूल्हा नेग दो!" },
};

export const MahadevBaratPart06: React.FC = () => {
  const frame = useCurrentFrame();
  const active = P6_SCENES.find((s) => frame >= s.startFrame && frame < s.startFrame + s.durationFrames) ?? P6_SCENES[0];
  const hud = P6_HUD[active.id];

  return (
    <AbsoluteFill style={{ backgroundColor: "#14081f" }}>
      <Audio src={staticFile("audio/mahadev-barat-part06-master.mp3")} volume={1} />
      <Sequence from={P6_SCENES[0].startFrame} durationInFrames={P6_SCENES[0].durationFrames}>
        <P6S01DohaJamat gf={frame} />
      </Sequence>
      <Sequence from={P6_SCENES[1].startFrame} durationInFrames={P6_SCENES[1].durationFrames}>
        <P6S02BhajanEntry gf={frame} />
      </Sequence>
      <Sequence from={P6_SCENES[2].startFrame} durationInFrames={P6_SCENES[2].durationFrames}>
        <P6S03MouseAndElephant gf={frame} />
      </Sequence>
      <Sequence from={P6_SCENES[3].startFrame} durationInFrames={P6_SCENES[3].durationFrames}>
        <P6S04Mainavati gf={frame} />
      </Sequence>
      <Sequence from={P6_SCENES[4].startFrame} durationInFrames={P6_SCENES[4].durationFrames}>
        <P6S05SakhiNeg gf={frame} />
      </Sequence>

      <SceneTitleBanner
        title={hud.title}
        subtitle={hud.subtitle}
        localFrame={frame - active.startFrame}
        durationFrames={active.durationFrames}
      />
      <Part6Captions globalFrame={frame} />
    </AbsoluteFill>
  );
};
