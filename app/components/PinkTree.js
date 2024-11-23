import { useGLTF } from '@react-three/drei';
import { useRef, useEffect } from 'react';

const PinkTree = ({
  positions = [[-25,0,42],[-40,0,20],
  [-5,0,19]], // Default to one position, but you can pass multiple positions
  scale = [0.1, 0.1, 0.1],
  rotation = [[0,0,0],[0,30,0]], // Rotation can be applied globally or individually
}) => {
  const { scene } = useGLTF('/assets/pinktree/scene.gltf'); // Load the GLTF file

  return (
    <>
      {positions.map((position, index) => (
        <primitive
          key={`pinktree-${index}`} // Unique key for each tree
          object={scene.clone()} // Clone the scene to prevent overriding
          position={position} // Use the passed position for each tree
          scale={scale}
          rotation={rotation[index]} // Apply the rotation (if provided)
        />
      ))}
    </>
  );
};

export default PinkTree;