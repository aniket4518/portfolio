import { Text3D, useTexture } from "@react-three/drei";
import React, { useRef, useState, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three';

// Define glow colors only once
const glowColors = [
  "#ff4b1f", "#1fa2ff", "#12ff7c", "#fffbe6", "#ff61f6", "#fffb00", "#00fff7"
];

function GlowingMaterial({ dark }) {
  const meshRef = useRef();
  const [colorIdx, setColorIdx] = useState(0);
  const updateInterval = useRef(null);
  
  // Reduce material updates by using intervals instead of per-frame updates
  useEffect(() => {
    if (dark) {
      // Update color every 500ms instead of every frame
      updateInterval.current = setInterval(() => {
        const newIdx = (colorIdx + 1) % glowColors.length;
        setColorIdx(newIdx);
        if (meshRef.current) {
          meshRef.current.color.set(glowColors[newIdx]);
          meshRef.current.emissive.set(glowColors[newIdx]);
        }
      }, 500);
    }
    
    return () => {
      if (updateInterval.current) clearInterval(updateInterval.current);
    };
  }, [dark, colorIdx]);

  // Create materials only once for better performance
  const darkMaterial = useMemo(() => {
    return <meshPhysicalMaterial
      ref={meshRef}
      color={glowColors[0]}
      emissive={glowColors[0]}
      emissiveIntensity={1.5} // Reduced from 2
      roughness={0.2}
      metalness={0.5}
      clearcoat={1}
    />
  }, []);
  
  const lightMaterial = useMemo(() => {
    return <meshStandardMaterial color="#f5f3ee" />
  }, []);

  return dark ? darkMaterial : lightMaterial;
}

// Create optimized text components with shared geometry
const createTextComponent = (text, position, size, dark) => {
  // Use bevelEnabled: false for simpler geometry
  const textOptions = {
    font: "/fonts/Inter_Bold.json",
    size: size || 1,
    height: 0.2,
    bevelEnabled: false,
    bevelSize: 0,
    bevelThickness: 0
  };
  
  return (
    <Text3D 
      {...textOptions}
      position={position}
      rotation={[0, Math.PI / 4, 0]}
    >
      {text}
      <GlowingMaterial dark={dark} />
    </Text3D>
  );
};

// Use React.memo to prevent unnecessary re-renders
export const Page = React.memo(({ dark }) => 
  createTextComponent("HOME", [-5, 0, -3], 1, dark)
);

export const SkillsPage = React.memo(({ dark }) => 
  createTextComponent("SKILLS", [-3, 0, 16], 0.5, dark)
);

export const ProjectsPage = React.memo(({ dark }) => 
  createTextComponent("PROJECTS", [-5, 0, 32], 0.5, dark)
);

export const ContactsPage = React.memo(({ dark }) => 
  createTextComponent("CONTACTS", [-5, 0, 48], 0.5, dark)
);
