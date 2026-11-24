import React from "react";
import { useCurrentFrame } from "remotion";
import { THEME } from "../theme";
import { FONTS } from "../fonts";
import { AppShell } from "../ui/AppShell";
import { CameraRig } from "../motion/CameraRig";
import { OrganicCursor } from "../ui/Cursor";
import { EditorialSplit } from "../motion/KineticText";
import { easeRange, enterTriad, outExpo } from "../motion/easing";
import { IconEmail, IconInstagram, IconMessenger, IconWhatsApp } from "../ui/SamyojIcons";

const THREADS = [
  { id: "meera", name: "Meera Patel", init: "MP", bg: "#7C3AED", preview: "Hi, is Size 9 Indigo Runner available?", time: "06:12 AM", ch: "WhatsApp", unread: true, tag: "Open" },
  { id: "sumit", name: "Sumit Mathur", init: "SM", bg: "#A855F7", preview: "Need automation for IG & WhatsApp leads", time: "Just now", ch: "WhatsApp", unread: true, tag: "Open" },
  { id: "rohan", name: "Rohan Kapoor", init: "RK", bg: "#EC4899", preview: "Commented: Price & shipping to Pune?", time: "2m", ch: "Instagram", unread: true, tag: "Open" },
  { id: "aarav", name: "Aarav Verma", init: "AV", bg: "#2563EB", preview: "Order status please — paid yesterday", time: "6m", ch: "Messenger", unread: false, tag: "Open" },
  { id: "sanya", name: "Sanya Nair", init: "SN", bg: "#F59E0B", preview: "Re: Bulk team sneaker order quote", time: "14m", ch: "Email", unread: true, tag: "Open" },
  { id: "abhay", name: "Abhay Hiwse", init: "AH", bg: "#10B981", preview: "Hi! Confirmed my address for delivery", time: "22m", ch: "WhatsApp", unread: false, tag: "Open" },
  { id: "aarti", name: "Aarti Jethaniya", init: "AJ", bg: "#EF4444", preview: "Can I schedule a demo call today?", time: "35m", ch: "Instagram", unread: false, tag: "Open" },
];

/**
 * S04 Unified Inbox (16.03s -> 25.80s, 596f)
 * Built directly from the user's real Samyoj Inbox screenshot:
 * - Authentic 3-column layout + filter chips (All | Active | Unread | Unreplied | Open)
 * - Real WhatsApp sand/doodle wallpaper (#EFEAE2) + soft green outgoing bubbles (#D9FDD3) + blue ticks
 * - Bottom Reply | Template | Interactive composer
 * - VO-locked clicks: Unread filter @ f=385, Send reply @ f=485
 */
export const S04Inbox: React.FC = () => {
  const frame = useCurrentFrame();

  const shellIn = enterTriad(frame, 4, 20, { y: 18, scaleFrom: 0.96, blurFrom: 5 });

  // Exact VO cue sync:
  // f=385: "where you filter unread leads" -> clicks "Unread" pill
  // f=495: "and reply in seconds" -> sends green WhatsApp reply bubble + zoom onto conversation
  const filterUnreadClicked = frame >= 385;
  const replySent = frame >= 492;
  const replyPop = easeRange(frame, 492, 514, outExpo);

  const visibleThreads = filterUnreadClicked
    ? THREADS.filter((t) => t.unread)
    : THREADS;

  const camKeyframes = [
    { frame: 0,   scale: 0.99, x: 0,    y: 0 },
    { frame: 160, scale: 1.0,  x: 0,    y: 0 },
    { frame: 365, scale: 1.18, x: 185,  y: 70 },  // Focus on Inbox filter bar ("filter unread leads")
    { frame: 435, scale: 1.18, x: 185,  y: 70 },
    { frame: 495, scale: 1.24, x: -120, y: -30 }, // Glide cleanly onto WhatsApp chat + Reply bubble ("reply in seconds")
    { frame: 560, scale: 1.24, x: -120, y: -30 },
    { frame: 596, scale: 1.04, x: 0,    y: 0 },
  ];

  // Authentic cursor waypoints matching UI coordinates
  const cursorWaypoints = [
    { frame: 40,  x: 1120, y: 740 },
    { frame: 180, x: 510,  y: 350 },
    { frame: 250, x: 510,  y: 350 },
    { frame: 365, x: 518,  y: 235 }, // "Unread" filter chip
    { frame: 405, x: 518,  y: 235 },
    { frame: 475, x: 1495, y: 892 }, // "Send" button
    { frame: 545, x: 1320, y: 580 },
  ];

  const channelIcon = (ch: string) => {
    if (ch === "WhatsApp") return <IconWhatsApp size={12} />;
    if (ch === "Instagram") return <IconInstagram size={12} />;
    if (ch === "Messenger") return <IconMessenger size={12} />;
    return <IconEmail size={12} />;
  };

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <CameraRig frame={frame} keyframes={camKeyframes}>
        {/* Top Editorial Caption */}
        <div
          style={{
            position: "absolute",
            left: 110,
            top: 42,
            right: 110,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <EditorialSplit
            frame={frame}
            startFrame={4}
            lead="Every channel."
            accent="One inbox."
            accentColor={THEME.brand}
            fontSize={46}
          />
          <div
            style={{
              padding: "9px 18px",
              borderRadius: 999,
              background: "#FFFFFF",
              border: `1px solid ${THEME.hairline}`,
              boxShadow: THEME.shadowE1,
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontFamily: FONTS.mono,
              fontSize: 12.5,
              fontWeight: 700,
              color: THEME.ink2,
            }}
          >
            <IconWhatsApp size={16} />
            <IconInstagram size={16} />
            <IconMessenger size={16} />
            <IconEmail size={16} />
            <span>WHATSAPP · IG · FB · EMAIL</span>
          </div>
        </div>

        {/* Real Samyoj Inbox AppShell */}
        <div style={{ position: "absolute", left: 110, top: 116, ...shellIn.style }}>
          <AppShell activeTab="Inbox" pageTitle="Inbox" pageSubtitle="Reply to your customers across all channels">
            <div style={{ height: "100%", display: "grid", gridTemplateColumns: "340px 1fr 48px" }}>
              {/* Conversation List Column matching screenshot */}
              <div
                style={{
                  borderRight: `1px solid ${THEME.hairline}`,
                  background: "#FFFFFF",
                  padding: "12px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontFamily: FONTS.display, fontSize: 15, fontWeight: 700, color: THEME.ink }}>
                      Inbox <span style={{ color: "#16A34A" }}>•</span>
                    </div>
                    <div style={{ fontFamily: FONTS.mono, fontSize: 10.5, color: THEME.ink3 }}>
                      {visibleThreads.length} conversations
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span
                      style={{
                        padding: "4px 9px",
                        borderRadius: 8,
                        border: `1px solid ${THEME.hairline}`,
                        fontFamily: FONTS.ui,
                        fontSize: 11,
                        fontWeight: 600,
                        color: THEME.ink2,
                      }}
                    >
                      Support ⌄
                    </span>
                    <span
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 7,
                        background: "#16A34A",
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: 15,
                      }}
                    >
                      +
                    </span>
                  </div>
                </div>

                {/* Search Inbox */}
                <div
                  style={{
                    height: 32,
                    borderRadius: 8,
                    border: `1px solid ${THEME.hairline}`,
                    background: "#F8FAFC",
                    padding: "0 10px",
                    display: "flex",
                    alignItems: "center",
                    fontFamily: FONTS.ui,
                    fontSize: 12,
                    color: THEME.ink3,
                  }}
                >
                  🔍 Search Inbox
                </div>

                {/* Filter Chips matching screenshot */}
                <div style={{ display: "flex", gap: 5, flexWrap: "nowrap" }}>
                  {[
                    { id: "All", active: !filterUnreadClicked },
                    { id: "Active", active: false },
                    { id: "Unread", active: filterUnreadClicked },
                    { id: "Unreplied", active: false },
                    { id: "Open", active: false },
                  ].map((chip) => (
                    <span
                      key={chip.id}
                      style={{
                        padding: "4px 9px",
                        borderRadius: 7,
                        background: chip.active ? "#15803D" : "#F1F5F9",
                        color: chip.active ? "#FFFFFF" : THEME.ink2,
                        fontFamily: FONTS.ui,
                        fontSize: 11,
                        fontWeight: chip.active ? 700 : 500,
                      }}
                    >
                      {chip.id}
                    </span>
                  ))}
                </div>

                {/* Thread Cards */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {visibleThreads.map((t, idx) => {
                    const selected = idx === 0;
                    return (
                      <div
                        key={t.id}
                        style={{
                          padding: "9px 10px",
                          borderRadius: 12,
                          background: selected ? "#ECFDF5" : "#FFFFFF",
                          border: selected ? "1.5px solid #22C55E" : `1px solid ${THEME.hairline}`,
                          display: "flex",
                          gap: 10,
                          alignItems: "flex-start",
                        }}
                      >
                        <div style={{ position: "relative", flexShrink: 0 }}>
                          <div
                            style={{
                              width: 34,
                              height: 34,
                              borderRadius: "50%",
                              background: t.bg,
                              color: "#FFFFFF",
                              fontFamily: FONTS.mono,
                              fontSize: 11.5,
                              fontWeight: 700,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {t.init}
                          </div>
                          <div
                            style={{
                              position: "absolute",
                              right: -1,
                              bottom: -1,
                              width: 10,
                              height: 10,
                              borderRadius: "50%",
                              background: "#22C55E",
                              border: "1.5px solid #FFFFFF",
                            }}
                          />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontFamily: FONTS.ui, fontSize: 12.5, fontWeight: 700, color: THEME.ink }}>
                              {t.name}
                            </span>
                            <span style={{ fontFamily: FONTS.mono, fontSize: 10, color: THEME.ink3 }}>{t.time}</span>
                          </div>
                          <div
                            style={{
                              fontFamily: FONTS.ui,
                              fontSize: 11.5,
                              color: THEME.ink2,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              marginTop: 2,
                            }}
                          >
                            {t.preview}
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                            <span
                              style={{
                                padding: "1px 7px",
                                borderRadius: 6,
                                background: "#DCFCE7",
                                color: "#15803D",
                                fontFamily: FONTS.ui,
                                fontSize: 10,
                                fontWeight: 700,
                              }}
                            >
                              {t.tag}
                            </span>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontFamily: FONTS.mono, fontSize: 9.5, color: THEME.ink3 }}>
                              {channelIcon(t.ch)}
                              {t.ch}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Authentic WhatsApp Sand/Doodle Chat Panel matching screenshot */}
              <div style={{ display: "flex", flexDirection: "column", background: "#EFEAE2", position: "relative" }}>
                {/* Subtle chat pattern overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: "radial-gradient(rgba(15,23,42,0.045) 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                    pointerEvents: "none",
                  }}
                />

                {/* Chat Header */}
                <div
                  style={{
                    height: 58,
                    background: "#FFFFFF",
                    borderBottom: `1px solid ${THEME.hairline}`,
                    padding: "0 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        background: "#7C3AED",
                        color: "#FFFFFF",
                        fontFamily: FONTS.mono,
                        fontSize: 12,
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      MP
                    </div>
                    <div>
                      <div style={{ fontFamily: FONTS.ui, fontSize: 14, fontWeight: 700, color: THEME.ink }}>Meera Patel</div>
                      <div style={{ fontFamily: FONTS.mono, fontSize: 10.5, color: THEME.ink3 }}>+91 98••• ••410 · WhatsApp Cloud API</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span
                      style={{
                        padding: "5px 12px",
                        borderRadius: 999,
                        background: "#DCFCE7",
                        color: "#15803D",
                        fontFamily: FONTS.ui,
                        fontSize: 11.5,
                        fontWeight: 700,
                      }}
                    >
                      ● Open · Assigned: Rohan
                    </span>
                    <span style={{ padding: "5px 10px", borderRadius: 8, border: `1px solid ${THEME.hairline}`, background: "#FFFFFF", fontFamily: FONTS.ui, fontSize: 11.5, color: THEME.ink2 }}>
                      Support ⌄
                    </span>
                  </div>
                </div>

                {/* Messages */}
                <div style={{ flex: 1, padding: "24px 28px", display: "flex", flexDirection: "column", gap: 14, position: "relative", zIndex: 2 }}>
                  {/* Incoming white bubble */}
                  <div
                    style={{
                      alignSelf: "flex-start",
                      maxWidth: 500,
                      padding: "12px 16px",
                      borderRadius: "4px 16px 16px 16px",
                      background: "#FFFFFF",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
                    }}
                  >
                    <div style={{ fontFamily: FONTS.ui, fontSize: 14.5, color: THEME.ink }}>
                      Hi, is Size 9 Indigo Runner available? Looking for fast delivery to Bengaluru.
                    </div>
                    <div style={{ fontFamily: FONTS.mono, fontSize: 10.5, color: THEME.ink3, marginTop: 5, textAlign: "right" }}>
                      06:12 AM
                    </div>
                  </div>

                  {/* Interactive Catalog List Preview Bubble (authentic to image-8!) */}
                  <div
                    style={{
                      alignSelf: "flex-end",
                      width: 390,
                      padding: "12px 14px",
                      borderRadius: "16px 4px 16px 16px",
                      background: "#D9FDD3",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
                    }}
                  >
                    <div style={{ fontFamily: FONTS.ui, fontSize: 13.5, fontWeight: 700, color: "#064E3B", marginBottom: 6 }}>
                      Indigo Runner — Size Availability
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.65)", borderRadius: 10, padding: "8px 10px", fontFamily: FONTS.ui, fontSize: 12.5, color: THEME.ink }}>
                      <div>✓ UK Size 9 — In Stock (Same-day dispatch)</div>
                      <div style={{ color: THEME.ink3, marginTop: 2 }}>✓ UK Size 10 — In Stock</div>
                    </div>
                    <div style={{ fontFamily: FONTS.mono, fontSize: 10.5, color: "#15803D", marginTop: 6, textAlign: "right" }}>
                      06:12 AM ✓✓
                    </div>
                  </div>

                  {/* Live sent WhatsApp Green Bubble */}
                  {replySent ? (
                    <div
                      style={{
                        alignSelf: "flex-end",
                        maxWidth: 520,
                        padding: "12px 16px",
                        borderRadius: "16px 4px 16px 16px",
                        background: "#D9FDD3",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.09)",
                        opacity: replyPop,
                        transform: `translate3d(0, ${((1 - replyPop) * 14).toFixed(1)}px, 0)`,
                      }}
                    >
                      <div style={{ fontFamily: FONTS.ui, fontSize: 14.5, color: "#064E3B", fontWeight: 500 }}>
                        Yes Meera! UK Size 9 is reserved for you. Confirming your dispatch details via email &amp; WhatsApp right now.
                      </div>
                      <div style={{ fontFamily: FONTS.mono, fontSize: 10.5, color: "#0284C7", marginTop: 5, textAlign: "right", fontWeight: 700 }}>
                        06:12 AM · Replied in 3.2s ✓✓
                      </div>
                    </div>
                  ) : null}
                </div>

                {/* Bottom Reply | Template | Interactive Composer matching screenshot */}
                <div style={{ background: "#FFFFFF", borderTop: `1px solid ${THEME.hairline}`, padding: "8px 18px 12px", position: "relative", zIndex: 2 }}>
                  <div style={{ display: "flex", gap: 18, borderBottom: `1px solid ${THEME.hairline}`, paddingBottom: 6, marginBottom: 8 }}>
                    {[
                      { label: "Reply", active: true },
                      { label: "Template", active: false },
                      { label: "Interactive", active: false },
                    ].map((t) => (
                      <span
                        key={t.label}
                        style={{
                          fontFamily: FONTS.ui,
                          fontSize: 12,
                          fontWeight: t.active ? 700 : 500,
                          color: t.active ? "#16A34A" : THEME.ink3,
                          borderBottom: t.active ? "2px solid #16A34A" : "none",
                          paddingBottom: 4,
                        }}
                      >
                        {t.label}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                    <div style={{ flex: 1, fontFamily: FONTS.ui, fontSize: 13, color: replySent ? THEME.ink3 : THEME.ink }}>
                      {replySent ? "Type a reply or / for templates..." : "Yes Meera! UK Size 9 is reserved for you..."}
                    </div>
                    <div
                      style={{
                        padding: "8px 20px",
                        borderRadius: 10,
                        background: "#16A34A",
                        color: "#FFFFFF",
                        fontFamily: FONTS.ui,
                        fontSize: 13,
                        fontWeight: 700,
                      }}
                    >
                      Send
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Quick-Action Icon Rail matching screenshot */}
              <div
                style={{
                  borderLeft: `1px solid ${THEME.hairline}`,
                  background: "#FFFFFF",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingTop: 14,
                  gap: 14,
                  fontSize: 15,
                  color: THEME.ink2,
                }}
              >
                {["🏷️", "📝", "#", "🎫", "↓"].map((ic, i) => (
                  <div
                    key={i}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      background: i === 0 ? THEME.tintBrand : "#F8FAFC",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {ic}
                  </div>
                ))}
              </div>
            </div>
          </AppShell>
        </div>

        <OrganicCursor frame={frame} waypoints={cursorWaypoints} clickFrames={[385, 492]} />
      </CameraRig>
    </div>
  );
};
