import React from "react";
import { useCurrentFrame } from "remotion";
import { THEME } from "../theme";
import { FONTS } from "../fonts";
import { UnreadDotMotif } from "../motion/DotMotif";
import { MaskedLine } from "../motion/KineticText";
import { easeRange, enterTriad, outExpo } from "../motion/easing";
import {
  IconEmail,
  IconInstagram,
  IconMessenger,
  IconSpark,
  IconWhatsApp,
  SamyojLogoLockup,
} from "../ui/SamyojIcons";

/**
 * S03 Daylight Bloom (11.20s -> 16.03s, 300f)
 * Zero lag: instant hero-scale Samyoj brand reveal + orbiting connected channels!
 * VO: "Meet Samyoj. One unified workspace that turns every conversation into a customer."
 */
export const S03Bloom: React.FC = () => {
  const frame = useCurrentFrame();

  const morph = easeRange(frame, 0, 26, outExpo);
  const logoFade = easeRange(frame, 20, 38, outExpo);
  const cardIn = enterTriad(frame, 8, 22, { y: 20, scaleFrom: 0.93, blurFrom: 5 });
  const subIn = enterTriad(frame, 44, 20, { y: 12, blurFrom: 4 });
  const chipsIn = enterTriad(frame, 62, 22, { y: 16, blurFrom: 4 });

  const channels = [
    { label: "WhatsApp", icon: <IconWhatsApp size={20} />, tint: THEME.tintMint, color: THEME.mintDeep },
    { label: "Instagram", icon: <IconInstagram size={20} />, tint: "#FDF2F8", color: "#BE185D" },
    { label: "Messenger", icon: <IconMessenger size={20} />, tint: "#EFF6FF", color: "#1D4ED8" },
    { label: "Email", icon: <IconEmail size={20} />, tint: "#FEF2F2", color: THEME.alertInk },
    { label: "AI Studio", icon: <IconSpark size={20} />, tint: THEME.tintBrand, color: THEME.brand },
  ];

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Soft radial brand glow */}
      <div
        style={{
          position: "absolute",
          width: 1100,
          height: 1100,
          borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(75,46,235,0.14), rgba(16,185,129,0.06), transparent 72%)",
          transform: `scale(${(0.75 + morph * 0.45).toFixed(3)})`,
          opacity: easeRange(frame, 4, 40, outExpo),
        }}
      />

      {/* Big Hero Brand Card */}
      <div
        style={{
          width: 1420,
          padding: "68px 84px",
          borderRadius: 34,
          background: "rgba(255,255,255,0.96)",
          border: `1.5px solid ${THEME.hairline}`,
          boxShadow: THEME.shadowE3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
          ...cardIn.style,
        }}
      >
        <div
          style={{
            padding: "8px 18px",
            borderRadius: 999,
            background: THEME.tintMint,
            border: "1px solid rgba(16,185,129,0.28)",
            fontFamily: FONTS.mono,
            fontSize: 13.5,
            fontWeight: 700,
            color: THEME.mintDeep,
            marginBottom: 28,
            letterSpacing: "0.08em",
          }}
        >
          ✓ ONE UNIFIED WORKSPACE
        </div>

        {/* Hero-scale Samyoj Logo (124px tall!) */}
        <div style={{ height: 124, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28, position: "relative" }}>
          <div style={{ opacity: 1 - logoFade, position: "absolute" }}>
            <UnreadDotMotif size={76} morph={morph} />
          </div>
          <div style={{ opacity: logoFade, transform: `scale(${(0.9 + logoFade * 0.1).toFixed(3)})` }}>
            <SamyojLogoLockup height={118} />
          </div>
        </div>

        <h2
          style={{
            margin: 0,
            fontFamily: FONTS.display,
            fontSize: 64,
            fontWeight: 800,
            letterSpacing: "-0.035em",
            lineHeight: 1.06,
            color: THEME.ink,
          }}
        >
          <MaskedLine frame={frame} startFrame={22} duration={22}>
            Turn every conversation into a{" "}
            <span style={{ fontFamily: FONTS.serif, fontStyle: "italic", fontWeight: 400, color: THEME.brand, fontSize: "1.1em" }}>
              customer.
            </span>
          </MaskedLine>
        </h2>

        <p
          style={{
            marginTop: 16,
            marginBottom: 34,
            fontFamily: FONTS.grotesk,
            fontSize: 23,
            color: THEME.ink2,
            ...subIn.style,
          }}
        >
          Inbox, AI Studio, social automation &amp; campaigns — connected natively.
        </p>

        {/* Connected Multi-Channel Strip */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, ...chipsIn.style }}>
          {channels.map((ch, idx) => {
            const pop = easeRange(frame, 64 + idx * 7, 82 + idx * 7, outExpo);
            return (
              <div
                key={ch.label}
                style={{
                  padding: "12px 22px",
                  borderRadius: 999,
                  background: ch.tint,
                  border: `1px solid ${THEME.hairline}`,
                  boxShadow: THEME.shadowE1,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontFamily: FONTS.ui,
                  fontSize: 16,
                  fontWeight: 700,
                  color: ch.color,
                  opacity: pop,
                  transform: `translate3d(0, ${((1 - pop) * 14).toFixed(1)}px, 0)`,
                }}
              >
                {ch.icon}
                {ch.label}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
