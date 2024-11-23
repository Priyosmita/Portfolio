import { useGLTF } from '@react-three/drei';
import { useRef, useEffect } from 'react';

const YellowTree = ({
  positions = [[-15,0,40],[-30,0,37],[-34,0,16]], // Default to one position, but you can pass multiple positions
  scale = [1, 1, 1],
  rotation = [0,0,0], // Rotation can be applied globally or individually
}) => {
  const { scene } = useGLTF('/assets/yellowtree/scene.gltf'); // Load the GLTF file

  return (
    <>
      {positions.map((position, index) => (
        <primitive
          key={`yellowtree-${index}`} // Unique key for each tree
          object={scene.clone()} // Clone the scene to prevent overriding
          position={position} // Use the passed position for each tree
          scale={scale}
          rotation={rotation} // Apply the rotation (if provided)
        />
      ))}
    </>
  );
};

export default YellowTree;