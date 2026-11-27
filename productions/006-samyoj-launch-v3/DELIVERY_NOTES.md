# Samyoj Launch Film v3 — Delivery Notes

## Composition
- **Composition ID**: `SamyojLaunchV3` (registered first in `src/remotion/Root.tsx` for immediate Remotion Studio preview; all Mahadev Barat compositions preserved below)
- **Specs**: `1920 × 1080`, `60 fps`, `3600` frames (`60.000s` exact)
- **Font**: `'Inter Variable'` (`@fontsource-variable/inter`) across weights `100–900`
- **No MP4 rendered**: Built cleanly for live interactive inspection & playback in Remotion Studio per user direction.

## Architecture (`src/remotion/samyoj-v3/`)
- `tokens.ts`: Global `60.000s` clock (`t = frame / 60`), exact colour tokens, resting/hero/22%-glow shadows, cubic-bezier easings (`E_ENTER`, `E_EXIT`, `E_IO`, `E_BACK`), analytical spring, typing slice, and quadratic Bezier path helpers.
- `components/Effects.tsx`: Pure `#FFFFFF` backdrop with subtle `#F5F7FB` corner vignette, `2%` monochrome `feTurbulence` film grain, `CaptionBar`, `SampleDataTag`, `LightSweep`, `SuccessBurst`, `RingShockwave`, `CursorOverlay`, and `GlowDot`.
- `components/UiKit.tsx`: `SamyojAppShell` (matching Samyoj's live sidebar + `LIVE` header + Search + channel status UI), `WindowShell`, `ChannelTileIcon`, `Chip`, `Avatar`, `PlaceholderBar`, `AnimatedTick`, `TypingDots`, `RollingNumber`, `ToggleSwitch`, `PrimaryButton`, `OutlineButton`, and `SunriseArtwork`.
- `scenes/Scene01Hook.tsx` – `Scene11Outro.tsx`: All 11 continuous beat-synced scenes (`120 BPM`), named hand-offs (`dot-open`, `tile-expand`, `phone-morph`, `sparkle-wash`, `line-shoot`, `icon-morph`, `pull-back`, `channel-slide`, `slide-push`, `zoom-out-into-grid`, `collapse-to-dot`), and Scene 11 clean `"Samyoj"` wordmark outro.

## Audio (`public/audio/samyoj-v3-music-sfx.mp3`)
- Synthesized `60.000s` `120 BPM` minimal electronic music bed + `154` timestamped UI SFX cues + full `voice-04` voiceover across all 11 scenes (`vo_01`–`vo_11`, `0.45s`–`57.90s`, silence-trimmed & `-10 dB` music-ducked).
- Full timestamped breakdown in `productions/006-samyoj-launch-v3/SFX_CUE_SHEET.txt`.

## Strict Product & Copy Rules Verified
- Pure `#FFFFFF` canvas, smallest text `>= 22px`, unlisted UI text rendered as `#E2E8F0` placeholder bars.
- Separate per-channel inboxes (`WhatsApp`, `Instagram DMs`, `Facebook Messenger`).
- Gmail shown strictly as `"Send only"` (no inbox/received emails).
- Instagram new post ends as `"Scheduled"` only (never `"Published"`).
- Calling AI shows no `"Transfer"` button; Automation Builder shows no AI flow-generator button.
- Ad Performance is strictly read-only (`"Sample data"`, `"Read-only"`, spend/impressions/clicks/cost per lead, Mon–Sun chart, no ROI/revenue or campaign controls).
- Zero forbidden vendor/tech names (`Meta`, `Razorpay`, `Sarvam`, `Azure`, `Google`, `OpenAI`) anywhere on screen or in voiceover.
