import { useEffect, useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const useCharacterMovement = (meshRef, speed = 0.05) => {
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false
  });

  const velocityRef = useRef(new THREE.Vector3());
  const directionRef = useRef(new THREE.Vector3());

  // Listen for virtual control events
  useEffect(() => {
    const handleCharacterMove = (event) => {
      const { key, isPressed } = event.detail;
      
      setMovement(prev => ({
        ...prev,
        [getMovementKey(key)]: isPressed
      }));
    };

    const getMovementKey = (key) => {
      switch(key) {
        case 'w': return 'forward';
        case 's': return 'backward';
        case 'a': return 'left';
        case 'd': return 'right';
        default: return 'forward';
      }
    };

    // Listen for keyboard events (for desktop)
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();
      if (['w', 'a', 's', 'd'].includes(key)) {
        setMovement(prev => ({
          ...prev,
          [getMovementKey(key)]: true
        }));
      }
    };

    const handleKeyUp = (event) => {
      const key = event.key.toLowerCase();
      if (['w', 'a', 's', 'd'].includes(key)) {
        setMovement(prev => ({
          ...prev,
          [getMovementKey(key)]: false
        }));
      }
    };

    window.addEventListener('characterMove', handleCharacterMove);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('characterMove', handleCharacterMove);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Apply movement in animation frame
  useFrame(() => {
    if (!meshRef.current) return;

    // Reset velocity
    velocityRef.current.set(0, 0, 0);

    // Calculate movement direction
    if (movement.forward) velocityRef.current.z -= speed;
    if (movement.backward) velocityRef.current.z += speed;
    if (movement.left) velocityRef.current.x -= speed;
    if (movement.right) velocityRef.current.x += speed;

    // Apply movement to mesh
    if (velocityRef.current.length() > 0) {
      meshRef.current.position.add(velocityRef.current);
      
      // Rotate character to face movement direction (optional)
      if (velocityRef.current.x !== 0 || velocityRef.current.z !== 0) {
        directionRef.current.copy(velocityRef.current).normalize();
        const angle = Math.atan2(directionRef.current.x, directionRef.current.z);
        meshRef.current.rotation.y = angle;
      }
    }
  });

  return movement;
};
