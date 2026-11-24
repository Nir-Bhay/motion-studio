import React from "react";
import { Audio, staticFile, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { SCENES, TOTAL_FRAMES, TRANSITION_OVERLAP } from "./timeline";
import { THEME } from "./theme";
import { StudioBackdrop } from "./ui/StudioBackdrop";
import { S01Hook } from "./scenes/S01Hook";
import { S02Chaos } from "./scenes/S02Chaos";
import { S03Bloom } from "./scenes/S03Bloom";
import { S04Inbox } from "./scenes/S04Inbox";
import { S05AiQualify } from "./scenes/S05AiQualify";
import { S06Workflow } from "./scenes/S06Workflow";
import { S07BroadcastPay } from "./scenes/S07BroadcastPay";
import { S08CrmAnalytics } from "./scenes/S08CrmAnalytics";
import { S09Burst } from "./scenes/S09Burst";
import { S10Trust } from "./scenes/S10Trust";
import { S11Close } from "./scenes/S11Close";

export interface SamyojMasterProps {
  audioSrc?: string;
}

/**
 * Samyoj Product Hunt Launch Film — 72.000s (4,320 net frames @ 60fps)
 * Locked frame-for-frame to voice-01 speech boundaries with directional TransitionSeries cuts.
 * Sum of 11 sequence durations = 4,420 frames minus 10 x 10f overlaps = 4,320 net frames!
 */
export const SamyojMaster: React.FC<SamyojMasterProps> = ({ audioSrc }) => {
  const frame = useCurrentFrame();
  const timing = linearTiming({ durationInFrames: TRANSITION_OVERLAP });

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        position: "relative",
        overflow: "hidden",
        background: THEME.canvas,
      }}
    >
      <StudioBackdrop globalFrame={frame} />

      {audioSrc ? <Audio src={staticFile(audioSrc)} /> : null}

      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENES.S01.durationFrames}>
          <S01Hook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={SCENES.S02.durationFrames}>
          <S02Chaos />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-left" })} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={SCENES.S03.durationFrames}>
          <S03Bloom />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={SCENES.S04.durationFrames}>
          <S04Inbox />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={SCENES.S05.durationFrames}>
          <S05AiQualify />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-right" })} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={SCENES.S06.durationFrames}>
          <S06Workflow />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-left" })} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={SCENES.S07.durationFrames}>
          <S07BroadcastPay />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={SCENES.S08.durationFrames}>
          <S08CrmAnalytics />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-bottom" })} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={SCENES.S09.durationFrames}>
          <S09Burst />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-top" })} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={SCENES.S10.durationFrames}>
          <S10Trust />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={timing} />

        <TransitionSeries.Sequence durationInFrames={SCENES.S11.durationFrames}>
          <S11Close />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* Hairline progress ribbon */}
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          height: 3,
          width: `${Math.min(100, (frame / TOTAL_FRAMES) * 100).toFixed(2)}%`,
          background: `linear-gradient(90deg, ${THEME.brand}, ${THEME.mint})`,
          opacity: frame >= SCENES.S03.startFrame ? 0.9 : 0.25,
          zIndex: 90,
        }}
      />
    </div>
  );
};
