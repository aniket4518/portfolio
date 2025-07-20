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
    screenshots: [
      "/texture/ecommerce-home.png",
      "/texture/ecommerce-products.png",
      "/texture/ecommerce-cart.png"
    ],
    // link: "https://github.com/your-username/ecommerce",
    color: "#4F46E5"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task manager with real-time updates",
    tech: ["Vue.js", "Firebase", "Tailwind CSS"],
    image: "/texture/PROJECT.png",
    screenshots: [
      "/texture/task-dashboard.png",
      "/texture/task-board.png",
      "/texture/task-details.png"
    ],
   
    color: "#7C3AED"
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "Interactive weather app with beautiful animations",
    tech: ["React", "OpenWeather API", "Chart.js"],
    image: "/texture/PROJECT.png",
    screenshots: [
      "/texture/weather-main.png",
      "/texture/weather-forecast.png",
      "/texture/weather-maps.png"
    ],
    // link: "https://github.com/your-username/weather-app",
    color: "#2563EB"
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "3D interactive portfolio with Three.js",
    tech: ["React", "Three.js", "Vite"],
    image: "/texture/PROJECT.png",
    screenshots: [
      "/texture/portfolio-home.png",
      "/texture/portfolio-3d.png",
      "/texture/portfolio-projects.png"
    ],
    // link: "https://github.com/your-username/portfolio",
    color: "#059669"
  },
  {
    id: 5,
    title: "Chat Application",
    description: "Real-time chat with rooms and file sharing",
    tech: ["Socket.io", "Express", "React"],
    image: "/texture/PROJECT.png",
    screenshots: [
      "/texture/chat-rooms.png",
      "/texture/chat-messages.png",
      "/texture/chat-files.png"
    ],
    // link: "https://github.com/your-username/chat-app",
    color: "#DC2626"
  },
  {
    id: 6,
    title: "Blog Platform",
    description: "Content management system with rich editor",
    tech: ["Next.js", "Prisma", "PostgreSQL"],
    image: "/texture/PROJECT.png",
    screenshots: [
      "/texture/blog-home.png",
      "/texture/blog-editor.png",
      "/texture/blog-post.png"
    ],
    // link: "https://github.com/your-username/blog-platform",
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
  const [hoveredProjectIndex, setHoveredProjectIndex] = useState(-1);
  const [hoveredSystemIndex, setHoveredSystemIndex] = useState(-1);
  const [showProjectsFolder, setShowProjectsFolder] = useState(false);
  const [selectedProjectForSlideshow, setSelectedProjectForSlideshow] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Calculate scale for dock magnification effect
  const calculateScale = (currentIndex, hoveredIndex, maxScale = 1.6) => {
    if (hoveredIndex === -1) return 1;
    const distance = Math.abs(currentIndex - hoveredIndex);
    if (distance === 0) return maxScale;
    if (distance === 1) return 1.3;
    if (distance === 2) return 1.1;
    return 1;
  };

  // Calculate translateY for dock magnification effect
  const calculateTranslateY = (currentIndex, hoveredIndex, maxOffset = -12) => {
    if (hoveredIndex === -1) return 0;
    const distance = Math.abs(currentIndex - hoveredIndex);
    if (distance === 0) return maxOffset;
    if (distance === 1) return maxOffset * 0.6;
    if (distance === 2) return maxOffset * 0.3;
    return 0;
  };

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
          zIndex: 5,
          padding: '20px'
        }}>
          {/* Projects Folder on Desktop */}
          <div 
            style={{
              position: 'absolute',
              top: '30px',
              left: '30px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }}
            onClick={() => setShowProjectsFolder(true)}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {/* Folder Icon */}
            <div style={{
              width: isFullscreen ? '80px' : '40px',
              height: isFullscreen ? '80px' : '40px',
              background: 'linear-gradient(145deg, #4A90E2, #357ABD)',
              borderRadius: isFullscreen ? '12px' : '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: isFullscreen ? '40px' : '20px',
              boxShadow: `
                0 ${isFullscreen ? '6px' : '3px'} ${isFullscreen ? '15px' : '8px'} rgba(0,0,0,0.3),
                inset 0 1px 0 rgba(255,255,255,0.3)
              `,
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              📁
            </div>
            {/* Folder Label */}
            <span style={{
              color: 'white',
              fontSize: isFullscreen ? '14px' : '10px',
              fontWeight: 'bold',
              marginTop: '5px',
              textShadow: '0 1px 3px rgba(0,0,0,0.8)',
              textAlign: 'center'
            }}>
              Projects
            </span>
          </div>

          {/* Projects Folder Modal */}
          {showProjectsFolder && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'rgba(30, 30, 30, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: '15px',
              padding: '20px',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              zIndex: 100
            }}>
              {/* Folder Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                paddingBottom: '10px'
              }}>
                <h3 style={{
                  color: 'white',
                  margin: 0,
                  fontSize: isFullscreen ? '18px' : '14px'
                }}>
                  📁 Projects
                </h3>
                <button
                  onClick={() => setShowProjectsFolder(false)}
                  style={{
                    background: '#ff5f56',
                    border: 'none',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  ×
                </button>
              </div>

              {/* Project Apps Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '15px',
                width: isFullscreen ? '300px' : '200px'
              }}>
                {projectsData.slice(0, 4).map((project, index) => (
                  <div
                    key={project.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      cursor: 'pointer',
                      padding: '10px',
                      borderRadius: '8px',
                      transition: 'background 0.2s ease'
                    }}
                    onClick={() => {
                      setSelectedProjectForSlideshow(project);
                      setCurrentSlideIndex(0);
                      setShowProjectsFolder(false);
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    {/* App Icon */}
                    <div style={{
                      width: isFullscreen ? '60px' : '40px',
                      height: isFullscreen ? '60px' : '40px',
                      borderRadius: isFullscreen ? '12px' : '8px',
                      background: `linear-gradient(145deg, ${project.color}f0, ${project.color}cc)`,
                      border: `1px solid ${project.color}aa`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: isFullscreen ? '24px' : '16px',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                      marginBottom: '8px'
                    }}>
                      💻
                    </div>
                    {/* App Name */}
                    <span style={{
                      color: 'white',
                      fontSize: isFullscreen ? '12px' : '10px',
                      textAlign: 'center',
                      fontWeight: '500'
                    }}>
                      {project.title.length > 15 ? project.title.substring(0, 15) + '...' : project.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Photo Slideshow Modal */}
          {selectedProjectForSlideshow && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0, 0, 0, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 200
            }}>
              <div style={{
                maxWidth: '90%',
                maxHeight: '90%',
                background: 'rgba(30, 30, 30, 0.95)',
                borderRadius: '15px',
                padding: '20px',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                {/* Slideshow Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}>
                  <h2 style={{
                    color: 'white',
                    margin: 0,
                    fontSize: isFullscreen ? '24px' : '18px'
                  }}>
                    {selectedProjectForSlideshow.title}
                  </h2>
                  <button
                    onClick={() => setSelectedProjectForSlideshow(null)}
                    style={{
                      background: '#ff5f56',
                      border: 'none',
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '16px'
                    }}
                  >
                    ×
                  </button>
                </div>

                {/* Image Display */}
                <div style={{
                  width: isFullscreen ? '600px' : '400px',
                  height: isFullscreen ? '400px' : '300px',
                  background: '#222',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {/* Placeholder for screenshot */}
                  <div style={{
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(45deg, ${selectedProjectForSlideshow.color}40, ${selectedProjectForSlideshow.color}20)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'
                  }}>
                    <div style={{ fontSize: '60px', marginBottom: '20px' }}>🖼️</div>
                    <p style={{ color: 'white', textAlign: 'center', margin: 0 }}>
                      Screenshot {currentSlideIndex + 1} of {selectedProjectForSlideshow.screenshots.length}
                    </p>
                    <p style={{ color: '#ccc', fontSize: '14px', marginTop: '10px' }}>
                      {selectedProjectForSlideshow.screenshots[currentSlideIndex]}
                    </p>
                  </div>

                  {/* Navigation Arrows */}
                  {selectedProjectForSlideshow.screenshots.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentSlideIndex(
                          currentSlideIndex > 0 ? currentSlideIndex - 1 : selectedProjectForSlideshow.screenshots.length - 1
                        )}
                        style={{
                          position: 'absolute',
                          left: '10px',
                          background: 'rgba(0,0,0,0.5)',
                          border: 'none',
                          borderRadius: '50%',
                          width: '40px',
                          height: '40px',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '18px'
                        }}
                      >
                        ‹
                      </button>
                      <button
                        onClick={() => setCurrentSlideIndex(
                          currentSlideIndex < selectedProjectForSlideshow.screenshots.length - 1 ? currentSlideIndex + 1 : 0
                        )}
                        style={{
                          position: 'absolute',
                          right: '10px',
                          background: 'rgba(0,0,0,0.5)',
                          border: 'none',
                          borderRadius: '50%',
                          width: '40px',
                          height: '40px',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '18px'
                        }}
                      >
                        ›
                      </button>
                    </>
                  )}
                </div>

                {/* Project Details */}
                <div style={{ color: 'white', textAlign: 'center' }}>
                  <p style={{ margin: '10px 0', fontSize: '14px' }}>
                    {selectedProjectForSlideshow.description}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    {selectedProjectForSlideshow.tech.map((tech, index) => (
                      <span
                        key={index}
                        style={{
                          background: selectedProjectForSlideshow.color,
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          color: 'white'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Slide Indicators */}
                {selectedProjectForSlideshow.screenshots.length > 1 && (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '8px',
                    marginTop: '15px'
                  }}>
                    {selectedProjectForSlideshow.screenshots.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlideIndex(index)}
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          border: 'none',
                          background: index === currentSlideIndex ? 'white' : 'rgba(255,255,255,0.3)',
                          cursor: 'pointer'
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
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
          {projectsData.map((project, index) => {
            const scale = calculateScale(index, hoveredProjectIndex);
            const translateY = calculateTranslateY(index, hoveredProjectIndex);
            
            return (
              <div
                key={project.id}
                style={{
                  width: isFullscreen ? '60px' : '28px',
                  height: isFullscreen ? '60px' : '28px',
                  borderRadius: isFullscreen ? '15px' : '7px',
                  background: `linear-gradient(145deg, ${project.color}f0, ${project.color}cc)`,
                  border: `1px solid ${project.color}aa`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: isFullscreen ? '24px' : '12px',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  transform: `scale(${scale}) translateY(${translateY}px)`,
                  boxShadow: `
                    0 ${(isFullscreen ? 8 : 4) * scale}px ${(isFullscreen ? 20 : 10) * scale}px rgba(0,0,0,${0.4 * scale}),
                    0 ${(isFullscreen ? 3 : 1) * scale}px ${(isFullscreen ? 6 : 3) * scale}px rgba(0,0,0,0.3),
                    inset 0 1px 0 rgba(255,255,255,0.3),
                    inset 0 -1px 0 rgba(0,0,0,0.2)
                  `,
                  position: 'relative',
                  overflow: 'hidden',
                  zIndex: hoveredProjectIndex === index ? 10 : 1
                }}
                onClick={() => onAppClick(project)}
                onMouseEnter={() => setHoveredProjectIndex(index)}
                onMouseLeave={() => setHoveredProjectIndex(-1)}
                title={project.title}
              >
                {/* App icon background reflection */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '40%',
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 100%)',
                  borderRadius: `${isFullscreen ? '15px' : '7px'} ${isFullscreen ? '15px' : '7px'} 0 0`
                }}></div>
                
                {/* Project icon */}
                <div style={{
                  background: `linear-gradient(145deg, #ffffff, #f0f0f0)`,
                  borderRadius: isFullscreen ? '8px' : '4px',
                  width: isFullscreen ? '35px' : '18px',
                  height: isFullscreen ? '35px' : '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: isFullscreen ? '18px' : '10px',
                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
                  position: 'relative',
                  zIndex: 1
                }}>
                  💻
                </div>
                
                {/* Active indicator dot */}
                <div style={{
                  position: 'absolute',
                  bottom: isFullscreen ? '-8px' : '-4px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: isFullscreen ? '6px' : '3px',
                  height: isFullscreen ? '6px' : '3px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  boxShadow: '0 0 4px rgba(0,0,0,0.3)'
                }}></div>
              </div>
            );
          })}{/* Separator Line */}
          <div style={{
            width: '1px',
            height: isFullscreen ? '48px' : '24px',
            backgroundColor: 'rgba(255,255,255,0.3)',
            margin: isFullscreen ? '0 10px' : '0 4px'
          }}></div>

          {/* System Apps in Dock */}
          {[
            { icon: '🖥️', name: 'Finder', color: '#007AFF' },
            { icon: '💬', name: 'Messages', color: '#34C759' },
            { icon: '📧', name: 'Mail', color: '#007AFF' },
            { icon: '🌐', name: 'Safari', color: '#007AFF' },
            { icon: '🏪', name: 'App Store', color: '#007AFF' },
            { icon: '🎵', name: 'Music', color: '#FF3B30' },
            { icon: '📺', name: 'Apple TV', color: '#1D1D1F' },
            { icon: '📅', name: 'Calendar', color: '#FF3B30' },
            { icon: '📝', name: 'Notes', color: '#FFD60A' },
            { icon: '📁', name: 'Files', color: '#007AFF' },
            { icon: '⚙️', name: 'System Preferences', color: '#8E8E93' },
            { icon: '🗑️', name: 'Trash', color: '#8E8E93' }
          ].map((app, index) => {
            const scale = calculateScale(index, hoveredSystemIndex);
            const translateY = calculateTranslateY(index, hoveredSystemIndex);
            
            return (
              <div
                key={index}
                style={{
                  width: isFullscreen ? '60px' : '28px',
                  height: isFullscreen ? '60px' : '28px',
                  borderRadius: isFullscreen ? '15px' : '7px',
                  background: app.name === 'Trash' 
                    ? 'linear-gradient(145deg, rgba(142,142,147,0.15), rgba(142,142,147,0.1))'
                    : `linear-gradient(145deg, ${app.color}f0, ${app.color}cc)`,
                  border: app.name === 'Trash' 
                    ? '1px solid rgba(255,255,255,0.1)'
                    : `1px solid ${app.color}aa`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: isFullscreen ? '28px' : '14px',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  transform: `scale(${scale}) translateY(${translateY}px)`,
                  boxShadow: `
                    0 ${(isFullscreen ? 8 : 4) * scale}px ${(isFullscreen ? 20 : 10) * scale}px rgba(0,0,0,${0.4 * scale}),
                    0 ${(isFullscreen ? 3 : 1) * scale}px ${(isFullscreen ? 6 : 3) * scale}px rgba(0,0,0,0.3),
                    inset 0 1px 0 rgba(255,255,255,0.3),
                    inset 0 -1px 0 rgba(0,0,0,0.2)
                  `,
                  position: 'relative',
                  overflow: 'hidden',
                  zIndex: hoveredSystemIndex === index ? 10 : 1
                }}
                onMouseEnter={() => setHoveredSystemIndex(index)}
                onMouseLeave={() => setHoveredSystemIndex(-1)}
                title={app.name}
              >
                {/* App icon background reflection */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '40%',
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 100%)',
                  borderRadius: `${isFullscreen ? '15px' : '7px'} ${isFullscreen ? '15px' : '7px'} 0 0`
                }}></div>
                
                {/* App icon */}
                <div style={{
                  position: 'relative',
                  zIndex: 1,
                  filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))'
                }}>
                  {app.icon}
                </div>
              </div>
            );
          })}
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
    // Just log the click, no external links
    console.log('Clicked project:', project.title);
    // Removed link opening functionality - monitor should not open external links
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
          {/* Power Label Text */}
          <Text
            position={[0, 3.5, 0]}
            rotation={[0, Math.PI / 2, 0]}
            fontSize={7}
            color="#000000ff"
            anchorX="center"
            anchorY="middle"
            fontWeight="bold"
          >
            POWER
          </Text>
          
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
