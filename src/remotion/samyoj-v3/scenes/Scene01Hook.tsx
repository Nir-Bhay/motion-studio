import "@fontsource/bricolage-grotesque/700.css";
import "@fontsource/bricolage-grotesque/800.css";
import React from "react";
import { AbsoluteFill } from "remotion";
import {
  C,
  E_BACK,
  E_ENTER,
  E_EXIT,
  E_IO,
  FONT_INTER,
  SHADOW,
  clamp01,
  focusWindow,
  lerp,
  quadPath,
  seg,
  springUnit,
  voPulse,
} from "../tokens";
import { CaptionBar, RingShockwave } from "../components/Effects";
import {
  Avatar,
  ChannelKind,
  ChannelTileIcon,
  Chip,
  PlaceholderBar,
  SamyojAppShell,
} from "../components/UiKit";

const FONT_DISPLAY = "'Bricolage Grotesque', 'Inter Variable', sans-serif";

interface ChaosCard {
  id: string;
  channel: ChannelKind;
  channelLabel: string;
  accent: string;
  time: string;
  text: string;
  x: number;
  y: number;
  layer: "FAR" | "MID" | "NEAR";
  tilt: number;
  popAt: number;
}

// 19 scattered organic notification cards framing the central hero + 1 initial top bubble = 20 total
const CHAOS_CARDS: ChaosCard[] = [
  { id: "C1", channel: "whatsapp", channelLabel: "WhatsApp", accent: C.waIcon, time: "now", text: "Is the 7 AM class full?", x: 1185, y: 170, layer: "MID", tilt: 4, popAt: 0.22 },
  { id: "C2", channel: "whatsapp", channelLabel: "WhatsApp", accent: C.waIcon, time: "now", text: "Please send the price list", x: 175, y: 550, layer: "NEAR", tilt: -5, popAt: 0.34 },
  { id: "C3", channel: "instagram", channelLabel: "Instagram", accent: C.igPink, time: "1m", text: "comment: Price please?", x: 235, y: 305, layer: "MID", tilt: -4, popAt: 0.46 },
  { id: "C4", channel: "calls", channelLabel: "Calls", accent: C.indigo, time: "1m", text: "Rahul Mehta · missed call", x: 310, y: 115, layer: "NEAR", tilt: -4, popAt: 0.56 },
  { id: "C5", channel: "facebook", channelLabel: "Facebook", accent: C.fbBlue, time: "2m", text: "New lead: Ananya Rao", x: 1335, y: 345, layer: "MID", tilt: 4, popAt: 0.66 },
  { id: "C6", channel: "gmail", channelLabel: "Email", accent: C.gmailRed, time: "2m", text: "Re: Membership renewal", x: 1380, y: 525, layer: "NEAR", tilt: -4, popAt: 0.76 },
  { id: "C7", channel: "whatsapp", channelLabel: "WhatsApp", accent: C.waIcon, time: "2m", text: "Hello?? Any update?", x: 1290, y: 695, layer: "MID", tilt: 5, popAt: 0.86 },
  { id: "C8", channel: "instagram", channelLabel: "Instagram", accent: C.igPink, time: "3m", text: "DM: Weekend batches?", x: 270, y: 745, layer: "NEAR", tilt: 4, popAt: 0.96 },
  { id: "C9", channel: "messenger", channelLabel: "Messenger", accent: C.fbBlue, time: "4m", text: "Are you open today?", x: 760, y: 775, layer: "MID", tilt: -3, popAt: 1.06 },
  { id: "C10", channel: "calls", channelLabel: "Calls", accent: C.indigo, time: "4m", text: "2 missed calls", x: 1510, y: 195, layer: "FAR", tilt: 6, popAt: 1.15 },
  { id: "C11", channel: "instagram", channelLabel: "Instagram", accent: C.igPink, time: "5m", text: "comment: Interested!", x: 1110, y: 855, layer: "NEAR", tilt: -4, popAt: 1.24 },
  { id: "C12", channel: "facebook", channelLabel: "Facebook", accent: C.fbBlue, time: "5m", text: "Page message: Timings?", x: 85, y: 405, layer: "FAR", tilt: 5, popAt: 1.32 },
  { id: "C13", channel: "gmail", channelLabel: "Email", accent: C.gmailRed, time: "6m", text: "Trial booking inquiry", x: 455, y: 875, layer: "FAR", tilt: -5, popAt: 1.40 },
  { id: "C14", channel: "whatsapp", channelLabel: "WhatsApp", accent: C.waIcon, time: "6m", text: "Can I join tomorrow?", x: 75, y: 165, layer: "FAR", tilt: -6, popAt: 1.48 },
  { id: "C15", channel: "messenger", channelLabel: "Messenger", accent: C.fbBlue, time: "7m", text: "Offer link not working", x: 1485, y: 825, layer: "FAR", tilt: 5, popAt: 1.56 },
  { id: "C16", channel: "calls", channelLabel: "Calls", accent: C.indigo, time: "8m", text: "Missed call · +91 ••812", x: 65, y: 690, layer: "FAR", tilt: 4, popAt: 1.63 },
  { id: "C17", channel: "instagram", channelLabel: "Instagram", accent: C.igPink, time: "8m", text: "Story reply: Fees?", x: 930, y: 95, layer: "FAR", tilt: 3, popAt: 1.70 },
  { id: "C18", channel: "gmail", channelLabel: "Email", accent: C.gmailRed, time: "9m", text: "Invoice copy needed", x: 1515, y: 420, layer: "FAR", tilt: -4, popAt: 1.76 },
  { id: "C19", channel: "whatsapp", channelLabel: "WhatsApp", accent: C.waIcon, time: "9m", text: "Callback at 5 PM?", x: 790, y: 915, layer: "MID", tilt: 3, popAt: 1.82 },
];

const TOP_CHANNEL_PILLS: Array<{
  kind: ChannelKind;
  name: string;
  sub: string;
  tickAt: number;
}> = [
  { kind: "buttons", name: "All Channels", sub: "WA, FB, IG, Email", tickAt: 3.10 },
  { kind: "whatsapp", name: "WhatsApp", sub: "+91 ••••• ••210", tickAt: 3.25 },
  { kind: "facebook", name: "Facebook", sub: "Sunrise Studio", tickAt: 3.45 },
  { kind: "instagram", name: "Instagram", sub: "@sunrise.studio", tickAt: 3.65 },
  { kind: "gmail", name: "Email", sub: "studio@example.com", tickAt: 3.85 },
];

const QUICK_ACTIONS: Array<{
  title: string;
  sub: string;
  icon: ChannelKind;
  bg: string;
  border: string;
}> = [
  { title: "WhatsApp Inbox", sub: "Customers →", icon: "whatsapp", bg: "#ECFDF5", border: "#A7F3D0" },
  { title: "Messenger", sub: "Reply to chats →", icon: "facebook", bg: "#EFF6FF", border: "#BFDBFE" },
  { title: "Instagram Inbox", sub: "Reply to DMs →", icon: "instagram", bg: "#FDF2F8", border: "#FBCFE8" },
  { title: "New campaign", sub: "Send follow-ups →", icon: "gmail", bg: "#FFF7ED", border: "#FED7AA" },
  { title: "Templates", sub: "Prebuilt messages →", icon: "form", bg: "#FEFCE8", border: "#FDE68A" },
  { title: "AI agent", sub: "Automate replies →", icon: "ai", bg: "#F5F3FF", border: "#DDD6FE" },
];

const CHECKLIST_ITEMS = [
  { label: "Connect WhatsApp", done: true },
  { label: "Add a message template", done: false },
  { label: "Send a test message", done: true },
  { label: "Add contacts", done: true },
  { label: "Connect Facebook", done: true },
];

export const Scene01Hook: React.FC<{ t: number }> = ({ t }) => {
  if (t > 5.08) return null;

  // Phase 1: Chaos (0.0 - 2.30) with clean gap 2.30 - 2.50 before Dashboard opens!
  const chaosVisible = t < 2.34;
  const bulgeU = t >= 1.88 && t < 1.96 ? seg(t, 1.88, 1.96, E_BACK) : 0;
  const pullU = seg(t, 1.96, 2.30, E_EXIT);
  const camPush1 = seg(t, 0, 1.9, E_IO);
  const chaosCamScale = lerp(1.0, 1.045, camPush1) * (1 + 0.03 * bulgeU);

  const heroEnterU = seg(t, 0.7, 1.12, E_ENTER);
  const badgeRollU = seg(t, 0.8, 1.78, E_IO);
  const badgeVal = Math.round(lerp(1, 100, badgeRollU));
  const badgeLabel = badgeVal >= 100 ? "99+" : String(badgeVal);

  // Breathable Indigo Dot Pause (2.28 - 2.52s)
  const dotVisible = t >= 2.26 && t < 2.58;
  const dotPulse =
    t >= 2.26 && t < 2.52
      ? 1 + 0.28 * Math.sin(((t - 2.26) / 0.26) * Math.PI)
      : 1;

  // Phase 2: Dashboard opens cleanly at 2.50s (0.20s clean pause after collapse!)
  const winOpenU = seg(t, 2.50, 3.18, E_BACK);
  const winScale = t < 2.50 ? 0 : lerp(0.03, 1.0, winOpenU);
  const winRadius = lerp(999, 28, clamp01(winOpenU));

  // Push gently toward WhatsApp top pill (3.3 - 4.50)
  const waCamU = seg(t, 3.3, 4.50, E_IO);
  const waCamScale = lerp(1.0, 1.14, waCamU);

  // Seamless WhatsApp tile -> WhatsApp Inbox dashboard expansion (4.50 - 5.08s, stays 100% solid into Scene 2!)
  const expandU = seg(t, 4.50, 5.08, E_IO);
  const winOpacity = t >= 4.52 ? 1 - seg(t, 4.52, 4.82, E_EXIT) : 1;

  const miniTargets: Array<{ kind: ChannelKind; from: [number, number]; to: [number, number]; start: number }> = [
    { kind: "whatsapp", from: [120, 740], to: [560, 530], start: 2.62 },
    { kind: "instagram", from: [1760, 240], to: [1060, 530], start: 2.72 },
    { kind: "gmail", from: [1780, 860], to: [1545, 530], start: 2.82 },
  ];

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {chaosVisible && (
        <AbsoluteFill
          style={{
            transform: `scale(${chaosCamScale})`,
            transformOrigin: "960px 540px",
          }}
        >
          {/* Beat 0.0-0.28: Initial WhatsApp bubble sitting cleanly above hero */}
          {(() => {
            const pU = seg(t, 0.0, 0.28, E_BACK);
            const px = lerp(695, 960 - 255, pullU);
            const py = lerp(215, 540 - 52, pullU);
            const s = pU * (1 - pullU * 0.94);
            return (
              <div
                style={{
                  position: "absolute",
                  left: px,
                  top: py,
                  width: 510,
                  height: 104,
                  borderRadius: 18,
                  backgroundColor: "#FFFFFF",
                  border: `1.5px solid ${C.line}`,
                  boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  paddingLeft: 20,
                  paddingRight: 22,
                  opacity: clamp01(pU) * (1 - pullU * 0.9),
                  transform: `scale(${s})`,
                  filter: pullU > 0.05 ? `blur(${pullU * 12}px)` : "none",
                }}
              >
                <ChannelTileIcon kind="whatsapp" size={50} radius={14} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: FONT_INTER, fontSize: 22, fontWeight: 650, color: C.greenText }}>
                      WhatsApp
                    </span>
                    <span style={{ fontFamily: FONT_INTER, fontSize: 22, color: C.faint }}>now</span>
                  </div>
                  <div style={{ fontFamily: FONT_INTER, fontSize: 22, fontWeight: 500, color: C.ink, marginTop: 2 }}>
                    Hi! Do you have a free trial?
                  </div>
                </div>
              </div>
            );
          })()}

          {/* 13 Real-Icon Notification Cards */}
          {CHAOS_CARDS.map((card, idx) => {
            if (t < card.popAt) return null;
            const popU = seg(t, card.popAt, card.popAt + 0.28, E_BACK);
            const layerScale = card.layer === "FAR" ? 0.84 : card.layer === "MID" ? 0.93 : 1.0;
            const layerBlur = card.layer === "FAR" ? 1.1 : card.layer === "MID" ? 0.35 : 0;
            const baseOp = card.layer === "FAR" ? 0.78 : card.layer === "MID" ? 0.94 : 1.0;
            const jitterX = t >= 1.45 && t < 1.95 ? Math.sin(t * 2 * Math.PI * 12 + idx * 1.7) * 1.6 : 0;
            const jitterY = t >= 1.45 && t < 1.95 ? Math.cos(t * 2 * Math.PI * 12 + idx * 2.3) * 1.6 : 0;

            const cx = lerp(card.x, 960 - 170, pullU) + jitterX;
            const cy = lerp(card.y, 540 - 40, pullU) + jitterY;
            const curScale = layerScale * popU * (1 - pullU * 0.94);

            return (
              <div
                key={card.id}
                style={{
                  position: "absolute",
                  left: cx,
                  top: cy,
                  minWidth: 310,
                  maxWidth: 430,
                  padding: "14px 18px",
                  borderRadius: 16,
                  backgroundColor: "#FFFFFF",
                  border: `1.5px solid ${C.line}`,
                  boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  opacity: baseOp * (1 - pullU * 0.9),
                  transform: `rotate(${lerp(card.tilt, 0, pullU)}deg) scale(${curScale})`,
                  filter: `blur(${layerBlur + pullU * 12}px)`,
                }}
              >
                <ChannelTileIcon kind={card.channel} size={46} radius={13} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                    <span style={{ fontFamily: FONT_INTER, fontSize: 22, fontWeight: 600, color: C.muted }}>
                      {card.channelLabel}
                    </span>
                    <span style={{ fontFamily: FONT_INTER, fontSize: 22, color: C.faint }}>
                      {card.time}
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: FONT_INTER,
                      fontSize: 22,
                      fontWeight: 550,
                      color: C.ink,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {card.text}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Redesigned Hero Headline + Notification Bell with 99+ beside "apps." */}
          {t >= 0.7 && (
            <div
              style={{
                position: "absolute",
                left: 360,
                top: lerp(420, 480, pullU),
                width: 1200,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                zIndex: 100,
                opacity: heroEnterU * (1 - pullU),
                transform: `translateY(${lerp(28, 0, heroEnterU)}px) scale(${lerp(0.95, 1, heroEnterU) * (1 - pullU * 0.92)})`,
                filter: pullU > 0.05 ? `blur(${pullU * 12}px)` : "none",
              }}
            >
              <div
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: 78,
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.06,
                  color: C.ink,
                  textAlign: "center",
                }}
              >
                Too many chats.
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 20,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: 78,
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.06,
                    color: C.ink,
                  }}
                >
                  Too many <span style={{ color: C.indigo }}>apps.</span>
                </span>

                {/* Sleek Notification Bell Icon + Red 99+ Badge on top-right */}
                <div
                  style={{
                    position: "relative",
                    width: 64,
                    height: 64,
                    borderRadius: 14,
                    backgroundColor: "#F8FAFC",
                    border: `1.5px solid ${C.line}`,
                    boxShadow: SHADOW.resting,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 4,
                  }}
                >
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 8.5a6 6 0 10-12 0c0 6.5-2.8 8.2-2.8 8.2h17.6S18 15 18 8.5z"
                      stroke={C.ink}
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.3 20.5a2 2 0 003.4 0"
                      stroke={C.ink}
                      strokeWidth={2}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div
                    style={{
                      position: "absolute",
                      right: -18,
                      top: -14,
                      minWidth: 54,
                      height: 36,
                      paddingLeft: 10,
                      paddingRight: 10,
                      borderRadius: 9,
                      backgroundColor: C.unreadRed,
                      border: "3px solid #FFFFFF",
                      color: "#FFFFFF",
                      fontFamily: FONT_INTER,
                      fontSize: 22,
                      fontWeight: 800,
                      fontVariantNumeric: "tabular-nums",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 6px 16px rgba(239,68,68,0.35)",
                    }}
                  >
                    {badgeLabel}
                  </div>
                </div>
              </div>
            </div>
          )}
        </AbsoluteFill>
      )}

      {/* Breathing Central Indigo Dot during the clean pause (2.26 - 2.58s) */}
      {dotVisible && (
        <div
          style={{
            position: "absolute",
            left: 960 - 10,
            top: 540 - 10,
            width: 20,
            height: 20,
            borderRadius: 999,
            backgroundColor: C.indigo,
            boxShadow: SHADOW.glow(C.indigo),
            transform: `scale(${dotPulse})`,
            zIndex: 120,
          }}
        />
      )}

      <RingShockwave t={t} startSec={2.30} x={960} y={540} color={C.indigo} />
      <RingShockwave t={t} startSec={2.50} x={960} y={600} color={C.indigo} />

      {/* Real Samyoj Dashboard LIVE Workspace (matching exact Samyoj Dashboard UI with crisp outlines!) */}
      {t >= 2.50 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `scale(${waCamScale})`,
            transformOrigin: "820px 330px",
            opacity: winOpacity,
          }}
        >
          <SamyojAppShell
            x={190}
            y={195}
            width={1540}
            height={805}
            radius={winRadius}
            activeNav="dashboard"
            pageTitle="Dashboard"
            liveBadge
            hideCalls
            channelIcon="buttons"
            accentColor={C.indigo}
            pulseScale={voPulse(t, 2.75)}
            headerChips={
              <span style={{ fontFamily: FONT_INTER, fontSize: 15, color: C.muted, marginLeft: 4 }}>
                WhatsApp, Facebook, Instagram, and Email at a glance
              </span>
            }
            style={{
              transform: `scale(${winScale})`,
              transformOrigin: "center center",
            }}
          >
            <div
              style={{
                padding: "14px 18px",
                display: "flex",
                flexDirection: "column",
                gap: 11,
                height: "100%",
                backgroundColor: "#F6F8FC",
              }}
            >
              {/* 1) Top Row: 5 Connected Channel Pills */}
              <div style={{ display: "flex", gap: 10 }}>
                {TOP_CHANNEL_PILLS.map((ch, i) => {
                  const cardU = seg(t, 2.62 + i * 0.05, 3.00 + i * 0.05, E_ENTER);
                  const tickSp = springUnit(t, ch.tickAt);
                  const isWa = ch.kind === "whatsapp";
                  const waLift = isWa ? focusWindow(t, 3.85, 4.55, 0.25) : 0;
                  return (
                    <div
                      key={ch.kind}
                      style={{
                        flex: 1,
                        height: 54,
                        borderRadius: 12,
                        background: isWa
                          ? "linear-gradient(135deg, rgba(37,211,102,0.10) 0%, rgba(255,255,255,0.92) 60%, rgba(37,211,102,0.06) 100%)"
                          : "#FFFFFF",
                        border: isWa ? `1.5px solid ${C.waIcon}` : `1.5px solid ${C.line}`,
                        boxShadow: waLift > 0.05
                          ? `inset 0 1px 0 rgba(255,255,255,0.95), 0 0 0 3px rgba(37, 211, 102, ${0.14 * waLift})`
                          : "none",
                        padding: "0 12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 8,
                        opacity: cardU,
                        transform: `translateY(${lerp(12, 0, cardU) - 2 * waLift}px) scale(${1 + 0.03 * waLift})`,
                        zIndex: waLift > 0.05 ? 20 : 1,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 9, minWidth: 0 }}>
                        <ChannelTileIcon kind={ch.kind} size={30} radius={8} />
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontFamily: FONT_INTER, fontSize: 14, fontWeight: 700, color: C.ink, whiteSpace: "nowrap" }}>
                            {ch.name}
                          </div>
                          <div
                            style={{
                              fontFamily: FONT_INTER,
                              fontSize: 12,
                              color: C.muted,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {ch.sub}
                          </div>
                        </div>
                      </div>
                      {i > 0 && t >= ch.tickAt && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            flexShrink: 0,
                            opacity: clamp01((t - ch.tickAt) / 0.12),
                            transform: `scale(${lerp(0.8, 1, tickSp)})`,
                          }}
                        >
                          <div style={{ width: 6, height: 6, borderRadius: 999, backgroundColor: C.waIcon }} />
                          <span style={{ fontFamily: FONT_INTER, fontSize: 11, fontWeight: 600, color: C.greenText }}>
                            Connected
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* 2) Hero All Channels Banner Card */}
              <div
                style={{
                  borderRadius: 14,
                  border: "1.5px solid #BFDBFE",
                  background: "linear-gradient(125deg, #FFFFFF 0%, #EFF6FF 65%, #E0F2FE 100%)",
                  padding: "13px 18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  opacity: seg(t, 2.75, 3.15, E_ENTER),
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1, minWidth: 0 }}>
                  <ChannelTileIcon kind="buttons" size={44} radius={12} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontFamily: FONT_INTER, fontSize: 17, fontWeight: 700, color: C.ink }}>
                        All Channels
                      </span>
                      <Chip variant="green" style={{ height: 22, fontSize: 11, paddingLeft: 8, paddingRight: 8 }}>
                        • Connected
                      </Chip>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}>
                      <span style={{ fontFamily: FONT_INTER, fontSize: 12, fontWeight: 600, color: C.greenText }}>
                        WhatsApp · +91 ••••• ••210
                      </span>
                      <span style={{ fontFamily: FONT_INTER, fontSize: 12, fontWeight: 600, color: C.fbBlue }}>
                        Facebook · Sunrise Studio
                      </span>
                      <span style={{ fontFamily: FONT_INTER, fontSize: 12, fontWeight: 600, color: C.igPink }}>
                        Instagram · @sunrise.studio
                      </span>
                      <span style={{ fontFamily: FONT_INTER, fontSize: 12, fontWeight: 600, color: C.gmailRed }}>
                        Email · Gmail
                      </span>
                    </div>
                    <div style={{ fontFamily: FONT_INTER, fontSize: 12, color: C.muted, marginTop: 3 }}>
                      Cross-channel inbox, ads snapshot, email, and recent activity on this dashboard.
                    </div>
                  </div>
                </div>

                {/* Mini Connected Channel Cards Cluster */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                  {(["whatsapp", "facebook", "instagram"] as ChannelKind[]).map((ck, idx) => (
                    <div
                      key={ck}
                      style={{
                        width: 78,
                        height: 68,
                        borderRadius: 10,
                        backgroundColor: "#FFFFFF",
                        border: `1.5px solid ${C.line}`,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 4,
                        transform: `translateY(${idx === 1 ? -4 : 2}px)`,
                      }}
                    >
                      <ChannelTileIcon kind={ck} size={24} radius={7} />
                      <span style={{ fontFamily: FONT_INTER, fontSize: 10, fontWeight: 700, color: C.ink }}>
                        {ck === "whatsapp" ? "WhatsApp" : ck === "facebook" ? "Facebook" : "Instagram"}
                      </span>
                      <span style={{ fontFamily: FONT_INTER, fontSize: 9, fontWeight: 600, color: C.greenText }}>
                        • Live
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 6, flexShrink: 0 }}>
                  <div
                    style={{
                      padding: "6px 12px",
                      borderRadius: 8,
                      backgroundColor: "#FFFFFF",
                      border: `1.5px solid ${C.line}`,
                      fontFamily: FONT_INTER,
                      fontSize: 12,
                      fontWeight: 600,
                      color: C.ink,
                    }}
                  >
                    Manage Connection
                  </div>
                  <div
                    style={{
                      padding: "6px 12px",
                      borderRadius: 8,
                      backgroundColor: "#FFFFFF",
                      border: `1.5px solid ${C.line}`,
                      fontFamily: FONT_INTER,
                      fontSize: 12,
                      fontWeight: 500,
                      color: C.muted,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>Last 7 days</span>
                    <span>⌄</span>
                  </div>
                </div>
              </div>

              {/* 3) Ads Snapshot Strip */}
              <div
                style={{
                  borderRadius: 12,
                  border: `1.5px solid ${C.line}`,
                  backgroundColor: "#FFFFFF",
                  padding: "9px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <ChannelTileIcon kind="facebook" size={26} radius={7} />
                  <div>
                    <div style={{ fontFamily: FONT_INTER, fontSize: 13, fontWeight: 700, color: C.ink }}>
                      Ad performance
                    </div>
                    <div style={{ fontFamily: FONT_INTER, fontSize: 11, color: C.muted }}>
                      Last 30 days · Connected ad account
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
                  {[
                    { k: "SPEND", v: "₹12,400" },
                    { k: "LEADS", v: "40" },
                    { k: "CPL", v: "₹310" },
                  ].map((s) => (
                    <div key={s.k} style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: FONT_INTER, fontSize: 10, fontWeight: 700, color: C.muted }}>
                        {s.k}
                      </div>
                      <div style={{ fontFamily: FONT_INTER, fontSize: 15, fontWeight: 700, color: C.ink }}>
                        {s.v}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4) Middle Row: Live Overview + Message Status + Recent Activity */}
              <div style={{ display: "flex", gap: 11, height: 210 }}>
                {/* Live Overview */}
                <div
                  style={{
                    flex: 1.4,
                    borderRadius: 14,
                    border: `1.5px solid ${C.line}`,
                    backgroundColor: "#FFFFFF",
                    padding: "12px 14px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ fontFamily: FONT_INTER, fontSize: 15, fontWeight: 700, color: C.ink }}>
                      Live overview
                    </div>
                    <div style={{ fontFamily: FONT_INTER, fontSize: 11, color: C.muted }}>
                      Updated just now
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 9 }}>
                    {[
                      { icon: "whatsapp" as ChannelKind, val: "142", sub: "WhatsApp sent", badge: "↑ 18%", color: C.waIcon, path: "M 0 22 L 50 22 L 75 10 L 110 10" },
                      { icon: "facebook" as ChannelKind, val: "38", sub: "Messenger chats", badge: "", color: C.fbBlue, path: "M 0 18 L 45 14 L 80 12 L 110 8" },
                      { icon: "instagram" as ChannelKind, val: "64", sub: "Instagram DMs", badge: "", color: C.igPink, path: "M 0 20 L 40 18 L 75 10 L 110 6" },
                    ].map((card) => (
                      <div
                        key={card.sub}
                        style={{
                          flex: 1,
                          borderRadius: 10,
                          border: `1.5px solid ${C.lineSoft}`,
                          backgroundColor: "#F8FAFC",
                          padding: "10px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          gap: 6,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <ChannelTileIcon kind={card.icon} size={22} radius={6} />
                          {card.badge && (
                            <span style={{ fontFamily: FONT_INTER, fontSize: 11, fontWeight: 700, color: C.greenText }}>
                              {card.badge}
                            </span>
                          )}
                        </div>
                        <div style={{ fontFamily: FONT_INTER, fontSize: 22, fontWeight: 700, color: C.ink }}>
                          {card.val}
                        </div>
                        <div style={{ fontFamily: FONT_INTER, fontSize: 11, color: C.muted }}>
                          {card.sub}
                        </div>
                        <svg width="100%" height="24" viewBox="0 0 110 26" preserveAspectRatio="none">
                          <path d={card.path} fill="none" stroke={card.color} strokeWidth={2.2} strokeLinecap="round" />
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Message Status Donut */}
                <div
                  style={{
                    flex: 1,
                    borderRadius: 14,
                    border: `1.5px solid ${C.line}`,
                    backgroundColor: "#FFFFFF",
                    padding: "12px 14px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: FONT_INTER, fontSize: 15, fontWeight: 700, color: C.ink }}>
                      Message status
                    </span>
                    <span style={{ fontFamily: FONT_INTER, fontSize: 12, fontWeight: 600, color: C.fbBlue }}>
                      View details
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", flex: 1 }}>
                    <div style={{ position: "relative", width: 92, height: 92, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="92" height="92" viewBox="0 0 92 92">
                        <circle cx="46" cy="46" r="36" fill="none" stroke="#E2E8F0" strokeWidth="10" />
                        <circle
                          cx="46"
                          cy="46"
                          r="36"
                          fill="none"
                          stroke={C.waIcon}
                          strokeWidth="10"
                          strokeDasharray={2 * Math.PI * 36}
                          strokeDashoffset={2 * Math.PI * 36 * 0.02}
                          transform="rotate(-90 46 46)"
                        />
                      </svg>
                      <div style={{ position: "absolute", textAlign: "center" }}>
                        <div style={{ fontFamily: FONT_INTER, fontSize: 16, fontWeight: 800, color: C.ink }}>98%</div>
                        <div style={{ fontFamily: FONT_INTER, fontSize: 10, color: C.muted }}>Delivered</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 7, fontFamily: FONT_INTER, fontSize: 12 }}>
                      <div style={{ color: C.ink }}>• Delivered <strong>98%</strong></div>
                      <div style={{ color: C.ink }}>• Sent <strong>100%</strong></div>
                      <div style={{ color: C.ink }}>• Failed <strong>0%</strong></div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div
                  style={{
                    flex: 1.2,
                    borderRadius: 14,
                    border: `1.5px solid ${C.line}`,
                    backgroundColor: "#FFFFFF",
                    padding: "12px 14px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ fontFamily: FONT_INTER, fontSize: 15, fontWeight: 700, color: C.ink }}>
                    Recent activity
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                    {[
                      { icon: "whatsapp" as ChannelKind, title: "New message received", sub: "Hi! Do you have a free trial?", time: "2m ago" },
                      { icon: "instagram" as ChannelKind, title: "New comment received", sub: "OFFER — price please?", time: "8m ago" },
                      { icon: "whatsapp" as ChannelKind, title: "Trial booking confirmed", sub: "Priya Sharma · Sat 7 AM", time: "15m ago" },
                    ].map((act, idx) => (
                      <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 9, minWidth: 0 }}>
                          <ChannelTileIcon kind={act.icon} size={26} radius={7} />
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontFamily: FONT_INTER, fontSize: 13, fontWeight: 650, color: C.ink }}>
                              {act.title}
                            </div>
                            <div
                              style={{
                                fontFamily: FONT_INTER,
                                fontSize: 11,
                                color: C.muted,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {act.sub}
                            </div>
                          </div>
                        </div>
                        <span style={{ fontFamily: FONT_INTER, fontSize: 11, color: C.faint, flexShrink: 0 }}>
                          {act.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 5) Bottom Row: Needs Attention + Quick Actions + Getting Started Checklist */}
              <div style={{ display: "flex", gap: 11, flex: 1, minHeight: 0 }}>
                {/* Needs Attention */}
                <div
                  style={{
                    flex: 1,
                    borderRadius: 14,
                    border: `1.5px solid ${C.line}`,
                    backgroundColor: "#FFFFFF",
                    padding: "12px 14px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontFamily: FONT_INTER, fontSize: 15, fontWeight: 700, color: C.ink }}>
                        Needs attention
                      </div>
                      <div style={{ fontFamily: FONT_INTER, fontSize: 11, color: C.muted }}>
                        Keep an eye on these items
                      </div>
                    </div>
                    <Chip variant="amber" style={{ height: 22, fontSize: 11, paddingLeft: 8, paddingRight: 8 }}>
                      4 items
                    </Chip>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {[
                      { icon: "whatsapp" as ChannelKind, label: "Open chats", sub: "Customers waiting for a reply", count: "4", color: C.unreadRed },
                      { icon: "facebook" as ChannelKind, label: "Unread messages", sub: "New messages from your page", count: "2", color: C.fbBlue },
                      { icon: "instagram" as ChannelKind, label: "Comments to review", sub: "New comments on your posts", count: "6", color: C.igPink },
                    ].map((item) => (
                      <div key={item.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <ChannelTileIcon kind={item.icon} size={24} radius={7} />
                          <div>
                            <div style={{ fontFamily: FONT_INTER, fontSize: 13, fontWeight: 650, color: C.ink }}>
                              {item.label}
                            </div>
                            <div style={{ fontFamily: FONT_INTER, fontSize: 11, color: C.muted }}>
                              {item.sub}
                            </div>
                          </div>
                        </div>
                        <span style={{ fontFamily: FONT_INTER, fontSize: 15, fontWeight: 700, color: item.color }}>
                          {item.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions (2x3 Pastel Grid) */}
                <div
                  style={{
                    flex: 1.35,
                    borderRadius: 14,
                    border: `1.5px solid ${C.line}`,
                    backgroundColor: "#FFFFFF",
                    padding: "12px 14px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ fontFamily: FONT_INTER, fontSize: 15, fontWeight: 700, color: C.ink }}>
                    Quick actions
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: 8,
                      flex: 1,
                      marginTop: 8,
                    }}
                  >
                    {QUICK_ACTIONS.map((qa) => (
                      <div
                        key={qa.title}
                        style={{
                          borderRadius: 10,
                          backgroundColor: qa.bg,
                          border: `1.5px solid ${qa.border}`,
                          padding: "8px 10px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <ChannelTileIcon kind={qa.icon} size={22} radius={6} />
                        <div>
                          <div style={{ fontFamily: FONT_INTER, fontSize: 12, fontWeight: 700, color: C.ink }}>
                            {qa.title}
                          </div>
                          <div style={{ fontFamily: FONT_INTER, fontSize: 11, color: C.muted }}>
                            {qa.sub}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Getting Started Checklist */}
                <div
                  style={{
                    flex: 1.05,
                    borderRadius: 14,
                    border: `1.5px solid ${C.line}`,
                    backgroundColor: "#FFFFFF",
                    padding: "12px 14px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: FONT_INTER, fontSize: 15, fontWeight: 700, color: C.ink }}>
                      Getting started
                    </span>
                    <Chip variant="green" style={{ height: 22, fontSize: 11, paddingLeft: 8, paddingRight: 8 }}>
                      4/5 done
                    </Chip>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {CHECKLIST_ITEMS.map((ci) => (
                      <div key={ci.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div
                          style={{
                            width: 16,
                            height: 16,
                            borderRadius: 999,
                            backgroundColor: ci.done ? C.waIcon : "#FFFFFF",
                            border: `1.5px solid ${ci.done ? C.waIcon : C.line}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#FFFFFF",
                            fontSize: 10,
                            fontWeight: 800,
                            flexShrink: 0,
                          }}
                        >
                          {ci.done ? "✓" : ""}
                        </div>
                        <span
                          style={{
                            fontFamily: FONT_INTER,
                            fontSize: 12,
                            color: ci.done ? C.muted : C.ink,
                            textDecoration: ci.done ? "line-through" : "none",
                          }}
                        >
                          {ci.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SamyojAppShell>
        </div>
      )}

      {/* Three mini cards flying into top channel pills */}
      {t >= 2.6 &&
        t < 3.45 &&
        miniTargets.map((m, idx) => {
          const u = seg(t, m.start, m.start + 0.48, E_IO);
          if (u <= 0 || u >= 1) return null;
          const [mx, my] = quadPath(m.from, m.to, u, -140);
          return (
            <div
              key={idx}
              style={{
                position: "absolute",
                left: mx - 30,
                top: my - 20,
                width: 60,
                height: 40,
                borderRadius: 10,
                backgroundColor: "#FFFFFF",
                border: `1.5px solid ${C.line}`,
                boxShadow: SHADOW.resting,
                display: "flex",
                alignItems: "center",
                gap: 6,
                paddingLeft: 8,
                paddingRight: 8,
                filter: "blur(6px)",
                opacity: 1 - Math.max(0, (u - 0.85) / 0.15),
                zIndex: 200,
              }}
            >
              <ChannelTileIcon kind={m.kind} size={22} radius={6} />
              <PlaceholderBar width={20} height={6} />
            </div>
          );
        })}

      {/* Seamless WhatsApp Pill -> Scene 2 Inbox Dashboard Morph (4.50 - 5.08s) */}
      {t >= 4.50 && (
        <div
          style={{
            position: "absolute",
            left: lerp(706, 140, expandU),
            top: lerp(278, 195, expandU),
            width: lerp(244, 1640, expandU),
            height: lerp(56, 805, expandU),
            borderRadius: lerp(12, 24, expandU),
            backgroundColor: "#FFFFFF",
            border: `1.5px solid ${C.line}`,
            boxShadow: SHADOW.hero,
            overflow: "hidden",
            zIndex: 250,
          }}
        >
          {/* Tile state fades out cleanly as card opens */}
          {expandU < 0.45 && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                padding: "0 14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                opacity: 1 - clamp01(expandU / 0.35),
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <ChannelTileIcon kind="whatsapp" size={30} radius={8} />
                <div>
                  <div style={{ fontFamily: FONT_INTER, fontSize: 15, fontWeight: 700, color: C.ink }}>
                    WhatsApp
                  </div>
                  <div style={{ fontFamily: FONT_INTER, fontSize: 12, color: C.muted }}>
                    +91 ••••• ••210
                  </div>
                </div>
              </div>
              <Chip variant="green" style={{ height: 24, fontSize: 11, paddingLeft: 8, paddingRight: 8 }}>
                Connected
              </Chip>
            </div>
          )}

          {/* Real Samyoj Inbox Workspace emerges seamlessly inside the SAME expanding card */}
          {expandU >= 0.32 && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: clamp01((expandU - 0.32) / 0.38),
              }}
            >
              <SamyojAppShell
                x={0}
                y={0}
                width={lerp(244, 1640, expandU)}
                height={lerp(56, 805, expandU)}
                radius={lerp(12, 24, expandU)}
                activeNav="whatsapp"
                pageTitle="Inbox"
                liveBadge
                headerChips={
                  <>
                    <div
                      style={{
                        height: 40,
                        paddingLeft: 14,
                        paddingRight: 14,
                        borderRadius: 9,
                        border: `1.5px solid ${C.line}`,
                        display: "flex",
                        alignItems: "center",
                        fontFamily: FONT_INTER,
                        fontSize: 22,
                        fontWeight: 500,
                        color: C.ink,
                      }}
                    >
                      Sales · +91 ••••• ••210 ▾
                    </div>
                    <Chip variant="gray">2 numbers</Chip>
                  </>
                }
                style={{ boxShadow: "none", border: "none" }}
              >
                <div style={{ display: "flex", height: "100%", backgroundColor: "#FFFFFF" }}>
                  <div
                    style={{
                      width: 356,
                      borderRight: `1.5px solid ${C.lineSoft}`,
                      position: "relative",
                      backgroundColor: "#FFFFFF",
                      flexShrink: 0,
                    }}
                  >
                    <div style={{ position: "absolute", left: 16, top: 18, display: "flex", gap: 8 }}>
                      <Chip variant="green">Open</Chip>
                      <Chip variant="gray">Pending</Chip>
                      <Chip variant="gray">Mine</Chip>
                    </div>
                    {[
                      { init: "RM", tone: "indigo" as const, name: "Rahul Mehta", msg: "Thanks, see you Saturday", time: "9:41" },
                      { init: "AR", tone: "pink" as const, name: "Ananya Rao", msg: "Can I pause my membership?", time: "9:20" },
                      { init: "AP", tone: "peach" as const, name: "Arjun Patel", msg: "Payment done ✓", time: "Yesterday" },
                    ].map((row, idx) => (
                      <div
                        key={row.name}
                        style={{
                          position: "absolute",
                          left: 0,
                          right: 0,
                          top: 82 + idx * 116,
                          height: 116,
                          paddingLeft: 16,
                          paddingRight: 14,
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          borderBottom: `1.5px solid ${C.lineSoft}`,
                        }}
                      >
                        <Avatar initials={row.init} tone={row.tone} size={48} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontFamily: FONT_INTER, fontSize: 22, fontWeight: 650, color: C.ink }}>
                              {row.name}
                            </span>
                            <span style={{ fontFamily: FONT_INTER, fontSize: 22, color: C.faint }}>{row.time}</span>
                          </div>
                          <div
                            style={{
                              fontFamily: FONT_INTER,
                              fontSize: 22,
                              color: C.muted,
                              marginTop: 4,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {row.msg}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ width: 644, borderRight: `1.5px solid ${C.lineSoft}`, backgroundColor: "#FAFBF8", flexShrink: 0 }}>
                    <div
                      style={{
                        height: 78,
                        borderBottom: `1.5px solid ${C.lineSoft}`,
                        padding: "0 20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor: "#FFFFFF",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <Avatar initials="PS" tone="green" size={46} />
                        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                          <span style={{ fontSize: 23, fontWeight: 650, color: C.ink }}>Priya Sharma</span>
                          <PlaceholderBar width={130} height={10} />
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <Chip variant="violet" style={{ height: 34, paddingLeft: 10, paddingRight: 10 }}>
                          ✦ AI Bot
                        </Chip>
                        <Chip variant="green" style={{ height: 34, paddingLeft: 10, paddingRight: 10 }}>
                          Open
                        </Chip>
                      </div>
                    </div>
                  </div>
                  <div style={{ flex: 1, padding: "18px 20px", backgroundColor: "#FFFFFF" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <Avatar initials="PS" tone="green" size={58} />
                      <div>
                        <div style={{ fontSize: 25, fontWeight: 650, color: C.ink }}>Priya Sharma</div>
                        <div style={{ fontSize: 22, fontWeight: 500, color: C.muted, marginTop: 2 }}>+91 ••••• ••210</div>
                      </div>
                    </div>
                  </div>
                </div>
              </SamyojAppShell>
            </div>
          )}
        </div>
      )}

      {/* Caption "One workspace." appears immediately WITH the Dashboard at 2.50s */}
      <CaptionBar
        t={t}
        startSec={2.50}
        endSec={5.0}
        enterDelay={0.05}
        words={[{ text: "One" }, { text: "workspace." }]}
      />
    </AbsoluteFill>
  );
};
