import React from "react";
import { MahadevRig } from "../characters/MahadevRig";

export const MahadevFaintOrCalm: React.FC<{ x: number; y: number; speakingEnergy: number }> = ({ x, y, speakingEnergy }) => (
  <MahadevRig x={x} y={y} scale={1.06} pose="sitting" speakingEnergy={speakingEnergy} />
);
