import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { clothWave, fireTurbulence } from "../motion/physics";

interface ParallaxStageProps {
  mode: "devaloka" | "vishnu" | "shamshan" | "himalaya";
  cameraX?: number;
  cameraY?: number;
  zoom?: number;
  children?: React.ReactNode;
}

function seeded(i: number, salt: number): number {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453123;
  return x - Math.floor(x);
}

/**
 * Pure solid-color + layered cel-shaded ParallaxStage (ZERO url(#...) gradient dependencies
 * so SVG fills NEVER break or turn transparent/black in Brave, Chrome, or Studio).
 */
export const ParallaxStage: React.FC<ParallaxStageProps> = ({
  mode,
  cameraX = 0,
  cameraY = 0,
  zoom = 1,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const f1 = fireTurbulence(t, 1);
  const f2 = fireTurbulence(t, 2);
  const garlandSway = clothWave(t, 0.5, 9);

  const isShamshan = mode === "shamshan";
  const isVishnu = mode === "vishnu";
  const isHimalaya = mode === "himalaya";

  const bgGradient = isShamshan
    ? "radial-gradient(ellipse at 50% 24%, #36498f 0%, #1d2754 48%, #0e1329 100%)"
    : isHimalaya
    ? "radial-gradient(ellipse at 50% 20%, #fde68a 0%, #f97316 32%, #831843 68%, #1e1b4b 100%)"
    : isVishnu
    ? "radial-gradient(ellipse at 50% 30%, #fff0b8 0%, #f5b96b 34%, #6a3472 72%, #24133d 100%)"
    : "radial-gradient(ellipse at 50% 22%, #ffe99e 0%, #f79d4b 36%, #9b3556 72%, #2a113b 100%)";

  return (
    <AbsoluteFill
      style={{
        background: bgGradient,
        overflow: "hidden",
      }}
    >
      {/* LAYER 0: Deep Celestial Sky, Stars, Concentric Glow Sun/Moon (0.15x parallax) */}
      <div
        style={{
          position: "absolute",
          inset: -120,
          transform: `translate3d(${cameraX * 0.15}px, ${cameraY * 0.15}px, 0) scale(${1 + (zoom - 1) * 0.25})`,
        }}
      >
        <svg viewBox="0 0 1920 1080" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
          {/* Twinkling Starfield */}
          {Array.from({ length: isShamshan ? 80 : 40 }).map((_, i) => {
            const sx = seeded(i, 1) * 1920;
            const sy = seeded(i, 2) * (isShamshan ? 640 : 420);
            const r = 1.2 + seeded(i, 3) * 2.2;
            const tw = 0.35 + 0.65 * Math.abs(Math.sin(frame * 0.04 + i * 1.3));
            return (
              <circle
                key={i}
                cx={sx}
                cy={sy}
                r={r}
                fill={isShamshan ? "#e0f2fe" : "#fef3c7"}
                opacity={tw * (isShamshan ? 0.92 : 0.55)}
              />
            );
          })}

          {!isShamshan ? (
            <g transform="translate(960, 270)">
              {/* Concentric Solid-Alpha Golden Halo (no radialGradient needed) */}
              <circle cx={0} cy={0} r={420} fill="#ff9f1c" opacity={0.14} />
              <circle cx={0} cy={0} r={300} fill="#ffd166" opacity={0.22} />
              <circle cx={0} cy={0} r={190} fill="#fff8d6" opacity={0.34} />
              <g transform={`rotate(${frame * 0.12})`} opacity={0.35}>
                {Array.from({ length: 24 }).map((_, i) => (
                  <polygon
                    key={i}
                    points="-12,-155 12,-155 0,-360"
                    fill="#ffe599"
                    transform={`rotate(${i * 15})`}
                  />
                ))}
              </g>
              <circle cx={0} cy={0} r={120} fill="#fff3c4" opacity={0.42} />
            </g>
          ) : (
            <g transform="translate(1520, 220)">
              <circle cx={0} cy={0} r={220} fill="#38bdf8" opacity={0.1} />
              <circle cx={0} cy={0} r={140} fill="#93c5fd" opacity={0.18} />
              <path
                d="M -45,-55 A 68,68 0 1,0 50,45 A 52,52 0 1,1 -45,-55 Z"
                fill="#e8f3ff"
              />
            </g>
          )}
        </svg>
      </div>

      {/* LAYER 1: Distant Mountain Ridges & Golden Palaces (0.4x parallax, SOLID HEX COLORS) */}
      <div
        style={{
          position: "absolute",
          inset: -80,
          transform: `translate3d(${cameraX * 0.4}px, ${cameraY * 0.35}px, 0) scale(${1 + (zoom - 1) * 0.5})`,
        }}
      >
        <svg viewBox="0 0 1920 1080" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
          {!isShamshan ? (
            <g>
              {/* Floating clouds */}
              {[0, 1, 2, 3, 4].map((c) => {
                const cx = ((c * 460 - frame * 0.35) % 2300 + 2300) % 2300 - 200;
                const cy = 240 + (c % 3) * 85;
                return (
                  <g key={c} transform={`translate(${cx}, ${cy})`} opacity={0.42}>
                    <ellipse cx={0} cy={0} rx={150} ry={34} fill="#ffe9c7" />
                    <ellipse cx={-60} cy={-16} rx={85} ry={28} fill="#fff3de" />
                    <ellipse cx={65} cy={-12} rx={92} ry={25} fill="#fff3de" />
                  </g>
                );
              })}

              {/* Snow-Capped Himalaya Peaks */}
              {isHimalaya && (
                <g>
                  <path d="M -80,830 L 220,440 L 470,630 L 860,340 L 1220,620 L 1540,410 L 1980,640 L 2040,1150 L -80,1150 Z" fill="#4c1d95" stroke="#2e1065" strokeWidth={3} />
                  <path d="M 860,340 L 1220,620 L 1540,410 L 1980,640 L 2040,1150 L 860,1150 Z" fill="#3b0764" opacity={0.45} />
                  <path d="M 860,340 L 765,455 L 825,445 L 865,482 L 915,438 L 970,462 Z" fill="#fef3c7" opacity={0.9} />
                  <path d="M 220,440 L 150,525 L 205,515 L 235,542 L 285,515 Z" fill="#fde68a" opacity={0.82} />
                  <path d="M 1540,410 L 1465,500 L 1525,492 L 1555,522 L 1605,495 Z" fill="#fde68a" opacity={0.82} />
                </g>
              )}

              {/* Distant Temple Shikharas & Golden Palace Silhouettes */}
              {[160, 480, 960, 1440, 1760].map((tx, idx) => (
                <g key={idx} transform={`translate(${tx}, 700)`} opacity={idx === 2 ? 0.56 : 0.84}>
                  {/* Stepped Plinth */}
                  <rect x={-72} y={108} width={144} height={24} rx={4} fill="#581c46" stroke="#fbbf24" strokeWidth={1.6} />
                  <rect x={-55} y={10} width={110} height={100} fill="#6b2149" stroke="#fbbf24" strokeWidth={1.8} />
                  {/* Side Mandapa Gopurams */}
                  <path d="M -82,110 L -68,36 L -48,14 L -48,110 Z" fill="#581c46" stroke="#fbbf24" strokeWidth={1.4} />
                  <path d="M 82,110 L 68,36 L 48,14 L 48,110 Z" fill="#581c46" stroke="#fbbf24" strokeWidth={1.4} />
                  {/* Main Shikhara */}
                  <path d="M -68,12 L -44,-72 Q 0,-155 0,-195 Q 0,-155 44,-72 L 68,12 Z" fill="#862e58" stroke="#fde047" strokeWidth={1.8} />
                  <path d="M -42,-42 L 42,-42 M -28,-92 L 28,-92" stroke="#fde047" strokeWidth={1.4} opacity={0.65} />
                  <path d="M -18,110 L -18,52 Q 0,26 18,52 L 18,110 Z" fill="#fde68a" opacity={0.72} />
                  <circle cx={0} cy={-205} r={8} fill="#fde047" />
                  <line x1={0} y1={-213} x2={0} y2={-244} stroke="#fde047" strokeWidth={3} />
                  <polygon points={`0,-242 ${32 + Math.sin(frame * 0.1 + idx) * 6},-233 0,-224`} fill="#f97316" />
                </g>
              ))}

              {/* Ornate Carved Balcony / Marble Horizon with Balustrade */}
              <path
                d="M -100,820 Q 220,745 520,790 T 1120,775 T 1720,805 T 2120,780 L 2120,1180 L -100,1180 Z"
                fill="#4d1d4a"
                opacity={0.9}
              />
              <path
                d="M -100,822 Q 220,747 520,792 T 1120,777 T 1720,807 T 2120,782"
                fill="none"
                stroke="#fbbf24"
                strokeWidth={3.5}
                opacity={0.75}
              />
            </g>
          ) : (
            /* Distant & Midground Kailash / Shamshan Mountain Ridges (SOLID HEX COLORS) */
            <g>
              {/* Far Mountain Ridge */}
              <path
                d="M -80,820 L 180,505 L 440,645 L 820,375 L 1140,635 L 1460,445 L 1780,645 L 2040,545 L 2040,1150 L -80,1150 Z"
                fill="#273668"
                stroke="#3b4f8c"
                strokeWidth={2.5}
              />
              {/* Right Shadow Slope for 2.5D Mountain Facet */}
              <path
                d="M 820,375 L 1140,635 L 1460,445 L 1780,645 L 2040,545 L 2040,1150 L 820,1150 Z"
                fill="#1b264a"
                opacity={0.58}
              />
              {/* Snow Highlight Caps on Kailash & Side Peaks */}
              <path d="M 820,375 L 725,475 L 785,465 L 825,502 L 875,458 L 925,482 Z" fill="#dbeafe" opacity={0.85} />
              <path d="M 180,505 L 125,565 L 165,558 L 188,578 L 228,558 Z" fill="#bfdbfe" opacity={0.62} />
              <path d="M 1460,445 L 1398,510 L 1440,502 L 1468,525 L 1512,502 Z" fill="#bfdbfe" opacity={0.62} />

              {/* Foreground Jagged Craggy Foothills */}
              <path
                d="M -80,860 L 180,745 L 420,795 L 680,735 L 960,785 L 1240,730 L 1540,790 L 1800,740 L 2040,835 L 2040,1150 L -80,1150 Z"
                fill="#161f3d"
                stroke="#293a66"
                strokeWidth={2}
                opacity={0.94}
              />

              {/* Gnarled Ancient Banyan / Rudraksha Shamshan Trees with Hanging Roots & Ravens */}
              <g transform="translate(145, 765)" opacity={0.92}>
                <path d="M -18,65 Q -10,-65 12,-170 M 2,-80 Q -56,-125 -95,-165 M 6,-110 Q 58,-152 88,-192 M -56,-125 Q -76,-155 -115,-145 M 48,-146 Q 78,-172 112,-158" fill="none" stroke="#0b1120" strokeWidth={15} strokeLinecap="round" />
                {/* Hanging Aerial Roots */}
                {[-82, -46, 44, 76].map((rx, idx) => (
                  <path key={idx} d={`M ${rx},${-135 - (idx % 2) * 18} Q ${rx + garlandSway * 0.3},-75 ${rx},-22`} fill="none" stroke="#1e293b" strokeWidth={3} strokeDasharray="6 3" />
                ))}
                {/* Perched Night Owl Silhouette */}
                <ellipse cx={64} cy={-166} rx={7} ry={10} fill="#0b1120" />
                <circle cx={62} cy={-172} r={1.8} fill="#fde047" />
                <circle cx={67} cy={-172} r={1.8} fill="#fde047" />
              </g>
              <g transform="translate(1785, 775)" opacity={0.9}>
                <path d="M 16,65 Q 8,-70 -14,-175 M -4,-88 Q 56,-132 92,-168 M -8,-118 Q -62,-154 -92,-192" fill="none" stroke="#0b1120" strokeWidth={14} strokeLinecap="round" />
                {[-68, -36, 48, 78].map((rx, idx) => (
                  <path key={idx} d={`M ${rx},${-140 - (idx % 2) * 15} Q ${rx - garlandSway * 0.3},-80 ${rx},-28`} fill="none" stroke="#1e293b" strokeWidth={3} strokeDasharray="6 3" />
                ))}
              </g>

              {/* Drifting Moonlight Fog */}
              {[0, 1, 2, 3, 4].map((m) => {
                const mx = ((m * 520 + frame * 0.55) % 2400) - 300;
                return (
                  <ellipse key={m} cx={mx} cy={748 + (m % 2) * 38} rx={380} ry={40} fill="#93c5fd" opacity={0.14} />
                );
              })}
            </g>
          )}
        </svg>
      </div>

      {/* LAYER 2: Midground Stage & Characters (1.0x camera, SOLID HEX GROUND & PROPS) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translate3d(${cameraX}px, ${cameraY}px, 0) scale(${zoom})`,
          transformOrigin: "50% 55%",
        }}
      >
        <svg
          viewBox="0 0 1920 1080"
          width="100%"
          height="100%"
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        >
          {!isShamshan ? (
            <g>
              {/* Festive Marble Floor + Gold Carpet Runner */}
              <path d="M -100,835 Q 960,775 2020,835 L 2020,1150 L -100,1150 Z" fill="#541b4d" stroke="#fbbf24" strokeWidth={3} />
              <path d="M -100,895 Q 960,840 2020,895 L 2020,1150 L -100,1150 Z" fill="#3a1038" />
              <path d="M -100,940 Q 960,895 2020,940 L 2020,1150 L -100,1150 Z" fill="#2a0a29" />

              {/* Decorative Bandhanwar Marigold & Mango-Leaf Garland Across Top */}
              {isHimalaya && (
                <g opacity={0.92}>
                  <path d={`M 95,120 Q 520,${210 + garlandSway} 960,130 Q 1400,${210 - garlandSway} 1825,120`} fill="none" stroke="#16a34a" strokeWidth={12} strokeLinecap="round" />
                  <path d={`M 95,120 Q 520,${210 + garlandSway} 960,130 Q 1400,${210 - garlandSway} 1825,120`} fill="none" stroke="#f97316" strokeWidth={9} strokeDasharray="10 14" strokeLinecap="round" />
                </g>
              )}

              {[95, 1825].map((px, idx) => (
                <g key={idx} transform={`translate(${px}, 430)`} opacity={0.92}>
                  <rect x={-32} y={-280} width={64} height={680} fill="#6b2149" stroke="#fbbf24" strokeWidth={2.5} />
                  <rect x={-44} y={-280} width={88} height={36} rx={6} fill="#92400e" stroke="#fde047" strokeWidth={2} />
                  <rect x={-46} y={365} width={92} height={44} rx={6} fill="#92400e" stroke="#fde047" strokeWidth={2} />
                  <path d={`M -32,-180 Q ${garlandSway},-120 32,-60 M -32,-40 Q ${-garlandSway},20 32,80`} fill="none" stroke="#f97316" strokeWidth={11} strokeDasharray="8 6" strokeLinecap="round" />
                  <g transform={`translate(${idx === 0 ? 75 : -75}, 395)`}>
                    <ellipse cx={0} cy={12} rx={22} ry={20} fill="#d97706" stroke="#fde047" strokeWidth={2} />
                    <path d="M -14,-6 L 14,-6 L 10,-14 L -10,-14 Z" fill="#fbbf24" />
                    <circle cx={0} cy={-18} r={10} fill="#78350f" />
                    <path d="M -18,-10 Q -8,-28 0,-12 Q 8,-28 18,-10" fill="#16a34a" />
                  </g>
                </g>
              ))}
            </g>
          ) : (
            <g>
              {/* Layered Solid Shamshan Ground Planes */}
              <path d="M -100,828 Q 480,788 960,818 T 2020,805 L 2020,1150 L -100,1150 Z" fill="#1d243b" stroke="#3b4d7a" strokeWidth={2} />
              <path d="M -100,885 Q 480,855 960,875 T 2020,865 L 2020,1150 L -100,1150 Z" fill="#121728" />
              <ellipse cx={310} cy={860} rx={250} ry={62} fill="#ea580c" opacity={0.18 + 0.08 * f1.scaleY} />
              <ellipse cx={1610} cy={865} rx={250} ry={62} fill="#ea580c" opacity={0.18 + 0.08 * f2.scaleY} />
              <ellipse cx={960} cy={840} rx={480} ry={78} fill="#93c5fd" opacity={0.12} />

              {/* Twin Blazing Dhuni / Havan Fire Cauldrons with Rising Smoke Plumes & Skull Stones */}
              {[
                { cx: 290, cy: 792, f: f1 },
                { cx: 1630, cy: 792, f: f2 },
              ].map((dh, idx) => (
                <g key={idx} transform={`translate(${dh.cx}, ${dh.cy})`}>
                  {/* Rising Smoke Plumes */}
                  {[0, 1, 2].map((sm) => (
                    <ellipse
                      key={sm}
                      cx={Math.sin(t * 1.4 + sm + idx) * 14}
                      cy={-82 - sm * 38}
                      rx={22 + sm * 10}
                      ry={12 + sm * 5}
                      fill="#94a3b8"
                      opacity={0.18 - sm * 0.04}
                    />
                  ))}
                  {/* Ash Ring & Stone Pedestal */}
                  <ellipse cx={0} cy={28} rx={58} ry={14} fill="#334155" stroke="#0b1120" strokeWidth={2} />
                  <path d="M -42,0 L 42,0 L 30,28 L -30,28 Z" fill="#1e293b" stroke="#fbbf24" strokeWidth={2.2} />
                  <g transform={`scale(${dh.f.scaleX}, ${dh.f.scaleY}) skewX(${dh.f.leanX})`}>
                    <path d="M -28,0 Q -22,-46 0,-74 Q 22,-46 28,0 Z" fill="#ea580c" />
                    <path d="M -17,0 Q -13,-32 0,-54 Q 13,-32 17,0 Z" fill="#facc15" />
                    <path d="M -8,0 Q -4,-18 0,-30 Q 4,-18 8,0 Z" fill="#fffbeb" />
                  </g>
                </g>
              ))}

              {/* Carved Stone Shamshan Pillars + Hanging Brass Bells + Saffron Toran */}
              {[82, 1838].map((px, idx) => (
                <g key={idx} transform={`translate(${px}, 460)`} opacity={0.94}>
                  <rect x={-28} y={-260} width={56} height={620} fill="#1e293b" stroke="#64748b" strokeWidth={2.4} />
                  <rect x={-16} y={-180} width={32} height={110} rx={4} fill="#0f172a" stroke="#475569" strokeWidth={1.6} />
                  <rect x={-16} y={20} width={32} height={110} rx={4} fill="#0f172a" stroke="#475569" strokeWidth={1.6} />
                  <rect x={-38} y={-260} width={76} height={32} rx={5} fill="#334155" stroke="#fbbf24" strokeWidth={1.8} />
                  <rect x={-40} y={340} width={80} height={34} rx={5} fill="#334155" stroke="#64748b" strokeWidth={1.8} />
                  <g transform={`translate(${idx === 0 ? 48 : -48}, -195) rotate(${garlandSway * 0.4})`}>
                    <line x1={0} y1={-35} x2={0} y2={0} stroke="#fbbf24" strokeWidth={3} />
                    <path d="M -16,18 Q -14,-4 0,-8 Q 14,-4 16,18 Z" fill="#fbbf24" stroke="#78350f" strokeWidth={1.8} />
                    <circle cx={0} cy={20} r={4} fill="#fde047" />
                  </g>
                  <polygon
                    points={`${idx === 0 ? 28 : -28},-240 ${idx === 0 ? 96 + garlandSway * 0.4 : -96 - garlandSway * 0.4},-226 ${idx === 0 ? 28 : -28},-210`}
                    fill="#ea580c"
                    stroke="#fde047"
                    strokeWidth={1.5}
                  />
                </g>
              ))}

              {/* Ornate Narmadeshwar Shiva Lingam Shrine with Coiled Naga, Belpatra & Brass Diya */}
              <g transform="translate(182, 766)" opacity={0.96}>
                {/* Stone Base & Jalahari */}
                <rect x={-52} y={28} width={104} height={22} rx={5} fill="#334155" stroke="#0b1120" strokeWidth={2} />
                <ellipse cx={0} cy={28} rx={44} ry={10} fill="#475569" stroke="#cbd5e1" strokeWidth={1.8} />
                {/* Lingam */}
                <rect x={-16} y={-20} width={32} height={48} rx={16} fill="#1e293b" stroke="#cbd5e1" strokeWidth={2} />
                <path d="M -8,-4 Q 0,-7 8,-4 M -8,2 Q 0,-1 8,2 M -8,8 Q 0,5 8,8" stroke="#ffffff" strokeWidth={2.2} fill="none" />
                {/* Belpatra & Marigold Offerings */}
                <ellipse cx={-6} cy={-21} rx={7} ry={4} fill="#16a34a" stroke="#0b1120" strokeWidth={1} />
                <ellipse cx={6} cy={-21} rx={7} ry={4} fill="#16a34a" stroke="#0b1120" strokeWidth={1} />
                <circle cx={0} cy={-24} r={4.5} fill="#f97316" stroke="#fde047" strokeWidth={1} />
                {/* Glowing Small Brass Diya */}
                <ellipse cx={54} cy={46} rx={12} ry={5} fill="#b45309" stroke="#fde047" strokeWidth={1.2} />
                <ellipse cx={54} cy={36} rx={4.5} ry={9} fill="#fde047" />
              </g>
            </g>
          )}
        </svg>

        {children}
      </div>

      {/* LAYER 3: Foreground Atmospheric Particles (1.35x parallax) */}
      <div
        style={{
          position: "absolute",
          inset: -60,
          pointerEvents: "none",
          transform: `translate3d(${cameraX * 1.35}px, ${cameraY * 1.2}px, 0)`,
        }}
      >
        <svg viewBox="0 0 1920 1080" width="100%" height="100%">
          {Array.from({ length: isShamshan ? 34 : 30 }).map((_, i) => {
            const baseX = seeded(i, 11) * 1920;
            const speed = 0.8 + seeded(i, 12) * 1.4;
            const drift = Math.sin(frame * 0.03 + i) * 38;
            if (isShamshan) {
              const ey = 1120 - ((seeded(i, 13) * 1150 + frame * speed * 1.6) % 1180);
              const ex = baseX + drift;
              const size = 2.2 + seeded(i, 14) * 4.5;
              const isAsh = i % 3 === 0;
              const op = interpolate(ey, [0, 300, 950, 1120], [0, 0.7, 0.85, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              return (
                <circle
                  key={i}
                  cx={ex}
                  cy={ey}
                  r={size}
                  fill={isAsh ? "#9db2d9" : i % 2 === 0 ? "#ff7b00" : "#ffd166"}
                  opacity={op * 0.75}
                />
              );
            } else {
              const py = ((seeded(i, 15) * 1150 + frame * speed * 1.55) % 1160) - 40;
              const px = baseX + drift;
              const rot = frame * (1.2 + seeded(i, 16) * 2) + i * 40;
              const col = i % 3 === 0 ? "#ffbe0b" : i % 3 === 1 ? "#ff4d6d" : "#ff9f1c";
              return (
                <g key={i} transform={`translate(${px}, ${py}) rotate(${rot})`} opacity={0.82}>
                  <ellipse cx={0} cy={0} rx={8} ry={4.5} fill={col} />
                </g>
              );
            }
          })}
        </svg>
      </div>
    </AbsoluteFill>
  );
};
