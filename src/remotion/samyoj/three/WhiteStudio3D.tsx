import React, { useMemo } from "react";
import * as THREE from "three";
import { ThreeCanvas } from "@remotion/three";
import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { THEME } from "../theme";
import { easeRange, outExpo } from "../motion/easing";

/**
 * Pure Three.js / R3F Hero Objects in White Studio Lighting.
 * Driven strictly by useCurrentFrame() (no useFrame()).
 * Renders soft white studio softbox reflections + glass/clearcoat materials.
 */

export const WhiteStudioRig: React.FC<{
  children: React.ReactNode;
  cameraPos?: [number, number, number];
  fov?: number;
}> = ({ children, cameraPos = [0, 0.15, 5.2], fov = 36 }) => {
  const { width, height } = useVideoConfig();

  return (
    <ThreeCanvas
      width={width}
      height={height}
      dpr={1}
      camera={{ position: cameraPos, fov }}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      style={{ background: "transparent" }}
    >
      {/* White studio key + fill + rim lighting */}
      <ambientLight intensity={0.85} color="#ffffff" />
      <directionalLight position={[-4, 5, 6]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[5, -2, 4]} intensity={0.55} color="#EEF0FF" />
      <pointLight position={[0, 2.5, -3]} intensity={1.2} color="#7A3BFF" distance={10} />

      <Environment resolution={256} frames={1}>
        <color attach="background" args={["#F8FAFF"]} />
        {/* Large softbox top-left */}
        <Lightformer
          form="rect"
          intensity={2.6}
          color="#FFFFFF"
          position={[-4, 4, 4]}
          scale={[6, 4, 1]}
          target={[0, 0, 0]}
        />
        {/* Vertical fill strip right */}
        <Lightformer
          form="rect"
          intensity={1.4}
          color="#EEF0FF"
          position={[5, 1, 2]}
          scale={[2, 6, 1]}
          target={[0, 0, 0]}
        />
        {/* Cool mint bounce bottom */}
        <Lightformer
          form="circle"
          intensity={0.9}
          color="#E6FAF3"
          position={[0, -4, 2]}
          scale={5}
          target={[0, 0, 0]}
        />
      </Environment>

      {children}
    </ThreeCanvas>
  );
};

/** 3D Frosted Glass Channel Chip (S04 convergence & hero floating accents) */
export const GlassChip3D: React.FC<{
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  scale?: number;
}> = ({ position, rotation, color, scale = 1 }) => {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Frosted glass body */}
      <RoundedBox args={[0.92, 0.92, 0.18]} radius={0.22} smoothness={4}>
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.72}
          thickness={0.45}
          roughness={0.14}
          ior={1.46}
          clearcoat={1}
          clearcoatRoughness={0.08}
          attenuationColor={color}
          attenuationDistance={1.5}
        />
      </RoundedBox>
      {/* Tinted inner core accent */}
      <RoundedBox args={[0.52, 0.52, 0.08]} radius={0.12} smoothness={3} position={[0, 0, 0.02]}>
        <meshStandardMaterial color={color} roughness={0.25} metalness={0.08} />
      </RoundedBox>
    </group>
  );
};

/** 3D Extruded Samyoj Hero Emblem for S03 Reveal & S11 Close */
export const SamyojBadge3D: React.FC<{
  enterProgress: number;
  orbitAngle: number;
  position?: [number, number, number];
  scale?: number;
}> = ({ enterProgress, orbitAngle, position = [0, 0.25, 0], scale = 1 }) => {
  const ringGeo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.absarc(0, 0, 0.95, 0, Math.PI * 2, false);
    const hole = new THREE.Path();
    hole.absarc(0, 0, 0.64, 0, Math.PI * 2, true);
    shape.holes.push(hole);
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.24,
      bevelEnabled: true,
      bevelThickness: 0.06,
      bevelSize: 0.05,
      bevelSegments: 4,
      curveSegments: 48,
    });
  }, []);

  const rotY = -0.35 + enterProgress * 0.35 + Math.sin(orbitAngle) * 0.14;
  const rotX = 0.18 - enterProgress * 0.12 + Math.cos(orbitAngle * 0.7) * 0.06;
  const s = scale * (0.65 + 0.35 * enterProgress);

  return (
    <group position={position} rotation={[rotX, rotY, 0]} scale={s}>
      {/* Extruded indigo ring */}
      <mesh geometry={ringGeo} position={[0, 0, -0.12]}>
        <meshPhysicalMaterial
          color={THEME.brand}
          roughness={0.18}
          metalness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.06}
        />
      </mesh>
      {/* Inner frosted glass disc */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.62, 0.62, 0.12, 48]} />
        <meshPhysicalMaterial
          color="#FFFFFF"
          transmission={0.68}
          thickness={0.3}
          roughness={0.12}
          clearcoat={1}
        />
      </mesh>
      {/* Sparkle node top-right */}
      <mesh position={[0.78, 0.74, 0.14]} rotation={[0, 0, Math.PI / 4]}>
        <octahedronGeometry args={[0.16, 0]} />
        <meshPhysicalMaterial
          color={THEME.brandDeep}
          emissive={THEME.brandDeep}
          emissiveIntensity={0.25}
          roughness={0.12}
          clearcoat={1}
        />
      </mesh>
    </group>
  );
};

/** 3D Test Scene to verify headless WebGL ANGLE/SwANGLE stability */
export const ThreeStudioSmokeTest: React.FC = () => {
  const frame = useCurrentFrame();
  const p = easeRange(frame, 0, 30, outExpo);
  return (
    <div style={{ width: 1920, height: 1080, background: "#FFFFFF", position: "relative" }}>
      <WhiteStudioRig>
        <SamyojBadge3D enterProgress={p} orbitAngle={frame * 0.03} scale={1.15} />
        <GlassChip3D position={[-2.1, 0.3, -0.4]} rotation={[0.2, 0.4, -0.1]} color={THEME.whatsapp} />
        <GlassChip3D position={[2.1, -0.25, -0.4]} rotation={[-0.15, -0.35, 0.1]} color={THEME.instagramPink} />
      </WhiteStudioRig>
    </div>
  );
};
