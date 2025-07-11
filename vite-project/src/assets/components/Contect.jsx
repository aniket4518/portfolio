import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, useTexture } from '@react-three/drei';

// Contact links - Replace with your actual links
const CONTACT_LINKS = {
  twitter: "https://x.com/Aniket_jha4518", // Replace with your X/Twitter
  linkedin: "www.linkedin.com/in/aniket-jha-9264422b7", // Replace with your LinkedIn
  github: "https://github.com/aniket4518", // Replace with your GitHub
  mail: "mailto:jhaaniket2005@gmail.com"  
};

// Contact logos configuration
const CONTACT_LOGOS = [
  {
    name: "X (Twitter)",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twitter/twitter-original.svg",
    position: [-5, 2, 46],
    color: "#1DA1F2",
    link: CONTACT_LINKS.twitter
  },
  {
    name: "LinkedIn",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
    position: [-4, 2, 46],
    color: "#0077B5",
    link: CONTACT_LINKS.linkedin
  },
  {
    name: "GitHub",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    position: [-3, 2, 46],
    color: "#333333",
    link: CONTACT_LINKS.github
  },
  {
    name: "Email",
    icon: "📧", // Using emoji for email icon
    position: [-2, 2, 46],
    color: "#EA4335",
    link: CONTACT_LINKS.mail,
    isEmoji: true
  }
];

// Preload textures for better performance
CONTACT_LOGOS.forEach(contact => {
  if (!contact.isEmoji) {
    useTexture.preload(contact.icon);
  }
});

// Individual 3D Contact Logo Component
function ContactLogo({ contact, index }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  // Load texture only for non-emoji icons
  const texture = contact.isEmoji ? null : useTexture(contact.icon);
  
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    
    const time = clock.elapsedTime;
    const offset = index * 0.3;
    
    // Floating animation
    meshRef.current.position.y = contact.position[1] + Math.sin(time + offset) * 0.1;
    
    // Gentle rotation
    meshRef.current.rotation.y = Math.sin(time * 0.5 + offset) * 0.2;
    
    // Click animation
    if (clicked) {
      meshRef.current.rotation.z = Math.sin(time * 10) * 0.3;
      // Reset click state after animation
      setTimeout(() => setClicked(false), 500);
    } else {
      meshRef.current.rotation.z = 0;
    }
    
    // Hover effects
    if (hovered) {
      meshRef.current.scale.setScalar(1.3);
    } else {
      meshRef.current.scale.setScalar(1);
    }
  });
  
  const handleClick = () => {
    setClicked(true);
    // Open link in new tab
    window.open(contact.link, '_blank');
  };
  
  return (
    <group>
      {/* 3D Logo Box */}
      <mesh
        ref={meshRef}
        position={contact.position}
        onClick={handleClick}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.7, 0.7, 0.14]} />
        {contact.isEmoji ? (
          <meshStandardMaterial 
            color={contact.color}
            roughness={0.3}
            metalness={0.1}
          />
        ) : (
          <meshStandardMaterial 
            map={texture} 
            transparent
            roughness={0.3}
            metalness={0.1}
          />
        )}
      </mesh>
      
      {/* Emoji text for email */}
      {contact.isEmoji && (
        <Text
          position={[contact.position[0], contact.position[1], contact.position[2] + 0.08]}
          fontSize={0.42}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          📧
        </Text>
      )}
      
      {/* Contact name label */}
      <Text
        position={[contact.position[0], contact.position[1] - 0.56, contact.position[2]]}
        fontSize={0.105}
        color="#000000"
        anchorX="center"
        anchorY="middle"
      >
        {contact.name}
      </Text>
      
      {/* Glow effect when hovered */}
      {hovered && (
        <mesh position={[contact.position[0], contact.position[1], contact.position[2] - 0.05]}>
          <boxGeometry args={[1.0, 1.0, 0.1]} />
          <meshStandardMaterial 
            color={contact.color}
            transparent
            opacity={0.4}
            emissive={contact.color}
            emissiveIntensity={0.5}
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
      )}
    </group>
  );
}

// Main Contact Section Component
export function Contact3D({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* Contact Section Title */}
      <Text
        position={[-3.5, 3, 46]}
        fontSize={0.35}
        color="#000000"
        anchorX="center"
        anchorY="middle"
      >
        GET IN TOUCH
      </Text>
      
      {/* Contact Description */}
      <Text
        position={[-3.5, 1, 46]}
        fontSize={0.14}
        color="#333333"
        anchorX="center"
        anchorY="middle"
        maxWidth={5.6}
      >
        Let's connect! Feel free to reach out through any of these platforms
      </Text>
      
      {/* Contact Logos */}
      {CONTACT_LOGOS.map((contact, index) => (
        <ContactLogo
          key={contact.name}
          contact={contact}
          index={index}
        />
      ))}
      
      {/* Background decoration */}
      <mesh position={[-4, 1.5, 45]} rotation={[0, 0, 0]}>
        <planeGeometry args={[6, 2.8]} />
        <meshStandardMaterial 
          color="#ffffff"
          transparent
          opacity={0.9}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}


   
