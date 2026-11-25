import audioSyncP3 from "../data/audio-sync-p3.json";
import type { SubtitleCue } from "../timeline";

export const P3_FPS = 30;
export const P3_DURATION_FRAMES = 2700; // 90.000s

export const P3_SCENES = [
  { id: "P3S01", label: "अद्भुत सर्पों का सेहरा", startFrame: 0, durationFrames: 366 },       // 0.0 - 12.2s
  { id: "P3S02", label: "बिच्छू लटकन व कर्ण-भूषण", startFrame: 366, durationFrames: 384 },   // 12.2 - 25.0s
  { id: "P3S03", label: "पंचमुखी नाग-हार", startFrame: 750, durationFrames: 375 },          // 25.0 - 37.5s
  { id: "P3S04", label: "गरम चिता भस्म श्रृंगार", startFrame: 1125, durationFrames: 585 },  // 37.5 - 57.0s
  { id: "P3S05", label: "दूल्हा तैयार! नारायण का विस्मय", startFrame: 1710, durationFrames: 480 }, // 57.0 - 73.0s
  { id: "P3S06", label: "देवताओं की अलग-अलग पंक्तियाँ", startFrame: 2190, durationFrames: 510 }, // 73.0 - 90.0s
];

export const SUBTITLES_P3: SubtitleCue[] = [
  { startSec: 1.0, endSec: 7.9, text: "गण एक सर्प को सिर के ऊपर बांधकर छोटे-छोटे पतले सर्प ले आए, और सामने की ओर लटका दिए।", speaker: "कथा वाचन" },
  { startSec: 8.3, endSec: 10.6, text: "बन गया अद्भुत सर्पों का सेहरा!", speaker: "महादेव श्रृंगार" },

  { startSec: 12.8, endSec: 17.1, text: "और सर्पों की लपलपाती जीभों में बड़े-बड़े बिच्छू लटका दिए!", speaker: "कथा वाचन" },
  { startSec: 17.4, endSec: 23.5, text: "जैसे पुष्पों के नीचे गुच्छे होते हैं, वैसे ही कानों और सेहरे पर बिच्छू झूलने लगे।", speaker: "महादेव श्रृंगार" },

  { startSec: 25.7, endSec: 30.3, text: "गले के एकमुखी सर्प से शंकर जी बोले — तुम थोड़ी देर विश्राम करो!", speaker: "महादेव" },
  { startSec: 30.6, endSec: 35.8, text: "फिर गणों ने पांच-पांच मुख वाले दिव्य नाग लाकर महादेव के गले में सजा दिए।", speaker: "महादेव श्रृंगार" },

  { startSec: 38.2, endSec: 44.4, text: "श्रृंगी-भृंगी बोले — भगवन, नारायण, ब्रह्मा और इंद्र बहुत चमक रहे हैं!", speaker: "श्रृंगी-भृंगी" },
  { startSec: 44.9, endSec: 48.7, text: "महादेव बोले — श्मशान से गरम चिता की भस्म ले आओ!", speaker: "महादेव" },
  { startSec: 49.2, endSec: 54.8, text: "अंग, वक्ष और मुख पर भस्म लगते ही भोलेनाथ सूर्य से भी अधिक चमक उठे!", speaker: "कथा वाचन" },

  { startSec: 57.8, endSec: 62.1, text: "श्रृंगी-भृंगी ने जयजयकार कर दी — दूल्हा राजा तैयार हैं!", speaker: "श्रृंगी-भृंगी" },
  { startSec: 62.3, endSec: 71.1, text: "भगवान नारायण ने जैसे ही शंकर जी को देखा, बोले — जय हो! आज हिमालय में जयजयकार नहीं, हाहाकार होगी!", speaker: "भगवान विष्णु" },

  { startSec: 73.7, endSec: 77.3, text: "नारायण बोले — सब अपनी-अपनी पंक्ति अलग कर लो!", speaker: "भगवान विष्णु" },
  { startSec: 77.7, endSec: 86.3, text: "सबसे आगे विष्णु जी, पीछे ब्रह्मा जी, फिर इंद्र की देव-सभा, और सबसे पीछे महादेव अपने दस-पांच गणों संग चल पड़े।", speaker: "कथा वाचन" },
];

const voArr = audioSyncP3.vo as number[];
const bedArr = audioSyncP3.bed as number[];

export function getSmoothVoP3(frame: number, radius = 2): number {
  let sum = 0;
  let count = 0;
  for (let d = -radius; d <= radius; d++) {
    const idx = Math.max(0, Math.min(voArr.length - 1, Math.round(frame + d)));
    sum += voArr[idx] ?? 0;
    count++;
  }
  return sum / count;
}

export function getBedP3(frame: number): number {
  const idx = Math.max(0, Math.min(bedArr.length - 1, Math.round(frame)));
  return bedArr[idx] ?? 0;
}
