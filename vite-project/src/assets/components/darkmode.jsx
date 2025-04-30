import React, { createContext, useContext, useState } from "react";

const DarkModeContext = createContext();

export function useDarkMode() {
  return useContext(DarkModeContext);
}

export function DarkModeProvider({ children }) {
  const [dark, setDark] = useState(false);
  const toggleDark = () => setDark((d) => !d);

  return (
    <DarkModeContext.Provider value={{ dark, toggleDark }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function DarkModeToggle() {
  const { dark, toggleDark } = useDarkMode();
  return (
    <button
      onClick={toggleDark}
      style={{
        position: "absolute",
        top: 20,
        right: 20,
        zIndex: 10,
        padding: "0.5em 1em",
        borderRadius: "1em",
        border: "none",
        background: dark ? "#222" : "#eee",
        color: dark ? "#fff" : "#222",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        cursor: "pointer"
      }}
    >
      {dark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
