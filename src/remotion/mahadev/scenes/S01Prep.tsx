import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ParallaxStage } from "../environment/ParallaxStage";
import {
  ApsaraRig,
  CelestialMusicianRig,
  CelestialVimanaRig,
  DevaHelperRig,
} from "../characters/ApsaraAndMusicians";
import { BackgroundCrowdBand } from "../characters/DetailedGanasAndSpirits";
import { getBedEnergy, getSmoothVoEnergy } from "../timeline";

// S01 (00:00 - 00:15, 900 frames) — Dynamic 3-Shot Cinematic Hook synced line-by-line to VO!
// Shot 1A (0–285f, 0.0–4.75s): "शंकर जी की बारात की तैयारी हो रही है। आहा!" -> Sweeping Aerial Push-In over Bustling Devaloka Courtyard + Grand Hook Crest
// Shot 1B (285–575f, 4.75–9.6s): "लगे सँवारन सकल सुर, वाहन विविध विमान।" -> Crisp Cut to Celestial Vahana Courtyard (Devtas polishing & garlanding Vimanas!)
// Shot 1C (575–900f, 9.6–15.0s): "होई शगुन मंगल शुभद, करहिं अप्सरा गान।" -> Swoop-In to Golden Lotus Mandap (3 Apsaras + Shankh/Dholak + Petal Shower!)
export const S01Prep: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const vo = getSmoothVoEnergy(frame);
  const bed = getBedEnergy(frame);

  // Shot 1A (0..285): Grand Aerial Tilt-Down & Push-In
  const s1CamY = interpolate(frame, [0, 285], [-115, 0], { extrapolateRight: "clamp" });
  const s1CamX = interpolate(frame, [0, 285], [-38, 28], { extrapolateRight: "clamp" });
  const s1Zoom = interpolate(frame, [0, 285], [1.02, 1.18], { extrapolateRight: "clamp" });
  const titlePop = spring({ frame, fps, config: { damping: 12, stiffness: 85 } });

  // Shot 1B (285..575): Dynamic Tracking Pan across Vahana Hangar
  const s2Local = Math.max(0, frame - 285);
  const s2CamX = interpolate(s2Local, [0, 290], [110, -110], { extrapolateRight: "clamp" });
  const s2Zoom = interpolate(s2Local, [0, 290], [1.05, 1.15], { extrapolateRight: "clamp" });

  // Shot 1C (575..900): Sweeping Zoom-In into Lotus Mandap Stage
  const s3Local = Math.max(0, frame - 575);
  const s3Zoom = interpolate(s3Local, [0, 325], [1.0, 1.16], { extrapolateRight: "clamp" });
  const s3CamY = interpolate(s3Local, [0, 325], [-40, 15], { extrapolateRight: "clamp" });

  // Crisp 10-frame cinematic cross-dissolves at exact voice beat cuts
  const cut1to2 = interpolate(frame, [275, 290], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cut2to3 = interpolate(frame, [565, 580], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const renderToransAndDiyas = () => (
    <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const x0 = i * 320;
        const sway = Math.sin(frame * 0.05 + i) * 6;
        return (
          <g key={i}>
            <path
              d={`M ${x0},0 Q ${x0 + 160},${95 + sway} ${x0 + 320},0`}
              fill="none"
              stroke="#f97316"
              strokeWidth={14}
              strokeDasharray="12 8"
              strokeLinecap="round"
            />
            <path
              d={`M ${x0},0 Q ${x0 + 160},${80 + sway} ${x0 + 320},0`}
              fill="none"
              stroke="#fde047"
              strokeWidth={6}
              strokeDasharray="4 16"
              strokeLinecap="round"
            />
            <g transform={`translate(${x0 + 160}, ${95 + sway}) rotate(${sway * 0.7})`}>
              <path d="M -12,0 Q 0,-8 12,0 L 18,28 L -18,28 Z" fill="#fbbf24" stroke="#92400e" strokeWidth={2} />
              <circle cx={0} cy={31} r={5} fill="#ef4444" />
            </g>
          </g>
        );
      })}
      {[210, 460, 720, 1200, 1460, 1710].map((dx, idx) => {
        const flicker = 1 + Math.sin(frame * 0.35 + idx * 2) * 0.14 + vo * 0.18;
        return (
          <g key={idx} transform={`translate(${dx}, 815)`}>
            <ellipse cx={0} cy={12} rx={24} ry={8} fill="#b45309" stroke="#fde047" strokeWidth={2} />
            <ellipse cx={0} cy={-8} rx={9 * flicker} ry={18 * flicker} fill="#ffedd5" opacity={0.95} />
            <circle cx={0} cy={-10} r={28 * flicker} fill="#fbbf24" opacity={0.28} />
          </g>
        );
      })}
    </svg>
  );

  return (
    <AbsoluteFill>
      {/* SHOT 1A (0 - 4.75s): Bustling Devaloka Courtyard Hook + Aerial Push-In */}
      {cut1to2 < 1 && (
        <AbsoluteFill style={{ opacity: 1 - cut1to2 }}>
          <ParallaxStage mode="devaloka" cameraX={s1CamX} cameraY={s1CamY} zoom={s1Zoom}>
            {renderToransAndDiyas()}
            <BackgroundCrowdBand mode="devaloka" y={685} />

            {/* Sky Vimanas sweeping across background */}
            <CelestialVimanaRig x={interpolate(frame, [0, 290], [-180, 1380])} y={295} scale={0.72} />
            <CelestialVimanaRig x={interpolate(frame, [0, 290], [2060, 620])} y={365} scale={0.56} flipX />

            {/* Full-Bodied Devtas Hanging Garlands, Hoisting Banners & Blowing Shankh! */}
            <DevaHelperRig x={280} y={715} scale={0.95} pose="banner" dhotiColor="#ea580c" phase={0} />
            <DevaHelperRig x={540} y={725} scale={0.92} pose="garland" dhotiColor="#db2777" phase={0.8} />
            <CelestialMusicianRig x={795} y={735} instrument="shankh" scale={0.92} energy={vo + bed} />
            <CelestialMusicianRig x={1125} y={735} instrument="shankh" scale={0.92} energy={vo + bed} flipX />
            <DevaHelperRig x={1380} y={725} scale={0.92} pose="garland" dhotiColor="#0284c7" phase={1.5} />
            <DevaHelperRig x={1640} y={715} scale={0.95} pose="banner" dhotiColor="#d97706" phase={2.1} flipX />

            {/* Grand Animated Hook Title Crest */}
            <div
              style={{
                position: "absolute",
                top: 155,
                left: 0,
                right: 0,
                textAlign: "center",
                transform: `scale(${0.86 + 0.14 * titlePop})`,
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  fontFamily: "'Yatra One', 'Rozha One', 'Noto Sans Devanagari', serif",
                  fontSize: 96,
                  color: "#fffbeb",
                  textShadow: "0 8px 34px rgba(124, 45, 18, 0.9), 0 4px 12px rgba(0,0,0,0.8)",
                }}
              >
                महादेव की बारात
              </div>
              <div
                style={{
                  display: "inline-block",
                  padding: "9px 30px",
                  borderRadius: 999,
                  background: "rgba(38, 12, 42, 0.85)",
                  border: "2px solid #fde047",
                  fontFamily: "'Noto Sans Devanagari', sans-serif",
                  fontSize: 27,
                  fontWeight: 700,
                  color: "#fde047",
                  marginTop: 8,
                  letterSpacing: 1.2,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.45)",
                }}
              >
                देवलोक में भव्य तैयारियाँ • महाविवाह प्रसंग
              </div>
            </div>
          </ParallaxStage>
        </AbsoluteFill>
      )}

      {/* SHOT 1B (4.75s - 9.6s): "लगे सँवारन सकल सुर, वाहन विविध विमान" — Vahana Courtyard Cut! */}
      {cut1to2 > 0 && cut2to3 < 1 && (
        <AbsoluteFill style={{ opacity: Math.min(cut1to2, 1 - cut2to3) }}>
          <ParallaxStage mode="devaloka" cameraX={s2CamX} cameraY={-12} zoom={s2Zoom}>
            {renderToransAndDiyas()}
            <BackgroundCrowdBand mode="devaloka" y={685} />

            {/* Sky Fleet Passing Overhead */}
            <CelestialVimanaRig x={interpolate(s2Local, [0, 300], [-200, 1950])} y={245} scale={0.58} />

            {/* Twin Hero Royal Vimanas Being Polished & Decorated by Devtas */}
            <CelestialVimanaRig x={560} y={560} scale={1.18} />
            <CelestialVimanaRig x={1360} y={565} scale={1.12} flipX />

            {/* Devta Crew Polishing Wheels, Draping Garlands & Raising Banners */}
            <DevaHelperRig x={315} y={710} scale={1.04} pose="polish" dhotiColor="#f59e0b" phase={0.3} />
            <DevaHelperRig x={785} y={715} scale={1.02} pose="garland" dhotiColor="#ec4899" phase={1.2} />
            <DevaHelperRig x={1125} y={715} scale={1.02} pose="polish" dhotiColor="#0284c7" phase={2.1} flipX />
            <DevaHelperRig x={1605} y={710} scale={1.04} pose="banner" dhotiColor="#ea580c" phase={0.7} flipX />

            {/* Dynamic Callout Badge */}
            <div
              style={{
                position: "absolute",
                top: 145,
                left: "50%",
                transform: "translateX(-50%)",
                padding: "10px 30px",
                borderRadius: 999,
                background: "rgba(36, 12, 46, 0.85)",
                border: "2px solid #fde047",
                color: "#fde047",
                fontFamily: "'Yatra One', 'Noto Sans Devanagari', serif",
                fontSize: 34,
                boxShadow: "0 10px 28px rgba(0,0,0,0.45)",
              }}
            >
              ✦ देवताओं के दिव्य विमान एवं रथ सजने लगे ✦
            </div>
          </ParallaxStage>
        </AbsoluteFill>
      )}

      {/* SHOT 1C (9.6s - 15.0s): "होई शगुन मंगल शुभद, करहिं अप्सरा गान" — Lotus Mandap Stage Swoop-In! */}
      {cut2to3 > 0 && (
        <AbsoluteFill style={{ opacity: cut2to3 }}>
          <ParallaxStage mode="devaloka" cameraX={Math.sin(s3Local * 0.03) * 28} cameraY={s3CamY} zoom={s3Zoom}>
            {renderToransAndDiyas()}
            <BackgroundCrowdBand mode="devaloka" y={685} />

            {/* Carved Golden Lotus Mandap Pedestal in Center */}
            <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
              <g transform="translate(960, 770)">
                <ellipse cx={0} cy={45} rx={360} ry={46} fill="#6b2149" stroke="#fbbf24" strokeWidth={3} />
                <ellipse cx={0} cy={28} rx={310} ry={36} fill="#9d174d" stroke="#fde047" strokeWidth={2.5} />
                {[-220, -145, -72, 0, 72, 145, 220].map((px, idx) => (
                  <path key={idx} d={`M ${px - 32},28 Q ${px},-2 ${px + 32},28`} fill="#ec4899" stroke="#fde047" strokeWidth={2} />
                ))}
              </g>
            </svg>

            {/* Graceful Apsaras Performing Shagun Nritya + Mangala Shankh/Dholak */}
            <CelestialMusicianRig x={265} y={710} instrument="dholak" scale={1.0} energy={bed + vo * 0.4} />
            <ApsaraRig x={655} y={620} scale={1.06} colorScheme="emerald" phase={0.7} energy={vo + bed * 0.4} />
            <ApsaraRig x={960} y={590} scale={1.2} colorScheme="rose" phase={0} energy={vo + bed * 0.5} />
            <ApsaraRig x={1265} y={620} scale={1.06} colorScheme="gold" phase={1.5} energy={vo + bed * 0.4} />
            <CelestialMusicianRig x={1655} y={710} instrument="shehnai" scale={1.0} energy={bed + vo * 0.4} flipX />
          </ParallaxStage>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
