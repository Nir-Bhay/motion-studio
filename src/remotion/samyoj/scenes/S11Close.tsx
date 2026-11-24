import React from "react";
import { useCurrentFrame } from "remotion";
import { THEME } from "../theme";
import { FONTS } from "../fonts";
import { OrganicCursor } from "../ui/Cursor";
import { MaskedLine } from "../motion/KineticText";
import { UnreadDotMotif } from "../motion/DotMotif";
import { easeRange, enterTriad, outExpo } from "../motion/easing";
import { SamyojLogoLockup } from "../ui/SamyojIcons";

/**
 * S11 Close CTA (66.73s -> 72.00s, 316f)
 * VO: "Start your 14-day free trial at app dot samyoj dot com."
 */
export const S11Close: React.FC = () => {
  const frame = useCurrentFrame();

  const logoIn = enterTriad(frame, 6, 20, { y: 16, scaleFrom: 0.92, blurFrom: 4 });
  const ctaIn = enterTriad(frame, 48, 22, { y: 16, scaleFrom: 0.95 });
  const metaIn = enterTriad(frame, 68, 18, { y: 10 });
  const clicked = frame >= 155;
  const ripple = easeRange(frame, 155, 205, outExpo);

  const cursorWaypoints = [
    { frame: 55,  x: 1260, y: 760 },
    { frame: 145, x: 960,  y: 632 },
    { frame: 185, x: 1185, y: 690 },
  ];

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <div style={{ marginBottom: 34, ...logoIn.style }}>
        <SamyojLogoLockup height={86} />
      </div>

      <h2
        style={{
          margin: 0,
          marginBottom: 34,
          fontFamily: FONTS.display,
          fontSize: 78,
          fontWeight: 800,
          letterSpacing: "-0.04em",
          color: THEME.ink,
          lineHeight: 1.05,
        }}
      >
        <MaskedLine frame={frame} startFrame={16} duration={22}>
          Start your 14-day{" "}
          <span style={{ fontFamily: FONTS.serif, fontStyle: "italic", fontWeight: 400, color: THEME.brand, fontSize: "1.1em" }}>
            free
          </span>{" "}
          trial.
        </MaskedLine>
      </h2>

      {/* CTA Pill */}
      <div style={{ position: "relative", ...ctaIn.style }}>
        {clicked ? (
          <div
            style={{
              position: "absolute",
              inset: -16 * ripple,
              borderRadius: 999,
              border: `2px solid ${THEME.mint}`,
              opacity: 1 - ripple,
            }}
          />
        ) : null}
        <div
          style={{
            padding: "20px 44px",
            borderRadius: 999,
            background: clicked ? THEME.mintDeep : THEME.ink,
            color: "#FFFFFF",
            display: "inline-flex",
            alignItems: "center",
            gap: 14,
            boxShadow: THEME.shadowE3,
            transform: clicked && frame < 168 ? "scale(0.96)" : "scale(1)",
          }}
        >
          <UnreadDotMotif size={24} morph={1} />
          <span style={{ fontFamily: FONTS.mono, fontSize: 28, fontWeight: 700 }}>app.samyoj.com</span>
        </div>
      </div>

      <div
        style={{
          marginTop: 28,
          fontFamily: FONTS.ui,
          fontSize: 18,
          fontWeight: 500,
          color: THEME.ink2,
          ...metaIn.style,
        }}
      >
        WhatsApp · Instagram · Messenger · Email · AI Studio · Built in India
      </div>

      <OrganicCursor frame={frame} waypoints={cursorWaypoints} clickFrames={[155]} />
    </div>
  );
};
