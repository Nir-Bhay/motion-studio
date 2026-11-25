import React from "react";
import { AbsoluteFill, Audio, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import "@fontsource/noto-sans-devanagari/400.css";
import "@fontsource/noto-sans-devanagari/700.css";
import "@fontsource/yatra-one/400.css";
import { ParallaxStage } from "../environment/ParallaxStage";
import { VishnuRig } from "../characters/VishnuRig";
import { ShivGanaRig } from "../characters/ShivGanaRig";
import { BackgroundCrowdBand, DetailedSpiritRig } from "../characters/DetailedGanasAndSpirits";
import { SceneTitleBanner } from "../ui/DevanagariCaptions";
import { MahadevGroomRig } from "./MahadevGroomRig";
import { HimalayaFlipBubble, KamdevFlashbackBubble } from "./KamdevAndHimalayaProps";
import { getBedP2, getSmoothVoP2, P2_FPS, P2_SCENES, SUBTITLES_P2 } from "./timelineP2";

const Part2Captions: React.FC<{ globalFrame: number }> = ({ globalFrame }) => {
  const sec = globalFrame / P2_FPS;
  const active = SUBTITLES_P2.find((s) => sec >= s.startSec && sec <= s.endSec);
  const vo = getSmoothVoP2(globalFrame);
  if (!active) return null;

  const fadeIn = interpolate(sec, [active.startSec, active.startSec + 0.22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeOut = interpolate(sec, [active.endSec - 0.2, active.endSec], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const op = Math.min(fadeIn, fadeOut);

  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 40, display: "flex", justifyContent: "center", opacity: op, pointerEvents: "none" }}>
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

// P2-S01: Ekant Talk
const P2S01Ekant: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const vo = getSmoothVoP2(gf);
  const walk = spring({ frame, fps, config: { damping: 15, stiffness: 55 } });

  return (
    <ParallaxStage mode="shamshan" cameraX={interpolate(frame, [0, 345], [30, -25])} zoom={1.05}>
      <MahadevGroomRig x={interpolate(walk, [0, 1], [620, 740])} y={545} scale={1.12} speakingEnergy={vo * 0.25} />
      <VishnuRig x={interpolate(walk, [0, 1], [1420, 1180])} y={530} scale={1.14} flipX speakingEnergy={vo} gestureMode="advising" />
    </ParallaxStage>
  );
};

// P2-S02: Multi-Clip Kamdev Bhasm Flashback & Playful Saliyan Warning!
const P2S02Kamdev: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const vo = getSmoothVoP2(gf);
  // Clip A (0..345): Vishnu & Shiv talking; Clip B (345..545): Kamdev Flashback; Clip C (545..885): Playful Saliyan & Ganas!
  const isKamdevCut = frame >= 345 && frame < 550;
  const isSaliyanCut = frame >= 550;
  const blastProgress = interpolate(frame, [385, 515], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const beam = frame >= 395 && frame <= 465 ? interpolate(frame, [395, 420, 465], [0, 1, 0]) : 0;

  if (isKamdevCut) {
    return (
      <ParallaxStage mode="devaloka" cameraX={Math.sin(frame * 0.4) * beam * 8} zoom={interpolate(frame, [345, 545], [1.05, 1.14])}>
        <BackgroundCrowdBand mode="devaloka" y={680} />
        <MahadevGroomRig x={1280} y={540} scale={1.18} thirdEyeBeam={beam} gesture="heroic" />
        <KamdevFlashbackBubble x={560} y={440} blastProgress={blastProgress} />
      </ParallaxStage>
    );
  }

  return (
    <ParallaxStage mode="shamshan" cameraX={0} zoom={interpolate(frame, [0, 885], [1.02, 1.08])}>
      <BackgroundCrowdBand mode="shamshan" y={655} />
      <MahadevGroomRig x={700} y={550} scale={1.14} speakingEnergy={vo * 0.35} />
      <VishnuRig x={1250} y={530} scale={1.14} flipX speakingEnergy={vo} gestureMode="advising" />
      {isSaliyanCut && (
        <>
          {/* Playful Giggling Saliyan & Restless Ganas during "साली-सरहज ने मज़ाक कर दी... गणों को संभालना!" */}
          <DetailedSpiritRig x={240} y={660} kind="shringi" scale={0.92} phase={0} />
          <DetailedSpiritRig x={410} y={710} kind="pishacha" scale={0.85} phase={1.3} />
          <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            {[1560, 1730].map((sx, idx) => (
              <g key={idx} transform={`translate(${sx}, ${580 + Math.sin(frame * 0.14 + idx) * 8})`}>
                <path d="M -20,-24 Q -46,-10 -52,-30" fill="none" stroke="#0b1120" strokeWidth={13} strokeLinecap="round" />
                <path d="M -20,-24 Q -46,-10 -52,-30" fill="none" stroke="#f7be9c" strokeWidth={8} strokeLinecap="round" />
                <path d="M 20,-24 Q 46,-10 52,-30" fill="none" stroke="#0b1120" strokeWidth={13} strokeLinecap="round" />
                <path d="M 20,-24 Q 46,-10 52,-30" fill="none" stroke="#f7be9c" strokeWidth={8} strokeLinecap="round" />
                <circle cx={-54} cy={-34} r={7} fill="#fb7185" stroke="#fde047" strokeWidth={1.5} />
                <path d="M -28,16 L 28,16 L 44,106 Q 0,120 -44,106 Z" fill={idx === 0 ? "#ec4899" : "#f59e0b"} stroke="#0b1120" strokeWidth={3} />
                <path d="M -20,-30 L 20,-30 L 16,18 L -16,18 Z" fill="#fbcfe8" stroke="#0b1120" strokeWidth={2.5} />
                <circle cx={0} cy={-54} r={22} fill="#f7be9c" stroke="#0b1120" strokeWidth={2.5} />
                <circle cx={-7} cy={-56} r={2.5} fill="#0b1120" />
                <circle cx={7} cy={-56} r={2.5} fill="#0b1120" />
                <path d="M -7,-44 Q 0,-38 7,-44" fill="none" stroke="#be123c" strokeWidth={2.5} />
                <circle cx={0} cy={-74} r={10} fill="#1e1b4b" />
              </g>
            ))}
          </svg>
        </>
      )}
    </ParallaxStage>
  );
};

// P2-S03: Sasural Joke & Himalaya Flip Warning
const P2S03Himalaya: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const vo = getSmoothVoP2(gf);
  const showHimalaya = frame >= 210 && frame <= 570;
  // Comedic flip around local frame 320 (52.5s)
  const tiltDeg = interpolate(frame, [280, 345, 420, 480], [0, 180, 180, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <ParallaxStage mode="shamshan" cameraX={Math.sin(frame * 0.06) * 14} zoom={1.06}>
      <MahadevGroomRig x={710} y={550} scale={1.14} speakingEnergy={vo} gesture="mischievous" />
      <VishnuRig x={1220} y={530} scale={1.12} flipX speakingEnergy={vo} gestureMode="advising" />
      {showHimalaya && <HimalayaFlipBubble x={1650} y={290} tiltDeg={tiltDeg} />}
    </ParallaxStage>
  );
};

// P2-S04: Calling All Shiv Ganas for Shringar
const P2S04GanaCall: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const vo = getSmoothVoP2(gf);
  const bed = getBedP2(gf);
  const rush = spring({ frame: Math.max(0, frame - 95), fps, config: { damping: 11, stiffness: 100 } });

  return (
    <ParallaxStage mode="shamshan" cameraX={0} zoom={1.02}>
      <MahadevGroomRig x={780} y={550} scale={1.15} speakingEnergy={vo} gesture="heroic" />
      <VishnuRig x={1630} y={525} scale={0.96} flipX gestureMode="chuckling" />
      <ShivGanaRig x={interpolate(rush, [0, 1], [-180, 270])} y={670} variant="shringi" scale={1.12} phase={0} />
      <ShivGanaRig x={interpolate(rush, [0, 1], [-240, 445])} y={715} variant="bhringi" scale={1.05} phase={1.1} />
      <ShivGanaRig x={interpolate(rush, [0, 1], [2120, 1120])} y={705} variant="chubby" scale={1.08 + bed * 0.04} phase={2.1} flipX />
      <ShivGanaRig x={interpolate(rush, [0, 1], [2200, 1300])} y={665} variant="tall" scale={1.02} phase={0.6} flipX />
    </ParallaxStage>
  );
};

// P2-S05: Weaving Towering Jata-Mukut Crown!
const P2S05JataMukut: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const vo = getSmoothVoP2(gf);
  const bed = getBedP2(gf);
  const crownProg = interpolate(frame, [45, 300], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <ParallaxStage mode="shamshan" cameraX={0} zoom={interpolate(frame, [0, 420], [1.04, 1.15])}>
      <BackgroundCrowdBand mode="shamshan" y={655} />
      <MahadevGroomRig x={960} y={555} scale={1.22} jataCrownProgress={crownProg} speakingEnergy={vo * 0.25} gesture="heroic" />
      {/* Shringi & Bhringi leaping beside Mahadev's crown weaving Jata! */}
      <ShivGanaRig x={620} y={595} variant="shringi" scale={1.08} phase={0} />
      <ShivGanaRig x={1300} y={595} variant="bhringi" scale={1.06} phase={1.4} flipX />
      <ShivGanaRig x={360} y={710} variant="drummer" scale={0.98 + bed * 0.05} phase={2.5} />
      <ShivGanaRig x={1560} y={710} variant="chubby" scale={1.0} phase={0.8} flipX />
      <DetailedSpiritRig x={170} y={605} kind="vetala" scale={0.84} phase={0.4} />
      <DetailedSpiritRig x={1750} y={605} kind="narsingha" scale={0.84} phase={1.7} flipX />
    </ParallaxStage>
  );
};

// P2-S06: Tiger-Skin Baghambar + Live Serpent Waist Belt + Head Serpent Crown!
const P2S06SarpShringar: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const bed = getBedP2(gf);
  const baghProg = interpolate(frame, [20, 150], [0.35, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const waistSnake = interpolate(frame, [130, 260], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const headSnake = interpolate(frame, [260, 380], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <ParallaxStage mode="shamshan" cameraX={0} zoom={interpolate(frame, [0, 510], [1.06, 1.16])}>
      <BackgroundCrowdBand mode="shamshan" y={665} />
      <MahadevGroomRig
        x={960}
        y={555}
        scale={1.24}
        jataCrownProgress={1}
        baghambarProgress={baghProg}
        waistSerpent={waistSnake}
        headSerpent={headSnake}
        gesture="heroic"
      />
      <ShivGanaRig x={540} y={665} variant="shringi" scale={1.12} phase={0} />
      <ShivGanaRig x={1380} y={665} variant="bhringi" scale={1.08} phase={1.5} flipX />
      <ShivGanaRig x={310} y={735} variant="drummer" scale={1.0 + bed * 0.05} phase={2.2} />
      <ShivGanaRig x={1610} y={735} variant="tall" scale={1.0} phase={0.7} flipX />
      <DetailedSpiritRig x={160} y={600} kind="narsingha" scale={0.86} phase={0.3} />
      <DetailedSpiritRig x={1760} y={605} kind="dakini" scale={0.84} phase={1.6} flipX />

      {frame > 410 && (
        <div
          style={{
            position: "absolute",
            top: 115,
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: interpolate(frame, [410, 445], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "14px 36px",
              borderRadius: 18,
              background: "rgba(28, 16, 48, 0.92)",
              border: "2px solid #fde047",
            }}
          >
            <div style={{ fontFamily: "'Yatra One', 'Noto Sans Devanagari', serif", fontSize: 42, color: "#fde047" }}>
              भाग २ समाप्त • अद्भुत सर्प श्रृंगार प्रारंभ!
            </div>
            <div style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontSize: 21, color: "#fed7aa", marginTop: 4 }}>
              आगे भाग ३: बिच्छू सेहरा, पंचमुखी सर्प और गरम चिता भस्म श्रृंगार!
            </div>
          </div>
        </div>
      )}
    </ParallaxStage>
  );
};

const P2_HUD: Record<string, { title: string; subtitle: string }> = {
  P2S01: { title: "१. विष्णु-शिव एकांत संवाद", subtitle: "विवाह से पूर्व स्नेहपूर्ण मंत्रणा" },
  P2S02: { title: "२. कामदेव भस्म प्रसंग", subtitle: "तीसरे नेत्र की लीला व साली-सरहज चेतावनी" },
  P2S03: { title: "३. ससुराल मज़ाक व हिमालय हास्य", subtitle: "भोलेनाथ की मधुर चुटकी" },
  P2S04: { title: "४. शिव-गणों का आह्वान", subtitle: "लाओ भैया, श्रृंगार करो हमारा!" },
  P2S05: { title: "५. जटाओं का भव्य मुकुट", subtitle: "गणों द्वारा अद्भुत केश-श्रृंगार" },
  P2S06: { title: "६. बाघंबर व जीवित सर्प श्रृंगार", subtitle: "कमर में सर्प करधनी • मस्तक पर नागराज" },
};

export const MahadevBaratPart02: React.FC = () => {
  const frame = useCurrentFrame();
  const active = P2_SCENES.find((s) => frame >= s.startFrame && frame < s.startFrame + s.durationFrames) ?? P2_SCENES[0];
  const hud = P2_HUD[active.id];

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0714" }}>
      <Audio src={staticFile("audio/mahadev-barat-part02-master.mp3")} volume={1} />
      <Sequence from={P2_SCENES[0].startFrame} durationInFrames={P2_SCENES[0].durationFrames}>
        <P2S01Ekant gf={frame} />
      </Sequence>
      <Sequence from={P2_SCENES[1].startFrame} durationInFrames={P2_SCENES[1].durationFrames}>
        <P2S02Kamdev gf={frame} />
      </Sequence>
      <Sequence from={P2_SCENES[2].startFrame} durationInFrames={P2_SCENES[2].durationFrames}>
        <P2S03Himalaya gf={frame} />
      </Sequence>
      <Sequence from={P2_SCENES[3].startFrame} durationInFrames={P2_SCENES[3].durationFrames}>
        <P2S04GanaCall gf={frame} />
      </Sequence>
      <Sequence from={P2_SCENES[4].startFrame} durationInFrames={P2_SCENES[4].durationFrames}>
        <P2S05JataMukut gf={frame} />
      </Sequence>
      <Sequence from={P2_SCENES[5].startFrame} durationInFrames={P2_SCENES[5].durationFrames}>
        <P2S06SarpShringar gf={frame} />
      </Sequence>

      <SceneTitleBanner
        title={hud.title}
        subtitle={hud.subtitle}
        localFrame={frame - active.startFrame}
        durationFrames={active.durationFrames}
      />
      <Part2Captions globalFrame={frame} />
    </AbsoluteFill>
  );
};
