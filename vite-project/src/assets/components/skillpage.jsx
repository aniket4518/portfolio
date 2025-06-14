import React, { useMemo } from "react";
import { Instance, Instances, Text } from "@react-three/drei";
import * as THREE from 'three';

// Example skills data
const skills = [
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    proficiency: 0.9,
    color: "#f7df1e",
  },
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    proficiency: 0.85,
    color: "#61dafb",
  },
  {
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    proficiency: 0.8,
    color: "#3c873a",
  },
  {
    name: "Python",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    proficiency: 0.75,
    color: "#3776ab",
  },
  {
    name: "MongoDB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    proficiency: 0.8,
    color: "#47A248",
  },
  {
    name: "Express",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    proficiency: 0.75,
    color: "#222",
  },
  {
    name: "Tailwind",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    proficiency: 0.7,
    color: "#38bdf8",
  },
  {
    name: "Postgres",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    proficiency: 0.7,
    color: "#336791",
  },
  {
    name: "Three.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
    proficiency: 0.65,
    color: "#000",
  },
  {
    name: "TypeScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    proficiency: 0.7,
    color: "#3178c6",
  },
];

// Use instancing for better performance with multiple similar objects
function SkillLogo({ url }) {
  // Memoize texture loading
  const texture = useMemo(() => new THREE.TextureLoader().load(url), [url]);
  return (
    <mesh position={[0, 0.35, 0.55]}>
      <planeGeometry args={[0.38, 0.38]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
}

export function Skills3DBox({ position = [4, 1.5, 14] }) {
  // Memoize skills to avoid re-creation on every render
  const memoizedSkills = useMemo(() => skills, []);

  // Split skills into rows
  const mid = Math.ceil(memoizedSkills.length / 2);
  const row1 = useMemo(() => memoizedSkills.slice(0, mid), [memoizedSkills, mid]);
  const row2 = useMemo(() => memoizedSkills.slice(mid), [memoizedSkills, mid]);
  
  // Create shared geometries and materials for better performance
  const boxGeometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
  const barGeometry = useMemo(() => new THREE.BoxGeometry(0.7, 0.09, 0.05), []);
  const boxMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#444", roughness: 0.5, metalness: 0.2 }), []);
  const barBackgroundMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#888" }), []);

  return (
    <group position={position}>
      {/* Use Instances component for the boxes */}
      <Instances geometry={boxGeometry} material={boxMaterial} limit={memoizedSkills.length}>
        {/* First row */}
        <group position={[0, 0.9, 0]}>
          {row1.map((skill, i) => (
            <React.Fragment key={skill.name}>
              <Instance position={[i * 1.1, 0, 0]} />
              <group position={[i * 1.1, 0, 0]}>
                {/* 3D Logo */}
                <SkillLogo url={skill.logo} />
                {/* 3D Skill Name */}
                <Text
                  position={[0, -0.55, 0.55]}
                  fontSize={0.16}
                  color="#fff"
                  anchorX="center"
                  anchorY="middle"
                  outlineColor="#000"
                  outlineWidth={0.008}
                  fontWeight="bold"
                  depthOffset={-1}
                >
                  {skill.name}
                </Text>
                {/* Proficiency Bar */}
                <mesh position={[0, -0.35, 0.55]} geometry={barGeometry} material={barBackgroundMaterial} />
                <mesh 
                  position={[-0.35 + skill.proficiency * 0.7 / 2, -0.35, 0.58]}
                  geometry={new THREE.BoxGeometry(0.7 * skill.proficiency, 0.09, 0.06)}
                >
                  <meshStandardMaterial 
                    color={skill.color} 
                    emissive={skill.color} 
                    emissiveIntensity={0.3}
                  />
                </mesh>
              </group>
            </React.Fragment>
          ))}
        </group>
        {/* Second row */}
        <group position={[0, -0.6, 0]}>
          {row2.map((skill, i) => (
            <React.Fragment key={skill.name}>
              <Instance position={[i * 1.1, 0, 0]} />
              <group position={[i * 1.1, 0, 0]}>
                {/* 3D Logo */}
                <SkillLogo url={skill.logo} />
                {/* 3D Skill Name */}
                <Text
                  position={[0, -0.55, 0.55]}
                  fontSize={0.16}
                  color="#fff"
                  anchorX="center"
                  anchorY="middle"
                  outlineColor="#000"
                  outlineWidth={0.008}
                  fontWeight="bold"
                  depthOffset={-1}
                >
                  {skill.name}
                </Text>
                {/* Proficiency Bar */}
                <mesh position={[0, -0.35, 0.55]} geometry={barGeometry} material={barBackgroundMaterial} />
                <mesh 
                  position={[-0.35 + skill.proficiency * 0.7 / 2, -0.35, 0.58]}
                  geometry={new THREE.BoxGeometry(0.7 * skill.proficiency, 0.09, 0.06)}
                >
                  <meshStandardMaterial 
                    color={skill.color} 
                    emissive={skill.color} 
                    emissiveIntensity={0.3}
                  />
                </mesh>
              </group>
            </React.Fragment>
          ))}
        </group>
      </Instances>
    </group>
  );
}
