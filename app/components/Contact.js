import { useGLTF, useAnimations } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Contact = ({ position = [0, 0, 0], scale = [1, 1, 1]}) => { // Tilt as a prop with default value
  const { scene, animations } = useGLTF('/assets/contact/scene.gltf'); // Load the GLTF file
  const { actions } = useAnimations(animations, scene); // Bind animations to the scene
  const contactRef = useRef(); // Ref to access the asset object

  // Play the correct animation on loop
  useEffect(() => {
    if (actions['Armature|Play']) { // Adjusted for the correct animation name
      actions['Armature|Play'].play(); // Play the animation
    }
  }, [actions]);

  return (
    <primitive
      ref={contactRef}
      object={scene}
      position={position}
      scale={scale}
      rotation={[0, 35, 0]} 
    />
  );
};

export default Contact;