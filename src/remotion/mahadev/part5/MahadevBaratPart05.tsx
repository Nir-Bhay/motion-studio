import React from "react";
import { AbsoluteFill, Audio, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import "@fontsource/noto-sans-devanagari/400.css";
import "@fontsource/noto-sans-devanagari/700.css";
import "@fontsource/yatra-one/400.css";
import { ParallaxStage } from "../environment/ParallaxStage";
import { SceneTitleBanner } from "../ui/DevanagariCaptions";
import { MahadevBaratGroomRig } from "../part3/MahadevBaratGroomRig";
import { NandiBullRig, PretCreatureRig } from "../part4/BhootPretAndNandiRigs";
import { BackgroundCrowdBand, DetailedSpiritRig } from "../characters/DetailedGanasAndSpirits";
import { getBedP5, getSmoothVoP5, P5_FPS, P5_SCENES, SUBTITLES_P5 } from "./timelineP5";

const Part5Captions: React.FC<{ globalFrame: number }> = ({ globalFrame }) => {
  const sec = globalFrame / P5_FPS;
  const active = SUBTITLES_P5.find((s) => sec >= s.startSec && sec <= s.endSec);
  const vo = getSmoothVoP5(globalFrame);
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
          background: "linear-gradient(135deg, rgba(28, 12, 34, 0.9), rgba(68, 19, 44, 0.88))",
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

// P5-S01: Weeping Prets Telling Mahadev of Indra's Insult
const P5S01PretCry: React.FC<{ gf: number }> = ({ gf }) => {
  const vo = getSmoothVoP5(gf);
  return (
    <ParallaxStage mode="shamshan" cameraX={0} zoom={1.04}>
      <BackgroundCrowdBand mode="bhoot_army" y={665} />
      <MahadevBaratGroomRig x={460} y={515} scale={0.92} sehraProgress={1} bichhuProgress={1} panchmukhiProgress={1} bhasmaGlowProgress={1} speakingEnergy={vo * 0.25} pose="calm" />
      <NandiBullRig x={485} y={660} scale={1.2} walking={false} />
      <DetailedSpiritRig x={190} y={680} kind="shringi" scale={0.95} phase={0} />
      <PretCreatureRig x={1020} y={630} variant="weeping" scale={1.12} phase={0} />
      <PretCreatureRig x={1260} y={665} variant="weeping" scale={1.06} phase={1.2} />
      <PretCreatureRig x={1520} y={625} variant="weeping" scale={1.1} phase={2.1} />
      <DetailedSpiritRig x={1740} y={675} kind="vetala" scale={0.9} phase={0.5} flipX />
    </ParallaxStage>
  );
};

// P5-S02: Mahadev's Compassionate Vow — "देवताओं के ब्याह में शगुन, महादेव के ब्याह में सारे अपशकुन!"
const P5S02Vachan: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const vo = getSmoothVoP5(gf);
  const cheer = spring({ frame: Math.max(0, frame - 180), fps, config: { damping: 10, stiffness: 90 } });

  return (
    <ParallaxStage mode="shamshan" cameraX={0} zoom={interpolate(frame, [0, 480], [1.03, 1.12])}>
      <BackgroundCrowdBand mode="bhoot_army" y={660} />
      <MahadevBaratGroomRig x={480} y={540} scale={1.15} sehraProgress={1} bichhuProgress={1} panchmukhiProgress={1} bhasmaGlowProgress={1} speakingEnergy={vo} pose="heroic" />
      <DetailedSpiritRig x={210} y={685} kind="narsingha" scale={0.95} phase={0} />
      {/* Joyfully leaping Bhoot-Pret crowd celebrating Mahadev's vow! */}
      <DetailedSpiritRig x={980} y={665 - cheer * 24} kind="shringi" scale={0.98} phase={0.2} flipX />
      <DetailedSpiritRig x={1210} y={675 - cheer * 28} kind="dakini" scale={0.96} phase={1.1} flipX />
      <DetailedSpiritRig x={1460} y={670 - cheer * 22} kind="pishacha" scale={0.98} phase={2.0} flipX />
      <DetailedSpiritRig x={1700} y={685 - cheer * 20} kind="dhol_gana" scale={0.95} phase={0.7} flipX />
    </ParallaxStage>
  );
};

// P5-S03: Word-by-Word Showcase Cuts — Mukh-Heen, Bahu-Mukh, & Bahu-Paad!
const P5S03MukhHeen: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const bed = getBedP5(gf);
  // Dynamic 3-clip spotlight cuts matching exact Hindi verse phrasing!
  const isMukhCut = frame >= 120 && frame < 340;
  const isPaadCut = frame >= 340;

  return (
    <ParallaxStage mode="shamshan" cameraX={Math.sin(frame * 0.05) * 16} zoom={isMukhCut || isPaadCut ? 1.14 : 1.04}>
      <BackgroundCrowdBand mode="bhoot_army" y={665} />
      {!isMukhCut && !isPaadCut && (
        <>
          <MahadevBaratGroomRig x={480} y={545} scale={1.12} sehraProgress={1} bichhuProgress={1} panchmukhiProgress={1} bhasmaGlowProgress={1} pose="heroic" />
          <DetailedSpiritRig x={1020} y={645} kind="mukh_heen" scale={1.08} phase={0} />
          <DetailedSpiritRig x={1320} y={640} kind="bahu_mukh" scale={1.08} phase={1.1} />
          <DetailedSpiritRig x={1630} y={655} kind="bahu_paad" scale={1.08 + bed * 0.04} phase={2.2} />
        </>
      )}
      {isMukhCut && (
        <>
          {/* Spotlight Clip 1: Mukh-Heen (Headless chest-face) + Bahu-Mukh (Multi-headed)! */}
          <DetailedSpiritRig x={620} y={615} kind="mukh_heen" scale={1.36} phase={0} />
          <DetailedSpiritRig x={1300} y={615} kind="bahu_mukh" scale={1.36} phase={1.4} />
        </>
      )}
      {isPaadCut && (
        <>
          {/* Spotlight Clip 2: Crawling Spirit + Bahu-Paad (Multi-legged & 4-armed)! */}
          <DetailedSpiritRig x={580} y={685} kind="vetala" scale={1.18} phase={0.3} />
          <DetailedSpiritRig x={1280} y={610} kind="bahu_paad" scale={1.38} phase={1.7} />
        </>
      )}
    </ParallaxStage>
  );
};

// P5-S04: Word-by-Word Showcase — Bahu-Nayan (7-eyed), Vishal Prachand, & Lean Bhringi!
const P5S04NayanTan: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const bed = getBedP5(gf);
  const isSizeCut = frame >= 165;

  return (
    <ParallaxStage mode="shamshan" cameraX={0} zoom={1.12}>
      <BackgroundCrowdBand mode="bhoot_army" y={665} />
      {!isSizeCut ? (
        <>
          <DetailedSpiritRig x={560} y={615} kind="mukh_heen" scale={1.24} phase={0} />
          <DetailedSpiritRig x={1320} y={610} kind="bahu_nayan" scale={1.35 + bed * 0.04} phase={1.2} />
        </>
      ) : (
        <>
          {/* Giant Muscular Vishal Pramath vs Ultra-Lean Dancing Bhringi! */}
          <DetailedSpiritRig x={600} y={595} kind="vishal_pramath" scale={1.45} phase={0} />
          <DetailedSpiritRig x={1340} y={645} kind="bhringi" scale={1.12} phase={1.5} flipX />
        </>
      )}
    </ParallaxStage>
  );
};

// P5-S05: Grand Himalaya March — Sukar, Kukar & Donkey-Headed Prets Marching with Nandi & Mahadev!
const P5S05HimalayaMarch: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const bed = getBedP5(gf);
  const marchX = interpolate(frame, [0, 525], [-160, 140]);

  return (
    <ParallaxStage mode="shamshan" cameraX={marchX * 0.45} zoom={1.03}>
      <BackgroundCrowdBand mode="bhoot_army" y={660} />

      {/* Mahadev Riding Nandi Bull Leading the Grand Spirit Army */}
      <MahadevBaratGroomRig x={430 + marchX * 0.25} y={505} scale={0.95} sehraProgress={1} bichhuProgress={1} panchmukhiProgress={1} bhasmaGlowProgress={1} pose="calm" />
      <NandiBullRig x={455 + marchX * 0.25} y={650} scale={1.24} walking />
      <DetailedSpiritRig x={150 + marchX * 0.25} y={670} kind="narsingha" scale={0.94} phase={0} />

      {/* Boar-Headed, Hound-Headed & Donkey-Headed Barat Dancers! */}
      <DetailedSpiritRig x={880 + marchX * 0.3} y={670} kind="sukar_mukha" scale={1.04 + bed * 0.04} phase={0.4} />
      <DetailedSpiritRig x={1150 + marchX * 0.3} y={680} kind="kukar_mukha" scale={1.04} phase={1.3} />
      <DetailedSpiritRig x={1420 + marchX * 0.3} y={670} kind="gardabh_mukha" scale={1.04} phase={2.1} />
      <DetailedSpiritRig x={1690 + marchX * 0.3} y={685} kind="bahu_mukh" scale={1.02} phase={0.8} flipX />

      {frame > 410 && (
        <div
          style={{
            position: "absolute",
            top: 120,
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: interpolate(frame, [410, 445], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "12px 32px",
              borderRadius: 16,
              background: "rgba(28, 16, 48, 0.92)",
              border: "2px solid #fde047",
            }}
          >
            <div style={{ fontFamily: "'Yatra One', 'Noto Sans Devanagari', serif", fontSize: 38, color: "#fde047" }}>
              भाग ५ समाप्त • हिमालय नगरी पहुंची शिव की अद्भुत बारात!
            </div>
          </div>
        </div>
      )}
    </ParallaxStage>
  );
};

const P5_HUD: Record<string, { title: string; subtitle: string }> = {
  P5S01: { title: "१. प्रेतों की करुण पुकार", subtitle: "इंद्र के वज्र से व्यथित भूत-प्रेतों की कथा" },
  P5S02: { title: "२. दीनदयाल भोलेनाथ का वचन", subtitle: "महादेव के ब्याह में सब भूत-प्रेत बाराती बनेंगे!" },
  P5S03: { title: "३. मुखहीन, बहुमुख व बहुपाद सेना", subtitle: "तुलसीदास छंद के अनुरूप दिव्य प्रेत-रूप" },
  P5S04: { title: "४. विपुल नयन व रिष्ट-पुष्ट गण", subtitle: "चमकते बहुनयन व प्रचंड शिव-गण" },
  P5S05: { title: "५. हिमालय नगरी प्रस्थान", subtitle: "सूकर-कूकर-गर्दभ मुख गणों संग महा-बारात" },
};

export const MahadevBaratPart05: React.FC = () => {
  const frame = useCurrentFrame();
  const active = P5_SCENES.find((s) => frame >= s.startFrame && frame < s.startFrame + s.durationFrames) ?? P5_SCENES[0];
  const hud = P5_HUD[active.id];

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0714" }}>
      <Audio src={staticFile("audio/mahadev-barat-part05-master.mp3")} volume={1} />
      <Sequence from={P5_SCENES[0].startFrame} durationInFrames={P5_SCENES[0].durationFrames}>
        <P5S01PretCry gf={frame} />
      </Sequence>
      <Sequence from={P5_SCENES[1].startFrame} durationInFrames={P5_SCENES[1].durationFrames}>
        <P5S02Vachan gf={frame} />
      </Sequence>
      <Sequence from={P5_SCENES[2].startFrame} durationInFrames={P5_SCENES[2].durationFrames}>
        <P5S03MukhHeen gf={frame} />
      </Sequence>
      <Sequence from={P5_SCENES[3].startFrame} durationInFrames={P5_SCENES[3].durationFrames}>
        <P5S04NayanTan gf={frame} />
      </Sequence>
      <Sequence from={P5_SCENES[4].startFrame} durationInFrames={P5_SCENES[4].durationFrames}>
        <P5S05HimalayaMarch gf={frame} />
      </Sequence>

      <SceneTitleBanner
        title={hud.title}
        subtitle={hud.subtitle}
        localFrame={frame - active.startFrame}
        durationFrames={active.durationFrames}
      />
      <Part5Captions globalFrame={frame} />
    </AbsoluteFill>
  );
};
