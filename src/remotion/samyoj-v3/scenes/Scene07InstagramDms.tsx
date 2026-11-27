import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
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
  typedSlice,
  voPulse,
} from "../tokens";
import { CaptionBar, CursorOverlay } from "../components/Effects";
import {
  AnimatedTick,
  Avatar,
  ChannelTileIcon,
  Chip,
  PrimaryButton,
  SamyojAppShell,
} from "../components/UiKit";

export const Scene07InstagramDms: React.FC<{ t: number }> = ({ t }) => {
  if (t < 30.95 || t > 37.1) return null;

  const enterU = seg(t, 31.0, 31.3, E_ENTER);
  const exitU = t >= 36.65 ? 1 - seg(t, 36.65, 37.05, E_EXIT) : 1;

  // Prompt typing + fast AI image generation
  const promptTyped = typedSlice("New Year Offer — 30% off annual studio pass", t, 31.05, 58);
  const generating = t >= 31.78 && t < 32.15;
  const generated = t >= 32.15;
  const imgRevealU = seg(t, 32.15, 32.5, E_BACK);

  // Publish click
  const published = t >= 32.95;
  const pubScale = seg(t, 32.95, 33.22, E_BACK);

  // Live comments + simultaneous auto-reply & auto-DM
  const reply1 = typedSlice("Sent you our 30% New Year Offer in DM!", t, 34.02, 46);
  const reply2 = typedSlice("Sent you our 30% New Year Offer in DM!", t, 35.15, 46);

  // Subtle camera follow tracking prompt/Generate -> Publish -> Comment Automation replies (keeps sidebar logo in view)
  const cam = cameraFollow(t, [
    { t: 31.00, fx: 960, fy: 540, zoom: 1.00 },
    { t: 31.74, fx: 840, fy: 390, zoom: 1.11 },
    { t: 32.90, fx: 840, fy: 600, zoom: 1.12 },
    { t: 33.80, fx: 1140, fy: 520, zoom: 1.12 },
    { t: 35.55, fx: 1140, fy: 620, zoom: 1.12 },
    { t: 36.45, fx: 960, fy: 540, zoom: 1.00 },
  ]);

  const postFocus = focusWindow(t, 31.15, 33.40);
  const commentFocus = focusWindow(t, 33.45, 36.40);

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
        activeNav="ai"
          pageTitle="AI Studio · Instagram"
          liveBadge
          channelIcon="instagram"
          accentColor={C.igPink}
          pulseScale={voPulse(t, 31.20)}
          headerChips={<Chip variant="instagram">Instagram · @sunrise.studio</Chip>}
        >
        <div style={{ display: "flex", height: "100%", backgroundColor: "#FFFFFF" }}>
          {/* LEFT PANEL (700px): AI Post Generation (New Year Offer) + Real Photo + Publish */}
          <div
            style={{
              width: 700,
              padding: "20px 24px",
              borderRight: `1.5px solid ${postFocus > 0.15 ? `${C.igPink}44` : C.lineSoft}`,
              display: "flex",
              flexDirection: "column",
              gap: 14,
              background: postFocus > 0.15
                ? "linear-gradient(180deg, rgba(255,255,255,0.97) 0%, rgba(255,247,251,0.90) 100%)"
                : "#FFFFFF",
              opacity: lerp(1, 0.58, commentFocus),
              transform: `scale(${lerp(1, 1.012, postFocus)})`,
              transformOrigin: "left center",
              boxShadow: postFocus > 0.05 ? "inset 0 1px 0 rgba(255,255,255,0.95)" : "none",
              zIndex: postFocus > 0.05 ? 25 : 1,
            }}
          >
            {/* Prompt Input + Generate Button */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  flex: 1,
                  height: 48,
                  borderRadius: 10,
                  border: `1.5px solid ${C.line}`,
                  backgroundColor: C.surface2,
                  padding: "0 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  minWidth: 0,
                }}
              >
                <span style={{ fontSize: 18, fontWeight: 700, color: C.indigo, flexShrink: 0 }}>
                  ✦
                </span>
                <span
                  style={{
                    fontFamily: FONT_INTER,
                    fontSize: 19,
                    fontWeight: 500,
                    color: C.ink,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {promptTyped.shown}
                  {promptTyped.caretOn && (
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
              <PrimaryButton
                style={{
                  height: 48,
                  paddingLeft: 20,
                  paddingRight: 20,
                  fontSize: 20,
                  flexShrink: 0,
                  transform: `scale(${t >= 31.72 && t < 31.8 ? 0.9 : 1})`,
                  opacity: generated ? 0.85 : 1,
                }}
              >
                {generating ? "Generating..." : generated ? "Generated ✓" : "Generate"}
              </PrimaryButton>
            </div>

            {/* Real Instagram Post Preview Card (flat border, zero detached shadow) */}
            <div
              style={{
                flex: 1,
                borderRadius: 16,
                border: `1.5px solid ${C.line}`,
                backgroundColor: "#FFFFFF",
                padding: 16,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              {/* Post Author Bar */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <ChannelTileIcon kind="instagram" size={34} radius={9} />
                  <div>
                    <div style={{ fontFamily: FONT_INTER, fontSize: 19, fontWeight: 700, color: C.ink }}>
                      @sunrise.studio
                    </div>
                    <div style={{ fontFamily: FONT_INTER, fontSize: 16, color: C.muted }}>
                      Instagram Post · New Year Campaign
                    </div>
                  </div>
                </div>
                {published ? (
                  <div style={{ transform: `scale(${pubScale})` }}>
                    <Chip variant="green" style={{ height: 34, fontSize: 18 }}>
                      <span>Published</span>
                      <AnimatedTick t={t} startSec={32.98} color={C.greenText} size={18} />
                    </Chip>
                  </div>
                ) : (
                  <Chip variant="instagram" style={{ height: 34, fontSize: 18 }}>
                    Draft ready
                  </Chip>
                )}
              </div>

              {/* Real Generated Studio Photo Area */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: 336,
                  borderRadius: 12,
                  overflow: "hidden",
                  border: `1.5px solid ${C.lineSoft}`,
                  backgroundColor: "#F5F3FF",
                }}
              >
                {!generated ? (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      background: generating
                        ? "linear-gradient(135deg, #EEF2FF 0%, #FDF2F8 50%, #F5F3FF 100%)"
                        : C.surface2,
                    }}
                  >
                    <span style={{ fontSize: 28, color: C.indigo }}>✦</span>
                    <span style={{ fontFamily: FONT_INTER, fontSize: 20, fontWeight: 600, color: C.indigo }}>
                      {generating ? "Creating New Year Offer visual..." : "Enter prompt to generate post"}
                    </span>
                  </div>
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                      opacity: imgRevealU,
                      transform: `scale(${lerp(1.04, 1, imgRevealU)})`,
                    }}
                  >
                    <Img
                      src={staticFile("images/new-year-offer-post.jpg")}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        left: 14,
                        top: 14,
                        padding: "7px 14px",
                        borderRadius: 9,
                        backgroundColor: "rgba(15, 23, 42, 0.84)",
                        color: "#FFFFFF",
                        fontFamily: FONT_INTER,
                        fontSize: 17,
                        fontWeight: 700,
                        letterSpacing: 0.3,
                      }}
                    >
                      NEW YEAR OFFER · 30% OFF
                    </div>
                  </div>
                )}
              </div>

              {/* Post Caption + Publish Action */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
                <div
                  style={{
                    fontFamily: FONT_INTER,
                    fontSize: 18,
                    fontWeight: 500,
                    color: C.ink2,
                    lineHeight: 1.35,
                    flex: 1,
                  }}
                >
                  <span style={{ fontWeight: 700, color: C.ink }}>@sunrise.studio </span>
                  New Year Offer: 30% OFF annual pass! Comment <span style={{ fontWeight: 700, color: C.igPink }}>OFFER</span> for instant DM.
                </div>
                {!published && generated && (
                  <PrimaryButton
                    style={{
                      height: 44,
                      paddingLeft: 18,
                      paddingRight: 18,
                      fontSize: 19,
                      flexShrink: 0,
                      transform: `scale(${t >= 32.9 && t < 32.98 ? 0.9 : 1})`,
                    }}
                  >
                    Publish now
                  </PrimaryButton>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL (694px): Comment Automation Rule + Live Comment & Auto-DM Flow */}
          <div
            style={{
              width: 694,
              padding: "20px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
              background: commentFocus > 0.15
                ? "linear-gradient(180deg, rgba(255,255,255,0.97) 0%, rgba(247,246,255,0.91) 100%)"
                : "#FFFFFF",
              opacity: lerp(1, 0.58, postFocus),
              transform: `scale(${lerp(1, 1.012, commentFocus)})`,
              transformOrigin: "right center",
              boxShadow: commentFocus > 0.05 ? "inset 0 1px 0 rgba(255,255,255,0.95)" : "none",
              zIndex: commentFocus > 0.05 ? 25 : 1,
            }}
          >
              <div style={{ display: "flex", flexDirection: "column", gap: 10, opacity: seg(t, 31.15, 31.45, E_ENTER) }}>
              <div
                style={{
                  borderRadius: 14,
                  border: `1px solid ${C.indigoBorder}`,
                  backgroundColor: "#F8FAFF",
                  padding: "14px 18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Chip variant="indigo" style={{ height: 32, fontSize: 18, fontWeight: 700 }}>
                    ✦ Comment Automation
                  </Chip>
                  <span style={{ fontFamily: FONT_INTER, fontSize: 19, fontWeight: 600, color: C.ink }}>
                    New Year Offer Post
                  </span>
                </div>
                <Chip variant="green" style={{ height: 30, fontSize: 17 }}>
                  Active
                </Chip>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontFamily: FONT_INTER, fontSize: 18, fontWeight: 600, color: C.muted }}>
                  When comment has:
                </span>
                <Chip variant="instagram" style={{ height: 30, fontSize: 17 }}>
                  OFFER
                </Chip>
                <Chip variant="instagram" style={{ height: 30, fontSize: 17 }}>
                  NEWYEAR
                </Chip>
                <Chip variant="gray" style={{ height: 30, fontSize: 17 }}>
                  PRICE
                </Chip>
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <div
                  style={{
                    flex: 1,
                    borderRadius: 10,
                    backgroundColor: "#FFFFFF",
                    border: `1.5px solid ${C.line}`,
                    padding: "8px 12px",
                  }}
                >
                  <div style={{ fontFamily: FONT_INTER, fontSize: 15, fontWeight: 700, color: C.greenText }}>
                    1. AUTO-REPLY ON POST
                  </div>
                  <div style={{ fontFamily: FONT_INTER, fontSize: 17, color: C.ink2, marginTop: 2 }}>
                    &ldquo;Sent you our 30% New Year Offer in DM!&rdquo;
                  </div>
                </div>
                <div
                  style={{
                    flex: 1,
                    borderRadius: 10,
                    backgroundColor: "#FFFFFF",
                    border: `1.5px solid ${C.line}`,
                    padding: "8px 12px",
                  }}
                >
                  <div style={{ fontFamily: FONT_INTER, fontSize: 15, fontWeight: 700, color: C.igPink }}>
                    2. SEND INSTANT DM
                  </div>
                  <div style={{ fontFamily: FONT_INTER, fontSize: 17, color: C.ink2, marginTop: 2 }}>
                    &ldquo;Here&apos;s your 30% OFF link + free trial slot!&rdquo;
                  </div>
                </div>
              </div>
            </div>
            </div>

            {/* Live Comments Stream */}
            {t >= 33.3 && (
              <div
                style={{
                  fontFamily: FONT_INTER,
                  fontSize: 18,
                  fontWeight: 700,
                  color: C.muted,
                  marginTop: 2,
                  opacity: seg(t, 33.3, 33.5, E_ENTER),
                }}
              >
                LIVE COMMENTS ON THIS POST
              </div>
            )}

            {/* Comment 1: @rohan.k */}
            {t >= 33.45 && (
              <div
                style={{
                  borderRadius: 14,
                  border: `1.5px solid ${C.line}`,
                  backgroundColor: C.surface2,
                  padding: "14px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  opacity: seg(t, 33.45, 33.75, E_ENTER),
                  transform: `translateY(${lerp(16, 0, seg(t, 33.45, 33.75, E_ENTER))}px)`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Avatar initials="RK" tone="indigo" size={38} />
                    <div style={{ fontFamily: FONT_INTER, fontSize: 20, color: C.ink }}>
                      <span style={{ fontWeight: 700 }}>@rohan.k</span>{" "}
                      <span style={{ color: C.ink2 }}>OFFER — price please?</span>
                    </div>
                  </div>
                  <span style={{ fontFamily: FONT_INTER, fontSize: 16, color: C.faint }}>now</span>
                </div>

                {t >= 34.0 && (
                  <div
                    style={{
                      paddingLeft: 14,
                      borderLeft: `3px solid ${C.indigo}`,
                      fontFamily: FONT_INTER,
                      fontSize: 19,
                      color: C.ink2,
                    }}
                  >
                    {reply1.shown}
                  </div>
                )}

                {t >= 34.25 && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, transform: `scale(${seg(t, 34.25, 34.5, E_BACK)})` }}>
                    <Chip variant="green" style={{ height: 30, fontSize: 17 }}>
                      <span>Comment Replied</span>
                      <AnimatedTick t={t} startSec={34.28} color={C.greenText} size={16} />
                    </Chip>
                    <Chip variant="instagram" style={{ height: 30, fontSize: 17 }}>
                      <span>Auto-DM Sent</span>
                      <AnimatedTick t={t} startSec={34.35} color="#FFFFFF" size={16} />
                    </Chip>
                  </div>
                )}
              </div>
            )}

            {/* Comment 2: @sneha_fit */}
            {t >= 34.8 && (
              <div
                style={{
                  borderRadius: 14,
                  border: `1.5px solid ${C.line}`,
                  backgroundColor: C.surface2,
                  padding: "14px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  opacity: seg(t, 34.8, 35.1, E_ENTER),
                  transform: `translateY(${lerp(16, 0, seg(t, 34.8, 35.1, E_ENTER))}px)`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Avatar initials="SF" tone="pink" size={38} />
                    <div style={{ fontFamily: FONT_INTER, fontSize: 20, color: C.ink }}>
                      <span style={{ fontWeight: 700 }}>@sneha_fit</span>{" "}
                      <span style={{ color: C.ink2 }}>NEWYEAR details &amp; timings?</span>
                    </div>
                  </div>
                  <span style={{ fontFamily: FONT_INTER, fontSize: 16, color: C.faint }}>now</span>
                </div>

                {t >= 35.15 && (
                  <div
                    style={{
                      paddingLeft: 14,
                      borderLeft: `3px solid ${C.indigo}`,
                      fontFamily: FONT_INTER,
                      fontSize: 19,
                      color: C.ink2,
                    }}
                  >
                    {reply2.shown}
                  </div>
                )}

                {t >= 35.5 && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, transform: `scale(${seg(t, 35.5, 35.75, E_BACK)})` }}>
                    <Chip variant="green" style={{ height: 30, fontSize: 17 }}>
                      <span>Comment Replied</span>
                      <AnimatedTick t={t} startSec={35.52} color={C.greenText} size={16} />
                    </Chip>
                    <Chip variant="instagram" style={{ height: 30, fontSize: 17 }}>
                      <span>Auto-DM Sent</span>
                      <AnimatedTick t={t} startSec={35.6} color="#FFFFFF" size={16} />
                    </Chip>
                  </div>
                )}
              </div>
            )}

            {/* Smooth Handoff Banner to Scene 8 DM Inbox */}
            {t >= 35.95 && (
              <div
                style={{
                  marginTop: "auto",
                  borderRadius: 10,
                  backgroundColor: "#FDF2F8",
                  border: "1.5px solid #FBCFE8",
                  padding: "10px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  opacity: seg(t, 35.95, 36.25, E_IO),
                }}
              >
                <span style={{ fontFamily: FONT_INTER, fontSize: 19, fontWeight: 600, color: C.igPink }}>
                  @rohan.k replied to your Auto-DM — opening live inbox
                </span>
                <span style={{ fontFamily: FONT_INTER, fontSize: 20, fontWeight: 700, color: C.igPink }}>
                  →
                </span>
              </div>
            )}
          </div>
        </div>
      </SamyojAppShell>

      <CursorOverlay
        t={t}
        visibleStart={31.4}
        visibleEnd={33.1}
        segments={[
          {
            from: [640, 345],
            to: [995, 298],
            moveStart: 31.45,
            moveEnd: 31.72,
            clickAt: 31.74,
            rippleColor: C.indigo,
          },
          {
            from: [995, 298],
            to: [985, 922],
            moveStart: 32.5,
            moveEnd: 32.88,
            clickAt: 32.9,
            rippleColor: C.waIcon,
          },
        ]}
      />
      </AbsoluteFill>

      <CaptionBar
        t={t}
        startSec={31.0}
        endSec={36.7}
        words={[
          { text: "Generate" },
          { text: "posts" },
          { text: "and" },
          { text: "automate" },
          { text: "comments", accentColor: C.igPink },
        ]}
      />
    </AbsoluteFill>
  );
};
