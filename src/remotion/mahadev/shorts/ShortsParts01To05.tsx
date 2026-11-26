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
import { KamdevFlashbackBubble } from "../part2/KamdevAndHimalayaProps";
import { getSmoothVoP2, P2_SCENES, SUBTITLES_P2 } from "../part2/timelineP2";
import { MahadevBaratGroomRig } from "../part3/MahadevBaratGroomRig";
import { getSmoothVoP3, P3_SCENES, SUBTITLES_P3 } from "../part3/timelineP3";
import { NandiBullRig, PretCreatureRig, VajraLightning } from "../part4/BhootPretAndNandiRigs";
import { getSmoothVoP4, P4_SCENES, SUBTITLES_P4 } from "../part4/timelineP4";
import { getSmoothVoP5, P5_SCENES, SUBTITLES_P5 } from "../part5/timelineP5";
import { getSmoothVoEnergy, SCENES, SUBTITLES } from "../timeline";
import {
  CelestialCloudSeat,
  GroundShadow,
  ShortsBackdrop,
  ShortsCamera,
  ShortsCaptions,
  ShortsHeader,
  SHORTS_FPS,
} from "./ShortsChrome";

/* ============================================================================
   SHORT 01 (126s / 3780f) — Hook, Devaloka Prep, Apsaras, Vishnu, Shamshan & Ganas
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
        <ShortsCamera zoom={interpolate(f, [0, 180], [1.04, 1.13])}>
          <ShortsBackdrop mode={f < 115 ? "devaloka" : "shamshan"} />
          {f < 60 && (
            <>
              <CelestialCloudSeat x={540} y={840} scale={1.15} />
              <VishnuRig x={540} y={770} scale={1.36} withGaruda highlightItem="chakra" speakingEnergy={vo} />
              <DevaHelperRig x={240} y={1105} pose="cheer" scale={1.08} />
              <DevaHelperRig x={840} y={1105} pose="garland" scale={1.08} />
            </>
          )}
          {f >= 60 && f < 115 && (
            <>
              <CelestialCloudSeat x={350} y={830} scale={0.9} />
              <BrahmaRig x={350} y={760} scale={1.08} speakingEnergy={vo} />
              <CelestialCloudSeat x={730} y={895} scale={0.9} />
              <IndraOnAiravataRig x={730} y={835} scale={1.02} />
              <DevaHelperRig x={540} y={1130} pose="banner" scale={1.12} />
            </>
          )}
          {f >= 115 && (
            <>
              <GroundShadow x={320} y={1205} rx={90} />
              <GroundShadow x={760} y={1205} rx={90} />
              <DetailedSpiritRig x={320} y={1085} kind="shringi" scale={1.2} />
              <DetailedSpiritRig x={760} y={1085} kind="bhringi" scale={1.2} flipX />
            </>
          )}
        </ShortsCamera>
      </Sequence>

      {/* S01 Devaloka Preparation (180..630f) */}
      <Sequence from={180} durationInFrames={450}>
        <ShortsCamera zoom={1.04} panX={interpolate(f, [180, 630], [-18, 18])}>
          <ShortsBackdrop mode="devaloka" />
          <CelestialCloudSeat x={340} y={555} scale={0.85} withBeam={false} />
          <CelestialVimanaRig x={340} y={500} scale={1.0} />
          <CelestialCloudSeat x={750} y={635} scale={0.72} withBeam={false} />
          <CelestialVimanaRig x={750} y={590} scale={0.86} flipX />
          <GroundShadow x={285} y={1210} rx={78} />
          <GroundShadow x={540} y={1225} rx={82} />
          <GroundShadow x={795} y={1210} rx={78} />
          <DevaHelperRig x={285} y={1095} pose="cheer" scale={1.22} />
          <DevaHelperRig x={540} y={1115} pose="garland" scale={1.26} />
          <DevaHelperRig x={795} y={1095} pose="banner" scale={1.22} />
        </ShortsCamera>
      </Sequence>

      {/* S02 Apsara Dance & Mangal Vadya (630..1200f) */}
      <Sequence from={630} durationInFrames={570}>
        <ShortsCamera zoom={1.05}>
          <ShortsBackdrop mode="devaloka" />
          <GroundShadow x={365} y={960} rx={65} />
          <GroundShadow x={715} y={960} rx={65} />
          <CelestialMusicianRig x={365} y={855} scale={0.94} instrument="shankh" />
          <CelestialMusicianRig x={715} y={855} scale={0.94} instrument="shehnai" />
          <GroundShadow x={250} y={1225} rx={80} />
          <GroundShadow x={540} y={1235} rx={75} />
          <GroundShadow x={830} y={1225} rx={80} />
          <ApsaraRig x={250} y={1105} scale={1.2} colorScheme="gold" phase={0} />
          <CelestialMusicianRig x={540} y={1130} scale={1.12} instrument="dholak" />
          <ApsaraRig x={830} y={1105} scale={1.2} colorScheme="rose" phase={1.3} />
        </ShortsCamera>
      </Sequence>

      {/* S03 Vishnu on Garuda (1200..1860f) */}
      <Sequence from={1200} durationInFrames={660}>
        <ShortsCamera zoom={interpolate(f, [1200, 1860], [1.02, 1.1])}>
          <ShortsBackdrop mode="vishnu" />
          <CelestialCloudSeat x={540} y={810} scale={1.22} />
          <VishnuRig x={540} y={715} scale={1.36} withGaruda highlightItem="all" speakingEnergy={vo} />
          <GroundShadow x={250} y={1220} rx={72} />
          <GroundShadow x={830} y={1220} rx={72} />
          <DevaHelperRig x={250} y={1115} pose="cheer" scale={1.08} />
          <DevaHelperRig x={830} y={1115} pose="garland" scale={1.08} />
        </ShortsCamera>
      </Sequence>

      {/* S04 Brahma & Indra Arrive (1860..2160f) */}
      <Sequence from={1860} durationInFrames={300}>
        <ShortsCamera zoom={1.04}>
          <ShortsBackdrop mode="devaloka" />
          <CelestialCloudSeat x={350} y={760} scale={0.95} />
          <BrahmaRig x={350} y={690} scale={1.12} speakingEnergy={vo} />
          <CelestialCloudSeat x={735} y={825} scale={0.95} />
          <IndraOnAiravataRig x={735} y={765} scale={1.06} />
          <GroundShadow x={290} y={1210} rx={72} />
          <GroundShadow x={790} y={1210} rx={72} />
          <DevaHelperRig x={290} y={1110} pose="cheer" scale={1.1} />
          <DevaHelperRig x={790} y={1110} pose="banner" scale={1.1} />
        </ShortsCamera>
      </Sequence>

      {/* S05 Calm Mahadev in Shamshan (2160..2595f) */}
      <Sequence from={2160} durationInFrames={435}>
        <ShortsCamera zoom={1.06}>
          <ShortsBackdrop mode="shamshan" />
          <GroundShadow x={270} y={1195} rx={110} />
          <GroundShadow x={560} y={1215} rx={135} />
          <GroundShadow x={840} y={1195} rx={72} />
          <NandiBullRig x={270} y={1085} scale={1.05} />
          <MahadevRig x={560} y={1080} scale={1.32} pose="lounging" />
          <DetailedSpiritRig x={840} y={1095} kind="shringi" scale={1.05} flipX />
        </ShortsCamera>
      </Sequence>

      {/* S06 Vishnu Advises Mahadev to Dress Up (2595..3120f) */}
      <Sequence from={2595} durationInFrames={525}>
        <ShortsCamera zoom={1.05}>
          <ShortsBackdrop mode="shamshan" />
          <GroundShadow x={320} y={1205} rx={95} />
          <GroundShadow x={760} y={1205} rx={95} />
          <MahadevRig x={320} y={1065} scale={1.24} pose="sitting" speakingEnergy={vo * 0.2} />
          <VishnuRig x={760} y={1055} scale={1.22} flipX gestureMode="advising" speakingEnergy={vo} />
        </ShortsCamera>
      </Sequence>

      {/* S07 Shiv Ganas Shoo Devas & Claim Groom Prep (3120..3780f) */}
      <Sequence from={3120} durationInFrames={660}>
        <ShortsCamera zoom={1.04}>
          <ShortsBackdrop mode="shamshan" />
          <GroundShadow x={540} y={945} rx={88} />
          <MahadevRig x={540} y={845} scale={1.02} pose="sitting" speakingEnergy={f > 3500 ? vo : 0} />
          <GroundShadow x={300} y={1215} rx={88} />
          <GroundShadow x={780} y={1215} rx={88} />
          <ShivGanaRig x={300} y={1095} variant="shringi" scale={1.24} />
          <ShivGanaRig x={780} y={1095} variant="bhringi" scale={1.24} flipX />
        </ShortsCamera>
      </Sequence>

      <ShortsHeader partNumber={1} sceneLabel={active.label} progress={f / 3780} voEnergy={vo} />
      <ShortsCaptions subtitles={SUBTITLES} sec={sec} voEnergy={vo} partNumber={1} />
    </AbsoluteFill>
  );
};

/* ============================================================================
   SHORT 02 (110s / 3300f) — Kamdev Bhasma, Sasural Jest & Jata-Serpent Adornment
   ============================================================================ */
export const MahadevBaratShort02: React.FC = () => {
  const f = useCurrentFrame();
  const sec = f / SHORTS_FPS;
  const vo = getSmoothVoP2(f);
  const active = P2_SCENES.find((s) => f >= s.startFrame && f < s.startFrame + s.durationFrames) ?? P2_SCENES[P2_SCENES.length - 1];

  return (
    <AbsoluteFill style={{ backgroundColor: "#14071e" }}>
      <Audio src={staticFile("audio/mahadev-barat-part02-master.mp3")} />

      {/* P2S01-P2S02 Private Dialogue + Kamdev Bhasma Flashback (0..1350f) */}
      <Sequence from={0} durationInFrames={1350}>
        <ShortsCamera zoom={1.04}>
          <ShortsBackdrop mode="shamshan" />
          {f >= 480 && (
            <KamdevFlashbackBubble
              x={315}
              y={305}
              blastProgress={interpolate(f, [620, 960], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            />
          )}
          <GroundShadow x={320} y={1205} rx={95} />
          <GroundShadow x={760} y={1205} rx={95} />
          <VishnuRig x={320} y={1055} scale={1.22} gestureMode="advising" speakingEnergy={vo} />
          <MahadevRig x={760} y={1065} scale={1.22} pose="sitting" speakingEnergy={vo * 0.3} />
        </ShortsCamera>
      </Sequence>

      {/* P2S03 Himalaya Marriage Reminder (1350..2100f) */}
      <Sequence from={1350} durationInFrames={750}>
        <ShortsCamera zoom={1.05}>
          <ShortsBackdrop mode="himalaya" />
          <GroundShadow x={250} y={1205} rx={105} />
          <GroundShadow x={540} y={1220} rx={98} />
          <GroundShadow x={830} y={1205} rx={78} />
          <NandiBullRig x={250} y={1100} scale={0.98} />
          <MahadevRig x={540} y={1070} scale={1.28} pose="sitting" speakingEnergy={vo} />
          <DetailedSpiritRig x={830} y={1095} kind="shringi" scale={1.06} flipX />
        </ShortsCamera>
      </Sequence>

      {/* P2S04-P2S05 Jata Mukut, Tiger Skin & Live Serpents Grooming (2100..3300f) */}
      <Sequence from={2100} durationInFrames={1200}>
        <ShortsCamera zoom={interpolate(f, [2100, 3300], [1.02, 1.1])}>
          <ShortsBackdrop mode="shamshan" />
          <GroundShadow x={245} y={1210} rx={76} />
          <GroundShadow x={540} y={1225} rx={105} />
          <GroundShadow x={835} y={1210} rx={76} />
          <DetailedSpiritRig x={245} y={1100} kind="shringi" scale={1.1} />
          <MahadevBaratGroomRig
            x={540}
            y={1065}
            scale={1.32}
            sehraProgress={interpolate(f, [2250, 2650], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            bichhuProgress={interpolate(f, [2700, 3150], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            speakingEnergy={vo}
          />
          <DetailedSpiritRig x={835} y={1100} kind="bhringi" scale={1.1} flipX />
        </ShortsCamera>
      </Sequence>

      <ShortsHeader partNumber={2} sceneLabel={active.label} progress={f / 3300} voEnergy={vo} />
      <ShortsCaptions subtitles={SUBTITLES_P2} sec={sec} voEnergy={vo} partNumber={2} />
    </AbsoluteFill>
  );
};

/* ============================================================================
   SHORT 03 (90s / 2700f) — Serpent Sehra, Scorpions, 5-Hooded Naga & Hot Pyre Ash
   ============================================================================ */
export const MahadevBaratShort03: React.FC = () => {
  const f = useCurrentFrame();
  const sec = f / SHORTS_FPS;
  const vo = getSmoothVoP3(f);
  const active = P3_SCENES.find((s) => f >= s.startFrame && f < s.startFrame + s.durationFrames) ?? P3_SCENES[P3_SCENES.length - 1];

  return (
    <AbsoluteFill style={{ backgroundColor: "#14071e" }}>
      <Audio src={staticFile("audio/mahadev-barat-part03-master.mp3")} />

      {/* P3S01-P3S02 Serpent Sehra, Scorpion Earrings & 5-Hooded Serpent (0..1140f) */}
      <Sequence from={0} durationInFrames={1140}>
        <ShortsCamera zoom={1.06}>
          <ShortsBackdrop mode="shamshan" />
          <GroundShadow x={240} y={1210} rx={78} />
          <GroundShadow x={540} y={1225} rx={105} />
          <GroundShadow x={840} y={1210} rx={78} />
          <DetailedSpiritRig x={240} y={1100} kind="shringi" scale={1.1} />
          <MahadevBaratGroomRig
            x={540}
            y={1060}
            scale={1.34}
            sehraProgress={1}
            bichhuProgress={1}
            panchmukhiProgress={interpolate(f, [620, 980], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            speakingEnergy={vo}
          />
          <DetailedSpiritRig x={840} y={1100} kind="bhringi" scale={1.1} flipX />
        </ShortsCamera>
      </Sequence>

      {/* P3S03-P3S04 Hot Cremation Ash Rubbing (1140..1950f) */}
      <Sequence from={1140} durationInFrames={810}>
        <ShortsCamera zoom={1.06}>
          <ShortsBackdrop mode="shamshan" />
          <GroundShadow x={250} y={1210} rx={78} />
          <GroundShadow x={540} y={1225} rx={105} />
          <GroundShadow x={830} y={1210} rx={78} />
          <DetailedSpiritRig x={250} y={1100} kind="shringi" scale={1.1} />
          <MahadevBaratGroomRig
            x={540}
            y={1060}
            scale={1.34}
            sehraProgress={1}
            bichhuProgress={1}
            panchmukhiProgress={1}
            bhasmaGlowProgress={interpolate(f, [1300, 1700], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            speakingEnergy={vo}
          />
          <DetailedSpiritRig x={830} y={1100} kind="pret_kankal" scale={1.08} flipX />
        </ShortsCamera>
      </Sequence>

      {/* P3S05 Separate Deva Lines vs Mahadev Shamshan Lane (1950..2700f) */}
      <Sequence from={1950} durationInFrames={750}>
        <ShortsCamera zoom={1.04}>
          <ShortsBackdrop mode="devaloka" />
          <CelestialCloudSeat x={255} y={825} scale={0.78} withBeam={false} />
          <CelestialCloudSeat x={540} y={760} scale={0.84} withBeam={false} />
          <CelestialCloudSeat x={825} y={825} scale={0.78} withBeam={false} />
          <BrahmaRig x={255} y={770} scale={0.82} />
          <VishnuRig x={540} y={705} scale={0.85} />
          <IndraOnAiravataRig x={825} y={785} scale={0.76} />
          <GroundShadow x={245} y={1225} rx={76} />
          <GroundShadow x={540} y={1240} rx={100} />
          <GroundShadow x={835} y={1225} rx={76} />
          <DetailedSpiritRig x={245} y={1130} kind="dhol_gana" scale={1.08} />
          <MahadevBaratGroomRig x={540} y={1100} scale={1.22} sehraProgress={1} bichhuProgress={1} panchmukhiProgress={1} bhasmaGlowProgress={1} pose="marching" />
          <DetailedSpiritRig x={835} y={1130} kind="nagada_gana" scale={1.08} flipX />
        </ShortsCamera>
      </Sequence>

      <ShortsHeader partNumber={3} sceneLabel={active.label} progress={f / 2700} voEnergy={vo} />
      <ShortsCaptions subtitles={SUBTITLES_P3} sec={sec} voEnergy={vo} partNumber={3} />
    </AbsoluteFill>
  );
};

/* ============================================================================
   SHORT 04 (86s / 2580f) — Devas Barat, Summoning Prets & Indra Vajra Conflict
   ============================================================================ */
export const MahadevBaratShort04: React.FC = () => {
  const f = useCurrentFrame();
  const sec = f / SHORTS_FPS;
  const vo = getSmoothVoP4(f);
  const active = P4_SCENES.find((s) => f >= s.startFrame && f < s.startFrame + s.durationFrames) ?? P4_SCENES[P4_SCENES.length - 1];

  return (
    <AbsoluteFill style={{ backgroundColor: "#14071e" }}>
      <Audio src={staticFile("audio/mahadev-barat-part04-master.mp3")} />

      {/* P4S01 Devas Grand Barat Procession (0..540f) */}
      <Sequence from={0} durationInFrames={540}>
        <ShortsCamera zoom={1.04} panX={interpolate(f, [0, 540], [-18, 18])}>
          <ShortsBackdrop mode="devaloka" />
          <CelestialCloudSeat x={540} y={760} scale={1.15} />
          <VishnuRig x={540} y={670} scale={1.18} withGaruda highlightItem="all" />
          <GroundShadow x={250} y={1205} rx={72} />
          <GroundShadow x={540} y={1225} rx={72} />
          <GroundShadow x={830} y={1205} rx={72} />
          <DevaHelperRig x={250} y={1095} pose="cheer" scale={1.12} />
          <DevaHelperRig x={540} y={1115} pose="garland" scale={1.15} />
          <DevaHelperRig x={830} y={1095} pose="banner" scale={1.12} />
        </ShortsCamera>
      </Sequence>

      {/* P4S02 Mahadev Summons Shamshan Prets (540..1110f) */}
      <Sequence from={540} durationInFrames={570}>
        <ShortsCamera zoom={1.05}>
          <ShortsBackdrop mode="shamshan" />
          <GroundShadow x={240} y={1205} rx={76} />
          <GroundShadow x={540} y={1225} rx={105} />
          <GroundShadow x={840} y={1205} rx={76} />
          <DetailedSpiritRig x={240} y={1105} kind="pishacha" scale={1.1} />
          <MahadevBaratGroomRig x={540} y={1060} scale={1.32} sehraProgress={1} bichhuProgress={1} panchmukhiProgress={1} bhasmaGlowProgress={1} speakingEnergy={vo} />
          <DetailedSpiritRig x={840} y={1105} kind="vetala" scale={1.1} flipX />
        </ShortsCamera>
      </Sequence>

      {/* P4S03-P4S04 Ram Barat Flashback & Indra Vajra Blocking Prets (1110..2040f) */}
      <Sequence from={1110} durationInFrames={930}>
        <ShortsCamera zoom={1.04}>
          <ShortsBackdrop mode="shamshan" />
          <CelestialCloudSeat x={540} y={650} scale={1.12} />
          <IndraOnAiravataRig x={540} y={565} scale={1.1} />
          {f >= 1545 && <VajraLightning x={540} y={820} intensity={0.95} />}
          <GroundShadow x={280} y={1210} rx={72} />
          <GroundShadow x={540} y={1225} rx={72} />
          <GroundShadow x={800} y={1210} rx={72} />
          <PretCreatureRig x={280} y={1095} variant={f >= 1650 ? "weeping" : "classic"} scale={1.15} />
          <PretCreatureRig x={540} y={1110} variant={f >= 1650 ? "weeping" : "dakini"} scale={1.15} phase={0.8} />
          <PretCreatureRig x={800} y={1095} variant={f >= 1650 ? "weeping" : "pishachini"} scale={1.15} phase={1.6} />
        </ShortsCamera>
      </Sequence>

      {/* P4S05 Nandi Arrives with Mahadev Behind Weeping Prets (2040..2580f) */}
      <Sequence from={2040} durationInFrames={540}>
        <ShortsCamera zoom={1.05}>
          <ShortsBackdrop mode="shamshan" />
          <GroundShadow x={230} y={1215} rx={68} />
          <GroundShadow x={540} y={1225} rx={138} />
          <GroundShadow x={850} y={1215} rx={68} />
          <PretCreatureRig x={230} y={1115} variant="weeping" scale={1.06} />
          <NandiBullRig x={540} y={1080} scale={1.25} walking />
          <MahadevBaratGroomRig x={520} y={920} scale={1.1} seatedOnNandi sehraProgress={1} bichhuProgress={1} panchmukhiProgress={1} bhasmaGlowProgress={1} speakingEnergy={vo} />
          <PretCreatureRig x={850} y={1115} variant="weeping" scale={1.06} phase={1.1} />
        </ShortsCamera>
      </Sequence>

      <ShortsHeader partNumber={4} sceneLabel={active.label} progress={f / 2580} voEnergy={vo} />
      <ShortsCaptions subtitles={SUBTITLES_P4} sec={sec} voEnergy={vo} partNumber={4} />
    </AbsoluteFill>
  );
};

/* ============================================================================
   SHORT 05 (79s / 2370f) — Compassion for Prets, Multiform Ghosts & Dancing Chudails
   ============================================================================ */
export const MahadevBaratShort05: React.FC = () => {
  const f = useCurrentFrame();
  const sec = f / SHORTS_FPS;
  const vo = getSmoothVoP5(f);
  const active = P5_SCENES.find((s) => f >= s.startFrame && f < s.startFrame + s.durationFrames) ?? P5_SCENES[P5_SCENES.length - 1];

  return (
    <AbsoluteFill style={{ backgroundColor: "#14071e" }}>
      <Audio src={staticFile("audio/mahadev-barat-part05-master.mp3")} />

      {/* P5S01 Indra Halted & Mahadev Compassion (0..960f) */}
      <Sequence from={0} durationInFrames={960}>
        <ShortsCamera zoom={1.05}>
          <ShortsBackdrop mode="shamshan" />
          <CelestialCloudSeat x={540} y={645} scale={1.05} />
          <IndraOnAiravataRig x={540} y={565} scale={1.02} />
          <GroundShadow x={290} y={1210} rx={95} />
          <GroundShadow x={760} y={1210} rx={72} />
          <MahadevBaratGroomRig x={290} y={1060} scale={1.24} sehraProgress={1} bichhuProgress={1} panchmukhiProgress={1} bhasmaGlowProgress={1} speakingEnergy={vo} />
          <PretCreatureRig x={760} y={1100} variant="weeping" scale={1.12} />
        </ShortsCamera>
      </Sequence>

      {/* P5S02-P5S03 Headless, Multi-Head & Multi-Foot Army Grounded on Two Tiers (960..1680f) */}
      <Sequence from={960} durationInFrames={720}>
        <ShortsCamera zoom={1.04}>
          <ShortsBackdrop mode="shamshan" />
          <GroundShadow x={295} y={965} rx={68} />
          <GroundShadow x={785} y={965} rx={68} />
          <DetailedSpiritRig x={295} y={865} kind="mukh_heen" scale={0.96} />
          <DetailedSpiritRig x={785} y={865} kind="bahu_mukh" scale={0.96} flipX />
          <GroundShadow x={315} y={1220} rx={78} />
          <GroundShadow x={765} y={1220} rx={78} />
          <DetailedSpiritRig x={315} y={1105} kind="bahu_paad" scale={1.14} />
          <DetailedSpiritRig x={765} y={1105} kind="pret_kankal" scale={1.14} flipX />
        </ShortsCamera>
      </Sequence>

      {/* P5S04 London / Foreign Dancing Chudails + Mahadev Smiling from Terrace (1680..2370f) */}
      <Sequence from={1680} durationInFrames={690}>
        <ShortsCamera zoom={1.05}>
          <ShortsBackdrop mode="shamshan" />
          <GroundShadow x={540} y={950} rx={88} />
          <MahadevBaratGroomRig x={540} y={840} scale={1.0} sehraProgress={1} bichhuProgress={1} panchmukhiProgress={1} bhasmaGlowProgress={1} pose="calm" />
          <GroundShadow x={255} y={1220} rx={75} />
          <GroundShadow x={540} y={1230} rx={75} />
          <GroundShadow x={825} y={1220} rx={75} />
          <PretCreatureRig x={255} y={1100} variant="foreign_london" scale={1.14} />
          <PretCreatureRig x={540} y={1115} variant="london" scale={1.14} phase={0.8} />
          <PretCreatureRig x={825} y={1100} variant="weeping" scale={1.14} phase={1.6} />
        </ShortsCamera>
      </Sequence>

      <ShortsHeader partNumber={5} sceneLabel={active.label} progress={f / 2370} voEnergy={vo} />
      <ShortsCaptions subtitles={SUBTITLES_P5} sec={sec} voEnergy={vo} partNumber={5} />
    </AbsoluteFill>
  );
};
