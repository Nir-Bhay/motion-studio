import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import {
  C,
  E_BACK,
  E_ENTER,
  E_IO,
  FONT_INTER,
  SHADOW,
  lerp,
  seg,
} from "../tokens";
import { LightSweep } from "../components/Effects";
import { ChannelKind, ChannelTileIcon } from "../components/UiKit";

const OUTRO_TILES: Array<{ kind: ChannelKind; label: string }> = [
  { kind: "whatsapp", label: "WhatsApp" },
  { kind: "instagram", label: "Instagram" },
  { kind: "facebook", label: "Facebook" },
  { kind: "gmail", label: "Email" },
];

export const Scene11Outro: React.FC<{ t: number }> = ({ t }) => {
  if (t < 53.95) return null;

  const dotPulse = t < 54.45 ? 1 + 0.35 * Math.sin(seg(t, 54.0, 54.45, E_IO) * Math.PI) : 0;
  const dotFade = 1 - seg(t, 54.35, 54.5, E_IO);

  const logoU = seg(t, 55.15, 55.85, E_ENTER);
  const tagU = seg(t, 55.95, 56.7, E_ENTER);
  const urlU = seg(t, 56.35, 57.0, E_ENTER);

  // Subtle calm breath during hold 56.8 - 60.0s
  const holdBreath = t >= 56.8 ? 1 + 0.005 * Math.sin(((t - 56.8) / 3.2) * Math.PI) : 1;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Delicate radial halo behind centered Samyoj mark */}
      <div
        style={{
          position: "absolute",
          width: 780,
          height: 440,
          borderRadius: 999,
          background: "radial-gradient(ellipse at center, rgba(79,70,229,0.08) 0%, rgba(16,185,129,0.04) 45%, rgba(255,255,255,0) 72%)",
          opacity: logoU,
          pointerEvents: "none",
        }}
      />
      {/* Initial Central Indigo Dot (54.0 - 54.5s) */}
      {t < 54.55 && (
        <div
          style={{
            position: "absolute",
            left: 960 - 8,
            top: 540 - 8,
            width: 16,
            height: 16,
            borderRadius: 999,
            backgroundColor: C.indigo,
            boxShadow: SHADOW.glow(C.indigo),
            transform: `scale(${dotPulse})`,
            opacity: dotFade,
          }}
        />
      )}

      {/* 4 Channel Tiles fanning out smoothly above official Samyoj logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          marginBottom: 34,
          height: 88,
        }}
      >
        {OUTRO_TILES.map((item, i) => {
          const start = 54.4 + i * 0.06;
          const u = seg(t, start, start + 0.45, E_BACK);
          if (t < start) return <div key={item.kind} style={{ width: 82, height: 82 }} />;
          const offsetFromCenter = (1.5 - i) * 98;
          return (
            <div
              key={item.kind}
              style={{
                width: 82,
                height: 82,
                borderRadius: 22,
                backgroundColor: "#FFFFFF",
                border: `1.5px solid ${C.line}`,
                boxShadow: "0 10px 26px rgba(15, 23, 42, 0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `translateX(${lerp(offsetFromCenter, 0, u)}px) scale(${u})`,
                opacity: u > 0 ? 1 : 0,
              }}
            >
              <ChannelTileIcon kind={item.kind} size={62} radius={16} />
            </div>
          );
        })}
      </div>

      {/* Official Samyoj Logo (from samyoj.com / public/brand/samyoj-logo-new.png) */}
      <div
        style={{
          position: "relative",
          padding: "12px 28px",
          borderRadius: 22,
          overflow: "hidden",
          opacity: logoU,
          transform: `translateY(${lerp(20, 0, logoU)}px) scale(${lerp(0.94, 1, logoU) * holdBreath})`,
        }}
      >
        <LightSweep t={t} startSec={55.55} width={720} height={240} radius={22} />
        <Img
          src={staticFile("brand/samyoj-logo-new.png")}
          style={{
            width: 640,
            height: "auto",
            display: "block",
          }}
        />
      </div>

      {/* Tagline */}
      <div
        style={{
          marginTop: 18,
          fontFamily: FONT_INTER,
          fontSize: 34,
          fontWeight: 500,
          letterSpacing: "-0.01em",
          color: C.muted,
          opacity: tagU,
          transform: `translateY(${lerp(18, 0, tagU)}px)`,
        }}
      >
        Every customer conversation. One workspace.
      </div>

      {/* Website pill */}
      <div
        style={{
          marginTop: 22,
          padding: "10px 24px",
          borderRadius: 12,
          backgroundColor: "#EEF2FF",
          border: `1.5px solid ${C.indigoBorder}`,
          boxShadow: "0 4px 16px rgba(79, 70, 229, 0.08)",
          fontFamily: FONT_INTER,
          fontSize: 24,
          fontWeight: 650,
          color: C.indigo,
          opacity: urlU,
          transform: `translateY(${lerp(12, 0, urlU)}px)`,
        }}
      >
        samyoj.com
      </div>
    </AbsoluteFill>
  );
};
