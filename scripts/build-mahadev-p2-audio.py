import json
import os
import subprocess
import numpy as np
import soundfile as sf
from scipy.signal import butter, filtfilt, resample_poly
from indian_classical_audio import layer_classical_indian_bed

SR = 48000
DUR = 110.000
FPS = 30
TOTAL_FRAMES = int(DUR * FPS)  # 3300
N_SAMPLES = int(SR * DUR)

CLIPS = [
    ("p2_01_ekant.wav", 0.80),
    ("p2_02_kamdev.wav", 12.20),
    ("p2_03_himalaya.wav", 41.80),
    ("p2_04_gana_call.wav", 67.20),
    ("p2_05_jata_mukut.wav", 79.80),
    ("p2_06_baghambar_sarp.wav", 93.80),
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
    y = to_48k_mono(os.path.join("productions/005-mahadev-barat/audio/vo_p2", fname))
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

    # Print phrase bounds for tight subtitle alignment
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
def tanpura_pluck(freq, dur=2.4):
    tt = np.arange(int(dur * SR)) / SR
    sig = sum(a * np.sin(2 * np.pi * freq * k * tt + 0.14 * np.sin(2 * np.pi * 1.7 * tt)) * np.exp(-tt * (0.45 + 0.14 * k))
              for k, a in [(1, 0.45), (2, 0.38), (3, 0.24), (4, 0.18)])
    return sig * np.minimum(tt / 0.04, 1.0) * np.exp(-tt * 0.55) * 0.24

cycle = [207.65, 277.18, 277.18, 138.59]
for k in range(int(DUR / 0.85)):
    st = k * 0.85
    add_stereo(tanpura_pluck(cycle[k % 4]), st, pan=0.18 if k % 2 == 0 else -0.18, gain=0.28 if st < 66.5 else 0.36)

# Bansuri melody (Raga Yaman/Bhairav hues)
scale = [277.18, 311.13, 349.23, 415.30, 466.16, 554.37]
def bansuri(freq, dur=1.1):
    tt = np.arange(int(dur * SR)) / SR
    vib = 1.0 + 0.005 * np.sin(2 * np.pi * 4.8 * tt) * np.minimum(tt / 0.25, 1.0)
    ph = 2 * np.pi * np.cumsum(freq * vib) / SR
    sig = 0.78 * np.sin(ph) + 0.18 * np.sin(2 * ph) + 0.05 * np.sin(3 * ph)
    env = np.minimum(tt / 0.1, 1.0) * np.minimum((dur - tt) / 0.16, 1.0)
    return sig * np.maximum(env, 0.0) * 0.16

for st, f, d in [(0.2, scale[3], 1.4), (10.5, scale[4], 1.3), (39.5, scale[2], 1.6),
                 (65.0, scale[4], 1.3), (77.8, scale[5], 1.4), (91.8, scale[3], 1.2), (107.6, scale[5], 1.8)]:
    add_stereo(bansuri(f, d), st, pan=0.15, gain=0.72)

# Dramatic Third-Eye Fire Blast SFX during Kamdev Bhasm flashback (~25.5s)
def fire_blast(dur=1.4):
    tt = np.arange(int(dur * SR)) / SR
    n = np.random.default_rng(77).normal(0, 0.28, len(tt))
    b, a = butter(2, [90 / (SR/2), 1200 / (SR/2)], btype="band")
    rumble = 0.38 * np.sin(2 * np.pi * (95 * np.exp(-tt * 2.5) + 45) * tt) * np.exp(-tt * 2.2)
    env = np.minimum(tt / 0.04, 1.0) * np.exp(-tt * 2.4)
    return (filtfilt(b, a, n) * env) + rumble

add_stereo(fire_blast(1.5), 25.0, pan=0.0, gain=0.78)

# Comedic Himalaya Wobble Thump (~52.5s)
def comedy_thump(dur=0.6):
    tt = np.arange(int(dur * SR)) / SR
    f = 135 * np.exp(-tt * 8.0) + 42
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 6.5) * 0.38

add_stereo(comedy_thump(0.6), 52.8, pan=0.0, gain=0.75)

# Temple Ghanta + Damaru Shringar Transformation Beats (67s - 110s)
def temple_bell(freq=840.0, dur=2.5):
    tt = np.arange(int(dur * SR)) / SR
    sig = 0.48 * np.sin(2 * np.pi * freq * tt) * np.exp(-tt * 1.4) + 0.3 * np.sin(2 * np.pi * freq * 2.01 * tt) * np.exp(-tt * 2.3)
    return sig * np.minimum(tt / 0.004, 1.0) * 0.18

def damaru_hit(pitch=170.0, dur=0.17):
    tt = np.arange(int(dur * SR)) / SR
    f = pitch * (1.0 + 0.8 * np.exp(-tt * 35.0))
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 20.0) * np.minimum(tt / 0.002, 1.0) * 0.25

for bt in [0.3, 11.6, 41.2, 66.8, 79.2, 93.2, 107.8]:
    add_stereo(temple_bell(880 if bt < 66 else 980, 2.4), bt, pan=0.28, gain=0.6)

# Energetic Damaru rhythm during Mahadev Shringar (67.2s - 109.5s)
for tb in np.arange(67.5, 109.5, 0.36):
    add_stereo(damaru_hit(165 if int(tb*3)%2==0 else 215), float(tb), pan=-0.25 if int(tb*3)%2==0 else 0.25, gain=0.52)

layer_classical_indian_bed(left, right, DUR, tabla_start=1.0, tabla_end=109.0, raga="shivaranjani", seed=102)

duck = 1.0 - 0.72 * vo_env_smooth
bed_l = left * duck
bed_r = right * duck
master = np.stack([np.tanh((vo_mix + bed_l) * 0.92), np.tanh((vo_mix + bed_r) * 0.92)], axis=1)

sf.write("productions/005-mahadev-barat/audio/mahadev-barat-part02-master.wav", master, SR, subtype="PCM_16")
ffmpeg = "node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg"
subprocess.run(
    [ffmpeg, "-y", "-i", "productions/005-mahadev-barat/audio/mahadev-barat-part02-master.wav",
     "-af", "loudnorm=I=-14:TP=-1.5:LRA=11", "-c:a", "libmp3lame", "-b:a", "320k",
     "public/audio/mahadev-barat-part02-master.mp3"],
    check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL
)

spf = SR // FPS
bed_mono = 0.5 * (np.abs(bed_l) + np.abs(bed_r))
vo_e = [round(min(float(np.sqrt(np.mean(vo_mix[f*spf:(f+1)*spf]**2))) / 0.24, 1.0), 3) for f in range(TOTAL_FRAMES)]
bed_e = [round(min(float(np.sqrt(np.mean(bed_mono[f*spf:(f+1)*spf]**2))) / 0.16, 1.0), 3) for f in range(TOTAL_FRAMES)]
with open("src/remotion/mahadev/data/audio-sync-p2.json", "w") as fp:
    json.dump({"fps": FPS, "durationInFrames": TOTAL_FRAMES, "vo": vo_e, "bed": bed_e}, fp)
print("Part 2 Audio Complete! Frames:", TOTAL_FRAMES)