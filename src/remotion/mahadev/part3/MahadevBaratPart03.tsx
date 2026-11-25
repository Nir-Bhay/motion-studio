import React from "react";
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import "@fontsource/noto-sans-devanagari/400.css";
import "@fontsource/noto-sans-devanagari/700.css";
import "@fontsource/yatra-one/400.css";
import { ParallaxStage } from "../environment/ParallaxStage";
import { VishnuRig } from "../characters/VishnuRig";
import { BrahmaRig, IndraOnAiravataRig } from "../characters/BrahmaIndraRigs";
import { ShivGanaRig } from "../characters/ShivGanaRig";
import { SceneTitleBanner } from "../ui/DevanagariCaptions";
import { MahadevBaratGroomRig } from "./MahadevBaratGroomRig";
import { getBedP3, getSmoothVoP3, P3_FPS, P3_SCENES, SUBTITLES_P3 } from "./timelineP3";

const Part3Captions: React.FC<{ globalFrame: number }> = ({ globalFrame }) => {
  const sec = globalFrame / P3_FPS;
  const active = SUBTITLES_P3.find((s) => sec >= s.startSec && sec <= s.endSec);
  const vo = getSmoothVoP3(globalFrame);
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

const P3S01Sehra: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const bed = getBedP3(gf);
  const sehra = interpolate(frame, [50, 290], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <ParallaxStage mode="shamshan" cameraX={0} zoom={interpolate(frame, [0, 366], [1.08, 1.18])}>
      <MahadevBaratGroomRig x={960} y={540} scale={1.26} sehraProgress={sehra} />
      <ShivGanaRig x={520} y={640} variant="shringi" scale={1.1} phase={0} />
      <ShivGanaRig x={1400} y={640} variant="bhringi" scale={1.08 + bed * 0.04} phase={1.3} flipX />
    </ParallaxStage>
  );
};

const P3S02Bichhu: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const bed = getBedP3(gf);
  const bichhu = interpolate(frame, [45, 290], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <ParallaxStage mode="shamshan" cameraX={0} zoom={interpolate(frame, [0, 384], [1.14, 1.24])}>
      <MahadevBaratGroomRig x={960} y={540} scale={1.28} sehraProgress={1} bichhuProgress={bichhu} />
      <ShivGanaRig x={480} y={660} variant="chubby" scale={1.08 + bed * 0.04} phase={0.5} />
      <ShivGanaRig x={1440} y={660} variant="shringi" scale={1.1} phase={1.8} flipX />
    </ParallaxStage>
  );
};

const P3S03Panchmukhi: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const vo = getSmoothVoP3(gf);
  const panch = interpolate(frame, [105, 310], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <ParallaxStage mode="shamshan" cameraX={0} zoom={1.15}>
      <MahadevBaratGroomRig x={960} y={545} scale={1.26} sehraProgress={1} bichhuProgress={1} panchmukhiProgress={panch} speakingEnergy={vo * 0.4} />
      <ShivGanaRig x={510} y={655} variant="bhringi" scale={1.1} phase={0.2} />
      <ShivGanaRig x={1410} y={655} variant="drummer" scale={1.06} phase={1.5} flipX />
    </ParallaxStage>
  );
};

const P3S04Bhasma: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const vo = getSmoothVoP3(gf);
  const glow = interpolate(frame, [260, 510], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <ParallaxStage mode="shamshan" cameraX={0} zoom={interpolate(frame, [0, 585], [1.02, 1.12])}>
      {/* Shining Devas on the right side for Shringi-Bhringi's playful comparison */}
      <IndraOnAiravataRig x={1210} y={565} scale={0.72} />
      <VishnuRig x={1470} y={520} scale={0.86} flipX />
      <BrahmaRig x={1720} y={505} scale={0.78} />

      <MahadevBaratGroomRig
        x={640}
        y={545}
        scale={1.2}
        sehraProgress={1}
        bichhuProgress={1}
        panchmukhiProgress={1}
        bhasmaGlowProgress={glow}
        speakingEnergy={vo * 0.4}
      />
      <ShivGanaRig x={240} y={690} variant="shringi" scale={1.08} phase={0} />
      <ShivGanaRig x={1020} y={700} variant="bhringi" scale={1.02} phase={1.2} flipX />
    </ParallaxStage>
  );
};

const P3S05Hahakar: React.FC<{ gf: number }> = ({ gf }) => {
  const vo = getSmoothVoP3(gf);
  const bed = getBedP3(gf);

  return (
    <ParallaxStage mode="shamshan" cameraX={0} zoom={1.05}>
      <MahadevBaratGroomRig
        x={620}
        y={545}
        scale={1.22}
        sehraProgress={1}
        bichhuProgress={1}
        panchmukhiProgress={1}
        bhasmaGlowProgress={1}
      />
      <ShivGanaRig x={230} y={670} variant="shringi" scale={1.12 + bed * 0.05} phase={0} />
      <ShivGanaRig x={990} y={690} variant="bhringi" scale={1.06} phase={1.1} flipX />
      <VishnuRig x={1440} y={520} scale={1.05} flipX speakingEnergy={vo} gestureMode="advising" />
      <IndraOnAiravataRig x={1710} y={555} scale={0.84} />
    </ParallaxStage>
  );
};

// P3-S06: Separate Deva Procession Lines! (Vishnu -> Brahma -> Indra -> Mahadev at rear with 5 Ganas)
const P3S06Pankti: React.FC<{ gf: number }> = ({ gf }) => {
  const frame = useCurrentFrame();
  const bed = getBedP3(gf);
  const marchOffset = interpolate(frame, [0, 510], [-140, 120]);

  return (
    <ParallaxStage mode="devaloka" cameraX={marchOffset * 0.45} zoom={1}>
      {/* Separate Row Banners in Sky (matched left-to-right: Rear -> Front) */}
      <div style={{ position: "absolute", top: 150, left: 0, right: 0, display: "flex", justifyContent: "space-around", padding: "0 90px", pointerEvents: "none" }}>
        {[
          { t: "४. महादेव व गण (सबसे पीछे)", c: "#e2e8f0" },
          { t: "३. इंद्र देव-सभा", c: "#93c5fd" },
          { t: "२. ब्रह्मा जी पंक्ति", c: "#fdba74" },
          { t: "१. श्री विष्णु पंक्ति (आगे)", c: "#fde047" },
        ].map((row, idx) => (
          <div
            key={idx}
            style={{
              padding: "6px 16px",
              borderRadius: 12,
              background: "rgba(24, 14, 46, 0.82)",
              border: `1.5px solid ${row.c}`,
              color: row.c,
              fontFamily: "'Noto Sans Devanagari', sans-serif",
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            {row.t}
          </div>
        ))}
      </div>

      {/* Line 1 (Front Right): Vishnu */}
      <VishnuRig x={1620 + marchOffset * 0.3} y={480} scale={0.94} />
      {/* Line 2: Brahma */}
      <BrahmaRig x={1220 + marchOffset * 0.25} y={495} scale={0.86} />
      {/* Line 3: Indra */}
      <IndraOnAiravataRig x={860 + marchOffset * 0.22} y={535} scale={0.86} />
      {/* Line 4 (Rear Left): Mahadev + 5-10 Ganas */}
      <MahadevBaratGroomRig
        x={380 + marchOffset * 0.15}
        y={540}
        scale={0.95}
        sehraProgress={1}
        bichhuProgress={1}
        panchmukhiProgress={1}
        bhasmaGlowProgress={1}
        pose="marching"
      />
      <ShivGanaRig x={140 + marchOffset * 0.15} y={665} variant="shringi" scale={0.85 + bed * 0.03} phase={0} />
      <ShivGanaRig x={560 + marchOffset * 0.15} y={695} variant="drummer" scale={0.82} phase={1.4} />

      {frame > 400 && (
        <div
          style={{
            position: "absolute",
            top: 215,
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: interpolate(frame, [400, 440], [0, 1], { extrapolateRight: "clamp" }),
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
              भाग ३ समाप्त • अब महादेव बुलाएंगे समस्त भूत-प्रेत!
            </div>
          </div>
        </div>
      )}
    </ParallaxStage>
  );
};

const P3_HUD: Record<string, { title: string; subtitle: string }> = {
  P3S01: { title: "१. अद्भुत सर्पों का सेहरा", subtitle: "लहराते पतले सर्पों का दिव्य वेश" },
  P3S02: { title: "२. बिच्छू लटकन व कर्ण-भूषण", subtitle: "सर्पों की जीभ व कानों में झूलते बिच्छू" },
  P3S03: { title: "३. पंचमुखी नाग-हार", subtitle: "गले में पाँच मुख वाले तेजस्वी नागराज" },
  P3S04: { title: "४. गरम चिता भस्म श्रृंगार", subtitle: "सूर्य से भी प्रखर महादेव की दिव्य आभा" },
  P3S05: { title: "५. दूल्हा तैयार! नारायण का विस्मय", subtitle: "हिमालय में आज हाहाकार होने वाली है!" },
  P3S06: { title: "६. देवताओं की अलग-अलग पंक्तियाँ", subtitle: "आगे देव-वृंद, सबसे पीछे महादेव और गण" },
};

export const MahadevBaratPart03: React.FC = () => {
  const frame = useCurrentFrame();
  const active = P3_SCENES.find((s) => frame >= s.startFrame && frame < s.startFrame + s.durationFrames) ?? P3_SCENES[0];
  const hud = P3_HUD[active.id];

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0714" }}>
      <Audio src={staticFile("audio/mahadev-barat-part03-master.mp3")} volume={1} />
      <Sequence from={P3_SCENES[0].startFrame} durationInFrames={P3_SCENES[0].durationFrames}>
        <P3S01Sehra gf={frame} />
      </Sequence>
      <Sequence from={P3_SCENES[1].startFrame} durationInFrames={P3_SCENES[1].durationFrames}>
        <P3S02Bichhu gf={frame} />
      </Sequence>
      <Sequence from={P3_SCENES[2].startFrame} durationInFrames={P3_SCENES[2].durationFrames}>
        <P3S03Panchmukhi gf={frame} />
      </Sequence>
      <Sequence from={P3_SCENES[3].startFrame} durationInFrames={P3_SCENES[3].durationFrames}>
        <P3S04Bhasma gf={frame} />
      </Sequence>
      <Sequence from={P3_SCENES[4].startFrame} durationInFrames={P3_SCENES[4].durationFrames}>
        <P3S05Hahakar gf={frame} />
      </Sequence>
      <Sequence from={P3_SCENES[5].startFrame} durationInFrames={P3_SCENES[5].durationFrames}>
        <P3S06Pankti gf={frame} />
      </Sequence>

      <SceneTitleBanner
        title={hud.title}
        subtitle={hud.subtitle}
        localFrame={frame - active.startFrame}
        durationFrames={active.durationFrames}
      />
      <Part3Captions globalFrame={frame} />
    </AbsoluteFill>
  );
};
