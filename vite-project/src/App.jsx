import { Canvas, useThree } from "@react-three/fiber";
import './App.css'
import { Expoter } from "./assets/components/Expoter";
import { Suspense, useRef, useState, useEffect } from "react";
import { Menu } from "./assets/components/Header";
import { DarkModeProvider, DarkModeToggle, useDarkMode } from "./assets/components/darkmode";
import { useProgress } from "@react-three/drei";
import VirtualControls from "./assets/components/VirtualControls";
 
import Loading from "./assets/components/Loading";

// Mobile detection hook
const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobileDevice = width <= 768 || (width <= 1024 && height <= 768);
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
};

// Responsive camera settings
const ResponsiveCamera = ({ dark }) => {
  const { camera, size } = useThree();
  const isMobile = useMobile();
  
  useEffect(() => {
    // Use the same camera positioning logic for both mobile and desktop
    // Only difference should be FOV, not position
    camera.position.set(0, 2, 5); // Same position for both
    camera.fov = isMobile ? 50 : 42; // Different FOV for mobile
    camera.updateProjectionMatrix();
  }, [camera, isMobile, size]);
  
  return null;
};

function CanvasWithDarkMode() {
  const darkMode = useDarkMode();
  const dark = darkMode?.dark ?? false;
  const isMobile = useMobile();
  
  return (
    <Canvas 
      camera={{ 
        position: [0, 2, 5], // Same position for both mobile and desktop
        fov: isMobile ? 50 : 42 // Only FOV differs
      }}
      gl={{ 
        antialias: !isMobile, // Disable on mobile for performance
        alpha: false,
        powerPreference: isMobile ? "low-power" : "high-performance"
      }}
      dpr={isMobile ? [1, 1.5] : [1, 2]} // Lower pixel ratio on mobile
    >
      <color attach="background" args={[dark ? "#000" : "#f5f3ee"]} />
      <fog attach="fog" args={[dark ? "#000" : "#f5f3ee", 10, 30]} />
      <ResponsiveCamera dark={dark} />
      <Suspense fallback={null}>
        <Expoter dark={dark} isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
}

function App() {
  const { progress } = useProgress();
  const [showLoader, setShowLoader] = useState(true);
  const darkMode = useDarkMode();
  const dark = darkMode?.dark ?? false;
  const isMobile = useMobile();

  // Character movement handler
  const handleCharacterMove = (key, isPressed) => {
    // This will be passed to your 3D character component
    console.log(`Key ${key} ${isPressed ? 'pressed' : 'released'}`);
    
    // You can dispatch custom events or use a state management solution
    const event = new CustomEvent('characterMove', {
      detail: { key, isPressed, direction: getDirection(key) }
    });
    window.dispatchEvent(event);
  };

  const getDirection = (key) => {
    switch(key) {
      case 'w': return 'forward';
      case 's': return 'backward';
      case 'a': return 'left';
      case 'd': return 'right';
      default: return 'none';
    }
  };

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => setShowLoader(false), 900);
    }
  }, [progress]);

  return (
    <DarkModeProvider>
      {/* Only show Menu when not loading */}
      {!showLoader && <Menu />}
      <DarkModeToggle />
      {showLoader && <Loading />}
      {!showLoader && <CanvasWithDarkMode />}
      {/* Virtual Controls for Mobile */}
      {!showLoader && (
        <VirtualControls 
          onMove={handleCharacterMove} 
          isMobile={isMobile} 
        />
      )}
    </DarkModeProvider>
  );
}

export default App
