import json
import os
import subprocess
import numpy as np
import soundfile as sf
from scipy.signal import butter, filtfilt, resample_poly

SR = 48000
DUR = 90.000
FPS = 30
TOTAL_FRAMES = int(DUR * FPS)  # 2700
N_SAMPLES = int(SR * DUR)

CLIPS = [
    ("p3_01_sehra.wav", 0.80),
    ("p3_02_bichhu.wav", 12.60),
    ("p3_03_panchmukhi.wav", 25.40),
    ("p3_04_bhasma.wav", 38.00),
    ("p3_05_hahakar.wav", 57.60),
    ("p3_06_pankti.wav", 73.50),
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
    y = to_48k_mono(os.path.join("productions/005-mahadev-barat/audio/vo_p3", fname))
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

# Warm Tanpura drone
def tanpura_pluck(freq, dur=2.2):
    tt = np.arange(int(dur * SR)) / SR
    sig = sum(a * np.sin(2 * np.pi * freq * k * tt + 0.14 * np.sin(2 * np.pi * 1.8 * tt)) * np.exp(-tt * (0.45 + 0.14 * k))
              for k, a in [(1, 0.45), (2, 0.36), (3, 0.24), (4, 0.16)])
    return sig * np.minimum(tt / 0.04, 1.0) * np.exp(-tt * 0.55) * 0.23

cycle = [207.65, 277.18, 277.18, 138.59]
for k in range(int(DUR / 0.80)):
    st = k * 0.80
    add_stereo(tanpura_pluck(cycle[k % 4]), st, pan=0.18 if k % 2 == 0 else -0.18, gain=0.30 if st < 57 else 0.36)

# Shankh (Conch) fanfare when Dulha Raja is declared ready (~57.0s) and procession marches (~73.0s)
def shankh(dur=2.4):
    tt = np.arange(int(dur * SR)) / SR
    f = 293.66 * (1.0 - 0.08 * np.exp(-tt * 3.5) + 0.008 * np.sin(2 * np.pi * 5.2 * tt))
    ph = 2 * np.pi * np.cumsum(f) / SR
    sig = 0.55 * np.sin(ph) + 0.32 * np.sin(2 * ph) + 0.16 * np.sin(3 * ph)
    env = np.minimum(tt / 0.22, 1.0) * np.minimum((dur - tt) / 0.35, 1.0)
    return sig * np.maximum(env, 0.0) * 0.22

add_stereo(shankh(2.5), 57.1, pan=-0.1, gain=0.75)
add_stereo(shankh(2.4), 73.1, pan=0.1, gain=0.72)

# Sacred Pyre Ember Whoosh + Sparkle when warm Bhasma is applied (~43.5s)
def bhasma_sparkle(dur=1.6):
    tt = np.arange(int(dur * SR)) / SR
    n = np.random.default_rng(108).normal(0, 0.18, len(tt))
    b, a = butter(2, [400 / (SR/2), 3600 / (SR/2)], btype="band")
    shimmer = 0.14 * np.sin(2 * np.pi * 1320 * tt) * np.exp(-tt * 2.2) + 0.10 * np.sin(2 * np.pi * 1760 * tt) * np.exp(-tt * 2.5)
    return filtfilt(b, a, n) * np.minimum(tt / 0.15, 1.0) * np.exp(-tt * 1.8) + shimmer

add_stereo(bhasma_sparkle(1.6), 44.0, pan=0.0, gain=0.72)

# Temple Ghanta + Manjira + Damaru + Mridangam Procession March
def temple_bell(freq=920.0, dur=2.2):
    tt = np.arange(int(dur * SR)) / SR
    sig = 0.48 * np.sin(2 * np.pi * freq * tt) * np.exp(-tt * 1.4) + 0.3 * np.sin(2 * np.pi * freq * 2.01 * tt) * np.exp(-tt * 2.3)
    return sig * np.minimum(tt / 0.004, 1.0) * 0.18

def damaru_hit(pitch=175.0, dur=0.16):
    tt = np.arange(int(dur * SR)) / SR
    f = pitch * (1.0 + 0.8 * np.exp(-tt * 35.0))
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 20.0) * np.minimum(tt / 0.002, 1.0) * 0.24

def mridangam_bass(dur=0.28):
    tt = np.arange(int(dur * SR)) / SR
    f = 92.0 * np.exp(-tt * 10.0) + 52.0
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 9.5) * np.minimum(tt / 0.003, 1.0) * 0.34

def manjira_chime(dur=0.6):
    tt = np.arange(int(dur * SR)) / SR
    sig = 0.32 * np.sin(2 * np.pi * 2480 * tt) * np.exp(-tt * 7.5) + 0.25 * np.sin(2 * np.pi * 3920 * tt) * np.exp(-tt * 9.5)
    return sig * np.minimum(tt / 0.002, 1.0) * 0.14

for bt in [0.2, 12.2, 25.0, 37.5, 57.0, 73.0, 87.2]:
    add_stereo(temple_bell(940 if bt > 35 else 880, 2.2), bt, pan=0.25, gain=0.62)

# Damaru Shringar groove (0..57s) -> Grand Mridangam + Manjira Barat March (57..89.5s)
for tb in np.arange(0.5, 56.8, 0.42):
    add_stereo(damaru_hit(170 if int(tb*2.4)%2==0 else 215), float(tb), pan=-0.25 if int(tb*2.4)%2==0 else 0.25, gain=0.45)

for tb in np.arange(57.2, 89.6, 0.38):
    add_stereo(mridangam_bass(), float(tb), pan=0.0, gain=0.62)
    add_stereo(damaru_hit(195), float(tb) + 0.19, pan=0.28, gain=0.52)
    if int(tb * 2.6) % 2 == 0:
        add_stereo(manjira_chime(), float(tb), pan=-0.35, gain=0.55)

duck = 1.0 - 0.72 * vo_env_smooth
bed_l = left * duck
bed_r = right * duck
master = np.stack([np.tanh((vo_mix + bed_l) * 0.92), np.tanh((vo_mix + bed_r) * 0.92)], axis=1)

sf.write("productions/005-mahadev-barat/audio/mahadev-barat-part03-master.wav", master, SR, subtype="PCM_16")
ffmpeg = "node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg"
subprocess.run(
    [ffmpeg, "-y", "-i", "productions/005-mahadev-barat/audio/mahadev-barat-part03-master.wav",
     "-af", "loudnorm=I=-14:TP=-1.5:LRA=11", "-c:a", "libmp3lame", "-b:a", "320k",
     "public/audio/mahadev-barat-part03-master.mp3"],
    check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL
)

spf = SR // FPS
bed_mono = 0.5 * (np.abs(bed_l) + np.abs(bed_r))
vo_e = [round(min(float(np.sqrt(np.mean(vo_mix[f*spf:(f+1)*spf]**2))) / 0.24, 1.0), 3) for f in range(TOTAL_FRAMES)]
bed_e = [round(min(float(np.sqrt(np.mean(bed_mono[f*spf:(f+1)*spf]**2))) / 0.16, 1.0), 3) for f in range(TOTAL_FRAMES)]
with open("src/remotion/mahadev/data/audio-sync-p3.json", "w") as fp:
    json.dump({"fps": FPS, "durationInFrames": TOTAL_FRAMES, "vo": vo_e, "bed": bed_e}, fp)
print("Part 3 Audio Complete! Frames:", TOTAL_FRAMES)
