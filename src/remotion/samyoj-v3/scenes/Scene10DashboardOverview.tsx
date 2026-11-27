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
  voPulse,
} from "../tokens";
import { CaptionBar } from "../components/Effects";
import {
  AnimatedTick,
  ChannelKind,
  ChannelTileIcon,
  Chip,
  RollingNumber,
  SamyojAppShell,
} from "../components/UiKit";

const ACTIVITIES: Array<{ icon: ChannelKind; text: string; at: number }> = [
  { icon: "whatsapp", text: "WhatsApp · Priya Sharma booked Saturday trial", at: 48.6 },
  { icon: "instagram", text: "Instagram · Comment replied automatically", at: 49.1 },
  { icon: "facebook", text: "Facebook · Sonal Joshi trial confirmed", at: 49.6 },
  { icon: "gmail", text: "Email · Welcome follow-up sent via Gmail", at: 50.1 },
];

const BREAKDOWN: Array<{ label: string; icon: ChannelKind; color: string; pct: number }> = [
  { label: "WhatsApp", icon: "whatsapp", color: C.waIcon, pct: 84 },
  { label: "Instagram", icon: "instagram", color: C.igPink, pct: 66 },
  { label: "Facebook", icon: "facebook", color: C.fbBlue, pct: 48 },
  { label: "Email", icon: "gmail", color: C.amber, pct: 54 },
];

const TOP_STRIP: Array<{ name: string; icon: ChannelKind }> = [
  { name: "WhatsApp", icon: "whatsapp" },
  { name: "Instagram", icon: "instagram" },
  { name: "Facebook", icon: "facebook" },
  { name: "Email", icon: "gmail" },
];

export const Scene10DashboardOverview: React.FC<{ t: number }> = ({ t }) => {
  if (t < 46.95 || t > 54.35) return null;

  const enterU = seg(t, 47.0, 47.35, E_ENTER);
  const cam = cameraFollow(t, [
    { t: 47.00, fx: 960, fy: 540, zoom: 1.00 },
    { t: 48.20, fx: 840, fy: 390, zoom: 1.06 },
    { t: 49.80, fx: 720, fy: 730, zoom: 1.08 },
    { t: 51.40, fx: 1280, fy: 730, zoom: 1.08 },
    { t: 52.80, fx: 960, fy: 540, zoom: 1.02 },
  ]);
  const collapseU = seg(t, 52.8, 54.0, E_IO);
  const scale = cam.scale * lerp(1.0, 0.015, collapseU);
  const blurPx = collapseU > 0.5 ? (collapseU - 0.5) * 20 : 0;
  const outFade = t >= 53.85 ? 1 - seg(t, 53.85, 54.05, E_EXIT) : 1;

  const kpis = [
    {
      badge: "WhatsApp",
      variant: "green" as const,
      delta: "+18%",
      val: "142",
      label: "Conversations today",
      sparkColor: C.waIcon,
      sparkPath: "M 0 28 C 28 28, 42 12, 68 18 C 94 24, 110 6, 150 4",
      at: 47.2,
    },
    {
      badge: "AI",
      variant: "violet" as const,
      delta: "+4%",
      val: "98%",
      label: "Answered in under 5s",
      sparkColor: C.violet,
      sparkPath: "M 0 24 C 32 22, 58 14, 88 12 C 115 10, 130 6, 150 4",
      at: 47.35,
    },
    {
      badge: "Leads",
      variant: "indigo" as const,
      delta: "+24%",
      val: "38",
      label: "New leads captured",
      sparkColor: C.indigo,
      sparkPath: "M 0 28 C 28 24, 58 26, 86 14 C 112 4, 130 10, 150 6",
      at: 47.5,
    },
  ];

  const barU = seg(t, 48.6, 49.8, E_IO);
  const donutU = seg(t, 47.9, 49.0, E_IO);
  const ringCirc = 2 * Math.PI * 52;

  const kpiRowFocus = focusWindow(t, 47.25, 49.40);
  const bottomRowFocus = focusWindow(t, 49.45, 52.60);

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          transform: `translate(${cam.tx * (1 - collapseU)}px, ${cam.ty * (1 - collapseU)}px) scale(${scale})`,
          transformOrigin: "960px 540px",
          opacity: enterU * outFade,
          filter: blurPx > 0.2 ? `blur(${blurPx}px)` : "none",
        }}
      >
        <SamyojAppShell
          x={140}
          y={180}
          width={1640}
          height={820}
          radius={lerp(28, 999, clamp01((collapseU - 0.5) * 2))}
          activeNav="dashboard"
          pageTitle="Dashboard"
          liveBadge
          hideCalls
          channelIcon="buttons"
          accentColor={C.indigo}
          pulseScale={voPulse(t, 47.30)}
          headerChips={
            <>
              <Chip variant="gray">Sample data</Chip>
              <Chip variant="gray">Today</Chip>
            </>
          }
        >
          <div
            style={{
              padding: "20px 26px",
              display: "flex",
              flexDirection: "column",
              gap: 18,
              height: "100%",
              backgroundColor: "#F4F7FB",
            }}
          >
            {/* Top Channel Status Strip with real brand icons (WhatsApp, Instagram, Facebook, Email) */}
            <div style={{ display: "flex", gap: 14, opacity: lerp(1, 0.72, bottomRowFocus) }}>
              {TOP_STRIP.map((ch, idx) => {
                const su = seg(t, 47.05 + idx * 0.05, 47.35 + idx * 0.05, E_ENTER);
                return (
                  <div
                    key={ch.name}
                    style={{
                      flex: 1,
                      height: 58,
                      borderRadius: 14,
                      backgroundColor: "#FFFFFF",
                      border: `1.5px solid ${C.line}`,
                      padding: "0 18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      opacity: su,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <ChannelTileIcon kind={ch.icon} size={32} radius={8} />
                      <span style={{ fontFamily: FONT_INTER, fontSize: 22, fontWeight: 600, color: C.ink }}>
                        {ch.name}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <div style={{ width: 9, height: 9, borderRadius: 999, backgroundColor: C.waIcon }} />
                      <span style={{ fontFamily: FONT_INTER, fontSize: 15, fontWeight: 600, color: C.greenText }}>
                        Live
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Middle Row: 3 Sparkline KPI Cards + Message Status Donut */}
            <div
              style={{
                display: "flex",
                gap: 18,
                opacity: lerp(1, 0.68, bottomRowFocus),
                transform: `scale(${lerp(1, 1.018, kpiRowFocus)})`,
                transformOrigin: "center center",
              }}
            >
              {kpis.map((k) => {
                const cu = seg(t, k.at, k.at + 0.35, E_ENTER);
                const badgeU = seg(t, 48.3, 48.62, E_BACK);
                return (
                  <div
                    key={k.label}
                    style={{
                      width: 316,
                      height: 220,
                      borderRadius: 20,
                      background: kpiRowFocus > 0.15
                        ? "linear-gradient(145deg, rgba(255,255,255,0.97) 0%, rgba(244,247,255,0.90) 100%)"
                        : "#FFFFFF",
                      border: `1.5px solid ${kpiRowFocus > 0.2 ? C.indigoBorder : C.line}`,
                      boxShadow: kpiRowFocus > 0.15
                        ? "inset 0 1px 0 rgba(255,255,255,0.95), 0 0 0 3px rgba(79,70,229,0.06)"
                        : "none",
                      padding: "18px 20px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      opacity: cu,
                      transform: `translateY(${lerp(20, 0, cu)}px)`,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <Chip variant={k.variant}>{k.badge}</Chip>
                      {t >= 48.3 && (
                        <div style={{ transform: `scale(${badgeU})` }}>
                          <Chip variant="green" style={{ height: 32, fontSize: 22 }}>
                            {k.delta}
                          </Chip>
                        </div>
                      )}
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                      <RollingNumber
                        value={k.val}
                        t={t}
                        startSec={k.at}
                        style={{ fontSize: 52, fontWeight: 650, color: C.ink }}
                      />
                      <svg width="110" height="32" viewBox="0 0 150 32" style={{ marginBottom: 8 }}>
                        <path
                          d={k.sparkPath}
                          fill="none"
                          stroke={k.sparkColor}
                          strokeWidth={3}
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <div style={{ fontFamily: FONT_INTER, fontSize: 22, fontWeight: 500, color: C.muted }}>
                      {k.label}
                    </div>
                  </div>
                );
              })}

              {/* Message Status Donut Card (matching Screenshot 1) */}
              <div
                style={{
                  flex: 1,
                  height: 220,
                  borderRadius: 20,
                  background: kpiRowFocus > 0.15
                    ? "linear-gradient(145deg, rgba(255,255,255,0.97) 0%, rgba(244,247,255,0.90) 100%)"
                    : "#FFFFFF",
                  border: `1.5px solid ${kpiRowFocus > 0.2 ? C.indigoBorder : C.line}`,
                  boxShadow: kpiRowFocus > 0.15
                    ? "inset 0 1px 0 rgba(255,255,255,0.95), 0 0 0 3px rgba(79,70,229,0.06)"
                    : "none",
                  padding: "18px 22px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  opacity: seg(t, 47.6, 48.0, E_ENTER),
                }}
              >
                <div>
                  <div style={{ fontFamily: FONT_INTER, fontSize: 23, fontWeight: 650, color: C.ink }}>
                    Message status
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: C.waIcon }} />
                      <span style={{ fontFamily: FONT_INTER, fontSize: 22, color: C.ink2 }}>Delivered</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: C.indigo }} />
                      <span style={{ fontFamily: FONT_INTER, fontSize: 22, color: C.ink2 }}>Answered</span>
                    </div>
                  </div>
                </div>

                <div style={{ position: "relative", width: 130, height: 130, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="130" height="130" viewBox="0 0 130 130">
                    <circle cx="65" cy="65" r="52" fill="none" stroke="#EEF2F7" strokeWidth="12" />
                    <circle
                      cx="65"
                      cy="65"
                      r="52"
                      fill="none"
                      stroke={C.waIcon}
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={ringCirc}
                      strokeDashoffset={ringCirc * (1 - 0.98 * donutU)}
                      transform="rotate(-90 65 65)"
                    />
                  </svg>
                  <div style={{ position: "absolute", fontFamily: FONT_INTER, fontSize: 28, fontWeight: 700, color: C.ink }}>
                    98%
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: Today's activity + Channel breakdown */}
            <div
              style={{
                display: "flex",
                gap: 18,
                flex: 1,
                opacity: lerp(1, 0.70, kpiRowFocus),
                transform: `scale(${lerp(1, 1.01, bottomRowFocus)})`,
                transformOrigin: "center center",
              }}
            >
              <div
                style={{
                  width: 720,
                  height: 386,
                  borderRadius: 20,
                  background: bottomRowFocus > 0.15
                    ? "linear-gradient(145deg, rgba(255,255,255,0.97) 0%, rgba(244,247,255,0.90) 100%)"
                    : "#FFFFFF",
                  border: `1.5px solid ${bottomRowFocus > 0.2 ? C.indigoBorder : C.line}`,
                  boxShadow: bottomRowFocus > 0.15
                    ? "inset 0 1px 0 rgba(255,255,255,0.95), 0 0 0 3px rgba(79,70,229,0.06)"
                    : "none",
                  padding: "20px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  opacity: seg(t, 47.8, 48.15, E_ENTER),
                }}
              >
                <div style={{ fontFamily: FONT_INTER, fontSize: 24, fontWeight: 650, color: C.ink }}>
                  Today&apos;s activity
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {ACTIVITIES.map((act, idx) => {
                    if (t < act.at) return null;
                    const au = seg(t, act.at, act.at + 0.3, E_ENTER);
                    return (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 12,
                          padding: "11px 16px",
                          borderRadius: 14,
                          backgroundColor: C.surface2,
                          border: `1.5px solid ${C.lineSoft}`,
                          opacity: au,
                          transform: `translateY(${lerp(14, 0, au)}px)`,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                          <ChannelTileIcon kind={act.icon} size={28} radius={7} />
                          <span
                            style={{
                              fontFamily: FONT_INTER,
                              fontSize: 21,
                              fontWeight: 500,
                              color: C.ink,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {act.text}
                          </span>
                        </div>
                        <AnimatedTick t={t} startSec={act.at + 0.2} color={C.successGreen} size={20} strokeWidth={2.5} />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div
                style={{
                  flex: 1,
                  height: 386,
                  borderRadius: 20,
                  background: bottomRowFocus > 0.15
                    ? "linear-gradient(145deg, rgba(255,255,255,0.97) 0%, rgba(244,247,255,0.90) 100%)"
                    : "#FFFFFF",
                  border: `1.5px solid ${bottomRowFocus > 0.2 ? C.indigoBorder : C.line}`,
                  boxShadow: bottomRowFocus > 0.15
                    ? "inset 0 1px 0 rgba(255,255,255,0.95), 0 0 0 3px rgba(79,70,229,0.06)"
                    : "none",
                  padding: "20px 24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  opacity: seg(t, 47.9, 48.25, E_ENTER),
                }}
              >
                <div style={{ fontFamily: FONT_INTER, fontSize: 24, fontWeight: 650, color: C.ink }}>
                  Channel breakdown
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  {BREAKDOWN.map((b) => (
                    <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <ChannelTileIcon kind={b.icon} size={28} radius={7} />
                      <span style={{ fontFamily: FONT_INTER, fontSize: 21, fontWeight: 600, color: C.ink2, width: 112 }}>
                        {b.label}
                      </span>
                      <div style={{ flex: 1, height: 14, borderRadius: 999, backgroundColor: "#EEF2F7", overflow: "hidden" }}>
                        <div
                          style={{
                            width: `${b.pct * barU}%`,
                            height: "100%",
                            borderRadius: 999,
                            backgroundColor: b.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SamyojAppShell>
      </AbsoluteFill>

      {t >= 53.85 && (
        <div
          style={{
            position: "absolute",
            left: 960 - 8,
            top: 540 - 8,
            width: 16,
            height: 16,
            borderRadius: 999,
            backgroundColor: C.indigo,
            boxShadow: SHADOW.glow(C.indigo),
            zIndex: 250,
          }}
        />
      )}

      <CaptionBar
        t={t}
        startSec={47.0}
        endSec={54.0}
        words={[
          { text: "One" },
          { text: "clear" },
          { text: "view" },
          { text: "of" },
          { text: "everything", accentColor: C.indigo },
        ]}
      />
    </AbsoluteFill>
  );
};
