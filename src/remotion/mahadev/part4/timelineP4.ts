import audioSyncP4 from "../data/audio-sync-p4.json";
import type { SubtitleCue } from "../timeline";

export const P4_FPS = 30;
export const P4_DURATION_FRAMES = 2580; // 86.000s

export const P4_SCENES = [
  { id: "P4S01", label: "केवल दस-पांच गण!", startFrame: 0, durationFrames: 606 },         // 0.0 - 20.2s
  { id: "P4S02", label: "विश्व-भर से प्रेत आह्वान", startFrame: 606, durationFrames: 504 }, // 20.2 - 37.0s
  { id: "P4S03", label: "श्री राम बारात प्रसंग", startFrame: 1110, durationFrames: 435 },  // 37.0 - 51.5s
  { id: "P4S04", label: "इंद्र का वज्र व प्रेत-रोक", startFrame: 1545, durationFrames: 495 }, // 51.5 - 68.0s
  { id: "P4S05", label: "नंदी पर महादेव का आगमन", startFrame: 2040, durationFrames: 540 }, // 68.0 - 86.0s
];

export const SUBTITLES_P4: SubtitleCue[] = [
  { startSec: 1.0, endSec: 11.1, text: "सबसे आगे नारायण, पीछे ब्रह्मा जी, फिर इंद्र की देव-सभा और सबसे पीछे महादेव अपने केवल दस-पांच गणों संग चल रहे थे।", speaker: "कथा वाचन" },
  { startSec: 11.4, endSec: 18.7, text: "श्रृंगी-भृंगी बोले — भगवन, देवताओं की बारात इतनी विशाल है और हम सिर्फ दस-पांच ही हैं!", speaker: "श्रृंगी-भृंगी" },

  { startSec: 21.2, endSec: 27.7, text: "शंकर जी मुस्कुराकर बोले — इसमें चिंता की क्या बात है? विश्व के सारे श्मशान हमारे हैं!", speaker: "महादेव" },
  { startSec: 28.5, endSec: 35.8, text: "जाओ, हर भूत-प्रेत, डाकिनी-शाकिनी — यहां तक कि अमेरिका-लंदन बैठे दूर-दूर के प्रेत भी बुला लाओ!", speaker: "महादेव" },

  { startSec: 38.3, endSec: 44.8, text: "एक सुंदर प्रसंग सुनिए — जब प्रभु श्री राम जी की बारात जा रही थी, तब सारे प्रेत भी साथ चल पड़े!", speaker: "कथा वाचन" },
  { startSec: 45.2, endSec: 50.6, text: "प्रेतों की हुंकार और विचित्र चाल देखकर जनकपुर-अयोध्या के सब लोग घबरा गए।", speaker: "कथा वाचन" },

  { startSec: 52.8, endSec: 60.8, text: "इंद्र वज्र लेकर सामने खड़े हो गए — प्रेत बोले, राम जी के नाम से ही तो हम प्रेत-योनि से मुक्त होते हैं!", speaker: "इंद्र व प्रेत" },
  { startSec: 61.2, endSec: 66.8, text: "पर इंद्र ने वज्र का भय दिखाकर रोक दिया — बोले यहां केवल शगुन जाएंगे, अवगुण नहीं!", speaker: "इंद्र देव" },

  { startSec: 69.2, endSec: 75.1, text: "बेचारे प्रेत एक मैदान में बैठकर रोने लगे — हम इतने ही बुरे हैं तो हमारा सृजन क्यों किया?", speaker: "प्रेत-समुदाय" },
  { startSec: 75.6, endSec: 82.8, text: "तभी पीछे से नंदी पर सवार महादेव पधारे — बोले, श्रृंगी-भृंगी, देखो तो इतनी भीड़ क्यों रो रही है!", speaker: "महादेव" },
];

const voArr = audioSyncP4.vo as number[];
const bedArr = audioSyncP4.bed as number[];

export function getSmoothVoP4(frame: number, radius = 2): number {
  let sum = 0;
  let count = 0;
  for (let d = -radius; d <= radius; d++) {
    const idx = Math.max(0, Math.min(voArr.length - 1, Math.round(frame + d)));
    sum += voArr[idx] ?? 0;
    count++;
  }
  return sum / count;
}

export function getBedP4(frame: number): number {
  const idx = Math.max(0, Math.min(bedArr.length - 1, Math.round(frame)));
  return bedArr[idx] ?? 0;
}
