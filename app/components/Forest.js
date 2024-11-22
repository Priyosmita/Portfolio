import { Canvas, useThree } from '@react-three/fiber';
import CameraAndPikachu from './CameraAndPikachu';
import { useEffect } from 'react';
import * as THREE from 'three';

const SetBackgroundColor = ({ color }) => {
  const { scene } = useThree(); // Access the Three.js scene object
  useEffect(() => {
    scene.background = new THREE.Color(color); // Set the background color
  }, [scene, color]); // Reapply if the color changes
  return null; // This is just a helper component, no rendering
};

const Ground = ({ color }) => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
    {/* Plane geometry to act as the ground */}
    <planeGeometry args={[100, 100]} />
    <meshStandardMaterial color={color} />
  </mesh>
);

export default function Forest() {
  return (
    <Canvas gl={{ antialias: true }}>
      {/* Set Background Color */}
      <SetBackgroundColor color="#aaf274" />

      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={4}
        color="#ffd917" // Warm sunlight color
      />

      {/* Ground */}
      <Ground color="#57fa3e" />

      {/* Pikachu */}
      <CameraAndPikachu />
    </Canvas>
  );
}