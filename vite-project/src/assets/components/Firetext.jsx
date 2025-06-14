 import React, { useRef, useMemo } from 'react';
import { Float, Text3D, shaderMaterial } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Advanced Fire Shader Material
const AdvancedFireMaterial = shaderMaterial(
  {
    uTime: 0,
    uEmissive: new THREE.Color('#ffae00'),
    uIntensity: 3.5,
  },
  `
    varying vec2 vUv;
    varying float vFlame;
    uniform float uTime;

    // 2D noise (Perlin-like)
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }

    void main() {
      vUv = uv;
      vec3 pos = position;

      float t = uTime * 1.8;
      float flameNoise = noise(vec2(pos.x * 3.0, pos.y * 6.0 - t));
      float flameDistortion = flameNoise * 0.18;
      float flicker = sin(pos.x * 12.0 + t * 3.5) * 0.04;
      float distortion = (flameDistortion + flicker) * pow(vUv.y, 2.0);

      pos.y += distortion;
      vFlame = distortion;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  `
    varying vec2 vUv;
    varying float vFlame;
    uniform vec3 uEmissive;
    uniform float uIntensity;
    uniform float uTime;

    void main() {
      float flicker = sin(uTime * 5.0 + vUv.x * 20.0) * 0.04;

      // Gradient Fire Color
      vec3 baseColor = mix(vec3(1.0, 0.6, 0.1), vec3(1.0, 0.2, 0.0), vUv.y + flicker);
      baseColor = mix(baseColor, vec3(1.0, 1.0, 1.0), vUv.y * 0.4);

      // Hot Glow Rim
      float rim = smoothstep(0.6, 1.0, vUv.y + vFlame);
      vec3 glow = uEmissive * rim * uIntensity;

      // Ember Pop
      float ember = smoothstep(0.85, 1.0, vUv.y + 0.15 * sin(uTime * 3.5 + vUv.x * 15.0));
      vec3 emberColor = mix(vec3(1.0, 0.7, 0.2), vec3(1.0, 0.2, 0.0), ember) * ember * 2.0;

      // Light Smoke layer
      float smoke = smoothstep(0.5, 1.0, vUv.y) * 0.15;

      float alpha = 0.92 - smoke;
      vec3 finalColor = baseColor + glow + emberColor;

      gl_FragColor = vec4(finalColor, alpha);
      if (gl_FragColor.a < 0.05) discard;
    }
  `
);

extend({ AdvancedFireMaterial });

// Reusable Component
export const FireText = ({
  text = "FIRE TEXT",
  position = [0, 0, 0],
  size = 1,
  rotation = [0, 0, 0],
  fontUrl = "https://unpkg.com/three@0.150.1/examples/fonts/helvetiker_regular.typeface.json"
}) => {
  const materialRef = useRef();

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uTime = performance.now() / 1000;
    }
  });

  const fireMaterial = useMemo(() => (
    <advancedFireMaterial ref={materialRef} uEmissive={new THREE.Color('#ff2e00')} uIntensity={3.5} />
  ), []);

  return (
    <Float speed={0.5} rotationIntensity={0.3} floatIntensity={0.3}>
      <Text3D
        font={fontUrl}
        size={size}
        height={0.15}
        bevelEnabled
        bevelSize={0.02}
        bevelThickness={0.02}
        position={position}
        rotation={rotation}
      >
        {text}
        {fireMaterial}
      </Text3D>
    </Float>
  );
};
