import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

/**
 * Richly Detailed Sacred Nandi Bull Rig & Weeping/Dancing Bhoot-Pret Rigs (Part 04–06+)
 * Pure solid cel-shaded fills with #0b1120 contours (zero url(#...) dependency).
 */
export const NandiBullRig: React.FC<{
  x: number;
  y: number;
  scale?: number;
  walking?: boolean;
}> = ({ x, y, scale = 1, walking = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const stride = walking ? Math.sin(t * 5.4) * 14 : 0;
  const bob = walking ? Math.abs(Math.sin(t * 5.4)) * -5 : 0;
  const tailSway = Math.sin(t * 3.8) * 7;
  const headNod = Math.sin(t * 2.6) * 2.5;
  const bellSwing = Math.sin(t * 6.5) * 6;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + bob,
        transform: `translate(-50%, -50%) scale(${scale})`,
        pointerEvents: "none",
      }}
    >
      <svg width={380} height={260} viewBox="-190 -130 380 260" overflow="visible">
        {/* Ground Contact Shadow */}
        <ellipse cx={12} cy={108} rx={118} ry={13} fill="#0b1120" opacity={0.44} />

        {/* Articulated Swinging Tail with Multi-Strand Black Tassel */}
        <g transform={`translate(-90, 4) rotate(${tailSway})`}>
          <path d="M 0,0 Q -36,16 -28,66" fill="none" stroke="#0b1120" strokeWidth={12} strokeLinecap="round" />
          <path d="M 0,0 Q -36,16 -28,66" fill="none" stroke="#f1f5f9" strokeWidth={7} strokeLinecap="round" />
          <path d="M -28,62 L -38,88 L -28,84 L -18,88 Z" fill="#1e293b" stroke="#0b1120" strokeWidth={2} />
          <line x1={-28} y1={66} x2={-30} y2={84} stroke="#475569" strokeWidth={1.6} />
        </g>

        {/* Sculpted Bent-Joint Bull Legs (Far Left, Near Left, Far Right, Near Right) */}
        {[
          { hipX: -70, kneeX: -78 - stride * 0.45, footX: -72 - stride, col: "#cbd5e1", isBack: true },
          { hipX: 48, kneeX: 50 - stride * 0.45, footX: 46 - stride, col: "#cbd5e1", isBack: true },
          { hipX: -46, kneeX: -40 + stride * 0.45, footX: -38 + stride, col: "#ffffff", isBack: false },
          { hipX: 74, kneeX: 80 + stride * 0.45, footX: 78 + stride, col: "#ffffff", isBack: false },
        ].map((leg, i) => (
          <g key={i}>
            {/* Upper Muscular Haunch / Shoulder + Knee + Lower Shin */}
            <path
              d={`M ${leg.hipX},18 Q ${leg.kneeX},58 ${leg.footX},94`}
              fill="none"
              stroke="#0b1120"
              strokeWidth={leg.isBack ? 24 : 26}
              strokeLinecap="round"
            />
            <path
              d={`M ${leg.hipX},18 Q ${leg.kneeX},58 ${leg.footX},94`}
              fill="none"
              stroke={leg.col}
              strokeWidth={leg.isBack ? 18 : 20}
              strokeLinecap="round"
            />
            {/* Knee Highlight & Golden Ghungroo Ankle Rings */}
            <circle cx={leg.kneeX} cy={56} r={5} fill="#cbd5e1" opacity={leg.isBack ? 0.4 : 0.7} />
            <ellipse cx={leg.footX} cy={87} rx={10} ry={4} fill="none" stroke="#fbbf24" strokeWidth={3.5} />
            <circle cx={leg.footX - 6} cy={89} r={2.2} fill="#fde047" />
            <circle cx={leg.footX + 6} cy={89} r={2.2} fill="#fde047" />
            {/* Cloven Dark Hoof */}
            <path
              d={`M ${leg.footX - 10},93 L ${leg.footX + 10},93 L ${leg.footX + 12},105 L ${leg.footX + 2},105 L ${leg.footX},100 L ${leg.footX - 2},105 L ${leg.footX - 10},105 Z`}
              fill="#334155"
              stroke="#0b1120"
              strokeWidth={2.2}
            />
          </g>
        ))}

        {/* Muscular Bull Body, Broad Chest Brisket & Sacred Hump (Kakud) */}
        <path
          d="M -94,8 C -98,-26 -62,-42 -20,-36 C 14,-32 34,-54 56,-44 C 82,-32 96,-12 96,12 C 96,42 54,54 0,54 C -54,54 -90,40 -94,8 Z"
          fill="#ffffff"
          stroke="#0b1120"
          strokeWidth={3.2}
        />
        {/* Sculpted Muscular Haunch, Rib & Belly Cel-Shading */}
        <path
          d="M -86,20 Q 0,58 88,18 Q 52,52 -52,52 Z"
          fill="#cbd5e1"
          opacity={0.72}
        />
        <path d="M -72,-8 Q -58,8 -62,28" fill="none" stroke="#94a3b8" strokeWidth={3.5} strokeLinecap="round" opacity={0.65} />
        <path d="M 68,-14 Q 82,4 74,26" fill="none" stroke="#94a3b8" strokeWidth={3.5} strokeLinecap="round" opacity={0.65} />

        {/* Ornate Embroidered Banarasi Crimson & Emerald Jhool Saddlecloth */}
        <path
          d="M -62,-32 Q 0,-42 52,-24 L 58,30 Q 0,44 -64,28 Z"
          fill="#be123c"
          stroke="#0b1120"
          strokeWidth={3}
        />
        {/* Inner Emerald Zari Panel */}
        <path
          d="M -46,-24 Q 0,-32 38,-18 L 42,18 Q 0,28 -48,16 Z"
          fill="#065f46"
          stroke="#fde047"
          strokeWidth={2}
        />
        {/* Golden Zari Diamond Pattern & Lotus Medallions */}
        <path d="M -56,22 Q 0,34 52,24" fill="none" stroke="#fde047" strokeWidth={4} strokeDasharray="6 5" />
        <path d="M -32,-20 L -16,18 L 0,-22 L 16,18 L 32,-16" fill="none" stroke="#fbbf24" strokeWidth={1.8} opacity={0.75} />
        {[-22, 0, 22].map((mx, idx) => (
          <g key={idx} transform={`translate(${mx}, ${idx === 1 ? 0 : -2})`}>
            <circle cx={0} cy={0} r={6.5} fill="#fbbf24" stroke="#0b1120" strokeWidth={1.5} />
            <circle cx={0} cy={0} r={2.8} fill="#ef4444" />
          </g>
        ))}
        {/* Hanging Gold Tassels Along Bottom Hem of Jhool */}
        {[-52, -32, -12, 8, 28, 46].map((tx, idx) => (
          <g key={idx} transform={`translate(${tx}, ${28 + (idx === 2 || idx === 3 ? 4 : 0)})`}>
            <line x1={0} y1={0} x2={0} y2={8} stroke="#fbbf24" strokeWidth={2.2} />
            <circle cx={0} cy={9} r={2.8} fill="#fde047" stroke="#0b1120" strokeWidth={1} />
          </g>
        ))}

        {/* Powerful Muscular Neck, Folded Dewlap & Flower + Brass Bell Garland */}
        <path
          d="M 62,-26 Q 98,-54 116,-32 L 110,18 Q 84,32 62,14 Z"
          fill="#f8fafc"
          stroke="#0b1120"
          strokeWidth={3}
        />
        {/* Rippling Dewlap Skin Folds */}
        <path
          d="M 92,14 Q 104,40 84,44 Q 70,34 74,16"
          fill="#e2e8f0"
          stroke="#0b1120"
          strokeWidth={2.4}
        />
        <path d="M 88,22 Q 92,34 82,36" fill="none" stroke="#94a3b8" strokeWidth={2} strokeLinecap="round" />

        {/* Marigold & Crimson Flower Garland + Multi-Bell Brass Collar */}
        <path d="M 60,-14 Q 84,12 106,-10" fill="none" stroke="#f97316" strokeWidth={8} strokeDasharray="5 4" strokeLinecap="round" />
        <path d="M 64,-8 Q 84,14 102,-6" fill="none" stroke="#fbbf24" strokeWidth={4.5} />
        {[
          { bx: 72, by: 6 },
          { bx: 85, by: 12 },
          { bx: 97, by: 5 },
        ].map((b, idx) => (
          <g key={idx} transform={`translate(${b.bx}, ${b.by}) rotate(${bellSwing * (idx % 2 === 0 ? 1 : -1)})`}>
            <path d="M -5,0 L 5,0 L 7,10 L -7,10 Z" fill="#fde047" stroke="#0b1120" strokeWidth={1.6} />
            <circle cx={0} cy={12} r={2.2} fill="#ef4444" />
          </g>
        ))}

        {/* Sculpted Expressive Nandi Head, Golden Mukut, Nose Bridle & Gold-Capped Horns */}
        <g transform={`translate(118, -26) rotate(${headNod})`}>
          {/* Soft White Bull Ear with Pink Inner Fold & Golden Ring */}
          <ellipse cx={-12} cy={-4} rx={12} ry={6} transform="rotate(-24, -12, -4)" fill="#f8fafc" stroke="#0b1120" strokeWidth={2.2} />
          <ellipse cx={-12} cy={-4} rx={7} ry={3} transform="rotate(-24, -12, -4)" fill="#fda4af" />
          <circle cx={-16} cy={3} r={4} fill="none" stroke="#fbbf24" strokeWidth={2.2} />

          {/* Sweeping Ivory Horns with Carved Golden Tips */}
          <path d="M -12,-14 Q -22,-48 -2,-54" fill="none" stroke="#0b1120" strokeWidth={12} strokeLinecap="round" />
          <path d="M -12,-14 Q -22,-48 -2,-54" fill="none" stroke="#fffbeb" strokeWidth={7.5} strokeLinecap="round" />
          <path d="M -10,-46 Q -6,-54 -2,-54" fill="none" stroke="#fbbf24" strokeWidth={7.5} strokeLinecap="round" />

          <path d="M 8,-14 Q 18,-48 34,-44" fill="none" stroke="#0b1120" strokeWidth={12} strokeLinecap="round" />
          <path d="M 8,-14 Q 18,-48 34,-44" fill="none" stroke="#fffbeb" strokeWidth={7.5} strokeLinecap="round" />
          <path d="M 24,-44 Q 30,-45 34,-44" fill="none" stroke="#fbbf24" strokeWidth={7.5} strokeLinecap="round" />

          {/* Main Sculpted Bull Head & Muzzle */}
          <ellipse cx={0} cy={0} rx={27} ry={21} fill="#ffffff" stroke="#0b1120" strokeWidth={3} />
          <path d="M -16,12 Q 0,22 22,12 Q 8,24 -16,12 Z" fill="#cbd5e1" opacity={0.65} />
          <ellipse cx={20} cy={8} rx={13} ry={10.5} fill="#fda4af" stroke="#0b1120" strokeWidth={2.2} />
          <circle cx={24} cy={6} r={2.2} fill="#7f1d1d" />
          <circle cx={16} cy={9} r={2} fill="#7f1d1d" />

          {/* Bejeweled Golden Nose Ring & Bridle Strap */}
          <path d="M -8,-16 L 16,2" fill="none" stroke="#fbbf24" strokeWidth={3} />
          <circle cx={26} cy={14} r={6.5} fill="none" stroke="#fbbf24" strokeWidth={3} />
          <circle cx={26} cy={20} r={2.5} fill="#ef4444" />

          {/* Sacred Forehead Mukut Crest & Kumkum Tilak */}
          <polygon points="-8,-18 0,-29 8,-18" fill="#fbbf24" stroke="#0b1120" strokeWidth={1.8} />
          <circle cx={0} cy={-21} r={2.4} fill="#ef4444" />
          <path d="M -2,-11 L 8,-11 M -1,-7 L 7,-7" stroke="#64748b" strokeWidth={2} strokeLinecap="round" />
          <circle cx={3} cy={-13} r={2.2} fill="#ef4444" />

          {/* Expressive Devoted Bull Eye with Highlight */}
          <ellipse cx={6} cy={-3} rx={5.5} ry={4.5} fill="#ffffff" stroke="#0b1120" strokeWidth={1.6} />
          <circle cx={7} cy={-3} r={2.6} fill="#0f172a" />
          <circle cx={8} cy={-4} r={1} fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
};

export const PretCreatureRig: React.FC<{
  x: number;
  y: number;
  scale?: number;
  variant: "classic" | "dakini" | "london" | "weeping" | "ram_dancer" | "foreign_london" | "pishachini";
  phase?: number;
}> = ({ x, y, scale = 1, variant, phase = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const isLondon = variant === "london" || variant === "foreign_london";
  const isDakini = variant === "dakini" || variant === "pishachini";

  const hop = variant === "weeping" ? Math.sin(t * 2.8 + phase) * 3 : Math.abs(Math.sin(t * 5.8 + phase)) * -18;
  const armWave = variant === "weeping" ? -18 + Math.sin(t * 4 + phase) * 8 : Math.sin(t * 7 + phase) * 24;

  const skin = isLondon ? "#93c5fd" : isDakini ? "#f0abfc" : variant === "weeping" ? "#86efac" : "#cbd5e1";
  const cloth = isLondon ? "#1e3a8a" : isDakini ? "#701a75" : variant === "weeping" ? "#166534" : "#9a3412";

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + hop,
        transform: `translate(-50%, -50%) scale(${scale})`,
        pointerEvents: "none",
      }}
    >
      <svg width={220} height={260} viewBox="-110 -130 220 260" overflow="visible">
        <ellipse cx={0} cy={92} rx={36} ry={7} fill="#0b1120" opacity={0.38} />
        {/* Legs */}
        <line x1={-14} y1={42} x2={-16} y2={84} stroke="#0b1120" strokeWidth={16} strokeLinecap="round" />
        <line x1={-14} y1={42} x2={-16} y2={84} stroke={skin} strokeWidth={11} strokeLinecap="round" />
        <line x1={14} y1={42} x2={16} y2={84} stroke="#0b1120" strokeWidth={16} strokeLinecap="round" />
        <line x1={14} y1={42} x2={16} y2={84} stroke={skin} strokeWidth={11} strokeLinecap="round" />
        {/* Dhoti / Skirt */}
        <path d="M -26,14 L 26,14 L 34,58 Q 0,68 -34,58 Z" fill={cloth} stroke="#0b1120" strokeWidth={2.6} />
        {/* Torso */}
        <rect x={-22} y={-34} width={44} height={50} rx={12} fill={skin} stroke="#0b1120" strokeWidth={2.8} />
        {/* Arms */}
        <path d={`M -22,-22 Q -46,${armWave} -52,${armWave - 14}`} fill="none" stroke="#0b1120" strokeWidth={15} strokeLinecap="round" />
        <path d={`M -22,-22 Q -46,${armWave} -52,${armWave - 14}`} fill="none" stroke={skin} strokeWidth={10} strokeLinecap="round" />
        <path d={`M 22,-22 Q 46,${-armWave} 52,${-armWave - 14}`} fill="none" stroke="#0b1120" strokeWidth={15} strokeLinecap="round" />
        <path d={`M 22,-22 Q 46,${-armWave} 52,${-armWave - 14}`} fill="none" stroke={skin} strokeWidth={10} strokeLinecap="round" />

        {/* Head */}
        <g transform="translate(0, -60)">
          {isLondon ? (
            <g transform="translate(0, -24)">
              <rect x={-24} y={0} width={48} height={6} rx={3} fill="#1e293b" stroke="#0b1120" strokeWidth={2} />
              <rect x={-16} y={-22} width={32} height={24} rx={4} fill="#1e1b4b" stroke="#fbbf24" strokeWidth={2} />
            </g>
          ) : (
            <>
              <path d="M -12,-20 Q -22,-42 -12,-48" fill="none" stroke="#fbbf24" strokeWidth={5} strokeLinecap="round" />
              <path d="M 12,-20 Q 22,-42 12,-48" fill="none" stroke="#fbbf24" strokeWidth={5} strokeLinecap="round" />
            </>
          )}
          <circle cx={0} cy={0} r={24} fill={skin} stroke="#0b1120" strokeWidth={2.8} />
          <circle cx={-9} cy={-4} r={4.5} fill="#ffffff" stroke="#0b1120" strokeWidth={1.6} />
          <circle cx={-9} cy={-4} r={2.1} fill="#0f172a" />
          <circle cx={9} cy={-4} r={4.5} fill="#ffffff" stroke="#0b1120" strokeWidth={1.6} />
          <circle cx={9} cy={-4} r={2.1} fill="#0f172a" />
          {variant === "weeping" ? (
            <>
              <ellipse cx={-9} cy={7 + (frame % 16) * 0.6} rx={2.5} ry={4} fill="#38bdf8" />
              <ellipse cx={9} cy={7 + ((frame + 8) % 16) * 0.6} rx={2.5} ry={4} fill="#38bdf8" />
              <path d="M -8,14 Q 0,8 8,14" fill="none" stroke="#0f172a" strokeWidth={2.4} strokeLinecap="round" />
            </>
          ) : (
            <path d="M -9,8 Q 0,16 9,8" fill="#7f1d1d" stroke="#0f172a" strokeWidth={2.2} strokeLinecap="round" />
          )}
        </g>

        {isLondon && (
          <g transform="translate(56, 8) rotate(-8)">
            <rect x={-16} y={-12} width={32} height={24} rx={4} fill="#92400e" stroke="#fbbf24" strokeWidth={2} />
            <path d="M -6,-12 L -6,-18 L 6,-18 L 6,-12" fill="none" stroke="#fbbf24" strokeWidth={2} />
          </g>
        )}
      </svg>
    </div>
  );
};

export const VajraLightning: React.FC<{ x: number; y: number; intensity: number }> = ({ x, y, intensity }) => {
  if (intensity < 0.05) return null;
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: "translate(-50%, -50%)", opacity: intensity, pointerEvents: "none" }}>
      <svg width={320} height={240} viewBox="-160 -120 320 240" overflow="visible">
        <polyline
          points="110,-60 40,-15 65,10 -20,40 15,60 -120,95"
          fill="none"
          stroke="#fef08a"
          strokeWidth={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points="110,-60 40,-15 65,10 -20,40 15,60 -120,95"
          fill="none"
          stroke="#ffffff"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
