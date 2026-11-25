import audioSyncP6 from "../data/audio-sync-p6.json";
import type { SubtitleCue } from "../timeline";

export const P6_FPS = 30;
export const P6_DURATION_FRAMES = 2850; // 95.000s

export const P6_SCENES = [
  { id: "P6S01", label: "कराल प्रेत-जमात हिमालय की ओर", startFrame: 0, durationFrames: 570 },        // 0.0 - 19.0s
  { id: "P6S02", label: "आई शंकर की बरतिया हिमाचल नगरी", startFrame: 570, durationFrames: 585 },  // 19.0 - 38.5s
  { id: "P6S03", label: "बूढ़े बैल, चूहा व हाथी बाराती", startFrame: 1155, durationFrames: 600 },   // 38.5 - 58.5s
  { id: "P6S04", label: "मैनावती की थाल व मन पछतावा", startFrame: 1755, durationFrames: 540 },   // 58.5 - 76.5s
  { id: "P6S05", label: "सखियों का मंगल व नेग की मांग", startFrame: 2295, durationFrames: 555 },   // 76.5 - 95.0s
];

export const SUBTITLES_P6: SubtitleCue[] = [
  { startSec: 0.9, endSec: 8.8, text: "तनखीन कोउ अति पीन — कोई अत्यंत पतला, तो कोई महाकाय कपाल-अस्थि आभूषण पहने हुए था;", speaker: "तुलसीदास छंद" },
  { startSec: 9.0, endSec: 18.2, text: "पक्षी, श्वान और सियार मुख वाले भूत-प्रेतों की जमात हुंकार भरती हिमालय नगरी चल पड़ी!", speaker: "तुलसीदास छंद" },

  { startSec: 20.3, endSec: 28.0, text: "आहा! इस अलौकिक आगमन का मधुर भजन गाया जाता है —", speaker: "भजन-प्रवाह" },
  { startSec: 28.2, endSec: 38.0, text: "आई शंकर की बरतिया हिमाचल नगरी, आई शंभू की बरतिया हिमाचल नगरी!", speaker: "मंगल भजन" },

  { startSec: 40.2, endSec: 47.6, text: "बूढ़े बैल पर शिवजी आए, सज गए सभी बाराती — कोई चूहे पर चढ़कर आए, तो कोई विशाल हाथी पर!", speaker: "मंगल भजन" },
  { startSec: 47.8, endSec: 58.2, text: "तिरछी नजरिया मारते हुए शिव शंभू आ पहुंचे — बोलो महादेव शंकर भगवान की जय!", speaker: "मंगल भजन" },

  { startSec: 60.4, endSec: 68.4, text: "मैनावती ने सोने की आरती थाल सजाई और बड़े उत्साह से दूल्हा देखने आईं;", speaker: "मैनावती प्रसंग" },
  { startSec: 68.6, endSec: 76.2, text: "पर शिव का विचित्र रूप देख मन ही मन पछताईं — कैसे बीतेगी उमरिया हिमाचल नगरी!", speaker: "मैनावती प्रसंग" },

  { startSec: 78.4, endSec: 85.2, text: "उधर पार्वती जी की सब सखियां और दूर-दूर से आईं बहनें मंगल गीत गा रही थीं,", speaker: "सखी-मंडली" },
  { startSec: 85.4, endSec: 91.6, text: "सबने द्वार रोककर कहा — अरे दूल्हा राजा, भीतर जाने से पहले अपना नेग देते जाओ!", speaker: "सखी-मंडली" },
];

const voArr = audioSyncP6.vo as number[];
const bedArr = audioSyncP6.bed as number[];

export function getSmoothVoP6(frame: number, radius = 2): number {
  let sum = 0;
  let count = 0;
  for (let d = -radius; d <= radius; d++) {
    const idx = Math.max(0, Math.min(voArr.length - 1, Math.round(frame + d)));
    sum += voArr[idx] ?? 0;
    count++;
  }
  return sum / count;
}

export function getBedP6(frame: number): number {
  const idx = Math.max(0, Math.min(bedArr.length - 1, Math.round(frame)));
  return bedArr[idx] ?? 0;
}
