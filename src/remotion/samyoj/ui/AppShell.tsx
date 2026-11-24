import React from "react";
import { THEME } from "../theme";
import { FONTS } from "../fonts";
import { IconEmail, IconInstagram, IconMessenger, IconWhatsApp, SamyojLogoLockup } from "./SamyojIcons";

export type AppNavTab =
  | "Dashboard"
  | "Inbox"
  | "Campaigns"
  | "Flows"
  | "Broadcasts"
  | "AI Studio"
  | "AI Agents"
  | "Instagram"
  | "Reports"
  | "Settings";

export interface AppShellProps {
  activeTab: AppNavTab;
  pageTitle: string;
  pageSubtitle: string;
  headerRight?: React.ReactNode;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * Authentic Samyoj SaaS Application Window (modeled directly on app.samyoj.com screenshots):
 * - 232px left sidebar with Dashboard, CHANNELS (WhatsApp, Instagram, Facebook, Email),
 *   AI STUDIO (AI Bots, Automations, AI Studio), CONTACTS, SUPPORT (Tickets)
 * - 60px top header with LIVE badge, Help, Search anything... Ctrl K, bell, green Owner avatar
 */
export const AppShell: React.FC<AppShellProps> = ({
  activeTab,
  pageTitle,
  pageSubtitle,
  headerRight,
  children,
  style,
}) => {
  const isInbox = activeTab === "Inbox";
  const isCampaigns = activeTab === "Campaigns" || activeTab === "Broadcasts";
  const isFlows = activeTab === "Flows";
  const isAi = activeTab === "AI Studio" || activeTab === "AI Agents";
  const isDash = activeTab === "Dashboard" || activeTab === "Reports";
  const isIg = activeTab === "Instagram";

  return (
    <div
      style={{
        width: 1700,
        height: 860,
        borderRadius: 22,
        background: "#FFFFFF",
        border: `1.5px solid ${THEME.hairline}`,
        boxShadow: THEME.shadowE3,
        display: "grid",
        gridTemplateColumns: "232px 1fr",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Left Navigation Sidebar matching real app.samyoj.com */}
      <div
        style={{
          background: "#FFFFFF",
          borderRight: `1px solid ${THEME.hairline}`,
          padding: "16px 12px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {/* Brand + Collapse button */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "2px 6px 14px" }}>
            <SamyojLogoLockup height={30} />
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                border: `1px solid ${THEME.hairline}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: FONTS.mono,
                fontSize: 11,
                color: THEME.ink3,
              }}
            >
              «
            </div>
          </div>

          {/* Dashboard */}
          <NavRow label="Dashboard" active={isDash} />

          {/* CHANNELS */}
          <SectionLabel text="CHANNELS" />
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <NavRow label="WhatsApp" icon={<IconWhatsApp size={15} />} active={isInbox || isCampaigns} tint="mint" right="⌄" />
            {(isInbox || isCampaigns) ? (
              <div style={{ paddingLeft: 18, display: "flex", flexDirection: "column", gap: 2 }}>
                <NavRow label="Inbox" active={isInbox} tint="mint" badge="10" />
                <NavRow label="Campaigns" active={isCampaigns} tint="mint" />
                <NavRow label="Templates" active={false} />
              </div>
            ) : null}
            <NavRow label="Instagram" icon={<IconInstagram size={15} />} active={isIg} tint="brand" right="›" />
            <NavRow label="Facebook" icon={<IconMessenger size={15} />} active={false} right="›" />
            <NavRow label="Email" icon={<IconEmail size={15} />} active={false} right="›" />
          </div>

          {/* AI STUDIO */}
          <SectionLabel text="AI STUDIO" />
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <NavRow label="AI Bots" active={false} />
            <NavRow label="Automations" active={isFlows} tint="brand" />
            <NavRow label="AI Studio" active={isAi} tint="brand" badge="LIVE" />
          </div>

          {/* CONTACTS & SUPPORT */}
          <SectionLabel text="CONTACTS & SUPPORT" />
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <NavRow label="Contacts" active={false} />
            <NavRow label="Tickets" active={false} />
            <NavRow label="Settings" active={activeTab === "Settings"} />
          </div>
        </div>

        {/* Bottom Workspace Pill */}
        <div
          style={{
            padding: "9px 11px",
            borderRadius: 12,
            background: "#F8FAFC",
            border: `1px solid ${THEME.hairline}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontFamily: FONTS.ui, fontSize: 12, fontWeight: 700, color: THEME.ink }}>Kicks &amp; Co.</div>
            <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: THEME.mintDeep }}>Meta Cloud API</div>
          </div>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: THEME.mint }} />
        </div>
      </div>

      {/* Main Content Shell */}
      <div style={{ display: "flex", flexDirection: "column", background: "#FAFBFD" }}>
        {/* Authentic Topbar */}
        <div
          style={{
            height: 60,
            background: "#FFFFFF",
            borderBottom: `1px solid ${THEME.hairline}`,
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: FONTS.display, fontSize: 18, fontWeight: 700, color: THEME.ink }}>
                  {pageTitle}
                </span>
                <span
                  style={{
                    padding: "2px 8px",
                    borderRadius: 999,
                    background: THEME.tintMint,
                    color: THEME.mintDeep,
                    fontFamily: FONTS.mono,
                    fontSize: 10,
                    fontWeight: 700,
                  }}
                >
                  LIVE
                </span>
              </div>
              <div style={{ fontFamily: FONTS.ui, fontSize: 11.5, color: THEME.ink3 }}>{pageSubtitle}</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {headerRight}
            <div
              style={{
                padding: "6px 12px",
                borderRadius: 9,
                border: `1px solid ${THEME.hairline}`,
                background: "#FFFFFF",
                fontFamily: FONTS.ui,
                fontSize: 12,
                color: THEME.ink2,
                fontWeight: 600,
              }}
            >
              Help
            </div>
            <div
              style={{
                width: 210,
                height: 34,
                borderRadius: 9,
                background: "#F8FAFC",
                border: `1px solid ${THEME.hairline}`,
                padding: "0 11px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontFamily: FONTS.ui,
                fontSize: 12,
                color: THEME.ink3,
              }}
            >
              <span>Search anything...</span>
              <span
                style={{
                  padding: "2px 6px",
                  borderRadius: 5,
                  background: "#FFFFFF",
                  border: `1px solid ${THEME.hairline}`,
                  fontFamily: FONTS.mono,
                  fontSize: 10,
                }}
              >
                Ctrl K
              </span>
            </div>
            {/* Green Owner Badge matching real screenshot NH / KC */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "4px 10px 4px 5px",
                borderRadius: 10,
                border: `1px solid ${THEME.hairline}`,
                background: "#FFFFFF",
              }}
            >
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 7,
                  background: "#16A34A",
                  color: "#FFFFFF",
                  fontFamily: FONTS.mono,
                  fontSize: 11,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                KC
              </div>
              <div style={{ lineHeight: 1.1 }}>
                <div style={{ fontFamily: FONTS.ui, fontSize: 11.5, fontWeight: 700, color: THEME.ink }}>Kicks &amp; Co.</div>
                <div style={{ fontFamily: FONTS.mono, fontSize: 9.5, color: THEME.ink3 }}>Owner</div>
              </div>
            </div>
          </div>
        </div>

        {/* Inner Workspace Canvas */}
        <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>{children}</div>
      </div>
    </div>
  );
};

const SectionLabel: React.FC<{ text: string }> = ({ text }) => (
  <div
    style={{
      marginTop: 10,
      marginBottom: 2,
      paddingLeft: 10,
      borderLeft: `2px solid ${THEME.brand}`,
      fontFamily: FONTS.mono,
      fontSize: 9.5,
      fontWeight: 700,
      color: THEME.ink3,
      letterSpacing: "0.08em",
    }}
  >
    {text}
  </div>
);

const NavRow: React.FC<{
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  tint?: "brand" | "mint";
  badge?: string;
  right?: string;
}> = ({ label, icon, active, tint = "brand", badge, right }) => {
  const bg = active ? (tint === "mint" ? "rgba(16,185,129,0.11)" : THEME.tintBrand) : "transparent";
  const fg = active ? (tint === "mint" ? "#15803D" : THEME.brand) : THEME.ink2;
  const bd = active ? (tint === "mint" ? "1px solid rgba(22,163,74,0.22)" : "1px solid rgba(75,46,235,0.18)") : "1px solid transparent";
  return (
    <div
      style={{
        padding: "7px 10px",
        borderRadius: 9,
        background: bg,
        border: bd,
        color: fg,
        fontFamily: FONTS.ui,
        fontSize: 13,
        fontWeight: active ? 700 : 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {icon}
        {label}
      </span>
      {badge ? (
        <span
          style={{
            padding: "1px 6px",
            borderRadius: 999,
            background: badge === "LIVE" ? THEME.tintMint : active ? "#16A34A" : "#E2E8F0",
            color: badge === "LIVE" ? THEME.mintDeep : active ? "#FFFFFF" : THEME.ink2,
            fontFamily: FONTS.mono,
            fontSize: 9.5,
            fontWeight: 700,
          }}
        >
          {badge}
        </span>
      ) : right ? (
        <span style={{ fontFamily: FONTS.mono, fontSize: 12, color: THEME.ink3 }}>{right}</span>
      ) : null}
    </div>
  );
};
