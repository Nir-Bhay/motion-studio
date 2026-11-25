import React from "react";
import { AbsoluteFill, Audio, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import "@fontsource/noto-sans-devanagari/400.css";
import "@fontsource/noto-sans-devanagari/700.css";
import "@fontsource/yatra-one/400.css";
import { SceneTitleBanner } from "../ui/DevanagariCaptions";
import { MahadevBaratGroomRig } from "../part3/MahadevBaratGroomRig";
import { NandiBullRig } from "../part4/BhootPretAndNandiRigs";
import { BackgroundCrowdBand, DetailedSpiritRig } from "../characters/DetailedGanasAndSpirits";
import { VishnuRig } from "../characters/VishnuRig";
import { MainaDeviRig, SakhiBandRig } from "../part6/HimalayaNagariRigs";
import { HimalayaPalaceBackdrop } from "./HimalayaPalaceBackdrop";
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

// Reusable Camera Wrapper for Dynamic Cuts, Pans & Zooms
const CameraRig: React.FC<{ zoom?: number; panX?: number; panY?: number; children: React.ReactNode }> = ({
  zoom = 1,
  panX = 0,
  panY = 0,
  children,
}) => (
  <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#14071e" }}>
    <div
      style={{
        position: "absolute",
        inset: 0,
        transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
        transformOrigin: "center center",
      }}
    >
      {children}
    </div>
  </AbsoluteFill>
);

// P7-S01 (0 - 615f): 4 Voice-Synced Cuts!
// Cut 1A (0-155f): Sakhis singing Mangal Geet at ornate palace gate
// Cut 1B (155-290f): Sakhis blocking gate demanding "Dulha Neg Do!"
// Cut 1C (290-445f): Wide reaction shot — Mahadev on Nandi looks to Shringi-Bhringi
// Cut 1D (445-615f): Close-up on Mahadev & Shringi-Bhringi in humorous confusion
const P7S01NegDemand: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const vo = getSmoothVoP7(gf);
  const cut = frame < 155 ? 1 : frame < 290 ? 2 : frame < 445 ? 3 : 4;

  const cutPop = spring({
    frame: cut === 1 ? frame : cut === 2 ? frame - 155 : cut === 3 ? frame - 290 : frame - 445,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  if (cut === 1 || cut === 2) {
    const zoom = cut === 1 ? interpolate(frame, [0, 155], [1.06, 1.15]) : interpolate(cutPop, [0, 1], [1.12, 1.2]);
    return (
      <CameraRig zoom={zoom} panX={cut === 1 ? -110 : -150} panY={-25}>
        <HimalayaPalaceBackdrop variant="palace_gate" showAttariSakhis />
        <BackgroundCrowdBand mode="himalaya_citizens" y={685} />
        <SakhiBandRig x={1280} y={670} scale={1.16} askingNeg={cut === 2} />
        {/* Floating Musical Notes during Mangal Geet */}
        {cut === 1 && (
          <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            {[0, 1, 2, 3].map((i) => {
              const ny = 480 - ((frame * 1.4 + i * 45) % 160);
              const nx = 1140 + i * 85 + Math.sin(frame * 0.1 + i) * 14;
              return (
                <text key={i} x={nx} y={ny} fill="#fde047" fontSize={36} fontWeight="bold" opacity={0.9}>
                  {i % 2 === 0 ? "♪" : "♫"}
                </text>
              );
            })}
          </svg>
        )}
      </CameraRig>
    );
  }

  // Cut 1C & 1D: Mahadev glances to Shringi & Bhringi
  const zoom = cut === 3 ? interpolate(frame, [290, 445], [1.02, 1.09]) : interpolate(cutPop, [0, 1], [1.1, 1.18]);
  return (
    <CameraRig zoom={zoom} panX={cut === 4 ? 140 : 0} panY={cut === 4 ? -35 : 0}>
      <HimalayaPalaceBackdrop variant="palace_gate" showAttariSakhis />
      <BackgroundCrowdBand mode="bhoot_army" y={685} />
      <NandiBullRig x={500} y={660} scale={1.22} walking={false} />
      <MahadevBaratGroomRig
        x={475}
        y={505}
        scale={0.95}
        sehraProgress={1}
        bichhuProgress={1}
        panchmukhiProgress={1}
        bhasmaGlowProgress={1}
        speakingEnergy={vo}
        pose="calm"
        seatedOnNandi
      />
      <DetailedSpiritRig x={820} y={668} kind="shringi" scale={1.0} phase={0.3} />
      <DetailedSpiritRig x={1020} y={678} kind="bhringi" scale={0.98} phase={1.2} />
      {cut === 3 && <SakhiBandRig x={1520} y={685} scale={1.0} askingNeg />}

      {cut === 4 && (
        <div
          style={{
            position: "absolute",
            top: 215,
            left: 550,
            padding: "12px 24px",
            borderRadius: 20,
            background: "rgba(30, 27, 75, 0.94)",
            border: "2.5px solid #fde047",
            fontFamily: "'Noto Sans Devanagari', sans-serif",
            fontSize: 27,
            fontWeight: 700,
            color: "#fde047",
            boxShadow: "0 10px 26px rgba(0,0,0,0.35)",
          }}
        >
          “हम कुछ लेके तो आए नहीं — क्या नेग दें इनको?”
        </div>
      )}
    </CameraRig>
  );
};

// P7-S02 (615 - 1380f): 3 Voice-Synced Comedy Cuts!
// Cut 2A (0-280f): Close-up on Shringi-Bhringi explaining "Neg Nahi, Naag Keh Rahi Hain!" (with Cobra bubble)
// Cut 2B (280-470f): Mahadev beams "Accha, Naag Maang Rahi Hain! Bole Haan!"
// Cut 2C (470-765f): Wide Action Shot — 6 Coiled Snakes Fly Across Courtyard & Sakhis Run in Panic!
const P7S02NagComedy: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const vo = getSmoothVoP7(gf);
  const cut = frame < 280 ? 1 : frame < 470 ? 2 : 3;

  if (cut === 1) {
    return (
      <CameraRig zoom={1.16} panX={40} panY={-30}>
        <HimalayaPalaceBackdrop variant="comedy_closeup" />
        <BackgroundCrowdBand mode="bhoot_army" y={690} />
        <NandiBullRig x={520} y={662} scale={1.18} walking={false} />
        <MahadevBaratGroomRig
          x={495}
          y={508}
          scale={0.93}
          sehraProgress={1}
          bichhuProgress={1}
          panchmukhiProgress={1}
          bhasmaGlowProgress={1}
          speakingEnergy={0}
          pose="calm"
          seatedOnNandi
        />
        <DetailedSpiritRig x={920} y={665} kind="shringi" scale={1.12} phase={0.4} flipX />
        <DetailedSpiritRig x={1150} y={675} kind="bhringi" scale={1.06} phase={1.3} flipX />
        {/* Illustrated Cobra Bubble above Shringi */}
        <div
          style={{
            position: "absolute",
            top: 235,
            left: 845,
            padding: "12px 24px",
            borderRadius: 20,
            background: "rgba(30, 27, 75, 0.95)",
            border: "2.5px solid #fde047",
            fontFamily: "'Noto Sans Devanagari', sans-serif",
            fontSize: 27,
            fontWeight: 700,
            color: "#fde047",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span>“नेग नहीं… नाग कह रही हैं प्रभु, नाग!”</span>
        </div>
      </CameraRig>
    );
  }

  if (cut === 2) {
    return (
      <CameraRig zoom={interpolate(frame, [280, 470], [1.14, 1.24])} panX={220} panY={-40}>
        <HimalayaPalaceBackdrop variant="comedy_closeup" />
        <BackgroundCrowdBand mode="bhoot_army" y={690} />
        <NandiBullRig x={620} y={662} scale={1.2} walking={false} />
        <MahadevBaratGroomRig
          x={595}
          y={506}
          scale={0.96}
          sehraProgress={1}
          bichhuProgress={1}
          panchmukhiProgress={1}
          bhasmaGlowProgress={1}
          speakingEnergy={vo}
          pose="heroic"
          seatedOnNandi
        />
        <DetailedSpiritRig x={940} y={668} kind="shringi" scale={1.04} phase={0.6} flipX />
      </CameraRig>
    );
  }

  // Cut 2C: Wide Courtyard Action — 6 Flying Snakes & Sakhis Running Away!
  const p1 = interpolate(frame, [475, 610], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const p2 = interpolate(frame, [500, 635], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const p3 = interpolate(frame, [525, 660], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const p4 = interpolate(frame, [550, 685], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const p5 = interpolate(frame, [575, 710], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const panicRun = interpolate(frame, [505, 750], [0, 580], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <CameraRig zoom={1.03} panX={interpolate(frame, [470, 765], [-10, 35])}>
      <HimalayaPalaceBackdrop variant="palace_gate" showAttariSakhis />
      <BackgroundCrowdBand mode="himalaya_citizens" y={685} />
      <NandiBullRig x={450} y={660} scale={1.22} walking={false} />
      <MahadevBaratGroomRig
        x={425}
        y={505}
        scale={0.95}
        sehraProgress={1}
        bichhuProgress={1}
        panchmukhiProgress={1}
        bhasmaGlowProgress={1}
        speakingEnergy={vo}
        pose="heroic"
        seatedOnNandi
      />
      <DetailedSpiritRig x={740} y={668} kind="shringi" scale={0.98} phase={0.4} />
      <DetailedSpiritRig x={910} y={678} kind="bhringi" scale={0.95} phase={1.4} />

      <SakhiBandRig x={1420 + panicRun} y={685} scale={1.04} panic={frame > 500} />

      <TossedSerpentArc startX={490} startY={430} endX={1380} endY={580} progress={p1} color="#15803d" />
      <TossedSerpentArc startX={510} startY={445} endX={1480} endY={640} progress={p2} color="#166534" />
      <TossedSerpentArc startX={485} startY={425} endX={1330} endY={660} progress={p3} color="#14532d" />
      <TossedSerpentArc startX={505} startY={440} endX={1520} endY={600} progress={p4} color="#22c55e" />
      <TossedSerpentArc startX={495} startY={435} endX={1440} endY={670} progress={p5} color="#15803d" />
    </CameraRig>
  );
};

// P7-S03 (1380 - 1860f): 2 Cuts!
// Cut 3A (0-310f): Playful "Role Model Shankar Ji" comic spotlight
// Cut 3B (310-480f): Swirling Flashback Sweep back in time into Decorated Himalaya Nagari
const P7S03RoleModelJoke: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const vo = getSmoothVoP7(gf);
  const bed = getBedP7(gf);
  const isSweep = frame >= 310;

  if (isSweep) {
    const z = interpolate(frame, [310, 480], [1.14, 1.0]);
    return (
      <CameraRig zoom={z}>
        <HimalayaPalaceBackdrop variant="vaikuntha_himalaya" showAttariSakhis />
        <BackgroundCrowdBand mode="himalaya_citizens" y={685} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              padding: "16px 44px",
              borderRadius: 24,
              background: "rgba(69, 10, 10, 0.9)",
              border: "3px solid #fde047",
              fontFamily: "'Yatra One', 'Noto Sans Devanagari', serif",
              fontSize: 50,
              color: "#fde047",
              boxShadow: "0 18px 46px rgba(0,0,0,0.5)",
            }}
          >
            बीच में हिमालय पर क्या हुआ? आइए देखें...
          </span>
        </div>
      </CameraRig>
    );
  }

  return (
    <CameraRig zoom={1.08} panX={interpolate(frame, [0, 310], [-15, 20])}>
      <HimalayaPalaceBackdrop variant="comedy_closeup" />
      <BackgroundCrowdBand mode="bhoot_army" y={685} />
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
      <DetailedSpiritRig x={550} y={670} kind="shringi" scale={1.02} phase={0.2} />
      <DetailedSpiritRig x={1370} y={675} kind="bhringi" scale={1.0} phase={1.1} flipX />
      <div
        style={{
          position: "absolute",
          top: 155,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <span
          style={{
            display: "inline-block",
            padding: "10px 30px",
            borderRadius: 999,
            background: "rgba(30, 27, 75, 0.92)",
            border: "2.5px solid #fde047",
            fontFamily: "'Noto Sans Devanagari', sans-serif",
            fontSize: 30,
            fontWeight: 700,
            color: "#fde047",
          }}
        >
          साली कहे “नेग” — जीजाजी बोले “ले नाग!” 😄
        </span>
      </div>
    </CameraRig>
  );
};

// P7-S04 (1860 - 2475f): 3 Voice-Synced Cuts across Decorated Himalaya Nagari!
// Cut 4A (0-275f): Grand Wide Pan across Vaikuntha-Surpassing Himalaya Nagari & Attari Palaces
// Cut 4B (275-455f): Sakhis on Attaris + Queen Maina Devi Holding Aarti Thali at Doorway
// Cut 4C (455-615f): Close-Medium Shot — Maina Devi & Narad Muni ("Teeno Loko Mein Aisa Var!")
const P7S04HimalayaDecor: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const vo = getSmoothVoP7(gf);
  const cut = frame < 275 ? 1 : frame < 455 ? 2 : 3;

  if (cut === 1) {
    return (
      <CameraRig zoom={interpolate(frame, [0, 275], [1.02, 1.1])} panX={interpolate(frame, [0, 275], [-35, 35])}>
        <HimalayaPalaceBackdrop variant="vaikuntha_himalaya" showAttariSakhis />
        <BackgroundCrowdBand mode="himalaya_citizens" y={690} />
        <SakhiBandRig x={360} y={695} scale={0.94} />
        <SakhiBandRig x={1560} y={695} scale={0.94} />
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
              padding: "10px 34px",
              borderRadius: 999,
              background: "rgba(69, 10, 10, 0.9)",
              border: "2.5px solid #fde047",
              fontFamily: "'Yatra One', 'Noto Sans Devanagari', serif",
              fontSize: 40,
              color: "#fde047",
            }}
          >
            वैकुंठ से भी सुंदर सजा हिमाचल नगर!
          </span>
        </div>
      </CameraRig>
    );
  }

  if (cut === 2) {
    return (
      <CameraRig zoom={1.06} panX={15} panY={-10}>
        <HimalayaPalaceBackdrop variant="royal_courtyard" showAttariSakhis />
        <BackgroundCrowdBand mode="himalaya_citizens" y={685} />
        <SakhiBandRig x={390} y={690} scale={0.98} />
        <MainaDeviRig x={980} y={655} scale={1.1} mood="welcome" speakingEnergy={0} />
        <NaradMuniRig x={1370} y={635} scale={1.06} speakingEnergy={vo} gesture="explaining" flipX />
      </CameraRig>
    );
  }

  // Cut 4C: Warm close-medium on Maina Devi & Narad Muni playing Veena
  return (
    <CameraRig zoom={1.18} panX={-160} panY={-30}>
      <HimalayaPalaceBackdrop variant="royal_courtyard" showAttariSakhis />
      <BackgroundCrowdBand mode="himalaya_citizens" y={690} />
      <MainaDeviRig x={940} y={655} scale={1.1} mood="welcome" speakingEnergy={vo * 0.5} />
      <NaradMuniRig x={1310} y={635} scale={1.1} speakingEnergy={vo} gesture="playing" flipX />
    </CameraRig>
  );
};

// P7-S05 (2475 - 3210f): 3 Voice-Synced Cuts!
// Cut 5A (0-315f): Pitambari Baratis + Bhagwan Vishnu Soaring In on Garuda!
// Cut 5B (315-475f): Overjoyed Maina Devi Thanks Narad Muni!
// Cut 5C (475-735f): Narad Muni Waves Denial ("Nahi-Nahi, Ye Dulha Nahi Hain!") + Cliffhanger
const P7S05NarayanArrival: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const vo = getSmoothVoP7(gf);
  const cut = frame < 315 ? 1 : frame < 475 ? 2 : 3;
  const enterX = interpolate(frame, [0, 315], [-210, 20], { extrapolateRight: "clamp" });

  if (cut === 1) {
    return (
      <CameraRig zoom={interpolate(frame, [0, 315], [1.03, 1.09])} panX={interpolate(frame, [0, 315], [50, -10])}>
        <HimalayaPalaceBackdrop variant="royal_courtyard" showAttariSakhis />
        <BackgroundCrowdBand mode="himalaya_citizens" y={685} />
        <PitambariBaratiCrowd baseX={220 + enterX * 0.45} y={715} />
        <VishnuRig
          x={520 + enterX}
          y={415}
          scale={1.04}
          withGaruda
          highlightItem="all"
          speakingEnergy={0}
          gestureMode="serene"
        />
        <MainaDeviRig x={1320} y={655} scale={1.02} mood="welcome" />
        <NaradMuniRig x={1600} y={635} scale={1.04} speakingEnergy={0} gesture="explaining" flipX />
      </CameraRig>
    );
  }

  if (cut === 2) {
    return (
      <CameraRig zoom={1.16} panX={-240} panY={-25}>
        <HimalayaPalaceBackdrop variant="royal_courtyard" showAttariSakhis />
        <BackgroundCrowdBand mode="himalaya_citizens" y={685} />
        <VishnuRig x={540} y={420} scale={0.98} withGaruda highlightItem="all" gestureMode="serene" />
        <MainaDeviRig x={1190} y={655} scale={1.08} mood="welcome" speakingEnergy={vo} />
        <NaradMuniRig x={1510} y={635} scale={1.06} speakingEnergy={0} gesture="explaining" flipX />
      </CameraRig>
    );
  }

  // Cut 5C: Narad Muni Denies ("Ye Dulha Nahi Hain!") + Part 08 Cliffhanger
  return (
    <CameraRig zoom={1.12} panX={-170} panY={-20}>
      <HimalayaPalaceBackdrop variant="royal_courtyard" showAttariSakhis />
      <BackgroundCrowdBand mode="himalaya_citizens" y={685} />
      <VishnuRig x={500} y={420} scale={0.95} withGaruda highlightItem="all" gestureMode="serene" />
      <MainaDeviRig x={1180} y={655} scale={1.06} mood={frame > 570 ? "shocked" : "welcome"} />
      <NaradMuniRig x={1510} y={635} scale={1.08} speakingEnergy={vo} gesture="denying" flipX />

      <div
        style={{
          position: "absolute",
          top: 255,
          left: 1120,
          padding: "12px 26px",
          borderRadius: 20,
          background: "rgba(30, 27, 75, 0.94)",
          border: "2.5px solid #fde047",
          fontFamily: "'Noto Sans Devanagari', sans-serif",
          fontSize: 27,
          fontWeight: 700,
          color: "#fde047",
        }}
      >
        “नहीं-नहीं मैया, ये तो मित्र हैं — दूल्हा नहीं!”
      </div>
    </CameraRig>
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
