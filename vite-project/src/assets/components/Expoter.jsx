import React, { Suspense } from "react";
import { 
   ContactShadows,
  Environment,  
} from "@react-three/drei"
import Model from "./avatar"
import { Page , SkillsPage ,ProjectsPage , ContactsPage} from "./pages"
import { Dragon } from "./Homemodel"
import { Skills3DBox } from "./skillpage";
import { Menu } from "./Header";
 import { Butterfly } from "./butterfly";
import { FireText } from "./Firetext";
import { Phoenix } from "./Phoenix";
import { Board } from "./board";
 
 
export const Expoter = ({ dark }) => {
    return (
      <>
         
        <Environment preset ="city" />
        <Model />
        {/* Floor with shadow */}
        <ContactShadows opacity={1} scale={[10, 10]} color="#9c8e66" />
        <mesh position-y={-0.001} rotation-x={-Math.PI/2}> 
          <planeGeometry args={[100, 150]} />
          <meshStandardMaterial
            color="#f5f3ee"
            transparent
            opacity={0.5} />
        </mesh>
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
        <Board dark={dark}/>
         <FireText
       text="About Me!"
       position={[-6, 3, -10]}
          size={0.7}
/>

       <FireText
  text="I am Aniket Jha, a passionate fullstack developer."
  position={[-6, 1.5, -10]}
  size={0.5}
/>

        </>
    )
}






