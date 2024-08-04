// SoundObjects.jsx
import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { PositionalAudio, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// TODO pass in finalX, finalY, finalY from Scene
const SoundObjects =  React.forwardRef((
  { position, 
    collectedPosition, 
    url,
    bodyPart, 
    listenerPosition, 
    onCollect,
    register
  }, ref) => {
  const soundRef = useRef();
  const objectRef = ref || useRef();
  const { nodes } = useGLTF('/src/assets/models/Araquati_parts.gltf');
  const [collected, setCollected] = useState(false);
  // Method to trigger when object is collected
  const handleCollect = () => {
    setCollected(true);
    if (onCollect) onCollect(bodyPart);
  };

  useEffect(() => {
    if (register) {
      // Register the objectRef and handleCollect together
      register({ objectRef, handleCollect });
    }
  }, [register]);

  useFrame(() => {
    if (collected) {
      // Move the object to its designated position in the final body
      objectRef.current.position.lerp(new THREE.Vector3(collectedPosition.X, collectedPosition.Y, collectedPosition.Z), 0.1);
    }
  });


  useEffect(() => {
    const handleUserGesture = () => {
      if (soundRef.current && !soundRef.current.isPlaying) {
        soundRef.current.play();
      }
    };

    window.addEventListener('click', handleUserGesture);

    return () => {
      window.removeEventListener('click', handleUserGesture);
    };
  }, []);

  useEffect(() => {
    if (soundRef.current && listenerPosition) {
      soundRef.current.position.set(listenerPosition.x, listenerPosition.y, listenerPosition.z);
    }
  }, [listenerPosition]);

  const chromeMaterial = (color) => new THREE.MeshStandardMaterial({
    color,
    metalness: 1,
    roughness: 0,
    envMapIntensity: 1
  });

  const bodyPartMap = {
    head: nodes.head_remesh,
    torso: nodes.torso_remesh,
    leftArm: nodes.arm_remesh,
    rightArm: nodes.arm_remesh,
    legs: nodes.leg_remesh,
  };

  return (
   <mesh ref={objectRef} position={position}>
      <PositionalAudio
        ref={soundRef}
        url={url}
        distance={0.65}
        loop
      />
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[1, 2, 0.5, 6]} />
        <meshStandardMaterial color="gray" />
      </mesh>
      {bodyPart && (
        <mesh
          geometry={bodyPartMap[bodyPart].geometry}
          material={chromeMaterial('grey')}
          position={[0, 2.5, 0]} // Adjust position as needed
          scale={[0.01, 0.01, 0.01]}
        />
      )}
    </mesh>
  );
});

export default SoundObjects;

   

