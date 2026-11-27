import React from "react";
import { AbsoluteFill } from "remotion";
import {
  C,
  E_BACK,
  E_ENTER,
  E_EXIT,
  E_IO,
  FONT_INTER,
  cameraFollow,
  focusWindow,
  lerp,
  seg,
  springUnit,
  typedSlice,
  voPulse,
} from "../tokens";
import { CaptionBar, CursorOverlay } from "../components/Effects";
import {
  AnimatedTick,
  Avatar,
  ChannelTileIcon,
  Chip,
  SamyojAppShell,
  TypingDots,
} from "../components/UiKit";

const FB_CONVERSATIONS = [
  {
    initials: "SJ",
    tone: "blue" as const,
    name: "Sonal Joshi",
    preview: "Sunday 8 AM trial spot...",
    time: "now",
    badge: "Open",
    active: true,
    at: 36.75,
  },
  {
    initials: "KR",
    tone: "indigo" as const,
    name: "Kabir Roy",
    preview: "Sent New Year 30% Offer details",
    time: "4m",
    badge: "AI Replied",
    active: false,
    at: 36.85,
  },
  {
    initials: "DM",
    tone: "green" as const,
    name: "Divya Menon",
    preview: "Parking & morning timings?",
    time: "18m",
    badge: "Open",
    active: false,
    at: 36.95,
  },
  {
    initials: "RK",
    tone: "pink" as const,
    name: "Rohan Kulkarni",
    preview: "Confirmed Saturday batch",
    time: "42m",
    badge: "Lead",
    active: false,
    at: 37.05,
  },
];

const HISTORY_EVENTS = [
  { time: "10:12 AM", text: "Clicked FB New Year Offer Ad", at: 39.55 },
  { time: "10:13 AM", text: "FB Automation sent welcome DM", at: 39.95 },
  { time: "10:14 AM", text: "AI Agent answered Sunday pricing", at: 40.35 },
  { time: "10:15 AM", text: "Sunday 8 AM trial reserved", at: 40.75 },
];

export const Scene08CommentsAndPublishing: React.FC<{ t: number }> = ({ t }) => {
  if (t < 36.65 || t > 42.35) return null;

  const enterU = seg(t, 36.7, 37.02, E_ENTER);
  const exitSlideU = seg(t, 41.7, 42.25, E_IO);
  const outOpacity = 1 - seg(t, 41.95, 42.3, E_EXIT);
  const camX = lerp(0, -1920, exitSlideU);
  const blurOut = exitSlideU > 0.05 ? exitSlideU * 10 : 0;

  // AI Agent toggled ON at 37.95s, labels & note updated across 38.8 - 41.4s
  const aiAgentOn = t >= 37.95;
  const aiAgentPop = lerp(0.92, 1.0, seg(t, 37.95, 38.2, E_BACK));
  const leadQualified = t >= 39.2;
  const noteTyped = typedSlice("Hot FB lead — Sunday 8 AM trial + 30% annual pass.", t, 40.1, 48);

  // Subtle camera follow: thread list -> AI Agent toggle & Messenger chat -> CRM Labels/Note/Activity History
  const cam = cameraFollow(t, [
    { t: 36.70, fx: 960, fy: 540, zoom: 1.00 },
    { t: 37.35, fx: 640, fy: 500, zoom: 1.10 },
    { t: 38.10, fx: 1020, fy: 470, zoom: 1.15 },
    { t: 39.45, fx: 1460, fy: 520, zoom: 1.14 },
    { t: 40.70, fx: 1460, fy: 730, zoom: 1.13 },
    { t: 41.60, fx: 960, fy: 540, zoom: 1.00 },
  ]);

  const chatFocus = focusWindow(t, 37.20, 39.35);
  const crmFocus = focusWindow(t, 39.40, 41.65);

  return (
    <AbsoluteFill style={{ opacity: enterU * outOpacity }}>
      <AbsoluteFill
        style={{
          transform: `translate(${camX + cam.tx}px, ${cam.ty}px) scale(${cam.scale})`,
          transformOrigin: "960px 540px",
          filter: blurOut > 0.2 ? `blur(${blurOut}px)` : "none",
        }}
      >
        <SamyojAppShell
          x={140}
          y={195}
          width={1640}
          height={805}
          radius={22}
          activeNav="facebook"
          pageTitle="Facebook · Messenger"
          liveBadge
          channelIcon="facebook"
          accentColor={C.fbBlue}
          pulseScale={voPulse(t, 36.95)}
          headerChips={
            <>
              <Chip variant="indigo">✦ FB Automation</Chip>
              <Chip variant="gray">24h reply window</Chip>
            </>
          }
        >
          <div style={{ display: "flex", height: "100%", backgroundColor: "#FFFFFF" }}>
            {/* LEFT COLUMN (320px): Messenger Threads + Filter Options */}
            <div
              style={{
                width: 320,
                borderRight: `1.5px solid ${C.lineSoft}`,
                padding: "16px 14px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                backgroundColor: "#FFFFFF",
                opacity: lerp(1, 0.56, Math.max(chatFocus, crmFocus)),
              }}
            >
              {/* Search + Filter Tabs */}
              <div
                style={{
                  height: 38,
                  borderRadius: 9,
                  border: `1.5px solid ${C.line}`,
                  backgroundColor: C.surface2,
                  padding: "0 12px",
                  display: "flex",
                  alignItems: "center",
                  fontFamily: FONT_INTER,
                  fontSize: 16,
                  color: C.faint,
                }}
              >
                Search Messenger...
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <Chip variant="indigo" style={{ height: 28, fontSize: 15, paddingLeft: 10, paddingRight: 10 }}>
                  All
                </Chip>
                <Chip variant="gray" style={{ height: 28, fontSize: 15, paddingLeft: 10, paddingRight: 10 }}>
                  Open
                </Chip>
                <Chip variant="gray" style={{ height: 28, fontSize: 15, paddingLeft: 10, paddingRight: 10 }}>
                  Unread
                </Chip>
              </div>

              {/* Conversation Rows */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 2 }}>
                {FB_CONVERSATIONS.map((row) => {
                  const u = seg(t, row.at, row.at + 0.25, E_ENTER);
                  return (
                    <div
                      key={row.name}
                      style={{
                        padding: "10px 12px",
                        borderRadius: 10,
                        backgroundColor: row.active ? "#EFF6FF" : "#FFFFFF",
                        border: `1px solid ${row.active ? "#BFDBFE" : C.lineSoft}`,
                        borderLeft: row.active ? `4px solid ${C.fbBlue}` : `1.5px solid ${C.lineSoft}`,
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        opacity: u,
                        transform: `translateY(${lerp(10, 0, u)}px)`,
                      }}
                    >
                      <Avatar initials={row.initials} tone={row.tone} size={40} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontFamily: FONT_INTER, fontSize: 17, fontWeight: 700, color: C.ink }}>
                            {row.name}
                          </span>
                          <span style={{ fontFamily: FONT_INTER, fontSize: 14, color: C.faint }}>
                            {row.time}
                          </span>
                        </div>
                        <div
                          style={{
                            fontFamily: FONT_INTER,
                            fontSize: 15,
                            color: C.muted,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            marginTop: 2,
                          }}
                        >
                          {row.preview}
                        </div>
                        <div style={{ marginTop: 4 }}>
                          <Chip
                            variant={row.badge === "AI Replied" ? "violet" : "green"}
                            style={{ height: 22, fontSize: 13, paddingLeft: 7, paddingRight: 7 }}
                          >
                            {row.badge}
                          </Chip>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* MIDDLE COLUMN (684px): Rich Facebook Messenger Chat + FB Automation + AI Agent */}
            <div
              style={{
                width: 684,
                borderRight: `1.5px solid ${chatFocus > 0.15 ? `${C.fbBlue}44` : C.lineSoft}`,
                display: "flex",
                flexDirection: "column",
                background: chatFocus > 0.15
                  ? "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(244,248,255,0.90) 100%)"
                  : "#FCFCFD",
                opacity: lerp(1, 0.62, crmFocus),
                transform: `scale(${lerp(1, 1.01, chatFocus)})`,
                transformOrigin: "center top",
                boxShadow: chatFocus > 0.05 ? "inset 0 1px 0 rgba(255,255,255,0.95)" : "none",
                zIndex: chatFocus > 0.05 ? 25 : 1,
              }}
            >
              {/* Chat Header with AI Agent Toggle & Chat Actions */}
              <div
                style={{
                  height: 68,
                  padding: "0 20px",
                  borderBottom: `1.5px solid ${C.lineSoft}`,
                  backgroundColor: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <ChannelTileIcon kind="messenger" size={36} radius={9} />
                  <div>
                    <div style={{ fontFamily: FONT_INTER, fontSize: 19, fontWeight: 700, color: C.ink }}>
                      Sonal Joshi
                    </div>
                    <div style={{ fontFamily: FONT_INTER, fontSize: 15, color: C.muted }}>
                      Facebook Messenger · Sunrise Studio
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      transform: `scale(${aiAgentOn ? aiAgentPop : t >= 37.9 && t < 37.96 ? 0.92 : 1})`,
                    }}
                  >
                    <Chip
                      variant={aiAgentOn ? "violet" : "gray"}
                      style={{ height: 34, fontSize: 16, fontWeight: 700 }}
                    >
                      {aiAgentOn ? "✦ AI Agent: ON" : "✦ Enable AI Agent"}
                    </Chip>
                  </div>
                  <Chip variant="green" style={{ height: 34, fontSize: 16 }}>
                    Open
                  </Chip>
                </div>
              </div>

              {/* FB Automation Status Strip */}
              <div
                style={{
                  padding: "8px 20px",
                  backgroundColor: "#EFF6FF",
                  borderBottom: "1.5px solid #DBEAFE",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontFamily: FONT_INTER, fontSize: 15, fontWeight: 600, color: C.fbBlue }}>
                  FB Automation: Ad Comment → Welcome DM + Lead Tagging active
                </span>
                <span style={{ fontFamily: FONT_INTER, fontSize: 14, fontWeight: 600, color: C.muted }}>
                  Auto-Sync
                </span>
              </div>

              {/* Chat Conversation Stream (continuous flow across 36.8s -> 41.6s) */}
              <div
                style={{
                  flex: 1,
                  padding: "14px 20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  gap: 10,
                  overflow: "hidden",
                }}
              >
                {/* Msg 1: FB Automation Welcome */}
                {t >= 36.85 && (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 }}>
                    <span style={{ fontFamily: FONT_INTER, fontSize: 13, fontWeight: 600, color: C.fbBlue }}>
                      FB Automation · Welcome Message
                    </span>
                    <div
                      style={{
                        maxWidth: "82%",
                        padding: "9px 14px",
                        borderRadius: "14px 14px 4px 14px",
                        backgroundColor: C.fbBlue,
                        color: "#FFFFFF",
                        fontFamily: FONT_INTER,
                        fontSize: 17,
                        lineHeight: 1.35,
                        transform: `scale(${seg(t, 36.85, 37.12, E_BACK)})`,
                        transformOrigin: "right bottom",
                      }}
                    >
                      Hi Sonal! Thanks for messaging Sunrise Studio. Want our New Year 30% Offer?
                    </div>
                  </div>
                )}

                {/* Msg 2: Customer Reply */}
                {t >= 37.4 && (
                  <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    <div
                      style={{
                        maxWidth: "80%",
                        padding: "9px 14px",
                        borderRadius: "14px 14px 14px 4px",
                        backgroundColor: "#FFFFFF",
                        border: `1.5px solid ${C.line}`,
                        fontFamily: FONT_INTER,
                        fontSize: 17,
                        color: C.ink,
                        lineHeight: 1.35,
                        transform: `scale(${seg(t, 37.4, 37.7, E_BACK)})`,
                        transformOrigin: "left bottom",
                      }}
                    >
                      Yes! Are you open on Sundays and what&apos;s the New Year Offer price?
                    </div>
                  </div>
                )}

                {/* AI Agent Typing Dots */}
                {t >= 38.0 && t < 38.45 && (
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <TypingDots t={t} startSec={38.0} endSec={38.45} color={C.violet} />
                  </div>
                )}

                {/* Msg 3: AI Agent Reply */}
                {t >= 38.45 && (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 }}>
                    <Chip variant="violet" style={{ height: 24, fontSize: 14, paddingLeft: 8, paddingRight: 8 }}>
                      ✦ AI Agent
                    </Chip>
                    <div
                      style={{
                        maxWidth: "84%",
                        padding: "9px 14px",
                        borderRadius: "14px 14px 4px 14px",
                        backgroundColor: C.violetSoft,
                        border: `1px solid ${C.violetBorder}`,
                        fontFamily: FONT_INTER,
                        fontSize: 17,
                        color: C.violetInk,
                        lineHeight: 1.35,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        transform: `scale(${seg(t, 38.45, 38.75, E_BACK)})`,
                        transformOrigin: "right bottom",
                      }}
                    >
                      <span>Open Sundays 6 AM–9 PM! Annual pass is 30% off — just ₹1,749/mo.</span>
                      <AnimatedTick t={t} startSec={38.55} color={C.violet} size={16} strokeWidth={2.5} />
                    </div>
                  </div>
                )}

                {/* Msg 4: Customer Booking Request */}
                {t >= 39.2 && (
                  <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    <div
                      style={{
                        maxWidth: "78%",
                        padding: "9px 14px",
                        borderRadius: "14px 14px 14px 4px",
                        backgroundColor: "#FFFFFF",
                        border: `1.5px solid ${C.line}`,
                        fontFamily: FONT_INTER,
                        fontSize: 17,
                        color: C.ink,
                        lineHeight: 1.35,
                        transform: `scale(${seg(t, 39.2, 39.5, E_BACK)})`,
                        transformOrigin: "left bottom",
                      }}
                    >
                      Love that! Can you reserve Sunday 8 AM for my trial?
                    </div>
                  </div>
                )}

                {/* Msg 5: AI Agent Instant Confirmation */}
                {t >= 40.0 && (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 }}>
                    <div
                      style={{
                        maxWidth: "82%",
                        padding: "9px 14px",
                        borderRadius: "14px 14px 4px 14px",
                        backgroundColor: C.fbBlue,
                        color: "#FFFFFF",
                        fontFamily: FONT_INTER,
                        fontSize: 17,
                        lineHeight: 1.35,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        transform: `scale(${seg(t, 40.0, 40.3, E_BACK)})`,
                        transformOrigin: "right bottom",
                      }}
                    >
                      <span>Done! Sunday 8 AM trial reserved — welcome pass sent!</span>
                      <AnimatedTick t={t} startSec={40.1} color="#FFFFFF" size={16} strokeWidth={2.5} />
                    </div>
                  </div>
                )}
              </div>

              {/* Rich Chat Options & Composer Bar */}
              <div
                style={{
                  borderTop: `1.5px solid ${C.lineSoft}`,
                  backgroundColor: "#FFFFFF",
                  padding: "10px 18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Chip variant="gray" style={{ height: 26, fontSize: 14, paddingLeft: 9, paddingRight: 9 }}>
                    Quick Reply: Offer
                  </Chip>
                  <Chip variant="gray" style={{ height: 26, fontSize: 14, paddingLeft: 9, paddingRight: 9 }}>
                    Book Trial
                  </Chip>
                  <Chip variant="gray" style={{ height: 26, fontSize: 14, paddingLeft: 9, paddingRight: 9 }}>
                    Send Template
                  </Chip>
                  <Chip variant="gray" style={{ height: 26, fontSize: 14, paddingLeft: 9, paddingRight: 9 }}>
                    Assign Agent
                  </Chip>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: FONT_INTER, fontSize: 17, color: C.faint }}>
                    Type a Messenger reply...
                  </span>
                  <div
                    style={{
                      padding: "6px 14px",
                      borderRadius: 9,
                      backgroundColor: C.fbBlue,
                      color: "#FFFFFF",
                      fontFamily: FONT_INTER,
                      fontSize: 16,
                      fontWeight: 600,
                    }}
                  >
                    Send
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT CRM DRAWER (390px): Lead, Labels, Note & Conversation History */}
            <div
              style={{
                width: 390,
                padding: "16px 18px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                background: crmFocus > 0.15
                  ? "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(246,247,255,0.90) 100%)"
                  : "#FFFFFF",
                opacity: lerp(1, 0.60, chatFocus),
                transform: `scale(${lerp(1, 1.012, crmFocus)})`,
                transformOrigin: "right center",
                boxShadow: crmFocus > 0.05 ? "inset 0 1px 0 rgba(255,255,255,0.95)" : "none",
                zIndex: crmFocus > 0.05 ? 25 : 1,
              }}
            >
              {/* Lead Profile + Qualified Stage */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Avatar initials="SJ" tone="blue" size={46} />
                  <div>
                    <div style={{ fontFamily: FONT_INTER, fontSize: 18, fontWeight: 700, color: C.ink }}>
                      Sonal Joshi
                    </div>
                    <div style={{ fontFamily: FONT_INTER, fontSize: 15, color: C.muted }}>
                      Messenger Lead · Owner: Riya
                    </div>
                  </div>
                </div>
                <Chip
                  variant={leadQualified ? "green" : "amber"}
                  style={{ height: 28, fontSize: 15, paddingLeft: 9, paddingRight: 9 }}
                >
                  {leadQualified ? "Qualified" : "New Lead"}
                </Chip>
              </div>

              {/* Labels Section */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontFamily: FONT_INTER, fontSize: 15, fontWeight: 700, color: C.muted }}>
                  LABELS
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  <Chip variant="indigo" style={{ height: 28, fontSize: 15, paddingLeft: 10, paddingRight: 10 }}>
                    FB Ad Lead
                  </Chip>
                  <Chip variant="green" style={{ height: 28, fontSize: 15, paddingLeft: 10, paddingRight: 10 }}>
                    New Year 30%
                  </Chip>
                  {t >= 39.4 && (
                    <div style={{ transform: `scale(${springUnit(t, 39.4)})` }}>
                      <Chip variant="amber" style={{ height: 28, fontSize: 15, paddingLeft: 10, paddingRight: 10 }}>
                        Sunday 8 AM
                      </Chip>
                    </div>
                  )}
                </div>
              </div>

              {/* Internal Note Section */}
              <div
                style={{
                  borderRadius: 10,
                  backgroundColor: "#FEFCE8",
                  border: "1.5px solid #FDE68A",
                  padding: "10px 12px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  minHeight: 74,
                }}
              >
                <span style={{ fontFamily: FONT_INTER, fontSize: 15, fontWeight: 700, color: "#92400E" }}>
                  Internal note
                </span>
                <span style={{ fontFamily: FONT_INTER, fontSize: 16, color: C.ink, lineHeight: 1.35 }}>
                  {t >= 40.1 ? noteTyped.shown : "Team note will save here..."}
                  {t >= 40.1 && noteTyped.caretOn && (
                    <span
                      style={{
                        display: "inline-block",
                        width: 2,
                        height: 16,
                        backgroundColor: C.indigo,
                        verticalAlign: "middle",
                        marginLeft: 2,
                      }}
                    />
                  )}
                </span>
              </div>

              {/* Activity & Conversation History Timeline */}
              <div
                style={{
                  flex: 1,
                  borderTop: `1.5px solid ${C.lineSoft}`,
                  paddingTop: 10,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <span style={{ fontFamily: FONT_INTER, fontSize: 15, fontWeight: 700, color: C.muted }}>
                  ACTIVITY HISTORY
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {HISTORY_EVENTS.map((ev, idx) => {
                    const visible = t >= ev.at;
                    const eu = seg(t, ev.at, ev.at + 0.25, E_ENTER);
                    return (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 8,
                          opacity: visible ? eu : 0.25,
                          transform: `translateY(${visible ? lerp(8, 0, eu) : 0}px)`,
                        }}
                      >
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: 999,
                            backgroundColor: visible ? C.fbBlue : C.placeholder,
                            marginTop: 6,
                            flexShrink: 0,
                          }}
                        />
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontFamily: FONT_INTER, fontSize: 15, fontWeight: 600, color: C.ink }}>
                            {ev.text}
                          </div>
                          <div style={{ fontFamily: FONT_INTER, fontSize: 13, color: C.faint }}>
                            {ev.time}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </SamyojAppShell>
      <CursorOverlay
        t={t}
        visibleStart={37.6}
        visibleEnd={38.2}
        segments={[
          {
            from: [980, 460],
            to: [1225, 305],
            moveStart: 37.65,
            moveEnd: 37.92,
            clickAt: 37.94,
            rippleColor: C.violet,
          },
        ]}
      />
      </AbsoluteFill>

      <CaptionBar
        t={t}
        startSec={36.8}
        endSec={42.0}
        words={[
          { text: "Automate" },
          { text: "Messenger", accentColor: C.fbBlue },
          { text: "with" },
          { text: "AI", accentColor: C.violetText },
          { text: "&" },
          { text: "CRM" },
        ]}
      />
    </AbsoluteFill>
  );
};
