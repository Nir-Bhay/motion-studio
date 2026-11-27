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
  Avatar,
  ChannelTileIcon,
  Chip,
  OutlineButton,
  PrimaryButton,
  SamyojAppShell,
} from "../components/UiKit";

const TEMPLATES = [
  {
    id: "trial",
    name: "Trial Class Follow-Up",
    desc: "Confirm Saturday trial & directions",
    tag: "Popular",
    at: 27.15,
  },
  {
    id: "offer",
    name: "New Year 30% Offer",
    desc: "Send annual pass promo to hot leads",
    tag: "Offer",
    at: 27.25,
  },
  {
    id: "missed",
    name: "Missed Call Follow-Up",
    desc: "Share schedule & callback link",
    tag: "Auto",
    at: 27.35,
  },
];

const FOLLOWUP_LEADS = [
  { initials: "PS", tone: "green" as const, name: "Priya Sharma", reason: "Trial slot · Follow-up due" },
  { initials: "RM", tone: "indigo" as const, name: "Rahul Mehta", reason: "Call summary · Monday follow-up" },
];

export const Scene06SendEmail: React.FC<{ t: number }> = ({ t }) => {
  if (t < 26.95 || t > 31.35) return null;

  const enterU = seg(t, 27.0, 27.32, E_ENTER);
  const exitU = t >= 30.7 ? 1 - seg(t, 30.7, 31.1, E_EXIT) : 1;

  // Template clicked at 27.78s
  const templateApplied = t >= 27.78;
  const templatePop = seg(t, 27.78, 28.05, E_BACK);

  const subjectTyped = typedSlice(
    "Following up: Your Saturday 7 AM trial class",
    t,
    27.9,
    46,
  );

  // Send Email clicked at 29.60s
  const sent = t >= 29.65;
  const toastShowU = seg(t, 29.75, 30.05, E_BACK);

  // Incoming Instagram tile hand-off cue at 30.7 - 31.1
  const igFlyU = seg(t, 30.7, 31.08, E_IO);
  const [igX, igY] = quadPath([1680, 140], [280, 260], igFlyU, -90);

  // Subtle camera focus keeping full sidebar + right Send Email button 100% unclipped
  const cam = cameraFollow(t, [
    { t: 27.00, fx: 960, fy: 540, zoom: 1.00 },
    { t: 27.76, fx: 760, fy: 470, zoom: 1.06 },
    { t: 28.55, fx: 980, fy: 540, zoom: 1.06 },
    { t: 29.60, fx: 1040, fy: 640, zoom: 1.06 },
    { t: 30.55, fx: 960, fy: 540, zoom: 1.00 },
  ]);

  const tplFocus = focusWindow(t, 27.15, 28.35);
  const composeFocus = focusWindow(t, 28.40, 30.65);

  return (
    <AbsoluteFill style={{ opacity: enterU * exitU }}>
      <AbsoluteFill
        style={{
          transform: `translate(${cam.tx}px, ${cam.ty}px) scale(${cam.scale})`,
          transformOrigin: "960px 540px",
        }}
      >
        <SamyojAppShell
        x={140}
        y={195}
        width={1640}
        height={805}
        radius={22}
        activeNav="email"
        pageTitle="Email · Gmail Campaigns"
        liveBadge={false}
        channelIcon="gmail"
        accentColor={C.gmailRed}
        pulseScale={voPulse(t, 27.20)}
          headerChips={
            <>
              <Chip variant="gray">Send only</Chip>
              <Chip variant="indigo">Prebuilt templates</Chip>
            </>
          }
        >
        <div style={{ display: "flex", height: "100%", backgroundColor: "#FFFFFF" }}>
          {/* LEFT PANEL (420px): Prebuilt Templates + Follow-Up Leads */}
          <div
            style={{
              width: 420,
              padding: "20px 22px",
              borderRight: `1.5px solid ${tplFocus > 0.15 ? `${C.gmailRed}44` : C.lineSoft}`,
              display: "flex",
              flexDirection: "column",
              gap: 14,
              background: tplFocus > 0.15
                ? "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(255,248,247,0.90) 100%)"
                : "#FCFCFD",
              opacity: lerp(1, 0.58, composeFocus),
              transform: `scale(${lerp(1, 1.012, tplFocus)})`,
              transformOrigin: "left center",
              boxShadow: tplFocus > 0.05 ? "inset 0 1px 0 rgba(255,255,255,0.95)" : "none",
              zIndex: tplFocus > 0.05 ? 25 : 1,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontFamily: FONT_INTER, fontSize: 20, fontWeight: 700, color: C.ink }}>
                Prebuilt templates
              </span>
              <Chip variant="gray" style={{ height: 28, fontSize: 16 }}>
                3 ready
              </Chip>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {TEMPLATES.map((tpl, idx) => {
                const u = seg(t, tpl.at, tpl.at + 0.25, E_ENTER);
                const selected = idx === 0 && templateApplied;
                return (
                  <div
                    key={tpl.id}
                    style={{
                      padding: "13px 15px",
                      borderRadius: 12,
                      backgroundColor: selected ? "#EEF2FF" : "#FFFFFF",
                      border: `1.5px solid ${selected ? C.indigo : C.line}`,
                      display: "flex",
                      flexDirection: "column",
                      gap: 5,
                      opacity: u,
                      transform: `translateY(${lerp(12, 0, u)}px) scale(${
                        idx === 0 && t >= 27.72 && t < 27.8 ? 0.96 : 1
                      })`,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                      <span style={{ fontFamily: FONT_INTER, fontSize: 19, fontWeight: 700, color: C.ink }}>
                        {tpl.name}
                      </span>
                      <Chip
                        variant={selected ? "indigo" : "gray"}
                        style={{ height: 26, fontSize: 15, paddingLeft: 8, paddingRight: 8 }}
                      >
                        {selected ? "Loaded" : tpl.tag}
                      </Chip>
                    </div>
                    <span style={{ fontFamily: FONT_INTER, fontSize: 17, color: C.muted }}>
                      {tpl.desc}
                    </span>
                  </div>
                );
              })}
            </div>

            <div
              style={{
                marginTop: 6,
                paddingTop: 14,
                borderTop: `1.5px solid ${C.lineSoft}`,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <span style={{ fontFamily: FONT_INTER, fontSize: 17, fontWeight: 700, color: C.muted }}>
                FOLLOW-UP LEADS
              </span>
              {FOLLOWUP_LEADS.map((lead, idx) => (
                <div
                  key={lead.name}
                  style={{
                    padding: "10px 12px",
                    borderRadius: 10,
                    backgroundColor: idx === 0 ? "#F0FDF4" : "#FFFFFF",
                    border: `1px solid ${idx === 0 ? "#BBF7D0" : C.lineSoft}`,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Avatar initials={lead.initials} tone={lead.tone} size={36} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: FONT_INTER, fontSize: 18, fontWeight: 650, color: C.ink }}>
                      {lead.name}
                    </div>
                    <div style={{ fontFamily: FONT_INTER, fontSize: 16, color: C.muted }}>
                      {lead.reason}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT PANEL (974px): Gmail Follow-up Composer */}
          <div
            style={{
              width: 974,
              padding: "22px 28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              background: composeFocus > 0.15
                ? "linear-gradient(180deg, rgba(255,255,255,0.97) 0%, rgba(250,251,255,0.92) 100%)"
                : "#FFFFFF",
              position: "relative",
              opacity: lerp(1, 0.62, tplFocus),
              transform: `scale(${lerp(1, 1.01, composeFocus)})`,
              transformOrigin: "center center",
              boxShadow: composeFocus > 0.05 ? "inset 0 1px 0 rgba(255,255,255,0.95)" : "none",
              zIndex: composeFocus > 0.05 ? 25 : 1,
            }}
          >
            {/* Header Bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: 14,
                borderBottom: `1.5px solid ${C.lineSoft}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <ChannelTileIcon kind="gmail" size={40} radius={10} />
                <span style={{ fontFamily: FONT_INTER, fontSize: 24, fontWeight: 700, color: C.ink }}>
                  Send follow-up via Gmail
                </span>
              </div>
              {templateApplied && (
                <div style={{ transform: `scale(${templatePop})` }}>
                  <Chip variant="indigo">Template: Trial Class Follow-Up</Chip>
                </div>
              )}
            </div>

            {/* Meta Rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  paddingBottom: 10,
                  borderBottom: `1.5px solid ${C.lineSoft}`,
                }}
              >
                <span style={{ fontFamily: FONT_INTER, fontSize: 19, fontWeight: 500, color: C.muted, width: 90 }}>
                  From
                </span>
                <span style={{ fontFamily: FONT_INTER, fontSize: 19, fontWeight: 500, color: C.ink }}>
                  studio@example.com
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  paddingBottom: 10,
                  borderBottom: `1.5px solid ${C.lineSoft}`,
                }}
              >
                <span style={{ fontFamily: FONT_INTER, fontSize: 19, fontWeight: 500, color: C.muted, width: 90 }}>
                  To
                </span>
                <Chip variant="green" style={{ height: 32, fontSize: 18 }}>
                  Priya Sharma
                </Chip>
                <span style={{ fontFamily: FONT_INTER, fontSize: 19, fontWeight: 500, color: C.muted }}>
                  priya.sharma@example.com
                </span>
                <Chip variant="amber" style={{ height: 30, fontSize: 16, marginLeft: "auto" }}>
                  Lead follow-up
                </Chip>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  paddingBottom: 10,
                  borderBottom: `1.5px solid ${C.lineSoft}`,
                }}
              >
                <span style={{ fontFamily: FONT_INTER, fontSize: 19, fontWeight: 500, color: C.muted, width: 90 }}>
                  Subject
                </span>
                <span style={{ fontFamily: FONT_INTER, fontSize: 20, fontWeight: 650, color: C.ink }}>
                  {templateApplied ? subjectTyped.shown : "Select a prebuilt template or write subject..."}
                  {templateApplied && subjectTyped.caretOn && (
                    <span
                      style={{
                        display: "inline-block",
                        width: 2,
                        height: 20,
                        backgroundColor: C.indigo,
                        verticalAlign: "middle",
                        marginLeft: 2,
                      }}
                    />
                  )}
                </span>
              </div>
            </div>

            {/* Clean Prebuilt Follow-up Body */}
            <div
              style={{
                flex: 1,
                marginTop: 14,
                marginBottom: 14,
                borderRadius: 14,
                border: `1.5px solid ${C.lineSoft}`,
                backgroundColor: C.surface2,
                padding: "20px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 14,
                fontFamily: FONT_INTER,
                fontSize: 20,
                fontWeight: 500,
                color: C.ink2,
                lineHeight: 1.5,
                opacity: templateApplied ? seg(t, 28.25, 28.65, E_ENTER) : 0.45,
              }}
            >
              <div>Hi Priya,</div>
              <div>
                Following up on your trial inquiry — your Saturday 7:00 AM session at Sunrise Studio is confirmed.
              </div>
              <div>
                Need to reschedule or grab our New Year 30% annual pass offer? Just reply on WhatsApp anytime!
              </div>
              <div style={{ color: C.muted, marginTop: 4 }}>— Team Sunrise Studio</div>
            </div>

            {/* Footer */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: 12,
                borderTop: `1.5px solid ${C.lineSoft}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <OutlineButton style={{ height: 44, fontSize: 18 }}>Attach</OutlineButton>
                <Chip variant="gray" style={{ height: 34, fontSize: 17 }}>
                  Follow-up reminder: Auto
                </Chip>
              </div>
              {!sent ? (
                <PrimaryButton
                  style={{
                    height: 48,
                    paddingLeft: 28,
                    paddingRight: 28,
                    transform: `scale(${t >= 29.58 && t < 29.66 ? 0.9 : 1})`,
                  }}
                >
                  Send Email
                </PrimaryButton>
              ) : (
                <div style={{ transform: `scale(${toastShowU})` }}>
                  <Chip variant="green" style={{ height: 46, paddingLeft: 20, paddingRight: 20, fontSize: 21 }}>
                    <span>Sent via Gmail</span>
                    <AnimatedTick t={t} startSec={29.75} color={C.greenText} size={22} strokeWidth={2.5} />
                  </Chip>
                </div>
              )}
            </div>
          </div>
        </div>
      </SamyojAppShell>

      <SuccessBurst t={t} startSec={29.75} x={1580} y={915} colors={[C.waIcon, C.successGreen]} count={8} />

      {/* Hand-off out: Instagram tile flies in (30.7 - 31.1) */}
      {t >= 30.7 && (
        <div
          style={{
            position: "absolute",
            left: igX - 50,
            top: igY - 50,
            opacity: seg(t, 30.7, 30.9, E_ENTER) * (1 - seg(t, 30.95, 31.15, E_EXIT)),
            zIndex: 240,
          }}
        >
          <ChannelTileIcon kind="instagram" size={100} radius={24} />
        </div>
      )}

      <CursorOverlay
        t={t}
        visibleStart={27.35}
        visibleEnd={29.85}
        segments={[
          {
            from: [760, 440],
            to: [560, 390],
            moveStart: 27.4,
            moveEnd: 27.74,
            clickAt: 27.76,
            rippleColor: C.indigo,
          },
          {
            from: [560, 390],
            to: [1615, 922],
            moveStart: 29.15,
            moveEnd: 29.58,
            clickAt: 29.6,
            rippleColor: C.waIcon,
          },
        ]}
      />
      </AbsoluteFill>

      <CaptionBar
        t={t}
        startSec={27.0}
        endSec={31.0}
        words={[
          { text: "Send" },
          { text: "follow-up" },
          { text: "emails" },
          { text: "via" },
          { text: "Gmail", accentColor: C.gmailRed },
        ]}
      />
    </AbsoluteFill>
  );
};
