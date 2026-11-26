import React from "react";
import { AbsoluteFill, Audio, Sequence, Series, staticFile } from "remotion";
import { MahadevBaratPart01 } from "./MahadevBarat2M";
import { MahadevBaratPart02 } from "./part2/MahadevBaratPart02";
import { P2_DURATION_FRAMES } from "./part2/timelineP2";
import { MahadevBaratPart03 } from "./part3/MahadevBaratPart03";
import { P3_DURATION_FRAMES } from "./part3/timelineP3";
import { MahadevBaratPart04 } from "./part4/MahadevBaratPart04";
import { P4_DURATION_FRAMES } from "./part4/timelineP4";
import { MahadevBaratPart05 } from "./part5/MahadevBaratPart05";
import { P5_DURATION_FRAMES } from "./part5/timelineP5";
import { MahadevBaratPart06 } from "./part6/MahadevBaratPart06";
import { P6_DURATION_FRAMES } from "./part6/timelineP6";
import { MahadevBaratPart07 } from "./part7/MahadevBaratPart07";
import { P7_DURATION_FRAMES } from "./part7/timelineP7";
import { MahadevBaratPart08 } from "./part8/MahadevBaratPart08";
import { P8_DURATION_FRAMES } from "./part8/timelineP8";
import { MahadevBaratPart09 } from "./part9/MahadevBaratPart09";
import { P9_DURATION_FRAMES } from "./part9/timelineP9";
import { MahadevBaratPart10 } from "./part10/MahadevBaratPart10";
import { P10_DURATION_FRAMES } from "./part10/timelineP10";
import { MAHADEV_DURATION_FRAMES } from "./timeline";

export const FULL_MOVIE_FPS = 30;
export const FULL_MOVIE_P1_FRAMES_AT_30 = MAHADEV_DURATION_FRAMES / 2; // 7560 @ 60fps -> 3780 @ 30fps (126.00s)

export const FULL_MOVIE_DURATION_FRAMES =
  FULL_MOVIE_P1_FRAMES_AT_30 +
  P2_DURATION_FRAMES +
  P3_DURATION_FRAMES +
  P4_DURATION_FRAMES +
  P5_DURATION_FRAMES +
  P6_DURATION_FRAMES +
  P7_DURATION_FRAMES +
  P8_DURATION_FRAMES +
  P9_DURATION_FRAMES +
  P10_DURATION_FRAMES; // 32,100 frames (17m 50s @ 30fps)

/**
 * Complete 10-Part Mahadev Ki Barat Movie (1920x1080 @ 30fps, 17m 50s).
 * Visible and directly renderable inside Remotion Studio.
 */
export const MahadevBaratFullMovie: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0714" }}>
      <Series>
        {/* Part 01 (60fps visuals time-mapped cleanly to 30fps + 1x native audio) */}
        <Series.Sequence durationInFrames={FULL_MOVIE_P1_FRAMES_AT_30}>
          <AbsoluteFill>
            <Audio src={staticFile("audio/mahadev-barat-2m-master.mp3")} volume={1} />
            <Sequence from={0} durationInFrames={FULL_MOVIE_P1_FRAMES_AT_30} playbackRate={2}>
              <MahadevBaratPart01 muteAudio />
            </Sequence>
          </AbsoluteFill>
        </Series.Sequence>

        {/* Parts 02–10 (native 30fps) */}
        <Series.Sequence durationInFrames={P2_DURATION_FRAMES}>
          <MahadevBaratPart02 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={P3_DURATION_FRAMES}>
          <MahadevBaratPart03 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={P4_DURATION_FRAMES}>
          <MahadevBaratPart04 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={P5_DURATION_FRAMES}>
          <MahadevBaratPart05 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={P6_DURATION_FRAMES}>
          <MahadevBaratPart06 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={P7_DURATION_FRAMES}>
          <MahadevBaratPart07 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={P8_DURATION_FRAMES}>
          <MahadevBaratPart08 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={P9_DURATION_FRAMES}>
          <MahadevBaratPart09 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={P10_DURATION_FRAMES}>
          <MahadevBaratPart10 />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
