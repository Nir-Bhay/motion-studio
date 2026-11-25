#!/usr/bin/env python3
"""
Mastered 48 kHz Audio + Classical Indian Devotional Bed for Mahadev Barat Part 06.
Covers Himalaya Nagari Arrival, "Aayi Shankar Ki Baratiya Himachal Nagari",
Mouse/Elephant Riders, Queen Mainavati's Aarti & Regret, and Sakhis Asking for Neg.
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

TOTAL_SEC = 95.0
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
    vo_dir = "productions/005-mahadev-barat/audio/vo_p6"
    clips = [
        ("p6_01_doha_jamat.wav", 0.80),
        ("p6_02_bhajan_aayi_baratiya.wav", 20.20),
        ("p6_03_boodhe_bail.wav", 40.00),
        ("p6_04_maina_thali.wav", 60.20),
        ("p6_05_sakhi_neg.wav", 78.20),
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
    layer_classical_indian_bed(left, right, TOTAL_SEC, tabla_start=0.5, raga="bhupali", seed=606)
    bed[:, 0] += left.astype(np.float32) * 0.72
    bed[:, 1] += right.astype(np.float32) * 0.72

    for bt, freq in [(19.5, 415.30), (27.2, 554.37), (35.5, 466.16), (48.5, 554.37), (68.0, 329.63), (84.0, 415.30)]:
        place(bed, bansuri_phrase(freq, 2.2, freq * 0.94), bt, gain=0.55, pan=0.18)

    # Ceremonial Shankh, Damaru triplets, Manjira, & Maha-Ghanta temple bells
    place(bed, shankh_naad(3.0), 19.4, gain=0.65, pan=-0.15)
    for bt in [23.5, 29.0, 34.5, 42.0, 48.0, 54.0]:
        for k in range(3):
            place(bed, damaru_triplet(185.0 + k * 22), bt + k * 0.14, gain=0.55, pan=0.12)
        place(bed, manjira_sparkle(0.65), bt + 0.42, gain=0.45, pan=-0.22)
    place(bed, maha_ghanta(660.0, 3.0), 56.8, gain=0.52, pan=0.0)
    place(bed, maha_ghanta(528.0, 3.0), 60.5, gain=0.48, pan=-0.25)
    place(bed, manjira_sparkle(0.65), 78.6, gain=0.45, pan=0.25)
    place(bed, manjira_sparkle(0.65), 82.0, gain=0.45, pan=-0.25)

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

    wav_out = "productions/005-mahadev-barat/audio/mahadev-barat-part06-master.wav"
    mp3_out = "public/audio/mahadev-barat-part06-master.mp3"
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

    sync_path = "src/remotion/mahadev/data/audio-sync-p6.json"
    with open(sync_path, "w") as fp:
        json.dump({"fps": FPS, "durationFrames": TOTAL_FRAMES, "vo": vo_env, "bed": bed_env}, fp)
    print(f"Built Part 06 audio: {wav_out}, {mp3_out}, {sync_path} ({TOTAL_FRAMES} frames)")


if __name__ == "__main__":
    main()
