import React, { useState, useEffect } from 'react';

export const Welcome = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleGotIt = () => {
    setIsVisible(false);
    // Wait for fade out animation before removing
    setTimeout(onClose, 300);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(10px)',
      zIndex: 20000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: isVisible ? 1 : 0,
      transition: 'all 0.3s ease',
      fontFamily: 'Orbitron, monospace'
    }}>
      {/* Animated Background Particles */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: `
          radial-gradient(circle at 20% 20%, rgba(0, 255, 136, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(255, 107, 0, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, rgba(0, 212, 255, 0.1) 0%, transparent 50%)
        `,
        animation: 'float 4s ease-in-out infinite'
      }}></div>

      {/* Welcome Modal */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(26, 0, 51, 0.95), rgba(0, 61, 102, 0.95))',
        border: '2px solid #00ff88',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '600px',
        width: '90%',
        textAlign: 'center',
        position: 'relative',
        boxShadow: `
          0 0 30px rgba(0, 255, 136, 0.3),
          0 0 60px rgba(0, 255, 136, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.1)
        `,
        transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(20px)',
        transition: 'all 0.3s ease'
      }}>
        {/* Corner Decorations */}
        <div style={{
          position: 'absolute',
          top: '-2px',
          left: '-2px',
          width: '40px',
          height: '40px',
          background: 'linear-gradient(45deg, #00ff88, #00d4ff)',
          clipPath: 'polygon(0 0, 100% 0, 0 100%)'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '-2px',
          right: '-2px',
          width: '40px',
          height: '40px',
          background: 'linear-gradient(45deg, #ff6b00, #ff0080)',
          clipPath: 'polygon(100% 0, 100% 100%, 0 0)'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-2px',
          left: '-2px',
          width: '40px',
          height: '40px',
          background: 'linear-gradient(45deg, #b800ff, #00d4ff)',
          clipPath: 'polygon(0 100%, 100% 100%, 0 0)'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-2px',
          right: '-2px',
          width: '40px',
          height: '40px',
          background: 'linear-gradient(45deg, #ff6b00, #39ff14)',
          clipPath: 'polygon(100% 100%, 100% 0, 0 100%)'
        }}></div>

        {/* Welcome Title */}
        <h1 style={{
          fontSize: '48px',
          fontWeight: '900',
          color: '#00ff88',
          textShadow: '0 0 20px #00ff88, 0 0 40px #00ff88',
          margin: '0 0 30px 0',
          letterSpacing: '3px',
          animation: 'glow 2s ease-in-out infinite alternate'
        }}>
          WELCOME
        </h1>

        {/* Welcome Message */}
        <div style={{
          fontSize: '18px',
          color: '#ffffff',
          lineHeight: '1.6',
          marginBottom: '20px',
          textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
        }}>
          <p style={{ margin: '0 0 20px 0' }}>
            For the best experience,
          </p>
          <p style={{ 
            margin: '0 0 25px 0',
            color: '#00d4ff',
            fontWeight: 'bold'
          }}>
            please use desktop.
          </p>
          
          {/* Game Controls Header */}
          <p style={{ 
            margin: '0 0 20px 0',
            fontSize: '16px',
            textAlign: 'center',
            color: '#00ff88',
            fontWeight: 'bold',
            letterSpacing: '1px'
          }}>
            🎮 GAME CONTROLS & NAVIGATION
          </p>
          
          {/* Two Column Layout for Instructions */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '20px',
            marginBottom: '20px'
          }}>
            {/* Left Column */}
            <div style={{ flex: '1', fontSize: '14px' }}>
              {/* Movement Controls */}
              <div style={{ marginBottom: '15px' }}>
                <h4 style={{ 
                  color: '#00ff88', 
                  fontSize: '13px', 
                  margin: '0 0 6px 0',
                  letterSpacing: '0.5px'
                }}>
                  ⌨️ MOVEMENT:
                </h4>
                <div style={{ fontSize: '12px', lineHeight: '1.4' }}>
                  <p style={{ margin: '3px 0', color: '#e0e0e0' }}>
                    🔸 <strong style={{ color: '#fff' }}>W/↑</strong> Forward
                  </p>
                  <p style={{ margin: '3px 0', color: '#e0e0e0' }}>
                    🔸 <strong style={{ color: '#fff' }}>S/↓</strong> Backward
                  </p>
                  <p style={{ margin: '3px 0', color: '#e0e0e0' }}>
                    🔸 <strong style={{ color: '#fff' }}>A</strong> Left
                  </p>
                  <p style={{ margin: '3px 0', color: '#e0e0e0' }}>
                    🔸 <strong style={{ color: '#fff' }}>D</strong> Right
                  </p>
                </div>
              </div>

              {/* World Boundaries */}
              <div>
                <h4 style={{ 
                  color: '#ff0080', 
                  fontSize: '13px', 
                  margin: '0 0 6px 0',
                  letterSpacing: '0.5px'
                }}>
                  ⚠️ BOUNDARIES:
                </h4>
                <div style={{ fontSize: '12px', lineHeight: '1.4' }}>
                  <p style={{ margin: '3px 0', color: '#e0e0e0' }}>
                    🔸 Stay in safe zone
                  </p>
                  <p style={{ margin: '3px 0', color: '#e0e0e0' }}>
                    🔸 Avoid fall damage
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div style={{ flex: '1', fontSize: '14px' }}>
              {/* Monitor Features */}
              <div>
                <h4 style={{ 
                  color: '#ff6b00', 
                  fontSize: '13px', 
                  margin: '0 0 6px 0',
                  letterSpacing: '0.5px'
                }}>
                  🖥️ MONITOR:
                </h4>
                <div style={{ fontSize: '12px', lineHeight: '1.4' }}>
                  <p style={{ margin: '3px 0', color: '#e0e0e0' }}>
                    🔸 <strong style={{ color: '#fff' }}>Power</strong> ON/OFF
                  </p>
                  <p style={{ margin: '3px 0', color: '#e0e0e0' }}>
                    🔸 <strong style={{ color: '#fff' }}>⛶</strong> Fullscreen
                  </p>
                  <p style={{ margin: '3px 0', color: '#e0e0e0' }}>
                    🔸 <strong style={{ color: '#fff' }}>ESC</strong> Exit
                  </p>
                  <p style={{ margin: '3px 0', color: '#e0e0e0' }}>
                    🔸 <strong style={{ color: '#fff' }}>Click</strong> Unlock
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p style={{ 
            margin: '0',
            fontSize: '16px',
            color: '#b0b0b0',
            fontStyle: 'italic',
            textAlign: 'center'
          }}>
            Navigate through my interactive portfolio —<br/>
            Explore the 3D game-like environment!
          </p>
        </div>

        {/* Got It Button */}
        <button
          onClick={handleGotIt}
          style={{
            background: 'linear-gradient(45deg, #ff6b00, #ff0080)',
            border: '2px solid #ff6b00',
            borderRadius: '15px',
            color: '#ffffff',
            fontSize: '20px',
            fontWeight: 'bold',
            fontFamily: 'Orbitron, monospace',
            padding: '15px 40px',
            cursor: 'pointer',
            textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
            boxShadow: `
              0 0 20px rgba(255, 107, 0, 0.5),
              0 4px 15px rgba(0, 0, 0, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.2)
            `,
            transition: 'all 0.3s ease',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1) translateY(-2px)';
            e.target.style.boxShadow = `
              0 0 30px rgba(255, 107, 0, 0.8),
              0 6px 20px rgba(0, 0, 0, 0.4),
              inset 0 1px 0 rgba(255, 255, 255, 0.3)
            `;
            e.target.style.textShadow = '0 0 15px rgba(255, 255, 255, 1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1) translateY(0)';
            e.target.style.boxShadow = `
              0 0 20px rgba(255, 107, 0, 0.5),
              0 4px 15px rgba(0, 0, 0, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.2)
            `;
            e.target.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.8)';
          }}
        >
          GOT IT!
        </button>

        {/* Pulsing Ring Animation */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '120%',
          height: '120%',
          border: '1px solid rgba(0, 255, 136, 0.3)',
          borderRadius: '20px',
          transform: 'translate(-50%, -50%)',
          animation: 'pulse-ring 3s ease-in-out infinite',
          pointerEvents: 'none'
        }}></div>
      </div>

      <style>
        {`
          @keyframes glow {
            0% { text-shadow: 0 0 20px #00ff88, 0 0 40px #00ff88; }
            100% { text-shadow: 0 0 30px #00ff88, 0 0 60px #00ff88, 0 0 80px #00ff88; }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            33% { transform: translateY(-10px) rotate(1deg); }
            66% { transform: translateY(5px) rotate(-1deg); }
          }
          
          @keyframes pulse-ring {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
            50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.4; }
            100% { transform: translate(-50%, -50%) scale(1.2); opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

export default Welcome;
