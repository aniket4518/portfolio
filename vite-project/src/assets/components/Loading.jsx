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
      timeout = setTimeout(() => setShow(false), 15000);
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
        style={{ width: "100vw", height: "100vh", background: "#000"}}
      >
        <ambientLight intensity={5}color="#fff" />
        {/* <directionalLight position={[5, 10, 7]} intensity={2} color="#fff" /> */}
       <Phoenix/>
        <Html>
          <div style={{
            position: "absolute",
            top: "70%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 320,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px"
          }}>
            {/* Loading Percentage */}
            <div style={{
              fontSize: 28,
              color: "#fff",
              fontWeight: 700,
              letterSpacing: 3,
              textShadow: "0 4px 12px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6)",
              background: "rgba(0,0,0,0.3)",
              padding: "12px 28px",
              borderRadius: 12,
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.1)"
            }}>
              {progress.toFixed(0)}%
            </div>
            
            {/* Loading Bar */}
            <div style={{
              width: 280,
              height: 16,
              background: "rgba(255,255,255,0.2)",
              borderRadius: 8,
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              border: "1px solid rgba(255,255,255,0.1)"
            }}>
              <div style={{
                width: `${progress}%`,
                height: "100%",
                background: "linear-gradient(90deg, #fff, #f0f0f0)",
                transition: "width 0.3s ease",
                boxShadow: "0 0 10px rgba(255,255,255,0.5)"
              }} />
            </div>
            
            {/* LOADING Text */}
            <div style={{
              fontSize: 28,
              fontWeight: 900,
              letterSpacing: 12,
              color: "#fff",
              textShadow: "0 4px 12px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6)",
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
                  0% { transform: translateY(0); color: #fff; text-shadow: 0 4px 12px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6); }
                  50% { transform: translateY(-10px); color: #fff; text-shadow: 0 6px 16px rgba(0,0,0,0.9), 0 3px 6px rgba(0,0,0,0.7); }
                  100% { transform: translateY(0); color: #fff; text-shadow: 0 4px 12px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6); }
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