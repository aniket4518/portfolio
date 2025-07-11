import React, { useMemo, useRef } from 'react';
import { Text, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Projects data array
const projectsData = [
  {
    id: 1,
    title: "Farmconnect",
    description: "Full-stack e-commerce solution with React & Node.js",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "/texture/PROJECT.png",
    link: "https://github.com/your-username/ecommerce",
    color: "#4F46E5"
  },
  {
    id: 2,
    title: "webMaker",
    description: "Collaborative task manager with real-time updates",
    tech: ["Vue.js", "Firebase", "Tailwind CSS"],
    image: "/texture/PROJECT.png",
    link: "https://github.com/your-username/task-manager",
    color: "#7C3AED"
  },
  {
    id: 3,
    title: "Mazegame",
    description: "Interactive weather app with beautiful animations",
    tech: ["React", "OpenWeather API", "Chart.js"],
    image: "/texture/PROJECT.png",
    link: "https://github.com/your-username/weather-app",
    color: "#2563EB"
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "3D interactive portfolio with Three.js",
    tech: ["React", "Three.js", "Vite"],
    image: "/texture/PROJECT.png",
    link: "https://github.com/your-username/portfolio",
    color: "#059669"
  },
  {
    id: 5,
    title: "Chat Application",
    description: "Real-time chat with rooms and file sharing",
    tech: ["Socket.io", "Express", "React"],
    image: "/texture/PROJECT.png",
    link: "https://github.com/your-username/chat-app",
    color: "#DC2626"
  },
  {
    id: 6,
    title: "AiHotel Booking ",
    description: "Content management system with rich editor",
    tech: ["React.js", "AI", "MongoDB"],
    image: "/texture/PROJECT.png",
    link: "https://github.com/aniket4518/hotelbookingtrial.git",
    color: "#EA580C"
  }
];

// Individual floating project card with high-speed wind animation
const FloatingProject = ({ project, position, index }) => {
  const groupRef = useRef();
  const projectTexture = useTexture(project.image);
  
   
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      
      // High-speed wind from left to right - stronger horizontal force
      const windForce = Math.sin(time * 1.2 + index * 0.4) * 0.8; // Stronger horizontal movement
      const windGust = Math.sin(time * 2.5 + index * 0.3) * 0.3; // Quick gusts
      
      // Vertical bobbing due to air turbulence - less than horizontal
      const verticalBob = Math.sin(time * 0.8 + index * 0.6) * 0.2;
      
      // Rotation due to wind resistance - stronger lean to the right
      const windLean = Math.sin(time * 1.0 + index * 0.5) * 0.25; // Lean with wind
      const backAndForth = Math.sin(time * 0.6 + index * 0.4) * 0.15; // Secondary sway
      
      // Apply realistic wind physics
      groupRef.current.position.x = position[0] + windForce + windGust;
      groupRef.current.position.y = position[1] + verticalBob;
      groupRef.current.position.z = position[2];
      
      // Apply wind-induced rotation (leaning with the wind)
      groupRef.current.rotation.z = windLean + backAndForth;
      groupRef.current.rotation.x = windForce * 0.1; // Slight forward lean due to wind
    }
  });

  return (
    <group ref={groupRef} position={position} scale={0.8}>
      {/* Project card mesh - 20% smaller and shorter */}
      <mesh>
        <planeGeometry args={[1.76, 1.76]} />
        <meshStandardMaterial
          color={project.color}
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Project image - 20% smaller */}
      <mesh position={[0, 0.32, 0.01]}>
        <planeGeometry args={[1.44, 0.64]} />
        <meshStandardMaterial
          map={projectTexture}
          transparent
          opacity={0.95}
        />
      </mesh>
      
      {/* Project title as 3D text - adjusted for smaller size */}
      <Text
        position={[0, -0.08, 0.01]}
        fontSize={0.14}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {project.title}
      </Text>
      
      {/* Project description as 3D text - adjusted for smaller size */}
      <Text
        position={[0, -0.28, 0.01]}
        fontSize={0.08}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {project.description.substring(0, 40)}...
      </Text>
      
      {/* Tech stack as 3D text - adjusted for smaller size */}
      <Text
        position={[0, -0.48, 0.01]}
        fontSize={0.06}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.6}
      >
        {project.tech.slice(0, 3).join(" • ")}
      </Text>
      
      {/* Rope visualization - adjusted for perfect connection to beam */}
      <mesh position={[0, 1.7, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 1.4]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </group>
  );
};

// Main static projects component
export const FloatingProjects = ({ dark }) => {

  // Calculate fixed positions in a 3x2 matrix at the board location
  const positions = useMemo(() => {
    const positions = [];
    const cols = 3;
    const rows = 2;
    const spacing = 2.2; // Reduced spacing between hanging projects for tighter layout
    
    // Base position where Board was located - moved down for better visibility
    const baseX = -5.5;
    const baseY = 1.2; // Moved down from 2.8 to 1.2 (1.6 units lower)
    const baseZ = 29;
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = baseX + (col - 1) * spacing; // Center the 3 columns around baseX
        const y = baseY + (row * 1.6); // Further reduced gap between rows for compact layout
        const z = baseZ - 2; // Position in front of where board was
        positions.push([x, y, z]);
      }
    }
    
    return positions;
  }, []);

  return (
    <group>
      {/* Title positioned above the hanging projects - moved down */}
        {/*  */}
      
      {/* Hanging support beam - moved down for better visibility */}
      <mesh position={[-5.5, 4.2, 28]} rotation={[0, 0, 0]}>
        <boxGeometry args={[6, 0.15, 0.15]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Floating project cards hanging like pendulums */}
      {projectsData.map((project, index) => (
        <FloatingProject
          key={project.id}
          project={project}
          position={positions[index]}
          index={index}
        />
      ))}
    </group>
  );
};

export default FloatingProjects;
