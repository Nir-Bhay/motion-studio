import React from "react";
import { useCurrentFrame } from "remotion";
import { THEME } from "../theme";
import { FONTS } from "../fonts";
import { AppShell } from "../ui/AppShell";
import { PhoneFrame } from "../ui/PhoneFrame";
import { CameraRig } from "../motion/CameraRig";
import { OrganicCursor } from "../ui/Cursor";
import { EditorialSplit } from "../motion/KineticText";
import { easeRange, enterTriad, outExpo } from "../motion/easing";
import { IconCheck, IconEmail, IconWhatsApp } from "../ui/SamyojIcons";

const RECIPIENTS = [
  { name: "Riya Mehta", ch: "WhatsApp", status: "Unread", time: "Sent 10:02 AM" },
  { name: "Kabir Shah", ch: "WhatsApp", status: "Unread", time: "Sent 10:02 AM" },
  { name: "Pooja Nair", ch: "Email", status: "Unread", time: "Sent 10:03 AM" },
  { name: "Meera Patel", ch: "WhatsApp", status: "Read", time: "Read 10:04 AM" },
  { name: "Aarav Verma", ch: "WhatsApp", status: "Read", time: "Read 10:05 AM" },
];

/**
 * S07 Campaigns + Read/Unread Filter & Instant Follow-Up (42.50s -> 47.90s, 334f)
 * Zero fake UPI — showcases real Campaign analytics, one-click Read/Unread filter,
 * and instant Follow-up message/email dispatch!
 * VO: "Send campaigns, filter who read or missed them in one click, and follow up right there."
 */
export const S07BroadcastPay: React.FC = () => {
  const frame = useCurrentFrame();

  const shellIn = enterTriad(frame, 4, 20, { y: 18, scaleFrom: 0.96, blurFrom: 5 });
  const phoneIn = enterTriad(frame, 14, 22, { y: 22, scaleFrom: 0.95, blurFrom: 5 });

  // Exact VO cue sync:
  // f=105 ("filter who read or missed them in one click"): clicks "Unread (1,150)" filter
  // f=215 ("and follow up right there"): clicks "Follow Up Unread" CTA
  const unreadFilterActive = frame >= 105;
  const followUpSent = frame >= 215;
  const sentPop = easeRange(frame, 215, 240, outExpo);
  const countP = easeRange(frame, 15, 85, outExpo);

  const shownRows = unreadFilterActive
    ? RECIPIENTS.filter((r) => r.status === "Unread")
    : RECIPIENTS;

  const camKeyframes = [
    { frame: 0,   scale: 0.99, x: 0,    y: 0 },
    { frame: 70,  scale: 1.0,  x: 0,    y: 0 },
    { frame: 135, scale: 1.22, x: 185,  y: -15 }, // Zoom into Read/Unread Filter + Recipient List
    { frame: 235, scale: 1.22, x: -165, y: -25 }, // Glide cleanly to Follow-Up CTA + Mobile preview
    { frame: 300, scale: 1.18, x: -165, y: -25 },
    { frame: 334, scale: 1.02, x: 0,    y: 0 },
  ];

  const cursorWaypoints = [
    { frame: 25,  x: 450,  y: 410 },
    { frame: 95,  x: 560,  y: 452 }, // "Unread / Missed (1,150)" filter pill
    { frame: 135, x: 560,  y: 452 },
    { frame: 205, x: 1095, y: 452 }, // "Follow Up Unread" green button
    { frame: 265, x: 1095, y: 452 },
  ];

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <CameraRig frame={frame} keyframes={camKeyframes}>
        <div
          style={{
            position: "absolute",
            left: 90,
            top: 38,
            right: 90,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <EditorialSplit
            frame={frame}
            startFrame={4}
            lead="Filter unread."
            accent="Follow up fast."
            accentColor={THEME.mintDeep}
            fontSize={46}
          />
          <div
            style={{
              padding: "9px 18px",
              borderRadius: 999,
              background: THEME.tintMint,
              border: "1px solid rgba(16,185,129,0.28)",
              fontFamily: FONTS.mono,
              fontSize: 12.5,
              fontWeight: 700,
              color: THEME.mintDeep,
            }}
          >
            CAMPAIGNS · READ / UNREAD TARGETING
          </div>
        </div>

        {/* Desktop Campaigns Window */}
        <div style={{ position: "absolute", left: 90, top: 112, width: 1280, ...shellIn.style }}>
          <AppShell
            activeTab="Campaigns"
            pageTitle="Campaigns"
            pageSubtitle="Filter Read & Unread recipients and follow up in one click"
            style={{ width: 1280, height: 860 }}
          >
            <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
              {/* Delivery KPIs */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
                {[
                  { label: "SENT", val: Math.round(12480 * countP).toLocaleString("en-IN"), col: THEME.brand },
                  { label: "DELIVERED", val: Math.round(12190 * countP).toLocaleString("en-IN"), col: THEME.brand },
                  { label: "READ", val: Math.round(11040 * countP).toLocaleString("en-IN"), col: THEME.mintDeep },
                  { label: "UNREAD / MISSED", val: Math.round(1150 * countP).toLocaleString("en-IN"), col: THEME.alertInk },
                ].map((k) => (
                  <div
                    key={k.label}
                    style={{
                      padding: "16px 18px",
                      borderRadius: 16,
                      background: "#FFFFFF",
                      border: `1px solid ${THEME.hairline}`,
                      boxShadow: THEME.shadowE1,
                    }}
                  >
                    <div style={{ fontFamily: FONTS.mono, fontSize: 10.5, color: THEME.ink3 }}>{k.label}</div>
                    <div style={{ fontFamily: FONTS.mono, fontSize: 32, fontWeight: 700, color: k.col, marginTop: 4 }}>{k.val}</div>
                  </div>
                ))}
              </div>

              {/* Filter & Instant Follow-up Toolbar */}
              <div
                style={{
                  padding: "14px 18px",
                  borderRadius: 16,
                  background: "#FFFFFF",
                  border: `1.5px solid ${THEME.hairline}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: THEME.ink3, marginRight: 6 }}>FILTER BY STATUS:</span>
                  {[
                    { id: "All (12,190)", active: !unreadFilterActive },
                    { id: "Read (11,040)", active: false },
                    { id: "Unread / Missed (1,150)", active: unreadFilterActive },
                  ].map((pill) => (
                    <span
                      key={pill.id}
                      style={{
                        padding: "7px 14px",
                        borderRadius: 10,
                        background: pill.active ? (pill.id.includes("Unread") ? "#FEF2F2" : THEME.tintBrand) : "#F8FAFC",
                        border: pill.active ? `1.5px solid ${pill.id.includes("Unread") ? THEME.alertInk : THEME.brand}` : `1px solid ${THEME.hairline}`,
                        color: pill.active ? (pill.id.includes("Unread") ? THEME.alertInk : THEME.brand) : THEME.ink2,
                        fontFamily: FONTS.ui,
                        fontSize: 13,
                        fontWeight: pill.active ? 700 : 500,
                      }}
                    >
                      {pill.id}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    padding: "10px 20px",
                    borderRadius: 12,
                    background: followUpSent ? THEME.mintDeep : "#16A34A",
                    color: "#FFFFFF",
                    fontFamily: FONTS.ui,
                    fontSize: 13.5,
                    fontWeight: 700,
                    boxShadow: THEME.shadowE1,
                  }}
                >
                  {followUpSent ? "✓ Follow-up Queued (1,150)" : "Follow Up Unread →"}
                </div>
              </div>

              {/* Filtered Recipient Table */}
              <div
                style={{
                  flex: 1,
                  borderRadius: 18,
                  background: "#FFFFFF",
                  border: `1px solid ${THEME.hairline}`,
                  padding: "16px 20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <span style={{ fontFamily: FONTS.display, fontSize: 16, fontWeight: 700, color: THEME.ink }}>
                    {unreadFilterActive ? "Filtered: Unread Recipients (Ready for Follow-Up)" : "Campaign Recipients"}
                  </span>
                  <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: THEME.ink3 }}>
                    WhatsApp + Follow-Up Email
                  </span>
                </div>

                {shownRows.map((r) => (
                  <div
                    key={r.name}
                    style={{
                      padding: "12px 14px",
                      borderRadius: 12,
                      background: r.status === "Unread" ? "#FFFBFB" : "#F8FAFC",
                      border: `1px solid ${r.status === "Unread" ? "rgba(239,68,68,0.2)" : THEME.hairline}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      {r.ch === "WhatsApp" ? <IconWhatsApp size={18} /> : <IconEmail size={18} />}
                      <div>
                        <div style={{ fontFamily: FONTS.ui, fontSize: 14, fontWeight: 700, color: THEME.ink }}>{r.name}</div>
                        <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: THEME.ink3 }}>{r.ch} · {r.time}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span
                        style={{
                          padding: "4px 10px",
                          borderRadius: 999,
                          background: r.status === "Unread" ? "#FEE2E2" : THEME.tintMint,
                          color: r.status === "Unread" ? THEME.alertInk : THEME.mintDeep,
                          fontFamily: FONTS.mono,
                          fontSize: 11,
                          fontWeight: 700,
                        }}
                      >
                        {r.status}
                      </span>
                      {followUpSent && r.status === "Unread" ? (
                        <span
                          style={{
                            padding: "4px 10px",
                            borderRadius: 999,
                            background: THEME.tintBrand,
                            color: THEME.brand,
                            fontFamily: FONTS.mono,
                            fontSize: 11,
                            fontWeight: 700,
                            opacity: sentPop,
                          }}
                        >
                          Follow-up sent ✓
                        </span>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AppShell>
        </div>

        {/* Right Authentic Samyoj Mobile App ("Message status 100% Delivered" matching screenshot!) */}
        <div style={{ position: "absolute", right: 86, top: 122, ...phoneIn.style }}>
          <PhoneFrame
            width={410}
            height={830}
            rotateX={3}
            rotateY={-8}
            timeLabel="10:06"
            showMobileChrome
            mobileTitle="Campaigns"
            activeMobileTab="Campaigns"
          >
            <div style={{ height: "100%", background: "#FAFBFD", padding: "16px", display: "flex", flexDirection: "column", gap: 14 }}>
              {/* Message Status Ring Card matching real mobile screenshot image-4! */}
              <div
                style={{
                  padding: "18px",
                  borderRadius: 18,
                  background: "#FFFFFF",
                  border: `1px solid ${THEME.hairline}`,
                  boxShadow: THEME.shadowE1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <div style={{ fontFamily: FONTS.display, fontSize: 16, fontWeight: 700, color: THEME.ink, marginBottom: 14 }}>
                  Message status
                </div>
                <div
                  style={{
                    width: 112,
                    height: 112,
                    borderRadius: "50%",
                    border: "10px solid #22C55E",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 12,
                  }}
                >
                  <div style={{ fontFamily: FONTS.display, fontSize: 24, fontWeight: 800, color: THEME.ink }}>100%</div>
                  <div style={{ fontFamily: FONTS.ui, fontSize: 11, color: THEME.ink3 }}>Delivered</div>
                </div>
                <div style={{ fontFamily: FONTS.mono, fontSize: 11.5, color: "#15803D", fontWeight: 700 }}>
                  ● 1,150 Unread filtered
                </div>
              </div>

              {/* Follow-up Campaign Card */}
              <div
                style={{
                  padding: "16px",
                  borderRadius: 18,
                  background: followUpSent ? THEME.tintMint : "#FFFFFF",
                  border: `1.5px solid ${followUpSent ? THEME.mint : THEME.hairline}`,
                  boxShadow: THEME.shadowE2,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <IconCheck size={16} color={followUpSent ? THEME.mintDeep : THEME.brand} />
                  <span style={{ fontFamily: FONTS.display, fontSize: 15, fontWeight: 700, color: THEME.ink }}>
                    {followUpSent ? "Follow-up Dispatched" : "Unread Nudge Ready"}
                  </span>
                </div>
                <div style={{ fontFamily: FONTS.ui, fontSize: 13, color: THEME.ink2, lineHeight: 1.4 }}>
                  {followUpSent
                    ? "Smart WhatsApp + Email follow-up sent to all 1,150 unread contacts."
                    : "Tap Follow Up Unread to re-engage missed campaign recipients."}
                </div>
              </div>
            </div>
          </PhoneFrame>
        </div>

        <OrganicCursor frame={frame} waypoints={cursorWaypoints} clickFrames={[105, 215]} />
      </CameraRig>
    </div>
  );
};
