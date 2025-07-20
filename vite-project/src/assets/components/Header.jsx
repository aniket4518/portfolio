import React, { useState, useEffect } from "react";
import { useDarkMode } from "./darkmode";

export const Menu = ({ onNavigate }) => {
  const { dark } = useDarkMode();
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigationClick = (section, e) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (onNavigate) {
      onNavigate(section);
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuStyle = {
    position: "fixed",
    top: isMobile ? 16 : 24,
    right: isMobile ? 16 : 132,
    zIndex: 10001,
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    gap: isMobile ? 16 : 32,
    fontSize: isMobile ? 18 : 28,
    fontWeight: 700,
    color: "#00ff88", // Neon green
    letterSpacing: isMobile ? 1 : 2,
    fontFamily: "Orbitron, monospace", // Game font
    background: isMobile ? "rgba(0,0,0,0.85)" : "none",
    backdropFilter: isMobile ? "blur(15px)" : "none",
    borderRadius: isMobile ? "16px" : "0",
    padding: isMobile ? "20px" : "0",
    transition: "all 0.3s ease",
    transform: isMobile && !isMenuOpen ? "translateX(100%)" : "translateX(0)",
    boxShadow: isMobile ? "0 8px 32px rgba(0,255,136,0.3), inset 0 1px 0 rgba(255,255,255,0.1)" : "none",
    border: isMobile ? "1px solid rgba(0,255,136,0.3)" : "none",
    textShadow: "0 0 10px #00ff88, 0 0 20px #00ff88, 0 0 30px #00ff88"
  };

  const linkStyle = {
    color: "#00ff88", // Neon green
    textDecoration: "none",
    transition: "all 0.3s ease",
    fontFamily: "Orbitron, monospace",
    fontWeight: "bold",
    textShadow: "0 0 10px #00ff88",
    padding: isMobile ? "12px 16px" : "8px 16px",
    borderBottom: isMobile ? "1px solid rgba(0,255,136,0.3)" : "none",
    borderRadius: isMobile ? "12px" : "8px",
    border: "1px solid transparent",
    background: "linear-gradient(45deg, rgba(0,255,136,0.1), rgba(0,212,255,0.1))",
    backdropFilter: "blur(10px)",
    position: "relative",
    overflow: "hidden"
  };

  const hamburgerStyle = {
    position: "fixed",
    top: 20,
    right: 20,
    zIndex: 10002,
    background: dark ? "#fff" : "#222",
    color: dark ? "#222" : "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "12px",
    fontSize: "20px",
    cursor: "pointer",
    display: isMobile ? "block" : "none",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
  };

  return (
    <>
      {isMobile && (
        <button
          style={hamburgerStyle}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? "×" : "☰"}
        </button>
      )}
      <div style={menuStyle}>
        <a 
          href="#home" 
          style={linkStyle} 
          onClick={(e) => handleNavigationClick('home', e)}
          onMouseEnter={(e) => {
            e.target.style.color = "#ff6b00";
            e.target.style.textShadow = "0 0 15px #ff6b00, 0 0 25px #ff6b00";
            e.target.style.transform = "scale(1.1) translateY(-2px)";
            e.target.style.border = "1px solid rgba(255,107,0,0.5)";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "#00ff88";
            e.target.style.textShadow = "0 0 10px #00ff88";
            e.target.style.transform = "scale(1) translateY(0)";
            e.target.style.border = "1px solid transparent";
          }}
        >
          Home
        </a>
        <a 
          href="#skills" 
          style={linkStyle} 
          onClick={(e) => handleNavigationClick('skills', e)}
          onMouseEnter={(e) => {
            e.target.style.color = "#ff6b00";
            e.target.style.textShadow = "0 0 15px #ff6b00, 0 0 25px #ff6b00";
            e.target.style.transform = "scale(1.1) translateY(-2px)";
            e.target.style.border = "1px solid rgba(255,107,0,0.5)";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "#00ff88";
            e.target.style.textShadow = "0 0 10px #00ff88";
            e.target.style.transform = "scale(1) translateY(0)";
            e.target.style.border = "1px solid transparent";
          }}
        >
          Skills
        </a>
        <a 
          href="#projects" 
          style={linkStyle} 
          onClick={(e) => handleNavigationClick('projects', e)}
          onMouseEnter={(e) => {
            e.target.style.color = "#ff6b00";
            e.target.style.textShadow = "0 0 15px #ff6b00, 0 0 25px #ff6b00";
            e.target.style.transform = "scale(1.1) translateY(-2px)";
            e.target.style.border = "1px solid rgba(255,107,0,0.5)";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "#00ff88";
            e.target.style.textShadow = "0 0 10px #00ff88";
            e.target.style.transform = "scale(1) translateY(0)";
            e.target.style.border = "1px solid transparent";
          }}
        >
          Projects
        </a>
        <a 
          href="#contact" 
          style={linkStyle} 
          onClick={(e) => handleNavigationClick('contacts', e)}
          onMouseEnter={(e) => {
            e.target.style.color = "#ff6b00";
            e.target.style.textShadow = "0 0 15px #ff6b00, 0 0 25px #ff6b00";
            e.target.style.transform = "scale(1.1) translateY(-2px)";
            e.target.style.border = "1px solid rgba(255,107,0,0.5)";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "#00ff88";
            e.target.style.textShadow = "0 0 10px #00ff88";
            e.target.style.transform = "scale(1) translateY(0)";
            e.target.style.border = "1px solid transparent";
          }}
        >
          Contact
        </a>
      </div>
    </>
  );
};
