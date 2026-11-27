# 52 · Motion Mathematics & Physics Engine

> **Purpose:** Replace guesswork interpolation with deterministic mathematical & physical laws inside Remotion (`useCurrentFrame()`) and Python/Manim. Every formula here is pure-function deterministic (scrub-safe across headless Chromium workers). Implementation lives in [`src/remotion/lib/motionMath.ts`](../src/remotion/lib/motionMath.ts).

---

## 1. Damped Harmonic Oscillators (Springs Without Frame Drift)

Never integrate Euler step-by-step across renders without a deterministic anchor. Use the **exact closed-form analytical solution** to the second-order ODE:

$$m \frac{d^2 x}{dt^2} + c \frac{dx}{dt} + k (x - x_{\text{target}}) = 0$$

Define natural frequency $\omega_0 = \sqrt{k/m}$ and damping ratio $\zeta = \frac{c}{2\sqrt{km}}$:

| Regime | Damping Ratio ($\zeta$) | Physical Feel | Use Case |
|---|---|---|---|
| **Underdamped** | $0.45 \le \zeta < 0.85$ | Snappy overshoot + settle oscillation | Badges, popups, comic impacts, playful props |
| **Critically Damped** | $\zeta \approx 1.0$ | Fastest settle with **zero** overshoot | UI cards, camera follows, dialogue boxes |
| **Overdamped** | $\zeta > 1.15$ | Heavy, viscous, deliberate deceleration | Heavy stone doors, large panels, solemn reveals |

Closed-form underdamped step response ($0 \to 1$ from $t_{\text{start}}$):

$$x(t) = 1 - e^{-\zeta \omega_0 \Delta t}\left(\cos(\omega_d \Delta t) + \frac{\zeta}{\sqrt{1 - \zeta^2}}\sin(\omega_d \Delta t)\right), \quad \omega_d = \omega_0 \sqrt{1 - \zeta^2}$$

Implemented in `analyticalSpring(t, startSec, stiffness, damping, mass)` inside [`motionMath.ts`](../src/remotion/lib/motionMath.ts).

---

## 2. Easing Grammar & Timing Asymmetry

- **Entrances (`easeOut`)**: `cubic-bezier(0.16, 1, 0.3, 1)` — fast initial impulse, long settling tail.
- **Exits (`easeIn`)**: `cubic-bezier(0.6, 0, 0.9, 0.35)` — **half the duration** of the entrance (`exitDur ≈ 0.5 * enterDur`), accelerating out of frame.
- **Camera / State Morphs (`easeInOut`)**: `cubic-bezier(0.65, 0, 0.35, 1)` — smooth departure and arrival.
- **Rule of Zero Linear Motion**: Linear interpolation is reserved strictly for continuous rotations, infinite conveyor loops, or constant-speed spline travel.

---

## 3. Volume-Preserving Squash & Stretch

Rigid shapes feel plastic; living shapes conserve volume during impact or anticipation:

$$s_x \cdot s_y = 1 \quad (\text{2D area preservation}), \qquad s_x = s_z = \frac{1}{\sqrt{s_y}} \quad (\text{3D volume preservation})$$

- **Jump Anticipation:** $s_y = 0.78,\; s_x = 1.28$ (anchored at feet `transformOrigin: "bottom center"`!)
- **Mid-Air Stretch (Apex Velocity):** $s_y = 1.22,\; s_x = 0.82$
- **Landing Impact:** damped impulse $s_y(t) = 1 - A e^{-\lambda t}\cos(\omega t)$ settling back to $(1, 1)$ in `0.25s–0.35s`.

Implemented in `squashStretch(impulse, maxStretch)`.

---

## 4. Inverse Kinematics: 2-Bone Analytical & FABRIK

### 4A. 2-Bone Analytical IK (Arms & Legs)

Given root $P_0$ (shoulder/hip), target $T$ (hand/foot), and segment lengths $L_1, L_2$:

1. Clamp reach distance $d = \text{clamp}(\|T - P_0\|,\; |L_1 - L_2| + \epsilon,\; L_1 + L_2 - \epsilon)$.
2. Base azimuth $\theta = \text{atan2}(T_y - P_{0y},\; T_x - P_{0x})$.
3. Law of Cosines elbow/knee offset:
   $$\cos(\alpha) = \frac{L_1^2 + d^2 - L_2^2}{2 L_1 d}$$
4. Joint angle $= \theta + s \cdot \alpha$ where $s \in \{+1, -1\}$ enforces anatomical bend (elbow bends back, knee bends forward).

Implemented in `solveTwoBoneIK(root, target, len1, len2, bendDir)`.

### 4B. Multi-Joint FABRIK (Spines, Tails, Trunks, Garlands)

Forward And Backward Reaching Inverse Kinematics converges in $O(n)$ per iteration:
1. If $\|T - P_0\| \ge \sum L_i$, stretch collinearly toward $T$.
2. **Forward Pass:** Pin end-effector $P_n = T$; pull each parent $P_i = P_{i+1} + L_i \cdot \widehat{(P_i - P_{i+1})}$.
3. **Backward Pass:** Re-anchor root $P_0 = \text{root}$; push each child $P_{i+1} = P_i + L_i \cdot \widehat{(P_{i+1} - P_i)}$.
4. Repeat 8–12 iterations (converges $< 0.25\text{ px}$).

Implemented in `solveFABRIK(initialJoints, lengths, target)`.

---

## 5. Deterministic Verlet Integration (Cloth, Hair, Capes, Garlands)

Velocity-less Verlet integration keeps linked chains stable without stiffness explosions:

$$\mathbf{x}_{t+\Delta t} = \mathbf{x}_t + (\mathbf{x}_t - \mathbf{x}_{t-\Delta t})(1 - d) + \mathbf{a}(t)\,\Delta t^2$$

Followed by 4–6 **distance constraint passes** relaxing each stick $(i, i+1)$ back to rest length $L_i$.
- **Remotion Determinism Rule:** Never mutate persistent arrays across renders. Evaluate a deterministic lookback window (`simWindowSec = 1.6s` at `60Hz` substeps) purely from `anchorAt(simT)` and `windAt(simT, i)` inside `simulateVerletChain(...)`.

---

## 6. Curves, Splines & Arc-Length Travel

- **Quadratic / Cubic Bezier:** Great for hand-authored arcs (e.g., notification flying from phone to inbox).
- **Centripetal Catmull-Rom (`catmullRomPoint`):** Guarantees $C^1$ smoothness directly *through* every waypoint (no overshoot loops on tight bends).
- **Arc-Length Re-parameterization:** Sample spline at 64–128 points, build cumulative arc-length table $S[k]$, and binary-search $u$ for target distance $s = u_{\text{eased}} \cdot S_{\text{total}}$ when constant visual velocity is required.

---

## 7. Multiplane Parallax & Optical Depth Blur

From Disney's multiplane camera optics:

$$d_{\text{layer}} = b \cdot \frac{D_{\text{ref}}}{D_{\text{ref}} + z_{\text{layer}}}, \qquad \text{blurPx} = k \cdot \left(\frac{|z_{\text{layer}}|}{D_{\text{ref}}}\right)^{1.4}$$

- $z < 0$: Foreground occluders (leaves, pillars, doorway frames) shift **faster** than the camera (`parallaxFactor > 1`).
- $z = 0$: Hero action plane (`parallaxFactor = 1.0`, zero blur).
- $z > 0$: Midground & far horizon (`parallaxFactor < 1`, subtle depth softness & atmospheric desaturation).

Implemented in `multiplaneLayer(...)`.

---

*Next:* [`docs/53-CHARACTER-DESIGN-RIGGING-AND-MUSCLES.md`](53-CHARACTER-DESIGN-RIGGING-AND-MUSCLES.md) · [`docs/54-BACKGROUND-DETAILING-AND-CONSISTENCY.md`](54-BACKGROUND-DETAILING-AND-CONSISTENCY.md)
