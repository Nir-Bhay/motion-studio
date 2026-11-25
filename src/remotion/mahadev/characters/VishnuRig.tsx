import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { breathe, clothWave, pendulumSwing, wingFlap } from "../motion/physics";

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
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const br = breathe(t, 0, 3.6);
  const hover = withGaruda ? Math.sin(t * 2.8) * 14 : br.chestExpand * 0.6;
  const blink = Math.sin(t * 2.4 + 1.2) > 0.965 ? 0.1 : 1;
  const chakraSpin = t * 440;
  const scarfL = clothWave(t, 0, 14);
  const scarfR = clothWave(t, 1.4, 14);
  const garudaWing = wingFlap(t, 4.8, 26);
  const kundalSwing = pendulumSwing(t, 2.4, 5);
  const speakGesture =
    gestureMode === "advising"
      ? Math.sin(t * 6.5) * 10 + speakingEnergy * 18
      : gestureMode === "chuckling"
      ? Math.sin(t * 9.0) * 8
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
      <svg width={580} height={640} viewBox="-290 -330 580 640" overflow="visible">
        <defs>
          <radialGradient id="vishnuAuraStrong" cx="50%" cy="45%" r="52%">
            <stop offset="0%" stopColor="#fffbeb" stopOpacity="0.62" />
            <stop offset="45%" stopColor="#fde047" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="vishnuSkin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7dd3fc" />
            <stop offset="50%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
          <linearGradient id="pitambara" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
          <linearGradient id="goldOrnament" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="45%" stopColor="#fcd34d" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
        </defs>

        {/* Divine Prabhamandala Halo */}
        <circle cx={0} cy={-125} r={162} fill="url(#vishnuAuraStrong)" />
        <g transform={`translate(0, -125) rotate(${t * 24})`} opacity={0.55}>
          {Array.from({ length: 16 }).map((_, i) => (
            <polygon
              key={i}
              points="0,-142 7,-102 -7,-102"
              fill="#fef08a"
              transform={`rotate(${i * 22.5})`}
            />
          ))}
        </g>

        {/* Winged Garuda Mount with Feathered Asymmetric Wing Physics */}
        {withGaruda && (
          <g transform="translate(0, 125)">
            <g transform={`rotate(${-10 + garudaWing})`}>
              <path
                d="M -25,0 Q -145,-98 -255,-56 Q -218,-10 -156,5 Q -210,16 -232,42 Q -134,40 -25,18 Z"
                fill="#b45309"
                stroke="#fde68a"
                strokeWidth={2.5}
              />
              <path d="M -30,4 Q -124,-66 -202,-36 Q -152,-6 -30,14 Z" fill="#fbbf24" opacity={0.82} />
              <path d="M -45,10 Q -115,-34 -165,-18" fill="none" stroke="#fef3c7" strokeWidth={2.5} opacity={0.65} />
            </g>
            <g transform={`rotate(${10 - garudaWing})`}>
              <path
                d="M 25,0 Q 145,-98 255,-56 Q 218,-10 156,5 Q 210,16 232,42 Q 134,40 25,18 Z"
                fill="#b45309"
                stroke="#fde68a"
                strokeWidth={2.5}
              />
              <path d="M 30,4 Q 124,-66 202,-36 Q 152,-6 30,14 Z" fill="#fbbf24" opacity={0.82} />
              <path d="M 45,10 Q 115,-34 165,-18" fill="none" stroke="#fef3c7" strokeWidth={2.5} opacity={0.65} />
            </g>
            <ellipse cx={0} cy={22} rx={60} ry={44} fill="#92400e" stroke="#fbbf24" strokeWidth={3} />
            <circle cx={0} cy={-16} r={25} fill="#fef3c7" stroke="#f59e0b" strokeWidth={2} />
            <path d="M -8,-14 Q 0,-34 19,-10 Q 5,-4 -8,-14 Z" fill="#f59e0b" />
            <circle cx={-6} cy={-20} r={3} fill="#1e293b" />
            <circle cx={6} cy={-20} r={3} fill="#1e293b" />
            <polygon points="-14,-34 0,-62 14,-34" fill="url(#goldOrnament)" />
          </g>
        )}

        {/* Flowing Uttariya Silk Scarf driven by Multi-Harmonic Cloth Physics */}
        <path
          d={`M -58,-45 Q ${-130 + scarfL},18 ${-114 - scarfL * 0.8},125 Q ${-82 + scarfL * 0.5},150 -48,96`}
          fill="none"
          stroke="url(#pitambara)"
          strokeWidth={20}
          strokeLinecap="round"
          opacity={0.94}
        />
        <path
          d={`M 58,-45 Q ${130 - scarfR},18 ${114 + scarfR * 0.8},125 Q ${82 - scarfR * 0.5},150 48,96`}
          fill="none"
          stroke="url(#pitambara)"
          strokeWidth={20}
          strokeLinecap="round"
          opacity={0.94}
        />

        {/* BACK LEFT ARM — Shankh + Golden Keyura Armlet */}
        <g transform={`translate(-54, -38) rotate(${-14 + Math.sin(t * 2.8) * 4})`}>
          <path d="M 0,0 Q -56,-20 -80,-64" fill="none" stroke="#0b1120" strokeWidth={30} strokeLinecap="round" />
          <path d="M 0,0 Q -56,-20 -80,-64" fill="none" stroke="url(#vishnuSkin)" strokeWidth={24} strokeLinecap="round" />
          <ellipse cx={-34} cy={-14} rx={5} ry={13} transform="rotate(-18, -34, -14)" fill="none" stroke="#fde047" strokeWidth={4.5} />
          <circle cx={-80} cy={-64} r={12} fill="#60a5fa" stroke="#0b1120" strokeWidth={2.5} />
          <g transform="translate(-88, -88) rotate(-25)">
            {isHl("shankh") && <circle cx={0} cy={0} r={46} fill="#fffbeb" opacity={0.5 + 0.25 * Math.sin(t * 10)} />}
            <path
              d="M -17,23 Q -23,-5 0,-32 Q 17,-15 15,15 Q 8,29 -17,23 Z"
              fill="#fffaf0"
              stroke="#0b1120"
              strokeWidth={2.6}
            />
            <path d="M -9,8 Q 2,2 9,8 M -7,-4 Q 2,-10 8,-3 M -4,-14 Q 2,-18 6,-13" fill="none" stroke="#d4b483" strokeWidth={2} />
          </g>
        </g>

        {/* BACK RIGHT ARM — Blazing Sudarshan Chakra + Keyura Armlet */}
        <g transform={`translate(54, -38) rotate(${14 - Math.sin(t * 2.8) * 4})`}>
          <path d="M 0,0 Q 56,-20 80,-66" fill="none" stroke="#0b1120" strokeWidth={30} strokeLinecap="round" />
          <path d="M 0,0 Q 56,-20 80,-66" fill="none" stroke="url(#vishnuSkin)" strokeWidth={24} strokeLinecap="round" />
          <ellipse cx={34} cy={-14} rx={5} ry={13} transform="rotate(18, 34, -14)" fill="none" stroke="#fde047" strokeWidth={4.5} />
          <circle cx={80} cy={-66} r={12} fill="#60a5fa" stroke="#0b1120" strokeWidth={2.5} />
          <g transform="translate(88, -100)">
            {isHl("chakra") && <circle cx={0} cy={0} r={58} fill="#fde047" opacity={0.55 + 0.25 * Math.sin(t * 12)} />}
            <circle cx={0} cy={0} r={36} fill="#fbbf24" opacity={0.28} />
            <g transform={`rotate(${chakraSpin})`}>
              <circle cx={0} cy={0} r={27} fill="none" stroke="url(#goldOrnament)" strokeWidth={5.5} />
              {Array.from({ length: 12 }).map((_, i) => (
                <polygon
                  key={i}
                  points="0,-42 5.5,-26 -5.5,-26"
                  fill="#fef08a"
                  transform={`rotate(${i * 30})`}
                />
              ))}
              <circle cx={0} cy={0} r={7.5} fill="#fffbeb" />
            </g>
          </g>
        </g>

        {/* Pitambara Dhoti & Sculpted Lotus Feet */}
        <g transform="translate(0, 56)">
          <path
            d="M -48,0 L 48,0 L 60,126 Q 25,138 0,124 Q -25,138 -60,126 Z"
            fill="url(#pitambara)"
            stroke="#0b1120"
            strokeWidth={3}
          />
          <path d="M 0,4 L -12,122 M 0,4 L 12,122 M -26,8 L -35,124 M 26,8 L 35,124" stroke="#92400e" strokeWidth={2.2} opacity={0.8} />
          <rect x={-50} y={-8} width={100} height={19} rx={8} fill="url(#goldOrnament)" stroke="#0b1120" strokeWidth={2.4} />
          <circle cx={0} cy={1.5} r={7.5} fill="#ef4444" stroke="#0b1120" strokeWidth={1.8} />
          <ellipse cx={-24} cy={135} rx={18} ry={9} fill="#38bdf8" stroke="#0b1120" strokeWidth={2.5} />
          <ellipse cx={24} cy={135} rx={18} ry={9} fill="#38bdf8" stroke="#0b1120" strokeWidth={2.5} />
        </g>

        {/* Sculpted Broad-Chested Muscular Torso */}
        <path
          d="M -60,-54 Q 0,-66 60,-54 L 46,54 L -46,54 Z"
          fill="url(#vishnuSkin)"
          stroke="#0b1120"
          strokeWidth={3.2}
        />
        {/* Pectoral & Abdominal Muscular Definition + Golden Srivatsa Mark */}
        <path d="M -38,-22 Q -18,-10 -4,-20 M 4,-20 Q 18,-10 38,-22" fill="none" stroke="#0c2d5c" strokeWidth={2.6} opacity={0.75} />
        <path d="M -18,6 Q 0,10 18,6 M -16,24 Q 0,28 16,24" fill="none" stroke="#0c2d5c" strokeWidth={2.2} opacity={0.65} />
        <path d="M 22,-32 Q 28,-26 22,-20" fill="none" stroke="#fde047" strokeWidth={2.8} strokeLinecap="round" />

        {/* Vaijayanti Garland */}
        <path
          d={`M -38,-50 Q 0,${90 + br.chestExpand * 0.5} 38,-50`}
          fill="none"
          stroke="#f43f5e"
          strokeWidth={11}
          strokeDasharray="10 6"
          strokeLinecap="round"
        />
        <path
          d={`M -38,-50 Q 0,${90 + br.chestExpand * 0.5} 38,-50`}
          fill="none"
          stroke="#fde047"
          strokeWidth={5}
          strokeDasharray="4 12"
          strokeLinecap="round"
        />

        {/* Multi-Strand Pearl Necklace & Kaustubha Ruby */}
        <path d="M -34,-46 Q 0,-16 34,-46" fill="none" stroke="url(#goldOrnament)" strokeWidth={8} strokeLinecap="round" />
        <polygon points="0,-24 11,-11 0,2 -11,-11" fill="#ff2e63" stroke="#0b1120" strokeWidth={2} />

        {/* FRONT LEFT ARM — Kaumodaki Gada + Kankana Wristlet */}
        <g transform={`translate(-50, -32) rotate(${gestureMode === "advising" ? -speakGesture * 0.5 : 0})`}>
          <path d="M 0,0 Q -34,38 -38,86" fill="none" stroke="#0b1120" strokeWidth={29} strokeLinecap="round" />
          <path d="M 0,0 Q -34,38 -38,86" fill="none" stroke="url(#vishnuSkin)" strokeWidth={23} strokeLinecap="round" />
          <ellipse cx={-24} cy={38} rx={12} ry={4.5} transform="rotate(24, -24, 38)" fill="none" stroke="#fde047" strokeWidth={4} />
          <ellipse cx={-35} cy={74} rx={11} ry={4} fill="none" stroke="#fde047" strokeWidth={4} />
          <circle cx={-38} cy={86} r={11} fill="#60a5fa" stroke="#0b1120" strokeWidth={2.4} />
          <g transform="translate(-46, 74) rotate(12)">
            {isHl("gada") && <circle cx={0} cy={45} r={48} fill="#fde047" opacity={0.5 + 0.25 * Math.sin(t * 11)} />}
            <rect x={-4.5} y={-28} width={9} height={74} rx={4} fill="url(#goldOrnament)" stroke="#0b1120" strokeWidth={1.8} />
            <ellipse cx={0} cy={62} rx={23} ry={29} fill="url(#goldOrnament)" stroke="#0b1120" strokeWidth={2.6} />
            <path d="M -19,62 L 19,62 M -15,48 L 15,48 M -15,76 L 15,76" stroke="#92400e" strokeWidth={2.2} />
          </g>
        </g>

        {/* FRONT RIGHT ARM — Blooming Padma Lotus OR Advising Hand */}
        <g transform={`translate(50, -32) rotate(${gestureMode === "advising" ? -28 - speakGesture : 0})`}>
          <path d="M 0,0 Q 36,34 50,74" fill="none" stroke="#0b1120" strokeWidth={29} strokeLinecap="round" />
          <path d="M 0,0 Q 36,34 50,74" fill="none" stroke="url(#vishnuSkin)" strokeWidth={23} strokeLinecap="round" />
          <ellipse cx={28} cy={32} rx={12} ry={4.5} transform="rotate(-24, 28, 32)" fill="none" stroke="#fde047" strokeWidth={4} />
          <circle cx={50} cy={74} r={11} fill="#60a5fa" stroke="#0b1120" strokeWidth={2.4} />
          {gestureMode !== "advising" && (
            <g transform="translate(58, 52)">
              {isHl("padma") && <circle cx={0} cy={0} r={42} fill="#ff85a1" opacity={0.5 + 0.25 * Math.sin(t * 11)} />}
              <path d="M 0,15 Q -26,0 -19,-19 Q -4,-6 0,-28 Q 4,-6 19,-19 Q 26,0 0,15 Z" fill="#ff5c8a" stroke="#0b1120" strokeWidth={2} />
              <path d="M 0,15 Q -11,-4 0,-23 Q 11,-4 0,15 Z" fill="#ff85a1" />
            </g>
          )}
        </g>

        {/* Head & Sculpted Divine Face */}
        <g transform={`translate(0, ${-100 + br.shoulderLift * 0.5})`}>
          <rect x={-14} y={24} width={28} height={24} rx={8} fill="#2563eb" stroke="#0b1120" strokeWidth={2.5} />
          {/* Makara Kundal Earrings with Pendulum Micro-Swing */}
          <ellipse cx={-35} cy={9} rx={7.5} ry={14} transform={`rotate(${kundalSwing}, -35, 0)`} fill="url(#goldOrnament)" stroke="#0b1120" strokeWidth={2} />
          <ellipse cx={35} cy={9} rx={7.5} ry={14} transform={`rotate(${-kundalSwing}, 35, 0)`} fill="url(#goldOrnament)" stroke="#0b1120" strokeWidth={2} />
          {/* Face */}
          <ellipse cx={0} cy={0} rx={33} ry={37} fill="url(#vishnuSkin)" stroke="#0b1120" strokeWidth={3} />
          {/* Urdhva Pundra Tilak */}
          <path d="M -6,-27 L -4,-10 Q 0,-7 4,-10 L 6,-27" fill="none" stroke="#fffbeb" strokeWidth={3.2} strokeLinecap="round" />
          <line x1={0} y1={-25} x2={0} y2={-11} stroke="#ef4444" strokeWidth={2.8} strokeLinecap="round" />
          {/* Nose Bridge */}
          <path d="M 0,-5 L -2,6 L 2,8" fill="none" stroke="#1d5f9e" strokeWidth={1.6} strokeLinecap="round" />
          {/* Eyes with Blink */}
          <g transform={`scale(1, ${blink})`} style={{ transformOrigin: "0px -4px" }}>
            <ellipse cx={-12} cy={-4} rx={6.8} ry={4.4} fill="#ffffff" />
            <circle cx={-12} cy={-4} r={3.1} fill="#1e1b4b" />
            <circle cx={-13} cy={-5} r={1.1} fill="#ffffff" />
            <ellipse cx={12} cy={-4} rx={6.8} ry={4.4} fill="#ffffff" />
            <circle cx={12} cy={-4} r={3.1} fill="#1e1b4b" />
            <circle cx={11} cy={-5} r={1.1} fill="#ffffff" />
          </g>
          <path d="M -21,-12 Q -12,-17 -5,-11" fill="none" stroke="#0f172a" strokeWidth={2.6} strokeLinecap="round" />
          <path d="M 5,-11 Q 12,-17 21,-12" fill="none" stroke="#0f172a" strokeWidth={2.6} strokeLinecap="round" />
          {/* Serene Smile / Speaking Mouth */}
          <path
            d={`M -9,15 Q 0,${20 + mouthOpen} 9,15`}
            fill={speakingEnergy > 0.15 ? "#7f1d1d" : "none"}
            stroke="#0f172a"
            strokeWidth={2.4}
            strokeLinecap="round"
          />
          {/* Ornate Filigree Kirit Mukut Crown */}
          <g transform="translate(0, -29)">
            <path d="M -31,4 L -25,-36 L -12,-23 L 0,-66 L 12,-23 L 25,-36 L 31,4 Z" fill="url(#goldOrnament)" stroke="#92400e" strokeWidth={2} />
            <rect x={-33} y={0} width={66} height={12} rx={4} fill="url(#goldOrnament)" stroke="#92400e" strokeWidth={1.6} />
            <circle cx={0} cy={-28} r={5.5} fill="#ef4444" stroke="#fff7cc" strokeWidth={1.6} />
            <circle cx={-17} cy={-8} r={3.8} fill="#10b981" />
            <circle cx={17} cy={-8} r={3.8} fill="#10b981" />
          </g>
        </g>
      </svg>
    </div>
  );
};
