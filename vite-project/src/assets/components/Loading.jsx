import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useProgress, Html } from "@react-three/drei";

// Spinning box component
function SpinningBox(props) {
  const mesh = useRef();
  useFrame(({ clock }) => {
    if (mesh.current) {
      // Spin
      mesh.current.rotation.x += 0.03;
      mesh.current.rotation.y += 0.04;
      // Bounce up and down
      mesh.current.position.y = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.5;
      // Pulse scale
      const scale = 1.2 + Math.sin(clock.getElapsedTime() * 3) * 0.2;
      mesh.current.scale.set(scale, scale, scale);
      // Remove color shift, keep it black
      // mesh.current.material.color.setHSL((t * 0.2) % 1, 0.7, 0.4);
    }
  });
  return (
    <mesh ref={mesh} {...props}>
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <meshStandardMaterial color="#000" />
    </mesh>
  );
}

// Spinning "voxel" box made of small cubes
function VoxelBox(props) {
  const group = useRef();
  useFrame(({ clock }) => {
    if (group.current) {
      // Spin
      group.current.rotation.x += 0.03;
      group.current.rotation.y += 0.04;
      // Bounce up and down
      group.current.position.y = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.5;
      // Pulse scale for the whole group
      const scale = 1.2 + Math.sin(clock.getElapsedTime() * 3) * 0.2;
      group.current.scale.set(scale, scale, scale);
    }
  });

  // Create a 3x3x3 grid of small cubes (skip center for a hollow look)
  const cubes = [];
  const size = 0.38;
  let colorIndex = 0;
  const palette = [
    "#e6194b", "#3cb44b", "#ffe119", "#4363d8", "#f58231", "#911eb4", "#46f0f0",
    "#f032e6", "#bcf60c", "#fabebe", "#008080", "#e6beff", "#9a6324", "#fffac8",
    "#800000", "#aaffc3", "#808000", "#ffd8b1", "#000075", "#808080", "#ffffff",
    "#000000", "#a9a9a9", "#bada55", "#ff69b4", "#1e90ff"
  ];

  // Each cube gets its own ref for animation
  function AnimatedCube({ position, color, delay }) {
    const mesh = useRef();
    useFrame(({ clock }) => {
      if (mesh.current) {
        // Pop in/out with a sine wave, phase shifted by delay
        const t = clock.getElapsedTime();
        const pop = 0.7 + Math.abs(Math.sin(t * 2 + delay)) * 0.7;
        mesh.current.scale.set(pop, pop, pop);
      }
    });
    return (
      <mesh ref={mesh} position={position}>
        <boxGeometry args={[size * 0.95, size * 0.95, size * 0.95]} />
        <meshStandardMaterial color={color} />
      </mesh>
    );
  }

  let cubeIdx = 0;
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        if (x === 0 && y === 0 && z === 0) continue;
        const color = palette[cubeIdx % palette.length];
        // Use a unique delay for each cube for a wave effect
        const delay = (x + 1) * 0.3 + (y + 1) * 0.5 + (z + 1) * 0.7;
        cubes.push(
          <AnimatedCube
            key={`${x},${y},${z}`}
            position={[x * size, y * size, z * size]}
            color={color}
            delay={delay}
          />
        );
        cubeIdx++;
      }
    }
  }

  return (
    <group ref={group} {...props}>
      {cubes}
    </group>
  );
}

export function Loading() {
  const { progress, loaded, total } = useProgress();
  const [show, setShow] = useState(true);

  useEffect(() => {
    let timeout;
    if (loaded === total && total > 0) {
      // Minimum loading time: 2 seconds
      timeout = setTimeout(() => setShow(false), 5000);
    }
    return () => clearTimeout(timeout);
  }, [loaded, total]);

  if (!show) return null;

  return (
    <div style={{
      position: "fixed", left: 0, top: 0, width: "100vw", height: "100vh",
      background: "#fff",
      color: "#222", zIndex: 10000, display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <Canvas
        camera={{ position: [0, 2, 8], fov: 50 }}
        style={{ width: "100vw", height: "100vh", background: "#fff" }}
      >
        <ambientLight intensity={2} color="#fff" />
        <directionalLight position={[5, 10, 7]} intensity={2} color="#fff" />
        <VoxelBox position={[0, 1, 0]} />
        <Html>
          <div style={{
            position: "absolute",
            top: "85%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 320,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <div style={{
              fontSize: 24,
              color: "#222",
              marginBottom: 18,
              fontWeight: 600,
              letterSpacing: 2,
              background: "rgba(255,255,255,0.85)",
              padding: "8px 24px",
              borderRadius: 8,
              boxShadow: "0 2px 8px rgba(0,0,0,0.10)"
            }}>
              {progress.toFixed(0)}%
            </div>
            <div style={{
              width: 260,
              height: 14,
              background: "#eee",
              borderRadius: 7,
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
            }}>
              <div style={{
                width: `${progress}%`,
                height: "100%",
                background: "#111",
                transition: "width 0.2s"
              }} />
            </div>
            {/* Unique animated loading text */}
            <div style={{
              marginTop: 22,
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 8,
              color: "#000",
              textShadow: "0 2px 8px rgba(0,0,0,0.10)",
              textTransform: "uppercase",
              animation: "loading-bounce 1.2s infinite alternate"
            }}>
              <span style={{
                display: "inline-block",
                animation: "loading-letter 1s infinite alternate"
              }}>L</span>
              <span style={{
                display: "inline-block",
                animation: "loading-letter 1s 0.1s infinite alternate"
              }}>O</span>
              <span style={{
                display: "inline-block",
                animation: "loading-letter 1s 0.2s infinite alternate"
              }}>A</span>
              <span style={{
                display: "inline-block",
                animation: "loading-letter 1s 0.3s infinite alternate"
              }}>D</span>
              <span style={{
                display: "inline-block",
                animation: "loading-letter 1s 0.4s infinite alternate"
              }}>I</span>
              <span style={{
                display: "inline-block",
                animation: "loading-letter 1s 0.5s infinite alternate"
              }}>N</span>
              <span style={{
                display: "inline-block",
                animation: "loading-letter 1s 0.6s infinite alternate"
              }}>G</span>
            </div>
            <style>
              {`
                @keyframes loading-letter {
                  0% { transform: translateY(0); color: #000; }
                  50% { transform: translateY(-10px); color: #444; }
                  100% { transform: translateY(0); color: #000; }
                }
              `}
            </style>
          </div>
        </Html>
      </Canvas>
    </div>
  );
}

export default Loading;
