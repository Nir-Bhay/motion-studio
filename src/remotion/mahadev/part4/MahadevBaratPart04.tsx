import React from "react";
import { AbsoluteFill, Audio, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import "@fontsource/noto-sans-devanagari/400.css";
import "@fontsource/noto-sans-devanagari/700.css";
import "@fontsource/yatra-one/400.css";
import { ParallaxStage } from "../environment/ParallaxStage";
import { VishnuRig } from "../characters/VishnuRig";
import { BrahmaRig, IndraOnAiravataRig } from "../characters/BrahmaIndraRigs";
import { ShivGanaRig } from "../characters/ShivGanaRig";
import { BackgroundCrowdBand, DetailedSpiritRig } from "../characters/DetailedGanasAndSpirits";
import { SceneTitleBanner } from "../ui/DevanagariCaptions";
import { MahadevBaratGroomRig } from "../part3/MahadevBaratGroomRig";
import { NandiBullRig, PretCreatureRig, VajraLightning } from "./BhootPretAndNandiRigs";
import { getBedP4, getSmoothVoP4, P4_FPS, P4_SCENES, SUBTITLES_P4 } from "./timelineP4";

const Part4Captions: React.FC<{ globalFrame: number }> = ({ globalFrame }) => {
  const sec = globalFrame / P4_FPS;
  const active = SUBTITLES_P4.find((s) => sec >= s.startSec && sec <= s.endSec);
  const vo = getSmoothVoP4(globalFrame);
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

// P4-S01: Only 5-10 Ganas behind the massive Deva lines
const P4S01SmallGroup: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const vo = getSmoothVoP4(gf);
  const shift = interpolate(frame, [0, 606], [-60, 80]);

  return (
    <ParallaxStage mode="devaloka" cameraX={shift * 0.35} zoom={1}>
      <VishnuRig x={1650 + shift * 0.2} y={485} scale={0.82} />
      <BrahmaRig x={1350 + shift * 0.2} y={495} scale={0.76} />
      <IndraOnAiravataRig x={1060 + shift * 0.2} y={535} scale={0.76} />

      <MahadevBaratGroomRig
        x={440}
        y={545}
        scale={1.08}
        sehraProgress={1}
        bichhuProgress={1}
        panchmukhiProgress={1}
        bhasmaGlowProgress={1}
        speakingEnergy={vo * 0.35}
        pose="marching"
      />
      <ShivGanaRig x={190} y={670} variant="shringi" scale={0.95} phase={0} />
      <ShivGanaRig x={680} y={695} variant="bhringi" scale={0.92} phase={1.2} flipX />
    </ParallaxStage>
  );
};

// P4-S02: Mahadev Summons All Ghosts & Foreign London-America Prets!
const P4S02VishwaPret: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const vo = getSmoothVoP4(gf);
  const flyIn = spring({ frame: Math.max(0, frame - 90), fps, config: { damping: 12, stiffness: 80 } });

  return (
    <ParallaxStage mode="shamshan" cameraX={0} zoom={1.04}>
      <BackgroundCrowdBand mode="bhoot_army" y={665} />
      <MahadevBaratGroomRig
        x={520}
        y={545}
        scale={1.15}
        sehraProgress={1}
        bichhuProgress={1}
        panchmukhiProgress={1}
        bhasmaGlowProgress={1}
        speakingEnergy={vo}
        pose="heroic"
      />
      <ShivGanaRig x={220} y={670} variant="shringi" scale={1.0} phase={0} />

      {/* Flying Global Ghosts, Asuras, Daityas, Kankal Prets, Dakini, Vetala, Pishacha & Foreign London/America Prets! */}
      <DetailedSpiritRig x={interpolate(flyIn, [0, 1], [2020, 860])} y={660} kind="asura_senapati" scale={0.96} phase={0.1} flipX />
      <DetailedSpiritRig x={interpolate(flyIn, [0, 1], [2100, 1080])} y={690} kind="bhoot_maya" scale={0.96} phase={0.8} flipX />
      <DetailedSpiritRig x={interpolate(flyIn, [0, 1], [2180, 1300])} y={640} kind="daitya_mahabali" scale={0.94} phase={1.4} flipX />
      <DetailedSpiritRig x={interpolate(flyIn, [0, 1], [2250, 1520])} y={680} kind="pret_kankal" scale={0.96} phase={2.1} flipX />
      <DetailedSpiritRig x={interpolate(flyIn, [0, 1], [2320, 1730])} y={670} kind="dakini" scale={0.94} phase={2.5} flipX />
      <DetailedSpiritRig x={interpolate(flyIn, [0, 1], [2080, 1040])} y={340} kind="foreign_pret_tophat" scale={0.92} phase={0} flipX />
      <DetailedSpiritRig x={interpolate(flyIn, [0, 1], [2180, 1340])} y={410} kind="foreign_pret_cowboy" scale={0.92} phase={1.1} flipX />
      <DetailedSpiritRig x={interpolate(flyIn, [0, 1], [2280, 1610])} y={355} kind="bhoot_maya" scale={0.88} phase={2.2} flipX />
    </ParallaxStage>
  );
};

// P4-S03: Ram Ji Barat Flashback Context
const P4S03RamBarat: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const bed = getBedP4(gf);
  const walk = interpolate(frame, [0, 435], [-100, 120]);

  return (
    <ParallaxStage mode="devaloka" cameraX={walk * 0.4} zoom={1.02}>
      <BackgroundCrowdBand mode="devaloka" y={685} />
      <div
        style={{
          position: "absolute",
          top: 155,
          left: "50%",
          transform: "translateX(-50%)",
          padding: "8px 26px",
          borderRadius: 14,
          background: "rgba(38, 16, 48, 0.85)",
          border: "2px solid #fde047",
          color: "#fde047",
          fontFamily: "'Noto Sans Devanagari', sans-serif",
          fontSize: 22,
          fontWeight: 700,
        }}
      >
        प्रसंग: श्री राम जी की बारात में प्रेतों का आगमन
      </div>

      {/* Royal Ram Barat Procession Side (Right) */}
      <VishnuRig x={1560 + walk * 0.25} y={495} scale={1.0} />
      <BrahmaRig x={1230 + walk * 0.25} y={505} scale={0.88} />

      {/* Eager Prets, Bhoot & Asurs tagging along happily behind (Left) */}
      <DetailedSpiritRig x={240 + walk * 0.35} y={665} kind="asura_senapati" scale={0.94 + bed * 0.03} phase={0} />
      <DetailedSpiritRig x={480 + walk * 0.35} y={660} kind="bhoot_maya" scale={0.95} phase={1.1} />
      <DetailedSpiritRig x={710 + walk * 0.35} y={675} kind="pret_kankal" scale={0.94} phase={1.8} />
      <DetailedSpiritRig x={920 + walk * 0.35} y={670} kind="foreign_pret_tophat" scale={0.92} phase={2.4} />
    </ParallaxStage>
  );
};

// P4-S04: Indra Stops Prets with Blazing Vajra!
const P4S04IndraVajra: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const vo = getSmoothVoP4(gf);
  const flash = Math.abs(Math.sin(frame * 0.25)) * (frame < 380 ? 1 : 0.45);

  return (
    <ParallaxStage mode="shamshan" cameraX={Math.sin(frame * 0.5) * flash * 6} zoom={1.05}>
      <IndraOnAiravataRig x={1460} y={525} scale={1.16} />
      <VajraLightning x={1080} y={445} intensity={flash} />
      <div
        style={{
          position: "absolute",
          left: 1180,
          top: 230,
          padding: "8px 20px",
          borderRadius: 12,
          background: "rgba(127, 29, 29, 0.9)",
          border: `2px solid rgba(254, 240, 138, ${0.5 + vo * 0.5})`,
          color: "#fef08a",
          fontFamily: "'Noto Sans Devanagari', sans-serif",
          fontSize: 21,
          fontWeight: 700,
        }}
      >
        ⚡ “अवगुणों का प्रवेश निषेध है!”
      </div>

      {/* Blocked Asurs, Daityas, Ghosts & Prets shrinking back from Indra's Vajra */}
      <DetailedSpiritRig x={240} y={665} kind="asura_senapati" scale={0.94} phase={0.4} />
      <DetailedSpiritRig x={480} y={645} kind="bhoot_maya" scale={0.92} phase={1.0} />
      <PretCreatureRig x={680} y={625} variant="weeping" scale={1.02} phase={0} />
      <DetailedSpiritRig x={870} y={675} kind="pret_kankal" scale={0.92} phase={1.8} />
    </ParallaxStage>
  );
};

// P4-S05: Weeping Prets + Mahadev Arrives on Sacred Nandi Bull!
const P4S05NandiArrival: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const vo = getSmoothVoP4(gf);
  const ride = spring({ frame: Math.max(0, frame - 140), fps, config: { damping: 16, stiffness: 55 } });
  const nandiX = interpolate(ride, [0, 1], [-280, 520]);

  return (
    <ParallaxStage mode="shamshan" cameraX={0} zoom={1.04}>
      <BackgroundCrowdBand mode="bhoot_army" y={665} />
      {/* Mahadev Riding Sacred Nandi Bull! */}
      <MahadevBaratGroomRig
        x={nandiX - 10}
        y={540}
        scale={0.9}
        sehraProgress={1}
        bichhuProgress={1}
        panchmukhiProgress={1}
        bhasmaGlowProgress={1}
        speakingEnergy={vo}
        pose="calm"
        seatedOnNandi
      />
      <NandiBullRig x={nandiX + 12} y={660} scale={1.22} walking={frame < 340} />
      <DetailedSpiritRig x={nandiX - 240} y={695} kind="chhatra_gana" scale={0.92} phase={0} />

      {/* Weeping Bhoot-Prets, Asurs & Ghosts waiting in the field */}
      <DetailedSpiritRig x={920} y={685} kind="bhoot_maya" scale={0.88} phase={0.4} flipX />
      <PretCreatureRig x={1150} y={625} variant="weeping" scale={1.1} phase={0} />
      <DetailedSpiritRig x={1390} y={680} kind="pret_kankal" scale={0.94} phase={1.1} flipX />
      <PretCreatureRig x={1650} y={615} variant="weeping" scale={1.06} phase={2.0} />

      {frame > 430 && (
        <div
          style={{
            position: "absolute",
            top: 120,
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: interpolate(frame, [430, 465], [0, 1], { extrapolateRight: "clamp" }),
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
              भाग ४ समाप्त • आगे महादेव का दीनदयाल वचन व अद्भुत प्रेत-सेना!
            </div>
          </div>
        </div>
      )}
    </ParallaxStage>
  );
};

const P4_HUD: Record<string, { title: string; subtitle: string }> = {
  P4S01: { title: "१. केवल दस-पांच गण!", subtitle: "विशाल देव-दल के पीछे भोलेनाथ" },
  P4S02: { title: "२. विश्व-भर से प्रेत आह्वान", subtitle: "देश-विदेश से दौड़े आए भूत-प्रेत" },
  P4S03: { title: "३. श्री राम बारात प्रसंग", subtitle: "प्रेतों की मुक्ति की पावन आकांक्षा" },
  P4S04: { title: "४. इंद्र का वज्र व प्रेत-रोक", subtitle: "अवगुण कहकर बारात से रोके गए प्रेत" },
  P4S05: { title: "५. नंदी पर महादेव का आगमन", subtitle: "दीनदयाल शिव ने सुनी प्रेतों की पुकार" },
};

export const MahadevBaratPart04: React.FC = () => {
  const frame = useCurrentFrame();
  const active = P4_SCENES.find((s) => frame >= s.startFrame && frame < s.startFrame + s.durationFrames) ?? P4_SCENES[0];
  const hud = P4_HUD[active.id];

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0714" }}>
      <Audio src={staticFile("audio/mahadev-barat-part04-master.mp3")} volume={1} />
      <Sequence from={P4_SCENES[0].startFrame} durationInFrames={P4_SCENES[0].durationFrames}>
        <P4S01SmallGroup gf={frame} />
      </Sequence>
      <Sequence from={P4_SCENES[1].startFrame} durationInFrames={P4_SCENES[1].durationFrames}>
        <P4S02VishwaPret gf={frame} />
      </Sequence>
      <Sequence from={P4_SCENES[2].startFrame} durationInFrames={P4_SCENES[2].durationFrames}>
        <P4S03RamBarat gf={frame} />
      </Sequence>
      <Sequence from={P4_SCENES[3].startFrame} durationInFrames={P4_SCENES[3].durationFrames}>
        <P4S04IndraVajra gf={frame} />
      </Sequence>
      <Sequence from={P4_SCENES[4].startFrame} durationInFrames={P4_SCENES[4].durationFrames}>
        <P4S05NandiArrival gf={frame} />
      </Sequence>

      <SceneTitleBanner
        title={hud.title}
        subtitle={hud.subtitle}
        localFrame={frame - active.startFrame}
        durationFrames={active.durationFrames}
      />
      <Part4Captions globalFrame={frame} />
    </AbsoluteFill>
  );
};
