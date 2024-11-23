import { useGLTF } from '@react-three/drei';
import { useRef, useEffect } from 'react';

const Bush = ({
  positions = [[-15,0,45],[-25,0,45],[-30,0,44],[-39,0,45],[-45,0,37],[-44,0,28],[-44,0,15],[-44,0,10],[-44,0,0],[-44,0,-12],[-44,0,-17],[-44,0,-30],
  [17,0,45],[26,0,45],[31,0,44],[39,0,45],[45,0,37],[44,0,28],[44,0,15],[44,0,10],[44,0,0],[44,0,-12],[44,0,-17],[44,0,-30]], // Default to one position, but you can pass multiple positions
  scale = [0.8, 0.8, 0.8],
  rotation = [[0,30,0],[0,30,0],[0,90,0],[0,120,0],[0,0,0],[0,0,0],[0,160,0],[0,0,0],[0,0,0],[0,160,0],[0,0,0],[0,160,0],
  [0,-30,0],[0,-30,0],[0,-90,0],[0,-120,0],[0,0,0],[0,0,0],[0,-160,0],[0,0,0],[0,0,0],[0,-160,0],[0,0,0],[0,-160,0],[0,0,0],], // Rotation can be applied globally or individually
}) => {
  const { scene } = useGLTF('/assets/bush/scene.gltf'); // Load the GLTF file

  return (
    <>
      {positions.map((position, index) => (
        <primitive
          key={`bush-${index}`} // Unique key for each tree
          object={scene.clone()} // Clone the scene to prevent overriding
          position={position} // Use the passed position for each tree
          scale={scale}
          rotation={rotation[index]} // Apply the rotation (if provided)
        />
      ))}
    </>
  );
};

export default Bush;