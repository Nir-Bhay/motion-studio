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
import { ShortsBackdrop, ShortsCamera, ShortsCaptions, ShortsHeader, SHORTS_FPS } from "./ShortsChrome";

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

      {/* P6S01 Karal Pret Jamaat (0..570f) */}
      <Sequence from={0} durationInFrames={570}>
        <ShortsCamera zoom={1.06}>
          <ShortsBackdrop mode="shamshan" />
          <DetailedSpiritRig x={270} y={670} kind="khag_mukha" scale={1.12} />
          <DetailedSpiritRig x={810} y={670} kind="shrigal_mukha" scale={1.12} flipX />
          <DetailedSpiritRig x={310} y={1080} kind="kukar_mukha" scale={1.18} />
          <DetailedSpiritRig x={770} y={1080} kind="asura_senapati" scale={1.18} flipX />
        </ShortsCamera>
      </Sequence>

      {/* P6S02 Bhajan: Aai Shankar Ki Baratiya (570..1155f) */}
      <Sequence from={570} durationInFrames={585}>
        <ShortsCamera zoom={1.05}>
          <ShortsBackdrop mode="himalaya" />
          <MahadevBaratGroomRig x={540} y={760} scale={1.26} sehraProgress={1} bichhuProgress={1} panchmukhiProgress={1} bhasmaGlowProgress={1} pose="marching" />
          <DetailedSpiritRig x={240} y={1090} kind="dhol_gana" scale={1.16} />
          <DetailedSpiritRig x={540} y={1110} kind="nagada_gana" scale={1.16} />
          <DetailedSpiritRig x={840} y={1090} kind="shringi" scale={1.16} flipX />
        </ShortsCamera>
      </Sequence>

      {/* P6S03 Old Bull, Mouse Mount & Elephant Mount Riders (1155..1755f) */}
      <Sequence from={1155} durationInFrames={600}>
        <ShortsCamera zoom={1.04}>
          <ShortsBackdrop mode="himalaya" />
          <NandiBullRig x={540} y={780} scale={1.2} walking />
          <MahadevBaratGroomRig x={520} y={630} scale={1.05} seatedOnNandi sehraProgress={1} bichhuProgress={1} panchmukhiProgress={1} bhasmaGlowProgress={1} />
          <MouseMountGanaRig x={290} y={1100} scale={1.12} />
          <ElephantMountDevaRig x={790} y={1075} scale={1.08} />
        </ShortsCamera>
      </Sequence>

      {/* P6S04 Mainavati Aarti Thali Dismay (1755..2295f) */}
      <Sequence from={1755} durationInFrames={540}>
        <ShortsCamera zoom={1.06}>
          <ShortsBackdrop mode="palace" />
          <MahadevBaratGroomRig x={315} y={960} scale={1.2} sehraProgress={1} bichhuProgress={1} panchmukhiProgress={1} bhasmaGlowProgress={1} />
          <MainaDeviRig x={765} y={980} scale={1.24} mood="shocked" speakingEnergy={vo} />
        </ShortsCamera>
      </Sequence>

      {/* P6S05 Sakhis Demanding Neg at Door (2295..2850f) */}
      <Sequence from={2295} durationInFrames={555}>
        <ShortsCamera zoom={1.05}>
          <ShortsBackdrop mode="palace" />
          <MahadevBaratGroomRig x={540} y={680} scale={1.08} sehraProgress={1} bichhuProgress={1} panchmukhiProgress={1} bhasmaGlowProgress={1} />
          <SakhiBandRig x={540} y={1075} scale={1.22} askingNeg />
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
        <ShortsCamera zoom={1.05}>
          <ShortsBackdrop mode="palace" />
          <MahadevBaratGroomRig x={315} y={740} scale={1.08} sehraProgress={1} bichhuProgress={1} panchmukhiProgress={1} bhasmaGlowProgress={1} />
          <DetailedSpiritRig x={770} y={760} kind="shringi" scale={1.06} flipX />
          {f > 540 && (
            <>
              <TossedSerpentArc startX={360} startY={740} endX={720} endY={1040} progress={Math.min(1, (f - 540) / 140)} />
              <TossedSerpentArc startX={400} startY={760} endX={340} endY={1050} progress={Math.min(1, (f - 570) / 140)} color="#16a34a" />
            </>
          )}
          <SakhiBandRig
            x={540 + interpolate(f, [620, 920], [0, 520], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            y={1080}
            scale={1.15}
            askingNeg={f < 580}
            panic={f >= 580}
          />
        </ShortsCamera>
      </Sequence>

      {/* P7S03-S04 Decorated Himalaya & Maina/Narad Waiting (960..1740f) */}
      <Sequence from={960} durationInFrames={780}>
        <ShortsCamera zoom={1.06}>
          <ShortsBackdrop mode="palace" />
          <MainaDeviRig x={340} y={990} scale={1.24} mood="welcome" speakingEnergy={vo * 0.6} />
          <NaradMuniRig x={760} y={975} scale={1.22} gesture="explaining" speakingEnergy={vo} flipX />
        </ShortsCamera>
      </Sequence>

      {/* P7S05-S06 Pitambari Crowd + Vishnu on Garuda Descending Above Maina & Narad (1740..3210f) */}
      <Sequence from={1740} durationInFrames={1470}>
        <ShortsCamera zoom={interpolate(f, [2280, 3210], [1.02, 1.1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>
          <ShortsBackdrop mode="palace" />
          <VishnuRig
            x={540}
            y={interpolate(f, [1740, 2100], [410, 540], { extrapolateRight: "clamp" })}
            scale={1.12}
            withGaruda
            highlightItem="all"
          />
          <PitambariBaratiCrowd baseX={360} y={830} />
          <MainaDeviRig x={320} y={1045} scale={1.16} mood="welcome" speakingEnergy={f < 2750 ? vo : 0} />
          <NaradMuniRig x={765} y={1030} scale={1.16} gesture={f >= 2750 ? "denying" : "explaining"} speakingEnergy={f >= 2750 ? vo : 0} flipX />
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

      {/* P8S01 Brahma 4-Head Confusion (0..690f) */}
      <Sequence from={0} durationInFrames={690}>
        <ShortsCamera zoom={1.04}>
          <ShortsBackdrop mode="palace" />
          <BrahmaRig x={540} y={565} scale={1.12} speakingEnergy={vo * 0.4} />
          <MainaDeviRig x={335} y={1020} scale={1.18} mood="welcome" speakingEnergy={f < 420 ? vo : 0} />
          <NaradMuniRig x={765} y={1005} scale={1.18} gesture={f >= 420 ? "denying" : "explaining"} speakingEnergy={f >= 420 ? vo : 0} flipX />
        </ShortsCamera>
      </Sequence>

      {/* P8S02 Indra on Airavata Joke (690..1320f) */}
      <Sequence from={690} durationInFrames={630}>
        <ShortsCamera zoom={1.04}>
          <ShortsBackdrop mode="palace" />
          <IndraOnAiravataRig x={540} y={590} scale={1.1} />
          <MainaDeviRig x={335} y={1020} scale={1.18} mood="welcome" />
          <NaradMuniRig x={765} y={1005} scale={1.18} gesture="explaining" speakingEnergy={vo} flipX />
        </ShortsCamera>
      </Sequence>

      {/* P8S03 Ghostly Cries & Narad Slipping Away (1320..1860f) */}
      <Sequence from={1320} durationInFrames={540}>
        <ShortsCamera zoom={1.06}>
          <ShortsBackdrop mode="village_night" />
          <MainaDeviRig x={360} y={990} scale={1.18} mood="shocked" />
          <NaradMuniRig
            x={interpolate(f, [1540, 1840], [720, 1180], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            y={990}
            scale={1.15}
            gesture="explaining"
            speakingEnergy={vo}
          />
        </ShortsCamera>
      </Sequence>

      {/* P8S04 Kids Running Home & Slamming Doors (1860..2445f) */}
      <Sequence from={1860} durationInFrames={585}>
        <ShortsCamera zoom={1.04}>
          <ShortsBackdrop mode="village_night" />
          <DetailedSpiritRig x={240} y={670} kind="pishacha" scale={1.08} />
          <DetailedSpiritRig x={820} y={670} kind="vetala" scale={1.08} flipX />
          <HimachaliChildRig x={310} y={1080} scale={1.28} mode={f > 2140 ? "panting" : "running"} />
          <HimachaliChildRig x={540} y={1095} scale={1.22} mode={f > 2140 ? "panting" : "running"} phase={0.7} />
          <HimachaliChildRig x={770} y={1080} scale={1.28} mode={f > 2140 ? "panting" : "running"} phase={1.4} />
        </ShortsCamera>
      </Sequence>

      {/* P8S05 Cozy Interior Panting with Parents (2445..2865f) */}
      <Sequence from={2445} durationInFrames={420}>
        <ShortsCamera zoom={1.05}>
          <ShortsBackdrop mode="village_interior" />
          <WorriedParentRig x={250} y={880} scale={1.22} role="mother" speakingEnergy={vo} />
          <WorriedParentRig x={830} y={880} scale={1.22} role="father" speakingEnergy={vo * 0.5} />
          <HimachaliChildRig x={390} y={1100} scale={1.25} mode="panting" shirtColor="#fef3c7" vestColor="#be123c" />
          <HimachaliChildRig x={540} y={1115} scale={1.18} mode="panting" shirtColor="#dbeafe" vestColor="#0f766e" phase={0.8} />
          <HimachaliChildRig x={690} y={1100} scale={1.22} mode="panting" shirtColor="#fde68a" vestColor="#7c3aed" phase={1.6} />
        </ShortsCamera>
      </Sequence>

      {/* P8S06 Headless Barati Knocking on Door (2865..3420f) */}
      <Sequence from={2865} durationInFrames={555}>
        <ShortsCamera zoom={1.04}>
          <ShortsBackdrop mode="palace" />
          <VillageHouseDoorRig x={650} y={880} doorClosedProgress={f > 3120 ? 0.3 : 1} knockShake={f < 3120 ? Math.sin(f * 1.3) * 5 : 0} />
          <HeadlessBaratiRig x={315} y={1010} scale={1.26} knocking={f < 3120} />
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

      {/* P9S01 Sharbat Bath (0..735f) */}
      <Sequence from={0} durationInFrames={735}>
        <ShortsCamera zoom={1.04}>
          <ShortsBackdrop mode="palace" />
          <SharbatStationRig x={380} y={760} scale={1.12} splashProgress={interpolate(f, [360, 560], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
          <WorriedParentRig x={770} y={760} scale={1.08} role="father" speakingEnergy={vo} />
          {f >= 230 && (
            <>
              <DetailedSpiritRig x={290} y={1100} kind="sukar_mukha" scale={1.12} />
              <DetailedSpiritRig x={540} y={1110} kind="kukar_mukha" scale={1.1} phase={1} />
              <DetailedSpiritRig x={790} y={1100} kind="pret_kankal" scale={1.1} phase={2} flipX />
            </>
          )}
        </ShortsCamera>
      </Sequence>

      {/* P9S02 Backwards on Nandi (735..1440f) */}
      <Sequence from={735} durationInFrames={705}>
        <ShortsCamera zoom={1.06}>
          <ShortsBackdrop mode="himalaya" />
          <MahadevReverseNandiRig x={540} y={770} scale={1.25} facingBackwards speakingEnergy={vo} />
          <DetailedSpiritRig x={270} y={1100} kind="shringi" scale={1.15} />
          <DetailedSpiritRig x={810} y={1100} kind="bhringi" scale={1.15} flipX />
        </ShortsCamera>
      </Sequence>

      {/* P9S03 Maina Devi Question at Gate (1440..2280f) */}
      <Sequence from={1440} durationInFrames={840}>
        <ShortsCamera zoom={1.05}>
          <ShortsBackdrop mode="palace" />
          <MahadevReverseNandiRig x={360} y={700} scale={1.12} facingBackwards />
          <DetailedSpiritRig x={780} y={730} kind="shringi" scale={1.06} flipX />
          <MainaDeviRig x={370} y={1070} scale={1.2} mood="shocked" speakingEnergy={f < 1920 ? vo : 0} />
          <SakhiBandRig x={755} y={1095} scale={1.06} />
        </ShortsCamera>
      </Sequence>

      {/* P9S04 Nandi Turns -> Fierce Paan/Bhasma Face -> Maina Faints (2280..3240f) */}
      <Sequence from={2280} durationInFrames={960}>
        <ShortsCamera zoom={interpolate(f, [2420, 2700], [1.04, 1.14], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>
          <ShortsBackdrop mode="palace" />
          <MahadevReverseNandiRig
            x={540}
            y={710}
            scale={1.22}
            facingBackwards={f <= 2420}
            veilLifted={interpolate(f, [2460, 2660], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            speakingEnergy={vo}
          />
          {f < 2840 ? (
            <MainaDeviRig x={370} y={1080} scale={1.16} mood="shocked" speakingEnergy={vo} />
          ) : (
            <MainaFaintRig x={370} y={1090} scale={1.16} faintProgress={interpolate(f, [2840, 2970], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
          )}
          <SakhiBandRig x={710 + interpolate(f, [2890, 3180], [0, 480], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} y={1095} scale={0.96} panic={f > 2860} />
        </ShortsCamera>
      </Sequence>

      {/* P9S05 Shamshan Janwasa & Vishnu Conversation (3240..4050f) */}
      <Sequence from={3240} durationInFrames={810}>
        <ShortsCamera zoom={1.05}>
          <ShortsBackdrop mode="shamshan" />
          <MahadevRig x={340} y={960} scale={1.18} pose="sitting" speakingEnergy={vo} />
          <VishnuRig x={770} y={930} scale={1.18} flipX gestureMode="chuckling" speakingEnergy={vo * 0.5} />
          <DetailedSpiritRig x={240} y={650} kind="shringi" scale={1.0} />
          <DetailedSpiritRig x={840} y={650} kind="bhringi" scale={1.0} flipX />
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

      {/* P10S01 Narad Prabodhan (0..815f) */}
      <Sequence from={0} durationInFrames={815}>
        <ShortsCamera zoom={1.05}>
          <ShortsBackdrop mode="palace" />
          <HimavantRig x={245} y={980} scale={1.12} foldedHands />
          <MainaDeviRig x={520} y={1000} scale={1.16} mood={f > 230 ? "welcome" : "shocked"} speakingEnergy={f <= 230 ? vo : 0} />
          <NaradMuniRig x={820} y={985} scale={1.16} gesture="explaining" speakingEnergy={f > 230 ? vo : 0} flipX />
        </ShortsCamera>
      </Sequence>

      {/* P10S02 Parvati Vandana & Mahadev Radiant Divine Form (815..1685f) */}
      <Sequence from={815} durationInFrames={870}>
        <ShortsCamera zoom={interpolate(f, [815, 1685], [1.04, 1.12])}>
          <ShortsBackdrop mode="palace" />
          <DivyaSaumyaMahadevRig x={540} y={710} scale={1.25} auraBoost={interpolate(f, [1100, 1450], [0.7, 1.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
          <HimavantRig x={250} y={1060} scale={1.08} foldedHands />
          <MainaDeviRig x={540} y={1075} scale={1.12} mood="welcome" />
          <MataParvatiBridalRig x={830} y={1065} scale={1.12} holdingJaimala />
        </ShortsCamera>
      </Sequence>

      {/* P10S03 Jaimala, Panigrahan & Vedic Chants (1685..2415f) */}
      <Sequence from={1685} durationInFrames={730}>
        <ShortsCamera zoom={1.06}>
          <ShortsBackdrop mode="vivah_mandap" />
          <BrahmaRig x={540} y={590} scale={1.1} speakingEnergy={vo} />
          <DivyaSaumyaMahadevRig x={360} y={1020} scale={1.28} extendingHand />
          <MataParvatiBridalRig x={720} y={1025} scale={1.26} holdingJaimala />
        </ShortsCamera>
      </Sequence>

      {/* P10S04 Devas, Apsaras & Musicians Dancing (2415..3135f) */}
      <Sequence from={2415} durationInFrames={720}>
        <ShortsCamera zoom={1.04}>
          <ShortsBackdrop mode="vivah_mandap" />
          <VishnuRig x={300} y={585} scale={1.04} withGaruda gestureMode="chuckling" />
          <IndraOnAiravataRig x={780} y={605} scale={1.0} />
          <ApsaraRig x={270} y={1040} scale={1.12} colorScheme="gold" phase={0} />
          <NaradMuniRig x={540} y={1030} scale={1.14} gesture="playing" />
          <CelestialMusicianRig x={810} y={1055} scale={1.12} instrument="shehnai" />
        </ShortsCamera>
      </Sequence>

      {/* P10S05 Grand Finale Celebration (3135..3840f) */}
      <Sequence from={3135} durationInFrames={705}>
        <ShortsCamera zoom={interpolate(f, [3135, 3840], [1.03, 1.1])}>
          <ShortsBackdrop mode="vivah_mandap" />
          <VishnuRig x={330} y={550} scale={1.04} withGaruda highlightItem="all" gestureMode="chuckling" />
          <BrahmaRig x={760} y={565} scale={1.04} speakingEnergy={vo * 0.4} />
          <DivyaSaumyaMahadevRig x={395} y={1000} scale={1.32} auraBoost={1.5} extendingHand />
          <MataParvatiBridalRig x={685} y={1005} scale={1.3} holdingJaimala />
          <HimavantRig x={175} y={1050} scale={1.0} foldedHands />
          <MainaDeviRig x={905} y={1055} scale={1.02} mood="welcome" speakingEnergy={vo * 0.4} />
        </ShortsCamera>
      </Sequence>

      <ShortsHeader partNumber={10} sceneLabel={active.label} progress={f / 3840} voEnergy={vo} />
      <ShortsCaptions subtitles={SUBTITLES_P10} sec={sec} voEnergy={vo} partNumber={10} />
    </AbsoluteFill>
  );
};
