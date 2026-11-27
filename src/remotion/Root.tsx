import React from "react";
import { Composition } from "remotion";
import { SamyojLaunchV3, SamyojLaunchV3Hinglish } from "./samyoj-v3/SamyojLaunchV3";
import {
  V3_DURATION_FRAMES,
  V3_FPS,
  V3_HEIGHT,
  V3_WIDTH,
} from "./samyoj-v3/tokens";
import {
  FULL_MOVIE_DURATION_FRAMES,
  FULL_MOVIE_FPS,
  MahadevBaratFullMovie,
} from "./mahadev/MahadevBaratFullMovie";
import { MahadevBaratPart01 } from "./mahadev/MahadevBarat2M";
import { MahadevBaratPart02 } from "./mahadev/part2/MahadevBaratPart02";
import { MahadevBaratPart03 } from "./mahadev/part3/MahadevBaratPart03";
import { MahadevBaratPart04 } from "./mahadev/part4/MahadevBaratPart04";
import { MahadevBaratPart05 } from "./mahadev/part5/MahadevBaratPart05";
import { MahadevBaratPart06 } from "./mahadev/part6/MahadevBaratPart06";
import { MahadevBaratPart07 } from "./mahadev/part7/MahadevBaratPart07";
import { MahadevBaratPart08 } from "./mahadev/part8/MahadevBaratPart08";
import { MahadevBaratPart09 } from "./mahadev/part9/MahadevBaratPart09";
import { MahadevBaratPart10 } from "./mahadev/part10/MahadevBaratPart10";
import {
  MahadevBaratShort01,
  MahadevBaratShort02,
  MahadevBaratShort03,
  MahadevBaratShort04,
  MahadevBaratShort05,
} from "./mahadev/shorts/ShortsParts01To05";
import {
  MahadevBaratShort06,
  MahadevBaratShort07,
  MahadevBaratShort08,
  MahadevBaratShort09,
  MahadevBaratShort10,
} from "./mahadev/shorts/ShortsParts06To10";
import { SHORTS_FPS, SHORTS_HEIGHT, SHORTS_WIDTH } from "./mahadev/shorts/ShortsChrome";
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
import { P8_DURATION_FRAMES, P8_FPS } from "./mahadev/part8/timelineP8";
import { P9_DURATION_FRAMES, P9_FPS } from "./mahadev/part9/timelineP9";
import { P10_DURATION_FRAMES, P10_FPS } from "./mahadev/part10/timelineP10";

/**
 * Mahadev Barat — Episodic 2-Minute 2.5D Animated Series
 * Only active Mahadev Barat compositions are registered here for fast, focused studio previews.
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SamyojLaunchV3"
        component={SamyojLaunchV3}
        durationInFrames={V3_DURATION_FRAMES}
        fps={V3_FPS}
        width={V3_WIDTH}
        height={V3_HEIGHT}
      />
      <Composition
        id="SamyojLaunchV3Hinglish"
        component={SamyojLaunchV3Hinglish}
        durationInFrames={V3_DURATION_FRAMES}
        fps={V3_FPS}
        width={V3_WIDTH}
        height={V3_HEIGHT}
      />
      <Composition
        id="MahadevBaratFullMovie"
        component={MahadevBaratFullMovie}
        durationInFrames={FULL_MOVIE_DURATION_FRAMES}
        fps={FULL_MOVIE_FPS}
        width={MAHADEV_WIDTH}
        height={MAHADEV_HEIGHT}
      />
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
      <Composition
        id="MahadevBaratPart08"
        component={MahadevBaratPart08}
        durationInFrames={P8_DURATION_FRAMES}
        fps={P8_FPS}
        width={MAHADEV_WIDTH}
        height={MAHADEV_HEIGHT}
      />
      <Composition
        id="MahadevBaratPart09"
        component={MahadevBaratPart09}
        durationInFrames={P9_DURATION_FRAMES}
        fps={P9_FPS}
        width={MAHADEV_WIDTH}
        height={MAHADEV_HEIGHT}
      />
      <Composition
        id="MahadevBaratPart10"
        component={MahadevBaratPart10}
        durationInFrames={P10_DURATION_FRAMES}
        fps={P10_FPS}
        width={MAHADEV_WIDTH}
        height={MAHADEV_HEIGHT}
      />

      {/* Instagram Reels & YouTube Shorts (9:16 Vertical 1080x1920 @ 30fps) */}
      <Composition
        id="MahadevBaratShort01"
        component={MahadevBaratShort01}
        durationInFrames={3780}
        fps={SHORTS_FPS}
        width={SHORTS_WIDTH}
        height={SHORTS_HEIGHT}
      />
      <Composition
        id="MahadevBaratShort02"
        component={MahadevBaratShort02}
        durationInFrames={P2_DURATION_FRAMES}
        fps={SHORTS_FPS}
        width={SHORTS_WIDTH}
        height={SHORTS_HEIGHT}
      />
      <Composition
        id="MahadevBaratShort03"
        component={MahadevBaratShort03}
        durationInFrames={P3_DURATION_FRAMES}
        fps={SHORTS_FPS}
        width={SHORTS_WIDTH}
        height={SHORTS_HEIGHT}
      />
      <Composition
        id="MahadevBaratShort04"
        component={MahadevBaratShort04}
        durationInFrames={P4_DURATION_FRAMES}
        fps={SHORTS_FPS}
        width={SHORTS_WIDTH}
        height={SHORTS_HEIGHT}
      />
      <Composition
        id="MahadevBaratShort05"
        component={MahadevBaratShort05}
        durationInFrames={P5_DURATION_FRAMES}
        fps={SHORTS_FPS}
        width={SHORTS_WIDTH}
        height={SHORTS_HEIGHT}
      />
      <Composition
        id="MahadevBaratShort06"
        component={MahadevBaratShort06}
        durationInFrames={P6_DURATION_FRAMES}
        fps={SHORTS_FPS}
        width={SHORTS_WIDTH}
        height={SHORTS_HEIGHT}
      />
      <Composition
        id="MahadevBaratShort07"
        component={MahadevBaratShort07}
        durationInFrames={P7_DURATION_FRAMES}
        fps={SHORTS_FPS}
        width={SHORTS_WIDTH}
        height={SHORTS_HEIGHT}
      />
      <Composition
        id="MahadevBaratShort08"
        component={MahadevBaratShort08}
        durationInFrames={P8_DURATION_FRAMES}
        fps={SHORTS_FPS}
        width={SHORTS_WIDTH}
        height={SHORTS_HEIGHT}
      />
      <Composition
        id="MahadevBaratShort09"
        component={MahadevBaratShort09}
        durationInFrames={P9_DURATION_FRAMES}
        fps={SHORTS_FPS}
        width={SHORTS_WIDTH}
        height={SHORTS_HEIGHT}
      />
      <Composition
        id="MahadevBaratShort10"
        component={MahadevBaratShort10}
        durationInFrames={P10_DURATION_FRAMES}
        fps={SHORTS_FPS}
        width={SHORTS_WIDTH}
        height={SHORTS_HEIGHT}
      />
    </>
  );
};
