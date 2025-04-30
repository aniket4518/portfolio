import React from "react";
import { useDarkMode } from "./darkmode";

export const Menu = () => {
  const { dark } = useDarkMode();
  return (
    <div
      style={{
        position: "fixed",
        top: 24,
        right: 132,
        zIndex: 10001,
        display: "flex",
        gap: 32,
        fontSize: 28,
        fontWeight: 700,
        color: dark ? "#fff" : "#222",
        letterSpacing: 2,
        fontFamily: "sans-serif",
        background: "none",
        boxShadow: "none",
        padding: 0,
        transition: "color 0.3s"
      }}
    >
      <a href="#home" style={{ color: dark ? "#fff" : "#222", textDecoration: "none", transition: "color 0s" }}>Home</a>
      <a href="#skills" style={{ color: dark ? "#fff" : "#222", textDecoration: "none", transition: "color 0s" }}>Skills</a>
      <a href="#projects" style={{ color: dark ? "#fff" : "#222", textDecoration: "none", transition: "color 0s" }}>Projects</a>
      <a href="#contact" style={{ color: dark ? "#fff" : "#222", textDecoration: "none", transition: "color 0s" }}>Contact</a>
    </div>
  );
};
