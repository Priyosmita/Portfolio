import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

export default function CameraAndPikachu() {
  const pikachuRef = useRef();
  const camera = useThree((state) => state.camera);
  const mixer = useRef(null);
  const currentAction = useRef(null);
  const animations = useRef({});
  const keysPressed = useRef({});
  
  // Load the Pikachu model and its animations
  const { scene, animations: gltfAnimations } = useGLTF('/assets/pikachu/scene.gltf');

  const [position, setPosition] = useState([0, 0, 45]);
  const [rotation, setRotation] = useState(0);
  const currentRotation = useRef(0);
  
  const speed = 0.1;
  const rotationSpeed = 0.05;
  
  // Vector for movement calculations
  const movementVector = useRef(new THREE.Vector3());

  // Load animations
  useEffect(() => {
    if (scene && gltfAnimations.length) {
      mixer.current = new THREE.AnimationMixer(scene);
      gltfAnimations.forEach((clip) => {
        animations.current[clip.name] = mixer.current.clipAction(clip);
      });
      playAnimation('Idle');
    }
  }, [scene, gltfAnimations]);

  const playAnimation = (name) => {
    if (currentAction.current !== animations.current[name] && animations.current[name]) {
      if (currentAction.current) {
        currentAction.current.fadeOut(0.5);
      }
      currentAction.current = animations.current[name];
      currentAction.current.reset().fadeIn(0.5).play();
    }
  };

  // Handle keyboard input for movement controls
  useEffect(() => {
    const handleKeyDown = (event) => {
      keysPressed.current[event.key] = true;
    };

    const handleKeyUp = (event) => {
      keysPressed.current[event.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Move Pikachu based on key presses
  useEffect(() => {
    const movePikachu = () => {
      const forward = keysPressed.current['w'] || keysPressed.current['ArrowUp'];
      const backward = keysPressed.current['s'] || keysPressed.current['ArrowDown'];
      const left = keysPressed.current['a'] || keysPressed.current['ArrowLeft'];
      const right = keysPressed.current['d'] || keysPressed.current['ArrowRight'];

      if (left) setRotation((prev) => prev + rotationSpeed);
      if (right) setRotation((prev) => prev - rotationSpeed);

      movementVector.current.set(0, 0, 0);
      
      if (forward || backward || left || right) {
        playAnimation('Walking');
      } else {
        playAnimation('Idle');
      }
      
      if (forward) movementVector.current.z = speed;
      if (backward) movementVector.current.z = -speed;

      movementVector.current.applyAxisAngle(new THREE.Vector3(0, 1, 0), currentRotation.current);

      setPosition((prevPosition) => [
        prevPosition[0] + movementVector.current.x,
        prevPosition[1],
        prevPosition[2] + movementVector.current.z,
      ]);
    };

    const interval = setInterval(movePikachu, 16);
    return () => clearInterval(interval);
  }, []);

  // Update camera position and animation frame
  useFrame((state, delta) => {
    if (pikachuRef.current) {
      currentRotation.current += (rotation - currentRotation.current) * 0.1;
      pikachuRef.current.rotation.y = currentRotation.current;
      
      pikachuRef.current.position.set(...position);
      
      const [x, y] = position;
      
      camera.position.set(x, y + 10, position[2] + 12); // Set camera position above Pikachu
      camera.lookAt(x, y, position[2]); // Make camera look at Pikachu's position
    }
    
    if (mixer.current) {
      mixer.current.update(delta); // Update animation mixer on each frame
    }
  });

  // Adjust material color to make Pikachu warmer
  useEffect(() => {
    if (scene) {
      // Traverse the model and change material properties
      scene.traverse((child) => {
        if (child.isMesh) {
          child.material.color.setHex(0xffc107); // Warm yellow color
          child.material.emissive.setHex(0xffb300); // Slightly emissive yellow glow for warmth
          child.material.emissiveIntensity = 0; // Adjust the emissive glow intensity
        }
      });
    }
  }, [scene]);

  return <primitive ref={pikachuRef} object={scene} scale={2} />;
}