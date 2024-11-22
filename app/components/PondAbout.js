import { useGLTF, useAnimations } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const PondAbout = ({ position = [0, 0, 0], scale = [0.05, 0.05, 0.05] }) => {
  const { scene, animations } = useGLTF('/assets/pond_about/scene.gltf'); // Load the GLTF file
  const { actions } = useAnimations(animations, scene); // Bind animations to the scene
  const pondRef = useRef(); // Ref to access the pond object

  // Play the correct animation on loop
  useEffect(() => {
    if (actions['Take 001']) { // Adjusted for the correct animation name
      actions['Take 001'].play(); // Play the animation
    }
  }, [actions]);

  // Apply rotation to the GLTF scene
  useEffect(() => {
    if (scene) {
      scene.rotation.y = -Math.PI / 2; // Apply a 90-degree rotation on the X-axis
    }
  }, [scene]);

  return <primitive ref={pondRef} object={scene} position={position} scale={scale} />;
};

export default PondAbout;