import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useProgress, Html } from "@react-three/drei";
 import { Phoenix } from "./Phoenix";

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
       <Phoenix/>
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
