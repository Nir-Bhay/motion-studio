---
name: ractor-motion-direction
description: Direct visual style hierarchy, focal spotlighting, background depth separation, and pre-render visual QA gates for Remotion and vector motion productions. Use before designing any scene, UI polish pass, or visual refresh.
---

# Ractor Motion Direction

Use this skill alongside [`docs/54-BACKGROUND-DETAILING-AND-CONSISTENCY.md`](../../docs/54-BACKGROUND-DETAILING-AND-CONSISTENCY.md) and [`docs/04-MOTION-DESIGN-BIBLE.md`](../../docs/04-MOTION-DESIGN-BIBLE.md) whenever planning or auditing visual direction.

## Core Direction Rules

1. **One Primary Style + At Most One Accent:** Select one primary visual language from [`docs/14-COLLECTED-style-catalogue.md`](../../docs/14-COLLECTED-style-catalogue.md) or [`docs/56-HYBRID-MOTION-STYLES-AND-TECH-STACK.md`](../../docs/56-HYBRID-MOTION-STYLES-AND-TECH-STACK.md). Never mix neon HUDs, noisy gradients, and cartoon stickers in the same shot.
2. **POV Spotlighting Over Flashiness:** When explaining a UI, workflow, or multi-actor frame, lift the active subject (`focusWindow`, `voPulse`, crisp `1.5px` accented border + soft specular gradient) and gently dim inactive panels (`opacity 0.62–0.75`) so the viewer's eye locks on immediately.
3. **Value & Luminance Separation:** Verify every frame in **100% grayscale at 240px thumbnail scale**. Foreground actors/cards must stay separated from background planes via value contrast, temperature shift, or rim lighting.
4. **H.264 Survival Discipline:** Keep structural borders `1.25px–1.5px` minimum (`#C6D1E0` or stronger on light surfaces) and render UI compositions with lossless PNG frames (`Config.setVideoImageFormat("png")`, `CRF 16`) so thin outlines never wash out after video compression.
5. **No Muddy Outer Shadows on Pinned Rails:** Highlight active sidebar rows and glass panels with internal top specular highlights (`inset 0 1px 0`), clean border accents, and directional gradient tints—never heavy outer `boxShadow` bleeding over container edges.

## Review Gates (Mandatory Before Final Render)

- **Gate 1 — Frame 0 & Safe-Area Gate:** Frame 0 is never black; all text and controls respect `SAFE_AREA` (`left >= 96`, `right <= 1824`, `top >= 54`, `bottom <= 1026`) and clear `CaptionBar` (`topGuard`).
- **Gate 2 — Silhouette & Contrast Gate:** Every primary actor or focal panel reads clearly at thumbnail size and in grayscale.
- **Gate 3 — Decoded MP4 Parity Gate:** Extract stills directly from the encoded `.mp4` (not only Remotion Studio) to verify borders, typography, and motion curves survived H.264 encoding cleanly.
