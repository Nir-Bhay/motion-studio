import audioSync from "./data/audio-sync.json";

export const MAHADEV_FPS = 60;
export const MAHADEV_WIDTH = 1920;
export const MAHADEV_HEIGHT = 1080;
export const MAHADEV_DURATION_FRAMES = 7200; // 120.000s (2 minutes exact)

export interface SceneDef {
  id: string;
  label: string;
  startSec: number;
  endSec: number;
  startFrame: number;
  durationFrames: number;
}

export const SCENES: SceneDef[] = [
  { id: "S01", label: "बारात की तैयारी", startSec: 0, endSec: 15, startFrame: 0, durationFrames: 900 },
  { id: "S02", label: "अप्सरा गान एवं मंगल वाद्य", startSec: 15, endSec: 34, startFrame: 900, durationFrames: 1140 },
  { id: "S03", label: "भगवान विष्णु का आगमन", startSec: 34, endSec: 56, startFrame: 2040, durationFrames: 1320 },
  { id: "S04", label: "ब्रह्मा एवं इंद्र पधारे", startSec: 56, endSec: 66, startFrame: 3360, durationFrames: 600 },
  { id: "S05", label: "श्मशान में दूल्हा राजा", startSec: 66, endSec: 80.5, startFrame: 3960, durationFrames: 870 },
  { id: "S06", label: "नारायण का श्रृंगार आग्रह", startSec: 80.5, endSec: 98, startFrame: 4830, durationFrames: 1050 },
  { id: "S07", label: "शिव-गणों का प्रवेश एवं हठ", startSec: 98, endSec: 120, startFrame: 5880, durationFrames: 1320 },
];

export interface SubtitleCue {
  startSec: number;
  endSec: number;
  text: string;
  speaker?: string;
}

// Timestamped precisely to measured p01-p07 speech segments
export const SUBTITLES: SubtitleCue[] = [
  { startSec: 1.15, endSec: 4.55, text: "शंकर जी की बारात की तैयारी हो रही है। आहा!", speaker: "कथा वाचन" },
  { startSec: 4.85, endSec: 9.45, text: "लगे सँवारन सकल सुर, वाहन विविध विमान।", speaker: "चौपाई" },
  { startSec: 9.85, endSec: 13.75, text: "होई शगुन मंगल शुभद, करहिं अप्सरा गान।", speaker: "चौपाई" },

  { startSec: 15.75, endSec: 19.4, text: "अप्सराएं गान करने लगीं, डुमडुमिया बजने लगीं,", speaker: "कथा वाचन" },
  { startSec: 19.6, endSec: 23.1, text: "शहनाइयां बजने लगीं, मंगल वाद्य बजने लगे।", speaker: "कथा वाचन" },
  { startSec: 23.35, endSec: 27.7, text: "देवताओं ने अपने अपने वाहन सजा लिए, सब तैयारी करने लगे —", speaker: "कथा वाचन" },
  { startSec: 27.85, endSec: 31.7, text: "बोले महाराज सब चलो, आज महादेव की बारात जाएगी!", speaker: "देवगण" },

  { startSec: 34.75, endSec: 39.1, text: "भगवान विष्णु पधारे। अब बहुत सावधानी से सुनिएगा।", speaker: "कथा वाचन" },
  { startSec: 39.6, endSec: 42.95, text: "आहा! एक तो पहले से ही इतने सुंदर, और बारात में जाने के लिए और सुंदर बन कर के आए।", speaker: "श्री नारायण" },
  { startSec: 43.25, endSec: 50.45, text: "शंख, चक्र, गदा, पद्म लेकर के भगवान नारायण आए।", speaker: "श्री नारायण" },
  { startSec: 51.1, endSec: 54.65, text: "देख कर के सब बलैया लेने लगे — कितने सुंदर!", speaker: "देवगण" },

  { startSec: 56.95, endSec: 60.45, text: "ब्रह्मा जी चतुर्मुख चारों का श्रृंगार करके आए,", speaker: "श्री ब्रह्मा जी" },
  { startSec: 60.65, endSec: 64.45, text: "और सुंदर इंद्र भी आए, सब देवी-देवता सब पधारे।", speaker: "देवराज इंद्र" },

  { startSec: 66.95, endSec: 70.95, text: "लेकिन तभी सब ने पूछा — बोले कि दूल्हा राजा कहां हैं?", speaker: "देवगण" },
  { startSec: 71.4, endSec: 73.6, text: "बोले अभी भी श्मशान में ही बैठे हैं!", speaker: "कथा वाचन" },
  { startSec: 74.0, endSec: 79.25, text: "कुछ नहीं महाराज, बाघंबर लपेटे, हाथ की तकिया लगाए पड़े हुए हैं दूल्हा महाराज!", speaker: "महादेव" },

  { startSec: 81.25, endSec: 86.1, text: "भगवान विष्णु ने जाकर के कहा — बोले आज आपका ब्याह होना है!", speaker: "भगवान विष्णु" },
  { startSec: 86.35, endSec: 93.25, text: "तनिक सज-सँवर लो, थोड़ा स्नान-ध्यान करके शुद्ध हो जाओ, बढ़िया सी अचकन व सेहरा पहन लो,", speaker: "भगवान विष्णु" },
  { startSec: 93.35, endSec: 97.15, text: "सिर पर पाग पहन के तैयार हो के चलो — ब्याह होना है आपका!", speaker: "भगवान विष्णु" },

  { startSec: 98.25, endSec: 102.45, text: "इतने में शिव गण आ गए सारे, और भगवान से आकर बोले —", speaker: "शिव गण" },
  { startSec: 102.6, endSec: 108.15, text: "देखो भगवान, हमको बहुत दिन बाद ये अवसर मिला! हम महादेव के विवाह में जाएंगे।", speaker: "श्रृंगी-भृंगी" },
  { startSec: 108.65, endSec: 114.45, text: "श्रृंगार — आप सब लोग दूर हट जाओ! आज अपने तरीके का श्रृंगार हम करेंगे महादेव का!", speaker: "शिव गण" },
  { startSec: 115.1, endSec: 119.65, text: "महादेव तो भोले भंडारी, बोले भैया — जाको रुचि लग रही हो वही कर लो!", speaker: "महादेव" },
];

const voArr = audioSync.vo as number[];
const bedArr = audioSync.bed as number[];

export function getVoEnergy(frame: number): number {
  const idx = Math.max(0, Math.min(voArr.length - 1, Math.round(frame)));
  return voArr[idx] ?? 0;
}

export function getBedEnergy(frame: number): number {
  const idx = Math.max(0, Math.min(bedArr.length - 1, Math.round(frame)));
  return bedArr[idx] ?? 0;
}

// Smooth averaged VO energy around current frame for fluid mouth & gesture motion
export function getSmoothVoEnergy(frame: number, radius = 3): number {
  let sum = 0;
  let count = 0;
  for (let d = -radius; d <= radius; d++) {
    sum += getVoEnergy(frame + d);
    count++;
  }
  return sum / count;
}
