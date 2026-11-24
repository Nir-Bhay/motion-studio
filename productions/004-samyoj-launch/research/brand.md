# Samyoj — Brand & Product Research (`research/brand.md`)

**Audited:** November 23, 2026  
**Sources inspected:**
- Live site pages via `fetch_page`: `samyoj.com` (`index.html`, `features.html`, `pricing.html`, `industries.html`, `blog`, `contact`, `legal/privacy-policy`, `app.samyoj.com/login`)
  - Official website, UI repository, and 17 real Samyoj product screenshots (`/tmp/arena-coding-uploads/image-1.png`–`image-17.png`, audited in v4):
    - Mobile & Desktop Inbox (`#EFEAE2` WhatsApp canvas, `#D9FDD3` outbound bubbles, filter chips `All | Active | Unread | Unreplied | Open`, rep assignment & channel badges).
    - Dashboard & Meta Ads Performance (`Live overview`, `100% Delivered`, `Meta ads performance` read-only analytics).
    - Instagram Studio (Post Management & Scheduler, Auto-templated Reels/Carousels, Comment Automation + Instant DM).
    - AI Studio (AI Chatting & AI Calling agents, EN/Hinglish bilingual qualification).
    - Campaigns (Read / Unread recipient filtering + follow-ups) & Follow-up Email automation for confirmed leads.

---

## 1. Product Identity & Verified Claims

- **Name:** Samyoj (`samyoj.com`, `app.samyoj.com`)
- **Origin:** Built in India (Indore, Madhya Pradesh)
- **Category:** AI-powered Omnichannel Customer Communication CRM & WhatsApp Business API Platform
- **Partner Status:** **Meta Tech Provider** (technology partner on official Meta Cloud API; never claim BSP status). Direct Meta billing with **zero markup on Meta message fees**.
- **Allowed Claims (strictly verified):**
  - *"Turn Every Customer Conversation Into a Sales Opportunity"* (Homepage)
  - *"Every Customer Inquiry. One High-Converting Platform."* (Features page)
  - *"Replies in under 5 seconds"* · *"24/7"* · Replies in the customer's language including **Hinglish**
  - *"Zero markup on Meta message fees"* · *"Official Meta Cloud API"*
  - *"No-code"* visual workflow builder · *"14-day free trial"* (`app.samyoj.com`) · *"Built in India"*
- **Disallowed / Excluded Claims (per `llms.txt` & Master Brief v2):**
  - No unsourced percentages or stats (`90%+ open rates`, `80% of inquiries`, `60% lost`, `ISO 27001`, `SOC 2`).
  - No pricing figures on screen (to keep launch evergreen across tiers/currencies).
  - No unreleased or unimplemented features: **no UPI / in-chat payment collection** (removed in v4), **no Sales Pipeline Kanban board** (removed in v4), no ad editing inside Samyoj (**Meta Ads is read-only ad performance analytics**), no Calling AI live human transfer claims.
  - Real implemented features featured in v4: Unified Multi-Channel Inbox (WhatsApp, Instagram, Facebook Messenger, Email), AI Chatting + AI Calling + Hinglish qualification, Visual Automations + Confirmed-Lead Follow-Up Emails, Campaign Read/Unread recipient filtering, Live Dashboard + Meta Ads performance analytics, and Instagram Post Management, Scheduling, Auto-Templates & Comment Automation.
  - No real customer testimonials or logos (`GoSTOPS`, `Repose Home`, `MyGate`, `IndiaShoppe`, `EdTechLab` excluded per `llms.txt` & brief). All demo personas/chats/metrics belong to fictional Indian D2C sneaker brand **"Kicks & Co."**

---

## 2. Extracted Visual System (`samyoj-theme.css` + `index.html` + `SAMYOJ_WHATSAPP_CRM_UI_SKILL.md`)

### Logo Choice
- Selected **`samyoj-logo-new.png`** (`public/brand/samyoj-logo-new.png`), which matches `index.html` JSON-LD `logo` and `legal/` header chrome (`samyoj-logo-new.png` transparent RGBA vs `samyoj-logo-hq.png` white-backed, replacing the older green laptop decal seen in `loiginn.png`).
- Mark anatomy: rounded speech-bubble arc in `#4B2EEB → #00A4FF` gradient, clasped handshake base, 3 overlapping team/customer silhouettes, 4-point AI sparkle star top-right; lowercase `#0F172A` geometric wordmark `samyoj` with ascending indigo→purple arrow sweeping out of `y`.

### Extracted Brand Tokens & WCAG AA Contrast Audit
| Token | Extracted Hex | Contrast vs `#FFFFFF` | Film Role |
|---|---|---|---|
| `canvas` | `#FFFFFF` | — | Pure white studio floor & card surface |
| `canvas2` | `#F8FAFF` (`--sy-neutral-bg`) | — | Cool-white cove wash / alternate canvas |
| `tintBrand` | `#EEF0FF` (`rgba(75,46,235,0.08)`) | — | Soft brand wash behind frosted glass |
| `tintMint` | `#E6FAF3` | — | Success wash behind resolved states |
| `ink` | `#0F172A` (`--sy-neutral-text-primary`) | **17.85:1** (AAA) | Headlines (never `#000000`) |
| `ink2` | `#475569` (darkened from `#64748B` for comfort) | **7.58:1** (AAA) | Body & UI copy |
| `ink3` | `#64748B` (`--sy-neutral-text-muted`) | **4.76:1** (AA) | Mono captions & timestamps |
| `hairline` | `#E2E8F0` (`--sy-neutral-border`) | — | 1 px structural borders |
| `brand` | `#4B2EEB` (`--sy-brand-indigo`) | **7.27:1** (AAA) | Primary accent, logo, active states, CTAs |
| `brandDeep` | `#7A3BFF` (`--sy-brand-purple`) | **5.45:1** (AA) | Gradient end & secondary sparkle |
| `brandPressed` | `#3B22C7` (`--sy-primary-hover`) | **9.18:1** (AAA) | Pressed CTA state |
| `mint` | `#10B981` (`--sy-support-success`) | 2.54:1 (graphic/fill only) | Resolved dot, ticks, badges |
| `mintInk` | `#047857` / `#065F46` | **5.48:1 / 7.07:1** (AA/AAA) | White text on mint button or dark mint text on `#E6FAF3` |
| `alert` | `#EF4444` (`--sy-support-error`) / `#FF5A5F` | — | **Act 1 only** unread dot & overdue badge |
| `whatsapp` | `#25D366` | — | Official channel pill/badge |
| `instagram` | `#E4405F → #FCAF45` | — | Official channel pill/badge |
| `facebook` | `#1877F2` | — | Official channel pill/badge |
| `metaAds` | `#00A4FF` | — | Official channel pill/badge |

### Typography (Website + Ban-Compliance)
- `samyoj.com` uses **`Manrope`** (weights 400–800) + `Inter`. Because Master Brief v2 forbids `Inter`, `Roboto`, `Arial`, and system fonts, the film standardizes on:
  - **Display & UI:** `Manrope` (600/700/800 display, 400/500 UI, bundled locally via `@fontsource/manrope`)
  - **Mono (timestamps, numeric tickers, URLs):** `JetBrains Mono` (400/500/600, bundled locally via `@fontsource/jetbrains-mono`)

### UI Layout Fidelity (`Samyoj-Omnichannel-CRM-Dashboard.webp` & `SAMYOJ_WHATSAPP_CRM_UI_SKILL.md`)
- Persistent left sidebar (`Dashboard`, `Inbox`, `Products`, `Flows`, `Broadcasts`, `AI Agents`, `Reports`, `Settings`, plus `Channels` & `Contacts`) with soft tinted active pill (`#EEF0FF` / `#E6FAF3`).
- Quiet top utility bar (`Search anything... Ctrl K`, notification bell, workspace owner avatar).
- Channel filter tabs (`All | WhatsApp | Instagram | Facebook | Email`), clean white cards with `#E2E8F0` hairlines, tabular numbers, clear owner/status badges, and zero heavy dark enterprise chrome.
