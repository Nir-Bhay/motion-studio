import React from "react";
import { AbsoluteFill } from "remotion";
import {
  C,
  E_BACK,
  E_ENTER,
  E_EXIT,
  E_IO,
  E_LINEAR,
  FONT_INTER,
  SHADOW,
  cameraFollow,
  clamp01,
  focusWindow,
  lerp,
  quadPath,
  seg,
  voPulse,
} from "../tokens";
import { CaptionBar, CursorOverlay, GlowDot } from "../components/Effects";
import { AnimatedTick, ChannelKind, ChannelTileIcon, Chip, OutlineButton } from "../components/UiKit";

interface NodeSpec {
  id: string;
  x: number;
  y: number;
  barColor: string;
  bgTint: string;
  icon: ChannelKind;
  title: string;
  sub: string;
  litAt: number;
}

// Coordinates relative to canvas container (1370 x 726 inside 1640x800 shell)
const NODES: Record<string, NodeSpec> = {
  n1: { id: "n1", x: 52, y: 180, barColor: C.waIcon, bgTint: "#F0FDF4", icon: "whatsapp", title: "Message Received", sub: "WhatsApp", litAt: 25.18 },
  n2: { id: "n2", x: 382, y: 180, barColor: C.violet, bgTint: "#F5F3FF", icon: "ai", title: "Reply with AI", sub: "Chat AI", litAt: 25.48 },
  n3: { id: "n3", x: 712, y: 180, barColor: C.waIcon, bgTint: "#F0FDF4", icon: "whatsapp", title: "Send WhatsApp", sub: "Trial link", litAt: 25.68 },
  n4: { id: "n4", x: 712, y: 380, barColor: C.amber, bgTint: "#FFFBEB", icon: "gmail", title: "Send Email", sub: "Welcome mail", litAt: 25.84 },
  n5: { id: "n5", x: 1042, y: 280, barColor: C.indigo, bgTint: "#EEF2FF", icon: "buttons", title: "Add Label", sub: "New lead", litAt: 26.08 },
};

const PALETTE_ITEMS: Array<{ label: string; icon: ChannelKind; y: number }> = [
  { label: "Message Received", icon: "whatsapp", y: 74 },
  { label: "Reply with AI", icon: "ai", y: 144 },
  { label: "Send WhatsApp", icon: "whatsapp", y: 214 },
  { label: "Send Email", icon: "gmail", y: 284 },
  { label: "Add Label", icon: "buttons", y: 354 },
];

function cubicBezierPt(
  p0: [number, number],
  p1: [number, number],
  p2: [number, number],
  p3: [number, number],
  u: number
): [number, number] {
  const m = 1 - u;
  const x = m * m * m * p0[0] + 3 * m * m * u * p1[0] + 3 * m * u * u * p2[0] + u * u * u * p3[0];
  const y = m * m * m * p0[1] + 3 * m * m * u * p1[1] + 3 * m * u * u * p2[1] + u * u * u * p3[1];
  return [x, y];
}

const NodeCard: React.FC<{
  node: NodeSpec;
  t: number;
  x: number;
  y: number;
  scale?: number;
  lifted?: boolean;
  opacity?: number;
  blurPx?: number;
}> = ({ node, t, x, y, scale = 1, lifted = false, opacity = 1, blurPx = 0 }) => {
  const isLit = t >= node.litAt;
  const litU = seg(t, node.litAt, node.litAt + 0.16, E_ENTER);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 280,
        height: 108,
        borderRadius: 16,
        backgroundColor: isLit ? `rgba(238,242,255,${0.92 * litU})` : node.bgTint,
        border: isLit ? `2px solid ${C.indigo}` : `1.5px solid ${node.barColor}55`,
        boxShadow: lifted ? "0 14px 28px rgba(15, 23, 42, 0.14)" : "0 2px 8px rgba(15, 23, 42, 0.04)",
        overflow: "hidden",
        transform: `scale(${scale})`,
        transformOrigin: "center center",
        opacity,
        filter: blurPx > 0.2 ? `blur(${blurPx}px)` : "none",
        zIndex: lifted ? 140 : 40,
        padding: "16px 18px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <ChannelTileIcon kind={node.icon} size={32} radius={8} />
        <div style={{ fontFamily: FONT_INTER, fontSize: 21, fontWeight: 700, color: C.ink }}>
          {node.title}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingLeft: 42 }}>
        <span style={{ fontFamily: FONT_INTER, fontSize: 19, fontWeight: 500, color: C.muted }}>
          {node.sub}
        </span>
        {isLit && <AnimatedTick t={t} startSec={node.litAt} color={C.successGreen} size={20} strokeWidth={2.5} />}
      </div>
    </div>
  );
};

export const Scene05AutomationBuilder: React.FC<{ t: number }> = ({ t }) => {
  if (t < 20.95 || t > 27.32) return null;

  const enterU = seg(t, 21.0, 21.32, E_ENTER);
  const exitFade = t >= 27.02 ? 1 - seg(t, 27.02, 27.3, E_EXIT) : 1;

  // When cursor clicks Test at 24.90s, studio flow shrinks cleanly on left & Test Chat sidebar opens on right!
  const testOpenU = seg(t, 24.92, 25.24, E_IO);
  const sidebarW = lerp(0, 420, testOpenU);
  const flowScale = lerp(1.0, 0.72, testOpenU);
  const flowShiftX = lerp(0, -10, testOpenU);
  const flowShiftY = lerp(0, 72, testOpenU);

  // Node build animations (21.15 - 24.75s)
  const n1U = seg(t, 21.15, 21.48, E_BACK);

  const n2DragU = seg(t, 21.55, 22.22, E_IO);
  const [n2X, n2Y] = quadPath([-240, 160], [NODES.n2.x, NODES.n2.y], n2DragU, -80);
  const n2Lifted = t >= 21.55 && t < 22.22;

  const n3U = seg(t, 22.45, 22.82, E_ENTER);

  const n4DragU = seg(t, 23.05, 23.78, E_IO);
  const [n4X, n4Y] = quadPath([-240, 300], [NODES.n4.x, NODES.n4.y], n4DragU, -110);
  const n4Lifted = t >= 23.05 && t < 23.78;

  const n5U = seg(t, 24.10, 24.45, E_BACK);

  const c12 = seg(t, 22.22, 22.40, E_LINEAR);
  const c23 = seg(t, 22.82, 23.00, E_LINEAR);
  const c24 = seg(t, 23.78, 24.05, E_LINEAR);
  const c35 = seg(t, 24.42, 24.65, E_LINEAR);
  const c45 = seg(t, 24.42, 24.65, E_LINEAR);

  // Pulse dots across the flow
  const dot12U = seg(t, 25.20, 25.46, E_IO);
  const dot23U = seg(t, 25.48, 25.68, E_IO);
  const dot24U = seg(t, 25.56, 25.84, E_IO);
  const dot35U = seg(t, 25.86, 26.08, E_IO);
  const dot45U = seg(t, 25.86, 26.08, E_IO);

  const activeCross = seg(t, 25.95, 26.15, E_IO);

  // Soft organized transition into Gmail Follow-Up (26.55 - 27.15s)
  const mailTransU = seg(t, 26.55, 27.10, E_IO);

  // Subtle camera follow tracking dragged nodes -> Test click -> Live Automation Test sidebar
  const cam = cameraFollow(t, [
    { t: 21.00, fx: 960, fy: 540, zoom: 1.00 },
    { t: 22.00, fx: 720, fy: 480, zoom: 1.11 },
    { t: 23.55, fx: 960, fy: 560, zoom: 1.14 },
    { t: 24.88, fx: 1450, fy: 360, zoom: 1.13 },
    { t: 25.60, fx: 1360, fy: 560, zoom: 1.14 },
    { t: 26.55, fx: 960, fy: 540, zoom: 1.00 },
  ]);

  const flowFocus = focusWindow(t, 21.25, 24.75);
  const testFocus = focusWindow(t, 24.85, 26.55);
  const autoPulse = voPulse(t, 21.30);

  return (
    <AbsoluteFill style={{ opacity: enterU * exitFade }}>
      <AbsoluteFill
        style={{
          transform: `translate(${cam.tx}px, ${cam.ty}px) scale(${cam.scale})`,
          transformOrigin: "960px 540px",
        }}
      >
      {/* Main Window Frame (x 140, y 195, 1640x805) */}
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 195,
          width: 1640,
          height: 805,
          borderRadius: 24,
          backgroundColor: "#FFFFFF",
          border: `1.5px solid ${C.line}`,
          boxShadow: SHADOW.hero,
          overflow: "hidden",
        }}
      >
        {/* Top Bar 74px */}
        <div
          style={{
            height: 74,
            borderBottom: `1.5px solid ${C.line}`,
            paddingLeft: 30,
            paddingRight: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#FFFFFF",
            position: "relative",
            zIndex: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ transform: `scale(${autoPulse})` }}>
              <ChannelTileIcon kind="bolt" size={36} radius={9} />
            </div>
            <span style={{ fontFamily: FONT_INTER, fontSize: 27, fontWeight: 750, color: C.ink }}>
              Automation
            </span>
            <div style={{ position: "relative", width: 120, height: 38 }}>
              <div style={{ position: "absolute", inset: 0, opacity: 1 - activeCross }}>
                <Chip variant="gray">Draft</Chip>
              </div>
              <div style={{ position: "absolute", inset: 0, opacity: activeCross }}>
                <Chip variant="green">Active</Chip>
              </div>
            </div>
          </div>

          <OutlineButton
            style={{
              backgroundColor: testOpenU > 0.3 ? C.indigoSoft : "#FFFFFF",
              borderColor: testOpenU > 0.3 ? C.indigoBorder : C.line,
              color: testOpenU > 0.3 ? C.indigo : C.ink,
              transform: `scale(${t >= 24.86 && t < 24.94 ? 0.88 : 1})`,
            }}
          >
            {testOpenU > 0.3 ? "Testing Live" : "Test"}
          </OutlineButton>
        </div>

        {/* Body: Left Palette + Shrinking Flow Canvas + Right Test Chat Sidebar */}
        <div style={{ display: "flex", height: 731, position: "relative" }}>
          {/* Left Palette 260px (compresses gracefully during test) */}
          <div
            style={{
              width: lerp(260, 210, testOpenU),
              flexShrink: 0,
              borderRight: `1.5px solid ${C.line}`,
              backgroundColor: C.surface2,
              padding: "22px 14px",
              position: "relative",
              zIndex: 15,
              opacity: lerp(1, 0.58, testFocus),
            }}
          >
            <div
              style={{
                fontFamily: FONT_INTER,
                fontSize: 20,
                fontWeight: 650,
                color: C.muted,
                marginBottom: 14,
                paddingLeft: 4,
              }}
            >
              Triggers &amp; Steps
            </div>

            {PALETTE_ITEMS.map((item, idx) => (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  left: 12,
                  right: 12,
                  top: item.y,
                  height: 52,
                  borderRadius: 12,
                  backgroundColor: "#FFFFFF",
                  border: `1.5px solid ${C.line}`,
                  boxShadow: "0 2px 6px rgba(15, 23, 42, 0.04)",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              >
                <ChannelTileIcon kind={item.icon} size={28} radius={7} />
                <span
                  style={{
                    fontFamily: FONT_INTER,
                    fontSize: testOpenU > 0.5 ? 16 : 19,
                    fontWeight: 550,
                    color: C.ink,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Flow Grid Canvas (scales down cleanly in place when Test sidebar opens!) */}
          <div
            style={{
              flex: 1,
              position: "relative",
              overflow: "hidden",
              backgroundColor: "#FFFFFF",
              backgroundImage:
                "linear-gradient(to right, #EEF2F7 1px, transparent 1px), linear-gradient(to bottom, #EEF2F7 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                transform: `translate(${flowShiftX}px, ${flowShiftY}px) scale(${flowScale * lerp(1, 1.022, flowFocus)})`,
                transformOrigin: "left top",
                opacity: (1 - mailTransU * 0.65) * lerp(1, 0.68, testFocus),
                filter: mailTransU > 0.1 ? `blur(${mailTransU * 6}px)` : "none",
              }}
            >
              {/* SVG Connectors (inside flow transform so they scale together!) */}
              <svg width="1380" height="720" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 30 }}>
                {c12 > 0 && (
                  <path
                    d="M 332 234 C 357 234, 357 234, 382 234"
                    fill="none"
                    stroke={t >= 25.20 ? C.indigo : "#94A3B8"}
                    strokeWidth={2.8}
                    strokeDasharray="6 6"
                    strokeDashoffset={-((t - 21) * 28)}
                    opacity={c12}
                  />
                )}
                {c23 > 0 && (
                  <path
                    d="M 662 234 C 687 234, 687 234, 712 234"
                    fill="none"
                    stroke={t >= 25.48 ? C.indigo : "#94A3B8"}
                    strokeWidth={2.8}
                    strokeDasharray="6 6"
                    strokeDashoffset={-((t - 21) * 28)}
                    opacity={c23}
                  />
                )}
                {c24 > 0 && (
                  <path
                    d="M 662 234 C 687 234, 687 434, 712 434"
                    fill="none"
                    stroke={t >= 25.56 ? C.indigo : "#94A3B8"}
                    strokeWidth={2.8}
                    strokeDasharray="6 6"
                    strokeDashoffset={-((t - 21) * 28)}
                    opacity={c24}
                  />
                )}
                {c35 > 0 && (
                  <path
                    d="M 992 234 C 1017 234, 1017 334, 1042 334"
                    fill="none"
                    stroke={t >= 25.86 ? C.indigo : "#94A3B8"}
                    strokeWidth={2.8}
                    strokeDasharray="6 6"
                    opacity={c35}
                  />
                )}
                {c45 > 0 && (
                  <path
                    d="M 992 434 C 1017 434, 1017 334, 1042 334"
                    fill="none"
                    stroke={t >= 25.86 ? C.indigo : "#CBD5E1"}
                    strokeWidth={2.5}
                    strokeDasharray="6 6"
                    opacity={c45}
                  />
                )}
              </svg>

              {t >= 21.15 && (
                <NodeCard
                  node={NODES.n1}
                  t={t}
                  x={NODES.n1.x}
                  y={lerp(130, NODES.n1.y, n1U)}
                  scale={n1U}
                  opacity={clamp01(n1U)}
                />
              )}

              {t >= 21.55 && (
                <NodeCard
                  node={NODES.n2}
                  t={t}
                  x={n2X}
                  y={n2Y}
                  scale={n2Lifted ? 1.05 : 1}
                  lifted={n2Lifted}
                  blurPx={n2Lifted ? 4 : 0}
                />
              )}

              {t >= 22.45 && (
                <NodeCard
                  node={NODES.n3}
                  t={t}
                  x={lerp(752, NODES.n3.x, n3U)}
                  y={NODES.n3.y}
                  opacity={n3U}
                />
              )}

              {t >= 23.05 && (
                <NodeCard
                  node={NODES.n4}
                  t={t}
                  x={n4X}
                  y={n4Y}
                  scale={n4Lifted ? 1.05 : 1}
                  lifted={n4Lifted}
                  blurPx={n4Lifted ? 4 : 0}
                />
              )}

              {t >= 24.10 && (
                <NodeCard
                  node={NODES.n5}
                  t={t}
                  x={NODES.n5.x}
                  y={NODES.n5.y}
                  scale={n5U}
                  opacity={clamp01(n5U)}
                />
              )}

              {/* Flowing Pulse Dots */}
              {dot12U > 0 && dot12U < 1 && (() => {
                const [dx, dy] = cubicBezierPt([332, 234], [357, 234], [357, 234], [382, 234], dot12U);
                return <GlowDot x={dx} y={dy} size={12} />;
              })()}
              {dot23U > 0 && dot23U < 1 && (() => {
                const [dx, dy] = cubicBezierPt([662, 234], [687, 234], [687, 234], [712, 234], dot23U);
                return <GlowDot x={dx} y={dy} size={12} />;
              })()}
              {dot24U > 0 && dot24U < 1 && (() => {
                const [dx, dy] = cubicBezierPt([662, 234], [687, 234], [687, 434], [712, 434], dot24U);
                return <GlowDot x={dx} y={dy} size={12} />;
              })()}
              {dot35U > 0 && dot35U < 1 && (() => {
                const [dx, dy] = cubicBezierPt([992, 234], [1017, 234], [1017, 334], [1042, 334], dot35U);
                return <GlowDot x={dx} y={dy} size={12} />;
              })()}
              {dot45U > 0 && dot45U < 1 && (() => {
                const [dx, dy] = cubicBezierPt([992, 434], [1017, 434], [1017, 334], [1042, 334], dot45U);
                return <GlowDot x={dx} y={dy} size={12} />;
              })()}
            </div>
          </div>

          {/* RIGHT AUTOMATION TEST CHAT SIDEBAR (opens on clicking Test at 24.92s!) */}
          {sidebarW > 2 && (
            <div
              style={{
                width: sidebarW,
                flexShrink: 0,
                borderLeft: `1.5px solid ${C.indigoBorder}`,
                background: "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(245,246,255,0.92) 100%)",
                overflow: "hidden",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.95)",
                zIndex: 30,
                opacity: 1 - mailTransU * 0.75,
              }}
            >
              <div
                style={{
                  width: 420,
                  height: "100%",
                  padding: "18px 20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingBottom: 12,
                    borderBottom: `1.5px solid ${C.lineSoft}`,
                  }}
                >
                  <Chip variant="indigo" style={{ height: 32, fontSize: 16 }}>
                    ⚡ Automation Test
                  </Chip>
                  <Chip variant="green" style={{ height: 28, fontSize: 14 }}>
                    Live Simulation
                  </Chip>
                </div>

                {/* Speed Chat Steps */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 12 }}>
                  {t >= 25.18 && (
                    <div
                      style={{
                        alignSelf: "flex-start",
                        maxWidth: "85%",
                        padding: "11px 15px",
                        borderRadius: "14px 14px 14px 4px",
                        backgroundColor: "#FFFFFF",
                        border: `1.5px solid ${C.line}`,
                        fontFamily: FONT_INTER,
                        fontSize: 17,
                        fontWeight: 500,
                        color: C.ink,
                        transform: `scale(${seg(t, 25.18, 25.34, E_BACK)})`,
                        transformOrigin: "left bottom",
                      }}
                    >
                      Hi! Can you share the trial link?
                    </div>
                  )}

                  {t >= 25.48 && (
                    <div
                      style={{
                        alignSelf: "flex-end",
                        maxWidth: "88%",
                        padding: "11px 15px",
                        borderRadius: "14px 14px 4px 14px",
                        backgroundColor: C.violetSoft,
                        border: `1px solid ${C.violetBorder}`,
                        fontFamily: FONT_INTER,
                        fontSize: 17,
                        fontWeight: 500,
                        color: C.violetInk,
                        transform: `scale(${seg(t, 25.48, 25.66, E_BACK)})`,
                        transformOrigin: "right bottom",
                      }}
                    >
                      Done! Sent your Saturday 7 AM trial link on WhatsApp.
                    </div>
                  )}

                  {t >= 25.84 && (
                    <div
                      style={{
                        alignSelf: "center",
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: 10,
                        backgroundColor: "#FFFBEB",
                        border: "1.5px solid #FDE68A",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        transform: `scale(${seg(t, 25.84, 26.02, E_BACK)})`,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <ChannelTileIcon kind="gmail" size={24} radius={6} />
                        <span style={{ fontFamily: FONT_INTER, fontSize: 15, fontWeight: 650, color: "#92400E" }}>
                          Welcome email queued
                        </span>
                      </div>
                      <AnimatedTick t={t} startSec={25.88} color="#D97706" size={16} />
                    </div>
                  )}

                  {t >= 26.08 && (
                    <div
                      style={{
                        alignSelf: "center",
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: 10,
                        backgroundColor: "#EEF2FF",
                        border: `1px solid ${C.indigoBorder}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        transform: `scale(${seg(t, 26.08, 26.26, E_BACK)})`,
                      }}
                    >
                      <span style={{ fontFamily: FONT_INTER, fontSize: 15, fontWeight: 650, color: C.indigo }}>
                        Label added: New lead
                      </span>
                      <AnimatedTick t={t} startSec={26.12} color={C.indigo} size={16} />
                    </div>
                  )}
                </div>

                {/* Footer Verification */}
                <div
                  style={{
                    padding: "11px 14px",
                    borderRadius: 10,
                    backgroundColor: t >= 26.15 ? "#F0FDF4" : C.surface2,
                    border: `1px solid ${t >= 26.15 ? "#BBF7D0" : C.lineSoft}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontFamily: FONT_INTER, fontSize: 15, fontWeight: 650, color: C.ink }}>
                    {t >= 26.15 ? "All 5 steps passed" : "Running automation flow…"}
                  </span>
                  {t >= 26.15 && <Chip variant="green" style={{ height: 26, fontSize: 14 }}>1.1s ✓</Chip>}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Smooth Organized Gmail Follow-Up Card Transition (26.55 - 27.15s) */}
      {t >= 26.55 && (
        <div
          style={{
            position: "absolute",
            left: lerp(720, 620, mailTransU),
            top: lerp(540, 340, mailTransU),
            width: lerp(340, 680, mailTransU),
            borderRadius: 20,
            backgroundColor: "#FFFFFF",
            border: `1.5px solid ${C.indigoBorder}`,
            boxShadow: "0 18px 48px rgba(15, 23, 42, 0.14)",
            padding: "22px 26px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            opacity: seg(t, 26.55, 26.78, E_ENTER),
            transform: `scale(${lerp(0.86, 1.0, mailTransU)})`,
            zIndex: 240,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <ChannelTileIcon kind="gmail" size={44} radius={11} />
              <div>
                <div style={{ fontFamily: FONT_INTER, fontSize: 20, fontWeight: 700, color: C.ink }}>
                  Send Follow-Up Email
                </div>
                <div style={{ fontFamily: FONT_INTER, fontSize: 16, color: C.muted }}>
                  Prebuilt template · Trial Class Follow-Up
                </div>
              </div>
            </div>
            <Chip variant="indigo" style={{ height: 30, fontSize: 15 }}>
              Next step
            </Chip>
          </div>
        </div>
      )}

        <CursorOverlay
          t={t}
          visibleStart={21.50}
          visibleEnd={25.15}
          segments={[
            {
              from: [260, 420],
              to: [922, 504],
              moveStart: 21.55,
              moveEnd: 22.22,
            },
            {
              from: [922, 504],
              to: [260, 560],
              moveStart: 22.45,
              moveEnd: 23.02,
            },
            {
              from: [260, 560],
              to: [1252, 704],
              moveStart: 23.05,
              moveEnd: 23.78,
            },
            {
              from: [1252, 704],
              to: [1710, 232],
              moveStart: 24.30,
              moveEnd: 24.86,
              clickAt: 24.90,
              rippleColor: C.indigo,
            },
          ]}
        />
      </AbsoluteFill>

      <CaptionBar
        t={t}
        startSec={21.0}
        endSec={27.0}
        words={[
          { text: "Build" },
          { text: "automations" },
          { text: "in" },
          { text: "minutes", accentColor: C.indigo },
        ]}
      />
    </AbsoluteFill>
  );
};
