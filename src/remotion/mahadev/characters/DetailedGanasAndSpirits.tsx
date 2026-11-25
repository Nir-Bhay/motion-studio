import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

export type SpiritArchetype =
  | "shringi"
  | "bhringi"
  | "dhol_gana"
  | "narsingha"
  | "sukar_mukha"
  | "kukar_mukha"
  | "gardabh_mukha"
  | "bahu_mukh"
  | "bahu_paad"
  | "bahu_nayan"
  | "mukh_heen"
  | "vishal_pramath"
  | "dakini"
  | "pishacha"
  | "vetala"
  // New Asur, Daitya, Pret, Bhoot, Foreign Ghost, Bird/Jackal & Barat Bheed variants
  | "asura_senapati"
  | "daitya_mahabali"
  | "pret_kankal"
  | "bhoot_maya"
  | "shrigal_mukha"
  | "khag_mukha"
  | "chhatra_gana"
  | "nagada_gana"
  | "foreign_pret_tophat"
  | "foreign_pret_cowboy"
  | "crawl_pret";

interface DetailedSpiritRigProps {
  x: number;
  y: number;
  kind: SpiritArchetype;
  scale?: number;
  phase?: number;
  flipX?: boolean;
}

const PALETTES: Record<
  SpiritArchetype,
  { skin: string; shadow: string; cloth: string; trim: string; accent: string }
> = {
  shringi:             { skin: "#cbd5e1", shadow: "#94a3b8", cloth: "#ea580c", trim: "#fde047", accent: "#fbbf24" },
  bhringi:             { skin: "#e2e8f0", shadow: "#94a3b8", cloth: "#f59e0b", trim: "#ffffff", accent: "#cbd5e1" },
  dhol_gana:           { skin: "#7dd3fc", shadow: "#38bdf8", cloth: "#facc15", trim: "#b91c1c", accent: "#b45309" },
  narsingha:           { skin: "#94a3b8", shadow: "#64748b", cloth: "#dc2626", trim: "#fde047", accent: "#f59e0b" },
  sukar_mukha:         { skin: "#f9a8d4", shadow: "#f472b6", cloth: "#be123c", trim: "#fde047", accent: "#fff1f2" },
  kukar_mukha:         { skin: "#cbd5e1", shadow: "#64748b", cloth: "#334155", trim: "#fbbf24", accent: "#ef4444" },
  gardabh_mukha:       { skin: "#d6d3d1", shadow: "#a8a29e", cloth: "#78350f", trim: "#fde047", accent: "#f5f5f4" },
  bahu_mukh:           { skin: "#fde047", shadow: "#eab308", cloth: "#b45309", trim: "#fffbeb", accent: "#ef4444" },
  bahu_paad:           { skin: "#c4b5fd", shadow: "#8b5cf6", cloth: "#7c3aed", trim: "#fde047", accent: "#ec4899" },
  bahu_nayan:          { skin: "#a5b4fc", shadow: "#6366f1", cloth: "#312e81", trim: "#38bdf8", accent: "#fef08a" },
  mukh_heen:           { skin: "#99f6e4", shadow: "#2dd4bf", cloth: "#0f766e", trim: "#fde047", accent: "#ef4444" },
  vishal_pramath:      { skin: "#fdba74", shadow: "#ea580c", cloth: "#7c2d12", trim: "#fde047", accent: "#dc2626" },
  dakini:              { skin: "#f0abfc", shadow: "#d946ef", cloth: "#701a75", trim: "#fde047", accent: "#fef08a" },
  pishacha:            { skin: "#fca5a5", shadow: "#ef4444", cloth: "#7f1d1d", trim: "#fbbf24", accent: "#fffbeb" },
  vetala:              { skin: "#86efac", shadow: "#22c55e", cloth: "#166534", trim: "#fde047", accent: "#bbf7d0" },
  // New Variants
  asura_senapati:      { skin: "#ef4444", shadow: "#b91c1c", cloth: "#1e1b4b", trim: "#fbbf24", accent: "#fde047" },
  daitya_mahabali:     { skin: "#d97706", shadow: "#92400e", cloth: "#7f1d1d", trim: "#fde047", accent: "#f59e0b" },
  pret_kankal:         { skin: "#f1f5f9", shadow: "#94a3b8", cloth: "#334155", trim: "#38bdf8", accent: "#e2e8f0" },
  bhoot_maya:          { skin: "#a78bfa", shadow: "#6d28d9", cloth: "#312e81", trim: "#c4b5fd", accent: "#38bdf8" },
  shrigal_mukha:       { skin: "#fcd34d", shadow: "#d97706", cloth: "#9a3412", trim: "#fde047", accent: "#fef3c7" },
  khag_mukha:          { skin: "#cbd5e1", shadow: "#64748b", cloth: "#4c1d95", trim: "#fbbf24", accent: "#f59e0b" },
  chhatra_gana:        { skin: "#bae6fd", shadow: "#38bdf8", cloth: "#dc2626", trim: "#fde047", accent: "#f59e0b" },
  nagada_gana:         { skin: "#fed7aa", shadow: "#fb923c", cloth: "#ea580c", trim: "#fef08a", accent: "#fbbf24" },
  foreign_pret_tophat: { skin: "#93c5fd", shadow: "#60a5fa", cloth: "#1e293b", trim: "#fbbf24", accent: "#f8fafc" },
  foreign_pret_cowboy: { skin: "#a5f3fc", shadow: "#22d3ee", cloth: "#7c2d12", trim: "#fbbf24", accent: "#ef4444" },
  crawl_pret:          { skin: "#a7f3d0", shadow: "#34d399", cloth: "#065f46", trim: "#fde047", accent: "#fef08a" },
};

/**
 * Richly Detailed 2.5D Illustrated Asur / Daitya / Bhoot-Pret / Ghost / Gana Rig:
 * Pure solid-color + cel-shaded fills with #0b1120 dark-ink contours (zero url(#...) gradients).
 */
export const DetailedSpiritRig: React.FC<DetailedSpiritRigProps> = ({
  x,
  y,
  kind,
  scale = 1,
  phase = 0,
  flipX = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const pal = PALETTES[kind];
  const isGiant = kind === "vishal_pramath" || kind === "daitya_mahabali";
  const isThin = kind === "bhringi" || kind === "pret_kankal";
  const isHeadless = kind === "mukh_heen";
  const isFloatingGhost = kind === "bhoot_maya";
  const isCrawler = kind === "crawl_pret";

  const bounce = isFloatingGhost
    ? Math.sin(t * 3.6 + phase) * 14 - 16
    : isCrawler
    ? Math.abs(Math.sin(t * 4.8 + phase)) * -6 + 44
    : Math.abs(Math.sin(t * 5.6 + phase)) * (isGiant ? -5 : -11);

  const armWaveL = Math.sin(t * 6.2 + phase) * 18;
  const armWaveR = Math.cos(t * 6.2 + phase) * 18;
  const legSwing = Math.sin(t * 5.6 + phase) * 11;
  const wingFlap = Math.sin(t * 6.5 + phase) * 18;

  const torsoW = isGiant ? 48 : isThin ? 19 : 30;
  const limbW = isGiant ? 20 : isThin ? 10 : 15;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + bounce,
        transform: `translate(-50%, -50%) scale(${flipX ? -scale : scale}, ${scale})`,
        transformOrigin: "center center",
        pointerEvents: "none",
      }}
    >
      <svg width={340} height={380} viewBox="-170 -200 340 380" overflow="visible">
        {/* Ground Contact Shadow */}
        <ellipse
          cx={0}
          cy={isCrawler ? 78 : 126}
          rx={isFloatingGhost ? 28 : torsoW + 18}
          ry={isFloatingGhost ? 6 : 9}
          fill="#0b1120"
          opacity={isFloatingGhost ? 0.28 : 0.44}
        />

        {/* Khag-Mukha Feathered Wings Behind Torso */}
        {kind === "khag_mukha" && (
          <g>
            <g transform={`translate(-22, -26) rotate(${-15 + wingFlap})`}>
              <path d="M 0,0 Q -62,-44 -102,-12 Q -72,22 -14,22 Z" fill="#64748b" stroke="#0b1120" strokeWidth={2.6} />
              <path d="M -18,2 L -74,-12 M -20,10 L -64,8" stroke="#cbd5e1" strokeWidth={2.2} />
            </g>
            <g transform={`translate(22, -26) rotate(${15 - wingFlap})`}>
              <path d="M 0,0 Q 62,-44 102,-12 Q 72,22 14,22 Z" fill="#64748b" stroke="#0b1120" strokeWidth={2.6} />
              <path d="M 18,2 L 74,-12 M 20,10 L 64,8" stroke="#cbd5e1" strokeWidth={2.2} />
            </g>
          </g>
        )}

        {/* Bhoot Maya Floating Ghostly Ectoplasm Tail OR Legs */}
        {isFloatingGhost ? (
          <g opacity={0.9}>
            <path
              d={`M -34,16 Q -44,64 ${Math.sin(t * 4.5 + phase) * 14},118 Q 16,86 34,16 Z`}
              fill="#4c1d95"
              stroke="#0b1120"
              strokeWidth={2.8}
            />
            <path
              d={`M -20,24 Q -24,62 ${Math.sin(t * 4.5 + phase) * 10},106 Q 10,74 20,24 Z`}
              fill="#a78bfa"
              opacity={0.55}
            />
            {/* Glowing Ghostly Wisps Orbiting */}
            <circle cx={-54 + Math.cos(t * 3 + phase) * 8} cy={14 + Math.sin(t * 4) * 10} r={5} fill="#38bdf8" opacity={0.75} />
            <circle cx={56 + Math.sin(t * 3 + phase) * 8} cy={-8 + Math.cos(t * 4) * 10} r={4.5} fill="#c4b5fd" opacity={0.75} />
          </g>
        ) : !isCrawler ? (
          <>
            {/* Legs with Knees, Anklets & Feet */}
            {(kind === "bahu_paad" ? [-34, -12, 12, 34] : isThin ? [-18, 0, 18] : [-19, 19]).map((lx, idx) => {
              const swing = idx % 2 === 0 ? legSwing : -legSwing;
              return (
                <g key={idx}>
                  <path
                    d={`M ${lx},44 Q ${lx + swing * 0.35},82 ${lx + swing * 0.55},116`}
                    fill="none"
                    stroke="#0b1120"
                    strokeWidth={limbW + 6}
                    strokeLinecap="round"
                  />
                  <path
                    d={`M ${lx},44 Q ${lx + swing * 0.35},82 ${lx + swing * 0.55},116`}
                    fill="none"
                    stroke={pal.skin}
                    strokeWidth={limbW}
                    strokeLinecap="round"
                  />
                  {/* Silver/Gold Anklet & Sculpted Foot */}
                  <ellipse cx={lx + swing * 0.52} cy={110} rx={limbW * 0.52} ry={3.5} fill="none" stroke={pal.trim} strokeWidth={3} />
                  <ellipse cx={lx + swing * 0.6} cy={121} rx={limbW * 0.72} ry={6.5} fill={pal.skin} stroke="#0b1120" strokeWidth={2.4} />
                </g>
              );
            })}

            {/* Layered Pleated Dhoti / Armor Skirt with Sash */}
            <path
              d={`M ${-torsoW - 4},18 L ${torsoW + 4},18 L ${torsoW + 18},82 Q 0,94 ${-torsoW - 18},82 Z`}
              fill={pal.cloth}
              stroke="#0b1120"
              strokeWidth={3}
            />
            <path
              d={`M ${-torsoW},22 L ${-4},22 L ${-12},82 Q ${-torsoW},84 ${-torsoW - 14},78 Z`}
              fill={pal.trim}
              opacity={0.22}
            />
            <path d="M -10,20 L -16,80 M 8,20 L 14,80" stroke="#0b1120" strokeWidth={1.8} opacity={0.4} />
            <path d={`M ${-torsoW - 10},68 Q 0,78 ${torsoW + 10},68`} fill="none" stroke={pal.trim} strokeWidth={3.5} />
            <rect x={-torsoW - 5} y={12} width={(torsoW + 5) * 2} height={11} rx={5} fill={pal.trim} stroke="#0b1120" strokeWidth={2.2} />
          </>
        ) : (
          /* Crawl Pret — Legless Rounded Serpentine Base ("बिन पद कर... रेंग के चल रहा हूं") */
          <path
            d="M -36,16 Q -44,64 0,74 Q 44,64 36,16 Z"
            fill={pal.cloth}
            stroke="#0b1120"
            strokeWidth={3}
          />
        )}

        {/* Muscular / Armored / Ribbed Cel-Shaded Torso */}
        <path
          d={`M ${-torsoW - 7},-46 Q 0,-56 ${torsoW + 7},-46 L ${torsoW + 2},18 L ${-torsoW - 2},18 Z`}
          fill={kind === "foreign_pret_tophat" || kind === "foreign_pret_cowboy" ? pal.cloth : pal.skin}
          stroke="#0b1120"
          strokeWidth={3}
        />
        <path
          d={`M 6,-48 Q ${torsoW * 0.6},-46 ${torsoW + 5},-44 L ${torsoW},16 L 6,16 Z`}
          fill={pal.shadow}
          opacity={0.45}
        />

        {/* Asura / Daitya Spiked Shoulder Pauldrons & War Chestplate */}
        {(kind === "asura_senapati" || kind === "daitya_mahabali") && (
          <g>
            <path d={`M ${-torsoW - 18},-52 L ${-torsoW + 6},-46 L ${-torsoW + 2},-24 L ${-torsoW - 14},-32 Z`} fill="#fbbf24" stroke="#0b1120" strokeWidth={2.4} />
            <path d={`M ${torsoW + 18},-52 L ${torsoW - 6},-46 L ${torsoW - 2},-24 L ${torsoW + 14},-32 Z`} fill="#fbbf24" stroke="#0b1120" strokeWidth={2.4} />
            <polygon points={`${-torsoW - 14},-50 ${-torsoW - 26},-68 ${-torsoW - 4},-52`} fill="#f8fafc" stroke="#0b1120" strokeWidth={1.8} />
            <polygon points={`${torsoW + 14},-50 ${torsoW + 26},-68 ${torsoW + 4},-52`} fill="#f8fafc" stroke="#0b1120" strokeWidth={1.8} />
            <circle cx={0} cy={-16} r={11} fill="#fbbf24" stroke="#0b1120" strokeWidth={2.2} />
            <circle cx={0} cy={-16} r={5} fill="#dc2626" />
          </g>
        )}

        {/* Foreign Pret Suit Tie / Bandana */}
        {kind === "foreign_pret_tophat" && (
          <g>
            <polygon points="-10,-46 10,-46 0,-20" fill="#f8fafc" stroke="#0b1120" strokeWidth={1.5} />
            <polygon points="-4,-38 4,-38 6,-8 0,0 -6,-8" fill="#ef4444" stroke="#0b1120" strokeWidth={1.5} />
          </g>
        )}
        {kind === "foreign_pret_cowboy" && (
          <polygon points="-24,-46 24,-46 0,-18" fill="#ef4444" stroke="#0b1120" strokeWidth={2} />
        )}

        {/* Pectoral / Rib Markings OR Mukh-Heen Chest Face! */}
        {isHeadless ? (
          <g transform="translate(0, -14)">
            <path d="M -22,-32 Q -10,-46 0,-36 Q 10,-46 22,-32" fill="none" stroke="#0f172a" strokeWidth={4} strokeLinecap="round" />
            <ellipse cx={-13} cy={-8} rx={7.5} ry={6.5} fill="#ffffff" stroke="#0b1120" strokeWidth={2.2} />
            <circle cx={-13} cy={-8} r={3.2} fill="#dc2626" />
            <ellipse cx={13} cy={-8} rx={7.5} ry={6.5} fill="#ffffff" stroke="#0b1120" strokeWidth={2.2} />
            <circle cx={13} cy={-8} r={3.2} fill="#dc2626" />
            <path d="M -20,-18 L -6,-14 M 6,-14 L 20,-18" stroke="#0b1120" strokeWidth={2.5} strokeLinecap="round" />
            <path d="M -15,10 Q 0,24 15,10 Z" fill="#7f1d1d" stroke="#0b1120" strokeWidth={2.2} />
            <polygon points="-9,11 -5,17 -1,11" fill="#ffffff" />
            <polygon points="1,11 5,17 9,11" fill="#ffffff" />
          </g>
        ) : isThin ? (
          <g stroke="#0b1120" strokeWidth={2.4} opacity={0.82}>
            <line x1={-13} y1={-30} x2={13} y2={-30} />
            <line x1={-12} y1={-18} x2={12} y2={-18} />
            <line x1={-10} y1={-6} x2={10} y2={-6} />
            {kind === "pret_kankal" && <line x1={0} y1={-36} x2={0} y2={6} strokeWidth={3} />}
          </g>
        ) : (
          <>
            <path d={`M ${-torsoW * 0.65},-22 Q -10,-12 -2,-20 M 2,-20 Q 10,-12 ${torsoW * 0.65},-22`} fill="none" stroke="#0b1120" strokeWidth={2} opacity={0.45} />
            <path d="M -12,-2 Q 0,3 12,-2" fill="none" stroke="#0b1120" strokeWidth={1.8} opacity={0.38} />
          </>
        )}

        {/* Sacred Rudraksha / Bone Skull Mala */}
        {kind !== "foreign_pret_tophat" && kind !== "foreign_pret_cowboy" && (
          <path d={`M ${-torsoW * 0.72},-44 Q 0,-20 ${torsoW * 0.72},-44`} fill="none" stroke="#7c2d12" strokeWidth={6} strokeDasharray="3 5" strokeLinecap="round" />
        )}

        {/* Sculpted Arms with Hands & Props (Omitted for handless Crawl Pret!) */}
        {!isCrawler && (
          <>
            <g transform={`translate(${-torsoW - 4}, -36) rotate(${armWaveL})`}>
              <path d="M 0,0 Q -26,18 -46,-16" fill="none" stroke="#0b1120" strokeWidth={limbW + 6} strokeLinecap="round" />
              <path d="M 0,0 Q -26,18 -46,-16" fill="none" stroke={pal.skin} strokeWidth={limbW} strokeLinecap="round" />
              <ellipse cx={-20} cy={8} rx={4} ry={9} fill="none" stroke={pal.trim} strokeWidth={3} />
              <circle cx={-48} cy={-20} r={limbW * 0.58} fill={pal.skin} stroke="#0b1120" strokeWidth={2.2} />

              {/* Trishul for Shringi / Pishacha */}
              {(kind === "shringi" || kind === "pishacha") && (
                <g transform="translate(-48, -24) rotate(-18)">
                  <rect x={-2.5} y={-55} width={5} height={75} rx={2} fill="#94a3b8" stroke="#0b1120" strokeWidth={1.4} />
                  <polygon points="0,-72 -5,-52 5,-52" fill="#f8fafc" stroke="#0b1120" strokeWidth={1.4} />
                  <path d="M -12,-62 Q -12,-46 0,-46 Q 12,-46 12,-62" fill="none" stroke="#f8fafc" strokeWidth={3.2} />
                </g>
              )}

              {/* Golden Gada Mace for Asura Senapati */}
              {kind === "asura_senapati" && (
                <g transform="translate(-48, -22) rotate(-22)">
                  <rect x={-3} y={-58} width={6} height={68} rx={3} fill="#b45309" stroke="#0b1120" strokeWidth={1.8} />
                  <circle cx={0} cy={-66} r={16} fill="#fbbf24" stroke="#0b1120" strokeWidth={2.4} />
                  <polygon points="0,-90 -6,-78 6,-78" fill="#fde047" stroke="#0b1120" strokeWidth={1.5} />
                </g>
              )}

              {/* Royal Barat Chhatra Umbrella for Chhatra Gana */}
              {kind === "chhatra_gana" && (
                <g transform="translate(-48, -20) rotate(-8)">
                  <line x1={0} y1={24} x2={0} y2={-96} stroke="#fbbf24" strokeWidth={5} />
                  <path d="M -46,-88 Q 0,-128 46,-88 Z" fill="#dc2626" stroke="#fde047" strokeWidth={3} />
                  {[-34, -18, 0, 18, 34].map((tx, ti) => (
                    <circle key={ti} cx={tx} cy={-85} r={3.5} fill="#fde047" />
                  ))}
                  <circle cx={0} cy={-114} r={6} fill="#fde047" stroke="#0b1120" strokeWidth={1.5} />
                </g>
              )}

              {/* Brass Dhol / Nagada */}
              {kind === "dhol_gana" && (
                <g transform="translate(-32, 4) rotate(12)">
                  <ellipse cx={0} cy={0} rx={22} ry={14} fill="#92400e" stroke="#0b1120" strokeWidth={2.4} />
                  <ellipse cx={-20} cy={0} rx={5} ry={14} fill="#fef3c7" stroke="#0b1120" strokeWidth={2} />
                  <ellipse cx={20} cy={0} rx={5} ry={14} fill="#fef3c7" stroke="#0b1120" strokeWidth={2} />
                  <path d="M -14,-11 L -6,11 L 4,-11 L 14,11" fill="none" stroke="#fde047" strokeWidth={2} />
                </g>
              )}

              {/* Blazing Mashal Torch for Bhoot Maya / Pret Kankal */}
              {(kind === "bhoot_maya" || kind === "pret_kankal") && (
                <g transform="translate(-48, -22) rotate(-10)">
                  <rect x={-3} y={-40} width={6} height={50} rx={2} fill="#78350f" stroke="#0b1120" strokeWidth={1.6} />
                  <path d="M -9,-38 Q 0,-66 9,-38 Z" fill="#38bdf8" stroke="#0b1120" strokeWidth={1.5} />
                  <path d="M -5,-40 Q 0,-56 5,-40 Z" fill="#e0f2fe" />
                </g>
              )}
            </g>

            <g transform={`translate(${torsoW + 4}, -36) rotate(${armWaveR})`}>
              <path d="M 0,0 Q 26,18 46,-16" fill="none" stroke="#0b1120" strokeWidth={limbW + 6} strokeLinecap="round" />
              <path d="M 0,0 Q 26,18 46,-16" fill="none" stroke={pal.skin} strokeWidth={limbW} strokeLinecap="round" />
              <ellipse cx={20} cy={8} rx={4} ry={9} fill="none" stroke={pal.trim} strokeWidth={3} />
              <circle cx={48} cy={-20} r={limbW * 0.58} fill={pal.skin} stroke="#0b1120" strokeWidth={2.2} />

              {/* Curved Brass Narsingha / Ransingha Horn */}
              {(kind === "narsingha" || kind === "nagada_gana") && (
                <g transform="translate(46, -24) rotate(10)">
                  <path d="M 0,0 Q 28,-12 36,-46" fill="none" stroke="#0b1120" strokeWidth={11} strokeLinecap="round" />
                  <path d="M 0,0 Q 28,-12 36,-46" fill="none" stroke="#fbbf24" strokeWidth={7} strokeLinecap="round" />
                  <ellipse cx={38} cy={-50} rx={11} ry={5} transform="rotate(24, 38, -50)" fill="#fde047" stroke="#0b1120" strokeWidth={2} />
                </g>
              )}

              {/* Giant Battle Axe (Parashu) for Daitya Mahabali */}
              {kind === "daitya_mahabali" && (
                <g transform="translate(46, -24) rotate(12)">
                  <rect x={-3} y={-62} width={6} height={74} rx={2} fill="#78350f" stroke="#0b1120" strokeWidth={1.8} />
                  <path d="M 2,-60 Q 32,-68 28,-36 Q 10,-40 2,-46 Z" fill="#cbd5e1" stroke="#0b1120" strokeWidth={2.2} />
                </g>
              )}

              {/* Suitcase for Foreign London Ghost */}
              {kind === "foreign_pret_tophat" && (
                <g transform="translate(50, -14) rotate(12)">
                  <rect x={-16} y={-12} width={32} height={24} rx={4} fill="#92400e" stroke="#fbbf24" strokeWidth={2} />
                  <path d="M -6,-12 L -6,-18 L 6,-18 L 6,-12" fill="none" stroke="#fbbf24" strokeWidth={2} />
                </g>
              )}
            </g>
          </>
        )}

        {/* Nagada Drum Strapped in Front of Nagada Gana */}
        {kind === "nagada_gana" && (
          <g transform="translate(0, 6)">
            <path d="M -26,-8 L 26,-8 L 16,22 L -16,22 Z" fill="#b45309" stroke="#0b1120" strokeWidth={2.4} />
            <ellipse cx={0} cy={-8} rx={26} ry={9} fill="#fef3c7" stroke="#0b1120" strokeWidth={2.2} />
            <path d="M -20,-4 L -12,18 L 0,-4 L 12,18 L 20,-4" fill="none" stroke="#fde047" strokeWidth={2} />
          </g>
        )}

        {/* Extra Pair of Arms for Bahu-Paad */}
        {kind === "bahu_paad" && (
          <>
            <path d={`M ${-torsoW},-18 Q ${-torsoW - 38},2 ${-torsoW - 50},-16`} fill="none" stroke="#0b1120" strokeWidth={15} strokeLinecap="round" />
            <path d={`M ${-torsoW},-18 Q ${-torsoW - 38},2 ${-torsoW - 50},-16`} fill="none" stroke={pal.skin} strokeWidth={10} strokeLinecap="round" />
            <path d={`M ${torsoW},-18 Q ${torsoW + 38},2 ${torsoW + 50},-16`} fill="none" stroke="#0b1120" strokeWidth={15} strokeLinecap="round" />
            <path d={`M ${torsoW},-18 Q ${torsoW + 38},2 ${torsoW + 50},-16`} fill="none" stroke={pal.skin} strokeWidth={10} strokeLinecap="round" />
          </>
        )}

        {/* HEADS — Detailed Sculpted Anatomy (unless Mukh-Heen!) */}
        {!isHeadless && kind !== "bahu_mukh" && (
          <g transform="translate(0, -78)">
            {/* Ears */}
            <ellipse cx={-26} cy={2} rx={6} ry={10} fill={pal.skin} stroke="#0b1120" strokeWidth={2.2} />
            <ellipse cx={26} cy={2} rx={6} ry={10} fill={pal.skin} stroke="#0b1120" strokeWidth={2.2} />

            {/* Curved Horns for Shringi, Dakini, Pishacha, Asura & Daitya */}
            {(kind === "shringi" ||
              kind === "dakini" ||
              kind === "pishacha" ||
              kind === "asura_senapati" ||
              kind === "daitya_mahabali") && (
              <>
                <path d="M -14,-20 Q -32,-48 -14,-62 Q -10,-40 -8,-22 Z" fill={kind === "asura_senapati" ? "#f8fafc" : "#fef08a"} stroke="#0b1120" strokeWidth={2.2} />
                <path d="M 14,-20 Q 32,-48 14,-62 Q 10,-40 8,-22 Z" fill={kind === "asura_senapati" ? "#f8fafc" : "#fef08a"} stroke="#0b1120" strokeWidth={2.2} />
              </>
            )}

            {/* Long Donkey Ears for Gardabh Mukha */}
            {kind === "gardabh_mukha" && (
              <>
                <ellipse cx={-12} cy={-44} rx={7} ry={22} transform="rotate(-14, -12, -44)" fill={pal.skin} stroke="#0b1120" strokeWidth={2.5} />
                <ellipse cx={-12} cy={-44} rx={3.5} ry={14} transform="rotate(-14, -12, -44)" fill="#fda4af" />
                <ellipse cx={12} cy={-44} rx={7} ry={22} transform="rotate(14, 12, -44)" fill={pal.skin} stroke="#0b1120" strokeWidth={2.5} />
                <ellipse cx={12} cy={-44} rx={3.5} ry={14} transform="rotate(14, 12, -44)" fill="#fda4af" />
              </>
            )}

            {/* Pointed Jackal Ears for Shrigal Mukha */}
            {kind === "shrigal_mukha" && (
              <>
                <polygon points="-22,-14 -30,-46 -8,-24" fill={pal.skin} stroke="#0b1120" strokeWidth={2.2} />
                <polygon points="22,-14 30,-46 8,-24" fill={pal.skin} stroke="#0b1120" strokeWidth={2.2} />
              </>
            )}

            {/* Main Sculpted Head */}
            <ellipse cx={0} cy={0} rx={isGiant ? 32 : 25} ry={isGiant ? 32 : 27} fill={pal.skin} stroke="#0b1120" strokeWidth={3} />

            {/* Top Hats / Cowboy Hats / Crowns / Hair */}
            {kind === "foreign_pret_tophat" && (
              <g transform="translate(0, -24)">
                <rect x={-26} y={0} width={52} height={7} rx={3} fill="#0f172a" stroke="#fbbf24" strokeWidth={2} />
                <rect x={-17} y={-26} width={34} height={28} rx={4} fill="#1e293b" stroke="#fbbf24" strokeWidth={2} />
                <rect x={-17} y={-6} width={34} height={5} fill="#ef4444" />
              </g>
            )}
            {kind === "foreign_pret_cowboy" && (
              <g transform="translate(0, -22)">
                <ellipse cx={0} cy={2} rx={34} ry={7} fill="#92400e" stroke="#0b1120" strokeWidth={2.2} />
                <path d="M -18,0 Q -14,-24 0,-20 Q 14,-24 18,0 Z" fill="#b45309" stroke="#0b1120" strokeWidth={2.2} />
              </g>
            )}
            {(kind === "asura_senapati" || kind === "daitya_mahabali") && (
              <polygon points="-18,-22 -8,-40 0,-48 8,-40 18,-22" fill="#fbbf24" stroke="#0b1120" strokeWidth={2} />
            )}
            {kind !== "sukar_mukha" &&
              kind !== "kukar_mukha" &&
              kind !== "gardabh_mukha" &&
              kind !== "shrigal_mukha" &&
              kind !== "khag_mukha" &&
              kind !== "foreign_pret_tophat" &&
              kind !== "foreign_pret_cowboy" &&
              kind !== "pret_kankal" && (
                <path d="M -24,-8 Q -12,-34 0,-28 Q 12,-34 24,-8 Q 10,-20 0,-18 Q -10,-20 -24,-8 Z" fill="#1e293b" stroke="#0b1120" strokeWidth={1.6} />
              )}

            {/* Animal / Skull / Multi-Eye Facial Features */}
            {kind === "sukar_mukha" ? (
              <>
                <ellipse cx={0} cy={7} rx={14} ry={10} fill="#f472b6" stroke="#0b1120" strokeWidth={2.2} />
                <circle cx={-5} cy={7} r={2.3} fill="#0b1120" />
                <circle cx={5} cy={7} r={2.3} fill="#0b1120" />
                <path d="M -13,12 Q -22,2 -16,-6" fill="none" stroke="#fffbeb" strokeWidth={4} strokeLinecap="round" />
                <path d="M 13,12 Q 22,2 16,-6" fill="none" stroke="#fffbeb" strokeWidth={4} strokeLinecap="round" />
              </>
            ) : kind === "kukar_mukha" ? (
              <>
                <ellipse cx={-23} cy={-6} rx={7} ry={15} transform="rotate(18, -23, -6)" fill="#475569" stroke="#0b1120" strokeWidth={2} />
                <ellipse cx={23} cy={-6} rx={7} ry={15} transform="rotate(-18, 23, -6)" fill="#475569" stroke="#0b1120" strokeWidth={2} />
                <ellipse cx={0} cy={9} rx={12} ry={9} fill="#64748b" stroke="#0b1120" strokeWidth={2} />
                <polygon points="-4,4 4,4 0,9" fill="#0b1120" />
                <path d="M -8,15 Q 0,21 8,15" fill="none" stroke="#0b1120" strokeWidth={2.2} />
              </>
            ) : kind === "shrigal_mukha" ? (
              <>
                {/* Distinct Fox/Jackal Muzzle with Whiskers & Grinning Fangs */}
                <ellipse cx={0} cy={8} rx={14} ry={10} fill="#fef3c7" stroke="#0b1120" strokeWidth={2} />
                <polygon points="-5,2 5,2 0,8" fill="#0b1120" />
                <path d="M -9,12 Q 0,18 9,12" fill="none" stroke="#0b1120" strokeWidth={2.2} strokeLinecap="round" />
                <polygon points="-7,12 -5,16 -3,12" fill="#ffffff" />
                <polygon points="3,12 5,16 7,12" fill="#ffffff" />
                <line x1={-16} y1={7} x2={-8} y2={8} stroke="#0b1120" strokeWidth={1.5} />
                <line x1={-16} y1={11} x2={-8} y2={11} stroke="#0b1120" strokeWidth={1.5} />
                <line x1={16} y1={7} x2={8} y2={8} stroke="#0b1120" strokeWidth={1.5} />
                <line x1={16} y1={11} x2={8} y2={11} stroke="#0b1120" strokeWidth={1.5} />
                <circle cx={-10} cy={-7} r={4.4} fill="#ffffff" stroke="#0b1120" strokeWidth={1.8} />
                <circle cx={-10} cy={-7} r={2.1} fill="#0b1120" />
                <circle cx={10} cy={-7} r={4.4} fill="#ffffff" stroke="#0b1120" strokeWidth={1.8} />
                <circle cx={10} cy={-7} r={2.1} fill="#0b1120" />
              </>
            ) : kind === "khag_mukha" ? (
              <>
                {/* Hooked Golden Eagle/Vulture Beak */}
                <polygon points="-9,0 9,0 0,22" fill="#f59e0b" stroke="#0b1120" strokeWidth={2.2} />
                <circle cx={-10} cy={-8} r={4.6} fill="#fef08a" stroke="#0b1120" strokeWidth={1.8} />
                <circle cx={-10} cy={-8} r={2} fill="#0b1120" />
                <circle cx={10} cy={-8} r={4.6} fill="#fef08a" stroke="#0b1120" strokeWidth={1.8} />
                <circle cx={10} cy={-8} r={2} fill="#0b1120" />
              </>
            ) : kind === "pret_kankal" ? (
              <>
                {/* Skull Eye Sockets & Grin */}
                <circle cx={-10} cy={-4} r={6} fill="#0b1120" />
                <circle cx={-10} cy={-4} r={2.4} fill="#38bdf8" />
                <circle cx={10} cy={-4} r={6} fill="#0b1120" />
                <circle cx={10} cy={-4} r={2.4} fill="#38bdf8" />
                <polygon points="-3,4 3,4 0,9" fill="#0b1120" />
                <rect x={-11} y={12} width={22} height={7} rx={2} fill="#ffffff" stroke="#0b1120" strokeWidth={1.8} />
                <line x1={-5} y1={12} x2={-5} y2={19} stroke="#0b1120" strokeWidth={1.5} />
                <line x1={0} y1={12} x2={0} y2={19} stroke="#0b1120" strokeWidth={1.5} />
                <line x1={5} y1={12} x2={5} y2={19} stroke="#0b1120" strokeWidth={1.5} />
              </>
            ) : kind === "bahu_nayan" ? (
              <g>
                {[
                  [-14, -12], [0, -16], [14, -12],
                  [-10, -2], [10, -2],
                  [-15, 7], [15, 7],
                ].map(([ex, ey], idx) => (
                  <g key={idx}>
                    <circle cx={ex} cy={ey} r={4.6} fill="#fef08a" stroke="#0b1120" strokeWidth={1.6} />
                    <circle cx={ex} cy={ey} r={2.1} fill="#dc2626" />
                  </g>
                ))}
                <path d="M -9,16 Q 0,22 9,16" fill="none" stroke="#0b1120" strokeWidth={2.4} />
              </g>
            ) : (
              <>
                <path d="M -16,-11 L -6,-8 M 6,-8 L 16,-11" stroke="#0b1120" strokeWidth={2.4} strokeLinecap="round" />
                <ellipse cx={-10} cy={-3} rx={5.2} ry={4.5} fill="#ffffff" stroke="#0b1120" strokeWidth={1.8} />
                <circle cx={-10} cy={-3} r={2.4} fill={kind === "asura_senapati" ? "#dc2626" : "#0b1120"} />
                <ellipse cx={10} cy={-3} rx={5.2} ry={4.5} fill="#ffffff" stroke="#0b1120" strokeWidth={1.8} />
                <circle cx={10} cy={-3} r={2.4} fill={kind === "asura_senapati" ? "#dc2626" : "#0b1120"} />
                {kind === "foreign_pret_tophat" && (
                  <circle cx={10} cy={-3} r={7.5} fill="none" stroke="#fbbf24" strokeWidth={1.6} />
                )}
                {(kind === "asura_senapati" || kind === "daitya_mahabali") && (
                  <path d="M -16,7 Q -8,2 0,6 Q 8,2 16,7" fill="none" stroke="#0b1120" strokeWidth={3} strokeLinecap="round" />
                )}
                <path d="M -10,11 Q 0,20 10,11" fill="#7f1d1d" stroke="#0b1120" strokeWidth={2.2} />
                <polygon points="-7,12 -4,16 -1,12" fill="#ffffff" />
                <polygon points="1,12 4,16 7,12" fill="#ffffff" />
              </>
            )}

            {(kind === "sukar_mukha" || kind === "kukar_mukha" || kind === "gardabh_mukha") && (
              <>
                <circle cx={-10} cy={-9} r={4.4} fill="#ffffff" stroke="#0b1120" strokeWidth={1.8} />
                <circle cx={-10} cy={-9} r={2.1} fill="#0b1120" />
                <circle cx={10} cy={-9} r={4.4} fill="#ffffff" stroke="#0b1120" strokeWidth={1.8} />
                <circle cx={10} cy={-9} r={2.1} fill="#0b1120" />
              </>
            )}
          </g>
        )}

        {/* Bahu-Mukh: 3 Distinct Sculpted Heads with Crowns & Expressions */}
        {kind === "bahu_mukh" && (
          <g transform="translate(0, -76)">
            {[-28, 0, 28].map((hx, idx) => (
              <g key={idx} transform={`translate(${hx}, ${idx === 1 ? -10 : 4})`}>
                <circle cx={0} cy={0} r={19} fill={pal.skin} stroke="#0b1120" strokeWidth={2.6} />
                <path d="M -16,-8 Q 0,-26 16,-8 Z" fill="#b45309" stroke="#0b1120" strokeWidth={1.6} />
                <circle cx={-6} cy={-2} r={3.2} fill="#ffffff" stroke="#0b1120" strokeWidth={1.2} />
                <circle cx={-6} cy={-2} r={1.6} fill="#0b1120" />
                <circle cx={6} cy={-2} r={3.2} fill="#ffffff" stroke="#0b1120" strokeWidth={1.2} />
                <circle cx={6} cy={-2} r={1.6} fill="#0b1120" />
                <path d="M -6,7 Q 0,13 6,7" fill="none" stroke="#0b1120" strokeWidth={2.2} />
              </g>
            ))}
          </g>
        )}
      </svg>
    </div>
  );
};

/**
 * Dense Multi-Row Animated Barat Crowd ("बारात की भीड़"):
 * Two layered depth rows (rear 22 + front 15 = 37 distinct animated figures),
 * mixing horned Asurs, floating ghosts, Daityas, Barat flags/patakas, chhatra umbrellas,
 * Nagada drums, Ransingha horns, Mashals, and Himalaya Nagari spectators!
 */
export const BackgroundCrowdBand: React.FC<{
  mode: "devaloka" | "shamshan" | "bhoot_army" | "himalaya_citizens";
  y?: number;
}> = ({ mode, y = 690 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const backCount = mode === "bhoot_army" ? 22 : 18;
  const frontCount = mode === "bhoot_army" ? 15 : 13;

  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: y - 48, height: 260, pointerEvents: "none" }}>
      <svg viewBox="0 0 1920 260" width="100%" height="100%" overflow="visible">
        {/* REAR ROW — Smaller Distant Procession Crowd + Tall Barat Flags & Torches */}
        {Array.from({ length: backCount }).map((_, i) => {
          const cx = 60 + (i / (backCount - 1)) * 1800;
          const cy = 44 + (i % 3) * 10 + Math.sin(t * 4.2 + i * 0.9) * 5;
          const isGhost = (mode === "bhoot_army" || mode === "shamshan") && i % 4 === 1;
          const tunic =
            mode === "himalaya_citizens"
              ? ["#be123c", "#d97706", "#059669", "#7c3aed", "#0284c7"][i % 5]
              : mode === "devaloka"
              ? ["#b45309", "#9d174d", "#0f766e"][i % 3]
              : ["#312e81", "#7f1d1d", "#4c1d95", "#334155"][i % 4];

          const skin =
            mode === "himalaya_citizens" || mode === "devaloka"
              ? "#eab38f"
              : ["#94a3b8", "#c4b5fd", "#fca5a5", "#86efac"][i % 4];

          return (
            <g key={`back-${i}`} transform={`translate(${cx}, ${cy}) scale(0.68)`} opacity={0.82}>
              {isGhost ? (
                <path d="M -18,-6 Q -24,40 0,68 Q 24,40 18,-6 Z" fill="#6d28d9" stroke="#0b1120" strokeWidth={2} />
              ) : (
                <>
                  <path d="M -18,24 L 18,24 L 22,68 L -22,68 Z" fill={tunic} stroke="#0b1120" strokeWidth={2} />
                  <rect x={-16} y={-6} width={32} height={32} rx={6} fill={tunic} stroke="#0b1120" strokeWidth={2} />
                </>
              )}
              <circle cx={0} cy={-22} r={13} fill={skin} stroke="#0b1120" strokeWidth={2} />
              <circle cx={-4.5} cy={-23} r={2} fill="#0b1120" />
              <circle cx={4.5} cy={-23} r={2} fill="#0b1120" />
              {mode === "himalaya_citizens" || mode === "devaloka" ? (
                <path d="M -13,-28 Q 0,-44 13,-28 Z" fill={i % 2 === 0 ? "#fbbf24" : "#f97316"} stroke="#0b1120" strokeWidth={1.6} />
              ) : (
                <>
                  <path d="M -8,-32 L -14,-44 L -3,-35" fill="#fef08a" stroke="#0b1120" strokeWidth={1.2} />
                  <path d="M 8,-32 L 14,-44 L 3,-35" fill="#fef08a" stroke="#0b1120" strokeWidth={1.2} />
                </>
              )}

              {/* Tall Crimson / Saffron Barat Flags (पताका) */}
              {i % 4 === 0 && (
                <g transform="translate(26, -34)">
                  <line x1={0} y1={40} x2={0} y2={-48} stroke="#fbbf24" strokeWidth={3.5} />
                  <polygon
                    points={`0,-48 ${38 + Math.sin(t * 6 + i) * 6},-36 0,-24`}
                    fill={mode === "himalaya_citizens" ? "#f97316" : "#dc2626"}
                    stroke="#fde047"
                    strokeWidth={1.5}
                  />
                </g>
              )}
            </g>
          );
        })}

        {/* FRONT CROWD ROW — Richly Dressed Barat Participants, Asurs, Ghosts & Nagari Spectators */}
        {Array.from({ length: frontCount }).map((_, i) => {
          const cx = 95 + (i / (frontCount - 1)) * 1730;
          const cy = 96 + (i % 2) * 18 + Math.sin(t * 4.8 + i * 1.1) * 7;
          const armL = Math.sin(t * 5.8 + i) * 14;
          const isGhost = (mode === "bhoot_army" || mode === "shamshan") && i % 5 === 2;
          const isAsur = (mode === "bhoot_army" || mode === "shamshan") && i % 5 === 4;

          const tunic =
            mode === "himalaya_citizens"
              ? ["#be123c", "#d97706", "#059669", "#7c3aed"][i % 4]
              : mode === "devaloka"
              ? ["#b45309", "#9d174d", "#0f766e"][i % 3]
              : isAsur
              ? "#7f1d1d"
              : ["#334155", "#4c1d95", "#1e1b4b"][i % 3];

          const skin =
            mode === "himalaya_citizens" || mode === "devaloka"
              ? "#f5b895"
              : isAsur
              ? "#f87171"
              : ["#94a3b8", "#a5b4fc", "#86efac", "#fda4af"][i % 4];

          return (
            <g key={`front-${i}`} transform={`translate(${cx}, ${cy}) scale(0.9)`}>
              {isGhost ? (
                <path d="M -22,0 Q -28,44 0,74 Q 28,44 22,0 Z" fill="#4c1d95" stroke="#0b1120" strokeWidth={2.4} opacity={0.92} />
              ) : (
                <>
                  <path d="M -20,26 L 20,26 L 26,74 L -26,74 Z" fill={tunic} stroke="#0b1120" strokeWidth={2.2} />
                  <rect x={-18} y={-6} width={36} height={34} rx={7} fill={tunic} stroke="#0b1120" strokeWidth={2.2} />
                  <path d="M -16,26 L 16,26" stroke="#fde047" strokeWidth={3} />
                </>
              )}

              {/* Animated Cheering Arms */}
              <path d={`M -16,0 Q -32,${-8 + armL} -34,-24`} fill="none" stroke="#0b1120" strokeWidth={11} strokeLinecap="round" />
              <path d={`M -16,0 Q -32,${-8 + armL} -34,-24`} fill="none" stroke={skin} strokeWidth={7} strokeLinecap="round" />
              <path d={`M 16,0 Q 32,${-8 - armL} 34,-24`} fill="none" stroke="#0b1120" strokeWidth={11} strokeLinecap="round" />
              <path d={`M 16,0 Q 32,${-8 - armL} 34,-24`} fill="none" stroke={skin} strokeWidth={7} strokeLinecap="round" />

              {/* Head, Eyes & Pagdi / Crown / Horns */}
              <circle cx={0} cy={-22} r={14} fill={skin} stroke="#0b1120" strokeWidth={2.2} />
              <circle cx={-5} cy={-23} r={2.2} fill={isGhost ? "#38bdf8" : "#0b1120"} />
              <circle cx={5} cy={-23} r={2.2} fill={isGhost ? "#38bdf8" : "#0b1120"} />
              <path d="M -4,-16 Q 0,-12 4,-16" fill="none" stroke="#0b1120" strokeWidth={1.6} />

              {mode === "himalaya_citizens" || mode === "devaloka" ? (
                <path d="M -14,-28 Q 0,-46 14,-28 Z" fill={i % 2 === 0 ? "#fbbf24" : "#f97316"} stroke="#0b1120" strokeWidth={1.8} />
              ) : (
                <>
                  <path d="M -8,-33 L -15,-48 L -3,-36" fill="#fef08a" stroke="#0b1120" strokeWidth={1.4} />
                  <path d="M 8,-33 L 15,-48 L 3,-36" fill="#fef08a" stroke="#0b1120" strokeWidth={1.4} />
                </>
              )}

              {/* Barat Torches (मशाल), Chhatras, Horns & Kalash */}
              {(mode === "shamshan" || mode === "bhoot_army") && i % 3 === 0 && (
                <g transform="translate(34, -26)">
                  <line x1={0} y1={0} x2={0} y2={-20} stroke="#78350f" strokeWidth={4} />
                  <path d="M -7,-18 Q 0,-38 7,-18 Z" fill="#f97316" />
                  <circle cx={0} cy={-22} r={4} fill="#fef08a" />
                </g>
              )}
              {(mode === "shamshan" || mode === "bhoot_army") && i % 3 === 1 && (
                <g transform="translate(-34, -24)">
                  <path d="M 0,0 Q -14,-14 -18,-34" fill="none" stroke="#fbbf24" strokeWidth={4.5} strokeLinecap="round" />
                  <circle cx={-18} cy={-36} r={4.5} fill="#fde047" stroke="#0b1120" strokeWidth={1.2} />
                </g>
              )}
              {mode === "himalaya_citizens" && i % 2 === 0 && (
                <g transform="translate(32, -18)">
                  <ellipse cx={0} cy={0} rx={8} ry={9} fill="#f59e0b" stroke="#0b1120" strokeWidth={1.6} />
                  <circle cx={0} cy={-10} r={5} fill="#d97706" />
                  <path d="M -4,-12 L 0,-18 L 4,-12" fill="#16a34a" />
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
