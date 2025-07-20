/*
Auimport React, { useState, useEffect, useRef } from 'react'
import { useGLTF, Html, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'enerated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 vite-project\public\model\Monitor.glb --output vite-project\src\assets\components\Monitor.jsx 
*/

import React, { useState, useEffect, useRef } from 'react'
import { useGLTF, Html, Text } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Projects data for the desktop apps
const projectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with React & Node.js",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "/texture/PROJECT.png",
    link: "https://github.com/your-username/ecommerce",
    color: "#4F46E5"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task manager with real-time updates",
    tech: ["Vue.js", "Firebase", "Tailwind CSS"],
    image: "/texture/PROJECT.png",
    link: "https://github.com/your-username/task-manager",
    color: "#7C3AED"
  },
  {
    id: 3,
    title: "Weather Dashboard",
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
    title: "Blog Platform",
    description: "Content management system with rich editor",
    tech: ["Next.js", "Prisma", "PostgreSQL"],
    image: "/texture/PROJECT.png",
    link: "https://github.com/your-username/blog-platform",
    color: "#EA580C"
  }
];

// Screen States
const SCREEN_STATES = {
  OFF: 'off',
  LOADING: 'loading',
  LOCK_SCREEN: 'lock_screen',
  DESKTOP: 'desktop'
};

const MonitorScreen = ({ screenState, onUnlock, onAppClick, onLoadingComplete, loadingProgress, isFullscreen, onToggleFullscreen }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Handle Esc key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isFullscreen) {
        onToggleFullscreen();
      }
    };

    if (isFullscreen) {
      document.addEventListener('keydown', handleKeyDown);
      // Create immersive fullscreen experience
      document.body.style.overflow = 'hidden';
      document.body.style.margin = '0';
      document.body.style.padding = '0';
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.margin = '0';
      document.documentElement.style.padding = '0';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.documentElement.style.overflow = 'auto';
      document.documentElement.style.margin = '';
      document.documentElement.style.padding = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.documentElement.style.overflow = 'auto';
      document.documentElement.style.margin = '';
      document.documentElement.style.padding = '';
    };
  }, [isFullscreen, onToggleFullscreen]);

  // Debug: Log screen state changes
  useEffect(() => {
    console.log('MonitorScreen state changed to:', screenState);
  }, [screenState]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (screenState === SCREEN_STATES.LOADING) {
      const timer = setTimeout(() => {
        onLoadingComplete(); // Call the parent function to change state
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [screenState, onLoadingComplete]);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (screenState === SCREEN_STATES.OFF) {
    return (
      <div 
        style={{
          width: isFullscreen ? '100vw' : '100%',
          height: isFullscreen ? '100vh' : '100%',
          backgroundColor: '#000',
          borderRadius: isFullscreen ? '0px' : '12px',
          border: isFullscreen ? 'none' : '2px solid #1a1a1a',
          position: isFullscreen ? 'fixed' : 'relative',
          top: isFullscreen ? '0' : 'auto',
          left: isFullscreen ? '0' : 'auto',
          zIndex: isFullscreen ? '999999' : 'auto'
        }}
      ></div>
    );
  }

  if (screenState === SCREEN_STATES.LOADING) {
    return (
      <div 
        style={{
          width: isFullscreen ? '100vw' : '100%',
          height: isFullscreen ? '100vh' : '100%',
          backgroundColor: '#000',
          borderRadius: isFullscreen ? '0px' : '12px',
          border: isFullscreen ? 'none' : '2px solid #1a1a1a',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
          position: isFullscreen ? 'fixed' : 'relative',
          top: isFullscreen ? '0' : 'auto',
          left: isFullscreen ? '0' : 'auto',
          zIndex: isFullscreen ? '999999' : 'auto'
        }}
      >
        {/* Apple Logo */}
        <div style={{
          fontSize: isFullscreen ? '180px' : '60px',
          marginBottom: isFullscreen ? '60px' : '40px',
          filter: 'brightness(0.8)'
        }}>
          🍎
        </div>
        
        {/* Loading Bar */}
        <div style={{
          width: isFullscreen ? '600px' : '200px',
          height: isFullscreen ? '12px' : '4px',
          backgroundColor: '#333',
          borderRadius: '6px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${loadingProgress}%`,
            height: '100%',
            backgroundColor: '#fff',
            transition: 'width 0.3s ease'
          }}></div>
        </div>
      </div>
    );
  }

  if (screenState === SCREEN_STATES.LOCK_SCREEN) {
    return (
      <div 
        style={{
          width: isFullscreen ? '100vw' : '100%',
          height: isFullscreen ? '100vh' : '100%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: isFullscreen ? '0px' : '12px',
          border: isFullscreen ? 'none' : '2px solid rgba(255,255,255,0.1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
          cursor: 'pointer',
          position: isFullscreen ? 'fixed' : 'relative',
          top: isFullscreen ? '0' : 'auto',
          left: isFullscreen ? '0' : 'auto',
          zIndex: isFullscreen ? '999999' : 'auto'
        }}
        onClick={onUnlock}
      >
        {/* Fullscreen Toggle Button */}
        {!isFullscreen && (
          <div 
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              fontSize: '24px',
              cursor: 'pointer',
              opacity: 0.7,
              transition: 'opacity 0.3s ease'
            }}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFullscreen();
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
            title="Enter Fullscreen"
          >
            ⛶
          </div>
        )}
        
        {/* Exit Fullscreen Indicator */}
        {isFullscreen && (
          <div 
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              fontSize: '16px',
              opacity: 0.7,
              backgroundColor: 'rgba(0,0,0,0.3)',
              padding: '8px 12px',
              borderRadius: '20px'
            }}
          >
            Press ESC to exit fullscreen
          </div>
        )}
        <div style={{
          textAlign: 'center',
          marginBottom: isFullscreen ? '80px' : '40px'
        }}>
          <div style={{
            fontSize: isFullscreen ? '200px' : '72px',
            fontWeight: '200',
            marginBottom: isFullscreen ? '20px' : '10px'
          }}>
            {formatTime(currentTime)}
          </div>
          <div style={{
            fontSize: isFullscreen ? '48px' : '18px',
            opacity: 0.9
          }}>
            {formatDate(currentTime)}
          </div>
        </div>
        
        <div style={{
          fontSize: isFullscreen ? '40px' : '16px',
          opacity: 0.8,
          textAlign: 'center'
        }}>
          Click to unlock
        </div>
      </div>
    );
  }

  if (screenState === SCREEN_STATES.DESKTOP) {
    return (
      <div style={{
        width: isFullscreen ? '100vw' : '100%',
        height: isFullscreen ? '100vh' : '100%',
        background: 'linear-gradient(135deg, #ff6b6b 0%, #ffa726 25%, #66bb6a 50%, #42a5f5 75%, #ab47bc 100%)',
        borderRadius: isFullscreen ? '0px' : '12px',
        border: isFullscreen ? 'none' : '2px solid rgba(255,255,255,0.2)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
        overflow: 'hidden',
        position: isFullscreen ? 'fixed' : 'relative',
        top: isFullscreen ? '0' : 'auto',
        left: isFullscreen ? '0' : 'auto',
        zIndex: isFullscreen ? '999999' : 'auto'
      }}>
        {/* Fullscreen Toggle Button */}
        {!isFullscreen && (
          <div 
            style={{
              position: 'absolute',
              top: '30px',
              right: '20px',
              fontSize: '20px',
              cursor: 'pointer',
              opacity: 0.7,
              transition: 'opacity 0.3s ease',
              zIndex: 20,
              backgroundColor: 'rgba(0,0,0,0.3)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFullscreen();
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
            title="Enter Fullscreen"
          >
            ⛶
          </div>
        )}
        
        {/* Exit Fullscreen Indicator */}
        {isFullscreen && (
          <div 
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              fontSize: '14px',
              opacity: 0.8,
              backgroundColor: 'rgba(0,0,0,0.4)',
              padding: '8px 12px',
              borderRadius: '20px',
              zIndex: 20,
              color: 'white'
            }}
          >
            Press ESC to exit fullscreen
          </div>
        )}
        {/* macOS Wave Background Effect */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(ellipse at 20% 80%, rgba(255, 107, 107, 0.8) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(171, 71, 188, 0.8) 0%, transparent 50%),
            radial-gradient(ellipse at 40% 40%, rgba(66, 165, 245, 0.6) 0%, transparent 50%)
          `
        }}></div>

        {/* Menu Bar */}
        <div style={{
          height: isFullscreen ? '48px' : '24px',
          backgroundColor: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          alignItems: 'center',
          padding: isFullscreen ? '0 30px' : '0 12px',
          fontSize: isFullscreen ? '18px' : '11px',
          color: 'white',
          fontWeight: '500',
          position: 'relative',
          zIndex: 10
        }}>
          <span style={{ marginRight: '15px', fontSize: isFullscreen ? '20px' : '13px' }}>🍎</span>
          <span style={{ marginRight: '15px', fontWeight: '600' }}>Finder</span>
          <span style={{ marginRight: '15px' }}>File</span>
          <span style={{ marginRight: '15px' }}>Edit</span>
          <span style={{ marginRight: '15px' }}>View</span>
          <span style={{ marginRight: '15px' }}>Go</span>
          <span style={{ marginRight: '15px' }}>Window</span>
          <span style={{ marginRight: '15px' }}>Help</span>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: isFullscreen ? '18px' : '10px' }}>🔋</span>
            <span style={{ fontSize: isFullscreen ? '18px' : '10px' }}>📶</span>
            <span style={{ fontSize: isFullscreen ? '18px' : '10px' }}>🔍</span>
            <span style={{ fontSize: isFullscreen ? '16px' : '9px', fontWeight: '500' }}>{formatTime(currentTime)}</span>
          </div>
        </div>

        {/* Desktop Area */}
        <div style={{
          flex: 1,
          position: 'relative',
          zIndex: 5
        }}>
          {/* Clean Desktop - No icons on desktop, all in dock */}
        </div>

        {/* Dock */}
        <div style={{
          position: 'absolute',
          bottom: isFullscreen ? '30px' : '8px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(255,255,255,0.2)',
          backdropFilter: 'blur(30px)',
          borderRadius: isFullscreen ? '30px' : '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isFullscreen ? '15px 20px' : '6px 8px',
          gap: isFullscreen ? '12px' : '3px',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          {/* Portfolio Projects in Dock */}
          {projectsData.map((project, index) => (
            <div
              key={project.id}
              style={{
                width: isFullscreen ? '60px' : '28px',
                height: isFullscreen ? '60px' : '28px',
                borderRadius: isFullscreen ? '12px' : '6px',
                backgroundColor: project.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: isFullscreen ? '24px' : '12px',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                backgroundImage: `url(${project.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              onClick={() => onAppClick(project)}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.4) translateY(-10px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) translateY(0)'}
              title={project.title}
            >
              <span style={{
                color: 'white',
                textShadow: '0 1px 2px rgba(0,0,0,0.7)',
                fontSize: isFullscreen ? '20px' : '10px'
              }}>
                💻
              </span>
            </div>
          ))}
          
          {/* Separator Line */}
          <div style={{
            width: '1px',
            height: isFullscreen ? '48px' : '24px',
            backgroundColor: 'rgba(255,255,255,0.3)',
            margin: isFullscreen ? '0 10px' : '0 4px'
          }}></div>

          {/* System Apps in Dock */}
          {[
            { icon: '🖥️', name: 'Finder' },
            { icon: '💬', name: 'Messages' },
            { icon: '📧', name: 'Mail' },
            { icon: '�', name: 'Safari' },
            { icon: '�', name: 'App Store' },
            { icon: '🎵', name: 'Music' },
            { icon: '📺', name: 'Apple TV' },
            { icon: '�', name: 'Calendar' },
            { icon: '�', name: 'Notes' },
            { icon: '📁', name: 'Finder' },
            { icon: '⚙️', name: 'System Preferences' },
            { icon: '🗑️', name: 'Trash' }
          ].map((app, index) => (
            <div
              key={index}
              style={{
                width: isFullscreen ? '60px' : '28px',
                height: isFullscreen ? '60px' : '28px',
                borderRadius: isFullscreen ? '12px' : '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: isFullscreen ? '30px' : '14px',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
                backgroundColor: app.name === 'Trash' ? 'rgba(255,255,255,0.1)' : 'transparent'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.4) translateY(-10px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) translateY(0)'}
              title={app.name}
            >
              {app.icon}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export function Monitor(props) {
  const { nodes, materials } = useGLTF('/model/Monitor.glb')
  const { noPosition, ...otherProps } = props
  const [screenState, setScreenState] = useState(SCREEN_STATES.OFF);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Move useFrame here since it needs to be inside Canvas
  useFrame(() => {
    if (screenState === SCREEN_STATES.LOADING && loadingProgress < 100) {
      setLoadingProgress(prev => Math.min(prev + 2, 100));
    }
  });

  const handlePowerButton = () => {
    console.log('Power button clicked! Current state:', screenState);
    if (screenState === SCREEN_STATES.OFF) {
      console.log('Turning monitor ON - switching to LOADING');
      setLoadingProgress(0); // Reset loading progress
      setScreenState(SCREEN_STATES.LOADING);
    } else {
      console.log('Turning monitor OFF');
      setScreenState(SCREEN_STATES.OFF);
    }
  };

  const handleUnlock = () => {
    console.log('Unlocking - switching to DESKTOP');
    setScreenState(SCREEN_STATES.DESKTOP);
  };

  const handleLoadingComplete = () => {
    console.log('Loading complete - switching to LOCK_SCREEN');
    setScreenState(SCREEN_STATES.LOCK_SCREEN);
  };

  const handleAppClick = (project) => {
    setSelectedProject(project);
    // You can add more functionality here, like opening a modal or navigating
    console.log('Clicked project:', project.title);
    // For now, we'll just open the project link
    if (project.link) {
      window.open(project.link, '_blank');
    }
  };

  const handleToggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    console.log('Toggling fullscreen mode:', !isFullscreen);
  };

  return (
    <>
      {/* Regular 3D Monitor */}
      <group
        {...otherProps}
        dispose={null}
        scale={0.035}
        position={noPosition ? [0, 0, 0] : [4, 0, 29]}
        rotation={[0,  -Math.PI / 2, 0]}
      >
        <mesh geometry={nodes.iMac.geometry} material={materials.Mat} />
        
        {/* Monitor Screen - Pure HTML Screen */}
        <group position={[8, 37, 0]} rotation={[0, -Math.PI / 2, 0]} scale={2}>
          {/* Screen Content as Pure HTML - No 3D background mesh */}
          <Html
            position={[0, 0, 0]}
            rotation={[0, Math.PI , 0]}
            transform
            occlude={false}
            distanceFactor={20}
            style={{
              width: '600px',
              height: '310px',
              pointerEvents: 'auto',
              borderRadius: '12px',
              overflow: 'hidden'
            }}
          >
            <MonitorScreen 
              screenState={screenState}
              onUnlock={handleUnlock}
              onAppClick={handleAppClick}
              onLoadingComplete={handleLoadingComplete}
              loadingProgress={loadingProgress}
              isFullscreen={false}
              onToggleFullscreen={handleToggleFullscreen}
            />
          </Html>
        </group>

        {/* Power Button - Removed HTML backup, using only 3D button */}

        {/* 3D Power Button on Monitor Bezel */}
        <group>
          {/* Power Button Base - with proper click handling */}
          <mesh 
            position={[0, 1, 0]} 
            rotation={[0, 0, 0]}
            onClick={handlePowerButton}
            onPointerEnter={() => document.body.style.cursor = 'pointer'}
            onPointerLeave={() => document.body.style.cursor = 'default'}
          >
            <cylinderGeometry args={[5.5, 3.5, 0.3, 32]} />
            <meshStandardMaterial 
              color={screenState === SCREEN_STATES.OFF ? '#2c2c2c' : '#4CAF50'}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          
          {/* Power Button Top (Pressed State) */}
          <mesh position={[0, 1.1, 0]} rotation={[0, 0, 0]}>
            <cylinderGeometry args={[1.2, 1.2, 0.1, 32]} />
            <meshStandardMaterial 
              color={screenState === SCREEN_STATES.OFF ? '#1a1a1a' : '#388E3C'}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
          
          {/* Power Symbol as 3D Text */}
          <Text
            position={[0, 1.2, 0]}
            rotation={[-Math.PI/2, 0, 0]}
            fontSize={0.8}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            ⏻
          </Text>
        </group>
      </group>

      {/* TRUE FULLSCREEN OVERLAY - Covers entire browser window and hides canvas */}
      {isFullscreen && (
        <Html
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            zIndex: '9999999',
            pointerEvents: 'auto',
            margin: '0',
            padding: '0',
            backgroundColor: '#000'
          }}
          transform={false}
          portal={{ target: document.body }}
        >
          {/* Fullscreen container that completely covers the screen */}
          <div style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            margin: '0',
            padding: '0',
            backgroundColor: '#000',
            zIndex: '9999999',
            overflow: 'hidden'
          }}>
            <MonitorScreen 
              screenState={screenState}
              onUnlock={handleUnlock}
              onAppClick={handleAppClick}
              onLoadingComplete={handleLoadingComplete}
              loadingProgress={loadingProgress}
              isFullscreen={true}
              onToggleFullscreen={handleToggleFullscreen}
            />
          </div>
        </Html>
      )}
    </>
  )
}

useGLTF.preload('/model/Monitor.glb')
