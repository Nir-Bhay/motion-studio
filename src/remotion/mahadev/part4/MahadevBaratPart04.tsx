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

      {/* Flying Global Ghosts, Dakini, Vetala, Pishacha & Top-Hat London/America Prets! */}
      <DetailedSpiritRig x={interpolate(flyIn, [0, 1], [2050, 960])} y={640} kind="vetala" scale={0.96} phase={0.2} flipX />
      <DetailedSpiritRig x={interpolate(flyIn, [0, 1], [2160, 1210])} y={695} kind="pishacha" scale={0.94} phase={1.3} flipX />
      <DetailedSpiritRig x={interpolate(flyIn, [0, 1], [2250, 1490])} y={670} kind="dakini" scale={0.96} phase={2.0} flipX />
      <PretCreatureRig x={interpolate(flyIn, [0, 1], [2080, 1080])} y={340} variant="classic" scale={1.05} phase={0} />
      <PretCreatureRig x={interpolate(flyIn, [0, 1], [2180, 1340])} y={460} variant="dakini" scale={1.02} phase={1.1} />
      <PretCreatureRig x={interpolate(flyIn, [0, 1], [2280, 1600])} y={360} variant="london" scale={1.12} phase={2.2} />
      <PretCreatureRig x={interpolate(flyIn, [0, 1], [2340, 1740])} y={540} variant="classic" scale={0.95} phase={0.7} />
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
      <VishnuRig x={1520 + walk * 0.25} y={495} scale={1.02} />
      <BrahmaRig x={1180 + walk * 0.25} y={510} scale={0.88} />

      {/* Eager Prets tagging along happily behind (Left) */}
      <PretCreatureRig x={420 + walk * 0.35} y={540} variant="classic" scale={1.05 + bed * 0.04} phase={0} />
      <PretCreatureRig x={660 + walk * 0.35} y={620} variant="dakini" scale={1.0} phase={1.4} />
      <PretCreatureRig x={880 + walk * 0.35} y={560} variant="london" scale={0.96} phase={2.1} />
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

      {/* Blocked Prets shrinking back */}
      <PretCreatureRig x={360} y={610} variant="weeping" scale={1.05} phase={0} />
      <PretCreatureRig x={620} y={560} variant="classic" scale={0.98} phase={1.2} />
      <PretCreatureRig x={820} y={650} variant="weeping" scale={0.95} phase={2.1} />
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
        y={518}
        scale={0.9}
        sehraProgress={1}
        bichhuProgress={1}
        panchmukhiProgress={1}
        bhasmaGlowProgress={1}
        speakingEnergy={vo}
        pose="calm"
      />
      <NandiBullRig x={nandiX + 12} y={660} scale={1.22} walking={frame < 340} />
      <ShivGanaRig x={nandiX - 240} y={695} variant="shringi" scale={0.92} phase={0} />

      {/* Weeping Bhoot-Prets waiting in the field */}
      <DetailedSpiritRig x={960} y={690} kind="vetala" scale={0.86} phase={0.4} flipX />
      <PretCreatureRig x={1170} y={625} variant="weeping" scale={1.12} phase={0} />
      <PretCreatureRig x={1410} y={655} variant="weeping" scale={1.05} phase={1.1} />
      <PretCreatureRig x={1650} y={615} variant="weeping" scale={1.08} phase={2.0} />

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
