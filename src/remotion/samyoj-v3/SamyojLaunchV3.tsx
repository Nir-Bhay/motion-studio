import "@fontsource-variable/inter";
import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import { FONT_INTER, V3_FPS } from "./tokens";
import { Backdrop, FilmGrain, SampleDataTag } from "./components/Effects";
import { Scene01Hook } from "./scenes/Scene01Hook";
import { Scene02WhatsAppInbox } from "./scenes/Scene02WhatsAppInbox";
import { Scene03CallingAi } from "./scenes/Scene03CallingAi";
import { Scene04TrainedAi } from "./scenes/Scene04TrainedAi";
import { Scene05AutomationBuilder } from "./scenes/Scene05AutomationBuilder";
import { Scene06SendEmail } from "./scenes/Scene06SendEmail";
import { Scene07InstagramDms } from "./scenes/Scene07InstagramDms";
import { Scene08CommentsAndPublishing } from "./scenes/Scene08CommentsAndPublishing";
import { Scene09AdPerformance } from "./scenes/Scene09AdPerformance";
import { Scene10DashboardOverview } from "./scenes/Scene10DashboardOverview";
import { Scene11Outro } from "./scenes/Scene11Outro";

export const SamyojLaunchV3: React.FC<{ audioSrc?: string }> = ({
  audioSrc = "audio/samyoj-v3-master-vo-v3.mp3",
}) => {
  const frame = useCurrentFrame();
  const t = frame / V3_FPS;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FFFFFF",
        fontFamily: FONT_INTER,
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      <Audio src={staticFile(audioSrc)} volume={1} />

      <Backdrop />

      {/* 11 Continuous Beat-Synced Scenes on Single Global Clock t (0.000 - 60.000s) */}
      <Scene01Hook t={t} />
      <Scene02WhatsAppInbox t={t} />
      <Scene03CallingAi t={t} />
      <Scene04TrainedAi t={t} />
      <Scene05AutomationBuilder t={t} />
      <Scene06SendEmail t={t} />
      <Scene08CommentsAndPublishing t={t} />
      <Scene07InstagramDms t={t} />
      <Scene09AdPerformance t={t} />
      <Scene10DashboardOverview t={t} />
      <Scene11Outro t={t} />

      {/* Subtle top-right Sample data tag across UI scenes 2-10 */}
      <SampleDataTag visible={t >= 5.0 && t < 54.0} />

      {/* 2% Monochrome Film Grain Overlay */}
      <FilmGrain t={t} />
    </AbsoluteFill>
  );
};

export const SamyojLaunchV3Hinglish: React.FC = () => (
  <SamyojLaunchV3 audioSrc="audio/samyoj-v3-master-vo-hi.mp3" />
);
