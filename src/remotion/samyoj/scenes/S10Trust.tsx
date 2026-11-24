import React from "react";
import { useCurrentFrame } from "remotion";
import { THEME } from "../theme";
import { FONTS } from "../fonts";
import { MaskedLine } from "../motion/KineticText";
import { enterTriad } from "../motion/easing";
import { IconCheck, IconMeta, IconShield } from "../ui/SamyojIcons";

/**
 * S10 Trust Anchor (62.33s -> 66.73s, 274f)
 * VO: "powered by the official Meta Cloud API with zero markup, built in India."
 */
export const S10Trust: React.FC = () => {
  const frame = useCurrentFrame();

  const cards = [
    {
      icon: <IconMeta size={28} />,
      bg: "#EFF6FF",
      title: "Official Meta Cloud API",
      sub: "Meta Tech Provider · Zero gray-market risk",
      delay: 14,
    },
    {
      icon: <IconCheck size={28} color={THEME.mintDeep} />,
      bg: THEME.tintMint,
      title: "Zero markup on Meta fees",
      sub: "Direct Meta billing at actuals",
      delay: 32,
    },
    {
      icon: <IconShield size={28} color={THEME.brand} />,
      bg: THEME.tintBrand,
      title: "Built in India",
      sub: "Crafted for fast-moving teams globally",
      delay: 50,
    },
  ];

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 120px" }}>
      <h2
        style={{
          margin: 0,
          marginBottom: 46,
          fontFamily: FONTS.display,
          fontSize: 66,
          fontWeight: 800,
          letterSpacing: "-0.035em",
          color: THEME.ink,
          textAlign: "center",
        }}
      >
        <MaskedLine frame={frame} startFrame={4} duration={20}>
          Built to{" "}
          <span style={{ fontFamily: FONTS.serif, fontStyle: "italic", fontWeight: 400, color: THEME.brand, fontSize: "1.1em" }}>
            trust
          </span>{" "}
          at scale.
        </MaskedLine>
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 26, width: "100%", maxWidth: 1460 }}>
        {cards.map((c) => {
          const st = enterTriad(frame, c.delay, 20, { y: 18, scaleFrom: 0.95, blurFrom: 5 });
          return (
            <div
              key={c.title}
              style={{
                padding: "36px 32px",
                borderRadius: 24,
                background: "#FFFFFF",
                border: `1.5px solid ${THEME.hairline}`,
                boxShadow: THEME.shadowE2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                ...st.style,
              }}
            >
              <div style={{ width: 64, height: 64, borderRadius: 18, background: c.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                {c.icon}
              </div>
              <div style={{ fontFamily: FONTS.display, fontSize: 25, fontWeight: 700, color: THEME.ink }}>{c.title}</div>
              <div style={{ fontFamily: FONTS.ui, fontSize: 16, color: THEME.ink2, marginTop: 8 }}>{c.sub}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
