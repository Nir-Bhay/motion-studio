import React from "react";
import { THEME } from "../theme";
import { FONTS } from "../fonts";

export type MobileTab = "Inbox" | "Campaigns" | "Contacts" | "Automate" | "More";

/**
 * Modern Samyoj Mobile Frame with realistic Titanium bezel, Dynamic Island,
 * optional Samyoj Mobile Header + 5-tab Bottom Navigation Bar (Inbox / Campaigns / Contacts / Automate / More)
 * matching the real Samyoj mobile app screenshots!
 */
export const PhoneFrame: React.FC<{
  width?: number;
  height?: number;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  tiltDeg?: number;
  timeLabel?: string;
  coldMode?: boolean;
  mobileTitle?: string;
  activeMobileTab?: MobileTab;
  showMobileChrome?: boolean;
  children: React.ReactNode;
}> = ({
  width = 430,
  height = 840,
  rotateX = 4,
  rotateY = -8,
  rotateZ = 0,
  tiltDeg,
  timeLabel = "6:12",
  coldMode = false,
  mobileTitle = "Inbox",
  activeMobileTab,
  showMobileChrome = false,
  children,
}) => {
  const effectiveRotateY = tiltDeg ?? rotateY;

  return (
    <div
      style={{
        width,
        height,
        perspective: 1800,
        position: "relative",
      }}
    >
      {/* Grounded directional shadow ellipse beneath phone */}
      <div
        style={{
          position: "absolute",
          left: "8%",
          right: "8%",
          bottom: -26,
          height: 38,
          borderRadius: "50%",
          background: coldMode
            ? "radial-gradient(closest-side, rgba(15,23,42,0.22), transparent)"
            : "radial-gradient(closest-side, rgba(16,18,35,0.22), transparent)",
          filter: "blur(12px)",
          transform: `translate3d(${(effectiveRotateY * -1.2).toFixed(1)}px, 0, 0)`,
        }}
      />

      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotateX.toFixed(2)}deg) rotateY(${effectiveRotateY.toFixed(2)}deg) rotateZ(${rotateZ.toFixed(2)}deg)`,
        }}
      >
        {/* Soft pearl titanium chassis */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 52,
            background: "linear-gradient(145deg, #FFFFFF 0%, #E7ECF4 52%, #CBD5E1 100%)",
            boxShadow: THEME.shadowE3,
            border: "1.5px solid rgba(255,255,255,0.92)",
          }}
        />

        {/* Screen viewport */}
        <div
          style={{
            position: "absolute",
            inset: 10,
            borderRadius: 44,
            background: "#FFFFFF",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            border: "1px solid rgba(15,23,42,0.08)",
          }}
        >
          {/* iOS Status Bar + Dynamic Island */}
          <div
            style={{
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 24px",
              flexShrink: 0,
              background: "#FFFFFF",
            }}
          >
            <span style={{ fontFamily: FONTS.mono, fontSize: 12.5, fontWeight: 700, color: THEME.ink }}>
              {timeLabel}
            </span>
            <div style={{ width: 92, height: 22, borderRadius: 999, background: THEME.ink }} />
            <span style={{ fontFamily: FONTS.mono, fontSize: 11.5, fontWeight: 600, color: THEME.ink3 }}>5G</span>
          </div>

          {/* Optional Samyoj Mobile App Top Chrome matching real mobile screenshots */}
          {showMobileChrome ? (
            <div
              style={{
                height: 52,
                padding: "0 16px",
                borderBottom: `1px solid ${THEME.hairline}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "#FFFFFF",
                flexShrink: 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 9,
                    border: `1px solid ${THEME.hairline}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    color: THEME.ink2,
                  }}
                >
                  ≡
                </div>
                <span style={{ fontFamily: FONTS.display, fontSize: 16, fontWeight: 700, color: THEME.ink }}>
                  {mobileTitle}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {["🔍", "🔔"].map((ic, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      border: `1px solid ${THEME.hairline}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                    }}
                  >
                    {ic}
                  </div>
                ))}
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: "#16A34A",
                    color: "#FFFFFF",
                    fontFamily: FONTS.mono,
                    fontSize: 10.5,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  KC
                </div>
              </div>
            </div>
          ) : null}

          <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>{children}</div>

          {/* Optional Samyoj Mobile Bottom Nav Bar */}
          {activeMobileTab ? (
            <div
              style={{
                height: 56,
                borderTop: `1px solid ${THEME.hairline}`,
                background: "#FFFFFF",
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                alignItems: "center",
                padding: "0 6px",
                flexShrink: 0,
              }}
            >
              {(["Inbox", "Campaigns", "Contacts", "Automate", "More"] as MobileTab[]).map((tab) => {
                const active = tab === activeMobileTab;
                return (
                  <div
                    key={tab}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 3,
                      color: active ? THEME.brand : THEME.ink3,
                      fontFamily: FONTS.ui,
                      fontSize: 10,
                      fontWeight: active ? 700 : 500,
                    }}
                  >
                    <div
                      style={{
                        width: 18,
                        height: 4,
                        borderRadius: 999,
                        background: active ? THEME.brand : "transparent",
                      }}
                    />
                    <span>{tab}</span>
                  </div>
                );
              })}
            </div>
          ) : null}

          {/* Subtle top-left glass reflection */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(128deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.04) 26%, transparent 42%)",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
    </div>
  );
};
