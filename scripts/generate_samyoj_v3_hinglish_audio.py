import array
import math
import os
import random
import subprocess
import wave

SR = 48000
DUR = 60.000
N = int(SR * DUR)

os.makedirs("public/audio", exist_ok=True)
os.makedirs("productions/006-samyoj-launch-v3", exist_ok=True)

ffmpeg_bin = "node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg"
if not os.path.exists(ffmpeg_bin):
    ffmpeg_bin = "ffmpeg"


def load_vo_trimmed(mp3_path: str, max_dur: float):
    """Decode VO mp3 to 48kHz mono PCM, trim silence, and tempo-fit if > max_dur."""
    if not os.path.exists(mp3_path):
        return None
    tmp_wav = "/tmp/vo_decode_tmp.wav"
    subprocess.run(
        [ffmpeg_bin, "-y", "-i", mp3_path, "-ar", str(SR), "-ac", "1", tmp_wav],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    with wave.open(tmp_wav, "rb") as wf:
        raw = wf.readframes(wf.getnframes())
    samples = array.array("h")
    samples.frombytes(raw)
    floats = [s / 32768.0 for s in samples]

    thresh = 0.012
    i0 = 0
    while i0 < len(floats) and abs(floats[i0]) < thresh:
        i0 += 1
    i1 = len(floats) - 1
    while i1 > i0 and abs(floats[i1]) < thresh:
        i1 -= 1
    pad = int(0.03 * SR)
    i0 = max(0, i0 - pad)
    i1 = min(len(floats), i1 + pad)
    trimmed = floats[i0:i1]
    dur = len(trimmed) / SR

    if dur > max_dur:
        tempo = min(1.22, dur / max_dur)
        tmp_trim = "/tmp/vo_trim_tmp.wav"
        tmp_fast = "/tmp/vo_fast_tmp.wav"
        pcm_trim = array.array("h", [int(max(-32768, min(32767, v * 32767))) for v in trimmed])
        with wave.open(tmp_trim, "wb") as wf:
            wf.setnchannels(1)
            wf.setsampwidth(2)
            wf.setframerate(SR)
            wf.writeframes(pcm_trim.tobytes())
        subprocess.run(
            [ffmpeg_bin, "-y", "-i", tmp_trim, "-af", f"atempo={tempo:.4f}", tmp_fast],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        with wave.open(tmp_fast, "rb") as wf:
            raw2 = wf.readframes(wf.getnframes())
        s2 = array.array("h")
        s2.frombytes(raw2)
        trimmed = [v / 32768.0 for v in s2]

    # Normalize to consistent broadcast vocal RMS (0.20) with smooth soft-knee ceiling
    rms = math.sqrt(sum(v * v for v in trimmed) / max(1, len(trimmed)))
    if rms > 0.005:
        gain = min(3.2, 0.20 / rms)
        trimmed = [math.tanh(v * gain * 1.15) * 0.86 for v in trimmed]
    return trimmed


music = [0.0] * N
sfx = [0.0] * N
vo_bus = [0.0] * N


def add_buf(target, t_sec: float, samples, gain: float = 1.0) -> None:
    idx = int(round(t_sec * SR))
    if idx >= N or idx + len(samples) <= 0:
        return
    src_start = max(0, -idx)
    dst_start = max(0, idx)
    length = min(len(samples) - src_start, N - dst_start)
    for k in range(length):
        target[dst_start + k] += samples[src_start + k] * gain


def sine_pluck(freq: float, dur: float, decay: float = 9.0, harmonics: bool = True):
    n = int(SR * dur)
    out = [0.0] * n
    two_pi_f = 2.0 * math.pi * freq / SR
    for i in range(n):
        t = i / SR
        env = math.exp(-decay * t) * (1.0 - math.exp(-320.0 * t))
        w = math.sin(two_pi_f * i)
        if harmonics:
            w += 0.35 * np.sin(2.0 * two_pi_f * i) if False else 0.35 * math.sin(2.0 * two_pi_f * i) * math.exp(-16.0 * t)
            w += 0.12 * math.sin(3.0 * two_pi_f * i) * math.exp(-24.0 * t)
        out[i] = w * env
    return out


def soft_pad(freq: float, dur: float, attack: float = 0.25, release: float = 0.45):
    n = int(SR * dur)
    out = [0.0] * n
    a_n = max(1, min(n, int(SR * attack)))
    r_n = max(1, min(n, int(SR * release)))
    two_pi_f = 2.0 * math.pi * freq / SR
    for i in range(n):
        env = 1.0
        if i < a_n:
            env *= (i / a_n) ** 1.5
        if i >= n - r_n:
            env *= ((n - 1 - i) / r_n) ** 1.5
        w = 0.65 * math.sin(two_pi_f * i) + 0.25 * math.sin(2.0 * two_pi_f * i)
        out[i] = w * env
    return out


def soft_kick(dur: float = 0.18):
    n = int(SR * dur)
    out = [0.0] * n
    phase = 0.0
    for i in range(n):
        t = i / SR
        f = 105.0 * math.exp(-28.0 * t) + 46.0
        phase += 2.0 * math.pi * f / SR
        env = math.exp(-20.0 * t) * (1.0 - math.exp(-600.0 * t))
        out[i] = math.sin(phase) * env
    return out


def crisp_hat(dur: float = 0.045):
    rng = random.Random(42)
    n = int(SR * dur)
    out = [0.0] * n
    prev = 0.0
    for i in range(n):
        t = i / SR
        cur = rng.uniform(-1.0, 1.0)
        hp = cur - prev
        prev = cur
        out[i] = hp * math.exp(-95.0 * t) * 0.25
    return out


def ui_pop(freq: float = 620.0):
    dur = 0.065
    n = int(SR * dur)
    out = [0.0] * n
    phase = 0.0
    for i in range(n):
        t = i / SR
        f = freq * (1.0 + 0.45 * math.exp(-45.0 * t))
        phase += 2.0 * math.pi * f / SR
        env = math.exp(-52.0 * t) * (1.0 - math.exp(-800.0 * t))
        out[i] = math.sin(phase) * env
    return out


def ui_click():
    dur = 0.032
    n = int(SR * dur)
    out = [0.0] * n
    for i in range(n):
        t = i / SR
        env = math.exp(-140.0 * t) * (1.0 - math.exp(-1600.0 * t))
        out[i] = (0.7 * math.sin(2 * math.pi * 1450 * t) + 0.3 * math.sin(2 * math.pi * 2900 * t)) * env
    return out


def ui_tick():
    dur = 0.018
    n = int(SR * dur)
    out = [0.0] * n
    for i in range(n):
        t = i / SR
        out[i] = math.sin(2 * math.pi * 2100 * t) * math.exp(-220.0 * t)
    return out


def confirm_ding(base: float = 880.0):
    w1 = sine_pluck(base, 0.38, decay=8.5, harmonics=True)
    w2 = sine_pluck(base * 1.5, 0.42, decay=8.0, harmonics=False)
    out = [0.0] * int(SR * 0.50)
    for i, v in enumerate(w1):
        out[i] += v
    off = int(SR * 0.055)
    for i, v in enumerate(w2):
        if off + i < len(out):
            out[off + i] += 0.65 * v
    return out


def whoosh(dur: float = 0.35, up: bool = True):
    rng = random.Random(7)
    n = int(SR * dur)
    out = [0.0] * n
    lp = 0.0
    phase = 0.0
    for i in range(n):
        u = i / max(1, n - 1)
        raw = rng.uniform(-1.0, 1.0)
        lp = 0.90 * lp + 0.10 * raw
        f = (220.0 + 440.0 * u) if up else (660.0 - 460.0 * u)
        phase += 2.0 * math.pi * f / SR
        env = (math.sin(math.pi * u)) ** 1.4
        out[i] = (lp * 0.9 + 0.22 * math.sin(phase)) * env
    return out


# 1) 120 BPM Minimal Electronic Music Bed
chords = [
    (220.00, [440.00, 554.37, 659.25]),
    (185.00, [369.99, 440.00, 554.37]),
    (146.83, [293.66, 369.99, 440.00]),
    (164.81, [329.63, 415.30, 493.88]),
]

for bar in range(1, 29):
    t_bar = bar * 2.0
    root, notes = chords[(bar // 2) % 4]
    pad_gain = 0.048 if t_bar < 54.0 else 0.056 * max(0.25, 1.0 - (t_bar - 54.0) / 6.0)
    for nf in notes:
        add_buf(music, t_bar, soft_pad(nf, 2.05, 0.25, 0.40), gain=pad_gain)
    if bar >= 2:
        add_buf(music, t_bar, soft_pad(root * 0.5, 2.05, 0.15, 0.35), gain=pad_gain * 1.1)

arp_order = [0, 1, 2, 1, 0, 2, 1, 2]
for step in range(0, 236):
    ts = step * 0.25
    if ts >= 58.0:
        break
    bar_idx = int(ts // 2.0)
    _, notes = chords[(bar_idx // 2) % 4]
    note_f = notes[arp_order[step % 8]]
    if ts < 2.6:
        if step % 2 == 0:
            add_buf(music, ts, sine_pluck(440.0, 0.18, decay=18.0, harmonics=False), gain=0.05)
    elif ts < 54.0:
        g = 0.062 if (step % 2 == 0) else 0.036
        add_buf(music, ts, sine_pluck(note_f, 0.32, decay=11.0, harmonics=True), gain=g)
    else:
        if step % 4 == 0:
            fade = max(0.0, 1.0 - (ts - 54.0) / 4.5)
            add_buf(music, ts, sine_pluck(note_f, 0.55, decay=6.5, harmonics=False), gain=0.058 * fade)

kick_w = soft_kick()
hat_w = crisp_hat()
for beat in range(5, 108):
    tb = beat * 0.5
    if beat % 2 == 0:
        add_buf(music, tb, kick_w, gain=0.16)
    else:
        add_buf(music, tb, hat_w, gain=0.075)
    add_buf(music, tb + 0.25, hat_w, gain=0.045)

# 2) Place VO Clips cleanly & compute exact -10 dB ducking windows
vo_specs = [
    ("public/audio/v3-vo-hi/vo_01.mp3", 0.35, 4.35, "Scene 1: Itne saare chats, aur apps... ab sab kuch ek hee workspace mein."),
    ("public/audio/v3-vo-hi/vo_02.mp3", 5.25, 5.20, "Scene 2: WhatsApp ke liye ek smart team inbox — forms bhejein, leads assign karein, aur notes rakhein."),
    ("public/audio/v3-vo-hi/vo_03.mp3", 11.10, 4.70, "Scene 3: Ab AI khud WhatsApp calls uthaata hai, aur poori summary chat mein save karta hai."),
    ("public/audio/v3-vo-hi/vo_04.mp3", 16.20, 4.50, "Scene 4: Apni pricing aur FAQs par AI ko train kijiye — har customer ke liye ready."),
    ("public/audio/v3-vo-hi/vo_05.mp3", 21.25, 5.15, "Scene 5: Minaton mein automations banaiye, har channel ko connect kijiye, aur apna flow live test kijiye."),
    ("public/audio/v3-vo-hi/vo_06.mp3", 26.90, 3.90, "Scene 6: Prebuilt templates ke saath, Gmail se follow-up emails bhejna ab behad aasaan hai."),
    ("public/audio/v3-vo-hi/vo_07.mp3", 31.25, 5.15, "Scene 7: Seconds mein post banaiye, publish kijiye, aur comments par instant reply aur DM paiye."),
    ("public/audio/v3-vo-hi/vo_08.mp3", 36.90, 4.25, "Scene 8: Messenger par AI live replies, leads, aur history — sab ek jagah."),
    ("public/audio/v3-vo-hi/vo_09.mp3", 42.45, 4.05, "Scene 9: Active ad campaigns, cost per lead, aur nayi leads CRM mein track karein."),
    ("public/audio/v3-vo-hi/vo_10.mp3", 47.65, 5.05, "Scene 10: Sabhi channels, live activity, aur team metrics — ek saaf, synced dashboard mein."),
    ("public/audio/v3-vo-hi/vo_11.mp3", 54.80, 4.20, "Scene 11: संयोज (Samyoj). Har customer conversation, ek workspace."),
]

vo_windows = []
vo_cue_log = []
for path, start_s, max_d, script_line in vo_specs:
    samples = load_vo_trimmed(path, max_d)
    if samples is not None:
        dur_s = len(samples) / SR
        add_buf(vo_bus, start_s, samples, gain=0.98)
        vo_windows.append((max(0.0, start_s - 0.10), min(DUR, start_s + dur_s + 0.15)))
        vo_cue_log.append((start_s, start_s + dur_s, script_line))
    else:
        vo_windows.append((start_s, min(DUR, start_s + max_d)))
        vo_cue_log.append((start_s, start_s + max_d, f"[PENDING] {script_line}"))

duck = [1.0] * N
ramp = int(SR * 0.16)
for vs, ve in vo_windows:
    i0 = max(0, int(vs * SR))
    i1 = min(N, int(ve * SR))
    span = i1 - i0
    for k in range(span):
        val = 0.22  # -13 dB crisp ducking under VO
        if k < ramp:
            val = 1.0 - (1.0 - 0.22) * (k / ramp)
        elif k >= span - ramp:
            val = 0.22 + (1.0 - 0.22) * ((k - (span - ramp)) / ramp)
        if val < duck[i0 + k]:
            duck[i0 + k] = val

for i in range(N):
    music[i] *= duck[i]

# 3) Timestamped UI SFX
cues = []


def log_sfx(t_sec: float, desc: str, samples, gain: float) -> None:
    add_buf(sfx, t_sec, samples, gain=gain)
    cues.append((t_sec, desc))


click_w = ui_click()
tick_w = ui_tick()

chaos_pops = [0.00, 0.25, 0.42, 0.58, 0.72, 0.85, 0.98, 1.10, 1.22, 1.34, 1.45, 1.56, 1.66, 1.76]
for idx, tp in enumerate(chaos_pops):
    log_sfx(tp, f"Scene 1 chaos card pop #{idx+1}", ui_pop(540 + idx * 24), 0.14)

log_sfx(1.96, "Scene 1 pull-to-centre whoosh", whoosh(0.32, up=False), 0.22)
log_sfx(2.30, "Scene 1 indigo dot pulse snap", sine_pluck(587.33, 0.25, decay=12.0), 0.19)
log_sfx(2.50, "Scene 1 workspace open bloom", confirm_ding(587.33), 0.24)
for idx, tc in enumerate([3.25, 3.45, 3.65, 3.85, 4.05]):
    notes_pent = [554.37, 659.25, 739.99, 880.00, 1108.73]
    log_sfx(tc, f"Scene 1 channel tile tick #{idx+1}", sine_pluck(notes_pent[idx], 0.22, decay=10.0), 0.15)
log_sfx(4.55, "Scene 1->2 WhatsApp card expand swoop", whoosh(0.42, up=True), 0.17)

for idx, tc in enumerate([5.5, 5.6, 5.7, 5.8, 5.9]):
    log_sfx(tc, f"Scene 2 inbox row cascade #{idx+1}", ui_pop(500 + idx * 35), 0.10)
log_sfx(6.30, "Scene 2 incoming message bubble", ui_pop(680), 0.14)
log_sfx(6.90, "Scene 2 outgoing reply bubble", ui_pop(760), 0.13)
log_sfx(7.50, "Scene 2 WhatsApp Form slide up", whoosh(0.28, up=True), 0.12)
for k in range(8):
    log_sfx(7.80 + k * 0.085, "Scene 2 form typing tick", tick_w, 0.065)
log_sfx(8.60, "Scene 2 Submit button click", click_w, 0.22)
log_sfx(8.95, "Scene 2 Booking confirmed ding", confirm_ding(880.0), 0.21)
log_sfx(9.20, "Scene 2 Assign button click", click_w, 0.19)
log_sfx(9.70, "Scene 2 Riya assign select click", click_w, 0.19)
for k in range(14):
    log_sfx(9.65 + k * 0.09, "Scene 2 internal note typing tick", tick_w, 0.06)
log_sfx(10.88, "Scene 2 WhatsApp call icon click", click_w, 0.22)

log_sfx(11.00, "Scene 3 incoming call ring tone 1", sine_pluck(784.0, 0.25, decay=7.5, harmonics=False), 0.15)
log_sfx(11.30, "Scene 3 Calling AI answer chime", confirm_ding(740.0), 0.18)
log_sfx(11.45, "Scene 3 caller bubble 1", ui_pop(640), 0.12)
log_sfx(11.95, "Scene 3 AI reply bubble 1", ui_pop(820), 0.13)
log_sfx(12.50, "Scene 3 caller bubble 2", ui_pop(640), 0.12)
log_sfx(13.00, "Scene 3 AI reply bubble 2", ui_pop(820), 0.13)
log_sfx(13.55, "Scene 3 caller bubble 3", ui_pop(640), 0.12)
log_sfx(13.98, "Scene 3 call ended shrink back", click_w, 0.18)
log_sfx(14.30, "Scene 3 AI summary bloom swoosh", whoosh(0.40, up=True), 0.19)
log_sfx(14.78, "Scene 3 AI summary badge lock-in chime", confirm_ding(880.0), 0.21)
log_sfx(15.80, "Scene 3->4 sparkle wipe", whoosh(0.35, up=True), 0.14)

log_sfx(16.14, "Scene 4 Pricing.pdf drag start", ui_pop(580), 0.12)
log_sfx(16.50, "Scene 4 Pricing.pdf drop snap", click_w, 0.17)
log_sfx(16.56, "Scene 4 Class-Schedule.pdf drag start", ui_pop(620), 0.12)
log_sfx(16.88, "Scene 4 Class-Schedule.pdf drop snap", click_w, 0.17)
log_sfx(16.94, "Scene 4 FAQs drag start", ui_pop(660), 0.12)
log_sfx(17.24, "Scene 4 FAQs drop snap", click_w, 0.17)
log_sfx(17.76, "Scene 4 Trained confirmation ding", confirm_ding(987.77), 0.21)
log_sfx(17.98, "Scene 4 Test Chat button click", click_w, 0.21)
log_sfx(18.52, "Scene 4 test input focus click", click_w, 0.16)
for k in range(7):
    log_sfx(18.55 + k * 0.065, "Scene 4 test chat fast typing", tick_w, 0.06)
log_sfx(19.08, "Scene 4 test question Send click", click_w, 0.20)
log_sfx(19.34, "Scene 4 AI reply + source citation pop", ui_pop(840), 0.15)
log_sfx(20.24, "Scene 4 AI on live chat toggle click", click_w, 0.22)
log_sfx(20.82, "Scene 4->5 indigo line shoot", whoosh(0.26, up=True), 0.16)

log_sfx(21.15, "Scene 5 Node 1 drop", ui_pop(580), 0.16)
log_sfx(22.22, "Scene 5 Node 2 snap", ui_pop(660), 0.17)
log_sfx(22.45, "Scene 5 Node 3 slide", ui_pop(700), 0.14)
log_sfx(23.78, "Scene 5 Node 4 snap", ui_pop(740), 0.17)
log_sfx(24.10, "Scene 5 Node 5 pop", ui_pop(820), 0.16)
log_sfx(24.90, "Scene 5 Test button click", click_w, 0.22)
for idx, (tp, freq) in enumerate([(25.18, 554.37), (25.48, 659.25), (25.84, 739.99), (26.08, 880.00)]):
    log_sfx(tp, f"Scene 5 live test chat step #{idx+1}", sine_pluck(freq, 0.24, decay=10.0), 0.17)
log_sfx(26.55, "Scene 5->6 Gmail follow-up card transition", whoosh(0.35, up=True), 0.15)

log_sfx(27.76, "Scene 6 prebuilt template click", click_w, 0.19)
for k in range(8):
    log_sfx(27.92 + k * 0.08, "Scene 6 subject typing tick", tick_w, 0.06)
log_sfx(29.60, "Scene 6 Send Email click", click_w, 0.22)
log_sfx(29.75, "Scene 6 Sent via Gmail ding", confirm_ding(987.77), 0.21)
log_sfx(30.75, "Scene 6->7 pull-back + Instagram swoosh", whoosh(0.38, up=True), 0.15)

for k in range(6):
    log_sfx(31.08 + k * 0.08, "Scene 7 post prompt typing", tick_w, 0.055)
log_sfx(31.74, "Scene 7 Generate post click", click_w, 0.21)
log_sfx(32.15, "Scene 7 New Year Offer image generated chime", confirm_ding(880.0), 0.19)
log_sfx(32.90, "Scene 7 Publish post click", click_w, 0.22)
log_sfx(32.98, "Scene 7 Published + Comment Automation active", confirm_ding(987.77), 0.20)
log_sfx(33.45, "Scene 7 live comment 1", ui_pop(640), 0.12)
log_sfx(34.25, "Scene 7 comment 1 auto-reply + DM", confirm_ding(880.0), 0.16)
log_sfx(34.80, "Scene 7 live comment 2", ui_pop(660), 0.12)
log_sfx(35.50, "Scene 7 comment 2 auto-reply + DM", confirm_ding(932.33), 0.16)
log_sfx(36.70, "Scene 7->8 open DM Inbox swoosh", whoosh(0.32, up=True), 0.15)

log_sfx(36.85, "Scene 8 Messenger FB Automation welcome", ui_pop(700), 0.13)
log_sfx(37.40, "Scene 8 Messenger customer reply", ui_pop(640), 0.13)
log_sfx(37.94, "Scene 8 AI Agent ON toggle click", click_w, 0.21)
log_sfx(38.45, "Scene 8 AI Agent pricing reply", ui_pop(840), 0.15)
log_sfx(39.20, "Scene 8 customer trial booking request", ui_pop(640), 0.13)
log_sfx(39.95, "Scene 8 AI Agent reservation confirmation", confirm_ding(880.0), 0.18)
for k in range(8):
    log_sfx(40.12 + k * 0.11, "Scene 8 internal note typing tick", tick_w, 0.055)
for tp in [39.55, 39.95, 40.35, 40.75]:
    log_sfx(tp, "Scene 8 activity history item", ui_pop(760), 0.09)
log_sfx(41.75, "Scene 8->9 slide transition", whoosh(0.36, up=True), 0.16)

for idx, tp in enumerate([42.30, 42.45, 42.60]):
    log_sfx(tp, f"Scene 9 Ad summary stat #{idx+1}", ui_pop(600 + idx * 50), 0.11)
for idx, tp in enumerate([43.25, 43.70, 44.15, 44.60]):
    log_sfx(tp, f"Scene 9 New ad lead captured #{idx+1}", ui_pop(740 + idx * 40), 0.12)
log_sfx(44.10, "Scene 9 Fri peak 10 leads pop", ui_pop(920), 0.15)
log_sfx(46.60, "Scene 9->10 zoom-out-into-grid", whoosh(0.40, up=False), 0.16)

for idx, tp in enumerate([47.20, 47.35, 47.50]):
    log_sfx(tp, f"Scene 10 KPI card #{idx+1}", ui_pop(620 + idx * 55), 0.11)
for idx, tp in enumerate([48.60, 49.10, 49.60, 50.10]):
    log_sfx(tp, f"Scene 10 live activity tick #{idx+1}", ui_pop(780 + idx * 35), 0.11)
log_sfx(52.90, "Scene 10 collapse-to-dot whoosh", whoosh(0.45, up=False), 0.18)

log_sfx(54.00, "Scene 11 outro dot bloom", confirm_ding(659.25), 0.20)
for idx in range(4):
    log_sfx(54.40 + idx * 0.06, f"Scene 11 outro tile fan #{idx+1}", ui_pop(700 + idx * 45), 0.10)
log_sfx(55.25, "Scene 11 Samyoj wordmark chime", confirm_ding(880.0), 0.20)

# Mix VO + Ducked Music + UI SFX
mix = [vo_bus[i] + music[i] * 0.90 + sfx[i] * 0.78 for i in range(N)]
peak = max(abs(v) for v in mix)
scale = (0.95 / peak) if peak > 0.95 else 1.0

fade_n = int(SR * 0.15)
for k in range(fade_n):
    mix[N - fade_n + k] *= 1.0 - (k / fade_n)

pcm = array.array("h")
for v in mix:
    s = int(max(-32768, min(32767, round(v * scale * 32767.0))))
    pcm.append(s)
    pcm.append(s)

wav_path = "/tmp/samyoj-v3-music-sfx-hi.wav"
mp3_path = "public/audio/samyoj-v3-master-vo-hi.mp3"
legacy_mp3_path = "/tmp/samyoj-v3-music-sfx-hi-copy.mp3"

with wave.open(wav_path, "wb") as wf:
    wf.setnchannels(2)
    wf.setsampwidth(2)
    wf.setframerate(SR)
    wf.writeframes(pcm.tobytes())

subprocess.run(
    [ffmpeg_bin, "-y", "-i", wav_path, "-c:a", "libmp3lame", "-b:a", "320k", mp3_path],
    check=True,
    stdout=subprocess.DEVNULL,
    stderr=subprocess.DEVNULL,
)
subprocess.run(
    [ffmpeg_bin, "-y", "-i", wav_path, "-c:a", "libmp3lame", "-b:a", "320k", legacy_mp3_path],
    check=True,
    stdout=subprocess.DEVNULL,
    stderr=subprocess.DEVNULL,
)

cues.sort(key=lambda x: x[0])
cue_lines = [
    "SAMYOJ LAUNCH FILM v3 — MASTER AUDIO, VOICEOVER & SFX CUE SHEET (60.000s @ 120 BPM)",
    "======================================================================================",
    "Master mix: public/audio/samyoj-v3-master-vo-hi.mp3 (48 kHz, 320 kbps stereo)",
    "Voiceover: voice-10 en-IN Hinglish (individual clips in public/audio/v3-vo-hi/vo_01..vo_11.mp3)",
    "Music bed: 120 BPM (0.500s/beat, 2.000s/bar) in A major / F# minor, -13 dB ducked under VO",
    "",
    "VOICEOVER TIMESTAMPS (SILENCE-TRIMMED & SCENE-LOCKED):",
]
for vs, ve, txt in vo_cue_log:
    cue_lines.append(f"  {vs:06.3f}s - {ve:06.3f}s | {txt}")

cue_lines.append("")
cue_lines.append("TIMESTAMPED UI SFX CUES:")
for ts, desc in cues:
    cue_lines.append(f"  {ts:06.3f}s | {desc}")

with open("productions/006-samyoj-launch-v3/SFX_CUE_SHEET_HINGLISH.txt", "w") as f:
    f.write("\n".join(cue_lines) + "\n")

print(f"Generated {mp3_path} ({os.path.getsize(mp3_path)} bytes), {len(vo_cue_log)} VO cues, {len(cues)} SFX cues")
