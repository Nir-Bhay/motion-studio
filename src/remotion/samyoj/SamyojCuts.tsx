import React from "react";
import { Audio, staticFile, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { THEME } from "./theme";
import { FONTS } from "./fonts";
import { StudioBackdrop } from "./ui/StudioBackdrop";
import { BLOOM_GLOBAL_FRAME } from "./timeline";
import { SamyojMaster } from "./SamyojMaster";
import {
  AnimatedSamyojMark,
  IconInstagram,
  IconMessenger,
  IconWhatsApp,
  SamyojLogoLockup,
} from "./ui/SamyojIcons";
import { UnreadDotMotif } from "./motion/DotMotif";
import { S01Hook } from "./scenes/S01Hook";
import { S03Bloom } from "./scenes/S03Bloom";
import { S04Inbox } from "./scenes/S04Inbox";
import { S05AiQualify } from "./scenes/S05AiQualify";
import { S07BroadcastPay } from "./scenes/S07BroadcastPay";
import { S11Close } from "./scenes/S11Close";

/**
 * 45s Product Hunt Cut (2,700 frames · 60fps) with directional slide cuts
 */
export const SamyojCut45: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => {
  const frame = useCurrentFrame();
  const t14 = linearTiming({ durationInFrames: 14 });
  return (
    <div style={{ width: 1920, height: 1080, position: "relative", overflow: "hidden", background: THEME.canvas }}>
      <StudioBackdrop globalFrame={frame} warmthOverride={frame < 240 ? 0 : 1} />
      {audioSrc ? <Audio src={staticFile(audioSrc)} /> : null}
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={254}>
          <S01Hook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={t14} />
        <TransitionSeries.Sequence durationInFrames={296}>
          <S03Bloom />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={t14} />
        <TransitionSeries.Sequence durationInFrames={600}>
          <S04Inbox />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={t14} />
        <TransitionSeries.Sequence durationInFrames={620}>
          <S05AiQualify />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-left" })} timing={t14} />
        <TransitionSeries.Sequence durationInFrames={350}>
          <S07BroadcastPay />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={t14} />
        <TransitionSeries.Sequence durationInFrames={650}>
          <S11Close />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </div>
  );
};

/**
 * 15s Teaser Cut (900 frames · 60fps)
 */
export const SamyojTeaser15: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => {
  const frame = useCurrentFrame();
  const t12 = linearTiming({ durationInFrames: 12 });
  return (
    <div style={{ width: 1920, height: 1080, position: "relative", overflow: "hidden", background: THEME.canvas }}>
      <StudioBackdrop globalFrame={frame} warmthOverride={frame < 120 ? 0 : 1} />
      {audioSrc ? <Audio src={staticFile(audioSrc)} /> : null}
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={132}>
          <S01Hook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={t12} />
        <TransitionSeries.Sequence durationInFrames={192}>
          <S03Bloom />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={t12} />
        <TransitionSeries.Sequence durationInFrames={312}>
          <S05AiQualify />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={t12} />
        <TransitionSeries.Sequence durationInFrames={300}>
          <S11Close />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </div>
  );
};

/**
 * 6s Seamless Ambient Loop (360 frames · 60fps)
 */
export const SamyojLoop6: React.FC = () => {
  const frame = useCurrentFrame();
  const theta = (frame / 360) * Math.PI * 2;
  const floatY = Math.sin(theta) * 10;
  const chip1X = Math.cos(theta) * 18;
  const chip2Y = Math.sin(theta * 2) * 12;

  return (
    <div style={{ width: 1920, height: 1080, position: "relative", overflow: "hidden", background: THEME.canvas }}>
      <StudioBackdrop globalFrame={900} warmthOverride={1} />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            width: 1120,
            padding: "64px 76px",
            borderRadius: THEME.rLg,
            background: THEME.glassBg,
            backdropFilter: "blur(24px) saturate(1.4)",
            border: THEME.glassBorder,
            boxShadow: `${THEME.shadowE3}, ${THEME.glassHighlight}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            transform: `translate3d(0, ${floatY.toFixed(2)}px, 0)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 26, marginBottom: 30 }}>
            <AnimatedSamyojMark frame={180} startFrame={0} size={112} />
            <SamyojLogoLockup height={80} />
          </div>
          <div style={{ fontFamily: FONTS.display, fontSize: 54, fontWeight: 800, letterSpacing: "-0.03em", color: THEME.ink }}>
            Every conversation.{" "}
            <span style={{ fontFamily: FONTS.serif, fontStyle: "italic", fontWeight: 400, color: THEME.brand, fontSize: "1.1em" }}>
              One CRM.
            </span>
          </div>
          <div style={{ marginTop: 28, display: "flex", gap: 18 }}>
            {[
              { label: "WhatsApp", icon: <IconWhatsApp size={20} />, tx: chip1X, ty: 0 },
              { label: "Instagram", icon: <IconInstagram size={20} />, tx: 0, ty: chip2Y },
              { label: "Messenger", icon: <IconMessenger size={20} />, tx: -chip1X, ty: 0 },
            ].map((c) => (
              <div
                key={c.label}
                style={{
                  padding: "12px 22px",
                  borderRadius: 999,
                  background: "#FFFFFF",
                  border: `1px solid ${THEME.hairline}`,
                  boxShadow: THEME.shadowE1,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontFamily: FONTS.ui,
                  fontSize: 17,
                  fontWeight: 600,
                  color: THEME.ink,
                  transform: `translate3d(${c.tx.toFixed(1)}px, ${c.ty.toFixed(1)}px, 0)`,
                }}
              >
                {c.icon}
                {c.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 1:1 Square Relayout (1080×1080, 72s)
 */
export const SamyojSquare: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => {
  const frame = useCurrentFrame();
  const isWarm = frame >= BLOOM_GLOBAL_FRAME;
  return (
    <div style={{ width: 1080, height: 1080, position: "relative", overflow: "hidden", background: THEME.canvas }}>
      <StudioBackdrop globalFrame={frame} />
      <div
        style={{
          position: "absolute",
          top: 58,
          left: 72,
          right: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {isWarm ? (
          <SamyojLogoLockup height={52} />
        ) : (
          <div style={{ fontFamily: FONTS.mono, fontSize: 18, color: THEME.ink2, fontWeight: 700 }}>
            UNREAD MESSAGES COST SALES
          </div>
        )}
        <div
          style={{
            padding: "10px 22px",
            borderRadius: 999,
            background: isWarm ? THEME.mintDeep : THEME.ink,
            color: "#FFFFFF",
            fontFamily: FONTS.mono,
            fontSize: 18,
            fontWeight: 700,
            boxShadow: THEME.shadowE1,
          }}
        >
          app.samyoj.com
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 540,
          top: 535,
          width: 1920,
          height: 1080,
          borderRadius: 42,
          overflow: "hidden",
          boxShadow: THEME.shadowE3,
          border: `1.5px solid ${THEME.hairline}`,
          transform: "translate(-50%, -50%) scale(0.51)",
          transformOrigin: "center center",
        }}
      >
        <SamyojMaster audioSrc={audioSrc} />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 58,
          left: 72,
          right: 72,
          display: "flex",
          justifyContent: "center",
          fontFamily: FONTS.ui,
          fontSize: 22,
          fontWeight: 600,
          color: THEME.ink2,
        }}
      >
        WhatsApp · Instagram · Messenger · Email · AI Studio · 14-day free trial
      </div>
    </div>
  );
};

/**
 * 9:16 Vertical Relayout (1080×1920, 72s)
 */
export const SamyojVertical: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => {
  const frame = useCurrentFrame();
  const isWarm = frame >= BLOOM_GLOBAL_FRAME;
  return (
    <div style={{ width: 1080, height: 1920, position: "relative", overflow: "hidden", background: THEME.canvas }}>
      <StudioBackdrop globalFrame={frame} />
      <div
        style={{
          position: "absolute",
          top: 130,
          left: 80,
          right: 80,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 20,
        }}
      >
        {isWarm ? <SamyojLogoLockup height={74} /> : null}
        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: 52,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: THEME.ink,
            lineHeight: 1.12,
          }}
        >
          {isWarm ? "Turn every conversation into a sale." : "Every unread message is a lost sale."}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 540,
          top: 960,
          width: 1920,
          height: 1080,
          borderRadius: 48,
          overflow: "hidden",
          boxShadow: THEME.shadowE3,
          border: `1.5px solid ${THEME.hairline}`,
          transform: "translate(-50%, -50%) scale(0.52)",
          transformOrigin: "center center",
        }}
      >
        <SamyojMaster audioSrc={audioSrc} />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 150,
          left: 80,
          right: 80,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
        }}
      >
        <div
          style={{
            padding: "18px 38px",
            borderRadius: 999,
            background: isWarm ? THEME.mintDeep : THEME.ink,
            color: "#FFFFFF",
            fontFamily: FONTS.mono,
            fontSize: 26,
            fontWeight: 700,
            boxShadow: THEME.shadowE2,
            display: "inline-flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <UnreadDotMotif size={20} morph={isWarm ? 1 : 0} />
          app.samyoj.com · 14-day free trial
        </div>
        <div style={{ fontFamily: FONTS.ui, fontSize: 22, color: THEME.ink2 }}>
          Official Meta Cloud API · Zero Markup · Built in India
        </div>
      </div>
    </div>
  );
};

/**
 * 1270×760 Product Hunt Gallery Thumbnail
 */
export const SamyojThumbnail: React.FC = () => {
  return (
    <div style={{ width: 1270, height: 760, position: "relative", overflow: "hidden", background: THEME.canvas }}>
      <StudioBackdrop globalFrame={960} warmthOverride={1} />
      <div
        style={{
          position: "absolute",
          inset: 52,
          borderRadius: 32,
          background: THEME.glassBg,
          backdropFilter: "blur(24px) saturate(1.4)",
          border: THEME.glassBorder,
          boxShadow: `${THEME.shadowE3}, ${THEME.glassHighlight}`,
          padding: "54px 64px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <SamyojLogoLockup height={68} />
          <div
            style={{
              padding: "10px 20px",
              borderRadius: 999,
              background: THEME.tintMint,
              border: "1px solid rgba(16,185,129,0.3)",
              fontFamily: FONTS.mono,
              fontSize: 16,
              fontWeight: 700,
              color: THEME.mintDeep,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <UnreadDotMotif size={18} morph={1} />
            REPLIES IN UNDER 5 SECONDS
          </div>
        </div>

        <div>
          <div
            style={{
              fontFamily: FONTS.display,
              fontSize: 68,
              fontWeight: 800,
              letterSpacing: "-0.035em",
              lineHeight: 1.06,
              color: THEME.ink,
              maxWidth: 960,
            }}
          >
            Turn every conversation into a{" "}
            <span style={{ fontFamily: FONTS.serif, fontStyle: "italic", fontWeight: 400, color: THEME.brand, fontSize: "1.1em" }}>
              sale.
            </span>
          </div>
          <div style={{ marginTop: 22, fontFamily: FONTS.ui, fontSize: 25, fontWeight: 500, color: THEME.ink2 }}>
            Unified Inbox · AI Chat &amp; Calling · Social Automation · Campaigns &amp; Analytics
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 14 }}>
            {[
              { label: "WhatsApp", icon: <IconWhatsApp size={20} /> },
              { label: "Instagram", icon: <IconInstagram size={20} /> },
              { label: "Messenger", icon: <IconMessenger size={20} /> },
            ].map((c) => (
              <div
                key={c.label}
                style={{
                  padding: "10px 18px",
                  borderRadius: 999,
                  background: "#FFFFFF",
                  border: `1px solid ${THEME.hairline}`,
                  boxShadow: THEME.shadowE1,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: FONTS.ui,
                  fontSize: 16,
                  fontWeight: 700,
                  color: THEME.ink,
                }}
              >
                {c.icon}
                {c.label}
              </div>
            ))}
          </div>

          <div
            style={{
              padding: "14px 28px",
              borderRadius: 999,
              background: THEME.mintDeep,
              color: "#FFFFFF",
              fontFamily: FONTS.mono,
              fontSize: 20,
              fontWeight: 700,
              boxShadow: THEME.shadowE2,
            }}
          >
            app.samyoj.com
          </div>
        </div>
      </div>
    </div>
  );
};
