import { useGLTF, useAnimations } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Awards = ({ position = [0, 0, 0], scale = [1, 1, 1]}) => { // Tilt as a prop with default value
  const { scene, animations } = useGLTF('/assets/awards/scene.gltf'); // Load the GLTF file
  const { actions } = useAnimations(animations, scene); // Bind animations to the scene
  const awardsRef = useRef(); // Ref to access the asset object

  // Play the correct animation on loop
  useEffect(() => {
    if (actions['Loop']) { // Adjusted for the correct animation name
      actions['Loop'].play(); // Play the animation
    }
  }, [actions]);

  return (
    <primitive
      ref={awardsRef}
      object={scene}
      position={position}
      scale={scale}
      rotation={[0, 35, 0]} // Apply the slight tilt to the x-axis
    />
  );
};

export default Awards;