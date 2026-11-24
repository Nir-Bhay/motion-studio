import React from "react";
import { useCurrentFrame } from "remotion";
import { THEME } from "../theme";
import { FONTS } from "../fonts";
import { AppShell } from "../ui/AppShell";
import { CameraRig } from "../motion/CameraRig";
import { OrganicCursor } from "../ui/Cursor";
import { EditorialSplit } from "../motion/KineticText";
import { easeRange, enterTriad, outExpo } from "../motion/easing";

/**
 * S06 Visual Automations (36.77s -> 42.50s, 354f)
 * VO: "Build visual automations once for DMs, comments, and confirmed-lead follow-up emails."
 * Zero fake UPI — showcases DM/Comment triggers, AI Studio, Confirmed-Lead Follow-Up Email & IG Auto-DM!
 */
export const S06Workflow: React.FC = () => {
  const frame = useCurrentFrame();

  const shellIn = enterTriad(frame, 4, 20, { y: 18, scaleFrom: 0.96, blurFrom: 5 });

  // Progressive node activation locked to VO
  const w1 = easeRange(frame, 35, 80, outExpo);
  const w2 = easeRange(frame, 90, 140, outExpo);
  const w3 = easeRange(frame, 150, 200, outExpo);
  const w4 = easeRange(frame, 205, 260, outExpo);

  const camKeyframes = [
    { frame: 0,   scale: 0.99, x: 0,   y: 0 },
    { frame: 65,  scale: 1.0,  x: 0,   y: 0 },
    { frame: 145, scale: 1.04, x: 14,  y: 0 },
    { frame: 235, scale: 1.04, x: -18, y: 0 },
    { frame: 315, scale: 1.04, x: -18, y: 0 },
    { frame: 354, scale: 1.0,  x: 0,   y: 0 },
  ];

  const cursorWaypoints = [
    { frame: 25,  x: 420,  y: 450 },
    { frame: 110, x: 760,  y: 450 },
    { frame: 190, x: 1050, y: 450 },
    { frame: 255, x: 1440, y: 315 }, // Follow-up Email node
    { frame: 310, x: 1440, y: 315 },
  ];

  const packetPos = (p: number, x0: number, y0: number, x1: number, y1: number) => ({
    x: x0 + (x1 - x0) * p,
    y: y0 + (y1 - y0) * p,
  });

  const pkt1 = w1 > 0.05 && w1 < 0.98 ? packetPos(w1, 315, 290, 415, 290) : null;
  const pkt2 = w2 > 0.05 && w2 < 0.98 ? packetPos(w2, 655, 290, 755, 290) : null;

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <CameraRig frame={frame} keyframes={camKeyframes}>
        <div
          style={{
            position: "absolute",
            left: 110,
            top: 42,
            right: 110,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <EditorialSplit
            frame={frame}
            startFrame={4}
            lead="Automate every"
            accent="channel."
            accentColor={THEME.brand}
            fontSize={46}
          />
          <div
            style={{
              padding: "9px 18px",
              borderRadius: 999,
              background: THEME.tintMint,
              border: "1px solid rgba(16,185,129,0.28)",
              fontFamily: FONTS.mono,
              fontSize: 12.5,
              fontWeight: 700,
              color: THEME.mintDeep,
            }}
          >
            VISUAL FLOWS · DMS · COMMENTS · FOLLOW-UP EMAIL
          </div>
        </div>

        <div style={{ position: "absolute", left: 110, top: 116, ...shellIn.style }}>
          <AppShell
            activeTab="Flows"
            pageTitle="Visual Automations"
            pageSubtitle="DMs · Instagram Comments · Confirmed-Lead Follow-Up Emails"
            headerRight={
              <div style={{ padding: "7px 15px", borderRadius: 10, background: THEME.brand, color: "#FFFFFF", fontFamily: FONTS.ui, fontSize: 12, fontWeight: 700 }}>
                ACTIVE FLOW ●
              </div>
            }
          >
            <div
              style={{
                height: "100%",
                position: "relative",
                backgroundImage: "radial-gradient(#CBD5E1 1.3px, transparent 1.3px)",
                backgroundSize: "24px 24px",
                backgroundColor: "#FAFBFD",
              }}
            >
              {/* Crisp Bezier Wires + 2D Data Packets */}
              <svg width={1468} height={800} viewBox="0 0 1468 800" style={{ position: "absolute", inset: 0 }}>
                {[
                  { d: "M 315 290 C 365 290, 365 290, 415 290", p: w1, c: THEME.brand },
                  { d: "M 655 290 C 705 290, 705 290, 755 290", p: w2, c: THEME.brand },
                  { d: "M 995 290 C 1055 290, 1055 150, 1110 150", p: w3, c: THEME.mint },
                  { d: "M 995 290 C 1055 290, 1055 430, 1110 430", p: w3, c: THEME.brand },
                  { d: "M 1360 150 C 1425 150, 1425 605, 1360 605", p: w4, c: THEME.mint },
                ].map((wire, idx) => (
                  <g key={idx}>
                    <path d={wire.d} fill="none" stroke="#E2E8F0" strokeWidth={3.5} strokeLinecap="round" />
                    <path
                      d={wire.d}
                      fill="none"
                      stroke={wire.c}
                      strokeWidth={3.5}
                      strokeLinecap="round"
                      strokeDasharray="650"
                      strokeDashoffset={650 * (1 - wire.p)}
                    />
                  </g>
                ))}
                {pkt1 ? <circle cx={pkt1.x} cy={pkt1.y} r={6} fill={THEME.brand} /> : null}
                {pkt2 ? <circle cx={pkt2.x} cy={pkt2.y} r={6} fill={THEME.mint} /> : null}
              </svg>

              {/* Node 1: Trigger */}
              <FlowNode
                left={75}
                top={230}
                tag="01 · TRIGGER"
                title="DM or IG Comment"
                meta="WhatsApp · IG · Messenger"
                status="MATCHED"
                active={frame >= 15}
                accent={THEME.brand}
              />

              {/* Node 2: AI Studio */}
              <FlowNode
                left={415}
                top={230}
                tag="02 · AI STUDIO"
                title="AI Reply & Qualify"
                meta="English / Hinglish 24/7"
                status="QUALIFIED"
                active={w1 > 0.75}
                accent={THEME.brand}
              />

              {/* Node 3: Condition */}
              <FlowNode
                left={755}
                top={230}
                tag="03 · CONDITION"
                title="IF Lead Confirmed"
                meta="Check intent & email"
                status="TRUE"
                active={w2 > 0.75}
                accent={THEME.mintDeep}
              />

              {/* Node 4A: Confirmed-Lead Follow-Up Email */}
              <FlowNode
                left={1110}
                top={90}
                tag="04A · EMAIL"
                title="Send Follow-Up Email"
                meta="Confirmed-lead template"
                status="SENT ✓"
                active={w3 > 0.7}
                accent={THEME.mintDeep}
              />

              {/* Node 4B: IG Comment Auto-DM */}
              <FlowNode
                left={1110}
                top={370}
                tag="04B · INSTAGRAM"
                title="Auto-Reply Comment"
                meta="Public reply + instant DM"
                status="REPLIED"
                active={w3 > 0.7}
                accent={THEME.brand}
              />

              {/* Node 5: Handoff */}
              <FlowNode
                left={1110}
                top={545}
                tag="05 · HANDOFF"
                title="Assign Rep & Ticket"
                meta="Full chat & email synced"
                status="COMPLETE"
                active={w4 > 0.7}
                accent={THEME.mintDeep}
              />

              <div
                style={{
                  position: "absolute",
                  left: 36,
                  bottom: 24,
                  padding: "9px 18px",
                  borderRadius: 999,
                  background: "#FFFFFF",
                  border: `1px solid ${THEME.hairline}`,
                  boxShadow: THEME.shadowE1,
                  fontFamily: FONTS.mono,
                  fontSize: 12,
                  color: THEME.ink2,
                }}
              >
                6 NODES CONNECTED · MULTI-CHANNEL · <span style={{ color: THEME.mintDeep, fontWeight: 700 }}>ZERO CODE</span>
              </div>
            </div>
          </AppShell>
        </div>

        <OrganicCursor frame={frame} waypoints={cursorWaypoints} clickFrames={[255]} />
      </CameraRig>
    </div>
  );
};

const FlowNode: React.FC<{
  left: number;
  top: number;
  tag: string;
  title: string;
  meta: string;
  status: string;
  active: boolean;
  accent: string;
}> = ({ left, top, tag, title, meta, status, active, accent }) => (
  <div
    style={{
      position: "absolute",
      left,
      top,
      width: 245,
      padding: "16px 18px",
      borderRadius: 18,
      background: "#FFFFFF",
      border: `1.5px solid ${active ? accent : THEME.hairline}`,
      boxShadow: active ? `${THEME.shadowE2}, 0 0 0 4px rgba(75,46,235,0.06)` : THEME.shadowE1,
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
      <span style={{ fontFamily: FONTS.mono, fontSize: 10, fontWeight: 700, color: accent }}>{tag}</span>
      {active ? (
        <span style={{ padding: "2px 7px", borderRadius: 999, background: THEME.tintMint, color: THEME.mintDeep, fontFamily: FONTS.mono, fontSize: 9, fontWeight: 700 }}>
          {status}
        </span>
      ) : null}
    </div>
    <div style={{ fontFamily: FONTS.display, fontSize: 17, fontWeight: 700, color: THEME.ink }}>{title}</div>
    <div style={{ fontFamily: FONTS.ui, fontSize: 12, color: THEME.ink3, marginTop: 4 }}>{meta}</div>
  </div>
);
