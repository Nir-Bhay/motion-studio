---
name: hybrid-render-tech-stack
description: Select the optimal rendering engine (Remotion SVG, HTML5 Canvas, @remotion/skia, @remotion/three, Rive, Python Manim, Pixel, Cel Boil, or GLSL Shaders) and enforce deterministic high-speed render configuration.
---

# Hybrid Render Tech Stack

Apply [`docs/56-HYBRID-MOTION-STYLES-AND-TECH-STACK.md`](../../docs/56-HYBRID-MOTION-STYLES-AND-TECH-STACK.md) when choosing tools and architectures for a new video.

## Engine Selection Rules

- **Product UI / SaaS / Editorial Motion:** Remotion React + SVG + `tokens.ts` + `@remotion/paths` + `png` frame capture (`CRF 16`).
- **Character Stories & Mythological Epics:** Remotion SVG Rigs + `src/remotion/lib/motionMath.ts` + 5-plane parallax + `jpeg` (`95`) frames (`CRF 16`, `yuvj420p` consistent across parts).
- **Math, Calculus, Algorithms, LaTeX Morphs:** **Python Manim** (`TransformMatchingTex`, `Axes`, `ThreeDScene`) exported as alpha video/PNG sequence into `public/media/` and composited inside Remotion.
- **3D Hero Product / Spatial Camera:** `@remotion/three` `<ThreeCanvas>` driven strictly by `useCurrentFrame()` (never `@react-three/fiber`'s `useFrame()`).
- **Dense Particles / Shaders / Pixel Art:** Deterministic `<canvas>` 2D (`imageSmoothingEnabled = false` for pixel art) or `@remotion/skia` or GLSL shaders seeded via `random(seed)`.
- **Interactive Vector Mascots:** `@remotion/rive` bound deterministically to frame time.

## Mandatory Performance & Determinism Guardrails

1. **Pure Frame Functions:** Zero `Math.random()`, zero `Date.now()`, zero CSS animations/transitions, zero R3F `useFrame()`.
2. **Ban Render Bottlenecks:** Never stack CSS `backdrop-filter: blur(...)` across opaque UI cards, and never render full-viewport `1920x1080` SVG `<feTurbulence>` every frame (use a `160x160` tiled pattern instead).
3. **Long-Form Movie Strategy (`> 9,000 frames`):** Pre-bundle once (`npx remotion bundle ... --out-dir=/tmp/bundle`), render parts or `--frames` segments within timeout budgets, and stitch losslessly with `-c:v copy` + continuous PCM-domain `320k` AAC audio + `-movflags +faststart`.
