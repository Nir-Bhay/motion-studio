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
import { VishnuRig } from "../characters/VishnuRig";
import { MainaDeviRig, SakhiBandRig } from "../part6/HimalayaNagariRigs";
import { NaradMuniRig, PitambariBaratiCrowd, TossedSerpentArc } from "./NaradMuniRig";
import { getBedP7, getSmoothVoP7, P7_FPS, P7_SCENES, SUBTITLES_P7 } from "./timelineP7";

const Part7Captions: React.FC<{ globalFrame: number }> = ({ globalFrame }) => {
  const sec = globalFrame / P7_FPS;
  const active = SUBTITLES_P7.find((s) => sec >= s.startSec && sec <= s.endSec);
  const vo = getSmoothVoP7(globalFrame);
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

// P7-S01: Sakhis/Salis Demand Neg at the Gate -> Mahadev Confusedly Asks Shringi-Bhringi
const P7S01NegDemand: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const vo = getSmoothVoP7(gf);
  const zoom = frame > 280 ? 1.08 : 1.02;

  return (
    <ParallaxStage mode="himalaya" cameraX={Math.sin(frame * 0.03) * 14} zoom={zoom}>
      <BackgroundCrowdBand mode="himalaya_citizens" y={665} />
      <NandiBullRig x={480} y={660} scale={1.2} walking={false} />
      <MahadevBaratGroomRig
        x={455}
        y={505}
        scale={0.94}
        sehraProgress={1}
        bichhuProgress={1}
        panchmukhiProgress={1}
        bhasmaGlowProgress={1}
        speakingEnergy={vo}
        pose="calm"
        seatedOnNandi
      />
      <DetailedSpiritRig x={760} y={665} kind="shringi" scale={0.96} phase={0.3} />
      <DetailedSpiritRig x={940} y={675} kind="bhringi" scale={0.94} phase={1.2} />
      <SakhiBandRig x={1460} y={685} scale={1.06} askingNeg />

      {frame > 290 && (
        <div
          style={{
            position: "absolute",
            top: 225,
            left: 560,
            padding: "12px 24px",
            borderRadius: 20,
            background: "rgba(30, 27, 75, 0.94)",
            border: "2.5px solid #fde047",
            fontFamily: "'Noto Sans Devanagari', sans-serif",
            fontSize: 26,
            fontWeight: 700,
            color: "#fde047",
            boxShadow: "0 10px 26px rgba(0,0,0,0.28)",
          }}
        >
          “हम कुछ लेके तो आए नहीं — क्या नेग दें इनको?”
        </div>
      )}
    </ParallaxStage>
  );
};

// P7-S02: "Neg Nahi, Naag Keh Rahi Hain!" — Mahadev Tosses Snakes & Sakhis Run in Panic!
const P7S02NagComedy: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const vo = getSmoothVoP7(gf);
  const throwWindow = frame >= 380;
  const p1 = interpolate(frame, [395, 530], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const p2 = interpolate(frame, [430, 565], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const p3 = interpolate(frame, [465, 600], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const panicRun = interpolate(frame, [440, 680], [0, 540], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <ParallaxStage mode="himalaya" cameraX={throwWindow ? 45 : -15} zoom={throwWindow ? 1.07 : 1.03}>
      <BackgroundCrowdBand mode="himalaya_citizens" y={665} />
      <NandiBullRig x={460} y={660} scale={1.22} walking={false} />
      <MahadevBaratGroomRig
        x={435}
        y={505}
        scale={0.95}
        sehraProgress={1}
        bichhuProgress={1}
        panchmukhiProgress={1}
        bhasmaGlowProgress={1}
        speakingEnergy={vo}
        pose={throwWindow ? "heroic" : "calm"}
        seatedOnNandi
      />
      <DetailedSpiritRig x={745} y={668} kind="shringi" scale={0.98} phase={0.4} />
      <DetailedSpiritRig x={920} y={678} kind="bhringi" scale={0.95} phase={1.4} />

      {/* Sakhis scatter hilariously to the right once snakes fly! */}
      <SakhiBandRig x={1440 + panicRun} y={685} scale={1.04} panic={throwWindow && frame > 435} />

      {/* Three Tossed Coiled Snakes Flying Through the Air */}
      <TossedSerpentArc startX={500} startY={430} endX={1380} endY={590} progress={p1} color="#15803d" />
      <TossedSerpentArc startX={515} startY={445} endX={1480} endY={640} progress={p2} color="#166534" />
      <TossedSerpentArc startX={490} startY={425} endX={1320} endY={660} progress={p3} color="#14532d" />

      {frame < 340 && (
        <div
          style={{
            position: "absolute",
            top: 165,
            left: 600,
            padding: "12px 24px",
            borderRadius: 20,
            background: "rgba(30, 27, 75, 0.94)",
            border: "2.5px solid #fde047",
            fontFamily: "'Noto Sans Devanagari', sans-serif",
            fontSize: 28,
            fontWeight: 700,
            color: "#fde047",
          }}
        >
          “नेग नहीं… नाग कह रही हैं प्रभु, नाग!”
        </div>
      )}
    </ParallaxStage>
  );
};

// P7-S03: "Roll Model Hain Shankar Ji!" — Playful Katha Punchline Transitioning Back to Himalaya
const P7S03RoleModelJoke: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const vo = getSmoothVoP7(gf);
  const bed = getBedP7(gf);

  return (
    <ParallaxStage mode="himalaya" cameraX={interpolate(frame, [0, 480], [-20, 40])} zoom={1.06}>
      <BackgroundCrowdBand mode="bhoot_army" y={670} />
      <NandiBullRig x={960} y={662} scale={1.22} walking={false} />
      <MahadevBaratGroomRig
        x={935}
        y={505}
        scale={0.98 + bed * 0.02}
        sehraProgress={1}
        bichhuProgress={1}
        panchmukhiProgress={1}
        bhasmaGlowProgress={1}
        speakingEnergy={vo}
        pose="calm"
        seatedOnNandi
      />
      <DetailedSpiritRig x={560} y={670} kind="shringi" scale={1.0} phase={0.2} />
      <DetailedSpiritRig x={1360} y={675} kind="bhringi" scale={0.98} phase={1.1} flipX />
    </ParallaxStage>
  );
};

// P7-S04: Himalaya Nagari Decorated Better Than Vaikuntha — Sakhis on Attari + Maina Devi + Narad Muni
const P7S04HimalayaDecor: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const vo = getSmoothVoP7(gf);

  return (
    <ParallaxStage mode="himalaya" cameraX={Math.sin(frame * 0.03) * 18} zoom={1.04}>
      <BackgroundCrowdBand mode="himalaya_citizens" y={670} />
      {/* Sakhis watching joyfully from decorated palace area */}
      <SakhiBandRig x={360} y={690} scale={0.98} />
      {/* Queen Maina Devi holding golden Aarti thali */}
      <MainaDeviRig x={960} y={655} scale={1.08} mood="welcome" speakingEnergy={vo * 0.4} />
      {/* Narad Muni praising the groom */}
      <NaradMuniRig x={1360} y={635} scale={1.06} speakingEnergy={vo} gesture="explaining" flipX />

      <div
        style={{
          position: "absolute",
          top: 120,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <span
          style={{
            display: "inline-block",
            padding: "10px 32px",
            borderRadius: 999,
            background: "rgba(69, 10, 10, 0.88)",
            border: "2px solid #fde047",
            fontFamily: "'Yatra One', 'Noto Sans Devanagari', serif",
            fontSize: 38,
            color: "#fde047",
          }}
        >
          वैकुंठ से भी सुंदर सजा हिमाचल नगर!
        </span>
      </div>
    </ParallaxStage>
  );
};

// P7-S05: Pitambari Baratis + Shri Narayan on Garuda! Maina Thanks Narad -> "Ye Dulha Nahi Hain!"
const P7S05NarayanArrival: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const vo = getSmoothVoP7(gf);
  const enterX = interpolate(frame, [0, 320], [-220, 0], { extrapolateRight: "clamp" });
  const naradDenying = frame > 430;

  return (
    <ParallaxStage mode="himalaya" cameraX={interpolate(frame, [0, 735], [-20, 20])} zoom={1.03}>
      <BackgroundCrowdBand mode="himalaya_citizens" y={675} />
      <PitambariBaratiCrowd baseX={140 + enterX * 0.4} y={715} />

      {/* Bhagwan Vishnu Arriving on Garuda */}
      <VishnuRig
        x={470 + enterX}
        y={420}
        scale={0.96}
        withGaruda
        highlightItem="all"
        speakingEnergy={0}
        gestureMode="serene"
      />

      {/* Maina Devi & Narad Muni on the Right */}
      <MainaDeviRig x={1230} y={655} scale={1.02} mood="welcome" />
      <NaradMuniRig
        x={1560}
        y={635}
        scale={1.05}
        speakingEnergy={vo}
        gesture={naradDenying ? "denying" : "explaining"}
        flipX
      />

      {naradDenying && (
        <div
          style={{
            position: "absolute",
            top: 260,
            left: 1180,
            padding: "12px 26px",
            borderRadius: 20,
            background: "rgba(30, 27, 75, 0.94)",
            border: "2.5px solid #fde047",
            fontFamily: "'Noto Sans Devanagari', sans-serif",
            fontSize: 26,
            fontWeight: 700,
            color: "#fde047",
          }}
        >
          “नहीं-नहीं मैया, ये तो मित्र हैं — दूल्हा नहीं!”
        </div>
      )}
    </ParallaxStage>
  );
};

const P7_HUD: Record<string, { title: string; subtitle: string }> = {
  P7S01: { title: "१. सालियों की नेग हठ", subtitle: "द्वार पर मंगल गान व नेग की माँग" },
  P7S02: { title: "२. नेग बनाम नाग कॉमेडी", subtitle: "शिवजी ने प्रेम से फेंके नाग • भागी सखियाँ" },
  P7S03: { title: "३. जीजाजी की अनोखी सीख", subtitle: "कथा हास्य व हिमालय प्रसंग" },
  P7S04: { title: "४. वैकुंठ सा सजा हिमालय", subtitle: "अटारियों पर सखियाँ • मैना देवी व नारद जी" },
  P7S05: { title: "५. गरुड़ पर श्रीमन नारायण", subtitle: "मैना देवी का आभार व नारद जी का उत्तर" },
};

export const MahadevBaratPart07: React.FC = () => {
  const frame = useCurrentFrame();
  const active = P7_SCENES.find((s) => frame >= s.startFrame && frame < s.startFrame + s.durationFrames) ?? P7_SCENES[0];
  const hud = P7_HUD[active.id];

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0714" }}>
      <Audio src={staticFile("audio/mahadev-barat-part07-master.mp3")} volume={1} />
      <Sequence from={P7_SCENES[0].startFrame} durationInFrames={P7_SCENES[0].durationFrames}>
        <P7S01NegDemand gf={frame} />
      </Sequence>
      <Sequence from={P7_SCENES[1].startFrame} durationInFrames={P7_SCENES[1].durationFrames}>
        <P7S02NagComedy gf={frame} />
      </Sequence>
      <Sequence from={P7_SCENES[2].startFrame} durationInFrames={P7_SCENES[2].durationFrames}>
        <P7S03RoleModelJoke gf={frame} />
      </Sequence>
      <Sequence from={P7_SCENES[3].startFrame} durationInFrames={P7_SCENES[3].durationFrames}>
        <P7S04HimalayaDecor gf={frame} />
      </Sequence>
      <Sequence from={P7_SCENES[4].startFrame} durationInFrames={P7_SCENES[4].durationFrames}>
        <P7S05NarayanArrival gf={frame} />
      </Sequence>

      <SceneTitleBanner
        title={hud.title}
        subtitle={hud.subtitle}
        localFrame={frame - active.startFrame}
        durationFrames={active.durationFrames}
      />
      <Part7Captions globalFrame={frame} />
    </AbsoluteFill>
  );
};
