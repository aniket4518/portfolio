import React, { useState, useEffect } from 'react';
import './VirtualControls.css';

const VirtualControls = ({ onMove, isMobile }) => {
  const [activeKeys, setActiveKeys] = useState(new Set());

  const handleKeyPress = (key, isPressed) => {
    setActiveKeys(prev => {
      const newKeys = new Set(prev);
      if (isPressed) {
        newKeys.add(key);
      } else {
        newKeys.delete(key);
      }
      return newKeys;
    });

    // Call the movement handler
    if (onMove) {
      onMove(key, isPressed);
    }
  };

  const handleTouchStart = (e, key) => {
    e.preventDefault();
    handleKeyPress(key, true);
  };

  const handleTouchEnd = (e, key) => {
    e.preventDefault();
    handleKeyPress(key, false);
  };

  const handleMouseDown = (e, key) => {
    e.preventDefault();
    handleKeyPress(key, true);
  };

  const handleMouseUp = (e, key) => {
    e.preventDefault();
    handleKeyPress(key, false);
  };

  if (!isMobile) return null;

  return (
    <div className="virtual-controls">
      {/* Movement pad */}
      <div className="movement-pad">
        {/* W key - Up */}
        <button
          className={`control-btn up-btn ${activeKeys.has('w') ? 'active' : ''}`}
          onTouchStart={(e) => handleTouchStart(e, 'w')}
          onTouchEnd={(e) => handleTouchEnd(e, 'w')}
          onMouseDown={(e) => handleMouseDown(e, 'w')}
          onMouseUp={(e) => handleMouseUp(e, 'w')}
          onMouseLeave={(e) => handleMouseUp(e, 'w')}
        >
          <span>W</span>
          <div className="arrow">↑</div>
        </button>

        {/* Middle row */}
        <div className="middle-row">
          {/* A key - Left */}
          <button
            className={`control-btn left-btn ${activeKeys.has('a') ? 'active' : ''}`}
            onTouchStart={(e) => handleTouchStart(e, 'a')}
            onTouchEnd={(e) => handleTouchEnd(e, 'a')}
            onMouseDown={(e) => handleMouseDown(e, 'a')}
            onMouseUp={(e) => handleMouseUp(e, 'a')}
            onMouseLeave={(e) => handleMouseUp(e, 'a')}
          >
            <span>A</span>
            <div className="arrow">←</div>
          </button>

          {/* D key - Right */}
          <button
            className={`control-btn right-btn ${activeKeys.has('d') ? 'active' : ''}`}
            onTouchStart={(e) => handleTouchStart(e, 'd')}
            onTouchEnd={(e) => handleTouchEnd(e, 'd')}
            onMouseDown={(e) => handleMouseDown(e, 'd')}
            onMouseUp={(e) => handleMouseUp(e, 'd')}
            onMouseLeave={(e) => handleMouseUp(e, 'd')}
          >
            <span>D</span>
            <div className="arrow">→</div>
          </button>
        </div>

        {/* S key - Down */}
        <button
          className={`control-btn down-btn ${activeKeys.has('s') ? 'active' : ''}`}
          onTouchStart={(e) => handleTouchStart(e, 's')}
          onTouchEnd={(e) => handleTouchEnd(e, 's')}
          onMouseDown={(e) => handleMouseDown(e, 's')}
          onMouseUp={(e) => handleMouseUp(e, 's')}
          onMouseLeave={(e) => handleMouseUp(e, 's')}
        >
          <span>S</span>
          <div className="arrow">↓</div>
        </button>
      </div>

      {/* Instructions */}
      <div className="controls-hint">
        <span>Tap to move character</span>
      </div>
    </div>
  );
};

export default VirtualControls;
