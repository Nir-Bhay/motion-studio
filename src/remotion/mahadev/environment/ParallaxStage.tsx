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

// Deterministic seeded helpers for particles/stars/embers
function seeded(i: number, salt: number): number {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453123;
  return x - Math.floor(x);
}

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
    ? "radial-gradient(ellipse at 50% 24%, #314280 0%, #19224a 48%, #0d1226 100%)"
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
        perspective: 1400,
      }}
    >
      {/* LAYER 0: Deep Celestial Sky, Stars, Mandala Sun or Crescent Moon (0.15x parallax) */}
      <div
        style={{
          position: "absolute",
          inset: -120,
          transform: `translate3d(${cameraX * 0.15}px, ${cameraY * 0.15}px, 0) scale(${1 + (zoom - 1) * 0.25})`,
        }}
      >
        <svg viewBox="0 0 1920 1080" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff8d6" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#ffd166" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#ff9f1c" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#dceeff" stopOpacity="0.65" />
              <stop offset="50%" stopColor="#7eb6ff" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#26407a" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Twinkling Starfield */}
          {Array.from({ length: isShamshan ? 75 : 38 }).map((_, i) => {
            const sx = seeded(i, 1) * 1920;
            const sy = seeded(i, 2) * (isShamshan ? 640 : 420);
            const r = 1.1 + seeded(i, 3) * 2.2;
            const tw = 0.35 + 0.65 * Math.abs(Math.sin(frame * 0.04 + i * 1.3));
            return (
              <circle
                key={i}
                cx={sx}
                cy={sy}
                r={r}
                fill={isShamshan ? "#d6ecff" : "#fff4cc"}
                opacity={tw * (isShamshan ? 0.9 : 0.5)}
              />
            );
          })}

          {!isShamshan ? (
            /* Rotating Sacred Mandala Sun Halo in Devaloka */
            <g transform={`translate(960, 290)`}>
              <circle r={420} fill="url(#sunGlow)" />
              <g transform={`rotate(${frame * 0.14})`} opacity={0.28}>
                {Array.from({ length: 24 }).map((_, i) => (
                  <polygon
                    key={i}
                    points="0,-340 16,-190 -16,-190"
                    fill="#ffe59e"
                    transform={`rotate(${i * 15})`}
                  />
                ))}
              </g>
              <g transform={`rotate(${-frame * 0.22})`} opacity={0.22}>
                <circle r={210} fill="none" stroke="#fff3c4" strokeWidth={3} strokeDasharray="16 10" />
                <circle r={155} fill="none" stroke="#ffd166" strokeWidth={2} />
              </g>
            </g>
          ) : (
            /* Luminous Crescent Moon & Mist Halo in Shamshan */
            <g transform="translate(1480, 195)">
              <circle r={240} fill="url(#moonGlow)" />
              <path
                d="M -25,-65 A 72,72 0 1,0 58,48 A 56,56 0 1,1 -25,-65 Z"
                fill="#eef7ff"
                opacity={0.92}
              />
            </g>
          )}
        </svg>
      </div>

      {/* LAYER 1: Distant Himalayan Peaks / Golden Devaloka Temple Spires (0.35x parallax) */}
      <div
        style={{
          position: "absolute",
          inset: -100,
          transform: `translate3d(${cameraX * 0.35}px, ${cameraY * 0.35}px, 0) scale(${1 + (zoom - 1) * 0.45})`,
        }}
      >
        <svg viewBox="0 0 1920 1080" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="templeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffcf70" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#612046" stopOpacity="0.88" />
            </linearGradient>
            <linearGradient id="mtnFar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3a4c7a" />
              <stop offset="100%" stopColor="#12182d" />
            </linearGradient>
          </defs>

          {!isShamshan ? (
            /* Distant Golden Temple Palaces & Floating Cloud Banks */
            <g>
              {/* Floating clouds */}
              {[0, 1, 2, 3, 4].map((c) => {
                const cx = ((c * 460 - frame * 0.35) % 2300 + 2300) % 2300 - 200;
                const cy = 240 + (c % 3) * 85;
                return (
                  <g key={c} transform={`translate(${cx}, ${cy})`} opacity={0.38}>
                    <ellipse cx={0} cy={0} rx={150} ry={34} fill="#ffe9c7" />
                    <ellipse cx={-60} cy={-16} rx={85} ry={28} fill="#fff3de" />
                    <ellipse cx={65} cy={-12} rx={92} ry={25} fill="#fff3de" />
                  </g>
                );
              })}
              {/* Distant Snow-Capped Himalaya Peaks & Golden Palace City */}
              {isHimalaya && (
                <g opacity={0.86}>
                  <path d="M -80,830 L 220,440 L 470,630 L 860,340 L 1220,620 L 1540,410 L 1980,640 L 2040,1150 L -80,1150 Z" fill="#4c1d95" />
                  <path d="M 860,340 L 765,455 L 825,445 L 865,482 L 915,438 L 970,462 Z" fill="#fef3c7" opacity={0.85} />
                  <path d="M 220,440 L 150,525 L 205,515 L 235,542 L 285,515 Z" fill="#fde68a" opacity={0.75} />
                  <path d="M 1540,410 L 1465,500 L 1525,492 L 1555,522 L 1605,495 Z" fill="#fde68a" opacity={0.75} />
                </g>
              )}
              {/* Distant Heavenly Shikhara Silhouettes & Palaces */}
              {[160, 480, 960, 1440, 1760].map((tx, idx) => (
                <g key={idx} transform={`translate(${tx}, 700)`} opacity={idx === 2 ? 0.35 : 0.58}>
                  <rect x={-55} y={10} width={110} height={110} fill="url(#templeGrad)" />
                  <path
                    d="M -68,12 L -44,-72 Q 0,-155 0,-195 Q 0,-155 44,-72 L 68,12 Z"
                    fill="url(#templeGrad)"
                  />
                  {/* Palace Arch Windows */}
                  <path d="M -18,120 L -18,56 Q 0,32 18,56 L 18,120 Z" fill="#ffe484" opacity={0.42} />
                  <circle cx={0} cy={-205} r={8} fill="#ffe484" />
                  <line x1={0} y1={-213} x2={0} y2={-244} stroke="#ffe484" strokeWidth={3} />
                  <polygon
                    points={`0,-242 ${32 + Math.sin(frame * 0.1 + idx) * 6},-233 0,-224`}
                    fill="#ff6b35"
                  />
                </g>
              ))}
              {/* Ornate Carved Devaloka Marble Balustrade Horizon */}
              <path
                d="M -100,820 Q 220,745 520,790 T 1120,775 T 1720,805 T 2120,780 L 2120,1180 L -100,1180 Z"
                fill="#4d1d4a"
                opacity={0.76}
              />
              <path
                d="M -100,822 Q 220,747 520,792 T 1120,777 T 1720,807 T 2120,782"
                fill="none"
                stroke="#fbbf24"
                strokeWidth={3}
                opacity={0.45}
              />
            </g>
          ) : (
            /* Distant Snow-Capped Kailash, Banyan Silhouettes & Craggy Shamshan Ridges */
            <g>
              <path
                d="M -80,820 L 260,510 L 490,650 L 840,390 L 1160,640 L 1460,470 L 1820,660 L 2040,560 L 2040,1150 L -80,1150 Z"
                fill="url(#mtnFar)"
                opacity={0.88}
              />
              {/* Snow Highlight Cap on Kailash Peak */}
              <path
                d="M 840,390 L 750,485 L 810,475 L 845,510 L 890,470 L 940,490 Z"
                fill="#cce5ff"
                opacity={0.48}
              />
              {/* Gnarled Ancient Shamshan Trees on Left & Right Ridges */}
              <g transform="translate(150, 775)" opacity={0.78}>
                <path d="M -16,50 Q -8,-65 10,-150 M 2,-80 Q -52,-115 -88,-155 M 6,-110 Q 56,-142 82,-182" fill="none" stroke="#0f172a" strokeWidth={14} strokeLinecap="round" />
                <path d="M -52,-115 Q -72,-145 -105,-140 M 46,-136 Q 74,-162 102,-148" fill="none" stroke="#1e293b" strokeWidth={6} strokeLinecap="round" />
              </g>
              <g transform="translate(1775, 785)" opacity={0.75}>
                <path d="M 14,50 Q 6,-70 -14,-155 M -4,-88 Q 52,-125 84,-162 M -8,-118 Q -58,-148 -84,-186" fill="none" stroke="#0f172a" strokeWidth={13} strokeLinecap="round" />
              </g>
              {/* Drifting Moonlight Fog & Dhuna Smoke Ribbons */}
              {[0, 1, 2, 3].map((m) => {
                const mx = ((m * 580 + frame * 0.55) % 2400) - 300;
                return (
                  <ellipse
                    key={m}
                    cx={mx}
                    cy={755 + (m % 2) * 42}
                    rx={380}
                    ry={42}
                    fill="#93c5fd"
                    opacity={0.11}
                  />
                );
              })}
            </g>
          )}
        </svg>
      </div>

      {/* LAYER 2: Midground Stage & Characters (1.0x camera) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translate3d(${cameraX}px, ${cameraY}px, 0) scale(${zoom})`,
          transformOrigin: "50% 55%",
        }}
      >
        {/* Ground Plane */}
        <svg
          viewBox="0 0 1920 1080"
          width="100%"
          height="100%"
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        >
          <defs>
            <linearGradient id="devaFloor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffcb77" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#3c113d" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="shamshanFloor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#262c44" />
              <stop offset="100%" stopColor="#0b0d17" />
            </linearGradient>
            <radialGradient id="pyreGroundGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff7b00" stopOpacity="0.42" />
              <stop offset="60%" stopColor="#ea580c" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="moonGroundGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#93c5fd" stopOpacity="0" />
            </radialGradient>
          </defs>
          {!isShamshan ? (
            <g>
              {/* Carved Devaloka Marble Floor & Mandapa Pillars with Mangala Kalash */}
              <path
                d="M -100,835 Q 960,775 2020,835 L 2020,1150 L -100,1150 Z"
                fill="url(#devaFloor)"
              />
              {[95, 1825].map((px, idx) => (
                <g key={idx} transform={`translate(${px}, 430)`} opacity={0.85}>
                  <rect x={-32} y={-280} width={64} height={680} fill="#5b2149" stroke="#fbbf24" strokeWidth={2.5} />
                  <rect x={-44} y={-280} width={88} height={36} rx={6} fill="#92400e" stroke="#fde047" strokeWidth={2} />
                  <rect x={-46} y={365} width={92} height={44} rx={6} fill="#92400e" stroke="#fde047" strokeWidth={2} />
                  {/* Marigold Spiral Garland on Pillar */}
                  <path d={`M -32,-180 Q ${garlandSway},-120 32,-60 M -32,-40 Q ${-garlandSway},20 32,80`} fill="none" stroke="#f97316" strokeWidth={11} strokeDasharray="8 6" strokeLinecap="round" />
                  {/* Mangala Kalash Pot at Pillar Base */}
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
              <path
                d="M -100,835 Q 480,795 960,825 T 2020,810 L 2020,1150 L -100,1150 Z"
                fill="url(#shamshanFloor)"
              />
              <ellipse cx={310} cy={860} rx={260} ry={66} fill="url(#pyreGroundGlow)" opacity={0.82 + 0.18 * f1.scaleY} />
              <ellipse cx={1610} cy={865} rx={260} ry={66} fill="url(#pyreGroundGlow)" opacity={0.82 + 0.18 * f2.scaleY} />
              <ellipse cx={960} cy={840} rx={480} ry={78} fill="url(#moonGroundGlow)" />

              {/* Twin Blazing Dhuni / Havan Fire Cauldrons with Animated Flame Tongues */}
              {[
                { cx: 290, cy: 792, f: f1 },
                { cx: 1630, cy: 792, f: f2 },
              ].map((dh, idx) => (
                <g key={idx} transform={`translate(${dh.cx}, ${dh.cy})`}>
                  <path d="M -40,0 L 40,0 L 28,28 L -28,28 Z" fill="#1e293b" stroke="#fbbf24" strokeWidth={2.2} />
                  <g transform={`scale(${dh.f.scaleX}, ${dh.f.scaleY}) skewX(${dh.f.leanX})`}>
                    <path d="M -26,0 Q -20,-42 0,-66 Q 20,-42 26,0 Z" fill="#ea580c" />
                    <path d="M -16,0 Q -12,-28 0,-48 Q 12,-28 16,0 Z" fill="#facc15" />
                    <path d="M -7,0 Q -4,-16 0,-26 Q 4,-16 7,0 Z" fill="#fffbeb" />
                  </g>
                </g>
              ))}

              {/* Carved Stone Shamshan Pillars + Hanging Brass Bells + Saffron Toran */}
              {[82, 1838].map((px, idx) => (
                <g key={idx} transform={`translate(${px}, 460)`} opacity={0.88}>
                  <rect x={-26} y={-260} width={52} height={620} fill="#1e293b" stroke="#64748b" strokeWidth={2.2} />
                  <rect x={-36} y={-260} width={72} height={30} rx={5} fill="#334155" stroke="#fbbf24" strokeWidth={1.8} />
                  {/* Hanging Brass Temple Bell */}
                  <g transform={`translate(${idx === 0 ? 46 : -46}, -195) rotate(${garlandSway * 0.4})`}>
                    <line x1={0} y1={-35} x2={0} y2={0} stroke="#fbbf24" strokeWidth={3} />
                    <path d="M -16,18 Q -14,-4 0,-8 Q 14,-4 16,18 Z" fill="#fbbf24" stroke="#78350f" strokeWidth={1.8} />
                    <circle cx={0} cy={20} r={4} fill="#fde047" />
                  </g>
                  {/* Warm Saffron Pataka Banner */}
                  <polygon
                    points={`${idx === 0 ? 26 : -26},-240 ${idx === 0 ? 92 + garlandSway * 0.4 : -92 - garlandSway * 0.4},-226 ${idx === 0 ? 26 : -26},-210`}
                    fill="#ea580c"
                    stroke="#fde047"
                    strokeWidth={1.5}
                  />
                </g>
              ))}

              {/* Stone Shiva Lingam Shrine on Left */}
              <g transform="translate(175, 772)" opacity={0.88}>
                <rect x={-38} y={24} width={76} height={18} rx={4} fill="#334155" stroke="#94a3b8" strokeWidth={1.8} />
                <rect x={-12} y={-14} width={24} height={40} rx={12} fill="#475569" stroke="#cbd5e1" strokeWidth={1.8} />
                <path d="M -6,-2 Q 0,-4 6,-2 M -6,3 Q 0,1 6,3" stroke="#ffffff" strokeWidth={1.8} fill="none" />
              </g>
            </g>
          )}
        </svg>

        {children}
      </div>

      {/* LAYER 3: Foreground Atmospheric Particles — Petals / Golden Dust / Shamshan Embers (1.45x parallax) */}
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
              // Rising glowing embers & ash flecks
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
              // Falling marigold & rose petals + golden sparkles
              const py = ((seeded(i, 15) * 1150 + frame * speed * 1.55) % 1160) - 40;
              const px = baseX + drift;
              const rot = frame * (1.2 + seeded(i, 16) * 2) + i * 40;
              const col = i % 3 === 0 ? "#ffbe0b" : i % 3 === 1 ? "#ff4d6d" : "#ff9f1c";
              return (
                <g key={i} transform={`translate(${px}, ${py}) rotate(${rot})`} opacity={0.78}>
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
