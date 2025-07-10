import React, { useRef, useState, Suspense } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

// Skills configuration arranged in 3x2 grids on both sides
const SKILLS = [
  // Left Side - 3x2 Grid (3 columns, 2 rows)
  // Top Row
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    position: [-5, -1, 9], // Left column
  },
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    position: [-3.5, -1, 9], // Center column
  },
  {
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    position: [-2, -1, 9], // Right column
  },
  // Bottom Row
  {
    name: "Python",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    position: [-5, -2.5, 9], // Left column
  },
  {
    name: "MongoDB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    position: [-3.5, -2.5, 9], // Center column
  },
  {
    name: "Express",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    position: [-2, -2.5, 9], // Right column
  },
  
  // Right Side - 3x2 Grid (3 columns, 2 rows)
  // Top Row
  {
    name: "Git",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    position: [2, -2.5, 9], // Left column
  },
  {
    name: "Docker",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    position: [3.5, -2.5, 9], // Center column
  },
  {
    name: "TypeScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    position: [5, -2.5, 9], // Right column
  },
  // Bottom Row
  {
    name: "HTML",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    position: [2, -1, 9], // Left column
  },
  {
    name: "CSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    position: [3.5, -1, 9], // Center column
  },
  {
    name: "Tailwind",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    position: [5, -1, 9], // Right column
  },
];

// Preload textures for optimal performance
SKILLS.forEach(skill => {
  useTexture.preload(skill.logo);
});

// Floating 3D logo component with water-filling effect
function FloatingLogo({ skill, position, index }) {
  const meshRef = useRef();
  const waterRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [fillProgress, setFillProgress] = useState(0);
  const texture = useTexture(skill.logo);
  
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    
    const time = clock.elapsedTime;
    const offset = index * 0.5;
    
    // Normal floating animation only
    meshRef.current.position.y = position[1] + Math.sin(time + offset) * 0.1;
    
    // Shaking effect when hovered
    if (hovered) {
      meshRef.current.position.x = position[0] + Math.sin(time * 20) * 0.05;
      meshRef.current.position.z = position[2] + Math.cos(time * 20) * 0.05;
      
      // Water filling animation - fills gradually
      setFillProgress(prev => Math.min(prev + 0.02, 1));
      
    } else {
      meshRef.current.position.x = position[0];
      meshRef.current.position.z = position[2];
      
      // Water draining animation
      setFillProgress(prev => Math.max(prev - 0.04, 0));
    }
    
    // Water positioning and shaking effect (perfectly synchronized with logo)
    if (waterRef.current && fillProgress > 0) {
      const intensity = hovered ? 1 : 0.3;
      
      // Calculate water position to fill from bottom (relative to logo position)
      const waterHeight = fillProgress * 0.8;
      const baseWaterY = position[1] - 0.4 + (waterHeight / 2);
      
      // Synchronize water shaking exactly with logo shaking
      const logoShakeX = hovered ? Math.sin(time * 20) * 0.05 : 0;
      const logoShakeZ = hovered ? Math.cos(time * 20) * 0.05 : 0;
      const logoShakeRotZ = hovered ? Math.sin(time * 15) * 0.1 : 0;
      
      // Set water position to exactly match logo position + shaking
      waterRef.current.position.x = position[0] + logoShakeX;
      waterRef.current.position.y = baseWaterY + Math.sin(time + offset) * 0.1; // Follow logo floating
      waterRef.current.position.z = position[2] - 0.06 + logoShakeZ;
      waterRef.current.rotation.z = logoShakeRotZ;
      
      // Keep water scale constant to match logo exactly (no size variations)
      waterRef.current.scale.set(1, 1, 1);
    }
  });

  // Calculate water height for geometry
  const waterHeight = fillProgress * 0.8;

  return (
    <group>
      {/* Water filling background - renders behind logo */}
      {fillProgress > 0 && (
        <mesh 
          ref={waterRef}
          position={[position[0], position[1] - 0.4, position[2] - 0.06]}
        >
          <boxGeometry args={[0.8, waterHeight, 0.1]} />
          <meshStandardMaterial 
            color="#0099ff"
            transparent
            opacity={0.7}
            emissive="#0066cc"
            emissiveIntensity={0.4}
            roughness={0.1}
            metalness={0.1}
          />
        </mesh>
      )}
      
      {/* Main logo mesh - renders in front */}
      <mesh 
        ref={meshRef} 
        position={position}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        <boxGeometry args={[0.8, 0.8, 0.1]} />
        <meshStandardMaterial map={texture} transparent />
      </mesh>
    </group>
  );
}

// Water background component
function WaterBackground() {
  const meshRef = useRef();
  
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    
    const time = clock.elapsedTime;
    meshRef.current.position.y = Math.sin(time * 0.5) * 0.1;
    meshRef.current.rotation.z = Math.sin(time * 0.3) * 0.05;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 8]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 20, 32, 32]} />
      <meshStandardMaterial 
        color="#0077be"
        transparent
        opacity={0.7}
        roughness={0.1}
        metalness={0.3}
      />
    </mesh>
  );
}

export function Skills3DBox({ position = [0, 3, 10] }) {
  return (
    <group position={position}>
      {/* Water background */}
      <WaterBackground />
      
      {/* Skills grid */}
      <Suspense fallback={null}>
        {SKILLS.map((skill, index) => (
          <FloatingLogo
            key={skill.name}
            skill={skill}
            position={skill.position}
            index={index}
          />
        ))}
      </Suspense>
    </group>
  );
}
 
