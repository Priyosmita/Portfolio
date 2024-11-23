import { useGLTF } from '@react-three/drei';
import { useRef, useEffect } from 'react';

const GreenTree = ({
  positions = [[-35,0,40],[-35,0,32]], // Default to one position, but you can pass multiple positions
  scale = [1, 1, 1],
  rotation = [[0,0,0],[0,90,0]], // Rotation can be applied globally or individually
}) => {
  const { scene } = useGLTF('/assets/greentree/scene.gltf'); // Load the GLTF file

  return (
    <>
      {positions.map((position, index) => (
        <primitive
          key={`greentree-${index}`} // Unique key for each tree
          object={scene.clone()} // Clone the scene to prevent overriding
          position={position} // Use the passed position for each tree
          scale={scale}
          rotation={rotation[index]} // Apply the rotation (if provided)
        />
      ))}
    </>
  );
};

export default GreenTree;