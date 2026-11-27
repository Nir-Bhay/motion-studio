# 54 · Background Detailing, Depth Layers & Cross-Scene Consistency

> **Purpose:** Make environments feel rich, atmospheric, and volumetric while ensuring characters NEVER visually drown in background clutter—and ensuring Scene 1 through Scene 20 look unmistakably like one cohesive film.

---

## 1. Disney Multiplane + Ghibli 3-Plane Depth Architecture

Borrow both Disney's optical multiplane physics and Studio Ghibli's atmospheric value compression. Divide every narrative scene into **4–5 explicit Z-planes**:

| Plane | Z-Depth | Visual Treatment | Motion Parallax Rate | Detail Budget |
|---|---|---|---|---|
| **Sky / Horizon Dome** | `z = +20` | Smooth gradient + subtle sun/moon halo | `0.08x – 0.15x` | Minimal (no sharp edges) |
| **Far Background** | `z = +10` | Atmospheric haze wash, desaturated, low contrast | `0.25x – 0.35x` | Soft silhouettes only |
| **Midground Stage** | `z = +3` | Architecture, hills, trees, studio props | `0.55x – 0.70x` | Medium detail, muted contrast |
| **Hero Action Plane** | `z = 0` | Characters, UI cards, focal props | **`1.00x`** | **Highest contrast, crispest edges, rim light** |
| **Foreground Occluder** | `z = -4` | Dark framing leaves, pillars, lantern corners | **`1.25x – 1.45x`** | Dark value, optional `2–4px` depth blur |

### The "Parallax Anchor" Rule (Disney Bulletin #17)
Every multiplane pan or dolly shot MUST include **at least one architectural or natural element spanning >= 3 depth planes** (e.g., a temple pillar path receding from foreground to midground, or a winding river/road). Without a bridging anchor, layers feel like flat floating cardboard cutouts.

---

## 2. Value Grouping & Character-Background Separation

The #1 reason 2D animated videos look muddy is **luminance collision** (a mid-tone character standing over a mid-tone busy background):

1. **Three-Value Grouping:** Block every frame into **Light**, **Mid**, and **Dark** zones. Check the frame in **100% Grayscale at 240px thumbnail width** — if the character disappears, the lighting failed.
2. **Disney Contrast Dogma:** Either place a **light/warm character against a cool/dark background** OR a **dark/saturated silhouette against a bright hazy sky**.
3. **Warm-Key / Cool-Shadow Temperature Shift:** Even in dark night scenes, shift background shadows cool indigo (`#131A36`) while kissing hero characters with warm amber/gold key + rim lights (`#FDE047` / `#FB923C`) so eyes lock instantly onto the actor.
4. **SaaS / UI Background Discipline:** For product/UI explainers (like `SamyojLaunchV3`), use **active POV spotlighting**: lift the active panel (`scale 1.02`, crisp `1.5px` frosted-glass border + soft indigo/brand tint) and gently dim inactive panels (`opacity 0.62–0.75`) instead of loud neon colors.

---

## 3. Environmental Life Without Visual Noise

Static backgrounds kill energy; noisy backgrounds kill legibility. Add **2–3 subtle ambient layers** capped at **`<= 15%` contrast**:
- Diagonal translucent volumetric light shafts (`opacity 0.08–0.14`) drifting lazily across hero space.
- Seeded floating dust motes / flower petals / fire embers moving at `12–25 px/sec` with sinusoidal flutter.
- Tiled micro-grain (`160x160` SVG `feTurbulence` tile — **never** full-viewport `1920x1080` `feTurbulence`!) at `2%` opacity to unify vector gradients.
- Subtle wind-reactive foliage (`sin(2π·f·t + phase)` with staggered root-to-tip bend).

---

## 4. Cross-Scene Consistency Locks (Single Source of Truth)

How do you keep a 10-scene or 18-minute multi-part film looking unified across dozens of files?

1. **Master Color Script (`tokens.ts` / `palette.ts`):**
   - Pre-plan emotional palette progression across acts (e.g., *Act 1 Chaos Cool Slate → Act 2 Warm Discovery Amber → Act 3 Climax Deep Violet/Gold → Resolution Clean Daylight*).
   - Forbid ad-hoc hex colors inside scene components — all fills/strokes read from `C.*`.
2. **Proportion & Head-Height Sheet:**
   - Lock canonical scale factors (`HERO_HEIGHT_PX`, `HEAD_RATIO`, `EYE_SIZE`) in a shared `rigMetrics.ts` file so a character never shrinks or grows unpredictably between wide and close-up cuts.
3. **Stroke & Radius Invariants:**
   - Lock `STROKE.outer`, `STROKE.inner`, `RADIUS.card`, `SHADOW.hero` globally. Notice that thin `1px` borders wash out under H.264 `yuv420p` compression — keep structural UI borders `1.25px–1.5px` in medium-contrast slate (`#C6D1E0`) and render with `Config.setVideoImageFormat("png")` + `CRF 16`.
4. **Deterministic Seed Discipline:**
   - Use `random("scene05-petal-" + i)` from Remotion — never `Math.random()`. Every worker renders identical clouds, crowds, and sparkles.
5. **Multi-Frame Consistency QA Gate:**
   - Extract 1 frame per scene boundary + 1 mid-action frame into a contact sheet and inspect:
     - Does text ever collide with `SafeArea` (`top >= 54`, `bottom <= 1026`, `left >= 96`, `right <= 1824`) or `CaptionBar`?
     - Do character colors/outlines hold steady across scene cuts?
     - Are thin borders crisp in the **encoded H.264 MP4**, not just Studio?

---

*Related:* [`docs/53-CHARACTER-DESIGN-RIGGING-AND-MUSCLES.md`](53-CHARACTER-DESIGN-RIGGING-AND-MUSCLES.md) · [`docs/55-DIRECTION-CAMERA-AND-STORYTELLING.md`](55-DIRECTION-CAMERA-AND-STORYTELLING.md)
