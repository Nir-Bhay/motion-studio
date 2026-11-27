import React from "react";
import { Img, staticFile } from "remotion";
import {
  C,
  E_ENTER,
  E_IO,
  E_LINEAR,
  FONT_INTER,
  SAMPLE,
  SHADOW,
  lerp,
  seg,
} from "../tokens";

export type ChannelKind =
  | "whatsapp"
  | "calls"
  | "instagram"
  | "messenger"
  | "facebook"
  | "gmail"
  | "ai"
  | "bolt"
  | "buttons"
  | "form"
  | "clock"
  | "person"
  | "contacts"
  | "tickets"
  | "team"
  | "usage";

export const ChannelTileIcon: React.FC<{
  kind: ChannelKind;
  size?: number;
  radius?: number;
}> = ({ kind, size = 48, radius }) => {
  const rad = radius ?? Math.round(size * 0.29);

  let bg: string = C.indigo;
  let content: React.ReactNode = null;
  const fs = Math.round(size * 0.48);

  switch (kind) {
    case "whatsapp":
      bg = C.waIcon;
      content = (
        <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3a9 9 0 00-7.79 13.5L3 21l4.66-1.22A9 9 0 1012 3z"
            stroke="#FFFFFF"
            strokeWidth={2.1}
            strokeLinejoin="round"
          />
          <path
            d="M9.4 8.7c-.2-.45-.4-.46-.6-.47h-.5c-.18 0-.47.07-.72.34-.25.27-.94.92-.94 2.24s.96 2.6 1.1 2.78c.13.18 1.86 2.97 4.59 4.05 2.27.9 2.73.72 3.22.67.5-.04 1.58-.64 1.8-1.26.22-.62.22-1.15.16-1.26-.07-.11-.25-.18-.52-.31-.27-.14-1.58-.78-1.83-.87-.25-.09-.43-.14-.6.13-.18.27-.7.87-.85 1.05-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.72-1.35-1.6-1.51-1.87-.16-.27-.02-.42.12-.55.12-.12.27-.32.4-.47.14-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.14-.59-1.45-.82-1.98z"
            fill="#FFFFFF"
          />
        </svg>
      );
      break;
    case "instagram":
      bg = C.igGrad;
      content = (
        <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" fill="none">
          <rect x={3.2} y={3.2} width={17.6} height={17.6} rx={5.2} stroke="#FFFFFF" strokeWidth={2.1} />
          <circle cx={12} cy={12} r={4.1} stroke="#FFFFFF" strokeWidth={2.1} />
          <circle cx={17.2} cy={6.8} r={1.25} fill="#FFFFFF" />
        </svg>
      );
      break;
    case "facebook":
      bg = C.fbBlue;
      content = (
        <svg width={size * 0.56} height={size * 0.56} viewBox="0 0 24 24" fill="none">
          <path
            d="M15.4 4.2h-2.1c-2.2 0-3.5 1.35-3.5 3.6v2.1H7.5v3.2h2.3V20h3.3v-6.9h2.5l.4-3.2h-2.9V8c0-.9.3-1.4 1.4-1.4h1.9V4.2z"
            fill="#FFFFFF"
          />
        </svg>
      );
      break;
    case "gmail":
      bg = "#FFFFFF";
      content = (
        <svg width={size * 0.64} height={size * 0.64} viewBox="0 0 24 24" fill="none">
          <path d="M3 7.5V18a1.5 1.5 0 001.5 1.5H7V11.3L3 7.5z" fill="#4285F4" />
          <path d="M21 7.5V18a1.5 1.5 0 01-1.5 1.5H17V11.3l4-3.8z" fill="#34A853" />
          <path d="M17 11.3V6.1L12 10 7 6.1v5.2l5 3.9 5-3.9z" fill="#EA4335" />
          <path d="M3 7.5l4 3.8V6.1L5.2 4.7A1.5 1.5 0 003 5.9v1.6z" fill="#C5221F" />
          <path d="M21 7.5l-4 3.8V6.1l1.8-1.4A1.5 1.5 0 0121 5.9v1.6z" fill="#FBBC04" />
        </svg>
      );
      break;
    case "messenger":
      bg = "linear-gradient(135deg, #00B2FF 0%, #006AFF 100%)";
      content = (
        <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3C6.85 3 2.8 6.84 2.8 11.65c0 2.74 1.32 5.18 3.4 6.76V21l3.08-1.7c.86.24 1.78.37 2.72.37 5.15 0 9.2-3.84 9.2-8.65S17.15 3 12 3z"
            fill="#FFFFFF"
          />
          <path
            d="M7.6 13.7l3.1-3.3 2.2 2.2 3.5-3.3-3.1 3.4-2.2-2.2-3.5 3.2z"
            fill="#006AFF"
          />
        </svg>
      );
      break;
    case "calls":
      bg = C.indigo;
      content = (
        <svg width={size * 0.56} height={size * 0.56} viewBox="0 0 24 24" fill="none">
          <path
            d="M6.4 10.6a15 15 0 007 7l2.1-2.1a1 1 0 011-.24c1.1.36 2.3.55 3.5.55a1 1 0 011 1V20a1 1 0 01-1 1C10.5 21 3 13.5 3 4a1 1 0 011-1h3.2a1 1 0 011 1c0 1.2.19 2.4.55 3.5a1 1 0 01-.24 1L6.4 10.6z"
            fill="#FFFFFF"
          />
          <path d="M14.5 5.5a5 5 0 014 4M14.5 2.5a8 8 0 017 7" stroke="#FFFFFF" strokeWidth={1.8} strokeLinecap="round" />
        </svg>
      );
      break;
    case "ai":
      bg = C.violet;
      content = "✦";
      break;
    case "bolt":
      bg = C.indigo;
      content = (
        <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none">
          <path
            d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"
            stroke="#FFFFFF"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
      break;
    case "buttons":
      bg = C.fbBlue;
      content = (
        <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none">
          <rect x={4} y={6} width={16} height={4.5} rx={2.25} stroke="#FFFFFF" strokeWidth={2} />
          <rect x={4} y={13.5} width={16} height={4.5} rx={2.25} stroke="#FFFFFF" strokeWidth={2} />
        </svg>
      );
      break;
    case "form":
      bg = C.waIcon;
      content = (
        <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none">
          <rect x={5} y={4} width={14} height={16} rx={3} stroke="#FFFFFF" strokeWidth={2} />
          <path d="M9 9h6M9 13h6M9 17h4" stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" />
        </svg>
      );
      break;
    case "clock":
      bg = C.amber;
      content = (
        <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none">
          <circle cx={12} cy={12} r={8.5} stroke="#FFFFFF" strokeWidth={2} />
          <path d="M12 7.5v4.8l3.2 1.9" stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" />
        </svg>
      );
      break;
    case "person":
      bg = C.violet;
      content = (
        <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none">
          <circle cx={12} cy={8} r={3.5} stroke="#FFFFFF" strokeWidth={2} />
          <path d="M5 20c1.4-3.6 4.1-5 7-5s5.6 1.4 7 5" stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" />
        </svg>
      );
      break;
    case "contacts":
      bg = C.waIcon;
      content = "◎";
      break;
    case "tickets":
      bg = C.amber;
      content = "▤";
      break;
    case "team":
      bg = C.indigo;
      content = "♙";
      break;
    case "usage":
      bg = C.violet;
      content = "◔";
      break;
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: rad,
        background: bg,
        border: kind === "gmail" ? `1.5px solid ${C.line}` : "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#FFFFFF",
        fontFamily: FONT_INTER,
        fontSize: kind === "instagram" ? Math.round(size * 0.4) : fs,
        fontWeight: 700,
        letterSpacing: "-0.02em",
        flexShrink: 0,
      }}
    >
      {content}
    </div>
  );
};

export type ChipVariant =
  | "green"
  | "indigo"
  | "violet"
  | "amber"
  | "gray"
  | "red"
  | "blue"
  | "instagram"
  | "indigoOutline";

export const Chip: React.FC<{
  variant?: ChipVariant;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ variant = "gray", children, style }) => {
  const styles: Record<ChipVariant, React.CSSProperties> = {
    green: { background: C.greenChipBg, color: C.greenText },
    indigo: { background: C.indigoSoft, color: C.indigoText },
    violet: { background: C.violetSoft, color: C.violetText },
    amber: { background: C.amberSoft, color: C.amberText },
    gray: { background: "#F1F5F9", color: C.muted },
    red: { background: C.gmailSoft, color: C.redChipText },
    blue: { background: C.fbSoft, color: C.fbBlue },
    instagram: { background: C.igGrad, color: "#FFFFFF" },
    indigoOutline: {
      background: "#FFFFFF",
      color: C.indigoText,
      border: `1.5px solid ${C.indigoBorder}`,
    },
  };

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        height: 40,
        paddingLeft: 14,
        paddingRight: 14,
        borderRadius: 9,
        fontFamily: FONT_INTER,
        fontSize: 22,
        fontWeight: 600,
        whiteSpace: "nowrap",
        lineHeight: 1,
        ...styles[variant],
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Avatar: React.FC<{
  initials: string;
  tone: "green" | "indigo" | "pink" | "peach" | "blue";
  size?: number;
}> = ({ initials, tone, size = 54 }) => {
  const palette = {
    green: { bg: C.avatarGreenBg, fg: C.avatarGreenText },
    indigo: { bg: C.avatarIndigoBg, fg: C.avatarIndigoText },
    pink: { bg: C.avatarPinkBg, fg: C.avatarPinkText },
    peach: { bg: C.avatarPeachBg, fg: C.avatarPeachText },
    blue: { bg: C.avatarBlueBg, fg: C.avatarBlueText },
  }[tone];

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        backgroundColor: palette.bg,
        color: palette.fg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONT_INTER,
        fontSize: Math.max(22, Math.round(size * 0.4)),
        fontWeight: 700,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
};

export const PlaceholderBar: React.FC<{
  width: number | string;
  height?: number;
  style?: React.CSSProperties;
}> = ({ width, height = 12, style }) => (
  <div
    style={{
      width,
      height,
      borderRadius: 999,
      backgroundColor: C.placeholder,
      flexShrink: 0,
      ...style,
    }}
  />
);

export const AnimatedTick: React.FC<{
  t: number;
  startSec: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}> = ({ t, startSec, color = C.successGreen, size = 24, strokeWidth = 3 }) => {
  const u = seg(t, startSec, startSec + 0.3, E_LINEAR);
  const pathLen = 28;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path
        d="M5 12.5L9.8 17.2L19 7.5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={pathLen}
        strokeDashoffset={pathLen * (1 - u)}
      />
    </svg>
  );
};

export const TypingDots: React.FC<{
  t: number;
  startSec: number;
  endSec: number;
  color?: string;
}> = ({ t, startSec, endSec, color = C.faint }) => {
  if (t < startSec || t > endSec) return null;
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "12px 16px",
        borderRadius: 20,
        backgroundColor: "#FFFFFF",
        border: `1.5px solid ${C.line}`,
        boxShadow: SHADOW.resting,
      }}
    >
      {[0, 1, 2].map((i) => {
        const phase = Math.max(0, t - startSec - i * 0.15);
        const bounce = Math.abs(Math.sin(phase * Math.PI * 3.2));
        return (
          <div
            key={i}
            style={{
              width: 7,
              height: 7,
              borderRadius: 999,
              backgroundColor: color,
              transform: `translateY(${-bounce * 6}px)`,
            }}
          />
        );
      })}
    </div>
  );
};

export const RollingNumber: React.FC<{
  value: string;
  t: number;
  startSec: number;
  style?: React.CSSProperties;
}> = ({ value, t, startSec, style }) => {
  const chars = value.split("");
  const lineH = 64;
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontFamily: FONT_INTER,
        fontVariantNumeric: "tabular-nums",
        fontSize: 56,
        fontWeight: 650,
        color: C.ink,
        lineHeight: `${lineH}px`,
        height: lineH,
        overflow: "hidden",
        ...style,
      }}
    >
      {chars.map((ch, idx) => {
        const isDigit = ch >= "0" && ch <= "9";
        const cStart = startSec + idx * 0.08;
        const u = seg(t, cStart, cStart + 0.4, E_ENTER);
        if (!isDigit) {
          return (
            <span key={idx} style={{ opacity: u }}>
              {ch}
            </span>
          );
        }
        const targetDigit = Number(ch);
        const startDigit = (targetDigit + 6) % 10;
        const curPos = lerp(startDigit, targetDigit + 10, u);
        const yOff = -((curPos % 10) * lineH);
        return (
          <div
            key={idx}
            style={{
              height: lineH,
              overflow: "hidden",
              position: "relative",
              width: "0.62em",
              textAlign: "center",
            }}
          >
            <div style={{ transform: `translateY(${yOff}px)` }}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((d, j) => (
                <div key={j} style={{ height: lineH, lineHeight: `${lineH}px` }}>
                  {d}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const WindowShell: React.FC<{
  x: number;
  y: number;
  width: number;
  height: number;
  radius?: number;
  topBarLeft?: React.ReactNode;
  topBarRight?: React.ReactNode;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({
  x,
  y,
  width,
  height,
  radius = 28,
  topBarLeft,
  topBarRight,
  children,
  style,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        borderRadius: radius,
        backgroundColor: "#FFFFFF",
        border: `1.5px solid ${C.line}`,
        boxShadow: SHADOW.hero,
        overflow: "hidden",
        fontFamily: FONT_INTER,
        ...style,
      }}
    >
      <div
        style={{
          height: 74,
          borderBottom: `1.5px solid ${C.line}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: 32,
          paddingRight: 32,
          backgroundColor: "#FFFFFF",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <span
            style={{
              fontFamily: FONT_INTER,
              fontSize: 27,
              fontWeight: 750,
              color: C.ink,
              letterSpacing: "-0.02em",
            }}
          >
            {SAMPLE.wordmark}
          </span>
          {topBarLeft}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>{topBarRight}</div>
      </div>
      <div style={{ position: "relative", height: height - 74 }}>{children}</div>
    </div>
  );
};

export const ToggleSwitch: React.FC<{
  t: number;
  switchAt: number;
}> = ({ t, switchAt }) => {
  const u = seg(t, switchAt, switchAt + 0.25, E_IO);
  const knobLeft = lerp(5, 35, u);
  const trackColor = u > 0.5 ? C.indigo : C.placeholder;
  return (
    <div
      style={{
        width: 66,
        height: 36,
        borderRadius: 999,
        backgroundColor: trackColor,
        position: "relative",
        transition: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 5,
          left: knobLeft,
          width: 26,
          height: 26,
          borderRadius: 999,
          backgroundColor: "#FFFFFF",
          boxShadow: "0 2px 6px rgba(15,23,42,0.18)",
        }}
      />
    </div>
  );
};

export const PrimaryButton: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <div
    style={{
      height: 52,
      paddingLeft: 24,
      paddingRight: 24,
      borderRadius: 10,
      backgroundColor: C.indigo,
      color: "#FFFFFF",
      fontFamily: FONT_INTER,
      fontSize: 22,
      fontWeight: 650,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    {children}
  </div>
);

export const OutlineButton: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <div
    style={{
      height: 52,
      paddingLeft: 24,
      paddingRight: 24,
      borderRadius: 10,
      backgroundColor: "#FFFFFF",
      border: `1.5px solid ${C.indigoBorder}`,
      color: C.indigoText,
      fontFamily: FONT_INTER,
      fontSize: 22,
      fontWeight: 650,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    {children}
  </div>
);

export const SunriseArtwork: React.FC<{
  width: number;
  height: number;
  radius?: number;
}> = ({ width, height, radius = 14 }) => (
  <div
    style={{
      width,
      height,
      borderRadius: radius,
      position: "relative",
      overflow: "hidden",
      background: "linear-gradient(180deg, #FFE9BD 0%, #F8B28C 54%, #E98EA8 100%)",
    }}
  >
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "24%",
        width: Math.round(width * 0.27),
        height: Math.round(width * 0.27),
        transform: "translateX(-50%)",
        borderRadius: 999,
        backgroundColor: "#FFF4DC",
      }}
    />
    <svg
      width={width}
      height={height}
      viewBox="0 0 440 440"
      style={{ position: "absolute", inset: 0 }}
    >
      <path
        d="M0 330 Q120 265 250 315 Q350 350 440 295 L440 440 L0 440 Z"
        fill="#E98EA8"
        opacity={0.6}
      />
      <path
        d="M0 375 Q140 315 280 355 Q370 380 440 340 L440 440 L0 440 Z"
        fill="#C8798D"
        opacity={0.6}
      />
    </svg>
  </div>
);

export type SamyojNavId =
  | "dashboard"
  | "whatsapp"
  | "calls"
  | "instagram"
  | "facebook"
  | "email"
  | "bots"
  | "ai"
  | "automations";

const SIDEBAR_ITEMS: Array<{
  id: SamyojNavId | "inbox" | "bots" | "contacts" | "tickets";
  label: string;
  icon: ChannelKind;
  indent?: boolean;
}> = [
  { id: "dashboard", label: "Dashboard", icon: "buttons" },
  { id: "whatsapp", label: "WhatsApp", icon: "whatsapp" },
  { id: "inbox", label: "Inbox", icon: "form", indent: true },
  { id: "calls", label: "Calls", icon: "calls", indent: true },
  { id: "facebook", label: "Facebook", icon: "facebook" },
  { id: "instagram", label: "Instagram", icon: "instagram" },
  { id: "email", label: "Email", icon: "gmail" },
  { id: "bots", label: "AI Bots", icon: "person" },
  { id: "automations", label: "Automations", icon: "bolt" },
  { id: "ai", label: "AI Studio", icon: "ai" },
  { id: "contacts", label: "Contacts", icon: "contacts" },
  { id: "tickets", label: "Tickets", icon: "tickets" },
];

export const SamyojAppShell: React.FC<{
  x: number;
  y: number;
  width: number;
  height: number;
  radius?: number;
  activeNav: SamyojNavId;
  pageTitle: string;
  liveBadge?: boolean;
  hideCalls?: boolean;
  channelIcon?: ChannelKind;
  accentColor?: string;
  pulseScale?: number;
  headerChips?: React.ReactNode;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({
  x,
  y,
  width,
  height,
  radius = 24,
  activeNav,
  pageTitle,
  liveBadge = true,
  hideCalls = false,
  channelIcon,
  accentColor = C.indigo,
  pulseScale = 1,
  headerChips,
  children,
  style,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        borderRadius: radius,
        backgroundColor: "#FFFFFF",
        border: `1.5px solid ${C.line}`,
        boxShadow: SHADOW.hero,
        overflow: "hidden",
        display: "flex",
        ...style,
      }}
    >
      {/* Left Navigation Sidebar (246px) */}
      <div
        style={{
          width: 246,
          flexShrink: 0,
          borderRight: `1.5px solid ${C.line}`,
          backgroundColor: "#F8FAFD",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            height: 76,
            paddingLeft: 14,
            paddingRight: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: `1.5px solid ${C.lineSoft}`,
          }}
        >
          <Img
            src={staticFile("brand/samyoj-logo-new.png")}
            style={{
              height: 50,
              width: "auto",
              display: "block",
            }}
          />
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              border: `1.5px solid ${C.line}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              color: C.muted,
            }}
          >
            ‹
          </div>
        </div>

        <div
          style={{
            padding: "14px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 6,
            flex: 1,
          }}
        >
          {(hideCalls ? SIDEBAR_ITEMS.filter((it) => it.id !== "calls") : SIDEBAR_ITEMS).map((item) => {
            const isPrimaryActive =
              item.id === activeNav ||
              (activeNav === "whatsapp" && item.id === "inbox");
            const isParentChannelActive = activeNav === "calls" && item.id === "whatsapp";
            const active = isPrimaryActive || isParentChannelActive;
            const isMainRow = item.id === activeNav || (activeNav === "whatsapp" && item.id === "whatsapp");
            return (
              <div
                key={item.id}
                style={{
                  height: isMainRow ? 48 : 44,
                  borderRadius: 12,
                  paddingLeft: item.indent ? 24 : 10,
                  paddingRight: 10,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: active
                    ? `linear-gradient(135deg, ${accentColor}16 0%, rgba(255, 255, 255, 0.92) 54%, ${accentColor}0E 100%)`
                    : "transparent",
                  border: active ? `1.5px solid ${accentColor}44` : "1.5px solid transparent",
                  boxShadow: active ? "inset 0 1px 0 rgba(255, 255, 255, 0.96)" : "none",
                  color: active ? C.ink : C.ink2,
                  opacity: active ? 1 : 0.66,
                  fontFamily: FONT_INTER,
                  fontSize: isMainRow ? 22 : 21,
                  fontWeight: active ? 700 : 500,
                }}
              >
                {active && (
                  <div
                    style={{
                      width: 3.5,
                      height: isMainRow ? 22 : 16,
                      borderRadius: 999,
                      backgroundColor: accentColor,
                      flexShrink: 0,
                      opacity: isMainRow ? 1 : 0.72,
                    }}
                  />
                )}
                <div style={{ transform: isMainRow ? `scale(${pulseScale})` : "scale(1)", flexShrink: 0 }}>
                  <ChannelTileIcon kind={item.icon} size={isMainRow ? 30 : 26} radius={8} />
                </div>
                <span style={{ whiteSpace: "nowrap" }}>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Main Shell */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top App Bar (76px) */}
        <div
          style={{
            height: 76,
            borderBottom: `1.5px solid ${C.line}`,
            paddingLeft: 24,
            paddingRight: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#FFFFFF",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {channelIcon && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `scale(${pulseScale})`,
                }}
              >
                <ChannelTileIcon kind={channelIcon} size={36} radius={9} />
              </div>
            )}
            <span
              style={{
                fontFamily: FONT_INTER,
                fontSize: 26,
                fontWeight: 700,
                color: C.ink,
              }}
            >
              {pageTitle}
            </span>
            {liveBadge && (
              <Chip variant="green" style={{ height: 34, paddingLeft: 12, paddingRight: 12, borderRadius: 8 }}>
                LIVE
              </Chip>
            )}
            {headerChips}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                height: 42,
                paddingLeft: 14,
                paddingRight: 14,
                borderRadius: 9,
                backgroundColor: C.surface2,
                border: `1.5px solid ${C.line}`,
                display: "flex",
                alignItems: "center",
                gap: 10,
                color: C.muted,
                fontFamily: FONT_INTER,
                fontSize: 22,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke={C.muted} strokeWidth="2" />
                <path d="M16.5 16.5L21 21" stroke={C.muted} strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>Search</span>
            </div>
            <Avatar initials="K" tone="green" size={42} />
          </div>
        </div>

        <div style={{ flex: 1, position: "relative", minHeight: 0 }}>{children}</div>
      </div>
    </div>
  );
};

