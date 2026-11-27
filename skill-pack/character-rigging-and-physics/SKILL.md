---
name: character-rigging-and-physics
description: Design and animate expressive 2D/2.5D characters in Remotion using shape language, 3-tier line weights, rim lighting, analytical springs, 2-bone/FABRIK IK, Verlet cloth/hair physics, muscle overlap, blinking/saccades, and Preston Blair 10-viseme lip-sync.
---

# Character Rigging & Physics

Apply [`docs/52-MOTION-MATHEMATICS-AND-PHYSICS.md`](../../docs/52-MOTION-MATHEMATICS-AND-PHYSICS.md), [`docs/53-CHARACTER-DESIGN-RIGGING-AND-MUSCLES.md`](../../docs/53-CHARACTER-DESIGN-RIGGING-AND-MUSCLES.md), and [`src/remotion/lib/motionMath.ts`](../../src/remotion/lib/motionMath.ts) whenever building character-driven animations.

## Step-by-Step Workflow

1. **Lock Shape Language & Proportions First:**
   - Assign primary, secondary, and forbidden shapes per character (Circle = warm/friendly, Square = strong/dependable, Triangle = dynamic/antagonistic).
   - Lock canonical head-height ratios and stroke tiers (`3–4px` outer silhouette, `1.6–2.2px` garment folds, `0.8–1.3px` micro detail).
   - Run the **100% Black Silhouette Test** at `180px` width before shading.
2. **Build Hierarchical Rig Anchored at Center of Mass:**
   - Structure transforms cleanly: `Pelvis -> Spine -> Chest -> Neck/Head -> Limbs`.
   - Ground every actor with an elliptical contact shadow inversely scaled by jump height.
   - Use `solveTwoBoneIK()` for planted legs/arms and `solveFABRIK()` for multi-segment spines, tails, garlands, or trunks.
3. **Apply Physical Secondary Motion & Muscle Overlap:**
   - Drive impacts and landings with `analyticalSpring()` + volume-preserving `squashStretch()` (`sx * sy === 1`).
   - Drive dupattas, capes, hair, and loose ornaments with `simulateVerletChain()` or wave-propagated phase lag (`3–9 frames` behind parent motion).
   - Never freeze actors during dialogue: add `breathingCycle()` (`14–16 bpm`) on chest/shoulders.
4. **Animate Living Faces:**
   - Use `naturalBlink()` (`85ms` close / `145ms` open, irregular `3.2–4.5s` cadence, plus blink on fast head turns).
   - Map speech phonemes to the **Preston Blair 10-viseme set** (`rest`, `MBP`, `AI`, `E`, `O`, `U`, `WQ`, `FV`, `L`, `etc`) with a **`1–2 frame` visual lead** ahead of audio onset and subtle chin/jaw coupling.
