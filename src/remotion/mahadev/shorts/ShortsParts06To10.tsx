import React from "react";
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import "@fontsource/noto-sans-devanagari/400.css";
import "@fontsource/noto-sans-devanagari/700.css";
import "@fontsource/yatra-one/400.css";
import { ApsaraRig, CelestialMusicianRig } from "../characters/ApsaraAndMusicians";
import { BrahmaRig, IndraOnAiravataRig } from "../characters/BrahmaIndraRigs";
import { DetailedSpiritRig } from "../characters/DetailedGanasAndSpirits";
import { MahadevRig } from "../characters/MahadevRig";
import { VishnuRig } from "../characters/VishnuRig";
import { MahadevBaratGroomRig } from "../part3/MahadevBaratGroomRig";
import { NandiBullRig } from "../part4/BhootPretAndNandiRigs";
import { ElephantMountDevaRig, MainaDeviRig, MouseMountGanaRig, SakhiBandRig } from "../part6/HimalayaNagariRigs";
import { getSmoothVoP6, P6_SCENES, SUBTITLES_P6 } from "../part6/timelineP6";
import { NaradMuniRig, PitambariBaratiCrowd, TossedSerpentArc } from "../part7/NaradMuniRig";
import { getSmoothVoP7, P7_SCENES, SUBTITLES_P7 } from "../part7/timelineP7";
import { HeadlessBaratiRig, HimachaliChildRig, VillageHouseDoorRig, WorriedParentRig } from "../part8/HimachalVillageRigs";
import { getSmoothVoP8, P8_SCENES, SUBTITLES_P8 } from "../part8/timelineP8";
import { MahadevReverseNandiRig, MainaFaintRig, SharbatStationRig } from "../part9/SharbatAndMurchhaRigs";
import { getSmoothVoP9, P9_SCENES, SUBTITLES_P9 } from "../part9/timelineP9";
import { DivyaSaumyaMahadevRig, HimavantRig, MataParvatiBridalRig } from "../part10/DivyaVivahRigs";
import { getSmoothVoP10, P10_SCENES, SUBTITLES_P10 } from "../part10/timelineP10";
import {
  CelestialCloudSeat,
  GroundShadow,
  HavanKundProp,
  ShortsBackdrop,
  ShortsCamera,
  ShortsCaptions,
  ShortsHeader,
  SHORTS_FPS,
} from "./ShortsChrome";

/* ============================================================================
   SHORT 06 (95s / 2850f) — Karal Pret Procession, Bhajan, Mounts, Mainavati & Sakhis
   ============================================================================ */
export const MahadevBaratShort06: React.FC = () => {
  const f = useCurrentFrame();
  const sec = f / SHORTS_FPS;
  const vo = getSmoothVoP6(f);
  const active = P6_SCENES.find((s) => f >= s.startFrame && f < s.startFrame + s.durationFrames) ?? P6_SCENES[P6_SCENES.length - 1];

  return (
    <AbsoluteFill style={{ backgroundColor: "#14071e" }}>
      <Audio src={staticFile("audio/mahadev-barat-part06-master.mp3")} />

      {/* P6S01 Karal Pret Jamaat Marching Down Two Connected Tiers (0..570f) */}
      <Sequence from={0} durationInFrames={570}>
        <ShortsCamera zoom={1.05}>
          <ShortsBackdrop mode="shamshan" />
          <GroundShadow x={290} y={965} rx={68} />
          <GroundShadow x={790} y={965} rx={68} />
          <DetailedSpiritRig x={290} y={865} kind="khag_mukha" scale={0.96} />
          <DetailedSpiritRig x={790} y={865} kind="shrigal_mukha" scale={0.96} flipX />
          <GroundShadow x={315} y={1220} rx={78} />
          <GroundShadow x={765} y={1220} rx={78} />
          <DetailedSpiritRig x={315} y={1105} kind="kukar_mukha" scale={1.15} />
          <DetailedSpiritRig x={765} y={1105} kind="asura_senapati" scale={1.15} flipX />
        </ShortsCamera>
      </Sequence>

      {/* P6S02 Bhajan: Aai Shankar Ki Baratiya (570..1155f) */}
      <Sequence from={570} durationInFrames={585}>
        <ShortsCamera zoom={1.05}>
          <ShortsBackdrop mode="himalaya" />
          {/* Mahadev leading on Upper Terrace Steps, Musicians dancing in front on Courtyard */}
          <GroundShadow x={540} y={965} rx={92} />
          <MahadevBaratGroomRig x={540} y={845} scale={1.06} sehraProgress={1} bichhuProgress={1} panchmukhiProgress={1} bhasmaGlowProgress={1} pose="marching" />
          <GroundShadow x={245} y={1215} rx={72} />
          <GroundShadow x={540} y={1225} rx={75} />
          <GroundShadow x={835} y={1215} rx={72} />
          <DetailedSpiritRig x={245} y={1110} kind="dhol_gana" scale={1.12} />
          <DetailedSpiritRig x={540} y={1125} kind="nagada_gana" scale={1.12} />
          <DetailedSpiritRig x={835} y={1110} kind="shringi" scale={1.12} flipX />
        </ShortsCamera>
      </Sequence>

      {/* P6S03 Old Bull, Mouse Mount & Elephant Mount Riders on Courtyard Road (1155..1755f) */}
      <Sequence from={1155} durationInFrames={600}>
        <ShortsCamera zoom={1.04}>
          <ShortsBackdrop mode="himalaya" />
          <GroundShadow x={540} y={980} rx={125} />
          <NandiBullRig x={540} y={870} scale={1.05} walking />
          <MahadevBaratGroomRig x={522} y={735} scale={0.94} seatedOnNandi sehraProgress={1} bichhuProgress={1} panchmukhiProgress={1} bhasmaGlowProgress={1} />
          <GroundShadow x={295} y={1215} rx={95} />
          <GroundShadow x={785} y={1215} rx={110} />
          <MouseMountGanaRig x={295} y={1120} scale={1.08} />
          <ElephantMountDevaRig x={785} y={1095} scale={1.04} />
        </ShortsCamera>
      </Sequence>

      {/* P6S04 Mainavati Aarti Thali Dismay Face-to-Face at Palace Gate (1755..2295f) */}
      <Sequence from={1755} durationInFrames={540}>
        <ShortsCamera zoom={1.05}>
          <ShortsBackdrop mode="palace" />
          <GroundShadow x={315} y={1210} rx={95} />
          <GroundShadow x={765} y={1210} rx={95} />
          <MahadevBaratGroomRig x={315} y={1060} scale={1.22} sehraProgress={1} bichhuProgress={1} panchmukhiProgress={1} bhasmaGlowProgress={1} />
          <MainaDeviRig x={765} y={1075} scale={1.24} mood="shocked" speakingEnergy={vo} />
        </ShortsCamera>
      </Sequence>

      {/* P6S05 Sakhis Demanding Neg at Doorway (2295..2850f) */}
      <Sequence from={2295} durationInFrames={555}>
        <ShortsCamera zoom={1.04}>
          <ShortsBackdrop mode="palace" />
          {/* Mahadev waiting on Palace Steps while 4 Sakhis block Courtyard Door */}
          <GroundShadow x={540} y={965} rx={88} />
          <MahadevBaratGroomRig x={540} y={845} scale={1.02} sehraProgress={1} bichhuProgress={1} panchmukhiProgress={1} bhasmaGlowProgress={1} />
          <GroundShadow x={540} y={1225} rx={360} />
          <SakhiBandRig x={540} y={1135} scale={1.12} askingNeg />
        </ShortsCamera>
      </Sequence>

      <ShortsHeader partNumber={6} sceneLabel={active.label} progress={f / 2850} voEnergy={vo} />
      <ShortsCaptions subtitles={SUBTITLES_P6} sec={sec} voEnergy={vo} partNumber={6} />
    </AbsoluteFill>
  );
};

/* ============================================================================
   SHORT 07 (107s / 3210f) — Salis Neg vs Nag, Decorated Himalaya, Vishnu on Garuda, Maina & Narad
   ============================================================================ */
export const MahadevBaratShort07: React.FC = () => {
  const f = useCurrentFrame();
  const sec = f / SHORTS_FPS;
  const vo = getSmoothVoP7(f);
  const active = P7_SCENES.find((s) => sec >= s.startSec && sec < s.endSec) ?? P7_SCENES[P7_SCENES.length - 1];

  return (
    <AbsoluteFill style={{ backgroundColor: "#14071e" }}>
      <Audio src={staticFile("audio/mahadev-barat-part07-master.mp3")} />

      {/* P7S01-S02 Salis Neg vs Nag Comedy & Tossed Serpents (0..960f) */}
      <Sequence from={0} durationInFrames={960}>
        <ShortsCamera zoom={1.04}>
          <ShortsBackdrop mode="palace" />
          {/* Mahadev & Shringi on Palace Steps, Sakhis blocking in Foreground */}
          <GroundShadow x={335} y={965} rx={82} />
          <GroundShadow x={760} y={965} rx={68} />
          <MahadevBaratGroomRig x={335} y={850} scale={1.0} sehraProgress={1} bichhuProgress={1} panchmukhiProgress={1} bhasmaGlowProgress={1} />
          <DetailedSpiritRig x={760} y={865} kind="shringi" scale={0.96} flipX />
          <GroundShadow x={540} y={1225} rx={340} />
          <SakhiBandRig
            x={540 + interpolate(f, [620, 920], [0, 520], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            y={1145}
            scale={1.08}
            askingNeg={f < 580}
            panic={f >= 580}
          />
          {f > 540 && (
            <>
              <TossedSerpentArc startX={360} startY={830} endX={710} endY={1100} progress={Math.min(1, (f - 540) / 140)} />
              <TossedSerpentArc startX={400} startY={850} endX={340} endY={1110} progress={Math.min(1, (f - 570) / 140)} color="#16a34a" />
            </>
          )}
        </ShortsCamera>
      </Sequence>

      {/* P7S03-S04 Decorated Himalaya & Maina/Narad Waiting Face-to-Face (960..1740f) */}
      <Sequence from={960} durationInFrames={780}>
        <ShortsCamera zoom={1.05}>
          <ShortsBackdrop mode="palace" />
          <GroundShadow x={335} y={1210} rx={95} />
          <GroundShadow x={755} y={1210} rx={92} />
          <MainaDeviRig x={335} y={1070} scale={1.24} mood="welcome" speakingEnergy={vo * 0.6} />
          <NaradMuniRig x={755} y={1055} scale={1.22} gesture="explaining" speakingEnergy={vo} flipX />
        </ShortsCamera>
      </Sequence>

      {/* P7S05-S06 Vishnu Descending on Clouds Above Terrace Pitambari Crowd + Maina & Narad Below (1740..3210f) */}
      <Sequence from={1740} durationInFrames={1470}>
        <ShortsCamera zoom={interpolate(f, [2280, 3210], [1.02, 1.08], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>
          <ShortsBackdrop mode="palace" />
          <CelestialCloudSeat x={540} y={635} scale={1.12} />
          <VishnuRig
            x={540}
            y={interpolate(f, [1740, 2100], [420, 545], { extrapolateRight: "clamp" })}
            scale={1.08}
            withGaruda
            highlightItem="all"
          />
          {/* Pitambari Crowd marching neatly on Upper Palace Terrace */}
          <PitambariBaratiCrowd baseX={365} y={935} />
          {/* Maina & Narad watching in Foreground Courtyard */}
          <GroundShadow x={320} y={1215} rx={92} />
          <GroundShadow x={765} y={1215} rx={90} />
          <MainaDeviRig x={320} y={1085} scale={1.18} mood="welcome" speakingEnergy={f < 2750 ? vo : 0} />
          <NaradMuniRig x={765} y={1070} scale={1.18} gesture={f >= 2750 ? "denying" : "explaining"} speakingEnergy={f >= 2750 ? vo : 0} flipX />
        </ShortsCamera>
      </Sequence>

      <ShortsHeader partNumber={7} sceneLabel={active.label} progress={f / 3210} voEnergy={vo} />
      <ShortsCaptions subtitles={SUBTITLES_P7} sec={sec} voEnergy={vo} partNumber={7} />
    </AbsoluteFill>
  );
};

/* ============================================================================
   SHORT 08 (114s / 3420f) — Brahma & Indra Confusion, Kids Running Home & Headless Knock
   ============================================================================ */
export const MahadevBaratShort08: React.FC = () => {
  const f = useCurrentFrame();
  const sec = f / SHORTS_FPS;
  const vo = getSmoothVoP8(f);
  const active = P8_SCENES.find((s) => sec >= s.startSec && sec < s.endSec) ?? P8_SCENES[P8_SCENES.length - 1];

  return (
    <AbsoluteFill style={{ backgroundColor: "#14071e" }}>
      <Audio src={staticFile("audio/mahadev-barat-part08-master.mp3")} />

      {/* P8S01 Brahma 4-Head Confusion on Lotus Cloud Above Maina & Narad (0..690f) */}
      <Sequence from={0} durationInFrames={690}>
        <ShortsCamera zoom={1.04}>
          <ShortsBackdrop mode="palace" />
          <CelestialCloudSeat x={540} y={660} scale={1.08} />
          <BrahmaRig x={540} y={580} scale={1.1} speakingEnergy={vo * 0.4} />
          <GroundShadow x={330} y={1215} rx={92} />
          <GroundShadow x={765} y={1215} rx={90} />
          <MainaDeviRig x={330} y={1085} scale={1.18} mood="welcome" speakingEnergy={f < 420 ? vo : 0} />
          <NaradMuniRig x={765} y={1070} scale={1.18} gesture={f >= 420 ? "denying" : "explaining"} speakingEnergy={f >= 420 ? vo : 0} flipX />
        </ShortsCamera>
      </Sequence>

      {/* P8S02 Indra on Airavata Cloud Above Maina & Narad (690..1320f) */}
      <Sequence from={690} durationInFrames={630}>
        <ShortsCamera zoom={1.04}>
          <ShortsBackdrop mode="palace" />
          <CelestialCloudSeat x={540} y={685} scale={1.12} />
          <IndraOnAiravataRig x={540} y={605} scale={1.08} />
          <GroundShadow x={330} y={1215} rx={92} />
          <GroundShadow x={765} y={1215} rx={90} />
          <MainaDeviRig x={330} y={1085} scale={1.18} mood="welcome" />
          <NaradMuniRig x={765} y={1070} scale={1.18} gesture="explaining" speakingEnergy={vo} flipX />
        </ShortsCamera>
      </Sequence>

      {/* P8S03 Ghostly Cries & Narad Slipping Away Along Same Street (1320..1860f) */}
      <Sequence from={1320} durationInFrames={540}>
        <ShortsCamera zoom={1.05}>
          <ShortsBackdrop mode="village_night" />
          <GroundShadow x={355} y={1210} rx={92} />
          <MainaDeviRig x={355} y={1075} scale={1.18} mood="shocked" />
          <NaradMuniRig
            x={interpolate(f, [1540, 1840], [720, 1180], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            y={1065}
            scale={1.16}
            gesture="explaining"
            speakingEnergy={vo}
          />
        </ShortsCamera>
      </Sequence>

      {/* P8S04 Prets Chasing from Upper Village Ridge While Kids Sprint in Foreground Lane (1860..2445f) */}
      <Sequence from={1860} durationInFrames={585}>
        <ShortsCamera zoom={1.04}>
          <ShortsBackdrop mode="village_night" />
          <GroundShadow x={265} y={965} rx={68} />
          <GroundShadow x={815} y={965} rx={68} />
          <DetailedSpiritRig x={265} y={865} kind="pishacha" scale={0.96} />
          <DetailedSpiritRig x={815} y={865} kind="vetala" scale={0.96} flipX />
          <GroundShadow x={310} y={1225} rx={62} />
          <GroundShadow x={540} y={1235} rx={62} />
          <GroundShadow x={770} y={1225} rx={62} />
          <HimachaliChildRig x={310} y={1135} scale={1.25} mode={f > 2140 ? "panting" : "running"} />
          <HimachaliChildRig x={540} y={1150} scale={1.2} mode={f > 2140 ? "panting" : "running"} phase={0.7} />
          <HimachaliChildRig x={770} y={1135} scale={1.25} mode={f > 2140 ? "panting" : "running"} phase={1.4} />
        </ShortsCamera>
      </Sequence>

      {/* P8S05 Cozy Interior Panting Together on Room Rug (2445..2865f) */}
      <Sequence from={2445} durationInFrames={420}>
        <ShortsCamera zoom={1.04}>
          <ShortsBackdrop mode="village_interior" />
          <GroundShadow x={235} y={1210} rx={82} />
          <GroundShadow x={845} y={1210} rx={82} />
          <WorriedParentRig x={235} y={1045} scale={1.2} role="mother" speakingEnergy={vo} />
          <WorriedParentRig x={845} y={1045} scale={1.2} role="father" speakingEnergy={vo * 0.5} />
          <GroundShadow x={390} y={1235} rx={58} />
          <GroundShadow x={540} y={1245} rx={58} />
          <GroundShadow x={690} y={1235} rx={58} />
          <HimachaliChildRig x={390} y={1150} scale={1.2} mode="panting" shirtColor="#fef3c7" vestColor="#be123c" />
          <HimachaliChildRig x={540} y={1162} scale={1.15} mode="panting" shirtColor="#dbeafe" vestColor="#0f766e" phase={0.8} />
          <HimachaliChildRig x={690} y={1150} scale={1.18} mode="panting" shirtColor="#fde68a" vestColor="#7c3aed" phase={1.6} />
        </ShortsCamera>
      </Sequence>

      {/* P8S06 Headless Barati Knocking Directly at Courtyard Door (2865..3420f) */}
      <Sequence from={2865} durationInFrames={555}>
        <ShortsCamera zoom={1.04}>
          <ShortsBackdrop mode="palace" />
          <VillageHouseDoorRig x={665} y={985} doorClosedProgress={f > 3120 ? 0.3 : 1} knockShake={f < 3120 ? Math.sin(f * 1.3) * 5 : 0} />
          <GroundShadow x={320} y={1215} rx={85} />
          <HeadlessBaratiRig x={320} y={1080} scale={1.22} knocking={f < 3120} />
        </ShortsCamera>
      </Sequence>

      <ShortsHeader partNumber={8} sceneLabel={active.label} progress={f / 3420} voEnergy={vo} />
      <ShortsCaptions subtitles={SUBTITLES_P8} sec={sec} voEnergy={vo} partNumber={8} />
    </AbsoluteFill>
  );
};

/* ============================================================================
   SHORT 09 (135s / 4050f) — Sharbat Bath, Reverse Nandi, Fierce Face, Maina Faint & Shamshan
   ============================================================================ */
export const MahadevBaratShort09: React.FC = () => {
  const f = useCurrentFrame();
  const sec = f / SHORTS_FPS;
  const vo = getSmoothVoP9(f);
  const active = P9_SCENES.find((s) => sec >= s.startSec && sec < s.endSec) ?? P9_SCENES[P9_SCENES.length - 1];

  return (
    <AbsoluteFill style={{ backgroundColor: "#14071e" }}>
      <Audio src={staticFile("audio/mahadev-barat-part09-master.mp3")} />

      {/* P9S01 Sharbat Station & Father on Upper Terrace Welcome Stall, Spirits Drinking in Foreground (0..735f) */}
      <Sequence from={0} durationInFrames={735}>
        <ShortsCamera zoom={1.04}>
          <ShortsBackdrop mode="palace" />
          <GroundShadow x={365} y={965} rx={115} />
          <GroundShadow x={775} y={965} rx={72} />
          <SharbatStationRig x={365} y={850} scale={0.98} splashProgress={interpolate(f, [360, 560], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
          <WorriedParentRig x={775} y={850} scale={0.98} role="father" speakingEnergy={vo} />
          {f >= 230 && (
            <>
              <GroundShadow x={290} y={1220} rx={72} />
              <GroundShadow x={540} y={1230} rx={72} />
              <GroundShadow x={790} y={1220} rx={72} />
              <DetailedSpiritRig x={290} y={1115} kind="sukar_mukha" scale={1.1} />
              <DetailedSpiritRig x={540} y={1125} kind="kukar_mukha" scale={1.1} phase={1} />
              <DetailedSpiritRig x={790} y={1115} kind="pret_kankal" scale={1.1} phase={2} flipX />
            </>
          )}
        </ShortsCamera>
      </Sequence>

      {/* P9S02 Backwards on Nandi Flanked by Shringi & Bhringi on Road (735..1440f) */}
      <Sequence from={735} durationInFrames={705}>
        <ShortsCamera zoom={1.05}>
          <ShortsBackdrop mode="himalaya" />
          <GroundShadow x={540} y={1205} rx={145} />
          <GroundShadow x={215} y={1220} rx={72} />
          <GroundShadow x={865} y={1220} rx={72} />
          <MahadevReverseNandiRig x={540} y={1025} scale={1.22} facingBackwards speakingEnergy={vo} />
          <DetailedSpiritRig x={215} y={1115} kind="shringi" scale={1.08} />
          <DetailedSpiritRig x={865} y={1115} kind="bhringi" scale={1.08} flipX />
        </ShortsCamera>
      </Sequence>

      {/* P9S03 Maina Devi Questioning Shringi at Palace Gate (1440..2280f) */}
      <Sequence from={1440} durationInFrames={840}>
        <ShortsCamera zoom={1.04}>
          <ShortsBackdrop mode="palace" />
          {/* Mahadev on Reverse Nandi & Shringi on Upper Palace Approach */}
          <GroundShadow x={355} y={965} rx={120} />
          <GroundShadow x={780} y={965} rx={68} />
          <MahadevReverseNandiRig x={355} y={825} scale={1.04} facingBackwards />
          <DetailedSpiritRig x={780} y={860} kind="shringi" scale={0.96} flipX />
          {/* Maina & Sakhis in Foreground Courtyard */}
          <GroundShadow x={345} y={1225} rx={92} />
          <GroundShadow x={745} y={1225} rx={260} />
          <MainaDeviRig x={345} y={1100} scale={1.16} mood="shocked" speakingEnergy={f < 1920 ? vo : 0} />
          <SakhiBandRig x={745} y={1145} scale={0.96} />
        </ShortsCamera>
      </Sequence>

      {/* P9S04 Nandi Turns -> Fierce Paan/Bhasma Face -> Maina Faints (2280..3240f) */}
      <Sequence from={2280} durationInFrames={960}>
        <ShortsCamera zoom={interpolate(f, [2420, 2700], [1.03, 1.1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>
          <ShortsBackdrop mode="palace" />
          {/* Nandi & Mahadev turning on Palace Steps */}
          <GroundShadow x={540} y={970} rx={138} />
          <MahadevReverseNandiRig
            x={540}
            y={825}
            scale={1.12}
            facingBackwards={f <= 2420}
            veilLifted={interpolate(f, [2460, 2660], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            speakingEnergy={vo}
          />
          <GroundShadow x={355} y={1225} rx={105} />
          {f < 2840 ? (
            <MainaDeviRig x={355} y={1100} scale={1.14} mood="shocked" speakingEnergy={vo} />
          ) : (
            <MainaFaintRig x={355} y={1135} scale={1.14} faintProgress={interpolate(f, [2840, 2970], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
          )}
          <SakhiBandRig x={715 + interpolate(f, [2890, 3180], [0, 480], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} y={1145} scale={0.94} panic={f > 2860} />
        </ShortsCamera>
      </Sequence>

      {/* P9S05 Shamshan Janwasa & Vishnu Dialogue (3240..4050f) */}
      <Sequence from={3240} durationInFrames={810}>
        <ShortsCamera zoom={1.04}>
          <ShortsBackdrop mode="shamshan" />
          {/* Shringi & Bhringi standing guard on Back Shamshan Ridge */}
          <GroundShadow x={250} y={965} rx={65} />
          <GroundShadow x={830} y={965} rx={65} />
          <DetailedSpiritRig x={250} y={865} kind="shringi" scale={0.94} />
          <DetailedSpiritRig x={830} y={865} kind="bhringi" scale={0.94} flipX />
          {/* Mahadev & Vishnu conversing in Foreground Ghat */}
          <GroundShadow x={340} y={1215} rx={95} />
          <GroundShadow x={760} y={1215} rx={95} />
          <MahadevRig x={340} y={1080} scale={1.2} pose="sitting" speakingEnergy={vo} />
          <VishnuRig x={760} y={1055} scale={1.2} flipX gestureMode="chuckling" speakingEnergy={vo * 0.5} />
        </ShortsCamera>
      </Sequence>

      <ShortsHeader partNumber={9} sceneLabel={active.label} progress={f / 4050} voEnergy={vo} />
      <ShortsCaptions subtitles={SUBTITLES_P9} sec={sec} voEnergy={vo} partNumber={9} />
    </AbsoluteFill>
  );
};

/* ============================================================================
   SHORT 10 (128s / 3840f) — Narad Prabodhan, Divya Roop, Panigrahan & Grand Finale
   ============================================================================ */
export const MahadevBaratShort10: React.FC = () => {
  const f = useCurrentFrame();
  const sec = f / SHORTS_FPS;
  const vo = getSmoothVoP10(f);
  const active = P10_SCENES.find((s) => f >= s.startFrame && f < s.startFrame + s.durationFrames) ?? P10_SCENES[P10_SCENES.length - 1];

  return (
    <AbsoluteFill style={{ backgroundColor: "#14071e" }}>
      <Audio src={staticFile("audio/mahadev-barat-part10-master.mp3")} />

      {/* P10S01 Narad Prabodhan Family Council on Palace Courtyard (0..815f) */}
      <Sequence from={0} durationInFrames={815}>
        <ShortsCamera zoom={1.04}>
          <ShortsBackdrop mode="palace" />
          <GroundShadow x={235} y={1215} rx={82} />
          <GroundShadow x={520} y={1225} rx={88} />
          <GroundShadow x={820} y={1215} rx={86} />
          <HimavantRig x={235} y={1075} scale={1.12} foldedHands />
          <MainaDeviRig x={520} y={1095} scale={1.16} mood={f > 230 ? "welcome" : "shocked"} speakingEnergy={f <= 230 ? vo : 0} />
          <NaradMuniRig x={820} y={1075} scale={1.16} gesture="explaining" speakingEnergy={f > 230 ? vo : 0} flipX />
        </ShortsCamera>
      </Sequence>

      {/* P10S02 Mahadev Radiant Divya Roop on Upper Palace Terrace Above Parvati & Parents (815..1685f) */}
      <Sequence from={815} durationInFrames={870}>
        <ShortsCamera zoom={interpolate(f, [815, 1685], [1.03, 1.1])}>
          <ShortsBackdrop mode="palace" />
          <GroundShadow x={540} y={965} rx={110} />
          <DivyaSaumyaMahadevRig x={540} y={825} scale={1.16} auraBoost={interpolate(f, [1100, 1450], [0.7, 1.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
          <GroundShadow x={235} y={1220} rx={80} />
          <GroundShadow x={540} y={1230} rx={85} />
          <GroundShadow x={845} y={1220} rx={82} />
          <HimavantRig x={235} y={1105} scale={1.08} foldedHands />
          <MainaDeviRig x={540} y={1120} scale={1.1} mood="welcome" />
          <MataParvatiBridalRig x={845} y={1110} scale={1.1} holdingJaimala />
        </ShortsCamera>
      </Sequence>

      {/* P10S03 Jaimala, Panigrahan & Vedic Chants Around Sacred Havan Kund (1685..2415f) */}
      <Sequence from={1685} durationInFrames={730}>
        <ShortsCamera zoom={1.05}>
          <ShortsBackdrop mode="vivah_mandap" />
          {/* Brahma officiating on Mandap Terrace behind Sacred Havan */}
          <GroundShadow x={540} y={965} rx={85} />
          <BrahmaRig x={540} y={850} scale={1.0} speakingEnergy={vo} />
          <GroundShadow x={320} y={1225} rx={92} />
          <GroundShadow x={760} y={1225} rx={92} />
          <DivyaSaumyaMahadevRig x={320} y={1085} scale={1.24} extendingHand />
          <MataParvatiBridalRig x={760} y={1090} scale={1.24} holdingJaimala />
          <HavanKundProp x={540} y={1185} scale={1.08} />
        </ShortsCamera>
      </Sequence>

      {/* P10S04 Devas Blessing on Clouds Above Mandap Apsara & Musicians (2415..3135f) */}
      <Sequence from={2415} durationInFrames={720}>
        <ShortsCamera zoom={1.04}>
          <ShortsBackdrop mode="vivah_mandap" />
          <CelestialCloudSeat x={305} y={650} scale={0.98} />
          <VishnuRig x={305} y={565} scale={1.02} withGaruda gestureMode="chuckling" />
          <CelestialCloudSeat x={780} y={670} scale={0.95} />
          <IndraOnAiravataRig x={780} y={590} scale={0.98} />
          <GroundShadow x={255} y={1220} rx={78} />
          <GroundShadow x={540} y={1230} rx={82} />
          <GroundShadow x={825} y={1220} rx={78} />
          <ApsaraRig x={255} y={1090} scale={1.12} colorScheme="gold" phase={0} />
          <NaradMuniRig x={540} y={1085} scale={1.12} gesture="playing" />
          <CelestialMusicianRig x={825} y={1105} scale={1.1} instrument="shehnai" />
        </ShortsCamera>
      </Sequence>

      {/* P10S05 Grand Finale Celebration — Sacred Havan Kund, Royal Family Grounded & Devas Blessing (3135..3840f) */}
      <Sequence from={3135} durationInFrames={705}>
        <ShortsCamera zoom={interpolate(f, [3135, 3840], [1.02, 1.08])}>
          <ShortsBackdrop mode="vivah_mandap" />
          <CelestialCloudSeat x={320} y={645} scale={0.98} />
          <VishnuRig x={320} y={555} scale={1.0} withGaruda highlightItem="all" gestureMode="chuckling" />
          <CelestialCloudSeat x={765} y={660} scale={0.95} />
          <BrahmaRig x={765} y={575} scale={1.0} speakingEnergy={vo * 0.4} />
          <GroundShadow x={165} y={1215} rx={68} />
          <GroundShadow x={375} y={1225} rx={88} />
          <GroundShadow x={705} y={1225} rx={88} />
          <GroundShadow x={915} y={1215} rx={72} />
          <HimavantRig x={165} y={1100} scale={0.96} foldedHands />
          <DivyaSaumyaMahadevRig x={375} y={1075} scale={1.22} auraBoost={1.5} extendingHand />
          <MataParvatiBridalRig x={705} y={1080} scale={1.22} holdingJaimala />
          <MainaDeviRig x={915} y={1105} scale={0.98} mood="welcome" speakingEnergy={vo * 0.4} />
          <HavanKundProp x={540} y={1195} scale={0.95} />
        </ShortsCamera>
      </Sequence>

      <ShortsHeader partNumber={10} sceneLabel={active.label} progress={f / 3840} voEnergy={vo} />
      <ShortsCaptions subtitles={SUBTITLES_P10} sec={sec} voEnergy={vo} partNumber={10} />
    </AbsoluteFill>
  );
};
