import audioSyncP10 from "../data/audio-sync-p10.json";

export const P10_FPS = 30;
export const P10_DURATION_FRAMES = 3840; // 128.0s

export interface P10SceneDef {
  id: string;
  label: string;
  startSec: number;
  endSec: number;
  startFrame: number;
  durationFrames: number;
}

export const P10_SCENES: P10SceneDef[] = [
  { id: "P10S01", label: "१. मैना जागृति व नारद प्रबोधन", startSec: 0, endSec: 27.17, startFrame: 0, durationFrames: 815 },
  { id: "P10S02", label: "२. पार्वती वंदना व दिव्य रूप दर्शन", startSec: 27.17, endSec: 56.17, startFrame: 815, durationFrames: 870 },
  { id: "P10S03", label: "३. जयमाला, पाणिग्रहण व वेद मंत्र", startSec: 56.17, endSec: 80.50, startFrame: 1685, durationFrames: 730 },
  { id: "P10S04", label: "४. देव नृत्य व दिव्य पुष्प वर्षा", startSec: 80.50, endSec: 104.50, startFrame: 2415, durationFrames: 720 },
  { id: "P10S05", label: "५. महा-मंगल बधाई (हर हर महादेव!)", startSec: 104.50, endSec: 128.00, startFrame: 3135, durationFrames: 705 },
];

export interface P10SubtitleCue {
  startSec: number;
  endSec: number;
  text: string;
  speaker?: string;
}

export const SUBTITLES_P10: P10SubtitleCue[] = [
  { startSec: 0.7, endSec: 8.4, text: "होश आते ही मैना देवी व्याकुल होकर बोलीं — हाय हमने नारद जी का क्या बिगाड़ा था!", speaker: "मैना देवी" },
  { startSec: 8.6, endSec: 17.5, text: "नारद जी समझाते हैं — मैना सत्य सुनहु मम वाणी, जगदंबा तव सुता भवानी!", speaker: "नारद मुनि" },
  { startSec: 17.7, endSec: 26.6, text: "आपकी पुत्री साक्षात जगदंबा सती रूपा हैं और महादेव अनादि परमेश्वर हैं!", speaker: "नारद मुनि" },

  { startSec: 27.8, endSec: 36.2, text: "नारद जी के वचन सुन मैना और हिमवंत आनंदित हो पार्वती जी के चरणों की वंदना करने लगे!", speaker: "मैना व हिमवंत" },
  { startSec: 36.4, endSec: 55.5, text: "महादेव ने करोड़ों कामदेवों को लजाने वाला दिव्य सौम्य स्वरूप धारण किया — पूरा हिमालय मोहित हो गया!", speaker: "दिव्य रूप दर्शन" },

  { startSec: 56.8, endSec: 65.5, text: "सुंदरता की सीमा स्वयं भवानी पार्वती वरमाला लेकर पधारीं — शोभा करोड़ों मुखों से वर्णित न हो!", speaker: "माता पार्वती" },
  { startSec: 65.7, endSec: 79.7, text: "महेश्वर शिव ने पार्वती का पाणिग्रहण किया — सकल देवगण हर्षित हुए और वेद मंत्र गूंज उठे!", speaker: "पाणिग्रहण" },

  { startSec: 81.2, endSec: 92.2, text: "कन्यादान व शुभ विवाह संपन्न होते ही ब्रह्मा, विष्णु, इंद्र व सभी देवता आनंद नृत्य करने लगे!", speaker: "देवता आनंद" },
  { startSec: 92.4, endSec: 103.6, text: "ढोल, मृदंग, शंख-शहनाई गूंजे और आकाश मार्ग से देवताओं ने दिव्य पुष्पों की वर्षा कर दी!", speaker: "पुष्प वर्षा" },

  { startSec: 105.2, endSec: 115.2, text: "तीनों लोकों में मंगल गान गूंज रहा है, हिमालय से कैलाश तक बधाइयां बंट रही हैं!", speaker: "मंगल गान" },
  { startSec: 115.4, endSec: 126.4, text: "शिव-पार्वती विवाह की अनंत बधाई हो! हर हर महादेव! बोलो महादेव शंकर भगवान की जय!", speaker: "बधाई हो!" },
];

const voArr = audioSyncP10.vo as number[];
const bedArr = audioSyncP10.bed as number[];

export function getVoP10(frame: number): number {
  const idx = Math.max(0, Math.min(voArr.length - 1, Math.round(frame)));
  return voArr[idx] ?? 0;
}

export function getBedP10(frame: number): number {
  const idx = Math.max(0, Math.min(bedArr.length - 1, Math.round(frame)));
  return bedArr[idx] ?? 0;
}

export function getSmoothVoP10(frame: number, radius = 2): number {
  let sum = 0;
  let count = 0;
  for (let d = -radius; d <= radius; d++) {
    sum += getVoP10(frame + d);
    count++;
  }
  return sum / count;
}
