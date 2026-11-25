import audioSync from "./data/audio-sync.json";

export const MAHADEV_FPS = 60;
export const MAHADEV_WIDTH = 1920;
export const MAHADEV_HEIGHT = 1080;
export const MAHADEV_DURATION_FRAMES = 7560; // 126.000s (6s Cold-Open Hook + 2m Katha)

export interface SceneDef {
  id: string;
  label: string;
  startSec: number;
  endSec: number;
  startFrame: number;
  durationFrames: number;
}

export const SCENES: SceneDef[] = [
  { id: "S00", label: "कथा परिचय (महा-रहस्य)", startSec: 0, endSec: 6, startFrame: 0, durationFrames: 360 },
  { id: "S01", label: "बारात की तैयारी", startSec: 6, endSec: 21, startFrame: 360, durationFrames: 900 },
  { id: "S02", label: "अप्सरा गान एवं मंगल वाद्य", startSec: 21, endSec: 40, startFrame: 1260, durationFrames: 1140 },
  { id: "S03", label: "भगवान विष्णु का आगमन", startSec: 40, endSec: 62, startFrame: 2400, durationFrames: 1320 },
  { id: "S04", label: "ब्रह्मा एवं इंद्र पधारे", startSec: 62, endSec: 72, startFrame: 3720, durationFrames: 600 },
  { id: "S05", label: "श्मशान में दूल्हा राजा", startSec: 72, endSec: 86.5, startFrame: 4320, durationFrames: 870 },
  { id: "S06", label: "नारायण का श्रृंगार आग्रह", startSec: 86.5, endSec: 104, startFrame: 5190, durationFrames: 1050 },
  { id: "S07", label: "शिव-गणों का प्रवेश एवं हठ", startSec: 104, endSec: 126, startFrame: 6240, durationFrames: 1320 },
];

export interface SubtitleCue {
  startSec: number;
  endSec: number;
  text: string;
  speaker?: string;
}

// Timestamped precisely to measured p00-hook + p01-p07 speech segments (+6.00s shift)
export const SUBTITLES: SubtitleCue[] = [
  { startSec: 0.25, endSec: 3.45, text: "भगवान विष्णु, ब्रह्मा जी, और ये भूत-प्रेत सब!", speaker: "प्रसंग आरंभ" },
  { startSec: 3.45, endSec: 5.85, text: "आखिर ये क्यों आए हैं? आज किसकी शादी है!", speaker: "प्रसंग आरंभ" },

  { startSec: 7.15, endSec: 10.55, text: "शंकर जी की बारात की तैयारी हो रही है। आहा!", speaker: "कथा वाचन" },
  { startSec: 10.85, endSec: 15.45, text: "लगे सँवारन सकल सुर, वाहन विविध विमान।", speaker: "चौपाई" },
  { startSec: 15.85, endSec: 19.75, text: "होई शगुन मंगल शुभद, करहिं अप्सरा गान।", speaker: "चौपाई" },

  { startSec: 21.75, endSec: 25.4, text: "अप्सराएं गान करने लगीं, डुमडुमिया बजने लगीं,", speaker: "कथा वाचन" },
  { startSec: 25.6, endSec: 29.1, text: "शहनाइयां बजने लगीं, मंगल वाद्य बजने लगे।", speaker: "कथा वाचन" },
  { startSec: 29.35, endSec: 33.7, text: "देवताओं ने अपने अपने वाहन सजा लिए, सब तैयारी करने लगे —", speaker: "कथा वाचन" },
  { startSec: 33.85, endSec: 37.7, text: "बोले महाराज सब चलो, आज महादेव की बारात जाएगी!", speaker: "देवगण" },

  { startSec: 40.75, endSec: 45.1, text: "भगवान विष्णु पधारे। अब बहुत सावधानी से सुनिएगा।", speaker: "कथा वाचन" },
  { startSec: 45.6, endSec: 48.95, text: "आहा! एक तो पहले से ही इतने सुंदर, और बारात में जाने के लिए और सुंदर बन कर के आए।", speaker: "श्री नारायण" },
  { startSec: 49.25, endSec: 56.45, text: "शंख, चक्र, गदा, पद्म लेकर के भगवान नारायण आए।", speaker: "श्री नारायण" },
  { startSec: 57.1, endSec: 60.65, text: "देख कर के सब बलैया लेने लगे — कितने सुंदर!", speaker: "देवगण" },

  { startSec: 62.95, endSec: 66.45, text: "ब्रह्मा जी चतुर्मुख चारों का श्रृंगार करके आए,", speaker: "श्री ब्रह्मा जी" },
  { startSec: 66.65, endSec: 70.45, text: "और सुंदर इंद्र भी आए, सब देवी-देवता सब पधारे।", speaker: "देवराज इंद्र" },

  { startSec: 72.95, endSec: 76.95, text: "लेकिन तभी सब ने पूछा — बोले कि दूल्हा राजा कहां हैं?", speaker: "देवगण" },
  { startSec: 77.4, endSec: 79.6, text: "बोले अभी भी श्मशान में ही बैठे हैं!", speaker: "कथा वाचन" },
  { startSec: 80.0, endSec: 85.25, text: "कुछ नहीं महाराज, बाघंबर लपेटे, हाथ की तकिया लगाए पड़े हुए हैं दूल्हा महाराज!", speaker: "महादेव" },

  { startSec: 87.25, endSec: 92.1, text: "भगवान विष्णु ने जाकर के कहा — बोले आज आपका ब्याह होना है!", speaker: "भगवान विष्णु" },
  { startSec: 92.35, endSec: 99.25, text: "तनिक सज-सँवर लो, थोड़ा स्नान-ध्यान करके शुद्ध हो जाओ, बढ़िया सी अचकन व सेहरा पहन लो,", speaker: "भगवान विष्णु" },
  { startSec: 99.35, endSec: 103.15, text: "सिर पर पाग पहन के तैयार हो के चलो — ब्याह होना है आपका!", speaker: "भगवान विष्णु" },

  { startSec: 104.25, endSec: 108.45, text: "इतने में शिव गण आ गए सारे, और भगवान से आकर बोले —", speaker: "शिव गण" },
  { startSec: 108.6, endSec: 114.15, text: "देखो भगवान, हमको बहुत दिन बाद ये अवसर मिला! हम महादेव के विवाह में जाएंगे।", speaker: "श्रृंगी-भृंगी" },
  { startSec: 114.65, endSec: 120.45, text: "श्रृंगार — आप सब लोग दूर हट जाओ! आज अपने तरीके का श्रृंगार हम करेंगे महादेव का!", speaker: "शिव गण" },
  { startSec: 121.1, endSec: 125.65, text: "महादेव तो भोले भंडारी, बोले भैया — जाको रुचि लग रही हो वही कर लो!", speaker: "महादेव" },
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
