# Samyoj Product Hunt Launch Film — v4 Production Report (`004-samyoj-launch`)

## Summary
v4 delivers a **72.000-second (`4,320` net frames @ 60 fps, 36 bars @ 120 BPM)** launch film built audio-first from measured `voice-01` speech cues and redesigned directly against Samyoj's 17 real mobile & desktop product screenshots.

## Key v4 Upgrades & Truth Corrections
1. **Tight Audio-Visual Lock:** Compressed inter-clause pauses (`vo_v4_tight` -> `vo_v4_scenes/s01.wav`–`s11.wav`), queued each narration clip at `+5f` inside its scene, and synchronized camera pans, cursor clicks, and UI reveals directly to measured phoneme timestamps (eliminating the ~2s S03 lag and mid-scene drift).
2. **Real Product UI/UX Fidelity:**
   - **AppShell & PhoneFrame:** Rebuilt sidebar (`Dashboard`, `Channels`, `AI Studio`, `Contacts & Support`), `LIVE` pill, `Ctrl K` search, `Kicks & Co. Owner` pill, and 5-tab mobile footer (`Inbox`, `Campaigns`, `Contacts`, `Automate`, `More`).
   - **S01 Hook:** Centered modern Samyoj mobile Inbox zooming cleanly out on beat.
   - **S02 Chaos:** Enlarged & varied 5 channel cards with sequential `CameraRig` whip-pans (`WhatsApp → Instagram → Messenger → Meta Ads → Email`) synced to narration before full pull-back.
   - **S03 Warm Bloom:** Oversized official `samyoj-logo-new.png` lockup, reduced shadow density, fast 26-frame iris flood.
   - **S04 Unified Inbox:** Authentic `#EFEAE2` WhatsApp canvas, `#D9FDD3` reply bubbles, `All | Active | Unread | Unreplied | Open` chips, and refined Catmull-Rom cursor clicks.
   - **S05 AI Studio:** Upgraded desktop `AI Chatting Agent` + live `AI Calling Studio` waveform paired with Hinglish mobile chat and buyer qualification handoff.
   - **S06 Visual Automations:** Added automated confirmed-lead follow-up email branch alongside DM/IG comment triggers.
   - **S07 Campaigns:** Replaced false UPI/payment claim with genuine Read / Unread recipient filtering and automated WhatsApp + Email follow-up dispatch.
   - **S08 Dashboard, Meta Ads Performance & Instagram Studio:** Removed unimplemented Sales Pipeline Kanban; showcases read-only Meta ads performance analytics, live message delivery overview, and Instagram Post Management, Auto-Templated Scheduling & Comment Automation.

## Verified Deliverables (`productions/004-samyoj-launch/out/`)
| Deliverable | Codec / Res / FPS | Frames | Duration | Size |
|---|---|---|---|---|
| `samyoj-master-b-1080p60.mp4` | H.264 / AAC 48kHz · 1920×1080 · 60fps | `4,320` | `72.00s` | `51 MB` |
| `samyoj-master-a-1080p60.mp4` | H.264 / AAC 48kHz · 1920×1080 · 60fps | `4,320` | `72.00s` | `50 MB` |
| `samyoj-cut-45-1080p60.mp4` | H.264 / AAC 48kHz · 1920×1080 · 60fps | `2,700` | `45.00s` | `30 MB` |
| `samyoj-teaser-15-1080p60.mp4` | H.264 / AAC 48kHz · 1920×1080 · 60fps | `900` | `15.00s` | `8.3 MB` |
| `samyoj-loop-6-1080p60.mp4` | H.264 · 1920×1080 · 60fps | `360` | `6.00s` | `1.1 MB` |
| `thumbnail-1270x760.png` | PNG · 1270×760 | — | — | `397 KB` |
| `contact-sheet.png` | PNG · 1984×1520 (12-frame v4 audit) | — | — | — |

All 5 rendered MP4 files passed `scripts/verify-video.mjs` across codec, width, height, fps, frame count, and duration, and `npm run lint` passed with zero errors.
