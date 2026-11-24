import React from "react";
import { useCurrentFrame } from "remotion";
import { THEME } from "../theme";
import { FONTS } from "../fonts";
import { outExpo } from "../motion/easing";
import { interpolate } from "remotion";

const FEATURES = [
  { num: "01", title: "Multi-Channel Inbox", sub: "WhatsApp · Instagram · Messenger · Email in one view", pill: "UNIFIED INBOX", tint: "#ECFDF5", accent: THEME.mintDeep },
  { num: "02", title: "AI Chatting & Calling", sub: "24/7 bilingual English & Hinglish voice + chat concierge", pill: "AI STUDIO", tint: "#EEF2FF", accent: THEME.brand },
  { num: "03", title: "Visual Automations", sub: "Trigger flows from DMs, comments & confirmed leads", pill: "ZERO CODE", tint: "#F5F3FF", accent: "#6D28D9" },
  { num: "04", title: "IG Post Scheduling", sub: "Auto-templated Instagram post planning & management", pill: "SOCIAL STUDIO", tint: "#FDF2F8", accent: "#BE185D" },
  { num: "05", title: "Comment Automation", sub: "Instant public replies + automated Instagram DMs", pill: "IG & FB", tint: "#EFF6FF", accent: "#1D4ED8" },
  { num: "06", title: "Read / Unread Filters", sub: "Filter campaign readers vs missed leads & follow up fast", pill: "CAMPAIGNS", tint: "#FEF3C7", accent: "#B45309" },
  { num: "07", title: "Meta Ads Performance", sub: "Live Spend, Leads & CPL analytics across campaigns", pill: "ANALYTICS", tint: "#E0F2FE", accent: "#0369A1" },
  { num: "08", title: "Follow-Up Emails", sub: "Automated email follow-ups for every confirmed lead", pill: "EMAIL SYNC", tint: "#DCFCE7", accent: "#15803D" },
];

/**
 * S09 Feature Burst (56.93s -> 62.33s, 334f)
 * 8 rapid cards (~40f = 0.67s each) showcasing 100% real Samyoj features.
 * VO: "AI Studio, unified inbox, social automation, and analytics,"
 */
export const S09Burst: React.FC = () => {
  const frame = useCurrentFrame();
  const cardFrames = 41;
  const idx = Math.min(FEATURES.length - 1, Math.floor(frame / cardFrames));
  const localF = frame - idx * cardFrames;
  const item = FEATURES[idx];

  const pop = interpolate(localF, [0, 12], [0.92, 1.0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: outExpo });
  const op = interpolate(localF, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          width: 1280,
          height: 540,
          borderRadius: 34,
          background: item.tint,
          border: `1.5px solid ${THEME.hairline}`,
          boxShadow: THEME.shadowE3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 80px",
          opacity: op,
          transform: `scale(${pop.toFixed(4)})`,
        }}
      >
        <div
          style={{
            padding: "8px 18px",
            borderRadius: 999,
            background: "#FFFFFF",
            fontFamily: FONTS.mono,
            fontSize: 13.5,
            fontWeight: 700,
            color: item.accent,
            marginBottom: 24,
            letterSpacing: "0.08em",
            boxShadow: THEME.shadowE1,
          }}
        >
          {item.pill} · {item.num} / 08
        </div>
        <h2
          style={{
            margin: 0,
            fontFamily: FONTS.display,
            fontSize: 78,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            color: THEME.ink,
            lineHeight: 1.04,
          }}
        >
          {item.title}
        </h2>
        <p style={{ marginTop: 18, fontFamily: FONTS.grotesk, fontSize: 27, color: THEME.ink2 }}>
          {item.sub}
        </p>
      </div>
    </div>
  );
};
