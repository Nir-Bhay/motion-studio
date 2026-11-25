import React from "react";
import { useCurrentFrame } from "remotion";

interface VishnuRigProps {
  x: number;
  y: number;
  scale?: number;
  flipX?: boolean;
  speakingEnergy?: number;
  highlightItem?: "none" | "shankh" | "chakra" | "gada" | "padma" | "all";
  withGaruda?: boolean;
  gestureMode?: "serene" | "advising" | "chuckling";
}

export const VishnuRig: React.FC<VishnuRigProps> = ({
  x,
  y,
  scale = 1,
  flipX = false,
  speakingEnergy = 0,
  highlightItem = "none",
  withGaruda = false,
  gestureMode = "serene",
}) => {
  const frame = useCurrentFrame();
  const breath = Math.sin(frame * 0.06) * 4;
  const hover = withGaruda ? Math.sin(frame * 0.05) * 14 : breath * 0.6;
  const blink = Math.sin(frame * 0.045 + 1.2) > 0.965 ? 0.1 : 1;
  const chakraSpin = frame * 7.5;
  const clothWave = Math.sin(frame * 0.08) * 12;
  const garudaWing = Math.sin(frame * 0.16) * 24;
  const speakGesture =
    gestureMode === "advising"
      ? Math.sin(frame * 0.14) * 10 + speakingEnergy * 18
      : gestureMode === "chuckling"
      ? Math.sin(frame * 0.2) * 8
      : 0;
  const mouthOpen = 1 + speakingEnergy * 5;

  const isHl = (item: "shankh" | "chakra" | "gada" | "padma") =>
    highlightItem === item || highlightItem === "all";

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + hover,
        transform: `translate(-50%, -50%) scale(${flipX ? -scale : scale}, ${scale})`,
        transformOrigin: "center center",
        pointerEvents: "none",
      }}
    >
      <svg width={560} height={620} viewBox="-280 -320 560 620" overflow="visible">
        <defs>
          <radialGradient id="vishnuAura" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#fff3b0" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#ffd166" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#ff9f1c" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="vishnuSkin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7ad1ff" />
            <stop offset="55%" stopColor="#3fa7e8" />
            <stop offset="100%" stopColor="#206fb3" />
          </linearGradient>
          <linearGradient id="pitambara" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffe566" />
            <stop offset="55%" stopColor="#ffaa00" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="goldOrnament" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff7cc" />
            <stop offset="45%" stopColor="#ffd166" />
            <stop offset="100%" stopColor="#b87300" />
          </linearGradient>
        </defs>

        {/* Divine Prabhamandala Halo */}
        <circle cx={0} cy={-125} r={145} fill="url(#vishnuAura)" />
        <g transform={`translate(0, -125) rotate(${frame * 0.4})`} opacity={0.45}>
          {Array.from({ length: 16 }).map((_, i) => (
            <polygon
              key={i}
              points="0,-135 7,-98 -7,-98"
              fill="#ffe484"
              transform={`rotate(${i * 22.5})`}
            />
          ))}
        </g>

        {/* Optional Winged Garuda Mount */}
        {withGaruda && (
          <g transform="translate(0, 125)">
            {/* Left & Right Feathered Golden Wings */}
            <g transform={`rotate(${-12 + garudaWing})`}>
              <path
                d="M -25,0 Q -140,-95 -245,-55 Q -210,-10 -150,5 Q -205,15 -225,40 Q -130,38 -25,18 Z"
                fill="#d97706"
                stroke="#ffe58f"
                strokeWidth={2}
              />
              <path
                d="M -30,4 Q -120,-65 -195,-35 Q -150,-5 -30,14 Z"
                fill="#fbbf24"
                opacity={0.75}
              />
            </g>
            <g transform={`rotate(${12 - garudaWing})`}>
              <path
                d="M 25,0 Q 140,-95 245,-55 Q 210,-10 150,5 Q 205,15 225,40 Q 130,38 25,18 Z"
                fill="#d97706"
                stroke="#ffe58f"
                strokeWidth={2}
              />
              <path
                d="M 30,4 Q 120,-65 195,-35 Q 150,-5 30,14 Z"
                fill="#fbbf24"
                opacity={0.75}
              />
            </g>
            {/* Garuda Torso & Beaked Face */}
            <ellipse cx={0} cy={22} rx={58} ry={42} fill="#92400e" stroke="#fbbf24" strokeWidth={3} />
            <circle cx={0} cy={-16} r={24} fill="#fef3c7" stroke="#f59e0b" strokeWidth={2} />
            {/* Curved Golden Beak */}
            <path d="M -8,-14 Q 0,-32 18,-10 Q 5,-4 -8,-14 Z" fill="#f59e0b" />
            <circle cx={-6} cy={-20} r={3} fill="#1e293b" />
            <circle cx={6} cy={-20} r={3} fill="#1e293b" />
            {/* Garuda Crown */}
            <polygon points="-14,-34 0,-60 14,-34" fill="url(#goldOrnament)" />
          </g>
        )}

        {/* Flowing Uttariya Silk Scarf behind torso */}
        <path
          d={`M -58,-45 Q ${-125 + clothWave},20 ${-110 - clothWave},120 Q ${-80 + clothWave},145 -50,95`}
          fill="none"
          stroke="url(#pitambara)"
          strokeWidth={18}
          strokeLinecap="round"
          opacity={0.9}
        />
        <path
          d={`M 58,-45 Q ${125 - clothWave},20 ${110 + clothWave},120 Q ${80 - clothWave},145 50,95`}
          fill="none"
          stroke="url(#pitambara)"
          strokeWidth={18}
          strokeLinecap="round"
          opacity={0.9}
        />

        {/* BACK LEFT ARM — Holding Glowing Shankh (Conch) */}
        <g transform={`translate(-52, -38) rotate(${-14 + Math.sin(frame * 0.05) * 4})`}>
          <path d="M 0,0 Q -55,-20 -78,-62" fill="none" stroke="url(#vishnuSkin)" strokeWidth={24} strokeLinecap="round" />
          <circle cx={-78} cy={-62} r={12} fill="#5bc3f7" />
          {/* Ornate White Shankh */}
          <g transform="translate(-86, -86) rotate(-25)">
            {isHl("shankh") && <circle cx={0} cy={0} r={42} fill="#fff7d6" opacity={0.45 + 0.25 * Math.sin(frame * 0.2)} />}
            <path
              d="M -16,22 Q -22,-5 0,-30 Q 16,-14 14,14 Q 8,28 -16,22 Z"
              fill="#fffaf0"
              stroke="#fbbf24"
              strokeWidth={2.5}
            />
            <path d="M -8,8 Q 2,2 8,8 M -6,-4 Q 2,-10 7,-3" fill="none" stroke="#e2c799" strokeWidth={2} />
          </g>
        </g>

        {/* BACK RIGHT ARM — Spinning Sudarshan Chakra */}
        <g transform={`translate(52, -38) rotate(${14 - Math.sin(frame * 0.05) * 4})`}>
          <path d="M 0,0 Q 55,-20 78,-65" fill="none" stroke="url(#vishnuSkin)" strokeWidth={24} strokeLinecap="round" />
          <circle cx={78} cy={-65} r={12} fill="#5bc3f7" />
          {/* Sudarshan Chakra */}
          <g transform="translate(86, -98)">
            {isHl("chakra") && <circle cx={0} cy={0} r={54} fill="#ffd166" opacity={0.5 + 0.25 * Math.sin(frame * 0.25)} />}
            <circle cx={0} cy={0} r={34} fill="#ffaa00" opacity={0.22} />
            <g transform={`rotate(${chakraSpin})`}>
              <circle cx={0} cy={0} r={26} fill="none" stroke="url(#goldOrnament)" strokeWidth={5} />
              {Array.from({ length: 12 }).map((_, i) => (
                <polygon
                  key={i}
                  points="0,-39 5,-25 -5,-25"
                  fill="#ffe47a"
                  transform={`rotate(${i * 30})`}
                />
              ))}
              <circle cx={0} cy={0} r={7} fill="#fff3b0" />
            </g>
          </g>
        </g>

        {/* Pitambara Dhoti & Legs */}
        <g transform="translate(0, 55)">
          <path
            d="M -46,0 L 46,0 L 58,125 Q 25,136 0,122 Q -25,136 -58,125 Z"
            fill="url(#pitambara)"
            stroke="#b45309"
            strokeWidth={2.5}
          />
          {/* Pleat Folds */}
          <path d="M 0,4 L -12,120 M 0,4 L 12,120 M -26,8 L -34,122 M 26,8 L 34,122" stroke="#d97706" strokeWidth={2} opacity={0.7} />
          {/* Golden Kamarband Waist Belt */}
          <rect x={-48} y={-8} width={96} height={18} rx={7} fill="url(#goldOrnament)" stroke="#92400e" strokeWidth={2} />
          <circle cx={0} cy={1} r={7} fill="#ef4444" stroke="#fff3c4" strokeWidth={2} />
          {/* Lotus Feet */}
          <ellipse cx={-24} cy={134} rx={18} ry={9} fill="#3fa7e8" />
          <ellipse cx={24} cy={134} rx={18} ry={9} fill="#3fa7e8" />
        </g>

        {/* Torso */}
        <path
          d="M -56,-52 Q 0,-64 56,-52 L 45,52 L -45,52 Z"
          fill="url(#vishnuSkin)"
          stroke="#1d5f9e"
          strokeWidth={2}
        />

        {/* Vaijayanti Garland */}
        <path
          d={`M -36,-50 Q 0,${88 + breath * 0.5} 36,-50`}
          fill="none"
          stroke="#f43f5e"
          strokeWidth={11}
          strokeDasharray="10 6"
          strokeLinecap="round"
        />
        <path
          d={`M -36,-50 Q 0,${88 + breath * 0.5} 36,-50`}
          fill="none"
          stroke="#fde047"
          strokeWidth={5}
          strokeDasharray="4 12"
          strokeLinecap="round"
        />

        {/* Golden Necklace & Sparkling Kaustubha Jewel */}
        <path d="M -32,-46 Q 0,-18 32,-46" fill="none" stroke="url(#goldOrnament)" strokeWidth={8} strokeLinecap="round" />
        <polygon points="0,-24 10,-12 0,0 -10,-12" fill="#ff3b6b" stroke="#fff3c4" strokeWidth={2} />

        {/* FRONT LEFT ARM — Holding Ornate Golden Gada (Mace) */}
        <g transform={`translate(-48, -32) rotate(${gestureMode === "advising" ? -speakGesture * 0.5 : 0})`}>
          <path d="M 0,0 Q -32,38 -36,84" fill="none" stroke="url(#vishnuSkin)" strokeWidth={23} strokeLinecap="round" />
          <circle cx={-36} cy={84} r={11} fill="#5bc3f7" />
          {/* Gada Mace */}
          <g transform="translate(-44, 72) rotate(12)">
            {isHl("gada") && <circle cx={0} cy={45} r={45} fill="#ffd166" opacity={0.45 + 0.25 * Math.sin(frame * 0.22)} />}
            <rect x={-4} y={-28} width={8} height={74} rx={4} fill="url(#goldOrnament)" />
            <ellipse cx={0} cy={62} rx={22} ry={28} fill="url(#goldOrnament)" stroke="#92400e" strokeWidth={2} />
            <path d="M -18,62 L 18,62 M -14,48 L 14,48 M -14,76 L 14,76" stroke="#b45309" strokeWidth={2} />
          </g>
        </g>

        {/* FRONT RIGHT ARM — Blooming Padma Lotus OR Advising Gesture */}
        <g transform={`translate(48, -32) rotate(${gestureMode === "advising" ? -28 - speakGesture : 0})`}>
          <path d="M 0,0 Q 34,34 48,72" fill="none" stroke="url(#vishnuSkin)" strokeWidth={23} strokeLinecap="round" />
          <circle cx={48} cy={72} r={11} fill="#5bc3f7" />
          {gestureMode !== "advising" && (
            <g transform="translate(56, 52)">
              {isHl("padma") && <circle cx={0} cy={0} r={40} fill="#ff85a1" opacity={0.45 + 0.25 * Math.sin(frame * 0.22)} />}
              {/* Blooming Pink Padma */}
              <path d="M 0,14 Q -24,0 -18,-18 Q -4,-6 0,-26 Q 4,-6 18,-18 Q 24,0 0,14 Z" fill="#ff5c8a" stroke="#ffd6e0" strokeWidth={1.5} />
              <path d="M 0,14 Q -10,-4 0,-22 Q 10,-4 0,14 Z" fill="#ff85a1" />
            </g>
          )}
        </g>

        {/* Head & Expressive Face */}
        <g transform={`translate(0, ${-98 + breath * 0.4})`}>
          {/* Neck */}
          <rect x={-14} y={24} width={28} height={24} rx={8} fill="#3fa7e8" />
          {/* Golden Kundal Earrings */}
          <ellipse cx={-34} cy={8} rx={7} ry={13} fill="url(#goldOrnament)" />
          <ellipse cx={34} cy={8} rx={7} ry={13} fill="url(#goldOrnament)" />
          {/* Face */}
          <ellipse cx={0} cy={0} rx={32} ry={36} fill="url(#vishnuSkin)" stroke="#1d5f9e" strokeWidth={1.5} />
          {/* Urdhva Pundra Tilak */}
          <path d="M -6,-26 L -4,-10 Q 0,-7 4,-10 L 6,-26" fill="none" stroke="#fffbeb" strokeWidth={3} strokeLinecap="round" />
          <line x1={0} y1={-24} x2={0} y2={-11} stroke="#ef4444" strokeWidth={2.5} strokeLinecap="round" />
          {/* Eyes with Blink */}
          <g transform={`scale(1, ${blink})`} style={{ transformOrigin: "0px -4px" }}>
            <ellipse cx={-12} cy={-4} rx={6.5} ry={4.2} fill="#ffffff" />
            <circle cx={-12} cy={-4} r={3} fill="#1e1b4b" />
            <circle cx={-13} cy={-5} r={1} fill="#ffffff" />
            <ellipse cx={12} cy={-4} rx={6.5} ry={4.2} fill="#ffffff" />
            <circle cx={12} cy={-4} r={3} fill="#1e1b4b" />
            <circle cx={11} cy={-5} r={1} fill="#ffffff" />
          </g>
          {/* Eyebrows */}
          <path d="M -20,-12 Q -12,-16 -5,-11" fill="none" stroke="#0f172a" strokeWidth={2.5} strokeLinecap="round" />
          <path d="M 5,-11 Q 12,-16 20,-12" fill="none" stroke="#0f172a" strokeWidth={2.5} strokeLinecap="round" />
          {/* Serene Smile / Speaking Mouth */}
          <path
            d={`M -9,15 Q 0,${19 + mouthOpen} 9,15`}
            fill={speakingEnergy > 0.15 ? "#7f1d1d" : "none"}
            stroke="#0f172a"
            strokeWidth={2.3}
            strokeLinecap="round"
          />
          {/* Kirit Mukut Golden Crown */}
          <g transform="translate(0, -28)">
            <path d="M -30,4 L -24,-34 L -12,-22 L 0,-62 L 12,-22 L 24,-34 L 30,4 Z" fill="url(#goldOrnament)" stroke="#92400e" strokeWidth={2} />
            <rect x={-32} y={0} width={64} height={11} rx={4} fill="url(#goldOrnament)" stroke="#92400e" strokeWidth={1.5} />
            <circle cx={0} cy={-26} r={5} fill="#ef4444" stroke="#fff7cc" strokeWidth={1.5} />
            <circle cx={-16} cy={-8} r={3.5} fill="#10b981" />
            <circle cx={16} cy={-8} r={3.5} fill="#10b981" />
          </g>
        </g>
      </svg>
    </div>
  );
};
