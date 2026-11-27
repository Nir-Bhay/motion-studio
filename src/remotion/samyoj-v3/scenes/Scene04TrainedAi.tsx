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
  quadPath,
  seg,
  typedSlice,
  voPulse,
} from "../tokens";
import { CaptionBar, CursorOverlay, SuccessBurst } from "../components/Effects";
import {
  AnimatedTick,
  ChannelTileIcon,
  Chip,
  PrimaryButton,
  SamyojAppShell,
  ToggleSwitch,
  TypingDots,
} from "../components/UiKit";

interface PdfDoc {
  label: string;
  size: string;
  badge: string;
  color: string;
  bg: string;
  dragStart: number;
  dragEnd: number;
  slotX: number;
}

const FILES: PdfDoc[] = [
  {
    label: "Pricing.pdf",
    size: "420 KB",
    badge: "PDF",
    color: "#DC2626",
    bg: "#FEF2F2",
    dragStart: 16.14,
    dragEnd: 16.50,
    slotX: 590,
  },
  {
    label: "Class-Schedule.pdf",
    size: "280 KB",
    badge: "PDF",
    color: "#EA580C",
    bg: "#FFF7ED",
    dragStart: 16.52,
    dragEnd: 16.88,
    slotX: 980,
  },
  {
    label: "FAQs · 24 answers",
    size: "190 KB",
    badge: "FAQ",
    color: C.indigo,
    bg: "#EEF2FF",
    dragStart: 16.90,
    dragEnd: 17.24,
    slotX: 1370,
  },
];

const TOPIC_BARS = [
  { name: "Pricing & Plans", pct: 100, color: C.indigo, at: 17.28 },
  { name: "Class Timings & Batches", pct: 100, color: C.violet, at: 17.42 },
  { name: "Trial Rules & FAQs", pct: 100, color: C.waIcon, at: 17.56 },
];

export const Scene04TrainedAi: React.FC<{ t: number }> = ({ t }) => {
  if (t < 15.95 || t > 21.2) return null;

  const enterU = seg(t, 16.0, 16.22, E_ENTER);
  const followLineX = t >= 20.8 ? lerp(0, -120, seg(t, 20.8, 21.1, E_IO)) : 0;
  const exitFade = t >= 20.9 ? 1 - seg(t, 20.9, 21.15, E_EXIT) : 1;

  // Subtle camera focus following PDF drag-and-drop -> Test Chat -> bottom typing -> live chat toggle
  const cam = cameraFollow(t, [
    { t: 16.00, fx: 960, fy: 540, zoom: 1.00 },
    { t: 16.45, fx: 920, fy: 560, zoom: 1.09 },
    { t: 17.24, fx: 980, fy: 540, zoom: 1.10 },
    { t: 17.98, fx: 1260, fy: 460, zoom: 1.10 },
    { t: 18.75, fx: 1320, fy: 700, zoom: 1.11 },
    { t: 19.60, fx: 1320, fy: 620, zoom: 1.10 },
    { t: 20.24, fx: 1340, fy: 780, zoom: 1.10 },
    { t: 20.80, fx: 960, fy: 540, zoom: 1.00 },
  ]);

  const kbFocus = focusWindow(t, 16.20, 17.85);
  const testFocus = focusWindow(t, 17.95, 20.65);

  // Immediate processing right after 3rd file drops (17.24 -> 17.78)
  const progressU = seg(t, 17.24, 17.76, E_IO);
  const trained = t >= 17.76;

  // User clicks "Test Chat" at 17.98s -> Testing Sidebar opens fast (18.00 - 18.30s)
  const testOpenU = seg(t, 18.00, 18.30, E_IO);
  const sidebarW = lerp(0, 470, testOpenU);

  // Fast typing inside the Testing Sidebar bottom input (18.54 - 19.04s)
  const msgSent = t >= 19.08;
  const questionTyped = !msgSent
    ? typedSlice("How much is the monthly plan?", t, 18.54, 62)
    : { shown: "", caretOn: false };

  const shootU = seg(t, 20.78, 21.05, E_IO);

  // Compute cursor position across all fast drag-and-drop & test actions
  const dragFrom: [number, number] = [1670, 740];
  const slotY = 535;

  const cursorSegments = [
    // Drag 1: Pricing.pdf
    { from: [1520, 620] as [number, number], to: dragFrom, moveStart: 16.02, moveEnd: 16.14 },
    { from: dragFrom, to: [FILES[0].slotX, slotY] as [number, number], moveStart: 16.14, moveEnd: 16.50, clickAt: 16.50, rippleColor: C.indigo },
    // Drag 2: Class-Schedule.pdf
    { from: [FILES[0].slotX, slotY] as [number, number], to: dragFrom, moveStart: 16.50, moveEnd: 16.56 },
    { from: dragFrom, to: [FILES[1].slotX, slotY] as [number, number], moveStart: 16.56, moveEnd: 16.88, clickAt: 16.88, rippleColor: C.indigo },
    // Drag 3: FAQs
    { from: [FILES[1].slotX, slotY] as [number, number], to: dragFrom, moveStart: 16.88, moveEnd: 16.94 },
    { from: dragFrom, to: [FILES[2].slotX, slotY] as [number, number], moveStart: 16.94, moveEnd: 17.24, clickAt: 17.24, rippleColor: C.indigo },
    // Fast move to Test Chat button & click
    { from: [FILES[2].slotX, slotY] as [number, number], to: [1676, 404] as [number, number], moveStart: 17.72, moveEnd: 17.96, clickAt: 17.98, rippleColor: C.indigo },
    // Fast move to bottom typing input inside Testing Sidebar & click
    { from: [1676, 404] as [number, number], to: [1485, 848] as [number, number], moveStart: 18.28, moveEnd: 18.50, clickAt: 18.52, rippleColor: C.violet },
    // Fast move to Send icon inside Testing Sidebar & click
    { from: [1485, 848] as [number, number], to: [1725, 848] as [number, number], moveStart: 18.96, moveEnd: 19.06, clickAt: 19.08, rippleColor: C.indigo },
    // Fast move to AI on live chat toggle & click
    { from: [1725, 848] as [number, number], to: [1705, 932] as [number, number], moveStart: 19.95, moveEnd: 20.22, clickAt: 20.24, rippleColor: C.waIcon },
  ];

  return (
    <AbsoluteFill style={{ opacity: enterU * exitFade }}>
      <AbsoluteFill
        style={{
          transform: `translate(${followLineX + cam.tx}px, ${cam.ty}px) scale(${cam.scale})`,
          transformOrigin: "960px 540px",
        }}
      >
        <SamyojAppShell
          x={140}
          y={195}
          width={1640}
          height={805}
          radius={22}
          activeNav="bots"
          pageTitle="AI Bots · Train & Test"
          liveBadge
          channelIcon="ai"
          accentColor={C.indigo}
          pulseScale={voPulse(t, 16.25)}
          headerChips={<Chip variant="violet">✦ AI Studio</Chip>}
        >
          <div style={{ display: "flex", height: "100%", backgroundColor: "#FFFFFF", position: "relative" }}>
            {/* LEFT / MAIN PANEL: Bots + Big Drop Zone PDF Cards + Coverage */}
            <div
              style={{
                flex: 1,
                minWidth: 0,
                padding: "20px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                backgroundColor: "#FFFFFF",
                opacity: lerp(1, 0.58, testFocus),
                transform: `scale(${lerp(1, 1.015, kbFocus)})`,
                transformOrigin: "center center",
              }}
            >
              {/* Top Row: Chat AI & Calling AI Active Cards */}
              <div style={{ display: "flex", gap: 14 }}>
                <div
                  style={{
                    flex: 1,
                    borderRadius: 14,
                    border: `1px solid ${C.indigoBorder}`,
                    backgroundColor: "#F8FAFF",
                    padding: "13px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <ChannelTileIcon kind="ai" size={44} radius={11} />
                    <div>
                      <div style={{ fontFamily: FONT_INTER, fontSize: 20, fontWeight: 700, color: C.ink }}>
                        Chat AI
                      </div>
                      <div style={{ fontFamily: FONT_INTER, fontSize: 16, color: C.muted }}>
                        Answers WhatsApp, IG &amp; FB
                      </div>
                    </div>
                  </div>
                  <Chip variant="green" style={{ height: 28, fontSize: 15 }}>
                    Active
                  </Chip>
                </div>

                <div
                  style={{
                    flex: 1,
                    borderRadius: 14,
                    border: `1.5px solid ${C.line}`,
                    backgroundColor: C.surface2,
                    padding: "13px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <ChannelTileIcon kind="calls" size={44} radius={11} />
                    <div>
                      <div style={{ fontFamily: FONT_INTER, fontSize: 20, fontWeight: 700, color: C.ink }}>
                        Calling AI
                      </div>
                      <div style={{ fontFamily: FONT_INTER, fontSize: 16, color: C.muted }}>
                        Answers voice calls 24/7
                      </div>
                    </div>
                  </div>
                  <Chip variant="green" style={{ height: 28, fontSize: 15 }}>
                    Active
                  </Chip>
                </div>
              </div>

              {/* Knowledge Base Drop Zone Panel */}
              <div
                style={{
                  flex: 1,
                  borderRadius: 16,
                  border: `1.5px solid ${C.line}`,
                  backgroundColor: "#FFFFFF",
                  padding: "20px 22px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: 14,
                }}
              >
                {/* Header + Test Chat Button */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontFamily: FONT_INTER, fontSize: 22, fontWeight: 700, color: C.ink }}>
                      Chat AI knowledge base
                    </div>
                    <div style={{ fontFamily: FONT_INTER, fontSize: 16, color: C.muted, marginTop: 2 }}>
                      Drag &amp; drop PDFs or FAQs — indexed automatically
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {trained && (
                      <div style={{ transform: `scale(${seg(t, 17.76, 17.98, E_BACK)})` }}>
                        <Chip variant="green" style={{ height: 36, fontSize: 17 }}>
                          <span>Trained</span>
                          <AnimatedTick t={t} startSec={17.78} color={C.greenText} size={17} />
                        </Chip>
                      </div>
                    )}
                    <PrimaryButton
                      style={{
                        height: 44,
                        paddingLeft: 18,
                        paddingRight: 18,
                        fontSize: 18,
                        transform: `scale(${t >= 17.94 && t < 18.02 ? 0.90 : 1})`,
                        opacity: trained ? 1 : 0.65,
                      }}
                    >
                      {testOpenU > 0.4 ? "Testing Open" : "Test Chat"}
                    </PrimaryButton>
                  </div>
                </div>

                {/* BIG Drop Zone with 3 Large PDF / FAQ Cards */}
                <div
                  style={{
                    borderRadius: 14,
                    border: `1.5px dashed ${trained ? C.indigoBorder : "#CBD5E1"}`,
                    backgroundColor: "#FAFBFD",
                    padding: "16px",
                    display: "flex",
                    gap: 14,
                  }}
                >
                  {FILES.map((file, idx) => {
                    const landed = t >= file.dragEnd;
                    const u = seg(t, file.dragEnd, file.dragEnd + 0.18, E_BACK);
                    return (
                      <div
                        key={idx}
                        style={{
                          flex: 1,
                          height: 122,
                          padding: "16px",
                          borderRadius: 14,
                          border: landed
                            ? `1.5px solid ${C.indigoBorder}`
                            : "1.5px dashed #CBD5E1",
                          backgroundColor: landed ? "#FFFFFF" : "#F8FAFC",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          opacity: landed ? 1 : 0.48,
                          transform: landed ? `scale(${lerp(0.95, 1, u)})` : "scale(1)",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <div
                            style={{
                              padding: "5px 10px",
                              borderRadius: 8,
                              backgroundColor: file.bg,
                              color: file.color,
                              fontFamily: FONT_INTER,
                              fontSize: 14,
                              fontWeight: 800,
                              letterSpacing: 0.4,
                            }}
                          >
                            {file.badge}
                          </div>
                          {landed && (
                            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                              <span style={{ fontFamily: FONT_INTER, fontSize: 14, fontWeight: 650, color: C.greenText }}>
                                Indexed
                              </span>
                              <AnimatedTick t={t} startSec={file.dragEnd + 0.04} color={C.successGreen} size={17} strokeWidth={2.6} />
                            </div>
                          )}
                        </div>

                        <div>
                          <div
                            style={{
                              fontFamily: FONT_INTER,
                              fontSize: 19,
                              fontWeight: 700,
                              color: C.ink,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {file.label}
                          </div>
                          <div style={{ fontFamily: FONT_INTER, fontSize: 15, color: C.muted, marginTop: 2 }}>
                            {landed ? `${file.size} · Ready for Chat AI` : "Drop file here"}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Fast Indexing Progress */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontFamily: FONT_INTER,
                      fontSize: 16,
                      fontWeight: 600,
                      color: C.muted,
                      marginBottom: 8,
                    }}
                  >
                    <span>
                      {trained
                        ? "Knowledge indexed · 100% ready"
                        : t >= 17.22
                          ? "Processing uploaded documents…"
                          : "Drop PDFs to train Chat AI…"}
                    </span>
                    <span>{Math.round(progressU * 100)}%</span>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: 11,
                      borderRadius: 999,
                      backgroundColor: "#E9EDF5",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${progressU * 100}%`,
                        height: "100%",
                        borderRadius: 999,
                        background: `linear-gradient(90deg, ${C.violet} 0%, ${C.indigo} 100%)`,
                      }}
                    />
                  </div>
                </div>

                {/* Clean Knowledge Coverage Bars */}
                <div
                  style={{
                    borderRadius: 12,
                    border: `1.5px solid ${C.lineSoft}`,
                    backgroundColor: C.surface2,
                    padding: "13px 16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 9,
                  }}
                >
                  <div style={{ fontFamily: FONT_INTER, fontSize: 15, fontWeight: 700, color: C.muted }}>
                    KNOWLEDGE GRAPH COVERAGE
                  </div>
                  {TOPIC_BARS.map((tb, idx) => {
                    const barU = seg(t, tb.at, tb.at + 0.35, E_IO);
                    return (
                      <div key={idx} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <span
                          style={{
                            fontFamily: FONT_INTER,
                            fontSize: 16,
                            fontWeight: 600,
                            color: C.ink,
                            width: 210,
                            flexShrink: 0,
                          }}
                        >
                          {tb.name}
                        </span>
                        <div
                          style={{
                            flex: 1,
                            height: 10,
                            borderRadius: 999,
                            backgroundColor: "#E2E8F0",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              width: `${tb.pct * barU}%`,
                              height: "100%",
                              borderRadius: 999,
                              backgroundColor: tb.color,
                            }}
                          />
                        </div>
                        <span
                          style={{
                            fontFamily: FONT_INTER,
                            fontSize: 15,
                            fontWeight: 600,
                            color: C.muted,
                            width: 46,
                            textAlign: "right",
                          }}
                        >
                          {Math.round(tb.pct * barU)}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT TESTING SIDEBAR (slides open fast at 18.00s!) */}
            {sidebarW > 2 && (
              <div
                style={{
                  width: sidebarW,
                  flexShrink: 0,
                  borderLeft: `1.5px solid ${C.indigoBorder}`,
                  background: "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(245,246,255,0.92) 100%)",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.95)",
                  zIndex: 25,
                }}
              >
                <div
                  style={{
                    width: 470,
                    height: "100%",
                    padding: "18px 20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  {/* Sidebar Header */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingBottom: 12,
                      borderBottom: `1.5px solid ${C.lineSoft}`,
                    }}
                  >
                    <Chip variant="violet" style={{ height: 32, fontSize: 17 }}>
                      ✦ Test Chat AI
                    </Chip>
                    <Chip variant="gray" style={{ height: 30, fontSize: 15 }}>
                      Sandbox
                    </Chip>
                  </div>

                  {/* Live Input/Output Test Bubbles */}
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      gap: 14,
                    }}
                  >
                    {msgSent && (
                      <div style={{ display: "flex", justifyContent: "flex-start" }}>
                        <div
                          style={{
                            maxWidth: "85%",
                            padding: "12px 16px",
                            borderRadius: "14px 14px 14px 4px",
                            backgroundColor: "#FFFFFF",
                            border: `1.5px solid ${C.line}`,
                            fontFamily: FONT_INTER,
                            fontSize: 18,
                            fontWeight: 500,
                            color: C.ink,
                            transform: `scale(${seg(t, 19.08, 19.24, E_BACK)})`,
                            transformOrigin: "left bottom",
                          }}
                        >
                          How much is the monthly plan?
                        </div>
                      </div>
                    )}

                    {t >= 19.12 && t < 19.34 && (
                      <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <TypingDots t={t} startSec={19.12} endSec={19.34} color={C.violet} />
                      </div>
                    )}

                    {t >= 19.34 && (
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                        <div
                          style={{
                            maxWidth: "92%",
                            padding: "12px 16px",
                            borderRadius: "14px 14px 4px 14px",
                            backgroundColor: C.violetSoft,
                            border: `1px solid ${C.violetBorder}`,
                            fontFamily: FONT_INTER,
                            fontSize: 18,
                            fontWeight: 500,
                            lineHeight: 1.4,
                            color: C.violetInk,
                            transform: `scale(${seg(t, 19.34, 19.56, E_BACK)})`,
                            transformOrigin: "right bottom",
                          }}
                        >
                          The monthly plan is ₹2,499 with unlimited group classes.
                        </div>
                        {t >= 19.52 && (
                          <Chip
                            variant="green"
                            style={{
                              height: 28,
                              fontSize: 14,
                              opacity: seg(t, 19.52, 19.72, E_ENTER),
                            }}
                          >
                            Source: Pricing.pdf ✓
                          </Chip>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Bottom Typing Input Box + Send Button */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "8px 10px 8px 14px",
                      borderRadius: 10,
                      border: `1.5px solid ${t >= 18.52 && !msgSent ? C.indigo : C.line}`,
                      backgroundColor: "#FFFFFF",
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        fontFamily: FONT_INTER,
                        fontSize: 16,
                        color: questionTyped.shown ? C.ink : C.faint,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                      }}
                    >
                      {questionTyped.shown || (msgSent ? "Ask another test question…" : "Type a test question…")}
                      {questionTyped.caretOn && (
                        <span
                          style={{
                            display: "inline-block",
                            width: 2,
                            height: 18,
                            backgroundColor: C.indigo,
                            verticalAlign: "middle",
                            marginLeft: 2,
                          }}
                        />
                      )}
                    </div>
                    <div
                      style={{
                        padding: "7px 14px",
                        borderRadius: 8,
                        backgroundColor: C.indigo,
                        color: "#FFFFFF",
                        fontFamily: FONT_INTER,
                        fontSize: 15,
                        fontWeight: 650,
                        transform: `scale(${t >= 19.04 && t < 19.12 ? 0.90 : 1})`,
                      }}
                    >
                      Send
                    </div>
                  </div>

                  {/* Enable AI on Live Chat Toggle */}
                  <div
                    style={{
                      padding: "13px 16px",
                      borderRadius: 12,
                      backgroundColor: t >= 20.26 ? "#F0FDF4" : "#FFFFFF",
                      border: `1px solid ${t >= 20.26 ? "#BBF7D0" : C.line}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div style={{ fontFamily: FONT_INTER, fontSize: 18, fontWeight: 700, color: C.ink }}>
                        AI on live chat
                      </div>
                      <div style={{ fontFamily: FONT_INTER, fontSize: 14, color: C.muted }}>
                        {t >= 20.26 ? "Enabled for all channels" : "Turn on after testing"}
                      </div>
                    </div>
                    <ToggleSwitch t={t} switchAt={20.24} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </SamyojAppShell>

        {/* Fast Cursor Drag-and-Drop PDF Cards flying cleanly into Drop Zone slots */}
        {FILES.map((file, idx) => {
          if (t < file.dragStart || t > file.dragEnd) return null;
          const u = seg(t, file.dragStart, file.dragEnd, E_IO);
          const [fx, fy] = quadPath(dragFrom, [file.slotX, slotY], u, -95);
          return (
            <div
              key={idx}
              style={{
                position: "absolute",
                left: fx - 125,
                top: fy - 52,
                width: 250,
                height: 104,
                padding: "14px 16px",
                borderRadius: 14,
                backgroundColor: "#FFFFFF",
                border: `2px solid ${C.indigo}`,
                boxShadow: "0 14px 28px rgba(79,70,229,0.22)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transform: `scale(1.04) rotate(${lerp(-3, 0, u)}deg)`,
                zIndex: 220,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span
                  style={{
                    padding: "4px 9px",
                    borderRadius: 7,
                    backgroundColor: file.bg,
                    color: file.color,
                    fontFamily: FONT_INTER,
                    fontSize: 13,
                    fontWeight: 800,
                  }}
                >
                  {file.badge}
                </span>
                <span style={{ fontFamily: FONT_INTER, fontSize: 13, color: C.indigo, fontWeight: 650 }}>
                  Dropping…
                </span>
              </div>
              <div style={{ fontFamily: FONT_INTER, fontSize: 18, fontWeight: 700, color: C.ink }}>
                {file.label}
              </div>
            </div>
          );
        })}

        <SuccessBurst t={t} startSec={17.78} x={1510} y={405} colors={[C.waIcon, C.successGreen]} count={8} />

        {/* Hand-off out: indigo line shooting from live chat toggle right into Scene 5 */}
        {t >= 20.78 && (
          <svg
            width="2060"
            height="1080"
            style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 220 }}
          >
            <line
              x1={1705}
              y1={932}
              x2={lerp(1705, 2060, shootU)}
              y2={932}
              stroke={C.indigo}
              strokeWidth={4}
              strokeLinecap="round"
            />
          </svg>
        )}
        <CursorOverlay
          t={t}
          visibleStart={16.02}
          visibleEnd={20.65}
          segments={cursorSegments}
        />
      </AbsoluteFill>

      <CaptionBar
        t={t}
        startSec={16.0}
        endSec={21.0}
        words={[
          { text: "Trained" },
          { text: "on" },
          { text: "your" },
          { text: "business", accentColor: C.indigo },
        ]}
      />
    </AbsoluteFill>
  );
};
