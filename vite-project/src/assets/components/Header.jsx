import React, { useState, useEffect } from "react";
import { useDarkMode } from "./darkmode";

export const Menu = () => {
  const { dark } = useDarkMode();
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    color: dark ? "#fff" : "#222",
    letterSpacing: isMobile ? 1 : 2,
    fontFamily: "sans-serif",
    background: isMobile ? (dark ? "rgba(0,0,0,0.9)" : "rgba(255,255,255,0.95)") : "none",
    backdropFilter: isMobile ? "blur(10px)" : "none",
    borderRadius: isMobile ? "12px" : "0",
    padding: isMobile ? "16px" : "0",
    transition: "all 0.3s ease",
    transform: isMobile && !isMenuOpen ? "translateX(100%)" : "translateX(0)",
    boxShadow: isMobile ? "0 4px 20px rgba(0,0,0,0.15)" : "none",
  };

  const linkStyle = {
    color: dark ? "#fff" : "#222",
    textDecoration: "none",
    transition: "all 0.3s ease",
    padding: isMobile ? "12px 8px" : "0",
    borderBottom: isMobile ? `1px solid ${dark ? "#333" : "#eee"}` : "none",
    borderRadius: isMobile ? "8px" : "0",
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
        <a href="#home" style={linkStyle} onClick={() => setIsMenuOpen(false)}>Home</a>
        <a href="#skills" style={linkStyle} onClick={() => setIsMenuOpen(false)}>Skills</a>
        <a href="#projects" style={linkStyle} onClick={() => setIsMenuOpen(false)}>Projects</a>
        <a href="#contact" style={linkStyle} onClick={() => setIsMenuOpen(false)}>Contact</a>
      </div>
    </>
  );
};
