import audioSyncP8 from "../data/audio-sync-p8.json";

export const P8_FPS = 30;
export const P8_DURATION_FRAMES = 3420; // 114.0s

export interface P8SceneDef {
  id: string;
  label: string;
  startSec: number;
  endSec: number;
  startFrame: number;
  durationFrames: number;
}

export const P8_SCENES: P8SceneDef[] = [
  { id: "P8S01", label: "१. चतुर्मुख ब्रह्मा भ्रम", startSec: 0, endSec: 23.0, startFrame: 0, durationFrames: 690 },
  { id: "P8S02", label: "२. देवराज इंद्र व नारद हास्य", startSec: 23.0, endSec: 44.0, startFrame: 690, durationFrames: 630 },
  { id: "P8S03", label: "३. भूतों की हुंकार व नारद का खिसकना", startSec: 44.0, endSec: 62.0, startFrame: 1320, durationFrames: 540 },
  { id: "P8S04", label: "४. बारात देख बालकों का भागना", startSec: 62.0, endSec: 81.5, startFrame: 1860, durationFrames: 585 },
  { id: "P8S05", label: "५. काँपते बच्चे व माई-बाप का प्रश्न", startSec: 81.5, endSec: 95.5, startFrame: 2445, durationFrames: 420 },
  { id: "P8S06", label: "६. बिना मुख के बाराती की दस्तक!", startSec: 95.5, endSec: 114.0, startFrame: 2865, durationFrames: 555 },
];

export interface P8SubtitleCue {
  startSec: number;
  endSec: number;
  text: string;
  speaker?: string;
}

export const SUBTITLES_P8: P8SubtitleCue[] = [
  { startSec: 0.7, endSec: 6.0, text: "मैना देवी सोचने लगीं — जिनके मित्र इतने सुंदर, तो दूल्हा जाने कैसे होंगे!", speaker: "मैना देवी" },
  { startSec: 6.2, endSec: 14.8, text: "पीछे आए चार मुख वाले ब्रह्मा जी! मैना बोलीं — पांचवां मुख ऊपर होगा, दिख नहीं रहा!", speaker: "मैना देवी" },
  { startSec: 15.0, endSec: 22.0, text: "नारद जी बोले — नहीं-नहीं मैया, ये तो चतुर्मुख ब्रह्मा जी हैं, ये भी दूल्हा नहीं हैं!", speaker: "नारद मुनि" },

  { startSec: 23.6, endSec: 30.8, text: "तीसरे आए देवराज इंद्र! सब बोले — नारद जी, निश्चित यही हमारे दूल्हा राजा हैं!", speaker: "हिमालय जन" },
  { startSec: 31.0, endSec: 37.8, text: "नारद जी हंसने लगे — महादेव को जब प्यास लगती है तो पानी पिलाने का काम यही करते हैं!", speaker: "नारद मुनि" },
  { startSec: 38.0, endSec: 43.3, text: "सब बोले — भैया पानी पिलाने वाला इतना सुंदर, तो दूल्हा कैसा होगा!", speaker: "हिमालय जन" },

  { startSec: 44.7, endSec: 52.0, text: "तभी दूर से हूं-हां, ही-ही की भयानक आवाज आने लगी!", speaker: "प्रसंग" },
  { startSec: 52.2, endSec: 61.3, text: "नारद जी बोले — मैं बारात की व्यवस्था देख के आता हूं... और धीरे से खिसक लिए वहां से!", speaker: "नारद मुनि" },

  { startSec: 62.7, endSec: 69.5, text: "बारात देखने सबसे पहले छोटे-छोटे बच्चे गए — पर सब चौकड़ी मारकर घरों की ओर भाग रहे हैं!", speaker: "हिमालय बालक" },
  { startSec: 69.7, endSec: 80.4, text: "भीतर से किवाड़ बंद करके छाती पर हाथ धर जोर-जोर से सांस लेने लगे!", speaker: "बालक भय" },

  { startSec: 82.1, endSec: 88.5, text: "अरे बाप रे बाप, कैसन-कइसन भूत-प्रेत, कैसन-कइसन सांप!", speaker: "भजन भाव" },
  { startSec: 88.7, endSec: 94.8, text: "छूटेला पसीना, स्वांस छूटे हांफ-हांफ — माई-बाप पूछन लगे आंचल से झांक!", speaker: "माई-बाप" },

  { startSec: 96.2, endSec: 103.5, text: "एक बिना मुख का बाराती द्वार खटखटाने लगा — हम बाराती हैं, रहने की व्यवस्था कहां है?", speaker: "मुंडहीन बाराती" },
  { startSec: 103.7, endSec: 112.5, text: "सब बोले — तुम यहीं रह जाओ, हम घर छोड़ के भागे भैया ऐसी बारात से!", speaker: "नगरवासी" },
];

const voArr = audioSyncP8.vo as number[];
const bedArr = audioSyncP8.bed as number[];

export function getVoP8(frame: number): number {
  const idx = Math.max(0, Math.min(voArr.length - 1, Math.round(frame)));
  return voArr[idx] ?? 0;
}

export function getBedP8(frame: number): number {
  const idx = Math.max(0, Math.min(bedArr.length - 1, Math.round(frame)));
  return bedArr[idx] ?? 0;
}

export function getSmoothVoP8(frame: number, radius = 2): number {
  let sum = 0;
  let count = 0;
  for (let d = -radius; d <= radius; d++) {
    sum += getVoP8(frame + d);
    count++;
  }
  return sum / count;
}
