import { Canvas, useThree } from '@react-three/fiber';
import CameraAndPikachu from './CameraAndPikachu';
import { useEffect } from 'react';
import * as THREE from 'three';
import PondAbout from './PondAbout';
import TreeSpawn from './TreeSpawn';
import Bush from './Bush';
import Education from './Education';
import SkillsProjects from './SkillsProjects';
import Experiences from './Experiences';
import Awards from './Awards';
import Contact from './Contact';

const SetBackgroundColor = ({ color }) => {
  const { scene } = useThree(); // Access the Three.js scene object
  useEffect(() => {
    scene.background = new THREE.Color(color); // Set the background color
  }, [scene, color]); // Reapply if the color changes
  return null; // This is just a helper component, no rendering
};

const Ground = ({ color }) => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 12]}>
    {/* Plane geometry to act as the ground */}
    <planeGeometry args={[100, 100]} />
    <meshStandardMaterial color={color} />
  </mesh>
);

export default function Forest() {
  return (
    <Canvas gl={{ antialias: true }}>
      {/* Set Background Color */}
      <SetBackgroundColor color="#8de2fc" />

      {/* Lighting */}
      <ambientLight intensity={0.1} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={4}
      // color="#ffd917" // Warm sunlight color
      />

      {/* Ground */}
      <Ground color="#0bfc03" />

      {/* Pikachu */}
      <CameraAndPikachu />

      {/* PondAbout */}
      <PondAbout
        position={[0, 1, 25]} // Adjust the position as needed
        scale={[0.6, 0.4, 0.7]} // Keep the original scale
      />

      {/* Education */}
      <Education
        position={[-30, 3, 25]} // Adjust the position as needed
        scale={[0.007, 0.007, 0.02]} // Keep the original scale
        rotation={[120, 0, 0]}
      />

      {/* Skills+Projects */}
      <SkillsProjects
        position={[-25, 0, 0]} // Adjust the position as needed
        scale={[3.5, 3.5, 3.5]}
        rotation={[0,0,0]} />

      {/* Experiences */}
      <Experiences
        position={[0, -4, -7]} // Adjust the position as needed
        scale={[0.9, 0.9, 0.9]}/>

      {/* Awards */}
      <Awards
        position={[30, 0, 5]} // Adjust the position as needed
        scale={[2.5, 1.2, 2.5]}/>

      {/* Contact */}
      <Contact
        position={[30, 4, 30]} // Adjust the position as needed
        scale={[0.5, 0.5, 0.5]}/>

      {/* Trees */}
      <TreeSpawn />
      <Bush />
    </Canvas>
  );
}