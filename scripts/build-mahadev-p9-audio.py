#!/usr/bin/env python3
"""
Mastered 48 kHz Audio + Classical Indian Score & SFX for Mahadev Barat Part 09.
Covers:
  1. Deserted Himalaya Nagari & Baratis Bathing in Sharbat
  2. Mahadev Sitting Backwards on Nandi ("Sabri Jamat Feeki Pad Gayi")
  3. Maina Devi's Question at the Palace Gate & Shringi-Bhringi Reply
  4. Mahadev's Fierce Paan-Kajal-Bhasma Face Reveal -> Maina Devi Faints & Thali Drops
  5. Shamshan Janwasa & Mahadev's Hilarious Explanation to Narayan
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

TOTAL_SEC = 135.0
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


def sharbat_splash_sfx(dur: float = 1.8) -> np.ndarray:
    """Comic bubbling + splashing water pour SFX."""
    rng = np.random.default_rng(909)
    n = int(dur * SR)
    t = np.arange(n) / SR
    noise = rng.normal(0, 1, n).astype(np.float32)
    # Band-pass style smoothing via moving diff + env
    splash = np.convolve(noise, np.hanning(19), mode="same").astype(np.float32)
    bubbles = np.zeros(n, dtype=np.float32)
    for b in range(14):
        bt = int((0.12 + b * 0.11) * SR)
        L = min(int(0.09 * SR), n - bt)
        if L > 10:
            tb = np.arange(L) / SR
            f0 = 320 + (b % 5) * 95
            bubbles[bt : bt + L] += np.sin(2 * np.pi * (f0 + 480 * tb) * tb) * np.exp(-tb * 28) * 0.45
    env = np.sin(np.pi * t / dur) ** 0.6
    return (splash * 0.22 + bubbles * 0.55) * env


def thali_clang_sfx() -> np.ndarray:
    """Metallic brass Panch-Aarti Thali dropping & clattering on stone floor."""
    dur = 2.1
    n = int(dur * SR)
    t = np.arange(n) / SR
    out = np.zeros(n, dtype=np.float32)
    for hit_t, amp in [(0.0, 0.85), (0.24, 0.45), (0.42, 0.24)]:
        i0 = int(hit_t * SR)
        L = n - i0
        th = np.arange(L) / SR
        clang = (
            np.sin(2 * np.pi * 680 * th) * np.exp(-th * 4.5)
            + 0.65 * np.sin(2 * np.pi * 1140 * th) * np.exp(-th * 6.5)
            + 0.45 * np.sin(2 * np.pi * 1890 * th) * np.exp(-th * 9.0)
        )
        out[i0:] += clang.astype(np.float32) * amp
    return out


def main():
    vo_dir = "productions/005-mahadev-barat/audio/vo_p9"
    clips = [
        ("p9_01_sunsan_nagari.wav", 0.70),
        ("p9_02_ulta_nandi.wav", 25.00),
        ("p9_03_maina_prashna.wav", 48.60),
        ("p9_04_mukh_darshan_murchha.wav", 76.60),
        ("p9_05_shamshan_janwasa.wav", 108.60),
    ]

    vo_track = np.zeros((TOTAL_SAMPLES, 2), dtype=np.float32)
    for fn, t0 in clips:
        arr = load_vo(os.path.join(vo_dir, fn))
        place(vo_track, arr, t0, gain=1.0)

    bed = np.zeros((TOTAL_SAMPLES, 2), dtype=np.float32)
    for ts in np.arange(0.0, TOTAL_SEC - 2.0, 2.8):
        place(bed, tanpura_jawari(138.59, 3.2), float(ts), gain=0.62, pan=-0.14)
        place(bed, tanpura_jawari(207.65, 3.2), float(ts) + 0.35, gain=0.40, pan=0.14)

    left = np.zeros(TOTAL_SAMPLES, dtype=np.float64)
    right = np.zeros(TOTAL_SAMPLES, dtype=np.float64)
    layer_classical_indian_bed(left, right, TOTAL_SEC, tabla_start=0.5, raga="bhairav", seed=909)
    bed[:, 0] += left.astype(np.float32) * 0.68
    bed[:, 1] += right.astype(np.float32) * 0.68

    # Comic sharbat splash when Baratis bathe in sharbat
    place(bed, sharbat_splash_sfx(2.2), 18.2, gain=0.75, pan=-0.12)
    place(bed, manjira_sparkle(0.75), 25.2, gain=0.45, pan=0.15)
    place(bed, bansuri_phrase(415.30, 2.2, 440.0), 31.0, gain=0.48, pan=-0.18)

    # Nandi turning & Mahadev fierce face reveal tension
    for bt in [52.0, 72.5, 81.5, 88.5]:
        for k in range(3):
            place(bed, damaru_triplet(185.0 + k * 25), bt + k * 0.13, gain=0.62, pan=0.05)

    # Brass Aarti Thali drop clang when Maina Devi faints!
    place(bed, thali_clang_sfx(), 97.5, gain=0.72, pan=-0.10)
    place(bed, shankh_naad(2.6), 108.5, gain=0.52, pan=0.12)
    place(bed, maha_ghanta(528.0, 3.2), 130.5, gain=0.48, pan=0.0)

    # Smooth ducking under VO
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

    wav_out = "productions/005-mahadev-barat/audio/mahadev-barat-part09-master.wav"
    mp3_out = "public/audio/mahadev-barat-part09-master.mp3"
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

    sync_path = "src/remotion/mahadev/data/audio-sync-p9.json"
    with open(sync_path, "w") as fp:
        json.dump({"fps": FPS, "durationFrames": TOTAL_FRAMES, "vo": vo_env, "bed": bed_env}, fp)
    print(f"Built Part 09 audio: {wav_out}, {mp3_out}, {sync_path} ({TOTAL_FRAMES} frames)")


if __name__ == "__main__":
    main()
