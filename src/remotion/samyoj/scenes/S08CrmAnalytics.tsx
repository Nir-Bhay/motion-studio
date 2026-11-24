import React from "react";
import { useCurrentFrame } from "remotion";
import { THEME } from "../theme";
import { FONTS } from "../fonts";
import { AppShell } from "../ui/AppShell";
import { CameraRig } from "../motion/CameraRig";
import { EditorialSplit } from "../motion/KineticText";
import { easeRange, enterTriad, inOutQuart, outExpo } from "../motion/easing";
import { IconEmail, IconInstagram, IconMessenger, IconMeta, IconWhatsApp } from "../ui/SamyojIcons";

/**
 * S08 Real Samyoj Dashboard + Meta Ads Performance + Instagram Post Scheduler & Comment Automation
 * (47.90s -> 56.93s, 552f)
 * Zero unimplemented Kanban Sales Pipeline!
 * Modeled directly on the user's real Dashboard screenshot (image-7):
 * - View 1 (0..265f): All Channels 4/4 Connected · Meta Ads Performance (Spend/Leads/CPL view only) · Live overview sparklines · Message status donut
 * - View 2 (265..552f): Smooth pan to Instagram Post Management & Auto-Templated Scheduling + Comment Automation + Email Follow-Up
 */
export const S08CrmAnalytics: React.FC = () => {
  const frame = useCurrentFrame();

  const shellIn = enterTriad(frame, 4, 20, { y: 18, scaleFrom: 0.96, blurFrom: 5 });

  // Horizontal camera/tab slide from Dashboard -> Instagram Posts & Comment Automation at f=235..285
  const slideToSocial = easeRange(frame, 235, 285, inOutQuart);
  const sparkDraw = easeRange(frame, 25, 110, outExpo);
  const postPop = enterTriad(frame, 275, 22, { y: 16 });

  const camKeyframes = [
    { frame: 0,   scale: 0.99, x: 0,   y: 0 },
    { frame: 75,  scale: 1.08, x: -10, y: 55 },  // Focus cleanly on full Dashboard + Meta Ads Performance
    { frame: 185, scale: 1.08, x: -10, y: 55 },
    { frame: 280, scale: 1.02, x: 0,   y: 0 },   // Reveal full Instagram Post Scheduling + Comment Automation
    { frame: 440, scale: 1.06, x: 0,   y: -15 },
    { frame: 552, scale: 1.0,  x: 0,   y: 0 },
  ];

  const isSocialView = slideToSocial > 0.5;

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <CameraRig frame={frame} keyframes={camKeyframes}>
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
            lead={isSocialView ? "Posts, comments &" : "Live Meta ads &"}
            accent={isSocialView ? "auto-replies." : "analytics."}
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
              fontFamily: FONTS.mono,
              fontSize: 12.5,
              fontWeight: 700,
              color: THEME.brand,
            }}
          >
            {isSocialView ? "INSTAGRAM POSTS · COMMENT AUTOMATION" : "DASHBOARD · META ADS PERFORMANCE"}
          </div>
        </div>

        <div style={{ position: "absolute", left: 110, top: 116, ...shellIn.style }}>
          <AppShell
            activeTab={isSocialView ? "Instagram" : "Dashboard"}
            pageTitle={isSocialView ? "Instagram Studio" : "Dashboard"}
            pageSubtitle={
              isSocialView
                ? "Auto-templated post scheduling, comment automation & lead emails"
                : "WhatsApp, Instagram, Facebook & Email at a glance"
            }
          >
            <div style={{ width: "200%", height: "100%", display: "flex", transform: `translate3d(${(-slideToSocial * 50).toFixed(2)}%, 0, 0)` }}>
              {/* VIEW 1: Real Samyoj Dashboard matching image-7 */}
              <div style={{ width: "50%", padding: "18px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
                {/* Top 5 Channel Strip matching screenshot */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
                  {[
                    { name: "All Channels", sub: "WA · IG · FB · Email", active: true, icon: <IconWhatsApp size={18} /> },
                    { name: "WhatsApp", sub: "● Connected", active: false, icon: <IconWhatsApp size={18} /> },
                    { name: "Facebook", sub: "● Connected", active: false, icon: <IconMessenger size={18} /> },
                    { name: "Instagram", sub: "● Connected", active: false, icon: <IconInstagram size={18} /> },
                    { name: "Email", sub: "● Connected", active: false, icon: <IconEmail size={18} /> },
                  ].map((ch) => (
                    <div
                      key={ch.name}
                      style={{
                        padding: "10px 12px",
                        borderRadius: 12,
                        background: "#FFFFFF",
                        border: ch.active ? "1.5px solid #38BDF8" : `1px solid ${THEME.hairline}`,
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      {ch.icon}
                      <div>
                        <div style={{ fontFamily: FONTS.ui, fontSize: 12.5, fontWeight: 700, color: THEME.ink }}>{ch.name}</div>
                        <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: "#16A34A" }}>{ch.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Meta Ads Performance Card matching screenshot ("Meta ad account (not Samyoj billing)") */}
                <div
                  style={{
                    padding: "16px 20px",
                    borderRadius: 16,
                    background: "#FFFFFF",
                    border: `1.5px solid rgba(75,46,235,0.22)`,
                    boxShadow: THEME.shadowE1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <IconMeta size={22} />
                    </div>
                    <div>
                      <div style={{ fontFamily: FONTS.display, fontSize: 16, fontWeight: 700, color: THEME.ink }}>
                        Meta ads performance
                      </div>
                      <div style={{ fontFamily: FONTS.ui, fontSize: 12, color: THEME.ink3 }}>
                        Last 30 days · Live ad analytics (Meta ad account)
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 38 }}>
                    {[
                      { k: "SPEND", v: "₹18,450" },
                      { k: "LEADS", v: "142" },
                      { k: "CPL", v: "₹129" },
                    ].map((m) => (
                      <div key={m.k}>
                        <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: THEME.ink3 }}>{m.k}</div>
                        <div style={{ fontFamily: FONTS.display, fontSize: 22, fontWeight: 800, color: THEME.ink }}>{m.v}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Middle Row: Live Overview Sparklines + Message Status Donut + Recent Activity */}
                <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.9fr 1fr", gap: 14, flex: 1 }}>
                  {/* Live overview */}
                  <div style={{ padding: 16, borderRadius: 16, background: "#FFFFFF", border: `1px solid ${THEME.hairline}` }}>
                    <div style={{ fontFamily: FONTS.display, fontSize: 15, fontWeight: 700, color: THEME.ink, marginBottom: 10 }}>
                      Live overview
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                      {[
                        { label: "WhatsApp sent", val: "1,284", col: "#22C55E", icon: <IconWhatsApp size={16} /> },
                        { label: "Messenger chats", val: "418", col: "#2563EB", icon: <IconMessenger size={16} /> },
                        { label: "Instagram DMs", val: "692", col: "#EC4899", icon: <IconInstagram size={16} /> },
                      ].map((s, idx) => (
                        <div key={s.label} style={{ padding: 10, borderRadius: 12, background: "#F8FAFC", border: `1px solid ${THEME.hairline}` }}>
                          {s.icon}
                          <div style={{ fontFamily: FONTS.display, fontSize: 20, fontWeight: 800, color: THEME.ink, marginTop: 6 }}>{s.val}</div>
                          <div style={{ fontFamily: FONTS.ui, fontSize: 10.5, color: THEME.ink3, marginBottom: 8 }}>{s.label}</div>
                          <svg width={120} height={26} viewBox="0 0 120 26">
                            <path
                              d={`M 0 22 Q 30 ${18 - idx * 3}, 60 ${12 + idx * 2} T 120 5`}
                              fill="none"
                              stroke={s.col}
                              strokeWidth={2.5}
                              strokeDasharray={160}
                              strokeDashoffset={160 * (1 - sparkDraw)}
                            />
                          </svg>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Message status donut matching image-7 */}
                  <div style={{ padding: 16, borderRadius: 16, background: "#FFFFFF", border: `1px solid ${THEME.hairline}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ fontFamily: FONTS.display, fontSize: 15, fontWeight: 700, color: THEME.ink, marginBottom: 10 }}>
                      Message status
                    </div>
                    <div style={{ width: 96, height: 96, borderRadius: "50%", border: "10px solid #22C55E", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ fontFamily: FONTS.display, fontSize: 20, fontWeight: 800, color: THEME.ink }}>100%</div>
                      <div style={{ fontFamily: FONTS.ui, fontSize: 10, color: THEME.ink3 }}>Delivered</div>
                    </div>
                  </div>

                  {/* Needs attention matching image-7 */}
                  <div style={{ padding: 16, borderRadius: 16, background: "#FFFFFF", border: `1px solid ${THEME.hairline}`, display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ fontFamily: FONTS.display, fontSize: 15, fontWeight: 700, color: THEME.ink }}>
                      Needs attention
                    </div>
                    {[
                      { k: "Open chats", n: "4", col: THEME.alertInk },
                      { k: "Comments to review", n: "12", col: THEME.brand },
                      { k: "Confirmed-lead emails", n: "18 sent", col: THEME.mintDeep },
                    ].map((row) => (
                      <div key={row.k} style={{ padding: "8px 10px", borderRadius: 10, background: "#F8FAFC", display: "flex", justifyContent: "space-between", fontFamily: FONTS.ui, fontSize: 12 }}>
                        <span style={{ color: THEME.ink2 }}>{row.k}</span>
                        <span style={{ fontFamily: FONTS.mono, fontWeight: 700, color: row.col }}>{row.n}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* VIEW 2: Instagram Post Management & Auto-Template + Comment Automation + Email Follow-Up */}
              <div style={{ width: "50%", padding: "22px 26px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                {/* Auto-Templated Post Scheduling */}
                <div style={{ padding: 20, borderRadius: 18, background: "#FFFFFF", border: `1.5px solid rgba(225,48,108,0.25)`, boxShadow: THEME.shadowE2, ...postPop.style }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <IconInstagram size={22} />
                      <span style={{ fontFamily: FONTS.display, fontSize: 18, fontWeight: 700, color: THEME.ink }}>Post Management &amp; Scheduler</span>
                    </div>
                    <span style={{ padding: "4px 10px", borderRadius: 999, background: THEME.tintMint, color: THEME.mintDeep, fontFamily: FONTS.mono, fontSize: 10.5, fontWeight: 700 }}>
                      AUTO-TEMPLATED
                    </span>
                  </div>

                  <div style={{ padding: 16, borderRadius: 14, background: "linear-gradient(135deg, #FDF2F8, #EEF2FF)", border: `1px solid ${THEME.hairline}`, marginBottom: 14 }}>
                    <div style={{ fontFamily: FONTS.mono, fontSize: 10.5, color: "#BE185D", fontWeight: 700 }}>SCHEDULED · TODAY 6:00 PM</div>
                    <div style={{ fontFamily: FONTS.display, fontSize: 22, fontWeight: 800, color: THEME.ink, marginTop: 6 }}>
                      “Indigo Runner — Summer Drop”
                    </div>
                    <div style={{ fontFamily: FONTS.ui, fontSize: 12.5, color: THEME.ink2, marginTop: 6 }}>
                      Auto-template caption + hashtags + DM trigger linked
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                    {["Post Queued ✓", "Auto-Template Ready", "Reels + Carousel"].map((chip) => (
                      <span key={chip} style={{ padding: "6px 11px", borderRadius: 9, background: "#F8FAFC", border: `1px solid ${THEME.hairline}`, fontFamily: FONTS.mono, fontSize: 10.5, color: THEME.ink2 }}>
                        {chip}
                      </span>
                    ))}
                  </div>

                  {/* Scheduled Content Queue filling the card richly */}
                  <div style={{ fontFamily: FONTS.mono, fontSize: 10.5, fontWeight: 700, color: THEME.ink3, letterSpacing: "0.06em", marginBottom: 10 }}>
                    UPCOMING SCHEDULED POSTS
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      { when: "Tomorrow · 11:00 AM", title: "Customer Sizing Guide Carousel", tag: "Auto-DM: SIZE", col: THEME.brand },
                      { when: "Thu · 5:30 PM", title: "Behind the Scenes Reel", tag: "Auto-Reply: LINK", col: "#BE185D" },
                      { when: "Sat · 12:00 PM", title: "Weekend Restock Announcement", tag: "Template #04", col: THEME.mintDeep },
                    ].map((item) => (
                      <div
                        key={item.title}
                        style={{
                          padding: "12px 14px",
                          borderRadius: 12,
                          background: "#FAFBFD",
                          border: `1px solid ${THEME.hairline}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: THEME.ink3 }}>{item.when}</div>
                          <div style={{ fontFamily: FONTS.ui, fontSize: 13.5, fontWeight: 700, color: THEME.ink, marginTop: 2 }}>{item.title}</div>
                        </div>
                        <span style={{ padding: "4px 10px", borderRadius: 999, background: "#FFFFFF", border: `1px solid ${THEME.hairline}`, fontFamily: FONTS.mono, fontSize: 10.5, fontWeight: 700, color: item.col }}>
                          {item.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comment Automation + Confirmed-Lead Email */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ padding: 20, borderRadius: 18, background: "#FFFFFF", border: `1.5px solid rgba(75,46,235,0.22)`, boxShadow: THEME.shadowE2 }}>
                    <div style={{ fontFamily: FONTS.display, fontSize: 18, fontWeight: 700, color: THEME.ink, marginBottom: 10 }}>
                      Instagram Comment Automation
                    </div>
                    <div style={{ padding: 12, borderRadius: 12, background: "#F8FAFC", border: `1px solid ${THEME.hairline}`, marginBottom: 10 }}>
                      <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: "#BE185D", fontWeight: 700 }}>@rohan_k commented:</span>{" "}
                      <span style={{ fontFamily: FONTS.ui, fontSize: 13.5, color: THEME.ink }}>“PRICE?”</span>
                    </div>
                    <div style={{ padding: 12, borderRadius: 12, background: THEME.tintMint, border: "1px solid rgba(16,185,129,0.26)" }}>
                      <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: THEME.mintDeep, fontWeight: 700 }}>AUTO-REPLIED + DM SENT:</span>
                      <div style={{ fontFamily: FONTS.ui, fontSize: 13, color: "#064E3B", marginTop: 3 }}>
                        “Sent full details &amp; sizing right to your DM!”
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: 18, borderRadius: 18, background: "#FFFFFF", border: `1px solid ${THEME.hairline}`, boxShadow: THEME.shadowE1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <IconEmail size={22} />
                      <div>
                        <div style={{ fontFamily: FONTS.display, fontSize: 16, fontWeight: 700, color: THEME.ink }}>Confirmed-Lead Follow-Up Mail</div>
                        <div style={{ fontFamily: FONTS.ui, fontSize: 12, color: THEME.ink3 }}>Sends welcome &amp; quote mail when lead confirms</div>
                      </div>
                    </div>
                    <span style={{ padding: "5px 11px", borderRadius: 999, background: THEME.tintMint, color: THEME.mintDeep, fontFamily: FONTS.mono, fontSize: 11, fontWeight: 700 }}>
                      ACTIVE ✓
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </AppShell>
        </div>
      </CameraRig>
    </div>
  );
};
