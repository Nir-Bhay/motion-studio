#!/usr/bin/env python3
"""
Mastered 48 kHz Audio + Classical Indian Devotional Bed for Mahadev Barat Part 07.
Covers Salis vs Nag Comedy, Himalaya Nagari Grand Decoration, Maina Devi's Aarti,
Narad Muni's Introduction, and Bhagwan Narayan Arriving on Garuda.
"""

import json
import os
import wave
import numpy as np
import soundfile as sf
from scipy.signal import resample_poly

from indian_classical_audio import (
    SR,
    bansuri_phrase,
    damaru_triplet,
    layer_classical_indian_bed,
    maha_ghanta,
    manjira_sparkle,
    shankh_naad,
    tanpura_jawari,
)

TOTAL_SEC = 107.0
FPS = 30
TOTAL_SAMPLES = int(TOTAL_SEC * SR)
TOTAL_FRAMES = int(TOTAL_SEC * FPS)


def load_vo(path: str) -> np.ndarray:
    with wave.open(path, "rb") as w:
        sr = w.getframerate()
        n = w.getnframes()
        ch = w.getnchannels()
        arr = np.frombuffer(w.readframes(n), dtype=np.int16).astype(np.float32) / 32768.0
        if ch == 2:
            arr = arr.mean(axis=1)
    if sr != SR:
        arr = resample_poly(arr, SR // 1000, sr // 1000).astype(np.float32)
    return arr


def place(stereo: np.ndarray, mono: np.ndarray, sec: float, gain: float = 1.0, pan: float = 0.0):
    i0 = int(sec * SR)
    i1 = min(TOTAL_SAMPLES, i0 + len(mono))
    if i1 <= i0:
        return
    lg = gain * np.cos((pan + 1) * np.pi / 4)
    rg = gain * np.sin((pan + 1) * np.pi / 4)
    seg = mono[: i1 - i0]
    stereo[i0:i1, 0] += seg * lg
    stereo[i0:i1, 1] += seg * rg


def main():
    vo_dir = "productions/005-mahadev-barat/audio/vo_p7"
    clips = [
        ("p7_01_neg_bheek.wav", 0.80),
        ("p7_02_nag_comedy.wav", 21.20),
        ("p7_03_shadi_joke.wav", 46.70),
        ("p7_04_himachal_sajawat.wav", 62.70),
        ("p7_05_narayan_garuda.wav", 83.20),
    ]

    vo_track = np.zeros((TOTAL_SAMPLES, 2), dtype=np.float32)
    for fn, t0 in clips:
        arr = load_vo(os.path.join(vo_dir, fn))
        place(vo_track, arr, t0, gain=1.0)

    bed = np.zeros((TOTAL_SAMPLES, 2), dtype=np.float32)
    for ts in np.arange(0.0, TOTAL_SEC - 2.0, 2.8):
        place(bed, tanpura_jawari(138.59, 3.2), float(ts), gain=0.65, pan=-0.12)
        place(bed, tanpura_jawari(207.65, 3.2), float(ts) + 0.35, gain=0.42, pan=0.14)

    # Festive Raga Bhupali + Bansuri celebration phrases
    left = np.zeros(TOTAL_SAMPLES, dtype=np.float64)
    right = np.zeros(TOTAL_SAMPLES, dtype=np.float64)
    layer_classical_indian_bed(left, right, TOTAL_SEC, tabla_start=0.5, raga="bhupali", seed=707)
    bed[:, 0] += left.astype(np.float32) * 0.72
    bed[:, 1] += right.astype(np.float32) * 0.72

    for bt, freq in [(3.0, 415.30), (22.5, 554.37), (47.0, 466.16), (65.0, 554.37), (85.0, 415.30), (98.0, 554.37)]:
        place(bed, bansuri_phrase(freq, 2.2, freq * 0.94), bt, gain=0.55, pan=0.18)

    # Comedy damaru + manjira cues during Nag throw & grand Shankh for Narayan arrival
    for bt in [35.5, 37.5, 52.0]:
        for k in range(3):
            place(bed, damaru_triplet(190.0 + k * 24), bt + k * 0.13, gain=0.55, pan=0.12)
        place(bed, manjira_sparkle(0.65), bt + 0.4, gain=0.45, pan=-0.22)

    place(bed, maha_ghanta(660.0, 3.0), 62.5, gain=0.50, pan=0.0)
    place(bed, shankh_naad(3.2), 83.0, gain=0.68, pan=-0.15)
    place(bed, manjira_sparkle(0.65), 88.5, gain=0.45, pan=0.22)
    place(bed, maha_ghanta(528.0, 3.0), 103.5, gain=0.52, pan=0.0)

    # Duck BGM smoothly under voiceover
    vo_abs = np.abs(vo_track.mean(axis=1))
    win = int(SR * 0.12)
    kernel = np.ones(win, dtype=np.float32) / win
    vo_smooth = np.convolve(vo_abs, kernel, mode="same")
    duck = np.clip(1.0 - vo_smooth * 4.2, 0.34, 1.0)[:, None]
    bed = bed * duck * 0.58

    master = vo_track * 0.96 + bed
    peak = np.max(np.abs(master))
    if peak > 0.92:
        master = master * (0.92 / peak)

    wav_out = "productions/005-mahadev-barat/audio/mahadev-barat-part07-master.wav"
    mp3_out = "public/audio/mahadev-barat-part07-master.mp3"
    sf.write(wav_out, master, SR, subtype="PCM_16")
    os.system(
        f"node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg -y -i {wav_out} -b:a 320k {mp3_out} >/dev/null 2>&1"
    )

    hop = SR // FPS
    vo_env = []
    bed_env = []
    vo_mono = vo_track.mean(axis=1)
    bed_mono = bed.mean(axis=1)
    for f in range(TOTAL_FRAMES):
        s0, s1 = f * hop, (f + 1) * hop
        vo_env.append(round(float(np.sqrt(np.mean(vo_mono[s0:s1] ** 2))) * 4.0, 4))
        bed_env.append(round(float(np.sqrt(np.mean(bed_mono[s0:s1] ** 2))) * 5.0, 4))

    sync_path = "src/remotion/mahadev/data/audio-sync-p7.json"
    with open(sync_path, "w") as fp:
        json.dump({"fps": FPS, "durationFrames": TOTAL_FRAMES, "vo": vo_env, "bed": bed_env}, fp)
    print(f"Built Part 07 audio: {wav_out}, {mp3_out}, {sync_path} ({TOTAL_FRAMES} frames)")


if __name__ == "__main__":
    main()
