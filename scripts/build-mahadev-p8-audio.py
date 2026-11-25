#!/usr/bin/env python3
"""
Mastered 48 kHz Audio + Classical Indian Score & SFX for Mahadev Barat Part 08.
Covers Brahma & Indra Groom Confusion, Narad Quietly Slipping Away,
Terrified Children Running Home & Slamming Doors, and Headless Barati Knocking.
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

TOTAL_SEC = 114.0
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


def door_knock_sfx(n_knocks: int = 3) -> np.ndarray:
    """Woody resonant door knocks ('खट-खट-खट')."""
    dur = 1.4
    out = np.zeros(int(dur * SR), dtype=np.float32)
    for k in range(n_knocks):
        t0 = int(k * 0.28 * SR)
        L = int(0.18 * SR)
        t = np.arange(L) / SR
        hit = (
            np.sin(2 * np.pi * 165 * t) * np.exp(-t * 28)
            + 0.45 * np.sin(2 * np.pi * 390 * t) * np.exp(-t * 42)
        ).astype(np.float32)
        out[t0 : t0 + L] += hit * 0.85
    return out


def main():
    vo_dir = "productions/005-mahadev-barat/audio/vo_p8"
    clips = [
        ("p8_01_brahma_bhram.wav", 0.70),
        ("p8_02_indra_bhram.wav", 23.60),
        ("p8_03_narad_khisak.wav", 44.70),
        ("p8_04_balak_bhay.wav", 62.70),
        ("p8_05_kaisen_bhoot.wav", 82.10),
        ("p8_06_mukh_heen_dastak.wav", 96.20),
    ]

    vo_track = np.zeros((TOTAL_SAMPLES, 2), dtype=np.float32)
    for fn, t0 in clips:
        arr = load_vo(os.path.join(vo_dir, fn))
        place(vo_track, arr, t0, gain=1.0)

    bed = np.zeros((TOTAL_SAMPLES, 2), dtype=np.float32)
    for ts in np.arange(0.0, TOTAL_SEC - 2.0, 2.8):
        place(bed, tanpura_jawari(138.59, 3.2), float(ts), gain=0.62, pan=-0.12)
        place(bed, tanpura_jawari(207.65, 3.2), float(ts) + 0.35, gain=0.40, pan=0.14)

    left = np.zeros(TOTAL_SAMPLES, dtype=np.float64)
    right = np.zeros(TOTAL_SAMPLES, dtype=np.float64)
    layer_classical_indian_bed(left, right, TOTAL_SEC, tabla_start=0.5, raga="bhupali", seed=808)
    bed[:, 0] += left.astype(np.float32) * 0.70
    bed[:, 1] += right.astype(np.float32) * 0.70

    # Ceremonial Brahma/Indra entry accents
    place(bed, shankh_naad(2.8), 4.2, gain=0.58, pan=-0.15)
    place(bed, maha_ghanta(660.0, 2.5), 23.4, gain=0.50, pan=0.12)
    place(bed, manjira_sparkle(0.65), 27.5, gain=0.42, pan=-0.2)
    place(bed, bansuri_phrase(440.0, 2.2, 415.30), 12.0, gain=0.48, pan=0.18)

    # Eerie Damaru tension when ghostly cries echo & children sprint home!
    for bt in [48.0, 56.0, 68.5, 73.5, 84.5, 90.0]:
        for k in range(3):
            place(bed, damaru_triplet(180.0 + k * 24), bt + k * 0.13, gain=0.58, pan=0.1)

    # Door knocking SFX for the headless Barati!
    place(bed, door_knock_sfx(3), 98.2, gain=0.85, pan=0.05)
    place(bed, maha_ghanta(528.0, 3.0), 110.2, gain=0.45, pan=0.0)

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

    wav_out = "productions/005-mahadev-barat/audio/mahadev-barat-part08-master.wav"
    mp3_out = "public/audio/mahadev-barat-part08-master.mp3"
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

    sync_path = "src/remotion/mahadev/data/audio-sync-p8.json"
    with open(sync_path, "w") as fp:
        json.dump({"fps": FPS, "durationFrames": TOTAL_FRAMES, "vo": vo_env, "bed": bed_env}, fp)
    print(f"Built Part 08 audio: {wav_out}, {mp3_out}, {sync_path} ({TOTAL_FRAMES} frames)")


if __name__ == "__main__":
    main()
