import React from "react";
import { useCurrentFrame } from "remotion";
import { THEME } from "../theme";
import { FONTS } from "../fonts";
import { AppShell } from "../ui/AppShell";
import { PhoneFrame } from "../ui/PhoneFrame";
import { CameraRig } from "../motion/CameraRig";
import { EditorialSplit } from "../motion/KineticText";
import { easeRange, enterTriad, outExpo } from "../motion/easing";
import { IconCheck, IconSpark, IconWhatsApp } from "../ui/SamyojIcons";

/**
 * S05 AI Studio (25.80s -> 36.77s, 668f)
 * Dense Desktop AI Studio (AI Chatting + AI Calling waveform + Hinglish/EN Signals)
 * + Authentic Modern Mobile Samyoj App with WhatsApp-styled #EFEAE2 chat.
 * VO: "Inside AI Studio, Samyoj runs AI chatting and AI calling around the clock,
 *      answering questions in English or Hinglish and qualifying buyers automatically."
 */
export const S05AiQualify: React.FC = () => {
  const frame = useCurrentFrame();

  const shellIn = enterTriad(frame, 4, 20, { y: 18, scaleFrom: 0.96, blurFrom: 5 });
  const phoneIn = enterTriad(frame, 14, 22, { y: 24, scaleFrom: 0.95, blurFrom: 5 });

  // Hinglish mobile reply lands at f=275 ("English or Hinglish")
  const aiReplied = frame >= 275;
  const replyPop = easeRange(frame, 275, 298, outExpo);
  const sig1 = enterTriad(frame, 360, 18, { y: 12 });
  const sig2 = enterTriad(frame, 385, 18, { y: 12 });
  const sig3 = enterTriad(frame, 410, 18, { y: 12 });
  const routeProgress = easeRange(frame, 455, 540, outExpo);

  const camKeyframes = [
    { frame: 0,   scale: 0.99, x: 0,   y: 0 },
    { frame: 70,  scale: 1.0,  x: 0,   y: 0 },
    { frame: 145, scale: 1.05, x: 25,  y: 12 },
    { frame: 245, scale: 1.05, x: 25,  y: 12 },
    { frame: 325, scale: 1.06, x: -30, y: -6 },
    { frame: 440, scale: 1.06, x: -30, y: -6 },
    { frame: 525, scale: 1.04, x: 12,  y: -14 },
    { frame: 615, scale: 1.04, x: 12,  y: -14 },
    { frame: 668, scale: 1.0,  x: 0,   y: 0 },
  ];

  // Animated 2D AI Calling waveform bars
  const waveBars = Array.from({ length: 18 }, (_, i) => {
    const h = 10 + Math.abs(Math.sin(frame * 0.16 + i * 0.65)) * 28;
    return h;
  });

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
            lead="AI chatting & calling."
            accent="24/7."
            accentColor={THEME.brand}
            fontSize={44}
          />
          <div
            style={{
              padding: "9px 18px",
              borderRadius: 999,
              background: THEME.tintBrand,
              border: "1px solid rgba(75,46,235,0.22)",
              fontFamily: FONTS.mono,
              fontSize: 12.5,
              fontWeight: 700,
              color: THEME.brand,
            }}
          >
            AI STUDIO · BILINGUAL EN / HINGLISH
          </div>
        </div>

        {/* Desktop AI Studio Workspace (1260px wide on left) */}
        <div style={{ position: "absolute", left: 90, top: 112, width: 1280, ...shellIn.style }}>
          <AppShell
            activeTab="AI Studio"
            pageTitle="AI Studio"
            pageSubtitle="AI Chatting · AI Calling · Automated Qualification"
            style={{ width: 1280, height: 860 }}
          >
            <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
              {/* Top Row: Dual Live Engines — AI Chatting + AI Calling */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {/* AI Chatting Card */}
                <div
                  style={{
                    padding: "20px",
                    borderRadius: 18,
                    background: "#FFFFFF",
                    border: `1.5px solid rgba(75,46,235,0.24)`,
                    boxShadow: THEME.shadowE2,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 12, background: THEME.tintBrand, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <IconSpark size={20} color={THEME.brand} />
                      </div>
                      <div>
                        <div style={{ fontFamily: FONTS.display, fontSize: 17, fontWeight: 700, color: THEME.ink }}>AI Chatting Agent</div>
                        <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: THEME.ink3 }}>WhatsApp · Instagram · Messenger</div>
                      </div>
                    </div>
                    <span style={{ padding: "4px 10px", borderRadius: 999, background: THEME.tintMint, color: THEME.mintDeep, fontFamily: FONTS.mono, fontSize: 10.5, fontWeight: 700 }}>
                      ● ACTIVE 24/7
                    </span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                    {[
                      { k: "LANGUAGES", v: "EN + Hinglish" },
                      { k: "AVG REPLY", v: "3.2 sec" },
                      { k: "AUTO HANDOFF", v: "Instant" },
                    ].map((st) => (
                      <div key={st.k} style={{ padding: "10px 12px", borderRadius: 12, background: "#F8FAFC", border: `1px solid ${THEME.hairline}` }}>
                        <div style={{ fontFamily: FONTS.mono, fontSize: 9.5, color: THEME.ink3 }}>{st.k}</div>
                        <div style={{ fontFamily: FONTS.display, fontSize: 15, fontWeight: 700, color: THEME.ink, marginTop: 2 }}>{st.v}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Calling Card with animated 2D Waveform */}
                <div
                  style={{
                    padding: "20px",
                    borderRadius: 18,
                    background: "linear-gradient(135deg, #F8FAFF 0%, #EEF2FF 100%)",
                    border: "1.5px solid rgba(75,46,235,0.24)",
                    boxShadow: THEME.shadowE2,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <div>
                      <div style={{ fontFamily: FONTS.display, fontSize: 17, fontWeight: 700, color: THEME.ink }}>AI Calling Studio</div>
                      <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: THEME.ink2 }}>Inbound &amp; Lead Qualification Voice</div>
                    </div>
                    <span style={{ padding: "4px 10px", borderRadius: 999, background: THEME.brand, color: "#FFFFFF", fontFamily: FONTS.mono, fontSize: 10.5, fontWeight: 700 }}>
                      LIVE CALL · 00:18
                    </span>
                  </div>
                  {/* 2D Animated Voice Waveform */}
                  <div style={{ height: 46, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 4, padding: "0 8px", background: "#FFFFFF", borderRadius: 12, border: `1px solid ${THEME.hairline}` }}>
                    {waveBars.map((h, idx) => (
                      <div
                        key={idx}
                        style={{
                          flex: 1,
                          height: h,
                          borderRadius: 999,
                          background: idx % 3 === 0 ? THEME.mint : THEME.brand,
                          opacity: 0.85,
                        }}
                      />
                    ))}
                  </div>
                  <div style={{ fontFamily: FONTS.ui, fontSize: 12, color: THEME.ink2, marginTop: 10 }}>
                    “Confirming your Indigo Runner Size 9 order &amp; sending details on WhatsApp.”
                  </div>
                </div>
              </div>

              {/* Extracted Buyer Qualification Signals */}
              <div>
                <div style={{ fontFamily: FONTS.mono, fontSize: 11, fontWeight: 700, color: THEME.ink3, letterSpacing: "0.08em", marginBottom: 10 }}>
                  AUTOMATIC BUYER QUALIFICATION
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
                  {[
                    { k: "DETECTED LANGUAGE", v: "Hinglish (EN+HI)", badge: "Auto-matched", st: sig1.style },
                    { k: "PRODUCT INTENT", v: "Indigo Runner · UK 9", badge: "In stock", st: sig2.style },
                    { k: "BUYER URGENCY", v: "Needs today", badge: "High intent", st: sig3.style },
                  ].map((item) => (
                    <div
                      key={item.k}
                      style={{
                        padding: "16px 18px",
                        borderRadius: 16,
                        background: "#FFFFFF",
                        border: "1px solid rgba(16,185,129,0.28)",
                        boxShadow: THEME.shadowE1,
                        ...item.st,
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                        <span style={{ fontFamily: FONTS.mono, fontSize: 10, color: THEME.ink3 }}>{item.k}</span>
                        <IconCheck size={14} color={THEME.mint} />
                      </div>
                      <div style={{ fontFamily: FONTS.display, fontSize: 18, fontWeight: 700, color: THEME.ink }}>{item.v}</div>
                      <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: THEME.mintDeep, marginTop: 4 }}>{item.badge}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Handoff Routing Bar with 2D animated packet */}
              <div
                style={{
                  padding: "18px 22px",
                  borderRadius: 18,
                  background: "#FFFFFF",
                  border: `1.5px solid ${THEME.hairline}`,
                  boxShadow: THEME.shadowE1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ padding: "5px 12px", borderRadius: 999, background: THEME.brand, color: "#FFFFFF", fontFamily: FONTS.mono, fontSize: 11, fontWeight: 700 }}>
                    QUALIFIED LEAD
                  </span>
                  <span style={{ fontFamily: FONTS.ui, fontSize: 14, fontWeight: 600, color: THEME.ink }}>
                    Context synced → Human rep + Follow-up Email queued
                  </span>
                </div>
                <div style={{ width: 210, height: 8, borderRadius: 999, background: "#EEF2FF", overflow: "hidden", position: "relative" }}>
                  <div
                    style={{
                      width: `${Math.round(routeProgress * 100)}%`,
                      height: "100%",
                      borderRadius: 999,
                      background: `linear-gradient(90deg, ${THEME.brand}, ${THEME.mint})`,
                    }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#16A34A", color: "#FFFFFF", fontFamily: FONTS.mono, fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    R
                  </div>
                  <div>
                    <div style={{ fontFamily: FONTS.ui, fontSize: 13, fontWeight: 700, color: THEME.ink }}>Rohan</div>
                    <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: THEME.ink3 }}>Assigned Rep</div>
                  </div>
                </div>
              </div>
            </div>
          </AppShell>
        </div>

        {/* Right Modern Samyoj Mobile App showing live Hinglish conversation */}
        <div style={{ position: "absolute", right: 86, top: 122, ...phoneIn.style }}>
          <PhoneFrame
            width={410}
            height={830}
            rotateX={3}
            rotateY={-8}
            timeLabel="06:12"
            showMobileChrome
            mobileTitle="AI Concierge"
            activeMobileTab="Automate"
          >
            <div style={{ height: "100%", background: "#EFEAE2", padding: "16px 14px", display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ alignSelf: "center", padding: "4px 12px", borderRadius: 999, background: "rgba(255,255,255,0.85)", fontFamily: FONTS.mono, fontSize: 10.5, color: THEME.ink2 }}>
                <IconWhatsApp size={12} /> Hinglish AI · Active
              </div>

              {/* Buyer Hinglish Bubble */}
              <div style={{ alignSelf: "flex-start", maxWidth: "85%", padding: "11px 14px", borderRadius: "4px 14px 14px 14px", background: "#FFFFFF", boxShadow: "0 1px 2px rgba(0,0,0,0.08)" }}>
                <div style={{ fontFamily: FONTS.ui, fontSize: 14.5, fontWeight: 600, color: THEME.ink }}>
                  Bhaiya, size 9 mein milega kya?
                </div>
                <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: THEME.ink3, marginTop: 4 }}>Meera · Hinglish detected</div>
              </div>

              {/* Typing or AI Hinglish Reply */}
              {aiReplied ? (
                <div
                  style={{
                    alignSelf: "flex-end",
                    maxWidth: "88%",
                    padding: "12px 14px",
                    borderRadius: "14px 4px 14px 14px",
                    background: "#D9FDD3",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
                    opacity: replyPop,
                    transform: `translate3d(0, ${((1 - replyPop) * 12).toFixed(1)}px, 0)`,
                  }}
                >
                  <div style={{ fontFamily: FONTS.ui, fontSize: 14, color: "#064E3B", fontWeight: 500, lineHeight: 1.45 }}>
                    Haan ji! Size 9 Indigo Runner stock mein hai. Aaj dispatch ready — confirmation email bhi bhej diya hai!
                  </div>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: "#0284C7", marginTop: 5, textAlign: "right", fontWeight: 700 }}>
                    AI Replied in 3.2s ✓✓
                  </div>
                </div>
              ) : (
                <div style={{ alignSelf: "flex-end", padding: "10px 16px", borderRadius: 14, background: "#D9FDD3", fontFamily: FONTS.mono, fontSize: 14, color: "#15803D" }}>
                  AI typing •••
                </div>
              )}
            </div>
          </PhoneFrame>
        </div>
      </CameraRig>
    </div>
  );
};
