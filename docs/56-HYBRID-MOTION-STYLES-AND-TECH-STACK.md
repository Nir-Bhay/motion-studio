# 56 · Hybrid Motion Styles & Rendering Tech Stack Matrix

> **Purpose:** Pick the single best rendering technology and visual language for any future video topic—combining Remotion, Canvas/Skia, Three.js/WebGL, Python Manim, Rive, GLSL Shaders, Pixel/Cel, and AI-assisted assets into one deterministic pipeline.

---

## 1. Visual Style & Tech Engine Decision Matrix

Choose **1 primary visual style + at most 1 accent technique** per film:

| Style / Need | Best Rendering Stack | Signature Craft Rules | Ideal Topics |
|---|---|---|---|
| **SaaS / UI Product Launch** | Remotion React + SVG + `tokens.ts` + POV spotlighting | Frosted-glass borders (`1.25–1.5px`), dim inactive zones, `cameraFollow` with `topGuard`, PNG render | App launches, workflows, AI agent demos |
| **Mythological / Character Epic** | Remotion SVG Rigs + `motionMath.ts` (IK + Verlet) + 5-plane Parallax | Shape language matrix, 3-tone cel shading, rim lights, 10-viseme lip-sync, classical/foley mix | Stories, culture, mascots, parables |
| **Math, Physics & STEM Proofs** | **Python Manim** (standalone or transparent WebM/PNG sequence -> Remotion!) | LaTeX `TransformMatchingTex`, dark blueprint canvas, vector fields, coordinate plots | Algorithms, calculus, AI/ML internals, finance |
| **3D Hero Product / Spatial Worlds** | `@remotion/three` (Three.js + React Three Fiber) | Wrap in `<ThreeCanvas>`, drive 100% via `useCurrentFrame()` (**never** R3F `useFrame()`!), studio HDRI lighting | Hardware reveals, spatial diagrams, 3D maps |
| **High-FPS Particle / Generative Art** | HTML5 `<canvas>` 2D or `@remotion/skia` or GLSL Shaders | Deterministic seeded PRNG (`random(seed)`), zero state accumulation across frames | Soundwaves, starfields, fluid/smoke shaders, data storms |
| **Expressive Interactive Mascot** | `@remotion/rive` (Rive state machines) or Lottie | Scrubbed cleanly via frame-to-time binding; lighter & sharper than video sprites | Brand mascots, micro-icons, reactive badges |
| **Pixel Art / Retro 8-bit & 16-bit** | Integer-scaled Canvas (`imageSmoothingEnabled = false`) + crisp step easing | Strict `16px/32px` grid lock, 4–8 color indexed palette, stepped `Math.floor(t * 12)` hold frames | Gaming stories, nostalgic tech history, dev lore |
| **Hand-Drawn Cel Boil** | Multi-pass SVG turbulence displacement or 3-frame jitter cycle (`Math.floor(frame / 4) % 3`) | Warm paper texture, subtle `1–2px` organic line boil, restrained to accents | Emotional beats, diary/sketchbook stories |
| **Isometric 2.5D Systems** | SVG Orthographic projection (`30°` shear/axes) + explicit painter's Z-sort | Consistent top-left key light across all cube faces, animated isometric data packets | Cloud infra, supply chains, city/factory growth |
| **Mixed-Media Documentary Collage** | Cutout PNGs (`generate_image` / archival) + `2–4px` white sticker border + stepped 12fps motion | Paper tear masks, leader lines, crisp monospace evidence labels | History, investigations, case studies |

---

## 2. Official Remotion Superpowers to Leverage

Beyond core React + SVG, Remotion provides deterministic first-party packages worth installing when a scene truly benefits:

- **`@remotion/paths`**: `getLength()`, `getPointAtLength()`, `getTangentAtLength()` (orient vehicles/arrows along curved SVG routes!), `evolvePath()`, `interpolatePath()` (true SVG shape morphing!).
- **`@remotion/noise`**: Deterministic 2D/3D/4D Simplex noise (`noise2D`, `noise3D`) for organic camera drift, water ripples, fire flicker, and clouds without `Math.random()`.
- **`@remotion/motion-blur`**: `<Trail>` and `<CameraMotionBlur>` for authentic shutter-angle blur during whip pans and fast kinetic sweeps.
- **`@remotion/shapes`**: Pure math SVG generators (`makeStar`, `makePolygon`, `makePie`, `makeTriangle`) compatible with `@remotion/paths`.
- **`@remotion/transitions`**: Pre-built `TransitionSeries` presentations (`wipe`, `slide`, `flip`, `clockWipe`, `iris`) with `springTiming()`.
- **`@remotion/three` & `@remotion/skia`**: Deterministic 3D WebGL & Skia canvas rendering inside Remotion compositions.

---

## 3. Hybrid Python (Manim / Pillow / OpenCV) + Remotion Workflow

When a topic needs heavy mathematical morphing, dense 10,000-particle simulations, or scientific plots:
1. Render the specialized sequence cleanly in **Python (Manim / Cairo / Pillow / NumPy)** at matching `FPS` (`30` or `60`) with transparent alpha (`-t` in Manim -> `.mov` ProRes4444 or RGBA `.webm` / PNG sequence).
2. Place output in `public/media/<slug>/` and composite inside **Remotion** using `<OffthreadVideo>` + camera rig, captions, character host, and mastered audio (`ffmpeg` `-14 LUFS`).
3. Keep every Python script deterministic (fixed `np.random.seed`) and checked into `scripts/`.

---

## 4. Non-Negotiable Render Speed & Quality Rules

1. **Image Format Selection (`remotion.config.ts`):**
   - Thin UI borders, SaaS typography, dark gradients -> **`png`** + `CRF 16` (`yuv420p` lossless inputs preserve razor-sharp `1px–1.5px` strokes).
   - Illustrated character epics with rich gradients & no sub-pixel UI hairlines -> **`jpeg` (`95`)** + `CRF 16` (`2–3x` faster encoding; match `yuvj420p` consistently when concatenating parts!).
2. **Performance Killers to Ban in Remotion:**
   - **Never** apply CSS `backdrop-filter: blur(...)` to 10+ opaque panels per frame (simulate frosted glass with subtle linear gradients + specular `inset 0 1px` highlights; reserve real `backdrop-filter` for 1 hero modal!).
   - **Never** render full-viewport `1920x1080` SVG `<feTurbulence>` noise live every frame (tile a tiny `160x160` SVG pattern via `backgroundRepeat: "repeat"` — `100x` faster!).
   - **Never** leave `console.log`, un-memoized 5,000-node DOM trees, or `useFrame()` from R3F inside frame loops.
3. **Chunked Long-Form Rendering:**
   - For movies > 5 minutes (`> 9,000 frames`), bundle once (`npx remotion bundle src/remotion/index.ts --out-dir=/tmp/bundle`), render deterministic frame ranges or parts, and stitch losslessly (`-c:v copy` video + continuous PCM-domain `320k` AAC audio + `-movflags +faststart`).

---

*Master Index:* [`docs/00-START-HERE.md`](00-START-HERE.md) · [`docs/12-KNOWLEDGE-BASE.md`](12-KNOWLEDGE-BASE.md)
