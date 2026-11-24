/**
 * Design Tokens — Extracted from samyoj-homepage/samyoj-theme.css (2026)
 * & SAMYOJ_WHATSAPP_CRM_UI_SKILL.md, adjusted only where needed for WCAG AA (>= 4.5:1).
 */
export const THEME = {
  // Surfaces & Canvas
  canvas: "#FFFFFF",
  canvas2: "#F8FAFF",          // --sy-neutral-bg
  coveEdge: "#F1F3FA",         // infinite white studio radial edge
  coveCold: "#EDF0F7",         // Act 1 cool desaturated white
  surfaceMuted: "#F1F5F9",     // --sy-neutral-surface-muted
  hairline: "#E2E8F0",         // --sy-neutral-border
  hairlineCold: "#D2D7E4",     // Act 1 sharper grey border

  // Brand (Samyoj Indigo -> Purple)
  brand: "#4B2EEB",            // --sy-brand-indigo (7.27:1 on white)
  brandDeep: "#7A3BFF",        // --sy-brand-purple (5.45:1 on white)
  brandPressed: "#3B22C7",     // --sy-primary-hover
  brandLight: "#6366F1",       // --sy-gradient-1 start
  brandLavender: "#A855F7",    // --sy-gradient-1 end
  tintBrand: "#EEF0FF",        // soft brand wash behind glass
  tintLavender: "#F3EFFE",     // soft lavender wash
  tintPeach: "#FFF1EA",        // subtle warm highlight wash

  // Semantic & Channel
  mint: "#10B981",             // --sy-support-success (dots, icons, lines)
  mintInk: "#047857",          // 5.48:1 white text on mint CTA / badge
  mintDeep: "#065F46",         // 7.07:1 text on tintMint
  tintMint: "#E6FAF3",         // success wash
  alert: "#FF5A5F",            // Act 1 unread dot only
  alertDeep: "#B91C1C",        // WCAG AA alert text
  alertInk: "#B91C1C",         // 6.47:1 alert text on #FEE2E2
  alertBg: "#FEE2E2",
  amber: "#F59E0B",
  amberInk: "#92400E",
  amberBg: "#FEF3C7",

  // Official Channel Identities
  whatsapp: "#25D366",
  whatsappDeep: "#15803D",
  instagramPink: "#E4405F",
  instagramOrange: "#FCAF45",
  facebook: "#1877F2",
  metaAds: "#00A4FF",

  // Ink (Never #000000)
  ink: "#0F172A",              // 17.85:1 on white
  ink2: "#475569",             // 7.58:1 on white
  ink3: "#64748B",             // 4.76:1 on white (captions/mono)
  problemGrey: "#DCDFE8",
  problemGreyDeep: "#B9BECE",

  // Elevation ( ink-tinted layered shadows, never black )
  shadowE0: "0 1px 2px rgba(15, 23, 42, 0.04)",
  shadowE1: "0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 20px rgba(15, 23, 42, 0.06)",
  shadowE2: "0 2px 4px rgba(15, 23, 42, 0.04), 0 12px 32px rgba(15, 23, 42, 0.08), 0 24px 48px rgba(75, 46, 235, 0.05)",
  shadowE3: "0 2px 4px rgba(15, 23, 42, 0.04), 0 16px 40px rgba(15, 23, 42, 0.09), 0 40px 88px rgba(75, 46, 235, 0.12)",
  shadowCold: "0 2px 6px rgba(15, 23, 42, 0.08), 0 8px 18px rgba(15, 23, 42, 0.06)",

  // Frosted Glass on White
  glassBg: "rgba(255, 255, 255, 0.74)",
  glassBorder: "1px solid rgba(226, 232, 240, 0.9)",
  glassHighlight: "inset 0 1px 0 rgba(255, 255, 255, 0.95)",

  // Radii
  rSm: 12,
  rMd: 20,
  rLg: 28,
} as const;
