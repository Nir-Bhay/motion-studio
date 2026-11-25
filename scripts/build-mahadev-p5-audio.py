import json
import os
import subprocess
import numpy as np
import soundfile as sf
from scipy.signal import butter, filtfilt, resample_poly
from indian_classical_audio import (
    SR,
    bansuri_phrase,
    damaru_triplet,
    maha_ghanta,
    manjira_sparkle,
    sanskrit_om_pad,
    shankh_naad,
    sitar_pluck,
    swarmandal_sweep,
    tabla_dha,
    tabla_na,
    tanpura_jawari,
)

DUR = 79.000
FPS = 30
TOTAL_FRAMES = int(DUR * FPS)  # 2370
N_SAMPLES = int(SR * DUR)

CLIPS = [
    ("p5_01_pret_cry.wav", 0.80),          # 0.80 - 13.92
    ("p5_02_bholenath_vachan.wav", 15.60), # 15.60 - 29.84
    ("p5_03_mukh_heen.wav", 31.80),        # 31.80 - 47.64
    ("p5_04_nayan_tan.wav", 49.40),        # 49.40 - 59.88
    ("p5_05_himalaya_march.wav", 62.00),   # 62.00 - 75.84
]

vo_mix = np.zeros(N_SAMPLES, dtype=np.float64)

def to_48k_mono(path):
    data, sr = sf.read(path)
    if data.ndim > 1:
        data = data.mean(axis=1)
    if sr != SR:
        data = resample_poly(data, SR // np.gcd(SR, sr), sr // np.gcd(SR, sr))
    return data

for fname, start_s in CLIPS:
    y = to_48k_mono(os.path.join("productions/005-mahadev-barat/audio/vo_p5", fname))
    peak = np.max(np.abs(y)) + 1e-9
    rms = np.sqrt(np.mean(y**2)) + 1e-9
    gain = min(0.165 / rms, 0.88 / peak)
    y = y * gain
    fade = int(0.015 * SR)
    y[:fade] *= np.linspace(0, 1, fade)
    y[-fade:] *= np.linspace(1, 0, fade)
    idx = int(start_s * SR)
    end = min(idx + len(y), N_SAMPLES)
    vo_mix[idx:end] += y[: end - idx]

    win = int(SR * 0.02)
    rms_w = np.array([np.sqrt(np.mean(y[i:i+win]**2)) for i in range(0, len(y)-win, win)])
    silent = rms_w < 0.015
    segs = []
    in_sp, s_st, sil_c = False, 0.0, 0
    for j, is_s in enumerate(silent):
        tt = j * 0.02
        if not is_s:
            if not in_sp:
                in_sp, s_st = True, tt
            sil_c = 0
        else:
            if in_sp:
                sil_c += 1
                if sil_c >= 10:
                    segs.append((round(start_s + s_st, 2), round(start_s + tt - 0.18, 2)))
                    in_sp, sil_c = False, 0
    if in_sp:
        segs.append((round(start_s + s_st, 2), round(start_s + len(y)/SR, 2)))
    print(f"{fname}: {segs}")

win = int(0.04 * SR)
vo_env = np.convolve(np.abs(vo_mix), np.ones(win) / win, mode="same")
b_lp, a_lp = butter(2, 6.0 / (SR / 2), btype="low")
vo_env_smooth = np.clip(filtfilt(b_lp, a_lp, vo_env) * 6.5, 0.0, 1.0)

left = np.zeros(N_SAMPLES, dtype=np.float64)
right = np.zeros(N_SAMPLES, dtype=np.float64)

def add_stereo(sig, start_s, pan=0.0, gain=1.0):
    i0 = int(start_s * SR)
    if i0 >= N_SAMPLES:
        return
    i1 = min(i0 + len(sig), N_SAMPLES)
    s = sig[: i1 - i0] * gain
    left[i0:i1] += s * np.cos((pan + 1) * np.pi / 4)
    right[i0:i1] += s * np.sin((pan + 1) * np.pi / 4)

# 1. Tanpura Jawari + Deep Sanskrit Om Pad
cycle = [207.65, 277.18, 277.18, 138.59]
for k in range(int(DUR / 0.80)):
    add_stereo(tanpura_jawari(cycle[k % 4], 2.4), k * 0.80, pan=0.18 if k % 2 == 0 else -0.18, gain=0.32)

for st in np.arange(0.0, DUR - 3.0, 4.0):
    add_stereo(sanskrit_om_pad(138.59, 4.6), float(st), pan=0.0, gain=0.44 if st < 16 else 0.56)

# 2. Raga Shivaranjani / Bhairav Sitar & Swarmandal Phrases
raga_s = [277.18, 311.13, 329.63, 415.30, 466.16, 554.37, 622.25]
for st in [0.4, 14.3, 30.2, 48.0, 60.4]:
    add_stereo(swarmandal_sweep(raga_s, 1.6), st, pan=-0.2, gain=0.72)

for st, f, bend in [(1.5, raga_s[3], 1.08), (15.2, raga_s[4], 1.0), (22.0, raga_s[5], 1.1), (35.0, raga_s[2], 1.0), (52.0, raga_s[4], 1.06), (66.0, raga_s[5], 1.12)]:
    add_stereo(sitar_pluck(f, 1.5, bend), st, pan=0.22, gain=0.65)

# 3. Emotional Bansuri (sorrow 0..14s) -> Shankh & Maha-Ghanta (vow 15.5s & march 62s)
add_stereo(bansuri_phrase(311.13, 2.2, 349.23), 2.5, pan=-0.2, gain=0.72)
add_stereo(bansuri_phrase(277.18, 2.0, 311.13), 8.5, pan=-0.2, gain=0.72)
add_stereo(shankh_naad(2.5), 15.1, pan=0.0, gain=0.75)
add_stereo(shankh_naad(2.6), 61.5, pan=0.0, gain=0.80)

for bt in [0.2, 15.2, 31.3, 49.0, 61.6, 76.2]:
    add_stereo(maha_ghanta(720.0 if bt < 30 else 810.0, 2.8), bt, pan=0.25, gain=0.68)

# 4. Classical Tabla + Shiva Damaru + Manjira Parade (16s -> 78.5s)
for tb in np.arange(16.0, 78.5, 0.38):
    beat = int(round((tb - 16.0) / 0.38))
    if beat % 4 == 0:
        add_stereo(tabla_dha(), float(tb), pan=-0.12, gain=0.65)
        add_stereo(manjira_sparkle(), float(tb), pan=0.35, gain=0.52)
    else:
        add_stereo(tabla_na(), float(tb), pan=0.14, gain=0.52)
    if tb >= 31.5:
        add_stereo(damaru_triplet(175 if beat % 2 == 0 else 215), float(tb) + 0.19, pan=-0.25 if beat % 2 == 0 else 0.25, gain=0.52)

duck = 1.0 - 0.70 * vo_env_smooth
bed_l = left * duck
bed_r = right * duck
master = np.stack([np.tanh((vo_mix + bed_l) * 0.92), np.tanh((vo_mix + bed_r) * 0.92)], axis=1)

sf.write("productions/005-mahadev-barat/audio/mahadev-barat-part05-master.wav", master, SR, subtype="PCM_16")
ffmpeg = "node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg"
subprocess.run(
    [ffmpeg, "-y", "-i", "productions/005-mahadev-barat/audio/mahadev-barat-part05-master.wav",
     "-af", "loudnorm=I=-14:TP=-1.5:LRA=11", "-c:a", "libmp3lame", "-b:a", "320k",
     "public/audio/mahadev-barat-part05-master.mp3"],
    check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL
)

spf = SR // FPS
bed_mono = 0.5 * (np.abs(bed_l) + np.abs(bed_r))
vo_e = [round(min(float(np.sqrt(np.mean(vo_mix[f*spf:(f+1)*spf]**2))) / 0.24, 1.0), 3) for f in range(TOTAL_FRAMES)]
bed_e = [round(min(float(np.sqrt(np.mean(bed_mono[f*spf:(f+1)*spf]**2))) / 0.16, 1.0), 3) for f in range(TOTAL_FRAMES)]
with open("src/remotion/mahadev/data/audio-sync-p5.json", "w") as fp:
    json.dump({"fps": FPS, "durationInFrames": TOTAL_FRAMES, "vo": vo_e, "bed": bed_e}, fp)
print("Part 5 Classical Audio Complete! Frames:", TOTAL_FRAMES)
