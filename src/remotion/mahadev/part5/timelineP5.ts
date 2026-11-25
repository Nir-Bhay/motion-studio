import audioSyncP5 from "../data/audio-sync-p5.json";
import type { SubtitleCue } from "../timeline";

export const P5_FPS = 30;
export const P5_DURATION_FRAMES = 2370; // 79.000s

export const P5_SCENES = [
  { id: "P5S01", label: "प्रेतों की करुण पुकार", startFrame: 0, durationFrames: 450 },         // 0.0 - 15.0s
  { id: "P5S02", label: "दीनदयाल भोलेनाथ का वचन", startFrame: 450, durationFrames: 480 }, // 15.0 - 31.0s
  { id: "P5S03", label: "मुखहीन, बहुमुख व बहुपाद सेना", startFrame: 930, durationFrames: 540 }, // 31.0 - 49.0s
  { id: "P5S04", label: "विपुल नयन व रिष्ट-पुष्ट गण", startFrame: 1470, durationFrames: 375 }, // 49.0 - 61.5s
  { id: "P5S05", label: "हिमालय नगरी की ओर बारात प्रस्थान", startFrame: 1845, durationFrames: 525 }, // 61.5 - 79.0s
];

export const SUBTITLES_P5: SubtitleCue[] = [
  { startSec: 1.2, endSec: 8.2, text: "महादेव के पहुंचते ही सब भूत-प्रेत रोने लगे — बोले, हे बाबा, हमारे साथ बड़ा अन्याय हुआ!", speaker: "प्रेत-समुदाय" },
  { startSec: 8.4, endSec: 13.7, text: "इंद्र ने अपने वज्र का भय दिखाकर हमें रोक दिया और कहा तुम सब अपशकुन हो!", speaker: "प्रेत-समुदाय" },

  { startSec: 15.8, endSec: 22.1, text: "करुणासागर भोलेनाथ को इतनी दया आ गई — बोले, चिंता मत करो! हम वचन देते हैं...", speaker: "महादेव" },
  { startSec: 22.3, endSec: 29.7, text: "देवताओं के ब्याह में शगुन जाएंगे, और महादेव के ब्याह में सारे अपशकुन और भूत-प्रेत ही बाराती बनकर चलेंगे!", speaker: "महादेव" },

  { startSec: 32.0, endSec: 35.7, text: "महादेव के बुलाते ही अद्भुत प्रेत-सेना उमड़ पड़ी!", speaker: "कथा वाचन" },
  { startSec: 36.1, endSec: 42.9, text: "कोउ मुखहीन, विपुल मुख काहू — किसी का सिर ही नहीं था, तो किसी के बहुत सारे सिर थे;", speaker: "तुलसीदास छंद" },
  { startSec: 43.3, endSec: 47.4, text: "कोई रेंगकर चल रहा था, तो किसी के अनगिनत हाथ-पैर थे!", speaker: "तुलसीदास छंद" },

  { startSec: 49.6, endSec: 54.1, text: "किसी के नेत्र ही नहीं थे, तो किसी के खूब सारे चमकते नेत्र थे!", speaker: "तुलसीदास छंद" },
  { startSec: 54.5, endSec: 59.5, text: "कोई अत्यंत विशाल और प्रचंड शरीर वाला था, तो कोई बिल्कुल पतला-दुबला!", speaker: "तुलसीदास छंद" },

  { startSec: 62.2, endSec: 68.9, text: "सूकर, कूकर और गधे के मुख वाले भूत-प्रेत हुंकार और किलकारी भरते हुए चल पड़े —", speaker: "कथा वाचन" },
  { startSec: 69.2, endSec: 75.6, text: "समस्त लोकों को गुंजाती हुई महादेव की अलौकिक बारात हिमालय नगरी की ओर निकल पड़ी!", speaker: "महादेव बारात" },
];

const voArr = audioSyncP5.vo as number[];
const bedArr = audioSyncP5.bed as number[];

export function getSmoothVoP5(frame: number, radius = 2): number {
  let sum = 0;
  let count = 0;
  for (let d = -radius; d <= radius; d++) {
    const idx = Math.max(0, Math.min(voArr.length - 1, Math.round(frame + d)));
    sum += voArr[idx] ?? 0;
    count++;
  }
  return sum / count;
}

export function getBedP5(frame: number): number {
  const idx = Math.max(0, Math.min(bedArr.length - 1, Math.round(frame)));
  return bedArr[idx] ?? 0;
}
