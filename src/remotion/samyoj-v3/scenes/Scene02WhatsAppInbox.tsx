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
  cameraFollow,
  clamp01,
  focusWindow,
  lerp,
  seg,
  springUnit,
  typedSlice,
  voPulse,
} from "../tokens";
import { CaptionBar, CursorOverlay, SuccessBurst } from "../components/Effects";
import {
  AnimatedTick,
  Avatar,
  Chip,
  PlaceholderBar,
  PrimaryButton,
  SamyojAppShell,
  TypingDots,
} from "../components/UiKit";

interface RowData {
  id: string;
  initials: string;
  tone: "green" | "indigo" | "pink" | "peach" | "blue";
  name: string;
  preview: string;
  time: string;
  enterAt: number;
  initialSlot: number;
  finalSlot: number;
}

const ROWS: RowData[] = [
  {
    id: "priya",
    initials: "PS",
    tone: "green",
    name: "Priya Sharma",
    preview: "Hi! Do you have a free trial class…",
    time: "now",
    enterAt: 5.55,
    initialSlot: 4,
    finalSlot: 0,
  },
  {
    id: "rahul",
    initials: "RM",
    tone: "indigo",
    name: "Rahul Mehta",
    preview: "Thanks, see you Saturday",
    time: "9:41",
    enterAt: 4.9,
    initialSlot: 0,
    finalSlot: 1,
  },
  {
    id: "ananya",
    initials: "AR",
    tone: "pink",
    name: "Ananya Rao",
    preview: "Can I pause my membership?",
    time: "9:20",
    enterAt: 4.9,
    initialSlot: 1,
    finalSlot: 2,
  },
  {
    id: "arjun",
    initials: "AP",
    tone: "peach",
    name: "Arjun Patel",
    preview: "Payment done ✓",
    time: "Yesterday",
    enterAt: 4.9,
    initialSlot: 2,
    finalSlot: 3,
  },
  {
    id: "neha",
    initials: "NK",
    tone: "blue",
    name: "Neha Kapoor",
    preview: "Is the 7 AM class full?",
    time: "Yesterday",
    enterAt: 5.35,
    initialSlot: 3,
    finalSlot: 4,
  },
];

export const Scene02WhatsAppInbox: React.FC<{ t: number }> = ({ t }) => {
  if (t < 5.05 || t > 16.05) return null;

  const isBg = t >= 11.0;
  const enterU = 1;

  // Subtle cursor & action-tracking camera movement across inbox -> chat/form -> CRM drawer -> call icon
  const cam = cameraFollow(t, [
    { t: 5.05, fx: 960, fy: 540, zoom: 1.00 },
    { t: 5.85, fx: 540, fy: 440, zoom: 1.07 },
    { t: 6.95, fx: 980, fy: 450, zoom: 1.10 },
    { t: 5.10, fx: 960, fy: 540, zoom: 1.00 },
    { t: 5.75, fx: 540, fy: 420, zoom: 1.12 },
    { t: 7.45, fx: 1020, fy: 620, zoom: 1.15 },
    { t: 8.55, fx: 1040, fy: 670, zoom: 1.16 },
    { t: 9.45, fx: 1460, fy: 530, zoom: 1.15 },
    { t: 10.45, fx: 1460, fy: 730, zoom: 1.14 },
    { t: 10.88, fx: 1320, fy: 350, zoom: 1.15 },
    { t: 11.20, fx: 960, fy: 540, zoom: 1.00 },
  ]);
  const camX = cam.tx;
  const camY = cam.ty;
  const camScale = cam.scale;

  // POV Spotlight windows synced to VO: "WhatsApp inbox" -> "Send interactive forms" -> "assign leads & private team notes"
  const listFocus = focusWindow(t, 5.15, 6.45);
  const formFocus = focusWindow(t, 7.15, 9.15);
  const crmFocus = focusWindow(t, 9.20, 10.70);
  const leftOpacity = lerp(1, 0.58, Math.max(formFocus, crmFocus));
  const midOpacity = lerp(1, 0.62, Math.max(listFocus * 0.7, crmFocus));
  const rightOpacity = lerp(1, 0.58, Math.max(listFocus * 0.7, formFocus));

  const bgBlurIn = seg(t, 11.0, 11.45, E_IO);
  const bgFactor = isBg ? bgBlurIn : 0;
  const bgScale = lerp(1.0, 0.96, bgFactor);
  const bgBlur = lerp(0, 8, bgFactor);
  const bgFadeOut = t >= 15.8 ? 1 - seg(t, 15.8, 16.05, E_EXIT) : 1;
  const bgOpacity = lerp(1.0, 0.52, bgFactor) * bgFadeOut;

  const swapU = seg(t, 6.0, 6.3, E_IO);
  const formSlideU = seg(t, 7.5, 8.0, E_ENTER);
  const formZoom =
    t >= 7.9 && t < 9.2
      ? t < 8.55
        ? lerp(1.0, 1.08, seg(t, 7.9, 8.55, E_IO))
        : lerp(1.08, 1.0, seg(t, 8.55, 9.2, E_IO))
      : 1.0;
  const flipDeg = t >= 8.7 ? lerp(0, 180, seg(t, 8.7, 9.1, E_IO)) : 0;
  const showBack = flipDeg >= 90;

  const nameTyped = typedSlice("Priya Sharma", t, 7.8, 35);
  const slotTyped = typedSlice("Sat · 7:00 AM", t, 8.1, 35);
  const noteTyped = typedSlice("Interested in annual plan — follow up Monday.", t, 9.6, 35);

  const assignMenuOpen = t >= 9.3 && t < 9.85;
  const menuOpenU = seg(t, 9.3, 9.48, E_ENTER);
  const menuCloseU = seg(t, 9.75, 9.85, E_EXIT);

  const riyaAssigned = t >= 9.9;
  const riyaPop = springUnit(t, 9.9);
  const riyaRowPop = springUnit(t, 9.95);

  const phonePulse = t >= 10.8 && t < 11.02;
  const phoneMorphU = t >= 10.9 && t < 11.12 ? seg(t, 10.9, 11.08, E_IO) : 0;

  return (
    <AbsoluteFill style={{ opacity: enterU }}>
      <AbsoluteFill
        style={{
          transform: `translate(${camX}px, ${camY}px) scale(${camScale * bgScale})`,
          transformOrigin: "960px 540px",
          filter: bgBlur > 0.1 ? `blur(${bgBlur}px)` : "none",
          opacity: bgOpacity,
        }}
      >
        <SamyojAppShell
          x={140}
          y={195}
          width={1640}
          height={805}
          radius={24}
          activeNav="whatsapp"
          pageTitle="WhatsApp Inbox"
          liveBadge
          channelIcon="whatsapp"
          accentColor={C.waIcon}
          pulseScale={voPulse(t, 5.28)}
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
        >
          <div style={{ display: "flex", height: "100%", position: "relative" }}>
            {/* LEFT CONVERSATION LIST (356px) */}
            <div
              style={{
                width: 356,
                borderRight: `1.5px solid ${listFocus > 0.15 ? `${C.waIcon}55` : C.lineSoft}`,
                position: "relative",
                background: listFocus > 0.15
                  ? "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(244,253,247,0.88) 100%)"
                  : "#FFFFFF",
                opacity: leftOpacity,
                transform: `scale(${lerp(1, 1.01, listFocus)})`,
                transformOrigin: "left center",
                boxShadow: listFocus > 0.05 ? "inset 0 1px 0 rgba(255,255,255,0.95)" : "none",
                zIndex: listFocus > 0.05 ? 25 : 1,
              }}
            >
              <div style={{ position: "absolute", left: 16, top: 18, display: "flex", gap: 8 }}>
                <Chip variant="green">Open</Chip>
                <Chip variant="gray">Pending</Chip>
                <Chip variant="gray">Mine</Chip>
              </div>

              {ROWS.map((row) => {
                if (t < row.enterAt) return null;
                const rEnter = seg(t, row.enterAt, row.enterAt + 0.35, E_ENTER);
                const slot = lerp(row.initialSlot, row.finalSlot, swapU);
                const rowTop = 82 + slot * 116;
                const isSelected = row.id === "priya" && t >= 6.3;

                return (
                  <div
                    key={row.id}
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      top: rowTop,
                      height: 116,
                      paddingLeft: 16,
                      paddingRight: 14,
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      borderBottom: `1.5px solid ${C.lineSoft}`,
                      backgroundColor: isSelected ? C.waRowSelected : "transparent",
                      borderLeft: isSelected ? `4px solid ${C.waIcon}` : "4px solid transparent",
                      opacity: rEnter,
                      transform: `translateY(${lerp(20, 0, rEnter)}px)`,
                    }}
                  >
                    <Avatar initials={row.initials} tone={row.tone} size={48} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 }}>
                        <span
                          style={{
                            fontFamily: FONT_INTER,
                            fontSize: 22,
                            fontWeight: 650,
                            color: C.ink,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {row.name}
                        </span>
                        <span style={{ fontFamily: FONT_INTER, fontSize: 22, color: C.faint, flexShrink: 0 }}>
                          {row.time}
                        </span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4, gap: 6 }}>
                        <span
                          style={{
                            fontFamily: FONT_INTER,
                            fontSize: 22,
                            color: C.muted,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {row.preview}
                        </span>
                        {row.id === "priya" && t >= 6.0 && (
                          <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                            {t >= 9.95 && (
                              <div style={{ transform: `scale(${riyaRowPop})` }}>
                                <Avatar initials="R" tone="pink" size={30} />
                              </div>
                            )}
                            <div style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: C.waIcon }} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* MIDDLE CHAT CANVAS (644px) */}
            <div
              style={{
                width: 644,
                borderRight: `1.5px solid ${formFocus > 0.15 ? `${C.waIcon}45` : C.lineSoft}`,
                position: "relative",
                background: formFocus > 0.15
                  ? "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(246,251,247,0.90) 100%)"
                  : "#FAFBF8",
                opacity: midOpacity,
                transform: `scale(${lerp(1, 1.012, formFocus)})`,
                transformOrigin: "center top",
                boxShadow: formFocus > 0.05 ? "inset 0 1px 0 rgba(255,255,255,0.95)" : "none",
                zIndex: formFocus > 0.05 ? 28 : 1,
              }}
            >
              {/* Chat Header */}
              <div
                style={{
                  height: 78,
                  borderBottom: `1.5px solid ${C.lineSoft}`,
                  paddingLeft: 20,
                  paddingRight: 20,
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
                  <div style={{ position: "relative", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {phonePulse &&
                      [0, 0.5].map((off, idx) => {
                        const rU = clamp01((t - (10.8 + off)) / 0.6);
                        if (rU <= 0 || rU >= 1) return null;
                        const d = lerp(12, 56, rU);
                        return (
                          <div
                            key={idx}
                            style={{
                              position: "absolute",
                              left: 17 - d / 2,
                              top: 17 - d / 2,
                              width: d,
                              height: d,
                              borderRadius: 999,
                              border: `2px solid ${C.waIcon}`,
                              opacity: lerp(0.6, 0, rU),
                            }}
                          />
                        );
                      })}
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                      style={{
                        transform: `scale(${1 + phoneMorphU * 2.2})`,
                        opacity: 1 - phoneMorphU,
                      }}
                    >
                      <path
                        d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.24c1.12.37 2.33.57 3.6.57a1 1 0 011 1V20a1 1 0 01-1 1C10.6 21 3 13.4 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.27.2 2.48.57 3.6a1 1 0 01-.25 1.01L6.6 10.8z"
                        stroke={C.indigo}
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {t >= 6.3 && (
                <div
                  style={{
                    position: "absolute",
                    left: 24,
                    top: 108,
                    width: 520,
                    padding: "14px 18px",
                    borderRadius: "16px 16px 16px 6px",
                    border: "1.5px solid ${C.line}",
                    backgroundColor: "#FFFFFF",
                    boxShadow: SHADOW.resting,
                    fontSize: 22,
                    fontWeight: 500,
                    color: C.ink2,
                    transform: `scale(${seg(t, 6.3, 6.62, E_BACK)})`,
                    transformOrigin: "left bottom",
                    opacity: seg(t, 6.3, 6.45, E_ENTER),
                  }}
                >
                  Hi! Do you have a free trial class this week?
                </div>
              )}

              <div style={{ position: "absolute", right: 24, top: 198 }}>
                <TypingDots t={t} startSec={6.6} endSec={6.9} />
              </div>

              {t >= 6.9 && (
                <div
                  style={{
                    position: "absolute",
                    right: 24,
                    top: 198,
                    width: 520,
                    padding: "14px 18px",
                    borderRadius: "16px 16px 6px 16px",
                    backgroundColor: C.waBubbleOut,
                    boxShadow: SHADOW.resting,
                    fontSize: 22,
                    fontWeight: 500,
                    color: C.ink,
                    transform: `scale(${seg(t, 6.9, 7.22, E_BACK)})`,
                    transformOrigin: "right bottom",
                    opacity: seg(t, 6.9, 7.05, E_ENTER),
                  }}
                >
                  Yes! Saturday has open slots. Book here ↓
                </div>
              )}

              {/* WhatsApp Form Card */}
              {t >= 7.5 && t < 15.2 && (
                <div
                  style={{
                    position: "absolute",
                    left: 230,
                    top: lerp(750, 320, formSlideU),
                    width: 388,
                    perspective: 900,
                    transform: `scale(${formZoom})`,
                    transformOrigin: "center center",
                    opacity: t >= 14.9 ? 1 - seg(t, 14.9, 15.2, E_EXIT) : 1,
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      borderRadius: 16,
                      backgroundColor: "#FFFFFF",
                      border: `1.5px solid ${C.line}`,
                      boxShadow: SHADOW.resting,
                      padding: 18,
                      transform: `rotateY(${showBack ? flipDeg - 180 : flipDeg}deg)`,
                    }}
                  >
                    {!showBack ? (
                      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                          <span style={{ fontSize: 22, fontWeight: 650, color: C.ink }}>
                            Book a trial class
                          </span>
                          <Chip variant="green">WhatsApp Form</Chip>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                          <span style={{ fontSize: 22, fontWeight: 500, color: C.muted }}>Name</span>
                          <div
                            style={{
                              height: 46,
                              borderRadius: 9,
                              border: `1.5px solid ${C.line}`,
                              paddingLeft: 14,
                              paddingRight: 14,
                              display: "flex",
                              alignItems: "center",
                              fontSize: 22,
                              color: C.ink,
                              backgroundColor: C.surface2,
                            }}
                          >
                            <span>{nameTyped.shown}</span>
                            {nameTyped.caretOn && (
                              <span style={{ width: 2, height: 24, backgroundColor: C.indigo, marginLeft: 2 }} />
                            )}
                          </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                          <span style={{ fontSize: 22, fontWeight: 500, color: C.muted }}>Slot</span>
                          <div
                            style={{
                              height: 46,
                              borderRadius: 9,
                              border: `1.5px solid ${C.line}`,
                              paddingLeft: 14,
                              paddingRight: 14,
                              display: "flex",
                              alignItems: "center",
                              fontSize: 22,
                              color: C.ink,
                              backgroundColor: C.surface2,
                            }}
                          >
                            <span>{slotTyped.shown}</span>
                            {slotTyped.caretOn && (
                              <span style={{ width: 2, height: 24, backgroundColor: C.indigo, marginLeft: 2 }} />
                            )}
                          </div>
                        </div>
                        <PrimaryButton
                          style={{
                            width: "100%",
                            height: 48,
                            transform: `scale(${t >= 8.6 && t < 8.68 ? 0.85 : 1})`,
                          }}
                        >
                          Submit
                        </PrimaryButton>
                      </div>
                    ) : (
                      <div
                        style={{
                          padding: "16px 8px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 12,
                          textAlign: "center",
                        }}
                      >
                        <Chip variant="green" style={{ height: 42, paddingLeft: 18, paddingRight: 18 }}>
                          <span>Booking confirmed</span>
                          <AnimatedTick t={t} startSec={8.9} color={C.greenText} size={22} />
                        </Chip>
                        <div style={{ fontFamily: FONT_INTER, fontSize: 20, fontWeight: 650, color: C.ink }}>
                          Priya Sharma · Sat 7:00 AM
                        </div>
                        <div style={{ fontFamily: FONT_INTER, fontSize: 18, fontWeight: 500, color: C.muted }}>
                          Trial pass sent on WhatsApp
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <SuccessBurst
                t={t}
                startSec={8.95}
                x={424}
                y={450}
                colors={[C.waIcon, C.successGreen, C.greenText]}
                count={8}
              />
            </div>

            {/* RIGHT CONTACT DRAWER (394px) — detailed Assign, Labels, AI Chatbot, Tickets, Internal Note */}
            <div
              style={{
                width: 394,
                padding: "18px 20px",
                position: "relative",
                background: crmFocus > 0.15
                  ? "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(246,247,255,0.90) 100%)"
                  : "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                gap: 14,
                opacity: rightOpacity,
                transform: `scale(${lerp(1, 1.012, crmFocus)})`,
                transformOrigin: "right center",
                boxShadow: crmFocus > 0.05 ? "inset 0 1px 0 rgba(255,255,255,0.95)" : "none",
                zIndex: crmFocus > 0.05 ? 28 : 1,
              }}
            >
              {/* Contact Header */}
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <Avatar initials="PS" tone="green" size={58} />
                <div>
                  <div style={{ fontSize: 25, fontWeight: 650, color: C.ink }}>Priya Sharma</div>
                  <div style={{ fontSize: 22, fontWeight: 500, color: C.muted, marginTop: 2 }}>
                    +91 ••••• ••210
                  </div>
                </div>
              </div>

              {/* Assign Row */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative" }}>
                <Chip variant="indigoOutline" style={{ height: 42, paddingLeft: 16, paddingRight: 16 }}>
                  Assign
                </Chip>
                {riyaAssigned && (
                  <div style={{ display: "flex", alignItems: "center", gap: 10, transform: `scale(${riyaPop})` }}>
                    <Avatar initials="R" tone="pink" size={38} />
                    <span style={{ fontSize: 22, fontWeight: 600, color: C.ink }}>Riya</span>
                  </div>
                )}

                {assignMenuOpen && (
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 48,
                      width: 196,
                      borderRadius: 12,
                      backgroundColor: "#FFFFFF",
                      border: `1.5px solid ${C.line}`,
                      boxShadow: SHADOW.hero,
                      padding: 8,
                      zIndex: 80,
                      opacity: menuOpenU * (1 - menuCloseU),
                      transform: `scale(${lerp(0.95, 1, menuOpenU)})`,
                    }}
                  >
                    {["Kabir", "Riya", "Meera", "Dev"].map((member) => (
                      <div
                        key={member}
                        style={{
                          padding: "8px 14px",
                          borderRadius: 8,
                          fontSize: 22,
                          fontWeight: 500,
                          color: C.ink,
                          backgroundColor: member === "Riya" && t >= 9.6 ? C.indigoSoft : "transparent",
                        }}
                      >
                        {member}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Labels Row */}
              <div>
                <div style={{ fontSize: 22, fontWeight: 600, color: C.muted, marginBottom: 8 }}>
                  Labels
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {t >= 10.0 && (
                    <div style={{ transform: `scale(${seg(t, 10.0, 10.3, E_BACK)})` }}>
                      <Chip variant="indigo">New lead</Chip>
                    </div>
                  )}
                  {t >= 10.1 && (
                    <div style={{ transform: `scale(${seg(t, 10.1, 10.4, E_BACK)})` }}>
                      <Chip variant="green">Trial</Chip>
                    </div>
                  )}
                </div>
              </div>

              {/* AI Chatbot & Calling AI Options */}
              <div>
                <div style={{ fontSize: 22, fontWeight: 600, color: C.muted, marginBottom: 8 }}>
                  AI Chatbot
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Chip variant="violet">✦ Chat AI</Chip>
                  <Chip variant="indigo">Calling AI</Chip>
                </div>
              </div>

              {/* Tickets Section */}
              <div
                style={{
                  borderRadius: 12,
                  border: `1.5px solid ${C.line}`,
                  backgroundColor: C.surface2,
                  padding: "12px 14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 8,
                }}
              >
                <div>
                  <div style={{ fontSize: 22, fontWeight: 650, color: C.ink }}>
                    Ticket #104
                  </div>
                  <div style={{ fontSize: 22, color: C.muted }}>
                    Trial class inquiry
                  </div>
                </div>
                <Chip variant="amber">Open</Chip>
              </div>

              {/* Internal Note Card */}
              {t >= 9.2 && (
                <div
                  style={{
                    borderRadius: 12,
                    backgroundColor: C.noteFill,
                    border: `1px solid ${C.noteBorder}`,
                    padding: "14px 16px",
                    opacity: seg(t, 9.2, 9.6, E_ENTER),
                    transform: `translateX(${lerp(80, 0, seg(t, 9.2, 9.6, E_ENTER))}px)`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <rect x="5" y="11" width="14" height="9" rx="2" stroke={C.noteText} strokeWidth={2} />
                      <path d="M8 11V8a4 4 0 118 0v3" stroke={C.noteText} strokeWidth={2} strokeLinecap="round" />
                    </svg>
                    <span style={{ fontSize: 22, fontWeight: 650, color: C.noteText }}>
                      Internal note
                    </span>
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 500, color: C.noteText, lineHeight: 1.32, minHeight: 82 }}>
                    <span>{noteTyped.shown}</span>
                    {noteTyped.caretOn && (
                      <span style={{ display: "inline-block", width: 2, height: 22, backgroundColor: C.indigo, verticalAlign: "middle", marginLeft: 2 }} />
                    )}
                  </div>
                  {t >= 10.85 && (
                    <div
                      style={{
                        fontSize: 22,
                        fontWeight: 500,
                        color: C.muted,
                        marginTop: 4,
                        opacity: seg(t, 10.85, 11.0, E_ENTER),
                      }}
                    >
                      Only your team sees this
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </SamyojAppShell>

        {!isBg && (
          <CursorOverlay
            t={t}
            visibleStart={8.0}
            visibleEnd={11.0}
            segments={[
              {
                from: [1060, 700],
                to: [1156, 856],
                moveStart: 8.0,
                moveEnd: 8.55,
                clickAt: 8.6,
                rippleColor: C.waIcon,
              },
              {
                from: [1156, 856],
                to: [1316, 382],
                moveStart: 8.75,
                moveEnd: 9.18,
                clickAt: 9.2,
                rippleColor: C.indigo,
              },
              {
                from: [1316, 382],
                to: [1316, 488],
                moveStart: 9.3,
                moveEnd: 9.68,
                clickAt: 9.7,
                rippleColor: C.indigo,
              },
              {
                from: [1316, 488],
                to: [1349, 308],
                moveStart: 10.42,
                moveEnd: 10.84,
                clickAt: 10.88,
                rippleColor: C.waIcon,
              },
            ]}
          />
        )}
      </AbsoluteFill>

      {!isBg && (
        <CaptionBar
          t={t}
          startSec={5.0}
          endSec={11.0}
          words={[
            { text: "One" },
            { text: "team" },
            { text: "inbox" },
            { text: "for" },
            { text: "WhatsApp", accentColor: C.greenText },
          ]}
        />
      )}
    </AbsoluteFill>
  );
};
