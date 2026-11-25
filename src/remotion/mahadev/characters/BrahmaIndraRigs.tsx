import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { clothWave, pendulumSwing, wingFlap } from "../motion/physics";

/**
 * Richly Detailed 2.5D Illustrated Chaturmukh Brahma Ji on Celestial Hamsa & Lotus Throne
 * Pure solid cel-shaded fills with #0b1120 dark-ink contours (zero url(#...) dependency).
 */
export const BrahmaRig: React.FC<{ x: number; y: number; scale?: number; speakingEnergy?: number }> = ({
  x,
  y,
  scale = 1,
  speakingEnergy = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const hover = Math.sin(t * 2.9) * 10;
  const wing = wingFlap(t, 4.2, 20);
  const blink = Math.sin(t * 2.2 + 0.5) > 0.965 ? 0.12 : 1;
  const malaSway = Math.sin(t * 3.4) * 5;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + hover,
        transform: `translate(-50%, -50%) scale(${scale})`,
        pointerEvents: "none",
      }}
    >
      <svg width={520} height={560} viewBox="-260 -280 520 560" overflow="visible">
        {/* Solid-Alpha Prabhamandala Divine Halo */}
        <circle cx={0} cy={-95} r={146} fill="#f59e0b" opacity={0.14} />
        <circle cx={0} cy={-95} r={104} fill="#fde68a" opacity={0.26} />
        <circle cx={0} cy={-95} r={74} fill="none" stroke="#fef08a" strokeWidth={2.5} strokeDasharray="7 6" opacity={0.7} />

        {/* Celestial Hamsa (Swan) Carrier with Layered Feathers & Dark Contours */}
        <g transform="translate(0, 142)">
          {/* Left & Right Feathered Wings */}
          <g transform={`rotate(${-10 + wing})`}>
            <path d="M -22,0 Q -105,-78 -172,-40 Q -124,4 -22,18 Z" fill="#f8fafc" stroke="#0b1120" strokeWidth={2.8} />
            <path d="M -42,-12 Q -108,-50 -148,-34 M -34,-2 Q -90,-26 -124,-14" fill="none" stroke="#94a3b8" strokeWidth={2.2} strokeLinecap="round" />
          </g>
          <g transform={`rotate(${10 - wing})`}>
            <path d="M 22,0 Q 105,-78 172,-40 Q 124,4 22,18 Z" fill="#f8fafc" stroke="#0b1120" strokeWidth={2.8} />
            <path d="M 42,-12 Q 108,-50 148,-34 M 34,-2 Q 90,-26 124,-14" fill="none" stroke="#94a3b8" strokeWidth={2.2} strokeLinecap="round" />
          </g>

          {/* Tail Plumes & Webbed Feet */}
          <polygon points="48,14 96,-4 84,26 48,30" fill="#e2e8f0" stroke="#0b1120" strokeWidth={2.4} />
          <path d="M -18,48 L -22,64 L -34,68 M 18,48 L 22,64 L 34,68" fill="none" stroke="#f59e0b" strokeWidth={4.5} strokeLinecap="round" />

          {/* Swan Body & Cel-Shadow */}
          <ellipse cx={0} cy={22} rx={72} ry={36} fill="#ffffff" stroke="#0b1120" strokeWidth={3} />
          <path d="M -62,28 Q 0,58 62,28 Q 34,54 -34,54 Z" fill="#cbd5e1" opacity={0.75} />

          {/* Graceful Curved Swan Neck, Head & Golden Beak */}
          <path d="M -52,12 Q -88,-32 -68,-70" fill="none" stroke="#0b1120" strokeWidth={24} strokeLinecap="round" />
          <path d="M -52,12 Q -88,-32 -68,-70" fill="none" stroke="#ffffff" strokeWidth={18} strokeLinecap="round" />
          <circle cx={-68} cy={-72} r={14.5} fill="#ffffff" stroke="#0b1120" strokeWidth={2.6} />
          <polygon points="-78,-74 -102,-67 -77,-62" fill="#f59e0b" stroke="#0b1120" strokeWidth={2} />
          <circle cx={-71} cy={-74} r={2.4} fill="#0f172a" />
          {/* Pearl Necklace on Hamsa */}
          <path d="M -66,-50 Q -58,-42 -50,-48" fill="none" stroke="#fbbf24" strokeWidth={3.5} strokeDasharray="3 3" />
        </g>

        {/* Giant Multi-Layered Pink Lotus Throne (Padmasana) */}
        <g transform="translate(0, 92)">
          {/* Rear Crimson Petals */}
          {[-72, -38, 0, 38, 72].map((lx, idx) => (
            <ellipse
              key={`rear-${idx}`}
              cx={lx}
              cy={Math.abs(lx) * 0.14 - 8}
              rx={27}
              ry={44}
              fill="#e11d48"
              stroke="#0b1120"
              strokeWidth={2.4}
              transform={`rotate(${lx * 0.48}, ${lx}, 16)`}
            />
          ))}
          {/* Front Bright Rose Petals with Veins */}
          {[-56, -24, 0, 24, 56].map((lx, idx) => (
            <g key={`front-${idx}`} transform={`rotate(${lx * 0.42}, ${lx}, 22)`}>
              <ellipse cx={lx} cy={Math.abs(lx) * 0.12 + 4} rx={26} ry={40} fill={idx % 2 === 0 ? "#fb7185" : "#f43f5e"} stroke="#0b1120" strokeWidth={2.4} />
              <line x1={lx} y1={-24} x2={lx} y2={24} stroke="#ffe4e6" strokeWidth={1.6} opacity={0.55} />
            </g>
          ))}
          <ellipse cx={0} cy={-10} rx={68} ry={16} fill="#fde047" stroke="#0b1120" strokeWidth={2.2} />
        </g>

        {/* Back Arms: Veda Palm-Leaf Manuscript (Left) & Engraved Golden Kamandalu (Right) */}
        <g transform="translate(-48, -24)">
          <path d="M 0,0 Q -44,-18 -64,-52" fill="none" stroke="#0b1120" strokeWidth={25} strokeLinecap="round" />
          <path d="M 0,0 Q -44,-18 -64,-52" fill="none" stroke="#f5b895" strokeWidth={19} strokeLinecap="round" />
          <ellipse cx={-24} cy={-12} rx={5} ry={11} transform="rotate(-24, -24, -12)" fill="none" stroke="#fbbf24" strokeWidth={4} />
          <circle cx={-66} cy={-54} r={10} fill="#f7be9c" stroke="#0b1120" strokeWidth={2.2} />
          {/* Vedas Palm-Leaf Bundle */}
          <g transform="translate(-76, -72) rotate(-14)">
            <rect x={-28} y={-15} width={56} height={30} rx={5} fill="#fef3c7" stroke="#0b1120" strokeWidth={2.6} />
            <rect x={-4} y={-15} width={8} height={30} fill="#dc2626" stroke="#0b1120" strokeWidth={1.6} />
            <line x1={-22} y1={-6} x2={-8} y2={-6} stroke="#92400e" strokeWidth={2} />
            <line x1={-22} y1={4} x2={-8} y2={4} stroke="#92400e" strokeWidth={2} />
            <line x1={8} y1={-6} x2={22} y2={-6} stroke="#92400e" strokeWidth={2} />
            <line x1={8} y1={4} x2={22} y2={4} stroke="#92400e" strokeWidth={2} />
          </g>
        </g>
        <g transform="translate(48, -24)">
          <path d="M 0,0 Q 44,-18 64,-52" fill="none" stroke="#0b1120" strokeWidth={25} strokeLinecap="round" />
          <path d="M 0,0 Q 44,-18 64,-52" fill="none" stroke="#f5b895" strokeWidth={19} strokeLinecap="round" />
          <ellipse cx={24} cy={-12} rx={5} ry={11} transform="rotate(24, 24, -12)" fill="none" stroke="#fbbf24" strokeWidth={4} />
          <circle cx={66} cy={-54} r={10} fill="#f7be9c" stroke="#0b1120" strokeWidth={2.2} />
          {/* Engraved Golden Kamandalu Pot */}
          <g transform="translate(72, -68)">
            <ellipse cx={0} cy={12} rx={17} ry={19} fill="#fbbf24" stroke="#0b1120" strokeWidth={2.4} />
            <ellipse cx={0} cy={12} rx={17} ry={5} fill="none" stroke="#b45309" strokeWidth={2} />
            <rect x={-7} y={-9} width={14} height={6} rx={2} fill="#fde047" stroke="#0b1120" strokeWidth={1.8} />
            <path d="M -12,-7 Q 0,-28 12,-7" fill="none" stroke="#0b1120" strokeWidth={5} strokeLinecap="round" />
            <path d="M -12,-7 Q 0,-28 12,-7" fill="none" stroke="#fbbf24" strokeWidth={2.8} strokeLinecap="round" />
          </g>
        </g>

        {/* Crossed Padmasana Saffron-Gold Dhoti Legs Seated on Lotus */}
        <g transform="translate(0, 62)">
          <ellipse cx={-38} cy={8} rx={36} ry={18} transform="rotate(14, -38, 8)" fill="#f59e0b" stroke="#0b1120" strokeWidth={2.8} />
          <ellipse cx={38} cy={8} rx={36} ry={18} transform="rotate(-14, 38, 8)" fill="#d97706" stroke="#0b1120" strokeWidth={2.8} />
          <path d="M -52,6 Q 0,24 52,6" fill="none" stroke="#fde047" strokeWidth={4} />
          <ellipse cx={-12} cy={16} rx={12} ry={7} fill="#f7be9c" stroke="#0b1120" strokeWidth={2} />
          <ellipse cx={12} cy={16} rx={12} ry={7} fill="#f7be9c" stroke="#0b1120" strokeWidth={2} />
        </g>

        {/* Rose-Silk Robe & Sculpted Peach Torso with Sacred Janeu & Necklaces */}
        <path d="M -50,-46 Q 0,-58 50,-46 L 56,64 Q 0,76 -56,64 Z" fill="#fb7185" stroke="#0b1120" strokeWidth={3} />
        <path d="M 10,-48 Q 34,-46 48,-44 L 52,62 Q 30,68 10,66 Z" fill="#e11d48" opacity={0.45} />
        {/* Pleated Golden Uttariya Shawl */}
        <path d="M -44,-44 Q 0,26 44,-44" fill="none" stroke="#0b1120" strokeWidth={16} strokeLinecap="round" />
        <path d="M -44,-44 Q 0,26 44,-44" fill="none" stroke="#fde047" strokeWidth={11} strokeLinecap="round" />
        {/* Sacred White Janeu & Ruby Pendant Necklace */}
        <path d="M -28,-46 Q 4,6 38,52" fill="none" stroke="#ffffff" strokeWidth={3.5} />
        <path d="M -22,-46 Q 0,-18 22,-46" fill="none" stroke="#fbbf24" strokeWidth={6} strokeLinecap="round" />
        <circle cx={0} cy={-26} r={7} fill="#ef4444" stroke="#fde047" strokeWidth={2} />

        {/* Front Arms: Rudraksha Akshamala Rosary (Left) & Abhaya Blessing Hand (Right) */}
        <g transform="translate(-44, -28)">
          <path d="M 0,0 Q -14,34 8,54" fill="none" stroke="#0b1120" strokeWidth={24} strokeLinecap="round" />
          <path d="M 0,0 Q -14,34 8,54" fill="none" stroke="#f7be9c" strokeWidth={18} strokeLinecap="round" />
          <ellipse cx={9} cy={56} rx={10} ry={11} fill="#f7be9c" stroke="#0b1120" strokeWidth={2.2} />
          {/* Swinging Akshamala Bead Rosary */}
          <ellipse cx={12 + malaSway * 0.4} cy={72} rx={9} ry={14} fill="none" stroke="#7c2d12" strokeWidth={4.5} strokeDasharray="3 3" />
        </g>
        <g transform="translate(44, -28)">
          <path d="M 0,0 Q 16,28 8,50" fill="none" stroke="#0b1120" strokeWidth={24} strokeLinecap="round" />
          <path d="M 0,0 Q 16,28 8,50" fill="none" stroke="#f7be9c" strokeWidth={18} strokeLinecap="round" />
          {/* Sculpted Blessing Palm with Fingers & Red Tilak */}
          <ellipse cx={10} cy={42} rx={11} ry={13} fill="#f7be9c" stroke="#0b1120" strokeWidth={2.4} />
          <path d="M 4,32 L 4,24 M 9,30 L 9,22 M 14,32 L 15,24" stroke="#0b1120" strokeWidth={2} strokeLinecap="round" />
          <circle cx={10} cy={42} r={3} fill="#ef4444" />
        </g>

        {/* CHATURMUKH: 4 Distinct Sculpted Faces with Layered Crowns & White Rishi Beards */}
        <g transform="translate(0, -104)">
          {/* Rear Crown Peak */}
          <polygon points="-16,-44 0,-94 16,-44" fill="#fbbf24" stroke="#0b1120" strokeWidth={2.4} />

          {/* Left Profile Face */}
          <g transform="translate(-40, 6)">
            <ellipse cx={0} cy={0} rx={21} ry={29} fill="#f0ad86" stroke="#0b1120" strokeWidth={2.6} />
            <path d="M -17,10 Q -10,48 8,44 L 12,10 Z" fill="#ffffff" stroke="#0b1120" strokeWidth={2} />
            <path d="M -18,-8 Q -10,-12 -4,-8" fill="none" stroke="#e2e8f0" strokeWidth={2.5} />
            <circle cx={-10} cy={-4} r={2.5} fill="#0f172a" />
            <polygon points="-19,-22 -8,-44 0,-60 8,-44 17,-22" fill="#fbbf24" stroke="#0b1120" strokeWidth={2.2} />
            <circle cx={0} cy={-34} r={3.5} fill="#ef4444" />
          </g>

          {/* Right Profile Face */}
          <g transform="translate(40, 6)">
            <ellipse cx={0} cy={0} rx={21} ry={29} fill="#f0ad86" stroke="#0b1120" strokeWidth={2.6} />
            <path d="M -12,10 L -8,44 Q 10,48 17,10 Z" fill="#ffffff" stroke="#0b1120" strokeWidth={2} />
            <path d="M 4,-8 Q 10,-12 18,-8" fill="none" stroke="#e2e8f0" strokeWidth={2.5} />
            <circle cx={10} cy={-4} r={2.5} fill="#0f172a" />
            <polygon points="-17,-22 -8,-44 0,-60 8,-44 19,-22" fill="#fbbf24" stroke="#0b1120" strokeWidth={2.2} />
            <circle cx={0} cy={-34} r={3.5} fill="#ef4444" />
          </g>

          {/* Center Front Face */}
          <g transform="translate(0, 4)">
            <ellipse cx={0} cy={0} rx={29} ry={34} fill="#f7be9c" stroke="#0b1120" strokeWidth={2.8} />
            {/* Flowing Layered White Rishi Beard & Mustache */}
            <path d="M -23,10 Q 0,68 23,10 Q 0,24 -23,10 Z" fill="#ffffff" stroke="#0b1120" strokeWidth={2} />
            <path d="M -14,18 Q -4,46 0,56 M 14,18 Q 4,46 0,56" fill="none" stroke="#cbd5e1" strokeWidth={1.6} />
            <path d="M -16,9 Q -6,4 0,9 Q 6,4 16,9" fill="none" stroke="#f8fafc" strokeWidth={4} strokeLinecap="round" />
            {/* Sacred Tilak & Expressive Brows/Eyes */}
            <path d="M -4,-22 L -4,-9 M 4,-22 L 4,-9" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" />
            <line x1={0} y1={-22} x2={0} y2={-9} stroke="#dc2626" strokeWidth={3} strokeLinecap="round" />
            <path d="M -17,-9 Q -10,-13 -4,-9 M 4,-9 Q 10,-13 17,-9" fill="none" stroke="#e2e8f0" strokeWidth={2.6} strokeLinecap="round" />
            <g transform={`scale(1, ${blink})`} style={{ transformOrigin: "0px -4px" }}>
              <ellipse cx={-10} cy={-4} rx={4.5} ry={3.4} fill="#ffffff" stroke="#0b1120" strokeWidth={1.2} />
              <circle cx={-10} cy={-4} r={2.2} fill="#0f172a" />
              <ellipse cx={10} cy={-4} rx={4.5} ry={3.4} fill="#ffffff" stroke="#0b1120" strokeWidth={1.2} />
              <circle cx={10} cy={-4} r={2.2} fill="#0f172a" />
            </g>
            {/* Smile */}
            <path d={`M -7,13 Q 0,${17 + speakingEnergy * 4} 7,13`} fill="none" stroke="#7f1d1d" strokeWidth={2.2} strokeLinecap="round" />
            {/* Multi-Tiered Center Ratna-Mukut Crown */}
            <polygon points="-26,-22 -14,-54 0,-74 14,-54 26,-22" fill="#fcd34d" stroke="#0b1120" strokeWidth={2.5} />
            <rect x={-26} y={-26} width={52} height={8} rx={3} fill="#f59e0b" stroke="#0b1120" strokeWidth={2} />
            <circle cx={0} cy={-42} r={5} fill="#ef4444" stroke="#0b1120" strokeWidth={1.5} />
            <circle cx={-13} cy={-22} r={3} fill="#10b981" />
            <circle cx={13} cy={-22} r={3} fill="#10b981" />
          </g>
        </g>
      </svg>
    </div>
  );
};

/**
 * Richly Detailed 2.5D Illustrated Devraj Indra Physically Seated inside a Golden Howdah
 * atop 4-Tusked Sacred White Airavata Elephant with Royal Chatra & Blazing Vajra!
 */
export const IndraOnAiravataRig: React.FC<{ x: number; y: number; scale?: number }> = ({
  x,
  y,
  scale = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const march = Math.sin(t * 4.4) * 5;
  const stride = Math.sin(t * 4.4) * 10;
  const trunkWave = clothWave(t, 0.2, 16);
  const earFlap = wingFlap(t, 3.8, 9);
  const vajraSpark = 0.65 + 0.35 * Math.sin(t * 16);
  const umbrellaSway = pendulumSwing(t, 2.2, 3);
  const blink = Math.sin(t * 2.4 + 0.8) > 0.965 ? 0.12 : 1;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + march,
        transform: `translate(-50%, -50%) scale(${scale})`,
        pointerEvents: "none",
      }}
    >
      <svg width={580} height={560} viewBox="-290 -290 580 560" overflow="visible">
        {/* Ground Shadow beneath Airavata */}
        <ellipse cx={-10} cy={222} rx={155} ry={16} fill="#0b1120" opacity={0.42} />

        {/* Ornate Royal Chatra (Umbrella) Physically Mounted to Back of Golden Howdah */}
        <g transform={`translate(10, -160) rotate(${umbrellaSway}, 56, 175)`}>
          <line x1={56} y1={-34} x2={56} y2={175} stroke="#0b1120" strokeWidth={8} strokeLinecap="round" />
          <line x1={56} y1={-34} x2={56} y2={175} stroke="#fcd34d" strokeWidth={4.5} strokeLinecap="round" />
          <path d="M -46,-18 Q 56,-72 158,-18 Z" fill="#f59e0b" stroke="#0b1120" strokeWidth={2.8} />
          <path d="M -38,-18 Q 56,-56 150,-18" fill="none" stroke="#fef08a" strokeWidth={2.5} />
          {/* Golden Hanging Tassels */}
          {[-34, -12, 12, 34, 56, 78, 100, 122, 142].map((tx, idx) => (
            <circle key={idx} cx={tx} cy={-14} r={3.2} fill="#fde047" stroke="#0b1120" strokeWidth={1} />
          ))}
          <circle cx={56} cy={-54} r={7.5} fill="#fef08a" stroke="#0b1120" strokeWidth={2} />
        </g>

        {/* Devraj Indra Physically Seated Inside Golden Howdah Strapped onto Airavata */}
        <g transform="translate(4, -34)">
          {/* Golden Saddle Girth Straps Buckling Howdah to Airavata's Jhool */}
          <path d="M -44,48 L -44,88 M 44,48 L 44,88" stroke="#0b1120" strokeWidth={8} strokeLinecap="round" />
          <path d="M -44,48 L -44,88 M 44,48 L 44,88" stroke="#fbbf24" strokeWidth={4.5} strokeLinecap="round" />
          {/* Soft Golden Divine Aura */}
          <circle cx={0} cy={-44} r={96} fill="#fde047" opacity={0.18} />
          <circle cx={0} cy={-44} r={66} fill="#fef9c3" opacity={0.18} />

          {/* Back Crimson Velvet Cushion & Golden Howdah Pillars */}
          <path d="M -56,-8 L 56,-8 L 50,52 L -50,52 Z" fill="#9f1239" stroke="#0b1120" strokeWidth={2.8} />
          <rect x={-58} y={-14} width={10} height={64} rx={4} fill="#fbbf24" stroke="#0b1120" strokeWidth={2.2} />
          <rect x={48} y={-14} width={10} height={64} rx={4} fill="#fbbf24" stroke="#0b1120" strokeWidth={2.2} />

          {/* Indra's Folded Silk Dhoti Legs Seated inside Howdah */}
          <ellipse cx={-24} cy={38} rx={26} ry={13} fill="#ef4444" stroke="#0b1120" strokeWidth={2.4} />
          <ellipse cx={24} cy={38} rx={26} ry={13} fill="#dc2626" stroke="#0b1120" strokeWidth={2.4} />

          {/* Sculpted Golden War-Armor (Kavach) + Vaijayanti Garland */}
          <path d="M -38,-28 Q 0,-38 38,-28 L 32,38 L -32,38 Z" fill="#f59e0b" stroke="#0b1120" strokeWidth={2.8} />
          <path d="M 8,-30 Q 24,-28 35,-26 L 30,36 L 8,36 Z" fill="#b45309" opacity={0.5} />
          {/* Shoulder Pauldrons */}
          <path d="M -48,-32 L -26,-28 L -28,-12 L -44,-14 Z" fill="#fde047" stroke="#0b1120" strokeWidth={2.2} />
          <path d="M 48,-32 L 26,-28 L 28,-12 L 44,-14 Z" fill="#fde047" stroke="#0b1120" strokeWidth={2.2} />
          {/* Chest Sun Emblem & Garland */}
          <circle cx={0} cy={4} r={12} fill="#ef4444" stroke="#fde047" strokeWidth={2.6} />
          <circle cx={0} cy={4} r={5} fill="#fef08a" />
          <path d="M -24,-26 Q 0,18 24,-26" fill="none" stroke="#fde047" strokeWidth={5} strokeDasharray="4 4" />

          {/* Raised Right Arm Wielding Blazing Crackling Vajra */}
          <g transform={`translate(-38, -20) rotate(${-16 + Math.sin(frame * 0.1) * 7})`}>
            <path d="M 0,0 Q -32,-24 -44,-60" fill="none" stroke="#0b1120" strokeWidth={23} strokeLinecap="round" />
            <path d="M 0,0 Q -32,-24 -44,-60" fill="none" stroke="#f5b895" strokeWidth={17} strokeLinecap="round" />
            <ellipse cx={-20} cy={-16} rx={5} ry={10} transform="rotate(-35, -20, -16)" fill="none" stroke="#fbbf24" strokeWidth={4} />
            <circle cx={-46} cy={-62} r={9.5} fill="#f7be9c" stroke="#0b1120" strokeWidth={2.2} />
            {/* Detailed Twin-Pronged Golden Vajra Thunderbolt */}
            <g transform="translate(-52, -84) rotate(-25)">
              <circle cx={0} cy={0} r={36} fill="#38bdf8" opacity={0.3 * vajraSpark} />
              <path d="M -12,-34 L 0,-12 L 12,-34 M 0,-36 L 0,36 M -12,34 L 0,12 L 12,34" fill="none" stroke="#0b1120" strokeWidth={8} strokeLinecap="round" />
              <path d="M -12,-34 L 0,-12 L 12,-34 M 0,-36 L 0,36 M -12,34 L 0,12 L 12,34" fill="none" stroke="#fde047" strokeWidth={4.5} strokeLinecap="round" />
              <rect x={-7} y={-7} width={14} height={14} rx={3} fill="#ef4444" stroke="#0b1120" strokeWidth={2} />
              <line x1={-18} y1={-12} x2={18} y2={12} stroke="#38bdf8" strokeWidth={2.5} opacity={vajraSpark} />
              <line x1={-18} y1={12} x2={18} y2={-12} stroke="#e0f2fe" strokeWidth={2} opacity={vajraSpark} />
            </g>
          </g>

          {/* Left Arm Holding Airavata's Golden Ankusha / Reins */}
          <g transform="translate(38, -20)">
            <path d="M 0,0 Q 22,26 4,50" fill="none" stroke="#0b1120" strokeWidth={23} strokeLinecap="round" />
            <path d="M 0,0 Q 22,26 4,50" fill="none" stroke="#f5b895" strokeWidth={17} strokeLinecap="round" />
            <circle cx={2} cy={52} r={9.5} fill="#f7be9c" stroke="#0b1120" strokeWidth={2.2} />
            {/* Golden Ankusha Goad */}
            <line x1={2} y1={52} x2={-42} y2={62} stroke="#fbbf24" strokeWidth={4} strokeLinecap="round" />
          </g>

          {/* Indra's Sculpted Royal Face, Mustache, Earrings & Towering Ratna-Mukut Crown */}
          <g transform="translate(0, -56)">
            <circle cx={-26} cy={4} r={5.5} fill="#fbbf24" stroke="#0b1120" strokeWidth={1.8} />
            <circle cx={26} cy={4} r={5.5} fill="#fbbf24" stroke="#0b1120" strokeWidth={1.8} />
            <ellipse cx={0} cy={0} rx={25} ry={29} fill="#f7be9c" stroke="#0b1120" strokeWidth={2.8} />
            {/* Tilak & Brows */}
            <line x1={0} y1={-20} x2={0} y2={-10} stroke="#dc2626" strokeWidth={3} strokeLinecap="round" />
            <path d="M -15,-9 Q -9,-13 -3,-9 M 3,-9 Q 9,-13 15,-9" fill="none" stroke="#0f172a" strokeWidth={2.2} strokeLinecap="round" />
            <g transform={`scale(1, ${blink})`} style={{ transformOrigin: "0px -4px" }}>
              <ellipse cx={-9} cy={-3} rx={4.5} ry={3.4} fill="#ffffff" stroke="#0b1120" strokeWidth={1.2} />
              <circle cx={-9} cy={-3} r={2.2} fill="#0f172a" />
              <ellipse cx={9} cy={-3} rx={4.5} ry={3.4} fill="#ffffff" stroke="#0b1120" strokeWidth={1.2} />
              <circle cx={9} cy={-3} r={2.2} fill="#0f172a" />
            </g>
            {/* Royal Mustache & Smile */}
            <path d="M -13,9 Q -6,5 0,9 Q 6,5 13,9" fill="none" stroke="#1e293b" strokeWidth={2.6} strokeLinecap="round" />
            <path d="M -6,15 Q 0,19 6,15" fill="none" stroke="#7f1d1d" strokeWidth={2} />
            {/* Multi-Tiered Golden Ratna-Mukut Crown */}
            <polygon points="-25,-22 -14,-52 0,-72 14,-52 25,-22" fill="#fcd34d" stroke="#0b1120" strokeWidth={2.5} />
            <rect x={-25} y={-25} width={50} height={8} rx={3} fill="#f59e0b" stroke="#0b1120" strokeWidth={2} />
            <circle cx={0} cy={-40} r={4.8} fill="#38bdf8" stroke="#0b1120" strokeWidth={1.4} />
            <circle cx={-12} cy={-21} r={2.8} fill="#ef4444" />
            <circle cx={12} cy={-21} r={2.8} fill="#ef4444" />
          </g>

          {/* Front Golden Howdah Rail Securing Indra's Seat onto Airavata */}
          <path d="M -58,34 L 58,34 L 54,56 L -54,56 Z" fill="#f59e0b" stroke="#0b1120" strokeWidth={2.8} />
          <path d="M -46,45 L 46,45" stroke="#fde047" strokeWidth={4} strokeDasharray="6 6" />
        </g>

        {/* Ornate 4-Tusked White Airavata Elephant */}
        <g transform="translate(0, 72)">
          {/* Swinging Elephant Tail */}
          <path d="M 118,12 Q 144,34 136,78" fill="none" stroke="#0b1120" strokeWidth={9} strokeLinecap="round" />
          <path d="M 118,12 Q 144,34 136,78" fill="none" stroke="#e2e8f0" strokeWidth={5} strokeLinecap="round" />
          <polygon points="136,74 128,92 144,92" fill="#334155" stroke="#0b1120" strokeWidth={1.6} />

          {/* Sculpted Elephant Legs with Padded Feet, Toenails & Golden Ankle Rings */}
          {[
            { lx: -84, dx: -stride * 0.6, col: "#cbd5e1" },
            { lx: 42, dx: stride * 0.6, col: "#cbd5e1" },
            { lx: -42, dx: stride * 0.7, col: "#f8fafc" },
            { lx: 84, dx: -stride * 0.7, col: "#f8fafc" },
          ].map((leg, idx) => (
            <g key={idx}>
              <path
                d={`M ${leg.lx},48 Q ${leg.lx + leg.dx * 0.4},96 ${leg.lx + leg.dx},140`}
                fill="none"
                stroke="#0b1120"
                strokeWidth={42}
                strokeLinecap="round"
              />
              <path
                d={`M ${leg.lx},48 Q ${leg.lx + leg.dx * 0.4},96 ${leg.lx + leg.dx},140`}
                fill="none"
                stroke={leg.col}
                strokeWidth={35}
                strokeLinecap="round"
              />
              {/* Golden Ankle Ring & Ivory Toenails */}
              <ellipse cx={leg.lx + leg.dx} cy={130} rx={19} ry={5} fill="none" stroke="#fbbf24" strokeWidth={4.5} />
              <circle cx={leg.lx + leg.dx - 10} cy={148} r={4.5} fill="#fef3c7" stroke="#0b1120" strokeWidth={1.4} />
              <circle cx={leg.lx + leg.dx} cy={149} r={4.5} fill="#fef3c7" stroke="#0b1120" strokeWidth={1.4} />
              <circle cx={leg.lx + leg.dx + 10} cy={148} r={4.5} fill="#fef3c7" stroke="#0b1120" strokeWidth={1.4} />
            </g>
          ))}

          {/* Muscular White Body & Cel-Shadow Belly */}
          <ellipse cx={0} cy={22} rx={128} ry={78} fill="#f8fafc" stroke="#0b1120" strokeWidth={3.2} />
          <path d="M -118,38 Q 0,104 118,38 Q 70,94 -70,94 Z" fill="#cbd5e1" opacity={0.7} />

          {/* Jewelled Crimson & Gold Royal Silk Caparison (Jhul) */}
          <path d="M -88,-34 Q 0,-48 88,-34 L 98,52 Q 0,76 -98,52 Z" fill="#be123c" stroke="#0b1120" strokeWidth={3} />
          <path d="M -72,-24 Q 0,-36 72,-24 L 80,36 Q 0,54 -80,36 Z" fill="#9f1239" stroke="#fde047" strokeWidth={2.5} />
          <path d="M -76,44 Q 0,66 76,44" fill="none" stroke="#fcd34d" strokeWidth={5} strokeDasharray="6 6" />
          {/* Golden Zari Medallions & Hanging Bells */}
          {[-44, 0, 44].map((mx, idx) => (
            <g key={idx} transform={`translate(${mx}, 6)`}>
              <circle cx={0} cy={0} r={10} fill="#fbbf24" stroke="#0b1120" strokeWidth={1.8} />
              <circle cx={0} cy={0} r={4.5} fill="#fef08a" />
            </g>
          ))}

          {/* Airavata Head, Golden Kumbha Crown, 4 Curved Tusks & Articulated Trunk */}
          <g transform="translate(-114, -18)">
            <circle cx={0} cy={0} r={54} fill="#f8fafc" stroke="#0b1120" strokeWidth={3} />
            {/* Gold Head Ornament (Kumbha-Mukut) */}
            <polygon points="-28,-44 0,-74 28,-44" fill="#fbbf24" stroke="#0b1120" strokeWidth={2.4} />
            <circle cx={0} cy={-50} r={5} fill="#ef4444" />
            {/* Royal Forehead Gold Plate & Tilak */}
            <path d="M -32,-26 Q 0,-12 32,-26" fill="none" stroke="#fbbf24" strokeWidth={5} />
            <circle cx={-12} cy={-24} r={3.5} fill="#ef4444" />

            {/* Flapping Jewel-Edged Ear */}
            <ellipse cx={36} cy={4} rx={26 + earFlap * 0.4} ry={40} fill="#f1f5f9" stroke="#0b1120" strokeWidth={2.6} />
            <ellipse cx={36} cy={4} rx={16 + earFlap * 0.3} ry={28} fill="#fda4af" opacity={0.55} />

            {/* Iconic 4 Ivory Tusks of Airavata with Golden Tusk-Rings! */}
            <path d="M -24,18 Q -66,34 -82,4" fill="none" stroke="#0b1120" strokeWidth={13} strokeLinecap="round" />
            <path d="M -24,18 Q -66,34 -82,4" fill="none" stroke="#fffbeb" strokeWidth={8.5} strokeLinecap="round" />
            <path d="M -18,28 Q -58,48 -76,22" fill="none" stroke="#0b1120" strokeWidth={11} strokeLinecap="round" />
            <path d="M -18,28 Q -58,48 -76,22" fill="none" stroke="#fef3c7" strokeWidth={7} strokeLinecap="round" />
            <circle cx={-54} cy={24} r={5} fill="none" stroke="#fbbf24" strokeWidth={3.5} />

            {/* Articulated Swaying Trunk Holding a Golden Lotus */}
            <path
              d={`M -34,12 Q -88,48 ${-72 + trunkWave},118 Q ${-58 + trunkWave},132 ${-44 + trunkWave},115`}
              fill="none"
              stroke="#0b1120"
              strokeWidth={28}
              strokeLinecap="round"
            />
            <path
              d={`M -34,12 Q -88,48 ${-72 + trunkWave},118 Q ${-58 + trunkWave},132 ${-44 + trunkWave},115`}
              fill="none"
              stroke="#f8fafc"
              strokeWidth={22}
              strokeLinecap="round"
            />
            {/* Expressive Eye */}
            <ellipse cx={-16} cy={-10} rx={6} ry={5} fill="#ffffff" stroke="#0b1120" strokeWidth={1.6} />
            <circle cx={-17} cy={-10} r={2.8} fill="#0f172a" />
          </g>
        </g>
      </svg>
    </div>
  );
};
