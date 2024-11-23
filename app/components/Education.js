import { useGLTF, useAnimations } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Education = ({ position = [0, 0, 0], scale = [0.1, 0.1, 0.1], tilt = 0.7 }) => { // Tilt as a prop with default value
  const { scene, animations } = useGLTF('/assets/education/scene.gltf'); // Load the GLTF file
  const { actions } = useAnimations(animations, scene); // Bind animations to the scene
  const educationRef = useRef(); // Ref to access the asset object

  // Play the correct animation on loop
  useEffect(() => {
    if (actions['Scene']) { // Adjusted for the correct animation name
      actions['Scene'].play(); // Play the animation
    }
  }, [actions]);

  return (
    <primitive
      ref={educationRef}
      object={scene}
      position={position}
      scale={scale}
      rotation={[tilt, 0, 0]} // Apply the slight tilt to the x-axis
    />
  );
};

export default Education;