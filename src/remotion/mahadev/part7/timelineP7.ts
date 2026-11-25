import audioSyncP7 from "../data/audio-sync-p7.json";

export const P7_FPS = 30;
export const P7_DURATION_FRAMES = 3210; // 107.0s

export interface P7SceneDef {
  id: string;
  label: string;
  startSec: number;
  endSec: number;
  startFrame: number;
  durationFrames: number;
}

export const P7_SCENES: P7SceneDef[] = [
  { id: "P7S01", label: "१. सालियों की नेग हठ", startSec: 0, endSec: 20.5, startFrame: 0, durationFrames: 615 },
  { id: "P7S02", label: "२. नेग बनाम नाग कॉमेडी!", startSec: 20.5, endSec: 46.0, startFrame: 615, durationFrames: 765 },
  { id: "P7S03", label: "३. जीजाजी की अनोखी सीख", startSec: 46.0, endSec: 62.0, startFrame: 1380, durationFrames: 480 },
  { id: "P7S04", label: "४. वैकुंठ सा सजा हिमालय नगर", startSec: 62.0, endSec: 82.5, startFrame: 1860, durationFrames: 615 },
  { id: "P7S05", label: "५. गरुड़ पर श्रीमन नारायण व नारद मुनि", startSec: 82.5, endSec: 107.0, startFrame: 2475, durationFrames: 735 },
];

export interface P7SubtitleCue {
  startSec: number;
  endSec: number;
  text: string;
  speaker?: string;
}

export const SUBTITLES_P7: P7SubtitleCue[] = [
  { startSec: 0.8, endSec: 8.8, text: "सब सखियन ने मंगल गाए, मांगे अपनो नेग — भीतर जाने से पहले दूल्हा नेग दो!", speaker: "सखियाँ (द्वार)" },
  { startSec: 9.0, endSec: 19.5, text: "शंकर जी श्रृंगी-भृंगी को देखे — ए, हम कुछ लेके तो आए नहीं, क्या नेग दें इनको?", speaker: "महादेव" },

  { startSec: 21.2, endSec: 29.8, text: "श्रृंगी-भृंगी बोले — अरे नेग नहीं कह रही हैं, नाग कह रही हैं नाग! बाकी कोई कमी नहीं है!", speaker: "श्रृंगी-भृंगी" },
  { startSec: 30.0, endSec: 35.8, text: "शंकर जी बोले — अच्छा, सालियां नाग मांग रही हैं! बोले हां!", speaker: "महादेव" },
  { startSec: 36.0, endSec: 44.8, text: "शिव शंकर ने बड़े प्रेम से सब नाग दिए हैं फेंक — डर के भागी सारी सखियां हिमाचल नगरी!", speaker: "भजन हास्य" },

  { startSec: 46.7, endSec: 55.6, text: "जिन लोगों का अभी ब्याह होने वाला है उनके लिए रोल मॉडल हैं शंकर जी — जेब में सांप धर के ले जाना!", speaker: "कथा हास्य" },
  { startSec: 55.8, endSec: 61.1, text: "पर अब सुनिए — बीच में तो हिमालय पर बहुत कुछ हो गया!", speaker: "कथा प्रसंग" },

  { startSec: 62.7, endSec: 71.0, text: "शंकर जी की बारात जा रही है हिमालय — आज वैकुंठ से भी सुंदर सजा है हिमालय!", speaker: "हिमालय नगरी" },
  { startSec: 71.2, endSec: 81.4, text: "अटारियों पर सखियां और थाल लिए मैना देवी खड़ी हैं — नारद जी ने तीनों लोकों में ऐसा सुयोग्य वर ढूंढा है!", speaker: "मैना देवी" },

  { startSec: 83.2, endSec: 91.5, text: "पीतांबरी पहने बाराती और गरुड़ जी पर शंख-चक्र-गदा-पद्म धारण किए श्रीमन नारायण आ रहे हैं!", speaker: "श्री नारायण" },
  { startSec: 91.7, endSec: 97.5, text: "मैना देवी बोलीं — आपने मेरी पुत्री के लिए ऐसे सुयोग्य वर ढूंढे!", speaker: "मैना देवी" },
  { startSec: 97.7, endSec: 105.0, text: "नारद जी बोले — नहीं-नहीं, ये तो उनके मिलने-जुलने वाले हैं, ये दूल्हा नहीं हैं!", speaker: "नारद मुनि" },
];

const voArr = audioSyncP7.vo as number[];
const bedArr = audioSyncP7.bed as number[];

export function getVoP7(frame: number): number {
  const idx = Math.max(0, Math.min(voArr.length - 1, Math.round(frame)));
  return voArr[idx] ?? 0;
}

export function getBedP7(frame: number): number {
  const idx = Math.max(0, Math.min(bedArr.length - 1, Math.round(frame)));
  return bedArr[idx] ?? 0;
}

export function getSmoothVoP7(frame: number, radius = 2): number {
  let sum = 0;
  let count = 0;
  for (let d = -radius; d <= radius; d++) {
    sum += getVoP7(frame + d);
    count++;
  }
  return sum / count;
}
