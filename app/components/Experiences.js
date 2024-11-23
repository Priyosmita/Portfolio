import { useGLTF, useAnimations } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Experiences = ({ position = [0, 0, 0], scale = [1, 1, 1], rotation = [0, 30, 0]}) => { // Tilt as a prop with default value
  const { scene, animations } = useGLTF('/assets/experiences/scene.gltf'); // Load the GLTF file
  const { actions } = useAnimations(animations, scene); // Bind animations to the scene
  const educationRef = useRef(); // Ref to access the asset object

  // Play the correct animation on loop
  useEffect(() => {
    if (actions['Armature|Bloom']) { // Adjusted for the correct animation name
      actions['Armature|Bloom'].play(); // Play the animation
    }
  }, [actions]);

  return (
    <primitive
      ref={educationRef}
      object={scene}
      position={position}
      scale={scale}
      rotation={rotation}
    />
  );
};

export default Experiences;