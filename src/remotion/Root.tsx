import React from "react";
import { Composition } from "remotion";
import { MahadevBaratPart01 } from "./mahadev/MahadevBarat2M";
import { MahadevBaratPart02 } from "./mahadev/part2/MahadevBaratPart02";
import { MahadevBaratPart03 } from "./mahadev/part3/MahadevBaratPart03";
import {
  MAHADEV_DURATION_FRAMES,
  MAHADEV_FPS,
  MAHADEV_HEIGHT,
  MAHADEV_WIDTH,
} from "./mahadev/timeline";
import { P2_DURATION_FRAMES, P2_FPS } from "./mahadev/part2/timelineP2";
import { P3_DURATION_FRAMES, P3_FPS } from "./mahadev/part3/timelineP3";

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
    </>
  );
};
