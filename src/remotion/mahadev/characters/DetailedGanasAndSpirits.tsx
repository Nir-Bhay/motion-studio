import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

export type DetailedSpiritKind =
  | "shringi"
  | "bhringi"
  | "narsingha"
  | "dhol_gana"
  | "vetala"
  | "dakini"
  | "pishacha"
  | "mukh_heen"
  | "bahu_mukh"
  | "bahu_paad"
  | "bahu_nayan"
  | "vishal_pramath"
  | "sukar_mukha"
  | "kukar_mukha"
  | "gardabh_mukha";

/**
 * Richly detailed, crisp dark-ink contoured Indian mythological Ganas,
 * Bhoot-Pret-Pishacha, Dakini-Shakini, and Tulsidas Ramcharitmanas Barat creatures.
 */
export const DetailedSpiritRig: React.FC<{
  x: number;
  y: number;
  kind: DetailedSpiritKind;
  scale?: number;
  phase?: number;
  flipX?: boolean;
}> = ({ x, y, kind, scale = 1, phase = 0, flipX = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps + phase;

  const hop = kind === "bhringi" ? Math.abs(Math.sin(t * 6.5)) * -18 : Math.sin(t * 4.5) * 9;
  const sway = Math.sin(t * 3.6) * 6;
  const armWave = Math.sin(t * 7.2) * 20;

  const palette: Record<DetailedSpiritKind, { skin: string; cloth: string }> = {
    shringi: { skin: "#cbd5e1", cloth: "#ea580c" },
    bhringi: { skin: "#e2e8f0", cloth: "#f59e0b" },
    narsingha: { skin: "#94a3b8", cloth: "#dc2626" },
    dhol_gana: { skin: "#7dd3fc", cloth: "#eab308" },
    vetala: { skin: "#64748b", cloth: "#7c2d12" },
    dakini: { skin: "#f0abfc", cloth: "#7e22ce" },
    pishacha: { skin: "#fca5a5", cloth: "#991b1b" },
    mukh_heen: { skin: "#99f6e4", cloth: "#0f766e" },
    bahu_mukh: { skin: "#fde047", cloth: "#b45309" },
    bahu_paad: { skin: "#a7f3d0", cloth: "#047857" },
    bahu_nayan: { skin: "#c4b5fd", cloth: "#4c1d95" },
    vishal_pramath: { skin: "#fdba74", cloth: "#7c2d12" },
    sukar_mukha: { skin: "#fbcfe8", cloth: "#9d174d" },
    kukar_mukha: { skin: "#cbd5e1", cloth: "#334155" },
    gardabh_mukha: { skin: "#d6d3d1", cloth: "#57534e" },
  };
  const pal = palette[kind];
  const isMassive = kind === "vishal_pramath";
  const bodyW = isMassive ? 54 : 34;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + hop,
        transform: `translate(-50%, -50%) rotate(${sway}deg) scale(${flipX ? -scale : scale}, ${scale})`,
        pointerEvents: "none",
      }}
    >
      <svg width={240} height={280} viewBox="-120 -140 240 280" overflow="visible">
        {/* Legs — Bhringi has 3 legs; bahu_paad has 6 dancing legs! */}
        {kind === "bahu_paad" ? (
          [-38, -22, -7, 7, 22, 38].map((lx, idx) => (
            <path
              key={idx}
              d={`M ${lx * 0.45},38 Q ${lx},${65 + Math.sin(t * 8 + idx) * 10} ${lx * 1.15},92`}
              fill="none"
              stroke="#0b1120"
              strokeWidth={11}
              strokeLinecap="round"
            />
          ))
        ) : (
          <>
            <path d="M -16,38 Q -22,68 -18,92" fill="none" stroke="#0b1120" strokeWidth={16} strokeLinecap="round" />
            <path d="M -16,38 Q -22,68 -18,92" fill="none" stroke={pal.skin} strokeWidth={11} strokeLinecap="round" />
            <path d="M 16,38 Q 22,68 18,92" fill="none" stroke="#0b1120" strokeWidth={16} strokeLinecap="round" />
            <path d="M 16,38 Q 22,68 18,92" fill="none" stroke={pal.skin} strokeWidth={11} strokeLinecap="round" />
            {kind === "bhringi" && (
              <>
                <path d="M 0,40 Q 0,72 4,94" fill="none" stroke="#0b1120" strokeWidth={14} strokeLinecap="round" />
                <path d="M 0,40 Q 0,72 4,94" fill="none" stroke={pal.skin} strokeWidth={9} strokeLinecap="round" />
              </>
            )}
          </>
        )}

        {/* Flowing Dhoti / Loincloth with Gold Trim */}
        <path
          d={`M ${-bodyW},10 L ${bodyW},10 L ${bodyW + 12},52 Q 0,62 ${-bodyW - 12},52 Z`}
          fill={pal.cloth}
          stroke="#0b1120"
          strokeWidth={2.8}
        />
        <path d={`M ${-bodyW + 4},46 Q 0,55 ${bodyW - 4},46`} fill="none" stroke="#fde047" strokeWidth={2.5} />

        {/* Muscular / Skeletal Torso */}
        <path
          d={`M ${-bodyW},-40 Q 0,-48 ${bodyW},-40 L ${bodyW - 4},14 L ${-bodyW + 4},14 Z`}
          fill={pal.skin}
          stroke="#0b1120"
          strokeWidth={3}
        />
        {/* Rib / Muscle / Rudraksha Mala Detailing */}
        {kind === "vetala" || kind === "bhringi" ? (
          <path d="M -20,-24 L 20,-24 M -18,-13 L 18,-13 M -15,-2 L 15,-2" stroke="#334155" strokeWidth={2.4} strokeLinecap="round" />
        ) : (
          <path d="M -22,-20 Q -10,-12 -2,-19 M 2,-19 Q 10,-12 22,-20" fill="none" stroke="#334155" strokeWidth={2.2} />
        )}
        <path d="M -22,-38 Q 0,-18 22,-38" fill="none" stroke="#7c2d12" strokeWidth={5.5} strokeDasharray="3 3.5" />

        {/* MUKH-HEEN ("जिसका सिर ही नहीं है" — expressive eyes & smile on chest!) */}
        {kind === "mukh_heen" && (
          <g transform="translate(0, -14)">
            <circle cx={-12} cy={-4} r={4.8} fill="#ffffff" stroke="#0b1120" strokeWidth={1.6} />
            <circle cx={-12} cy={-4} r={2.2} fill="#0b1120" />
            <circle cx={12} cy={-4} r={4.8} fill="#ffffff" stroke="#0b1120" strokeWidth={1.6} />
            <circle cx={12} cy={-4} r={2.2} fill="#0b1120" />
            <path d="M -10,10 Q 0,18 10,10" fill="none" stroke="#0b1120" strokeWidth={2.6} strokeLinecap="round" />
          </g>
        )}

        {/* Arms (+ extra arms for Bahu-Paad!) */}
        <g transform={`translate(${-bodyW + 2}, -30) rotate(${-22 + armWave})`}>
          <path d="M 0,0 Q -26,-10 -44,-32" fill="none" stroke="#0b1120" strokeWidth={16} strokeLinecap="round" />
          <path d="M 0,0 Q -26,-10 -44,-32" fill="none" stroke={pal.skin} strokeWidth={11} strokeLinecap="round" />
          {/* Trishul / Fire-pot / Damaru */}
          {kind === "shringi" && (
            <path d="M -44,-32 L -44,-70 M -54,-66 Q -44,-54 -34,-66" fill="none" stroke="#e2e8f0" strokeWidth={3} />
          )}
          {kind === "vetala" && <circle cx={-46} cy={-38} r={9} fill="#f97316" stroke="#fde047" strokeWidth={2} />}
        </g>

        <g transform={`translate(${bodyW - 2}, -30) rotate(${22 - armWave})`}>
          <path d="M 0,0 Q 26,-10 44,-32" fill="none" stroke="#0b1120" strokeWidth={16} strokeLinecap="round" />
          <path d="M 0,0 Q 26,-10 44,-32" fill="none" stroke={pal.skin} strokeWidth={11} strokeLinecap="round" />
          {kind === "narsingha" && (
            <path d="M 42,-32 Q 72,-54 66,-84 Q 56,-98 80,-96" fill="none" stroke="#fbbf24" strokeWidth={6} strokeLinecap="round" />
          )}
          {kind === "dhol_gana" && (
            <ellipse cx={16} cy={14} rx={18} ry={12} fill="#92400e" stroke="#fde047" strokeWidth={2.2} />
          )}
        </g>

        {kind === "bahu_paad" && (
          <>
            <path d="M -32,-12 Q -68,0 -78,-14" fill="none" stroke="#0b1120" strokeWidth={13} strokeLinecap="round" />
            <path d="M -32,-12 Q -68,0 -78,-14" fill="none" stroke={pal.skin} strokeWidth={8} strokeLinecap="round" />
            <path d="M 32,-12 Q 68,0 78,-14" fill="none" stroke="#0b1120" strokeWidth={13} strokeLinecap="round" />
            <path d="M 32,-12 Q 68,0 78,-14" fill="none" stroke={pal.skin} strokeWidth={8} strokeLinecap="round" />
          </>
        )}

        {/* HEAD VARIANTS */}
        {kind !== "mukh_heen" && kind !== "bahu_mukh" && (
          <g transform="translate(0, -68)">
            {/* Horns / Ears for Shringi, Pishacha, Animal-headed Prets */}
            {(kind === "shringi" || kind === "pishacha") && (
              <>
                <path d="M -14,-18 Q -28,-46 -12,-54" fill="none" stroke="#0b1120" strokeWidth={8} strokeLinecap="round" />
                <path d="M -14,-18 Q -28,-46 -12,-54" fill="none" stroke="#fde047" strokeWidth={4.5} strokeLinecap="round" />
                <path d="M 14,-18 Q 28,-46 12,-54" fill="none" stroke="#0b1120" strokeWidth={8} strokeLinecap="round" />
                <path d="M 14,-18 Q 28,-46 12,-54" fill="none" stroke="#fde047" strokeWidth={4.5} strokeLinecap="round" />
              </>
            )}
            {kind === "gardabh_mukha" && (
              <>
                <ellipse cx={-15} cy={-38} rx={6} ry={22} transform="rotate(-14, -15, -38)" fill={pal.skin} stroke="#0b1120" strokeWidth={2.5} />
                <ellipse cx={15} cy={-38} rx={6} ry={22} transform="rotate(14, 15, -38)" fill={pal.skin} stroke="#0b1120" strokeWidth={2.5} />
              </>
            )}

            <ellipse cx={0} cy={0} rx={isMassive ? 28 : 23} ry={isMassive ? 30 : 25} fill={pal.skin} stroke="#0b1120" strokeWidth={2.8} />

            {/* Boar Tusks / Hound Snout for Sukar-Kukar */}
            {kind === "sukar_mukha" && (
              <>
                <ellipse cx={0} cy={7} rx={11} ry={7} fill="#f472b6" stroke="#0b1120" strokeWidth={2} />
                <path d="M -14,10 Q -20,-2 -12,-6 M 14,10 Q 20,-2 12,-6" fill="none" stroke="#ffffff" strokeWidth={3.5} strokeLinecap="round" />
              </>
            )}
            {kind === "kukar_mukha" && (
              <ellipse cx={0} cy={8} rx={9} ry={11} fill="#94a3b8" stroke="#0b1120" strokeWidth={2} />
            )}

            {/* Eyes — Bahu-Nayan has 7 glowing eyes! */}
            {kind === "bahu_nayan" ? (
              [
                [-12, -10], [0, -14], [12, -10],
                [-14, 1], [0, -1], [14, 1], [0, 10],
              ].map(([ex, ey], i) => (
                <g key={i}>
                  <circle cx={ex} cy={ey} r={4} fill="#fef08a" stroke="#0b1120" strokeWidth={1.5} />
                  <circle cx={ex} cy={ey} r={1.8} fill="#7f1d1d" />
                </g>
              ))
            ) : (
              <>
                <circle cx={-9} cy={-4} r={4.5} fill="#ffffff" stroke="#0b1120" strokeWidth={1.6} />
                <circle cx={-9} cy={-4} r={2} fill="#0b1120" />
                <circle cx={9} cy={-4} r={4.5} fill="#ffffff" stroke="#0b1120" strokeWidth={1.6} />
                <circle cx={9} cy={-4} r={2} fill="#0b1120" />
                <path d="M -8,10 Q 0,17 8,10 Z" fill="#7f1d1d" stroke="#0b1120" strokeWidth={1.5} />
              </>
            )}
          </g>
        )}

        {/* BAHU-MUKH ("किसी के बहुत सारे सिर हैं" — 3 Expressive Heads!) */}
        {kind === "bahu_mukh" && (
          <g transform="translate(0, -66)">
            {[-26, 0, 26].map((hx, idx) => (
              <g key={idx} transform={`translate(${hx}, ${idx === 1 ? -8 : 4})`}>
                <circle cx={0} cy={0} r={17} fill={pal.skin} stroke="#0b1120" strokeWidth={2.5} />
                <circle cx={-5} cy={-3} r={2.5} fill="#0b1120" />
                <circle cx={5} cy={-3} r={2.5} fill="#0b1120" />
                <path d="M -5,6 Q 0,11 5,6" fill="none" stroke="#0b1120" strokeWidth={2} />
              </g>
            ))}
          </g>
        )}
      </svg>
    </div>
  );
};

/**
 * Animated Background Crowd Silhouette Band (Ganas, Gandharvas, Bridesmaids, Torches)
 * fills the midground/background so NO scene ever looks empty!
 */
export const BackgroundCrowdBand: React.FC<{
  mode: "devaloka" | "shamshan" | "bhoot_army" | "himalaya_citizens";
  y?: number;
}> = ({ mode, y = 695 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const count = mode === "bhoot_army" ? 14 : 12;

  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: y, height: 220, pointerEvents: "none", opacity: 0.78 }}>
      <svg viewBox="0 0 1920 220" width="100%" height="100%" overflow="visible">
        {Array.from({ length: count }).map((_, i) => {
          const cx = 110 + (i / (count - 1)) * 1700;
          const cy = 60 + (i % 2) * 24 + Math.sin(t * 4.5 + i * 1.1) * 8;
          const armL = Math.sin(t * 6 + i) * 18;
          const fill =
            mode === "himalaya_citizens"
              ? i % 3 === 0
                ? "#be123c"
                : i % 3 === 1
                ? "#d97706"
                : "#7c3aed"
              : mode === "devaloka"
              ? i % 2 === 0
                ? "#7c2d12"
                : "#831843"
              : mode === "bhoot_army"
              ? "#1e293b"
              : "#1e1b4b";

          return (
            <g key={i} transform={`translate(${cx}, ${cy})`}>
              <ellipse cx={0} cy={38} rx={22} ry={34} fill={fill} stroke="#0b1120" strokeWidth={2} />
              <circle cx={0} cy={-4} r={14} fill={fill} stroke="#0b1120" strokeWidth={2} />
              <path d={`M -16,14 Q -32,${-4 + armL} -36,-18`} fill="none" stroke={fill} strokeWidth={8} strokeLinecap="round" />
              <path d={`M 16,14 Q 32,${-4 - armL} 36,-18`} fill="none" stroke={fill} strokeWidth={8} strokeLinecap="round" />
              {/* Distant Torch / Kalash / Trishul / Flower Garlands */}
              {mode !== "devaloka" && mode !== "himalaya_citizens" && i % 3 === 0 && (
                <circle cx={36} cy={-24} r={7} fill="#fb923c" opacity={0.85} />
              )}
              {(mode === "devaloka" || mode === "himalaya_citizens") && (
                <polygon points="-10,-16 0,-34 10,-16" fill="#fbbf24" opacity={0.9} />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
