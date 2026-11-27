# 55 · Direction, Camera Craft, Storytelling & AV Scriptwriting

> **Purpose:** Turn technical animation into emotionally gripping cinema and crystal-clear product storytelling. Tools never rescue weak direction—story causality, framing, rhythm, and sound do.

---

## 1. Story Architecture & Narrative Frameworks

### 1A. The Pixar Story Spine (Causal Proof Test)
Before storyboarding a single frame, write the entire plot in 7–8 lines using **causal links**:
1. *Once upon a time...* (World & character baseline)
2. *Every day...* (Routine or existing pain)
3. *But one day...* (Inciting disruption / catalyst)
4. *Because of that...* (First consequence & choice)
5. *Because of that...* (Escalating complication)
6. *Until finally...* (Climax / decisive turn)
7. *And ever since then...* (Transformed new normal — visible visual contrast vs Line 1!)

**Fatal Mistake Test:** Read lines 3–6 out loud. If two beats are joined only by *"And then..."* instead of *"Because of that..."*, the story is an episodic slideshow—rewrite until every beat causes the next.

### 1B. The 6-Second Cold-Open Hook (Retention Engine)
Modern viewers decide within **3–6 seconds** whether to stay:
- **Mythological / Narrative Films:** Open *in media res* on a mysterious visual contrast (`S00Hook`: gods + spirits marching together → *"Aaj kiski shaadi hai?!"*) before rewinding to Act 1 setup.
- **Product / SaaS Launches:** Open with visceral visual overwhelm (14 flying notification chaos cards pulling into one calm center dot) before unveiling the clean workspace.

### 1C. Dan Harmon 8-Step Story Circle (Character Arcs)
`1. Comfort Zone → 2. Need/Desire → 3. Enter Unfamiliar World → 4. Adapt → 5. Get What They Wanted → 6. Pay Heavy Price → 7. Return Changed → 8. Mastery.`

---

## 2. Cinematography & Camera Grammar

**Golden Rule:** *Never move the camera just because code allows it.* Every pan, dolly, or zoom must answer **one question**: *Are we revealing new space, tracking an actor's momentum, or tightening emotional focus?*

| Move | Technical Meaning | Narrative / Emotional Effect |
|---|---|---|
| **Static Locked** | Zero camera transform | Observational calm; lets character acting/UI speak |
| **Dolly In / Out** | Virtual camera approaches/leaves (changes parallax!) | In = intimacy, tension, decision · Out = isolation, grand scale |
| **Optical Zoom** | Scale changes without parallax shift | Sudden shock, comic punch, UI inspection |
| **Truck / Track** | Lateral slide matching moving actor | Physical journey, marching barat, procession energy |
| **Whip Pan** | Fast `0.22s–0.32s` directional blur/slide cut | Energetic time/location jump linking cause & effect |
| **Crane / Pedestal** | Vertical rise/drop | Rising over temple/city = awe; dropping low = vulnerability |
| **Handheld Micro-Trauma** | Band-limited harmonic shake (`1–3px`, decaying) | Impact shock (thunder, damaru beat, heavy landing) |

### Spatial Continuity Rules
1. **The 180-Degree Axis Rule:** In any two-character interaction, keep Character A consistently on Screen Left and Character B on Screen Right across cuts unless an explicit camera arc moves visibly across the axis. Flipping sides breaks spatial orientation instantly.
2. **Eye-Line Match & Leading Lines:** Place subjects looking *into* open negative space (Rule of Thirds), never nose-against-the-screen-edge.
3. **Caption & HUD-Safe Camera Rig (`cameraFollow`):** When zooming `1.06x–1.14x` onto an active focal coordinate `(fx, fy)`, clamp vertical `ty` by `topGuard` (protecting top `CaptionBar` / HUD) and horizontal `tx` by `minTx` (protecting left sidebar/brand anchor).

---

## 3. Direction, Staging & Rhythm

- **5-Step Action Beat Anatomy:** `1. Orient/Anticipate → 2. Action Stroke → 3. Contact/Decision → 4. Consequence/Reaction → 5. Settle Hold`.
- **Reading Hold Discipline:** Phrases need `>= 1.0s` (+`0.25s` per word over 3); final hero taglines need `>= 2.0s` stillness so the eye absorbs the brand.
- **Match-on-Action Transitions:** Carry one visual anchor across cuts (e.g., an indigo brand dot, a glowing flying message pill, or a camera push through an open doorway) so cuts feel inevitable rather than random slides.

---

## 4. Two-Column AV Scriptwriting & Audio-Visual Synchronization

Write every project as a **locked Two-Column AV Script** before touching scene code:

```
| BEAT | TIME | VOICEOVER (Locked WPM) | ON-SCREEN VISUAL & CAMERA ACTION | SFX / MUSIC CUE |
```

### Proven Audio & TTS Engineering Rules
1. **Spoken Word Budget:**
   - **English Narration:** `130–150 WPM` (~2.2–2.5 words/sec; crisp, unhurried).
   - **Hindi / Hinglish Narration:** `115–135 WPM` (~800 chars/min; leave natural comma pauses!).
2. **TTS Script Hygiene (Code-Switching Prevention):**
   - **Never mix ASCII Latin words inside Devanagari text** for `hi` TTS models (causes jarring mid-sentence English-accent switches).
   - For warm, natural Hinglish, prefer **`en-IN` female narration** with **clean phonetic Roman Hinglish** (`"saare"`, `"ek hee"`, `"aasaan"`), OR pure Devanagari for `hi` models.
   - If a brand/proper noun (like **`Samyoj` / `संयोज`**) is mispronounced by an `en-IN` model, synthesize that word with `language: "hi"` using the **same `voice_id`**, match RMS, and splice with a `0.32s` pause!
3. **Scene-Locked Breath Gaps (`>= 0.45s`):**
   - **Critical Rule:** Voiceover for Scene `N` MUST finish **before** Scene `N` begins its exit transition, and Voiceover for Scene `N+1` MUST wait `0.15s–0.30s` **after** Scene `N+1` has landed cleanly (`>= 0.90s–1.20s` total gap across visual transitions). Otherwise viewers feel the next sentence talking over the previous scene's exit!
4. **Broadcast Mix Targets:**
   - Loudness **`-14 LUFS`** integrated, true peak **`<= -1.0 dBFS`**, music bed ducked **`-13 dB`** smoothly (`160ms` ramp) under every VO window, and frame-locked UI/foley SFX (`100–350ms` after visual contact).

---

*Related:* [`docs/54-BACKGROUND-DETAILING-AND-CONSISTENCY.md`](54-BACKGROUND-DETAILING-AND-CONSISTENCY.md) · [`skill-pack/cinematic-direction-and-script/SKILL.md`](../skill-pack/cinematic-direction-and-script/SKILL.md)
