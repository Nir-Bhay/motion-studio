import numpy as np
from scipy.signal import butter, filtfilt

SR = 48000

def tanpura_jawari(freq=138.59, dur=3.2):
    """Rich Tanpura drone with metallic Jawari bridge harmonic shimmer."""
    tt = np.arange(int(dur * SR)) / SR
    sig = np.zeros_like(tt)
    for k, amp, decay in [(1, 0.42, 0.45), (2, 0.36, 0.55), (3, 0.28, 0.72), (4, 0.22, 0.90), (5, 0.14, 1.15), (6, 0.09, 1.4)]:
        mod = 0.22 * np.sin(2 * np.pi * 1.65 * tt + k * 0.4)
        sig += amp * np.sin(2 * np.pi * freq * k * tt + mod) * np.exp(-tt * decay)
    env = np.minimum(tt / 0.06, 1.0) * np.minimum((dur - tt) / 0.15, 1.0)
    return sig * np.maximum(env, 0.0) * 0.22

def sitar_pluck(freq, dur=1.4, bend_ratio=1.0):
    """Plucked Indian Sitar note with Taraf sympathetic shimmer and optional Meend glide."""
    n = int(dur * SR)
    tt = np.arange(n) / SR
    f_curve = freq * (1.0 + (bend_ratio - 1.0) * np.exp(-tt * 4.5))
    ph = 2 * np.pi * np.cumsum(f_curve) / SR
    # Jawari buzz richness (odd + even partials with slow amplitude bloom)
    buzz = 1.0 + 0.35 * np.sin(2 * np.pi * 6.0 * tt) * np.exp(-tt * 1.5)
    sig = (
        0.52 * np.sin(ph)
        + 0.32 * np.sin(2 * ph) * buzz
        + 0.18 * np.sin(3 * ph) * np.exp(-tt * 1.2)
        + 0.10 * np.sin(4 * ph) * np.exp(-tt * 2.0)
        + 0.06 * np.sin(5 * ph) * np.exp(-tt * 2.8)
    )
    attack = np.minimum(tt / 0.008, 1.0)
    decay = np.exp(-tt * 1.95)
    return sig * attack * decay * 0.22

def swarmandal_sweep(freqs, dur=1.8):
    """100-string Indian classical harp cascade across a Raga scale."""
    n = int(dur * SR)
    out = np.zeros(n, dtype=np.float64)
    step = int(0.055 * SR)
    for idx, f in enumerate(freqs):
        i0 = idx * step
        if i0 >= n:
            break
        note = sitar_pluck(f, dur=min(1.1, (n - i0) / SR)) * 0.45
        i1 = min(i0 + len(note), n)
        out[i0:i1] += note[: i1 - i0]
    return out

def sanskrit_om_pad(root_hz=138.59, dur=4.5):
    """Deep meditative temple vocal-formant Om / Shiva-Stuti chord pad (Sa + Pa + Sa')."""
    tt = np.arange(int(dur * SR)) / SR
    vib = 1.0 + 0.003 * np.sin(2 * np.pi * 4.2 * tt)
    sig = np.zeros_like(tt)
    for mult, amp in [(1.0, 0.50), (1.498, 0.32), (2.0, 0.26), (2.5, 0.12)]:
        ph = 2 * np.pi * np.cumsum(root_hz * mult * vib) / SR
        # Vocal formant warmth (1st + 2nd + 3rd harmonic blend)
        sig += amp * (0.65 * np.sin(ph) + 0.25 * np.sin(2 * ph) + 0.10 * np.sin(3 * ph))
    b, a = butter(2, 720 / (SR / 2), btype="low")
    sig = filtfilt(b, a, sig)
    env = np.minimum(tt / 0.65, 1.0) * np.minimum((dur - tt) / 0.85, 1.0)
    return sig * np.maximum(env, 0.0) * 0.18

def tabla_dha(dur=0.45):
    """Authentic Tabla 'Dha' (Bayan bass pitch-glide + Dayan tuned harmonic ring)."""
    tt = np.arange(int(dur * SR)) / SR
    bayan_f = 112.0 * (1.0 - 0.38 * (1.0 - np.exp(-tt * 7.5)))
    bayan = 0.65 * np.sin(2 * np.pi * np.cumsum(bayan_f) / SR) * np.exp(-tt * 6.5)
    dayan = (0.35 * np.sin(2 * np.pi * 277.18 * tt) + 0.25 * np.sin(2 * np.pi * 554.37 * tt)) * np.exp(-tt * 11.0)
    return (bayan + dayan) * np.minimum(tt / 0.004, 1.0) * 0.34

def tabla_na(dur=0.28):
    """Crisp Tabla 'Na / Tin' rim stroke."""
    tt = np.arange(int(dur * SR)) / SR
    sig = 0.45 * np.sin(2 * np.pi * 277.18 * tt) * np.exp(-tt * 14.0) + 0.35 * np.sin(2 * np.pi * 554.37 * tt) * np.exp(-tt * 18.0)
    return sig * np.minimum(tt / 0.002, 1.0) * 0.24

def bansuri_phrase(freq, dur=1.5, bend_from=None):
    """Expressive bamboo Bansuri note with soft breath attack."""
    tt = np.arange(int(dur * SR)) / SR
    if bend_from:
        f_curve = freq + (bend_from - freq) * np.exp(-tt * 6.0)
    else:
        f_curve = np.full_like(tt, freq)
    vib = 1.0 + 0.006 * np.sin(2 * np.pi * 4.8 * tt) * np.minimum(tt / 0.3, 1.0)
    ph = 2 * np.pi * np.cumsum(f_curve * vib) / SR
    tone = 0.78 * np.sin(ph) + 0.18 * np.sin(2 * ph) + 0.05 * np.sin(3 * ph)
    breath = np.random.default_rng(int(freq)).normal(0, 0.04, len(tt))
    b, a = butter(2, [500 / (SR / 2), 2600 / (SR / 2)], btype="band")
    breath = filtfilt(b, a, breath) * np.exp(-tt * 3.5)
    env = np.minimum(tt / 0.12, 1.0) * np.minimum((dur - tt) / 0.22, 1.0)
    return (tone + breath) * np.maximum(env, 0.0) * 0.20

def maha_ghanta(freq=720.0, dur=3.2):
    """Heavy bronze Hindu temple bell with authentic inharmonic overtones."""
    tt = np.arange(int(dur * SR)) / SR
    partials = [(1.0, 0.45, 1.1), (2.0, 0.30, 1.6), (2.42, 0.22, 2.1), (3.12, 0.15, 2.8), (4.05, 0.09, 3.6)]
    sig = sum(amp * np.sin(2 * np.pi * freq * r * tt) * np.exp(-tt * dec) for r, amp, dec in partials)
    return sig * np.minimum(tt / 0.003, 1.0) * 0.22

def shankh_naad(dur=2.6):
    """Auspicious deep temple conch horn fanfare."""
    tt = np.arange(int(dur * SR)) / SR
    f = 277.18 * (1.0 - 0.10 * np.exp(-tt * 3.2) + 0.009 * np.sin(2 * np.pi * 5.0 * tt))
    ph = 2 * np.pi * np.cumsum(f) / SR
    sig = 0.55 * np.sin(ph) + 0.32 * np.sin(2 * ph) + 0.16 * np.sin(3 * ph) + 0.08 * np.sin(4 * ph)
    env = np.minimum(tt / 0.24, 1.0) * np.minimum((dur - tt) / 0.42, 1.0)
    return sig * np.maximum(env, 0.0) * 0.24

def manjira_sparkle(dur=0.65):
    """Bright brass Manjira / Kartal devotional cymbals."""
    tt = np.arange(int(dur * SR)) / SR
    sig = 0.34 * np.sin(2 * np.pi * 2460 * tt) * np.exp(-tt * 7.0) + 0.26 * np.sin(2 * np.pi * 3890 * tt) * np.exp(-tt * 9.0) + 0.15 * np.sin(2 * np.pi * 5420 * tt) * np.exp(-tt * 12.0)
    return sig * np.minimum(tt / 0.002, 1.0) * 0.14

def damaru_triplet(pitch=180.0):
    """Crisp Shiva Damaru hand-drum hit."""
    dur = 0.17
    tt = np.arange(int(dur * SR)) / SR
    f = pitch * (1.0 + 0.85 * np.exp(-tt * 34.0))
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 19.0) * np.minimum(tt / 0.002, 1.0) * 0.24


def layer_classical_indian_bed(left, right, dur_s, tabla_start=0.5, tabla_end=None, raga="shivaranjani", seed=108):
    """Layers authentic Raga Sitar, Swarmandal cascades, Sanskrit Om vocal pad, and Tabla Bols onto stereo bed."""
    if tabla_end is None:
        tabla_end = dur_s - 1.5
    n_samples = len(left)
    scales = {
        "shivaranjani": [277.18, 311.13, 329.63, 415.30, 466.16, 554.37, 622.25],
        "bhairav": [277.18, 293.66, 349.23, 369.99, 415.30, 440.00, 523.25, 554.37],
        "bhupali": [277.18, 311.13, 349.23, 415.30, 466.16, 554.37],
    }
    sc = scales.get(raga, scales["shivaranjani"])
    rng = np.random.default_rng(seed)

    def add_s(sig, st, pan=0.0, gain=1.0):
        i0 = int(st * SR)
        if i0 >= n_samples:
            return
        i1 = min(i0 + len(sig), n_samples)
        s = sig[: i1 - i0] * gain
        left[i0:i1] += s * np.cos((pan + 1) * np.pi / 4)
        right[i0:i1] += s * np.sin((pan + 1) * np.pi / 4)

    # Sanskrit Om / Shiva-Stuti Temple Pad across whole episode
    for st in np.arange(0.0, max(0.1, dur_s - 3.5), 4.0):
        add_s(sanskrit_om_pad(138.59, 4.6), float(st), pan=0.0, gain=0.45)

    # Swarmandal sweeps + Sitar Raga phrases every ~7-9s
    for idx, st in enumerate(np.arange(0.6, max(1.0, dur_s - 2.0), 8.2)):
        add_s(swarmandal_sweep(sc, 1.55), float(st), pan=-0.22 if idx % 2 == 0 else 0.22, gain=0.65)
        f1 = sc[int(rng.integers(0, len(sc)))]
        f2 = sc[int(rng.integers(0, len(sc)))]
        add_s(sitar_pluck(f1, 1.4, 1.07), float(st) + 1.8, pan=0.25, gain=0.60)
        add_s(sitar_pluck(f2, 1.5, 1.0), float(st) + 3.8, pan=-0.20, gain=0.58)

    # Classical Tabla Theka + Manjira sparkles
    for beat, tb in enumerate(np.arange(tabla_start, min(tabla_end, dur_s - 0.5), 0.42)):
        if beat % 4 == 0:
            add_s(tabla_dha(), float(tb), pan=-0.12, gain=0.55)
            if beat % 8 == 0:
                add_s(manjira_sparkle(), float(tb), pan=0.32, gain=0.42)
        else:
            add_s(tabla_na(), float(tb), pan=0.14, gain=0.42)

