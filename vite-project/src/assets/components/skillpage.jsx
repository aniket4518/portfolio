import React from "react";
import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

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
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
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

export function Skills3DBox({ position = [4, 1.5, 14] }) {
  // Split skills into two rows
  const mid = Math.ceil(skills.length / 2);
  const row1 = skills.slice(0, mid);
  const row2 = skills.slice(mid);

  return (
    <group position={position}>
      {/* First row */}
      <group position={[0, 0.6, 0]}>
        {row1.map((skill, i) => (
          <group
            key={skill.name}
            position={[i * 1.1, 0, 0]}
            rotation={[0, 0, 0]}
          >
            {/* Skill Box */}
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#222" roughness={0.5} metalness={0.2} />
            </mesh>
            {/* Logo */}
            <Html
              position={[0, 0.35, 0.55]}
              transform
              occlude
              style={{
                width: 24,
                height: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(255,255,255,0.85)",
                borderRadius: "6px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              <img src={skill.logo} alt={skill.name} style={{ width: 16, height: 16 }} />
            </Html>
            {/* Skill Name */}
            <Html position={[0, -0.55, 0.55]} center style={{ color: "#fff", fontWeight: "bold", fontSize: 10 }}>
              {skill.name}
            </Html>
            {/* Proficiency Bar */}
            <mesh position={[0, -0.35, 0.55]}>
              <boxGeometry args={[0.7, 0.09, 0.05]} />
              <meshStandardMaterial color="#888" />
            </mesh>
            <mesh position={[-0.35 + skill.proficiency * 0.7 / 2, -0.35, 0.58]}>
              <boxGeometry args={[0.7 * skill.proficiency, 0.09, 0.06]} />
              <meshStandardMaterial color={skill.color} emissive={skill.color} emissiveIntensity={0.7} />
            </mesh>
          </group>
        ))}
      </group>
      {/* Second row */}
      <group position={[0, -0.6, 0]}>
        {row2.map((skill, i) => (
          <group
            key={skill.name}
            position={[i * 1.1, 0, 0]}
            rotation={[0, 0, 0]}
          >
            {/* Skill Box */}
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#222" roughness={0.5} metalness={0.2} />
            </mesh>
            {/* Logo */}
            <Html
              position={[0, 0.35, 0.55]}
              transform
              occlude
              style={{
                width: 24,
                height: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(255,255,255,0.85)",
                borderRadius: "6px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              <img src={skill.logo} alt={skill.name} style={{ width: 16, height: 16 }} />
            </Html>
            {/* Skill Name */}
            <Html position={[0, -0.55, 0.55]} center style={{ color: "#fff", fontWeight: "bold", fontSize: 10 }}>
              {skill.name}
            </Html>
            {/* Proficiency Bar */}
            <mesh position={[0, -0.35, 0.55]}>
              <boxGeometry args={[0.7, 0.09, 0.05]} />
              <meshStandardMaterial color="#888" />
            </mesh>
            <mesh position={[-0.35 + skill.proficiency * 0.7 / 2, -0.35, 0.58]}>
              <boxGeometry args={[0.7 * skill.proficiency, 0.09, 0.06]} />
              <meshStandardMaterial color={skill.color} emissive={skill.color} emissiveIntensity={0.7} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
