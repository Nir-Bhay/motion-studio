---
name: cinematic-direction-and-script
description: Plan story structure, cold-open hooks, two-column AV scripts, multiplane parallax cameras, 180-degree spatial continuity, and voiceover-locked timing for Remotion films.
---

# Cinematic Direction & AV Scriptwriting

Apply [`docs/55-DIRECTION-CAMERA-AND-STORYTELLING.md`](../../docs/55-DIRECTION-CAMERA-AND-STORYTELLING.md) and [`docs/54-BACKGROUND-DETAILING-AND-CONSISTENCY.md`](../../docs/54-BACKGROUND-DETAILING-AND-CONSISTENCY.md) from concept through locked timeline.

## Pre-Production Workflow

1. **Test Story Causality (Pixar Story Spine):**
   - Draft the 7–8 sentence spine (*Once upon a time... Every day... But one day... Because of that... Until finally... And ever since then...*).
   - Reject any beat connected only by *"And then..."* — every scene must be caused by the prior scene.
2. **Design the 3–6s Cold-Open Hook:**
   - Start with high-contrast intrigue (visual mystery or kinetic chaos collapsing to clarity) before Act 1 setup.
3. **Lock Two-Column AV Script & WPM Budget:**
   - Budget **English** at `130–150 WPM` and **Hindi/Hinglish** at `115–135 WPM`.
   - Enforce **Single-Script TTS Hygiene**: use phonetic Roman Hinglish for `en-IN` models or pure Devanagari for `hi` models—never mix ASCII English inside Devanagari. Splice native Hindi proper nouns (`language: "hi"`, same `voice_id`) with RMS matching if an `en-IN` model mispronounces brand names.
   - Enforce **`>= 0.90s–1.20s` audio+visual transition gaps**: VO for Scene `N` finishes *before* Scene `N` begins exiting, and VO for Scene `N+1` starts `0.15s–0.30s` *after* Scene `N+1` finishes entering.
4. **Direct Camera & Multiplane Staging:**
   - Assign every scene a motivated camera intent (Static, Dolly, Truck, Crane, Whip Pan, or Impact Shake).
   - Enforce the **180-Degree Axis Rule** across dialogue cuts so characters never swap screen sides unexpectedly.
   - Use `multiplaneLayer()` (`z = +20` sky, `+10` hazy far, `+3` midground, `0` hero, `-4` dark foreground occluders) with at least one multi-plane parallax anchor.
   - Guard dynamic `cameraFollow` transforms with `topGuard` and `minTx` so captions and brand rails never clip.
