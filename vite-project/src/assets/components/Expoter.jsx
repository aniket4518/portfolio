import React, { Suspense } from "react";
import { 
   ContactShadows,
  Environment,
  useTexture  
} from "@react-three/drei"
import Model from "./Avatar"
import { Page , SkillsPage ,ProjectsPage , ContactsPage} from "./Pages"
import { Dragon } from "./Homemodel"
import { Skills3DBox } from "./skillpage";
 import {Flower} from "./Flower"
 import { Butterfly } from "./Butterfly";
import { FireText } from "./Firetext";
import { Contact3D } from "./Contect";
 
import { Board } from "./board";



// Floor component with texture
const Floor = () => {
  // You can replace this URL with any floor texture you want
  // For example: wood floor, marble, concrete, etc.
  const floorTexture = useTexture(' data:image/jpeg;base64,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');
  
  // Configure texture properties for better appearance
  floorTexture.wrapS = floorTexture.wrapT = 1000; // RepeatWrapping
  floorTexture.repeat.set(20, 30); // Repeat the texture
  
  return (
    <mesh position-y={-0.001} rotation-x={-Math.PI/2}> 
      <planeGeometry args={[100, 150]} />
      <meshStandardMaterial
        map={floorTexture}
        roughness={0.8}
        metalness={0.1}
        transparent={false} 
      />
    </mesh>
  );
};


export const Expoter = ({ dark }) => {
    return (
      <>
         
        <Environment preset ="city" />
        <Model />
        {/* Floor with shadow */}
        <ContactShadows opacity={1} scale={[10, 10]} color="#000000" />
        <Floor />
        {/* pages */}
        <Page dark={dark}/>
        <SkillsPage dark={dark}>
        
        </SkillsPage>
          
        <Suspense fallback={null}>
        <Skills3DBox/>
          <Dragon />
        </Suspense>
        
        
        <ProjectsPage dark={dark}/>
        <ContactsPage dark={dark}/>
        <Butterfly dark={dark}/>
         <Flower/>
        <Board dark={dark}/>
         <FireText
       text="About Me!"
       position={[-7, 4, -25]}
          size={0.7}
/>

       <FireText
  text="I am Aniket Jha, a passionate fullstack developer."
  position={[-7, 2, -25]}
  size={0.5}
/>   
<Contact3D/>
   

        </>

    )
}






