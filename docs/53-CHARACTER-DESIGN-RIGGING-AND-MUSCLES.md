# 53 · Character Design, Detailing, Muscle & Facial Rigging

> **Purpose:** Upgrade programmatic 2D/2.5D SVG & Canvas characters from stiff "cutout puppets" to expressive, anatomically grounded actors with believable weight, secondary overlap, and living faces.

---

## 1. Shape Language Matrix (Before Drawing a Single Path)

Lock the cast's **primary, secondary, and forbidden shapes** in pre-production so every actor belongs to the same visual universe:

| Archetype | Primary Shape | Secondary Accents | Psychological Read | Forbidden Shape |
|---|---|---|---|---|
| **Warm Hero / Guide / Child** | Circles & Ovals | Soft teardrops, gentle S-curves | Approachable, trustworthy, nurturing | Razor spikes / sharp acute shards |
| **Guardian / Protector / Mentor** | Squares & Broad Rectangles | Heavy trapezius wedges | Grounded, unshakeable, reliable | Fragile spindly arcs |
| **Trickster / Villain / Speed** | Acute Triangles & Zigzags | Asymmetric sweeps | Dynamic, dangerous, unpredictable | Symmetrical plush ovals |

### The 100% Black Silhouette Acceptance Test
Before coloring or shading any rig:
1. Render the full character in pure `#000000` over `#FFFFFF` at **thumbnail scale (180px wide)**.
2. **Pass Criteria:** Viewer can immediately tell:
   - Who the character is (distinct crown, silhouette props, posture)
   - Where both hands, head, and feet are (no limbs buried inside the torso silhouette!)
   - What emotion/action the pose communicates (**Line of Action** — single sweeping C or S curve from spine through lead limb).

---

## 2. Vector Detailing Ladder & Lighting Separation

Avoid flat uniform SVG strokes (`strokeWidth={2}` everywhere looks amateur). Use a **3-tier line hierarchy + 3-tone cel shading**:

1. **Line-Weight Hierarchy:**
   - **Outer Silhouette / Ground Contact:** `3.0px – 4.0px` dark warm-ink (never pure `#000000`; use `#1A122B` or `#0F172A`)
   - **Garment Folds, Armor Seams, Limb Overlaps:** `1.6px – 2.2px`
   - **Facial Micro-Lines, Jewelry Filigree, Hair Strands:** `0.8px – 1.3px`
2. **3-Tone Cel Shading + Rim Light:**
   - **Base Fill** → **Core Shadow** (`12–18%` darker & shifted cooler/warmer toward shadow temperature) → **Specular Highlight** (`10–15%` lighter clipped crescent on key-light side) → **Back Rim Stroke** (`1.5px–2.5px` crisp bright accent along the opposite edge to pop off dark backgrounds!).
3. **Ground Contact Anchor:**
   - Every grounded actor MUST cast an elliptical contact shadow directly beneath the planted foot/hoof (`opacity: clamp(0.45 / heightScale, 0.1, 0.45)`), scaling down as the character leaps.

---

## 3. Biomechanical Hierarchy & Muscle Overlap

Never animate limbs in isolation. Real motion propagates outward from the **Center of Mass (Pelvis)**:

```
Pelvis (Root translation + tilt)
 ├── Spine (Counter-rotation + squash/stretch)
 │    ├── Chest / Ribcage (Breathing lift + twist)
 │    │    ├── Neck -> Head (Delayed 2–4 frames) -> Hair / Crown / Veil (Delayed 5–9 frames)
 │    │    └── Clavicle -> Upper Arm -> Forearm -> Wrist -> Fingers (Wave propagation!)
 │    └── Dupatta / Cape / Sash (Verlet chain pinned at shoulders)
 └── Left & Right Thigh -> Shin -> Foot (IK planted on ground plane!)
```

### Key Muscle & Secondary-Action Rules
1. **Anticipation → Action → Follow-Through → Settle:**
   - Before a punch, jump, or turn forward, coil **15–20% in the opposite direction** (`0.12s–0.18s`), execute peak velocity, overshoot slightly, and settle via `analyticalSpring`.
2. **Wave Propagation (Whip Principle):**
   - When an arm waves or swings, apply phase offsets: `shoulderPhase = φ`, `elbowPhase = φ - 0.45 rad`, `wristPhase = φ - 0.90 rad`.
3. **Walk / Gait Cycle Math ($\theta \in [0, 2\pi)$):**
   - **Hip Vertical Bob:** $y_{\text{hip}} = -A \cdot |\sin(\theta)|$ (peaks *twice* per stride — highest at passing pose, lowest at contact!).
   - **Opposite Arm/Leg Swing:** Left arm swings forward with right leg (`phase + π`) to balance torso torque.
   - **Foot Roll:** Planted foot slides linearly backward at `-groundSpeed` with flat sole (`angle = 0`); swinging foot lifts along a positive half-sine arc with toe drag.
4. **Ambient Breathing (`breathingCycle`):**
   - Even during "still" dialogue holds, animate `14–16 breaths/min`: chest lifts `1.5–2.5px`, shoulders raise `0.8px`, arms subtly abduct `1°`. Dead stillness kills the illusion of life.

---

## 4. Living Face Rig: Blinks, Saccades & Preston Blair Visemes

### 4A. Eyes (Where the Audience Looks First)
- **Asymmetric Blinking (`naturalBlink`):** Never blink on an exact mechanical timer. Close quickly (`85ms`), hold (`25ms`), open smoothly (`145ms`), every `3.2s–4.5s`, plus an **automatic blink on rapid head turns**!
- **Pupil Saccades:** Eyes jump rapidly (`60ms`) to a new fixation target and hold, rather than drifting smoothly like a screensaver.
- **Eyebrow + Lower-Eyelid Coupling:** Real smiles push the lower eyelid slightly upward (squinting Duchenne smile); surprise lifts both brows and shrinks pupils `8%`.

### 4B. Preston Blair 10-Viseme Lip-Sync System
Map dialogue phonemes (from Whisper/word timestamps or scripted vowel cadence) to **10 reusable SVG mouth states**:

| Viseme | Mouth Shape | Sounds Covered (EN + Hindi/Devanagari) |
|---|---|---|
| `rest` | Relaxed closed lips | Silence / breath |
| `MBP` | Pressed closed lips | `M, B, P` / म, ब, भ, प, फ |
| `AI` | Wide open jaw + tongue | `AA, AE, AH` / आ, अ, ऐ |
| `E` | Medium wide corners back | `EH, EY, IY` / ए, इ, ई |
| `O` | Rounded vertical oval | `AO, OW` / ओ, औ |
| `U` | Tight forward pucker | `UW` / उ, ऊ |
| `WQ` | Narrow rounded funnel | `W, R` / व, र |
| `FV` | Upper teeth on lower lip | `F, V` / फ़, व |
| `L` | Open with tongue tip up | `L, TH, DH` / ल, त, थ, द, ध, न |
| `etc` | Slightly open clenched teeth | `S, Z, T, D, K, G, CH` / स, श, च, ज, क, त |

**Pro Secret — Audio Lead (`1–2 frames`):** Start the visual mouth shape **1–2 frames (`33–50ms`) BEFORE** the audible sound hits. Human perception expects jaw muscles to form before air exits! Combine with **jaw drop coupling** (`jawY += openness * 4px`) so the chin moves when the mouth opens wide.

---

*Related:* [`docs/52-MOTION-MATHEMATICS-AND-PHYSICS.md`](52-MOTION-MATHEMATICS-AND-PHYSICS.md) · [`skill-pack/character-rigging-and-physics/SKILL.md`](../skill-pack/character-rigging-and-physics/SKILL.md)
