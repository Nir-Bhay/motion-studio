import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame } from "remotion";
import "@fontsource/noto-sans-devanagari/400.css";
import "@fontsource/noto-sans-devanagari/700.css";
import "@fontsource/yatra-one/400.css";
import "@fontsource/rozha-one/400.css";
import { SCENES } from "./timeline";
import { S00Hook } from "./scenes/S00Hook";
import { S01Prep } from "./scenes/S01Prep";
import { S02ApsaraVadya } from "./scenes/S02ApsaraVadya";
import { S03Vishnu } from "./scenes/S03Vishnu";
import { S04BrahmaIndra } from "./scenes/S04BrahmaIndra";
import { S05ShamshanReveal } from "./scenes/S05ShamshanReveal";
import { S06VishnuAdvice } from "./scenes/S06VishnuAdvice";
import { S07ShivGana } from "./scenes/S07ShivGana";
import { DevanagariCaptions, SceneTitleBanner } from "./ui/DevanagariCaptions";

const SCENE_HUD: Record<string, { title: string; subtitle: string }> = {
  S00: { title: "०. महा-रहस्य (प्रसंग आरंभ)", subtitle: "देवता • भूत-प्रेत • आज किसकी शादी है?" },
  S01: { title: "१. बारात की तैयारी", subtitle: "देवलोक • शगुन व मंगल गान" },
  S02: { title: "२. अप्सरा गान एवं मंगल वाद्य", subtitle: "डुमडुमिया • शहनाई • सजे हुए विमान" },
  S03: { title: "३. भगवान श्री नारायण पधारे", subtitle: "शंख • चक्र • गदा • पद्म • गरुड़ आरूढ़" },
  S04: { title: "४. ब्रह्मा जी एवं देवराज इंद्र पधारे", subtitle: "समस्त देवी-देवताओं का आगमन" },
  S05: { title: "५. श्मशान में दूल्हा महाराज", subtitle: "बाघंबर लपेटे • हाथ की तकिया लगाए शांत महादेव" },
  S06: { title: "६. श्री नारायण का श्रृंगार आग्रह", subtitle: "अचकन • सेहरा • राजसी पाग का निवेदन" },
  S07: { title: "७. शिव-गणों का प्रवेश एवं हठ", subtitle: "श्रृंगी-भृंगी • भोले भंडारी की स्वीकृति" },
};

export const MahadevBaratPart01: React.FC = () => {
  const frame = useCurrentFrame();
  const activeScene = SCENES.find((s) => frame >= s.startFrame && frame < s.startFrame + s.durationFrames) ?? SCENES[0];
  const hud = SCENE_HUD[activeScene.id];
  const localFrame = frame - activeScene.startFrame;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0714" }}>
      {/* Master Synchronized Katha Audio + Devotional Score */}
      <Audio src={staticFile("audio/mahadev-barat-2m-master.mp3")} volume={1} />

      <Sequence from={SCENES[0].startFrame} durationInFrames={SCENES[0].durationFrames}>
        <S00Hook />
      </Sequence>

      <Sequence from={SCENES[1].startFrame} durationInFrames={SCENES[1].durationFrames}>
        <S01Prep />
      </Sequence>

      <Sequence from={SCENES[2].startFrame} durationInFrames={SCENES[2].durationFrames}>
        <S02ApsaraVadya globalStartFrame={SCENES[2].startFrame} />
      </Sequence>

      <Sequence from={SCENES[3].startFrame} durationInFrames={SCENES[3].durationFrames}>
        <S03Vishnu globalStartFrame={SCENES[3].startFrame} />
      </Sequence>

      <Sequence from={SCENES[4].startFrame} durationInFrames={SCENES[4].durationFrames}>
        <S04BrahmaIndra globalStartFrame={SCENES[4].startFrame} />
      </Sequence>

      <Sequence from={SCENES[5].startFrame} durationInFrames={SCENES[5].durationFrames}>
        <S05ShamshanReveal globalStartFrame={SCENES[5].startFrame} />
      </Sequence>

      <Sequence from={SCENES[6].startFrame} durationInFrames={SCENES[6].durationFrames}>
        <S06VishnuAdvice globalStartFrame={SCENES[6].startFrame} />
      </Sequence>

      <Sequence from={SCENES[7].startFrame} durationInFrames={SCENES[7].durationFrames}>
        <S07ShivGana globalStartFrame={SCENES[7].startFrame} />
      </Sequence>

      {/* Fixed Top-Left HUD Banner (hidden during S00 rapid hook so full screen pops!) */}
      {activeScene.id !== "S00" && (activeScene.id !== "S05" || localFrame >= 290) && (
        <SceneTitleBanner
          title={hud.title}
          subtitle={hud.subtitle}
          localFrame={activeScene.id === "S05" ? localFrame - 290 : localFrame}
          durationFrames={activeScene.id === "S05" ? activeScene.durationFrames - 290 : activeScene.durationFrames}
        />
      )}

      {/* Real-time Audio-Synced Devanagari Subtitles */}
      <DevanagariCaptions globalFrame={frame} />
    </AbsoluteFill>
  );
};
