import json
import os
import subprocess
import numpy as np
import soundfile as sf
from scipy.signal import butter, filtfilt, resample_poly

SR = 48000
DUR = 120.000
N_SAMPLES = int(SR * DUR)

# Scene placements matching exact timeline (seconds)
CLIPS = [
    ("p01-prep.wav", 1.00),          # S01: 0.0 - 15.0 (clip 12.92s -> 1.00 - 13.92)
    ("p02-apsara-vadya.wav", 15.60), # S02: 15.0 - 34.0 (clip 16.20s -> 15.60 - 31.80, +2.2s music)
    ("p03-vishnu.wav", 34.60),       # S03: 34.0 - 56.0 (clip 20.28s -> 34.60 - 54.88)
    ("p04-brahma-indra.wav", 56.80), # S04: 56.0 - 66.0 (clip 7.84s  -> 56.80 - 64.64)
    ("p05-shamshan.wav", 66.80),     # S05: 66.0 - 80.5 (clip 12.76s -> 66.80 - 79.56)
    ("p06-vishnu-advice.wav", 81.10),# S06: 80.5 - 98.0 (clip 16.24s -> 81.10 - 97.34)
    ("p07-shiv-gana.wav", 98.10),    # S07: 98.0 - 120.0 (clip 21.80s -> 98.10 - 119.90)
]

os.makedirs("productions/005-mahadev-barat/audio", exist_ok=True)
os.makedirs("public/audio", exist_ok=True)
os.makedirs("src/remotion/mahadev/data", exist_ok=True)

vo_mix = np.zeros(N_SAMPLES, dtype=np.float64)

def to_48k_mono(path):
    data, sr = sf.read(path)
    if data.ndim > 1:
        data = data.mean(axis=1)
    if sr != SR:
        # 24000 -> 48000 exact 2x
        data = resample_poly(data, SR // np.gcd(SR, sr), sr // np.gcd(SR, sr))
    return data

# Place VO clips & normalize gently per clip
for fname, start_s in CLIPS:
    y = to_48k_mono(os.path.join("productions/005-mahadev-barat/audio/vo", fname))
    peak = np.max(np.abs(y)) + 1e-9
    rms = np.sqrt(np.mean(y**2)) + 1e-9
    # Consistent conversational broadcast level (~ -16 dBFS RMS)
    target_rms = 0.16
    gain = min(target_rms / rms, 0.88 / peak)
    y = y * gain
    # 15ms fade in/out to guarantee zero clicks
    fade = int(0.015 * SR)
    y[:fade] *= np.linspace(0, 1, fade)
    y[-fade:] *= np.linspace(1, 0, fade)
    idx = int(start_s * SR)
    end = min(idx + len(y), N_SAMPLES)
    vo_mix[idx:end] += y[: end - idx]

# Compute smooth sidechain envelope from VO for ducking music
win = int(0.04 * SR)
vo_abs = np.abs(vo_mix)
kernel = np.ones(win) / win
vo_env = np.convolve(vo_abs, kernel, mode="same")
# Expand envelope with attack/release lookahead
b_lp, a_lp = butter(2, 6.0 / (SR / 2), btype="low")
vo_env_smooth = np.clip(filtfilt(b_lp, a_lp, vo_env) * 6.5, 0.0, 1.0)

# --- Synthesize rich Indian devotional instrumental & SFX stereo bed ---
t = np.arange(N_SAMPLES) / SR
left = np.zeros(N_SAMPLES, dtype=np.float64)
right = np.zeros(N_SAMPLES, dtype=np.float64)

def add_stereo(sig, start_s, pan=0.0, gain=1.0):
    i0 = int(start_s * SR)
    if i0 >= N_SAMPLES:
        return
    i1 = min(i0 + len(sig), N_SAMPLES)
    s = sig[: i1 - i0] * gain
    l_g = np.cos((pan + 1) * np.pi / 4)
    r_g = np.sin((pan + 1) * np.pi / 4)
    left[i0:i1] += s * l_g
    right[i0:i1] += s * r_g

# 1. Warm Tanpura Drone (Sa=138.59 Hz C#3, Pa=207.65 Hz, Sa4=277.18 Hz)
def tanpura_pluck(freq, dur=2.6):
    tt = np.arange(int(dur * SR)) / SR
    sig = np.zeros_like(tt)
    for k, amp in [(1, 0.45), (2, 0.40), (3, 0.25), (4, 0.22), (5, 0.14), (6, 0.09)]:
        # Slight jivari buzz via detune
        sig += amp * np.sin(2 * np.pi * freq * k * tt + 0.15 * np.sin(2 * np.pi * 1.8 * tt)) * np.exp(-tt * (0.45 + 0.14 * k))
    env = np.minimum(tt / 0.04, 1.0) * np.exp(-tt * 0.55)
    return sig * env * 0.25

tanpura_cycle = [207.65, 277.18, 277.18, 138.59]
for idx_cycle in range(int(DUR / 0.85)):
    st = idx_cycle * 0.85
    f = tanpura_cycle[idx_cycle % 4]
    # Softer in shamshan (66-98s)
    g = 0.22 if (66.0 <= st < 98.0) else 0.34
    add_stereo(tanpura_pluck(f, 2.4), st, pan=0.18 if idx_cycle % 2 == 0 else -0.18, gain=g)

# 2. Celebratory Shehnai / Bansuri melodic phrases (Raga Bhupali: C#4, D#4, F4, G#4, A#4, C#5)
scale = [277.18, 311.13, 349.23, 415.30, 466.16, 554.37, 622.25]
def shehnai_note(freq, dur=0.75, vibrato=5.2, bright=True):
    tt = np.arange(int(dur * SR)) / SR
    vib = 1.0 + 0.006 * np.sin(2 * np.pi * vibrato * tt) * np.minimum(tt / 0.2, 1.0)
    phase = 2 * np.pi * np.cumsum(freq * vib) / SR
    harm = [(1, 0.55), (2, 0.35), (3, 0.22), (4, 0.12)] if bright else [(1, 0.78), (2, 0.18), (3, 0.05)]
    sig = sum(a * np.sin(k * phase) for k, a in harm)
    env = np.minimum(tt / 0.07, 1.0) * np.minimum((dur - tt) / 0.12, 1.0)
    return sig * np.maximum(env, 0.0) * 0.18

melody_events = [
    # S01 joyful opening fanfare
    (0.2, scale[0], 0.8, True), (1.0, scale[2], 0.7, True), (12.8, scale[3], 1.1, True), (13.9, scale[4], 1.1, True),
    # S02 musical celebration + 31.8-34.0s flourish
    (15.0, scale[5], 0.9, True), (29.5, scale[3], 0.7, True), (30.2, scale[4], 0.7, True),
    (31.8, scale[2], 0.55, True), (32.35, scale[3], 0.55, True), (32.9, scale[4], 0.55, True), (33.45, scale[5], 1.2, True),
    # S03 Vishnu radiance (warm bansuri)
    (35.0, scale[5], 1.5, False), (44.0, scale[4], 1.2, False), (54.7, scale[5], 1.4, False),
    # S04 Brahma & Indra royal march
    (56.1, scale[3], 0.9, True), (64.6, scale[4], 0.7, True), (65.3, scale[2], 0.8, True),
    # S05-S06 contemplative flute in Shamshan
    (67.2, scale[0], 1.8, False), (79.4, scale[1], 1.4, False), (96.8, scale[2], 1.3, False),
    # S07 festive playful finale
    (118.2, scale[3], 0.6, True), (118.8, scale[5], 1.1, True),
]
for st, f, d, br in melody_events:
    add_stereo(shehnai_note(f, d, bright=br), st, pan=-0.12 if br else 0.15, gain=0.65)

# 3. Shankh (Conch) resonant blow at S01 start (0.1s) & Vishnu arrival (34.1s)
def shankh_blow(dur=2.4):
    tt = np.arange(int(dur * SR)) / SR
    f0 = 185.0 * (1.0 + 0.04 * np.exp(-tt * 3.0))
    phase = 2 * np.pi * np.cumsum(f0) / SR
    sig = 0.55 * np.sin(phase) + 0.35 * np.sin(2 * phase) + 0.22 * np.sin(3 * phase) + 0.12 * np.sin(4 * phase)
    # breath noise texture
    rng = np.random.default_rng(7)
    noise = rng.normal(0, 0.03, len(tt))
    b, a = butter(2, [300 / (SR/2), 1600 / (SR/2)], btype="band")
    sig += filtfilt(b, a, noise)
    env = np.minimum(tt / 0.28, 1.0) * np.minimum((dur - tt) / 0.45, 1.0)
    return sig * np.maximum(env, 0.0) * 0.22

add_stereo(shankh_blow(2.2), 0.05, pan=0.0, gain=0.65)
add_stereo(shankh_blow(2.5), 34.05, pan=0.0, gain=0.72)

# 4. Temple Manjira / Bell shimmer & Damaru beats
def temple_bell(freq=1180.0, dur=2.2):
    tt = np.arange(int(dur * SR)) / SR
    sig = 0.5 * np.sin(2 * np.pi * freq * tt) * np.exp(-tt * 1.9)
    sig += 0.3 * np.sin(2 * np.pi * freq * 2.01 * tt) * np.exp(-tt * 2.8)
    sig += 0.2 * np.sin(2 * np.pi * freq * 2.76 * tt) * np.exp(-tt * 3.6)
    return sig * np.minimum(tt / 0.004, 1.0) * 0.16

for bt in [0.4, 8.2, 15.2, 22.0, 32.0, 34.3, 46.5, 56.2, 80.7, 98.0, 118.5]:
    add_stereo(temple_bell(1120 if bt < 66 else 880, 2.2), bt, pan=0.32 if int(bt) % 2 == 0 else -0.32, gain=0.55)

def damaru_hit(pitch=155.0, dur=0.18):
    tt = np.arange(int(dur * SR)) / SR
    f = pitch * (1.0 + 0.85 * np.exp(-tt * 38.0))
    sig = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 22.0)
    return sig * np.minimum(tt / 0.002, 1.0) * 0.24

# Rhythmic Damaru/Dholak pulse in S02 (15-34s), S04 (56-66s), and energetic S07 (98-120s)
rng = np.random.default_rng(42)
for t_beat in np.arange(15.2, 34.0, 0.375):
    add_stereo(damaru_hit(165 if int(t_beat*4)%2==0 else 210), float(t_beat), pan=-0.22 if int(t_beat*4)%2==0 else 0.22, gain=0.45)
for t_beat in np.arange(56.2, 65.8, 0.45):
    add_stereo(damaru_hit(140 if int(t_beat*2)%2==0 else 190), float(t_beat), pan=0.2, gain=0.42)
# Rapid playful Shiv Gana damaru roll at 98.0s + bouncy beat!
for k in range(14):
    add_stereo(damaru_hit(180 + (k % 3) * 35, 0.14), 98.0 + k * 0.085, pan=(k % 2 - 0.5) * 0.6, gain=0.55)
for t_beat in np.arange(99.4, 119.5, 0.35):
    add_stereo(damaru_hit(160 if int(t_beat*3)%2==0 else 215), float(t_beat), pan=-0.25 if int(t_beat*3)%2==0 else 0.25, gain=0.48)

# 5. Shamshan crackling embers & cool wind (66.0 - 98.0s)
sh_i0, sh_i1 = int(66.0 * SR), int(98.0 * SR)
sh_len = sh_i1 - sh_i0
wind_noise = rng.normal(0, 0.04, sh_len)
bw, aw = butter(2, [160 / (SR/2), 520 / (SR/2)], btype="band")
wind = filtfilt(bw, aw, wind_noise)
sh_t = np.arange(sh_len) / SR
wind *= np.minimum(sh_t / 1.5, 1.0) * np.minimum((32.0 - sh_t) / 1.5, 1.0)
left[sh_i0:sh_i1] += wind * 0.45
right[sh_i0:sh_i1] += wind * 0.35

# Apply smooth VO ducking to music bed (duck down to 0.28 during active speech, swell to 0.92 in pauses)
duck = 1.0 - 0.72 * vo_env_smooth
bed_l = left * duck
bed_r = right * duck

master_l = np.tanh((vo_mix + bed_l) * 0.92)
master_r = np.tanh((vo_mix + bed_r) * 0.92)
stereo = np.stack([master_l, master_r], axis=1)

# Write WAV stems
sf.write("productions/005-mahadev-barat/audio/vo-master.wav", vo_mix, SR, subtype="PCM_16")
sf.write("productions/005-mahadev-barat/audio/score-master.wav", np.stack([bed_l, bed_r], axis=1), SR, subtype="PCM_16")
sf.write("productions/005-mahadev-barat/audio/mahadev-barat-2m-master.wav", stereo, SR, subtype="PCM_16")

# Encode 320kbps MP3 via bundled ffmpeg for Remotion public/audio/
ffmpeg = "node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg"
subprocess.run(
    [ffmpeg, "-y", "-i", "productions/005-mahadev-barat/audio/mahadev-barat-2m-master.wav",
     "-af", "loudnorm=I=-14:TP=-1.5:LRA=11", "-c:a", "libmp3lame", "-b:a", "320k",
     "public/audio/mahadev-barat-2m-master.mp3"],
    check=True,
    stdout=subprocess.DEVNULL,
    stderr=subprocess.DEVNULL,
)

# Extract 60fps per-frame VO & music energy envelopes for real-time character/mouth/aura sync!
FPS = 60
TOTAL_FRAMES = int(DUR * FPS)  # 7200
spf = SR // FPS  # 800 samples per frame
vo_energy = []
bed_energy = []
bed_mono = 0.5 * (np.abs(bed_l) + np.abs(bed_r))
for f in range(TOTAL_FRAMES):
    s0 = f * spf
    s1 = s0 + spf
    ve = float(np.sqrt(np.mean(vo_mix[s0:s1] ** 2)))
    be = float(np.sqrt(np.mean(bed_mono[s0:s1] ** 2)))
    vo_energy.append(round(min(ve / 0.24, 1.0), 3))
    bed_energy.append(round(min(be / 0.16, 1.0), 3))

# Smooth slightly for graceful animation curves while keeping syllable crispness
with open("src/remotion/mahadev/data/audio-sync.json", "w") as fp:
    json.dump({"fps": FPS, "durationInFrames": TOTAL_FRAMES, "vo": vo_energy, "bed": bed_energy}, fp)

print("Audio build complete! Frames:", TOTAL_FRAMES, "MP3 bytes:", os.path.getsize("public/audio/mahadev-barat-2m-master.mp3"))