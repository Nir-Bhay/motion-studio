import json
import os
import subprocess
import numpy as np
import soundfile as sf
from scipy.signal import butter, filtfilt, resample_poly
from indian_classical_audio import layer_classical_indian_bed

SR = 48000
DUR = 86.000
FPS = 30
TOTAL_FRAMES = int(DUR * FPS)  # 2580
N_SAMPLES = int(SR * DUR)

CLIPS = [
    ("p4_01_small_group.wav", 0.80),  # 0.80 - 19.24
    ("p4_02_vishwa_pret.wav", 21.00), # 21.00 - 36.08
    ("p4_03_ram_barat.wav", 38.00),   # 38.00 - 50.76
    ("p4_04_indra_vajra.wav", 52.60), # 52.60 - 67.08
    ("p4_05_pret_sorrow.wav", 69.00), # 69.00 - 83.24
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
    y = to_48k_mono(os.path.join("productions/005-mahadev-barat/audio/vo_p4", fname))
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
    add_stereo(tanpura_pluck(cycle[k % 4]), st, pan=0.18 if k % 2 == 0 else -0.18, gain=0.28)

# Mystical Bansuri for emotional Bhoot-Pret sorrow & Mahadev's compassion (68..85s)
def bansuri(freq, dur=1.4):
    tt = np.arange(int(dur * SR)) / SR
    vib = 1.0 + 0.005 * np.sin(2 * np.pi * 4.5 * tt) * np.minimum(tt / 0.25, 1.0)
    ph = 2 * np.pi * np.cumsum(freq * vib) / SR
    sig = 0.78 * np.sin(ph) + 0.18 * np.sin(2 * ph)
    env = np.minimum(tt / 0.12, 1.0) * np.minimum((dur - tt) / 0.18, 1.0)
    return sig * np.maximum(env, 0.0) * 0.17

for st, f, d in [(19.5, 415.30, 1.4), (36.4, 349.23, 1.4), (67.4, 311.13, 1.8), (83.4, 415.30, 2.0)]:
    add_stereo(bansuri(f, d), st, pan=-0.15, gain=0.75)

# Indra's Vajra Lightning Crack SFX (~52.8s & ~61.5s)
def vajra_bolt(dur=0.9):
    tt = np.arange(int(dur * SR)) / SR
    n = np.random.default_rng(99).normal(0, 0.34, len(tt))
    b, a = butter(2, [220 / (SR/2), 4200 / (SR/2)], btype="band")
    snap = filtfilt(b, a, n) * np.exp(-tt * 5.2)
    boom = 0.42 * np.sin(2 * np.pi * (140 * np.exp(-tt * 4.0) + 46) * tt) * np.exp(-tt * 3.0)
    return snap + boom

add_stereo(vajra_bolt(0.95), 52.8, pan=0.2, gain=0.72)
add_stereo(vajra_bolt(0.95), 61.5, pan=-0.1, gain=0.68)

# Temple Ghanta + Damaru + Manjira
def temple_bell(freq=900.0, dur=2.2):
    tt = np.arange(int(dur * SR)) / SR
    sig = 0.48 * np.sin(2 * np.pi * freq * tt) * np.exp(-tt * 1.4) + 0.3 * np.sin(2 * np.pi * freq * 2.01 * tt) * np.exp(-tt * 2.3)
    return sig * np.minimum(tt / 0.004, 1.0) * 0.18

def damaru_hit(pitch=175.0, dur=0.16):
    tt = np.arange(int(dur * SR)) / SR
    f = pitch * (1.0 + 0.8 * np.exp(-tt * 35.0))
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 20.0) * np.minimum(tt / 0.002, 1.0) * 0.23

for bt in [0.2, 20.4, 37.5, 52.2, 68.5, 83.6]:
    add_stereo(temple_bell(920, 2.2), bt, pan=0.25, gain=0.62)

# March rhythm (0..37s) & Nandi approach (74..85s)
for tb in list(np.arange(0.5, 36.5, 0.42)) + list(np.arange(74.0, 85.4, 0.44)):
    add_stereo(damaru_hit(172 if int(tb*2.4)%2==0 else 212), float(tb), pan=-0.22 if int(tb*2.4)%2==0 else 0.22, gain=0.45)

layer_classical_indian_bed(left, right, DUR, tabla_start=1.0, tabla_end=85.0, raga="shivaranjani", seed=104)

duck = 1.0 - 0.72 * vo_env_smooth
bed_l = left * duck
bed_r = right * duck
master = np.stack([np.tanh((vo_mix + bed_l) * 0.92), np.tanh((vo_mix + bed_r) * 0.92)], axis=1)

sf.write("productions/005-mahadev-barat/audio/mahadev-barat-part04-master.wav", master, SR, subtype="PCM_16")
ffmpeg = "node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg"
subprocess.run(
    [ffmpeg, "-y", "-i", "productions/005-mahadev-barat/audio/mahadev-barat-part04-master.wav",
     "-af", "loudnorm=I=-14:TP=-1.5:LRA=11", "-c:a", "libmp3lame", "-b:a", "320k",
     "public/audio/mahadev-barat-part04-master.mp3"],
    check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL
)

spf = SR // FPS
bed_mono = 0.5 * (np.abs(bed_l) + np.abs(bed_r))
vo_e = [round(min(float(np.sqrt(np.mean(vo_mix[f*spf:(f+1)*spf]**2))) / 0.24, 1.0), 3) for f in range(TOTAL_FRAMES)]
bed_e = [round(min(float(np.sqrt(np.mean(bed_mono[f*spf:(f+1)*spf]**2))) / 0.16, 1.0), 3) for f in range(TOTAL_FRAMES)]
with open("src/remotion/mahadev/data/audio-sync-p4.json", "w") as fp:
    json.dump({"fps": FPS, "durationInFrames": TOTAL_FRAMES, "vo": vo_e, "bed": bed_e}, fp)
print("Part 4 Audio Complete! Frames:", TOTAL_FRAMES)
