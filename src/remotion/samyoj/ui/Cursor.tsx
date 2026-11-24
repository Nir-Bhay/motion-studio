import React from "react";
import { THEME } from "../theme";
import { inOutQuint, outExpo } from "../motion/easing";

export interface CursorWaypoint {
  frame: number;
  x: number;
  y: number;
  clickAt?: number;
  hover?: boolean;
}

export interface CursorState {
  x: number;
  y: number;
  tiltDeg: number;
  pressing: boolean;
  hover: boolean;
  rippleP: number;
  rippleX: number;
  rippleY: number;
}

/**
 * Evaluates smooth Catmull-Rom spline + organic velocity tilt across waypoints.
 */
export const evalCursor = (frame: number, waypoints: CursorWaypoint[]): CursorState => {
  if (waypoints.length === 0) {
    return { x: 960, y: 540, tiltDeg: 0, pressing: false, hover: false, rippleP: 0, rippleX: 0, rippleY: 0 };
  }

  let x = waypoints[0].x;
  let y = waypoints[0].y;
  let vx = 0;
  let hover = Boolean(waypoints[0].hover);

  if (frame >= waypoints[waypoints.length - 1].frame) {
    const last = waypoints[waypoints.length - 1];
    x = last.x;
    y = last.y;
    hover = Boolean(last.hover);
  } else {
    for (let i = 0; i < waypoints.length - 1; i++) {
      const a = waypoints[i];
      const b = waypoints[i + 1];
      if (frame >= a.frame && frame <= b.frame) {
        const span = Math.max(1, b.frame - a.frame);
        const u = (frame - a.frame) / span;
        const t = inOutQuint(u);

        // Catmull-Rom control anchors for curved organic wrist arc
        const p0 = waypoints[Math.max(0, i - 1)];
        const p3 = waypoints[Math.min(waypoints.length - 1, i + 2)];
        const t2 = t * t;
        const t3 = t2 * t;
        x =
          0.5 *
          (2 * a.x +
            (-p0.x + b.x) * t +
            (2 * p0.x - 5 * a.x + 4 * b.x - p3.x) * t2 +
            (-p0.x + 3 * a.x - 3 * b.x + p3.x) * t3);
        y =
          0.5 *
          (2 * a.y +
            (-p0.y + b.y) * t +
            (2 * p0.y - 5 * a.y + 4 * b.y - p3.y) * t2 +
            (-p0.y + 3 * a.y - 3 * b.y + p3.y) * t3);
        vx = (b.x - a.x) / span;
        hover = Boolean(t > 0.7 ? b.hover : a.hover);
        break;
      }
    }
  }

  // Subtle organic tilt proportional to horizontal velocity
  const tiltDeg = Math.max(-9, Math.min(9, vx * 0.45));

  let pressing = false;
  let rippleP = 0;
  let rippleX = x;
  let rippleY = y;

  for (const wp of waypoints) {
    if (wp.clickAt !== undefined) {
      const dt = frame - wp.clickAt;
      if (dt >= -2 && dt <= 6) pressing = true;
      if (dt >= 0 && dt <= 24) {
        rippleP = outExpo(dt / 24);
        rippleX = wp.x;
        rippleY = wp.y;
      }
    }
  }

  return { x, y, tiltDeg, pressing, hover, rippleP, rippleX, rippleY };
};

export const CursorOverlay: React.FC<{
  state: CursorState;
  opacity?: number;
  rippleColor?: string;
}> = ({ state, opacity = 1, rippleColor = THEME.brand }) => {
  const scale = state.pressing ? 0.84 : state.hover ? 1.04 : 1;

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity, zIndex: 50 }}>
      {state.rippleP > 0 && state.rippleP < 1 ? (
        <div
          style={{
            position: "absolute",
            left: state.rippleX,
            top: state.rippleY,
            width: 52,
            height: 52,
            borderRadius: "50%",
            border: `2.5px solid ${rippleColor}`,
            background: "rgba(75,46,235,0.08)",
            transform: `translate(-50%, -50%) scale(${(0.35 + state.rippleP * 1.45).toFixed(3)})`,
            opacity: 1 - state.rippleP,
          }}
        />
      ) : null}

      <div
        style={{
          position: "absolute",
          left: state.x,
          top: state.y,
          transform: `translate(-4px, -3px) rotate(${state.tiltDeg.toFixed(2)}deg) scale(${scale})`,
          filter: "drop-shadow(0 8px 16px rgba(15, 23, 42, 0.24))",
        }}
      >
        <svg width="30" height="34" viewBox="0 0 28 32" fill="none">
          <path
            d="M4 2.5L23.5 16.5L14.2 18.2L18.4 27.6L14.6 29.3L10.4 19.9L4.2 25.2L4 2.5Z"
            fill="#0F172A"
            stroke="#FFFFFF"
            strokeWidth="2.3"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export const OrganicCursor: React.FC<{
  frame: number;
  waypoints: CursorWaypoint[];
  clickFrames?: number[];
  opacity?: number;
}> = ({ frame, waypoints, clickFrames = [], opacity = 1 }) => {
  const merged = waypoints.map((wp) => {
    const match = clickFrames.find((cf) => Math.abs(cf - wp.frame) <= 18);
    return match !== undefined && wp.clickAt === undefined ? { ...wp, clickAt: match } : wp;
  });
  const state = evalCursor(frame, merged);
  return <CursorOverlay state={state} opacity={opacity} />;
};
