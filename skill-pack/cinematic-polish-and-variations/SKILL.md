---
name: cinematic-polish-and-variations
description: Select a distinct cinematic style archetype from 8+ visual treatments and elevate motion from clean vector graphics to cinema using frame-rate modulation (1s vs 2s), Ma stillness, smear frames, rack focus, J/L-cut sound bridges, and adversarial multi-critic review.
---

# Cinematic Polish & Variations

Apply [`docs/57-CINEMA-CRAFT-AND-VARIATIONS-MATRIX.md`](../../docs/57-CINEMA-CRAFT-AND-VARIATIONS-MATRIX.md) alongside [`src/remotion/lib/motionMath.ts`](../../src/remotion/lib/motionMath.ts) before designing or polishing any new production.

## Pre-Production Directorial Loop

1. **Select the Right Cinematic Archetype (No Generic Default):**
   - Match the topic to one of the 8 archetypes in `docs/57` (e.g., Ghibli Painted 2.5D, *Arcane* Chiaroscuro, Kurzgesagt Geo-Story, Manim Math Cinema, Apple Macro UI, Buck Kinetic Type, 16-bit Pixel, or Mixed-Media Collage).
2. **Design Temporal Contrast ("Ma" + 1s/2s Modulation):**
   - Never run a whole video at uniform metronome speed. Alternate quiet breath holds (`0.4s–1.0s` stillness) with explosive kinetic beats.
   - Modulate cadence with `posterizeTime(t, 12)` ("on twos") for stylized character poses while keeping camera pans and particles smooth ("on ones").
3. **Add Optical & Acting Polish:**
   - Shift attention mid-shot with `rackFocusPair()`, direct eye pupils dynamically with `lookAtOffset()`, add decaying `bandLimitedShake()` on heavy impacts, and use `smearEnvelope()` on rapid `2–4 frame` strikes.
4. **Upgrade Transitions Beyond Slides & Fades:**
   - Use **Shape/Motion Match Cuts**, **Match on Action**, **Foreground Occluder Wipes** (`z = -5`), and **J-Cut / L-Cut ambient sound bridges** (while keeping spoken VO separated across visual cuts).
5. **Run the 3-Critic Audit:**
   - Challenge every draft from three lenses—Story Causality (muted test), Geometry/Grayscale Silhouette, and Rhythm/Sound Sync—before final render.
