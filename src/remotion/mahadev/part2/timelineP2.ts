import audioSyncP2 from "../data/audio-sync-p2.json";
import type { SubtitleCue } from "../timeline";

export const P2_FPS = 30;
export const P2_DURATION_FRAMES = 3300; // 110.000s

export const P2_SCENES = [
  { id: "P2S01", label: "विष्णु-शिव एकांत संवाद", startFrame: 0, durationFrames: 345 },       // 0.0 - 11.5s
  { id: "P2S02", label: "कामदेव भस्म प्रसंग", startFrame: 345, durationFrames: 885 },      // 11.5 - 41.0s
  { id: "P2S03", label: "ससुराल व हिमालय हास्य", startFrame: 1230, durationFrames: 765 },  // 41.0 - 66.5s
  { id: "P2S04", label: "शिव-गणों का आह्वान", startFrame: 1995, durationFrames: 375 },    // 66.5 - 79.0s
  { id: "P2S05", label: "जटाओं का भव्य मुकुट", startFrame: 2370, durationFrames: 420 },    // 79.0 - 93.0s
  { id: "P2S06", label: "बाघंबर व जीवित सर्प श्रृंगार", startFrame: 2790, durationFrames: 510 }, // 93.0 - 110.0s
];

export const SUBTITLES_P2: SubtitleCue[] = [
  { startSec: 1.0, endSec: 6.1, text: "भगवान विष्णु ने शंकर जी का हाथ पकड़ा — बोले एकांत में आओ, आपसे कुछ बात करनी है।", speaker: "कथा वाचन" },
  { startSec: 6.5, endSec: 10.0, text: "शंकर जी एकांत में गए, इतने भोले हैं शंकर जी!", speaker: "कथा वाचन" },

  { startSec: 12.4, endSec: 20.8, text: "भगवान नारायण बोले — देखो ये विवाह हो रहा है। विवाह में मज़ाक आदि होते रहते हैं, बुरा मत मान जाना!", speaker: "भगवान विष्णु" },
  { startSec: 21.2, endSec: 24.1, text: "शंकर जी बोले — हम तो कभी बुरा मानते नहीं!", speaker: "महादेव" },
  { startSec: 24.6, endSec: 29.8, text: "नारायण बोले — कामदेव आया था तो आपने तीसरा नेत्र खोल के उसको भस्म कर दिया!", speaker: "भगवान विष्णु" },
  { startSec: 30.1, endSec: 35.3, text: "कहीं साली-सरहज ने मज़ाक कर दी और तीसरा नेत्र खुल गया, तो जल के राख हो जाएंगी!", speaker: "भगवान विष्णु" },
  { startSec: 35.6, endSec: 38.7, text: "ये सब मत करना, और अपने गणों को संभालना!", speaker: "भगवान विष्णु" },

  { startSec: 42.0, endSec: 48.7, text: "शंकर जी बोले — ससुराल में मज़ाक करते हैं दामाद के साथ? तो हम भी मज़ाक कर सकते हैं!", speaker: "महादेव" },
  { startSec: 49.2, endSec: 57.9, text: "नारायण बोले — कर ही सकते हो, पर आप जगत संहारक हैं! ऐसा मज़ाक मत कर देना कि हिमालय को ही उल्टा थाप दिया!", speaker: "भगवान विष्णु" },
  { startSec: 58.3, endSec: 64.3, text: "शंकर जी बोले — नहीं, हम अपने तरीके से करेंगे, और हम ही इतना मज़ाक कर देंगे!", speaker: "महादेव" },

  { startSec: 67.4, endSec: 71.3, text: "नारायण भगवान भी बोले — चलो होने दो, आनंद होने दो!", speaker: "भगवान विष्णु" },
  { startSec: 71.6, endSec: 77.3, text: "शंकर जी ने अपने सब गण बुलाए — बोले लाओ भैया, श्रृंगार करो हमारा!", speaker: "महादेव" },

  { startSec: 80.0, endSec: 87.3, text: "कैसा श्रृंगार किया? गणों ने महादेव की जटाओं को पकड़ कर के जटाओं का ही भव्य मुकुट बना दिया!", speaker: "कथा वाचन" },
  { startSec: 87.4, endSec: 91.1, text: "जटाएं खोल कर उन्हीं का राजसी मुकुट सजा दिया!", speaker: "श्रृंगार" },

  { startSec: 94.0, endSec: 103.1, text: "सुंदर बाघंबर पहनाई! रस्सी से नहीं — आज जीवित सर्प से कमर में बाघंबर बांधी!", speaker: "कथा वाचन" },
  { startSec: 103.4, endSec: 107.1, text: "और एक तेजस्वी सर्प को सिर के ऊपर बांध लिया!", speaker: "महादेव श्रृंगार" },
];

const voArr = audioSyncP2.vo as number[];
const bedArr = audioSyncP2.bed as number[];

export function getSmoothVoP2(frame: number, radius = 2): number {
  let sum = 0;
  let count = 0;
  for (let d = -radius; d <= radius; d++) {
    const idx = Math.max(0, Math.min(voArr.length - 1, Math.round(frame + d)));
    sum += voArr[idx] ?? 0;
    count++;
  }
  return sum / count;
}

export function getBedP2(frame: number): number {
  const idx = Math.max(0, Math.min(bedArr.length - 1, Math.round(frame)));
  return bedArr[idx] ?? 0;
}
