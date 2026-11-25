import audioSyncP9 from "../data/audio-sync-p9.json";

export const P9_FPS = 30;
export const P9_DURATION_FRAMES = 4050; // 135.0s

export interface P9SceneDef {
  id: string;
  label: string;
  startSec: number;
  endSec: number;
  startFrame: number;
  durationFrames: number;
}

export const P9_SCENES: P9SceneDef[] = [
  { id: "P9S01", label: "१. सुनसान नगरी व शरबत में स्नान", startSec: 0, endSec: 24.5, startFrame: 0, durationFrames: 735 },
  { id: "P9S02", label: "२. नंदी पर उल्टे बैठे महादेव", startSec: 24.5, endSec: 48.0, startFrame: 735, durationFrames: 705 },
  { id: "P9S03", label: "३. मुख्य द्वार पर मैना देवी का प्रश्न", startSec: 48.0, endSec: 76.0, startFrame: 1440, durationFrames: 840 },
  { id: "P9S04", label: "४. प्रचंड मुख दर्शन व मैना मूर्छा", startSec: 76.0, endSec: 108.0, startFrame: 2280, durationFrames: 960 },
  { id: "P9S05", label: "५. श्मशान जनवासा व शिव-नारायण संवाद", startSec: 108.0, endSec: 135.0, startFrame: 3240, durationFrames: 810 },
];

export interface P9SubtitleCue {
  startSec: number;
  endSec: number;
  text: string;
  speaker?: string;
}

export const SUBTITLES_P9: P9SubtitleCue[] = [
  { startSec: 0.7, endSec: 7.4, text: "कहीं बारात आती है तो सब इकट्ठे होते हैं, पर आज हिमालय की नगरी पूरी सुनसान हो गई!", speaker: "कथा प्रसंग" },
  { startSec: 7.6, endSec: 14.5, text: "एक सज्जन बड़ा घड़ा भरकर शरबत लिए खड़े थे बारातियों को पिलाने के लिए...", speaker: "नगरवासी" },
  { startSec: 14.7, endSec: 23.6, text: "पर भूत-प्रेत बाराती आए और शरबत पीना तो दूर, उसी शरबत को सिर पर उंडेलकर स्नान कर लिए!", speaker: "भूत-प्रेत बारात" },

  { startSec: 25.0, endSec: 33.8, text: "उधर महादेव नंदी पर सीधे नहीं, उल्टे बैठे हैं — बोले, ससुराल में मज़ाक हम ही प्रारंभ कर दें!", speaker: "महादेव" },
  { startSec: 34.0, endSec: 47.3, text: "श्रृंगी-भृंगी से हंसकर बोले — देखो भैया, सब देवताओं की बारात फीकी पड़ गई हमारी जमात के आगे!", speaker: "महादेव" },

  { startSec: 48.6, endSec: 57.5, text: "मैना देवी आरती थाल सजाए द्वार पर खड़ी हैं — देखा तो दूल्हा उल्टे बैठे हैं, मुख दिख ही नहीं रहा!", speaker: "मैना देवी" },
  { startSec: 57.7, endSec: 65.5, text: "मैना देवी बोलीं — अरे दूल्हा राजा से कहो घूम जाएँ, उल्टे काहे को बैठे हैं?", speaker: "मैना देवी" },
  { startSec: 65.7, endSec: 75.2, text: "श्रृंगी-भृंगी बोले — मैया ये देव नहीं महादेव हैं! ये नहीं घूमेंगे — नंदी ही घूमेगा!", speaker: "श्रृंगी-भृंगी" },

  { startSec: 76.6, endSec: 84.5, text: "मैना बोलीं — नेक तो कहो दूल्हा मुख मंडल दिखाएं! नंदी घूमा और सर्पों की लड़ें हटीं...", speaker: "प्रसंग" },
  { startSec: 84.7, endSec: 95.8, text: "अंग भस्म, आंखों में काजल, मुख में पान और लाल लार टपकती देख प्रचंड रूप प्रकट हुआ!", speaker: "महादेव रूप" },
  { startSec: 96.0, endSec: 107.2, text: "ऐसा विचित्र रूप देख मैना देवी मूर्छित होकर गिर पड़ीं, थाली गिरी और सखियां चीख मार भागीं!", speaker: "मैना मूर्छा" },

  { startSec: 108.6, endSec: 117.5, text: "महादेव बोले — यहां मूर्छित होना ही स्वागत का रिवाज होगा, चलो अपने जनवासे श्मशान घाट चलें!", speaker: "महादेव" },
  { startSec: 117.7, endSec: 133.4, text: "नारायण से हंसकर बोले — सासू माई ने जटा में गंगा व चंद्रमा देखा तो हमें दंडवत प्रणाम करने लगीं!", speaker: "महादेव संवाद" },
];

const voArr = audioSyncP9.vo as number[];
const bedArr = audioSyncP9.bed as number[];

export function getVoP9(frame: number): number {
  const idx = Math.max(0, Math.min(voArr.length - 1, Math.round(frame)));
  return voArr[idx] ?? 0;
}

export function getBedP9(frame: number): number {
  const idx = Math.max(0, Math.min(bedArr.length - 1, Math.round(frame)));
  return bedArr[idx] ?? 0;
}

export function getSmoothVoP9(frame: number, radius = 2): number {
  let sum = 0;
  let count = 0;
  for (let d = -radius; d <= radius; d++) {
    sum += getVoP9(frame + d);
    count++;
  }
  return sum / count;
}
