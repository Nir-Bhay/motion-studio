import React from "react";
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import "@fontsource/noto-sans-devanagari/400.css";
import "@fontsource/noto-sans-devanagari/700.css";
import "@fontsource/yatra-one/400.css";
import { ApsaraRig, CelestialMusicianRig, CelestialVimanaRig, DevaHelperRig } from "../characters/ApsaraAndMusicians";
import { BrahmaRig, IndraOnAiravataRig } from "../characters/BrahmaIndraRigs";
import { DetailedSpiritRig } from "../characters/DetailedGanasAndSpirits";
import { MahadevRig } from "../characters/MahadevRig";
import { ShivGanaRig } from "../characters/ShivGanaRig";
import { VishnuRig } from "../characters/VishnuRig";
import { getSmoothVoEnergy, SCENES, SUBTITLES } from "../timeline";
import { KamdevFlashbackBubble, HimalayaFlipBubble } from "../part2/KamdevAndHimalayaProps";
import { MahadevGroomRig } from "../part2/MahadevGroomRig";
import { getSmoothVoP2, P2_SCENES, SUBTITLES_P2 } from "../part2/timelineP2";
import { MahadevBaratGroomRig } from "../part3/MahadevBaratGroomRig";
import { getSmoothVoP3, P3_SCENES, SUBTITLES_P3 } from "../part3/timelineP3";
import { NandiBullRig, PretCreatureRig, VajraLightning } from "../part4/BhootPretAndNandiRigs";
import { getSmoothVoP4, P4_SCENES, SUBTITLES_P4 } from "../part4/timelineP4";
import { getSmoothVoP5, P5_SCENES, SUBTITLES_P5 } from "../part5/timelineP5";
import { ShortsBackdrop, ShortsCamera, ShortsCaptions, ShortsHeader, SHORTS_FPS } from "./ShortsChrome";

/* ============================================================================
   SHORT 01 (126s / 3780f @ 30fps) — Devaloka Prep, Vishnu/Brahma/Indra, Shamshan & Gana Refusal
   ============================================================================ */
export const MahadevBaratShort01: React.FC = () => {
  const f = useCurrentFrame(); // 30fps
  const f60 = f * 2;          // map to 60fps SCENES / audio-sync.json
  const sec = f / SHORTS_FPS;
  const vo = getSmoothVoEnergy(f60);
  const active = SCENES.find((s) => sec >= s.startSec && sec < s.endSec) ?? SCENES[SCENES.length - 1];

  return (
    <AbsoluteFill style={{ backgroundColor: "#14071e" }}>
      <Audio src={staticFile("audio/mahadev-barat-2m-master.mp3")} />

      {/* S00 Hook (0..180f @ 30fps) */}
      <Sequence from={0} durationInFrames={180}>
        <ShortsCamera zoom={interpolate(f, [0, 180], [1.05, 1.15])}>
          <ShortsBackdrop mode={f < 90 ? "devaloka" : "shamshan"} />
          {f < 60 && <VishnuRig x={540} y={840} scale={1.45} withGaruda highlightItem="chakra" speakingEnergy={vo} />}
          {f >= 60 && f < 115 && (
            <>
              <BrahmaRig x={360} y={700} scale={1.15} speakingEnergy={vo} />
              <IndraOnAiravataRig x={720} y={1020} scale={1.1} />
            </>
          )}
          {f >= 115 && (
            <>
              <DetailedSpiritRig x={310} y={980} kind="shringi" scale={1.2} />
              <DetailedSpiritRig x={540} y={950} kind="bahu_mukh" scale={1.15} phase={1} />
              <DetailedSpiritRig x={770} y={980} kind="sukar_mukha" scale={1.2} phase={2} flipX />
            </>
          )}
        </ShortsCamera>
      </Sequence>

      {/* S01 Devaloka Prep (180..630f) */}
      <Sequence from={180} durationInFrames={450}>
        <ShortsCamera zoom={1.04} panX={interpolate(f, [180, 630], [-20, 20])}>
          <ShortsBackdrop mode="devaloka" />
          <CelestialVimanaRig x={360} y={530} scale={1.05} />
          <CelestialVimanaRig x={740} y={620} scale={0.9} flipX />
          <DevaHelperRig x={290} y={1030} pose="cheer" scale={1.25} />
          <DevaHelperRig x={540} y={1050} pose="garland" scale={1.3} />
          <DevaHelperRig x={790} y={1030} pose="banner" scale={1.25} />
        </ShortsCamera>
      </Sequence>

      {/* S02 Apsara Dance & Mangal Vadya (630..1200f) */}
      <Sequence from={630} durationInFrames={570}>
        <ShortsCamera zoom={1.06}>
          <ShortsBackdrop mode="devaloka" />
          <CelestialMusicianRig x={270} y={660} scale={1.08} instrument="shankh" />
          <CelestialMusicianRig x={810} y={660} scale={1.08} instrument="shehnai" />
          <ApsaraRig x={340} y={1040} scale={1.28} colorScheme="gold" phase={0} />
          <ApsaraRig x={740} y={1040} scale={1.28} colorScheme="rose" phase={1.3} />
          <CelestialMusicianRig x={540} y={1140} scale={1.12} instrument="dholak" />
        </ShortsCamera>
      </Sequence>

      {/* S03 Vishnu on Garuda (1200..1860f) */}
      <Sequence from={1200} durationInFrames={660}>
        <ShortsCamera zoom={interpolate(f, [1200, 1860], [1.02, 1.12])}>
          <ShortsBackdrop mode="vishnu" />
          <VishnuRig x={540} y={810} scale={1.42} withGaruda highlightItem="all" speakingEnergy={vo} />
          <DevaHelperRig x={240} y={1140} pose="cheer" scale={1.05} />
          <DevaHelperRig x={840} y={1140} pose="garland" scale={1.05} />
        </ShortsCamera>
      </Sequence>

      {/* S04 Brahma & Indra Arrive (1860..2160f) */}
      <Sequence from={1860} durationInFrames={300}>
        <ShortsCamera zoom={1.04}>
          <ShortsBackdrop mode="devaloka" />
          <BrahmaRig x={540} y={640} scale={1.25} speakingEnergy={vo} />
          <IndraOnAiravataRig x={540} y={1080} scale={1.28} />
        </ShortsCamera>
      </Sequence>

      {/* S05 Shamshan Mahadev Lounging (2160..2595f) */}
      <Sequence from={2160} durationInFrames={435}>
        <ShortsCamera zoom={interpolate(f, [2160, 2595], [1.06, 1.18])}>
          <ShortsBackdrop mode="shamshan" />
          <MahadevRig x={540} y={960} scale={1.48} pose="lounging" speakingEnergy={vo} />
        </ShortsCamera>
      </Sequence>

      {/* S06 Vishnu Advises Mahadev (2595..3120f) */}
      <Sequence from={2595} durationInFrames={525}>
        <ShortsCamera zoom={1.05} panX={interpolate(f, [2595, 3120], [15, -15])}>
          <ShortsBackdrop mode="shamshan" />
          <VishnuRig x={315} y={920} scale={1.22} gestureMode="advising" speakingEnergy={vo} />
          <MahadevRig
            x={770}
            y={960}
            scale={1.22}
            pose="sitting"
            dreamOverlay={f > 2860 ? "all" : f > 2740 ? "sehra" : "none"}
          />
        </ShortsCamera>
      </Sequence>

      {/* S07 Ganas Protest (3120..3780f) */}
      <Sequence from={3120} durationInFrames={660}>
        <ShortsCamera zoom={1.04}>
          <ShortsBackdrop mode="shamshan" />
          <MahadevRig x={540} y={680} scale={1.1} pose="sitting" />
          <ShivGanaRig x={270} y={1070} variant="shringi" scale={1.25} />
          <ShivGanaRig x={540} y={1085} variant="drummer" scale={1.25} phase={1.2} />
          <ShivGanaRig x={810} y={1070} variant="bhringi" scale={1.25} flipX />
        </ShortsCamera>
      </Sequence>

      <ShortsHeader partNumber={1} sceneLabel={active.label} progress={f / 3780} voEnergy={vo} />
      <ShortsCaptions subtitles={SUBTITLES} sec={sec} voEnergy={vo} partNumber={1} />
    </AbsoluteFill>
  );
};

/* ============================================================================
   SHORT 02 (110s / 3300f) — Ekant Samvad, Kamdev Bhasm, Himalaya Joke, Jata Mukut & Baghambar
   ============================================================================ */
export const MahadevBaratShort02: React.FC = () => {
  const f = useCurrentFrame();
  const sec = f / SHORTS_FPS;
  const vo = getSmoothVoP2(f);
  const active = P2_SCENES.find((s) => f >= s.startFrame && f < s.startFrame + s.durationFrames) ?? P2_SCENES[P2_SCENES.length - 1];

  return (
    <AbsoluteFill style={{ backgroundColor: "#14071e" }}>
      <Audio src={staticFile("audio/mahadev-barat-part02-master.mp3")} />

      {/* P2S01 Ekant Samvad (0..345f) */}
      <Sequence from={0} durationInFrames={345}>
        <ShortsCamera zoom={1.06}>
          <ShortsBackdrop mode="shamshan" />
          <VishnuRig x={315} y={930} scale={1.24} gestureMode="advising" speakingEnergy={vo} />
          <MahadevGroomRig x={770} y={965} scale={1.24} gesture="calm" />
        </ShortsCamera>
      </Sequence>

      {/* P2S02 Kamdev Bhasm Flashback (345..1230f) */}
      <Sequence from={345} durationInFrames={885}>
        <ShortsCamera zoom={1.05}>
          <ShortsBackdrop mode="shamshan" />
          <KamdevFlashbackBubble
            x={540}
            y={540}
            blastProgress={interpolate(f, [620, 960], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          />
          <VishnuRig x={310} y={1020} scale={1.18} gestureMode="advising" speakingEnergy={vo * 0.7} />
          <MahadevGroomRig
            x={775}
            y={1030}
            scale={1.18}
            thirdEyeBeam={interpolate(f, [600, 740, 880], [0, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            speakingEnergy={vo * 0.4}
          />
        </ShortsCamera>
      </Sequence>

      {/* P2S03 Sasural & Himalaya Flip Joke (1230..1995f) */}
      <Sequence from={1230} durationInFrames={765}>
        <ShortsCamera zoom={1.04}>
          <ShortsBackdrop mode="shamshan" />
          <HimalayaFlipBubble
            x={540}
            y={530}
            tiltDeg={interpolate(f, [1460, 1700], [0, 180], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
          />
          <VishnuRig x={310} y={1020} scale={1.18} gestureMode="chuckling" speakingEnergy={vo * 0.6} />
          <MahadevGroomRig x={775} y={1030} scale={1.18} gesture="mischievous" speakingEnergy={vo} />
        </ShortsCamera>
      </Sequence>

      {/* P2S04-P2S06 Shringar: Ganas + Jata Mukut + Baghambar & Living Serpent Belt (1995..3300f) */}
      <Sequence from={1995} durationInFrames={1305}>
        <ShortsCamera zoom={interpolate(f, [2370, 3300], [1.04, 1.24], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>
          <ShortsBackdrop mode="shamshan" />
          <ShivGanaRig x={245} y={1070} variant="shringi" scale={1.18} />
          <MahadevGroomRig
            x={540}
            y={940}
            scale={1.48}
            jataCrownProgress={interpolate(f, [2370, 2650], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            baghambarProgress={interpolate(f, [2790, 2980], [0.35, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            waistSerpent={interpolate(f, [2940, 3100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            headSerpent={interpolate(f, [3060, 3220], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            gesture="heroic"
          />
          <ShivGanaRig x={835} y={1070} variant="bhringi" scale={1.18} flipX />
        </ShortsCamera>
      </Sequence>

      <ShortsHeader partNumber={2} sceneLabel={active.label} progress={f / 3300} voEnergy={vo} />
      <ShortsCaptions subtitles={SUBTITLES_P2} sec={sec} voEnergy={vo} partNumber={2} />
    </AbsoluteFill>
  );
};

/* ============================================================================
   SHORT 03 (90s / 2700f) — Sarp Sehra, Bichhu Earrings, Panchmukhi Naga, Chita Bhasma & Lanes
   ============================================================================ */
export const MahadevBaratShort03: React.FC = () => {
  const f = useCurrentFrame();
  const sec = f / SHORTS_FPS;
  const vo = getSmoothVoP3(f);
  const active = P3_SCENES.find((s) => f >= s.startFrame && f < s.startFrame + s.durationFrames) ?? P3_SCENES[P3_SCENES.length - 1];

  return (
    <AbsoluteFill style={{ backgroundColor: "#14071e" }}>
      <Audio src={staticFile("audio/mahadev-barat-part03-master.mp3")} />

      {/* P3S01-P3S04 Groom Transformation Close-Up (0..1710f) */}
      <Sequence from={0} durationInFrames={1710}>
        <ShortsCamera zoom={interpolate(f, [0, 1710], [1.06, 1.18])}>
          <ShortsBackdrop mode="shamshan" />
          <DetailedSpiritRig x={220} y={1080} kind="shringi" scale={1.08} />
          <MahadevBaratGroomRig
            x={540}
            y={920}
            scale={1.55}
            sehraProgress={interpolate(f, [0, 260], [0, 1], { extrapolateRight: "clamp" })}
            bichhuProgress={interpolate(f, [366, 620], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            panchmukhiProgress={interpolate(f, [750, 1020], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            bhasmaGlowProgress={interpolate(f, [1320, 1650], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            speakingEnergy={vo}
            pose="heroic"
          />
          <DetailedSpiritRig x={860} y={1080} kind="bhringi" scale={1.08} flipX />
        </ShortsCamera>
      </Sequence>

      {/* P3S05 Vishnu Astonished ("जयजयकार नहीं, हाहाकार होगी!") (1710..2190f) */}
      <Sequence from={1710} durationInFrames={480}>
        <ShortsCamera zoom={1.05}>
          <ShortsBackdrop mode="shamshan" />
          <VishnuRig x={315} y={910} scale={1.22} gestureMode="chuckling" speakingEnergy={vo} />
          <MahadevBaratGroomRig x={770} y={950} scale={1.28} sehraProgress={1} bichhuProgress={1} panchmukhiProgress={1} bhasmaGlowProgress={1} />
        </ShortsCamera>
      </Sequence>

      {/* P3S06 Separate Deva & Mahadev Lanes (2190..2700f) */}
      <Sequence from={2190} durationInFrames={510}>
        <ShortsCamera zoom={1.04}>
          <ShortsBackdrop mode="devaloka" />
          <VishnuRig x={270} y={580} scale={0.95} withGaruda />
          <BrahmaRig x={540} y={590} scale={0.95} />
          <IndraOnAiravataRig x={820} y={620} scale={0.9} />
          <MahadevBaratGroomRig x={540} y={1030} scale={1.26} sehraProgress={1} bichhuProgress={1} panchmukhiProgress={1} bhasmaGlowProgress={1} pose="marching" />
          <DetailedSpiritRig x={250} y={1100} kind="shringi" scale={1.05} />
          <DetailedSpiritRig x={830} y={1100} kind="bhringi" scale={1.05} flipX />
        </ShortsCamera>
      </Sequence>

      <ShortsHeader partNumber={3} sceneLabel={active.label} progress={f / 2700} voEnergy={vo} />
      <ShortsCaptions subtitles={SUBTITLES_P3} sec={sec} voEnergy={vo} partNumber={3} />
    </AbsoluteFill>
  );
};

/* ============================================================================
   SHORT 04 (86s / 2580f) — 10-5 Ganas, Global Spirits, Ram Barat & Indra Vajra, Nandi Arrival
   ============================================================================ */
export const MahadevBaratShort04: React.FC = () => {
  const f = useCurrentFrame();
  const sec = f / SHORTS_FPS;
  const vo = getSmoothVoP4(f);
  const active = P4_SCENES.find((s) => f >= s.startFrame && f < s.startFrame + s.durationFrames) ?? P4_SCENES[P4_SCENES.length - 1];

  return (
    <AbsoluteFill style={{ backgroundColor: "#14071e" }}>
      <Audio src={staticFile("audio/mahadev-barat-part04-master.mp3")} />

      {/* P4S01 Tiny 10-5 Gana Group Behind Grand Devas (0..606f) */}
      <Sequence from={0} durationInFrames={606}>
        <ShortsCamera zoom={1.04}>
          <ShortsBackdrop mode="devaloka" />
          <VishnuRig x={310} y={580} scale={0.95} withGaruda />
          <BrahmaRig x={770} y={590} scale={0.95} />
          <MahadevBaratGroomRig x={540} y={1020} scale={1.25} sehraProgress={1} bichhuProgress={1} panchmukhiProgress={1} bhasmaGlowProgress={1} />
          <DetailedSpiritRig x={270} y={1100} kind="shringi" scale={1.05} />
          <DetailedSpiritRig x={810} y={1100} kind="bhringi" scale={1.05} flipX />
        </ShortsCamera>
      </Sequence>

      {/* P4S02 Summon Spirits from Every Shamshan & Foreign Lands (606..1110f) */}
      <Sequence from={606} durationInFrames={504}>
        <ShortsCamera zoom={1.06}>
          <ShortsBackdrop mode="shamshan" />
          <MahadevBaratGroomRig x={540} y={760} scale={1.25} sehraProgress={1} bichhuProgress={1} panchmukhiProgress={1} bhasmaGlowProgress={1} speakingEnergy={vo} />
          <DetailedSpiritRig x={240} y={1100} kind="foreign_pret_tophat" scale={1.12} />
          <DetailedSpiritRig x={540} y={1110} kind="dakini" scale={1.12} phase={1.1} />
          <DetailedSpiritRig x={840} y={1100} kind="foreign_pret_cowboy" scale={1.12} flipX />
        </ShortsCamera>
      </Sequence>

      {/* P4S03-P4S04 Ram Barat Flashback & Indra Vajra Blocking Prets (1110..2040f) */}
      <Sequence from={1110} durationInFrames={930}>
        <ShortsCamera zoom={1.04}>
          <ShortsBackdrop mode="shamshan" />
          <IndraOnAiravataRig x={540} y={560} scale={1.12} />
          {f >= 1545 && <VajraLightning x={540} y={780} intensity={0.95} />}
          <PretCreatureRig x={280} y={1080} variant={f >= 1650 ? "weeping" : "classic"} scale={1.15} />
          <PretCreatureRig x={540} y={1095} variant={f >= 1650 ? "weeping" : "dakini"} scale={1.15} phase={0.8} />
          <PretCreatureRig x={800} y={1080} variant={f >= 1650 ? "weeping" : "pishachini"} scale={1.15} phase={1.6} />
        </ShortsCamera>
      </Sequence>

      {/* P4S05 Nandi Arrives with Mahadev Behind Weeping Prets (2040..2580f) */}
      <Sequence from={2040} durationInFrames={540}>
        <ShortsCamera zoom={1.06}>
          <ShortsBackdrop mode="shamshan" />
          <NandiBullRig x={520} y={960} scale={1.32} walking />
          <MahadevBaratGroomRig x={500} y={790} scale={1.16} seatedOnNandi sehraProgress={1} bichhuProgress={1} panchmukhiProgress={1} bhasmaGlowProgress={1} speakingEnergy={vo} />
          <PretCreatureRig x={230} y={1130} variant="weeping" scale={1.05} />
          <PretCreatureRig x={850} y={1130} variant="weeping" scale={1.05} phase={1.1} />
        </ShortsCamera>
      </Sequence>

      <ShortsHeader partNumber={4} sceneLabel={active.label} progress={f / 2580} voEnergy={vo} />
      <ShortsCaptions subtitles={SUBTITLES_P4} sec={sec} voEnergy={vo} partNumber={4} />
    </AbsoluteFill>
  );
};

/* ============================================================================
   SHORT 05 (79s / 2370f) — Compassion Promise & Amazing Weird Spirit Army Parade
   ============================================================================ */
export const MahadevBaratShort05: React.FC = () => {
  const f = useCurrentFrame();
  const sec = f / SHORTS_FPS;
  const vo = getSmoothVoP5(f);
  const active = P5_SCENES.find((s) => f >= s.startFrame && f < s.startFrame + s.durationFrames) ?? P5_SCENES[P5_SCENES.length - 1];

  return (
    <AbsoluteFill style={{ backgroundColor: "#14071e" }}>
      <Audio src={staticFile("audio/mahadev-barat-part05-master.mp3")} />

      {/* P5S01-P5S02 Compassionate Mahadev Consoling & Promising Prets (0..930f) */}
      <Sequence from={0} durationInFrames={930}>
        <ShortsCamera zoom={1.06}>
          <ShortsBackdrop mode="shamshan" />
          <NandiBullRig x={540} y={940} scale={1.28} />
          <MahadevBaratGroomRig x={520} y={770} scale={1.14} seatedOnNandi sehraProgress={1} bichhuProgress={1} panchmukhiProgress={1} bhasmaGlowProgress={1} speakingEnergy={vo} />
          <DetailedSpiritRig x={240} y={1120} kind="pishacha" scale={1.08} />
          <DetailedSpiritRig x={840} y={1120} kind="vetala" scale={1.08} flipX />
        </ShortsCamera>
      </Sequence>

      {/* P5S03 Mukh-heen, Bahu-mukh, Bahu-paad Parade (930..1470f) */}
      <Sequence from={930} durationInFrames={540}>
        <ShortsCamera zoom={1.05}>
          <ShortsBackdrop mode="shamshan" />
          <DetailedSpiritRig x={310} y={660} kind="mukh_heen" scale={1.15} />
          <DetailedSpiritRig x={770} y={660} kind="bahu_mukh" scale={1.15} />
          <DetailedSpiritRig x={330} y={1080} kind="bahu_paad" scale={1.18} />
          <DetailedSpiritRig x={760} y={1080} kind="crawl_pret" scale={1.18} flipX />
        </ShortsCamera>
      </Sequence>

      {/* P5S04 Bahu-nayan, Vishal Pramath & Thin Kankal (1470..1845f) */}
      <Sequence from={1470} durationInFrames={375}>
        <ShortsCamera zoom={1.06}>
          <ShortsBackdrop mode="shamshan" />
          <DetailedSpiritRig x={280} y={980} kind="bahu_nayan" scale={1.2} />
          <DetailedSpiritRig x={540} y={960} kind="vishal_pramath" scale={1.32} />
          <DetailedSpiritRig x={820} y={1000} kind="pret_kankal" scale={1.14} flipX />
        </ShortsCamera>
      </Sequence>

      {/* P5S05 Sukar / Kukar / Gardabh Spirits Marching to Himalaya (1845..2370f) */}
      <Sequence from={1845} durationInFrames={525}>
        <ShortsCamera zoom={1.04}>
          <ShortsBackdrop mode="himalaya" />
          <MahadevBaratGroomRig x={540} y={760} scale={1.22} sehraProgress={1} bichhuProgress={1} panchmukhiProgress={1} bhasmaGlowProgress={1} pose="marching" />
          <DetailedSpiritRig x={250} y={1100} kind="sukar_mukha" scale={1.15} />
          <DetailedSpiritRig x={540} y={1110} kind="kukar_mukha" scale={1.15} />
          <DetailedSpiritRig x={830} y={1100} kind="gardabh_mukha" scale={1.15} flipX />
        </ShortsCamera>
      </Sequence>

      <ShortsHeader partNumber={5} sceneLabel={active.label} progress={f / 2370} voEnergy={vo} />
      <ShortsCaptions subtitles={SUBTITLES_P5} sec={sec} voEnergy={vo} partNumber={5} />
    </AbsoluteFill>
  );
};
