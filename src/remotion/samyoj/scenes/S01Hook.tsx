import React from "react";
import { useCurrentFrame } from "remotion";
import { THEME } from "../theme";
import { FONTS } from "../fonts";
import { CameraRig } from "../motion/CameraRig";
import { MaskedLine } from "../motion/KineticText";
import { UnreadDotMotif } from "../motion/DotMotif";
import { easeRange, enterTriad, inOutQuart, outExpo } from "../motion/easing";
import { PhoneFrame } from "../ui/PhoneFrame";
import { IconWhatsApp } from "../ui/SamyojIcons";

/**
 * S01 Hook (0.00s -> 3.67s, 230f)
 * Modern Samyoj Mobile App UI -> centers smoothly as camera zooms into the 6:12 AM unread lead.
 */
export const S01Hook: React.FC = () => {
  const frame = useCurrentFrame();

  const pillIn = enterTriad(frame, 4, 18, { y: 12, blurFrom: 4 });
  const subIn = enterTriad(frame, 28, 20, { y: 12, blurFrom: 5 });
  const phoneIn = enterTriad(frame, 6, 22, { y: 28, scaleFrom: 0.94, blurFrom: 6 });

  const pulse = (Math.sin(frame * 0.18) + 1) * 0.5;
  const elapsedFade = easeRange(frame, 55, 85, outExpo);

  // Smooth transition: phone starts on right (left: 1180) and glides cleanly to DEAD CENTER (left: 745)
  // while left editorial text fades cleanly away before zoom-in (zero half-clipped words!)
  const centerProgress = easeRange(frame, 92, 168, inOutQuart);
  const phoneLeft = 1180 - centerProgress * 435; // 1180 -> 745 (745 + 430/2 = 960 center!)
  const leftOpacity = 1 - easeRange(frame, 88, 145, inOutQuart);

  const camKeyframes = [
    { frame: 0, scale: 1.0, x: 0, y: 0 },
    { frame: 92, scale: 1.0, x: 0, y: 0 },
    { frame: 185, scale: 1.18, x: 0, y: 12 },
    { frame: 230, scale: 1.22, x: 0, y: 16 },
  ];

  const floatY = Math.sin(frame * 0.055) * 4;

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <CameraRig frame={frame} keyframes={camKeyframes}>
        {/* Left Editorial Lockup */}
        <div
          style={{
            position: "absolute",
            left: 130,
            top: 300,
            width: 740,
            opacity: leftOpacity,
            transform: `translate3d(${(-centerProgress * 50).toFixed(1)}px, 0, 0)`,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 20px",
              borderRadius: 999,
              background: "#FFFFFF",
              border: `1px solid ${THEME.hairline}`,
              boxShadow: THEME.shadowE1,
              marginBottom: 26,
              ...pillIn.style,
            }}
          >
            <UnreadDotMotif size={20} morph={0} pulse={pulse} />
            <span style={{ fontFamily: FONTS.mono, fontSize: 16, fontWeight: 700, color: THEME.alertInk }}>
              06:12 AM
            </span>
            <span style={{ fontFamily: FONTS.mono, fontSize: 13.5, color: THEME.ink3 }}>NO REPLY · 6h 25m</span>
          </div>

          <h1
            style={{
              margin: 0,
              fontFamily: FONTS.display,
              fontSize: 96,
              fontWeight: 800,
              lineHeight: 0.96,
              letterSpacing: "-0.04em",
              color: THEME.ink,
            }}
          >
            <MaskedLine frame={frame} startFrame={10} duration={20}>
              Leads don&apos;t
            </MaskedLine>
            <MaskedLine frame={frame} startFrame={18} duration={20}>
              <span
                style={{
                  fontFamily: FONTS.serif,
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: THEME.alertInk,
                  fontSize: "1.1em",
                }}
              >
                wait.
              </span>
            </MaskedLine>
          </h1>

          <p
            style={{
              marginTop: 22,
              fontFamily: FONTS.grotesk,
              fontSize: 24,
              lineHeight: 1.4,
              color: THEME.ink2,
              ...subIn.style,
            }}
          >
            Every unread message at 6 AM is a customer slipping away.
          </p>
        </div>

        {/* Modern Samyoj Mobile App Frame -> glides to dead center */}
        <div
          style={{
            position: "absolute",
            left: phoneLeft,
            top: 112,
            opacity: phoneIn.opacity,
            filter: phoneIn.blur > 0.15 ? `blur(${phoneIn.blur.toFixed(2)}px)` : undefined,
            transform: `translate3d(0, ${(phoneIn.y + floatY).toFixed(2)}px, 0) scale(${phoneIn.scale.toFixed(4)})`,
          }}
        >
          <PhoneFrame
            width={430}
            height={840}
            rotateX={3 * (1 - centerProgress)}
            rotateY={-7 * (1 - centerProgress)}
            timeLabel="06:12"
            coldMode
            showMobileChrome
            mobileTitle="Inbox"
            activeMobileTab="Inbox"
          >
            <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#FAFBFD" }}>
              {/* Mobile Search + Channel Filter Strip matching real app */}
              <div style={{ padding: "10px 14px", background: "#FFFFFF", borderBottom: `1px solid ${THEME.hairline}` }}>
                <div
                  style={{
                    height: 34,
                    borderRadius: 10,
                    background: "#F8FAFC",
                    border: `1px solid ${THEME.hairline}`,
                    padding: "0 12px",
                    display: "flex",
                    alignItems: "center",
                    fontFamily: FONTS.ui,
                    fontSize: 12,
                    color: THEME.ink3,
                    marginBottom: 8,
                  }}
                >
                  🔍 Search inbox...
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  {[
                    { label: "All", active: false },
                    { label: "Unread (7)", active: true },
                    { label: "Open", active: false },
                  ].map((chip) => (
                    <span
                      key={chip.label}
                      style={{
                        padding: "4px 10px",
                        borderRadius: 999,
                        background: chip.active ? "#FEF2F2" : "#F1F5F9",
                        border: chip.active ? "1px solid rgba(239,68,68,0.28)" : "1px solid transparent",
                        color: chip.active ? THEME.alertInk : THEME.ink2,
                        fontFamily: FONTS.ui,
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      {chip.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Active Unread Hero Thread + Queue */}
              <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
                <div
                  style={{
                    padding: "14px",
                    borderRadius: 16,
                    background: "#FFFFFF",
                    border: "1.5px solid rgba(239,68,68,0.32)",
                    boxShadow: THEME.shadowE2,
                    position: "relative",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
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
                        <div style={{ fontFamily: FONTS.ui, fontSize: 14, fontWeight: 700, color: THEME.ink }}>
                          Meera Patel
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: FONTS.mono, fontSize: 10.5, color: THEME.ink3 }}>
                          <IconWhatsApp size={12} />
                          <span>WhatsApp · 11:47 PM</span>
                        </div>
                      </div>
                    </div>
                    <UnreadDotMotif size={20} morph={0} pulse={pulse} />
                  </div>

                  <div style={{ fontFamily: FONTS.ui, fontSize: 15, fontWeight: 600, color: THEME.ink, marginBottom: 10 }}>
                    Hi, is Size 9 Indigo Runner available?
                  </div>

                  <div
                    style={{
                      opacity: elapsedFade,
                      padding: "7px 10px",
                      borderRadius: 9,
                      background: "#FEF2F2",
                      border: "1px solid rgba(239,68,68,0.22)",
                      display: "flex",
                      justifyContent: "space-between",
                      fontFamily: FONTS.mono,
                      fontSize: 11,
                      fontWeight: 700,
                      color: THEME.alertInk,
                    }}
                  >
                    <span>Unreplied · 6h 25m</span>
                    <span>NO REPLY</span>
                  </div>
                </div>

                {/* Additional unread rows matching authentic mobile inbox list */}
                {[
                  { init: "RK", bg: "#EC4899", name: "Rohan Kapoor", ch: "Instagram DM", msg: "Price & COD available?", time: "04:18 AM" },
                  { init: "AV", bg: "#2563EB", name: "Aarav Verma", ch: "Messenger", msg: "Order status update please", time: "05:05 AM" },
                  { init: "SN", bg: "#F59E0B", name: "Sanya Nair", ch: "Email", msg: "Bulk team order inquiry", time: "05:44 AM" },
                ].map((r) => (
                  <div
                    key={r.name}
                    style={{
                      padding: "11px 12px",
                      borderRadius: 14,
                      background: "#FFFFFF",
                      border: `1px solid ${THEME.hairline}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: "50%",
                          background: r.bg,
                          color: "#FFFFFF",
                          fontFamily: FONTS.mono,
                          fontSize: 11,
                          fontWeight: 700,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {r.init}
                      </div>
                      <div>
                        <div style={{ fontFamily: FONTS.ui, fontSize: 13, fontWeight: 700, color: THEME.ink }}>{r.name}</div>
                        <div style={{ fontFamily: FONTS.ui, fontSize: 11.5, color: THEME.ink2 }}>{r.msg}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: THEME.ink3 }}>{r.time}</div>
                      <span
                        style={{
                          display: "inline-block",
                          marginTop: 3,
                          padding: "1px 6px",
                          borderRadius: 999,
                          background: "#FEF2F2",
                          color: THEME.alertInk,
                          fontFamily: FONTS.mono,
                          fontSize: 9.5,
                          fontWeight: 700,
                        }}
                      >
                        Unread
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </PhoneFrame>
        </div>
      </CameraRig>
    </div>
  );
};
