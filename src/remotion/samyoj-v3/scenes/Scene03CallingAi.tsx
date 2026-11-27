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
  clamp01,
  lerp,
  seg,
} from "../tokens";
import { CaptionBar, LightSweep } from "../components/Effects";
import { AnimatedTick, ChannelTileIcon, Chip, TypingDots } from "../components/UiKit";

const BARS = Array.from({ length: 48 }, (_, i) => i);

const SUMMARY_POINTS = [
  {
    label: "Trial Slot",
    detail: "Confirmed Saturday 7:00 AM beginner session",
    at: 14.52,
  },
  {
    label: "Membership Plan",
    detail: "Shared ₹2,499/mo full group class pricing",
    at: 14.60,
  },
  {
    label: "Next Action",
    detail: "Team callback set for Monday at 11:00 AM",
    at: 14.68,
  },
];

export const Scene03CallingAi: React.FC<{ t: number }> = ({ t }) => {
  if (t < 10.95 || t > 16.35) return null;

  // Call card blooms smoothly OUT of the clicked calling icon (1349, 308) -> center (960, 510)
  const cardEnterU = seg(t, 11.0, 11.42, E_BACK);

  // Subtle tilt during live call, settles before call ends
  const rotZ =
    t < 11.6
      ? lerp(-4, -2, seg(t, 11.0, 11.6, E_IO))
      : t < 13.8
        ? lerp(-2, 3, seg(t, 11.6, 13.8, E_IO))
        : lerp(3, 0, seg(t, 13.8, 14.1, E_IO));

  // When call ends (13.98 - 14.32), card shrinks BACK into the calling icon (1349, 308)!
  const callExitU = seg(t, 13.98, 14.32, E_IO);
  const cardScale = t < 11.42 ? lerp(0.06, 1, cardEnterU) : lerp(1, 0.05, callExitU);
  const cardTx = t < 11.42 ? lerp(389, 0, cardEnterU) : lerp(0, 389, callExitU);
  const cardTy = t < 11.42 ? lerp(-202, 0, cardEnterU) : lerp(0, -202, callExitU);
  const cardOpacity =
    t < 13.98 ? clamp01(cardEnterU * 2.4) : Math.max(0, 1 - seg(t, 14.14, 14.32, E_EXIT));

  // Status swap cleanly without overlapping text (11.20 -> 11.35)
  const incomingOutU = seg(t, 11.18, 11.28, E_EXIT);
  const answeredInU = seg(t, 11.28, 11.40, E_ENTER);

  // Timer: 00:01 -> counts smoothly -> fast-forwards to 01:42 by 13.92s
  let secVal = 1;
  if (t >= 11.3 && t < 13.65) {
    secVal = Math.max(1, 1 + Math.floor(t - 11.3));
  } else if (t >= 13.65) {
    secVal = Math.round(lerp(3, 102, seg(t, 13.65, 13.95, E_IO)));
  }
  const mm = String(Math.floor(secVal / 60)).padStart(2, "0");
  const ss = String(secVal % 60).padStart(2, "0");
  const timerStr = `${mm}:${ss}`;

  // Waveform state matched to 5 live call bubbles
  const callerSpeaking =
    (t >= 11.45 && t <= 11.90) ||
    (t >= 12.50 && t <= 12.95) ||
    (t >= 13.55 && t <= 13.95);
  const aiSpeaking =
    (t >= 11.95 && t <= 12.45) ||
    (t >= 13.00 && t <= 13.50);
  const flattenU = seg(t, 13.90, 14.12, E_IO);

  // Speech bubbles fade before call card shrinks back
  const bubblesExit = 1 - seg(t, 13.92, 14.16, E_EXIT);

  // HERO AI CALLING SUMMARY CARD: blooms smoothly OUT OF the WhatsApp chat (1060, 520) -> center (960, 505)
  const summaryRiseU = seg(t, 14.30, 14.76, E_BACK);
  const summaryFadeOut = t >= 15.92 ? 1 - seg(t, 15.92, 16.22, E_EXIT) : 1;
  const summaryTx = lerp(100, 0, summaryRiseU);
  const summaryTy = lerp(15, 0, summaryRiseU);
  const summaryScale = lerp(0.06, 1.0, summaryRiseU);
  // AI Summary badge/icon animates smoothly AFTER summary card finishes expanding (14.78 - 15.05s)
  const summaryAiU = seg(t, 14.78, 15.05, E_BACK);

  // Hand-off out: violet sparkle wash 15.80 - 16.30
  const washU = seg(t, 15.8, 16.3, E_IO);
  const sparkleU = seg(t, 15.8, 16.1, E_ENTER);
  const washClearU = seg(t, 16.05, 16.3, E_EXIT);

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {/* Soft ambient scrim behind elevated Calling / Summary cards so they float cleanly above WhatsApp inbox */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(241, 245, 250, 0.42)",
          opacity:
            t < 11.42
              ? seg(t, 11.0, 11.35, E_ENTER)
              : t < 15.85
                ? 1
                : 1 - seg(t, 15.85, 16.20, E_EXIT),
        }}
      />

      {/* Live Calling AI Glass Card (11.00 - 14.32) */}
      {t < 14.34 && (
        <div
          style={{
            position: "absolute",
            left: 700,
            top: 205,
            width: 520,
            height: 610,
            borderRadius: 28,
            backgroundColor: "rgba(255,255,255,0.88)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.96)",
            boxShadow: SHADOW.hero,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "30px 34px",
            transform: `translate(${cardTx}px, ${cardTy}px) scale(${cardScale}) rotateZ(${rotZ}deg)`,
            transformOrigin: "center center",
            opacity: cardOpacity,
            overflow: "hidden",
            zIndex: 200,
          }}
        >
          <LightSweep t={t} startSec={11.5} width={520} height={610} radius={28} />

          {/* Badge slot top */}
          <div style={{ height: 42, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {t >= 11.2 && (
              <div style={{ transform: `scale(${seg(t, 11.2, 11.5, E_BACK)})` }}>
                <Chip variant="violet" style={{ fontWeight: 650 }}>
                  ✦ Calling AI
                </Chip>
              </div>
            )}
          </div>

          {/* Avatar RM 126px + pulsing rings */}
          <div
            style={{
              marginTop: 20,
              width: 126,
              height: 126,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {t < 14.0 &&
              [0, 0.6, 1.2].map((off, idx) => {
                const cycle = ((t - 11.0 + off) % 1.8) / 1.8;
                const d = lerp(126, 184, cycle);
                return (
                  <div
                    key={idx}
                    style={{
                      position: "absolute",
                      left: 63 - d / 2,
                      top: 63 - d / 2,
                      width: d,
                      height: d,
                      borderRadius: 999,
                      border: `2px solid ${C.waIcon}`,
                      opacity: (1 - cycle) * 0.55,
                    }}
                  />
                );
              })}
            <div
              style={{
                width: 126,
                height: 126,
                borderRadius: 999,
                backgroundColor: C.avatarGreenBg,
                color: C.avatarGreenText,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: FONT_INTER,
                fontSize: 44,
                fontWeight: 700,
              }}
            >
              RM
            </div>
          </div>

          <div
            style={{
              marginTop: 20,
              fontFamily: FONT_INTER,
              fontSize: 34,
              fontWeight: 650,
              color: C.ink,
            }}
          >
            Rahul Mehta
          </div>

          {/* Status line clean swap */}
          <div style={{ marginTop: 10, height: 28, position: "relative", width: "100%", textAlign: "center" }}>
            <span
              style={{
                position: "absolute",
                inset: 0,
                fontFamily: FONT_INTER,
                fontSize: 22,
                fontWeight: 500,
                color: C.muted,
                opacity: 1 - incomingOutU,
              }}
            >
              WhatsApp voice call · incoming
            </span>
            <span
              style={{
                position: "absolute",
                inset: 0,
                fontFamily: FONT_INTER,
                fontSize: 22,
                fontWeight: 600,
                color: C.violetText,
                opacity: answeredInU,
              }}
            >
              Answered by Calling AI
            </span>
          </div>

          {/* Timer / Call ended */}
          <div
            style={{
              marginTop: 12,
              fontFamily: FONT_INTER,
              fontSize: 22,
              fontWeight: 600,
              fontVariantNumeric: "tabular-nums",
              color: C.muted,
            }}
          >
            {t >= 14.02 ? "Call ended · 01:42" : t >= 11.3 ? timerStr : "00:00"}
          </div>

          {/* 48-Bar Waveform */}
          <div
            style={{
              marginTop: 24,
              width: 440,
              height: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              filter: aiSpeaking ? `drop-shadow(0 0 12px ${C.violet}38)` : "none",
            }}
          >
            {BARS.map((i) => {
              const speed = 0.62 + ((i * 17) % 13) * 0.04;
              const phase = t * Math.PI * 2 * (1 / speed) + i * 0.45;
              const activeAmp = callerSpeaking || aiSpeaking ? 1 : 0.24;
              const rawH = 12 + (0.5 + 0.5 * Math.sin(phase)) * (94 - 12) * activeAmp;
              const h = lerp(rawH, 2, flattenU);
              const color = callerSpeaking
                ? C.waIcon
                : aiSpeaking
                  ? C.violet
                  : C.placeholder;
              return (
                <div
                  key={i}
                  style={{
                    width: 7,
                    height: h,
                    borderRadius: 999,
                    backgroundColor: color,
                  }}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* 5 Natural Live Call Messages (Left = Caller, Right = Calling AI) */}
      {t < 14.32 && (
        <div style={{ position: "absolute", inset: 0, opacity: bubblesExit, zIndex: 220 }}>
          {/* Caller Bubble 1 */}
          {t >= 11.45 && (
            <div
              style={{
                position: "absolute",
                left: 84,
                top: 240,
                width: 470,
                padding: "16px 20px",
                borderRadius: "18px 18px 18px 6px",
                backgroundColor: "#FFFFFF",
                border: `1.5px solid ${C.line}`,
                boxShadow: SHADOW.resting,
                fontFamily: FONT_INTER,
                fontSize: 22,
                fontWeight: 500,
                lineHeight: 1.38,
                color: C.ink,
                transform: `scale(${seg(t, 11.45, 11.75, E_BACK)})`,
                transformOrigin: "left bottom",
              }}
            >
              Hey, do you have any trial slots open this Saturday?
            </div>
          )}

          {/* Typing dots before AI Reply 1 */}
          <div style={{ position: "absolute", right: 84, top: 325 }}>
            <TypingDots t={t} startSec={11.65} endSec={11.95} color={C.violet} />
          </div>

          {/* AI Bubble 1 */}
          {t >= 11.95 && (
            <div
              style={{
                position: "absolute",
                right: 84,
                top: 320,
                width: 490,
                padding: "16px 20px",
                borderRadius: "18px 18px 6px 18px",
                backgroundColor: C.violetSoft,
                border: `1px solid ${C.violetBorder}`,
                boxShadow: SHADOW.resting,
                fontFamily: FONT_INTER,
                fontSize: 22,
                fontWeight: 500,
                lineHeight: 1.38,
                color: C.violetInk,
                transform: `scale(${seg(t, 11.95, 12.25, E_BACK)})`,
                transformOrigin: "right bottom",
              }}
            >
              <div style={{ marginBottom: 8 }}>
                <Chip variant="violet" style={{ height: 30, paddingLeft: 10, paddingRight: 10 }}>
                  ✦ Calling AI
                </Chip>
              </div>
              Yes! 7:00 AM and 9:30 AM are open — want me to save a spot?
            </div>
          )}

          {/* Caller Bubble 2 */}
          {t >= 12.5 && (
            <div
              style={{
                position: "absolute",
                left: 84,
                top: 435,
                width: 470,
                padding: "16px 20px",
                borderRadius: "18px 18px 18px 6px",
                backgroundColor: "#FFFFFF",
                border: `1.5px solid ${C.line}`,
                boxShadow: SHADOW.resting,
                fontFamily: FONT_INTER,
                fontSize: 22,
                fontWeight: 500,
                lineHeight: 1.38,
                color: C.ink,
                transform: `scale(${seg(t, 12.5, 12.8, E_BACK)})`,
                transformOrigin: "left bottom",
              }}
            >
              7 AM works! What&apos;s the monthly plan after the trial?
            </div>
          )}

          {/* Typing dots before AI Reply 2 */}
          <div style={{ position: "absolute", right: 84, top: 530 }}>
            <TypingDots t={t} startSec={12.7} endSec={13.0} color={C.violet} />
          </div>

          {/* AI Bubble 2 */}
          {t >= 13.0 && (
            <div
              style={{
                position: "absolute",
                right: 84,
                top: 525,
                width: 490,
                padding: "16px 20px",
                borderRadius: "18px 18px 6px 18px",
                backgroundColor: C.violetSoft,
                border: `1px solid ${C.violetBorder}`,
                boxShadow: SHADOW.resting,
                fontFamily: FONT_INTER,
                fontSize: 22,
                fontWeight: 500,
                lineHeight: 1.38,
                color: C.violetInk,
                transform: `scale(${seg(t, 13.0, 13.3, E_BACK)})`,
                transformOrigin: "right bottom",
              }}
            >
              <div style={{ marginBottom: 8 }}>
                <Chip variant="violet" style={{ height: 30, paddingLeft: 10, paddingRight: 10 }}>
                  ✦ Calling AI
                </Chip>
              </div>
              Monthly plans start at ₹2,499 with full group class access.
            </div>
          )}

          {/* Caller Bubble 3 */}
          {t >= 13.55 && (
            <div
              style={{
                position: "absolute",
                left: 84,
                top: 635,
                width: 470,
                padding: "16px 20px",
                borderRadius: "18px 18px 18px 6px",
                backgroundColor: "#FFFFFF",
                border: `1.5px solid ${C.line}`,
                boxShadow: SHADOW.resting,
                fontFamily: FONT_INTER,
                fontSize: 22,
                fontWeight: 500,
                lineHeight: 1.38,
                color: C.ink,
                transform: `scale(${seg(t, 13.55, 13.85, E_BACK)})`,
                transformOrigin: "left bottom",
              }}
            >
              Awesome — please have your team call me Monday at 11 AM.
            </div>
          )}
        </div>
      )}

      {/* HERO AI CALLING SUMMARY CARD — blooms smoothly out of the WhatsApp chat */}
      {t >= 14.30 && (
        <div
          style={{
            position: "absolute",
            left: 440,
            top: 215,
            width: 1040,
            height: 580,
            borderRadius: 22,
            backgroundColor: "#FFFFFF",
            border: `1.5px solid ${C.line}`,
            boxShadow: "0 4px 16px rgba(15, 23, 42, 0.06)",
            padding: "28px 34px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            transform: `translate(${summaryTx}px, ${summaryTy}px) scale(${summaryScale})`,
            transformOrigin: "center center",
            opacity: clamp01(summaryRiseU * 2.2) * summaryFadeOut,
            overflow: "hidden",
            zIndex: 260,
          }}
        >
          <LightSweep t={t} startSec={14.85} width={1040} height={580} radius={22} />

          {/* Header Bar — AI Icon anchor sits ready, then AI Calling Summary badge animates cleanly after expand */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
              <ChannelTileIcon kind="ai" size={38} radius={10} />
              {t >= 14.78 && (
                <div
                  style={{
                    transform: `scale(${summaryAiU})`,
                    opacity: clamp01(summaryAiU * 1.4),
                    transformOrigin: "left center",
                    flexShrink: 0,
                  }}
                >
                  <Chip variant="violet" style={{ fontWeight: 700 }}>
                    AI Calling Summary
                  </Chip>
                </div>
              )}
              <span
                style={{
                  fontFamily: FONT_INTER,
                  fontSize: 24,
                  fontWeight: 700,
                  color: C.ink,
                  whiteSpace: "nowrap",
                }}
              >
                Rahul Mehta · WhatsApp Call
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
              <Chip variant="gray">1m 42s</Chip>
              <Chip variant="green">Lead Qualified</Chip>
            </div>
          </div>

          {/* Concise Call Summary Box */}
          <div
            style={{
              padding: "16px 20px",
              borderRadius: 12,
              backgroundColor: C.surface2,
              border: `1.5px solid ${C.lineSoft}`,
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <span
              style={{
                fontFamily: FONT_INTER,
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: 0.6,
                textTransform: "uppercase",
                color: C.muted,
              }}
            >
              Summary
            </span>
            <span
              style={{
                fontFamily: FONT_INTER,
                fontSize: 21,
                fontWeight: 500,
                lineHeight: 1.42,
                color: C.ink,
              }}
            >
              Rahul enquired about Saturday trial timings and monthly pricing. Calling AI confirmed 7:00 AM availability and scheduled a Monday follow-up.
            </span>
          </div>

          {/* 3 Clean Scannable Key Points */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {SUMMARY_POINTS.map((item, idx) => {
              const rowU = seg(t, item.at, item.at + 0.16, E_ENTER);
              return (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "14px 18px",
                    borderRadius: 12,
                    backgroundColor: "#FFFFFF",
                    border: `1.5px solid ${C.line}`,
                    opacity: rowU,
                    transform: `translateY(${lerp(12, 0, rowU)}px)`,
                  }}
                >
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      backgroundColor: C.violetSoft,
                      border: `1px solid ${C.violetBorder}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <AnimatedTick t={t} startSec={item.at} color={C.violet} size={18} strokeWidth={2.6} />
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, minWidth: 0 }}>
                    <span
                      style={{
                        fontFamily: FONT_INTER,
                        fontSize: 20,
                        fontWeight: 700,
                        color: C.ink,
                        minWidth: 165,
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      style={{
                        fontFamily: FONT_INTER,
                        fontSize: 20,
                        fontWeight: 500,
                        color: C.ink2,
                      }}
                    >
                      {item.detail}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Clean Footer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: 4,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Chip variant="indigo" style={{ fontSize: 18 }}>
                Assigned: Riya
              </Chip>
              <Chip variant="amber" style={{ fontSize: 18 }}>
                Callback: Mon 11:00 AM
              </Chip>
            </div>
            <Chip variant="green" style={{ fontSize: 18 }}>
              Saved to WhatsApp Chat ✓
            </Chip>
          </div>
        </div>
      )}

      {/* Hand-off out: Violet sparkle + blur-wipe wash (15.8 - 16.3s) */}
      {t >= 15.8 && (
        <>
          <div
            style={{
              position: "absolute",
              left: lerp(960, 1740, sparkleU),
              top: lerp(520, 140, sparkleU),
              fontSize: 28,
              color: C.violet,
              transform: `scale(${lerp(1, 2.2, sparkleU)})`,
              opacity: 1 - washClearU,
              zIndex: 420,
            }}
          >
            ✦
          </div>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: lerp(0, 1920, washU),
              height: 1080,
              background:
                "linear-gradient(90deg, rgba(139,92,246,0.10) 0%, rgba(139,92,246,0.14) 85%, rgba(139,92,246,0) 100%)",
              opacity: 1 - washClearU,
              zIndex: 410,
            }}
          />
        </>
      )}

      {/* Caption Scene 3 */}
      <CaptionBar
        t={t}
        startSec={11.0}
        endSec={16.0}
        words={[
          { text: "AI", accentColor: C.violetText },
          { text: "that" },
          { text: "answers" },
          { text: "your" },
          { text: "calls" },
        ]}
      />
    </AbsoluteFill>
  );
};
