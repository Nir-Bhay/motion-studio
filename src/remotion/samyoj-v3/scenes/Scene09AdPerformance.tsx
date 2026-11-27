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
  voPulse,
} from "../tokens";
import { CaptionBar } from "../components/Effects";
import {
  AnimatedTick,
  Avatar,
  ChannelKind,
  ChannelTileIcon,
  Chip,
  RollingNumber,
  SamyojAppShell,
} from "../components/UiKit";

const AD_CARDS: Array<{
  name: string;
  platform: ChannelKind;
  platformLabel: string;
  spend: string;
  leads: string;
  cpl: string;
  ctr: string;
  at: number;
}> = [
  {
    name: "New Year Offer — Yoga Reel Ad",
    platform: "instagram",
    platformLabel: "Instagram Reel",
    spend: "₹7,200",
    leads: "24 leads",
    cpl: "₹300 / lead",
    ctr: "3.4% CTR",
    at: 42.35,
  },
  {
    name: "Weekend Trial Lead Form Ad",
    platform: "facebook",
    platformLabel: "Facebook Lead Form",
    spend: "₹5,200",
    leads: "16 leads",
    cpl: "₹325 / lead",
    ctr: "2.8% CTR",
    at: 42.65,
  },
];

const LEAD_BARS = [
  { day: "Mon", val: 4, h: 36 },
  { day: "Tue", val: 5, h: 46 },
  { day: "Wed", val: 6, h: 58 },
  { day: "Thu", val: 5, h: 48 },
  { day: "Fri", val: 10, h: 92, peak: true },
  { day: "Sat", val: 6, h: 58 },
  { day: "Sun", val: 4, h: 40 },
];

const AD_LEADS: Array<{
  initials: string;
  tone: "blue" | "indigo" | "green" | "pink";
  name: string;
  source: string;
  channel: ChannelKind;
  status: string;
  statusVariant: "green" | "indigo" | "amber";
  time: string;
  at: number;
}> = [
  {
    initials: "SJ",
    tone: "blue",
    name: "Sonal Joshi",
    source: "Yoga Reel Ad · Sun 8 AM trial",
    channel: "instagram",
    status: "Trial Booked",
    statusVariant: "green",
    time: "2m ago",
    at: 43.25,
  },
  {
    initials: "KR",
    tone: "indigo",
    name: "Kabir Roy",
    source: "New Year Offer · 30% annual pass",
    channel: "instagram",
    status: "Hot Lead",
    statusVariant: "indigo",
    time: "8m ago",
    at: 43.70,
  },
  {
    initials: "DM",
    tone: "green",
    name: "Divya Menon",
    source: "Weekend Lead Form · Morning batch",
    channel: "facebook",
    status: "Auto-Replied",
    statusVariant: "amber",
    time: "15m ago",
    at: 44.15,
  },
  {
    initials: "RK",
    tone: "pink",
    name: "Rohan Kulkarni",
    source: "Yoga Reel Ad · Couple membership",
    channel: "facebook",
    status: "Qualified",
    statusVariant: "green",
    time: "24m ago",
    at: 44.60,
  },
];

export const Scene09AdPerformance: React.FC<{ t: number }> = ({ t }) => {
  if (t < 41.75 || t > 47.35) return null;

  const slideInU = seg(t, 41.8, 42.32, E_ENTER);
  const zoomOutU = seg(t, 46.5, 47.25, E_IO);

  // Subtle camera follow: active ad campaigns -> incoming Ad Leads feed -> ease back for Scene 10
  const cam = cameraFollow(t, [
    { t: 41.80, fx: 960, fy: 540, zoom: 1.00 },
    { t: 42.75, fx: 760, fy: 510, zoom: 1.09 },
    { t: 44.25, fx: 1260, fy: 580, zoom: 1.10 },
    { t: 45.80, fx: 1100, fy: 560, zoom: 1.06 },
    { t: 46.55, fx: 960, fy: 540, zoom: 1.00 },
  ]);

  const adsFocus = focusWindow(t, 42.20, 44.20);
  const leadsFocus = focusWindow(t, 44.25, 46.50);

  const scale = t < 46.5 ? cam.scale : lerp(cam.scale, 0.36, zoomOutU);
  const tx = lerp(1920, 0, slideInU) + cam.tx + lerp(0, 360, zoomOutU);
  const ty = cam.ty + lerp(0, 180, zoomOutU);
  const outOpacity = 1 - seg(t, 47.0, 47.3, E_EXIT);

  const barsU = seg(t, 43.0, 44.1, E_IO);

  const summaryStats = [
    { label: "Total ad spend", value: "₹12,400", start: 42.3 },
    { label: "Leads captured", value: "40", start: 42.45 },
    { label: "Avg. cost per lead", value: "₹310", start: 42.6 },
  ];

  return (
    <AbsoluteFill style={{ opacity: outOpacity }}>
      <AbsoluteFill
        style={{
          transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
          transformOrigin: "960px 540px",
          filter: slideInU < 0.9 ? `blur(${(1 - slideInU) * 10}px)` : "none",
        }}
      >
        <SamyojAppShell
          x={140}
          y={195}
          width={1640}
          height={805}
          radius={22}
          activeNav="facebook"
          pageTitle="Ads & Leads"
          liveBadge={false}
          channelIcon="facebook"
          accentColor={C.indigo}
          pulseScale={voPulse(t, 42.25)}
          headerChips={
            <>
              <Chip variant="gray">Sample data</Chip>
              <Chip variant="gray">Read-only</Chip>
              <Chip variant="indigoOutline">Last 7 days</Chip>
            </>
          }
        >
          <div
            style={{
              padding: "20px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              height: "100%",
              backgroundColor: "#F4F7FB",
            }}
          >
            {/* Compact 3-Stat Ad Strip */}
            <div
              style={{
                display: "flex",
                gap: 14,
                opacity: lerp(1, 0.65, leadsFocus),
                transform: `scale(${lerp(1, 1.015, adsFocus)})`,
              }}
            >
              {summaryStats.map((m) => {
                const u = seg(t, m.start, m.start + 0.28, E_ENTER);
                return (
                  <div
                    key={m.label}
                    style={{
                      flex: 1,
                      borderRadius: 14,
                      backgroundColor: "#FFFFFF",
                      border: `1.5px solid ${C.line}`,
                      padding: "14px 18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      opacity: u,
                      transform: `translateY(${lerp(10, 0, u)}px)`,
                    }}
                  >
                    <span style={{ fontFamily: FONT_INTER, fontSize: 18, fontWeight: 550, color: C.muted }}>
                      {m.label}
                    </span>
                    <RollingNumber
                      value={m.value}
                      t={t}
                      startSec={m.start}
                      style={{ fontSize: 30, fontWeight: 700, color: C.ink }}
                    />
                  </div>
                );
              })}
            </div>

            {/* 2-Column Ads + Incoming Leads Layout */}
            <div style={{ display: "flex", gap: 18, flex: 1, minHeight: 0 }}>
              {/* LEFT (56%): Active Ad Creatives + Compact 7-Day Lead Trend */}
              <div
                style={{
                  flex: 1.25,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  opacity: lerp(1, 0.58, leadsFocus),
                  transform: `scale(${lerp(1, 1.02, adsFocus)})`,
                  transformOrigin: "left center",
                  zIndex: adsFocus > 0.05 ? 20 : 1,
                }}
              >
                <div style={{ fontFamily: FONT_INTER, fontSize: 18, fontWeight: 700, color: C.ink }}>
                  Active ad campaigns
                </div>

                {AD_CARDS.map((ad) => {
                  const u = seg(t, ad.at, ad.at + 0.3, E_ENTER);
                  return (
                    <div
                      key={ad.name}
                      style={{
                        borderRadius: 14,
                        border: `1.5px solid ${C.line}`,
                        backgroundColor: "#FFFFFF",
                        padding: "16px 18px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                        opacity: u,
                        transform: `translateY(${lerp(12, 0, u)}px)`,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <ChannelTileIcon kind={ad.platform} size={42} radius={10} />
                          <div>
                            <div style={{ fontFamily: FONT_INTER, fontSize: 19, fontWeight: 700, color: C.ink }}>
                              {ad.name}
                            </div>
                            <div style={{ fontFamily: FONT_INTER, fontSize: 15, color: C.muted, marginTop: 2 }}>
                              {ad.platformLabel} · Spend {ad.spend}
                            </div>
                          </div>
                        </div>
                        <Chip variant="green" style={{ height: 28, fontSize: 14 }}>
                          Active
                        </Chip>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <Chip variant="indigo" style={{ height: 30, fontSize: 15 }}>
                          {ad.leads}
                        </Chip>
                        <Chip variant="gray" style={{ height: 30, fontSize: 15 }}>
                          {ad.cpl}
                        </Chip>
                        <Chip variant="gray" style={{ height: 30, fontSize: 15 }}>
                          {ad.ctr}
                        </Chip>
                      </div>
                    </div>
                  );
                })}

                {/* Compact Daily Ad Leads Bars */}
                <div
                  style={{
                    flex: 1,
                    borderRadius: 14,
                    border: `1.5px solid ${C.line}`,
                    backgroundColor: "#FFFFFF",
                    padding: "14px 18px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: FONT_INTER, fontSize: 16, fontWeight: 700, color: C.ink }}>
                      Leads captured per day
                    </span>
                    {t >= 44.1 && (
                      <div style={{ transform: `scale(${seg(t, 44.1, 44.38, E_BACK)})` }}>
                        <Chip variant="indigo" style={{ height: 26, fontSize: 14 }}>
                          Fri peak · 10 leads
                        </Chip>
                      </div>
                    )}
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12, height: 112 }}>
                    {LEAD_BARS.map((b) => (
                      <div
                        key={b.day}
                        style={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "flex-end",
                          gap: 6,
                          height: "100%",
                        }}
                      >
                        <div
                          style={{
                            width: "70%",
                            height: b.h * barsU,
                            borderRadius: 8,
                            backgroundColor: b.peak ? C.indigo : "#CBD5E1",
                          }}
                        />
                        <span
                          style={{
                            fontFamily: FONT_INTER,
                            fontSize: 14,
                            fontWeight: b.peak ? 700 : 500,
                            color: b.peak ? C.indigo : C.muted,
                          }}
                        >
                          {b.day}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT (44%): Live Incoming Ad Leads in CRM */}
              <div
                style={{
                  flex: 1,
                  borderRadius: 16,
                  border: `1.5px solid ${leadsFocus > 0.2 ? C.indigoBorder : C.line}`,
                  background: leadsFocus > 0.15
                    ? "linear-gradient(180deg, rgba(255,255,255,0.97) 0%, rgba(245,247,255,0.91) 100%)"
                    : "#FFFFFF",
                  padding: "16px 18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  opacity: lerp(1, 0.62, adsFocus),
                  transform: `scale(${lerp(1, 1.014, leadsFocus)})`,
                  transformOrigin: "right center",
                  boxShadow: leadsFocus > 0.05
                    ? "inset 0 1px 0 rgba(255,255,255,0.95), 0 0 0 3px rgba(79, 70, 229, 0.08)"
                    : "none",
                  zIndex: leadsFocus > 0.05 ? 25 : 1,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: FONT_INTER, fontSize: 18, fontWeight: 700, color: C.ink }}>
                    New leads from ads
                  </span>
                  <Chip variant="green" style={{ height: 28, fontSize: 14 }}>
                    Auto-synced
                  </Chip>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {AD_LEADS.map((lead) => {
                    const lu = seg(t, lead.at, lead.at + 0.3, E_ENTER);
                    return (
                      <div
                        key={lead.name}
                        style={{
                          borderRadius: 12,
                          border: `1.5px solid ${C.lineSoft}`,
                          backgroundColor: C.surface2,
                          padding: "12px 14px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 10,
                          opacity: lu,
                          transform: `translateX(${lerp(18, 0, lu)}px)`,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                          <Avatar initials={lead.initials} tone={lead.tone} size={42} />
                          <div style={{ minWidth: 0 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                              <span style={{ fontFamily: FONT_INTER, fontSize: 17, fontWeight: 700, color: C.ink }}>
                                {lead.name}
                              </span>
                              <ChannelTileIcon kind={lead.channel} size={18} radius={5} />
                            </div>
                            <div
                              style={{
                                fontFamily: FONT_INTER,
                                fontSize: 14,
                                color: C.muted,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {lead.source}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
                          <Chip variant={lead.statusVariant} style={{ height: 26, fontSize: 13, paddingLeft: 8, paddingRight: 8 }}>
                            {lead.status}
                          </Chip>
                          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <span style={{ fontFamily: FONT_INTER, fontSize: 12, color: C.faint }}>{lead.time}</span>
                            <AnimatedTick t={t} startSec={lead.at + 0.15} color={C.successGreen} size={13} strokeWidth={2.5} />
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
      </AbsoluteFill>

      <CaptionBar
        t={t}
        startSec={42.0}
        endSec={47.0}
        words={[
          { text: "Track" },
          { text: "your" },
          { text: "ads", accentColor: C.indigo },
        ]}
      />
    </AbsoluteFill>
  );
};
