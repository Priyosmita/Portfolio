import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

// Forest component to display a mystical forest with the Pikachu model
export default function Forest() {
  return (
    <Canvas>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} />

      {/* Ground */}
      <mesh receiveShadow position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="green" />
      </mesh>

      {/* Pikachu Model */}
      <CameraAndFox />
    </Canvas>
  );
}

// Camera and Pikachu component handling model loading, movement, and animations
const CameraAndFox = () => {
  const foxRef = useRef(); // Reference to the Pikachu model
  const camera = useThree((state) => state.camera); // Access the camera
  const mixer = useRef(null); // Animation mixer
  const currentAction = useRef(null); // Tracks current animation action
  const animations = useRef({}); // Stores available animations
  const keysPressed = useRef({}); // Tracks pressed keys

  // Load the GLTF model
  const { scene, animations: gltfAnimations } = useGLTF('/assets/pikachu/scene.gltf');

  const [position, setPosition] = useState([0, 0, 0]); // Pikachu position
  const [rotation, setRotation] = useState(0); // Pikachu rotation (y-axis)
  const currentRotation = useRef(0); // Tracks current rotation for smoothness

  const speed = 0.1; // Movement speed
  const rotationSpeed = 0.05; // Rotation speed
  const movementVector = useRef(new THREE.Vector3()); // Tracks direction of movement

  // Initialize animations
  useEffect(() => {
    if (scene && gltfAnimations.length) {
      // Initialize Animation Mixer
      mixer.current = new THREE.AnimationMixer(scene);

      // Store actions
      gltfAnimations.forEach((clip) => {
        animations.current[clip.name] = mixer.current.clipAction(clip);
      });

      // Play the "Idle" animation by default
      playAnimation('Idle');
    }
  }, [scene, gltfAnimations]);

  // Play a specific animation
  const playAnimation = (name) => {
    if (currentAction.current !== animations.current[name] && animations.current[name]) {
      if (currentAction.current) {
        currentAction.current.fadeOut(0.5);
      }
      currentAction.current = animations.current[name];
      currentAction.current.reset().fadeIn(0.5).play();
    }
  };

  // Handle key events (for movement control)
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

  // Update position and rotation based on keys (W/S or Arrow keys for movement)
  useEffect(() => {
    const moveFox = () => {
      const forward = keysPressed.current['w'] || keysPressed.current['ArrowUp']; // Move forward
      const backward = keysPressed.current['s'] || keysPressed.current['ArrowDown']; // Move backward
      const left = keysPressed.current['a'] || keysPressed.current['ArrowLeft']; // Move left
      const right = keysPressed.current['d'] || keysPressed.current['ArrowRight']; // Move right

      // Rotate Pikachu in place
      if (left) setRotation((prev) => prev + rotationSpeed);
      if (right) setRotation((prev) => prev - rotationSpeed);

      // Update movement vector based on rotation and keys
      movementVector.current.set(0, 0, 0);
      if (forward) {
        movementVector.current.z = speed; // Move forward along the negative z-axis
        playAnimation('Walking');
      } else if (backward) {
        movementVector.current.z = -speed; // Move backward along the positive z-axis
        playAnimation('Walking');
      } else {
        playAnimation('Idle'); // Play Idle if no movement
      }

      // Apply rotation to movement direction (rotate the movement vector by the current rotation)
      movementVector.current.applyAxisAngle(new THREE.Vector3(0, 1, 0), currentRotation.current);

      // Update position with the movement vector
      setPosition((prevPosition) => [
        prevPosition[0] + movementVector.current.x,
        prevPosition[1],
        prevPosition[2] + movementVector.current.z,
      ]);
    };

    const interval = setInterval(moveFox, 16); // ~60 FPS
    return () => clearInterval(interval);
  }, []);

  // Smoothly interpolate the rotation and update the camera
  useFrame((state, delta) => {
    if (foxRef.current) {
      // Smooth rotation interpolation
      currentRotation.current += (rotation - currentRotation.current) * 0.1;
      foxRef.current.rotation.y = currentRotation.current;

      // Update Pikachu position
      foxRef.current.position.set(...position);

      // Update camera to follow the Pikachu
      const [x, y, z] = position;
      camera.position.set(x, y + 10, z + 10);
      camera.lookAt(x, y, z);
    }

    // Update the mixer
    if (mixer.current) {
      mixer.current.update(delta);
    }
  });

  // Return the Pikachu model as a primitive object
  return <primitive ref={foxRef} object={scene} scale={2} />;
};