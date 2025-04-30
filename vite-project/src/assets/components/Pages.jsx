import { Text3D } from "@react-three/drei";
import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

// Array of glow colors for dark mode
const glowColors = [
  "#ff4b1f", // orange-red
  "#1fa2ff", // blue
  "#12ff7c", // green
  "#fffbe6", // yellowish
  "#ff61f6", // magenta
  "#fffb00", // bright yellow
  "#00fff7", // cyan
];

function GlowingMaterial({ dark }) {
  const meshRef = useRef();
  const [colorIdx, setColorIdx] = useState(0);

  useFrame((state, delta) => {
    if (dark && meshRef.current) {
      // Change color every ~0.5s
      const t = Math.floor(state.clock.getElapsedTime() * 2) % glowColors.length;
      if (t !== colorIdx) setColorIdx(t);
      meshRef.current.color.set(glowColors[t]);
      meshRef.current.emissive.set(glowColors[t]);
    }
  });

  if (dark) {
    return (
      <meshPhysicalMaterial
        ref={meshRef}
        color={glowColors[colorIdx]}
        emissive={glowColors[colorIdx]}
        emissiveIntensity={2}
        roughness={0.2}
        metalness={0.5}
        clearcoat={1}
      />
    );
  }
  return <meshStandardMaterial color="#f5f3ee" />;
}

export const Page = ({ dark }) => (
  <Text3D font={"/fonts/Inter_Bold.json"} size={1} height={0.2} position={[-5, 0, -3]} rotation={[0, Math.PI / 4, 0]}>
    HOME
    <GlowingMaterial dark={dark} />
  </Text3D>
);

export const SkillsPage = ({ dark }) => (
  <Text3D font={"/fonts/Inter_Bold.json"} size={0.5} height={0.2} position={[-3, 0, 16]} rotation={[0, Math.PI / 4, 0]}>
    SKILLS
    <GlowingMaterial dark={dark} />
  </Text3D>
);

export const ProjectsPage = ({ dark }) => (
  <Text3D font={"/fonts/Inter_Bold.json"} size={0.5} height={0.2} position={[-5, 0, 32]} rotation={[0, Math.PI / 4, 0]}>
    PROJECTS
    <GlowingMaterial dark={dark} />
  </Text3D>
);

export const ContactsPage = ({ dark }) => (
  <Text3D font={"/fonts/Inter_Bold.json"} size={0.5} height={0.2} position={[-5, 0, 48]} rotation={[0, Math.PI / 4, 0]}>
    CONTACTS
    <GlowingMaterial dark={dark} />
  </Text3D>
);
