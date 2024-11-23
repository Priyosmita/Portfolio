import { useGLTF, useAnimations } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const GreenTree = ({ position = [0, 0, 0], scale = [0.05, 0.05, 0.05] }) => {
  const { scene } = useGLTF('/assets/greentree/scene.gltf'); // Load the GLTF file
  const pinktreeRef = useRef(); // Ref to access the pond object

  return <primitive ref={greentreeRef} object={scene} position={position} scale={scale} />;
};

export default GreenTree;