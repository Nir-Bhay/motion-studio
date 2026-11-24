import React from "react";
import { useCurrentFrame } from "remotion";
import { THEME } from "../theme";
import { FONTS } from "../fonts";
import { CameraRig } from "../motion/CameraRig";
import { UnreadDotMotif } from "../motion/DotMotif";
import { easeRange, enterTriad, outExpo } from "../motion/easing";
import {
  IconEmail,
  IconInstagram,
  IconMessenger,
  IconMeta,
  IconWhatsApp,
} from "../ui/SamyojIcons";

interface ChannelCard {
  id: string;
  title: string;
  subtitle: string;
  preview: string;
  meta: string;
  badge: string;
  x: number;
  y: number;
  w: number;
  h: number;
  rot: number;
  accentBg: string;
  accentColor: string;
  borderTint: string;
  icon: React.ReactNode;
}

const CHANNEL_CARDS: ChannelCard[] = [
  {
    id: "wa",
    title: "WhatsApp Business",
    subtitle: "Meera Patel · +91 98••• ••410",
    preview: "“Hi, is Size 9 Indigo Runner in stock?”",
    meta: "3 unread chats · Tab 1",
    badge: "3",
    x: 90,
    y: 95,
    w: 490,
    h: 225,
    rot: -2.2,
    accentBg: "rgba(37, 211, 102, 0.12)",
    accentColor: "#15803D",
    borderTint: "rgba(37, 211, 102, 0.34)",
    icon: <IconWhatsApp size={26} />,
  },
  {
    id: "ig",
    title: "Instagram DMs & Comments",
    subtitle: "@rohan_k · Reel Comment + DM",
    preview: "“Price? COD milega kya? Reply fast!”",
    meta: "17 comments & DMs · Tab 2",
    badge: "17",
    x: 1320,
    y: 88,
    w: 500,
    h: 232,
    rot: 2.0,
    accentBg: "rgba(225, 48, 108, 0.10)",
    accentColor: "#BE185D",
    borderTint: "rgba(225, 48, 108, 0.30)",
    icon: <IconInstagram size={26} />,
  },
  {
    id: "fb",
    title: "Facebook Messenger",
    subtitle: "Aarav Verma · Page Inbox",
    preview: "“Dispatch status please? Waiting since yesterday”",
    meta: "48 open threads · Tab 3",
    badge: "48",
    x: 105,
    y: 745,
    w: 475,
    h: 215,
    rot: 1.6,
    accentBg: "rgba(24, 119, 242, 0.10)",
    accentColor: "#1D4ED8",
    borderTint: "rgba(24, 119, 242, 0.30)",
    icon: <IconMessenger size={26} />,
  },
  {
    id: "ads",
    title: "Meta Ads Manager",
    subtitle: "Click-to-WhatsApp · Ad Set #4",
    preview: "Leads pouring in — nobody assigned",
    meta: "99+ ad clicks · Tab 4",
    badge: "99+",
    x: 735,
    y: 785,
    w: 455,
    h: 205,
    rot: -1.4,
    accentBg: "rgba(75, 46, 235, 0.09)",
    accentColor: THEME.brand,
    borderTint: "rgba(75, 46, 235, 0.28)",
    icon: <IconMeta size={26} />,
  },
  {
    id: "mail",
    title: "Email Inbox",
    subtitle: "sanya@retailco.in · Re: Bulk order",
    preview: "“Need 25 pairs by Friday — send quote”",
    meta: "29 unread threads · Tab 5",
    badge: "29",
    x: 1335,
    y: 735,
    w: 485,
    h: 220,
    rot: -2.0,
    accentBg: "rgba(239, 68, 68, 0.09)",
    accentColor: THEME.alertInk,
    borderTint: "rgba(239, 68, 68, 0.28)",
    icon: <IconEmail size={26} />,
  },
];

/**
 * S02 Chaos (3.67s -> 11.20s, 462f)
 * VO exact cues:
 * - WhatsApp: f=95..126
 * - Instagram: f=130..162
 * - Messenger: f=168..195
 * - Meta Ads: f=200..235
 * - Email: f=240..289
 * - Pull back full screen ("across five separate tabs, with zero answers"): f=295..462
 */
export const S02Chaos: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = (Math.sin(frame * 0.16) + 1) * 0.5;

  // Dynamic camera whip-pan tour across all 5 large cards, then crisp pull-back to full screen!
  const camKeyframes = [
    { frame: 0,   scale: 0.96, x: 0,    y: 0 },
    { frame: 75,  scale: 1.0,  x: 0,    y: 0 },
    { frame: 96,  scale: 1.32, x: 380,  y: 210 },  // WhatsApp (top-left)
    { frame: 120, scale: 1.32, x: 375,  y: 205 },
    { frame: 136, scale: 1.32, x: -375, y: 210 },  // Instagram (top-right)
    { frame: 160, scale: 1.32, x: -370, y: 205 },
    { frame: 174, scale: 1.32, x: 375,  y: -205 }, // Messenger (bottom-left)
    { frame: 194, scale: 1.32, x: 370,  y: -200 },
    { frame: 208, scale: 1.32, x: 0,    y: -220 }, // Meta Ads (bottom-center)
    { frame: 232, scale: 1.32, x: -10,  y: -215 },
    { frame: 246, scale: 1.32, x: -380, y: -200 }, // Email (bottom-right)
    { frame: 286, scale: 1.32, x: -375, y: -195 },
    { frame: 318, scale: 1.0,  x: 0,    y: 0 },    // Pull back full screen!
    { frame: 462, scale: 1.02, x: 0,    y: 0 },
  ];

  // Center hero card reveals on the pull-back ("five separate tabs, with zero answers")
  const heroIn = enterTriad(frame, 292, 24, { y: 18, scaleFrom: 0.92, blurFrom: 6 });

  // Active card spotlight index
  const activeIdx =
    frame >= 90 && frame < 130 ? 0 :
    frame >= 130 && frame < 166 ? 1 :
    frame >= 166 && frame < 200 ? 2 :
    frame >= 200 && frame < 238 ? 3 :
    frame >= 238 && frame < 292 ? 4 : -1;

  // Center hero converges all 5 cards slightly inward at the very end for Bloom handoff
  const gather = easeRange(frame, 425, 462, outExpo);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <CameraRig frame={frame} keyframes={camKeyframes}>
        {CHANNEL_CARDS.map((card, i) => {
          const cardIn = enterTriad(frame, 6 + i * 7, 18, { y: 16, scaleFrom: 0.92, blurFrom: 4 });
          const isFocused = activeIdx === i;
          const driftX = Math.sin(frame * 0.04 + i * 1.4) * 5;
          const driftY = Math.cos(frame * 0.045 + i * 1.9) * 5;
          const cx = card.x + (960 - (card.x + card.w / 2)) * gather * 0.35;
          const cy = card.y + (540 - (card.y + card.h / 2)) * gather * 0.35;

          return (
            <div
              key={card.id}
              style={{
                position: "absolute",
                left: cx,
                top: cy,
                width: card.w,
                height: card.h,
                padding: "20px 22px",
                borderRadius: 22,
                background: "#FFFFFF",
                border: `1.5px solid ${isFocused ? card.borderTint : THEME.hairline}`,
                boxShadow: isFocused ? `${THEME.shadowE3}, 0 0 0 4px ${card.accentBg}` : THEME.shadowE2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                opacity: cardIn.opacity * (1 - gather * 0.65),
                transform: `translate3d(${driftX.toFixed(1)}px, ${(cardIn.y + driftY).toFixed(1)}px, 0) scale(${(cardIn.scale * (isFocused ? 1.03 : 1)).toFixed(4)}) rotate(${(card.rot * (1 - gather)).toFixed(2)}deg)`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 14,
                      background: card.accentBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {card.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: FONTS.display, fontSize: 19, fontWeight: 700, color: THEME.ink }}>
                      {card.title}
                    </div>
                    <div style={{ fontFamily: FONTS.ui, fontSize: 12.5, color: THEME.ink3 }}>{card.subtitle}</div>
                  </div>
                </div>
                <span
                  style={{
                    padding: "4px 11px",
                    borderRadius: 999,
                    background: "#FEE2E2",
                    color: THEME.alertInk,
                    fontFamily: FONTS.mono,
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  • {card.badge}
                </span>
              </div>

              <div
                style={{
                  padding: "11px 14px",
                  borderRadius: 12,
                  background: "#F8FAFC",
                  border: `1px solid ${THEME.hairline}`,
                  fontFamily: FONTS.ui,
                  fontSize: 15,
                  fontWeight: 500,
                  color: THEME.ink,
                }}
              >
                {card.preview}
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: FONTS.mono, fontSize: 11.5, fontWeight: 600, color: card.accentColor }}>
                  {card.meta}
                </span>
                <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: THEME.ink3 }}>UNASSIGNED</span>
              </div>
            </div>
          );
        })}

        {/* Center Hero Card revealed on full-screen pull-back */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          {gather > 0.35 ? (
            <UnreadDotMotif size={64} morph={0} pulse={pulse} />
          ) : (
            <div
              style={{
                padding: "42px 66px",
                borderRadius: 30,
                background: "rgba(255,255,255,0.96)",
                border: `1.5px solid ${THEME.hairline}`,
                boxShadow: THEME.shadowE3,
                textAlign: "center",
                ...heroIn.style,
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 13,
                  fontWeight: 700,
                  color: THEME.alertInk,
                  letterSpacing: "0.1em",
                  marginBottom: 10,
                }}
              >
                DISCONNECTED WORKFLOWS
              </div>
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 66,
                  fontWeight: 800,
                  letterSpacing: "-0.035em",
                  lineHeight: 1.02,
                  color: THEME.ink,
                }}
              >
                5 apps.{" "}
                <span style={{ fontFamily: FONTS.serif, fontStyle: "italic", fontWeight: 400, color: THEME.alertInk, fontSize: "1.1em" }}>
                  0 answers.
                </span>
              </div>
            </div>
          )}
        </div>
      </CameraRig>
    </div>
  );
};
