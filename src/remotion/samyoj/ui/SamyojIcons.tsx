import React from "react";
import { Img, staticFile } from "remotion";
import { THEME } from "../theme";
import { easeRange, outExpo } from "../motion/easing";

/**
 * Consistent 2px rounded-stroke 24px grid SVG icon system.
 * No emoji as icons. Channel icons follow Meta/brand compliance.
 */

export const IconWhatsApp: React.FC<{ size?: number; color?: string }> = ({
  size = 24,
  color = THEME.whatsapp,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 21a9 9 0 1 0-7.8-4.5L3 21l4.6-1.15A8.96 8.96 0 0 0 12 21Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.4 8.9c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.3.1.5-.1.7l-.5.6c.5 1 1.4 1.8 2.4 2.4l.6-.5c.2-.2.5-.2.7-.1l1.6.7c.3.1.4.3.4.5v.5c0 .3 0 .5-.4.7-.5.3-1.4.4-2.5 0-1.9-.7-4-2.8-4.7-4.7-.4-1.1-.3-2 .1-2.4Z"
      fill={color}
    />
  </svg>
);

export const IconInstagram: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="ig-grad-samyoj" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor={THEME.instagramOrange} />
        <stop offset="55%" stopColor={THEME.instagramPink} />
        <stop offset="100%" stopColor="#833AB4" />
      </linearGradient>
    </defs>
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="5"
      stroke="url(#ig-grad-samyoj)"
      strokeWidth="2"
    />
    <circle cx="12" cy="12" r="4" stroke="url(#ig-grad-samyoj)" strokeWidth="2" />
    <circle cx="17.2" cy="6.8" r="1.2" fill={THEME.instagramPink} />
  </svg>
);

export const IconMessenger: React.FC<{ size?: number; color?: string }> = ({
  size = 24,
  color = THEME.facebook,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 3C6.9 3 3 6.7 3 11.4c0 2.6 1.3 5 3.4 6.6V21l3.1-1.7c.8.2 1.6.3 2.5.3 5.1 0 9-3.7 9-8.3C21 6.7 17.1 3 12 3Z"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="m8 13.2 2.8-3 2.1 2 3.1-3-2.8 3-2.1-2-3.1 3Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconMail: React.FC<{ size?: number; color?: string }> = ({
  size = 24,
  color = THEME.ink2,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2.5" stroke={color} strokeWidth="2" />
    <path
      d="m4.5 7 7.5 5.5L19.5 7"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconMetaInfinity: React.FC<{ size?: number; color?: string }> = ({
  size = 24,
  color = THEME.metaAds,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M7.5 16.5c-2.5 0-4.2-2-4.2-4.5s1.8-4.5 4.2-4.5c2 0 3.3 1.7 4.5 4.5 1.2 2.8 2.5 4.5 4.5 4.5 2.4 0 4.2-2 4.2-4.5s-1.7-4.5-4.2-4.5c-2 0-3.3 1.7-4.5 4.5-1.2 2.8-2.5 4.5-4.5 4.5Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconEmail = IconMail;
export const IconMeta = IconMetaInfinity;
export const IconSheet: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = THEME.mintDeep }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="4" y="3" width="16" height="18" rx="2.5" stroke={color} strokeWidth="2" />
    <path d="M4 9h16M4 15h16M10 9v12" stroke={color} strokeWidth="2" />
  </svg>
);

export const IconSpark: React.FC<{ size?: number; color?: string }> = ({
  size = 24,
  color = THEME.brand,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 3 14.3 9.7 21 12l-6.7 2.3L12 21l-2.3-6.7L3 12l6.7-2.3L12 3Z"
      fill={THEME.tintBrand}
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconCheck: React.FC<{ size?: number; color?: string }> = ({
  size = 24,
  color = THEME.mintInk,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="m5 12.5 4.5 4.5L19 7.5"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconSend: React.FC<{ size?: number; color?: string }> = ({
  size = 24,
  color = "#FFFFFF",
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M21 3 10 14M21 3l-6.5 18-4-7-7-4L21 3Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconCalendar: React.FC<{ size?: number; color?: string }> = ({
  size = 24,
  color = THEME.brand,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="16" rx="3" stroke={color} strokeWidth="2" />
    <path d="M8 3v4M16 3v4M3 10h18" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const IconShield: React.FC<{ size?: number; color?: string }> = ({
  size = 24,
  color = THEME.brand,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 3 5 6v6c0 4.5 3 8.1 7 9 4-.9 7-4.5 7-9V6l-7-3Z"
      fill={THEME.tintBrand}
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="m9 12 2 2 4-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconUsers: React.FC<{ size?: number; color?: string }> = ({
  size = 24,
  color = THEME.brand,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="9" cy="8" r="3" stroke={color} strokeWidth="2" />
    <path d="M3.5 19a5.5 5.5 0 0 1 11 0" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <circle cx="16.5" cy="9" r="2.2" stroke={color} strokeWidth="2" />
    <path d="M16.5 14a4.5 4.5 0 0 1 4 4.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const IconFeatureGlyph: React.FC<{
  kind:
    | "roles"
    | "templates"
    | "forms"
    | "catalogs"
    | "tickets"
    | "webhooks"
    | "hours"
    | "languages";
  size?: number;
  color?: string;
}> = ({ kind, size = 48, color = THEME.brand }) => {
  switch (kind) {
    case "roles":
      return <IconUsers size={size} color={color} />;
    case "templates":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect x="4" y="4" width="16" height="16" rx="3" stroke={color} strokeWidth="2" />
          <path d="M8 9h8M8 13h5M8 17h3" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "forms":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect x="5" y="3" width="14" height="18" rx="3" stroke={color} strokeWidth="2" />
          <path d="M9 8h6M9 12h6M9 16h4" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "catalogs":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="7.5" height="7.5" rx="2" stroke={color} strokeWidth="2" />
          <rect x="13.5" y="4" width="7.5" height="7.5" rx="2" stroke={color} strokeWidth="2" />
          <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" stroke={color} strokeWidth="2" />
          <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" stroke={color} strokeWidth="2" />
        </svg>
      );
    case "tickets":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path
            d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4V7Z"
            stroke={color}
            strokeWidth="2"
          />
          <path d="m9.5 12 2 2 3.5-3.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "webhooks":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "hours":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" />
          <path d="M12 7v5l3.5 2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "languages":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" />
          <path d="M3.5 12h17M12 3a13 13 0 0 1 0 18M12 3a13 13 0 0 0 0 18" stroke={color} strokeWidth="2" />
        </svg>
      );
  }
};

/**
 * Animated Samyoj Mark Reveal (S03): stroke draw -> fill -> specular sweep
 * Mirrors samyoj-logo-new.png geometry cleanly for vector animation.
 */
export const AnimatedSamyojMark: React.FC<{
  frame: number;
  startFrame: number;
  size?: number;
}> = ({ frame, startFrame, size = 132 }) => {
  const strokeP = easeRange(frame, startFrame, startFrame + 32, outExpo);
  const fillP = easeRange(frame, startFrame + 22, startFrame + 48, outExpo);
  const sweepP = easeRange(frame, startFrame + 42, startFrame + 76, outExpo);
  const dashLen = 300;

  return (
    <div style={{ width: size, height: size, position: "relative" }}>
      <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
        <defs>
          <linearGradient id="sy-mark-grad" x1="12" y1="12" x2="108" y2="108" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={THEME.brandDeep} />
            <stop offset="55%" stopColor={THEME.brand} />
            <stop offset="100%" stopColor={THEME.metaAds} />
          </linearGradient>
        </defs>
        {/* Soft tinted inner backdrop */}
        <circle
          cx="60"
          cy="60"
          r="46"
          fill={THEME.tintBrand}
          opacity={fillP * 0.55}
        />
        {/* Outer speech-bubble ring with handshake tail */}
        <path
          d="M 88 26 A 42 42 0 1 0 26 88 L 18 104 L 38 96 A 42 42 0 0 0 100 54"
          stroke="url(#sy-mark-grad)"
          strokeWidth="9.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={dashLen}
          strokeDashoffset={dashLen * (1 - strokeP)}
        />
        {/* 3 overlapping team/customer silhouettes */}
        <g opacity={fillP} transform={`translate(0, ${((1 - fillP) * 6).toFixed(1)})`}>
          <circle cx="42" cy="52" r="7.5" fill={THEME.brand} opacity="0.82" />
          <path d="M 30 74 C 30 65, 54 65, 54 74" fill={THEME.brand} opacity="0.82" />
          <circle cx="78" cy="52" r="7.5" fill={THEME.metaAds} opacity="0.85" />
          <path d="M 66 74 C 66 65, 90 65, 90 74" fill={THEME.metaAds} opacity="0.85" />
          <circle cx="60" cy="46" r="10" fill="url(#sy-mark-grad)" />
          <path d="M 43 76 C 43 63, 77 63, 77 76" fill="url(#sy-mark-grad)" />
        </g>
        {/* 4-point sparkle top-right */}
        <path
          d="M 96 14 L 99.5 23.5 L 109 27 L 99.5 30.5 L 96 40 L 92.5 30.5 L 83 27 L 92.5 23.5 Z"
          fill={THEME.brandDeep}
          opacity={fillP}
          transform={`scale(${(0.4 + 0.6 * fillP).toFixed(3)})`}
          style={{ transformOrigin: "96px 27px" }}
        />
      </svg>

      {/* Specular highlight sweep across mark */}
      {sweepP > 0 && sweepP < 1 ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -20,
              bottom: -20,
              width: 44,
              left: `${-40 + sweepP * 180}%`,
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.85), transparent)",
              transform: "rotate(22deg)",
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

/** Official brand logo lockup from samyoj-logo-new.png */
export const SamyojLogoLockup: React.FC<{ height?: number }> = ({ height = 82 }) => (
  <Img
    src={staticFile("brand/samyoj-logo-new.png")}
    style={{
      height,
      width: "auto",
      objectFit: "contain",
      display: "block",
    }}
  />
);
