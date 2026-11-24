/**
 * Master Timeline — 120 BPM · 60 fps · 36 bars = 72.000 s (4,320 net frames)
 * Locked to measured voice-01 scene audio durations (vo_v4_scenes/s01..s11).
 */
export const FPS = 60;
export const BPM = 120;
export const FRAMES_PER_BEAT = 30;
export const FRAMES_PER_BAR = 120;
export const TOTAL_BARS = 36;
export const TOTAL_SECONDS = 72;
export const TOTAL_FRAMES = TOTAL_SECONDS * FPS; // 4,320 net frames

export const WIDTH = 1920;
export const HEIGHT = 1080;

export const TRANSITION_OVERLAP = 10; // 10 transitions x 10f = 100f

export interface SceneDef {
  id: string;
  label: string;
  act: 1 | 2 | 3;
  startSec: number;
  endSec: number;
  startFrame: number;
  endFrame: number;
  durationFrames: number;
}

export const SCENES = {
  S01: { id: "S01", label: "Hook",            act: 1 as const, startSec: 0.00,  endSec: 3.67,  startFrame: 0,    endFrame: 220,  durationFrames: 230 },
  S02: { id: "S02", label: "Chaos",           act: 1 as const, startSec: 3.67,  endSec: 11.20, startFrame: 220,  endFrame: 672,  durationFrames: 462 },
  S03: { id: "S03", label: "Bloom",           act: 2 as const, startSec: 11.20, endSec: 16.03, startFrame: 672,  endFrame: 962,  durationFrames: 300 },
  S04: { id: "S04", label: "Inbox",           act: 2 as const, startSec: 16.03, endSec: 25.80, startFrame: 962,  endFrame: 1548, durationFrames: 596 },
  S05: { id: "S05", label: "AIStudio",        act: 2 as const, startSec: 25.80, endSec: 36.77, startFrame: 1548, endFrame: 2206, durationFrames: 668 },
  S06: { id: "S06", label: "Automations",     act: 2 as const, startSec: 36.77, endSec: 42.50, startFrame: 2206, endFrame: 2550, durationFrames: 354 },
  S07: { id: "S07", label: "Campaigns",       act: 2 as const, startSec: 42.50, endSec: 47.90, startFrame: 2550, endFrame: 2874, durationFrames: 334 },
  S08: { id: "S08", label: "DashboardSocial", act: 2 as const, startSec: 47.90, endSec: 56.93, startFrame: 2874, endFrame: 3416, durationFrames: 552 },
  S09: { id: "S09", label: "Burst",           act: 3 as const, startSec: 56.93, endSec: 62.33, startFrame: 3416, endFrame: 3740, durationFrames: 334 },
  S10: { id: "S10", label: "Trust",           act: 3 as const, startSec: 62.33, endSec: 66.73, startFrame: 3740, endFrame: 4004, durationFrames: 274 },
  S11: { id: "S11", label: "Close",           act: 3 as const, startSec: 66.73, endSec: 72.00, startFrame: 4004, endFrame: 4320, durationFrames: 316 },
} as const;

export const BLOOM_GLOBAL_FRAME = 672; // 0:11.20 exact S03 Bloom

export const actWarmthAtFrame = (frame: number): number => {
  if (frame < BLOOM_GLOBAL_FRAME - 12) return 0;
  if (frame >= BLOOM_GLOBAL_FRAME + 24) return 1;
  return (frame - (BLOOM_GLOBAL_FRAME - 12)) / 36;
};

export const beatPulse = (frame: number, strength = 1): number => {
  const inBeat = (frame % FRAMES_PER_BEAT) / FRAMES_PER_BEAT;
  return Math.exp(-inBeat * 4.5) * strength;
};
