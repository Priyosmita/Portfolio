import { useGLTF, useAnimations } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SkillsProjects = ({ position = [0, 0, 0], scale = [1, 1, 1]}) => { // Tilt as a prop with default value
  const { scene, animations } = useGLTF('/assets/skills+projects/scene.gltf'); // Load the GLTF file
  const { actions } = useAnimations(animations, scene); // Bind animations to the scene
  const skillsprojectsRef = useRef(); // Ref to access the asset object

  // Play the correct animation on loop
  useEffect(() => {
    if (actions['Move']) { // Adjusted for the correct animation name
      actions['Move'].play(); // Play the animation
    }
  }, [actions]);

  return (
    <primitive
      ref={skillsprojectsRef}
      object={scene}
      position={position}
      scale={scale}
      rotation={[0, -45, 0]} // Apply the slight tilt to the x-axis
    />
  );
};

export default SkillsProjects;