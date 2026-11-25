import React from "react";
import { Composition } from "remotion";
import { MahadevBaratPart01 } from "./mahadev/MahadevBarat2M";
import { MahadevBaratPart02 } from "./mahadev/part2/MahadevBaratPart02";
import { MahadevBaratPart03 } from "./mahadev/part3/MahadevBaratPart03";
import { MahadevBaratPart04 } from "./mahadev/part4/MahadevBaratPart04";
import { MahadevBaratPart05 } from "./mahadev/part5/MahadevBaratPart05";
import { MahadevBaratPart06 } from "./mahadev/part6/MahadevBaratPart06";
import { MahadevBaratPart07 } from "./mahadev/part7/MahadevBaratPart07";
import {
  MAHADEV_DURATION_FRAMES,
  MAHADEV_FPS,
  MAHADEV_HEIGHT,
  MAHADEV_WIDTH,
} from "./mahadev/timeline";
import { P2_DURATION_FRAMES, P2_FPS } from "./mahadev/part2/timelineP2";
import { P3_DURATION_FRAMES, P3_FPS } from "./mahadev/part3/timelineP3";
import { P4_DURATION_FRAMES, P4_FPS } from "./mahadev/part4/timelineP4";
import { P5_DURATION_FRAMES, P5_FPS } from "./mahadev/part5/timelineP5";
import { P6_DURATION_FRAMES, P6_FPS } from "./mahadev/part6/timelineP6";
import { P7_DURATION_FRAMES, P7_FPS } from "./mahadev/part7/timelineP7";

/**
 * Mahadev Barat — Episodic 2-Minute 2.5D Animated Series
 * Only active Mahadev Barat compositions are registered here for fast, focused studio previews.
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MahadevBaratPart01"
        component={MahadevBaratPart01}
        durationInFrames={MAHADEV_DURATION_FRAMES}
        fps={MAHADEV_FPS}
        width={MAHADEV_WIDTH}
        height={MAHADEV_HEIGHT}
      />
      <Composition
        id="MahadevBaratPart02"
        component={MahadevBaratPart02}
        durationInFrames={P2_DURATION_FRAMES}
        fps={P2_FPS}
        width={MAHADEV_WIDTH}
        height={MAHADEV_HEIGHT}
      />
      <Composition
        id="MahadevBaratPart03"
        component={MahadevBaratPart03}
        durationInFrames={P3_DURATION_FRAMES}
        fps={P3_FPS}
        width={MAHADEV_WIDTH}
        height={MAHADEV_HEIGHT}
      />
      <Composition
        id="MahadevBaratPart04"
        component={MahadevBaratPart04}
        durationInFrames={P4_DURATION_FRAMES}
        fps={P4_FPS}
        width={MAHADEV_WIDTH}
        height={MAHADEV_HEIGHT}
      />
      <Composition
        id="MahadevBaratPart05"
        component={MahadevBaratPart05}
        durationInFrames={P5_DURATION_FRAMES}
        fps={P5_FPS}
        width={MAHADEV_WIDTH}
        height={MAHADEV_HEIGHT}
      />
      <Composition
        id="MahadevBaratPart06"
        component={MahadevBaratPart06}
        durationInFrames={P6_DURATION_FRAMES}
        fps={P6_FPS}
        width={MAHADEV_WIDTH}
        height={MAHADEV_HEIGHT}
      />
      <Composition
        id="MahadevBaratPart07"
        component={MahadevBaratPart07}
        durationInFrames={P7_DURATION_FRAMES}
        fps={P7_FPS}
        width={MAHADEV_WIDTH}
        height={MAHADEV_HEIGHT}
      />
    </>
  );
};
