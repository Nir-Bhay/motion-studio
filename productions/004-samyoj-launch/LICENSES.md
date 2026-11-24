# Asset & Audio Licenses — Production 004 (`samyoj-launch`)

All assets in this launch film are either official Samyoj brand assets, open-licensed fonts/libraries, or 100% original procedural audio/graphics authored for this production. Zero third-party copyrighted stock footage, voice samples, or proprietary notification tones (including WhatsApp's real notification sound) are used.

## 1. Brand Assets
- `public/brand/samyoj-logo-new.png` — Official Samyoj wordmark + icon, sourced from `teamwebstarts-cmyk/samyoj-website-0.2/images/samyoj-logo-new.png` (Samyoj brand asset).
- `public/brand/samyoj-mark-512.png` — Official Samyoj 512×512 icon (`android-chrome-512x512.png`), sourced from `teamwebstarts-cmyk/samyoj-website-0.2/samyoj-homepage/images/android-chrome-512x512.png`.

## 2. Fonts (Locally Bundled via Fontsource, SIL Open Font License 1.1)
- `@fontsource/bricolage-grotesque` — Display & headline typography (`OFL-1.1`).
- `@fontsource/instrument-serif` — Editorial italic accent typography (`OFL-1.1`).
- `@fontsource/space-grotesk` — Subtitle & structural grotesk (`OFL-1.1`).
- `@fontsource/plus-jakarta-sans` — Product UI sans (`OFL-1.1`).
- `@fontsource/manrope` — Supporting geometric sans (`OFL-1.1`).
- `@fontsource/jetbrains-mono` — Timestamps, KPI counters, monospace labels (`OFL-1.1`).

## 3. Software & Motion Libraries (MIT / Apache-2.0)
- `remotion@4.0.538`, `@remotion/transitions`, `@remotion/paths`, `@remotion/noise`, `@remotion/shapes` (Remotion License / MIT components).
- `flubber` (MIT) — Smooth SVG path interpolation for the dot → ring → checkmark brand morph motif.
- `react@19.3.1`, `three`, `@react-three/fiber`, `@react-three/drei` (MIT).

## 4. Audio & UI Foley (`public/audio/` & `productions/004-samyoj-launch/audio/`)
- `samyoj-master-a.wav` / `samyoj-master-a.mp3` — 100% original procedural synthesis (120 BPM, 30 bars / 60.000 s) generated in Python (`numpy` + `scipy` + `soundfile`) and mastered via FFmpeg EBU R128 `loudnorm` (`-14.1 LUFS`, `-1.0 dBTP`). Original copyright released for Samyoj Launch Film usage.
- `samyoj-master-b.wav` / `samyoj-master-b.mp3` — Master A music + SFX bed with `-5 dB` smooth ducking mixed with `voice-01` (conversational voice auditioned & user-selected via Arena TTS `generate_speech`, pause-compressed across `vo_v3/seg{1..5}-*.wav`), normalized to `-14.3 LUFS`, `-1.0 dBTP`.
- `samyoj-cut-45.mp3` & `samyoj-teaser-15.mp3` — Derived directly from v3 `samyoj-master-a.wav` (`45.000 s` & `15.000 s` with `0.45 s` tail fade).
- UI Foley SFX (`beats.json` & `sfx.json`) — Synthesized clean clicks, glass chimes, and airy whooshes. No WhatsApp/Apple/Meta proprietary audio files.

## 5. Custom UI & Product Mockups
- All UI cards, `AppShell` layouts, device frames, `"Kicks & Co."` storefront demo data, workflow node graph, Kanban board, and charts are 100% original React + SVG components authored inside `src/remotion/samyoj/`.
