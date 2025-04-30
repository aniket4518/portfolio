import { Canvas, useThree } from "@react-three/fiber";
import './App.css'
import { Expoter } from "./assets/components/Expoter";
import { Suspense, useRef, useState, useEffect } from "react";
import { Menu } from "./assets/components/Header";
import { DarkModeProvider, DarkModeToggle, useDarkMode } from "./assets/components/darkmode";
import { useProgress } from "@react-three/drei";
 
import Loading from "./assets/components/Loading";

function CanvasWithDarkMode() {
  const darkMode = useDarkMode();
  const dark = darkMode?.dark ?? false;
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 42 }}>
      <color attach="background" args={[dark ? "#000" : "#f5f3ee"]} />
      <fog attach="fog" args={[dark ? "#000" : "#f5f3ee", 10, 30]} />
      <Suspense fallback={null}>
        <Expoter dark={dark} />
      </Suspense>
    </Canvas>
  );
}

function App() {
  const { progress } = useProgress();
  const [showLoader, setShowLoader] = useState(true);
  const darkMode = useDarkMode();
  const dark = darkMode?.dark ?? false;

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
    </DarkModeProvider>
  );
}

export default App
